import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import equipeImg from "@/assets/equipe.png";

const members = [
  {
    name: "Manon Clément-Costa",
    role: "Cheffe d'entreprise",
    desc: "Spécialiste du développement économique et du bien-être animal.",
    initials: "MC",
  },
  {
    name: "Jean-Luc Berger",
    role: "Responsable financier",
    desc: "Ancien président d'une ONG mondiale, expert finances et relations internationales.",
    initials: "JB",
  },
  {
    name: "Valérie Castineiras",
    role: "Responsable RH & Pompier volontaire",
    desc: "Spécialiste de la prévention des risques et de l'action sociale.",
    initials: "VC",
  },
  {
    name: "François Deniau",
    role: "Directeur commercial retraité",
    desc: "Conseiller municipal, en charge de l'attractivité et du marketing territorial.",
    initials: "FD",
  },
];

const TeamSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 0.4], [0.9, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={sectionRef} id="equipe" className="py-32 bg-campaign-warm relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-campaign-green font-semibold text-xs uppercase tracking-[0.3em] mb-4">
            <span className="w-10 h-[2px] gradient-green inline-block" />
            Ensemble
            <span className="w-10 h-[2px] gradient-green inline-block" />
          </span>
          <h2 className="font-heading text-5xl md:text-6xl font-extrabold text-foreground mt-2 mb-4">
            L'Équipe
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Une équipe aux expériences multiples et avérées, engagée pour Bouc-Bel-Air.
          </p>
        </motion.div>

        {/* Team photo with parallax */}
        <motion.div
          ref={imgRef}
          style={{ scale: imgScale, y: imgY }}
          className="mb-20 relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10"
        >
          <img
            src={equipeImg}
            alt="L'équipe Morateur 2026"
            className="w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
        </motion.div>

        {/* Team members */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-card rounded-3xl p-7 border border-border hover:shadow-xl hover:shadow-campaign-green/5 transition-all duration-500 cursor-default group"
            >
              <div className="w-14 h-14 rounded-2xl gradient-green flex items-center justify-center mb-5 shadow-lg shadow-campaign-green/20 group-hover:scale-110 transition-transform duration-300">
                <span className="text-primary-foreground font-heading font-bold text-sm">
                  {m.initials}
                </span>
              </div>
              <h3 className="font-heading font-bold text-foreground text-lg">{m.name}</h3>
              <p className="text-campaign-green text-sm font-medium mb-3">{m.role}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
