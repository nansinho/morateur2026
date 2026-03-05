'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Share2, ChevronRight, Heart } from 'lucide-react'
import Link from 'next/link'
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

export default function ArticleContent({
  article,
  relatedArticles,
}: {
  article: Article
  relatedArticles: Article[]
}) {
  const style = tagStyles[article.tag] || { bg: 'bg-muted', text: 'text-foreground', accent: 'bg-muted/10' }
  const readingTime = article.content ? estimateReadingTime(article.content) : null
  const [progress, setProgress] = useState(0)
  const articleRef = useRef<HTMLDivElement>(null)

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

  const formattedDate = (() => {
    try {
      return new Date(article.date).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    } catch {
      return article.date
    }
  })()

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

      {/* Hero image */}
      {article.image && (
        <section className="relative pt-20">
          <div className="aspect-[16/9] max-h-[560px] overflow-hidden relative">
            <motion.img
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              src={article.image}
              alt={article.image_alt || article.title}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = '/images/candidat-banner.png' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/5" />

            {/* Tag + title overlay on hero */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-14">
              <div className="container mx-auto max-w-4xl">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`${style.bg} ${style.text} inline-block px-4 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider mb-4`}
                >
                  {article.tag}
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                  className="font-accent font-extrabold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15] max-w-3xl"
                >
                  {article.title}
                </motion.h1>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Article body */}
      <section ref={articleRef}>
        <div className="bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Meta bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <div className="flex flex-wrap items-center gap-4 py-8 border-b border-gray-100">
                {/* Back link */}
                <Link
                  href="/actualites"
                  className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Actualités
                </Link>

                <span className="text-gray-200">|</span>

                {/* Tag badge (only show when no hero image) */}
                {!article.image && (
                  <>
                    <span
                      className={`${style.bg} ${style.text} px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider`}
                    >
                      {article.tag}
                    </span>
                    <span className="text-gray-200">|</span>
                  </>
                )}

                <div className="flex items-center gap-1.5 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={article.date} className="text-sm font-medium">{formattedDate}</time>
                </div>

                {readingTime && (
                  <>
                    <span className="text-gray-200">|</span>
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
              </div>
            </motion.div>

            {/* Title (when no hero image) */}
            {!article.image && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-3xl mx-auto pt-10"
              >
                <span
                  className={`${style.bg} ${style.text} inline-block px-4 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-wider mb-6`}
                >
                  {article.tag}
                </span>
                <h1 className="font-accent font-extrabold text-primary text-3xl sm:text-4xl md:text-5xl leading-[1.15] mb-4">
                  {article.title}
                </h1>
                <div className="w-16 h-1 gradient-lime rounded-full" />
              </motion.div>
            )}

            {/* Description / intro */}
            {article.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="max-w-3xl mx-auto mt-10"
              >
                <div className="relative pl-6 border-l-4 border-campaign-lime py-2">
                  <p className="text-lg sm:text-xl text-gray-600 leading-relaxed italic font-medium">
                    {article.description}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Rich content */}
            {article.content && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="max-w-3xl mx-auto mt-12"
              >
                <div
                  className="prose prose-lg prose-article max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="max-w-3xl mx-auto mt-16"
            >
              <div className="gradient-teal rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
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
        </div>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div className="bg-gray-50 mt-20">
            <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-5xl mx-auto"
              >
                <div className="section-label mb-8">Articles similaires</div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                          className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                          {related.image && (
                            <div className="aspect-[16/9] overflow-hidden relative">
                              <img
                                src={related.image}
                                alt={related.image_alt || related.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <span
                                className={`absolute top-3 left-3 ${relStyle.bg} ${relStyle.text} px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider shadow-sm`}
                              >
                                {related.tag}
                              </span>
                            </div>
                          )}
                          <div className="p-5">
                            <h3 className="font-accent font-bold text-primary text-[15px] leading-snug line-clamp-2 group-hover:text-campaign-olive transition-colors duration-200">
                              {related.title}
                            </h3>
                            <div className="flex items-center gap-1.5 text-gray-400 mt-3">
                              <Calendar className="w-3.5 h-3.5" />
                              <time dateTime={related.date} className="text-xs font-medium">{related.date}</time>
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
