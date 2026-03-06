import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Sora } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
})
import {
  SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION,
  SITE_LOCALE, THEME_COLOR, DEFAULT_OG_IMAGE, CANDIDATE, ORGANIZATION
} from '@/lib/site-config'
import AnalyticsScripts from '@/components/analytics'
import AccessibilityButton from '@/components/AccessibilityButton'
import ChatbotWidget from '@/components/ChatbotWidget'
import CookieConsentBanner from '@/components/CookieConsentBanner'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: THEME_COLOR,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: CANDIDATE.name }],
  creator: CANDIDATE.name,
  publisher: ORGANIZATION.name,
  keywords: [
    'Morateur 2026', 'Mathieu Morateur', 'municipales 2026',
    'Bouc-Bel-Air', 'élections municipales', 'candidat maire',
    'programme municipal', 'Bouches-du-Rhône', 'Provence',
    'mairie Bouc-Bel-Air', '13320', 'élections 2026',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
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
  alternates: {
    canonical: '/',
    languages: { 'fr-FR': SITE_URL },
  },
  category: 'politics',
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
    contactPoint: {
      '@type': 'ContactPoint',
      email: ORGANIZATION.contactPoint.email,
      contactType: ORGANIZATION.contactPoint.contactType,
      availableLanguage: ORGANIZATION.contactPoint.availableLanguage,
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
    description: SITE_DESCRIPTION,
    inLanguage: 'fr',
    publisher: { '@type': 'Organization', name: ORGANIZATION.name, url: ORGANIZATION.url },
    about: {
      '@type': 'Person',
      name: CANDIDATE.name,
      jobTitle: CANDIDATE.jobTitle,
    },
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
    nationality: { '@type': 'Country', name: 'France' },
    alumniOf: [
      { '@type': 'EducationalOrganization', name: 'Sciences Po Aix' },
      { '@type': 'EducationalOrganization', name: 'INSP (ex-ENA)' },
    ],
    knowsAbout: [
      'Finances publiques', 'Urbanisme', 'Service public',
      'Gestion municipale', 'Politique locale',
      'Délégation de service public', 'Analyse financière',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Analyste financier',
      description: 'Expert en délégation de service public',
    },
  }

  return (
    <html lang="fr" className={`${plusJakarta.variable} ${sora.variable}`}>
      <head>
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
