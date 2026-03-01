'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { PressArticle } from '@/lib/types/database'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
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
import { Plus, Pencil, Trash2, Loader2, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

const emptyPress = { source: '', author: '', date: '', title: '', excerpt: '', url: '', logo: '', sort_order: 0 }

export default function PressPage() {
  const [articles, setArticles] = useState<PressArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editData, setEditData] = useState(emptyPress)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const supabase = createClient()

  const fetchArticles = useCallback(async () => {
    const { data } = await supabase.from('press_articles').select('*').order('sort_order')
    setArticles((data as PressArticle[]) || [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchArticles() }, [fetchArticles])

  const openCreate = () => {
    setEditId(null)
    setEditData({ ...emptyPress, sort_order: articles.length + 1 })
    setEditOpen(true)
  }

  const openEdit = (a: PressArticle) => {
    setEditId(a.id)
    setEditData({ source: a.source, author: a.author, date: a.date, title: a.title, excerpt: a.excerpt, url: a.url, logo: a.logo, sort_order: a.sort_order })
    setEditOpen(true)
  }

  const handleSave = async () => {
    if (!editData.title || !editData.source) { toast.error('Le titre et la source sont obligatoires'); return }
    setSaving(true)
    if (editId) {
      await supabase.from('press_articles').update(editData).eq('id', editId)
      toast.success('Article presse modifié')
    } else {
      await supabase.from('press_articles').insert(editData)
      toast.success('Article presse créé')
    }
    setSaving(false)
    setEditOpen(false)
    fetchArticles()
  }

  const handleDelete = async () => {
    if (!deleteId) return
    await supabase.from('press_articles').delete().eq('id', deleteId)
    toast.success('Article presse supprimé')
    setDeleteId(null)
    fetchArticles()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Articles de presse</h2>
        <Button onClick={openCreate} className="bg-teal-600 hover:bg-teal-500 text-white">
          <Plus className="w-4 h-4 mr-2" /> Nouvel article
        </Button>
      </div>

      <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700/50 hover:bg-transparent">
              <TableHead className="text-slate-400 w-12">#</TableHead>
              <TableHead className="text-slate-400">Source</TableHead>
              <TableHead className="text-slate-400">Titre</TableHead>
              <TableHead className="text-slate-400 hidden md:table-cell">Auteur</TableHead>
              <TableHead className="text-slate-400 hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-slate-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <TableRow key={i} className="border-slate-700/50">
                  <TableCell colSpan={6}><div className="h-8 bg-slate-700/30 rounded animate-pulse" /></TableCell>
                </TableRow>
              ))
            ) : articles.length === 0 ? (
              <TableRow className="border-slate-700/50">
                <TableCell colSpan={6} className="text-center text-slate-500 py-8">Aucun article de presse</TableCell>
              </TableRow>
            ) : (
              articles.map((article) => (
                <TableRow key={article.id} className="border-slate-700/50 hover:bg-slate-700/20">
                  <TableCell className="text-slate-500 text-sm">{article.sort_order}</TableCell>
                  <TableCell className="text-teal-400 font-medium text-sm">{article.source}</TableCell>
                  <TableCell className="text-white font-medium">
                    <div className="flex items-center gap-2">
                      <span className="truncate max-w-[200px]">{article.title}</span>
                      {article.url && (
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-teal-400" onClick={(e) => e.stopPropagation()}>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-400 text-sm hidden md:table-cell">{article.author}</TableCell>
                  <TableCell className="text-slate-400 text-sm hidden sm:table-cell">{article.date}</TableCell>
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

      {/* Edit dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>{editId ? 'Modifier l\'article presse' : 'Nouvel article presse'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Source (média)</Label>
                <Input value={editData.source} onChange={(e) => setEditData({ ...editData, source: e.target.value })} className="bg-slate-700/50 border-slate-600 text-white" placeholder="La Provence" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Auteur</Label>
                <Input value={editData.author} onChange={(e) => setEditData({ ...editData, author: e.target.value })} className="bg-slate-700/50 border-slate-600 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Titre</Label>
              <Input value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} className="bg-slate-700/50 border-slate-600 text-white" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Date</Label>
                <Input value={editData.date} onChange={(e) => setEditData({ ...editData, date: e.target.value })} className="bg-slate-700/50 border-slate-600 text-white" placeholder="25 Octobre 2025" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Ordre</Label>
                <Input type="number" value={editData.sort_order} onChange={(e) => setEditData({ ...editData, sort_order: parseInt(e.target.value) || 0 })} className="bg-slate-700/50 border-slate-600 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Extrait</Label>
              <Textarea value={editData.excerpt} onChange={(e) => setEditData({ ...editData, excerpt: e.target.value })} className="bg-slate-700/50 border-slate-600 text-white min-h-[80px]" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">URL de l&apos;article</Label>
              <Input value={editData.url} onChange={(e) => setEditData({ ...editData, url: e.target.value })} className="bg-slate-700/50 border-slate-600 text-white" placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Logo du média (chemin)</Label>
              <Input value={editData.logo} onChange={(e) => setEditData({ ...editData, logo: e.target.value })} className="bg-slate-700/50 border-slate-600 text-white" placeholder="/images/logo-laprovence.svg" />
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
            <AlertDialogTitle className="text-white">Supprimer cet article presse ?</AlertDialogTitle>
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
