import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SITE_URL } from '@/lib/site-config'
import ConsultationForm from './consultation-form'
import type { Quartier, QuartierQuestion } from '@/lib/types/database'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: quartier } = await supabase
    .from('quartiers')
    .select('name, description')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!quartier) return {}

  return {
    title: `Consultation — ${quartier.name}`,
    description: `Participez à la consultation citoyenne pour le quartier ${quartier.name} à Bouc-Bel-Air. Donnez votre avis !`,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      url: `${SITE_URL}/${slug}`,
      title: `Consultation — ${quartier.name} | Morateur 2026`,
      description: `Participez à la consultation citoyenne pour le quartier ${quartier.name} à Bouc-Bel-Air.`,
    },
  }
}

export default async function QuartierPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: quartier } = await supabase
    .from('quartiers')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!quartier) notFound()

  const { data: questions } = await supabase
    .from('quartier_questions')
    .select('*')
    .eq('quartier_id', quartier.id)
    .eq('is_active', true)
    .order('question_number')

  return (
    <ConsultationForm
      quartier={quartier as Quartier}
      questions={(questions as QuartierQuestion[]) || []}
    />
  )
}
