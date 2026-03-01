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
import { Plus, Pencil, Trash2, Loader2, Check } from 'lucide-react'
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
        <h2 className="text-2xl font-bold text-white">Événements / Roadmap</h2>
        <Button onClick={openCreate} className="bg-teal-600 hover:bg-teal-500 text-white">
          <Plus className="w-4 h-4 mr-2" /> Nouvel événement
        </Button>
      </div>

      <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700/50 hover:bg-transparent">
              <TableHead className="text-slate-400 w-12">#</TableHead>
              <TableHead className="text-slate-400">Titre</TableHead>
              <TableHead className="text-slate-400 hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-slate-400 hidden md:table-cell">Icône</TableHead>
              <TableHead className="text-slate-400">Statut</TableHead>
              <TableHead className="text-slate-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <TableRow key={i} className="border-slate-700/50">
                  <TableCell colSpan={6}><div className="h-8 bg-slate-700/30 rounded animate-pulse" /></TableCell>
                </TableRow>
              ))
            ) : events.length === 0 ? (
              <TableRow className="border-slate-700/50">
                <TableCell colSpan={6} className="text-center text-slate-500 py-8">Aucun événement</TableCell>
              </TableRow>
            ) : (
              events.map((event) => (
                <TableRow key={event.id} className="border-slate-700/50 hover:bg-slate-700/20">
                  <TableCell className="text-slate-500 text-sm">{event.sort_order}</TableCell>
                  <TableCell className="text-white font-medium">{event.title}</TableCell>
                  <TableCell className="text-slate-400 text-sm hidden sm:table-cell">{event.date}</TableCell>
                  <TableCell className="text-slate-500 text-sm hidden md:table-cell">{event.icon}</TableCell>
                  <TableCell>
                    <button onClick={() => toggleDone(event)}>
                      {event.is_done ? (
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 cursor-pointer">
                          <Check className="w-3 h-3 mr-1" /> Terminé
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-slate-400 border-slate-600 cursor-pointer">
                          À venir
                        </Badge>
                      )}
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white" onClick={() => openEdit(event)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300" onClick={() => setDeleteId(event.id)}>
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

      {/* Edit dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>{editId ? 'Modifier l\'événement' : 'Nouvel événement'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label className="text-slate-300">Titre</Label>
              <Input value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} className="bg-slate-700/50 border-slate-600 text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Date</Label>
                <Input value={editData.date} onChange={(e) => setEditData({ ...editData, date: e.target.value })} className="bg-slate-700/50 border-slate-600 text-white" placeholder="Mars 2026" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Icône (Lucide)</Label>
                <Input value={editData.icon} onChange={(e) => setEditData({ ...editData, icon: e.target.value })} className="bg-slate-700/50 border-slate-600 text-white" placeholder="Flag" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Description</Label>
              <Textarea value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} className="bg-slate-700/50 border-slate-600 text-white min-h-[80px]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Ordre</Label>
                <Input type="number" value={editData.sort_order} onChange={(e) => setEditData({ ...editData, sort_order: parseInt(e.target.value) || 0 })} className="bg-slate-700/50 border-slate-600 text-white" />
              </div>
              <div className="flex items-center gap-3 pt-7">
                <Switch checked={editData.is_done} onCheckedChange={(v) => setEditData({ ...editData, is_done: v })} />
                <Label className="text-slate-300">Terminé</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)} className="border-slate-600 text-slate-300 hover:bg-slate-700">Annuler</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-teal-600 hover:bg-teal-500 text-white">
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editId ? 'Modifier' : 'Créer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Supprimer cet événement ?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">Cette action est irréversible.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600">Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-500 text-white">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
