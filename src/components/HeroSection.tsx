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
  const imgScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.2]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const badgeX = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} id="hero" className="relative h-screen flex items-center overflow-hidden">
      {/* Left side — Navy background */}
      <div className="absolute inset-0 bg-primary" />

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
        {/* Very subtle bottom shadow for depth */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary/50 to-transparent" />
      </motion.div>

      {/* Mobile — photo background */}
      <div className="absolute inset-0 lg:hidden">
        <div className="absolute inset-0 clip-diagonal-mobile">
          <img src={candidatImg} alt="Mathieu Morateur" className="w-full h-full object-cover object-top" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/85 to-primary/95" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated accent line */}
      <motion.div
        className="absolute top-0 left-[42%] w-px h-full bg-gradient-to-b from-transparent via-campaign-green/30 to-transparent hidden lg:block"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Text content */}
      <motion.div className="relative container mx-auto px-6" style={{ y: textY, opacity }}>
        <div className="max-w-lg">
          <motion.span
            className="inline-flex items-center gap-2.5 text-campaign-green font-semibold text-[11px] uppercase tracking-[0.35em] mb-10"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full gradient-green"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Élections municipales 2026
          </motion.span>

          <div className="overflow-hidden mb-1">
            <motion.h1
              className="text-primary-foreground font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold leading-[0.95] tracking-tight"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Bouc Bel Air
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              className="text-gradient font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold leading-[0.95] tracking-tight"
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
              className="gradient-green text-primary-foreground px-8 py-4 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg shadow-campaign-green/20 hover:shadow-xl hover:shadow-campaign-green/30 transition-shadow duration-500"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Découvrir le programme
              <ChevronRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => scrollTo("#procuration")}
              className="border border-primary-foreground/20 text-primary-foreground px-8 py-4 rounded-full font-semibold text-sm hover:bg-primary-foreground/10 transition-all duration-300"
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
          className="glass-dark rounded-2xl px-6 py-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-primary-foreground font-heading font-bold text-lg">36 ans</p>
          <p className="text-primary-foreground/50 text-xs">Enfant de Bouc-Bel-Air</p>
        </motion.div>
        <motion.div
          className="glass-dark rounded-2xl px-6 py-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
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
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-4 h-4 text-primary-foreground/30" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
