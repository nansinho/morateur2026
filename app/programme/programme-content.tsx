'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import RoadmapSection from "@/components/RoadmapSection";
import Footer from "@/components/Footer";
import { scrollToHash } from "@/lib/scroll-to-hash";
import { getIcon } from "@/lib/icon-map";
import { slugify } from "@/lib/slugify";

interface ProgrammeContentProps {
  pillars: {
    id: string;
    title: string;
    intro: string;
    icon: string;
    color: string;
    icon_bg: string;
    sort_order: number;
    measures: {
      id: string;
      title: string;
      detail: string;
      sort_order: number;
    }[];
  }[];
}

const AccordionItem = ({ item, isOpen, toggle, index }: { item: { title: string; detail: string }; isOpen: boolean; toggle: () => void; index: number }) => (
  <div className="border-b border-primary/[0.08] last:border-b-0">
    <button
      onClick={toggle}
      className="w-full flex items-center justify-between py-5 px-1 text-left group"
    >
      <div className="flex items-center gap-4 pr-4">
        <span className="font-accent text-sm font-extrabold text-campaign-lime/40">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-accent font-bold text-primary text-sm sm:text-base uppercase tracking-wide group-hover:text-campaign-lime transition-colors">
          {item.title}
        </span>
      </div>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
        <ChevronDown className="w-5 h-5 text-primary/40 flex-shrink-0" />
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
          <p className="text-primary/60 leading-relaxed pb-5 pl-12 pr-4 text-sm sm:text-base">
            {item.detail}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function ProgrammeContent({ pillars }: ProgrammeContentProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCTA = () => {
    router.push('/');
    setTimeout(() => scrollToHash('#procuration'), 500);
  };

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="gradient-teal-deep pt-44 pb-16">
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
              {pillars.length} engagements concrets pour redonner à notre commune le cadre de vie qu&apos;elle mérite. Cliquez sur chaque mesure pour en savoir plus.
            </p>
            <div className="flex items-center justify-center mt-6">
              <a
                href="/PDF/programme-tract.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 gradient-lime text-accent-foreground px-8 py-3 rounded-xl font-accent font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                Voir le tract
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-campaign-ice pb-24 pt-8">
        <div className="container mx-auto px-4 sm:px-6 space-y-16">
          {pillars.map((pillar, i) => {
            const Icon = getIcon(pillar.icon);
            const iconBg = pillar.icon_bg;
            const color = pillar.color;

            return (
              <motion.div
                id={slugify(pillar.title)}
                key={pillar.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="grid lg:grid-cols-[1fr_2fr] gap-10 items-start scroll-mt-24"
              >
                {/* Pillar header */}
                <div className="lg:sticky lg:top-24">
                  <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <h2
                    className="font-accent font-extrabold text-primary uppercase tracking-tight leading-[0.95] mb-3 break-words"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                  >
                    {pillar.title}
                  </h2>
                  <p className="text-primary/60 leading-relaxed text-sm sm:text-base">{pillar.intro}</p>
                  <div className="mt-4 h-[2px] w-16 bg-campaign-lime rounded-full" />
                </div>

                {/* Accordion */}
                <div className={`rounded-2xl border ${color} bg-primary/[0.05] p-6 md:p-8`}>
                  {pillar.measures.map((measure, j) => (
                    <AccordionItem
                      key={measure.id}
                      item={{ title: measure.title, detail: measure.detail }}
                      index={j}
                      isOpen={!!openItems[`${pillar.id}-${measure.id}`]}
                      toggle={() => toggleItem(`${pillar.id}-${measure.id}`)}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <RoadmapSection />

      {/* CTA */}
      <section className="bg-campaign-ice border-t border-primary/[0.08] py-16 sm:py-24 text-center">
        <div className="container mx-auto px-4 sm:px-6">
          <span className="section-label justify-center">Convaincu·e ?</span>
          <h2
            className="font-accent font-extrabold text-primary uppercase tracking-tight leading-[0.9] mb-4 break-words"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            REJOIGNEZ-<span className="text-campaign-lime">NOUS</span>
          </h2>
          <p className="text-primary/50 mb-10 max-w-lg mx-auto text-lg">
            Participez à construire l&apos;avenir de Bouc-Bel-Air.
          </p>
          <motion.button
            onClick={handleCTA}
            className="inline-flex items-center gap-3 gradient-lime text-accent-foreground px-10 py-5 rounded-2xl font-extrabold uppercase tracking-wider text-base shadow-lg -rotate-2 hover:rotate-0 hover:shadow-[0_20px_50px_-10px_hsl(var(--campaign-lime)/0.5)] transition-all duration-200"
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
}
