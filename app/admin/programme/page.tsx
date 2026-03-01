'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { ProgrammePillar, ProgrammeMeasure } from '@/lib/types/database'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Plus, Pencil, Trash2, Loader2, GripVertical } from 'lucide-react'
import { toast } from 'sonner'

export default function ProgrammePage() {
  const [pillars, setPillars] = useState<(ProgrammePillar & { measures: ProgrammeMeasure[] })[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  // Pillar edit state
  const [pillarEditOpen, setPillarEditOpen] = useState(false)
  const [pillarEditId, setPillarEditId] = useState<string | null>(null)
  const [pillarData, setPillarData] = useState({ title: '', intro: '', icon: 'ShieldCheck', color: 'border-campaign-lime/30', icon_bg: 'gradient-lime', sort_order: 0 })
  const [deletePillarId, setDeletePillarId] = useState<string | null>(null)

  // Measure edit state
  const [measureEditOpen, setMeasureEditOpen] = useState(false)
  const [measureEditId, setMeasureEditId] = useState<string | null>(null)
  const [measurePillarId, setMeasurePillarId] = useState<string>('')
  const [measureData, setMeasureData] = useState({ title: '', detail: '', sort_order: 0 })
  const [deleteMeasureId, setDeleteMeasureId] = useState<string | null>(null)

  const fetchPillars = useCallback(async () => {
    const { data: pillarsData } = await supabase.from('programme_pillars').select('*').order('sort_order')
    const { data: measuresData } = await supabase.from('programme_measures').select('*').order('sort_order')

    const combined = (pillarsData || []).map((p: ProgrammePillar) => ({
      ...p,
      measures: (measuresData || []).filter((m: ProgrammeMeasure) => m.pillar_id === p.id),
    }))

    setPillars(combined)
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchPillars() }, [fetchPillars])

  // Pillar CRUD
  const openPillarCreate = () => {
    setPillarEditId(null)
    setPillarData({ title: '', intro: '', icon: 'ShieldCheck', color: 'border-campaign-lime/30', icon_bg: 'gradient-lime', sort_order: pillars.length + 1 })
    setPillarEditOpen(true)
  }

  const openPillarEdit = (p: ProgrammePillar) => {
    setPillarEditId(p.id)
    setPillarData({ title: p.title, intro: p.intro, icon: p.icon, color: p.color, icon_bg: p.icon_bg, sort_order: p.sort_order })
    setPillarEditOpen(true)
  }

  const savePillar = async () => {
    if (!pillarData.title) { toast.error('Le titre est obligatoire'); return }
    setSaving(true)
    if (pillarEditId) {
      await supabase.from('programme_pillars').update(pillarData).eq('id', pillarEditId)
      toast.success('Pilier modifié')
    } else {
      await supabase.from('programme_pillars').insert(pillarData)
      toast.success('Pilier créé')
    }
    setSaving(false)
    setPillarEditOpen(false)
    fetchPillars()
  }

  const deletePillar = async () => {
    if (!deletePillarId) return
    await supabase.from('programme_pillars').delete().eq('id', deletePillarId)
    toast.success('Pilier supprimé')
    setDeletePillarId(null)
    fetchPillars()
  }

  // Measure CRUD
  const openMeasureCreate = (pillarId: string) => {
    setMeasureEditId(null)
    setMeasurePillarId(pillarId)
    const pillar = pillars.find(p => p.id === pillarId)
    setMeasureData({ title: '', detail: '', sort_order: (pillar?.measures.length || 0) + 1 })
    setMeasureEditOpen(true)
  }

  const openMeasureEdit = (m: ProgrammeMeasure) => {
    setMeasureEditId(m.id)
    setMeasurePillarId(m.pillar_id)
    setMeasureData({ title: m.title, detail: m.detail, sort_order: m.sort_order })
    setMeasureEditOpen(true)
  }

  const saveMeasure = async () => {
    if (!measureData.title) { toast.error('Le titre est obligatoire'); return }
    setSaving(true)
    if (measureEditId) {
      await supabase.from('programme_measures').update(measureData).eq('id', measureEditId)
      toast.success('Mesure modifiée')
    } else {
      await supabase.from('programme_measures').insert({ ...measureData, pillar_id: measurePillarId })
      toast.success('Mesure créée')
    }
    setSaving(false)
    setMeasureEditOpen(false)
    fetchPillars()
  }

  const deleteMeasure = async () => {
    if (!deleteMeasureId) return
    await supabase.from('programme_measures').delete().eq('id', deleteMeasureId)
    toast.success('Mesure supprimée')
    setDeleteMeasureId(null)
    fetchPillars()
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Programme</h2>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 bg-slate-800/50 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Programme</h2>
        <Button onClick={openPillarCreate} className="bg-teal-600 hover:bg-teal-500 text-white">
          <Plus className="w-4 h-4 mr-2" /> Nouveau pilier
        </Button>
      </div>

      <div className="space-y-6">
        {pillars.map((pillar) => (
          <Card key={pillar.id} className="bg-slate-800/50 border-slate-700/50">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <GripVertical className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" />
                <div>
                  <CardTitle className="text-white text-lg">{pillar.title}</CardTitle>
                  <p className="text-sm text-slate-400 mt-1">{pillar.intro}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded">Icône: {pillar.icon}</span>
                    <span className="text-[10px] text-slate-500 bg-slate-700/50 px-2 py-0.5 rounded">Ordre: {pillar.sort_order}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white" onClick={() => openPillarEdit(pillar)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300" onClick={() => setDeletePillarId(pillar.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-slate-300">Mesures ({pillar.measures.length})</p>
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700 h-7 text-xs" onClick={() => openMeasureCreate(pillar.id)}>
                    <Plus className="w-3 h-3 mr-1" /> Ajouter
                  </Button>
                </div>
                {pillar.measures.map((measure) => (
                  <div key={measure.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors group">
                    <span className="text-xs text-slate-600 font-bold mt-0.5 w-6 text-right flex-shrink-0">{measure.sort_order}.</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{measure.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{measure.detail}</p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-white" onClick={() => openMeasureEdit(measure)}>
                        <Pencil className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400 hover:text-red-300" onClick={() => setDeleteMeasureId(measure.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pillar edit dialog */}
      <Dialog open={pillarEditOpen} onOpenChange={setPillarEditOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>{pillarEditId ? 'Modifier le pilier' : 'Nouveau pilier'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label className="text-slate-300">Titre</Label>
              <Input value={pillarData.title} onChange={(e) => setPillarData({ ...pillarData, title: e.target.value })} className="bg-slate-700/50 border-slate-600 text-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Introduction</Label>
              <Textarea value={pillarData.intro} onChange={(e) => setPillarData({ ...pillarData, intro: e.target.value })} className="bg-slate-700/50 border-slate-600 text-white min-h-[80px]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Icône (Lucide)</Label>
                <Input value={pillarData.icon} onChange={(e) => setPillarData({ ...pillarData, icon: e.target.value })} className="bg-slate-700/50 border-slate-600 text-white" placeholder="ShieldCheck" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Ordre</Label>
                <Input type="number" value={pillarData.sort_order} onChange={(e) => setPillarData({ ...pillarData, sort_order: parseInt(e.target.value) || 0 })} className="bg-slate-700/50 border-slate-600 text-white" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Couleur bordure</Label>
                <Input value={pillarData.color} onChange={(e) => setPillarData({ ...pillarData, color: e.target.value })} className="bg-slate-700/50 border-slate-600 text-white" placeholder="border-campaign-lime/30" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Fond icône</Label>
                <Input value={pillarData.icon_bg} onChange={(e) => setPillarData({ ...pillarData, icon_bg: e.target.value })} className="bg-slate-700/50 border-slate-600 text-white" placeholder="gradient-lime" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPillarEditOpen(false)} className="border-slate-600 text-slate-300 hover:bg-slate-700">Annuler</Button>
            <Button onClick={savePillar} disabled={saving} className="bg-teal-600 hover:bg-teal-500 text-white">
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {pillarEditId ? 'Modifier' : 'Créer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Measure edit dialog */}
      <Dialog open={measureEditOpen} onOpenChange={setMeasureEditOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>{measureEditId ? 'Modifier la mesure' : 'Nouvelle mesure'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label className="text-slate-300">Titre</Label>
              <Input value={measureData.title} onChange={(e) => setMeasureData({ ...measureData, title: e.target.value })} className="bg-slate-700/50 border-slate-600 text-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Détail</Label>
              <Textarea value={measureData.detail} onChange={(e) => setMeasureData({ ...measureData, detail: e.target.value })} className="bg-slate-700/50 border-slate-600 text-white min-h-[120px]" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Ordre</Label>
              <Input type="number" value={measureData.sort_order} onChange={(e) => setMeasureData({ ...measureData, sort_order: parseInt(e.target.value) || 0 })} className="bg-slate-700/50 border-slate-600 text-white w-24" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMeasureEditOpen(false)} className="border-slate-600 text-slate-300 hover:bg-slate-700">Annuler</Button>
            <Button onClick={saveMeasure} disabled={saving} className="bg-teal-600 hover:bg-teal-500 text-white">
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {measureEditId ? 'Modifier' : 'Créer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete pillar confirmation */}
      <AlertDialog open={!!deletePillarId} onOpenChange={(open) => !open && setDeletePillarId(null)}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Supprimer ce pilier ?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">Toutes les mesures associées seront aussi supprimées. Cette action est irréversible.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600">Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={deletePillar} className="bg-red-600 hover:bg-red-500 text-white">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete measure confirmation */}
      <AlertDialog open={!!deleteMeasureId} onOpenChange={(open) => !open && setDeleteMeasureId(null)}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Supprimer cette mesure ?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">Cette action est irréversible.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-white border-slate-600 hover:bg-slate-600">Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={deleteMeasure} className="bg-red-600 hover:bg-red-500 text-white">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
