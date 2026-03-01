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
        <h2 className="text-2xl font-accent font-bold text-foreground uppercase tracking-wide">SEO & Meta</h2>
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 bg-card/50 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-accent font-bold text-foreground uppercase tracking-wide">SEO & Meta</h2>
          <p className="text-sm text-muted-foreground mt-1">Gérez les balises meta de chaque page du site</p>
        </div>
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-campaign-lime" />
          <span className="text-sm text-muted-foreground">{pages.length} pages</span>
        </div>
      </div>

      <div className="space-y-3">
        {pages.map((page) => (
          <Card key={page.id} className="bg-card/50 border-border/50 hover:bg-card/80 transition-colors group">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5 text-campaign-lime" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-foreground text-sm">{pageLabels[page.path] || page.path}</p>
                      <Badge variant="outline" className="text-[10px] text-muted-foreground/60 border-border">{page.path}</Badge>
                    </div>
                    <p className="text-sm text-campaign-lime font-medium truncate">{page.title || '(pas de titre)'}</p>
                    <p className="text-xs text-muted-foreground/60 mt-1 line-clamp-2">{page.description || '(pas de description)'}</p>
                    {page.keywords && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {page.keywords.split(',').slice(0, 4).map((kw, i) => (
                          <span key={i} className="text-[10px] bg-secondary/50 text-muted-foreground px-1.5 py-0.5 rounded">{kw.trim()}</span>
                        ))}
                        {page.keywords.split(',').length > 4 && (
                          <span className="text-[10px] text-muted-foreground/40">+{page.keywords.split(',').length - 4}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => openEdit(page)}>
                  <Pencil className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-card border-border text-foreground max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-campaign-lime" />
              SEO — {editData && (pageLabels[editData.path] || editData.path)}
            </DialogTitle>
          </DialogHeader>
          {editData && (
            <div className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label className="text-foreground/80">Meta Title</Label>
                <Input
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="bg-secondary/50 border-border text-foreground"
                />
                <p className="text-[10px] text-muted-foreground/40">{editData.title.length}/60 caractères (recommandé: 50-60)</p>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground/80">Meta Description</Label>
                <Textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  className="bg-secondary/50 border-border text-foreground min-h-[80px]"
                />
                <p className="text-[10px] text-muted-foreground/40">{editData.description.length}/160 caractères (recommandé: 120-160)</p>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground/80">Mots-clés (séparés par des virgules)</Label>
                <Textarea
                  value={editData.keywords}
                  onChange={(e) => setEditData({ ...editData, keywords: e.target.value })}
                  className="bg-secondary/50 border-border text-foreground min-h-[60px]"
                  placeholder="mot-clé 1, mot-clé 2, mot-clé 3"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground/80">Image OpenGraph</Label>
                <Input
                  value={editData.og_image}
                  onChange={(e) => setEditData({ ...editData, og_image: e.target.value })}
                  className="bg-secondary/50 border-border text-foreground"
                  placeholder="/images/candidat-banner.png"
                />
              </div>

              {/* Preview */}
              <div className="p-4 rounded-lg bg-background/50 border border-border/50 space-y-1">
                <p className="text-xs text-muted-foreground/40 mb-2 font-medium">Aperçu Google</p>
                <p className="text-campaign-lime text-sm font-medium truncate">{editData.title || 'Titre de la page'}</p>
                <p className="text-xs text-campaign-lime truncate">morateur2026.fr{editData.path}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{editData.description || 'Description de la page...'}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)} className="border-border text-foreground/80 hover:bg-secondary">Annuler</Button>
            <Button onClick={handleSave} disabled={saving} className="gradient-lime text-accent-foreground font-accent font-bold">
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
