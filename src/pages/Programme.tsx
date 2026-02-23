import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Building2, Store, ChevronDown, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import RoadmapSection from "@/components/RoadmapSection";
import Footer from "@/components/Footer";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Faire barrage aux promoteurs",
    intro: "Notre commune se trouve à un tournant. En moins d'un an, des permis pour plus de 1000 logements ont été déposés. Il est temps d'agir.",
    items: [
      { title: "Refus systématique des permis de construire des promoteurs", detail: "Nous refuserons systématiquement les permis de construire demandés par les promoteurs immobiliers afin de les forcer à la négociation et protéger le cadre de vie des Boucains." },
      { title: "Droit de préemption urbain", detail: "Utilisation systématique du droit de préemption urbain pour permettre la création de logements sociaux adaptés à notre commune, sans laisser le champ libre aux promoteurs." },
      { title: "Soutien aux recours des riverains", detail: "Nous soutiendrons activement les recours intentés par les riverains sur les permis existants, en leur apportant un accompagnement juridique et technique." },
      { title: "Bail réel solidaire", detail: "Recours au bail réel solidaire pour l'intégralité des projets collectifs afin de limiter les constructions spéculatives et de privilégier les parcours résidentiels des Boucains." },
    ],
  },
  {
    icon: Building2,
    title: "Des infrastructures à la hauteur",
    intro: "La vétusté de nos bâtiments publics est indigne de notre commune. Écoles, crèches, voiries : tout doit être remis à niveau.",
    items: [
      { title: "Rénovation des bâtiments municipaux", detail: "Réaliser la rénovation complète de l'ensemble des bâtiments municipaux, y compris le foyer des Anciens, pour offrir des conditions dignes à tous les usagers." },
      { title: "Climatisation dans les écoles et crèches", detail: "Installer la climatisation réversible dans toutes les crèches, toutes les écoles et au foyer des anciens. Il est inacceptable que le thermomètre dépasse 30°C dès mai dans certaines écoles." },
      { title: "Requalification des axes routiers", detail: "Requalifier et renouveler les principaux axes de notre commune : avenue Thiers, avenue de la Mounine, avenue Beausoleil, chemin de Sauvecanne… et la RD8n." },
      { title: "Échangeurs autoroutiers", detail: "Lancer les études sur l'aménagement des échangeurs autoroutiers des Trois Pigeons et des Chabauds, afin de présenter un projet solide à l'État." },
    ],
  },
  {
    icon: Store,
    title: "Revitaliser le village",
    intro: "Notre centre ancien a tant à offrir. Retrouver son âme, ramener la vie dans ses ruelles pittoresques : c'est notre priorité.",
    items: [
      { title: "Centre ancien attractif", detail: "Faire de notre centre ancien un lieu attractif pour l'ensemble des habitants, en s'appuyant sur son caractère unique, son histoire et son patrimoine architectural." },
      { title: "Animations et vie culturelle", detail: "Étendre les animations au-delà de la place principale, dans les ruelles pittoresques du centre ancien. Retrouver l'esprit des retraites aux flambeaux et des fêtes de village." },
      { title: "Incubateur commercial et artisanal", detail: "Créer un incubateur d'entreprises de restauration et de savoir-faire artisanaux pour redonner vie au commerce local et attirer de nouveaux talents." },
      { title: "Offre commerciale renouvelée", detail: "Développer une offre commerciale de proximité diversifiée, en accompagnant les porteurs de projets et en facilitant l'installation de nouveaux commerces dans le centre-ville." },
    ],
  },
];

const AccordionItem = ({ item, isOpen, toggle }: { item: typeof pillars[0]["items"][0]; isOpen: boolean; toggle: () => void }) => (
  <div className="border-b border-primary-foreground/[0.08] last:border-b-0">
    <button
      onClick={toggle}
      className="w-full flex items-center justify-between py-5 px-1 text-left group"
    >
      <span className="font-semibold text-primary-foreground group-hover:text-campaign-green transition-colors pr-4">
        {item.title}
      </span>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
        <ChevronDown className="w-5 h-5 text-primary-foreground/40 flex-shrink-0" />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-primary-foreground/50 leading-relaxed pb-5 px-1">
            {item.detail}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const ProgrammePage = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="min-h-screen bg-primary">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-label justify-center">
              Notre vision pour Bouc-Bel-Air
            </span>
            <h1 className="font-heading text-5xl md:text-6xl font-extrabold text-primary-foreground mt-3 mb-4">
              Le Programme
            </h1>
            <p className="text-primary-foreground/40 max-w-2xl mx-auto text-lg">
              Trois piliers concrets pour redonner à notre commune le cadre de vie qu'elle mérite. Cliquez sur chaque mesure pour en savoir plus.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="pb-24">
        <div className="container mx-auto px-6 space-y-16">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="grid lg:grid-cols-[1fr_2fr] gap-10 items-start"
            >
              {/* Pillar header */}
              <div className="lg:sticky lg:top-24">
                <div className="w-14 h-14 rounded-2xl gradient-green flex items-center justify-center mb-4 shadow-lg shadow-campaign-green/25">
                  <pillar.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h2 className="font-heading text-3xl font-bold text-primary-foreground mb-3">
                  {pillar.title}
                </h2>
                <p className="text-primary-foreground/50 leading-relaxed">{pillar.intro}</p>
                <div className="mt-4 h-1 w-16 gradient-green rounded-full" />
              </div>

              {/* Accordion */}
              <div className="rounded-2xl border border-primary-foreground/[0.08] bg-primary-foreground/[0.03] p-6 md:p-8">
                {pillar.items.map((item, j) => (
                  <AccordionItem
                    key={j}
                    item={item}
                    isOpen={!!openItems[`${i}-${j}`]}
                    toggle={() => toggleItem(`${i}-${j}`)}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <RoadmapSection />

      {/* CTA */}
      <section className="border-t border-primary-foreground/[0.08] py-16 text-primary-foreground text-center">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-3xl font-bold mb-4">Convaincu·e ?</h2>
          <p className="text-primary-foreground/40 mb-8 max-w-lg mx-auto">
            Rejoignez notre équipe et participez à construire l'avenir de Bouc-Bel-Air.
          </p>
          <motion.button
            onClick={() => navigate("/#procuration")}
            className="gradient-green text-primary-foreground px-8 py-3.5 rounded-full font-semibold uppercase tracking-wider text-sm shadow-lg shadow-campaign-green/20 hover:shadow-xl hover:shadow-campaign-green/30 transition-shadow duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Rejoignez-nous
          </motion.button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProgrammePage;
