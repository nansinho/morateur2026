import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendContactConfirmationEmail, sendContactAdminNotificationEmail } from '@/lib/email'
import { addBrevoContact } from '@/lib/brevo'
import { validateAntiSpam } from '@/lib/antispam'

interface ContactFormData {
  prenom: string
  nom: string
  email: string
  tel: string
  motivations: string
  newsletter_optin?: boolean
  _hp?: string
  _ts?: number
}

function validateForm(data: ContactFormData): Record<string, string> {
  const errors: Record<string, string> = {}
  if (!data.prenom || data.prenom.trim().length < 2) errors.prenom = 'Minimum 2 caractères'
  if (!data.nom || data.nom.trim().length < 2) errors.nom = 'Minimum 2 caractères'
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Email invalide'
  if (!data.tel || !/^(\+33|0)[1-9]\d{8}$/.test(data.tel.replace(/\s/g, ''))) errors.tel = 'Numéro invalide'
  if (!data.motivations || data.motivations.trim().length < 10) errors.motivations = 'Minimum 10 caractères'
  return errors
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as ContactFormData

    // Anti-spam checks
    const spamCheck = validateAntiSpam(request, { _hp: body._hp, _ts: body._ts })
    if (!spamCheck.ok) {
      if (spamCheck.error === 'success_fake') {
        return NextResponse.json({ success: true }) // Silently discard spam
      }
      return NextResponse.json({ success: false, error: spamCheck.error }, { status: spamCheck.status || 400 })
    }

    const errors = validateForm(body)

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 })
    }

    // Log the contact submission
    console.log('[CONTACT]', new Date().toISOString(), {
      prenom: body.prenom,
      nom: body.nom,
      email: body.email,
      tel: body.tel,
      motivations: body.motivations.substring(0, 100) + (body.motivations.length > 100 ? '...' : ''),
      newsletter_optin: body.newsletter_optin ?? false,
    })

    // Save to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey)
      const { error: dbError } = await supabase.from('messages').insert({
        prenom: body.prenom.trim(),
        nom: body.nom.trim(),
        email: body.email.trim(),
        tel: body.tel.trim(),
        motivations: body.motivations.trim(),
      })

      if (dbError) {
        console.error('[CONTACT] Supabase error:', dbError)
      }

      // If newsletter opt-in, also add to newsletter_subscribers
      if (body.newsletter_optin) {
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (supabaseServiceKey) {
          const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
          const emailNormalized = body.email.trim().toLowerCase()
          const upsertData: Record<string, unknown> = {
            email: emailNormalized,
            first_name: body.prenom.trim(),
            is_active: true,
          }

          let { error: newsletterError } = await supabaseAdmin
            .from('newsletter_subscribers')
            .upsert(
              { ...upsertData, consent_date: new Date().toISOString() },
              { onConflict: 'email' }
            )

          // Fallback if consent_date column doesn't exist yet
          if (newsletterError && newsletterError.message?.includes('consent_date')) {
            console.warn('[CONTACT] consent_date column not found, retrying without it')
            const result = await supabaseAdmin
              .from('newsletter_subscribers')
              .upsert(upsertData, { onConflict: 'email' })
            newsletterError = result.error
          }

          if (newsletterError) {
            console.error('[CONTACT] Newsletter subscribe error:', newsletterError)
          }
        }

        // Sync to Brevo
        try {
          await addBrevoContact(
            body.email.trim(),
            body.prenom.trim(),
            body.nom.trim()
          )
        } catch (e) {
          console.error('[CONTACT] Brevo sync error:', e)
        }
      }
    }

    // Send confirmation email to the user (non-blocking)
    try {
      await sendContactConfirmationEmail(body.email.trim(), body.prenom.trim())
    } catch (e) {
      console.error('[CONTACT] Confirmation email error:', e)
    }

    // Send notification email to admin
    try {
      await sendContactAdminNotificationEmail({
        firstName: body.prenom.trim(),
        lastName: body.nom.trim(),
        email: body.email.trim(),
        phone: body.tel.trim(),
        motivations: body.motivations.trim(),
      })
    } catch (e) {
      console.error('[CONTACT] Admin notification error:', e)
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Erreur lors du traitement de votre demande.' },
      { status: 500 }
    )
  }
}
