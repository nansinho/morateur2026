import type { MetadataRoute } from 'next'
import { SITE_URL, PAGES } from '@/lib/site-config'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  // Add quartiers hub page
  staticPages.push({
    url: `${SITE_URL}/quartiers`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return staticPages
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  // Add active quartier pages with real updated_at dates
  try {
    const { data: quartiers } = await supabase
      .from('quartiers')
      .select('slug, updated_at')
      .eq('is_active', true)

    if (quartiers) {
      for (const q of quartiers) {
        staticPages.push({
          url: `${SITE_URL}/${q.slug}`,
          lastModified: q.updated_at ? new Date(q.updated_at) : now,
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    }
  } catch (e) {
    console.error('[SITEMAP] Error fetching quartiers:', e)
  }

  // Add published article pages with real updated_at dates
  try {
    const { data: articles } = await supabase
      .from('articles')
      .select('slug, updated_at, published_at')
      .not('slug', 'is', null)
      .eq('status', 'published')

    if (articles) {
      for (const a of articles) {
        if (a.slug) {
          staticPages.push({
            url: `${SITE_URL}/actualites/${a.slug}`,
            lastModified: a.updated_at
              ? new Date(a.updated_at)
              : a.published_at
                ? new Date(a.published_at)
                : now,
            changeFrequency: 'monthly',
            priority: 0.7,
          })
        }
      }
    }
  } catch (e) {
    console.error('[SITEMAP] Error fetching articles:', e)
  }

  return staticPages
}
