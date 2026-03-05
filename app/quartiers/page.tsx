import type { Metadata } from 'next'
import { SITE_URL, DEFAULT_OG_IMAGE } from '@/lib/site-config'
import { createClient } from '@/lib/supabase/server'
import QuartiersContent from './quartiers-content'
import type { Quartier } from '@/lib/types/database'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Consultations par quartier',
  description: 'Donnez votre avis sur l\'avenir de votre quartier à Bouc-Bel-Air. Participez aux consultations citoyennes.',
  alternates: { canonical: '/quartiers' },
  openGraph: {
    url: `${SITE_URL}/quartiers`,
    title: 'Consultations par quartier | Morateur 2026',
    description: 'Donnez votre avis sur l\'avenir de votre quartier à Bouc-Bel-Air.',
    images: [DEFAULT_OG_IMAGE],
  },
  keywords: [
    'consultations citoyennes', 'quartiers Bouc-Bel-Air', 'Morateur 2026',
    'avis citoyens', 'participation', 'concertation',
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Consultations par quartier', item: `${SITE_URL}/quartiers` },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Comment participer à la consultation citoyenne de mon quartier à Bouc-Bel-Air ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rendez-vous sur la page de votre quartier sur morateur2026.fr et remplissez le formulaire de consultation. Vos réponses sont anonymes et contribuent à façonner le programme municipal adapté à votre quartier.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quels quartiers de Bouc-Bel-Air sont concernés par les consultations ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tous les quartiers de Bouc-Bel-Air sont concernés : Roumanille-Thiers, La Bergerie, La Mounine, Chabauds-Malle-Pin, La Salle, Violesi-San Baquis, Centre Ville et Les Revenants.',
      },
    },
  ],
}

export default async function QuartiersPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('quartiers')
    .select('*')
    .order('display_order')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <QuartiersContent quartiers={(data as Quartier[]) || []} />
    </>
  )
}
