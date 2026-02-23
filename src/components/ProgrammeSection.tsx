import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Building2, Store, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

const pillars: { icon: LucideIcon; title: string; desc: string; items: string[] }[] = [
  {
    icon: ShieldCheck,
    title: "Faire barrage aux promoteurs",
    desc: "Protéger notre cadre de vie face à l'avalanche de permis de construire.",
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
    items: [
      "Centre ancien attractif et vivant",
      "Commerces et artisanat de proximité",
      "Incubateur d'entreprises de restauration",
      "Animations dans les ruelles du village",
    ],
  },
];

const bentoSizes = ["lg:col-span-2 lg:row-span-2", "lg:col-span-1", "lg:col-span-1"];

const PillarCard = ({ pillar, index, className }: { pillar: typeof pillars[0]; index: number; className: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const isLarge = index === 0;

  return (
    <motion.div
      ref={ref}
      className={`rounded-2xl overflow-hidden relative bg-background border border-border group ${className}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
    >
      <div className={`relative z-10 ${isLarge ? "p-10 md:p-14" : "p-8"} flex flex-col h-full`}>
        <div className="w-12 h-12 rounded-xl gradient-lime flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
          <pillar.icon className="w-6 h-6 text-accent-foreground" />
        </div>

        <h3 className={`font-accent ${isLarge ? "text-2xl md:text-3xl" : "text-xl"} font-extrabold text-foreground mb-3 leading-tight uppercase tracking-wide`}>
          {pillar.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8 font-medium">
          {pillar.desc}
        </p>

        <ul className="space-y-3 mt-auto">
          {pillar.items.map((item, j) => (
            <motion.li
              key={j}
              className="flex items-start gap-3 text-foreground/70 text-sm leading-relaxed"
              initial={{ opacity: 0, x: -15 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.15 + j * 0.08 + 0.3, duration: 0.4 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-campaign-lime mt-2 flex-shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const ProgrammeSection = () => {
  const navigate = useNavigate();

  return (
    <section id="programme" className="gradient-teal-deep relative overflow-hidden">
      <div className="container mx-auto px-6 py-28 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-campaign-lime font-accent font-bold text-xs uppercase tracking-[0.3em] mb-6">Notre vision</p>
          <h2
            className="font-accent font-extrabold text-primary-foreground leading-[0.9] uppercase tracking-tight break-words"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            LE <span className="text-campaign-lime">PROGRAMME</span>
          </h2>
          <p className="text-primary-foreground/40 max-w-2xl mx-auto text-lg mt-8 font-medium">
            Trois piliers concrets pour redonner à Bouc-Bel-Air le cadre de vie qu'elle mérite.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          {pillars.map((pillar, i) => (
            <PillarCard key={i} pillar={pillar} index={i} className={bentoSizes[i]} />
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
            className="inline-flex items-center gap-3 gradient-lime text-accent-foreground px-10 py-4 rounded-xl font-bold text-sm shadow-xl uppercase tracking-wide"
            whileHover={{ scale: 1.03 }}
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
