import type { Metadata } from 'next'
import EquipeContent from './equipe-content'

export const metadata: Metadata = {
  title: "L'Équipe",
  description: "Découvrez les colistiers de Mathieu Morateur pour les municipales 2026 à Bouc-Bel-Air.",
}

export default function EquipePage() {
  return <EquipeContent />
}
