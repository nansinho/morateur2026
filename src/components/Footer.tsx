import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Heart, ArrowUp } from "lucide-react";

const socials = [
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61571627498498", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/morateur2026/", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Smooth transition from previous section */}
      <div className="h-32 bg-gradient-to-b from-primary/0 via-primary/50 to-primary" />

      <div className="bg-primary relative">
        <div className="absolute inset-0 noise-overlay" />

        {/* Ambient breathe glow */}
        <motion.div
          className="absolute bottom-0 left-[20%] w-[300px] h-[300px] bg-campaign-green/[0.04] rounded-full blur-[120px] pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="text-primary-foreground py-20 relative z-10">
          <div className="container mx-auto px-6">
            {/* Back to top */}
            <div className="flex justify-center mb-14">
              <motion.button
                onClick={scrollToTop}
                className="w-14 h-14 rounded-full border border-primary-foreground/10 flex items-center justify-center hover:border-campaign-green/30 hover:bg-campaign-green/10 transition-all duration-300"
                whileHover={{ y: -6, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowUp className="w-5 h-5 text-primary-foreground/50" />
              </motion.button>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="font-heading text-3xl font-bold">
                  Morateur <span className="text-gradient">2026</span>
                </p>
                <p className="text-primary-foreground/40 text-sm mt-2">Bouc Bel Air a de l'Avenir</p>
              </motion.div>

              <div className="flex items-center gap-3">
                {socials.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl glass-card flex items-center justify-center hover:bg-campaign-green/20 hover:border-campaign-green/30 transition-all duration-300"
                    aria-label={s.label}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    // Breathe animation
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 },
                    }}
                  >
                    <s.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="border-t border-primary-foreground/[0.06] mt-12 pt-8 text-center">
              <p className="text-primary-foreground/30 text-xs flex items-center justify-center gap-1.5">
                © 2026 Morateur 2026 — Fait avec <Heart className="w-3 h-3 text-campaign-green" /> pour Bouc-Bel-Air
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
