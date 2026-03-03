'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Shield, BarChart3, Megaphone, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { Switch } from '@/components/ui/switch'
import { getConsent, setConsent, hasConsented } from '@/lib/cookie-consent'

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    if (!hasConsented()) {
      setVisible(true)
    }
  }, [])

  const acceptAll = () => {
    setConsent({ analytics: true, marketing: true })
    setVisible(false)
  }

  const rejectAll = () => {
    setConsent({ analytics: false, marketing: false })
    setVisible(false)
  }

  const savePreferences = () => {
    setConsent({ analytics, marketing })
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6"
        >
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/15 bg-[hsl(192,80%,15%)] backdrop-blur-xl shadow-2xl shadow-black/30 overflow-hidden">
            {/* Main content */}
            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-lime flex items-center justify-center shrink-0">
                  <Cookie className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-accent font-bold text-primary-foreground text-sm uppercase tracking-wide">
                    Gestion des cookies
                  </h3>
                  <p className="text-primary-foreground/50 text-xs mt-1 leading-relaxed">
                    Nous utilisons des cookies pour mesurer l&apos;audience et améliorer votre expérience.{' '}
                    <Link href="/cookies" className="text-campaign-lime/70 hover:text-campaign-lime underline transition-colors">
                      En savoir plus
                    </Link>
                  </p>
                </div>
              </div>

              {/* Details panel */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3 mb-4 pt-3 border-t border-white/10">
                      {/* Nécessaires */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Shield className="w-4 h-4 text-campaign-lime" />
                          <div>
                            <p className="text-primary-foreground text-xs font-semibold">Nécessaires</p>
                            <p className="text-primary-foreground/40 text-[11px]">Fonctionnement du site</p>
                          </div>
                        </div>
                        <Switch checked disabled className="data-[state=checked]:bg-campaign-lime opacity-60" />
                      </div>

                      {/* Analytics */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <BarChart3 className="w-4 h-4 text-primary-foreground/50" />
                          <div>
                            <p className="text-primary-foreground text-xs font-semibold">Analytics</p>
                            <p className="text-primary-foreground/40 text-[11px]">Google Analytics 4</p>
                          </div>
                        </div>
                        <Switch
                          checked={analytics}
                          onCheckedChange={setAnalytics}
                          className="data-[state=checked]:bg-campaign-lime"
                        />
                      </div>

                      {/* Marketing */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Megaphone className="w-4 h-4 text-primary-foreground/50" />
                          <div>
                            <p className="text-primary-foreground text-xs font-semibold">Marketing</p>
                            <p className="text-primary-foreground/40 text-[11px]">Meta Pixel (Facebook)</p>
                          </div>
                        </div>
                        <Switch
                          checked={marketing}
                          onCheckedChange={setMarketing}
                          className="data-[state=checked]:bg-campaign-lime"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  onClick={acceptAll}
                  className="gradient-lime text-accent-foreground px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider hover:scale-105 active:scale-95 transition-transform shadow-md"
                >
                  Tout accepter
                </button>
                <button
                  onClick={rejectAll}
                  className="border border-white/20 text-primary-foreground/70 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:border-white/40 hover:text-primary-foreground active:scale-95 transition-all"
                >
                  Tout refuser
                </button>
                {showDetails ? (
                  <button
                    onClick={savePreferences}
                    className="border border-campaign-lime/30 text-campaign-lime px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-campaign-lime/10 active:scale-95 transition-all"
                  >
                    Enregistrer
                  </button>
                ) : (
                  <button
                    onClick={() => setShowDetails(true)}
                    className="flex items-center justify-center gap-1.5 text-primary-foreground/50 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:text-primary-foreground/80 transition-colors"
                  >
                    Personnaliser
                    {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
