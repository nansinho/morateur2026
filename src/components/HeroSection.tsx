import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ArrowDown, ChevronRight } from "lucide-react";
import candidatImg from "@/assets/candidat-banner.png";

const HeroSection = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} id="hero" className="relative min-h-[110vh] flex items-center overflow-hidden bg-primary">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale }}>
        <img
          src={candidatImg}
          alt="Mathieu Morateur devant Bouc-Bel-Air"
          className="w-full h-full object-cover object-top opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/85 to-campaign-navy-light/60" />
      </motion.div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-[15%] w-64 h-64 rounded-full bg-campaign-green/5 blur-3xl"
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-[10%] w-48 h-48 rounded-full bg-campaign-gold/5 blur-3xl"
          animate={{ y: [15, -15, 15], x: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[60%] right-[30%] w-2 h-2 rounded-full bg-campaign-green/40"
          animate={{ y: [-30, 30, -30] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-[30%] left-[25%] w-1.5 h-1.5 rounded-full bg-campaign-gold/40"
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
      </div>

      <motion.div className="relative container mx-auto px-6 pt-32 pb-20" style={{ y: textY, opacity }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.span
              className="inline-flex items-center gap-2 text-campaign-green font-semibold text-sm uppercase tracking-[0.25em] mb-6 px-4 py-1.5 rounded-full glass-dark"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="w-2 h-2 rounded-full gradient-green animate-pulse" />
              Élections municipales 2026
            </motion.span>

            <motion.h1
              className="text-primary-foreground font-heading text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Bouc Bel Air
              <motion.span
                className="block text-gradient"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                a de l'Avenir
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-primary-foreground/60 text-lg md:text-xl leading-relaxed max-w-lg mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Avec Mathieu Morateur, construisons ensemble une commune audacieuse, au cadre de vie préservé.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
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

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:flex justify-end"
          >
            <div className="relative group">
              <div className="absolute -inset-4 gradient-green rounded-2xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />
              <img
                src={candidatImg}
                alt="Mathieu Morateur"
                className="relative rounded-2xl shadow-2xl w-[480px] object-cover border border-white/10"
              />
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-6 -left-6 glass rounded-xl px-5 py-3"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-primary-foreground font-heading font-bold text-sm">36 ans</p>
                <p className="text-primary-foreground/60 text-xs">Enfant de Bouc-Bel-Air</p>
              </motion.div>
              <motion.div
                className="absolute -top-4 -right-4 glass rounded-xl px-5 py-3"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-campaign-green font-heading font-bold text-sm">2014–2020</p>
                <p className="text-primary-foreground/60 text-xs">Adjoint au maire</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollTo("#candidat")}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{ opacity }}
      >
        <span className="text-primary-foreground/40 text-xs uppercase tracking-widest">Découvrir</span>
        <ArrowDown className="w-5 h-5 text-primary-foreground/40" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
