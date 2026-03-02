'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Article } from '@/lib/types/database'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Plus, Pencil, Trash2, Loader2, MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'
import ImageUpload from '@/components/admin/image-upload'

const TAGS = ['Événement', 'Terrain', 'Programme', 'Tribune']

const tagColors: Record<string, string> = {
  'Événement': 'bg-campaign-lime/15 text-campaign-lime border-campaign-lime/30',
  'Terrain': 'bg-primary/30 text-foreground border-primary/40',
  'Programme': 'bg-campaign-olive/20 text-campaign-olive border-campaign-olive/30',
  'Tribune': 'bg-campaign-steel/30 text-campaign-teal-light border-campaign-steel/40',
}

const emptyArticle: Omit<Article, 'id' | 'created_at'> = {
  title: '', date: '', image: '', tag: 'Événement', description: '', sort_order: 0,
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editData, setEditData] = useState(emptyArticle)
  const [editId, setEditId] = useState<string | null>(null)
  const supabase = createClient()

  const fetchArticles = useCallback(async () => {
    const { data } = await supabase.from('articles').select('*').order('sort_order')
    setArticles((data as Article[]) || [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchArticles() }, [fetchArticles])

  const openCreate = () => {
    setEditId(null)
    setEditData({ ...emptyArticle, sort_order: articles.length + 1 })
    setEditOpen(true)
  }

  const openEdit = (article: Article) => {
    setEditId(article.id)
    setEditData({
      title: article.title, date: article.date, image: article.image,
      tag: article.tag, description: article.description, sort_order: article.sort_order,
    })
    setEditOpen(true)
  }

  const handleSave = async () => {
    if (!editData.title || !editData.date) {
      toast.error('Le titre et la date sont obligatoires')
      return
    }
    setSaving(true)

    if (editId) {
      await supabase.from('articles').update(editData).eq('id', editId)
      toast.success('Article modifié')
    } else {
      await supabase.from('articles').insert(editData)
      toast.success('Article créé')
    }

    setSaving(false)
    setEditOpen(false)
    fetchArticles()
  }

  const handleDelete = async () => {
    if (!deleteId) return
    await supabase.from('articles').delete().eq('id', deleteId)
    toast.success('Article supprimé')
    setDeleteId(null)
    fetchArticles()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground font-accent uppercase tracking-wide">Articles & Actualités</h2>
        <Button onClick={openCreate} className="gradient-lime text-accent-foreground">
          <Plus className="w-4 h-4 mr-2" /> Nouvel article
        </Button>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground w-12">#</TableHead>
              <TableHead className="text-muted-foreground">Titre</TableHead>
              <TableHead className="text-muted-foreground hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-muted-foreground hidden md:table-cell">Tag</TableHead>
              <TableHead className="text-muted-foreground text-right w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i} className="border-border/50">
                  <TableCell colSpan={5}><div className="h-8 bg-secondary/30 rounded animate-pulse" /></TableCell>
                </TableRow>
              ))
            ) : articles.length === 0 ? (
              <TableRow className="border-border/50">
                <TableCell colSpan={5} className="text-center text-muted-foreground/60 py-8">
                  Aucun article
                </TableCell>
              </TableRow>
            ) : (
              articles.map((article) => (
                <TableRow
                  key={article.id}
                  className="border-border/50 hover:bg-secondary/20 cursor-pointer"
                  onClick={() => openEdit(article)}
                >
                  <TableCell className="text-muted-foreground/60 text-sm">{article.sort_order}</TableCell>
                  <TableCell className="text-foreground font-medium">{article.title}</TableCell>
                  <TableCell className="text-muted-foreground text-sm hidden sm:table-cell">{article.date}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className={tagColors[article.tag] || 'text-muted-foreground'}>
                      {article.tag}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem onClick={() => openEdit(article)}>
                          <Pencil className="w-4 h-4 mr-2" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setDeleteId(article.id)}>
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

      {/* Edit/Create dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-card border-border text-foreground max-w-lg">
          <DialogHeader>
            <DialogTitle>{editId ? 'Modifier l\'article' : 'Nouvel article'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label className="text-foreground/80">Titre</Label>
              <Input
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="bg-secondary/50 border-border text-foreground"
                placeholder="Titre de l'article"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground/80">Date</Label>
                <Input
                  value={editData.date}
                  onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                  className="bg-secondary/50 border-border text-foreground"
                  placeholder="15 Janvier 2026"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground/80">Tag</Label>
                <Select value={editData.tag} onValueChange={(v) => setEditData({ ...editData, tag: v })}>
                  <SelectTrigger className="bg-secondary/50 border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {TAGS.map((t) => (
                      <SelectItem key={t} value={t} className="text-foreground">{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground/80">Image</Label>
              <ImageUpload
                value={editData.image}
                onChange={(url) => setEditData({ ...editData, image: url })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground/80">Description</Label>
              <Textarea
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                className="bg-secondary/50 border-border text-foreground min-h-[100px]"
                placeholder="Description de l'article..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground/80">Ordre d&apos;affichage</Label>
              <Input
                type="number"
                value={editData.sort_order}
                onChange={(e) => setEditData({ ...editData, sort_order: parseInt(e.target.value) || 0 })}
                className="bg-secondary/50 border-border text-foreground w-24"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)} className="border-border text-foreground/80 hover:bg-secondary">
              Annuler
            </Button>
            <Button onClick={handleSave} disabled={saving} className="gradient-lime text-accent-foreground">
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
            <AlertDialogTitle className="text-foreground">Supprimer cet article ?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-secondary text-foreground border-border hover:bg-secondary">Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90 text-foreground">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
