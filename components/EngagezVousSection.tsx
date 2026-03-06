'use client'

import { motion } from "framer-motion";
import { HandHeart, FileText, Instagram, Facebook, Mail, BookOpen, ExternalLink, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

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
  buttonLabel: string;
}[] = [
  {
    Icon: HandHeart,
    title: "Je participe",
    desc: "Tractage, porte-à-porte, événements locaux — chaque geste compte.",
    href: "#procuration",
    external: false,
    bg: "bg-gradient-to-br from-campaign-lime to-campaign-lime-light",
    iconColor: "text-accent-foreground",
    textColor: "text-accent-foreground",
    subtextColor: "text-accent-foreground/70",
    buttonLabel: "Rejoignez nous !",
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
    buttonLabel: "Visiter",
  },
  {
    Icon: Instagram,
    title: "Instagram",
    desc: "Suivez notre campagne au quotidien et partagez nos publications.",
    href: "https://www.instagram.com/mathieumorateur/",
    external: true,
    bg: "bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400",
    iconColor: "text-white",
    textColor: "text-white",
    subtextColor: "text-white/70",
    buttonLabel: "Visiter",
  },
  {
    Icon: Facebook,
    title: "Facebook",
    desc: "Rejoignez la communauté, échangez et restez informé.",
    href: "https://www.facebook.com/morateur",
    external: true,
    bg: "bg-blue-600",
    iconColor: "text-white",
    textColor: "text-white",
    subtextColor: "text-white/70",
    buttonLabel: "Visiter",
  },
  {
    Icon: Mail,
    title: "Newsletter",
    desc: "Recevez chaque semaine les dernières infos de la campagne.",
    href: "#newsletter",
    external: false,
    bg: "gradient-teal-deep",
    iconColor: "text-campaign-lime",
    textColor: "text-primary-foreground",
    subtextColor: "text-primary-foreground/60",
    buttonLabel: "S'inscrire",
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
    buttonLabel: "Découvrir",
  },
];

const EngagezVousSection = () => {
  return (
    <section aria-label="Rejoignez la campagne" className="bg-campaign-ice py-12 sm:py-16 overflow-x-clip">
      <div className="w-full relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="section-label justify-center">Passez à l&#39;action</span>
            <h2
              className="font-accent font-extrabold text-primary leading-[0.9] uppercase tracking-tight break-words mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              REJOIGNEZ <span className="text-campaign-lime">LA CAMPAGNE</span>
            </h2>
            <p className="text-primary/60 text-lg max-w-xl mx-auto font-medium">
              Chaque geste compte. Choisissez comment vous engager à nos côtés.
            </p>
          </motion.div>
        </div>

        {/* Grid / Horizontal scroll on mobile */}
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 sm:overflow-visible sm:snap-none sm:pb-0 pt-2">
            {actions.map((action, i) => (
              <motion.a
                key={i}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                whileHover={{ y: -4, transition: { type: "tween", duration: 0.15 } }}
                whileTap={{ scale: 0.97 }}
                className="block cursor-pointer group min-w-[65vw] snap-center sm:min-w-0"
              >
                <div
                  className={`relative rounded-2xl ${action.bg}
                    flex flex-col p-4 sm:p-5 sm:flex-row sm:items-center sm:gap-5
                    text-center sm:text-left overflow-hidden min-h-[180px] sm:min-h-0
                    transition-all duration-200 shadow-lg
                    group-hover:shadow-2xl group-hover:shadow-black/20`}
                >
                  <div className="relative z-10 flex-shrink-0 mx-auto sm:mx-0 mb-3 sm:mb-0">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <action.Icon className={`w-6 h-6 ${action.iconColor}`} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="relative z-10 flex-1 min-w-0">
                    <h3 className={`font-accent text-base sm:text-lg font-extrabold ${action.textColor} uppercase tracking-wide leading-tight mb-1`}>
                      {action.title}
                    </h3>
                    <p className={`${action.subtextColor} text-xs sm:text-sm leading-snug line-clamp-2`}>
                      {action.desc}
                    </p>
                  </div>
                  <div className="relative z-10 flex-shrink-0 mt-3 sm:mt-0">
                    <div className={`inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1.5 ${action.textColor} group-hover:bg-white/30 transition-all duration-200`}>
                      <span className="text-xs font-bold uppercase tracking-wider">{action.buttonLabel}</span>
                      {action.external ? (
                        <ExternalLink className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngagezVousSection;
