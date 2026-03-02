import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { SITE_URL, CANDIDATE } from '@/lib/site-config'
import type { Article } from '@/lib/types/database'
import ArticleContent from './article-content'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getArticle(slug: string): Promise<Article | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single()
  return data as Article | null
}

async function getRelatedArticles(tag: string, excludeId: string): Promise<Article[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('tag', tag)
    .neq('id', excludeId)
    .not('slug', 'is', null)
    .order('sort_order')
    .limit(3)
  return (data as Article[]) ?? []
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: 'Article introuvable' }

  const description = article.meta_description || article.description
  const keywords = article.meta_keywords || `${article.tag}, Bouc-Bel-Air, Morateur 2026`

  return {
    title: article.title,
    description,
    keywords: keywords.split(',').map((k) => k.trim()),
    alternates: { canonical: `/actualites/${slug}` },
    openGraph: {
      title: article.title,
      description,
      url: `${SITE_URL}/actualites/${slug}`,
      type: 'article',
      publishedTime: article.date,
      authors: [CANDIDATE.name],
      images: article.image
        ? [{ url: article.image, width: 1200, height: 630, alt: article.image_alt || article.title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  const relatedArticles = await getRelatedArticles(article.tag, article.id)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.meta_description || article.description,
    image: article.image || undefined,
    datePublished: article.date,
    author: {
      '@type': 'Person',
      name: CANDIDATE.name,
      url: `${SITE_URL}/candidat`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Morateur 2026',
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/actualites/${slug}`,
    inLanguage: 'fr',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Actualités', item: `${SITE_URL}/actualites` },
      { '@type': 'ListItem', position: 3, name: article.title, item: `${SITE_URL}/actualites/${slug}` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ArticleContent article={article} relatedArticles={relatedArticles} />
    </>
  )
}
