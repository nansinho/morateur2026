'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  X, RotateCcw, Type, Contrast, Underline, AlignJustify,
  MoveHorizontal, Pause, BookA, MousePointer, Focus, ExternalLink,
} from 'lucide-react'

const STORAGE_KEY = 'a11y-preferences'

interface A11yPreferences {
  textSize: 'normal' | 'lg' | 'xl'
  highContrast: boolean
  underlineLinks: boolean
  lineSpacing: boolean
  letterSpacing: boolean
  noMotion: boolean
  readableFont: boolean
  bigCursor: boolean
  focusHighlight: boolean
}

const defaultPreferences: A11yPreferences = {
  textSize: 'normal',
  highContrast: false,
  underlineLinks: false,
  lineSpacing: false,
  letterSpacing: false,
  noMotion: false,
  readableFont: false,
  bigCursor: false,
  focusHighlight: false,
}

const A11Y_CLASSES = [
  'a11y-text-lg', 'a11y-text-xl', 'a11y-high-contrast', 'a11y-underline-links',
  'a11y-line-spacing', 'a11y-letter-spacing', 'a11y-no-motion',
  'a11y-readable-font', 'a11y-big-cursor', 'a11y-focus-highlight',
]

function applyPreferences(prefs: A11yPreferences) {
  const html = document.documentElement
  A11Y_CLASSES.forEach(cls => html.classList.remove(cls))

  if (prefs.textSize === 'lg') html.classList.add('a11y-text-lg')
  if (prefs.textSize === 'xl') html.classList.add('a11y-text-xl')
  if (prefs.highContrast) html.classList.add('a11y-high-contrast')
  if (prefs.underlineLinks) html.classList.add('a11y-underline-links')
  if (prefs.lineSpacing) html.classList.add('a11y-line-spacing')
  if (prefs.letterSpacing) html.classList.add('a11y-letter-spacing')
  if (prefs.noMotion) html.classList.add('a11y-no-motion')
  if (prefs.readableFont) html.classList.add('a11y-readable-font')
  if (prefs.bigCursor) html.classList.add('a11y-big-cursor')
  if (prefs.focusHighlight) html.classList.add('a11y-focus-highlight')
}

const UniversalAccessIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="4.5" r="2" />
    <path d="M4 10h16" />
    <path d="M12 10v5" />
    <path d="M12 15l-4 6" />
    <path d="M12 15l4 6" />
  </svg>
)

interface ToggleOptionProps {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}

