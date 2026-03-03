import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import { sendConfirmationEmail, sendAdminNotificationEmail } from '@/lib/email'
import { rateLimit } from '@/lib/rate-limit'

interface ConsultationFormData {
  quartier_id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  wants_personal_response: boolean
  wants_callback: boolean
  answers: { question_id: string; answer_text: string }[]
}

function validateForm(data: ConsultationFormData): Record<string, string> {
  const errors: Record<string, string> = {}
  if (!data.first_name || data.first_name.trim().length < 2) errors.first_name = 'Minimum 2 caractères'
  if (!data.last_name || data.last_name.trim().length < 2) errors.last_name = 'Minimum 2 caractères'
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Email invalide'
  if (data.wants_callback && data.phone) {
    const cleaned = data.phone.replace(/\s/g, '')
    if (!/^(\+33|0)[1-9]\d{8}$/.test(cleaned)) errors.phone = 'Numéro invalide'
  }
  if (!data.quartier_id) errors.quartier_id = 'Quartier requis'
  if (!data.answers || data.answers.filter(a => a.answer_text.trim()).length === 0) {
    errors.answers = 'Au moins une réponse requise'
  }
  return errors
}

export async function POST(request: Request) {
  try {
    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
    const { success: allowed } = rateLimit(ip, 3, 60_000)
    if (!allowed) {
      return NextResponse.json(
        { success: false, error: 'Trop de requêtes. Veuillez réessayer dans une minute.' },
        { status: 429 }
      )
    }

    const body = await request.json() as ConsultationFormData
    const errors = validateForm(body)

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[CONSULTATION] Missing Supabase env vars')
      return NextResponse.json({ success: false, error: 'Configuration serveur manquante' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Insert submission
    const { data: submission, error: subError } = await supabase
      .from('consultation_submissions')
      .insert({
        quartier_id: body.quartier_id,
        first_name: body.first_name.trim(),
        last_name: body.last_name.trim(),
        email: body.email.trim(),
        phone: body.phone?.trim() || '',
        wants_personal_response: body.wants_personal_response,
        wants_callback: body.wants_callback,
      })
      .select('id')
      .single()

    if (subError || !submission) {
      console.error('[CONSULTATION] Supabase error:', subError)
      return NextResponse.json({ success: false, error: 'Erreur base de données' }, { status: 500 })
    }

    // Insert answers
    const answers = body.answers
      .filter(a => a.answer_text.trim())
      .map(a => ({
        submission_id: submission.id,
        question_id: a.question_id,
        answer_text: a.answer_text.trim(),
      }))

    if (answers.length > 0) {
      const { error: ansError } = await supabase.from('consultation_answers').insert(answers)
      if (ansError) console.error('[CONSULTATION] Answers error:', ansError)
    }

    // Fetch quartier name for emails
    const { data: quartier } = await supabase
      .from('quartiers')
      .select('name')
      .eq('id', body.quartier_id)
      .single()
    const quartierName = quartier?.name || 'Votre quartier'

    // Send emails (non-blocking)
    try {
      await sendConfirmationEmail(
        body.email.trim(),
        body.first_name.trim(),
        quartierName,
        body.wants_personal_response
      )
    } catch (e) {
      console.error('[CONSULTATION] Confirmation email error:', e)
    }

    try {
      await sendAdminNotificationEmail({
        quartierName,
        firstName: body.first_name.trim(),
        lastName: body.last_name.trim(),
        email: body.email.trim(),
        wantsResponse: body.wants_personal_response,
        wantsCallback: body.wants_callback,
      })
    } catch (e) {
      console.error('[CONSULTATION] Admin notification error:', e)
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Erreur lors du traitement de votre demande.' },
      { status: 500 }
    )
  }
}
