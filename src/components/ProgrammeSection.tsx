import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Building2, Store, ArrowRight, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

const pillars: { icon: LucideIcon; title: string; desc: string; stat: string; statLabel: string; accent: string; items: string[] }[] = [
  {
    icon: ShieldCheck,
    title: "Faire barrage aux promoteurs",
    desc: "Protéger notre cadre de vie face à l'avalanche de permis de construire.",
    stat: "1000+",
    statLabel: "logements menacés",
    accent: "bg-campaign-green",
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
    accent: "bg-campaign-gold",
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
    accent: "bg-campaign-coral",
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
      className="rounded-2xl overflow-hidden relative border border-primary-foreground/[0.08] h-full bg-primary-foreground/[0.05] group"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
        <div className={`w-14 h-14 rounded-2xl ${pillar.accent} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
          <pillar.icon className="w-7 h-7 text-primary-foreground" />
        </div>

        <p className="font-heading text-5xl md:text-6xl font-extrabold text-campaign-green tracking-tighter mb-1">
          {pillar.stat}
        </p>
        <p className="text-primary-foreground/30 text-xs uppercase tracking-[0.2em] font-bold mb-6">
          {pillar.statLabel}
        </p>

        <h3 className="font-heading text-xl md:text-2xl font-extrabold text-primary-foreground mb-3 leading-tight">
          {pillar.title}
        </h3>
        <p className="text-primary-foreground/40 text-sm leading-relaxed mb-8 font-medium">
          {pillar.desc}
        </p>

        <ul className="space-y-3 mt-auto">
          {pillar.items.map((item, j) => (
            <motion.li
              key={j}
              className="flex items-start gap-3 text-primary-foreground/60 text-sm leading-relaxed font-medium"
              initial={{ opacity: 0, x: -15 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 + j * 0.08 + 0.3, duration: 0.4 }}
            >
              <span className={`w-2 h-2 rounded-full ${pillar.accent} mt-1.5 flex-shrink-0`} />
              {item}
            </motion.li>
          ))}
        </ul>
      </div>

      <div className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full ${pillar.accent} opacity-0 blur-3xl group-hover:opacity-10 transition-opacity duration-500`} />
    </motion.div>
  );
};

const ProgrammeSection = () => {
  const navigate = useNavigate();

  return (
    <section id="programme" className="bg-primary relative overflow-hidden">
      <div className="container mx-auto px-6 py-28 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 bg-campaign-green/15 border border-campaign-green/25 text-campaign-green font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full mb-6">
            <Target className="w-3.5 h-3.5" />
            Notre vision
          </span>
          <h2 className="font-heading text-5xl md:text-8xl font-extrabold text-primary-foreground mb-4 leading-tight">
            Le <span className="text-campaign-green">Pro</span><span className="text-campaign-gold">gramme</span>
          </h2>
          <p className="text-primary-foreground/40 max-w-2xl mx-auto text-lg mt-6 font-medium">
            Trois piliers concrets pour redonner à Bouc-Bel-Air le cadre de vie qu'elle mérite.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-7 mb-16">
          {pillars.map((pillar, i) => (
            <PillarCard key={i} pillar={pillar} index={i} />
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => navigate("/programme")}
            className="inline-flex items-center gap-3 bg-campaign-gold text-primary px-10 py-5 rounded-full font-extrabold text-sm shadow-xl shadow-campaign-gold/20"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            Voir le programme complet
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgrammeSection;
