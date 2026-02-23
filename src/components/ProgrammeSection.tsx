import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Building2, Store, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Faire barrage aux promoteurs",
    desc: "Protéger notre cadre de vie face à l'avalanche de permis de construire.",
    stat: "1000+",
    statLabel: "logements menacés",
    accent: "from-campaign-green to-campaign-glow",
    items: [
      "Refus permanent des permis de construire des promoteurs",
      "Utilisation systématique du droit de préemption urbain",
      "Soutien aux recours des riverains",
      "Bail réel solidaire pour limiter la spéculation",
    ],
  },
  {
    icon: Building2,
    title: "Des infrastructures à la hauteur",
    desc: "Rénover nos bâtiments publics et moderniser nos voiries.",
    stat: "30°C",
    statLabel: "dans nos écoles en mai",
    accent: "from-campaign-gold to-campaign-gold/70",
    items: [
      "Rénovation complète des bâtiments municipaux",
      "Climatisation réversible dans toutes les écoles",
      "Requalification des principaux axes routiers",
      "Études des échangeurs autoroutiers",
    ],
  },
  {
    icon: Store,
    title: "Revitaliser le village",
    desc: "Redonner vie à notre centre ancien et attirer de nouveaux commerces.",
    stat: "100%",
    statLabel: "centre-ville à revitaliser",
    accent: "from-campaign-sky to-campaign-sky/50",
    items: [
      "Centre ancien attractif et vivant",
      "Commerces et artisanat de proximité",
      "Incubateur d'entreprises de restauration",
      "Animations dans les ruelles du village",
    ],
  },
];

const ProgrammeSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section ref={sectionRef} id="programme" className="py-32 relative overflow-hidden">
      {/* Parallax dark background */}
      <motion.div className="absolute inset-0 gradient-premium" style={{ y: bgY }} />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Ambient glows */}
      <div className="absolute top-20 left-[10%] w-[400px] h-[400px] bg-campaign-green/[0.05] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 right-[10%] w-[300px] h-[300px] bg-campaign-gold/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative orbs */}
      <motion.div
        className="absolute top-40 right-[20%] w-1 h-1 rounded-full bg-campaign-green/60"
        animate={{ y: [0, -40, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 left-[15%] w-1.5 h-1.5 rounded-full bg-campaign-gold/50"
        animate={{ y: [0, 30, 0], opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="section-label justify-center">
            Notre vision
            <span className="w-10 h-[2px] gradient-green inline-block" />
          </span>
          <h2 className="font-heading text-5xl md:text-6xl font-extrabold text-primary-foreground mt-2 mb-4">
            Le Programme
          </h2>
          <div className="ornament-line mt-4 mb-6" />
          <p className="text-primary-foreground/40 max-w-2xl mx-auto text-lg">
            Trois piliers concrets pour redonner à Bouc-Bel-Air le cadre de vie qu'elle mérite.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -12, transition: { duration: 0.4, ease: "easeOut" } }}
                className="relative rounded-3xl p-8 glass-card hover:border-campaign-green/30 transition-all duration-500 h-full overflow-hidden"
              >
                {/* Shimmer on hover */}
                <div className="absolute inset-0 rounded-3xl gradient-green opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700" />

                {/* Top accent line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-campaign-green/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <motion.div
                      className="w-14 h-14 rounded-2xl gradient-green flex items-center justify-center glow-green-sm group-hover:shadow-xl group-hover:shadow-campaign-green/30 transition-all duration-500"
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <pillar.icon className="w-7 h-7 text-primary-foreground" />
                    </motion.div>
                    <div className="text-right">
                      <p className="text-campaign-green font-heading text-2xl font-extrabold">{pillar.stat}</p>
                      <p className="text-primary-foreground/30 text-xs">{pillar.statLabel}</p>
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-primary-foreground mb-3">{pillar.title}</h3>
                  <p className="text-primary-foreground/40 text-sm mb-6 leading-relaxed">{pillar.desc}</p>

                  <ul className="space-y-3 mb-8">
                    {pillar.items.map((item, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + j * 0.08 + i * 0.1 }}
                        className="flex items-start gap-3 text-primary-foreground/60 text-sm leading-relaxed group-hover:text-primary-foreground/70 transition-colors duration-500"
                      >
                        <span className="w-1.5 h-1.5 rounded-full gradient-green mt-1.5 flex-shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    onClick={() => navigate("/programme")}
                    className="flex items-center gap-2 text-campaign-green text-sm font-semibold group/btn"
                    whileHover={{ x: 5 }}
                  >
                    En savoir plus
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA bottom */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={() => navigate("/programme")}
            className="inline-flex items-center gap-3 gradient-green text-primary-foreground px-10 py-4 rounded-full font-semibold text-sm glow-green-sm shimmer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <Sparkles className="w-4 h-4" />
            Voir le programme complet
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgrammeSection;
