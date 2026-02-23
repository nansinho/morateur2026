import { motion } from "framer-motion";
import { HandHeart, FileText, Instagram, Facebook, Mail, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const actions: { Icon: LucideIcon; title: string; desc: string; href: string; external: boolean; accentColor: string; iconBg: string }[] = [
  { Icon: HandHeart, title: "J'agis sur le terrain", desc: "Tractage, porte-à-porte, événements locaux — chaque geste compte.", href: "#procuration", external: false, accentColor: "from-campaign-lime/20 via-campaign-lime/5 to-transparent", iconBg: "gradient-lime" },
  { Icon: FileText, title: "Je fais une procuration", desc: "Donnez procuration en ligne facilement sur le site officiel.", href: "https://www.maprocuration.gouv.fr/", external: true, accentColor: "from-campaign-lime/30 via-campaign-lime/10 to-transparent", iconBg: "gradient-lime" },
  { Icon: Instagram, title: "Instagram", desc: "Suivez notre campagne au quotidien et partagez nos publications.", href: "https://www.instagram.com/morateur2026/", external: true, accentColor: "from-pink-500/20 via-pink-500/5 to-transparent", iconBg: "bg-gradient-to-br from-pink-500 to-orange-400" },
  { Icon: Facebook, title: "Facebook", desc: "Rejoignez la communauté, échangez et restez informé.", href: "https://www.facebook.com/profile.php?id=61571627498498", external: true, accentColor: "from-blue-500/20 via-blue-500/5 to-transparent", iconBg: "bg-blue-600" },
  { Icon: Mail, title: "Newsletter", desc: "Recevez chaque semaine les dernières infos de la campagne.", href: "#procuration", external: false, accentColor: "from-primary/20 via-primary/5 to-transparent", iconBg: "gradient-teal" },
  { Icon: BookOpen, title: "Le programme", desc: "Découvrez nos 5 piliers et nos engagements concrets.", href: "/programme", external: false, accentColor: "from-campaign-steel/20 via-campaign-steel/5 to-transparent", iconBg: "bg-campaign-steel" },
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

        {/* TikTok-style vertical cards */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:overflow-visible sm:pb-0 max-w-6xl mx-auto">
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
              className="flex-shrink-0 w-[160px] sm:w-auto snap-center"
            >
              <div
                className="relative rounded-[1.25rem] aspect-[9/16] bg-background border border-border
                  flex flex-col items-center justify-between p-5 text-center overflow-hidden
                  transition-all duration-300 cursor-pointer group
                  hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-campaign-lime/30"
              >
                {/* Gradient accent at top */}
                <div className={`absolute top-0 left-0 right-0 h-28 bg-gradient-to-b ${action.accentColor} opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Icon */}
                <div className="relative z-10 pt-4">
                  <motion.div
                    className={`w-14 h-14 rounded-2xl ${action.iconBg} flex items-center justify-center shadow-lg mx-auto`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <action.Icon className="w-7 h-7 text-primary-foreground" strokeWidth={1.5} />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col justify-center py-3">
                  <h3 className="font-accent text-xs font-extrabold text-foreground uppercase tracking-wide leading-tight mb-2 break-words">
                    {action.title}
                  </h3>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    {action.desc}
                  </p>
                </div>

                {/* Bottom indicator */}
                <div className="relative z-10 w-8 h-1 rounded-full bg-campaign-lime/30 group-hover:bg-campaign-lime group-hover:w-12 transition-all duration-300" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngagezVousSection;
