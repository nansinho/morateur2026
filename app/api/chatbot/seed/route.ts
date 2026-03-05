import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface RootEntry {
  question: string
  answer: string
  category: string
  sort_order: number
}

interface ChildEntry {
  question: string
  answer: string
  category: string
  sort_order: number
  parentKey: string
}

const ROOT_ENTRIES: Record<string, RootEntry> = {
  candidat: {
    question: 'Le candidat',
    answer: 'Mathieu Morateur, 36 ans, est un enfant de Bouc-Bel-Air. Ancien adjoint au maire (2014-2020), il est analyste financier spécialisé en délégation de service public. Diplômé de Sciences Po Aix et de l\'INSP, il met son expertise au service de sa commune natale.',
    category: 'Candidat',
    sort_order: 1,
  },
  programme: {
    question: 'Le programme',
    answer: 'Notre projet repose sur 9 engagements concrets pour redonner à Bouc-Bel-Air le cadre de vie qu\'elle mérite. Sécurité, urbanisme maîtrisé, écoles rénovées, démocratie locale renforcée : découvrez nos propositions.',
    category: 'Programme',
    sort_order: 2,
  },
  election: {
    question: 'L\'élection',
    answer: 'Les élections municipales de Bouc-Bel-Air se tiendront le 15 mars 2026 (1er tour) et le 22 mars 2026 (2nd tour). Chaque voix compte pour l\'avenir de notre commune !',
    category: 'Élection',
    sort_order: 3,
  },
  rejoindre: {
    question: 'Nous rejoindre',
    answer: 'Plusieurs façons de soutenir notre campagne et de participer à l\'aventure collective pour Bouc-Bel-Air !',
    category: 'Engagement',
    sort_order: 4,
  },
  contact: {
    question: 'Nous contacter',
    answer: 'Retrouvez-nous sur Instagram (@morateur2026) et Facebook (Morateur 2026). Vous pouvez aussi nous écrire via le formulaire de contact sur le site. Nous sommes à votre écoute !',
    category: 'Contact',
    sort_order: 5,
  },
}

const CHILD_ENTRIES: ChildEntry[] = [
  // --- Le candidat ---
  {
    parentKey: 'candidat',
    question: 'Son parcours',
    answer: 'Natif de Bouc-Bel-Air, Mathieu Morateur a grandi dans cette commune qu\'il aime profondément. Diplômé de Sciences Po Aix et de l\'INSP (anciennement ENA), il est analyste financier expert en délégation de service public et en mutualisation des moyens. Il a été adjoint au maire de 2014 à 2020.',
    category: 'Candidat',
    sort_order: 1,
  },
  {
    parentKey: 'candidat',
    question: 'Sa motivation',
    answer: 'Père de jeunes enfants, Mathieu Morateur veut leur permettre de grandir avec les mêmes chances que celles qu\'il a eues dans une commune préservée et ambitieuse. Face à l\'urbanisation galopante et à la dégradation des équipements, il s\'engage pour que Bouc-Bel-Air retrouve son dynamisme.',
    category: 'Candidat',
    sort_order: 2,
  },

  // --- Le programme (9 engagements) ---
  {
    parentKey: 'programme',
    question: 'Écoles, crèches et centre aéré',
    answer: 'L\'état de nos bâtiments scolaires est indigne : fuites, 30°C en mai, 16°C en hiver. Nous lancerons un grand marché de rénovation énergétique pour offrir un éclairage adaptatif et un confort thermique optimal. Ce sont les économies d\'énergie qui financeront ces travaux.',
    category: 'Programme',
    sort_order: 1,
  },
  {
    parentKey: 'programme',
    question: 'Mixité sociale choisie (BRS)',
    answer: 'Nous ne construirons que le nécessaire grâce au Bail Réel Solidaire (BRS). Si nous avons besoin de 60 logements pour nos quotas, nous construisons 60 appartements en BRS — pas 60 de plus pour les promoteurs. C\'est la fin des grands ensembles imposés et la garantie de familles propriétaires investies dans leur quartier.',
    category: 'Programme',
    sort_order: 2,
  },
  {
    parentKey: 'programme',
    question: 'Référendum local',
    answer: 'Tous les projets supérieurs à 1 million d\'euros seront soumis à un référendum local. Ils devront recueillir l\'approbation de plus de 25% des électeurs inscrits pour être validés. Vous avez réellement la parole !',
    category: 'Programme',
    sort_order: 3,
  },
  {
    parentKey: 'programme',
    question: 'Réseau 5G communal et caméras',
    answer: 'Nous créerons un réseau 5G propre à la commune pour déployer des caméras nomades de vidéoprotection (dont la localisation peut changer rapidement), des capteurs de bruit, de qualité de l\'air et d\'éclairage intelligent par détection de présence — le tout pour un coût divisé par 10.',
    category: 'Programme',
    sort_order: 4,
  },
  {
    parentKey: 'programme',
    question: 'Lutte contre les moustiques',
    answer: 'Nous lancerons une offensive complète : piégeage et prédateurs naturels dans l\'espace public, mobilisation citoyenne pour assécher les gîtes privés, pose de bornes aspirateurs autour des écoles et espaces verts, et tarifs négociés pour les dispositifs à installer chez soi.',
    category: 'Programme',
    sort_order: 5,
  },
  {
    parentKey: 'programme',
    question: 'Urbanisation maîtrisée',
    answer: 'Nous ferons barrage aux promoteurs : suppression des opérations d\'aménagement programmées (OAP), réduction des droits à construire, préemption systématique, retrait des permis récemment octroyés aux promoteurs. Seuls les détachements familiaux seront facilités. Un parc naturel sera créé au vallat de Violesi.',
    category: 'Programme',
    sort_order: 6,
  },
  {
    parentKey: 'programme',
    question: '6 agents de police supplémentaires',
    answer: 'Comment financer 6 agents de terrain sans augmenter vos impôts ? Par des économies : suppression du collaborateur de cabinet (85 000€), baisse des frais de représentation (10 500€), réduction de 5% du budget communication (200 000€), recouvrement effectif de la TLPE (50 000€). Total : 600 000€/an.',
    category: 'Programme',
    sort_order: 7,
  },
  {
    parentKey: 'programme',
    question: 'Gouvernance métropolitaine',
    answer: 'Libres de toute allégeance partisane, nous représenterons Bouc-Bel-Air dans les instances métropolitaines et intercommunales en ayant à cœur uniquement les intérêts des Boucains. Notre indépendance politique est notre force.',
    category: 'Programme',
    sort_order: 8,
  },
  {
    parentKey: 'programme',
    question: 'Fast lanes boucaines',
    answer: 'De 7h à 9h et de 16h à 19h, le chemin de Violesi, le chemin des Revenants et le chemin de Sauvecanne seront réservés aux Boucains grâce à des barrières commandées par reconnaissance de plaques enregistrées en mairie. Cela forcera le Département et la Métropole à réaliser les aménagements routiers nécessaires.',
    category: 'Programme',
    sort_order: 9,
  },

  // --- L'élection ---
  {
    parentKey: 'election',
    question: 'Dates clés',
    answer: '1er tour : dimanche 15 mars 2026. 2nd tour : dimanche 22 mars 2026. Chaque voix compte pour l\'avenir de Bouc-Bel-Air. Mobilisez-vous !',
    category: 'Élection',
    sort_order: 1,
  },
  {
    parentKey: 'election',
    question: 'Faire une procuration',
    answer: 'Vous ne pouvez pas vous déplacer le jour du vote ? Donnez procuration à un proche sur maprocuration.gouv.fr. C\'est simple, rapide, et votre voix comptera quand même !',
    category: 'Élection',
    sort_order: 2,
  },

  // --- Nous rejoindre ---
  {
    parentKey: 'rejoindre',
    question: 'Agir sur le terrain',
    answer: 'Rejoignez-nous pour le porte-à-porte, les distributions de tracts et les événements de campagne ! Contactez-nous via les réseaux sociaux ou le formulaire du site pour nous rejoindre sur le terrain.',
    category: 'Engagement',
    sort_order: 1,
  },
  {
    parentKey: 'rejoindre',
    question: 'Réseaux sociaux',
    answer: 'Suivez notre campagne au quotidien ! Instagram : @morateur2026 pour les coulisses et les actualités. Facebook : Morateur 2026 pour rejoindre la communauté et partager nos publications.',
    category: 'Engagement',
    sort_order: 2,
  },
  {
    parentKey: 'rejoindre',
    question: 'Donner votre avis',
    answer: 'Participez aux consultations citoyennes par quartier sur notre site ! Roumanille-Thiers, La Bergerie, La Mounine, Centre Ville... Chaque quartier a ses enjeux, et votre avis compte pour construire notre projet.',
    category: 'Engagement',
    sort_order: 3,
  },
]

