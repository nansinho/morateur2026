import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Flag, Users, Vote, CalendarCheck, Megaphone, PartyPopper, Check } from "lucide-react";

const milestones = [
  { icon: Megaphone, date: "Janvier 2026", title: "Lancement de la campagne", desc: "Présentation officielle de la liste et du programme.", done: true },
  { icon: Users, date: "Février 2026", title: "Rencontres de terrain", desc: "Porte-à-porte, réunions publiques dans tous les quartiers.", done: true },
  { icon: Flag, date: "Mars 2026", title: "Meetings publics", desc: "Grands rassemblements thématiques sur les 3 piliers du programme.", done: false },
  { icon: CalendarCheck, date: "Mars 2026", title: "1ᵉʳ tour", desc: "Jour de vote – chaque voix compte pour l'avenir de notre commune.", done: false },
  { icon: Vote, date: "Mars 2026", title: "2ᵉ tour", desc: "Mobilisation générale pour confirmer le choix du renouveau.", done: false },
  { icon: PartyPopper, date: "Avril 2026", title: "Installation du conseil", desc: "Mise en œuvre immédiate des premières mesures du programme.", done: false },
];

const doneCount = milestones.filter(m => m.done).length;
const progressPercent = Math.round((doneCount / milestones.length) * 100);

const MilestoneCard = ({ m, i, isLeft }: { m: typeof milestones[0]; i: number; isLeft: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-center mb-16 md:mb-20 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
    >
      {/* Dot — pulses when becoming active */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${
            m.done
              ? "gradient-green border-transparent glow-green"
              : "bg-primary/80 border-primary-foreground/10"
          }`}
          animate={inView && !m.done ? {
            borderColor: ["hsl(0 0% 100% / 0.1)", "hsl(160 84% 39% / 0.4)", "hsl(0 0% 100% / 0.1)"],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <m.icon className={`w-6 h-6 ${m.done ? "text-primary-foreground" : "text-primary-foreground/40"}`} />
        </motion.div>
      </div>

      {/* Connector */}
      <div className={`hidden md:block absolute top-1/2 w-10 h-px ${
        isLeft ? "right-1/2 mr-7" : "left-1/2 ml-7"
      } ${m.done ? "bg-campaign-green/30" : "bg-primary-foreground/[0.06]"}`} />

      {/* Card */}
      <div className={`ml-20 md:ml-0 md:w-[calc(50%-4rem)] ${isLeft ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"}`}>
        <motion.div
          className={`rounded-2xl p-7 cursor-default border overflow-hidden relative transition-all duration-500 ${
            m.done
              ? "glass-card !border-campaign-green/25 glow-green-sm"
              : "bg-primary-foreground/[0.03] border-primary-foreground/[0.06]"
          }`}
          style={!m.done && inView ? { opacity: 0.6 } : !m.done ? { opacity: 0.3 } : {}}
          whileHover={{ y: -6, scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          {m.done && (
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-campaign-green/50 to-transparent" />
          )}

          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold uppercase tracking-wider ${m.done ? "text-campaign-green" : "text-muted-foreground"}`}>
              {m.date}
            </span>
            {m.done && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{ type: "spring", delay: 0.3 }}
                className="w-7 h-7 rounded-full gradient-green flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-primary-foreground" />
              </motion.div>
            )}
          </div>
          <h3 className="font-heading font-bold text-primary-foreground text-lg mt-1">{m.title}</h3>
          <p className="text-primary-foreground/40 text-sm mt-2 leading-relaxed">{m.desc}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const RoadmapSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.9], ["0%", "100%"]);

  return (
    <section ref={ref} id="roadmap" className="py-32 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 noise-overlay" />

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-[20%] w-[500px] h-[500px] bg-campaign-green/[0.04] rounded-full blur-[180px]" />
      <div className="absolute bottom-1/4 right-[20%] w-[400px] h-[400px] bg-campaign-gold/[0.03] rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="section-label justify-center">Notre feuille de route</span>
          <h2 className="font-heading text-5xl md:text-6xl font-extrabold text-primary-foreground leading-tight mt-2">
            Les grandes <span className="text-gradient">étapes</span>
          </h2>
          <div className="ornament-line mt-4" />
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-campaign-green font-heading text-3xl font-extrabold">{progressPercent}%</span>
          <p className="text-primary-foreground/30 text-sm mt-1">accompli</p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Track line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[3px] bg-primary-foreground/[0.06] rounded-full" />
          <motion.div
            className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 w-[3px] origin-top rounded-full"
            style={{
              height: lineHeight,
              background: "linear-gradient(to bottom, hsl(160 84% 39%), hsl(160 80% 60%))",
              boxShadow: "0 0 20px hsl(160 84% 39% / 0.4)",
            }}
          />

          {milestones.map((m, i) => (
            <MilestoneCard key={i} m={m} i={i} isLeft={i % 2 === 0} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider-wide" />
    </section>
  );
};

export default RoadmapSection;
