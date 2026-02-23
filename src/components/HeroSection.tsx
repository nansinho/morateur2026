import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ChevronRight, ArrowDown, Zap } from "lucide-react";
import candidatImg from "@/assets/header_candidat_portrait.png";

const HeroSection = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

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

      <motion.div
        className="absolute top-0 right-0 w-[65%] h-full hidden lg:block clip-diagonal"
        style={{ scale: imgScale, y: imgY }}
      >
        <img src={candidatImg} alt="Mathieu Morateur" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-primary/70 to-transparent" />
      </motion.div>

      <div className="absolute inset-0 lg:hidden">
        <div className="absolute inset-0 clip-diagonal-mobile">
          <img src={candidatImg} alt="Mathieu Morateur" className="w-full h-full object-cover object-top" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/85 to-primary/95" />
      </div>

      <motion.div className="relative container mx-auto px-6" style={{ y: textY, opacity }}>
        <div className="max-w-2xl">
          <motion.div
            className="inline-flex items-center gap-2 bg-campaign-green/15 border border-campaign-green/25 text-campaign-green font-bold text-xs uppercase tracking-[0.2em] mb-8 px-5 py-2.5 rounded-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Zap className="w-3.5 h-3.5" />
            Élections municipales 2026
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              className="text-primary-foreground font-heading text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-tight"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Bouc Bel Air
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="font-heading text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-tight"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-campaign-green">a de </span>
              <span className="text-campaign-gold">l'Avenir</span>
            </motion.h1>
          </div>

          <motion.p
            className="text-primary-foreground/55 text-lg sm:text-xl leading-relaxed max-w-md mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Avec <span className="text-primary-foreground font-bold">Mathieu Morateur</span>, construisons ensemble une commune où il fait bon vivre.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <motion.button
              onClick={() => navigate("/programme")}
              className="gradient-green text-primary-foreground px-8 py-4 rounded-full font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-campaign-green/25"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Découvrir le programme
              <ChevronRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => scrollTo("#procuration")}
              className="bg-campaign-gold text-primary px-8 py-4 rounded-full font-extrabold text-sm shadow-xl shadow-campaign-gold/20"
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
        className="absolute bottom-28 right-[10%] hidden lg:flex flex-col gap-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div className="bg-campaign-green rounded-2xl px-7 py-5 shadow-xl" whileHover={{ scale: 1.05 }}>
          <p className="text-primary-foreground font-heading font-extrabold text-2xl">36 ans</p>
          <p className="text-primary-foreground/70 text-sm font-medium">Enfant de Bouc-Bel-Air</p>
        </motion.div>
        <motion.div className="bg-campaign-gold rounded-2xl px-7 py-5 shadow-xl" whileHover={{ scale: 1.05 }}>
          <p className="text-primary font-heading font-extrabold text-2xl">2014–2020</p>
          <p className="text-primary/60 text-sm font-medium">Adjoint au maire</p>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollTo("#candidat")}
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-10 h-10 rounded-full border border-campaign-green/30 flex items-center justify-center"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-campaign-green" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
