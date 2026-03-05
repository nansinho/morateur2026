import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendNewsletterConfirmationEmail } from '@/lib/email'
import { addBrevoContact } from '@/lib/brevo'

interface NewsletterFormData {
  email: string
  first_name?: string
  consent?: boolean
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as NewsletterFormData

    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Adresse email invalide.' },
        { status: 400 }
      )
    }

    if (!body.consent) {
      return NextResponse.json(
        { success: false, error: 'Vous devez accepter de recevoir la newsletter.' },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[NEWSLETTER] Missing Supabase env vars')
      return NextResponse.json(
        { success: false, error: 'Configuration serveur manquante.' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { error: dbError } = await supabase
      .from('newsletter_subscribers')
      .upsert(
        {
          email: body.email.trim().toLowerCase(),
          first_name: body.first_name?.trim() || null,
          is_active: true,
          consent_date: new Date().toISOString(),
        },
        { onConflict: 'email' }
      )

    if (dbError) {
      console.error('[NEWSLETTER] Supabase error:', dbError)
      return NextResponse.json(
        { success: false, error: 'Erreur lors de l\'inscription.' },
        { status: 500 }
      )
    }

    // Sync contact to Brevo (non-blocking)
    try {
      await addBrevoContact(
        body.email.trim(),
        body.first_name?.trim()
      )
    } catch (e) {
      console.error('[NEWSLETTER] Brevo sync error:', e)
    }

    // Send confirmation email (non-blocking)
    try {
      await sendNewsletterConfirmationEmail(
        body.email.trim(),
        body.first_name?.trim()
      )
    } catch (e) {
      console.error('[NEWSLETTER] Confirmation email error:', e)
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Erreur lors du traitement de votre demande.' },
      { status: 500 }
    )
  }
}
