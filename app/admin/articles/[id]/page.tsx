'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Article } from '@/lib/types/database'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { ImageUpload } from '@/components/ui/image-upload'
import { RichTextEditor } from '@/components/ui/rich-text-editor'
import { ArrowLeft, Trash2, Loader2, Save, ExternalLink } from 'lucide-react'
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

export default function ArticleEditPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
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

  const fetchArticle = useCallback(async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      toast.error('Article introuvable')
      router.push('/admin/articles')
      return
    }

    const article = data as Article
    setForm({
      title: article.title,
      slug: article.slug || '',
      date: article.date,
      image: article.image,
      image_alt: article.image_alt || '',
      tag: article.tag,
      description: article.description,
      content: article.content || '',
      meta_description: article.meta_description || '',
      meta_keywords: article.meta_keywords || '',
      sort_order: article.sort_order,
    })
    setLoading(false)
  }, [supabase, id, router])

  useEffect(() => { fetchArticle() }, [fetchArticle])

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
    setSaving(true)
    const { error } = await supabase.from('articles').update(form).eq('id', id)
    if (error) {
      toast.error('Erreur lors de la sauvegarde')
    } else {
      toast.success('Article modifié')
      router.push('/admin/articles')
    }
    setSaving(false)
  }

  const handleDelete = async () => {
    await supabase.from('articles').delete().eq('id', id)
    toast.success('Article supprimé')
    router.push('/admin/articles')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    )
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
            Modifier l&apos;article
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {form.slug && (
            <Link href={`/actualites/${form.slug}`} target="_blank">
              <Button variant="outline" className="border-border text-foreground hover:bg-secondary/50">
                <ExternalLink className="w-4 h-4 mr-2" /> Voir
              </Button>
            </Link>
          )}
          <Button
            variant="outline"
            onClick={() => setDeleteOpen(true)}
            className="border-destructive/30 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Supprimer
          </Button>
          <Button onClick={handleSave} disabled={saving} className="gradient-lime text-accent-foreground font-accent font-bold">
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Enregistrer
          </Button>
        </div>
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

      {/* Delete confirmation */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Supprimer cet article ?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-secondary text-foreground border-border hover:bg-secondary/80">
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
