import { motion } from "framer-motion";
import { useRef } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);

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

        {/* Horizontal scrollable story carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {members.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex-shrink-0 snap-center w-64 group cursor-pointer"
            >
              {/* Story-style photo with ring */}
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-4 ring-3 ring-campaign-lime/50 ring-offset-2 ring-offset-primary transition-all duration-150 group-hover:ring-campaign-lime group-hover:scale-[1.02]">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <h3 className="font-accent font-extrabold text-white text-sm uppercase tracking-wide leading-tight">
                    {m.name}
                  </h3>
                  <p className="text-campaign-lime text-xs font-bold mt-1">{m.role}</p>
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
