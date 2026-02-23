import { motion } from "framer-motion";
import { HandHeart, FileText, Instagram, Facebook, Mail, BookOpen, Megaphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const actions: { Icon: LucideIcon; title: string; desc: string; bg: string; textColor: string; descColor: string; href: string; external?: boolean }[] = [
  {
    Icon: HandHeart,
    title: "J'agis sur le terrain",
    desc: "Rejoignez nos équipes de bénévoles pour le porte-à-porte et les distributions.",
    bg: "bg-primary",
    textColor: "text-primary-foreground",
    descColor: "text-primary-foreground/60",
    href: "#procuration",
  },
  {
    Icon: FileText,
    title: "Je fais une procuration",
    desc: "Confiez votre voix à un proche le jour du vote.",
    bg: "bg-campaign-gold",
    textColor: "text-primary",
    descColor: "text-primary/70",
    href: "https://www.maprocuration.gouv.fr/",
    external: true,
  },
  {
    Icon: Instagram,
    title: "Sur Instagram",
    desc: "Suivez les coulisses de la campagne au quotidien.",
    bg: "bg-gradient-to-br from-purple-600 to-pink-500",
    textColor: "text-white",
    descColor: "text-white/75",
    href: "https://www.instagram.com/morateur2026/",
    external: true,
  },
  {
    Icon: Facebook,
    title: "Sur Facebook",
    desc: "Rejoignez notre communauté et partagez nos publications.",
    bg: "bg-[hsl(220,46%,48%)]",
    textColor: "text-white",
    descColor: "text-white/75",
    href: "https://www.facebook.com/profile.php?id=61571627498498",
    external: true,
  },
  {
    Icon: Mail,
    title: "Newsletter",
    desc: "Recevez toutes les infos de la campagne directement.",
    bg: "bg-campaign-green",
    textColor: "text-primary-foreground",
    descColor: "text-primary-foreground/70",
    href: "#procuration",
  },
  {
    Icon: BookOpen,
    title: "Le programme",
    desc: "Découvrez nos 3 piliers pour l'avenir de Bouc-Bel-Air.",
    bg: "bg-campaign-coral",
    textColor: "text-primary-foreground",
    descColor: "text-primary-foreground/70",
    href: "/programme",
  },
];

const EngagezVousSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="inline-flex items-center gap-2 bg-campaign-coral/15 border border-campaign-coral/25 text-campaign-coral font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full mb-6">
            <Megaphone className="w-3.5 h-3.5" />
            Engagez-vous
          </span>
          <h2 className="font-heading text-5xl md:text-8xl font-extrabold leading-[1]">
            <span className="text-foreground">Rejoignez </span>
            <br className="hidden md:block" />
            <span className="text-campaign-green">la </span>
            <span className="text-campaign-gold">campagne</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-6 max-w-xl mx-auto font-medium">
            Chaque geste compte. Choisissez comment vous engager à nos côtés.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {actions.map((action, i) => (
            <motion.a
              key={i}
              href={action.href}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`block rounded-2xl p-8 ${action.bg} shadow-lg h-full group`}
            >
              <div className="w-14 h-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                <action.Icon className={`w-7 h-7 ${action.textColor}`} />
              </div>
              <h3 className={`font-heading font-extrabold text-xl mb-2 ${action.textColor}`}>
                {action.title}
              </h3>
              <p className={`text-sm leading-relaxed font-medium ${action.descColor}`}>
                {action.desc}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngagezVousSection;
