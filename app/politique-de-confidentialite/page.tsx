import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité du site morateur2026.fr — traitement des données personnelles, droits RGPD.',
  alternates: { canonical: '/politique-de-confidentialite' },
}

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-24 sm:py-32">
        <h1 className="text-3xl font-accent font-bold mb-8">Politique de confidentialité</h1>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <p className="text-sm">Dernière mise à jour : mars 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données personnelles est l&apos;association de
              campagne &laquo; Morateur 2026 — Bouc Bel Air a de l&apos;Avenir &raquo;, représentée
              par Mathieu Morateur.
            </p>
            <p>Contact : contact@morateur2026.fr</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Données collectées</h2>
            <p>
              Nous collectons les données personnelles suivantes :
            </p>
            <p className="font-medium text-foreground/80 mt-2">Via le formulaire de contact &laquo; Rejoignez-nous &raquo; :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Prénom et nom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Message de motivations</li>
            </ul>
            <p className="font-medium text-foreground/80 mt-2">Via le formulaire d&apos;inscription à la newsletter :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Adresse email</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Finalités du traitement</h2>
            <p>Vos données sont collectées pour les finalités suivantes :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Répondre à votre demande de contact ou d&apos;engagement dans la campagne</li>
              <li>Vous informer des événements et actualités de la campagne</li>
              <li>Gérer les relations avec les sympathisants et bénévoles</li>
              <li>Vous envoyer la newsletter de la campagne (uniquement si vous y avez consenti explicitement)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Base légale</h2>
            <p>
              Le traitement de vos données repose sur votre consentement (article 6.1.a du RGPD),
              exprimé lors de la soumission du formulaire de contact.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Durée de conservation</h2>
            <p>
              Vos données personnelles sont conservées pour la durée de la campagne électorale et
              au maximum 3 mois après le scrutin des élections municipales 2026, sauf obligation
              légale contraire.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Destinataires des données</h2>
            <p>
              Vos données sont exclusivement destinées à l&apos;équipe de campagne Morateur 2026.
              Elles ne sont ni vendues, ni cédées, ni communiquées à des tiers à des fins
              commerciales.
            </p>
            <p className="mt-2">
              <strong>Sous-traitant :</strong> pour l&apos;envoi de la newsletter, nous utilisons
              la plateforme <strong>Brevo</strong> (anciennement Sendinblue), société Sendinblue SAS,
              dont les données sont hébergées au sein de l&apos;Union européenne. Brevo agit en tant
              que sous-traitant au sens de l&apos;article 28 du RGPD et ne traite vos données que
              sur nos instructions, aux seules fins d&apos;envoi de la newsletter.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Vos droits (RGPD)</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la
              loi Informatique et Libertés, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Droit d&apos;accès :</strong> obtenir la confirmation que vos données sont traitées et en obtenir une copie</li>
              <li><strong>Droit de rectification :</strong> faire corriger des données inexactes ou incomplètes</li>
              <li><strong>Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
              <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              <li><strong>Droit de retrait du consentement :</strong> retirer votre consentement à tout moment</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à :{' '}
              <a href="mailto:contact@morateur2026.fr" className="text-campaign-lime hover:underline">
                contact@morateur2026.fr
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Newsletter</h2>
            <p>
              Vous pouvez vous inscrire à la newsletter de la campagne Morateur 2026 via le
              formulaire dédié sur notre site ou en cochant l&apos;option correspondante dans le
              formulaire &laquo; Rejoignez-nous &raquo;.
            </p>
            <p className="mt-2">
              <strong>Consentement explicite :</strong> l&apos;inscription à la newsletter nécessite
              votre consentement explicite via une case à cocher. Votre adresse email est alors
              transmise à notre sous-traitant Brevo pour l&apos;envoi des communications.
            </p>
            <p className="mt-2">
              <strong>Contenu :</strong> actualités de la campagne, événements, avancées du projet
              municipal pour Bouc-Bel-Air.
            </p>
            <p className="mt-2">
              <strong>Désinscription :</strong> vous pouvez vous désinscrire à tout moment en
              cliquant sur le lien de désinscription présent dans chaque email, ou en nous
              contactant à{' '}
              <a href="mailto:contact@morateur2026.fr" className="text-campaign-lime hover:underline">
                contact@morateur2026.fr
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Cookies</h2>
            <p>
              Pour en savoir plus sur les cookies utilisés sur ce site, consultez notre{' '}
              <Link href="/cookies" className="text-campaign-lime hover:underline">
                politique de cookies
              </Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Réclamation</h2>
            <p>
              Si vous estimez que le traitement de vos données n&apos;est pas conforme à la
              réglementation, vous pouvez adresser une réclamation à la CNIL (Commission Nationale
              de l&apos;Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-campaign-lime hover:underline">www.cnil.fr</a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Link href="/" className="text-campaign-lime hover:underline text-sm">
            &larr; Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  )
}
