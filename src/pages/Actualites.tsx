import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ActualitesSection from "@/components/ActualitesSection";
import Footer from "@/components/Footer";

const Actualites = () => {
  return (
    <main>
      <Navbar />
      {/* Hero compact */}
      <section className="bg-campaign-ice pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-campaign-lime font-accent font-bold text-xs uppercase tracking-[0.3em] mb-4">
              Sur le terrain
            </p>
            <h1
              className="font-accent font-extrabold text-primary leading-[0.9] uppercase tracking-tight break-words"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              ACTU<span className="text-campaign-lime">ALITÉS</span>
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg mt-6 font-medium">
              Suivez notre campagne au quotidien, sur le terrain et auprès des Boucains.
            </p>
          </motion.div>
        </div>
      </section>
      <ActualitesSection />
      <Footer />
    </main>
  );
};

export default Actualites;
