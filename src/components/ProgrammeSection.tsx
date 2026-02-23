import { motion } from "framer-motion";
import { ShieldCheck, Building2, Store, Leaf, GraduationCap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

const pillars: {
  icon: LucideIcon;
  title: string;
  desc: string;
  iconBg: string;
  gradient: string;
}[] = [
  {
    icon: ShieldCheck,
    title: "Faire barrage aux promoteurs",
    desc: "Moratoire sur les grands projets, révision du PLU, consultation citoyenne systématique.",
    iconBg: "gradient-lime",
    gradient: "from-campaign-lime/20 via-campaign-lime/5 to-transparent",
  },
  {
    icon: Building2,
    title: "Des infrastructures à la hauteur",
    desc: "Plan d'investissement pluriannuel, rénovation énergétique, mise aux normes d'accessibilité.",
    iconBg: "gradient-teal",
    gradient: "from-primary/20 via-primary/5 to-transparent",
  },
  {
    icon: Store,
    title: "Revitaliser le village",
    desc: "Aide aux commerces de proximité, embellissement des façades, marchés thématiques.",
    iconBg: "bg-campaign-steel",
    gradient: "from-campaign-steel/20 via-campaign-steel/5 to-transparent",
  },
  {
    icon: Leaf,
    title: "Environnement & cadre de vie",
    desc: "Corridors verts, lutte contre les nuisances, protection des collines et espaces boisés.",
    iconBg: "bg-campaign-olive",
    gradient: "from-campaign-olive/20 via-campaign-olive/5 to-transparent",
  },
  {
    icon: GraduationCap,
    title: "Écoles & jeunesse",
    desc: "Rénovation des cantines, espaces périscolaires modernes, soutien aux associations.",
    iconBg: "gradient-lime",
    gradient: "from-campaign-lime/20 via-campaign-lime/5 to-transparent",
  },
];

const ProgrammeSection = () => {
  const navigate = useNavigate();

  return (
    <section id="programme" className="gradient-teal-deep relative overflow-hidden min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-28 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-20"
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

        {/* TikTok-style vertical cards */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-5 sm:overflow-visible sm:pb-0">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex-shrink-0 w-[200px] sm:w-auto snap-center"
            >
              <div
                className={`relative rounded-[1.25rem] aspect-[9/16] bg-background/95 backdrop-blur-sm border border-primary-foreground/10
                  flex flex-col items-center justify-between p-6 text-center overflow-hidden
                  transition-all duration-300 cursor-pointer group
                  hover:-translate-y-2 hover:shadow-2xl hover:shadow-campaign-lime/10 hover:border-campaign-lime/30`}
              >
                {/* Gradient accent at top */}
                <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${pillar.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Top spacer */}
                <div className="relative z-10 pt-4">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl ${pillar.iconBg} flex items-center justify-center shadow-lg mx-auto`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <pillar.icon className="w-8 h-8 text-primary-foreground" strokeWidth={1.5} />
                  </motion.div>
                </div>

                {/* Center content */}
                <div className="relative z-10 flex-1 flex flex-col justify-center py-4">
                  <h3 className="font-accent text-sm font-extrabold text-foreground uppercase tracking-wide leading-tight mb-3 break-words">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                {/* Bottom indicator */}
                <div className="relative z-10 w-10 h-1 rounded-full bg-campaign-lime/30 group-hover:bg-campaign-lime group-hover:w-14 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
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
