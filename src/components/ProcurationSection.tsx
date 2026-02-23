import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useCallback, useRef } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const formX = useTransform(scrollYProgress, [0, 0.3], [120, 0]);
  const formOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allErrors = validate(form);
    setErrors(allErrors);
    setTouched(new Set(Object.keys(form)));
    if (Object.keys(allErrors).length === 0) setSubmitted(true);
  };

  const getInputState = (field: string) => {
    if (focused === field) return "focused";
    if (touched.has(field) && errors[field as keyof FormData]) return "error";
    if (touched.has(field) && !errors[field as keyof FormData]) return "valid";
    return "default";
  };

  const inputClass = (field: string) => {
    const state = getInputState(field);
    const base = "w-full pl-11 pr-4 py-3.5 rounded-xl border-2 bg-background text-foreground text-sm transition-all duration-300 outline-none";
    if (state === "focused") return `${base} border-campaign-green shadow-lg shadow-campaign-green/10`;
    if (state === "error") return `${base} border-destructive shadow-lg shadow-destructive/10`;
    if (state === "valid") return `${base} border-campaign-green/40`;
    return `${base} border-border hover:border-campaign-green/30`;
  };

  return (
    <section ref={sectionRef} id="procuration" className="relative overflow-hidden">
      <div className="min-h-screen bg-primary relative flex items-center">
        {/* Ambient */}
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute top-20 right-[10%] w-96 h-96 bg-campaign-green/[0.04] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-20 left-[10%] w-80 h-80 bg-campaign-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — Sticky text */}
            <div className="lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="section-label">Agissez</span>
                <h2 className="font-heading text-5xl md:text-6xl font-extrabold text-primary-foreground mt-2 mb-6 leading-tight">
                  Rejoignez-<br />
                  <span className="text-gradient">nous</span>
                </h2>
                <p className="text-primary-foreground/50 text-lg leading-relaxed mb-10">
                  Vous souhaitez soutenir notre projet pour Bouc-Bel-Air ? Remplissez ce formulaire et nous vous recontacterons rapidement.
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="rounded-2xl p-7 border border-primary-foreground/10 bg-primary-foreground/[0.04] hover:border-campaign-green/20 transition-all duration-500"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl gradient-green flex items-center justify-center shadow-lg shadow-campaign-green/25">
                      <FileText className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-heading font-bold text-primary-foreground text-lg">Procuration</h3>
                  </div>
                  <p className="text-primary-foreground/40 text-sm leading-relaxed mb-5">
                    Vous ne pouvez pas vous déplacer le jour du vote ? Donnez procuration à un électeur de votre commune.
                  </p>
                  <motion.a
                    href="https://www.maprocuration.gouv.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 gradient-green text-primary-foreground px-6 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-campaign-green/20 hover:shadow-xl hover:shadow-campaign-green/30 transition-shadow duration-300"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    maprocuration.gouv.fr
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>

            {/* Right — Slide-in form */}
            <motion.div style={{ x: formX, opacity: formOpacity }}>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="bg-card rounded-2xl p-14 shadow-xl border border-border text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      <CheckCircle className="w-20 h-20 text-campaign-green mx-auto mb-6" />
                    </motion.div>
                    <h3 className="font-heading text-3xl font-bold text-foreground mb-3">Merci !</h3>
                    <p className="text-muted-foreground text-lg">Nous vous recontacterons très vite.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="bg-card rounded-2xl p-8 md:p-10 shadow-2xl shadow-primary/20 border border-border space-y-5"
                    role="form"
                    aria-label="Formulaire de contact campagne"
                  >
                    {/* Progress */}
                    <div className="flex gap-1.5 mb-2">
                      {Object.keys(form).map((field) => (
                        <motion.div
                          key={field}
                          className="h-1 flex-1 rounded-full"
                          animate={{
                            backgroundColor: touched.has(field) && !errors[field as keyof FormData]
                              ? "hsl(160 84% 39%)"
                              : touched.has(field) && errors[field as keyof FormData]
                              ? "hsl(0 84.2% 60.2%)"
                              : "hsl(210 20% 90%)",
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      ))}
                    </div>

                    {/* Fields with cascade animation */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      {fieldMeta.filter(f => f.half).map(({ key, label, icon: Icon, type }, idx) => (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 + idx * 0.1 }}
                        >
                          <label htmlFor={key} className="text-sm font-medium text-foreground mb-2 block">
                            {label} <span className="text-destructive">*</span>
                          </label>
                          <div className="relative">
                            <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            <input
                              id={key} type={type} required
                              aria-invalid={!!errors[key]}
                              value={form[key]}
                              onFocus={() => setFocused(key)}
                              onBlur={() => handleBlur(key)}
                              onChange={e => handleChange(key, e.target.value)}
                              className={inputClass(key)}
                            />
                          </div>
                          <AnimatePresence>
                            {touched.has(key) && errors[key] && (
                              <motion.p role="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-destructive text-xs mt-1.5 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors[key]}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>

                    {fieldMeta.filter(f => !f.half).map(({ key, label, icon: Icon, type }, idx) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                      >
                        <label htmlFor={key} className="text-sm font-medium text-foreground mb-2 block">
                          {label} <span className="text-destructive">*</span>
                        </label>
                        <div className="relative">
                          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                          <input
                            id={key} type={type} required
                            aria-invalid={!!errors[key]}
                            value={form[key]}
                            onFocus={() => setFocused(key)}
                            onBlur={() => handleBlur(key)}
                            onChange={e => handleChange(key, e.target.value)}
                            className={inputClass(key)}
                          />
                        </div>
                        <AnimatePresence>
                          {touched.has(key) && errors[key] && (
                            <motion.p role="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-destructive text-xs mt-1.5 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors[key]}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      <label htmlFor="motivations" className="text-sm font-medium text-foreground mb-2 block">
                        Vos motivations <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3.5 top-4 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <textarea
                          id="motivations" required maxLength={500} rows={4}
                          aria-invalid={!!errors.motivations}
                          value={form.motivations}
                          onFocus={() => setFocused("motivations")}
                          onBlur={() => handleBlur("motivations")}
                          onChange={e => handleChange("motivations", e.target.value)}
                          className={`${inputClass("motivations")} resize-none pt-3.5`}
                        />
                      </div>
                      <div className="flex justify-between mt-1.5">
                        <AnimatePresence>
                          {touched.has("motivations") && errors.motivations && (
                            <motion.p role="alert" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-destructive text-xs flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.motivations}
                            </motion.p>
                          )}
                        </AnimatePresence>
                        <span className="text-muted-foreground text-xs ml-auto">{form.motivations.length}/500</span>
                      </div>
                    </motion.div>

                    <motion.button
                      type="submit"
                      className="w-full gradient-green text-primary-foreground py-4 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg shadow-campaign-green/20 hover:shadow-xl hover:shadow-campaign-green/30 transition-shadow duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                    >
                      <Send className="w-4 h-4" />
                      Envoyer
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcurationSection;
