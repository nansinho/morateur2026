/**
 * Server-side anti-spam utilities.
 * Three layers of protection:
 * 1. Honeypot field — bots fill a hidden field, humans don't
 * 2. Timestamp validation — rejects submissions made too quickly (< 3s)
 * 3. IP-based rate limiting — max submissions per IP per time window
 */

// --- Rate Limiter (in-memory) ---
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of rateLimitStore) {
    if (now > val.resetAt) rateLimitStore.delete(key);
  }
}, 60_000);

function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const real = request.headers.get('x-real-ip');
  if (real) return real;
  return 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

// --- Main validation ---

interface AntiSpamResult {
  ok: boolean;
  error?: string;
  status?: number;
}

interface AntiSpamFields {
  _hp?: string;   // honeypot field
  _ts?: number;   // timestamp when form loaded
}

export function validateAntiSpam(
  request: Request,
  body: AntiSpamFields
): AntiSpamResult {
  // Layer 1: Honeypot check
  if (body._hp && body._hp.trim().length > 0) {
    // Don't reveal it's a spam check — just silently "succeed"
    console.log('[ANTISPAM] Honeypot triggered');
    return { ok: false, error: 'success_fake', status: 200 };
  }

  // Layer 2: Timestamp check (< 3 seconds = bot)
  if (body._ts) {
    const elapsed = Date.now() - body._ts;
    if (elapsed < 3000) {
      console.log('[ANTISPAM] Too fast submission:', elapsed, 'ms');
      return { ok: false, error: 'success_fake', status: 200 };
    }
  }

  // Layer 3: Rate limiting
  const ip = getClientIP(request);
  if (!checkRateLimit(ip)) {
    console.log('[ANTISPAM] Rate limit exceeded for IP:', ip);
    return { ok: false, error: 'Trop de tentatives. Veuillez réessayer dans quelques minutes.', status: 429 };
  }

  return { ok: true };
}
