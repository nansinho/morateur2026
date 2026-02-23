import { motion } from "framer-motion";
import { useState } from "react";
import { FileText, CheckCircle, Send, ExternalLink } from "lucide-react";

const ProcurationSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ prenom: "", nom: "", email: "", tel: "", motivations: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border-2 bg-background text-foreground text-sm transition-all duration-300 outline-none ${
      focused === field
        ? "border-campaign-green shadow-lg shadow-campaign-green/10"
        : "border-border hover:border-campaign-green/30"
    }`;

  return (
    <section id="procuration" className="py-32 bg-background relative overflow-hidden">
      {/* Bg decorations */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-campaign-green/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-campaign-gold/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-campaign-green font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              <span className="w-8 h-[2px] gradient-green inline-block" />
              Agissez
            </span>
            <h2 className="font-heading text-5xl md:text-6xl font-black text-foreground mt-2 mb-6 leading-tight">
              Rejoignez-<br />
              <span className="text-gradient">nous</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Vous souhaitez soutenir notre projet pour Bouc-Bel-Air ? Remplissez ce formulaire et nous vous recontacterons rapidement.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl p-7 border border-border shadow-sm hover-lift"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-green flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-lg">Procuration</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                Vous ne pouvez pas vous déplacer le jour du vote ? Donnez procuration à un électeur de votre commune.
              </p>
              <motion.a
                href="https://www.maprocuration.gouv.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 gradient-navy text-primary-foreground px-6 py-3 rounded-xl text-sm font-semibold hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                maprocuration.gouv.fr
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
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
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 md:p-10 shadow-xl border border-border space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Prénom *</label>
                    <input
                      required
                      value={form.prenom}
                      onFocus={() => setFocused("prenom")}
                      onBlur={() => setFocused(null)}
                      onChange={e => setForm({ ...form, prenom: e.target.value })}
                      className={inputClass("prenom")}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Nom *</label>
                    <input
                      required
                      value={form.nom}
                      onFocus={() => setFocused("nom")}
                      onBlur={() => setFocused(null)}
                      onChange={e => setForm({ ...form, nom: e.target.value })}
                      className={inputClass("nom")}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Adresse email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className={inputClass("email")}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Téléphone *</label>
                  <input
                    type="tel"
                    required
                    value={form.tel}
                    onFocus={() => setFocused("tel")}
                    onBlur={() => setFocused(null)}
                    onChange={e => setForm({ ...form, tel: e.target.value })}
                    className={inputClass("tel")}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Vos motivations *</label>
                  <textarea
                    required
                    maxLength={500}
                    rows={4}
                    value={form.motivations}
                    onFocus={() => setFocused("motivations")}
                    onBlur={() => setFocused(null)}
                    onChange={e => setForm({ ...form, motivations: e.target.value })}
                    className={`${inputClass("motivations")} resize-none`}
                  />
                  <div className="flex justify-between mt-1.5">
                    <span className="text-muted-foreground text-xs">{form.motivations.length}/500</span>
                  </div>
                </div>
                <motion.button
                  type="submit"
                  className="w-full gradient-green text-primary-foreground py-4 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-campaign-green/25 transition-shadow duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-4 h-4" />
                  Envoyer
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcurationSection;
