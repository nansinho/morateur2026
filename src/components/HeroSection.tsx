import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import candidatImg from "@/assets/header_candidat_portrait.png";

const words = ["Bouc", "Bel", "Air"];
const subtitle = ["a", "de", "l'Avenir"];

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
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Right: Full-height editorial photo */}
      <motion.div
        className="absolute top-0 right-0 w-[55%] h-full hidden lg:block"
        style={{ scale: imgScale, y: imgY }}
      >
        <img src={candidatImg} alt="Mathieu Morateur" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </motion.div>

      {/* Mobile photo */}
      <div className="absolute inset-0 lg:hidden">
        <img src={candidatImg} alt="Mathieu Morateur" className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background" />
      </div>

      {/* Left: Editorial text */}
      <motion.div className="relative container mx-auto px-6 py-32 lg:py-0" style={{ opacity }}>
        <div className="max-w-2xl">
          {/* Label */}
          <motion.p
            className="text-campaign-green font-heading font-bold text-xs uppercase tracking-[0.3em] mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Élections municipales 2026
          </motion.p>

          {/* Title — serif/sans mix word reveal */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-x-5 items-baseline">
              {words.map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.span
                    className="font-editorial text-foreground text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[0.9] block italic"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <div className="flex flex-wrap gap-x-4 items-baseline">
              {subtitle.map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.span
                    className={`text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1] block ${
                      i === 0 ? "text-campaign-green font-heading" :
                      i === 1 ? "text-campaign-green font-heading" :
                      "text-campaign-gold font-editorial italic"
                    }`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.7 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </div>
          </div>

          <motion.p
            className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-md mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Avec <span className="text-foreground font-bold">Mathieu Morateur</span>, construisons ensemble une commune où il fait bon vivre.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
          >
            <motion.button
              onClick={() => navigate("/programme")}
              className="gradient-green text-primary-foreground px-8 py-4 rounded-full font-extrabold text-sm flex items-center gap-3 shadow-xl"
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.97 }}
            >
              Découvrir le programme
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => scrollTo("#procuration")}
              className="bg-campaign-gold text-primary px-8 py-4 rounded-full font-extrabold text-sm shadow-xl"
              whileHover={{ scale: 1.05 }}
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
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-10 h-10 rounded-full border border-border flex items-center justify-center"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;