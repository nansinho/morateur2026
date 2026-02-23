import { Facebook, Instagram, Twitter, Heart, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/morateur2026/", label: "Instagram", color: "bg-gradient-to-br from-purple-500 to-pink-500", emoji: "📸" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61571627498498", label: "Facebook", color: "bg-[hsl(220,46%,48%)]", emoji: "👍" },
  { icon: Twitter, href: "#", label: "Twitter", color: "bg-campaign-sky", emoji: "🐦" },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-primary">
      {/* Social banner */}
      <div className="border-b border-primary-foreground/[0.06]">
        <div className="container mx-auto px-6 py-12 text-center">
          <motion.span
            className="inline-block text-4xl mb-4"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            📱
          </motion.span>
          <p className="text-primary-foreground font-heading font-extrabold text-2xl mb-8">
            Suivez la <span className="text-campaign-green">campagne</span> !
          </p>
          <div className="flex items-center justify-center gap-5">
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-16 h-16 rounded-2xl ${s.color} flex items-center justify-center text-white shadow-xl`}
                aria-label={s.label}
                whileHover={{ scale: 1.15, rotate: 5, y: -4 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <s.icon className="w-7 h-7" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="text-primary-foreground py-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-heading text-2xl font-extrabold">
                Morateur <span className="text-campaign-green">20</span><span className="text-campaign-gold">26</span> 🌿
              </p>
              <p className="text-primary-foreground/30 text-sm mt-1 font-medium">Bouc Bel Air a de l'Avenir</p>
            </div>

            <motion.button
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-campaign-green/20 flex items-center justify-center hover:bg-campaign-green transition-all duration-300"
              whileHover={{ y: -4, scale: 1.1 }}
            >
              <ArrowUp className="w-5 h-5 text-campaign-green" />
            </motion.button>
          </div>

          <div className="border-t border-primary-foreground/[0.06] mt-6 pt-4 text-center">
            <p className="text-primary-foreground/25 text-xs flex items-center justify-center gap-1.5 font-medium">
              © 2026 Morateur 2026 — Fait avec <Heart className="w-3 h-3 text-campaign-green" /> pour Bouc-Bel-Air
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
