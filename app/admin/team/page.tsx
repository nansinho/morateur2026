'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { TeamMember } from '@/lib/types/database'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Plus, Pencil, Trash2, Loader2, User } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

const emptyMember = { name: '', role: '', image: '', description: '', sort_order: 0 }

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editData, setEditData] = useState(emptyMember)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const supabase = createClient()

  const fetchMembers = useCallback(async () => {
    const { data } = await supabase.from('team_members').select('*').order('sort_order')
    setMembers((data as TeamMember[]) || [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchMembers() }, [fetchMembers])

  const openCreate = () => {
    setEditId(null)
    setEditData({ ...emptyMember, sort_order: members.length + 1 })
    setEditOpen(true)
  }

  const openEdit = (m: TeamMember) => {
    setEditId(m.id)
    setEditData({ name: m.name, role: m.role, image: m.image, description: m.description, sort_order: m.sort_order })
    setEditOpen(true)
  }

  const handleSave = async () => {
    if (!editData.name) { toast.error('Le nom est obligatoire'); return }
    setSaving(true)
    if (editId) {
      await supabase.from('team_members').update(editData).eq('id', editId)
      toast.success('Membre modifié')
    } else {
      await supabase.from('team_members').insert(editData)
      toast.success('Membre ajouté')
    }
    setSaving(false)
    setEditOpen(false)
    fetchMembers()
  }

  const handleDelete = async () => {
    if (!deleteId) return
    await supabase.from('team_members').delete().eq('id', deleteId)
    toast.success('Membre supprimé')
    setDeleteId(null)
    fetchMembers()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-accent font-bold text-foreground uppercase tracking-wide">Équipe</h2>
        <Button onClick={openCreate} className="gradient-lime text-accent-foreground font-accent font-bold">
          <Plus className="w-4 h-4 mr-2" /> Nouveau membre
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 bg-card/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : members.length === 0 ? (
        <Card className="bg-card/50 border-border/50">
          <CardContent className="py-12 text-center text-muted-foreground/60">Aucun membre dans l&apos;équipe</CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
            <Card key={member.id} className="bg-card/50 border-border/50 group hover:bg-card/80 transition-colors">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {member.image ? (
                      <Image src={member.image} alt={member.name} width={56} height={56} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-6 h-6 text-muted-foreground/60" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{member.name}</p>
                    <p className="text-xs text-campaign-lime mt-0.5">{member.role}</p>
                    <p className="text-xs text-muted-foreground/60 mt-2 line-clamp-2">{member.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => openEdit(member)}>
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setDeleteId(member.id)}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-card border-border text-foreground max-w-lg">
          <DialogHeader>
            <DialogTitle>{editId ? 'Modifier le membre' : 'Nouveau membre'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground/80">Nom complet</Label>
                <Input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} className="bg-secondary/50 border-border text-foreground" />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground/80">Rôle / Fonction</Label>
                <Input value={editData.role} onChange={(e) => setEditData({ ...editData, role: e.target.value })} className="bg-secondary/50 border-border text-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground/80">Chemin image</Label>
              <Input value={editData.image} onChange={(e) => setEditData({ ...editData, image: e.target.value })} className="bg-secondary/50 border-border text-foreground" placeholder="/images/equipe-1.png" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground/80">Description</Label>
              <Textarea value={editData.description} onChange={(e) => setEditData({ ...editData, description: e.target.value })} className="bg-secondary/50 border-border text-foreground min-h-[80px]" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground/80">Ordre d&apos;affichage</Label>
              <Input type="number" value={editData.sort_order} onChange={(e) => setEditData({ ...editData, sort_order: parseInt(e.target.value) || 0 })} className="bg-secondary/50 border-border text-foreground w-24" />
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
            <AlertDialogTitle className="text-foreground">Supprimer ce membre ?</AlertDialogTitle>
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
