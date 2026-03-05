'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { ChatbotEntry } from '@/lib/types/database'
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
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Plus, Pencil, Trash2, Loader2, MoreHorizontal, Search, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'

const emptyEntry = {
  question: '',
  answer: '',
  category: '',
  parent_id: null as string | null,
  link_url: '' as string,
  sort_order: 0,
  is_active: true,
}

export default function ChatbotPage() {
  const [entries, setEntries] = useState<ChatbotEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editData, setEditData] = useState(emptyEntry)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const supabase = createClient()

  const fetchEntries = useCallback(async () => {
    const { data } = await supabase.from('chatbot_entries').select('*').order('sort_order')
    setEntries((data as ChatbotEntry[]) || [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchEntries() }, [fetchEntries])

  const categories = [...new Set(entries.map(e => e.category).filter(Boolean))]

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = !searchQuery ||
      entry.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || entry.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const getParentLabel = (parentId: string | null) => {
    if (!parentId) return null
    const parent = entries.find(e => e.id === parentId)
    return parent ? parent.question : null
  }

  const openCreate = () => {
    setEditId(null)
    setEditData({ ...emptyEntry, sort_order: entries.length + 1 })
    setEditOpen(true)
  }

  const openEdit = (entry: ChatbotEntry) => {
    setEditId(entry.id)
    setEditData({
      question: entry.question,
      answer: entry.answer,
      category: entry.category,
      parent_id: entry.parent_id,
      link_url: entry.link_url || '',
      sort_order: entry.sort_order,
      is_active: entry.is_active,
    })
    setEditOpen(true)
  }

  const handleSave = async () => {
    if (!editData.question.trim()) {
      toast.error('La question est obligatoire')
      return
    }
    if (!editData.answer.trim()) {
      toast.error('La réponse est obligatoire')
      return
    }
    setSaving(true)

    const payload = {
      ...editData,
      parent_id: editData.parent_id || null,
      link_url: editData.link_url?.trim() || null,
    }

    if (editId) {
      const { error } = await supabase.from('chatbot_entries').update(payload).eq('id', editId)
      if (error) { toast.error('Erreur lors de la modification'); setSaving(false); return }
      toast.success('Entrée modifiée')
    } else {
      const { error } = await supabase.from('chatbot_entries').insert(payload)
      if (error) { toast.error('Erreur lors de la création'); setSaving(false); return }
      toast.success('Entrée créée')
    }
    setSaving(false)
    setEditOpen(false)
    fetchEntries()
  }

  const toggleActive = async (entry: ChatbotEntry) => {
    await supabase.from('chatbot_entries').update({ is_active: !entry.is_active }).eq('id', entry.id)
    toast.success(entry.is_active ? 'Entrée désactivée' : 'Entrée activée')
    fetchEntries()
  }

  const handleDelete = async () => {
    if (!deleteId) return
    await supabase.from('chatbot_entries').delete().eq('id', deleteId)
    toast.success('Entrée supprimée')
    setDeleteId(null)
    fetchEntries()
  }

  // Available parents: all entries except the one being edited (and its children to avoid cycles)
  const availableParents = entries.filter(e => e.id !== editId && !e.parent_id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-accent font-bold text-foreground uppercase tracking-wide">Chatbot</h2>
          <Badge variant="outline" className="text-muted-foreground border-border">
            {entries.filter(e => e.is_active).length} actives
          </Badge>
        </div>
        <Button onClick={openCreate} className="gradient-lime text-accent-foreground font-accent font-bold">
          <Plus className="w-4 h-4 mr-2" /> Nouvelle entrée
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une question ou réponse..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-secondary/50 border-border text-foreground"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[180px] bg-secondary/50 border-border text-foreground">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">Toutes les catégories</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border/50 bg-card/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground w-12">#</TableHead>
              <TableHead className="text-muted-foreground">Question</TableHead>
              <TableHead className="text-muted-foreground hidden md:table-cell">Catégorie</TableHead>
              <TableHead className="text-muted-foreground hidden lg:table-cell">Parent</TableHead>
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
            ) : filteredEntries.length === 0 ? (
              <TableRow className="border-border/50">
                <TableCell colSpan={6} className="text-center text-muted-foreground/60 py-8">
                  <div className="flex flex-col items-center gap-2">
                    <MessageCircle className="w-8 h-8 opacity-30" />
                    <p>{searchQuery || filterCategory !== 'all' ? 'Aucun résultat' : 'Aucune entrée de chatbot'}</p>
                    {!searchQuery && filterCategory === 'all' && (
                      <p className="text-xs">Créez des questions/réponses pour alimenter le chatbot du site.</p>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredEntries.map((entry) => (
                <TableRow
                  key={entry.id}
                  className="border-border/50 hover:bg-secondary/20 cursor-pointer"
                  onClick={() => openEdit(entry)}
                >
                  <TableCell className="text-muted-foreground/60 text-sm">{entry.sort_order}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-foreground font-medium text-sm">{entry.question}</p>
                      <p className="text-muted-foreground/60 text-xs truncate max-w-[300px]">{entry.answer}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {entry.category ? (
                      <Badge variant="outline" className="text-muted-foreground border-border text-xs">
                        {entry.category}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground/40 text-xs">—</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {entry.parent_id ? (
                      <span className="text-muted-foreground/60 text-xs truncate max-w-[200px] block">
                        {getParentLabel(entry.parent_id) || '—'}
                      </span>
                    ) : (
                      <Badge className="bg-campaign-lime/20 text-campaign-lime border-campaign-lime/30 text-xs">
                        Racine
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {entry.is_active ? (
                      <Badge className="bg-campaign-lime/20 text-campaign-lime border-campaign-lime/30 text-xs">
                        Actif
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground border-border text-xs">
                        Inactif
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
                        <DropdownMenuItem onClick={() => openEdit(entry)}>
                          <Pencil className="w-4 h-4 mr-2" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleActive(entry)}>
                          {entry.is_active ? 'Désactiver' : 'Activer'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setDeleteId(entry.id)}>
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
            <DialogTitle>{editId ? 'Modifier l\'entrée' : 'Nouvelle entrée chatbot'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label className="text-foreground/80">Question</Label>
              <Input
                value={editData.question}
                onChange={(e) => setEditData({ ...editData, question: e.target.value })}
                className="bg-secondary/50 border-border text-foreground"
                placeholder="Ex : Quel est le programme ?"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground/80">Réponse</Label>
              <Textarea
                value={editData.answer}
                onChange={(e) => setEditData({ ...editData, answer: e.target.value })}
                className="bg-secondary/50 border-border text-foreground min-h-[100px]"
                placeholder="La réponse qui sera affichée dans le chatbot..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground/80">Catégorie</Label>
                <Input
                  value={editData.category}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  className="bg-secondary/50 border-border text-foreground"
                  placeholder="Ex : Programme, Accessibilité"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground/80">Ordre d&apos;affichage</Label>
                <Input
                  type="number"
                  value={editData.sort_order}
                  onChange={(e) => setEditData({ ...editData, sort_order: parseInt(e.target.value) || 0 })}
                  className="bg-secondary/50 border-border text-foreground"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground/80">Lien de redirection (optionnel)</Label>
              <Input
                value={editData.link_url}
                onChange={(e) => setEditData({ ...editData, link_url: e.target.value })}
                className="bg-secondary/50 border-border text-foreground"
                placeholder="Ex : /programme, /candidat, /#procuration"
              />
              <p className="text-[11px] text-muted-foreground/60">
                Page vers laquelle le chatbot redirigera l&apos;utilisateur.
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground/80">Question parente (optionnel)</Label>
              <Select
                value={editData.parent_id || 'none'}
                onValueChange={(v) => setEditData({ ...editData, parent_id: v === 'none' ? null : v })}
              >
                <SelectTrigger className="bg-secondary/50 border-border text-foreground">
                  <SelectValue placeholder="Aucune (question racine)" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="none">Aucune (question racine)</SelectItem>
                  {availableParents.map(parent => (
                    <SelectItem key={parent.id} value={parent.id}>
                      {parent.question}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-[11px] text-muted-foreground/60">
                Si défini, cette question apparaîtra comme suggestion après la réponse du parent.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={editData.is_active}
                onCheckedChange={(v) => setEditData({ ...editData, is_active: v })}
              />
              <Label className="text-foreground/80">Actif</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)} className="border-border text-foreground/80 hover:bg-secondary">
              Annuler
            </Button>
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
            <AlertDialogTitle className="text-foreground">Supprimer cette entrée ?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Cette action est irréversible. Les questions enfants de cette entrée resteront mais n&apos;auront plus de parent.
            </AlertDialogDescription>
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
