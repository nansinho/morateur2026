'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Quartier } from '@/lib/types/database'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Pencil, Trash2, Loader2, Download } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { downloadCSV } from '@/lib/export-csv'

interface QuartierWithCount extends Quartier {
  quartier_questions: { id: string }[]
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function QuartiersAdminPage() {
  const [quartiers, setQuartiers] = useState<QuartierWithCount[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', slug: '', description: '', is_active: true, display_order: 0 })

  // Export state
  const [quartierFilter, setQuartierFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [exporting, setExporting] = useState(false)

  const supabase = createClient()

  const fetchQuartiers = useCallback(async () => {
    const { data } = await supabase
      .from('quartiers')
      .select('*, quartier_questions(id)')
      .order('display_order')
    setQuartiers((data as QuartierWithCount[]) || [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchQuartiers() }, [fetchQuartiers])

  const toggleActive = async (quartier: QuartierWithCount) => {
    await supabase.from('quartiers').update({ is_active: !quartier.is_active }).eq('id', quartier.id)
    toast.success(quartier.is_active ? 'Quartier désactivé' : 'Quartier activé')
    fetchQuartiers()
  }

  const handleCreate = async () => {
    if (!form.name.trim() || !form.slug.trim()) {
      toast.error('Nom et slug requis')
      return
    }
    setSaving(true)
    const { error } = await supabase.from('quartiers').insert({
      name: form.name.trim(),
      slug: form.slug.trim(),
      description: form.description.trim(),
      is_active: form.is_active,
      display_order: form.display_order,
    })
    if (error) {
      toast.error(error.message.includes('unique') ? 'Ce slug existe déjà' : 'Erreur lors de la création')
    } else {
      toast.success('Quartier créé')
      setDialogOpen(false)
      setForm({ name: '', slug: '', description: '', is_active: true, display_order: 0 })
      fetchQuartiers()
    }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!deleteId) return
    const { error } = await supabase.from('quartiers').delete().eq('id', deleteId)
    if (error) {
      toast.error('Erreur : des soumissions existent peut-être encore pour ce quartier')
    } else {
      toast.success('Quartier supprimé')
    }
    setDeleteId(null)
    fetchQuartiers()
  }

  const handleExport = async () => {
    setExporting(true)
    try {
      let query = supabase
        .from('consultation_submissions')
        .select('*, quartiers(name)')
        .order('created_at', { ascending: false })

      if (quartierFilter !== 'all') query = query.eq('quartier_id', quartierFilter)
      if (statusFilter !== 'all') query = query.eq('status', statusFilter)
      if (dateFrom) query = query.gte('created_at', `${dateFrom}T00:00:00`)
      if (dateTo) query = query.lte('created_at', `${dateTo}T23:59:59`)

      const { data: submissions, error: subError } = await query
      if (subError) throw subError
      if (!submissions || submissions.length === 0) {
        toast.error('Aucune donnée à exporter')
        setExporting(false)
        return
      }

      const submissionIds = submissions.map((s: { id: string }) => s.id)
      const { data: answers } = await supabase
        .from('consultation_answers')
        .select('*, quartier_questions(question_text, question_number)')
        .in('submission_id', submissionIds)

      const questionMap = new Map<string, { text: string; number: number }>()
      if (answers) {
        for (const a of answers) {
          const q = (a as { quartier_questions?: { question_text: string; question_number: number } }).quartier_questions
          if (q) questionMap.set(a.question_id, { text: q.question_text, number: q.question_number })
        }
      }
      const sortedQuestions = [...questionMap.entries()].sort((a, b) => a[1].number - b[1].number)

      const headers = [
        'Date', 'Quartier', 'Prénom', 'Nom', 'Email', 'Téléphone',
        'Statut', 'Réponse souhaitée', 'Rappel souhaité',
        ...sortedQuestions.map(([, q]) => `Q${q.number}`),
      ]

      const answerLookup = new Map<string, Map<string, string>>()
      if (answers) {
        for (const a of answers) {
          if (!answerLookup.has(a.submission_id)) answerLookup.set(a.submission_id, new Map())
          answerLookup.get(a.submission_id)!.set(a.question_id, a.answer_text)
        }
      }

      const rows = submissions.map((s: {
        id: string; created_at: string; quartiers?: { name: string } | null;
        first_name: string; last_name: string; email: string; phone: string;
        status: string; wants_personal_response: boolean; wants_callback: boolean;
      }) => {
        const subAnswers = answerLookup.get(s.id) || new Map()
        return [
          new Date(s.created_at).toLocaleDateString('fr-FR'),
          (s.quartiers as { name: string } | null)?.name || '',
          s.first_name, s.last_name, s.email, s.phone || '', s.status,
          s.wants_personal_response ? 'Oui' : 'Non',
          s.wants_callback ? 'Oui' : 'Non',
          ...sortedQuestions.map(([qId]) => subAnswers.get(qId) || ''),
        ]
      })

      downloadCSV('consultations', headers, rows)
      toast.success(`${submissions.length} soumission(s) exportée(s)`)
    } catch (err) {
      console.error('[EXPORT]', err)
      toast.error('Erreur lors de l\'export')
    }
    setExporting(false)
  }

  const handleExportQuartiers = () => {
    if (quartiers.length === 0) { toast.error('Aucun quartier à exporter'); return }
    const headers = ['Nom', 'Slug', 'Description', 'Actif', 'Ordre', 'Nb questions']
    const rows = quartiers.map((q) => [
      q.name, q.slug, q.description || '', q.is_active ? 'Oui' : 'Non',
      String(q.display_order), String(q.quartier_questions.length),
    ])
    downloadCSV('quartiers', headers, rows)
    toast.success(`${quartiers.length} quartier(s) exporté(s)`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground font-accent uppercase tracking-wide">Quartiers</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportQuartiers} className="border-border text-muted-foreground hover:text-foreground">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button className="gradient-lime text-accent-foreground font-semibold" onClick={() => setDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Nouveau quartier
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground w-16">Ordre</TableHead>
              <TableHead className="text-muted-foreground">Nom</TableHead>
              <TableHead className="text-muted-foreground hidden md:table-cell">Slug</TableHead>
              <TableHead className="text-muted-foreground">Actif</TableHead>
              <TableHead className="text-muted-foreground hidden sm:table-cell">Questions</TableHead>
              <TableHead className="text-muted-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="border-border/50">
                  <TableCell colSpan={6}><div className="h-8 bg-secondary/30 rounded animate-pulse" /></TableCell>
                </TableRow>
              ))
            ) : quartiers.length === 0 ? (
              <TableRow className="border-border/50">
                <TableCell colSpan={6} className="text-center text-muted-foreground/60 py-8">
                  Aucun quartier
                </TableCell>
              </TableRow>
            ) : (
              quartiers.map((q) => (
                <TableRow key={q.id} className="border-border/50 hover:bg-secondary/20">
                  <TableCell className="text-muted-foreground">{q.display_order}</TableCell>
                  <TableCell className="font-medium text-foreground">{q.name}</TableCell>
                  <TableCell className="text-muted-foreground/60 text-sm hidden md:table-cell">{q.slug}</TableCell>
                  <TableCell>
                    <Switch checked={q.is_active} onCheckedChange={() => toggleActive(q)} />
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden sm:table-cell">
                    {q.quartier_questions.length}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/quartiers/${q.slug}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <Pencil className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => setDeleteId(q.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Export consultations section */}
      <Card className="border-border/50 bg-card/30">
        <CardHeader>
          <CardTitle className="text-foreground text-lg">Export des consultations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label className="text-muted-foreground text-xs">Quartier</Label>
              <Select value={quartierFilter} onValueChange={setQuartierFilter}>
                <SelectTrigger className="bg-secondary/50 border-border text-foreground mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all" className="text-foreground">Tous les quartiers</SelectItem>
                  {quartiers.map((q) => (
                    <SelectItem key={q.id} value={q.id} className="text-foreground">{q.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-muted-foreground text-xs">Statut</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-secondary/50 border-border text-foreground mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all" className="text-foreground">Tous</SelectItem>
                  <SelectItem value="new" className="text-foreground">Nouveaux</SelectItem>
                  <SelectItem value="read" className="text-foreground">Lus</SelectItem>
                  <SelectItem value="replied" className="text-foreground">Répondus</SelectItem>
                  <SelectItem value="archived" className="text-foreground">Archivés</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-muted-foreground text-xs">Date début</Label>
              <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="bg-secondary/50 border-border text-foreground mt-1" />
            </div>
            <div>
              <Label className="text-muted-foreground text-xs">Date fin</Label>
              <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="bg-secondary/50 border-border text-foreground mt-1" />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button onClick={handleExport} disabled={exporting} className="gradient-lime text-accent-foreground font-semibold">
              {exporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
              Exporter les consultations en CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle>Nouveau quartier</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-foreground/80">Nom</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value, slug: slugify(e.target.value) })}
                className="bg-secondary/50 border-border text-foreground"
                placeholder="La Bergerie"
              />
            </div>
            <div>
              <Label className="text-foreground/80">Slug</Label>
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="bg-secondary/50 border-border text-foreground"
                placeholder="bergerie"
              />
            </div>
            <div>
              <Label className="text-foreground/80">Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="bg-secondary/50 border-border text-foreground"
              />
            </div>
            <div className="flex items-center gap-4">
              <div>
                <Label className="text-foreground/80">Ordre</Label>
                <Input
                  type="number"
                  value={form.display_order}
                  onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
                  className="bg-secondary/50 border-border text-foreground w-24"
                />
              </div>
              <div className="flex items-center gap-2 mt-6">
                <Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
                <Label className="text-foreground/80">Actif</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogOpen(false)} className="text-foreground">Annuler</Button>
            <Button onClick={handleCreate} disabled={saving} className="gradient-lime text-accent-foreground font-semibold">
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Supprimer ce quartier ?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Cette action supprimera le quartier et toutes ses questions. Les soumissions existantes empêcheront la suppression.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-secondary text-foreground border-border hover:bg-secondary">Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90 text-foreground">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
