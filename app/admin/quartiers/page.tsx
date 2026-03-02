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
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Plus, Pencil, Trash2, Loader2, MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

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
  const supabase = createClient()
  const router = useRouter()

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground font-accent uppercase tracking-wide">Quartiers</h2>
        <Button className="gradient-lime text-accent-foreground font-semibold" onClick={() => setDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Nouveau quartier
        </Button>
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
              <TableHead className="text-muted-foreground text-right w-12"></TableHead>
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
                <TableRow
                  key={q.id}
                  className="border-border/50 hover:bg-secondary/20 cursor-pointer"
                  onClick={() => router.push(`/admin/quartiers/${q.slug}`)}
                >
                  <TableCell className="text-muted-foreground">{q.display_order}</TableCell>
                  <TableCell className="font-medium text-foreground">{q.name}</TableCell>
                  <TableCell className="text-muted-foreground/60 text-sm hidden md:table-cell">{q.slug}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Switch checked={q.is_active} onCheckedChange={() => toggleActive(q)} />
                  </TableCell>
                  <TableCell className="text-muted-foreground hidden sm:table-cell">
                    {q.quartier_questions.length}
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem onClick={() => router.push(`/admin/quartiers/${q.slug}`)}>
                          <Pencil className="w-4 h-4 mr-2" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setDeleteId(q.id)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

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
