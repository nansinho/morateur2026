import { motion } from "framer-motion";
import { ShieldCheck, Building2, Store, Leaf, GraduationCap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

const pillars: { icon: LucideIcon; title: string; desc: string; iconBg: string; accent: string }[] = [
  {
    icon: ShieldCheck,
    title: "Faire barrage aux promoteurs",
    desc: "Protéger notre cadre de vie face à l'avalanche de permis de construire.",
    iconBg: "gradient-lime",
    accent: "border-campaign-lime/40",
  },
  {
    icon: Building2,
    title: "Des infrastructures à la hauteur",
    desc: "Rénover nos bâtiments publics et moderniser nos voiries.",
    iconBg: "gradient-teal",
    accent: "border-primary/40",
  },
  {
    icon: Store,
    title: "Revitaliser le village",
    desc: "Redonner vie à notre centre ancien et attirer de nouveaux commerces.",
    iconBg: "bg-campaign-steel",
    accent: "border-campaign-steel/40",
  },
  {
    icon: Leaf,
    title: "Environnement & cadre de vie",
    desc: "Préserver nos espaces naturels et améliorer la qualité de vie.",
    iconBg: "bg-campaign-olive",
    accent: "border-campaign-olive/40",
  },
  {
    icon: GraduationCap,
    title: "Écoles & jeunesse",
    desc: "Offrir les meilleures conditions à nos enfants.",
    iconBg: "gradient-lime",
    accent: "border-campaign-lime/40",
  },
];

const ProgrammeSection = () => {
  const navigate = useNavigate();

  return (
    <section id="programme" className="gradient-teal-deep relative overflow-hidden min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-28 relative z-10">
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

        {/* Visual grid — large icons, short text, bold layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 mb-12 sm:mb-16">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`rounded-2xl bg-background/95 backdrop-blur-sm border-2 ${pillar.accent} p-6 flex flex-col items-center text-center gap-4
                transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/5 group cursor-pointer`}
            >
              {/* Large icon */}
              <div className={`w-20 h-20 rounded-2xl ${pillar.iconBg} flex items-center justify-center transition-transform duration-150 group-hover:scale-110`}>
                <pillar.icon className="w-10 h-10 text-primary-foreground" strokeWidth={1.5} />
              </div>

              <h3 className="font-accent text-sm font-extrabold text-foreground uppercase tracking-wide leading-tight">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
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
