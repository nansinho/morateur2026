'use client'

import { motion } from 'framer-motion'
import { Check, Calendar } from 'lucide-react'
import { getIcon } from '@/lib/icon-map'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Event } from '@/lib/types/database'

interface AgendaContentProps {
  events: Event[]
}

export default function AgendaContent({ events }: AgendaContentProps) {
  const doneEvents = events.filter(e => e.is_done)
  const upcomingEvents = events.filter(e => !e.is_done)

  return (
    <main>
      <Navbar />

      <section className="gradient-teal-deep min-h-screen pt-28 sm:pt-36 pb-16 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span className="section-label">Calendrier</span>
            <h1
              className="font-accent font-extrabold uppercase leading-[0.9] tracking-tight text-primary-foreground break-words"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              NOTRE <span className="text-campaign-lime">AGENDA</span>
            </h1>
            <p className="text-primary-foreground/50 text-lg mt-4 max-w-xl">
              Retrouvez toutes les étapes clés de notre campagne pour Bouc-Bel-Air.
            </p>
          </motion.div>

          {/* Upcoming events */}
          {upcomingEvents.length > 0 && (
            <div className="mb-16">
              <h2 className="font-accent font-bold text-xs uppercase tracking-[0.2em] text-campaign-lime mb-6 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                À venir
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event, i) => {
                  const Icon = getIcon(event.icon)
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="rounded-2xl p-6 bg-primary-foreground/[0.06] border border-primary-foreground/10 hover:-translate-y-1 transition-transform duration-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-primary-foreground/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-primary-foreground/40" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold uppercase tracking-wider text-primary-foreground/40">
                            {event.date}
                          </span>
                          <h3 className="font-accent font-extrabold text-primary-foreground text-lg uppercase tracking-wide mt-1">
                            {event.title}
                          </h3>
                          <p className="text-primary-foreground/50 text-sm leading-relaxed mt-2">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Done events */}
          {doneEvents.length > 0 && (
            <div>
              <h2 className="font-accent font-bold text-xs uppercase tracking-[0.2em] text-campaign-lime mb-6 flex items-center gap-2">
                <Check className="w-4 h-4" />
                Réalisés
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {doneEvents.map((event, i) => {
                  const Icon = getIcon(event.icon)
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="rounded-2xl p-6 bg-primary-foreground/[0.08] shadow-[0_0_30px_-10px_hsl(var(--campaign-lime)/0.15)] hover:-translate-y-1 transition-transform duration-200"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl gradient-lime flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-accent-foreground" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-campaign-lime">
                              {event.date}
                            </span>
                            <div className="w-5 h-5 rounded-full gradient-lime flex items-center justify-center">
                              <Check className="w-3 h-3 text-accent-foreground" />
                            </div>
                          </div>
                          <h3 className="font-accent font-extrabold text-primary-foreground text-lg uppercase tracking-wide mt-1">
                            {event.title}
                          </h3>
                          <p className="text-primary-foreground/60 text-sm leading-relaxed mt-2">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}

          {events.length === 0 && (
            <div className="text-center py-20">
              <Calendar className="w-12 h-12 text-primary-foreground/20 mx-auto mb-4" />
              <p className="text-primary-foreground/40 text-lg">
                Les événements seront bientôt annoncés.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
