'use client'

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
    <div className="gradient-lime py-4 overflow-hidden" role="marquee" aria-label="Messages clés de la campagne">
      <div
        className="flex whitespace-nowrap gap-12 animate-marquee"
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-accent-foreground font-accent font-extrabold text-sm md:text-base flex-shrink-0 flex items-center gap-2.5 uppercase tracking-wider"
          >
            <item.Icon className="w-4 h-4" />
            {item.text}
            <span className="mx-4 text-accent-foreground/30">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBand;
