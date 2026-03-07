'use client'

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { X, CheckCircle, Send, AlertCircle, User, Mail, Phone, MessageSquare, ArrowRight, ArrowLeft, Sparkles, PartyPopper } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import IconCaptcha from "./IconCaptcha";

type FormData = { prenom: string; nom: string; email: string; tel: string; motivations: string; accept_policy: boolean; newsletter_optin: boolean };
type FormErrors = Partial<Record<keyof FormData, string>>;

const validate = (form: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (form.prenom.trim().length < 2) errors.prenom = "Minimum 2 caractères";
  if (form.nom.trim().length < 2) errors.nom = "Minimum 2 caractères";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Email invalide";
  if (!/^(\+33|0)[1-9]\d{8}$/.test(form.tel.replace(/\s/g, ""))) errors.tel = "Numéro invalide (ex: 06 12 34 56 78)";
  if (form.motivations.trim().length < 10) errors.motivations = "Minimum 10 caractères";
  return errors;
};

const steps = [
  { id: 0, title: "Rejoignez les troupes", subtitle: "Inscrivez-vous pour soutenir notre projet", emoji: "\u270a", fields: ["prenom", "nom"] as const },
  { id: 1, title: "Restons en contact", subtitle: "Pour vous tenir informé de la campagne", emoji: "\ud83d\udce9", fields: ["email", "tel"] as const },
  { id: 2, title: "Votre engagement", subtitle: "Dites-nous pourquoi vous nous rejoignez !", emoji: "\ud83d\udcaa", fields: ["motivations"] as const },
];

const fieldConfig: Record<Exclude<keyof FormData, 'accept_policy' | 'newsletter_optin'>, { label: string; icon: typeof User; type: string; placeholder: string }> = {
  prenom: { label: "Prénom", icon: User, type: "text", placeholder: "Mathieu" },
  nom: { label: "Nom", icon: User, type: "text", placeholder: "Dupont" },
  email: { label: "Adresse email", icon: Mail, type: "email", placeholder: "mathieu@exemple.fr" },
  tel: { label: "Téléphone", icon: Phone, type: "tel", placeholder: "06 12 34 56 78" },
  motivations: { label: "Vos motivations", icon: MessageSquare, type: "textarea", placeholder: "Je souhaite m'engager parce que..." },
};

