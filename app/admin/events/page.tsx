'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Event } from '@/lib/types/database'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import { Plus, Pencil, Trash2, Loader2, Check, MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'

const emptyEvent = { icon: 'Flag', date: '', title: '', description: '', is_done: false, sort_order: 0 }

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editData, setEditData] = useState(emptyEvent)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const supabase = createClient()

  const fetchEvents = useCallback(async () => {
    const { data } = await supabase.from('events').select('*').order('sort_order')
    setEvents((data as Event[]) || [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchEvents() }, [fetchEvents])

  const openCreate = () => {
    setEditId(null)
    setEditData({ ...emptyEvent, sort_order: events.length + 1 })
    setEditOpen(true)
  }

  const openEdit = (event: Event) => {
    setEditId(event.id)
    setEditData({ icon: event.icon, date: event.date, title: event.title, description: event.description, is_done: event.is_done, sort_order: event.sort_order })
    setEditOpen(true)
  }

  const handleSave = async () => {
    if (!editData.title || !editData.date) { toast.error('Le titre et la date sont obligatoires'); return }
    setSaving(true)
    if (editId) {
      await supabase.from('events').update(editData).eq('id', editId)
      toast.success('Événement modifié')
    } else {
      await supabase.from('events').insert(editData)
      toast.success('Événement créé')
    }
    setSaving(false)
    setEditOpen(false)
    fetchEvents()
  }

  const toggleDone = async (event: Event) => {
    await supabase.from('events').update({ is_done: !event.is_done }).eq('id', event.id)
    toast.success(event.is_done ? 'Marqué comme à venir' : 'Marqué comme terminé')
    fetchEvents()
  }

  const handleDelete = async () => {
    if (!deleteId) return
    await supabase.from('events').delete().eq('id', deleteId)
    toast.success('Événement supprimé')
    setDeleteId(null)
    fetchEvents()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-accent font-bold text-foreground uppercase tracking-wide">Événements / Roadmap</h2>
        <Button onClick={openCreate} className="gradient-lime text-accent-foreground font-accent font-bold">
          <Plus className="w-4 h-4 mr-2" /> Nouvel événement
        </Button>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground w-12">#</TableHead>
              <TableHead className="text-muted-foreground">Titre</TableHead>
              <TableHead className="text-muted-foreground hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-muted-foreground hidden md:table-cell">Icône</TableHead>
              <TableHead className="text-muted-foreground">Statut</TableHead>
              <TableHead className="text-muted-foreground text-right w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i} className="border-border/50">
                  <TableCell colSpan={6}><div className="h-8 bg-secondary/30 rounded animate-pulse" /></TableCell>
                </TableRow>
              ))
            ) : events.length === 0 ? (
              <TableRow className="border-border/50">
                <TableCell colSpan={6} className="text-center text-muted-foreground/60 py-8">Aucun événement</TableCell>
              </TableRow>
            ) : (
              events.map((event) => (
                <TableRow
                  key={event.id}
                  className="border-border/50 hover:bg-secondary/20 cursor-pointer"
                  onClick={() => openEdit(event)}
                >
                  <TableCell className="text-muted-foreground/60 text-sm">{event.sort_order}</TableCell>
                  <TableCell className="text-foreground font-medium">{event.title}</TableCell>
                  <TableCell className="text-muted-foreground text-sm hidden sm:table-cell">{event.date}</TableCell>
                  <TableCell className="text-muted-foreground/60 text-sm hidden md:table-cell">{event.icon}</TableCell>
                  <TableCell>
                    {event.is_done ? (
                      <Badge className="bg-campaign-lime/20 text-campaign-lime border-campaign-lime/30">
                        <Check className="w-3 h-3 mr-1" /> Terminé
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground border-border">
                        À venir
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem onClick={() => openEdit(event)}>
                          <Pencil className="w-4 h-4 mr-2" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleDone(event)}>
                          <Check className="w-4 h-4 mr-2" /> {event.is_done ? 'Marquer à venir' : 'Marquer terminé'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setDeleteId(event.id)}>
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

      {/* Edit dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-card border-border text-foreground max-w-lg">
          <DialogHeader>
            <DialogTitle>{editId ? 'Modifier l\'événement' : 'Nouvel événement'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label className="text-foreground/80">Titre</Label>
              <Input value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} className="bg-secondary/50 border-border text-foreground" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground/80">Date</Label>
                <Input value={editData.date} onChange={(e) => setEditData({ ...editData, date: e.target.value })} className="bg-secondary/50 border-border text-foreground" placeholder="Mars 2026" />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground/80">Icône (Lucide)</Label>
                <Input value={editData.icon} onChange={(e) => setEditData({ ...editData, icon: e.target.value })} className="bg-secondary/50 border-border text-foreground" placeholder="Flag" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground/80">Description</Label>
              <Textarea value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} className="bg-secondary/50 border-border text-foreground min-h-[80px]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground/80">Ordre</Label>
                <Input type="number" value={editData.sort_order} onChange={(e) => setEditData({ ...editData, sort_order: parseInt(e.target.value) || 0 })} className="bg-secondary/50 border-border text-foreground" />
              </div>
              <div className="flex items-center gap-3 pt-7">
                <Switch checked={editData.is_done} onCheckedChange={(v) => setEditData({ ...editData, is_done: v })} />
                <Label className="text-foreground/80">Terminé</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)} className="border-border text-foreground/80 hover:bg-secondary">Annuler</Button>
            <Button onClick={handleSave} disabled={saving} className="gradient-lime text-accent-foreground font-accent font-bold">
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editId ? 'Modifier' : 'Créer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Supprimer cet événement ?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">Cette action est irréversible.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-secondary text-foreground border-border hover:bg-secondary/80">Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90 text-foreground">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
