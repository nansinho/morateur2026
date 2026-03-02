'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import {
  User, Mail, Phone, Send, CheckCircle, AlertCircle,
  ArrowLeft, Sparkles, PartyPopper, MessageSquare,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Quartier, QuartierQuestion } from '@/lib/types/database'

interface Props {
  quartier: Quartier
  questions: QuartierQuestion[]
}

type FormData = {
  first_name: string
  last_name: string
  email: string
  phone: string
  wants_personal_response: boolean
  wants_callback: boolean
  answers: Record<string, string>
}

type FormErrors = Partial<Record<string, string>>

const validate = (form: FormData, questions: QuartierQuestion[]): FormErrors => {
  const errors: FormErrors = {}
  if (form.first_name.trim().length < 2) errors.first_name = 'Minimum 2 caractères'
  if (form.last_name.trim().length < 2) errors.last_name = 'Minimum 2 caractères'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Email invalide'
  if (form.wants_callback && form.phone) {
    const cleaned = form.phone.replace(/\s/g, '')
    if (cleaned && !/^(\+33|0)[1-9]\d{8}$/.test(cleaned)) errors.phone = 'Numéro invalide (ex: 06 12 34 56 78)'
  }
  const hasAnswer = questions.some(q => form.answers[q.id]?.trim())
  if (!hasAnswer) errors.answers = 'Veuillez répondre à au moins une question'
  return errors
}

