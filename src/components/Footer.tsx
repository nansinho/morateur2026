import { Facebook, Instagram, Twitter, Heart, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/morateur2026/", label: "Instagram", color: "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61571627498498", label: "Facebook", color: "hover:bg-[hsl(220,46%,48%)]" },
  { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-campaign-sky" },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-primary">
      {/* Social banner */}
      <div className="border-b border-primary-foreground/[0.06]">
        <div className="container mx-auto px-6 py-10 text-center">
          <p className="text-primary-foreground/40 text-sm uppercase tracking-[0.2em] font-semibold mb-6">
            Suivez la campagne
          </p>
          <div className="flex items-center justify-center gap-4">
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-14 h-14 rounded-2xl border border-primary-foreground/[0.08] flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground hover:border-transparent transition-all duration-300 ${s.color}`}
                aria-label={s.label}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <s.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="text-primary-foreground py-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-heading text-2xl font-bold">
                Morateur <span className="text-campaign-green">20</span><span className="text-campaign-gold">26</span>
              </p>
              <p className="text-primary-foreground/25 text-sm mt-1">Bouc Bel Air a de l'Avenir</p>
            </div>

            <motion.button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-primary-foreground/10 flex items-center justify-center hover:border-campaign-green hover:bg-campaign-green/10 transition-all duration-300"
              whileHover={{ y: -3 }}
            >
              <ArrowUp className="w-4 h-4 text-primary-foreground/40" />
            </motion.button>
          </div>

          <div className="border-t border-primary-foreground/[0.06] mt-6 pt-4 text-center">
            <p className="text-primary-foreground/20 text-xs flex items-center justify-center gap-1.5">
              © 2026 Morateur 2026 — Fait avec <Heart className="w-3 h-3 text-campaign-green" /> pour Bouc-Bel-Air
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
