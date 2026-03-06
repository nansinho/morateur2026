import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const QUARTIERS_CONFIG = [
  {
    slug: 'montaury',
    description: 'Merci de prendre le temps de répondre aux questions suivantes. Vos réponses aideront à mieux comprendre les besoins spécifiques de votre quartier et à construire un programme adapté.',
    questions: [
      {
        question_number: 1,
        question_text: 'Les quartiers de Violesi et Montaury sont prévus, par le plan local d\'urbanisme intercommunal approuvé par la municipalité sortante, pour accueillir 1200 nouveaux logements. C\'est largement supérieur aux obligations de constructions de logements sociaux, qui se montent à 760 logements, répartis sur de nombreuses années. Aussi, parce que la RD8n est déjà bien trop saturée, nous estimons que le PLUi doit être revu pour sanctuariser le lit du vallat de Violesi afin d\'y créer un véritable parc arboré enjambant le cours d\'eau.',
        question_image_url: 'https://morateur2026.fr/images/violesi.png',
      },
      {
        question_number: 2,
        question_text: 'La requalification du chemin de Sauvecanne a pris 6 ans de retard. Nous estimons qu\'il est plus que jamais urgent de le faire aboutir rapidement. Pour ce faire, nous proposons des aménagements plus sobres et plus utiles : pas de grande piste cycle d\'un seul côté de la chaussé, mais un trottoir continu pour permettre la desserte à pied des arrêts de bus. Aménagée avec un éclairage public performant guidé par la présence, et des caméras dotés de capteurs de bruit, le chemin de Sauvecanne sera le projet pilote des nouveaux équipements de voirie. Nous y instaurerons également notre proposition de "fast lane boucaine" réservant par une barrière fonctionnant à la reconnaissance de la plaque d\'immatriculation l\'accès de la voie aux seuls véhicules boucains entre 7h et 9h, afin d\'éviter le trafic e délestage. Cette proposition a pour objectif d\'inciter l\'État, le Département et la Métropole à réaliser les ouvrages de contournement de Bouc-Bel-Air.',
        question_image_url: '',
      },
      {
        question_number: 3,
        question_text: 'La création de réseaux 5G propres à la mairie permet d\'envisager aujourd\'hui la pose de caméras et de capteurs de bruit (afin d\'intervenir pour les troubles à la tranquillité) et de qualité de l\'air (pour vérifier que les seuils imposés par la règlementation sont bien respectés) pour un coût divisé par dix par rapport à 2020. Aussi, l\'éclairage public pourra être déclenché par des capteurs de présence. Pensez-vous que ce déploiement soit une priorité pour le prochain mandat ?',
        question_image_url: '',
      },
      {
        question_number: 4,
        question_text: 'La lutte contre la prolifération des moustiques dans le quartier passe par le traitement des berges du vallat chaque printemps, et par la pose et la maintenance de bornes aspirateurs à moustiques autour des points stratégiques. De plus, nous proposerons un tarif négocié pour les bornes aspirateurs à moustiques à installer chez soi.',
        question_image_url: '',
      },
    ],
  },
  {
    slug: 'gratiane',
    description: 'Merci de prendre le temps de répondre aux questions suivantes. Vos réponses aideront à mieux comprendre les besoins spécifiques de votre quartier et à construire un programme adapté.',
    questions: [
      {
        question_number: 1,
        question_text: 'Nous imposerons sur la commune une règle simple : afin de limiter la construction de nouveaux logements au nombre strictement nécessaire pour atteindre les objectifs de création de logements sociaux (170 tous les 3 ans), tous les projets immobiliers collectifs seront proposés en bail réel solidaire, c\'est-à-dire en accession sociale à la propriété (et non en locatif social). Ce seront donc uniquement ces 170 logements nous aurons à produire en 3 ans, plutôt que les 1000 aujourd\'hui projetés. Les projets déjà en cours de construction suffiront. Donc nous refuserons tout nouveau permis collectif. Seuls les détachements de parcelles familiaux seront facilités. Qu\'en pensez-vous ?',
        question_image_url: '',
      },
      {
        question_number: 2,
        question_text: 'La création de réseaux 5G propres à la mairie permet d\'envisager aujourd\'hui la pose de caméras et de capteurs de bruit (afin d\'intervenir pour les troubles à la tranquillité) et de qualité de l\'air (pour vérifier que les seuils imposés par la règlementation sont bien respectés) pour un coût divisé par dix par rapport à 2020. Aussi, l\'éclairage public pourra être déclenché par des capteurs de présence. Pensez-vous que ce déploiement soit une priorité pour le prochain mandat ?',
        question_image_url: '',
      },
      {
        question_number: 3,
        question_text: 'La lutte contre la prolifération des moustiques dans le quartier passe par le traitement des berges du vallat chaque printemps, et par la pose et la maintenance de bornes aspirateurs à moustiques autour des points stratégiques. De plus, nous proposerons un tarif négocié pour les bornes aspirateurs à moustiques à installer chez soi.',
        question_image_url: '',
      },
    ],
  },
]

export async function POST() {
  try {
    const supabase = await createClient()
    const results: string[] = []

    for (const config of QUARTIERS_CONFIG) {
      // 1. Update quartier: activate + set description
      const { data: quartier, error: updateError } = await supabase
        .from('quartiers')
        .update({
          is_active: true,
          description: config.description,
        })
        .eq('slug', config.slug)
        .select('id, name')
        .single()

      if (updateError || !quartier) {
        results.push(`${config.slug}: erreur mise à jour — ${updateError?.message}`)
        continue
      }

      // 2. Check if questions already exist
      const { count } = await supabase
        .from('quartier_questions')
        .select('*', { count: 'exact', head: true })
        .eq('quartier_id', quartier.id)

      if (count && count > 0) {
        results.push(`${quartier.name}: activé (${count} questions existantes conservées)`)
        continue
      }

      // 3. Insert questions
      const questionsToInsert = config.questions.map((q) => ({
        quartier_id: quartier.id,
        question_number: q.question_number,
        question_text: q.question_text,
        question_image_url: q.question_image_url,
        is_active: true,
      }))

      const { error: insertError } = await supabase
        .from('quartier_questions')
        .insert(questionsToInsert)

      if (insertError) {
        results.push(`${quartier.name}: activé mais erreur insertion questions — ${insertError.message}`)
      } else {
        results.push(`${quartier.name}: activé + ${questionsToInsert.length} questions créées`)
      }
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error('[QUARTIERS SEED] Error:', error)
    return NextResponse.json({ error: 'Erreur interne.' }, { status: 500 })
  }
}
