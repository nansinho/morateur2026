import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/site-config'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Plan du site',
  description: 'Plan du site morateur2026.fr — retrouvez toutes les pages du site de campagne de Mathieu Morateur, municipales 2026 à Bouc-Bel-Air.',
  alternates: { canonical: '/plan-du-site' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Plan du site', item: `${SITE_URL}/plan-du-site` },
  ],
}

const mainPages = [
  { href: '/', label: 'Accueil', desc: 'Page d\'accueil du site de campagne' },
  { href: '/candidat', label: 'Le Candidat', desc: 'Découvrez Mathieu Morateur, son parcours et ses valeurs' },
  { href: '/programme', label: 'Programme', desc: 'Le programme municipal pour Bouc-Bel-Air' },
  { href: '/quartiers', label: 'Quartiers', desc: 'Les projets par quartier de Bouc-Bel-Air' },
  { href: '/equipe', label: 'L\'Équipe', desc: 'Les colistiers de la liste Morateur 2026' },
  { href: '/actualites', label: 'Actualités', desc: 'Les dernières actualités de la campagne' },
  { href: '/presse', label: 'Presse', desc: 'Revue de presse et couverture médiatique' },
]

const legalPages = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/politique-de-confidentialite', label: 'Politique de confidentialité' },
  { href: '/cookies', label: 'Gestion des cookies' },
  { href: '/accessibilite', label: 'Accessibilité' },
  { href: '/plan-du-site', label: 'Plan du site' },
]

export default async function PlanDuSitePage() {
  const supabase = await createClient()

  const [{ data: articles }, { data: quartiers }] = await Promise.all([
    supabase.from('articles').select('title, slug').not('slug', 'is', null).order('sort_order'),
    supabase.from('quartiers').select('name, slug').not('slug', 'is', null).order('sort_order'),
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="min-h-screen bg-background text-foreground">
        <div className="max-w-3xl mx-auto px-6 py-24 sm:py-32">
          <h1 className="text-3xl font-accent font-bold mb-2">Plan du site</h1>
          <p className="text-muted-foreground mb-10">
            Retrouvez l&apos;ensemble des pages du site morateur2026.fr.
          </p>

          <nav aria-label="Plan du site" className="space-y-10">
            {/* Pages principales */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Pages principales</h2>
              <ul className="space-y-3">
                {mainPages.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href} className="text-campaign-lime hover:underline font-medium">
                      {page.label}
                    </Link>
                    <span className="text-muted-foreground text-sm ml-2">— {page.desc}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Articles */}
            {articles && articles.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Actualités <span className="text-muted-foreground text-sm font-normal">({articles.length} articles)</span>
                </h2>
                <ul className="space-y-2">
                  {articles.map((article) => (
                    <li key={article.slug}>
                      <Link
                        href={`/actualites/${article.slug}`}
                        className="text-campaign-lime hover:underline font-medium"
                      >
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Quartiers */}
            {quartiers && quartiers.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Quartiers <span className="text-muted-foreground text-sm font-normal">({quartiers.length} quartiers)</span>
                </h2>
                <ul className="space-y-2">
                  {quartiers.map((q) => (
                    <li key={q.slug}>
                      <Link
                        href={`/${q.slug}`}
                        className="text-campaign-lime hover:underline font-medium"
                      >
                        {q.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Pages légales */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Informations légales</h2>
              <ul className="space-y-2">
                {legalPages.map((page) => (
                  <li key={page.href}>
                    <Link href={page.href} className="text-campaign-lime hover:underline font-medium">
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </nav>

          <div className="mt-12 pt-8 border-t border-border">
            <Link href="/" className="text-campaign-lime hover:underline text-sm">
              &larr; Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
