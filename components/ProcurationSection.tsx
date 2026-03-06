'use client'

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { FileText, CheckCircle, Send, ExternalLink, AlertCircle, User, Mail, Phone, MessageSquare, ArrowRight, ArrowLeft, Sparkles, PartyPopper } from "lucide-react";
import Link from "next/link";

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
  { id: 0, title: "Rejoignez les troupes", subtitle: "Inscrivez-vous pour soutenir notre projet", emoji: "✊", fields: ["prenom", "nom"] as const },
  { id: 1, title: "Restons en contact", subtitle: "Pour vous tenir informé de la campagne", emoji: "📩", fields: ["email", "tel"] as const },
  { id: 2, title: "Votre engagement", subtitle: "Dites-nous pourquoi vous nous rejoignez !", emoji: "💪", fields: ["motivations"] as const },
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

const ProcurationSection = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<FormData>({ prenom: "", nom: "", email: "", tel: "", motivations: "", accept_policy: false, newsletter_optin: false });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [formLoadedAt] = useState(() => Date.now());

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, _hp: '', _ts: formLoadedAt }),
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

  return (
    <section id="procuration" aria-label="Rejoignez-nous et procuration" className="gradient-teal-deep relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-campaign-lime/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-56 h-56 bg-campaign-lime/[0.03] rounded-full blur-2xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-28 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">Agissez</span>
              <h2
                className="font-accent font-extrabold uppercase leading-[0.95] tracking-tight text-primary-foreground mb-5 break-words"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                REJOIGNEZ-<br />
                <span className="text-campaign-lime">NOUS</span>
              </h2>
              <p className="text-primary-foreground/50 text-lg leading-relaxed mb-10">
                Vous souhaitez soutenir notre projet pour Bouc-Bel-Air ? Remplissez ce formulaire et nous vous recontacterons rapidement.
              </p>

              {/* Procuration card */}
              <div className="rounded-2xl p-6 bg-primary-foreground/[0.06] border border-primary-foreground/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl gradient-lime flex items-center justify-center">
                    <FileText className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h3 className="font-accent font-bold uppercase tracking-wide text-primary-foreground">Procuration</h3>
                </div>
                <p className="text-primary-foreground/40 text-sm leading-relaxed mb-4">
                  Vous ne pouvez pas vous déplacer le jour du vote ? Donnez procuration à un électeur de votre commune.
                </p>
                <a
                  href="https://www.maprocuration.gouv.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 gradient-lime text-accent-foreground px-6 py-3 rounded-xl text-sm font-extrabold -rotate-1 hover:rotate-0 hover:shadow-[0_20px_50px_-10px_hsl(var(--campaign-lime)/0.5)] hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  maprocuration.gouv.fr
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
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
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <PartyPopper className="w-6 h-6 text-campaign-lime" />
                      <h3 className="font-accent font-extrabold text-3xl text-primary-foreground uppercase">
                        Merci !
                      </h3>
                      <PartyPopper className="w-6 h-6 text-campaign-lime -scale-x-100" />
                    </div>
                    <p className="text-primary-foreground/60 text-lg mb-2">
                      Bienvenue dans l&apos;aventure, <span className="text-campaign-lime font-bold">{form.prenom}</span> !
                    </p>
                    <p className="text-primary-foreground/40 text-sm">
                      Nous vous recontacterons très vite.
                    </p>
                  </motion.div>
                </motion.div>
              ) : (
                <form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="rounded-3xl border border-white/[0.12] overflow-hidden backdrop-blur-xl shadow-[0_8px_60px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.06)]"
                  style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))" }}
                  role="form"
                  aria-label="Formulaire de contact campagne"
                >
                  {/* Honeypot - hidden from humans */}
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0 }} />

                  {/* Step header */}
                  <div className="px-7 sm:px-9 pt-7 sm:pt-9 pb-0">
                    {/* Inscription badge */}
                    <div className="mb-5">
                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-campaign-lime/10 border border-campaign-lime/20 text-campaign-lime text-xs font-bold uppercase tracking-widest">
                        <Sparkles className="w-3.5 h-3.5" />
                        Inscription — Rejoignez-nous
                      </span>
                    </div>

                    {/* Progress dots */}
                    <div className="flex items-center gap-2 mb-6">
                      {steps.map((s, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <motion.div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                              i < step
                                ? "gradient-lime text-accent-foreground shadow-[0_0_16px_-2px_hsl(152_48%_50%/0.5)]"
                                : i === step
                                ? "bg-campaign-lime/10 text-campaign-lime border-2 border-campaign-lime shadow-[0_0_20px_-4px_hsl(152_48%_50%/0.3)]"
                                : "bg-white/[0.06] text-white/30 border border-white/15"
                            }`}
                            animate={i === step ? { scale: [1, 1.08, 1] } : {}}
                            transition={{ duration: 0.4 }}
                          >
                            {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                          </motion.div>
                          {i < steps.length - 1 && (
                            <div className={`w-8 sm:w-14 h-[3px] rounded-full transition-all duration-300 ${
                              i < step ? "bg-campaign-lime/80" : "bg-white/10"
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
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-2xl">{steps[step].emoji}</span>
                          <h3 className="font-accent font-extrabold text-primary-foreground text-xl sm:text-2xl uppercase tracking-wide">
                            {steps[step].title}
                          </h3>
                        </div>
                        <p className="text-white/40 text-sm pl-10">
                          {steps[step].subtitle}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Step content */}
                  <div className="px-7 sm:px-9 pb-4 min-h-[180px] sm:min-h-[220px] flex items-start">
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
                            {(["prenom", "nom"] as const).map(key => {
                              const config = fieldConfig[key];
                              const Icon = config.icon;
                              return (
                                <div key={key} className="group">
                                  <label htmlFor={key} className="text-sm font-bold text-campaign-lime/90 uppercase tracking-wider mb-2.5 block">
                                    {config.label}
                                  </label>
                                  <div className="relative">
                                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-campaign-lime transition-colors duration-200" />
                                    <input
                                      id={key}
                                      type={config.type}
                                      required
                                      placeholder={config.placeholder}
                                      value={form[key]}
                                      onBlur={() => handleBlur(key)}
                                      onChange={e => handleChange(key, e.target.value)}
                                      className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/[0.06] border border-white/[0.12] text-white text-base sm:text-sm outline-none placeholder:text-white/20 focus:border-campaign-lime/60 focus:bg-campaign-lime/[0.06] focus:shadow-[0_0_24px_-4px_hsl(152_48%_50%/0.3),inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-all duration-300"
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
                            })}
                          </div>
                        )}

                        {step === 1 && (
                          <div className="space-y-4">
                            {(["email", "tel"] as const).map(key => {
                              const config = fieldConfig[key];
                              const Icon = config.icon;
                              return (
                                <div key={key} className="group">
                                  <label htmlFor={key} className="text-sm font-bold text-campaign-lime/90 uppercase tracking-wider mb-2.5 block">
                                    {config.label}
                                  </label>
                                  <div className="relative">
                                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-campaign-lime transition-colors duration-200" />
                                    <input
                                      id={key}
                                      type={config.type}
                                      required
                                      placeholder={config.placeholder}
                                      value={form[key]}
                                      onBlur={() => handleBlur(key)}
                                      onChange={e => handleChange(key, e.target.value)}
                                      className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/[0.06] border border-white/[0.12] text-white text-base sm:text-sm outline-none placeholder:text-white/20 focus:border-campaign-lime/60 focus:bg-campaign-lime/[0.06] focus:shadow-[0_0_24px_-4px_hsl(152_48%_50%/0.3),inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-all duration-300"
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
                            })}
                          </div>
                        )}

                        {step === 2 && (
                          <div className="space-y-4">
                            <div className="group">
                              <label htmlFor="motivations" className="text-sm font-bold text-campaign-lime/90 uppercase tracking-wider mb-2.5 block">
                                Dites-nous en plus
                              </label>
                              <div className="relative">
                                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-white/30 group-focus-within:text-campaign-lime transition-colors duration-200" />
                                <textarea
                                  id="motivations"
                                  required
                                  maxLength={500}
                                  rows={5}
                                  placeholder={fieldConfig.motivations.placeholder}
                                  value={form.motivations}
                                  onBlur={() => handleBlur("motivations")}
                                  onChange={e => handleChange("motivations", e.target.value)}
                                  className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/[0.06] border border-white/[0.12] text-white text-base sm:text-sm outline-none placeholder:text-white/20 focus:border-campaign-lime/60 focus:bg-campaign-lime/[0.06] focus:shadow-[0_0_24px_-4px_hsl(152_48%_50%/0.3),inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-all duration-300 resize-none"
                                />
                              </div>
                              <div className="flex justify-between mt-1.5">
                                {touched.has("motivations") && errors.motivations ? (
                                  <motion.p
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    role="alert"
                                    className="text-red-400 text-xs flex items-center gap-1"
                                  >
                                    <AlertCircle className="w-3 h-3" /> {errors.motivations}
                                  </motion.p>
                                ) : <span />}
                                <span className="text-white/30 text-xs">{form.motivations.length}/500</span>
                              </div>
                            </div>

                            {/* Acceptation politique de confidentialité (obligatoire) */}
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
                                  <Link
                                    href="/politique-de-confidentialite"
                                    target="_blank"
                                    className="text-campaign-lime underline hover:text-campaign-lime/80 transition-colors"
                                    onClick={e => e.stopPropagation()}
                                  >
                                    politique de confidentialité
                                  </Link>
                                  {' '}de Morateur 2026. <span className="text-red-400">*</span>
                                </span>
                              </div>
                            </label>

                            {/* Opt-in newsletter (optionnel) */}
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
                    <div className="px-7 sm:px-9 pb-2">
                      <p role="alert" className="text-red-400 text-sm text-center flex items-center justify-center gap-1.5">
                        <AlertCircle className="w-4 h-4" /> {submitError}
                      </p>
                    </div>
                  )}

                  {/* Navigation buttons */}
                  <div className="px-7 sm:px-9 pb-7 sm:pb-9 pt-4">
                    <div className="flex items-center gap-3">
                      {step > 0 && (
                        <motion.button
                          type="button"
                          onClick={goPrev}
                          className="flex items-center gap-2 px-5 py-4 rounded-2xl border border-white/[0.12] text-white/50 hover:text-white/80 hover:border-white/25 hover:bg-white/[0.04] active:scale-95 font-bold text-sm uppercase tracking-wider transition-all duration-300"
                          whileHover={{ x: -3 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Retour
                        </motion.button>
                      )}

                      {step < steps.length - 1 ? (
                        <motion.button
                          type="button"
                          onClick={goNext}
                          className={`flex-1 flex items-center justify-center gap-2 py-[1.125rem] rounded-2xl font-extrabold uppercase tracking-wider text-sm transition-all duration-300 ${
                            isStepValid(step)
                              ? "gradient-lime text-accent-foreground shadow-[0_8px_30px_-6px_hsl(152_48%_50%/0.5)] hover:shadow-[0_16px_44px_-8px_hsl(152_48%_50%/0.5)] hover:brightness-110"
                              : "bg-white/[0.15] text-white/60 border border-white/20 cursor-default"
                          }`}
                          whileHover={isStepValid(step) ? { scale: 1.02 } : {}}
                          whileTap={isStepValid(step) ? { scale: 0.97 } : {}}
                        >
                          Continuer
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      ) : (
                        <motion.button
                          type="submit"
                          disabled={submitting || !form.accept_policy}
                          className={`flex-1 flex items-center justify-center gap-2 py-[1.125rem] rounded-2xl font-extrabold uppercase tracking-wider text-sm transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed ${
                            form.accept_policy
                              ? "gradient-lime text-accent-foreground shadow-[0_8px_30px_-6px_hsl(152_48%_50%/0.5)] hover:shadow-[0_16px_44px_-8px_hsl(152_48%_50%/0.5)] hover:brightness-110"
                              : "bg-white/[0.15] text-white/60 border border-white/20"
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
                              <Send className="w-4 h-4" />
                            </>
                          )}
                        </motion.button>
                      )}
                    </div>

                    {/* Indication champ obligatoire */}
                    {step === steps.length - 1 && !form.accept_policy && (
                      <p className="text-white/30 text-xs text-center mt-3">
                        <span className="text-red-400">*</span> Veuillez accepter la politique de confidentialité pour envoyer le formulaire.
                      </p>
                    )}
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcurationSection;
