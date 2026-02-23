import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import candidatImg from "@/assets/header_candidat_portrait.png";

const rotatingWords = [
  { word: "SÉCURISÉE", color: "hsl(var(--campaign-lime))" },
  { word: "PROPRE", color: "hsl(var(--campaign-teal-light))" },
  { word: "APAISÉE", color: "hsl(var(--campaign-ice))" },
  { word: "RESPIRABLE", color: "hsl(var(--campaign-lime-light))" },
  { word: "SÛRE", color: "hsl(var(--campaign-lime))" },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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
          alt="Mathieu Morateur, candidat aux municipales 2026 à Bouc-Bel-Air"
          className="w-full h-full object-cover object-top"
          loading="eager"
          fetchPriority="high"
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
        <motion.span
          className="section-label justify-center mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Municipales 2026
        </motion.span>

        <div className="overflow-hidden mb-0">
          <motion.h1
            className="font-accent text-primary-foreground font-extrabold uppercase leading-[0.85] tracking-tight"
            style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
            initial={{ y: "120%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            BOUC BEL AIR
          </motion.h1>
        </div>

        <motion.span
          className="inline-block font-accent font-extrabold uppercase text-primary text-base sm:text-xl md:text-2xl tracking-[0.3em] px-5 py-1 bg-campaign-lime rounded-md my-2 shadow-lg"
          style={{ rotate: "-2deg" }}
          initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          SERA
        </motion.span>

        <div className="mb-6" style={{ height: "clamp(5rem, 12vw, 10rem)", overflow: "visible" }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={rotatingWords[wordIndex].word}
              className="font-accent font-extrabold uppercase tracking-tight"
              style={{
                fontSize: "clamp(3rem, 9vw, 7rem)",
                color: rotatingWords[wordIndex].color,
                lineHeight: 1.15,
              }}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {rotatingWords[wordIndex].word}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.p
          className="text-primary-foreground/70 text-lg sm:text-xl leading-relaxed max-w-lg mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          Avec <span className="text-primary-foreground font-bold">Mathieu Morateur</span>, construisons ensemble une commune où il fait bon vivre.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <button
            onClick={() => navigate("/programme")}
            className="gradient-lime text-accent-foreground px-6 py-4 sm:px-10 sm:py-5 rounded-2xl font-extrabold text-base flex items-center gap-3 shadow-2xl uppercase tracking-wide -rotate-2 hover:rotate-0 hover:scale-105 hover:shadow-[0_20px_50px_-10px_hsl(var(--campaign-lime)/0.5)] transition-all duration-300"
          >
            Découvrir le programme
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollTo("#procuration")}
            className="bg-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/30 text-primary-foreground px-6 py-4 sm:px-10 sm:py-5 rounded-2xl font-extrabold text-base uppercase tracking-wide hover:bg-primary-foreground/20 rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-300"
          >
            Rejoignez-nous
          </button>
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
