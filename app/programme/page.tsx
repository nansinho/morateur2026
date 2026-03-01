import type { Metadata } from 'next'
import ProgrammeContent from './programme-content'
import { SITE_URL } from '@/lib/site-config'
import { createClient } from '@/lib/supabase/server'
import type { ProgrammePillar, ProgrammeMeasure } from '@/lib/types/database'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Programme',
  description: 'Découvrez les 3 piliers du programme de Mathieu Morateur pour Bouc-Bel-Air : urbanisme maîtrisé, infrastructures rénovées, village revitalisé.',
  alternates: { canonical: '/programme' },
  openGraph: {
    url: `${SITE_URL}/programme`,
    images: [{ url: '/images/projet-banner.png', width: 1570, height: 900, alt: 'Programme Morateur 2026 pour Bouc-Bel-Air' }],
  },
  keywords: [
    'programme municipal Bouc-Bel-Air', 'urbanisme Bouc-Bel-Air',
    'promoteurs immobiliers', 'infrastructures scolaires',
    'revitalisation village', 'programme Morateur 2026',
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Programme', item: `${SITE_URL}/programme` },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quel est le programme de Mathieu Morateur pour Bouc-Bel-Air en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le programme de Mathieu Morateur repose sur 3 piliers : faire barrage aux promoteurs immobiliers avec le refus systématique des permis de construire excessifs, rénover les infrastructures municipales (écoles, bâtiments publics, routes), et revitaliser le centre-village avec des animations culturelles et un incubateur commercial.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la position de Mathieu Morateur face aux promoteurs immobiliers à Bouc-Bel-Air ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mathieu Morateur prévoit le refus systématique des permis de construire des promoteurs, l\'utilisation du droit de préemption urbain, le soutien aux recours des riverains, et le recours au bail réel solidaire pour tous les projets collectifs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelles infrastructures seront rénovées à Bouc-Bel-Air avec le programme Morateur 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le programme prévoit la rénovation complète des bâtiments municipaux, l\'installation de la climatisation dans toutes les écoles et crèches, la requalification des axes routiers majeurs (avenue Thiers, avenue de la Mounine, avenue Beausoleil), et l\'étude des échangeurs autoroutiers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment Morateur 2026 compte revitaliser le centre-village de Bouc-Bel-Air ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le projet comprend la mise en valeur du centre ancien, l\'extension des animations dans les ruelles pittoresques, la création d\'un incubateur commercial et artisanal, et le développement d\'une offre commerciale de proximité diversifiée.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment rejoindre l\'équipe de campagne Morateur 2026 à Bouc-Bel-Air ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vous pouvez rejoindre l\'équipe via le formulaire de contact disponible sur morateur2026.fr, ou en suivant la campagne sur Instagram (@morateur2026) et Facebook.',
      },
    },
  ],
}

export default async function ProgrammePage() {
  const supabase = await createClient()

  const { data: pillarsData } = await supabase
    .from('programme_pillars')
    .select('*')
    .order('sort_order')

  const { data: measuresData } = await supabase
    .from('programme_measures')
    .select('*')
    .order('sort_order')

  const pillars = (pillarsData as ProgrammePillar[] ?? []).map((pillar) => ({
    ...pillar,
    measures: (measuresData as ProgrammeMeasure[] ?? []).filter(
      (m) => m.pillar_id === pillar.id
    ),
  }))

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
      <ProgrammeContent pillars={pillars} />
    </>
  )
}
