import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";

const Equipe = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-primary">
      <Navbar />

      {/* Hero */}
      <section className="gradient-teal-deep pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Ensemble</span>
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

      {/* CTA */}
      <section className="gradient-teal-deep border-t border-primary-foreground/[0.08] py-16 sm:py-24 text-center">
        <div className="container mx-auto px-4 sm:px-6">
          <span className="section-label justify-center">Envie de nous rejoindre ?</span>
          <h2
            className="font-accent font-extrabold text-primary-foreground uppercase tracking-tight leading-[0.9] mb-4 break-words"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            REJOIGNEZ <span className="text-campaign-lime">L'AVENTURE</span>
          </h2>
          <p className="text-primary-foreground/40 mb-10 max-w-lg mx-auto text-lg">
            Chaque voix compte. Engagez-vous à nos côtés pour Bouc-Bel-Air.
          </p>
          <motion.button
            onClick={() => navigate("/#procuration")}
            className="inline-flex items-center gap-3 gradient-lime text-accent-foreground px-10 py-5 rounded-2xl font-extrabold uppercase tracking-wider text-base shadow-lg -rotate-2 hover:rotate-0 hover:shadow-[0_20px_50px_-10px_hsl(var(--campaign-lime)/0.5)] transition-all duration-300"
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.94, rotate: -4 }}
          >
            Rejoignez-nous
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Equipe;
