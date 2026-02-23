import { motion } from "framer-motion";
import { ShieldCheck, Building2, Store } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Faire barrage aux promoteurs",
    items: [
      "Refus permanent des permis de construire des promoteurs pour forcer la négociation",
      "Utilisation systématique du droit de préemption urbain",
      "Soutien aux recours intentés par les riverains",
      "Recours au bail réel solidaire pour limiter les constructions",
    ],
  },
  {
    icon: Building2,
    title: "Des infrastructures à la hauteur",
    items: [
      "Rénovation de l'ensemble des bâtiments municipaux",
      "Climatisation réversible dans toutes les crèches et écoles",
      "Requalification des principaux axes : av. Thiers, Mounine, Beausoleil…",
      "Études sur l'aménagement des échangeurs autoroutiers",
    ],
  },
  {
    icon: Store,
    title: "Revitaliser le village",
    items: [
      "Faire du centre ancien un lieu attractif pour tous les habitants",
      "S'appuyer sur le caractère et l'histoire du village",
      "Incubateur d'entreprises de restauration et d'artisanat",
      "Ramener la vie dans les ruelles pittoresques du centre",
    ],
  },
];

const ProgrammeSection = () => (
  <section id="programme" className="py-24 bg-primary text-primary-foreground">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-campaign-green font-semibold text-sm uppercase tracking-[0.2em]">
          Notre vision
        </span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold mt-2 mb-4">
          Le Programme
        </h2>
        <p className="text-primary-foreground/60 max-w-2xl mx-auto text-lg">
          Trois piliers pour redonner à Bouc-Bel-Air le cadre de vie qu'elle mérite.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {pillars.map((pillar, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-sm p-8 hover:bg-primary-foreground/10 transition-colors duration-300"
          >
            <div className="w-12 h-12 rounded-sm bg-campaign-green/20 flex items-center justify-center mb-6">
              <pillar.icon className="w-6 h-6 text-campaign-green" />
            </div>
            <h3 className="font-heading text-xl font-bold mb-4">{pillar.title}</h3>
            <ul className="space-y-3">
              {pillar.items.map((item, j) => (
                <li key={j} className="flex items-start gap-3 text-primary-foreground/70 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-campaign-green mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProgrammeSection;
