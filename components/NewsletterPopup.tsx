'use client'

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { X, CheckCircle, Mail, Sparkles, ArrowRight, Loader2, Shield, Bell } from "lucide-react";
import Link from "next/link";

interface NewsletterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const Confetti = () => {
  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    x: Math.random() * 260 - 130,
    y: -(Math.random() * 180 + 80),
    rotate: Math.random() * 720 - 360,
    scale: Math.random() * 0.5 + 0.5,
    color: ['hsl(152 48% 50%)', 'hsl(152 55% 62%)', 'hsl(0 0% 100%)', 'hsl(220 73% 50%)'][Math.floor(Math.random() * 4)],
    delay: Math.random() * 0.3,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-1/2 w-2 h-2 rounded-sm"
          style={{ backgroundColor: p.color }}
          initial={{ x: 0, y: 0, rotate: 0, scale: 0, opacity: 1 }}
          animate={{ x: p.x, y: p.y, rotate: p.rotate, scale: p.scale, opacity: 0 }}
          transition={{ duration: 1.2, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

const NewsletterPopup = ({ isOpen, onClose }: NewsletterPopupProps) => {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState("");
  const [formLoadedAt] = useState(() => Date.now());
  const [emailTouched, setEmailTouched] = useState(false);

  // Lock body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent || !isValidEmail) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consent: true, _hp: '', _ts: formLoadedAt }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        // Remember dismissal so popup doesn't show again
        try { localStorage.setItem('newsletter_subscribed', '1'); } catch {}
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Une erreur est survenue.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Erreur de connexion. Veuillez reessayer.');
    }
  }, [email, consent, isValidEmail, formLoadedAt]);

