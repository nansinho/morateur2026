import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'
import {
  SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION,
  SITE_LOCALE, THEME_COLOR, DEFAULT_OG_IMAGE, CANDIDATE, ORGANIZATION
} from '@/lib/site-config'
import AnalyticsScripts from '@/components/analytics'
import AccessibilityButton from '@/components/AccessibilityButton'
import ChatbotWidget from '@/components/ChatbotWidget'
import CookieConsentBanner from '@/components/CookieConsentBanner'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_NAME }],
  keywords: [
    'Morateur 2026', 'Mathieu Morateur', 'municipales 2026',
    'Bouc-Bel-Air', 'élections municipales', 'candidat maire',
    'programme municipal', 'Bouches-du-Rhône', 'Provence',
  ],
  openGraph: {
    type: 'website',
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  other: {
    'theme-color': THEME_COLOR,
  },
  alternates: {
    canonical: '/',
    languages: { 'fr-FR': SITE_URL },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORGANIZATION.name,
    alternateName: ORGANIZATION.alternateName,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
    sameAs: ORGANIZATION.sameAs,
    address: {
      '@type': 'PostalAddress',
      addressLocality: ORGANIZATION.address.addressLocality,
      addressRegion: ORGANIZATION.address.addressRegion,
      postalCode: ORGANIZATION.address.postalCode,
      addressCountry: ORGANIZATION.address.addressCountry,
    },
    areaServed: {
      '@type': 'City',
      name: ORGANIZATION.areaServed.name,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: ORGANIZATION.areaServed.geo.latitude,
        longitude: ORGANIZATION.areaServed.geo.longitude,
      },
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: `${SITE_NAME} — ${SITE_TAGLINE}`,
    url: SITE_URL,
    inLanguage: 'fr',
    publisher: { '@type': 'Organization', name: ORGANIZATION.name, url: ORGANIZATION.url },
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: CANDIDATE.name,
    givenName: CANDIDATE.givenName,
    familyName: CANDIDATE.familyName,
    jobTitle: CANDIDATE.jobTitle,
    description: CANDIDATE.description,
    image: `${SITE_URL}${CANDIDATE.image}`,
    url: `${SITE_URL}/candidat`,
    sameAs: CANDIDATE.sameAs,
    affiliation: {
      '@type': 'Organization',
      name: ORGANIZATION.name,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bouc-Bel-Air',
      postalCode: '13320',
      addressCountry: 'FR',
    },
    knowsAbout: [
      'Finances publiques', 'Urbanisme', 'Service public',
      'Gestion municipale', 'Politique locale',
    ],
  }

  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <Providers>
          {children}
          <AccessibilityButton />
          <ChatbotWidget />
          <CookieConsentBanner />
          <AnalyticsScripts />
        </Providers>
      </body>
    </html>
  )
}
