import { Facebook, Instagram, ArrowUp, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/morateur2026/", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61571627498498", label: "Facebook" },
];

const navLinks = [
  { label: "Candidat", to: "/#candidat" },
  { label: "Programme", to: "/programme" },
  { label: "Actualités", to: "/actualites" },
  { label: "Équipe", to: "/equipe" },
  { label: "Contact", to: "/#procuration" },
];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNav = (to: string) => {
    if (to.startsWith("/#")) {
      const hash = to.slice(1);
      if (location.pathname === "/") {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      navigate(to);
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <footer className="gradient-teal-deep">
      <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo */}
          <div>
            <p className="font-accent text-xl font-extrabold text-primary-foreground uppercase tracking-widest mb-2">
              MORATEUR <span className="text-campaign-lime">2026</span>
            </p>
            <p className="text-primary-foreground/30 text-sm font-medium">Bouc Bel Air a de l'Avenir</p>
          </div>

          {/* Nav */}
          <nav aria-label="Navigation secondaire" className="flex flex-col gap-3">
            <p className="font-accent font-bold text-xs uppercase tracking-[0.2em] text-campaign-lime mb-1">Navigation</p>
            {navLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => handleNav(link.to)}
                className="text-left text-primary-foreground/60 hover:text-campaign-lime transition-colors text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Socials */}
          <div>
            <p className="font-accent font-bold text-xs uppercase tracking-[0.2em] text-campaign-lime mb-4">Suivez-nous</p>
            <div className="flex flex-col gap-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary-foreground/60 hover:text-campaign-lime transition-colors text-sm font-medium"
                >
                  <div className="w-9 h-9 rounded-xl border border-primary-foreground/10 hover:border-campaign-lime/30 flex items-center justify-center transition-colors">
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
            © 2026 Morateur 2026 — Fait avec <Heart className="w-3 h-3 text-campaign-lime" /> pour Bouc-Bel-Air
          </p>
          <motion.button
            onClick={scrollToTop}
            aria-label="Retour en haut de page"
            className="w-10 h-10 rounded-xl border border-primary-foreground/10 flex items-center justify-center hover:border-campaign-lime/30 transition-all"
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
