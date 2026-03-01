import type { Metadata } from 'next'
import HomeContent from './home-content'
import { SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, DEFAULT_OG_IMAGE } from '@/lib/site-config'
import { createClient } from '@/lib/supabase/server'
import type { Article, Event } from '@/lib/types/database'

export const revalidate = 60

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} — ${SITE_TAGLINE}` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    url: SITE_URL,
    images: [DEFAULT_OG_IMAGE],
  },
  keywords: [
    'Morateur 2026', 'municipales 2026 Bouc-Bel-Air',
    'Mathieu Morateur candidat', 'élections Bouc-Bel-Air',
    'maire Bouc-Bel-Air', 'programme municipal 2026',
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
  ],
}

export default async function HomePage() {
  const supabase = await createClient()

  const [{ data: articlesData }, { data: eventsData }] = await Promise.all([
    supabase.from('articles').select('*').order('sort_order'),
    supabase.from('events').select('*').order('sort_order'),
  ])

  const articles: Article[] = articlesData ?? []
  const events: Event[] = eventsData ?? []

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HomeContent articles={articles} events={events} />
    </>
  )
}
