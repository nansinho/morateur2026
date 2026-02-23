import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Le Candidat", to: "/#candidat" },
  { label: "Programme", to: "/programme" },
  { label: "L'Équipe", to: "/equipe" },
  { label: "Actualités", to: "/actualites" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleNav = (to: string) => {
    setIsOpen(false);
    if (to.startsWith("/#")) {
      const hash = to.slice(1); // e.g. "#candidat"
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
    <motion.nav
      aria-label="Navigation principale"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl shadow-lg shadow-foreground/5 py-3"
          : "bg-primary py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <button
          onClick={() => handleNav("/#hero")}
          className={`font-accent text-base font-extrabold tracking-widest uppercase transition-colors ${
            isScrolled ? "text-primary" : "text-primary-foreground"
          }`}
        >
          MORATEUR <span className="text-campaign-lime">2026</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.to}
              onClick={() => handleNav(item.to)}
              className={`text-[13px] font-semibold tracking-wide uppercase transition-colors duration-300 ${
                isScrolled
                  ? "text-foreground/60 hover:text-foreground"
                  : "text-primary-foreground/70 hover:text-primary-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("/#procuration")}
            className="gradient-lime text-accent-foreground px-6 py-2.5 rounded-xl text-[13px] font-extrabold tracking-wide shadow-md -rotate-1 hover:rotate-0 hover:shadow-[0_10px_30px_-8px_hsl(var(--campaign-lime)/0.5)] hover:scale-105 transition-all duration-300"
          >
            Rejoignez-nous
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden ${isScrolled ? "text-foreground" : "text-primary-foreground"}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Menu de navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`md:hidden overflow-hidden ${isScrolled ? "bg-background/98" : "bg-primary/98"} backdrop-blur-xl`}
          >
            <div className="px-6 pb-6 pt-2 flex flex-col gap-4">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.to}
                  onClick={() => handleNav(item.to)}
                  className={`text-left text-sm font-semibold uppercase tracking-wide ${
                    isScrolled ? "text-foreground/70 hover:text-foreground" : "text-primary-foreground/70 hover:text-primary-foreground"
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.label}
                </motion.button>
              ))}
              <button
                onClick={() => handleNav("/#procuration")}
                className="gradient-lime text-accent-foreground py-3 rounded-xl text-sm font-extrabold mt-2 -rotate-1"
              >
                Rejoignez-nous
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
