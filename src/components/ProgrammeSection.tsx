import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Building2, Store, ArrowRight } from "lucide-react";
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
      className="rounded-2xl overflow-hidden relative border border-primary-foreground/[0.06] h-full bg-primary-foreground/[0.04]"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl gradient-green flex items-center justify-center mb-6">
          <pillar.icon className="w-6 h-6 text-primary-foreground" />
        </div>

        {/* Stat */}
        <p className="font-heading text-4xl md:text-5xl font-extrabold text-campaign-green tracking-tighter mb-1">
          {pillar.stat}
        </p>
        <p className="text-primary-foreground/25 text-xs uppercase tracking-[0.2em] font-medium mb-6">
          {pillar.statLabel}
        </p>

        {/* Title & desc */}
        <h3 className="font-heading text-xl md:text-2xl font-bold text-primary-foreground mb-3 leading-tight">
          {pillar.title}
        </h3>
        <p className="text-primary-foreground/35 text-sm leading-relaxed mb-8">
          {pillar.desc}
        </p>

        {/* Items */}
        <ul className="space-y-3 mt-auto">
          {pillar.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-primary-foreground/55 text-sm leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-campaign-green mt-2 flex-shrink-0" />
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
    <section id="programme" className="bg-primary relative overflow-hidden">
      <div className="container mx-auto px-6 py-28 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-campaign-green font-semibold text-xs uppercase tracking-[0.3em] mb-4">Notre vision</p>
          <h2 className="font-heading text-5xl md:text-6xl font-extrabold text-primary-foreground mb-4">
            Le <span className="text-campaign-green">Programme</span>
          </h2>
          <div className="w-16 h-[2px] mx-auto bg-campaign-green/40 rounded-full" />
          <p className="text-primary-foreground/35 max-w-2xl mx-auto text-lg mt-6">
            Trois piliers concrets pour redonner à Bouc-Bel-Air le cadre de vie qu'elle mérite.
          </p>
        </motion.div>

        {/* 3-column grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, i) => (
            <PillarCard key={i} pillar={pillar} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => navigate("/programme")}
            className="inline-flex items-center gap-3 gradient-green text-primary-foreground px-10 py-4 rounded-full font-semibold text-sm shadow-lg shadow-campaign-green/20"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Voir le programme complet
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-campaign-green/15 to-transparent" />
    </section>
  );
};

export default ProgrammeSection;
