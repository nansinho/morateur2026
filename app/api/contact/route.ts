import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import { rateLimit } from '@/lib/rate-limit'

interface ContactFormData {
  prenom: string
  nom: string
  email: string
  tel: string
  motivations: string
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
    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
    const { success: allowed } = rateLimit(ip, 5, 60_000)
    if (!allowed) {
      return NextResponse.json(
        { success: false, error: 'Trop de requêtes. Veuillez réessayer dans une minute.' },
        { status: 429 }
      )
    }

    const body = await request.json() as ContactFormData
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
    }

    // Send email if SMTP is configured
    const smtpHost = process.env.SMTP_HOST
    const contactEmail = process.env.CONTACT_EMAIL_TO

    if (smtpHost && contactEmail) {
      console.log(`[CONTACT] Email would be sent to ${contactEmail} via ${smtpHost}`)
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Erreur lors du traitement de votre demande.' },
      { status: 500 }
    )
  }
}
