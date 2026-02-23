import { motion } from "framer-motion";
import { HandHeart, FileText, Instagram, Facebook, Mail, BookOpen } from "lucide-react";

const actions = [
  {
    icon: HandHeart,
    title: "J'agis sur le terrain",
    desc: "Rejoignez nos équipes de bénévoles pour le porte-à-porte et les distributions.",
    bg: "bg-primary",
    iconBg: "bg-campaign-green",
    textColor: "text-primary-foreground",
    descColor: "text-primary-foreground/50",
    href: "#procuration",
  },
  {
    icon: FileText,
    title: "Je fais une procuration",
    desc: "Vous ne pouvez pas voter ? Confiez votre voix à un proche.",
    bg: "bg-campaign-gold",
    iconBg: "bg-primary",
    textColor: "text-primary",
    descColor: "text-primary/60",
    href: "https://www.maprocuration.gouv.fr/",
    external: true,
  },
  {
    icon: Instagram,
    title: "Sur Instagram",
    desc: "Suivez les coulisses de la campagne au quotidien.",
    bg: "bg-gradient-to-br from-purple-500 to-pink-500",
    iconBg: "bg-white/20",
    textColor: "text-white",
    descColor: "text-white/70",
    href: "https://www.instagram.com/morateur2026/",
    external: true,
  },
  {
    icon: Facebook,
    title: "Sur Facebook",
    desc: "Rejoignez notre communauté et partagez nos publications.",
    bg: "bg-[hsl(220,46%,48%)]",
    iconBg: "bg-white/20",
    textColor: "text-white",
    descColor: "text-white/70",
    href: "https://www.facebook.com/profile.php?id=61571627498498",
    external: true,
  },
  {
    icon: Mail,
    title: "Newsletter",
    desc: "Recevez toutes les infos de la campagne directement dans votre boîte mail.",
    bg: "bg-campaign-green",
    iconBg: "bg-primary",
    textColor: "text-primary-foreground",
    descColor: "text-primary-foreground/60",
    href: "#procuration",
  },
  {
    icon: BookOpen,
    title: "Le programme",
    desc: "Découvrez nos 3 piliers pour l'avenir de Bouc-Bel-Air.",
    bg: "bg-campaign-sky",
    iconBg: "bg-primary",
    textColor: "text-primary",
    descColor: "text-primary/60",
    href: "/programme",
  },
];

const EngagezVousSection = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Fun typography title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading text-5xl md:text-7xl font-extrabold leading-[1.1]">
            <span className="text-foreground">Rejoignez </span>
            <span className="text-campaign-green">la </span>
            <br className="hidden md:block" />
            <span className="text-campaign-gold">campagne</span>
            <span className="text-foreground"> !</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-6 max-w-xl mx-auto">
            Chaque geste compte. Choisissez comment vous engager à nos côtés.
          </p>
        </motion.div>

        {/* Grid of action cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {actions.map((action, i) => {
            const Tag = action.external ? "a" : "a";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
              >
                <a
                  href={action.href}
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noopener noreferrer" : undefined}
                  className={`block rounded-2xl p-7 ${action.bg} transition-all duration-300 hover:scale-[1.03] hover:shadow-xl group h-full`}
                >
                  <div className={`w-14 h-14 rounded-xl ${action.iconBg} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <action.icon className={`w-7 h-7 ${action.textColor}`} />
                  </div>
                  <h3 className={`font-heading font-bold text-xl mb-2 ${action.textColor}`}>
                    {action.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${action.descColor}`}>
                    {action.desc}
                  </p>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EngagezVousSection;
