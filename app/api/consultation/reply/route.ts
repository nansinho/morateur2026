import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendAdminReplyEmail } from '@/lib/email'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { submission_id, reply_text, admin_name } = await request.json()

    if (!submission_id || !reply_text?.trim()) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    // Insert admin reply
    const { error: replyError } = await supabase
      .from('admin_replies')
      .insert({
        submission_id,
        reply_text: reply_text.trim(),
        sent_by: admin_name || user.email || 'Admin',
      })

    if (replyError) {
      console.error('[REPLY] Insert error:', replyError)
      return NextResponse.json({ error: 'Erreur base de données' }, { status: 500 })
    }

    // Update submission status
    await supabase
      .from('consultation_submissions')
      .update({
        status: 'replied',
        replied_at: new Date().toISOString(),
        replied_by: admin_name || user.email || 'Admin',
      })
      .eq('id', submission_id)

    // Fetch citizen info for email
    const { data: submission } = await supabase
      .from('consultation_submissions')
      .select('first_name, email, quartier_id, quartiers(name)')
      .eq('id', submission_id)
      .single()

    if (submission) {
      const quartierName = (submission.quartiers as unknown as { name: string } | null)?.name || 'Votre quartier'
      try {
        await sendAdminReplyEmail(
          submission.email,
          submission.first_name,
          quartierName,
          reply_text.trim(),
          admin_name || user.email || 'Équipe Morateur 2026'
        )
      } catch (e) {
        console.error('[REPLY] Email error:', e)
      }
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Erreur lors du traitement.' },
      { status: 500 }
    )
  }
}
