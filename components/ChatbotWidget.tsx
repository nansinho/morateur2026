'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, ArrowLeft, ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import type { ChatbotEntry } from '@/lib/types/database'

interface ChatMessage {
  id: string
  type: 'bot' | 'user'
  text: string
  suggestions?: ChatbotEntry[]
}

const WELCOME_MESSAGE = 'Bonjour ! Je suis l\'assistant du site Morateur 2026. Comment puis-je vous aider ?'
const FALLBACK_MESSAGE = 'Je n\'ai pas trouvé de réponse à votre question. Voici les sujets sur lesquels je peux vous aider :'

export default function ChatbotWidget() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [entries, setEntries] = useState<ChatbotEntry[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [loaded, setLoaded] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  if (pathname.startsWith('/admin')) return null

  const getRootEntries = useCallback((allEntries: ChatbotEntry[]) => {
    return allEntries.filter(e => !e.parent_id)
  }, [])

  const getChildEntries = useCallback((parentId: string, allEntries: ChatbotEntry[]) => {
    return allEntries.filter(e => e.parent_id === parentId)
  }, [])

  const createWelcomeMessages = useCallback((allEntries: ChatbotEntry[]): ChatMessage[] => {
    const roots = allEntries.filter(e => !e.parent_id)
    return [{
      id: 'welcome',
      type: 'bot',
      text: WELCOME_MESSAGE,
      suggestions: roots,
    }]
  }, [])

  // Fetch entries on first open
  useEffect(() => {
    if (!isOpen || loaded) return
    fetch('/api/chatbot')
      .then(res => res.json())
      .then(data => {
        const allEntries = (data.entries || []) as ChatbotEntry[]
        setEntries(allEntries)
        setMessages(createWelcomeMessages(allEntries))
        setLoaded(true)
      })
      .catch(() => {
        setMessages([{ id: 'welcome', type: 'bot', text: WELCOME_MESSAGE, suggestions: [] }])
        setLoaded(true)
      })
  }, [isOpen, loaded, createWelcomeMessages])

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const addMessages = (newMessages: ChatMessage[]) => {
    setMessages(prev => [...prev, ...newMessages])
  }

  const handleSuggestionClick = (entry: ChatbotEntry) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      text: entry.question,
    }

    const children = getChildEntries(entry.id, entries)
    const botMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      type: 'bot',
      text: entry.answer,
      suggestions: children.length > 0 ? children : undefined,
    }

    addMessages([userMsg, botMsg])
  }

  const handleTextSearch = (query: string) => {
    if (!query.trim()) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      text: query,
    }

    const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    // Simple fuzzy search: look for entries where the question contains query words
    const queryWords = normalizedQuery.split(/\s+/).filter(w => w.length > 2)
    let bestMatch: ChatbotEntry | null = null
    let bestScore = 0

    for (const entry of entries) {
      const normalizedQuestion = entry.question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      const normalizedAnswer = entry.answer.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      let score = 0

      for (const word of queryWords) {
        if (normalizedQuestion.includes(word)) score += 2
        if (normalizedAnswer.includes(word)) score += 1
      }

      if (score > bestScore) {
        bestScore = score
        bestMatch = entry
      }
    }

    if (bestMatch && bestScore > 0) {
      const children = getChildEntries(bestMatch.id, entries)
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        text: bestMatch.answer,
        suggestions: children.length > 0 ? children : undefined,
      }
      addMessages([userMsg, botMsg])
    } else {
      const roots = getRootEntries(entries)
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        type: 'bot',
        text: FALLBACK_MESSAGE,
        suggestions: roots,
      }
      addMessages([userMsg, botMsg])
    }

    setInputValue('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleTextSearch(inputValue)
  }

  const handleReset = () => {
    setMessages(createWelcomeMessages(entries))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

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
            aria-label="Chatbot d'aide"
            onKeyDown={handleKeyDown}
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
                {messages.length > 1 && (
                  <button
                    onClick={handleReset}
                    className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Recommencer la conversation"
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

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50 min-h-0">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] space-y-2`}>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                        msg.type === 'user'
                          ? 'bg-primary text-white rounded-br-md'
                          : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.suggestions.map((entry) => (
                          <button
                            key={entry.id}
                            onClick={() => handleSuggestionClick(entry)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-medium bg-white border border-campaign-lime/30 text-campaign-teal hover:bg-campaign-lime/5 hover:border-campaign-lime/50 transition-colors shadow-sm"
                          >
                            {entry.question}
                            <ChevronRight className="w-3 h-3 opacity-50" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {!loaded && isOpen && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl bg-white shadow-sm border border-gray-100 rounded-bl-md">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 p-3 border-t border-gray-100 bg-white">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 px-3.5 py-2 rounded-full bg-gray-100 text-[13px] text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-campaign-lime/30 transition-shadow"
                aria-label="Votre question"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-9 h-9 rounded-full bg-campaign-lime text-accent-foreground flex items-center justify-center hover:bg-campaign-lime-light disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Envoyer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
