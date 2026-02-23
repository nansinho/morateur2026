import { motion } from "framer-motion";
import { HandHeart, FileText, Instagram, Facebook, Mail, BookOpen, ArrowRight } from "lucide-react";

const actions = [
  { Icon: HandHeart, title: "J'agis sur le terrain", href: "#procuration", external: false },
  { Icon: FileText, title: "Je fais une procuration", href: "https://www.maprocuration.gouv.fr/", external: true },
  { Icon: Instagram, title: "Instagram", href: "https://www.instagram.com/morateur2026/", external: true },
  { Icon: Facebook, title: "Facebook", href: "https://www.facebook.com/profile.php?id=61571627498498", external: true },
  { Icon: Mail, title: "Newsletter", href: "#procuration", external: false },
  { Icon: BookOpen, title: "Le programme", href: "/programme", external: false },
];

const EngagezVousSection = () => {
  return (
    <section className="gradient-lime py-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2
            className="font-accent font-extrabold text-accent-foreground leading-[0.9] uppercase tracking-tight break-words mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            REJOIGNEZ <span className="text-primary">LA CAMPAGNE</span>
          </h2>
          <p className="text-accent-foreground/70 text-lg max-w-xl mx-auto font-medium">
            Chaque geste compte. Choisissez comment vous engager à nos côtés.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {actions.map((action, i) => (
            <motion.a
              key={i}
              href={action.href}
              target={action.external ? "_blank" : undefined}
              rel={action.external ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-background text-primary px-6 py-4 rounded-xl font-accent font-bold text-sm uppercase tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors shadow-md"
            >
              <action.Icon className="w-4 h-4" />
              {action.title}
              <ArrowRight className="w-3 h-3 opacity-50" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EngagezVousSection;
