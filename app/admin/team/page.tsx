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
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Plus, Pencil, Trash2, Loader2, User, MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'
import ImageUpload from '@/components/admin/image-upload'

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
      const { error } = await supabase.from('team_members').update(editData).eq('id', editId)
      if (error) { toast.error('Erreur lors de la modification : ' + error.message); setSaving(false); return }
      toast.success('Membre modifié')
    } else {
      const { error } = await supabase.from('team_members').insert(editData)
      if (error) { toast.error('Erreur lors de l\'ajout : ' + error.message); setSaving(false); return }
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-card/50 rounded-[1.25rem] animate-pulse" />
          ))}
        </div>
      ) : members.length === 0 ? (
        <Card className="bg-card/50 border-border/50">
          <CardContent className="py-12 text-center text-muted-foreground/60">Aucun membre dans l&apos;équipe</CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="group cursor-pointer rounded-[1.25rem] overflow-hidden shadow-lg relative"
              onClick={() => openEdit(member)}
            >
              {/* Photo */}
              <div className="aspect-[3/4] overflow-hidden relative -mb-px bg-secondary/30">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-200 group-hover:scale-110"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-12 h-12 text-muted-foreground/20" />
                  </div>
                )}

                {/* Role badge */}
                <div className="absolute top-3 left-3">
                  <span className="gradient-lime text-accent-foreground px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-extrabold uppercase tracking-wider">
                    {member.role}
                  </span>
                </div>

                {/* Menu */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white border-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card border-border">
                      <DropdownMenuItem onClick={() => openEdit(member)}>
                        <Pencil className="w-4 h-4 mr-2" /> Modifier
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setDeleteId(member.id)}>
                        <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Info band - slide up on hover */}
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-primary/85 backdrop-blur-sm p-4 flex flex-col gap-1.5 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                <p className="font-accent font-extrabold text-primary-foreground text-sm uppercase tracking-wide truncate">
                  {member.name}
                </p>
                {member.description && (
                  <p className="text-primary-foreground/60 text-xs leading-relaxed">{member.description}</p>
                )}
              </div>
            </div>
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
              <Label className="text-foreground/80">Photo</Label>
              <ImageUpload
                value={editData.image}
                onChange={(url) => setEditData({ ...editData, image: url })}
              />
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
