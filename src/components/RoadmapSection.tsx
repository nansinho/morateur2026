import { motion, useInView } from "framer-motion";
import { useRef, useCallback } from "react";
import { Flag, Users, Vote, CalendarCheck, Megaphone, PartyPopper, Check, ChevronLeft, ChevronRight } from "lucide-react";

const milestones = [
  { icon: Megaphone, date: "Janvier 2026", title: "Lancement de la campagne", desc: "Présentation officielle de la liste et du programme.", done: true },
  { icon: Users, date: "Février 2026", title: "Rencontres de terrain", desc: "Porte-à-porte, réunions publiques dans tous les quartiers.", done: true },
  { icon: Flag, date: "Mars 2026", title: "Meetings publics", desc: "Grands rassemblements thématiques sur les 3 piliers du programme.", done: false },
  { icon: CalendarCheck, date: "Mars 2026", title: "1ᵉʳ tour", desc: "Jour de vote – chaque voix compte pour l'avenir de notre commune.", done: false },
  { icon: Vote, date: "Mars 2026", title: "2ᵉ tour", desc: "Mobilisation générale pour confirmer le choix du renouveau.", done: false },
  { icon: PartyPopper, date: "Avril 2026", title: "Installation du conseil", desc: "Mise en œuvre immédiate des premières mesures du programme.", done: false },
];

const RoadmapSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 350, behavior: "smooth" });
  }, []);

  return (
    <section id="roadmap" className="py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6"
        >
          <div>
            <span className="section-label">Notre feuille de route</span>
            <h2
              className="font-accent font-extrabold uppercase leading-[0.9] tracking-tight text-primary break-words"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              LES GRANDES<br /><span className="text-campaign-lime">ÉTAPES</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll(-1)}
              className="w-12 h-12 rounded-xl border-2 border-border flex items-center justify-center hover:border-campaign-lime hover:text-campaign-lime transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-12 h-12 rounded-xl border-2 border-border flex items-center justify-center hover:border-campaign-lime hover:text-campaign-lime transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6">
          {milestones.map((m, i) => {
            const MilestoneCard = () => {
              const ref = useRef<HTMLDivElement>(null);
              const inView = useInView(ref, { once: true, margin: "-40px" });

              return (
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`flex-shrink-0 w-[300px] md:w-[320px] rounded-2xl border-2 p-8 flex flex-col relative overflow-hidden ${
                    m.done ? "bg-campaign-ice border-campaign-lime/30" : "bg-muted border-transparent opacity-70"
                  }`}
                >
                  <span className="absolute top-3 right-4 font-accent text-6xl font-extrabold text-campaign-lime/10 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${m.done ? "gradient-lime" : "bg-muted"}`}>
                    <m.icon className={`w-6 h-6 ${m.done ? "text-accent-foreground" : "text-muted-foreground"}`} />
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${m.done ? "text-campaign-lime" : "text-muted-foreground"}`}>
                      {m.date}
                    </span>
                    {m.done && (
                      <div className="w-5 h-5 rounded-full gradient-lime flex items-center justify-center">
                        <Check className="w-3 h-3 text-accent-foreground" />
                      </div>
                    )}
                  </div>

                  <h3 className={`font-accent font-extrabold text-xl mb-2 uppercase tracking-wide ${m.done ? "text-foreground" : "text-foreground/50"}`}>
                    {m.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mt-auto ${m.done ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
                    {m.desc}
                  </p>
                </motion.div>
              );
            };

            return <MilestoneCard key={i} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
