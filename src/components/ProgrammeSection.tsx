import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ShieldCheck, Building2, Store, Leaf, GraduationCap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import candidatTerrain from "@/assets/candidat-terrain.jpg";
import candidatReunion from "@/assets/candidat-reunion.jpg";
import candidatMarche from "@/assets/candidat-marche.jpg";

const pillars: {
  icon: LucideIcon;
  title: string;
  desc: string;
  detail: string;
  img: string;
  accent: string;
  iconBg: string;
}[] = [
  {
    icon: ShieldCheck,
    title: "Faire barrage aux promoteurs",
    desc: "Protéger notre cadre de vie face à l'avalanche de permis de construire.",
    detail: "Moratoire sur les grands projets immobiliers, révision du PLU, consultation citoyenne systématique.",
    img: candidatTerrain,
    accent: "border-campaign-lime/40 hover:border-campaign-lime",
    iconBg: "gradient-lime",
  },
  {
    icon: Building2,
    title: "Des infrastructures à la hauteur",
    desc: "Rénover nos bâtiments publics et moderniser nos voiries.",
    detail: "Plan pluriannuel d'investissement, rénovation énergétique des écoles, mise aux normes d'accessibilité.",
    img: candidatReunion,
    accent: "border-primary/40 hover:border-primary",
    iconBg: "gradient-teal",
  },
  {
    icon: Store,
    title: "Revitaliser le village",
    desc: "Redonner vie à notre centre ancien et attirer de nouveaux commerces.",
    detail: "Aide à l'installation de commerces de proximité, embellissement des façades, marchés thématiques.",
    img: candidatMarche,
    accent: "border-campaign-steel/40 hover:border-campaign-steel",
    iconBg: "bg-campaign-steel",
  },
  {
    icon: Leaf,
    title: "Environnement & cadre de vie",
    desc: "Préserver nos espaces naturels et améliorer la qualité de vie.",
    detail: "Création de corridors verts, lutte contre les nuisances, protection des collines et espaces boisés.",
    img: candidatTerrain,
    accent: "border-campaign-olive/40 hover:border-campaign-olive",
    iconBg: "bg-campaign-olive",
  },
  {
    icon: GraduationCap,
    title: "Écoles & jeunesse",
    desc: "Offrir les meilleures conditions à nos enfants.",
    detail: "Rénovation des cantines, création d'espaces périscolaires modernes, soutien aux associations jeunesse.",
    img: candidatReunion,
    accent: "border-campaign-lime/40 hover:border-campaign-lime",
    iconBg: "gradient-lime",
  },
];

const ProgrammeSection = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="programme" className="gradient-teal-deep relative overflow-hidden min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-28 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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

        {/* Interactive pillar cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 mb-12 sm:mb-16">
          {pillars.map((pillar, i) => {
            const isActive = activeIndex === i;
            // First two cards span 6 cols, last three span 4 cols
            const colSpan = i < 2 ? "lg:col-span-6" : "lg:col-span-4";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className={`${colSpan} relative rounded-2xl overflow-hidden border-2 ${pillar.accent}
                  transition-all duration-500 cursor-pointer group`}
                style={{ minHeight: i < 2 ? "320px" : "280px" }}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => setActiveIndex(isActive ? null : i)}
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <img
                    src={pillar.img}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive
                      ? "bg-gradient-to-t from-primary/95 via-primary/80 to-primary/60"
                      : "bg-gradient-to-t from-primary/90 via-primary/70 to-primary/40"
                  }`} />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8">
                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 rounded-2xl ${pillar.iconBg} flex items-center justify-center mb-4 shadow-lg`}
                    animate={isActive ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <pillar.icon className="w-7 h-7 text-primary-foreground" strokeWidth={1.5} />
                  </motion.div>

                  <h3 className="font-accent text-base sm:text-lg font-extrabold text-primary-foreground uppercase tracking-wide leading-tight mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-primary-foreground/60 text-sm leading-relaxed mb-0">
                    {pillar.desc}
                  </p>

                  {/* Expandable detail */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-4 border-t border-primary-foreground/20">
                          <p className="text-primary-foreground/80 text-sm leading-relaxed">
                            {pillar.detail}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
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
