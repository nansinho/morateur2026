'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Share2, ChevronRight, Heart } from 'lucide-react'
import Link from 'next/link'
import DOMPurify from 'isomorphic-dompurify'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Article } from '@/lib/types/database'

const tagStyles: Record<string, { bg: string; text: string; accent: string }> = {
  'Événement': { bg: 'bg-campaign-lime-light', text: 'text-accent-foreground', accent: 'bg-campaign-lime/20' },
  'Terrain': { bg: 'bg-primary', text: 'text-primary-foreground', accent: 'bg-primary/10' },
  'Programme': { bg: 'bg-campaign-olive', text: 'text-primary-foreground', accent: 'bg-campaign-olive/10' },
  'Tribune': { bg: 'bg-campaign-steel', text: 'text-primary-foreground', accent: 'bg-campaign-steel/10' },
}

function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '')
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function formatDate(date: string): string {
  try {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return date
  }
}

function formatDateShort(date: string): string {
  try {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
    })
  } catch {
    return date
  }
}

export default function ArticleContent({
  article,
  relatedArticles,
}: {
  article: Article
  relatedArticles: Article[]
}) {
  const style = tagStyles[article.tag] || { bg: 'bg-muted', text: 'text-foreground', accent: 'bg-muted/10' }
  const sanitizedContent = useMemo(
    () => article.content ? DOMPurify.sanitize(article.content, { ADD_TAGS: ['iframe'], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'target'] }) : '',
    [article.content]
  )
  const readingTime = article.content ? estimateReadingTime(article.content) : null
  const [progress, setProgress] = useState(0)
  const articleRef = useRef<HTMLDivElement>(null)
  const formattedDate = formatDate(article.date)

  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return
      const el = articleRef.current
      const rect = el.getBoundingClientRect()
      const total = el.scrollHeight - window.innerHeight
      const scrolled = -rect.top
      setProgress(Math.min(100, Math.max(0, (scrolled / total) * 100)))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title: article.title, url })
    } else {
      await navigator.clipboard.writeText(url)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px]">
        <motion.div
          className="h-full gradient-lime"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Hero Section — Split editorial layout */}
      {article.image ? (
        <section className="relative pt-20 lg:pt-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 lg:py-16">
              {/* Left: Text content */}
              <div className="order-2 lg:order-1">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`${style.bg} ${style.text} inline-block px-4 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider`}
                >
                  {article.tag}
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="font-accent font-extrabold text-primary text-3xl sm:text-4xl lg:text-5xl xl:text-[3.5rem] leading-[1.1] mt-5"
                >
                  {article.title}
                </motion.h1>

                {article.description && (
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-lg lg:text-xl text-gray-500 mt-6 leading-relaxed"
                  >
                    {article.description}
                  </motion.p>
                )}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.65 }}
                  className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-gray-100"
                >
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={article.date} className="text-sm font-medium">{formattedDate}</time>
                  </div>
                  {readingTime && (
                    <>
                      <span className="text-gray-200">·</span>
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{readingTime} min de lecture</span>
                      </div>
                    </>
                  )}
                  <button
                    onClick={handleShare}
                    className="ml-auto flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm font-medium bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-full"
                    title="Partager"
                  >
                    <Share2 className="w-4 h-4" />
                    Partager
                  </button>
                </motion.div>
              </div>

              {/* Right: Image */}
              <div className="order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="relative aspect-[4/3] lg:aspect-[3/4] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img
                    src={article.image}
                    alt={article.image_alt || article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/candidat-banner.png' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Decorative divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-campaign-lime/30 to-transparent" />
        </section>
      ) : (
        /* No image fallback */
        <section className="relative pt-28 lg:pt-32 pb-8">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`${style.bg} ${style.text} inline-block px-4 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider`}
            >
              {article.tag}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="font-accent font-extrabold text-primary text-3xl sm:text-4xl md:text-5xl leading-[1.1] mt-6 mb-4"
            >
              {article.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-16 h-1 gradient-lime rounded-full mx-auto"
            />

            {article.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-lg lg:text-xl text-gray-500 mt-8 leading-relaxed max-w-2xl mx-auto"
              >
                {article.description}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap items-center justify-center gap-4 mt-8 pt-6 border-t border-gray-100"
            >
              <div className="flex items-center gap-1.5 text-gray-400">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.date} className="text-sm font-medium">{formattedDate}</time>
              </div>
              {readingTime && (
                <>
                  <span className="text-gray-200">·</span>
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{readingTime} min de lecture</span>
                  </div>
                </>
              )}
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm font-medium bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-full"
                title="Partager"
              >
                <Share2 className="w-4 h-4" />
                Partager
              </button>
            </motion.div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-campaign-lime/30 to-transparent mt-8" />
        </section>
      )}

      {/* Article body with sidebar */}
      <section ref={articleRef}>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 xl:gap-16 pt-12 lg:pt-16">

            {/* Main content column */}
            <div className="max-w-none lg:max-w-[720px]">

              {/* Rich content */}
              {article.content && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <div
                    className="prose prose-lg prose-article max-w-none"
                    dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                  />
                </motion.div>
              )}

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-20"
              >
                <div className="gradient-teal rounded-3xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden">
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-5">
                      <Heart className="w-7 h-7 text-campaign-lime-light" />
                    </div>
                    <h3 className="font-accent font-bold text-white text-xl sm:text-2xl mb-3">
                      Engagez-vous pour Bouc-Bel-Air
                    </h3>
                    <p className="text-white/70 text-base mb-8 max-w-md mx-auto leading-relaxed">
                      Rejoignez le mouvement Morateur 2026 et participez au renouveau de notre commune.
                    </p>
                    <Link
                      href="/#procuration"
                      className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-accent font-bold text-sm uppercase tracking-wider hover:bg-campaign-lime hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Rejoignez-nous
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar — desktop only */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">
                {/* Meta card */}
                <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <time dateTime={article.date} className="text-sm font-medium">{formattedDate}</time>
                  </div>
                  {readingTime && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock className="w-4 h-4 shrink-0" />
                      <span className="text-sm font-medium">{readingTime} min de lecture</span>
                    </div>
                  )}
                  <div className="h-px bg-gray-200" />
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors w-full"
                  >
                    <Share2 className="w-4 h-4 shrink-0" />
                    Partager cet article
                  </button>
                </div>

                {/* Tag */}
                <div>
                  <span
                    className={`${style.bg} ${style.text} inline-block px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider`}
                  >
                    {article.tag}
                  </span>
                </div>

                {/* Back link */}
                <Link
                  href="/actualites"
                  className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Toutes les actualités
                </Link>
              </div>
            </aside>
          </div>

          {/* Mobile back link */}
          <div className="lg:hidden mt-12 pt-6 border-t border-gray-100">
            <Link
              href="/actualites"
              className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Toutes les actualités
            </Link>
          </div>
        </div>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div className="bg-gray-50 mt-24 border-t border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-16 lg:py-24">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="section-label mb-10">Articles similaires</div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedArticles.map((related, index) => {
                    const relStyle = tagStyles[related.tag] || { bg: 'bg-muted', text: 'text-foreground', accent: 'bg-muted/10' }
                    return (
                      <motion.div
                        key={related.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      >
                        <Link
                          href={`/actualites/${related.slug}`}
                          className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5 border border-gray-100"
                        >
                          {related.image && (
                            <div className="aspect-[16/10] overflow-hidden relative">
                              <img
                                src={related.image}
                                alt={related.image_alt || related.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              <span
                                className={`absolute top-3 left-3 ${relStyle.bg} ${relStyle.text} px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider shadow-sm`}
                              >
                                {related.tag}
                              </span>
                            </div>
                          )}
                          <div className="p-6">
                            <h3 className="font-accent font-bold text-primary text-base leading-snug line-clamp-2 group-hover:text-campaign-olive transition-colors duration-300">
                              {related.title}
                            </h3>
                            {related.description && (
                              <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                                {related.description}
                              </p>
                            )}
                            <div className="flex items-center gap-1.5 text-gray-400 mt-4">
                              <Calendar className="w-3.5 h-3.5" />
                              <time dateTime={related.date} className="text-xs font-medium">
                                {formatDateShort(related.date)}
                              </time>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
