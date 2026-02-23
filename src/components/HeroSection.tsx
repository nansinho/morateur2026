import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import candidatImg from "@/assets/header_candidat_portrait.png";

const HeroSection = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Fullscreen parallax photo */}
      <motion.div className="absolute inset-0" style={{ scale: imgScale, y: imgY }}>
        <img
          src={candidatImg}
          alt="Mathieu Morateur"
          className="w-full h-full object-cover object-top"
        />
      </motion.div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-transparent to-primary/40" />

      {/* Centered text */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        style={{ y: textY, opacity }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-campaign-lime/20 border border-campaign-lime/40 text-campaign-lime px-5 py-2 rounded-full mb-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="w-2 h-2 rounded-full bg-campaign-lime animate-pulse" />
          <span className="font-accent text-xs font-bold uppercase tracking-widest">Municipales 2026</span>
        </motion.div>

        {/* Line 1 */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            className="font-accent text-primary-foreground font-extrabold uppercase leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
            initial={{ y: "120%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            BOUC BEL AIR
          </motion.h1>
        </div>

        {/* Line 2 */}
        <div className="overflow-hidden mb-12">
          <motion.p
            className="font-accent text-campaign-lime font-extrabold uppercase leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
            initial={{ y: "120%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            A DE L'AVENIR
          </motion.p>
        </div>

        {/* Subtitle */}
        <motion.p
          className="text-primary-foreground/70 text-lg sm:text-xl leading-relaxed max-w-lg mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          Avec <span className="text-primary-foreground font-bold">Mathieu Morateur</span>, construisons ensemble une commune où il fait bon vivre.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.button
            onClick={() => navigate("/programme")}
            className="gradient-lime text-accent-foreground px-8 py-4 rounded-xl font-bold text-sm flex items-center gap-3 shadow-2xl uppercase tracking-wide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Découvrir le programme
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.button
            onClick={() => scrollTo("#procuration")}
            className="bg-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wide hover:bg-primary-foreground/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Rejoignez-nous
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={() => scrollTo("#candidat")}
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div
          className="w-12 h-12 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 flex items-center justify-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-primary-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
