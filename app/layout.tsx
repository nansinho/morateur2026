import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Morateur 2026 — Bouc Bel Air a de l\'Avenir',
    template: '%s | Morateur 2026',
  },
  description: 'Mathieu Morateur, candidat aux élections municipales 2026 à Bouc-Bel-Air. Découvrez le programme et l\'équipe.',
  authors: [{ name: 'Morateur 2026' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Morateur 2026',
    title: 'Morateur 2026 — Bouc Bel Air a de l\'Avenir',
    description: 'Mathieu Morateur, candidat aux élections municipales 2026 à Bouc-Bel-Air. Découvrez le programme et l\'équipe.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Morateur 2026 — Bouc Bel Air a de l\'Avenir',
    description: 'Mathieu Morateur, candidat aux élections municipales 2026 à Bouc-Bel-Air. Découvrez le programme et l\'équipe.',
  },
  other: {
    'theme-color': '#0e6478',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
