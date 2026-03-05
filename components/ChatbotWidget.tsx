'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, ArrowLeft, ChevronRight, Home } from 'lucide-react'
import { usePathname } from 'next/navigation'
import type { ChatbotEntry } from '@/lib/types/database'

const WELCOME_MESSAGE = 'Bonjour ! Je suis l\'assistant du site Morateur 2026. Sélectionnez un sujet ci-dessous pour en savoir plus :'

export default function ChatbotWidget() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [entries, setEntries] = useState<ChatbotEntry[]>([])
  const [currentEntry, setCurrentEntry] = useState<ChatbotEntry | null>(null)
  const [loaded, setLoaded] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const getRootEntries = useCallback((allEntries: ChatbotEntry[]) => {
    return allEntries.filter(e => !e.parent_id)
  }, [])

  const getChildEntries = useCallback((parentId: string, allEntries: ChatbotEntry[]) => {
    return allEntries.filter(e => e.parent_id === parentId)
  }, [])

  // Fetch entries on first open
  useEffect(() => {
    if (!isOpen || loaded) return
    fetch('/api/chatbot')
      .then(res => res.json())
      .then(data => {
        const allEntries = (data.entries || []) as ChatbotEntry[]
        setEntries(allEntries)
        setLoaded(true)
      })
      .catch(() => {
        setLoaded(true)
      })
  }, [isOpen, loaded])

  // Scroll to top when navigating
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [currentEntry])

  // Hide on admin pages (after all hooks)
  if (pathname.startsWith('/admin')) return null

  const handleTopicClick = (entry: ChatbotEntry) => {
    setCurrentEntry(entry)
  }

  const handleBackToMenu = () => {
    setCurrentEntry(null)
  }

  const rootEntries = getRootEntries(entries)
  const children = currentEntry ? getChildEntries(currentEntry.id, entries) : []

  return (
    <>
      {/* Chat bubble button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            aria-label="Ouvrir le chatbot d'aide"
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-campaign-lime text-accent-foreground shadow-lg shadow-campaign-lime/30 flex items-center justify-center hover:bg-campaign-lime-light active:scale-90 transition-all duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ delay: 1.5, duration: 0.3 }}
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-label="Assistant d'aide"
            onKeyDown={(e) => { if (e.key === 'Escape') setIsOpen(false) }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-h-[500px] flex flex-col rounded-2xl bg-white shadow-2xl shadow-black/20 border border-gray-200 overflow-hidden max-sm:bottom-0 max-sm:right-0 max-sm:left-0 max-sm:w-full max-sm:max-h-full max-sm:rounded-none max-sm:h-full"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-campaign-lime text-accent-foreground">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">Assistant Morateur 2026</p>
                  <p className="text-[11px] text-accent-foreground/70">En ligne</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {currentEntry && (
                  <button
                    onClick={handleBackToMenu}
                    className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Retour au menu principal"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Fermer le chatbot"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
              {!loaded ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 flex items-center justify-center p-4 bg-gray-50/50 min-h-0"
                >
                  <div className="px-4 py-3 rounded-2xl bg-white shadow-sm border border-gray-100">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </motion.div>
              ) : currentEntry === null ? (
                <motion.div
                  key="welcome"
                  ref={scrollRef}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 overflow-y-auto p-4 bg-gray-50/50 min-h-0"
                >
                  {/* Welcome message */}
                  <div className="mb-4">
                    <div className="px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md">
                      {WELCOME_MESSAGE}
                    </div>
                  </div>

                  {/* Root topic buttons */}
                  {rootEntries.length > 0 ? (
                    <div className="space-y-2">
                      {rootEntries.map((entry) => (
                        <button
                          key={entry.id}
                          onClick={() => handleTopicClick(entry)}
                          className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl text-left text-[13px] font-medium bg-white border border-campaign-lime/30 text-campaign-teal hover:bg-campaign-lime/5 hover:border-campaign-lime/50 transition-colors shadow-sm"
                        >
                          <span>{entry.question}</span>
                          <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[13px] text-gray-400 text-center py-4">
                      Aucun sujet disponible pour le moment.
                    </p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key={currentEntry.id}
                  ref={scrollRef}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  className="flex-1 overflow-y-auto p-4 bg-gray-50/50 min-h-0"
                >
                  {/* Topic title */}
                  <div className="mb-3">
                    <p className="text-[13px] font-semibold text-campaign-teal">
                      {currentEntry.question}
                    </p>
                  </div>

                  {/* Answer */}
                  <div className="mb-4">
                    <div className="px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md whitespace-pre-line">
                      {currentEntry.answer}
                    </div>
                  </div>

                  {/* Child subtopics */}
                  {children.length > 0 && (
                    <div className="space-y-2 mb-4">
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide font-medium px-1">
                        Sujets associés
                      </p>
                      {children.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => handleTopicClick(child)}
                          className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl text-left text-[13px] font-medium bg-white border border-campaign-lime/30 text-campaign-teal hover:bg-campaign-lime/5 hover:border-campaign-lime/50 transition-colors shadow-sm"
                        >
                          <span>{child.question}</span>
                          <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Back to menu button */}
                  <button
                    onClick={handleBackToMenu}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[13px] font-medium text-gray-500 hover:text-campaign-teal hover:bg-white border border-gray-200 hover:border-campaign-lime/30 transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    <span>Retour au menu principal</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
