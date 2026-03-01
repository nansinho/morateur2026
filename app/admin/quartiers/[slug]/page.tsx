'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Quartier, QuartierQuestion } from '@/lib/types/database'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, ArrowUp, ArrowDown, Plus, Trash2, Save, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter, useParams } from 'next/navigation'

interface EditableQuestion {
  id?: string
  question_number: number
  question_text: string
  question_image_url: string
  is_new?: boolean
  is_deleted?: boolean
}

export default function QuartierEditPage() {
  const [quartier, setQuartier] = useState<Quartier | null>(null)
  const [questions, setQuestions] = useState<EditableQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', slug: '', description: '', is_active: true, display_order: 0 })
  const supabase = createClient()
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const fetchData = useCallback(async () => {
    const { data: q } = await supabase
      .from('quartiers')
      .select('*')
      .eq('slug', slug)
      .single()

    if (q) {
      const quartierData = q as Quartier
      setQuartier(quartierData)
      setForm({
        name: quartierData.name,
        slug: quartierData.slug,
        description: quartierData.description,
        is_active: quartierData.is_active,
        display_order: quartierData.display_order,
      })

      const { data: questions } = await supabase
        .from('quartier_questions')
        .select('*')
        .eq('quartier_id', quartierData.id)
        .order('question_number')

      setQuestions(
        ((questions as QuartierQuestion[]) || []).map((q) => ({
          id: q.id,
          question_number: q.question_number,
          question_text: q.question_text,
          question_image_url: q.question_image_url,
        }))
      )
    }
    setLoading(false)
  }, [supabase, slug])

  useEffect(() => { fetchData() }, [fetchData])

  const moveQuestion = (index: number, direction: -1 | 1) => {
    const newIdx = index + direction
    if (newIdx < 0 || newIdx >= questions.filter(q => !q.is_deleted).length) return
    const visible = questions.filter(q => !q.is_deleted)
    const temp = visible[index]
    visible[index] = visible[newIdx]
    visible[newIdx] = temp
    // Renumber
    visible.forEach((q, i) => { q.question_number = i + 1 })
    const deleted = questions.filter(q => q.is_deleted)
    setQuestions([...visible, ...deleted])
  }

  const addQuestion = () => {
    const visible = questions.filter(q => !q.is_deleted)
    setQuestions([
      ...questions,
      {
        question_number: visible.length + 1,
        question_text: '',
        question_image_url: '',
        is_new: true,
      },
    ])
  }

  const removeQuestion = (index: number) => {
    const visible = questions.filter(q => !q.is_deleted)
    const target = visible[index]
    if (target.is_new) {
      // Just remove from array
      setQuestions(questions.filter(q => q !== target))
    } else {
      target.is_deleted = true
      setQuestions([...questions])
    }
    // Renumber visible
    const newVisible = questions.filter(q => !q.is_deleted && q !== target)
    newVisible.forEach((q, i) => { q.question_number = i + 1 })
    setQuestions([...newVisible, ...questions.filter(q => q.is_deleted)])
  }

  const updateQuestion = (index: number, field: 'question_text' | 'question_image_url', value: string) => {
    const visible = questions.filter(q => !q.is_deleted)
    visible[index] = { ...visible[index], [field]: value }
    const deleted = questions.filter(q => q.is_deleted)
    setQuestions([...visible, ...deleted])
  }

  const handleSave = async () => {
    if (!quartier || !form.name.trim()) return
    setSaving(true)

    // Update quartier
    const { error: qError } = await supabase
      .from('quartiers')
      .update({
        name: form.name.trim(),
        slug: form.slug.trim(),
        description: form.description.trim(),
        is_active: form.is_active,
        display_order: form.display_order,
      })
      .eq('id', quartier.id)

    if (qError) {
      toast.error(qError.message.includes('unique') ? 'Ce slug existe déjà' : 'Erreur lors de la mise à jour')
      setSaving(false)
      return
    }

    // Delete removed questions
    const deleted = questions.filter(q => q.is_deleted && q.id)
    for (const q of deleted) {
      await supabase.from('quartier_questions').delete().eq('id', q.id!)
    }

    // Upsert remaining questions
    const visible = questions.filter(q => !q.is_deleted)
    for (const q of visible) {
      if (q.id) {
        await supabase.from('quartier_questions').update({
          question_number: q.question_number,
          question_text: q.question_text,
          question_image_url: q.question_image_url,
        }).eq('id', q.id)
      } else {
        await supabase.from('quartier_questions').insert({
          quartier_id: quartier.id,
          question_number: q.question_number,
          question_text: q.question_text,
          question_image_url: q.question_image_url,
        })
      }
    }

    toast.success('Quartier mis à jour')
    // If slug changed, redirect
    if (form.slug !== slug) {
      router.push(`/admin/quartiers/${form.slug}`)
    } else {
      fetchData()
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-secondary/30 rounded animate-pulse" />
        <div className="h-64 bg-secondary/30 rounded-2xl animate-pulse" />
      </div>
    )
  }

  if (!quartier) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground/60">Quartier introuvable</p>
        <Button variant="ghost" className="mt-4" onClick={() => router.push('/admin/quartiers')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Retour
        </Button>
      </div>
    )
  }

  const visibleQuestions = questions.filter(q => !q.is_deleted)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={() => router.push('/admin/quartiers')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold text-foreground font-accent uppercase tracking-wide">
          {quartier.name}
        </h2>
      </div>

      {/* Quartier info */}
      <Card className="border-border/50 bg-card/30">
        <CardHeader>
          <CardTitle className="text-foreground">Informations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="text-foreground/80">Nom</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-secondary/50 border-border text-foreground"
              />
            </div>
            <div>
              <Label className="text-foreground/80">Slug</Label>
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="bg-secondary/50 border-border text-foreground"
              />
            </div>
          </div>
          <div>
            <Label className="text-foreground/80">Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="bg-secondary/50 border-border text-foreground"
            />
          </div>
          <div className="flex items-center gap-4">
            <div>
              <Label className="text-foreground/80">Ordre d&apos;affichage</Label>
              <Input
                type="number"
                value={form.display_order}
                onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
                className="bg-secondary/50 border-border text-foreground w-24"
              />
            </div>
            <div className="flex items-center gap-2 mt-6">
              <Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
              <Label className="text-foreground/80">Actif</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      <Card className="border-border/50 bg-card/30">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-foreground">Questions ({visibleQuestions.length})</CardTitle>
          <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-secondary/50" onClick={addQuestion}>
            <Plus className="w-4 h-4 mr-1" /> Ajouter
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {visibleQuestions.length === 0 ? (
            <p className="text-muted-foreground/60 text-sm text-center py-4">Aucune question</p>
          ) : (
            visibleQuestions.map((q, i) => (
              <div key={q.id || `new-${i}`} className="p-4 rounded-xl bg-secondary/30 border border-border/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">Q{q.question_number}</span>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => moveQuestion(i, -1)} disabled={i === 0}>
                      <ArrowUp className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => moveQuestion(i, 1)} disabled={i === visibleQuestions.length - 1}>
                      <ArrowDown className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => removeQuestion(i)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={q.question_text}
                  onChange={(e) => updateQuestion(i, 'question_text', e.target.value)}
                  placeholder="Texte de la question..."
                  className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground/50 min-h-[80px]"
                />
                <div>
                  <Label className="text-foreground/60 text-xs">URL image (optionnel)</Label>
                  <Input
                    value={q.question_image_url}
                    onChange={(e) => updateQuestion(i, 'question_image_url', e.target.value)}
                    placeholder="https://..."
                    className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} className="gradient-lime text-accent-foreground font-semibold">
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Enregistrer
        </Button>
      </div>
    </div>
  )
}
