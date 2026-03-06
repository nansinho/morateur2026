import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const FROM_EMAIL = 'Morateur 2026 <noreply@morateur2026.fr>'
const REPLY_TO_EMAIL = 'contact@morateur2026.fr'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact@morateur2026.fr'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://morateur2026.fr'

function generateEntityId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function stripHtmlToPlainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/tr>/gi, '\n')
    .replace(/<\/td>/gi, ' | ')
    .replace(/<a[^>]+href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '$2 ($1)')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8212;/g, '—')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/^ +/gm, '')
    .trim()
}

function wrapInDocument(subject: string, innerHtml: string): string {
  return `<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${subject}</title>
  <!--[if mso]><style>table,td,div,p{font-family:Arial,sans-serif;}</style><![endif]-->
</head>
<body style="margin:0; padding:0; background-color:#f5f5f0; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; font-family:'Helvetica Neue',Arial,sans-serif;">
  ${innerHtml}
</body>
</html>`
}

function emailLayout(subject: string, subtitle: string, body: string, footerText: string): string {
  const innerHtml = `
    <div style="background-color: #f5f5f0; padding: 32px 16px; font-family: 'Helvetica Neue', Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0e6478, #1a4b8c); padding: 32px 30px; text-align: center;">
          <h1 style="color: #50b87a; font-size: 26px; margin: 0 0 6px; font-weight: 700;">Morateur 2026</h1>
          <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 14px; letter-spacing: 0.5px;">${subtitle}</p>
        </div>

        <!-- Bandeau lime -->
        <div style="height: 4px; background: linear-gradient(90deg, #50b87a, #3a9d64);"></div>

        <!-- Corps -->
        <div style="padding: 36px 32px 24px;">
          ${body}
        </div>

        <!-- Footer -->
        <div style="padding: 0 32px 32px;">
          <div style="border-top: 2px solid #50b87a; padding-top: 20px;">
            <p style="color: #888; font-size: 12px; margin: 0 0 8px; line-height: 1.5;">
              ${footerText}
            </p>
            <p style="color: #aaa; font-size: 11px; margin: 0;">
              <a href="${SITE_URL}" style="color: #1a4b8c; text-decoration: none; font-weight: 600;">morateur2026.fr</a> — Ensemble pour l'avenir de Bouc-Bel-Air
            </p>
          </div>
        </div>

      </div>
    </div>
  `
  return wrapInDocument(subject, innerHtml)
}

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

  const subject = `Merci pour votre contribution — ${quartierName}`

  const body = `
    <p style="color: #1a1a17; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
      Bonjour <strong>${firstName}</strong>,
    </p>

    <p style="color: #1a1a17; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
      Nous avons bien reçu vos réponses pour le quartier <strong>${quartierName}</strong>.
      Merci de prendre part à cette consultation citoyenne pour l'avenir de Bouc-Bel-Air.
    </p>

    ${wantsResponse ? `
    <div style="background: #f0fdf4; border-left: 4px solid #50b87a; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
      <p style="color: #166534; margin: 0; font-size: 14px; line-height: 1.5;">
        Vous avez demandé une réponse personnelle. Mathieu Morateur ou ses colistiers vous répondront dans les meilleurs délais.
      </p>
    </div>
    ` : ''}

    <p style="color: #555; font-size: 14px; line-height: 1.6; margin: 32px 0 0;">
      Cordialement,<br/>
      <strong style="color: #1a4b8c;">L'équipe Morateur 2026</strong>
    </p>
  `

  const textContent = `Bonjour ${firstName},

Nous avons bien reçu vos réponses pour le quartier ${quartierName}.
Merci de prendre part à cette consultation citoyenne pour l'avenir de Bouc-Bel-Air.

${wantsResponse ? 'Vous avez demandé une réponse personnelle. Mathieu Morateur ou ses colistiers vous répondront dans les meilleurs délais.\n\n' : ''}Cordialement,
L'équipe Morateur 2026

---
morateur2026.fr — Ensemble pour l'avenir de Bouc-Bel-Air
Cet email a été envoyé suite à votre participation à la consultation du quartier ${quartierName}.`

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      replyTo: REPLY_TO_EMAIL,
      subject,
      html: emailLayout(
        subject,
        'Consultations citoyennes',
        body,
        `Cet email a été envoyé suite à votre participation à la consultation du quartier ${quartierName}.`
      ),
      text: textContent,
      headers: {
        'X-Entity-Ref-ID': generateEntityId(),
      },
      tags: [
        { name: 'category', value: 'consultation-confirmation' },
      ],
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

  const subject = `Nouvelle réponse — ${params.quartierName} — ${params.firstName} ${params.lastName}`

  const innerHtml = `
    <div style="background-color: #f5f5f0; padding: 32px 16px; font-family: 'Helvetica Neue', Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.06);">
        <div style="background: #1a4b8c; padding: 20px 24px;">
          <h2 style="color: #ffffff; font-size: 18px; margin: 0;">Nouvelle soumission reçue</h2>
        </div>
        <div style="height: 4px; background: #50b87a;"></div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; margin: 0 0 24px;">
            <tr><td style="padding: 10px 0; color: #888; width: 150px; border-bottom: 1px solid #f0f0f0;">Quartier</td><td style="padding: 10px 0; color: #1a1a17; font-weight: bold; border-bottom: 1px solid #f0f0f0;">${params.quartierName}</td></tr>
            <tr><td style="padding: 10px 0; color: #888; border-bottom: 1px solid #f0f0f0;">Citoyen</td><td style="padding: 10px 0; color: #1a1a17; border-bottom: 1px solid #f0f0f0;">${params.firstName} ${params.lastName}</td></tr>
            <tr><td style="padding: 10px 0; color: #888; border-bottom: 1px solid #f0f0f0;">Email</td><td style="padding: 10px 0; color: #1a1a17; border-bottom: 1px solid #f0f0f0;">${params.email}</td></tr>
            <tr><td style="padding: 10px 0; color: #888; border-bottom: 1px solid #f0f0f0;">Demande réponse</td><td style="padding: 10px 0; color: #1a1a17; border-bottom: 1px solid #f0f0f0;">${params.wantsResponse ? '✅ Oui' : 'Non'}</td></tr>
            <tr><td style="padding: 10px 0; color: #888;">Demande rappel</td><td style="padding: 10px 0; color: #1a1a17;">${params.wantsCallback ? '✅ Oui' : 'Non'}</td></tr>
          </table>
          <p style="margin: 0; text-align: center;">
            <a href="${SITE_URL}/admin/consultations" style="background: #50b87a; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
              Voir dans le back-office
            </a>
          </p>
        </div>
      </div>
    </div>
  `

  const textContent = `Nouvelle soumission reçue

Quartier : ${params.quartierName}
Citoyen : ${params.firstName} ${params.lastName}
Email : ${params.email}
Demande réponse : ${params.wantsResponse ? 'Oui' : 'Non'}
Demande rappel : ${params.wantsCallback ? 'Oui' : 'Non'}

Voir dans le back-office : ${SITE_URL}/admin/consultations`

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: params.email,
      subject,
      html: wrapInDocument(subject, innerHtml),
      text: textContent,
      headers: {
        'X-Entity-Ref-ID': generateEntityId(),
      },
      tags: [
        { name: 'category', value: 'admin-notification' },
      ],
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

  const subject = `Réponse à votre consultation — ${quartierName}`

  const body = `
    <p style="color: #1a1a17; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
      Bonjour <strong>${firstName}</strong>,
    </p>

    <p style="color: #1a1a17; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
      Suite à votre participation à la consultation du quartier <strong>${quartierName}</strong>,
      voici notre réponse :
    </p>

    <div style="background: #f0f7ff; border-left: 4px solid #1a4b8c; padding: 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
      <p style="color: #1a1a17; margin: 0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${replyText}</p>
    </div>

    <p style="color: #1a1a17; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
      Merci pour votre engagement.
    </p>

    <p style="color: #555; font-size: 14px; line-height: 1.6; margin: 32px 0 0;">
      Cordialement,<br/>
      <strong style="color: #1a4b8c;">${adminName}</strong><br/>
      <span style="color: #888;">Équipe Morateur 2026</span>
    </p>
  `

  const textContent = `Bonjour ${firstName},

Suite à votre participation à la consultation du quartier ${quartierName}, voici notre réponse :

${replyText}

Merci pour votre engagement.

Cordialement,
${adminName}
Équipe Morateur 2026

---
morateur2026.fr — Ensemble pour l'avenir de Bouc-Bel-Air
Cet email fait suite à votre participation à la consultation du quartier ${quartierName}.`

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      replyTo: REPLY_TO_EMAIL,
      subject,
      html: emailLayout(
        subject,
        'Réponse à votre consultation',
        body,
        `Cet email fait suite à votre participation à la consultation du quartier ${quartierName}.`
      ),
      text: textContent,
      headers: {
        'X-Entity-Ref-ID': generateEntityId(),
      },
      tags: [
        { name: 'category', value: 'admin-reply' },
      ],
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

  const subject = 'Merci pour votre engagement — Morateur 2026'

  const body = `
    <p style="color: #1a1a17; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
      Bonjour <strong>${firstName}</strong>,
    </p>

    <p style="color: #1a1a17; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
      Nous avons bien reçu votre message et nous vous remercions pour votre engagement
      aux côtés de Mathieu Morateur pour l'avenir de Bouc-Bel-Air.
    </p>

    <div style="background: #f0fdf4; border-left: 4px solid #50b87a; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
      <p style="color: #166534; margin: 0; font-size: 14px; line-height: 1.5;">
        Nous reviendrons vers vous dans les meilleurs délais.
      </p>
    </div>

    <p style="color: #555; font-size: 14px; line-height: 1.6; margin: 32px 0 0;">
      Cordialement,<br/>
      <strong style="color: #1a4b8c;">L'équipe Morateur 2026</strong>
    </p>
  `

  const textContent = `Bonjour ${firstName},

Nous avons bien reçu votre message et nous vous remercions pour votre engagement aux côtés de Mathieu Morateur pour l'avenir de Bouc-Bel-Air.

Nous reviendrons vers vous dans les meilleurs délais.

Cordialement,
L'équipe Morateur 2026

---
morateur2026.fr — Ensemble pour l'avenir de Bouc-Bel-Air
Cet email a été envoyé suite à votre inscription sur morateur2026.fr.`

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      replyTo: REPLY_TO_EMAIL,
      subject,
      html: emailLayout(
        subject,
        'Confirmation de votre message',
        body,
        'Cet email a été envoyé suite à votre inscription sur morateur2026.fr.'
      ),
      text: textContent,
      headers: {
        'X-Entity-Ref-ID': generateEntityId(),
      },
      tags: [
        { name: 'category', value: 'contact-confirmation' },
      ],
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

  const subject = 'Bienvenue dans la newsletter Morateur 2026'

  const greeting = firstName
    ? `Bonjour <strong>${firstName}</strong>,`
    : 'Bonjour,'

  const greetingText = firstName
    ? `Bonjour ${firstName},`
    : 'Bonjour,'

  const body = `
    <p style="color: #1a1a17; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
      ${greeting}
    </p>

    <p style="color: #1a1a17; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">
      Vous êtes bien inscrit(e) à la newsletter Morateur 2026.
      Vous recevrez régulièrement les dernières actualités de la campagne
      pour l'avenir de Bouc-Bel-Air.
    </p>

    <div style="background: #f0fdf4; border-left: 4px solid #50b87a; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 24px 0;">
      <p style="color: #166534; margin: 0; font-size: 14px; line-height: 1.5;">
        Restez connecté(e) ! Suivez-nous aussi sur nos réseaux sociaux.
      </p>
    </div>

    <p style="color: #555; font-size: 14px; line-height: 1.6; margin: 32px 0 0;">
      Cordialement,<br/>
      <strong style="color: #1a4b8c;">L'équipe Morateur 2026</strong>
    </p>
  `

  const textContent = `${greetingText}

Vous êtes bien inscrit(e) à la newsletter Morateur 2026.
Vous recevrez régulièrement les dernières actualités de la campagne pour l'avenir de Bouc-Bel-Air.

Restez connecté(e) ! Suivez-nous aussi sur nos réseaux sociaux.

Cordialement,
L'équipe Morateur 2026

---
morateur2026.fr — Ensemble pour l'avenir de Bouc-Bel-Air
Cet email a été envoyé suite à votre inscription à la newsletter.
Pour vous désinscrire, envoyez un email à contact@morateur2026.fr avec le sujet "unsubscribe".`

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      replyTo: REPLY_TO_EMAIL,
      subject,
      html: emailLayout(
        subject,
        'Newsletter',
        body,
        'Cet email a été envoyé suite à votre inscription à la newsletter.'
      ),
      text: textContent,
      headers: {
        'X-Entity-Ref-ID': generateEntityId(),
        'List-Unsubscribe': `<mailto:contact@morateur2026.fr?subject=unsubscribe>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
      tags: [
        { name: 'category', value: 'newsletter-confirmation' },
      ],
    })
  } catch (error) {
    console.error('[EMAIL] Erreur envoi confirmation newsletter:', error)
  }
}
