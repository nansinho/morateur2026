'use client'

import { useState } from 'react'
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
import { ArrowLeft, Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

const TAGS = ['Événement', 'Terrain', 'Programme', 'Tribune']

export default function ArticleNewPage() {
  const router = useRouter()
  const supabase = createClient()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '',
    date: '',
    image: '',
    image_alt: '',
    tag: 'Événement',
    description: '',
    sort_order: 0,
  })

  const handleSave = async () => {
    if (!form.title || !form.date) {
      toast.error('Le titre et la date sont obligatoires')
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
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-secondary/30 border-border text-foreground text-base"
                placeholder="Titre de l'article"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground/80 font-medium">Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="bg-secondary/30 border-border text-foreground min-h-[200px]"
                placeholder="Description de l'article..."
              />
            </div>
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
        </div>
      </div>
    </div>
  )
}
