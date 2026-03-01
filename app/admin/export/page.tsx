'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Quartier } from '@/lib/types/database'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function ExportPage() {
  const [quartiers, setQuartiers] = useState<Quartier[]>([])
  const [quartierFilter, setQuartierFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [exporting, setExporting] = useState(false)
  const supabase = createClient()

  const fetchQuartiers = useCallback(async () => {
    const { data } = await supabase.from('quartiers').select('*').order('display_order')
    setQuartiers((data as Quartier[]) || [])
  }, [supabase])

  useEffect(() => { fetchQuartiers() }, [fetchQuartiers])

  const handleExport = async () => {
    setExporting(true)
    try {
      // Fetch submissions
      let query = supabase
        .from('consultation_submissions')
        .select('*, quartiers(name)')
        .order('created_at', { ascending: false })

      if (quartierFilter !== 'all') query = query.eq('quartier_id', quartierFilter)
      if (statusFilter !== 'all') query = query.eq('status', statusFilter)
      if (dateFrom) query = query.gte('created_at', `${dateFrom}T00:00:00`)
      if (dateTo) query = query.lte('created_at', `${dateTo}T23:59:59`)

      const { data: submissions, error: subError } = await query
      if (subError) throw subError
      if (!submissions || submissions.length === 0) {
        toast.error('Aucune donnée à exporter')
        setExporting(false)
        return
      }

      // Fetch all answers for these submissions
      const submissionIds = submissions.map((s: { id: string }) => s.id)
      const { data: answers } = await supabase
        .from('consultation_answers')
        .select('*, quartier_questions(question_text, question_number)')
        .in('submission_id', submissionIds)

      // Build question columns (all unique questions, sorted by number)
      const questionMap = new Map<string, { text: string; number: number }>()
      if (answers) {
        for (const a of answers) {
          const q = (a as { quartier_questions?: { question_text: string; question_number: number } }).quartier_questions
          if (q) {
            questionMap.set(a.question_id, { text: q.question_text, number: q.question_number })
          }
        }
      }
      const sortedQuestions = [...questionMap.entries()].sort((a, b) => a[1].number - b[1].number)

      // Build CSV header
      const headers = [
        'Date', 'Quartier', 'Prénom', 'Nom', 'Email', 'Téléphone',
        'Statut', 'Réponse souhaitée', 'Rappel souhaité',
        ...sortedQuestions.map(([, q]) => `Q${q.number}`),
      ]

      // Build answer lookup: submission_id -> question_id -> answer_text
      const answerLookup = new Map<string, Map<string, string>>()
      if (answers) {
        for (const a of answers) {
          if (!answerLookup.has(a.submission_id)) {
            answerLookup.set(a.submission_id, new Map())
          }
          answerLookup.get(a.submission_id)!.set(a.question_id, a.answer_text)
        }
      }

      // Build rows
      const rows = submissions.map((s: {
        id: string
        created_at: string
        quartiers?: { name: string } | null
        first_name: string
        last_name: string
        email: string
        phone: string
        status: string
        wants_personal_response: boolean
        wants_callback: boolean
      }) => {
        const subAnswers = answerLookup.get(s.id) || new Map()
        return [
          new Date(s.created_at).toLocaleDateString('fr-FR'),
          (s.quartiers as { name: string } | null)?.name || '',
          s.first_name,
          s.last_name,
          s.email,
          s.phone || '',
          s.status,
          s.wants_personal_response ? 'Oui' : 'Non',
          s.wants_callback ? 'Oui' : 'Non',
          ...sortedQuestions.map(([qId]) => subAnswers.get(qId) || ''),
        ]
      })

      // Escape CSV values
      const escape = (val: string) => {
        if (val.includes(',') || val.includes('"') || val.includes('\n')) {
          return `"${val.replace(/"/g, '""')}"`
        }
        return val
      }

      const csv = [
        headers.map(escape).join(','),
        ...rows.map((row: string[]) => row.map(escape).join(',')),
      ].join('\n')

      // Download
      const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `consultations_${new Date().toISOString().slice(0, 10)}.csv`
      a.click()
      URL.revokeObjectURL(url)

      toast.success(`${submissions.length} soumission(s) exportée(s)`)
    } catch (err) {
      console.error('[EXPORT]', err)
      toast.error('Erreur lors de l\'export')
    }
    setExporting(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground font-accent uppercase tracking-wide">Export des consultations</h2>

      <Card className="border-border/50 bg-card/30">
        <CardHeader>
          <CardTitle className="text-foreground">Filtres</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label className="text-foreground/80">Quartier</Label>
              <Select value={quartierFilter} onValueChange={setQuartierFilter}>
                <SelectTrigger className="bg-secondary/50 border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all" className="text-foreground">Tous les quartiers</SelectItem>
                  {quartiers.map((q) => (
                    <SelectItem key={q.id} value={q.id} className="text-foreground">{q.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-foreground/80">Statut</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-secondary/50 border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all" className="text-foreground">Tous</SelectItem>
                  <SelectItem value="new" className="text-foreground">Nouveaux</SelectItem>
                  <SelectItem value="read" className="text-foreground">Lus</SelectItem>
                  <SelectItem value="replied" className="text-foreground">Répondus</SelectItem>
                  <SelectItem value="archived" className="text-foreground">Archivés</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-foreground/80">Date début</Label>
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="bg-secondary/50 border-border text-foreground"
              />
            </div>
            <div>
              <Label className="text-foreground/80">Date fin</Label>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="bg-secondary/50 border-border text-foreground"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button onClick={handleExport} disabled={exporting} className="gradient-lime text-accent-foreground font-semibold">
              {exporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
              Exporter en CSV
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
