'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { SeoPage } from '@/lib/types/database'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import { Pencil, Loader2, Search, Globe, FileText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

export default function SeoPage() {
  const [pages, setPages] = useState<SeoPage[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editData, setEditData] = useState<SeoPage | null>(null)
  const supabase = createClient()

  const fetchPages = useCallback(async () => {
    const { data } = await supabase.from('seo_pages').select('*').order('path')
    setPages((data as SeoPage[]) || [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchPages() }, [fetchPages])

  const openEdit = (page: SeoPage) => {
    setEditData({ ...page })
    setEditOpen(true)
  }

  const handleSave = async () => {
    if (!editData) return
    setSaving(true)
    await supabase.from('seo_pages').update({
      title: editData.title,
      description: editData.description,
      keywords: editData.keywords,
      og_image: editData.og_image,
    }).eq('id', editData.id)
    toast.success('SEO mis à jour')
    setSaving(false)
    setEditOpen(false)
    fetchPages()
  }

  const pageLabels: Record<string, string> = {
    '/': 'Accueil',
    '/candidat': 'Le Candidat',
    '/programme': 'Programme',
    '/actualites': 'Actualités',
    '/equipe': 'Équipe',
    '/presse': 'Presse',
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">SEO & Meta</h2>
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 bg-slate-800/50 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">SEO & Meta</h2>
          <p className="text-sm text-slate-400 mt-1">Gérez les balises meta de chaque page du site</p>
        </div>
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-teal-400" />
          <span className="text-sm text-slate-400">{pages.length} pages</span>
        </div>
      </div>

      <div className="space-y-3">
        {pages.map((page) => (
          <Card key={page.id} className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/80 transition-colors group">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-teal-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-white text-sm">{pageLabels[page.path] || page.path}</p>
                      <Badge variant="outline" className="text-[10px] text-slate-500 border-slate-700">{page.path}</Badge>
                    </div>
                    <p className="text-sm text-teal-400 font-medium truncate">{page.title || '(pas de titre)'}</p>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{page.description || '(pas de description)'}</p>
                    {page.keywords && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {page.keywords.split(',').slice(0, 4).map((kw, i) => (
                          <span key={i} className="text-[10px] bg-slate-700/50 text-slate-400 px-1.5 py-0.5 rounded">{kw.trim()}</span>
                        ))}
                        {page.keywords.split(',').length > 4 && (
                          <span className="text-[10px] text-slate-600">+{page.keywords.split(',').length - 4}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => openEdit(page)}>
                  <Pencil className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-400" />
              SEO — {editData && (pageLabels[editData.path] || editData.path)}
            </DialogTitle>
          </DialogHeader>
          {editData && (
            <div className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label className="text-slate-300">Meta Title</Label>
                <Input
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white"
                />
                <p className="text-[10px] text-slate-600">{editData.title.length}/60 caractères (recommandé: 50-60)</p>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Meta Description</Label>
                <Textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white min-h-[80px]"
                />
                <p className="text-[10px] text-slate-600">{editData.description.length}/160 caractères (recommandé: 120-160)</p>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Mots-clés (séparés par des virgules)</Label>
                <Textarea
                  value={editData.keywords}
                  onChange={(e) => setEditData({ ...editData, keywords: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white min-h-[60px]"
                  placeholder="mot-clé 1, mot-clé 2, mot-clé 3"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Image OpenGraph</Label>
                <Input
                  value={editData.og_image}
                  onChange={(e) => setEditData({ ...editData, og_image: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white"
                  placeholder="/images/candidat-banner.png"
                />
              </div>

              {/* Preview */}
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/50 space-y-1">
                <p className="text-xs text-slate-600 mb-2 font-medium">Aperçu Google</p>
                <p className="text-blue-400 text-sm font-medium truncate">{editData.title || 'Titre de la page'}</p>
                <p className="text-xs text-emerald-400 truncate">morateur2026.fr{editData.path}</p>
                <p className="text-xs text-slate-400 line-clamp-2">{editData.description || 'Description de la page...'}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)} className="border-slate-600 text-slate-300 hover:bg-slate-700">Annuler</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-teal-600 hover:bg-teal-500 text-white">
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
