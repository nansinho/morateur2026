'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

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

const TICKER_MESSAGES = [
  '🗳️ VOTEZ MORATEUR 2026',
  '📅 1er tour : 15 mars',
  '📅 2nd tour : 22 mars',
  '✊ Ensemble pour Bouc Bel Air',
  '📋 Découvrez notre programme',
  '🏘️ Un logement maîtrisé pour tous',
  '🌿 Préservons notre cadre de vie',
  '👥 Rejoignez notre équipe',
  '💬 Consultations citoyennes ouvertes',
  '🏫 Écoles, sport, culture : nos priorités',
  '🔒 Sécurité et tranquillité pour tous',
  '🚗 Circulation et stationnement améliorés',
  '🗳️ VOTEZ MORATEUR 2026',
  '📅 1er tour : 15 mars',
  '📅 2nd tour : 22 mars',
  '✊ Ensemble pour Bouc Bel Air',
  '📋 Découvrez notre programme',
  '🏘️ Un logement maîtrisé pour tous',
  '🌿 Préservons notre cadre de vie',
  '👥 Rejoignez notre équipe',
  '💬 Consultations citoyennes ouvertes',
  '🏫 Écoles, sport, culture : nos priorités',
  '🔒 Sécurité et tranquillité pour tous',
  '🚗 Circulation et stationnement améliorés',
]

function TickerContent({ countdown, targetLabel }: { countdown: ReturnType<typeof getCountdown>; targetLabel: string }) {
  const countdownText = countdown
    ? `⏱️ ${targetLabel} dans J-${countdown.days} ${pad(countdown.hours)}:${pad(countdown.minutes)}:${pad(countdown.seconds)}`
    : null

  const allMessages = countdownText
    ? [countdownText, ...TICKER_MESSAGES, countdownText, ...TICKER_MESSAGES]
    : [...TICKER_MESSAGES, ...TICKER_MESSAGES]

  return (
    <div className="flex items-center gap-8 whitespace-nowrap">
      {allMessages.map((msg, i) => (
        <span key={i} className="flex items-center gap-8">
          <span className="text-xs sm:text-sm font-bold tracking-wide uppercase text-white">
            {msg}
          </span>
          <span className="text-white/40">★</span>
        </span>
      ))}
    </div>
  )
}

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(true)
  const [countdown, setCountdown] = useState<ReturnType<typeof getCountdown>>(null)
  const [targetLabel, setTargetLabel] = useState('')
  const tickerRef = useRef<HTMLDivElement>(null)
  const [tickerWidth, setTickerWidth] = useState(0)

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

  useEffect(() => {
    if (!tickerRef.current) return
    const measure = () => {
      if (tickerRef.current) {
        setTickerWidth(tickerRef.current.scrollWidth / 2)
      }
    }
    measure()
    const timer = setTimeout(measure, 100)
    return () => clearTimeout(timer)
  }, [dismissed, countdown])

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
          <div className="relative bg-gradient-to-r from-campaign-lime to-[hsl(152,55%,40%)] border-b border-white/20">
            {/* Close button */}
            <button
              onClick={handleDismiss}
              aria-label="Fermer le bandeau"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-6 w-6 rounded text-white/60 hover:text-white hover:bg-black/20 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            {/* Scrolling ticker */}
            <div className="overflow-hidden py-2 pr-10">
              <motion.div
                ref={tickerRef}
                animate={tickerWidth > 0 ? { x: [0, -tickerWidth] } : undefined}
                transition={{
                  x: {
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                }}
                className="flex items-center"
              >
                <TickerContent countdown={countdown} targetLabel={targetLabel} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
