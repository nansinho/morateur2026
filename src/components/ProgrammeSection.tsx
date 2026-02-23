import { motion, useScroll, useTransform, useInView } from "framer-motion";
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
    bg: "from-[hsl(222,47%,12%)] to-[hsl(222,47%,18%)]",
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
    bg: "from-[hsl(222,47%,14%)] to-[hsl(222,35%,22%)]",
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
    bg: "from-[hsl(222,35%,16%)] to-[hsl(222,47%,20%)]",
    items: [
      "Centre ancien attractif et vivant",
      "Commerces et artisanat de proximité",
      "Incubateur d'entreprises de restauration",
      "Animations dans les ruelles du village",
    ],
  },
];

const PillarCard = ({ pillar, index }: { pillar: typeof pillars[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="sticky-card h-screen flex items-center justify-center px-6" style={{ zIndex: index + 1 }}>
      <motion.div
        className={`w-full max-w-5xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-br ${pillar.bg} relative`}
        initial={{ scale: 0.85, opacity: 0, y: 80 }}
        animate={isInView ? { scale: 1, opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Noise */}
        <div className="absolute inset-0 noise-overlay" />

        {/* Ambient glow */}
        <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-campaign-green/[0.06] rounded-full blur-[120px]" />

        <div className="relative z-10 p-10 md:p-16 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <motion.div
              className="w-16 h-16 rounded-2xl gradient-green flex items-center justify-center mb-8 glow-green-sm"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ type: "spring", delay: 0.3 }}
            >
              <pillar.icon className="w-8 h-8 text-primary-foreground" />
            </motion.div>

            <h3 className="font-heading text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4 leading-tight">
              {pillar.title}
            </h3>
            <p className="text-primary-foreground/50 text-lg leading-relaxed mb-8">{pillar.desc}</p>

            <ul className="space-y-3">
              {pillar.items.map((item, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + j * 0.12, duration: 0.5 }}
                  className="flex items-start gap-3 text-primary-foreground/60 text-sm leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full gradient-green mt-2 flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right: Stat */}
          <div className="flex flex-col items-center justify-center text-center">
            <motion.p
              className="font-heading text-7xl md:text-8xl font-extrabold text-campaign-green tracking-tight"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ type: "spring", delay: 0.4, stiffness: 120 }}
            >
              {pillar.stat}
            </motion.p>
            <motion.p
              className="text-primary-foreground/40 text-sm mt-3 uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
            >
              {pillar.statLabel}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProgrammeSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="programme" className="relative">
      {/* Header */}
      <div className="gradient-premium relative overflow-hidden">
        <div className="absolute inset-0 noise-overlay" />
        <div className="container mx-auto px-6 py-32 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label justify-center">Notre vision</span>
            <h2 className="font-heading text-5xl md:text-7xl font-extrabold text-primary-foreground mt-2 mb-4">
              Le <span className="text-gradient">Programme</span>
            </h2>
            <div className="ornament-line mt-4 mb-6" />
            <p className="text-primary-foreground/40 max-w-2xl mx-auto text-lg">
              Trois piliers concrets pour redonner à Bouc-Bel-Air le cadre de vie qu'elle mérite.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sticky scroll cards */}
      <div className="sticky-cards-container">
        {pillars.map((pillar, i) => (
          <PillarCard key={i} pillar={pillar} index={i} />
        ))}
      </div>

      {/* CTA */}
      <div className="gradient-premium relative overflow-hidden">
        <div className="absolute inset-0 noise-overlay" />
        <div className="container mx-auto px-6 py-24 relative z-10 text-center">
          <motion.button
            onClick={() => navigate("/programme")}
            className="inline-flex items-center gap-3 gradient-green text-primary-foreground px-12 py-5 rounded-full font-semibold text-base glow-green shimmer"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-5 h-5" />
            Voir le programme complet
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default ProgrammeSection;