export async function POST() {
  try {
    const supabase = await createClient()

    // Check if entries already exist
    const { data: existing } = await supabase
      .from('chatbot_entries')
      .select('id')
      .limit(1)

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: 'Des entrées existent déjà. Supprimez-les d\'abord via l\'admin si vous voulez réinitialiser.' },
        { status: 409 }
      )
    }

    // Insert root entries
    const rootInserts = Object.entries(ROOT_ENTRIES).map(([, entry]) => ({
      question: entry.question,
      answer: entry.answer,
      category: entry.category,
      parent_id: null,
      sort_order: entry.sort_order,
      is_active: true,
    }))

    const { data: rootData, error: rootError } = await supabase
      .from('chatbot_entries')
      .insert(rootInserts)
      .select('id, question')

    if (rootError || !rootData) {
      console.error('[CHATBOT SEED] Root insert error:', rootError)
      return NextResponse.json({ error: 'Erreur lors de l\'insertion des sujets racines.' }, { status: 500 })
    }

    // Map root keys to IDs
    const rootKeys = Object.keys(ROOT_ENTRIES)
    const parentIdMap: Record<string, string> = {}
    rootData.forEach((row, index) => {
      parentIdMap[rootKeys[index]] = row.id
    })

    // Insert child entries
    const childInserts = CHILD_ENTRIES.map((child) => ({
      question: child.question,
      answer: child.answer,
      category: child.category,
      parent_id: parentIdMap[child.parentKey],
      sort_order: child.sort_order,
      is_active: true,
    }))

    const { error: childError } = await supabase
      .from('chatbot_entries')
      .insert(childInserts)

    if (childError) {
      console.error('[CHATBOT SEED] Child insert error:', childError)
      return NextResponse.json({ error: 'Erreur lors de l\'insertion des sous-sujets.' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `${rootData.length} sujets et ${childInserts.length} sous-sujets créés avec succès.`,
    })
  } catch (error) {
    console.error('[CHATBOT SEED] Error:', error)
    return NextResponse.json({ error: 'Erreur interne.' }, { status: 500 })
  }
}
