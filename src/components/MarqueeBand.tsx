import { motion } from "framer-motion";
import { Leaf, ShieldCheck, GraduationCap, Store, TreePine, Users, Heart, Home } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const items: { text: string; Icon: LucideIcon }[] = [
  { text: "Cadre de vie préservé", Icon: Leaf },
  { text: "Stop aux promoteurs", Icon: ShieldCheck },
  { text: "Écoles rénovées", Icon: GraduationCap },
  { text: "Commerces de proximité", Icon: Store },
  { text: "Espaces verts", Icon: TreePine },
  { text: "Ensemble pour Bouc-Bel-Air", Icon: Users },
  { text: "Morateur 2026", Icon: Heart },
  { text: "Notre village, notre avenir", Icon: Home },
];

const MarqueeBand = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Band 1 — Green to Gold gradient */}
      <div className="gradient-marquee py-4 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-12"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="text-primary-foreground font-heading font-extrabold text-lg md:text-xl flex-shrink-0 flex items-center gap-2.5 uppercase tracking-wide"
            >
              <item.Icon className="w-5 h-5 text-primary-foreground/70" />
              {item.text}
              <span className="mx-4 text-primary-foreground/20">|</span>
            </span>
          ))}
        </motion.div>
      </div>
      {/* Band 2 — Navy, reverse scroll */}
      <div className="bg-primary py-3 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap gap-12"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="text-primary-foreground/40 font-heading font-bold text-sm flex-shrink-0 flex items-center gap-2 uppercase tracking-widest"
            >
              {item.text}
              <span className="mx-3 text-primary-foreground/10">—</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MarqueeBand;