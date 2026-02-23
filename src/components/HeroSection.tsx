import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ChevronRight, ArrowDown, Sparkles } from "lucide-react";
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
  const badgeX = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} id="hero" className="relative h-screen flex items-center overflow-hidden">
      {/* Navy background with premium gradient */}
      <div className="absolute inset-0 gradient-premium" />

      {/* Noise texture */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Floating particles */}
      <motion.div
        className="particle w-[300px] h-[300px] top-[20%] left-[5%]"
        animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="particle w-[200px] h-[200px] bottom-[30%] left-[25%]"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Right side — Photo with diagonal clip */}
      <motion.div
        className="absolute top-0 right-0 w-[65%] h-full hidden lg:block clip-diagonal"
        style={{ scale: imgScale, y: imgY }}
      >
        <img
          src={candidatImg}
          alt="Mathieu Morateur"
          className="w-full h-full object-cover object-top"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-primary/70 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/30 to-transparent" />
      </motion.div>

      {/* Mobile — photo background */}
      <div className="absolute inset-0 lg:hidden">
        <div className="absolute inset-0 clip-diagonal-mobile">
          <img src={candidatImg} alt="Mathieu Morateur" className="w-full h-full object-cover object-top" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/85 to-primary/95" />
      </div>

      {/* Ambient glow orbs */}
      <div className="absolute top-1/3 left-[10%] w-[500px] h-[500px] rounded-full bg-campaign-green/[0.04] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[30%] w-[300px] h-[300px] rounded-full bg-campaign-gold/[0.02] blur-[100px] pointer-events-none" />

      {/* Animated accent line */}
      <motion.div
        className="absolute top-0 left-[42%] w-px h-full hidden lg:block overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className="w-full h-full"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(160 84% 39% / 0.4), transparent)" }}
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Text content */}
      <motion.div className="relative container mx-auto px-6" style={{ y: textY, opacity }}>
        <div className="max-w-2xl">
          <motion.span
            className="inline-flex items-center gap-2.5 text-campaign-green font-semibold text-[11px] uppercase tracking-[0.35em] mb-10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span
              className="flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <motion.span
                className="w-2 h-2 rounded-full gradient-green"
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.span>
            Élections municipales 2026
          </motion.span>

          <div className="overflow-hidden mb-1">
            <motion.h1
              className="text-primary-foreground font-heading text-[clamp(2.5rem,6.5vw,5rem)] font-extrabold leading-[1] tracking-tight"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Bouc Bel Air
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              className="text-gradient font-heading text-[clamp(2.5rem,6.5vw,5rem)] font-extrabold leading-[1] tracking-tight"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              a de l'Avenir
            </motion.h1>
          </div>

          <motion.p
            className="text-primary-foreground/50 text-base sm:text-lg leading-relaxed max-w-md mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Avec <span className="text-primary-foreground font-semibold">Mathieu Morateur</span>, construisons ensemble une commune audacieuse, au cadre de vie préservé.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <motion.button
              onClick={() => navigate("/programme")}
              className="gradient-green text-primary-foreground px-8 py-4 rounded-full font-semibold text-sm flex items-center gap-2 glow-green-sm shimmer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Découvrir le programme
              <ChevronRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => scrollTo("#procuration")}
              className="border border-primary-foreground/20 text-primary-foreground px-8 py-4 rounded-full font-semibold text-sm hover:bg-primary-foreground/10 hover:border-primary-foreground/30 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Rejoignez-nous
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating badges — bottom right over image */}
      <motion.div
        className="absolute bottom-24 right-[10%] hidden lg:flex flex-col gap-3"
        style={{ x: badgeX }}
      >
        <motion.div
          className="glass-card rounded-2xl px-6 py-4"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
          whileHover={{ scale: 1.08, y: -4 }}
        >
          <p className="text-primary-foreground font-heading font-bold text-lg">36 ans</p>
          <p className="text-primary-foreground/50 text-xs">Enfant de Bouc-Bel-Air</p>
        </motion.div>
        <motion.div
          className="glass-card rounded-2xl px-6 py-4"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.7, duration: 0.8, type: "spring" }}
          whileHover={{ scale: 1.08, y: -4 }}
        >
          <p className="text-campaign-green font-heading font-bold text-lg">2014–2020</p>
          <p className="text-primary-foreground/50 text-xs">Adjoint au maire</p>
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
        <span className="text-primary-foreground/30 text-[10px] uppercase tracking-[0.3em] font-medium">Découvrir</span>
        <motion.div
          className="w-6 h-10 rounded-full border border-primary-foreground/20 flex items-start justify-center p-1.5"
        >
          <motion.div
            className="w-1 h-2 rounded-full gradient-green"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
