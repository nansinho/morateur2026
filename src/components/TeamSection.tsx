import { motion } from "framer-motion";
import equipe1 from "@/assets/equipe-1.png";
import equipe2 from "@/assets/equipe-2.png";
import equipe3 from "@/assets/equipe-3.png";
import equipe4 from "@/assets/equipe-4.png";

const members = [
  { name: "Manon Clément-Costa", role: "Cheffe d'entreprise", img: equipe1 },
  { name: "Jean-Luc Berger", role: "Responsable financier", img: equipe2 },
  { name: "Valérie Castineiras", role: "RH & Pompier volontaire", img: equipe3 },
  { name: "François Deniau", role: "Dir. commercial retraité", img: equipe4 },
];

const TeamSection = () => {
  return (
    <section id="equipe" className="gradient-teal-deep relative overflow-hidden">
      <div className="container mx-auto px-6 py-28 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="section-label">Ensemble</span>
          <h2
            className="font-accent font-extrabold text-primary-foreground leading-[0.9] uppercase tracking-tight break-words"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            L'<span className="text-campaign-lime">ÉQUIPE</span>
          </h2>
          <p className="text-primary-foreground/40 max-w-xl text-lg mt-6 font-medium">
            Une équipe aux expériences multiples, engagée pour Bouc-Bel-Air.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {members.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-lg">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="gradient-lime text-accent-foreground px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">
                    {m.role}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-accent font-extrabold text-primary-foreground text-lg leading-snug group-hover:text-campaign-lime transition-colors duration-300">
                    {m.name}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
