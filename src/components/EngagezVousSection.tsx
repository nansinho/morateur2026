import { motion } from "framer-motion";
import { HandHeart, FileText, Instagram, Facebook, Mail, BookOpen, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const actions: { Icon: LucideIcon; title: string; desc: string; href: string; external: boolean; gradient: string; iconColor: string }[] = [
  { Icon: HandHeart, title: "J'agis sur le terrain", desc: "Tractage, porte-à-porte, événements", href: "#procuration", external: false, gradient: "from-campaign-lime/20 to-campaign-lime/5 border-campaign-lime/30", iconColor: "gradient-lime" },
  { Icon: FileText, title: "Procuration", desc: "Donnez procuration en ligne", href: "https://www.maprocuration.gouv.fr/", external: true, gradient: "from-primary/20 to-primary/5 border-primary/30", iconColor: "gradient-teal" },
  { Icon: Instagram, title: "Instagram", desc: "Suivez notre actualité", href: "https://www.instagram.com/morateur2026/", external: true, gradient: "from-pink-500/15 to-purple-500/5 border-pink-400/20", iconColor: "bg-gradient-to-br from-pink-500 to-purple-600" },
  { Icon: Facebook, title: "Facebook", desc: "Rejoignez la communauté", href: "https://www.facebook.com/profile.php?id=61571627498498", external: true, gradient: "from-blue-500/15 to-blue-600/5 border-blue-400/20", iconColor: "bg-blue-600" },
  { Icon: Mail, title: "Newsletter", desc: "Restez informé chaque semaine", href: "#procuration", external: false, gradient: "from-campaign-steel/15 to-campaign-steel/5 border-campaign-steel/20", iconColor: "bg-campaign-steel" },
  { Icon: BookOpen, title: "Le programme", desc: "Découvrez nos engagements", href: "/programme", external: false, gradient: "from-campaign-olive/15 to-campaign-olive/5 border-campaign-olive/20", iconColor: "bg-campaign-olive" },
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
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`bg-gradient-to-br ${action.gradient} border rounded-2xl p-6 flex items-start gap-4 group cursor-pointer transition-shadow hover:shadow-lg`}
            >
              <div className={`w-12 h-12 rounded-xl ${action.iconColor} flex items-center justify-center flex-shrink-0`}>
                <action.Icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-accent font-bold text-sm uppercase tracking-wide text-foreground mb-1 flex items-center gap-2">
                  {action.title}
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-muted-foreground text-sm">{action.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngagezVousSection;
