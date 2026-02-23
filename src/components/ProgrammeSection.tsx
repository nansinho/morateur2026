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
  number: string;
  bg: string;
  iconColor: string;
  textColor: string;
  subtextColor: string;
}[] = [
  {
    icon: ShieldCheck,
    title: "Faire barrage aux promoteurs",
    desc: "Moratoire sur les grands projets, révision du PLU, consultation citoyenne systématique.",
    number: "01",
    bg: "bg-gradient-to-br from-campaign-lime to-campaign-lime-light",
    iconColor: "text-accent-foreground",
    textColor: "text-accent-foreground",
    subtextColor: "text-accent-foreground/70",
  },
  {
    icon: Building2,
    title: "Des infrastructures à la hauteur",
    desc: "Plan d'investissement pluriannuel, rénovation énergétique, mise aux normes d'accessibilité.",
    number: "02",
    bg: "gradient-teal",
    iconColor: "text-primary-foreground",
    textColor: "text-primary-foreground",
    subtextColor: "text-primary-foreground/70",
  },
  {
    icon: Store,
    title: "Revitaliser le village",
    desc: "Aide aux commerces de proximité, embellissement des façades, marchés thématiques.",
    number: "03",
    bg: "bg-campaign-steel",
    iconColor: "text-primary-foreground",
    textColor: "text-primary-foreground",
    subtextColor: "text-primary-foreground/70",
  },
  {
    icon: Leaf,
    title: "Environnement & cadre de vie",
    desc: "Corridors verts, lutte contre les nuisances, protection des collines et espaces boisés.",
    number: "04",
    bg: "bg-campaign-olive",
    iconColor: "text-primary-foreground",
    textColor: "text-primary-foreground",
    subtextColor: "text-primary-foreground/70",
  },
  {
    icon: GraduationCap,
    title: "Écoles & jeunesse",
    desc: "Rénovation des cantines, espaces périscolaires modernes, soutien aux associations.",
    number: "05",
    bg: "gradient-teal-deep",
    iconColor: "text-campaign-lime",
    textColor: "text-primary-foreground",
    subtextColor: "text-primary-foreground/60",
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
        <Carousel opts={{ align: "start", loop: true, dragFree: true }} className="w-full">
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
                    className={`relative rounded-[1.25rem] aspect-[9/16] ${pillar.bg}
                      flex flex-col items-center justify-between p-6 sm:p-8 text-center overflow-hidden
                      transition-all duration-300 shadow-lg
                      group-hover:shadow-2xl group-hover:shadow-black/20`}
                  >
                    {/* Number watermark */}
                    <span className={`absolute top-4 right-6 font-accent text-7xl sm:text-8xl font-black ${pillar.textColor} opacity-[0.12] leading-none select-none`}>
                      {pillar.number}
                    </span>

                    {/* Icon */}
                    <div className="relative z-10 mt-8">
                      <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto">
                        <pillar.icon className={`w-10 h-10 ${pillar.iconColor}`} strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1 flex flex-col justify-center py-4">
                      <h3 className={`font-accent text-xl sm:text-2xl lg:text-3xl font-extrabold ${pillar.textColor} uppercase tracking-wide leading-tight mb-3 break-words -rotate-3`}>
                        {pillar.title}
                      </h3>
                      <p className={`${pillar.subtextColor} text-sm sm:text-base leading-relaxed`}>
                        {pillar.desc}
                      </p>
                    </div>

                    {/* Bottom indicator */}
                    <div className={`relative z-10 flex items-center gap-2 ${pillar.textColor} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}>
                      <span className="text-sm font-bold uppercase tracking-wider">En savoir plus</span>
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
