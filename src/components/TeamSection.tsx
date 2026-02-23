import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import equipeImg from "@/assets/equipe.png";

const members = [
  { name: "Manon Clément-Costa", role: "Cheffe d'entreprise", desc: "Spécialiste du développement économique et du bien-être animal.", initials: "MC" },
  { name: "Jean-Luc Berger", role: "Responsable financier", desc: "Ancien président d'une ONG mondiale, expert finances et relations internationales.", initials: "JB" },
  { name: "Valérie Castineiras", role: "Responsable RH & Pompier volontaire", desc: "Spécialiste de la prévention des risques et de l'action sociale.", initials: "VC" },
  { name: "François Deniau", role: "Directeur commercial retraité", desc: "Conseiller municipal, en charge de l'attractivité et du marketing territorial.", initials: "FD" },
];

const MemberCard = ({ m, i }: { m: typeof members[0]; i: number }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="glass-card rounded-3xl p-8 cursor-default h-full relative overflow-hidden hover:border-campaign-green/20 transition-colors duration-500"
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-campaign-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl gradient-green flex items-center justify-center mb-6 glow-green-sm group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-campaign-green/30 transition-all duration-300">
            <span className="text-primary-foreground font-heading font-bold text-base">{m.initials}</span>
          </div>
          <h3 className="font-heading font-bold text-primary-foreground text-lg">{m.name}</h3>
          <p className="text-campaign-green text-sm font-semibold mb-3">{m.role}</p>
          <p className="text-primary-foreground/40 text-sm leading-relaxed">{m.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TeamSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const imgX = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);

  return (
    <section ref={sectionRef} id="equipe" className="bg-primary relative overflow-hidden">
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute bottom-1/4 left-[5%] w-[400px] h-[400px] bg-campaign-green/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/4 right-[10%] w-[300px] h-[300px] bg-campaign-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label justify-center">Ensemble</span>
          <h2 className="font-heading text-5xl md:text-7xl font-extrabold text-primary-foreground mt-2 mb-4">
            L'<span className="text-gradient">Équipe</span>
          </h2>
          <div className="ornament-line mt-4 mb-6" />
          <p className="text-primary-foreground/40 max-w-2xl mx-auto text-lg">
            Une équipe aux expériences multiples et avérées, engagée pour Bouc-Bel-Air.
          </p>
        </motion.div>

        {/* Photo with Ken Burns */}
        <div className="mb-24 relative rounded-3xl overflow-hidden">
          <motion.div style={{ scale: imgScale, x: imgX }} className="w-full">
            <img src={equipeImg} alt="L'équipe Morateur 2026" className="w-full" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />

          <motion.div
            className="absolute bottom-0 left-0 right-0 p-8 md:p-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-primary-foreground font-heading text-3xl md:text-5xl font-extrabold drop-shadow-lg">
              Unis pour <span className="text-gradient">Bouc-Bel-Air</span>
            </p>
          </motion.div>
        </div>

        {/* Member cards — glassmorphism */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m, i) => (
            <MemberCard key={i} m={m} i={i} />
          ))}
        </div>
      </div>

      <div className="section-divider-wide" />
    </section>
  );
};

export default TeamSection;
