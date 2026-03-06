'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Cookie, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  getConsent,
  setConsent,
  hasConsented,
  COOKIE_CATEGORIES,
  type CookieCategory,
} from '@/lib/cookie-consent'

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState({ analytics: false, marketing: false })

  useEffect(() => {
    const consent = getConsent()
    if (!consent) {
      setShowBanner(true)
    } else {
      setPreferences({ analytics: consent.analytics, marketing: consent.marketing })
    }

    const handleOpen = () => {
      const current = getConsent()
      if (current) {
        setPreferences({ analytics: current.analytics, marketing: current.marketing })
      }
      setShowPreferences(true)
    }
    window.addEventListener('open-cookie-preferences', handleOpen)
    return () => window.removeEventListener('open-cookie-preferences', handleOpen)
  }, [])

  const acceptAll = useCallback(() => {
    setConsent({ analytics: true, marketing: true })
    setPreferences({ analytics: true, marketing: true })
    setShowBanner(false)
    setShowPreferences(false)
  }, [])

  const rejectAll = useCallback(() => {
    setConsent({ analytics: false, marketing: false })
    setPreferences({ analytics: false, marketing: false })
    setShowBanner(false)
    setShowPreferences(false)
  }, [])

  const savePreferences = useCallback(() => {
    setConsent(preferences)
    setShowBanner(false)
    setShowPreferences(false)
  }, [preferences])

  const toggleCategory = (key: CookieCategory) => {
    if (key === 'necessary') return
    setPreferences((prev) => ({ ...prev, [key]: !prev[key as 'analytics' | 'marketing'] }))
  }

  return (
    <>
      {/* Banner */}
      <AnimatePresence>
        {showBanner && !showPreferences && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            role="dialog"
            aria-label="Bannière de consentement aux cookies"
            aria-modal="false"
            className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
          >
            <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-[hsl(220,73%,12%)]/95 backdrop-blur-xl shadow-2xl shadow-black/40 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-campaign-lime/10 border border-campaign-lime/20">
                  <Cookie className="h-6 w-6 text-campaign-lime" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-lg font-bold text-white font-accent">
                      Nous respectons votre vie privée
                    </h2>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed">
                      Ce site utilise des cookies pour améliorer votre expérience et mesurer
                      l&apos;audience. Vous pouvez accepter, refuser ou personnaliser vos choix à
                      tout moment.{' '}
                      <Link
                        href="/cookies"
                        className="text-campaign-lime hover:underline underline-offset-2"
                      >
                        En savoir plus
                      </Link>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={acceptAll}
                      className="bg-campaign-lime text-[hsl(220,73%,12%)] hover:bg-campaign-lime/90 font-bold rounded-xl px-6"
                    >
                      Tout accepter
                    </Button>
                    <Button
                      onClick={rejectAll}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 hover:text-white rounded-xl px-6"
                    >
                      Tout refuser
                    </Button>
                    <Button
                      onClick={() => setShowPreferences(true)}
                      variant="ghost"
                      className="text-white/70 hover:text-white hover:bg-white/5 rounded-xl px-6"
                    >
                      Personnaliser
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {showPreferences && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => {
                setShowPreferences(false)
                if (!hasConsented()) setShowBanner(true)
              }}
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              role="dialog"
              aria-label="Préférences de cookies"
              aria-modal="true"
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[hsl(220,73%,12%)] shadow-2xl shadow-black/50"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[hsl(220,73%,12%)] px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-campaign-lime/10 border border-campaign-lime/20">
                    <Shield className="h-5 w-5 text-campaign-lime" />
                  </div>
                  <h2 className="text-lg font-bold text-white font-accent">
                    Préférences de cookies
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setShowPreferences(false)
                    if (!hasConsented()) setShowBanner(true)
                  }}
                  aria-label="Fermer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-5 space-y-1">
                <p className="text-sm text-white/60 mb-5 leading-relaxed">
                  Choisissez les catégories de cookies que vous acceptez. Les cookies nécessaires ne
                  peuvent pas être désactivés car ils sont indispensables au fonctionnement du site.
                </p>

                {COOKIE_CATEGORIES.map((cat) => {
                  const checked =
                    cat.key === 'necessary'
                      ? true
                      : preferences[cat.key as 'analytics' | 'marketing']
                  return (
                    <div
                      key={cat.key}
                      className="flex items-start gap-4 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-white">{cat.label}</span>
                          {cat.required && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-campaign-lime/70 bg-campaign-lime/10 px-2 py-0.5 rounded-full">
                              Obligatoire
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/50 leading-relaxed">{cat.description}</p>
                      </div>
                      <Switch
                        checked={checked}
                        onCheckedChange={() => toggleCategory(cat.key)}
                        disabled={cat.required}
                        aria-label={`${checked ? 'Désactiver' : 'Activer'} ${cat.label}`}
                        className="shrink-0 mt-1 data-[state=checked]:bg-campaign-lime"
                      />
                    </div>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 border-t border-white/10 bg-[hsl(220,73%,12%)] px-6 py-4">
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={savePreferences}
                    className="flex-1 bg-campaign-lime text-[hsl(220,73%,12%)] hover:bg-campaign-lime/90 font-bold rounded-xl"
                  >
                    Enregistrer mes choix
                  </Button>
                  <Button
                    onClick={acceptAll}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 hover:text-white rounded-xl"
                  >
                    Tout accepter
                  </Button>
                  <Button
                    onClick={rejectAll}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 hover:text-white rounded-xl"
                  >
                    Tout refuser
                  </Button>
                </div>
                <p className="mt-3 text-center text-[11px] text-white/40">
                  Votre choix est conservé 13 mois.{' '}
                  <Link
                    href="/politique-de-confidentialite"
                    className="text-campaign-lime/60 hover:text-campaign-lime hover:underline"
                  >
                    Politique de confidentialité
                  </Link>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button to reopen preferences (visible only after consent given) */}
      <AnimatePresence>
        {!showBanner && !showPreferences && (
          <FloatingCookieTab
            onClick={() => {
              const current = getConsent()
              if (current) {
                setPreferences({ analytics: current.analytics, marketing: current.marketing })
              }
              setShowPreferences(true)
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function FloatingCookieTab({ onClick }: { onClick: () => void }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (hasConsented()) setVisible(true)

    const handleUpdate = () => setVisible(true)
    window.addEventListener('consent-updated', handleUpdate)
    return () => window.removeEventListener('consent-updated', handleUpdate)
  }, [])

  if (!visible) return null

  return (
    <motion.button
      initial={{ y: 36, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 36, opacity: 0 }}
      transition={{ delay: 0.5, type: 'spring', damping: 25, stiffness: 200 }}
      onClick={onClick}
      aria-label="Gérer mes cookies"
      title="Gérer mes cookies"
      className="fixed bottom-0 left-4 z-[9998] flex h-9 items-center gap-1.5 rounded-t-lg border border-b-0 border-white/10 bg-[hsl(220,73%,12%)]/90 backdrop-blur-sm px-3.5 shadow-lg hover:bg-[hsl(220,73%,18%)] hover:border-campaign-lime/30 transition-all duration-200"
    >
      <Cookie className="h-3.5 w-3.5 text-white/60" />
      <span className="text-[11px] font-medium text-white/60">Cookies</span>
    </motion.button>
  )
}
