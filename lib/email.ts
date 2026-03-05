import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const FROM_EMAIL = 'Morateur 2026 <noreply@morateur2026.fr>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact@morateur2026.fr'

export async function sendConfirmationEmail(
  to: string,
  firstName: string,
  quartierName: string,
  wantsResponse: boolean
): Promise<void> {
  if (!resend) {
    console.log('[EMAIL] Resend non configuré, email de confirmation ignoré')
    return
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Merci pour votre contribution — ${quartierName}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="background: linear-gradient(135deg, #0e6478, #1a4b8c); padding: 30px; border-radius: 16px; margin-bottom: 24px;">
            <h1 style="color: #50b87a; font-size: 24px; margin: 0 0 8px;">Morateur 2026</h1>
            <p style="color: rgba(255,255,255,0.6); margin: 0; font-size: 14px;">Consultations citoyennes</p>
          </div>

          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Bonjour <strong>${firstName}</strong>,
          </p>

          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Nous avons bien reçu vos réponses pour le quartier <strong>${quartierName}</strong>.
            Merci de prendre part à cette consultation citoyenne pour l'avenir de Bouc-Bel-Air.
          </p>

          ${wantsResponse ? `
          <div style="background: #f0fdf4; border-left: 4px solid #50b87a; padding: 16px; border-radius: 0 8px 8px 0; margin: 24px 0;">
            <p style="color: #166534; margin: 0; font-size: 14px;">
              Vous avez demandé une réponse personnelle. Mathieu Morateur ou ses colistiers vous répondront dans les meilleurs délais.
            </p>
          </div>
          ` : ''}

          <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 32px;">
            Cordialement,<br/>
            <strong>L'équipe Morateur 2026</strong>
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0 16px;" />
          <p style="color: #999; font-size: 12px;">
            Cet email a été envoyé suite à votre participation à la consultation du quartier ${quartierName} sur morateur2026.fr.
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('[EMAIL] Erreur envoi confirmation:', error)
  }
}

