import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Flag, Users, Vote, CalendarCheck, Megaphone, PartyPopper } from "lucide-react";

const milestones = [
  {
    icon: Megaphone,
    date: "Janvier 2026",
    title: "Lancement de la campagne",
    desc: "Présentation officielle de la liste et du programme.",
    done: true,
  },
  {
    icon: Users,
    date: "Février 2026",
    title: "Rencontres de terrain",
    desc: "Porte-à-porte, réunions publiques dans tous les quartiers.",
    done: true,
  },
  {
    icon: Flag,
    date: "Mars 2026",
    title: "Meetings publics",
    desc: "Grands rassemblements thématiques sur les 3 piliers du programme.",
    done: false,
  },
  {
    icon: CalendarCheck,
    date: "Mars 2026",
    title: "1ᵉʳ tour",
    desc: "Jour de vote – chaque voix compte pour l'avenir de notre commune.",
    done: false,
  },
  {
    icon: Vote,
    date: "Mars 2026",
    title: "2ᵉ tour",
    desc: "Mobilisation générale pour confirmer le choix du renouveau.",
    done: false,
  },
  {
    icon: PartyPopper,
    date: "Avril 2026",
    title: "Installation du conseil",
    desc: "Mise en œuvre immédiate des premières mesures du programme.",
    done: false,
  },
];

const RoadmapSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={ref} id="roadmap" className="py-32 bg-primary relative overflow-hidden">
      {/* Bg glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-campaign-green/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 text-campaign-green font-semibold text-sm uppercase tracking-[0.2em] mb-4">
            <span className="w-8 h-[2px] gradient-green inline-block" />
            Notre feuille de route
          </span>
          <h2 className="font-heading text-5xl md:text-6xl font-black text-primary-foreground leading-tight">
            Les grandes <span className="text-gradient">étapes</span>
          </h2>
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Animated vertical line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border/20" />
          <motion.div
            className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 w-0.5 gradient-green origin-top"
            style={{ height: lineHeight }}
          />

          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`relative flex items-center mb-12 md:mb-16 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      m.done
                        ? "gradient-green border-transparent shadow-lg shadow-campaign-green/30"
                        : "bg-primary border-border"
                    }`}
                    whileInView={m.done ? { scale: [0.8, 1.1, 1] } : {}}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <m.icon className={`w-5 h-5 ${m.done ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  </motion.div>
                </div>

                {/* Card */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-3rem)] ${isLeft ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"}`}>
                  <motion.div
                    className={`glass rounded-xl p-6 cursor-default ${m.done ? "border-campaign-green/30" : ""}`}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className={`text-xs font-semibold uppercase tracking-wider ${m.done ? "text-campaign-green" : "text-muted-foreground"}`}>
                      {m.date}
                    </span>
                    <h3 className="font-heading font-bold text-primary-foreground text-lg mt-1">{m.title}</h3>
                    <p className="text-primary-foreground/50 text-sm mt-2 leading-relaxed">{m.desc}</p>
                    {m.done && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block mt-3 text-xs font-bold text-campaign-green uppercase tracking-wider"
                      >
                        ✓ Fait
                      </motion.span>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;