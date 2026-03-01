import type { Metadata } from 'next'
import ProgrammeContent from './programme-content'

export const metadata: Metadata = {
  title: 'Programme',
  description: 'Découvrez les 3 piliers du programme de Mathieu Morateur pour Bouc-Bel-Air : urbanisme, infrastructures, revitalisation du village.',
}

export default function ProgrammePage() {
  return <ProgrammeContent />
}
