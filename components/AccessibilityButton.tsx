'use client'

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const UniversalAccessIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Head */}
    <circle cx="12" cy="4.5" r="2" />
    {/* Arms spread open */}
    <path d="M4 10h16" />
    {/* Body */}
    <path d="M12 10v5" />
    {/* Legs spread */}
    <path d="M12 15l-4 6" />
    <path d="M12 15l4 6" />
  </svg>
);

const AccessibilityButton = () => {
  const router = useRouter();

  return (
    <motion.button
      onClick={() => {
        router.push("/accessibilite");
        window.scrollTo({ top: 0 });
      }}
      aria-label="Accessibilité — notre engagement pour tous"
      className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-white shadow-lg shadow-black/20 flex items-center justify-center text-primary hover:bg-campaign-lime hover:text-accent-foreground active:scale-90 transition-all duration-200 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
    >
      <UniversalAccessIcon className="w-6 h-6" />
    </motion.button>
  );
};

export default AccessibilityButton;
