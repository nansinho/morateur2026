import type { Metadata } from 'next'
import EquipeContent from './equipe-content'
import { SITE_URL } from '@/lib/site-config'

export const metadata: Metadata = {
  title: "L'Équipe",
  description: "Découvrez les colistiers de Mathieu Morateur pour les municipales 2026 à Bouc-Bel-Air : Manon Clément-Costa, Jean-Luc Berger, Valérie Castineiras, François Deniau.",
  alternates: { canonical: '/equipe' },
  openGraph: {
    url: `${SITE_URL}/equipe`,
    images: [{ url: '/images/equipe-groupe.png', width: 1920, height: 724, alt: "L'équipe Morateur 2026 au complet" }],
  },
  keywords: [
    'équipe Morateur 2026', 'colistiers Bouc-Bel-Air',
    'municipales 2026 équipe', 'liste électorale Bouc-Bel-Air',
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: "L'Équipe", item: `${SITE_URL}/equipe` },
  ],
}

export default function EquipePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <EquipeContent />
    </>
  )
}
