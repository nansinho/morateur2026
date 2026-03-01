import type { MetadataRoute } from 'next'
import { SITE_URL, PAGES } from '@/lib/site-config'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  // Add quartiers hub page
  staticPages.push({
    url: `${SITE_URL}/quartiers`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  })

  // Add active quartier pages
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey)
      const { data: quartiers } = await supabase
        .from('quartiers')
        .select('slug')
        .eq('is_active', true)

      if (quartiers) {
        for (const q of quartiers) {
          staticPages.push({
            url: `${SITE_URL}/${q.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
          })
        }
      }
    }
  } catch (e) {
    console.error('[SITEMAP] Error fetching quartiers:', e)
  }

  return staticPages
}
