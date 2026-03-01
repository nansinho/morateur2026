import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site morateur2026.fr — campagne électorale de Mathieu Morateur, municipales 2026 à Bouc-Bel-Air.',
  alternates: { canonical: '/mentions-legales' },
}

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-24 sm:py-32">
        <h1 className="text-3xl font-accent font-bold mb-8">Mentions légales</h1>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <section>
            <h2 className="text-xl font-semibold text-foreground">Éditeur du site</h2>
            <p>
              Le site <strong>morateur2026.fr</strong> est édité par l&apos;association de campagne
              &laquo; Morateur 2026 — Bouc Bel Air a de l&apos;Avenir &raquo;.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Directeur de la publication : Mathieu Morateur</li>
              <li>Adresse : Bouc-Bel-Air (13320), France</li>
              <li>Email : contact@morateur2026.fr</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Mandataire financier</h2>
            <p>
              Conformément à l&apos;article L.52-4 du Code électoral, un mandataire financier a été
              désigné pour la campagne de Mathieu Morateur aux élections municipales 2026 à
              Bouc-Bel-Air. Toute contribution financière doit être adressée au mandataire financier.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Hébergement</h2>
            <p>
              Le site est hébergé par Coolify / serveur dédié.<br />
              Adresse de l&apos;hébergeur : se référer aux conditions de l&apos;hébergeur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Conception et réalisation</h2>
            <p>
              Site conçu et développé par{' '}
              <a href="https://agencehds.fr" target="_blank" rel="noopener noreferrer" className="text-campaign-lime hover:underline">
                Agence HDS
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu du site (textes, images, logos, vidéos, graphismes) est
              protégé par le droit d&apos;auteur. Toute reproduction, même partielle, est interdite
              sans autorisation préalable de l&apos;éditeur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Responsabilité</h2>
            <p>
              L&apos;éditeur s&apos;efforce de fournir des informations exactes et à jour. Toutefois,
              il ne saurait être tenu responsable des erreurs, omissions ou résultats obtenus suite
              à l&apos;utilisation des informations fournies sur ce site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Liens hypertextes</h2>
            <p>
              Le site peut contenir des liens vers des sites tiers. L&apos;éditeur n&apos;exerce
              aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Données personnelles</h2>
            <p>
              Pour en savoir plus sur la collecte et le traitement de vos données personnelles,
              consultez notre{' '}
              <Link href="/politique-de-confidentialite" className="text-campaign-lime hover:underline">
                politique de confidentialité
              </Link>.
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
