import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ChevronRight, ArrowDown } from "lucide-react";
import candidatImg from "@/assets/header_candidat_portrait.png";

const HeroSection = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.15]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} id="hero" className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 gradient-premium" />

      {/* Right side — Photo */}
      <motion.div
        className="absolute top-0 right-0 w-[65%] h-full hidden lg:block clip-diagonal"
        style={{ scale: imgScale, y: imgY }}
      >
        <img src={candidatImg} alt="Mathieu Morateur" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-primary/70 to-transparent" />
      </motion.div>

      {/* Mobile */}
      <div className="absolute inset-0 lg:hidden">
        <div className="absolute inset-0 clip-diagonal-mobile">
          <img src={candidatImg} alt="Mathieu Morateur" className="w-full h-full object-cover object-top" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/85 to-primary/95" />
      </div>

      {/* Text content */}
      <motion.div className="relative container mx-auto px-6" style={{ y: textY, opacity }}>
        <div className="max-w-2xl">
          <motion.span
            className="inline-block text-campaign-green font-semibold text-xs uppercase tracking-[0.3em] mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Élections municipales 2026
          </motion.span>

          <div className="overflow-hidden mb-1">
            <motion.h1
              className="text-primary-foreground font-heading text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Bouc Bel Air
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-4">
            <motion.h1
              className="font-heading text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-campaign-green">a de </span>
              <span className="text-campaign-gold">l'Avenir</span>
            </motion.h1>
          </div>

          <motion.p
            className="text-primary-foreground/50 text-base sm:text-lg leading-relaxed max-w-md mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Avec <span className="text-primary-foreground font-semibold">Mathieu Morateur</span>, construisons ensemble une commune audacieuse.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <motion.button
              onClick={() => navigate("/programme")}
              className="gradient-green text-primary-foreground px-8 py-4 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg shadow-campaign-green/20"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Découvrir le programme
              <ChevronRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => scrollTo("#procuration")}
              className="border-2 border-campaign-gold/40 text-campaign-gold px-8 py-4 rounded-full font-bold text-sm hover:bg-campaign-gold/10 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Rejoignez-nous
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Info badges */}
      <motion.div
        className="absolute bottom-28 right-[10%] hidden lg:flex flex-col gap-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="bg-campaign-green rounded-xl px-6 py-4"
          whileHover={{ scale: 1.05, rotate: 1 }}
        >
          <p className="text-primary-foreground font-heading font-bold text-lg">36 ans</p>
          <p className="text-primary-foreground/60 text-xs">Enfant de Bouc-Bel-Air</p>
        </motion.div>
        <motion.div
          className="bg-campaign-gold rounded-xl px-6 py-4"
          whileHover={{ scale: 1.05, rotate: -1 }}
        >
          <p className="text-primary font-heading font-bold text-lg">2014–2020</p>
          <p className="text-primary/60 text-xs">Adjoint au maire</p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollTo("#candidat")}
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-primary-foreground/25 text-[10px] uppercase tracking-[0.3em] font-medium">Découvrir</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="w-4 h-4 text-primary-foreground/25" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
