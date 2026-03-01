'use client'

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";
import { FileText, CheckCircle, Send, ExternalLink, AlertCircle, User, Mail, Phone, MessageSquare } from "lucide-react";

type FormData = { prenom: string; nom: string; email: string; tel: string; motivations: string };
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

const fieldMeta = [
  { key: "prenom" as const, label: "Prénom", icon: User, type: "text", half: true },
  { key: "nom" as const, label: "Nom", icon: User, type: "text", half: true },
  { key: "email" as const, label: "Adresse email", icon: Mail, type: "email", half: false },
  { key: "tel" as const, label: "Téléphone", icon: Phone, type: "tel", half: false },
];

const ProcurationSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({ prenom: "", nom: "", email: "", tel: "", motivations: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());
  const [focused, setFocused] = useState<string | null>(null);

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
    setFocused(null);
    setTouched(prev => new Set(prev).add(field));
    const fieldErrors = validate(form);
    setErrors(prev => ({ ...prev, [field]: fieldErrors[field] }));
  }, [form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allErrors = validate(form);
    setErrors(allErrors);
    setTouched(new Set(Object.keys(form)));
    if (Object.keys(allErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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

  const inputClass = (field: string) => {
    const isFocused = focused === field;
    const hasError = touched.has(field) && errors[field as keyof FormData];
    const isValid = touched.has(field) && !errors[field as keyof FormData];
    const base = "w-full pl-11 pr-4 py-3.5 rounded-xl border bg-background text-foreground text-sm transition-all duration-200 outline-none placeholder:text-muted-foreground/50";
    if (isFocused) return `${base} border-campaign-lime ring-1 ring-campaign-lime/20`;
    if (hasError) return `${base} border-destructive`;
    if (isValid) return `${base} border-campaign-lime/30`;
    return `${base} border-border hover:border-muted-foreground/30`;
  };

  return (
    <section id="procuration" aria-label="Rejoignez-nous et procuration" className="gradient-teal-deep relative overflow-hidden">
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
                  className="inline-flex items-center gap-2 gradient-lime text-accent-foreground px-6 py-3 rounded-xl text-sm font-extrabold -rotate-1 hover:rotate-0 hover:shadow-[0_20px_50px_-10px_hsl(var(--campaign-lime)/0.5)] hover:scale-105 transition-all duration-200"
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
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="bg-background/95 backdrop-blur-xl rounded-2xl p-12 text-center border border-border shadow-2xl"
                >
                  <CheckCircle className="w-16 h-16 text-campaign-lime mx-auto mb-5" />
                  <h3 className="font-accent font-extrabold text-2xl text-foreground mb-2 uppercase">Merci !</h3>
                  <p className="text-muted-foreground">Nous vous recontacterons très vite.</p>
                </motion.div>
              ) : (
                <form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-background/95 backdrop-blur-xl rounded-2xl p-8 space-y-5 border border-border shadow-2xl"
                  role="form"
                  aria-label="Formulaire de contact campagne"
                >
                  <div className="flex gap-1.5 mb-2">
                    {Object.keys(form).map((field) => (
                      <div
                        key={field}
                        className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
                          touched.has(field) && !errors[field as keyof FormData]
                            ? "bg-campaign-lime"
                            : touched.has(field) && errors[field as keyof FormData]
                            ? "bg-destructive"
                            : "bg-border"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {fieldMeta.filter(f => f.half).map(({ key, label, icon: Icon, type }) => (
                      <div key={key}>
                        <label htmlFor={key} className="text-sm font-medium text-foreground/80 mb-2 block">{label} <span className="text-campaign-lime">*</span></label>
                        <div className="relative">
                          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                          <input id={key} type={type} required value={form[key]} onFocus={() => setFocused(key)} onBlur={() => handleBlur(key)} onChange={e => handleChange(key, e.target.value)} className={inputClass(key)} />
                        </div>
                        {touched.has(key) && errors[key] && (
                          <p role="alert" className="text-destructive text-xs mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {errors[key]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {fieldMeta.filter(f => !f.half).map(({ key, label, icon: Icon, type }) => (
                    <div key={key}>
                      <label htmlFor={key} className="text-sm font-medium text-foreground/80 mb-2 block">{label} <span className="text-campaign-lime">*</span></label>
                      <div className="relative">
                        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <input id={key} type={type} required value={form[key]} onFocus={() => setFocused(key)} onBlur={() => handleBlur(key)} onChange={e => handleChange(key, e.target.value)} className={inputClass(key)} />
                      </div>
                      {touched.has(key) && errors[key] && (
                        <p role="alert" className="text-destructive text-xs mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors[key]}
                        </p>
                      )}
                    </div>
                  ))}

                  <div>
                    <label htmlFor="motivations" className="text-sm font-medium text-foreground/80 mb-2 block">Vos motivations <span className="text-campaign-lime">*</span></label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-4 w-4 h-4 text-muted-foreground pointer-events-none" />
                      <textarea id="motivations" required maxLength={500} rows={4} value={form.motivations} onFocus={() => setFocused("motivations")} onBlur={() => handleBlur("motivations")} onChange={e => handleChange("motivations", e.target.value)} className={`${inputClass("motivations")} resize-none pt-3.5`} />
                    </div>
                    <div className="flex justify-between mt-1.5">
                      {touched.has("motivations") && errors.motivations && (
                        <p role="alert" className="text-destructive text-xs flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.motivations}
                        </p>
                      )}
                      <span className="text-muted-foreground text-xs ml-auto">{form.motivations.length}/500</span>
                    </div>
                  </div>

                  {submitError && (
                    <p role="alert" className="text-destructive text-sm text-center flex items-center justify-center gap-1.5">
                      <AlertCircle className="w-4 h-4" /> {submitError}
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    className="w-full gradient-lime text-accent-foreground py-5 rounded-2xl font-extrabold uppercase tracking-wider text-base flex items-center justify-center gap-2 shadow-lg -rotate-1 hover:rotate-0 hover:shadow-[0_20px_50px_-10px_hsl(var(--campaign-lime)/0.5)] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={submitting ? {} : { scale: 1.04 }}
                    whileTap={submitting ? {} : { scale: 0.95, rotate: -3 }}
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? 'Envoi en cours...' : 'Envoyer'}
                  </motion.button>

                  <p className="text-muted-foreground/50 text-xs text-center">
                    En soumettant ce formulaire, vous acceptez notre{' '}
                    <a href="/politique-de-confidentialite" className="text-campaign-lime/70 hover:text-campaign-lime underline">
                      politique de confidentialité
                    </a>.
                  </p>
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
