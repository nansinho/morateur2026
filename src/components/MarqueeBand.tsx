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
    <div className="bg-primary py-5 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap gap-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-primary-foreground/90 font-heading font-extrabold text-base md:text-lg flex-shrink-0 flex items-center gap-2.5 uppercase tracking-wider"
          >
            <item.Icon className="w-4 h-4 text-campaign-green" />
            {item.text}
            <span className="mx-4 text-primary-foreground/15">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeBand;
