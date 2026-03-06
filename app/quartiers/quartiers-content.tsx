'use client'

import { motion } from 'framer-motion'
import { MapPin, ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Quartier } from '@/lib/types/database'

interface Props {
  quartiers: Quartier[]
}

export default function QuartiersContent({ quartiers }: Props) {
  const activeQuartiers = quartiers.filter(q => q.is_active)
  const inactiveQuartiers = quartiers.filter(q => !q.is_active)

  return (
    <>
      <Navbar />
      <main className="gradient-teal-deep relative overflow-hidden min-h-screen">
        <div className="absolute top-20 right-10 w-72 h-72 bg-campaign-lime/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-56 h-56 bg-campaign-lime/[0.03] rounded-full blur-2xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 pt-44 pb-16 sm:pb-28 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="section-label">Consultations citoyennes</span>
            <h1
              className="font-accent font-extrabold uppercase leading-[0.95] tracking-tight text-primary-foreground mb-5"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              VOTRE AVIS<br />
              <span className="text-campaign-lime">COMPTE !</span>
            </h1>
            <p className="text-primary-foreground/50 text-lg leading-relaxed max-w-2xl mx-auto">
              Sélectionnez votre quartier et partagez vos priorités pour l&apos;avenir de Bouc-Bel-Air.
            </p>
          </motion.div>

          {/* Active quartiers grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
            {activeQuartiers.map((quartier, idx) => (
              <motion.div
                key={quartier.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * idx }}
              >
                <Link href={`/${quartier.slug}`}>
                  <div className="group rounded-2xl border-2 border-white/15 p-6 hover:border-campaign-lime/40 transition-all duration-300 backdrop-blur-sm cursor-pointer hover:-translate-y-1"
                    style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))' }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl gradient-lime flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-campaign-lime group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                    <h2 className="font-accent font-bold text-primary-foreground text-lg uppercase tracking-wide mb-2">
                      {quartier.name}
                    </h2>
                    <p className="text-primary-foreground/40 text-sm line-clamp-2">
                      {quartier.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Inactive quartiers */}
          {inactiveQuartiers.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {inactiveQuartiers.map((quartier, idx) => (
                <motion.div
                  key={quartier.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * (activeQuartiers.length + idx) }}
                >
                  <div className="rounded-2xl border-2 border-white/8 p-6 opacity-50"
                    style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))' }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white/40" />
                      </div>
                      <span className="flex items-center gap-1.5 text-xs text-white/40 font-medium bg-white/5 px-3 py-1 rounded-full">
                        <Clock className="w-3 h-3" />
                        À venir
                      </span>
                    </div>
                    <h2 className="font-accent font-bold text-primary-foreground/60 text-lg uppercase tracking-wide mb-2">
                      {quartier.name}
                    </h2>
                    <p className="text-primary-foreground/30 text-sm">
                      {quartier.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
