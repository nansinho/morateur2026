'use client'

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import AnnouncementBanner from "@/components/AnnouncementBanner";

const JoinPopup = dynamic(() => import("@/components/JoinPopup"));

const navItems = [
  { label: "Le Candidat", to: "/candidat" },
  { label: "Programme", to: "/programme" },
  { label: "Quartiers", to: "/quartiers" },
  { label: "L'Équipe", to: "/equipe" },
  { label: "Actualités", to: "/actualites" },
  { label: "Presse", to: "/presse" },
];

interface NavbarProps {
  onJoinClick?: () => void;
}

const Navbar = ({ onJoinClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  const handleJoinClick = useCallback(() => {
    if (onJoinClick) {
      onJoinClick();
    } else {
      setJoinOpen(true);
    }
  }, [onJoinClick]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
    <motion.nav
      aria-label="Navigation principale"
      className={`transition-all duration-300 bg-primary py-4 ${
        isScrolled
          ? "md:bg-background md:backdrop-blur-xl md:shadow-lg md:shadow-foreground/5 md:py-3"
          : "md:py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.location.href = '/';
            }
          }}
          className={`font-accent text-base font-extrabold tracking-widest uppercase transition-colors text-primary-foreground ${
            isScrolled ? "md:text-primary" : ""
          }`}
        >
          MORATEUR <span className="text-campaign-lime">2026</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className={`relative text-[13px] font-semibold tracking-wide uppercase transition-all duration-200 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:transition-all after:duration-200 hover:after:w-full after:bg-campaign-lime ${
                isScrolled
                  ? "text-foreground/60 hover:text-foreground"
                  : "text-primary-foreground/70 hover:text-primary-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleJoinClick}
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
            className="md:hidden fixed inset-0 top-0 z-50 gradient-teal-deep flex flex-col"
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-6 py-5">
              <Link
                href="/"
                onClick={(e) => {
                  setIsOpen(false);
                  if (pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    window.location.href = '/';
                  }
                }}
                className="font-accent text-base font-extrabold tracking-widest uppercase text-primary-foreground"
              >
                MORATEUR <span className="text-campaign-lime">2026</span>
              </Link>
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
              {navItems.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <Link
                    href={item.to}
                    onClick={() => setIsOpen(false)}
                    className="block text-primary-foreground/80 hover:text-campaign-lime text-3xl font-accent font-extrabold uppercase tracking-wide py-3 border-b border-primary-foreground/10 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom actions */}
            <div className="px-8 pb-10 flex flex-col gap-5">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={() => { setIsOpen(false); handleJoinClick(); }}
                  className="block w-full text-center gradient-lime text-accent-foreground py-4 rounded-2xl text-base font-extrabold uppercase tracking-wider shadow-lg"
                >
                  Rejoignez-nous
                </button>
              </motion.div>
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
    <AnnouncementBanner />
    {!onJoinClick && <JoinPopup isOpen={joinOpen} onClose={() => setJoinOpen(false)} />}
    </header>
  );
};

export default Navbar;
