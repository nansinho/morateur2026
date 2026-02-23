import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Le Candidat", href: "#candidat" },
  { label: "Programme", href: "#programme" },
  { label: "L'Équipe", href: "#equipe" },
  { label: "Procuration", href: "#procuration" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-primary/90 backdrop-blur-2xl shadow-2xl shadow-primary/20 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.button
          onClick={() => scrollTo("#hero")}
          className="text-primary-foreground font-heading text-lg font-bold tracking-wide"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Morateur <span className="text-gradient">2026</span>
        </motion.button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item, i) => (
            <motion.button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-primary-foreground/60 hover:text-primary-foreground text-[13px] font-medium tracking-wide uppercase transition-colors duration-300 relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] gradient-green group-hover:w-full transition-all duration-300" />
            </motion.button>
          ))}
          <motion.button
            onClick={() => scrollTo("#procuration")}
            className="gradient-green text-primary-foreground px-6 py-2.5 rounded-full text-[13px] font-semibold tracking-wide shadow-lg shadow-campaign-green/20 hover:shadow-xl hover:shadow-campaign-green/30 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Rejoignez-nous
          </motion.button>
        </div>

        {/* Mobile toggle */}
        <motion.button
          className="md:hidden text-primary-foreground"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-primary/98 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 flex flex-col gap-4">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="text-primary-foreground/70 hover:text-primary-foreground text-left text-sm font-medium uppercase tracking-wide"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => scrollTo("#procuration")}
                className="gradient-green text-primary-foreground py-3 rounded-full text-sm font-semibold mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Rejoignez-nous
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
