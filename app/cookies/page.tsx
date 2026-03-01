import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politique de cookies',
  description: 'Politique de cookies du site morateur2026.fr — cookies techniques, analytics et gestion du consentement.',
  alternates: { canonical: '/cookies' },
}

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-24 sm:py-32">
        <h1 className="text-3xl font-accent font-bold mb-8">Politique de cookies</h1>

        <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
          <p className="text-sm">Dernière mise à jour : mars 2026</p>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Qu&apos;est-ce qu&apos;un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur,
              téléphone, tablette) lors de votre visite sur un site web. Il permet au site
              de mémoriser vos actions et préférences.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Cookies techniques (nécessaires)</h2>
            <p>
              Ces cookies sont indispensables au fonctionnement du site. Ils ne peuvent pas
              être désactivés.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="text-left p-3 border-b border-border text-foreground">Cookie</th>
                    <th className="text-left p-3 border-b border-border text-foreground">Finalité</th>
                    <th className="text-left p-3 border-b border-border text-foreground">Durée</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border-b border-border">__next</td>
                    <td className="p-3 border-b border-border">Fonctionnement du framework Next.js</td>
                    <td className="p-3 border-b border-border">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Cookies analytiques (optionnels)</h2>
            <p>
              Si activés, ces cookies nous permettent de mesurer l&apos;audience du site et
              d&apos;améliorer son contenu. Ils ne sont déposés qu&apos;avec votre consentement.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="text-left p-3 border-b border-border text-foreground">Service</th>
                    <th className="text-left p-3 border-b border-border text-foreground">Finalité</th>
                    <th className="text-left p-3 border-b border-border text-foreground">Durée</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border-b border-border">Google Analytics 4</td>
                    <td className="p-3 border-b border-border">Mesure d&apos;audience, pages visitées, durée de session</td>
                    <td className="p-3 border-b border-border">13 mois</td>
                  </tr>
                  <tr>
                    <td className="p-3 border-b border-border">Meta Pixel</td>
                    <td className="p-3 border-b border-border">Mesure de performance des campagnes sur Facebook/Instagram</td>
                    <td className="p-3 border-b border-border">90 jours</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm mt-2">
              Note : ces services ne sont actuellement pas activés. Ils le seront uniquement si
              les identifiants de tracking sont configurés.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">Gestion de vos préférences</h2>
            <p>
              Vous pouvez à tout moment gérer vos préférences en matière de cookies via les
              paramètres de votre navigateur :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Chrome : Paramètres &gt; Confidentialité et sécurité &gt; Cookies</li>
              <li>Firefox : Paramètres &gt; Vie privée et sécurité &gt; Cookies</li>
              <li>Safari : Préférences &gt; Confidentialité &gt; Cookies</li>
              <li>Edge : Paramètres &gt; Cookies et autorisations de site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground">En savoir plus</h2>
            <p>
              Pour plus d&apos;informations sur la protection de vos données, consultez notre{' '}
              <Link href="/politique-de-confidentialite" className="text-campaign-lime hover:underline">
                politique de confidentialité
              </Link>
              {' '}ou contactez-nous à{' '}
              <a href="mailto:contact@morateur2026.fr" className="text-campaign-lime hover:underline">
                contact@morateur2026.fr
              </a>.
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
