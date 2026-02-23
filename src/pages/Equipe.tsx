import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RoadmapSection from "@/components/RoadmapSection";
import equipeGroupe from "@/assets/equipe-groupe.png";
import equipe1 from "@/assets/equipe-1.png";
import equipe2 from "@/assets/equipe-2.png";
import equipe3 from "@/assets/equipe-3.png";
import equipe4 from "@/assets/equipe-4.png";

const members = [
  { name: "Manon Clément-Costa", role: "Cheffe d'entreprise", img: equipe1, desc: "Entrepreneure engagée, elle met son expérience de la gestion et de l'innovation au service du territoire." },
  { name: "Jean-Luc Berger", role: "Responsable financier", img: equipe2, desc: "Expert en finances publiques, garant d'une gestion rigoureuse et transparente des budgets communaux." },
  { name: "Valérie Castineiras", role: "RH & Pompier volontaire", img: equipe3, desc: "Professionnelle des ressources humaines et pompier volontaire, elle incarne l'engagement citoyen au quotidien." },
  { name: "François Deniau", role: "Dir. commercial retraité", img: equipe4, desc: "Fort de 30 ans d'expérience, il apporte sa vision stratégique et son ancrage local." },
];

const Equipe = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-primary">
      <Navbar />

      {/* Hero */}
      <section className="gradient-teal-deep pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="section-label justify-center">Ensemble</span>
            <h1
              className="font-accent font-extrabold text-primary-foreground leading-[0.9] uppercase tracking-tight break-words"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              L'<span className="text-campaign-lime">ÉQUIPE</span>
            </h1>
            <p className="text-primary-foreground/40 max-w-xl mx-auto text-lg mt-6 font-medium">
              Une équipe aux expériences multiples, engagée pour Bouc-Bel-Air.
            </p>
          </motion.div>

          {/* Photo de groupe */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
              <div className="aspect-[3/1]">
                <img
                  src={equipeGroupe}
                  alt="L'équipe au complet"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team carousel */}
      <section className="gradient-teal-deep py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 mb-10">
          <span className="section-label">Nos colistiers</span>
          <h2
            className="font-accent font-extrabold uppercase leading-[0.9] tracking-tight text-primary-foreground break-words"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            CEUX QUI <span className="text-campaign-lime">S'ENGAGENT</span>
          </h2>
        </div>

        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {members.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-[1.25rem] overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-black/40">
                {/* Photo 9:16 */}
                <div className="aspect-[9/16] overflow-hidden relative">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />

                  {/* Role badge */}
                  <div className="absolute top-4 left-4">
                    <span className="gradient-lime text-accent-foreground px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-extrabold uppercase tracking-wider">
                      {m.role}
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 flex flex-col justify-end">
                    <h3
                      className="font-accent font-extrabold text-primary-foreground text-2xl sm:text-3xl leading-[0.95] group-hover:text-campaign-lime transition-colors duration-300 uppercase tracking-wide -rotate-3 mb-3 break-words overflow-hidden"
                    >
                      {m.name}
                    </h3>
                    <p className="text-primary-foreground/60 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {m.desc}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <RoadmapSection />

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
