import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";

const Equipe = () => {
  return (
    <main>
      <Navbar />
      {/* Hero compact */}
      <section className="gradient-teal-deep pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-campaign-lime font-accent font-bold text-xs uppercase tracking-[0.3em] mb-4">
              Ensemble
            </p>
            <h1
              className="font-accent font-extrabold text-primary-foreground leading-[0.9] uppercase tracking-tight break-words"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              L'<span className="text-campaign-lime">ÉQUIPE</span>
            </h1>
            <p className="text-primary-foreground/40 max-w-xl text-lg mt-6 font-medium">
              Une équipe aux expériences multiples, engagée pour Bouc-Bel-Air.
            </p>
          </motion.div>
        </div>
      </section>
      <TeamSection />
      <Footer />
    </main>
  );
};

export default Equipe;
