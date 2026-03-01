import type { Metadata } from 'next'
import PresseContent from './presse-content'

export const metadata: Metadata = {
  title: 'Presse',
  description: "Revue de presse de la campagne de Mathieu Morateur pour les municipales 2026 à Bouc-Bel-Air.",
}

export default function PressePage() {
  return <PresseContent />
}
