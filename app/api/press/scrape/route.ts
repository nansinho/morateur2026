import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// Logos locaux pour les sources connues
const KNOWN_LOGOS: Record<string, string> = {
  'la provence': '/images/logo-laprovence.svg',
  'la marseillaise': '/images/logo-lamarseillaise.svg',
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
  const ogTitle = extractMeta(html, 'og:title')
  if (ogTitle) return ogTitle

  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  return titleMatch ? titleMatch[1].trim() : ''
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
        'User-Agent': 'Mozilla/5.0 (compatible; Morateur2026/1.0)',
        'Accept': 'text/html,application/xhtml+xml',
      },
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      return NextResponse.json({ error: `Erreur ${response.status} en récupérant l'article` }, { status: 422 })
    }

    const html = await response.text()

    // Extract metadata
    const rawTitle = extractTitle(html)
    const rawDescription = extractMeta(html, 'og:description') || extractMeta(html, 'description')
    const rawSiteName = extractMeta(html, 'og:site_name')
    const rawAuthor = extractMeta(html, 'article:author') || extractMeta(html, 'author')
    const rawDate = extractMeta(html, 'article:published_time') || extractMeta(html, 'date') || extractMeta(html, 'publishedDate')

    const title = decodeHtmlEntities(rawTitle)
    const excerpt = decodeHtmlEntities(rawDescription)
    const source = decodeHtmlEntities(rawSiteName)
    const author = decodeHtmlEntities(rawAuthor)
    const date = formatDate(rawDate)

    // Match known logo
    const logo = KNOWN_LOGOS[source.toLowerCase()] || ''

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
