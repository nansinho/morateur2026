import type { Metadata } from 'next'
import CandidatContent from './candidat-content'

export const metadata: Metadata = {
  title: 'Mathieu Morateur — Lettre aux Boucains',
  description: "Découvrez la lettre intégrale de Mathieu Morateur, candidat aux élections municipales 2026 à Bouc-Bel-Air. Urbanisme, infrastructures, village, engagement.",
}

export default function CandidatPage() {
  return <CandidatContent />
}
