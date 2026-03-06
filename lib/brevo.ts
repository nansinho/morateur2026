import { BrevoClient } from '@getbrevo/brevo'

const brevoApiKey = process.env.BREVO_API_KEY
const brevoListId = process.env.BREVO_NEWSLETTER_LIST_ID
  ? parseInt(process.env.BREVO_NEWSLETTER_LIST_ID, 10)
  : undefined

/**
 * Ajoute ou met à jour un contact dans Brevo et l'inscrit à la liste newsletter.
 * Échoue silencieusement (log console) pour ne pas bloquer le flux principal.
 */
export async function addBrevoContact(
  email: string,
  firstName?: string,
  lastName?: string
): Promise<boolean> {
  if (!brevoApiKey) {
    console.log('[BREVO] Clé API non configurée, synchronisation ignorée')
    return false
  }

  const client = new BrevoClient({ apiKey: brevoApiKey })

  try {
    const attributes: Record<string, string> = {}
    if (firstName) attributes.FIRSTNAME = firstName
    if (lastName) attributes.LASTNAME = lastName

    await client.contacts.createContact({
      email: email.trim().toLowerCase(),
      attributes,
      listIds: brevoListId ? [brevoListId] : undefined,
      updateEnabled: true,
    })

    console.log('[BREVO] Contact synchronisé:', email)
    return true
  } catch (error) {
    console.error('[BREVO] Erreur synchronisation contact:', error)
    return false
  }
}
