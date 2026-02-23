import { motion } from "framer-motion";
import { HandHeart, FileText, Instagram, Facebook, Mail, BookOpen, ExternalLink, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const actions: { Icon: LucideIcon; title: string; desc: string; href: string; external: boolean; accentColor: string; iconBg: string }[] = [
  { Icon: HandHeart, title: "J'agis sur le terrain", desc: "Tractage, porte-à-porte, événements locaux — chaque geste compte.", href: "#procuration", external: false, accentColor: "from-campaign-lime/30 via-campaign-lime/10 to-transparent", iconBg: "gradient-lime" },
  { Icon: FileText, title: "Je fais une procuration", desc: "Donnez procuration en ligne facilement sur le site officiel.", href: "https://www.maprocuration.gouv.fr/", external: true, accentColor: "from-campaign-lime/40 via-campaign-lime/15 to-transparent", iconBg: "gradient-lime" },
  { Icon: Instagram, title: "Instagram", desc: "Suivez notre campagne au quotidien et partagez nos publications.", href: "https://www.instagram.com/morateur2026/", external: true, accentColor: "from-pink-500/30 via-pink-500/10 to-transparent", iconBg: "bg-gradient-to-br from-pink-500 to-orange-400" },
  { Icon: Facebook, title: "Facebook", desc: "Rejoignez la communauté, échangez et restez informé.", href: "https://www.facebook.com/profile.php?id=61571627498498", external: true, accentColor: "from-blue-500/30 via-blue-500/10 to-transparent", iconBg: "bg-blue-600" },
  { Icon: Mail, title: "Newsletter", desc: "Recevez chaque semaine les dernières infos de la campagne.", href: "#procuration", external: false, accentColor: "from-primary/30 via-primary/10 to-transparent", iconBg: "gradient-teal" },
  { Icon: BookOpen, title: "Le programme", desc: "Découvrez nos 5 piliers et nos engagements concrets.", href: "/programme", external: false, accentColor: "from-campaign-steel/30 via-campaign-steel/10 to-transparent", iconBg: "bg-campaign-steel" },
];

const EngagezVousSection = () => {
  return (
    <section className="bg-campaign-ice py-16 sm:py-24 overflow-hidden min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label">Passez à l'action</span>
          <h2
            className="font-accent font-extrabold text-primary leading-[0.9] uppercase tracking-tight break-words mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            REJOIGNEZ <span className="text-campaign-lime">LA CAMPAGNE</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-medium">
            Chaque geste compte. Choisissez comment vous engager à nos côtés.
          </p>
        </motion.div>

        {/* Carousel */}
        <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-6xl mx-auto">
          <CarouselContent className="-ml-5">
            {actions.map((action, i) => (
              <CarouselItem key={i} className="pl-5 basis-[75%] sm:basis-[40%] lg:basis-[28%]">
                <motion.a
                  href={action.href}
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  whileHover={{ y: -8 }}
                  className="block cursor-pointer group"
                >
                  <div
                    className="relative rounded-[1.25rem] aspect-[9/16] bg-background border border-border
                      flex flex-col items-center justify-between p-6 sm:p-8 text-center overflow-hidden
                      transition-all duration-300
                      group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:border-campaign-lime/30"
                  >
                    {/* Gradient accent at top */}
                    <div className={`absolute top-0 left-0 right-0 h-36 bg-gradient-to-b ${action.accentColor} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

                    {/* Spacer top */}
                    <div className="relative z-10" />

                    {/* Icon */}
                    <div className="relative z-10">
                      <motion.div
                        className={`w-20 h-20 rounded-2xl ${action.iconBg} flex items-center justify-center shadow-lg mx-auto`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <action.Icon className="w-10 h-10 text-primary-foreground" strokeWidth={1.5} />
                      </motion.div>
                      {/* Glow */}
                      <div className={`absolute inset-0 w-20 h-20 mx-auto rounded-2xl ${action.iconBg} opacity-30 blur-xl`} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1 flex flex-col justify-end py-4">
                      <h3 className="font-accent text-sm sm:text-base font-extrabold text-foreground uppercase tracking-wide leading-tight mb-3 break-words">
                        {action.title}
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        {action.desc}
                      </p>
                    </div>

                    {/* Bottom indicator */}
                    <div className="relative z-10 flex items-center gap-2 text-campaign-lime/50 group-hover:text-campaign-lime transition-colors duration-300">
                      {action.external ? (
                        <ExternalLink className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      )}
                    </div>
                  </div>
                </motion.a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-4 mt-10">
            <CarouselPrevious className="static translate-y-0 w-12 h-12 rounded-xl border-2 border-campaign-lime bg-transparent text-campaign-lime hover:bg-campaign-lime hover:text-accent-foreground transition-all duration-300" />
            <CarouselNext className="static translate-y-0 w-12 h-12 rounded-xl border-2 border-campaign-lime bg-transparent text-campaign-lime hover:bg-campaign-lime hover:text-accent-foreground transition-all duration-300" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default EngagezVousSection;
