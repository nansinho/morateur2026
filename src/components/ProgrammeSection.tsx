import { motion } from "framer-motion";
import { ShieldCheck, Building2, Store, Leaf, GraduationCap, ArrowRight, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const pillars: {
  icon: LucideIcon;
  title: string;
  desc: string;
  iconBg: string;
  gradient: string;
  number: string;
}[] = [
  {
    icon: ShieldCheck,
    title: "Faire barrage aux promoteurs",
    desc: "Moratoire sur les grands projets, révision du PLU, consultation citoyenne systématique.",
    iconBg: "gradient-lime",
    gradient: "from-campaign-lime/30 via-campaign-lime/10 to-transparent",
    number: "01",
  },
  {
    icon: Building2,
    title: "Des infrastructures à la hauteur",
    desc: "Plan d'investissement pluriannuel, rénovation énergétique, mise aux normes d'accessibilité.",
    iconBg: "gradient-teal",
    gradient: "from-primary/30 via-primary/10 to-transparent",
    number: "02",
  },
  {
    icon: Store,
    title: "Revitaliser le village",
    desc: "Aide aux commerces de proximité, embellissement des façades, marchés thématiques.",
    iconBg: "bg-campaign-steel",
    gradient: "from-campaign-steel/30 via-campaign-steel/10 to-transparent",
    number: "03",
  },
  {
    icon: Leaf,
    title: "Environnement & cadre de vie",
    desc: "Corridors verts, lutte contre les nuisances, protection des collines et espaces boisés.",
    iconBg: "bg-campaign-olive",
    gradient: "from-campaign-olive/30 via-campaign-olive/10 to-transparent",
    number: "04",
  },
  {
    icon: GraduationCap,
    title: "Écoles & jeunesse",
    desc: "Rénovation des cantines, espaces périscolaires modernes, soutien aux associations.",
    iconBg: "gradient-lime",
    gradient: "from-campaign-lime/30 via-campaign-lime/10 to-transparent",
    number: "05",
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

        {/* Carousel */}
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-5">
            {pillars.map((pillar, i) => (
              <CarouselItem key={i} className="pl-5 basis-[75%] sm:basis-[40%] lg:basis-[28%]">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  whileHover={{ y: -8 }}
                  className="cursor-pointer group"
                >
                  <div
                    className="relative rounded-[1.25rem] aspect-[9/16] bg-background/95 backdrop-blur-sm border border-primary-foreground/10
                      flex flex-col items-center justify-between p-6 sm:p-8 text-center overflow-hidden
                      transition-all duration-300
                      group-hover:shadow-2xl group-hover:shadow-campaign-lime/10 group-hover:border-campaign-lime/30"
                  >
                    {/* Gradient accent at top */}
                    <div className={`absolute top-0 left-0 right-0 h-36 bg-gradient-to-b ${pillar.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

                    {/* Number */}
                    <div className="relative z-10 self-start">
                      <span className="font-accent text-5xl sm:text-6xl font-black text-primary-foreground/[0.07] group-hover:text-campaign-lime/20 transition-colors duration-300 leading-none">
                        {pillar.number}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="relative z-10">
                      <motion.div
                        className={`w-20 h-20 rounded-2xl ${pillar.iconBg} flex items-center justify-center shadow-lg mx-auto`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <pillar.icon className="w-10 h-10 text-primary-foreground" strokeWidth={1.5} />
                      </motion.div>
                      {/* Glow */}
                      <div className={`absolute inset-0 w-20 h-20 mx-auto rounded-2xl ${pillar.iconBg} opacity-30 blur-xl`} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1 flex flex-col justify-end py-4">
                      <h3 className="font-accent text-sm sm:text-base font-extrabold text-foreground uppercase tracking-wide leading-tight mb-3 break-words">
                        {pillar.title}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>

                    {/* Bottom indicator */}
                    <div className="relative z-10 flex items-center gap-2 text-campaign-lime/50 group-hover:text-campaign-lime transition-colors duration-300">
                      <span className="text-xs font-bold uppercase tracking-wider">En savoir plus</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-4 mt-10">
            <CarouselPrevious className="static translate-y-0 w-12 h-12 rounded-xl border-2 border-campaign-lime bg-transparent text-campaign-lime hover:bg-campaign-lime hover:text-accent-foreground transition-all duration-300" />
            <CarouselNext className="static translate-y-0 w-12 h-12 rounded-xl border-2 border-campaign-lime bg-transparent text-campaign-lime hover:bg-campaign-lime hover:text-accent-foreground transition-all duration-300" />
          </div>
        </Carousel>

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
