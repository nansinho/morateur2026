/**
 * Script de génération du PDF programme Morateur 2026.
 *
 * Usage :  npx tsx scripts/generate-pdf.ts
 *
 * Produit :  public/programme-morateur-2026.pdf
 */

import { renderToBuffer } from '@react-pdf/renderer'
import { writeFileSync } from 'fs'
import { resolve } from 'path'
import React from 'react'
import { ProgrammeDocument, type PillarData } from '../lib/pdf/programme-document'

/* ─── Programme data (mirrors seed.sql) ─── */

const pillars: PillarData[] = [
  {
    title: 'Faire barrage aux promoteurs',
    intro:
      'En moins d\u2019un an, des permis pour plus de 1 000 logements ont \u00e9t\u00e9 d\u00e9pos\u00e9s. Il est temps de reprendre en mains notre destin\u00e9e et de prot\u00e9ger le cadre de vie des Boucains.',
    measures: [
      {
        title: 'Refus syst\u00e9matique des permis promoteurs',
        detail:
          'Nous refuserons syst\u00e9matiquement les permis de construire demand\u00e9s par les promoteurs immobiliers afin de les forcer \u00e0 la n\u00e9gociation.',
      },
      {
        title: 'Droit de pr\u00e9emption urbain',
        detail:
          'Utilisation syst\u00e9matique du droit de pr\u00e9emption urbain pour la cr\u00e9ation de logements sociaux adapt\u00e9s \u00e0 notre commune.',
      },
      {
        title: 'Soutien aux recours des riverains',
        detail:
          'Accompagnement juridique et technique des recours intent\u00e9s par les riverains sur les permis existants.',
      },
      {
        title: 'Bail r\u00e9el solidaire',
        detail:
          'Recours au bail r\u00e9el solidaire pour l\u2019int\u00e9gralit\u00e9 des projets collectifs afin de limiter les constructions sp\u00e9culatives.',
      },
      {
        title: 'R\u00e9vision du PLUi',
        detail:
          'Sanctuariser les espaces naturels, r\u00e9duire les zones constructibles et ramener les projets \u00e0 une taille raisonnable.',
      },
    ],
  },
  {
    title: 'Des infrastructures \u00e0 la hauteur',
    intro:
      'La v\u00e9tust\u00e9 de nos \u00e9coles, cr\u00e8ches, b\u00e2timents publics et voiries est indigne de notre commune. Tout doit \u00eatre remis \u00e0 niveau.',
    measures: [
      {
        title: 'R\u00e9novation des b\u00e2timents municipaux',
        detail:
          'R\u00e9novation compl\u00e8te de l\u2019ensemble des b\u00e2timents municipaux, y compris le foyer des Anciens.',
      },
      {
        title: 'Climatisation \u00e9coles et cr\u00e8ches',
        detail:
          'Climatisation r\u00e9versible dans toutes les cr\u00e8ches, \u00e9coles et au foyer des Anciens. Fini les 30 \u00b0C d\u00e8s mai.',
      },
      {
        title: 'Requalification axes routiers',
        detail:
          'Requalifier avenue Thiers, avenue de la Mounine, avenue Beausoleil, chemin de Sauvecanne et la RD8n.',
      },
      {
        title: '\u00c9changeurs autoroutiers',
        detail:
          '\u00c9tudes sur les \u00e9changeurs des Trois Pigeons et des Chabauds pour pr\u00e9senter un projet solide \u00e0 l\u2019\u00c9tat.',
      },
      {
        title: 'Extension r\u00e9seaux d\u2019eau',
        detail:
          'Raccorder Tuilerie, Valabre et Rhin et Danube aux r\u00e9seaux d\u2019eau potable et d\u2019assainissement.',
      },
    ],
  },
  {
    title: 'Revitaliser le village',
    intro:
      'Notre centre ancien a tant \u00e0 offrir. Retrouver son \u00e2me, ramener la vie dans ses ruelles pittoresques et y installer de nouveaux commerces.',
    measures: [
      {
        title: 'Centre ancien attractif',
        detail:
          'Faire du centre ancien un lieu attractif en s\u2019appuyant sur son caract\u00e8re unique et son patrimoine.',
      },
      {
        title: 'Animations et vie culturelle',
        detail:
          '\u00c9tendre les animations dans les ruelles pittoresques. Retrouver l\u2019esprit des retraites aux flambeaux.',
      },
      {
        title: 'Incubateur commercial et artisanal',
        detail:
          'H\u00e9berger chocolatier, glacier, salon de th\u00e9s dans les locaux vides du village, avec autorisation de terrasse.',
      },
      {
        title: 'Boulangerie avec fournil',
        detail:
          'Remodeler la place Jean Moulin avec un v\u00e9ritable boulanger en rez-de-chauss\u00e9e.',
      },
      {
        title: 'Parc-relais centre-ville',
        detail:
          'Cr\u00e9er un parc-relais sur le dernier terrain libre du centre pour stationnement et covoiturage.',
      },
    ],
  },
  {
    title: 'Smart City & S\u00e9curit\u00e9',
    intro:
      'Gr\u00e2ce aux r\u00e9seaux 5G municipaux, nous d\u00e9ployons cam\u00e9ras, capteurs et \u00e9clairage intelligent pour un co\u00fbt divis\u00e9 par dix.',
    measures: [
      {
        title: 'R\u00e9seaux 5G municipaux',
        detail:
          'D\u00e9ploiement de r\u00e9seaux 5G propres \u00e0 la mairie, sans d\u00e9pendance aux op\u00e9rateurs priv\u00e9s.',
      },
      {
        title: 'Vid\u00e9osurveillance et capteurs de bruit',
        detail:
          'Cam\u00e9ras et capteurs de bruit dans les quartiers pour intervenir sur les troubles \u00e0 la tranquillit\u00e9.',
      },
      {
        title: 'Capteurs qualit\u00e9 de l\u2019air',
        detail:
          'V\u00e9rifier en temps r\u00e9el les seuils r\u00e9glementaires aux abords des axes routiers et zones industrielles.',
      },
      {
        title: '\u00c9clairage intelligent',
        detail:
          '\u00c9clairage d\u00e9clench\u00e9 par capteurs de pr\u00e9sence, r\u00e9duisant consommation et nuisances lumineuses.',
      },
      {
        title: 'Feux de circulation intelligents',
        detail:
          'Feux activ\u00e9s selon le trafic r\u00e9el et cr\u00e9ation de voies vertes sur les axes principaux.',
      },
    ],
  },
  {
    title: 'Cadre de vie & Environnement',
    intro:
      'Lutter contre les nuisibles, pr\u00e9server nos espaces naturels, prot\u00e9ger les riverains du bruit : un cadre de vie sain pour chaque Boucain.',
    measures: [
      {
        title: 'Lutte contre les moustiques',
        detail:
          'Traitement berges, bornes aspirateurs aux \u00e9coles et espaces verts, tarifs n\u00e9goci\u00e9s pour dispositifs individuels.',
      },
      {
        title: 'Lutte contre les rats',
        detail:
          'Pi\u00e8ges dans l\u2019espace public, mesures coercitives contre les troubles \u00e0 la salubrit\u00e9.',
      },
      {
        title: 'Parcs arbor\u00e9s',
        detail:
          'Sanctuariser le vallat de Violesi pour cr\u00e9er un parc arbor\u00e9 et pr\u00e9server les espaces naturels.',
      },
      {
        title: 'Murs anti-bruit autoroutiers',
        detail:
          'Murs anti-bruit le long de l\u2019autoroute c\u00f4t\u00e9 Revenants, comme aux Ormeaux.',
      },
    ],
  },
]

/* ─── Generate ─── */

async function main() {
  console.log('Generating programme PDF...')

  const element = React.createElement(ProgrammeDocument, { pillars })
  const buffer = await renderToBuffer(element)

  const outPath = resolve(__dirname, '..', 'public', 'programme-morateur-2026.pdf')
  writeFileSync(outPath, buffer)

  console.log(`PDF generated: ${outPath} (${(buffer.length / 1024).toFixed(1)} KB)`)
}

main().catch((err) => {
  console.error('PDF generation failed:', err)
  process.exit(1)
})
