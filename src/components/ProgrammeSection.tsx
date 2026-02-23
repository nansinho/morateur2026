import { motion } from "framer-motion";
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

const ProgrammeSection = () => {
  const navigate = useNavigate();

  return (
    <section id="programme" className="py-32 relative overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 gradient-navy" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "50px 50px" }} />

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 text-campaign-green font-semibold text-sm uppercase tracking-[0.25em] mb-4">
            <span className="w-8 h-[2px] gradient-green inline-block" />
            Notre vision
            <span className="w-8 h-[2px] gradient-green inline-block" />
          </span>
          <h2 className="font-heading text-5xl md:text-6xl font-black text-primary-foreground mt-2 mb-4">
            Le Programme
          </h2>
          <p className="text-primary-foreground/50 max-w-2xl mx-auto text-lg">
            Trois piliers concrets pour redonner à Bouc-Bel-Air le cadre de vie qu'elle mérite.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group relative glass rounded-2xl p-8 hover:bg-white/15 transition-all duration-500"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl gradient-green opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl gradient-green flex items-center justify-center shadow-lg shadow-campaign-green/20">
                    <pillar.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div className="text-right">
                    <p className="text-campaign-green font-heading text-2xl font-black">{pillar.stat}</p>
                    <p className="text-primary-foreground/40 text-xs">{pillar.statLabel}</p>
                  </div>
                </div>

                <h3 className="font-heading text-xl font-bold text-primary-foreground mb-3">{pillar.title}</h3>
                <p className="text-primary-foreground/50 text-sm mb-6 leading-relaxed">{pillar.desc}</p>

                <ul className="space-y-3 mb-8">
                  {pillar.items.map((item, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + j * 0.1 + i * 0.15 }}
                      className="flex items-start gap-3 text-primary-foreground/70 text-sm leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full gradient-green mt-2 flex-shrink-0" />
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgrammeSection;
