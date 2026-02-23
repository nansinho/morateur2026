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
    <section id="equipe" className="gradient-teal-deep relative overflow-hidden">
      <div className="container mx-auto px-6 py-28 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="section-label">Ensemble</span>
          <h2
            className="font-accent font-extrabold text-primary-foreground leading-[0.9] uppercase tracking-tight break-words"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            L'<span className="text-campaign-lime">ÉQUIPE</span>
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
              className="rounded-2xl bg-background/95 backdrop-blur-sm border-2 border-transparent p-7 flex items-start gap-5 group hover:border-campaign-lime/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl gradient-lime flex items-center justify-center flex-shrink-0">
                <m.Icon className="w-5 h-5 text-accent-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-accent font-extrabold text-primary text-lg truncate uppercase tracking-wide">{m.name}</h3>
                <p className="text-campaign-lime text-sm font-bold mb-2">{m.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
