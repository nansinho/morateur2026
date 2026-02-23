import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Building2, Store, Leaf, GraduationCap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

const pillars: { icon: LucideIcon; title: string; desc: string; items: string[]; gradient: string; iconBg: string; dotColor: string }[] = [
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
    gradient: "from-campaign-lime/10 via-campaign-lime/5 to-transparent",
    iconBg: "gradient-lime",
    dotColor: "bg-campaign-lime",
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
    gradient: "from-primary/10 via-primary/5 to-transparent",
    iconBg: "gradient-teal",
    dotColor: "bg-primary",
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
    gradient: "from-campaign-steel/10 via-campaign-steel/5 to-transparent",
    iconBg: "bg-campaign-steel",
    dotColor: "bg-campaign-steel",
  },
  {
    icon: Leaf,
    title: "Environnement & cadre de vie",
    desc: "Préserver nos espaces naturels et améliorer la qualité de vie.",
    items: [
      "Protection des espaces verts existants",
      "Mobilité douce et pistes cyclables",
      "Transition énergétique des bâtiments publics",
    ],
    gradient: "from-campaign-olive/10 via-campaign-olive/5 to-transparent",
    iconBg: "bg-campaign-olive",
    dotColor: "bg-campaign-olive",
  },
  {
    icon: GraduationCap,
    title: "Écoles & jeunesse",
    desc: "Offrir les meilleures conditions à nos enfants.",
    items: [
      "Rénovation complète des écoles",
      "Activités périscolaires enrichies",
      "Soutien aux associations sportives et culturelles",
    ],
    gradient: "from-campaign-lime/10 via-campaign-lime/5 to-transparent",
    iconBg: "gradient-lime",
    dotColor: "bg-campaign-lime",
  },
];

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
            Cinq piliers concrets pour redonner à Bouc-Bel-Air le cadre de vie qu'elle mérite.
          </p>
        </motion.div>

        {/* Grid - 3 columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, i) => {
            const CardContent = () => {
              const ref = useRef<HTMLDivElement>(null);
              const isInView = useInView(ref, { once: true, margin: "-10%" });

              return (
                <motion.div
                  ref={ref}
                  className={`rounded-2xl overflow-hidden relative bg-gradient-to-br ${pillar.gradient} bg-background border border-border/50 group h-full`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                >
                  {/* Large background number */}
                  <span className="absolute top-4 right-6 font-accent font-extrabold text-8xl text-foreground/[0.03] leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative z-10 p-8 flex flex-col h-full">
                    <div className={`w-12 h-12 rounded-xl ${pillar.iconBg} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                      <pillar.icon className="w-6 h-6 text-primary-foreground" />
                    </div>

                    <h3 className="font-accent text-lg font-extrabold text-foreground mb-3 leading-tight uppercase tracking-wide">
                      {pillar.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-medium">
                      {pillar.desc}
                    </p>

                    <ul className="space-y-2.5 mt-auto">
                      {pillar.items.map((item, j) => (
                        <motion.li
                          key={j}
                          className="flex items-start gap-2.5 text-foreground/70 text-sm leading-relaxed"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: i * 0.1 + j * 0.06 + 0.3, duration: 0.3 }}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${pillar.dotColor} mt-2 flex-shrink-0`} />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            };

            return <CardContent key={i} />;
          })}
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
