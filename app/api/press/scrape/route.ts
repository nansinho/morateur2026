import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// Logos locaux pour les sources connues (clé = pattern partiel en minuscule)
const KNOWN_LOGOS: { pattern: string; logo: string }[] = [
  { pattern: 'provence', logo: '/images/logo-laprovence.svg' },
  { pattern: 'marseillaise', logo: '/images/logo-lamarseillaise.svg' },
]

function findLogo(source: string, url: string): string {
  const haystack = `${source} ${url}`.toLowerCase()
  for (const { pattern, logo } of KNOWN_LOGOS) {
    if (haystack.includes(pattern)) return logo
  }
  return ''
}

function extractMeta(html: string, property: string): string {
  // Try property="..." (Open Graph)
  const ogMatch = html.match(
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i')
  ) || html.match(
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, 'i')
  )
  if (ogMatch) return ogMatch[1]

  // Try name="..." (standard meta)
  const nameMatch = html.match(
    new RegExp(`<meta[^>]+name=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i')
  ) || html.match(
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${property}["']`, 'i')
  )
  if (nameMatch) return nameMatch[1]

  return ''
}

function extractTitle(html: string): string {
  return extractMeta(html, 'og:title')
    || (html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() ?? '')
}

function extractJsonLd(html: string): Record<string, unknown> | null {
  // Find all JSON-LD scripts
  const regex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    try {
      const data = JSON.parse(match[1])
      // Could be an array or a single object
      const items = Array.isArray(data) ? data : [data]
      for (const item of items) {
        const type = item['@type']
        if (type === 'NewsArticle' || type === 'Article' || type === 'WebPage' ||
            (Array.isArray(type) && (type.includes('NewsArticle') || type.includes('Article')))) {
          return item
        }
      }
    } catch {
      // Invalid JSON, skip
    }
  }
  return null
}

function extractAuthorFromJsonLd(jsonLd: Record<string, unknown>): string {
  const author = jsonLd.author
  if (!author) return ''
  if (typeof author === 'string') return author
  if (Array.isArray(author)) {
    const names = author.map(a => typeof a === 'string' ? a : (a as Record<string, string>)?.name).filter(Boolean)
    return names.join(', ')
  }
  if (typeof author === 'object' && author !== null) {
    return (author as Record<string, string>).name || ''
  }
  return ''
}

function extractDateFromJsonLd(jsonLd: Record<string, unknown>): string {
  return (jsonLd.datePublished || jsonLd.dateCreated || jsonLd.dateModified || '') as string
}

function extractPublisherFromJsonLd(jsonLd: Record<string, unknown>): string {
  const publisher = jsonLd.publisher
  if (!publisher) return ''
  if (typeof publisher === 'string') return publisher
  if (typeof publisher === 'object' && publisher !== null) {
    return (publisher as Record<string, string>).name || ''
  }
  return ''
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).replace(/^1 /, '1er ')
  } catch {
    return dateStr
  }
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num)))
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const body = await request.json()
  const url = body.url?.trim()
  if (!url) {
    return NextResponse.json({ error: 'URL manquante' }, { status: 400 })
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.5',
      },
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      return NextResponse.json({ error: `Erreur ${response.status} en récupérant l'article` }, { status: 422 })
    }

    const html = await response.text()

    // Try JSON-LD first (most reliable for news sites)
    const jsonLd = extractJsonLd(html)

    // Extract metadata with JSON-LD fallback
    const rawTitle = (jsonLd?.headline as string) || extractTitle(html)
    const rawDescription = (jsonLd?.description as string) || extractMeta(html, 'og:description') || extractMeta(html, 'description')
    const rawSiteName = extractPublisherFromJsonLd(jsonLd || {}) || extractMeta(html, 'og:site_name')
    const rawAuthor = extractAuthorFromJsonLd(jsonLd || {})
      || extractMeta(html, 'article:author')
      || extractMeta(html, 'author')
      || extractMeta(html, 'dc.creator')
      || extractMeta(html, 'twitter:creator')
    const rawDate = extractDateFromJsonLd(jsonLd || {})
      || extractMeta(html, 'article:published_time')
      || extractMeta(html, 'date')
      || extractMeta(html, 'publishedDate')
      || extractMeta(html, 'dc.date')

    const title = decodeHtmlEntities(rawTitle)
    const excerpt = decodeHtmlEntities(rawDescription)
    const source = decodeHtmlEntities(rawSiteName)
    const author = decodeHtmlEntities(rawAuthor)
    const date = formatDate(rawDate)

    // Match known logo (fuzzy: checks source name AND url)
    const logo = findLogo(source, url)

    return NextResponse.json({
      title,
      excerpt,
      source,
      author,
      date,
      logo,
      url,
    })
  } catch (err) {
    console.error('[PRESS SCRAPE]', err)
    const message = err instanceof Error && err.name === 'TimeoutError'
      ? 'Délai d\'attente dépassé'
      : 'Impossible de récupérer l\'article'
    return NextResponse.json({ error: message }, { status: 422 })
  }
}
