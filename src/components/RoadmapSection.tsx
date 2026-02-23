import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Flag, Users, Vote, CalendarCheck, Megaphone, PartyPopper, Check, TrendingUp } from "lucide-react";

const milestones = [
  { icon: Megaphone, date: "Janvier 2026", title: "Lancement de la campagne", desc: "Présentation officielle de la liste et du programme.", done: true, color: "bg-campaign-green" },
  { icon: Users, date: "Février 2026", title: "Rencontres de terrain", desc: "Porte-à-porte, réunions publiques dans tous les quartiers.", done: true, color: "bg-campaign-gold" },
  { icon: Flag, date: "Mars 2026", title: "Meetings publics", desc: "Grands rassemblements thématiques sur les 3 piliers du programme.", done: false, color: "bg-campaign-coral" },
  { icon: CalendarCheck, date: "Mars 2026", title: "1ᵉʳ tour", desc: "Jour de vote – chaque voix compte pour l'avenir de notre commune.", done: false, color: "bg-campaign-green" },
  { icon: Vote, date: "Mars 2026", title: "2ᵉ tour", desc: "Mobilisation générale pour confirmer le choix du renouveau.", done: false, color: "bg-campaign-gold" },
  { icon: PartyPopper, date: "Avril 2026", title: "Installation du conseil", desc: "Mise en œuvre immédiate des premières mesures du programme.", done: false, color: "bg-campaign-green" },
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
      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-center mb-14 md:mb-16 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
    >
      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
        <motion.div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
            m.done ? `${m.color} border-transparent shadow-lg` : "bg-card border-border"
          }`}
          whileHover={{ scale: 1.1 }}
        >
          <m.icon className={`w-6 h-6 ${m.done ? "text-primary-foreground" : "text-muted-foreground"}`} />
        </motion.div>
      </div>

      <div className={`ml-20 md:ml-0 md:w-[calc(50%-3.5rem)] ${isLeft ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"}`}>
        <motion.div
          className={`rounded-2xl p-6 border bg-card shadow-sm transition-all duration-300 ${
            m.done ? "border-campaign-green/20" : "border-border opacity-60"
          }`}
          whileHover={m.done ? { y: -4 } : {}}
        >
          {m.done && <div className={`absolute top-0 bottom-0 left-0 w-1 ${m.color} rounded-full`} />}
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${m.done ? "text-campaign-green" : "text-muted-foreground"}`}>
                {m.date}
              </span>
              {m.done && (
                <div className="w-6 h-6 rounded-full bg-campaign-green flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-primary-foreground" />
                </div>
              )}
            </div>
            <h3 className={`font-heading font-extrabold text-lg ${m.done ? "text-foreground" : "text-foreground/50"}`}>
              {m.title}
            </h3>
            <p className={`text-sm mt-1.5 leading-relaxed font-medium ${m.done ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
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
    <section ref={ref} id="roadmap" className="py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="inline-flex items-center gap-2 bg-campaign-gold/15 border border-campaign-gold/25 text-campaign-gold font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full mb-6">
            <TrendingUp className="w-3.5 h-3.5" />
            Notre feuille de route
          </span>
          <h2 className="font-heading text-5xl md:text-7xl font-extrabold text-foreground leading-tight">
            Les grandes <span className="text-campaign-green">éta</span><span className="text-campaign-gold">pes</span>
          </h2>
        </motion.div>

        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="text-campaign-green font-heading text-5xl font-extrabold">{progressPercent}%</span>
          <p className="text-muted-foreground text-xs mt-1 uppercase tracking-[0.2em] font-bold">accompli</p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[3px] bg-border/50 rounded-full" />
          <motion.div
            className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-campaign-green via-campaign-gold to-campaign-green"
            style={{ height: lineHeight }}
          />
          {milestones.map((m, i) => (
            <MilestoneCard key={i} m={m} i={i} isLeft={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
