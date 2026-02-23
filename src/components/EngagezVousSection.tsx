import { motion } from "framer-motion";
import { HandHeart, FileText, Instagram, Facebook, Mail, BookOpen } from "lucide-react";

const actions = [
  {
    icon: HandHeart,
    title: "J'agis sur le terrain",
    desc: "Rejoignez nos équipes de bénévoles !",
    bg: "bg-primary",
    textColor: "text-primary-foreground",
    descColor: "text-primary-foreground/60",
    emoji: "💪",
    href: "#procuration",
    rotate: -2,
  },
  {
    icon: FileText,
    title: "Je fais une procuration",
    desc: "Confiez votre voix à un proche.",
    bg: "bg-campaign-gold",
    textColor: "text-primary",
    descColor: "text-primary/70",
    emoji: "📝",
    href: "https://www.maprocuration.gouv.fr/",
    external: true,
    rotate: 1,
  },
  {
    icon: Instagram,
    title: "Sur Instagram",
    desc: "Les coulisses de la campagne !",
    bg: "bg-gradient-to-br from-purple-500 to-pink-500",
    textColor: "text-white",
    descColor: "text-white/80",
    emoji: "📸",
    href: "https://www.instagram.com/morateur2026/",
    external: true,
    rotate: -1,
  },
  {
    icon: Facebook,
    title: "Sur Facebook",
    desc: "Rejoignez la communauté !",
    bg: "bg-[hsl(220,46%,48%)]",
    textColor: "text-white",
    descColor: "text-white/80",
    emoji: "👍",
    href: "https://www.facebook.com/profile.php?id=61571627498498",
    external: true,
    rotate: 2,
  },
  {
    icon: Mail,
    title: "Newsletter",
    desc: "Toutes les infos dans votre boîte mail.",
    bg: "bg-campaign-green",
    textColor: "text-primary-foreground",
    descColor: "text-primary-foreground/70",
    emoji: "✉️",
    href: "#procuration",
    rotate: -1,
  },
  {
    icon: BookOpen,
    title: "Le programme",
    desc: "Nos 3 piliers pour l'avenir.",
    bg: "bg-campaign-coral",
    textColor: "text-primary-foreground",
    descColor: "text-primary-foreground/70",
    emoji: "📖",
    href: "/programme",
    rotate: 1,
  },
];

const EngagezVousSection = () => {
  return (
    <section className="py-24 bg-campaign-mint/30 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-10 right-10 w-60 h-60 rounded-full bg-campaign-gold/20 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-campaign-green/10 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <motion.span
            className="inline-block text-5xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            🙌
          </motion.span>
          <h2 className="font-heading text-5xl md:text-8xl font-extrabold leading-[1]">
            <span className="text-foreground">Rejoignez </span>
            <br className="hidden md:block" />
            <span className="text-campaign-green">la </span>
            <span className="text-campaign-gold">cam</span>
            <span className="text-campaign-coral">pagne</span>
            <span className="text-foreground"> !</span>
          </h2>
          <p className="text-muted-foreground text-lg mt-6 max-w-xl mx-auto font-medium">
            Chaque geste compte. Choisissez comment vous engager à nos côtés 👇
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {actions.map((action, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: action.rotate }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5, type: "spring" }}
            >
              <motion.a
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                className={`block rounded-3xl p-8 ${action.bg} transition-all duration-300 shadow-xl h-full`}
                whileHover={{ scale: 1.06, rotate: 0, y: -6 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-4xl mb-4 block">{action.emoji}</span>
                <h3 className={`font-heading font-extrabold text-xl mb-2 ${action.textColor}`}>
                  {action.title}
                </h3>
                <p className={`text-sm leading-relaxed font-medium ${action.descColor}`}>
                  {action.desc}
                </p>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngagezVousSection;
