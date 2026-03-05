// Cookie consent management for RGPD compliance

export const CONSENT_VERSION = '1.0'
export const CONSENT_COOKIE_NAME = 'cookie_consent'
export const CONSENT_MAX_AGE_DAYS = 395 // ~13 months (CNIL max)

export type CookieCategory = 'necessary' | 'analytics' | 'marketing'

export interface CookieConsent {
  necessary: true
  analytics: boolean
  marketing: boolean
  timestamp: string
  version: string
}

export const COOKIE_CATEGORIES: {
  key: CookieCategory
  label: string
  description: string
  required: boolean
}[] = [
  {
    key: 'necessary',
    label: 'Cookies nécessaires',
    description:
      'Indispensables au fonctionnement du site. Ils permettent la navigation, la sécurité et les fonctionnalités de base.',
    required: true,
  },
  {
    key: 'analytics',
    label: 'Cookies analytiques',
    description:
      'Google Analytics 4 — Nous aident à comprendre comment les visiteurs utilisent le site (pages consultées, durée de visite) pour améliorer votre expérience. Les données sont anonymisées.',
    required: false,
  },
  {
    key: 'marketing',
    label: 'Cookies marketing',
    description:
      'Meta Pixel (Facebook) — Permettent de mesurer l\'efficacité de nos campagnes de communication sur les réseaux sociaux.',
    required: false,
  },
]

function parseCookie(cookieString: string, name: string): string | null {
  const match = cookieString.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

export function getConsent(): CookieConsent | null {
  if (typeof document === 'undefined') return null
  const raw = parseCookie(document.cookie, CONSENT_COOKIE_NAME)
  if (!raw) return null
  try {
    const consent = JSON.parse(raw) as CookieConsent
    if (consent.version !== CONSENT_VERSION) return null
    return consent
  } catch {
    return null
  }
}

export function setConsent(preferences: Pick<CookieConsent, 'analytics' | 'marketing'>): void {
  const consent: CookieConsent = {
    necessary: true,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  }
  const maxAge = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(consent))};path=/;max-age=${maxAge};SameSite=Lax`

  // Dispatch custom event so analytics component can react
  window.dispatchEvent(new CustomEvent('consent-updated', { detail: consent }))
}

export function hasConsented(): boolean {
  return getConsent() !== null
}

export function getConsentForCategory(category: CookieCategory): boolean {
  if (category === 'necessary') return true
  const consent = getConsent()
  if (!consent) return false
  return consent[category] ?? false
}
