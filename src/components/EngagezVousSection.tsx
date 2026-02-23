import { motion } from "framer-motion";
import { HandHeart, FileText, Instagram, Facebook, Mail, BookOpen, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const actions: { Icon: LucideIcon; title: string; desc: string; href: string; external: boolean; bg: string; borderColor: string; iconBg: string; titleColor: string; hoverShadow: string }[] = [
  { Icon: HandHeart, title: "J'agis sur le terrain", desc: "Tractage, porte-à-porte, événements", href: "#procuration", external: false, bg: "bg-gradient-to-br from-campaign-lime/35 to-campaign-lime/10", borderColor: "border-l-4 border-campaign-lime", iconBg: "gradient-lime", titleColor: "text-campaign-lime", hoverShadow: "hover:shadow-[0_8px_30px_hsl(70_80%_43%/0.3)]" },
  { Icon: FileText, title: "Procuration", desc: "Donnez procuration en ligne", href: "https://www.maprocuration.gouv.fr/", external: true, bg: "bg-gradient-to-br from-primary/35 to-primary/10", borderColor: "border-l-4 border-primary", iconBg: "gradient-teal", titleColor: "text-primary", hoverShadow: "hover:shadow-[0_8px_30px_hsl(192_82%_29%/0.3)]" },
  { Icon: Instagram, title: "Instagram", desc: "Suivez notre actualité", href: "https://www.instagram.com/morateur2026/", external: true, bg: "bg-gradient-to-br from-pink-500/35 to-purple-500/15", borderColor: "border-l-4 border-pink-500", iconBg: "bg-gradient-to-br from-pink-500 to-purple-600", titleColor: "text-pink-600", hoverShadow: "hover:shadow-[0_8px_30px_rgba(236,72,153,0.3)]" },
  { Icon: Facebook, title: "Facebook", desc: "Rejoignez la communauté", href: "https://www.facebook.com/profile.php?id=61571627498498", external: true, bg: "bg-gradient-to-br from-blue-500/35 to-blue-600/10", borderColor: "border-l-4 border-blue-600", iconBg: "bg-blue-600", titleColor: "text-blue-600", hoverShadow: "hover:shadow-[0_8px_30px_rgba(37,99,235,0.3)]" },
  { Icon: Mail, title: "Newsletter", desc: "Restez informé chaque semaine", href: "#procuration", external: false, bg: "bg-gradient-to-br from-campaign-steel/35 to-campaign-steel/10", borderColor: "border-l-4 border-campaign-steel", iconBg: "bg-campaign-steel", titleColor: "text-campaign-steel", hoverShadow: "hover:shadow-[0_8px_30px_hsl(210_30%_47%/0.3)]" },
  { Icon: BookOpen, title: "Le programme", desc: "Découvrez nos engagements", href: "/programme", external: false, bg: "bg-gradient-to-br from-campaign-olive/35 to-campaign-olive/10", borderColor: "border-l-4 border-campaign-olive", iconBg: "bg-campaign-olive", titleColor: "text-campaign-olive", hoverShadow: "hover:shadow-[0_8px_30px_hsl(96_55%_35%/0.3)]" },
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {actions.map((action, i) => (
            <motion.a
              key={i}
              href={action.href}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`${action.bg} ${action.borderColor} rounded-2xl p-7 flex items-start gap-5 group cursor-pointer transition-all duration-300 ${action.hoverShadow} hover:brightness-105`}
            >
              <div className={`w-14 h-14 rounded-2xl ${action.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <action.Icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-accent font-bold text-sm uppercase tracking-wide ${action.titleColor} mb-1.5 flex items-center gap-2`}>
                  {action.title}
                  <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-1.5 group-hover:opacity-100 transition-all" />
                </h3>
                <p className="text-muted-foreground text-sm font-medium">{action.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngagezVousSection;
