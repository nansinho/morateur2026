import type { Metadata } from 'next'
import CandidatContent from './candidat-content'
import { SITE_URL, CANDIDATE } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Mathieu Morateur — Lettre aux Boucains',
  description: 'Découvrez la lettre intégrale de Mathieu Morateur, candidat aux élections municipales 2026 à Bouc-Bel-Air. Urbanisme, infrastructures, village, engagement.',
  alternates: { canonical: '/candidat' },
  openGraph: {
    url: `${SITE_URL}/candidat`,
    images: [{ url: '/images/header_candidat_portrait.png', width: 1283, height: 1920, alt: 'Mathieu Morateur - Portrait du candidat' }],
  },
  keywords: [
    'Mathieu Morateur', 'candidat Bouc-Bel-Air', 'lettre aux Boucains',
    'municipales 2026', 'maire Bouc-Bel-Air', 'Sciences Po INSP ENA',
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Le Candidat', item: `${SITE_URL}/candidat` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Lettre aux Boucaines et aux Boucains — Mathieu Morateur',
  description: 'Lettre intégrale de Mathieu Morateur aux habitants de Bouc-Bel-Air pour les élections municipales 2026.',
  image: `${SITE_URL}/images/header_candidat_portrait.png`,
  author: {
    '@type': 'Person',
    name: CANDIDATE.name,
    url: `${SITE_URL}/candidat`,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Morateur 2026',
    url: SITE_URL,
  },
  datePublished: '2025-12-24',
  dateModified: '2026-01-15',
  mainEntityOfPage: `${SITE_URL}/candidat`,
  inLanguage: 'fr',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qui est Mathieu Morateur, candidat aux municipales 2026 à Bouc-Bel-Air ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mathieu Morateur est ancien adjoint au maire de Bouc-Bel-Air (2014-2020), diplômé de Sciences Po Aix et de l\'INSP (ex-ENA). Analyste financier expert en délégation de service public, il se présente aux élections municipales 2026 pour défendre un urbanisme maîtrisé et la préservation du cadre de vie boucain.',
      },
    },
    {
      '@type': 'Question',
      name: 'Pourquoi Mathieu Morateur est-il candidat à Bouc-Bel-Air en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mathieu Morateur se présente pour lutter contre l\'urbanisation excessive (plus de 1000 permis de construire déposés en moins d\'un an, dont 650 acceptés), rénover les infrastructures municipales dégradées, et revitaliser le centre-village de Bouc-Bel-Air.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel est le parcours de Mathieu Morateur ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mathieu Morateur a été adjoint au maire de Bouc-Bel-Air de 2014 à 2020. Il est diplômé de Sciences Po Aix et de l\'INSP (ex-ENA), et travaille comme analyste financier spécialisé dans les délégations de service public.',
      },
    },
  ],
}

export default function CandidatPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CandidatContent />
    </>
  )
}
