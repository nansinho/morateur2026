import { motion } from "framer-motion";
import candidatImg from "@/assets/candidat-banner.png";

const HeroSection = () => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={candidatImg}
          alt="Mathieu Morateur devant Bouc-Bel-Air"
          className="w-full h-full object-cover object-top opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/40" />
      </div>

      <div className="relative container mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block text-campaign-green font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              Élections municipales 2026
            </span>
            <h1 className="text-primary-foreground font-heading text-5xl md:text-7xl font-bold leading-[1.1] mb-6">
              Bouc Bel Air{" "}
              <span className="block text-campaign-green">a de l'Avenir</span>
            </h1>
            <p className="text-primary-foreground/70 text-lg md:text-xl leading-relaxed max-w-lg mb-8">
              Avec Mathieu Morateur, construisons ensemble une commune audacieuse, au cadre de vie préservé.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("#programme")}
                className="bg-campaign-green text-primary-foreground px-8 py-3.5 rounded-sm font-semibold uppercase tracking-wider text-sm hover:brightness-110 transition"
              >
                Découvrir le programme
              </button>
              <button
                onClick={() => scrollTo("#procuration")}
                className="border-2 border-primary-foreground/30 text-primary-foreground px-8 py-3.5 rounded-sm font-semibold uppercase tracking-wider text-sm hover:border-primary-foreground/60 transition"
              >
                Rejoignez-nous
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hidden lg:flex justify-end"
          >
            <div className="relative">
              <img
                src={candidatImg}
                alt="Mathieu Morateur"
                className="rounded-sm shadow-2xl w-[480px] object-cover"
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-campaign-green/20 rounded-sm" />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-campaign-gold/20 rounded-sm" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-primary-foreground/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
