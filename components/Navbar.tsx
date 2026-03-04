'use client'

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { scrollToHash } from "@/lib/scroll-to-hash";

const navItems = [
  { label: "Le Candidat", to: "/candidat" },
  { label: "Programme", to: "/programme" },
  { label: "Quartiers", to: "/quartiers" },
  { label: "L'Équipe", to: "/equipe" },
  { label: "Actualités", to: "/actualites" },
  { label: "Presse", to: "/presse" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const router = useRouter();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleNav = (to: string) => {
    setIsOpen(false);
    if (to.startsWith("/#")) {
      const hash = to.slice(1);
      if (pathname === "/") {
        scrollToHash(hash);
      } else {
        router.push("/");
        setTimeout(() => scrollToHash(hash), 500);
      }
    } else {
      router.push(to);
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <motion.nav
      aria-label="Navigation principale"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary py-4 ${
        isScrolled
          ? "md:bg-background md:backdrop-blur-xl md:shadow-lg md:shadow-foreground/5 md:py-3"
          : "md:py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <button
          onClick={() => handleNav("/#hero")}
          className={`font-accent text-base font-extrabold tracking-widest uppercase transition-colors text-primary-foreground ${
            isScrolled ? "md:text-primary" : ""
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
              className={`relative text-[13px] font-semibold tracking-wide uppercase transition-all duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:transition-all after:duration-200 hover:after:w-full after:bg-campaign-lime ${
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
            className="gradient-lime text-accent-foreground px-6 py-2.5 rounded-xl text-[13px] font-extrabold tracking-wide shadow-md -rotate-1 hover:rotate-0 hover:shadow-[0_10px_30px_-8px_hsl(var(--campaign-lime)/0.5)] hover:scale-105 transition-all duration-200"
          >
            Rejoignez-nous
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary-foreground"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-0 z-40 gradient-teal-deep flex flex-col"
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-6 py-5">
              <button
                onClick={() => handleNav("/#hero")}
                className="font-accent text-base font-extrabold tracking-widest uppercase text-primary-foreground"
              >
                MORATEUR <span className="text-campaign-lime">2026</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Fermer le menu"
                className="text-primary-foreground"
              >
                <X size={28} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {[
                ...navItems,
                { label: "Contact", to: "/#procuration" },
              ].map((item, i) => (
                <motion.button
                  key={item.to}
                  onClick={() => handleNav(item.to)}
                  className="text-left text-primary-foreground/80 hover:text-campaign-lime text-3xl font-accent font-extrabold uppercase tracking-wide py-3 border-b border-primary-foreground/10 transition-colors duration-200"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            {/* Bottom actions */}
            <div className="px-8 pb-10 flex flex-col gap-5">
              <motion.button
                onClick={() => handleNav("/#procuration")}
                className="gradient-lime text-accent-foreground py-4 rounded-2xl text-base font-extrabold uppercase tracking-wider shadow-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Rejoignez-nous
              </motion.button>
              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/mathieumorateur/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-campaign-lime transition-colors text-sm font-medium">Instagram</a>
                  <a href="https://www.facebook.com/morateur" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-campaign-lime transition-colors text-sm font-medium">Facebook</a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
