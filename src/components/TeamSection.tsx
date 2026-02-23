import { motion, useScroll, useTransform, useInView } from "framer-motion";
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <motion.div
        className="bg-card rounded-3xl p-7 border border-border card-glow cursor-default h-full relative overflow-hidden"
        style={{
          transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        {/* Top accent */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-campaign-green/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Glow background on hover */}
        <div className="absolute inset-0 bg-campaign-green/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />

        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl gradient-green flex items-center justify-center mb-5 glow-green-sm group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-campaign-green/25 transition-all duration-300">
            <span className="text-primary-foreground font-heading font-bold text-base">{m.initials}</span>
          </div>
          <h3 className="font-heading font-bold text-foreground text-lg">{m.name}</h3>
          <p className="text-campaign-green text-sm font-medium mb-3">{m.role}</p>
          <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TeamSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Ken Burns: slow zoom + horizontal pan
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const imgX = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
  const imgBrightness = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <section ref={sectionRef} id="equipe" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      {/* Ambient */}
      <div className="absolute bottom-1/4 left-[5%] w-[400px] h-[400px] bg-campaign-green/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="section-label justify-center">Ensemble</span>
          <h2 className="font-heading text-5xl md:text-6xl font-extrabold text-foreground mt-2 mb-4">
            L'<span className="text-gradient">Équipe</span>
          </h2>
          <div className="ornament-line mt-4 mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Une équipe aux expériences multiples et avérées, engagée pour Bouc-Bel-Air.
          </p>
        </motion.div>

        {/* Team photo with Ken Burns */}
        <div className="mb-24 relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
          <motion.div
            style={{ scale: imgScale, x: imgX }}
            className="w-full"
          >
            <motion.img
              src={equipeImg}
              alt="L'équipe Morateur 2026"
              className="w-full"
              style={{ filter: `brightness(${imgBrightness})` } as any}
            />
          </motion.div>
          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          {/* Light leak effect */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-campaign-green/[0.06] to-transparent pointer-events-none" />

          {/* Text overlay */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-8 md:p-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-foreground font-heading text-3xl md:text-4xl font-extrabold">
              Unis pour <span className="text-gradient">Bouc-Bel-Air</span>
            </p>
          </motion.div>
        </div>

        {/* Member cards with 3D tilt */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((m, i) => (
            <MemberCard key={i} m={m} i={i} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
};

export default TeamSection;
