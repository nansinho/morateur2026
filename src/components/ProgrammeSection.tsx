import { motion } from "framer-motion";
import { useState } from "react";
import { ShieldCheck, Building2, Store, Leaf, GraduationCap, ArrowRight, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import candidatTerrain from "@/assets/candidat-terrain.jpg";
import candidatReunion from "@/assets/candidat-reunion.jpg";
import candidatMarche from "@/assets/candidat-marche.jpg";

const pillars: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  desc: string;
  img: string;
  iconBg: string;
}[] = [
  {
    icon: ShieldCheck,
    title: "Faire barrage aux promoteurs",
    subtitle: "Urbanisme maîtrisé",
    desc: "Moratoire sur les grands projets immobiliers, révision du PLU et consultation citoyenne systématique pour protéger notre cadre de vie.",
    img: candidatTerrain,
    iconBg: "gradient-lime",
  },
  {
    icon: Building2,
    title: "Des infrastructures à la hauteur",
    subtitle: "Bâtir l'avenir",
    desc: "Plan pluriannuel d'investissement, rénovation énergétique des écoles, mise aux normes d'accessibilité de nos bâtiments publics.",
    img: candidatReunion,
    iconBg: "gradient-teal",
  },
  {
    icon: Store,
    title: "Revitaliser le village",
    subtitle: "Commerce & lien social",
    desc: "Aide à l'installation de commerces de proximité, embellissement des façades, marchés thématiques au cœur du village.",
    img: candidatMarche,
    iconBg: "bg-campaign-steel",
  },
  {
    icon: Leaf,
    title: "Environnement & cadre de vie",
    subtitle: "Préserver nos espaces",
    desc: "Création de corridors verts, lutte contre les nuisances sonores, protection des collines et espaces boisés.",
    img: candidatTerrain,
    iconBg: "bg-campaign-olive",
  },
  {
    icon: GraduationCap,
    title: "Écoles & jeunesse",
    subtitle: "L'avenir de nos enfants",
    desc: "Rénovation des cantines, création d'espaces périscolaires modernes, soutien aux associations jeunesse.",
    img: candidatReunion,
    iconBg: "gradient-lime",
  },
];

const ProgrammeSection = () => {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState(0);
  const current = pillars[featured];

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
        </motion.div>

        {/* Featured pillar — large image + text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden mb-8 shadow-2xl"
        >
          {/* Image side */}
          <div className="relative h-64 lg:h-auto lg:min-h-[400px] overflow-hidden">
            <motion.img
              key={featured}
              src={current.img}
              alt={current.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/30 lg:bg-gradient-to-r lg:from-transparent lg:to-primary/50" />
          </div>

          {/* Text side */}
          <div className="bg-background/95 backdrop-blur-sm p-8 sm:p-12 flex flex-col justify-center">
            <motion.div
              key={featured}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className={`w-14 h-14 rounded-2xl ${current.iconBg} flex items-center justify-center mb-6 shadow-lg`}>
                <current.icon className="w-7 h-7 text-primary-foreground" strokeWidth={1.5} />
              </div>
              <p className="text-campaign-lime font-accent font-bold text-xs uppercase tracking-[0.2em] mb-2">{current.subtitle}</p>
              <h3
                className="font-accent font-extrabold text-foreground uppercase tracking-tight leading-tight mb-4 break-words"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
              >
                {current.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-base">
                {current.desc}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Pillar selector tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-14">
          {pillars.map((pillar, i) => (
            <motion.button
              key={i}
              onClick={() => setFeatured(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              className={`rounded-xl p-4 sm:p-5 flex flex-col items-center text-center gap-3 transition-all duration-300 cursor-pointer border-2
                ${featured === i
                  ? "bg-campaign-lime/10 border-campaign-lime shadow-lg shadow-campaign-lime/10"
                  : "bg-primary-foreground/5 border-primary-foreground/10 hover:border-primary-foreground/25 hover:bg-primary-foreground/10"
                }`}
            >
              <div className={`w-10 h-10 rounded-xl ${featured === i ? "gradient-lime" : "bg-primary-foreground/10"} flex items-center justify-center transition-all duration-300`}>
                <pillar.icon className={`w-5 h-5 ${featured === i ? "text-accent-foreground" : "text-primary-foreground/60"}`} strokeWidth={1.5} />
              </div>
              <span className={`font-accent text-[11px] sm:text-xs font-bold uppercase tracking-wide leading-tight transition-colors duration-300 ${
                featured === i ? "text-campaign-lime" : "text-primary-foreground/50"
              }`}>
                {pillar.title}
              </span>
              {featured === i && (
                <motion.div
                  layoutId="pillar-indicator"
                  className="w-6 h-1 rounded-full bg-campaign-lime"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
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
