import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site-config'
import ContactContent from './contact-content'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez l\'équipe Morateur 2026. Rejoignez la campagne pour les municipales à Bouc-Bel-Air.',
  alternates: { canonical: '/contact' },
  openGraph: {
    url: `${SITE_URL}/contact`,
  },
  keywords: [
    'contact Morateur 2026', 'rejoindre campagne Bouc-Bel-Air',
    'municipales 2026 contact', 'bénévole Bouc-Bel-Air',
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
  ],
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactContent />
    </>
  )
}
