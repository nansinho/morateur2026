'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { ProgrammePillar, ProgrammeMeasure } from '@/lib/types/database'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
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
import { Plus, Pencil, Trash2, Loader2, MoreHorizontal, ArrowLeft, BookOpen } from 'lucide-react'
import { toast } from 'sonner'

export default function ProgrammePage() {
  const [pillars, setPillars] = useState<(ProgrammePillar & { measures: ProgrammeMeasure[] })[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  // Navigation: null = liste, string = détail du pilier
  const [selectedPillarId, setSelectedPillarId] = useState<string | null>(null)

  const [pillarEditOpen, setPillarEditOpen] = useState(false)
  const [pillarEditId, setPillarEditId] = useState<string | null>(null)
  const [pillarData, setPillarData] = useState({ title: '', intro: '', icon: 'ShieldCheck', color: 'border-campaign-lime/30', icon_bg: 'gradient-lime', sort_order: 0 })
  const [deletePillarId, setDeletePillarId] = useState<string | null>(null)

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

  const selectedPillar = pillars.find(p => p.id === selectedPillarId) || null

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
    setSaving(false); setPillarEditOpen(false); fetchPillars()
  }
  const deletePillar = async () => {
    if (!deletePillarId) return
    await supabase.from('programme_pillars').delete().eq('id', deletePillarId)
    if (selectedPillarId === deletePillarId) setSelectedPillarId(null)
    toast.success('Pilier supprimé'); setDeletePillarId(null); fetchPillars()
  }

  // Measure CRUD
  const openMeasureCreate = (pillarId: string) => {
    setMeasureEditId(null); setMeasurePillarId(pillarId)
    const pillar = pillars.find(p => p.id === pillarId)
    setMeasureData({ title: '', detail: '', sort_order: (pillar?.measures.length || 0) + 1 })
    setMeasureEditOpen(true)
  }
  const openMeasureEdit = (m: ProgrammeMeasure) => {
    setMeasureEditId(m.id); setMeasurePillarId(m.pillar_id)
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
    setSaving(false); setMeasureEditOpen(false); fetchPillars()
  }
  const deleteMeasure = async () => {
    if (!deleteMeasureId) return
    await supabase.from('programme_measures').delete().eq('id', deleteMeasureId)
    toast.success('Mesure supprimée'); setDeleteMeasureId(null); fetchPillars()
  }

  // ─── VUE DÉTAIL D'UN PILIER ───
  if (selectedPillar) {
    return (
      <div className="space-y-6">
        {/* Header avec retour */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => setSelectedPillarId(null)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-accent font-bold text-foreground uppercase tracking-wide truncate">{selectedPillar.title}</h2>
            <p className="text-sm text-muted-foreground/60 mt-0.5">Pilier {selectedPillar.sort_order} — {selectedPillar.measures.length} mesure(s)</p>
          </div>
        </div>

        {/* Bloc récap pilier */}
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1 min-w-0">
                <p className="text-sm text-foreground/90">{selectedPillar.intro}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] text-muted-foreground/60 bg-secondary/50 px-2 py-0.5 rounded">Icône : {selectedPillar.icon}</span>
                  <span className="text-[10px] text-muted-foreground/60 bg-secondary/50 px-2 py-0.5 rounded">Couleur : {selectedPillar.color}</span>
                  <span className="text-[10px] text-muted-foreground/60 bg-secondary/50 px-2 py-0.5 rounded">Fond : {selectedPillar.icon_bg}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-border text-foreground/80 hover:bg-secondary flex-shrink-0" onClick={() => openPillarEdit(selectedPillar)}>
                <Pencil className="w-3.5 h-3.5 mr-1.5" /> Modifier
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table des mesures */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-accent font-semibold text-foreground">Mesures</h3>
          <Button onClick={() => openMeasureCreate(selectedPillar.id)} className="gradient-lime text-accent-foreground font-accent font-bold">
            <Plus className="w-4 h-4 mr-2" /> Nouvelle mesure
          </Button>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card/30 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-muted-foreground w-12">#</TableHead>
                <TableHead className="text-muted-foreground">Titre</TableHead>
                <TableHead className="text-muted-foreground hidden md:table-cell">Détail</TableHead>
                <TableHead className="text-muted-foreground text-right w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedPillar.measures.length === 0 ? (
                <TableRow className="border-border/50">
                  <TableCell colSpan={4} className="text-center text-muted-foreground/60 py-8">
                    Aucune mesure — ajoutez la première !
                  </TableCell>
                </TableRow>
              ) : (
                selectedPillar.measures.map((measure) => (
                  <TableRow
                    key={measure.id}
                    className="border-border/50 hover:bg-secondary/20 cursor-pointer"
                    onClick={() => openMeasureEdit(measure)}
                  >
                    <TableCell className="text-muted-foreground/60 text-sm">{measure.sort_order}</TableCell>
                    <TableCell className="text-foreground font-medium">{measure.title}</TableCell>
                    <TableCell className="text-muted-foreground text-sm hidden md:table-cell max-w-xs truncate">{measure.detail}</TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-card border-border">
                          <DropdownMenuItem onClick={() => openMeasureEdit(measure)}>
                            <Pencil className="w-4 h-4 mr-2" /> Modifier
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setDeleteMeasureId(measure.id)}>
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

        {/* Dialogs */}
        {renderPillarDialog()}
        {renderMeasureDialog()}
        {renderDeletePillarDialog()}
        {renderDeleteMeasureDialog()}
      </div>
    )
  }

  // ─── VUE LISTE DES PILIERS ───
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-accent font-bold text-foreground uppercase tracking-wide">Programme</h2>
        <Button onClick={openPillarCreate} className="gradient-lime text-accent-foreground font-accent font-bold">
          <Plus className="w-4 h-4 mr-2" /> Nouveau pilier
        </Button>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/30 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="text-muted-foreground w-12">#</TableHead>
              <TableHead className="text-muted-foreground">Titre</TableHead>
              <TableHead className="text-muted-foreground hidden sm:table-cell">Mesures</TableHead>
              <TableHead className="text-muted-foreground text-right w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="border-border/50">
                  <TableCell colSpan={4}><div className="h-8 bg-secondary/30 rounded animate-pulse" /></TableCell>
                </TableRow>
              ))
            ) : pillars.length === 0 ? (
              <TableRow className="border-border/50">
                <TableCell colSpan={4} className="text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <BookOpen className="w-8 h-8 text-muted-foreground/30" />
                    <p className="text-muted-foreground/60">Aucun pilier dans le programme</p>
                    <Button onClick={openPillarCreate} variant="outline" className="border-border text-foreground/80 hover:bg-secondary">
                      <Plus className="w-4 h-4 mr-2" /> Créer le premier pilier
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              pillars.map((pillar) => (
                <TableRow
                  key={pillar.id}
                  className="border-border/50 hover:bg-secondary/20 cursor-pointer"
                  onClick={() => setSelectedPillarId(pillar.id)}
                >
                  <TableCell className="text-muted-foreground/60 text-sm">{pillar.sort_order}</TableCell>
                  <TableCell>
                    <p className="text-foreground font-medium">{pillar.title}</p>
                    <p className="text-xs text-muted-foreground/50 mt-0.5 line-clamp-1 hidden sm:block">{pillar.intro}</p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="secondary" className="text-[11px] bg-secondary/60 text-muted-foreground border-0">
                      {pillar.measures.length} mesure{pillar.measures.length !== 1 ? 's' : ''}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem onClick={() => openPillarEdit(pillar)}>
                          <Pencil className="w-4 h-4 mr-2" /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => setDeletePillarId(pillar.id)}>
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

      {/* Dialogs */}
      {renderPillarDialog()}
      {renderMeasureDialog()}
      {renderDeletePillarDialog()}
      {renderDeleteMeasureDialog()}
    </div>
  )

  // ─── DIALOGS ───

  function renderPillarDialog() {
    return (
      <Dialog open={pillarEditOpen} onOpenChange={setPillarEditOpen}>
        <DialogContent className="bg-card border-border text-foreground max-w-lg">
          <DialogHeader><DialogTitle>{pillarEditId ? 'Modifier le pilier' : 'Nouveau pilier'}</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label className="text-foreground/80">Titre</Label>
              <Input value={pillarData.title} onChange={(e) => setPillarData({ ...pillarData, title: e.target.value })} className="bg-secondary/50 border-border text-foreground" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground/80">Introduction</Label>
              <Textarea value={pillarData.intro} onChange={(e) => setPillarData({ ...pillarData, intro: e.target.value })} className="bg-secondary/50 border-border text-foreground min-h-[80px]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground/80">Icône (Lucide)</Label>
                <Input value={pillarData.icon} onChange={(e) => setPillarData({ ...pillarData, icon: e.target.value })} className="bg-secondary/50 border-border text-foreground" placeholder="ShieldCheck" />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground/80">Ordre</Label>
                <Input type="number" value={pillarData.sort_order} onChange={(e) => setPillarData({ ...pillarData, sort_order: parseInt(e.target.value) || 0 })} className="bg-secondary/50 border-border text-foreground" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground/80">Couleur bordure</Label>
                <Input value={pillarData.color} onChange={(e) => setPillarData({ ...pillarData, color: e.target.value })} className="bg-secondary/50 border-border text-foreground" placeholder="border-campaign-lime/30" />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground/80">Fond icône</Label>
                <Input value={pillarData.icon_bg} onChange={(e) => setPillarData({ ...pillarData, icon_bg: e.target.value })} className="bg-secondary/50 border-border text-foreground" placeholder="gradient-lime" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPillarEditOpen(false)} className="border-border text-foreground/80 hover:bg-secondary">Annuler</Button>
            <Button onClick={savePillar} disabled={saving} className="gradient-lime text-accent-foreground font-accent font-bold">
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {pillarEditId ? 'Modifier' : 'Créer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  function renderMeasureDialog() {
    return (
      <Dialog open={measureEditOpen} onOpenChange={setMeasureEditOpen}>
        <DialogContent className="bg-card border-border text-foreground max-w-lg">
          <DialogHeader><DialogTitle>{measureEditId ? 'Modifier la mesure' : 'Nouvelle mesure'}</DialogTitle></DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label className="text-foreground/80">Titre</Label>
              <Input value={measureData.title} onChange={(e) => setMeasureData({ ...measureData, title: e.target.value })} className="bg-secondary/50 border-border text-foreground" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground/80">Détail</Label>
              <Textarea value={measureData.detail} onChange={(e) => setMeasureData({ ...measureData, detail: e.target.value })} className="bg-secondary/50 border-border text-foreground min-h-[120px]" />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground/80">Ordre</Label>
              <Input type="number" value={measureData.sort_order} onChange={(e) => setMeasureData({ ...measureData, sort_order: parseInt(e.target.value) || 0 })} className="bg-secondary/50 border-border text-foreground w-24" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMeasureEditOpen(false)} className="border-border text-foreground/80 hover:bg-secondary">Annuler</Button>
            <Button onClick={saveMeasure} disabled={saving} className="gradient-lime text-accent-foreground font-accent font-bold">
              {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {measureEditId ? 'Modifier' : 'Créer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  function renderDeletePillarDialog() {
    return (
      <AlertDialog open={!!deletePillarId} onOpenChange={(open) => !open && setDeletePillarId(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Supprimer ce pilier ?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">Toutes les mesures associées seront aussi supprimées. Cette action est irréversible.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-secondary text-foreground border-border hover:bg-secondary/80">Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={deletePillar} className="bg-destructive hover:bg-destructive/90 text-foreground">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  function renderDeleteMeasureDialog() {
    return (
      <AlertDialog open={!!deleteMeasureId} onOpenChange={(open) => !open && setDeleteMeasureId(null)}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Supprimer cette mesure ?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">Cette action est irréversible.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-secondary text-foreground border-border hover:bg-secondary/80">Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={deleteMeasure} className="bg-destructive hover:bg-destructive/90 text-foreground">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
}