const Confetti = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 300 - 150,
    y: -(Math.random() * 200 + 100),
    rotate: Math.random() * 720 - 360,
    scale: Math.random() * 0.5 + 0.5,
    color: ['hsl(152 48% 50%)', 'hsl(152 55% 62%)', 'hsl(0 0% 100%)', 'hsl(220 73% 34%)'][Math.floor(Math.random() * 4)],
    delay: Math.random() * 0.3,
  }))
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-1/2 w-2.5 h-2.5 rounded-sm"
          style={{ backgroundColor: p.color }}
          initial={{ x: 0, y: 0, rotate: 0, scale: 0, opacity: 1 }}
          animate={{ x: p.x, y: p.y, rotate: p.rotate, scale: p.scale, opacity: 0 }}
          transition={{ duration: 1.2, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

export default function ConsultationForm({ quartier, questions }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    wants_personal_response: false,
    wants_callback: false,
    answers: {},
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Set<string>>(new Set())

  const handleChange = useCallback((field: string, value: string | boolean) => {
    setForm(prev => {
      const next = { ...prev, [field]: value }
      if (touched.has(field)) {
        const fieldErrors = validate(next, questions)
        setErrors(prev => ({ ...prev, [field]: fieldErrors[field] }))
      }
      return next
    })
  }, [touched, questions])

  const handleAnswerChange = useCallback((questionId: string, value: string) => {
    setForm(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: value },
    }))
    if (touched.has('answers')) {
      setErrors(prev => {
        const next = { ...prev }
        delete next.answers
        return next
      })
    }
  }, [touched])

  const handleBlur = useCallback((field: string) => {
    setTouched(prev => new Set(prev).add(field))
    const fieldErrors = validate(form, questions)
    setErrors(prev => ({ ...prev, [field]: fieldErrors[field] }))
  }, [form, questions])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(new Set(['first_name', 'last_name', 'email', 'phone', 'answers']))

    const allErrors = validate(form, questions)
    setErrors(allErrors)
    if (Object.keys(allErrors).length > 0) return

    setSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quartier_id: quartier.id,
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone: form.phone,
          wants_personal_response: form.wants_personal_response,
          wants_callback: form.wants_callback,
          answers: questions
            .filter(q => form.answers[q.id]?.trim())
            .map(q => ({ question_id: q.id, answer_text: form.answers[q.id] })),
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || 'Erreur lors de l\'envoi')
      }

      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="gradient-teal-deep relative overflow-hidden min-h-screen">
        {/* Decorative shapes */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-campaign-lime/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-56 h-56 bg-campaign-lime/[0.03] rounded-full blur-2xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 pt-32 pb-16 sm:pb-28 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="section-label">Consultation citoyenne</span>
            <h1
              className="font-accent font-extrabold uppercase leading-[0.95] tracking-tight text-primary-foreground mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              {quartier.name}
            </h1>
            <p className="text-primary-foreground/50 text-lg leading-relaxed max-w-2xl mx-auto">
              {quartier.description}
            </p>
          </motion.div>

          {/* Form or Success */}
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="relative rounded-3xl p-10 sm:p-14 text-center border-2 border-white/30 overflow-hidden backdrop-blur-md shadow-[0_0_80px_-20px_rgba(255,255,255,0.08)]"
                  style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))' }}
                >
                  <Confetti />
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                    className="w-20 h-20 rounded-full gradient-lime mx-auto mb-6 flex items-center justify-center"
                  >
                    <CheckCircle className="w-10 h-10 text-accent-foreground" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <PartyPopper className="w-6 h-6 text-campaign-lime" />
                      <h2 className="font-accent font-extrabold text-3xl text-primary-foreground uppercase">
                        Merci !
                      </h2>
                      <PartyPopper className="w-6 h-6 text-campaign-lime -scale-x-100" />
                    </div>
                    <p className="text-primary-foreground/60 text-lg mb-2">
                      Merci pour votre contribution, <span className="text-campaign-lime font-bold">{form.first_name}</span> !
                    </p>
                    <p className="text-primary-foreground/40 text-sm">
                      Vos réponses pour le quartier {quartier.name} ont bien été enregistrées.
                      {form.wants_personal_response && (
                        <> Nous vous répondrons dans les meilleurs délais.</>
                      )}
                    </p>
                    <a
                      href="/"
                      className="inline-flex items-center gap-2 mt-8 gradient-lime text-accent-foreground px-6 py-3 rounded-xl text-sm font-extrabold hover:shadow-[0_20px_50px_-10px_hsl(var(--campaign-lime)/0.5)] hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Retour à l&apos;accueil
                    </a>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="rounded-3xl border-2 border-white/30 overflow-hidden backdrop-blur-md shadow-[0_0_80px_-20px_rgba(255,255,255,0.08)]"
                  style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))' }}
                >
                  {/* Identity section */}
                  <div className="px-7 sm:px-9 pt-7 sm:pt-9">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">👋</span>
                      <h2 className="font-accent font-extrabold text-primary-foreground text-xl sm:text-2xl uppercase tracking-wide">
                        Vos coordonnées
                      </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      {/* Prénom */}
                      <div className="group">
                        <label htmlFor="first_name" className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 block">
                          Prénom *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-campaign-lime transition-colors duration-200" />
                          <input
                            id="first_name"
                            type="text"
                            required
                            placeholder="Votre prénom"
                            value={form.first_name}
                            onBlur={() => handleBlur('first_name')}
                            onChange={e => handleChange('first_name', e.target.value)}
                            className="w-full pl-11 pr-4 py-4 rounded-xl bg-white/[0.08] border border-white/20 text-white text-sm outline-none placeholder:text-white/20 focus:border-campaign-lime focus:bg-campaign-lime/[0.04] transition-all duration-200"
                          />
                        </div>
                        {touched.has('first_name') && errors.first_name && (
                          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.first_name}
                          </motion.p>
                        )}
                      </div>

                      {/* Nom */}
                      <div className="group">
                        <label htmlFor="last_name" className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 block">
                          Nom *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-campaign-lime transition-colors duration-200" />
                          <input
                            id="last_name"
                            type="text"
                            required
                            placeholder="Votre nom"
                            value={form.last_name}
                            onBlur={() => handleBlur('last_name')}
                            onChange={e => handleChange('last_name', e.target.value)}
                            className="w-full pl-11 pr-4 py-4 rounded-xl bg-white/[0.08] border border-white/20 text-white text-sm outline-none placeholder:text-white/20 focus:border-campaign-lime focus:bg-campaign-lime/[0.04] transition-all duration-200"
                          />
                        </div>
                        {touched.has('last_name') && errors.last_name && (
                          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors.last_name}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="group mb-4">
                      <label htmlFor="email" className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 block">
                        Adresse email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-campaign-lime transition-colors duration-200" />
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="votre@email.fr"
                          value={form.email}
                          onBlur={() => handleBlur('email')}
                          onChange={e => handleChange('email', e.target.value)}
                          className="w-full pl-11 pr-4 py-4 rounded-xl bg-white/[0.08] border border-white/20 text-white text-sm outline-none placeholder:text-white/20 focus:border-campaign-lime focus:bg-campaign-lime/[0.04] transition-all duration-200"
                        />
                      </div>
                      {touched.has('email') && errors.email && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Questions section */}
                  <div className="px-7 sm:px-9 py-6 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">💬</span>
                      <h2 className="font-accent font-extrabold text-primary-foreground text-xl sm:text-2xl uppercase tracking-wide">
                        Vos réponses
                      </h2>
                    </div>

                    {errors.answers && touched.has('answers') && (
                      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm mb-4 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.answers}
                      </motion.p>
                    )}

                    <div className="space-y-8">
                      {questions.map((q, idx) => (
                        <motion.div
                          key={q.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * idx }}
                          className="group"
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <span className="w-8 h-8 rounded-full bg-campaign-lime/20 text-campaign-lime flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                              {q.question_number}
                            </span>
                            <label
                              htmlFor={`q-${q.id}`}
                              className="text-sm text-white/80 leading-relaxed"
                            >
                              {q.question_text}
                            </label>
                          </div>

                          {q.question_image_url && (
                            <div className="ml-11 mb-3">
                              <img
                                src={q.question_image_url}
                                alt={`Illustration question ${q.question_number}`}
                                className="rounded-xl max-h-64 object-cover border border-white/10"
                              />
                            </div>
                          )}

                          <div className="ml-11 relative">
                            <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-white/30 group-focus-within:text-campaign-lime transition-colors duration-200" />
                            <textarea
                              id={`q-${q.id}`}
                              rows={4}
                              maxLength={2000}
                              placeholder="Votre réponse..."
                              value={form.answers[q.id] || ''}
                              onChange={e => handleAnswerChange(q.id, e.target.value)}
                              className="w-full pl-11 pr-4 py-4 rounded-xl bg-white/[0.08] border border-white/20 text-white text-sm outline-none placeholder:text-white/20 focus:border-campaign-lime focus:bg-campaign-lime/[0.04] transition-all duration-200 resize-none"
                            />
                            <span className="text-white/20 text-xs absolute right-3 bottom-3">
                              {(form.answers[q.id] || '').length}/2000
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Closing image - project visualization */}
                    {quartier.closing_image_url && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * questions.length }}
                        className="mt-10 text-center"
                      >
                        <p className="text-sm font-bold text-campaign-lime uppercase tracking-wider mb-4">
                          Notre projet pour votre quartier
                        </p>
                        <img
                          src={quartier.closing_image_url}
                          alt={`Projet pour le quartier ${quartier.name}`}
                          className="rounded-xl max-h-96 w-full object-cover border border-white/10"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Preferences section */}
                  <div className="px-7 sm:px-9 py-6 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">📬</span>
                      <h2 className="font-accent font-extrabold text-primary-foreground text-xl sm:text-2xl uppercase tracking-wide">
                        Vos préférences
                      </h2>
                    </div>

                    <div className="space-y-4">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={form.wants_personal_response}
                          onChange={e => handleChange('wants_personal_response', e.target.checked)}
                          className="mt-1 w-5 h-5 rounded border-white/30 bg-white/10 text-campaign-lime focus:ring-campaign-lime/30 accent-[hsl(152_48%_50%)]"
                        />
                        <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                          Je souhaite recevoir une réponse personnelle de la part de Mathieu Morateur ou de ses colistiers
                        </span>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={form.wants_callback}
                          onChange={e => handleChange('wants_callback', e.target.checked)}
                          className="mt-1 w-5 h-5 rounded border-white/30 bg-white/10 text-campaign-lime focus:ring-campaign-lime/30 accent-[hsl(152_48%_50%)]"
                        />
                        <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                          Je souhaite être rappelé(e)
                        </span>
                      </label>

                      {/* Conditional phone field */}
                      <AnimatePresence>
                        {form.wants_callback && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="group ml-8">
                              <label htmlFor="phone" className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2 block">
                                Téléphone
                              </label>
                              <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-campaign-lime transition-colors duration-200" />
                                <input
                                  id="phone"
                                  type="tel"
                                  placeholder="06 12 34 56 78"
                                  value={form.phone}
                                  onBlur={() => handleBlur('phone')}
                                  onChange={e => handleChange('phone', e.target.value)}
                                  className="w-full pl-11 pr-4 py-4 rounded-xl bg-white/[0.08] border border-white/20 text-white text-sm outline-none placeholder:text-white/20 focus:border-campaign-lime focus:bg-campaign-lime/[0.04] transition-all duration-200"
                                />
                              </div>
                              {touched.has('phone') && errors.phone && (
                                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" /> {errors.phone}
                                </motion.p>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="px-7 sm:px-9 pb-7 sm:pb-9 pt-4">
                    {submitError && (
                      <div className="mb-4">
                        <p role="alert" className="text-red-400 text-sm text-center flex items-center justify-center gap-1.5">
                          <AlertCircle className="w-4 h-4" /> {submitError}
                        </p>
                      </div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl gradient-lime text-accent-foreground font-extrabold uppercase tracking-wider text-sm shadow-lg -rotate-1 hover:rotate-0 hover:shadow-[0_15px_40px_-10px_hsl(var(--campaign-lime)/0.4)] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:rotate-0"
                      whileHover={submitting ? {} : { scale: 1.02 }}
                      whileTap={submitting ? {} : { scale: 0.97 }}
                    >
                      {submitting ? (
                        <>
                          <motion.div
                            className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Envoyer mes réponses
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>

                    <p className="text-white/25 text-xs text-center mt-4">
                      En soumettant ce formulaire, vous acceptez notre{' '}
                      <a href="/politique-de-confidentialite" className="text-campaign-lime/50 hover:text-campaign-lime underline transition-colors duration-200">
                        politique de confidentialité
                      </a>.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
