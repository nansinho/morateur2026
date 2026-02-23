import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Le Candidat", href: "#candidat" },
  { label: "Programme", href: "#programme" },
  { label: "L'Équipe", href: "#equipe" },
  { label: "Procuration", href: "#procuration" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <button onClick={() => scrollTo("#hero")} className="text-primary-foreground font-heading text-lg font-bold tracking-wide">
          Morateur <span className="text-campaign-green">2026</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-primary-foreground/80 hover:text-primary-foreground text-sm font-medium tracking-wide uppercase transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#procuration")}
            className="bg-campaign-green text-primary-foreground px-5 py-2 rounded-sm text-sm font-semibold uppercase tracking-wider hover:brightness-110 transition"
          >
            Rejoignez-nous
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-primary-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-primary overflow-hidden"
          >
            <div className="px-6 pb-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="text-primary-foreground/80 hover:text-primary-foreground text-left text-sm font-medium uppercase tracking-wide"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
