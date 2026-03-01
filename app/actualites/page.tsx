import type { Metadata } from 'next'
import ActualitesContent from './actualites-content'

export const metadata: Metadata = {
  title: 'Actualités',
  description: "Suivez la campagne de Mathieu Morateur au quotidien : événements, rencontres terrain et tribunes.",
}

export default function ActualitesPage() {
  return <ActualitesContent />
}
