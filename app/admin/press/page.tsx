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
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Plus, Pencil, Trash2, Loader2, ExternalLink, MoreHorizontal, Globe, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import ImageUpload from '@/components/admin/image-upload'

const emptyPress = { source: '', author: '', date: '', title: '', excerpt: '', url: '', logo: '', sort_order: 0 }

export default function PressPage() {
  const [articles, setArticles] = useState<PressArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editData, setEditData] = useState(emptyPress)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [scrapeUrl, setScrapeUrl] = useState('')
  const [scraping, setScraping] = useState(false)
  const supabase = createClient()

  const fetchArticles = useCallback(async () => {
    const { data } = await supabase.from('press_articles').select('*').order('sort_order', { ascending: false })
    setArticles((data as PressArticle[]) || [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchArticles() }, [fetchArticles])

  const openCreate = () => {
    setEditId(null)
    setEditData({ ...emptyPress, sort_order: articles.length + 1 })
    setScrapeUrl('')
    setEditOpen(true)
  }

  const handleScrape = async () => {
    if (!scrapeUrl.trim()) { toast.error('Collez une URL d\'article'); return }
    setScraping(true)
    try {
      const res = await fetch('/api/press/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: scrapeUrl.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur lors de la récupération')
      setEditData(prev => ({
        ...prev,
        title: data.title || prev.title,
        excerpt: data.excerpt || prev.excerpt,
        source: data.source || prev.source,
        author: data.author || prev.author,
        date: data.date || prev.date,
        logo: data.logo || prev.logo,
        url: data.url || scrapeUrl.trim(),
      }))
      toast.success('Métadonnées récupérées !')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erreur lors de la récupération')
    } finally {
      setScraping(false)
    }
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
        <h2 className="text-2xl font-accent font-bold text-foreground uppercase tracking-wide">Articles de presse</h2>
        <Button onClick={openCreate} className="gradient-lime text-accent-foreground font-accent font-bold">
          <Plus className="w-4 h-4 mr-2" /> Nouvel article
        </Button>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground w-12">#</TableHead>
              <TableHead className="text-muted-foreground">Source</TableHead>
              <TableHead className="text-muted-foreground">Titre</TableHead>
              <TableHead className="text-muted-foreground hidden md:table-cell">Auteur</TableHead>
              <TableHead className="text-muted-foreground hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-muted-foreground text-right w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 2 }).map((_, i) => (
                <TableRow key={i} className="border-border/50">
                  <TableCell colSpan={6}><div className="h-8 bg-secondary/30 rounded animate-pulse" /></TableCell>
                </TableRow>
              ))
            ) : articles.length === 0 ? (
              <TableRow className="border-border/50">
                <TableCell colSpan={6} className="text-center text-muted-foreground/60 py-8">Aucun article de presse</TableCell>
              </TableRow>
            ) : (
              articles.map((article) => (
                <TableRow
                  key={article.id}
                  className="border-border/50 hover:bg-secondary/20 cursor-pointer"
                  onClick={() => openEdit(article)}
                >
                  <TableCell className="text-muted-foreground/60 text-sm">{article.sort_order}</TableCell>
                  <TableCell className="text-campaign-lime font-medium text-sm">{article.source}</TableCell>
                  <TableCell className="text-foreground font-medium">
                    <span className="truncate max-w-[200px] inline-block">{article.title}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm hidden md:table-cell">{article.author}</TableCell>
                  <TableCell className="text-muted-foreground text-sm hidden sm:table-cell">{article.date}</TableCell>
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
                        {article.url && (
                          <DropdownMenuItem onClick={() => window.open(article.url, '_blank')}>
                            <ExternalLink className="w-4 h-4 mr-2" /> Ouvrir le lien
                          </DropdownMenuItem>
                        )}
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

      {/* Edit dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-card border-border text-foreground max-w-lg">
          <DialogHeader>
            <DialogTitle>{editId ? 'Modifier l\'article presse' : 'Nouvel article presse'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            {/* Auto-fetch from URL */}
            {!editId && (
              <div className="space-y-2 pb-4 border-b border-border/50">
                <Label className="text-foreground/80 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  Récupérer depuis une URL
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={scrapeUrl}
                    onChange={(e) => setScrapeUrl(e.target.value)}
                    className="bg-secondary/50 border-border text-foreground flex-1"
                    placeholder="https://www.laprovence.com/article/..."
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleScrape())}
                  />
                  <Button
                    type="button"
                    onClick={handleScrape}
                    disabled={scraping}
                    className="gradient-lime text-accent-foreground font-accent font-bold shrink-0"
                  >
                    {scraping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 mr-1.5" />}
                    {scraping ? 'Récupération...' : 'Récupérer'}
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground/50">Collez l&apos;URL de l&apos;article pour pré-remplir automatiquement les champs</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground/80">Source (média)</Label>
                <Input value={editData.source} onChange={(e) => setEditData({ ...editData, source: e.target.value })} className="bg-secondary/50 border-border text-foreground" placeholder="La Provence" />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground/80">Auteur</Label>
                <Input value={editData.author} onChange={(e) => setEditData({ ...editData, author: e.target.value })} className="bg-secondary/50 border-border text-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground/80">Titre</Label>
              <Input value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} className="bg-secondary/50 border-border text-foreground" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground/80">Date</Label>
                <Input value={editData.date} onChange={(e) => setEditData({ ...editData, date: e.target.value })} className="bg-secondary/50 border-border text-foreground" placeholder="25 Octobre 2025" />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground/80">Ordre</Label>
                <Input type="number" value={editData.sort_order} onChange={(e) => setEditData({ ...editData, sort_order: parseInt(e.target.value) || 0 })} className="bg-secondary/50 border-border text-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-foreground/80">Extrait</Label>
              <Textarea value={editData.excerpt} onChange={(e) => setEditData({ ...editData, excerpt: e.target.value })} className="bg-secondary/50 border-border text-foreground min-h-[80px]" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground/80">URL de l&apos;article</Label>
              <Input value={editData.url} onChange={(e) => setEditData({ ...editData, url: e.target.value })} className="bg-secondary/50 border-border text-foreground" placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground/80">Logo du média</Label>
              <ImageUpload
                value={editData.logo}
                onChange={(url) => setEditData({ ...editData, logo: url })}
              />
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
            <AlertDialogTitle className="text-foreground">Supprimer cet article presse ?</AlertDialogTitle>
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
