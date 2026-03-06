import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, PAGES } from '@/lib/site-config'
import { createClient } from '@/lib/supabase/server'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Sitemap XML',
  description: 'Visualisation du sitemap XML du site morateur2026.fr — liste complète des pages indexées par les moteurs de recherche.',
  alternates: { canonical: '/sitemap-xml' },
}

type SitemapEntry = {
  url: string
  lastmod: string
  changefreq: string
  priority: number
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}

function priorityColor(priority: number): string {
  if (priority >= 0.9) return 'text-green-400'
  if (priority >= 0.7) return 'text-campaign-lime'
  if (priority >= 0.5) return 'text-yellow-400'
  return 'text-muted-foreground'
}

function freqLabel(freq: string): string {
  const map: Record<string, string> = {
    daily: 'Quotidienne',
    weekly: 'Hebdomadaire',
    monthly: 'Mensuelle',
    yearly: 'Annuelle',
  }
  return map[freq] || freq
}

export default async function SitemapXmlPage() {
  const supabase = await createClient()
  const now = new Date()

  // Build entries matching sitemap.ts logic
  const entries: SitemapEntry[] = PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastmod: formatDate(now),
    changefreq: page.changeFrequency,
    priority: page.priority,
  }))

  // Quartiers hub
  entries.push({
    url: `${SITE_URL}/quartiers`,
    lastmod: formatDate(now),
    changefreq: 'weekly',
    priority: 0.7,
  })

  // Dynamic quartiers
  const { data: quartiers } = await supabase
    .from('quartiers')
    .select('slug, name, updated_at')
    .eq('is_active', true)
    .order('sort_order')

  if (quartiers) {
    for (const q of quartiers) {
      entries.push({
        url: `${SITE_URL}/${q.slug}`,
        lastmod: formatDate(q.updated_at ? new Date(q.updated_at) : now),
        changefreq: 'monthly',
        priority: 0.6,
      })
    }
  }

  // Dynamic articles
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, title, updated_at, published_at')
    .not('slug', 'is', null)
    .eq('status', 'published')
    .order('sort_order')

  if (articles) {
    for (const a of articles) {
      if (a.slug) {
        entries.push({
          url: `${SITE_URL}/actualites/${a.slug}`,
          lastmod: formatDate(
            a.updated_at ? new Date(a.updated_at)
              : a.published_at ? new Date(a.published_at)
                : now
          ),
          changefreq: 'monthly',
          priority: 0.7,
        })
      }
    }
  }

  return (
    <main className="min-h-screen bg-[#0d1117] text-gray-300">
      <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-accent font-bold text-white mb-2">
            Sitemap XML
          </h1>
          <p className="text-muted-foreground mb-4">
            Visualisation lisible du{' '}
            <a
              href="/sitemap.xml"
              className="text-campaign-lime hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              sitemap.xml
            </a>
            {' '}— {entries.length} URLs indexées.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400" />
              Priorité haute (&ge; 0.9)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-campaign-lime" />
              Priorité moyenne (0.7–0.8)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-yellow-400" />
              Priorité basse (0.5–0.6)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-gray-500" />
              Priorité minimale (&lt; 0.5)
            </span>
          </div>
        </div>

        {/* XML-style rendering */}
        <div className="rounded-lg border border-gray-700 bg-[#161b22] overflow-hidden">
          {/* XML prologue */}
          <div className="px-4 py-3 border-b border-gray-700 bg-[#1c2128] font-mono text-xs">
            <span className="text-gray-500">&lt;?</span>
            <span className="text-purple-400">xml</span>
            <span className="text-gray-500"> version=&quot;</span>
            <span className="text-orange-300">1.0</span>
            <span className="text-gray-500">&quot; encoding=&quot;</span>
            <span className="text-orange-300">UTF-8</span>
            <span className="text-gray-500">&quot;?&gt;</span>
          </div>

          <div className="px-4 py-3 font-mono text-xs leading-relaxed">
            {/* Opening urlset tag */}
            <div className="text-gray-500 mb-4">
              &lt;<span className="text-blue-400">urlset</span>{' '}
              <span className="text-purple-300">xmlns</span>=&quot;
              <span className="text-orange-300 text-[10px]">http://www.sitemaps.org/schemas/sitemap/0.9</span>
              &quot;&gt;
            </div>

            {/* URL entries */}
            <div className="space-y-1">
              {entries.map((entry, i) => (
                <details
                  key={entry.url}
                  className="group"
                  open={i < 5}
                >
                  <summary className="cursor-pointer hover:bg-[#1c2128] rounded px-2 py-1.5 list-none flex items-center gap-2">
                    <svg
                      className="w-3 h-3 text-gray-500 transition-transform group-open:rotate-90 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6 4l8 6-8 6V4z" />
                    </svg>
                    <span className="text-gray-500">&lt;</span>
                    <span className="text-blue-400">url</span>
                    <span className="text-gray-500">&gt;</span>
                    <span className="text-gray-500 ml-2 truncate max-w-[60vw] sm:max-w-none">
                      {entry.url.replace(SITE_URL, '')}
                    </span>
                    <span className={`ml-auto font-semibold ${priorityColor(entry.priority)}`}>
                      {entry.priority.toFixed(1)}
                    </span>
                  </summary>

                  <div className="ml-5 sm:ml-8 pl-4 border-l border-gray-700 py-1 space-y-0.5">
                    <XmlTag tag="loc">
                      <a
                        href={entry.url}
                        className="text-campaign-lime hover:underline break-all"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {entry.url}
                      </a>
                    </XmlTag>
                    <XmlTag tag="lastmod">
                      <span className="text-orange-300">{entry.lastmod}</span>
                    </XmlTag>
                    <XmlTag tag="changefreq">
                      <span className="text-orange-300">{entry.changefreq}</span>
                      <span className="text-gray-600 ml-2">({freqLabel(entry.changefreq)})</span>
                    </XmlTag>
                    <XmlTag tag="priority">
                      <span className={priorityColor(entry.priority)}>{entry.priority.toFixed(1)}</span>
                    </XmlTag>
                  </div>

                  <div className="ml-5 sm:ml-8 px-2 py-0.5 text-gray-500">
                    &lt;/<span className="text-blue-400">url</span>&gt;
                  </div>
                </details>
              ))}
            </div>

            {/* Closing urlset tag */}
            <div className="text-gray-500 mt-4">
              &lt;/<span className="text-blue-400">urlset</span>&gt;
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center text-sm">
          <Link href="/plan-du-site" className="text-campaign-lime hover:underline">
            &larr; Plan du site (HTML)
          </Link>
          <a
            href="/sitemap.xml"
            className="text-campaign-lime hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Voir le fichier sitemap.xml brut &rarr;
          </a>
        </div>
      </div>
    </main>
  )
}

function XmlTag({ tag, children }: { tag: string; children: React.ReactNode }) {
  return (
    <div className="px-2 py-0.5">
      <span className="text-gray-500">&lt;</span>
      <span className="text-cyan-400">{tag}</span>
      <span className="text-gray-500">&gt;</span>
      {children}
      <span className="text-gray-500">&lt;/</span>
      <span className="text-cyan-400">{tag}</span>
      <span className="text-gray-500">&gt;</span>
    </div>
  )
}
