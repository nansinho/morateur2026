import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Heart } from "lucide-react";

const socials = [
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61571627498498", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/morateur2026/", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

const Footer = () => (
  <footer className="relative overflow-hidden">
    {/* Top wave separator */}
    <div className="bg-background">
      <svg viewBox="0 0 1440 60" className="w-full text-primary fill-current">
        <path d="M0,60 L0,30 Q360,0 720,30 Q1080,60 1440,30 L1440,60 Z" />
      </svg>
    </div>

    <div className="gradient-navy text-primary-foreground py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-heading text-2xl font-bold">
              Morateur <span className="text-gradient">2026</span>
            </p>
            <p className="text-primary-foreground/40 text-sm mt-1">
              Bouc Bel Air a de l'Avenir
            </p>
          </motion.div>

          <div className="flex items-center gap-3">
            {socials.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-campaign-green/20 transition-all duration-300"
                aria-label={s.label}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <s.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center">
          <p className="text-primary-foreground/30 text-xs flex items-center justify-center gap-1">
            © 2026 Morateur 2026 — Fait avec <Heart className="w-3 h-3 text-campaign-green" /> pour Bouc-Bel-Air
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
