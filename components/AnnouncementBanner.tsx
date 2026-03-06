'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const TOUR_1 = new Date('2026-03-15T08:00:00+01:00')
const TOUR_2 = new Date('2026-03-22T08:00:00+01:00')

function getCountdown(target: Date) {
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) return null
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(true)
  const [countdown, setCountdown] = useState<ReturnType<typeof getCountdown>>(null)
  const [targetLabel, setTargetLabel] = useState('')

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem('announcement-dismissed')
    if (!wasDismissed) setDismissed(false)
  }, [])

  useEffect(() => {
    if (dismissed) return

    function update() {
      const now = new Date()
      if (now < TOUR_1) {
        setCountdown(getCountdown(TOUR_1))
        setTargetLabel('1er tour')
      } else if (now < TOUR_2) {
        setCountdown(getCountdown(TOUR_2))
        setTargetLabel('2nd tour')
      } else {
        setCountdown(null)
        setTargetLabel('')
      }
    }

    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [dismissed])

  const handleDismiss = () => {
    setDismissed(true)
    sessionStorage.setItem('announcement-dismissed', '1')
  }

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="relative bg-gradient-to-r from-[hsl(220,60%,25%)] to-[hsl(220,73%,20%)] border-b border-campaign-lime/30">
            <div className="container mx-auto px-4 sm:px-6 py-2.5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
                {/* Message + Dates */}
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 min-w-0">
                  {/* VoteRRR message */}
                  <span className="font-accent font-extrabold text-sm sm:text-base tracking-wider uppercase whitespace-nowrap">
                    <span className="text-campaign-lime animate-pulse">Votez</span>{' '}
                    <span className="text-white">Morateur 2026</span>
                  </span>

                  {/* Dates */}
                  <div className="hidden sm:flex items-center gap-3 text-xs text-white/70">
                    <Calendar className="h-3.5 w-3.5 text-campaign-lime/70" />
                    <span>1er tour : 15 mars</span>
                    <span className="text-white/30">|</span>
                    <span>2nd tour : 22 mars</span>
                  </div>
                </div>

                {/* Countdown + CTA + Close */}
                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                  {/* Countdown */}
                  {countdown && (
                    <div className="flex items-center gap-1.5 text-xs text-white/80">
                      <span className="text-campaign-lime/70 font-medium">{targetLabel} :</span>
                      <span className="font-mono font-bold text-white tabular-nums">
                        J-{countdown.days} {pad(countdown.hours)}:{pad(countdown.minutes)}:{pad(countdown.seconds)}
                      </span>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Link
                    href="/programme"
                    className="flex items-center gap-1.5 bg-campaign-lime/15 hover:bg-campaign-lime/25 border border-campaign-lime/30 text-campaign-lime text-xs font-bold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Notre programme
                    <ArrowRight className="h-3 w-3" />
                  </Link>

                  {/* Close */}
                  <button
                    onClick={handleDismiss}
                    aria-label="Fermer le bandeau"
                    className="flex items-center justify-center h-6 w-6 rounded text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Mobile dates */}
              <div className="flex sm:hidden items-center justify-center gap-3 text-[11px] text-white/60 mt-1">
                <Calendar className="h-3 w-3 text-campaign-lime/60" />
                <span>1er tour : 15 mars</span>
                <span className="text-white/30">|</span>
                <span>2nd tour : 22 mars</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
