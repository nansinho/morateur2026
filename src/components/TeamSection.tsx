import { motion } from "framer-motion";
import { Briefcase, TrendingUp, Shield, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const members: { name: string; role: string; desc: string; initials: string; Icon: LucideIcon }[] = [
  { name: "Manon Clément-Costa", role: "Cheffe d'entreprise", desc: "Développement économique et bien-être animal.", initials: "MC", Icon: TrendingUp },
  { name: "Jean-Luc Berger", role: "Responsable financier", desc: "Ancien président d'ONG, expert finances.", initials: "JB", Icon: Briefcase },
  { name: "Valérie Castineiras", role: "RH & Pompier volontaire", desc: "Prévention des risques et action sociale.", initials: "VC", Icon: Shield },
  { name: "François Deniau", role: "Dir. commercial retraité", desc: "Attractivité et marketing territorial.", initials: "FD", Icon: Target },
];

const TeamSection = () => {
  return (
    <section id="equipe" className="bg-primary relative overflow-hidden">
      <div className="container mx-auto px-6 py-28 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="text-campaign-green font-heading font-bold text-xs uppercase tracking-[0.3em] mb-4">Ensemble</p>
          <h2 className="font-editorial italic text-5xl md:text-8xl text-primary-foreground leading-[0.9]">
            L'<span className="text-campaign-green">Équi</span><span className="text-campaign-gold">pe</span>
          </h2>
          <p className="text-primary-foreground/40 max-w-xl text-lg mt-6 font-medium">
            Une équipe aux expériences multiples, engagée pour Bouc-Bel-Air.
          </p>
        </motion.div>

        {/* Editorial blocks — serif initial + info */}
        <div className="grid md:grid-cols-2 gap-6">
          {members.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4 }}
              className="rounded-3xl bg-card/10 backdrop-blur-sm border border-primary-foreground/[0.08] p-8 flex gap-6 group"
            >
              {/* Large serif initial */}
              <div className="flex-shrink-0">
                <span className="font-editorial italic text-6xl md:text-7xl font-bold text-campaign-gold/30 leading-none">
                  {m.initials.charAt(0)}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-campaign-green/15 flex items-center justify-center">
                    <m.Icon className="w-4 h-4 text-campaign-green" />
                  </div>
                  <h3 className="font-heading font-extrabold text-primary-foreground text-lg truncate">{m.name}</h3>
                </div>
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