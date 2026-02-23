import { motion } from "framer-motion";
import equipeImg from "@/assets/equipe.png";

const members = [
  {
    name: "Manon Clément-Costa",
    role: "Cheffe d'entreprise",
    desc: "Spécialiste du développement économique et du bien-être animal.",
  },
  {
    name: "Jean-Luc Berger",
    role: "Responsable financier",
    desc: "Ancien président d'une ONG mondiale, expert finances et relations internationales.",
  },
  {
    name: "Valérie Castineiras",
    role: "Responsable RH & Pompier volontaire",
    desc: "Spécialiste de la prévention des risques et de l'action sociale.",
  },
  {
    name: "François Deniau",
    role: "Directeur commercial retraité",
    desc: "Conseiller municipal, en charge de l'attractivité et du marketing territorial.",
  },
];

const TeamSection = () => (
  <section id="equipe" className="py-24 bg-campaign-warm">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-campaign-green font-semibold text-sm uppercase tracking-[0.2em]">
          Ensemble
        </span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
          L'Équipe
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Une équipe aux expériences multiples et avérées, engagée pour Bouc-Bel-Air.
        </p>
      </motion.div>

      {/* Team photo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <img
          src={equipeImg}
          alt="L'équipe Morateur 2026"
          className="w-full rounded-sm shadow-xl"
        />
      </motion.div>

      {/* Team members */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-sm p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-full bg-campaign-green/10 flex items-center justify-center mb-4">
              <span className="text-campaign-green font-heading font-bold text-sm">
                {m.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <h3 className="font-heading font-bold text-foreground">{m.name}</h3>
            <p className="text-campaign-green text-sm font-medium mb-2">{m.role}</p>
            <p className="text-muted-foreground text-sm leading-relaxed">{m.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
