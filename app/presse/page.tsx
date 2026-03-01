import type { Metadata } from 'next'
import PresseContent from './presse-content'
import { SITE_URL, CANDIDATE } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Presse',
  description: "Revue de presse : La Marseillaise, La Provence. Articles sur la candidature de Mathieu Morateur aux municipales 2026 à Bouc-Bel-Air.",
  alternates: { canonical: '/presse' },
  openGraph: {
    url: `${SITE_URL}/presse`,
    images: [{ url: '/images/candidat-banner.png', width: 1920, height: 1150, alt: 'Presse - Morateur 2026' }],
  },
  keywords: [
    'presse Morateur 2026', 'La Marseillaise Bouc-Bel-Air',
    'La Provence municipales', 'revue de presse campagne',
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Presse', item: `${SITE_URL}/presse` },
  ],
}

const newsArticleSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: 'Mathieu Morateur revient comme candidat à Bouc-Bel-Air',
    datePublished: '2025-12-24',
    author: { '@type': 'Person', name: 'Eva Bonnet-Gonnet' },
    publisher: { '@type': 'NewsMediaOrganization', name: 'La Marseillaise' },
    about: { '@type': 'Person', name: CANDIDATE.name },
    inLanguage: 'fr',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: 'Municipales 2026 à Bouc-Bel-Air : Mathieu Morateur veut faire barrage aux promoteurs',
    datePublished: '2025-10-25',
    author: { '@type': 'Person', name: 'Carole Barletta' },
    publisher: { '@type': 'NewsMediaOrganization', name: 'La Provence' },
    about: { '@type': 'Person', name: CANDIDATE.name },
    inLanguage: 'fr',
  },
]

export default function PressePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {newsArticleSchemas.map((schema, i) => (
        <script
          key={`news-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <PresseContent />
    </>
  )
}
