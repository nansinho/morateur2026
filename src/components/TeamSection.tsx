import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import equipeImg from "@/assets/equipe.png";
import { Briefcase, TrendingUp, Shield, Target, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const members: { name: string; role: string; desc: string; initials: string; color: string; Icon: LucideIcon }[] = [
  { name: "Manon Clément-Costa", role: "Cheffe d'entreprise", desc: "Développement économique et bien-être animal.", initials: "MC", color: "bg-campaign-green", Icon: TrendingUp },
  { name: "Jean-Luc Berger", role: "Responsable financier", desc: "Ancien président d'ONG, expert finances.", initials: "JB", color: "bg-campaign-gold", Icon: Briefcase },
  { name: "Valérie Castineiras", role: "RH & Pompier volontaire", desc: "Prévention des risques et action sociale.", initials: "VC", color: "bg-campaign-coral", Icon: Shield },
  { name: "François Deniau", role: "Dir. commercial retraité", desc: "Attractivité et marketing territorial.", initials: "FD", color: "bg-campaign-lavender", Icon: Target },
];

const TeamSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);

  return (
    <section ref={sectionRef} id="equipe" className="bg-primary relative overflow-hidden">
      <div className="container mx-auto px-6 py-28 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-campaign-green/15 border border-campaign-green/25 text-campaign-green font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full mb-6">
            <Users className="w-3.5 h-3.5" />
            Ensemble
          </span>
          <h2 className="font-heading text-5xl md:text-8xl font-extrabold text-primary-foreground mb-4 leading-tight">
            L'<span className="text-campaign-green">Équi</span><span className="text-campaign-gold">pe</span>
          </h2>
          <p className="text-primary-foreground/40 max-w-2xl mx-auto text-lg mt-4 font-medium">
            Une équipe aux expériences multiples, engagée pour Bouc-Bel-Air.
          </p>
        </motion.div>

        <div className="mb-20 relative rounded-2xl overflow-hidden shadow-2xl">
          <motion.div style={{ scale: imgScale }} className="w-full">
            <img src={equipeImg} alt="L'équipe Morateur 2026" className="w-full" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-8 md:p-10"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary-foreground font-heading text-3xl md:text-6xl font-extrabold drop-shadow-lg">
              Unis pour <span className="text-campaign-green">Bouc-</span><span className="text-campaign-gold">Bel-Air</span>
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className={`rounded-2xl p-7 ${m.color} shadow-xl cursor-pointer group`}
            >
              <div className="w-14 h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                <m.Icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-heading font-extrabold text-primary-foreground text-lg">{m.name}</h3>
              <p className="text-primary-foreground/80 text-sm font-bold mb-2">{m.role}</p>
              <p className="text-primary-foreground/60 text-sm leading-relaxed font-medium">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