export async function sendAdminNotificationEmail(params: {
  quartierName: string
  firstName: string
  lastName: string
  email: string
  wantsResponse: boolean
  wantsCallback: boolean
}): Promise<void> {
  if (!resend) {
    console.log('[EMAIL] Resend non configuré, notification admin ignorée')
    return
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `Nouvelle réponse — ${params.quartierName} — ${params.firstName} ${params.lastName}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0e6478;">Nouvelle soumission reçue</h2>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 8px 0; color: #666; width: 160px;">Quartier</td><td style="padding: 8px 0; color: #333; font-weight: bold;">${params.quartierName}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Citoyen</td><td style="padding: 8px 0; color: #333;">${params.firstName} ${params.lastName}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0; color: #333;">${params.email}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Demande réponse</td><td style="padding: 8px 0; color: #333;">${params.wantsResponse ? '✅ Oui' : 'Non'}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Demande rappel</td><td style="padding: 8px 0; color: #333;">${params.wantsCallback ? '✅ Oui' : 'Non'}</td></tr>
          </table>
          <p style="margin-top: 24px;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://morateur2026.fr'}/admin/consultations" style="background: #50b87a; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              Voir dans le back-office
            </a>
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('[EMAIL] Erreur envoi notification admin:', error)
  }
}

export async function sendAdminReplyEmail(
  to: string,
  firstName: string,
  quartierName: string,
  replyText: string,
  adminName: string
): Promise<void> {
  if (!resend) {
    console.log('[EMAIL] Resend non configuré, réponse admin ignorée')
    return
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Réponse à votre consultation — ${quartierName}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="background: linear-gradient(135deg, #0e6478, #1a4b8c); padding: 30px; border-radius: 16px; margin-bottom: 24px;">
            <h1 style="color: #50b87a; font-size: 24px; margin: 0 0 8px;">Morateur 2026</h1>
            <p style="color: rgba(255,255,255,0.6); margin: 0; font-size: 14px;">Réponse à votre consultation</p>
          </div>

          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Bonjour <strong>${firstName}</strong>,
          </p>

          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Suite à votre participation à la consultation du quartier <strong>${quartierName}</strong>,
            voici notre réponse :
          </p>

          <div style="background: #f8fafc; border-left: 4px solid #0e6478; padding: 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
            <p style="color: #333; margin: 0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${replyText}</p>
          </div>

          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Merci pour votre engagement.
          </p>

          <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 32px;">
            Cordialement,<br/>
            <strong>${adminName}</strong><br/>
            Équipe Morateur 2026
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0 16px;" />
          <p style="color: #999; font-size: 12px;">
            Cet email fait suite à votre participation à la consultation du quartier ${quartierName} sur morateur2026.fr.
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('[EMAIL] Erreur envoi réponse admin:', error)
  }
}

export async function sendContactConfirmationEmail(
  to: string,
  firstName: string
): Promise<void> {
  if (!resend) {
    console.log('[EMAIL] Resend non configuré, email de confirmation contact ignoré')
    return
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: 'Merci pour votre engagement — Morateur 2026',
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="background: linear-gradient(135deg, #0e6478, #1a4b8c); padding: 30px; border-radius: 16px; margin-bottom: 24px;">
            <h1 style="color: #50b87a; font-size: 24px; margin: 0 0 8px;">Morateur 2026</h1>
            <p style="color: rgba(255,255,255,0.6); margin: 0; font-size: 14px;">Confirmation de votre message</p>
          </div>

          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Bonjour <strong>${firstName}</strong>,
          </p>

          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Nous avons bien reçu votre message et nous vous remercions pour votre engagement
            aux côtés de Mathieu Morateur pour l'avenir de Bouc-Bel-Air.
          </p>

          <div style="background: #f0fdf4; border-left: 4px solid #50b87a; padding: 16px; border-radius: 0 8px 8px 0; margin: 24px 0;">
            <p style="color: #166534; margin: 0; font-size: 14px;">
              Nous reviendrons vers vous dans les meilleurs délais.
            </p>
          </div>

          <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 32px;">
            Cordialement,<br/>
            <strong>L'équipe Morateur 2026</strong>
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0 16px;" />
          <p style="color: #999; font-size: 12px;">
            Cet email a été envoyé suite à votre inscription sur morateur2026.fr.
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('[EMAIL] Erreur envoi confirmation contact:', error)
  }
}

export async function sendNewsletterConfirmationEmail(
  to: string,
  firstName?: string
): Promise<void> {
  if (!resend) {
    console.log('[EMAIL] Resend non configuré, email de confirmation newsletter ignoré')
    return
  }

  const greeting = firstName
    ? `Bonjour <strong>${firstName}</strong>,`
    : 'Bonjour,'

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: 'Bienvenue dans la newsletter Morateur 2026',
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="background: linear-gradient(135deg, #0e6478, #1a4b8c); padding: 30px; border-radius: 16px; margin-bottom: 24px;">
            <h1 style="color: #50b87a; font-size: 24px; margin: 0 0 8px;">Morateur 2026</h1>
            <p style="color: rgba(255,255,255,0.6); margin: 0; font-size: 14px;">Newsletter</p>
          </div>

          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            ${greeting}
          </p>

          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Vous êtes bien inscrit(e) à la newsletter Morateur 2026.
            Vous recevrez régulièrement les dernières actualités de la campagne
            pour l'avenir de Bouc-Bel-Air.
          </p>

          <div style="background: #f0fdf4; border-left: 4px solid #50b87a; padding: 16px; border-radius: 0 8px 8px 0; margin: 24px 0;">
            <p style="color: #166534; margin: 0; font-size: 14px;">
              Restez connecté(e) ! Suivez-nous aussi sur nos réseaux sociaux.
            </p>
          </div>

          <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 32px;">
            Cordialement,<br/>
            <strong>L'équipe Morateur 2026</strong>
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0 16px;" />
          <p style="color: #999; font-size: 12px;">
            Cet email a été envoyé suite à votre inscription à la newsletter sur morateur2026.fr.
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('[EMAIL] Erreur envoi confirmation newsletter:', error)
  }
}
