import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Morateur 2026 — Bouc Bel Air a de l\'Avenir',
    short_name: 'Morateur 2026',
    description: 'Mathieu Morateur, candidat aux élections municipales 2026 à Bouc-Bel-Air.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f9fb',
    theme_color: '#0e6478',
    lang: 'fr',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
