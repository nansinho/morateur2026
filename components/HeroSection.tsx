'use client'

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import Image from "next/image";

const candidatImg = "/images/header_candidat_portrait.png";

const rotatingWords = [
  "SÉCURISÉE",
  "PROPRE",
  "APAISÉE",
  "RESPIRABLE",
  "SÛRE",
];

const HeroSection = () => {
  const router = useRouter();
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
        <Image
          src={candidatImg}
          alt="Mathieu Morateur, candidat aux municipales 2026 à Bouc-Bel-Air"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Municipales 2026
        </motion.span>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.h1
              className="font-accent text-primary-foreground font-extrabold uppercase leading-[0.85] tracking-tight"
              style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
              initial={{ y: "120%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              BOUC BEL AIR
            </motion.h1>
          </div>

          <div className="relative" style={{ minHeight: "clamp(4.5rem, 11vw, 9rem)" }}>
            {/* SERA badge - absolute, tucked between the two lines */}
            <motion.span
              className="absolute left-0 sm:left-4 md:left-8 top-0 -translate-y-1/2 font-accent font-extrabold uppercase text-primary text-xs sm:text-lg md:text-xl tracking-[0.3em] px-3 sm:px-4 py-0.5 sm:py-1 bg-campaign-lime rounded-md shadow-lg z-10"
              style={{ rotate: "-3deg" }}
              initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              SERA
            </motion.span>

            <AnimatePresence mode="wait">
              <motion.p
                key={rotatingWords[wordIndex]}
                className="font-accent font-extrabold uppercase tracking-tight text-center text-campaign-lime"
                style={{
                  fontSize: "clamp(3rem, 9vw, 7rem)",
                  lineHeight: 1.15,
                }}
                initial={{ y: "60%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-60%", opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {rotatingWords[wordIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="mb-6" />

        <motion.p
          className="text-primary-foreground/70 text-lg sm:text-xl leading-relaxed max-w-lg mx-auto mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Avec <span className="text-primary-foreground font-bold">Mathieu Morateur</span>, construisons ensemble une commune où il fait bon vivre.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <button
            onClick={() => scrollTo("#procuration")}
            className="gradient-lime text-accent-foreground px-6 py-4 sm:px-10 sm:py-5 rounded-2xl font-extrabold text-base flex items-center gap-3 shadow-2xl uppercase tracking-wide -rotate-2 hover:rotate-0 hover:scale-105 hover:shadow-[0_20px_50px_-10px_hsl(var(--campaign-lime)/0.5)] transition-all duration-200"
          >
            Rejoignez-nous
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollTo("#procuration")}
            className="bg-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/30 text-primary-foreground px-6 py-4 sm:px-10 sm:py-5 rounded-2xl font-extrabold text-base uppercase tracking-wide hover:bg-primary-foreground/20 rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-200"
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
        transition={{ delay: 0.8 }}
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
