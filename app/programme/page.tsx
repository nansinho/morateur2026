import type { Metadata } from 'next'
import ProgrammeContent from './programme-content'
import { SITE_URL } from '@/lib/site-config'
import { createClient } from '@/lib/supabase/server'
import type { ProgrammePillar, ProgrammeMeasure } from '@/lib/types/database'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Programme',
  description: 'Découvrez les 9 engagements de Mathieu Morateur pour Bouc-Bel-Air : urbanisme maîtrisé, sécurité renforcée, écoles rénovées, fast lanes boucaines et référendum local.',
  alternates: { canonical: '/programme' },
  openGraph: {
    url: `${SITE_URL}/programme`,
    images: [{ url: '/images/projet-banner.png', width: 1570, height: 900, alt: 'Programme Morateur 2026 pour Bouc-Bel-Air' }],
  },
  keywords: [
    'programme municipal Bouc-Bel-Air', 'programme Morateur 2026',
    'écoles Bouc-Bel-Air', 'bail réel solidaire BRS',
    'référendum local', '5G communal Bouc-Bel-Air',
    'lutte moustiques nuisibles', 'urbanisation promoteurs',
    'police municipale', 'fast lanes boucaines',
    'gouvernance métropolitaine',
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
        text: 'Le programme repose sur 9 engagements concrets : rénovation des écoles et crèches, mixité sociale choisie via le bail réel solidaire (BRS), référendum local pour les grands projets, réseau 5G communal avec caméras nomades, lutte contre les moustiques et nuisibles, lutte contre l\'urbanisation galopante, 6 agents de police municipale supplémentaires, gouvernance métropolitaine indépendante, et les fast lanes boucaines pour fluidifier la circulation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment Morateur 2026 lutte contre l\'urbanisation galopante à Bouc-Bel-Air ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Suppression des opérations d\'aménagement programmées, réduction des droits à construire, préemption systématique des terrains, retrait des permis récemment octroyés aux promoteurs, et création d\'un parc naturel au vallat de Violesi. Seuls les détachements familiaux seront facilités.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qu\'est-ce que le bail réel solidaire (BRS) proposé par Morateur 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le BRS permet de construire uniquement le nombre de logements nécessaire pour les quotas sociaux, en accession à la propriété. Plus de grands ensembles imposés par les promoteurs : des familles propriétaires qui s\'installent durablement, respectent leur bien et veillent à la tranquillité de leur quartier.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment sont financés les 6 agents de police municipale supplémentaires ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Par des économies sur le train de vie municipal, sans augmentation d\'impôts : suppression du collaborateur de cabinet (85 000€), baisse des frais de représentation (10 500€), réduction de 5% du budget communication (200 000€), recouvrement effectif de la TLPE (50 000€), et gains de productivité. Total : 600 000€ par an.',
      },
    },
    {
      '@type': 'Question',
      name: 'Que sont les fast lanes boucaines ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'De 7h à 9h et de 16h à 19h, les chemins de Violesi, des Revenants et de Sauvecanne seront réservés aux Boucains grâce à des barrières commandées par caméras de reconnaissance de plaques. L\'objectif est aussi de forcer le Département et la Métropole à prendre leurs responsabilités pour les aménagements routiers.',
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
