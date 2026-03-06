import type { Metadata } from 'next'
import ActualitesContent from './actualites-content'
import { SITE_URL, CANDIDATE } from '@/lib/site-config'
import { createClient } from '@/lib/supabase/server'
import type { Article } from '@/lib/types/database'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Actualités',
  description: "Suivez la campagne de Mathieu Morateur au quotidien : événements, rencontres terrain et tribunes à Bouc-Bel-Air.",
  alternates: { canonical: '/actualites' },
  openGraph: {
    url: `${SITE_URL}/actualites`,
    images: [{ url: '/images/candidat-banner.png', width: 1920, height: 1150, alt: 'Actualités campagne Morateur 2026' }],
  },
  keywords: [
    'actualités Morateur 2026', 'campagne Bouc-Bel-Air',
    'événements municipales 2026', 'réunion publique Bouc-Bel-Air',
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Actualités', item: `${SITE_URL}/actualites` },
  ],
}

const eventSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Lancement officiel de la campagne Morateur 2026',
    description: "Le coup d'envoi de notre aventure collective pour redonner à Bouc-Bel-Air le dynamisme qu'elle mérite.",
    startDate: '2026-01-15',
    endDate: '2026-01-15',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: `${SITE_URL}/images/candidat-banner.png`,
    performer: { '@type': 'Person', name: CANDIDATE.name },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', url: `${SITE_URL}/actualites`, availability: 'https://schema.org/InStock' },
    location: {
      '@type': 'Place',
      name: 'Bouc-Bel-Air',
      address: { '@type': 'PostalAddress', addressLocality: 'Bouc-Bel-Air', postalCode: '13320', addressCountry: 'FR' },
    },
    organizer: { '@type': 'Organization', name: 'Morateur 2026', url: SITE_URL },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Rencontre avec les commerçants du village',
    description: "Échanges directs avec les commerçants du centre-village sur les enjeux de revitalisation commerciale.",
    startDate: '2026-01-28',
    endDate: '2026-01-28',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: `${SITE_URL}/images/candidat-banner.png`,
    performer: { '@type': 'Person', name: CANDIDATE.name },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', url: `${SITE_URL}/actualites`, availability: 'https://schema.org/InStock' },
    location: {
      '@type': 'Place',
      name: 'Centre-village de Bouc-Bel-Air',
      address: { '@type': 'PostalAddress', addressLocality: 'Bouc-Bel-Air', postalCode: '13320', addressCountry: 'FR' },
    },
    organizer: { '@type': 'Organization', name: 'Morateur 2026', url: SITE_URL },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Réunion publique : urbanisme et cadre de vie',
    description: "Présentation des mesures contre les promoteurs et pour un urbanisme maîtrisé à Bouc-Bel-Air.",
    startDate: '2026-02-05',
    endDate: '2026-02-05',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: `${SITE_URL}/images/candidat-banner.png`,
    performer: { '@type': 'Person', name: CANDIDATE.name },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', url: `${SITE_URL}/actualites`, availability: 'https://schema.org/InStock' },
    location: {
      '@type': 'Place',
      name: 'Bouc-Bel-Air',
      address: { '@type': 'PostalAddress', addressLocality: 'Bouc-Bel-Air', postalCode: '13320', addressCountry: 'FR' },
    },
    organizer: { '@type': 'Organization', name: 'Morateur 2026', url: SITE_URL },
  },
]

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Tribune : Protégeons nos espaces naturels',
  description: "Un appel à la préservation des collines et espaces boisés face à la pression immobilière à Bouc-Bel-Air.",
  datePublished: '2026-02-20',
  author: { '@type': 'Person', name: CANDIDATE.name },
  publisher: { '@type': 'Organization', name: 'Morateur 2026', url: SITE_URL },
  mainEntityOfPage: `${SITE_URL}/actualites`,
  inLanguage: 'fr',
}

export default async function ActualitesPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('articles').select('*').order('sort_order')
  const articles: Article[] = data ?? []

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {eventSchemas.map((schema, i) => (
        <script
          key={`event-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ActualitesContent articles={articles} />
    </>
  )
}
