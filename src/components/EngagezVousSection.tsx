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

const actions: {
  Icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
  external: boolean;
  bg: string;
  iconColor: string;
  textColor: string;
  subtextColor: string;
}[] = [
  {
    Icon: HandHeart,
    title: "J'agis sur le terrain",
    desc: "Tractage, porte-à-porte, événements locaux — chaque geste compte.",
    href: "#procuration",
    external: false,
    bg: "bg-gradient-to-br from-campaign-lime to-campaign-lime-light",
    iconColor: "text-accent-foreground",
    textColor: "text-accent-foreground",
    subtextColor: "text-accent-foreground/70",
  },
  {
    Icon: FileText,
    title: "Je fais une procuration",
    desc: "Donnez procuration en ligne facilement sur le site officiel.",
    href: "https://www.maprocuration.gouv.fr/",
    external: true,
    bg: "gradient-teal",
    iconColor: "text-primary-foreground",
    textColor: "text-primary-foreground",
    subtextColor: "text-primary-foreground/70",
  },
  {
    Icon: Instagram,
    title: "Instagram",
    desc: "Suivez notre campagne au quotidien et partagez nos publications.",
    href: "https://www.instagram.com/morateur2026/",
    external: true,
    bg: "bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400",
    iconColor: "text-white",
    textColor: "text-white",
    subtextColor: "text-white/70",
  },
  {
    Icon: Facebook,
    title: "Facebook",
    desc: "Rejoignez la communauté, échangez et restez informé.",
    href: "https://www.facebook.com/profile.php?id=61571627498498",
    external: true,
    bg: "bg-blue-600",
    iconColor: "text-white",
    textColor: "text-white",
    subtextColor: "text-white/70",
  },
  {
    Icon: Mail,
    title: "Newsletter",
    desc: "Recevez chaque semaine les dernières infos de la campagne.",
    href: "#procuration",
    external: false,
    bg: "gradient-teal-deep",
    iconColor: "text-campaign-lime",
    textColor: "text-primary-foreground",
    subtextColor: "text-primary-foreground/60",
  },
  {
    Icon: BookOpen,
    title: "Le programme",
    desc: "Découvrez nos 5 piliers et nos engagements concrets.",
    href: "/programme",
    external: false,
    bg: "bg-campaign-steel",
    iconColor: "text-primary-foreground",
    textColor: "text-primary-foreground",
    subtextColor: "text-primary-foreground/70",
  },
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
        <Carousel opts={{ align: "start", loop: true, dragFree: true }} className="w-full max-w-6xl mx-auto">
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
                    className={`relative rounded-[1.25rem] aspect-[9/16] ${action.bg}
                      flex flex-col items-center justify-between p-6 sm:p-8 text-center overflow-hidden
                      transition-all duration-300 shadow-lg
                      group-hover:shadow-2xl group-hover:shadow-black/20`}
                  >
                    {/* Icon */}
                    <div className="relative z-10 mt-8">
                      <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto">
                        <action.Icon className={`w-10 h-10 ${action.iconColor}`} strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex-1 flex flex-col justify-end py-4">
                      <h3 className={`font-accent text-base sm:text-lg lg:text-xl font-extrabold ${action.textColor} uppercase tracking-wide leading-tight mb-3 break-words`}>
                        {action.title}
                      </h3>
                      <p className={`${action.subtextColor} text-sm sm:text-base leading-relaxed`}>
                        {action.desc}
                      </p>
                    </div>

                    {/* Bottom indicator */}
                    <div className={`relative z-10 flex items-center gap-2 ${action.textColor} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}>
                      {action.external ? (
                        <>
                          <span className="text-xs font-bold uppercase tracking-wider">Visiter</span>
                          <ExternalLink className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <span className="text-xs font-bold uppercase tracking-wider">Découvrir</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </>
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