function ToggleOption({ icon, label, active, onClick }: ToggleOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left text-[13px] font-medium transition-all duration-150 ${
        active
          ? 'bg-campaign-lime/20 text-campaign-lime border border-campaign-lime/30'
          : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
      }`}
      aria-pressed={active}
      role="switch"
    >
      <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
        active ? 'bg-campaign-lime/30' : 'bg-white/10'
      }`}>
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      <span className={`w-9 h-5 rounded-full relative transition-colors ${
        active ? 'bg-campaign-lime' : 'bg-white/20'
      }`}>
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
          active ? 'translate-x-4' : 'translate-x-0.5'
        }`} />
      </span>
    </button>
  )
}

export default function AccessibilityButton() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [prefs, setPrefs] = useState<A11yPreferences>(defaultPreferences)
  const [mounted, setMounted] = useState(false)

  // Load preferences on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as A11yPreferences
        setPrefs(parsed)
        applyPreferences(parsed)
      }
    } catch { /* ignore */ }
    setMounted(true)
  }, [])

  const updatePrefs = useCallback((newPrefs: A11yPreferences) => {
    setPrefs(newPrefs)
    applyPreferences(newPrefs)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs))
    } catch { /* ignore */ }
  }, [])

  const toggleBoolPref = useCallback((key: keyof Omit<A11yPreferences, 'textSize'>) => {
    updatePrefs({ ...prefs, [key]: !prefs[key] })
  }, [prefs, updatePrefs])

  const cycleTextSize = useCallback(() => {
    const sizes: A11yPreferences['textSize'][] = ['normal', 'lg', 'xl']
    const idx = sizes.indexOf(prefs.textSize)
    updatePrefs({ ...prefs, textSize: sizes[(idx + 1) % sizes.length] })
  }, [prefs, updatePrefs])

  const resetAll = useCallback(() => {
    updatePrefs(defaultPreferences)
    try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
  }, [updatePrefs])

  const hasAnyActive = prefs.textSize !== 'normal' ||
    Object.entries(prefs).some(([k, v]) => k !== 'textSize' && v === true)

  if (pathname.startsWith('/admin')) return null
  if (!mounted) return null

  const textSizeLabel = prefs.textSize === 'normal' ? 'Normal' : prefs.textSize === 'lg' ? 'Grand (+20%)' : 'Tres grand (+40%)'

  return (
    <>
      {/* Trigger button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Options d'accessibilite"
        aria-expanded={isOpen}
        className={`fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full shadow-lg shadow-black/20 flex items-center justify-center active:scale-90 transition-all duration-200 ${
          isOpen
            ? 'bg-campaign-lime text-accent-foreground'
            : hasAnyActive
              ? 'bg-campaign-lime text-accent-foreground'
              : 'bg-campaign-lime text-accent-foreground hover:bg-campaign-lime-light'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.4 }}
      >
        {isOpen ? <X className="w-5 h-5" /> : <UniversalAccessIcon className="w-6 h-6" />}
        {hasAnyActive && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 border-2 border-white" />
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop on mobile */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              role="dialog"
              aria-label="Panneau d'options d'accessibilite"
              className="fixed bottom-20 left-6 z-50 w-[320px] max-h-[calc(100vh-120px)] flex flex-col rounded-2xl bg-[hsl(220,73%,12%)] shadow-2xl shadow-black/30 border border-white/10 overflow-hidden max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:w-full max-sm:rounded-none max-sm:rounded-t-2xl max-sm:max-h-[85vh]"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-campaign-lime/20 flex items-center justify-center">
                    <UniversalAccessIcon className="w-4 h-4 text-campaign-lime" />
                  </div>
                  <span className="text-sm font-semibold text-white">Accessibilite</span>
                </div>
                <div className="flex items-center gap-1">
                  {hasAnyActive && (
                    <button
                      onClick={resetAll}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium text-orange-400 hover:bg-orange-400/10 transition-colors"
                      aria-label="Reinitialiser toutes les options"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reinitialiser
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                    aria-label="Fermer le panneau"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {/* Text size - special: cycles through 3 states */}
                <button
                  onClick={cycleTextSize}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left text-[13px] font-medium transition-all duration-150 ${
                    prefs.textSize !== 'normal'
                      ? 'bg-campaign-lime/20 text-campaign-lime border border-campaign-lime/30'
                      : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                  aria-label={`Taille du texte : ${textSizeLabel}. Cliquer pour changer.`}
                >
                  <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                    prefs.textSize !== 'normal' ? 'bg-campaign-lime/30' : 'bg-white/10'
                  }`}>
                    <Type className="w-4 h-4" />
                  </span>
                  <span className="flex-1">Taille du texte</span>
                  <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                    prefs.textSize !== 'normal' ? 'bg-campaign-lime/30 text-campaign-lime' : 'bg-white/10 text-white/50'
                  }`}>
                    {prefs.textSize === 'normal' ? 'A' : prefs.textSize === 'lg' ? 'A+' : 'A++'}
                  </span>
                </button>

                <ToggleOption
                  icon={<Contrast className="w-4 h-4" />}
                  label="Contraste eleve"
                  active={prefs.highContrast}
                  onClick={() => toggleBoolPref('highContrast')}
                />

                <ToggleOption
                  icon={<Underline className="w-4 h-4" />}
                  label="Souligner les liens"
                  active={prefs.underlineLinks}
                  onClick={() => toggleBoolPref('underlineLinks')}
                />

                <ToggleOption
                  icon={<AlignJustify className="w-4 h-4" />}
                  label="Interligne augmente"
                  active={prefs.lineSpacing}
                  onClick={() => toggleBoolPref('lineSpacing')}
                />

                <ToggleOption
                  icon={<MoveHorizontal className="w-4 h-4" />}
                  label="Espacement des lettres"
                  active={prefs.letterSpacing}
                  onClick={() => toggleBoolPref('letterSpacing')}
                />

                <ToggleOption
                  icon={<Pause className="w-4 h-4" />}
                  label="Stopper les animations"
                  active={prefs.noMotion}
                  onClick={() => toggleBoolPref('noMotion')}
                />

                <ToggleOption
                  icon={<BookA className="w-4 h-4" />}
                  label="Police lisible"
                  active={prefs.readableFont}
                  onClick={() => toggleBoolPref('readableFont')}
                />

                <ToggleOption
                  icon={<MousePointer className="w-4 h-4" />}
                  label="Grand curseur"
                  active={prefs.bigCursor}
                  onClick={() => toggleBoolPref('bigCursor')}
                />

                <ToggleOption
                  icon={<Focus className="w-4 h-4" />}
                  label="Focus ameliore"
                  active={prefs.focusHighlight}
                  onClick={() => toggleBoolPref('focusHighlight')}
                />
              </div>

              {/* Footer */}
              <div className="px-3 py-2.5 border-t border-white/10">
                <Link
                  href="/accessibilite"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl text-[12px] font-medium text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  En savoir plus sur notre engagement
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
