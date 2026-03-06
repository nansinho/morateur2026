'use client'

import { useState } from 'react'
import { Mail, Loader2, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const NewsletterForm = () => {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !consent) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent: true }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setEmail('')
        setConsent(false)
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Une erreur est survenue.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Erreur de connexion. Réessayez.')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-campaign-lime text-sm font-medium">
        <CheckCircle2 className="w-4 h-4" />
        <span>Inscription confirmée ! Vérifiez votre boîte mail.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <p className="text-primary-foreground/50 text-xs leading-relaxed">
        Inscrivez-vous pour recevoir les actualités de la campagne Morateur 2026 par email.
      </p>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            aria-label="Adresse email"
            required
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-base sm:text-sm placeholder:text-primary-foreground/40 focus:outline-none focus:border-campaign-lime/50 focus:ring-1 focus:ring-campaign-lime/30 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading' || !consent}
          className="px-5 py-2.5 rounded-xl gradient-lime text-accent-foreground text-sm font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-campaign-lime/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "S'inscrire"
          )}
        </button>
      </div>

      {/* Checkbox consentement RGPD */}
      <label className="flex items-start gap-2 cursor-pointer group">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-primary-foreground/30 bg-primary-foreground/10 text-campaign-lime focus:ring-campaign-lime/30 accent-[hsl(var(--campaign-lime))] cursor-pointer"
        />
        <span className="text-primary-foreground/40 text-[11px] leading-relaxed group-hover:text-primary-foreground/60 transition-colors">
          J&apos;accepte de recevoir la newsletter de la campagne par email.
          Désabonnement possible à tout moment.{' '}
          <Link
            href="/politique-de-confidentialite"
            className="text-campaign-lime/60 hover:text-campaign-lime underline transition-colors"
          >
            Politique de confidentialité
          </Link>
        </span>
      </label>

      {status === 'error' && (
        <p role="alert" className="text-red-400 text-xs">{errorMsg}</p>
      )}
    </form>
  )
}

export default NewsletterForm
