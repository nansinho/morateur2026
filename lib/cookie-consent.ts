export type ConsentState = {
  analytics: boolean
  marketing: boolean
  timestamp: number
}

export const CONSENT_KEY = 'morateur2026-cookie-consent'
export const CONSENT_EVENT = 'cookie-consent-update'

export function getConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CONSENT_KEY)
    if (!raw) return null
    return JSON.parse(raw) as ConsentState
  } catch {
    return null
  }
}

export function setConsent(consent: Omit<ConsentState, 'timestamp'>): void {
  const state: ConsentState = { ...consent, timestamp: Date.now() }
  localStorage.setItem(CONSENT_KEY, JSON.stringify(state))
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }))
}

export function hasConsented(): boolean {
  return getConsent() !== null
}
