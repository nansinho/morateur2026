'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { ImageUpload } from '@/components/ui/image-upload'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { ArrowLeft, Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

const TAGS = ['Événement', 'Terrain', 'Programme', 'Tribune']

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

export default function ArticleNewPage() {
  const router = useRouter()
  const supabase = createClient()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    date: '',
    image: '',
    image_alt: '',
    tag: 'Événement',
    description: '',
    content: '',
    meta_description: '',
    meta_keywords: '',
    sort_order: 0,
  })

  const handleTitleChange = useCallback((title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: prev.slug === '' || prev.slug === generateSlug(prev.title) ? generateSlug(title) : prev.slug,
    }))
  }, [])

  const handleSave = async () => {
    if (!form.title || !form.date) {
      toast.error('Le titre et la date sont obligatoires')
      return
    }
    if (!form.slug) {
      toast.error('Le slug est obligatoire')
      return
    }
    setSaving(true)
    const { error } = await supabase.from('articles').insert(form)
    if (error) {
      toast.error('Erreur lors de la création')
    } else {
      toast.success('Article créé')
      router.push('/admin/articles')
    }
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Link href="/admin/articles">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h2 className="text-xl font-bold text-foreground font-accent uppercase tracking-wide">
            Nouvel article
          </h2>
        </div>
        <Button onClick={handleSave} disabled={saving} className="gradient-lime text-accent-foreground font-accent font-bold">
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Créer l&apos;article
        </Button>
      </div>

      {/* Form — 2 columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column (2/3) */}
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-xl border border-border/40 bg-card p-5 space-y-5">
            <div className="space-y-2">
              <Label className="text-foreground/80 font-medium">Titre</Label>
              <Input
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="bg-secondary/30 border-border text-foreground text-base"
                placeholder="Titre de l'article"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground/80 font-medium">Slug (URL)</Label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground whitespace-nowrap">/actualites/</span>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="bg-secondary/30 border-border text-foreground text-sm"
                  placeholder="mon-article"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground/80 font-medium">Description (extrait)</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="bg-secondary/30 border-border text-foreground min-h-[80px]"
                placeholder="Résumé court de l'article pour les cartes et le SEO..."
                rows={3}
              />
            </div>
          </div>

          {/* Rich text editor */}
          <div className="space-y-2">
            <Label className="text-foreground/80 font-medium">Contenu de l&apos;article</Label>
            <RichTextEditor
              content={form.content}
              onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
              placeholder="Rédigez le contenu complet de votre article ici..."
            />
          </div>
        </div>

        {/* Right column (1/3) */}
        <div className="space-y-5">
          {/* Image upload */}
          <div className="rounded-xl border border-border/40 bg-card p-5 space-y-4">
            <Label className="text-foreground/80 font-medium">Image</Label>
            <ImageUpload
              value={form.image}
              alt={form.image_alt}
              onChangeUrl={(url) => setForm({ ...form, image: url })}
              onChangeAlt={(alt) => setForm({ ...form, image_alt: alt })}
            />
          </div>

          {/* Metadata */}
          <div className="rounded-xl border border-border/40 bg-card p-5 space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground/80 font-medium">Tag</Label>
              <Select value={form.tag} onValueChange={(v) => setForm({ ...form, tag: v })}>
                <SelectTrigger className="bg-secondary/30 border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {TAGS.map((t) => (
                    <SelectItem key={t} value={t} className="text-foreground">{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground/80 font-medium">Date</Label>
              <Input
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="bg-secondary/30 border-border text-foreground"
                placeholder="15 Janvier 2026"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground/80 font-medium">Ordre d&apos;affichage</Label>
              <Input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                className="bg-secondary/30 border-border text-foreground w-24"
              />
            </div>
          </div>

          {/* SEO */}
          <div className="rounded-xl border border-border/40 bg-card p-5 space-y-4">
            <h3 className="text-sm font-bold text-foreground/70 uppercase tracking-wide">SEO</h3>
            <div className="space-y-2">
              <Label className="text-foreground/80 font-medium text-xs">Méta-description</Label>
              <Textarea
                value={form.meta_description}
                onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                className="bg-secondary/30 border-border text-foreground text-xs min-h-[60px]"
                placeholder="Description pour les moteurs de recherche..."
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground/80 font-medium text-xs">Mots-clés</Label>
              <Input
                value={form.meta_keywords}
                onChange={(e) => setForm({ ...form, meta_keywords: e.target.value })}
                className="bg-secondary/30 border-border text-foreground text-xs"
                placeholder="mot-clé 1, mot-clé 2, ..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
