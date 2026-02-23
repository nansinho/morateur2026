import { motion } from "framer-motion";
import { Briefcase, TrendingUp, Shield, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const members: { name: string; role: string; desc: string; Icon: LucideIcon }[] = [
  { name: "Manon Clément-Costa", role: "Cheffe d'entreprise", desc: "Développement économique et bien-être animal.", Icon: TrendingUp },
  { name: "Jean-Luc Berger", role: "Responsable financier", desc: "Ancien président d'ONG, expert finances.", Icon: Briefcase },
  { name: "Valérie Castineiras", role: "RH & Pompier volontaire", desc: "Prévention des risques et action sociale.", Icon: Shield },
  { name: "François Deniau", role: "Dir. commercial retraité", desc: "Attractivité et marketing territorial.", Icon: Target },
];

const TeamSection = () => {
  return (
    <section id="equipe" className="gradient-premium relative overflow-hidden">
      <div className="container mx-auto px-6 py-28 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-campaign-green font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">Ensemble</p>
          <h2 className="font-heading font-extrabold text-5xl md:text-7xl text-primary-foreground leading-[0.9] tracking-tight">
            L'<span className="text-gradient">Équipe</span>
          </h2>
          <p className="text-primary-foreground/40 max-w-xl text-lg mt-6 font-medium">
            Une équipe aux expériences multiples, engagée pour Bouc-Bel-Air.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {members.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -3 }}
              className="rounded-2xl bg-primary-foreground/[0.05] border border-primary-foreground/[0.08] p-7 flex items-start gap-5 group hover:border-campaign-green/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-campaign-green/15 flex items-center justify-center flex-shrink-0">
                <m.Icon className="w-5 h-5 text-campaign-green" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-extrabold text-primary-foreground text-lg truncate">{m.name}</h3>
                <p className="text-campaign-gold text-sm font-bold mb-2">{m.role}</p>
                <p className="text-primary-foreground/50 text-sm leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
