import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import equipeImg from "@/assets/equipe.png";

const members = [
  { name: "Manon Clément-Costa", role: "Cheffe d'entreprise", desc: "Spécialiste du développement économique et du bien-être animal.", initials: "MC", color: "bg-campaign-green" },
  { name: "Jean-Luc Berger", role: "Responsable financier", desc: "Ancien président d'une ONG mondiale, expert finances et relations internationales.", initials: "JB", color: "bg-campaign-gold" },
  { name: "Valérie Castineiras", role: "Responsable RH & Pompier volontaire", desc: "Spécialiste de la prévention des risques et de l'action sociale.", initials: "VC", color: "bg-campaign-sky" },
  { name: "François Deniau", role: "Directeur commercial retraité", desc: "Conseiller municipal, en charge de l'attractivité et du marketing territorial.", initials: "FD", color: "bg-campaign-green" },
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
          <p className="text-campaign-green font-bold text-xs uppercase tracking-[0.3em] mb-4">Ensemble</p>
          <h2 className="font-heading text-5xl md:text-7xl font-extrabold text-primary-foreground mb-4 leading-tight">
            L'<span className="text-campaign-green">Équi</span><span className="text-campaign-gold">pe</span>
          </h2>
          <p className="text-primary-foreground/40 max-w-2xl mx-auto text-lg mt-6">
            Une équipe aux expériences multiples et avérées, engagée pour Bouc-Bel-Air.
          </p>
        </motion.div>

        {/* Photo with Ken Burns */}
        <div className="mb-20 relative rounded-2xl overflow-hidden">
          <motion.div style={{ scale: imgScale }} className="w-full">
            <img src={equipeImg} alt="L'équipe Morateur 2026" className="w-full" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-8 md:p-10"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-primary-foreground font-heading text-3xl md:text-5xl font-extrabold drop-shadow-md">
              Unis pour <span className="text-campaign-green">Bouc-</span><span className="text-campaign-gold">Bel-Air</span>
            </p>
          </motion.div>
        </div>

        {/* Member cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {members.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="rounded-2xl p-7 border border-primary-foreground/[0.06] bg-primary-foreground/[0.04] hover:bg-primary-foreground/[0.08] transition-colors duration-300 cursor-pointer group"
            >
              <motion.div
                className={`w-16 h-16 rounded-2xl ${m.color} flex items-center justify-center mb-5`}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <span className="text-primary-foreground font-heading font-bold text-lg">{m.initials}</span>
              </motion.div>
              <h3 className="font-heading font-bold text-primary-foreground text-lg">{m.name}</h3>
              <p className="text-campaign-green text-sm font-semibold mb-2">{m.role}</p>
              <p className="text-primary-foreground/40 text-sm leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
