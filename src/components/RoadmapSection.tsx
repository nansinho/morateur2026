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
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-center mb-16 md:mb-20 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
    >
      {/* Dot */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${
            m.done ? "gradient-green border-transparent glow-green" : "bg-card border-border"
          }`}
          animate={inView && !m.done ? {
            borderColor: ["hsl(var(--border))", "hsl(160 84% 39% / 0.3)", "hsl(var(--border))"],
            scale: [1, 1.08, 1],
          } : inView && m.done ? { scale: [0.8, 1.15, 1] } : {}}
          transition={{ duration: 2.5, repeat: m.done ? 0 : Infinity }}
        >
          <m.icon className={`w-6 h-6 ${m.done ? "text-primary-foreground" : "text-muted-foreground"}`} />
        </motion.div>
      </div>

      {/* Connector */}
      <div className={`hidden md:block absolute top-1/2 w-10 h-px ${
        isLeft ? "right-1/2 mr-7" : "left-1/2 ml-7"
      } ${m.done ? "bg-gradient-to-r from-campaign-green/40 to-campaign-green/10" : "bg-border"}`} />

      {/* Card */}
      <div className={`ml-20 md:ml-0 md:w-[calc(50%-4rem)] ${isLeft ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"}`}>
        <motion.div
          className={`rounded-2xl p-7 border overflow-hidden relative transition-all duration-700 bg-card shadow-sm ${
            m.done
              ? "border-campaign-green/20 shadow-campaign-green/5"
              : "border-border"
          } ${!m.done ? "opacity-60" : ""}`}
          whileHover={{ y: -6, scale: 1.02 }}
        >
          {m.done && (
            <div className="absolute top-0 bottom-0 left-0 w-1 gradient-green rounded-full" />
          )}

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${m.done ? "text-campaign-green" : "text-muted-foreground"}`}>
                {m.date}
              </span>
              {m.done && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={inView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ type: "spring", delay: 0.3 }}
                  className="w-7 h-7 rounded-full gradient-green flex items-center justify-center shadow-lg shadow-campaign-green/30"
                >
                  <Check className="w-4 h-4 text-primary-foreground" />
                </motion.div>
              )}
            </div>
            <h3 className={`font-heading font-bold text-lg mt-1 ${m.done ? "text-foreground" : "text-foreground/60"}`}>
              {m.title}
            </h3>
            <p className={`text-sm mt-2 leading-relaxed ${m.done ? "text-muted-foreground" : "text-muted-foreground/60"}`}>
              {m.desc}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const RoadmapSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.85], ["0%", "100%"]);

  return (
    <section ref={ref} id="roadmap" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/4 left-[20%] w-[500px] h-[500px] bg-campaign-green/[0.04] rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[20%] w-[400px] h-[400px] bg-campaign-gold/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="section-label justify-center">Notre feuille de route</span>
          <h2 className="font-heading text-5xl md:text-7xl font-extrabold text-foreground leading-tight mt-2">
            Les grandes <span className="text-gradient">étapes</span>
          </h2>
          <div className="ornament-line mt-4" />
        </motion.div>

        {/* Progress */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <span className="text-campaign-green font-heading text-4xl font-extrabold">
            {progressPercent}%
          </span>
          <p className="text-muted-foreground text-xs mt-2 uppercase tracking-[0.2em]">accompli</p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Track */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[3px] bg-border rounded-full" />
          <motion.div
            className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 w-[3px] origin-top rounded-full"
            style={{
              height: lineHeight,
              background: "linear-gradient(to bottom, hsl(160 84% 39%), hsl(160 80% 60%))",
              boxShadow: "0 0 25px hsl(160 84% 39% / 0.4), 0 0 50px hsl(160 84% 39% / 0.15)",
            }}
          />

          {milestones.map((m, i) => (
            <MilestoneCard key={i} m={m} i={i} isLeft={i % 2 === 0} />
          ))}
        </div>
      </div>

      <div className="section-divider-green" />
    </section>
  );
};

export default RoadmapSection;
