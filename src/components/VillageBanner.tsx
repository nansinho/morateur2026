import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import villageBanner from "@/assets/projet-banner.png";

const VillageBanner = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);

  return (
    <div ref={ref} className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: imgY, scale }}>
        <img src={villageBanner} alt="Vue du village de Bouc-Bel-Air" className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3
              className="font-accent font-extrabold text-primary-foreground leading-[0.9] uppercase tracking-tight break-words"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              Notre <span className="text-campaign-lime">village</span>,
              <br />
              notre <span className="text-gradient-lime">avenir</span>
            </h3>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VillageBanner;
