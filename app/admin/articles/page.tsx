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
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const TAGS = ['Événement', 'Terrain', 'Programme', 'Tribune']

const tagColors: Record<string, string> = {
  'Événement': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Terrain': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  'Programme': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Tribune': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
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
        <h2 className="text-2xl font-bold text-white">Articles & Actualités</h2>
        <Button onClick={openCreate} className="bg-teal-600 hover:bg-teal-500 text-white">
          <Plus className="w-4 h-4 mr-2" /> Nouvel article
        </Button>
      </div>

      <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700/50 hover:bg-transparent">
              <TableHead className="text-slate-400 w-12">#</TableHead>
              <TableHead className="text-slate-400">Titre</TableHead>
              <TableHead className="text-slate-400 hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-slate-400 hidden md:table-cell">Tag</TableHead>
              <TableHead className="text-slate-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i} className="border-slate-700/50">
                  <TableCell colSpan={5}><div className="h-8 bg-slate-700/30 rounded animate-pulse" /></TableCell>
                </TableRow>
              ))
            ) : articles.length === 0 ? (
              <TableRow className="border-slate-700/50">
                <TableCell colSpan={5} className="text-center text-slate-500 py-8">
                  Aucun article
                </TableCell>
              </TableRow>
            ) : (
              articles.map((article) => (
                <TableRow key={article.id} className="border-slate-700/50 hover:bg-slate-700/20">
                  <TableCell className="text-slate-500 text-sm">{article.sort_order}</TableCell>
                  <TableCell className="text-white font-medium">{article.title}</TableCell>
                  <TableCell className="text-slate-400 text-sm hidden sm:table-cell">{article.date}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className={tagColors[article.tag] || 'text-slate-400'}>
                      {article.tag}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white" onClick={() => openEdit(article)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300" onClick={() => setDeleteId(article.id)}>
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

      {/* Edit/Create dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>{editId ? 'Modifier l\'article' : 'Nouvel article'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label className="text-slate-300">Titre</Label>
              <Input
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="Titre de l'article"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Date</Label>
                <Input
                  value={editData.date}
                  onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="15 Janvier 2026"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Tag</Label>
                <Select value={editData.tag} onValueChange={(v) => setEditData({ ...editData, tag: v })}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {TAGS.map((t) => (
                      <SelectItem key={t} value={t} className="text-white">{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">URL Image</Label>
              <Input
                value={editData.image}
                onChange={(e) => setEditData({ ...editData, image: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white"
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Description</Label>
              <Textarea
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                className="bg-slate-700/50 border-slate-600 text-white min-h-[100px]"
                placeholder="Description de l'article..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Ordre d&apos;affichage</Label>
              <Input
                type="number"
                value={editData.sort_order}
                onChange={(e) => setEditData({ ...editData, sort_order: parseInt(e.target.value) || 0 })}
                className="bg-slate-700/50 border-slate-600 text-white w-24"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)} className="border-slate-600 text-slate-300 hover:bg-slate-700">
              Annuler
            </Button>
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
            <AlertDialogTitle className="text-white">Supprimer cet article ?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Cette action est irréversible.
            </AlertDialogDescription>
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
