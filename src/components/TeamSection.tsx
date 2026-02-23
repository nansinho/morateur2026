import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import equipeImg from "@/assets/equipe.png";

const members = [
  { name: "Manon Clément-Costa", role: "Cheffe d'entreprise", desc: "Développement économique et bien-être animal.", initials: "MC", color: "bg-campaign-green", emoji: "🌱" },
  { name: "Jean-Luc Berger", role: "Responsable financier", desc: "Ancien président d'ONG, expert finances.", initials: "JB", color: "bg-campaign-gold", emoji: "💰" },
  { name: "Valérie Castineiras", role: "RH & Pompier volontaire", desc: "Prévention des risques et action sociale.", initials: "VC", color: "bg-campaign-coral", emoji: "🚒" },
  { name: "François Deniau", role: "Dir. commercial retraité", desc: "Attractivité et marketing territorial.", initials: "FD", color: "bg-campaign-lavender", emoji: "🎯" },
];

const TeamSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);

  return (
    <section ref={sectionRef} id="equipe" className="bg-primary relative overflow-hidden">
      <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-campaign-green/5 blur-3xl" />

      <div className="container mx-auto px-6 py-28 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <motion.span
            className="inline-block text-5xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            🤝
          </motion.span>
          <h2 className="font-heading text-5xl md:text-8xl font-extrabold text-primary-foreground mb-4 leading-tight">
            L'<span className="text-campaign-green">Équi</span><span className="text-campaign-gold">pe</span>
          </h2>
          <p className="text-primary-foreground/45 max-w-2xl mx-auto text-lg mt-4 font-medium">
            Une équipe aux expériences multiples, engagée pour Bouc-Bel-Air 💚
          </p>
        </motion.div>

        {/* Photo */}
        <div className="mb-20 relative rounded-3xl overflow-hidden shadow-2xl">
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
              Unis pour <span className="text-campaign-green">Bouc-</span><span className="text-campaign-gold">Bel-Air</span> ✨
            </p>
          </motion.div>
        </div>

        {/* Member cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.6, type: "spring" }}
              whileHover={{ y: -10, rotate: 0, scale: 1.04 }}
              className={`rounded-3xl p-7 ${m.color} shadow-xl cursor-pointer`}
            >
              <span className="text-4xl mb-4 block">{m.emoji}</span>
              <h3 className="font-heading font-extrabold text-primary-foreground text-lg">{m.name}</h3>
              <p className="text-primary-foreground/80 text-sm font-bold mb-2">{m.role}</p>
              <p className="text-primary-foreground/60 text-sm leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
