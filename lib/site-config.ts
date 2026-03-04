export const SITE_URL = 'https://morateur2026.fr'
export const SITE_NAME = 'Morateur 2026'
export const SITE_TAGLINE = 'Bouc Bel Air a de l\'Avenir'
export const SITE_DESCRIPTION = 'Mathieu Morateur, candidat aux élections municipales 2026 à Bouc-Bel-Air. Découvrez le programme et l\'équipe.'
export const SITE_LOCALE = 'fr_FR'
export const THEME_COLOR = '#0e6478'

export const CANDIDATE = {
  name: 'Mathieu Morateur',
  givenName: 'Mathieu',
  familyName: 'Morateur',
  jobTitle: 'Candidat aux élections municipales 2026',
  description: 'Ancien adjoint au maire de Bouc-Bel-Air (2014-2020), diplômé de Sciences Po Aix et de l\'INSP (ex-ENA), analyste financier expert en délégation de service public.',
  image: '/images/header_candidat_portrait.png',
  sameAs: [
    'https://www.instagram.com/mathieumorateur/',
    'https://www.facebook.com/morateur',
  ],
}

export const ORGANIZATION = {
  name: 'Morateur 2026',
  alternateName: 'Liste Morateur 2026 - Bouc Bel Air a de l\'Avenir',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  sameAs: CANDIDATE.sameAs,
  address: {
    addressLocality: 'Bouc-Bel-Air',
    addressRegion: 'Provence-Alpes-Côte d\'Azur',
    postalCode: '13320',
    addressCountry: 'FR',
  },
  areaServed: {
    name: 'Bouc-Bel-Air',
    geo: { latitude: 43.4528, longitude: 5.4128 },
  },
}

export const DEFAULT_OG_IMAGE = {
  url: '/images/candidat-banner.png',
  width: 1920,
  height: 1150,
  alt: 'Mathieu Morateur - Candidat aux municipales 2026 à Bouc-Bel-Air',
  type: 'image/png' as const,
}

export const PAGES = [
  { path: '/', changeFrequency: 'weekly' as const, priority: 1.0 },
  { path: '/candidat', changeFrequency: 'monthly' as const, priority: 0.9 },
  { path: '/programme', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/actualites', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: '/equipe', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/presse', changeFrequency: 'weekly' as const, priority: 0.6 },
  { path: '/mentions-legales', changeFrequency: 'yearly' as const, priority: 0.3 },
  { path: '/politique-de-confidentialite', changeFrequency: 'yearly' as const, priority: 0.3 },
  { path: '/cookies', changeFrequency: 'yearly' as const, priority: 0.3 },
  { path: '/accessibilite', changeFrequency: 'yearly' as const, priority: 0.3 },
  { path: '/plan-du-site', changeFrequency: 'monthly' as const, priority: 0.3 },
] as const
