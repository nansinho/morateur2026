import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Building2, Store, ChevronDown, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import useDocumentMeta from "@/hooks/useDocumentMeta";
import Navbar from "@/components/Navbar";
import RoadmapSection from "@/components/RoadmapSection";
import Footer from "@/components/Footer";

const pillars: {
  icon: LucideIcon;
  title: string;
  intro: string;
  color: string;
  iconBg: string;
  items: { title: string; detail: string }[];
}[] = [
  {
    icon: ShieldCheck,
    title: "Faire barrage aux promoteurs",
    intro: "Notre commune se trouve à un tournant. En moins d'un an, des permis pour plus de 1000 logements ont été déposés. Il est temps d'agir.",
    color: "border-campaign-lime/30",
    iconBg: "gradient-lime",
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
    color: "border-campaign-steel/30",
    iconBg: "gradient-teal",
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
    color: "border-campaign-olive/30",
    iconBg: "bg-campaign-olive",
    items: [
      { title: "Centre ancien attractif", detail: "Faire de notre centre ancien un lieu attractif pour l'ensemble des habitants, en s'appuyant sur son caractère unique, son histoire et son patrimoine architectural." },
      { title: "Animations et vie culturelle", detail: "Étendre les animations au-delà de la place principale, dans les ruelles pittoresques du centre ancien. Retrouver l'esprit des retraites aux flambeaux et des fêtes de village." },
      { title: "Incubateur commercial et artisanal", detail: "Créer un incubateur d'entreprises de restauration et de savoir-faire artisanaux pour redonner vie au commerce local et attirer de nouveaux talents." },
      { title: "Offre commerciale renouvelée", detail: "Développer une offre commerciale de proximité diversifiée, en accompagnant les porteurs de projets et en facilitant l'installation de nouveaux commerces dans le centre-ville." },
    ],
  },
];

const AccordionItem = ({ item, isOpen, toggle, index }: { item: { title: string; detail: string }; isOpen: boolean; toggle: () => void; index: number }) => (
  <div className="border-b border-primary-foreground/[0.08] last:border-b-0">
    <button
      onClick={toggle}
      className="w-full flex items-center justify-between py-5 px-1 text-left group"
    >
      <div className="flex items-center gap-4 pr-4">
        <span className="font-accent text-sm font-extrabold text-campaign-lime/40">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-accent font-bold text-primary-foreground text-sm sm:text-base uppercase tracking-wide group-hover:text-campaign-lime transition-colors">
          {item.title}
        </span>
      </div>
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
          <p className="text-primary-foreground/50 leading-relaxed pb-5 pl-12 pr-4 text-sm sm:text-base">
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

  useDocumentMeta({
    title: "Programme | Morateur 2026",
    description: "Découvrez les 3 piliers du programme de Mathieu Morateur pour Bouc-Bel-Air : urbanisme, infrastructures, revitalisation du village.",
  });

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="min-h-screen bg-primary">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-label justify-center">
              Notre vision pour Bouc-Bel-Air
            </span>
            <h1
              className="font-accent font-extrabold text-primary-foreground leading-[0.9] uppercase tracking-tight break-words mt-3 mb-4"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              LE <span className="text-campaign-lime">PROGRAMME</span>
            </h1>
            <p className="text-primary-foreground/40 max-w-2xl mx-auto text-lg">
              Trois piliers concrets pour redonner à notre commune le cadre de vie qu'elle mérite. Cliquez sur chaque mesure pour en savoir plus.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6 space-y-16">
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
                <div className={`w-14 h-14 rounded-2xl ${pillar.iconBg} flex items-center justify-center mb-4 shadow-lg`}>
                  <pillar.icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <h2
                  className="font-accent font-extrabold text-primary-foreground uppercase tracking-tight leading-[0.95] mb-3 break-words"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                >
                  {pillar.title}
                </h2>
                <p className="text-primary-foreground/50 leading-relaxed text-sm sm:text-base">{pillar.intro}</p>
                <div className="mt-4 h-[2px] w-16 bg-campaign-lime rounded-full" />
              </div>

              {/* Accordion */}
              <div className={`rounded-2xl border ${pillar.color} bg-primary-foreground/[0.03] p-6 md:p-8`}>
                {pillar.items.map((item, j) => (
                  <AccordionItem
                    key={j}
                    item={item}
                    index={j}
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
      <section className="border-t border-primary-foreground/[0.08] py-16 sm:py-24 text-center">
        <div className="container mx-auto px-4 sm:px-6">
          <span className="section-label justify-center">Convaincu·e ?</span>
          <h2
            className="font-accent font-extrabold text-primary-foreground uppercase tracking-tight leading-[0.9] mb-4 break-words"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            REJOIGNEZ-<span className="text-campaign-lime">NOUS</span>
          </h2>
          <p className="text-primary-foreground/40 mb-10 max-w-lg mx-auto text-lg">
            Participez à construire l'avenir de Bouc-Bel-Air.
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

export default ProgrammePage;