  const handleClose = useCallback(() => {
    // Remember dismissal
    try { localStorage.setItem('newsletter_popup_dismissed', Date.now().toString()); } catch {}
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Popup Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.7)]"
            style={{
              background: "linear-gradient(160deg, hsl(220 73% 28%), hsl(220 73% 18%), hsl(220 60% 14%))",
            }}
          >
            {/* Subtle glow effect */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(152 48% 50%), transparent)" }}
            />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full opacity-10 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, hsl(220 73% 50%), transparent)" }}
            />

            {/* Inner border shimmer */}
            <div className="absolute inset-0 rounded-3xl border border-white/[0.1] pointer-events-none" />

            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Fermer"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl border border-white/15 text-white/40 flex items-center justify-center hover:border-white/30 hover:text-white/70 hover:bg-white/5 transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </button>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="relative px-8 py-12 text-center"
                >
                  <Confetti />
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
                    className="w-18 h-18 rounded-full gradient-lime mx-auto mb-5 flex items-center justify-center"
                  >
                    <CheckCircle className="w-9 h-9 text-accent-foreground" />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <h3 className="font-accent font-extrabold text-2xl text-white uppercase tracking-wide mb-2">
                      Bienvenue !
                    </h3>
                    <p className="text-white/50 text-sm mb-6 max-w-xs mx-auto">
                      Vous recevrez nos prochaines actualites directement dans votre boite mail.
                    </p>
                    <button
                      onClick={handleClose}
                      className="gradient-lime text-accent-foreground px-7 py-3 rounded-2xl font-extrabold uppercase tracking-wider text-sm hover:shadow-[0_16px_44px_-8px_hsl(152_48%_50%/0.5)] hover:brightness-110 transition-all duration-200"
                    >
                      Fermer
                    </button>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Top accent bar */}
                  <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, hsl(152 48% 50%), hsl(152 55% 72%), hsl(152 48% 50%))" }} />

                  <form onSubmit={handleSubmit} noValidate className="relative px-7 sm:px-9 py-8 sm:py-10">
                    {/* Honeypot - hidden from humans */}
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0 }} />

                    {/* Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="mb-6"
                    >
                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-campaign-lime/10 border border-campaign-lime/20 text-campaign-lime text-xs font-bold uppercase tracking-widest">
                        <Bell className="w-3.5 h-3.5" />
                        Newsletter
                      </span>
                    </motion.div>

                    {/* Title */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="mb-6"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">&#x1F4EC;</span>
                        <h3 className="font-accent font-extrabold text-white text-xl sm:text-2xl uppercase tracking-wide">
                          Restez informe
                        </h3>
                      </div>
                      <p className="text-white/40 text-sm pl-10">
                        Recevez les actualites de la campagne directement dans votre boite mail.
                      </p>
                    </motion.div>

                    {/* Email field */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-4"
                    >
                      <label htmlFor="newsletter-popup-email" className="text-sm font-bold text-campaign-lime/90 uppercase tracking-wider mb-2.5 block">
                        Adresse email
                      </label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-campaign-lime transition-colors duration-200" />
                        <input
                          id="newsletter-popup-email"
                          type="email"
                          required
                          placeholder="votre@email.fr"
                          value={email}
                          onBlur={() => setEmailTouched(true)}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/[0.06] border border-white/[0.12] text-white text-base sm:text-sm outline-none placeholder:text-white/20 focus:border-campaign-lime/60 focus:bg-campaign-lime/[0.06] focus:shadow-[0_0_24px_-4px_hsl(152_48%_50%/0.3),inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-all duration-300"
                        />
                      </div>
                      {emailTouched && email && !isValidEmail && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          role="alert"
                          className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
                        >
                          <X className="w-3 h-3" /> Adresse email invalide
                        </motion.p>
                      )}
                    </motion.div>

                    {/* RGPD consent */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="mb-5"
                    >
                      <label className={`flex items-start gap-3 cursor-pointer group/check rounded-2xl p-3.5 border transition-all duration-300 ${
                        consent
                          ? "bg-campaign-lime/[0.06] border-campaign-lime/30"
                          : "bg-white/[0.04] border-white/10 hover:border-white/20"
                      }`}>
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={e => setConsent(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded border-white/30 bg-white/10 accent-[hsl(var(--campaign-lime))] cursor-pointer flex-shrink-0"
                        />
                        <div>
                          <span className="text-white/70 text-sm leading-relaxed group-hover/check:text-white/90 transition-colors">
                            J&apos;accepte de recevoir la newsletter par email.
                          </span>
                          <span className="block text-white/30 text-[11px] mt-0.5">
                            Desabonnement possible a tout moment.{' '}
                            <Link
                              href="/politique-de-confidentialite"
                              target="_blank"
                              className="text-campaign-lime/50 hover:text-campaign-lime underline transition-colors"
                              onClick={e => e.stopPropagation()}
                            >
                              Politique de confidentialite
                            </Link>
                          </span>
                        </div>
                      </label>
                    </motion.div>

                    {/* Error message */}
                    {status === 'error' && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        role="alert"
                        className="text-red-400 text-sm text-center mb-4 flex items-center justify-center gap-1.5"
                      >
                        <X className="w-4 h-4" /> {errorMsg}
                      </motion.p>
                    )}

                    {/* Submit button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.button
                        type="submit"
                        disabled={status === 'loading' || !consent || !isValidEmail}
                        className={`w-full flex items-center justify-center gap-2.5 py-4.5 rounded-2xl font-extrabold uppercase tracking-wider text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                          consent && isValidEmail
                            ? "gradient-lime text-accent-foreground shadow-[0_8px_30px_-6px_hsl(152_48%_50%/0.5)] hover:shadow-[0_16px_44px_-8px_hsl(152_48%_50%/0.5)] hover:brightness-110"
                            : "bg-white/[0.08] text-white/40 border border-white/[0.12]"
                        }`}
                        whileHover={consent && isValidEmail ? { scale: 1.02 } : {}}
                        whileTap={consent && isValidEmail ? { scale: 0.97 } : {}}
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Inscription en cours...
                          </>
                        ) : (
                          <>
                            S&apos;inscrire
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    </motion.div>

                    {/* Anti-spam badge */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center justify-center gap-1.5 mt-5 text-white/20 text-[11px]"
                    >
                      <Shield className="w-3 h-3" />
                      <span>Protege par notre systeme anti-spam</span>
                    </motion.div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
