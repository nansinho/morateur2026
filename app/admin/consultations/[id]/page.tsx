'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { ConsultationSubmission, ConsultationAnswer, AdminReply } from '@/lib/types/database'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { ArrowLeft, Send, MailOpen, Archive, Trash2, Phone, Mail, User, MessageSquare, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter, useParams } from 'next/navigation'

const statusConfig = {
  new: { label: 'Nouveau', className: 'bg-campaign-lime/20 text-campaign-lime border-campaign-lime/30' },
  read: { label: 'Lu', className: 'bg-muted text-muted-foreground border-muted' },
  replied: { label: 'Répondu', className: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  archived: { label: 'Archivé', className: 'bg-secondary text-muted-foreground/60 border-secondary' },
}

export default function ConsultationDetailPage() {
  const [submission, setSubmission] = useState<ConsultationSubmission | null>(null)
  const [answers, setAnswers] = useState<ConsultationAnswer[]>([])
  const [replies, setReplies] = useState<AdminReply[]>([])
  const [loading, setLoading] = useState(true)
  const [replyText, setReplyText] = useState('')
  const [sending, setSending] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const fetchData = useCallback(async () => {
    const [subRes, ansRes, repRes] = await Promise.all([
      supabase
        .from('consultation_submissions')
        .select('*, quartiers(name)')
        .eq('id', id)
        .single(),
      supabase
        .from('consultation_answers')
        .select('*, quartier_questions(question_text, question_number)')
        .eq('submission_id', id)
        .order('created_at'),
      supabase
        .from('admin_replies')
        .select('*')
        .eq('submission_id', id)
        .order('sent_at', { ascending: false }),
    ])

    if (subRes.data) {
      setSubmission(subRes.data as ConsultationSubmission)
      // Auto-mark as read
      if ((subRes.data as ConsultationSubmission).status === 'new') {
        await supabase.from('consultation_submissions').update({ status: 'read' }).eq('id', id)
        setSubmission({ ...subRes.data as ConsultationSubmission, status: 'read' })
      }
    }
    setAnswers((ansRes.data as ConsultationAnswer[]) || [])
    setReplies((repRes.data as AdminReply[]) || [])
    setLoading(false)
  }, [supabase, id])

  useEffect(() => { fetchData() }, [fetchData])

  const handleReply = async () => {
    if (!replyText.trim()) return
    setSending(true)
    try {
      const res = await fetch('/api/consultation/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submission_id: id,
          reply_text: replyText.trim(),
          admin_name: 'Admin',
        }),
      })
      if (res.ok) {
        toast.success('Réponse envoyée')
        setReplyText('')
        fetchData()
      } else {
        toast.error('Erreur lors de l\'envoi')
      }
    } catch {
      toast.error('Erreur réseau')
    }
    setSending(false)
  }

  const updateStatus = async (status: string) => {
    await supabase.from('consultation_submissions').update({ status }).eq('id', id)
    toast.success(status === 'read' ? 'Marqué comme lu' : status === 'archived' ? 'Archivé' : 'Statut mis à jour')
    fetchData()
  }

  const handleDelete = async () => {
    await supabase.from('consultation_submissions').delete().eq('id', id)
    toast.success('Soumission supprimée')
    router.push('/admin/consultations')
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-secondary/30 rounded animate-pulse" />
        <div className="h-64 bg-secondary/30 rounded-2xl animate-pulse" />
      </div>
    )
  }

  if (!submission) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground/60">Soumission introuvable</p>
        <Button variant="ghost" className="mt-4" onClick={() => router.push('/admin/consultations')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Retour
        </Button>
      </div>
    )
  }

  const sortedAnswers = [...answers].sort((a, b) => {
    const numA = a.quartier_questions?.question_number ?? 0
    const numB = b.quartier_questions?.question_number ?? 0
    return numA - numB
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={() => router.push('/admin/consultations')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground font-accent uppercase tracking-wide">
            {submission.first_name} {submission.last_name}
          </h2>
          <p className="text-sm text-muted-foreground/60">
            {submission.quartiers?.name || 'Quartier inconnu'} — {new Date(submission.created_at).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Badge variant="outline" className={`text-xs ${statusConfig[submission.status].className}`}>
          {statusConfig[submission.status].label}
        </Badge>
      </div>

      {/* Citizen info */}
      <Card className="border-border/50 bg-card/30">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-muted-foreground/60" />
              <div>
                <p className="text-xs text-muted-foreground/60">Nom</p>
                <p className="text-sm text-foreground">{submission.first_name} {submission.last_name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground/60" />
              <div>
                <p className="text-xs text-muted-foreground/60">Email</p>
                <p className="text-sm text-foreground">{submission.email}</p>
              </div>
            </div>
            {submission.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-muted-foreground/60" />
                <div>
                  <p className="text-xs text-muted-foreground/60">Téléphone</p>
                  <p className="text-sm text-foreground">{submission.phone}</p>
                </div>
              </div>
            )}
            <div className="flex gap-2 flex-wrap items-start">
              {submission.wants_personal_response && (
                <Badge variant="outline" className="text-[10px] bg-campaign-lime/20 text-campaign-lime border-campaign-lime/30">
                  Réponse souhaitée
                </Badge>
              )}
              {submission.wants_callback && (
                <Badge variant="outline" className="text-[10px] bg-blue-500/20 text-blue-400 border-blue-500/30">
                  Rappel souhaité
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Answers */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground font-accent uppercase tracking-wide flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-campaign-lime" />
          Réponses aux questions
        </h3>
        {sortedAnswers.length === 0 ? (
          <p className="text-muted-foreground/60 text-sm">Aucune réponse</p>
        ) : (
          sortedAnswers.map((answer) => (
            <Card key={answer.id} className="border-border/50 bg-card/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">
                  Q{answer.quartier_questions?.question_number ?? '?'} — {answer.quartier_questions?.question_text ?? 'Question'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/80 leading-relaxed bg-secondary/50 p-4 rounded-lg whitespace-pre-wrap">
                  {answer.answer_text}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Admin replies */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground font-accent uppercase tracking-wide flex items-center gap-2">
          <Send className="w-5 h-5 text-campaign-lime" />
          Réponses envoyées
        </h3>
        {replies.length > 0 && (
          <div className="space-y-3">
            {replies.map((reply) => (
              <Card key={reply.id} className="border-border/50 bg-card/30">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-muted-foreground/60">
                      Par {reply.sent_by} — {new Date(reply.sent_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{reply.reply_text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Reply form */}
        <Card className="border-border/50 bg-card/30">
          <CardContent className="pt-6 space-y-4">
            <Textarea
              placeholder="Rédigez votre réponse..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground/50 min-h-[120px]"
            />
            <div className="flex justify-end">
              <Button
                onClick={handleReply}
                disabled={!replyText.trim() || sending}
                className="gradient-lime text-accent-foreground font-semibold"
              >
                {sending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                Envoyer la réponse
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action bar */}
      <div className="flex gap-3 flex-wrap">
        {submission.status !== 'read' && submission.status !== 'replied' && (
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary/50" onClick={() => updateStatus('read')}>
            <MailOpen className="w-4 h-4 mr-2" /> Marquer comme lu
          </Button>
        )}
        {submission.status !== 'archived' && (
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary/50" onClick={() => updateStatus('archived')}>
            <Archive className="w-4 h-4 mr-2" /> Archiver
          </Button>
        )}
        <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10" onClick={() => setDeleteOpen(true)}>
          <Trash2 className="w-4 h-4 mr-2" /> Supprimer
        </Button>
      </div>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Supprimer cette soumission ?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Cette action est irréversible. La soumission et toutes ses réponses seront définitivement supprimées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-secondary text-foreground border-border hover:bg-secondary">Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90 text-foreground">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
