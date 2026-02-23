import { motion, useScroll, useTransform } from "framer-motion";
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

const RoadmapSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  return (
    <section ref={ref} id="roadmap" className="py-32 bg-primary relative overflow-hidden">
      {/* Noise */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Ambient glows */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: bgScale }}
      >
        <div className="absolute top-1/4 left-[20%] w-[500px] h-[500px] bg-campaign-green/[0.04] rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 right-[20%] w-[400px] h-[400px] bg-campaign-gold/[0.03] rounded-full blur-[150px]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="section-label justify-center">
            Notre feuille de route
          </span>
          <h2 className="font-heading text-5xl md:text-6xl font-extrabold text-primary-foreground leading-tight mt-2">
            Les grandes <span className="text-gradient">étapes</span>
          </h2>
          <div className="ornament-line mt-4" />
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Track line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary-foreground/[0.06]" />
          <motion.div
            className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 w-0.5 origin-top"
            style={{
              height: lineHeight,
              background: "linear-gradient(to bottom, hsl(160 84% 39%), hsl(160 80% 60%))",
            }}
          />

          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className={`relative flex items-center mb-12 md:mb-16 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                      m.done
                        ? "gradient-green border-transparent glow-green-sm"
                        : "bg-primary border-primary-foreground/10 hover:border-primary-foreground/20"
                    }`}
                    whileInView={m.done ? { scale: [0.8, 1.15, 1] } : {}}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    <m.icon className={`w-5 h-5 ${m.done ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  </motion.div>
                </div>

                {/* Connecting line to card */}
                <div className={`hidden md:block absolute top-1/2 w-8 h-px ${
                  isLeft ? "right-1/2 mr-6" : "left-1/2 ml-6"
                } ${m.done ? "bg-campaign-green/30" : "bg-primary-foreground/[0.06]"}`} />

                {/* Card */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-3.5rem)] ${isLeft ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"}`}>
                  <motion.div
                    className={`rounded-2xl p-6 cursor-default border overflow-hidden relative transition-all duration-500 ${
                      m.done
                        ? "glass-card !border-campaign-green/20"
                        : "bg-primary-foreground/[0.03] border-primary-foreground/[0.06] hover:border-primary-foreground/10"
                    }`}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Top accent for done items */}
                    {m.done && (
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-campaign-green/40 to-transparent" />
                    )}

                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-semibold uppercase tracking-wider ${m.done ? "text-campaign-green" : "text-muted-foreground"}`}>
                        {m.date}
                      </span>
                      {m.done && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ type: "spring", delay: 0.2 }}
                          className="w-6 h-6 rounded-full gradient-green flex items-center justify-center"
                        >
                          <Check className="w-3.5 h-3.5 text-primary-foreground" />
                        </motion.div>
                      )}
                    </div>
                    <h3 className="font-heading font-bold text-primary-foreground text-lg mt-1">{m.title}</h3>
                    <p className="text-primary-foreground/40 text-sm mt-2 leading-relaxed">{m.desc}</p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider-wide" />
    </section>
  );
};

export default RoadmapSection;
