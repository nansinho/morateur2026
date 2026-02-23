import { motion } from "framer-motion";

const items = [
  "🌿 Cadre de vie préservé",
  "🏠 Stop aux promoteurs",
  "🎓 Écoles rénovées",
  "🛍️ Commerces de proximité",
  "🌳 Espaces verts",
  "🤝 Ensemble pour Bouc-Bel-Air",
  "💚 Morateur 2026",
  "🏡 Notre village, notre avenir",
];

const MarqueeBand = () => {
  return (
    <div className="bg-campaign-green py-4 overflow-hidden relative">
      <motion.div
        className="flex whitespace-nowrap gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-primary-foreground font-heading font-bold text-lg md:text-xl flex-shrink-0"
          >
            {item}
            <span className="mx-4 text-primary-foreground/40">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeBand;
