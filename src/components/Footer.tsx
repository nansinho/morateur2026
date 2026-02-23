import { Facebook, Instagram, ArrowUp, Heart } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/morateur2026/", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61571627498498", label: "Facebook" },
];

const navLinks = [
  { label: "Candidat", href: "#candidat" },
  { label: "Programme", href: "#programme" },
  { label: "Actualités", href: "#actualites" },
  { label: "Équipe", href: "#equipe" },
  { label: "Contact", href: "#procuration" },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-primary">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo */}
          <div>
            <p className="font-editorial italic text-3xl text-primary-foreground mb-2">
              Morateur <span className="text-campaign-gold">2026</span>
            </p>
            <p className="text-primary-foreground/30 text-sm font-medium">Bouc Bel Air a de l'Avenir</p>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-3">
            <p className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-primary-foreground/40 mb-1">Navigation</p>
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-primary-foreground/60 hover:text-campaign-green transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div>
            <p className="font-heading font-bold text-xs uppercase tracking-[0.2em] text-primary-foreground/40 mb-4">Suivez-nous</p>
            <div className="flex flex-col gap-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary-foreground/60 hover:text-campaign-green transition-colors text-sm font-medium"
                >
                  <div className="w-9 h-9 rounded-full border border-primary-foreground/10 flex items-center justify-center">
                    <s.icon className="w-4 h-4" />
                  </div>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/[0.06] pt-6 flex items-center justify-between">
          <p className="text-primary-foreground/20 text-xs flex items-center gap-1.5 font-medium">
            © 2026 Morateur 2026 — Fait avec <Heart className="w-3 h-3 text-campaign-green" /> pour Bouc-Bel-Air
          </p>
          <motion.button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-primary-foreground/10 flex items-center justify-center hover:border-campaign-green/30 transition-all"
            whileHover={{ y: -3 }}
          >
            <ArrowUp className="w-4 h-4 text-primary-foreground/40" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;