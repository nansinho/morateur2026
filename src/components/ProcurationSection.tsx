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

  const inputClass = (field: string) => {
    const isFocused = focused === field;
    const hasError = touched.has(field) && errors[field as keyof FormData];
    const isValid = touched.has(field) && !errors[field as keyof FormData];
    const base = "w-full pl-11 pr-4 py-3.5 rounded-xl border bg-card text-foreground text-sm transition-all duration-300 outline-none placeholder:text-muted-foreground/50";
    if (isFocused) return `${base} border-campaign-green ring-1 ring-campaign-green/20`;
    if (hasError) return `${base} border-destructive`;
    if (isValid) return `${base} border-campaign-green/30`;
    return `${base} border-border hover:border-muted-foreground/30`;
  };

  return (
    <section id="procuration" className="bg-campaign-warm relative overflow-hidden">
      <div className="container mx-auto px-6 py-28 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-campaign-green font-semibold text-xs uppercase tracking-[0.3em] mb-4">Agissez</p>
              <h2 className="font-heading text-5xl md:text-6xl font-extrabold text-foreground mb-5 leading-tight">
                Rejoignez-<br />
                <span className="text-campaign-green">nous</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                Vous souhaitez soutenir notre projet pour Bouc-Bel-Air ? Remplissez ce formulaire et nous vous recontacterons rapidement.
              </p>

              {/* Procuration card */}
              <div className="rounded-xl p-6 bg-card border border-border shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg gradient-green flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground">Procuration</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Vous ne pouvez pas vous déplacer le jour du vote ? Donnez procuration à un électeur de votre commune.
                </p>
                <a
                  href="https://www.maprocuration.gouv.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 gradient-green text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md shadow-campaign-green/15 hover:shadow-lg transition-shadow"
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
                  className="bg-card rounded-xl p-12 text-center border border-border shadow-sm"
                >
                  <CheckCircle className="w-16 h-16 text-campaign-green mx-auto mb-5" />
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Merci !</h3>
                  <p className="text-muted-foreground">Nous vous recontacterons très vite.</p>
                </motion.div>
              ) : (
                <form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="bg-card rounded-xl p-8 space-y-5 border border-border shadow-sm"
                  role="form"
                  aria-label="Formulaire de contact campagne"
                >
                  {/* Progress */}
                  <div className="flex gap-1.5 mb-2">
                    {Object.keys(form).map((field) => (
                      <div
                        key={field}
                        className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                          touched.has(field) && !errors[field as keyof FormData]
                            ? "bg-campaign-green"
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
                        <label htmlFor={key} className="text-sm font-medium text-foreground/80 mb-2 block">{label} <span className="text-campaign-green">*</span></label>
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
                      <label htmlFor={key} className="text-sm font-medium text-foreground/80 mb-2 block">{label} <span className="text-campaign-green">*</span></label>
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
                    <label htmlFor="motivations" className="text-sm font-medium text-foreground/80 mb-2 block">Vos motivations <span className="text-campaign-green">*</span></label>
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

                  <button
                    type="submit"
                    className="w-full gradient-green text-primary-foreground py-4 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-lg shadow-campaign-green/20 hover:shadow-xl hover:shadow-campaign-green/25 transition-shadow"
                  >
                    <Send className="w-4 h-4" />
                    Envoyer
                  </button>
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
