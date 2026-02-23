import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import candidatImg from "@/assets/header_candidat_portrait.png";

const HeroSection = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.12]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center overflow-hidden gradient-premium">
      {/* Right: Full-height photo */}
      <motion.div
        className="absolute top-0 right-0 w-[50%] h-full hidden lg:block"
        style={{ scale: imgScale, y: imgY }}
      >
        <img src={candidatImg} alt="Mathieu Morateur" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-primary to-transparent" />
      </motion.div>

      {/* Mobile photo */}
      <div className="absolute inset-0 lg:hidden">
        <img src={candidatImg} alt="Mathieu Morateur" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/80 to-primary" />
      </div>

      {/* Left: Text */}
      <motion.div className="relative container mx-auto px-6 py-32 lg:py-0" style={{ opacity }}>
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-campaign-green/15 border border-campaign-green/20 text-campaign-green px-4 py-1.5 rounded-lg mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-campaign-green animate-pulse" />
            <span className="font-accent text-xs font-bold uppercase tracking-widest">Municipales 2026</span>
          </motion.div>

          {/* Title */}
          <div className="mb-3">
            <div className="overflow-hidden">
              <motion.h1
                className="font-heading text-primary-foreground text-[clamp(3rem,9vw,7rem)] font-extrabold leading-[0.9] tracking-tight"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                Bouc Bel Air
              </motion.h1>
            </div>
          </div>

          <div className="mb-10">
            <div className="overflow-hidden">
              <motion.p
                className="text-[clamp(2rem,6vw,4.5rem)] font-extrabold leading-[1] tracking-tight"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-gradient">a de </span>
                <span className="text-gradient-gold">l'Avenir</span>
              </motion.p>
            </div>
          </div>

          <motion.p
            className="text-primary-foreground/60 text-lg sm:text-xl leading-relaxed max-w-md mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Avec <span className="text-primary-foreground font-bold">Mathieu Morateur</span>, construisons ensemble une commune où il fait bon vivre.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <motion.button
              onClick={() => navigate("/programme")}
              className="gradient-green text-primary-foreground px-7 py-3.5 rounded-lg font-bold text-sm flex items-center gap-3 shadow-xl"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Découvrir le programme
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => scrollTo("#procuration")}
              className="bg-campaign-gold text-primary px-7 py-3.5 rounded-lg font-bold text-sm shadow-xl"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Rejoignez-nous
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollTo("#candidat")}
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.div
          className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-primary-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
