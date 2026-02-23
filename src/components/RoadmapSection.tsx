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
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-center mb-14 md:mb-16 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
    >
      {/* Dot */}
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
          m.done ? "gradient-green border-transparent shadow-md shadow-campaign-green/20" : "bg-card border-border"
        }`}>
          <m.icon className={`w-5 h-5 ${m.done ? "text-primary-foreground" : "text-muted-foreground"}`} />
        </div>
      </div>

      {/* Connector */}
      <div className={`hidden md:block absolute top-1/2 w-8 h-px ${
        isLeft ? "right-1/2 mr-6" : "left-1/2 ml-6"
      } ${m.done ? "bg-campaign-green/20" : "bg-border"}`} />

      {/* Card */}
      <div className={`ml-20 md:ml-0 md:w-[calc(50%-3.5rem)] ${isLeft ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"}`}>
        <div className={`rounded-xl p-6 border bg-card shadow-sm transition-all duration-300 ${
          m.done ? "border-campaign-green/15" : "border-border opacity-50"
        }`}>
          {m.done && <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-campaign-green rounded-full" />}
          
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-semibold uppercase tracking-wider ${m.done ? "text-campaign-green" : "text-muted-foreground"}`}>
                {m.date}
              </span>
              {m.done && (
                <div className="w-6 h-6 rounded-full gradient-green flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
              )}
            </div>
            <h3 className={`font-heading font-bold text-lg ${m.done ? "text-foreground" : "text-foreground/50"}`}>
              {m.title}
            </h3>
            <p className={`text-sm mt-1.5 leading-relaxed ${m.done ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
              {m.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const RoadmapSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.85], ["0%", "100%"]);

  return (
    <section ref={ref} id="roadmap" className="py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <p className="text-campaign-green font-semibold text-xs uppercase tracking-[0.3em] mb-4">Notre feuille de route</p>
          <h2 className="font-heading text-5xl md:text-6xl font-extrabold text-foreground leading-tight">
            Les grandes <span className="text-campaign-green">étapes</span>
          </h2>
          <div className="w-16 h-[2px] mx-auto mt-4 bg-campaign-green/40 rounded-full" />
        </motion.div>

        {/* Progress */}
        <div className="text-center mb-20">
          <span className="text-campaign-green font-heading text-3xl font-extrabold">
            {progressPercent}%
          </span>
          <p className="text-muted-foreground text-xs mt-1 uppercase tracking-[0.2em]">accompli</p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Track */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-border rounded-full" />
          <motion.div
            className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 w-[2px] origin-top rounded-full bg-campaign-green"
            style={{ height: lineHeight }}
          />

          {milestones.map((m, i) => (
            <MilestoneCard key={i} m={m} i={i} isLeft={i % 2 === 0} />
          ))}
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};

export default RoadmapSection;
