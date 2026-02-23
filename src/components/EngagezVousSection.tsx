import { motion } from "framer-motion";
import { HandHeart, FileText, Instagram, Facebook, Mail, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const actions: { Icon: LucideIcon; title: string; desc: string; href: string; external: boolean; cardBg: string; iconRingColor: string; special?: boolean }[] = [
  { Icon: HandHeart, title: "J'agis sur le terrain", desc: "Tractage, porte-à-porte, événements locaux", href: "#procuration", external: false, cardBg: "gradient-teal-deep", iconRingColor: "ring-white/20" },
  { Icon: FileText, title: "Je fais une procuration", desc: "Donnez procuration en ligne facilement", href: "https://www.maprocuration.gouv.fr/", external: true, cardBg: "bg-campaign-lime", iconRingColor: "ring-white/25", special: true },
  { Icon: Instagram, title: "Suivez-nous sur Instagram", desc: "Rejoignez notre communauté en ligne", href: "https://www.instagram.com/morateur2026/", external: true, cardBg: "gradient-teal-deep", iconRingColor: "ring-white/20" },
  { Icon: Facebook, title: "Rejoignez-nous sur Facebook", desc: "Partagez et échangez avec nous", href: "https://www.facebook.com/profile.php?id=61571627498498", external: true, cardBg: "gradient-teal-deep", iconRingColor: "ring-white/20" },
  { Icon: Mail, title: "Je m'abonne à la newsletter", desc: "Restez informé chaque semaine", href: "#procuration", external: false, cardBg: "gradient-teal-deep", iconRingColor: "ring-white/20" },
  { Icon: BookOpen, title: "Le programme", desc: "Découvrez nos engagements pour la ville", href: "/programme", external: false, cardBg: "gradient-teal-deep", iconRingColor: "ring-white/20" },
];

const EngagezVousSection = () => {
  return (
    <section className="bg-campaign-ice py-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
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
              className={`${action.cardBg} rounded-2xl p-6 flex flex-col items-center text-center gap-4 group cursor-pointer justify-center
                transition-[transform,box-shadow,filter] duration-150 ease-out
                hover:-translate-y-3 hover:scale-105 hover:shadow-2xl hover:brightness-110
                active:scale-95`}
            >
              <div className={`w-16 h-16 rounded-full ring-2 ${action.iconRingColor} bg-white/10 flex items-center justify-center`}>
                <action.Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-accent font-extrabold text-sm uppercase tracking-wide text-white leading-tight mb-2">
                  {action.title}
                </h3>
                <p className="text-white/70 text-xs leading-relaxed">{action.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngagezVousSection;
