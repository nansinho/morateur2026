import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site-config'
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
  },
  keywords: [
    'consultations citoyennes', 'quartiers Bouc-Bel-Air', 'Morateur 2026',
    'avis citoyens', 'participation', 'concertation',
  ],
}

export default async function QuartiersPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('quartiers')
    .select('*')
    .order('display_order')

  return <QuartiersContent quartiers={(data as Quartier[]) || []} />
}