const Confetti = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 300 - 150,
    y: -(Math.random() * 200 + 100),
    rotate: Math.random() * 720 - 360,
    scale: Math.random() * 0.5 + 0.5,
    color: ['hsl(152 48% 50%)', 'hsl(152 55% 62%)', 'hsl(0 0% 100%)', 'hsl(220 73% 34%)'][Math.floor(Math.random() * 4)],
    delay: Math.random() * 0.3,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-1/2 w-2.5 h-2.5 rounded-sm"
          style={{ backgroundColor: p.color }}
          initial={{ x: 0, y: 0, rotate: 0, scale: 0, opacity: 1 }}
          animate={{ x: p.x, y: p.y, rotate: p.rotate, scale: p.scale, opacity: 0 }}
          transition={{ duration: 1.2, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

interface JoinPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const JoinPopup = ({ isOpen, onClose }: JoinPopupProps) => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<FormData>({ prenom: "", nom: "", email: "", tel: "", motivations: "", accept_policy: false, newsletter_optin: false });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [formLoadedAt] = useState(() => Date.now());
  const [showCaptcha, setShowCaptcha] = useState(false);

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
      if (e.key === 'Escape' && !showCaptcha) onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose, showCaptcha]);

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setForm(prev => {
      const next = { ...prev, [field]: value };
      if (touched.has(field)) {
        const fieldErrors = validate(next);
        setErrors(prev => ({ ...prev, [field]: fieldErrors[field] }));
      }
      return next;
    });
  }, [touched]);

  const handleBlur = useCallback((field: keyof FormData) => {
    setTouched(prev => new Set(prev).add(field));
    const fieldErrors = validate(form);
    setErrors(prev => ({ ...prev, [field]: fieldErrors[field] }));
  }, [form]);

  const validateStep = (stepIndex: number): boolean => {
    const currentFields = steps[stepIndex].fields;
    const allErrors = validate(form);
    const stepErrors: FormErrors = {};
    let hasError = false;

    for (const field of currentFields) {
      if (allErrors[field]) {
        stepErrors[field] = allErrors[field];
        hasError = true;
      }
    }

    setErrors(prev => ({ ...prev, ...stepErrors }));
    setTouched(prev => {
      const next = new Set(prev);
      for (const field of currentFields) next.add(field);
      return next;
    });

    return !hasError;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setDirection(1);
    setStep(s => Math.min(s + 1, steps.length - 1));
  };

  const goPrev = () => {
    setDirection(-1);
    setStep(s => Math.max(s - 1, 0));
  };

  // When user clicks "Envoyer", show captcha instead of submitting directly
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;
    if (!form.accept_policy) return;
    setShowCaptcha(true);
  };

  // After captcha success, actually submit the form
  const doSubmit = async () => {
    setShowCaptcha(false);
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          _hp: '',
          _ts: formLoadedAt,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || 'Erreur lors de l\'envoi');
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  const isStepValid = (stepIndex: number): boolean => {
    const currentFields = steps[stepIndex].fields;
    const allErrors = validate(form);
    return currentFields.every(f => !allErrors[f] && form[f].trim().length > 0);
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  const renderField = (key: 'prenom' | 'nom' | 'email' | 'tel') => {
    const config = fieldConfig[key];
    const Icon = config.icon;
    return (
      <div key={key} className="group">
        <label htmlFor={`popup-${key}`} className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-2 block">
          {config.label}
        </label>
        <div className="relative">
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-campaign-lime transition-colors duration-200" />
          <input
            id={`popup-${key}`}
            type={config.type}
            required
            placeholder={config.placeholder}
            value={form[key]}
            onBlur={() => handleBlur(key)}
            onChange={e => handleChange(key, e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-900 text-base outline-none placeholder:text-gray-400 focus:border-campaign-lime focus:ring-2 focus:ring-campaign-lime/30 shadow-sm transition-all duration-200"
          />
        </div>
        {touched.has(key) && errors[key] && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" /> {errors[key]}
          </motion.p>
        )}
      </div>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] gradient-teal-deep flex flex-col"
          style={{ height: '100dvh' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 flex-shrink-0 relative z-10">
            <span className="font-accent text-base font-extrabold tracking-widest uppercase text-primary-foreground">
              MORATEUR <span className="text-campaign-lime">2026</span>
            </span>
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="w-10 h-10 rounded-xl border border-primary-foreground/20 text-primary-foreground/60 flex items-center justify-center hover:border-campaign-lime hover:text-campaign-lime transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main content: split layout */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* LEFT PANEL: Candidate photo (desktop only) */}
            <div className="hidden lg:block lg:w-1/2 relative">
              <Image
                src="/images/header_candidat_portrait.png"
                alt="Mathieu Morateur"
                fill
                className="object-cover object-center"
                sizes="50vw"
                priority
              />
              {/* No overlay - clean photo */}
            </div>

            {/* RIGHT PANEL: Form */}
            <div className="flex-1 lg:w-1/2 overflow-y-auto flex flex-col justify-center px-6 sm:px-10 lg:px-12 xl:px-16 py-6">
              {/* Title */}
              <div className="mb-6 lg:mb-8">
                <motion.h1
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
                  className="font-accent font-extrabold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-primary-foreground uppercase leading-[1.05] tracking-wide"
                >
                  Rejoignez{' '}
                  <span className="text-campaign-lime">le mouv&apos; !</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
                  className="font-accent font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primary-foreground/80 uppercase leading-[1.1] tracking-wide mt-1"
                >
                  Morateur <span className="text-campaign-lime">2026</span>
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.5 }}
                  className="text-white/50 text-sm sm:text-base mt-4 max-w-sm leading-relaxed"
                >
                  Inscrivez-vous et participez au renouveau de notre commune.
                </motion.p>
              </div>

              {/* Form / Success */}
              <div className="max-w-md">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="relative rounded-3xl p-10 sm:p-14 text-center border-2 border-white/30 overflow-hidden backdrop-blur-md shadow-[0_0_80px_-20px_rgba(255,255,255,0.08)]"
                      style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.14), rgba(255,255,255,0.06))" }}
                    >
                      <Confetti />
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
                        className="w-20 h-20 rounded-full gradient-lime mx-auto mb-6 flex items-center justify-center"
                      >
                        <CheckCircle className="w-10 h-10 text-accent-foreground" />
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <PartyPopper className="w-6 h-6 text-campaign-lime" />
                          <h3 className="font-accent font-extrabold text-3xl text-primary-foreground uppercase">Merci !</h3>
                          <PartyPopper className="w-6 h-6 text-campaign-lime -scale-x-100" />
                        </div>
                        <p className="text-primary-foreground/60 text-lg mb-2">
                          Bienvenue dans l&apos;aventure, <span className="text-campaign-lime font-bold">{form.prenom}</span> !
                        </p>
                        <p className="text-primary-foreground/40 text-sm mb-6">Nous vous recontacterons très vite.</p>
                        <button
                          onClick={onClose}
                          className="gradient-lime text-accent-foreground px-8 py-3.5 rounded-2xl font-extrabold uppercase tracking-wider text-sm hover:shadow-[0_16px_44px_-8px_hsl(152_48%_50%/0.5)] hover:brightness-110 transition-all duration-200"
                        >
                          Fermer
                        </button>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <form
                      key="form"
                      onSubmit={handleSubmit}
                      noValidate
                      role="form"
                      aria-label="Formulaire de contact campagne"
                    >
                      {/* Honeypot - hidden from humans */}
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0 }} />

                      {/* Progress dots */}
                      <div className="flex items-center gap-2.5 mb-6">
                        {steps.map((s, i) => (
                          <div key={s.id} className="flex items-center gap-2.5">
                            <motion.div
                              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                                i < step
                                  ? "gradient-lime text-accent-foreground shadow-[0_0_16px_-2px_hsl(152_48%_50%/0.5)]"
                                  : i === step
                                  ? "bg-white text-[hsl(210,60%,12%)] shadow-[0_0_20px_-4px_rgba(255,255,255,0.4)]"
                                  : "bg-white/10 text-white/30 border border-white/15"
                              }`}
                              animate={i === step ? { scale: [1, 1.08, 1] } : {}}
                              transition={{ duration: 0.4 }}
                            >
                              {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                            </motion.div>
                            {i < steps.length - 1 && (
                              <div className={`w-10 sm:w-14 h-[3px] rounded-full transition-all duration-300 ${
                                i < step ? "bg-campaign-lime/80" : "bg-white/15"
                              }`} />
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Step title */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="mb-6"
                        >
                          <h3 className="font-accent font-extrabold text-primary-foreground text-xl sm:text-2xl uppercase tracking-wide mb-1">
                            {steps[step].title}
                          </h3>
                          <p className="text-white/50 text-sm">{steps[step].subtitle}</p>
                        </motion.div>
                      </AnimatePresence>

                      {/* Step content */}
                      <div className="pb-6 min-h-[180px] sm:min-h-[200px] flex items-start">
                        <AnimatePresence mode="wait" custom={direction}>
                          <motion.div
                            key={step}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="w-full space-y-4"
                          >
                            {step === 0 && (
                              <div className="grid sm:grid-cols-2 gap-4">
                                {(["prenom", "nom"] as const).map(renderField)}
                              </div>
                            )}

                            {step === 1 && (
                              <div className="space-y-4">
                                {(["email", "tel"] as const).map(renderField)}
                              </div>
                            )}

                            {step === 2 && (
                              <div className="space-y-4">
                                <div className="group">
                                  <label htmlFor="popup-motivations" className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-2 block">
                                    Dites-nous en plus
                                  </label>
                                  <div className="relative">
                                    <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400 group-focus-within:text-campaign-lime transition-colors duration-200" />
                                    <textarea
                                      id="popup-motivations"
                                      required
                                      maxLength={500}
                                      rows={4}
                                      placeholder={fieldConfig.motivations.placeholder}
                                      value={form.motivations}
                                      onBlur={() => handleBlur("motivations")}
                                      onChange={e => handleChange("motivations", e.target.value)}
                                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white border border-gray-200 text-gray-900 text-base outline-none placeholder:text-gray-400 focus:border-campaign-lime focus:ring-2 focus:ring-campaign-lime/30 shadow-sm transition-all duration-200 resize-none"
                                    />
                                  </div>
                                  <div className="flex justify-between mt-1.5">
                                    {touched.has("motivations") && errors.motivations ? (
                                      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} role="alert" className="text-red-400 text-xs flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> {errors.motivations}
                                      </motion.p>
                                    ) : <span />}
                                    <span className="text-white/40 text-xs">{form.motivations.length}/500</span>
                                  </div>
                                </div>

                                {/* Privacy policy */}
                                <label className={`flex items-start gap-3 cursor-pointer group/check rounded-2xl p-3.5 border transition-all duration-300 ${
                                  form.accept_policy
                                    ? "bg-campaign-lime/[0.06] border-campaign-lime/30"
                                    : "bg-white/[0.04] border-white/10 hover:border-white/20"
                                }`}>
                                  <input
                                    type="checkbox"
                                    checked={form.accept_policy}
                                    onChange={e => setForm(prev => ({ ...prev, accept_policy: e.target.checked }))}
                                    className="mt-0.5 w-4 h-4 rounded border-white/30 bg-white/10 accent-[hsl(var(--campaign-lime))] cursor-pointer flex-shrink-0"
                                  />
                                  <div>
                                    <span className="text-white/80 text-sm leading-relaxed">
                                      J&apos;accepte que mes données soient traitées conformément à la{' '}
                                      <Link href="/politique-de-confidentialite" target="_blank" className="text-campaign-lime underline hover:text-campaign-lime/80 transition-colors" onClick={e => e.stopPropagation()}>
                                        politique de confidentialité
                                      </Link>
                                      {' '}de Morateur 2026. <span className="text-red-400">*</span>
                                    </span>
                                  </div>
                                </label>

                                {/* Newsletter opt-in */}
                                <label className={`flex items-start gap-3 cursor-pointer group/check rounded-2xl p-3.5 border transition-all duration-300 ${
                                  form.newsletter_optin
                                    ? "bg-campaign-lime/[0.06] border-campaign-lime/30"
                                    : "bg-white/[0.04] border-white/10 hover:border-white/20"
                                }`}>
                                  <input
                                    type="checkbox"
                                    checked={form.newsletter_optin}
                                    onChange={e => setForm(prev => ({ ...prev, newsletter_optin: e.target.checked }))}
                                    className="mt-0.5 w-4 h-4 rounded border-white/30 bg-white/10 accent-[hsl(var(--campaign-lime))] cursor-pointer flex-shrink-0"
                                  />
                                  <div>
                                    <span className="text-white/70 text-sm leading-relaxed group-hover/check:text-white/90 transition-colors">
                                      Je souhaite également recevoir la newsletter de la campagne par email
                                    </span>
                                    <span className="block text-white/30 text-[11px] mt-0.5">
                                      Actualités, événements et avancées du projet. Désabonnement possible à tout moment.
                                    </span>
                                  </div>
                                </label>
                              </div>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>

                      {/* Error message */}
                      {submitError && (
                        <div className="pb-2">
                          <p role="alert" className="text-red-400 text-sm text-center flex items-center justify-center gap-1.5">
                            <AlertCircle className="w-4 h-4" /> {submitError}
                          </p>
                        </div>
                      )}

                      {/* Navigation buttons */}
                      <div className="pt-2 pb-2">
                        <div className="flex items-center gap-3">
                          {step > 0 && (
                            <motion.button
                              type="button"
                              onClick={goPrev}
                              className="group flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-white/[0.05] border border-white/[0.15] text-white/60 hover:text-white hover:bg-white/[0.10] hover:border-white/[0.25] active:scale-95 font-bold text-sm uppercase tracking-wider transition-all duration-200"
                              whileTap={{ scale: 0.95 }}
                            >
                              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
                              Retour
                            </motion.button>
                          )}

                          {step < steps.length - 1 ? (
                            <motion.button
                              type="button"
                              onClick={goNext}
                              className={`group flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl font-extrabold uppercase tracking-wider text-sm transition-all duration-200 ${
                                isStepValid(step)
                                  ? "gradient-lime text-accent-foreground shadow-[0_4px_24px_-4px_hsl(152_48%_50%/0.5)] hover:shadow-[0_8px_36px_-4px_hsl(152_48%_50%/0.6)] hover:brightness-110"
                                  : "bg-white/15 text-white/50 border border-white/20 cursor-default"
                              }`}
                              whileHover={isStepValid(step) ? { scale: 1.02 } : {}}
                              whileTap={isStepValid(step) ? { scale: 0.97 } : {}}
                            >
                              Continuer
                              <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${isStepValid(step) ? 'group-hover:translate-x-1' : ''}`} />
                            </motion.button>
                          ) : (
                            <motion.button
                              type="submit"
                              disabled={submitting || !form.accept_policy}
                              className={`group flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl font-extrabold uppercase tracking-wider text-sm transition-all duration-200 disabled:cursor-not-allowed ${
                                form.accept_policy && !submitting
                                  ? "gradient-lime text-accent-foreground shadow-[0_4px_24px_-4px_hsl(152_48%_50%/0.5)] hover:shadow-[0_8px_36px_-4px_hsl(152_48%_50%/0.6)] hover:brightness-110"
                                  : "bg-white/15 text-white/50 border border-white/20"
                              }`}
                              whileHover={submitting || !form.accept_policy ? {} : { scale: 1.02 }}
                              whileTap={submitting || !form.accept_policy ? {} : { scale: 0.97 }}
                            >
                              {submitting ? (
                                <>
                                  <motion.div
                                    className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                  />
                                  Envoi en cours...
                                </>
                              ) : (
                                <>
                                  <Sparkles className="w-4 h-4" />
                                  Envoyer
                                  <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                                </>
                              )}
                            </motion.button>
                          )}
                        </div>

                        {step === steps.length - 1 && !form.accept_policy && (
                          <p className="text-white/30 text-xs text-center mt-3">
                            <span className="text-red-400">*</span> Veuillez accepter la politique de confidentialité pour envoyer le formulaire.
                          </p>
                        )}
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Icon Captcha */}
          <IconCaptcha
            isOpen={showCaptcha}
            onSuccess={doSubmit}
            onClose={() => setShowCaptcha(false)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JoinPopup;
