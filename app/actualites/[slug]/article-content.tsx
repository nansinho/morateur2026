'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Tag, ChevronRight, Share2 } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Article } from '@/lib/types/database'

const tagStyles: Record<string, { bg: string; text: string }> = {
  'Événement': { bg: 'bg-campaign-lime-light', text: 'text-accent-foreground' },
  'Terrain': { bg: 'bg-primary', text: 'text-primary-foreground' },
  'Programme': { bg: 'bg-campaign-olive', text: 'text-primary-foreground' },
  'Tribune': { bg: 'bg-campaign-steel', text: 'text-primary-foreground' },
}

export default function ArticleContent({
  article,
  relatedArticles,
}: {
  article: Article
  relatedArticles: Article[]
}) {
  const style = tagStyles[article.tag] || { bg: 'bg-muted', text: 'text-foreground' }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      await navigator.share({ title: article.title, url })
    } else {
      await navigator.clipboard.writeText(url)
    }
  }

  return (
    <main className="min-h-screen bg-campaign-ice">
      <Navbar />

      {/* Hero image */}
      {article.image && (
        <section className="relative pt-20">
          <div className="aspect-[21/9] max-h-[480px] overflow-hidden relative">
            <img
              src={article.image}
              alt={article.image_alt || article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        </section>
      )}

      {/* Article body */}
      <section className={article.image ? 'relative -mt-24 z-10' : 'pt-32'}>
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Card wrapper */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 md:p-14">
              {/* Breadcrumb + back */}
              <div className="flex items-center gap-2 text-sm text-primary/50 mb-8">
                <Link
                  href="/actualites"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Actualités
                </Link>
                <span>/</span>
                <span className="text-primary/40 truncate max-w-[200px]">{article.title}</span>
              </div>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span
                  className={`${style.bg} ${style.text} px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider`}
                >
                  {article.tag}
                </span>
                <div className="flex items-center gap-1.5 text-primary/50">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-xs font-semibold">{article.date}</span>
                </div>
                <button
                  onClick={handleShare}
                  className="ml-auto flex items-center gap-1.5 text-primary/40 hover:text-primary transition-colors text-xs font-semibold"
                  title="Partager"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Partager
                </button>
              </div>

              {/* Title */}
              <h1 className="font-accent font-extrabold text-primary text-2xl sm:text-3xl md:text-4xl leading-tight mb-8 uppercase tracking-wide">
                {article.title}
              </h1>

              {/* Description / intro */}
              {article.description && (
                <p className="text-lg text-primary/70 leading-relaxed mb-10 border-l-4 border-campaign-lime pl-4 italic">
                  {article.description}
                </p>
              )}

              {/* Rich content */}
              {article.content && (
                <div
                  className="prose prose-lg prose-article max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              )}

              {/* CTA */}
              <div className="mt-12 pt-8 border-t border-primary/10">
                <div className="bg-primary/5 rounded-xl p-6 sm:p-8 text-center">
                  <h3 className="font-accent font-bold text-primary text-lg uppercase tracking-wide mb-2">
                    Engagez-vous pour Bouc-Bel-Air
                  </h3>
                  <p className="text-primary/60 text-sm mb-5">
                    Rejoignez le mouvement Morateur 2026 et participez au renouveau de notre commune.
                  </p>
                  <Link
                    href="/#procuration"
                    className="inline-flex items-center gap-2 gradient-lime text-white px-6 py-3 rounded-xl font-accent font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    Rejoignez-nous
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12 mb-16"
            >
              <h2 className="font-accent font-extrabold text-primary text-xl uppercase tracking-wide mb-6">
                Articles similaires
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedArticles.map((related) => {
                  const relStyle = tagStyles[related.tag] || { bg: 'bg-muted', text: 'text-foreground' }
                  return (
                    <Link
                      key={related.id}
                      href={`/actualites/${related.slug}`}
                      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                    >
                      {related.image && (
                        <div className="aspect-[16/9] overflow-hidden relative">
                          <img
                            src={related.image}
                            alt={related.image_alt || related.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <span
                          className={`${relStyle.bg} ${relStyle.text} px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider`}
                        >
                          {related.tag}
                        </span>
                        <h3 className="font-accent font-bold text-primary text-sm mt-2 line-clamp-2 uppercase tracking-wide group-hover:text-campaign-olive transition-colors">
                          {related.title}
                        </h3>
                        <span className="text-xs text-primary/40 mt-1 block">{related.date}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
