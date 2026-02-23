import { motion } from "framer-motion";
import { useState } from "react";
import { FileText, CheckCircle } from "lucide-react";

const ProcurationSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ prenom: "", nom: "", email: "", tel: "", motivations: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="procuration" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-campaign-green font-semibold text-sm uppercase tracking-[0.2em]">
              Agissez
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Rejoignez-nous
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Vous souhaitez soutenir notre projet pour Bouc-Bel-Air ? Remplissez ce formulaire et nous vous recontacterons rapidement.
            </p>

            <div className="bg-muted/50 rounded-sm p-6 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-campaign-green" />
                <h3 className="font-heading font-bold text-foreground">Procuration</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Vous ne pouvez pas vous déplacer le jour du vote ? Donnez procuration à un électeur de votre commune. La démarche est simple et peut se faire en ligne sur :
              </p>
              <a
                href="https://www.maprocuration.gouv.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-sm text-sm font-semibold hover:brightness-110 transition"
              >
                maprocuration.gouv.fr
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {submitted ? (
              <div className="bg-card rounded-sm p-12 shadow-lg border border-border text-center">
                <CheckCircle className="w-16 h-16 text-campaign-green mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-foreground mb-2">Merci !</h3>
                <p className="text-muted-foreground">Nous vous recontacterons très vite.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card rounded-sm p-8 shadow-lg border border-border space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Prénom *</label>
                    <input
                      required
                      value={form.prenom}
                      onChange={e => setForm({ ...form, prenom: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-campaign-green/40"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Nom *</label>
                    <input
                      required
                      value={form.nom}
                      onChange={e => setForm({ ...form, nom: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-campaign-green/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Adresse email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-campaign-green/40"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Téléphone *</label>
                  <input
                    type="tel"
                    required
                    value={form.tel}
                    onChange={e => setForm({ ...form, tel: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-campaign-green/40"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Vos motivations *</label>
                  <textarea
                    required
                    maxLength={500}
                    rows={4}
                    value={form.motivations}
                    onChange={e => setForm({ ...form, motivations: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-sm border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-campaign-green/40 resize-none"
                  />
                  <p className="text-muted-foreground text-xs mt-1">{form.motivations.length}/500 caractères</p>
                </div>
                <button
                  type="submit"
                  className="w-full bg-campaign-green text-primary-foreground py-3 rounded-sm font-semibold uppercase tracking-wider text-sm hover:brightness-110 transition"
                >
                  Envoyer
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcurationSection;
