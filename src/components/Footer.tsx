import { Facebook, Instagram, ArrowUp, ArrowRight, Heart } from "lucide-react";
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
    <>
      <footer className="relative bg-[#0B162C] overflow-hidden">
        {/* Top lime border */}
        <div className="h-1 w-full gradient-lime" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-campaign-lime/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-campaign-lime/[0.03] rounded-full blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        {/* CTA Section */}
        <div className="container mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-16 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="font-accent font-extrabold text-white uppercase tracking-tight leading-[0.85] mb-6"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              Bouc Bel Air a<br />
              de l'<span className="text-campaign-lime">Avenir</span>
            </h2>
            <p className="text-white/70 text-lg max-w-md mx-auto mb-8 font-medium">
              Ensemble, construisons la ville de demain. Chaque voix compte.
            </p>
            <motion.button
              onClick={() => handleNav("/#procuration")}
              className="inline-flex items-center gap-3 gradient-lime text-accent-foreground px-10 py-4 rounded-2xl font-extrabold uppercase tracking-wider text-sm shadow-lg -rotate-2 hover:rotate-0 hover:shadow-[0_20px_50px_-10px_hsl(70_80%_43%/0.5)] transition-all duration-300"
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.94, rotate: -4 }}
            >
              Rejoignez-nous
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Separator */}
        <div className="container mx-auto px-4 sm:px-6">
          <div className="border-t border-white/[0.15]" />
        </div>

        {/* Main grid */}
        <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-16">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Logo */}
            <div>
              <p className="font-accent text-2xl font-extrabold text-white uppercase tracking-widest mb-2">
                MORATEUR <span className="text-campaign-lime">2026</span>
              </p>
              <p className="text-white/50 text-sm font-medium mb-4">Bouc Bel Air a de l'Avenir</p>
              <div className="w-12 h-1 rounded-full bg-campaign-lime/40" />
            </div>

            {/* Nav */}
            <nav aria-label="Navigation secondaire" className="flex flex-col gap-3">
              <p className="font-accent font-bold text-xs uppercase tracking-[0.2em] text-campaign-lime mb-1">Navigation</p>
              {navLinks.map((link, i) => (
                <button
                  key={i}
                  onClick={() => handleNav(link.to)}
                  className="group text-left text-white/70 hover:text-campaign-lime transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-campaign-lime transition-all duration-300" />
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
                    className="group flex items-center gap-3 text-white/70 hover:text-campaign-lime transition-colors text-sm font-medium"
                  >
                    <div className="w-10 h-10 rounded-xl border border-white/20 group-hover:border-campaign-lime/40 group-hover:bg-campaign-lime/10 flex items-center justify-center transition-all duration-300">
                      <s.icon className="w-4 h-4" />
                    </div>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/[0.15] pt-6 flex items-center justify-between">
            <p className="text-white/50 text-xs flex items-center gap-1.5 font-medium">
              © 2026 Morateur 2026 — Fait avec <Heart className="w-3 h-3 text-campaign-lime" /> pour Bouc-Bel-Air
            </p>
            <motion.button
              onClick={scrollToTop}
              aria-label="Retour en haut de page"
              className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center hover:border-campaign-lime/30 hover:bg-campaign-lime/10 transition-all"
              whileHover={{ y: -3 }}
            >
              <ArrowUp className="w-4 h-4 text-white/50" />
            </motion.button>
          </div>
        </div>
      </footer>

      {/* SEO Block */}
      <section className="bg-[#060E1E] py-8 sm:py-10">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-white/30 text-[10px] uppercase tracking-[0.25em] font-bold mb-4">
            À propos de Bouc-Bel-Air et des élections municipales 2026
          </p>
          <div className="space-y-3 text-white/20 text-xs leading-relaxed max-w-4xl">
            <p>
              Bouc-Bel-Air est une commune française située dans le département des Bouches-du-Rhône, en région Provence-Alpes-Côte d'Azur.
              Nichée entre Aix-en-Provence et Marseille, cette ville provençale d'environ 15 000 habitants allie cadre de vie naturel
              préservé et proximité des grands pôles urbains métropolitains.
            </p>
            <p>
              Les élections municipales 2026 à Bouc-Bel-Air représentent un moment démocratique majeur pour l'avenir de la commune.
              Mathieu Morateur, candidat à la mairie, porte un projet ambitieux articulé autour de la préservation du village,
              de la lutte contre l'urbanisation excessive, du renforcement des infrastructures scolaires et sportives,
              et de la transition écologique du territoire.
            </p>
            <p>
              Le programme municipal couvre les enjeux essentiels : urbanisme maîtrisé, protection de l'environnement et des espaces naturels,
              amélioration des écoles et des équipements publics, sécurité, mobilité douce, vie associative
              et dynamisme économique local. Bouc-Bel-Air a de l'Avenir avec une équipe engagée et à l'écoute des habitants.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
