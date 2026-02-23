import { Facebook, Instagram, Twitter, Heart, ArrowUp } from "lucide-react";

const socials = [
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61571627498498", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/morateur2026/", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-primary">
      <div className="text-primary-foreground py-12 relative z-10">
        <div className="container mx-auto px-6">
          {/* Back to top */}
          <div className="flex justify-center mb-8">
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-primary-foreground/10 flex items-center justify-center hover:border-primary-foreground/20 hover:bg-primary-foreground/5 transition-all duration-300"
            >
              <ArrowUp className="w-4 h-4 text-primary-foreground/30" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-heading text-2xl font-bold">
                Morateur <span className="text-campaign-green">2026</span>
              </p>
              <p className="text-primary-foreground/25 text-sm mt-1">Bouc Bel Air a de l'Avenir</p>
            </div>

            <div className="flex items-center gap-2">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-primary-foreground/[0.06] flex items-center justify-center hover:bg-primary-foreground/5 hover:border-primary-foreground/10 transition-all duration-300"
                  aria-label={s.label}
                >
                  <s.icon className="w-4 h-4 text-primary-foreground/40" />
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-primary-foreground/[0.06] mt-8 pt-5 text-center">
            <p className="text-primary-foreground/20 text-xs flex items-center justify-center gap-1.5">
              © 2026 Morateur 2026 — Fait avec <Heart className="w-3 h-3 text-campaign-green/60" /> pour Bouc-Bel-Air
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
