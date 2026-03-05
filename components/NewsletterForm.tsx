'use client'

import { useState } from 'react'
import { Mail, Loader2, CheckCircle2 } from 'lucide-react'

const NewsletterForm = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setEmail('')
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/40" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            required
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm placeholder:text-primary-foreground/40 focus:outline-none focus:border-campaign-lime/50 focus:ring-1 focus:ring-campaign-lime/30 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-5 py-2.5 rounded-xl gradient-lime text-accent-foreground text-sm font-bold uppercase tracking-wider hover:shadow-lg hover:shadow-campaign-lime/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "S'inscrire"
          )}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-red-400 text-xs">{errorMsg}</p>
      )}
    </form>
  )
}

export default NewsletterForm
