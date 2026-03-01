'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { ConsultationSubmission, Quartier } from '@/lib/types/database'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Eye, MailOpen, Archive, Trash2, Search } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const statusConfig = {
  new: { label: 'Nouveau', className: 'bg-campaign-lime/20 text-campaign-lime border-campaign-lime/30' },
  read: { label: 'Lu', className: 'bg-muted text-muted-foreground border-muted' },
  replied: { label: 'Répondu', className: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  archived: { label: 'Archivé', className: 'bg-secondary text-muted-foreground/60 border-secondary' },
}

export default function ConsultationsPage() {
  const [submissions, setSubmissions] = useState<ConsultationSubmission[]>([])
  const [quartiers, setQuartiers] = useState<Quartier[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'read' | 'replied' | 'archived'>('all')
  const [quartierFilter, setQuartierFilter] = useState<string>('all')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  const fetchQuartiers = useCallback(async () => {
    const { data } = await supabase.from('quartiers').select('*').order('display_order')
    setQuartiers((data as Quartier[]) || [])
  }, [supabase])

  const fetchSubmissions = useCallback(async () => {
    let query = supabase
      .from('consultation_submissions')
      .select('*, quartiers(name)')
      .order('created_at', { ascending: false })

    if (statusFilter !== 'all') query = query.eq('status', statusFilter)
    if (quartierFilter !== 'all') query = query.eq('quartier_id', quartierFilter)

    const { data } = await query
    setSubmissions((data as ConsultationSubmission[]) || [])
    setLoading(false)
  }, [supabase, statusFilter, quartierFilter])

  useEffect(() => { fetchQuartiers() }, [fetchQuartiers])
  useEffect(() => { fetchSubmissions() }, [fetchSubmissions])

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('consultation_submissions').update({ status }).eq('id', id)
    toast.success(status === 'read' ? 'Marqué comme lu' : status === 'archived' ? 'Archivé' : 'Statut mis à jour')
    fetchSubmissions()
  }

  const handleDelete = async () => {
    if (!deleteId) return
    await supabase.from('consultation_submissions').delete().eq('id', deleteId)
    toast.success('Soumission supprimée')
    setDeleteId(null)
    fetchSubmissions()
  }

  const filtered = submissions.filter((s) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      s.first_name.toLowerCase().includes(q) ||
      s.last_name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-foreground font-accent uppercase tracking-wide">Consultations</h2>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <Input
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-[200px] bg-card/50 border-border text-foreground placeholder:text-muted-foreground/50"
            />
          </div>
          <Select value={quartierFilter} onValueChange={setQuartierFilter}>
            <SelectTrigger className="w-[160px] bg-card/50 border-border text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all" className="text-foreground">Tous les quartiers</SelectItem>
              {quartiers.map((q) => (
                <SelectItem key={q.id} value={q.id} className="text-foreground">{q.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
            <SelectTrigger className="w-[140px] bg-card/50 border-border text-foreground">
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
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Statut</TableHead>
              <TableHead className="text-muted-foreground">Nom</TableHead>
              <TableHead className="text-muted-foreground hidden md:table-cell">Quartier</TableHead>
              <TableHead className="text-muted-foreground hidden lg:table-cell">Email</TableHead>
              <TableHead className="text-muted-foreground hidden sm:table-cell">Date</TableHead>
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
            ) : filtered.length === 0 ? (
              <TableRow className="border-border/50">
                <TableCell colSpan={6} className="text-center text-muted-foreground/60 py-8">
                  Aucune soumission trouvée
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((sub) => (
                <TableRow
                  key={sub.id}
                  className="border-border/50 hover:bg-secondary/20 cursor-pointer"
                  onClick={() => router.push(`/admin/consultations/${sub.id}`)}
                >
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] ${statusConfig[sub.status].className}`}>
                      {statusConfig[sub.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className={`font-medium ${sub.status === 'new' ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {sub.first_name} {sub.last_name}
                    {sub.wants_personal_response && (
                      <span className="ml-2 text-[10px] text-campaign-lime" title="Souhaite une réponse">&#9679;</span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden md:table-cell">
                    {sub.quartiers?.name || '—'}
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden lg:table-cell">{sub.email}</TableCell>
                  <TableCell className="text-muted-foreground/60 text-sm hidden sm:table-cell">
                    {new Date(sub.created_at).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => router.push(`/admin/consultations/${sub.id}`)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      {sub.status === 'new' && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => updateStatus(sub.id, 'read')}>
                          <MailOpen className="w-4 h-4" />
                        </Button>
                      )}
                      {sub.status !== 'archived' && (
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => updateStatus(sub.id, 'archived')}>
                          <Archive className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => setDeleteId(sub.id)}>
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

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Supprimer cette soumission ?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Cette action est irréversible. La soumission et toutes ses réponses seront définitivement supprimées.
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
