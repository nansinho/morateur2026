import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import candidatImg from "@/assets/candidat-banner.png";

const HeroSection = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const imgX = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} id="hero" className="relative h-screen flex items-center overflow-hidden bg-primary">
      {/* Full-bleed candidate image — right side */}
      <motion.div
        className="absolute top-0 right-0 w-[55%] h-full hidden lg:block"
        style={{ y: imgY, scale: imgScale, x: imgX }}
      >
        <img
          src={candidatImg}
          alt="Mathieu Morateur"
          className="w-full h-full object-cover object-top"
        />
        {/* Gradient overlay left edge for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent" />
        {/* Bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80" />
      </motion.div>

      {/* Mobile background */}
      <div className="absolute inset-0 lg:hidden">
        <img src={candidatImg} alt="Mathieu Morateur" className="w-full h-full object-cover object-top opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/90 to-primary" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-campaign-green/50"
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          />
        ))}
        {/* Large glow behind text */}
        <motion.div
          className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-campaign-green/5 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Text content — left side */}
      <motion.div className="relative container mx-auto px-6" style={{ y: textY, opacity }}>
        <div className="max-w-xl">
          <motion.span
            className="inline-flex items-center gap-2 text-campaign-green font-semibold text-xs uppercase tracking-[0.3em] mb-8 px-4 py-2 rounded-full glass-dark"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full gradient-green"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Élections municipales 2026
          </motion.span>

          <div className="overflow-hidden mb-2">
            <motion.h1
              className="text-primary-foreground font-heading text-6xl md:text-7xl lg:text-[5.5rem] font-black leading-[1]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              Bouc Bel Air
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              className="text-gradient font-heading text-6xl md:text-7xl lg:text-[5.5rem] font-black leading-[1]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              a de l'Avenir
            </motion.h1>
          </div>

          <motion.p
            className="text-primary-foreground/50 text-lg md:text-xl leading-relaxed max-w-md mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Avec <span className="text-primary-foreground font-semibold">Mathieu Morateur</span>, construisons ensemble une commune audacieuse, au cadre de vie préservé.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.button
              onClick={() => navigate("/programme")}
              className="gradient-green text-primary-foreground px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:shadow-xl hover:shadow-campaign-green/25 transition-shadow duration-500"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Découvrir le programme
              <ChevronRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => scrollTo("#procuration")}
              className="glass text-primary-foreground px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Rejoignez-nous
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating info badges — anchored to image */}
      <motion.div
        className="absolute bottom-16 right-[12%] hidden lg:block"
        style={{ y: badgeY }}
      >
        <motion.div
          className="glass rounded-xl px-6 py-4 mb-4"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-primary-foreground font-heading font-bold text-lg">36 ans</p>
          <p className="text-primary-foreground/50 text-xs">Enfant de Bouc-Bel-Air</p>
        </motion.div>
        <motion.div
          className="glass rounded-xl px-6 py-4"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-campaign-green font-heading font-bold text-lg">2014–2020</p>
          <p className="text-primary-foreground/50 text-xs">Adjoint au maire</p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer"
        onClick={() => scrollTo("#candidat")}
        style={{ opacity }}
      >
        <span className="text-primary-foreground/30 text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          className="w-5 h-8 rounded-full border border-primary-foreground/20 flex justify-center pt-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-1 h-2 rounded-full bg-campaign-green"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
