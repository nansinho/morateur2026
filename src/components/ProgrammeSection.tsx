import { motion, useInView } from "framer-motion";
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
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className="rounded-3xl overflow-hidden relative border border-primary-foreground/[0.08] h-full"
      style={{
        background: `linear-gradient(160deg, hsl(222 47% ${11 + index * 3}%), hsl(222 47% ${16 + index * 2}%))`,
      }}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 noise-overlay" />
      <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-campaign-green/[0.06] rounded-full blur-[120px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-campaign-green/30 to-transparent" />

      <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
        {/* Icon */}
        <motion.div
          className="w-14 h-14 rounded-2xl gradient-green flex items-center justify-center mb-6 glow-green-sm"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: "spring", delay: 0.3 + index * 0.1, stiffness: 150 }}
        >
          <pillar.icon className="w-7 h-7 text-primary-foreground" />
        </motion.div>

        {/* Stat */}
        <p className="font-heading text-5xl md:text-6xl font-extrabold text-campaign-green tracking-tighter mb-1">
          {pillar.stat}
        </p>
        <p className="text-primary-foreground/30 text-xs uppercase tracking-[0.2em] font-semibold mb-6">
          {pillar.statLabel}
        </p>

        {/* Title & desc */}
        <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-primary-foreground mb-3 leading-tight">
          {pillar.title}
        </h3>
        <p className="text-primary-foreground/40 text-sm leading-relaxed mb-8">
          {pillar.desc}
        </p>

        {/* Items */}
        <ul className="space-y-3 mt-auto">
          {pillar.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-primary-foreground/60 text-sm leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full gradient-green mt-2 flex-shrink-0 shadow-[0_0_6px_hsl(160,84%,39%,0.4)]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const ProgrammeSection = () => {
  const navigate = useNavigate();

  return (
    <section id="programme" className="relative">
      {/* Header */}
      <div className="gradient-premium relative overflow-hidden">
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute top-20 left-[10%] w-[400px] h-[400px] bg-campaign-green/[0.05] rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-6 pt-32 pb-20 relative z-10 text-center">
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

      {/* 3-column grid */}
      <div className="gradient-premium relative overflow-hidden">
        <div className="absolute inset-0 noise-overlay" />
        <div className="container mx-auto px-6 pb-20 relative z-10">
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <PillarCard key={i} pillar={pillar} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="gradient-premium relative overflow-hidden">
        <div className="absolute inset-0 noise-overlay" />
        <div className="container mx-auto px-6 py-20 relative z-10 text-center">
          <motion.button
            onClick={() => navigate("/programme")}
            className="inline-flex items-center gap-3 gradient-green text-primary-foreground px-12 py-5 rounded-full font-semibold text-base glow-green shimmer"
            whileHover={{ scale: 1.05, y: -4 }}
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
        <div className="section-divider-wide" />
      </div>
    </section>
  );
};

export default ProgrammeSection;
