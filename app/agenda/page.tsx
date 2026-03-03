import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site-config'
import { createClient } from '@/lib/supabase/server'
import AgendaContent from './agenda-content'
import type { Event } from '@/lib/types/database'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Agenda',
  description: 'Calendrier des événements de la campagne Morateur 2026 à Bouc-Bel-Air. Réunions publiques, rencontres terrain et moments forts.',
  alternates: { canonical: '/agenda' },
  openGraph: {
    url: `${SITE_URL}/agenda`,
  },
  keywords: [
    'agenda Morateur 2026', 'événements campagne Bouc-Bel-Air',
    'réunion publique municipales 2026', 'calendrier campagne',
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Agenda', item: `${SITE_URL}/agenda` },
  ],
}

export default async function AgendaPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('events').select('*').order('sort_order')
  const events: Event[] = data ?? []

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AgendaContent events={events} />
    </>
  )
}
