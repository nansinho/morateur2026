import { NextResponse } from 'next/server'

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
    const body = await request.json() as ContactFormData
    const errors = validateForm(body)

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 })
    }

    // Log the contact submission (always active)
    console.log('[CONTACT]', new Date().toISOString(), {
      prenom: body.prenom,
      nom: body.nom,
      email: body.email,
      tel: body.tel,
      motivations: body.motivations.substring(0, 100) + (body.motivations.length > 100 ? '...' : ''),
    })

    // Send email if SMTP is configured
    const smtpHost = process.env.SMTP_HOST
    const contactEmail = process.env.CONTACT_EMAIL_TO

    if (smtpHost && contactEmail) {
      // SMTP sending would go here when configured
      // For now, the log above ensures data is captured
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
