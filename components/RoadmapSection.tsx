'use client'

import { useInView } from "framer-motion";
import { useRef, useCallback } from "react";
import { Flag, Users, Vote, CalendarCheck, Megaphone, PartyPopper, Check, ChevronLeft, ChevronRight } from "lucide-react";

const milestones = [
  { icon: Megaphone, date: "Janvier 2026", title: "Lancement de la campagne", desc: "Présentation officielle de la liste et du programme.", done: true },
  { icon: Users, date: "Février 2026", title: "Rencontres de terrain", desc: "Porte-à-porte, réunions publiques dans tous les quartiers.", done: true },
  { icon: Flag, date: "Mars 2026", title: "Meetings publics", desc: "Grands rassemblements thématiques sur les 3 piliers du programme.", done: false },
  { icon: CalendarCheck, date: "Mars 2026", title: "1ᵉʳ tour", desc: "Jour de vote – chaque voix compte pour l'avenir de notre commune.", done: false },
  { icon: Vote, date: "Mars 2026", title: "2ᵉ tour", desc: "Mobilisation générale pour confirmer le choix du renouveau.", done: false },
  { icon: PartyPopper, date: "Avril 2026", title: "Installation du conseil", desc: "Mise en œuvre immédiate des premières mesures du programme.", done: false },
];

const RoadmapSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 350, behavior: "smooth" });
  }, []);

  return (
    <section id="roadmap" className="py-16 sm:py-28 gradient-teal-deep relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div>
            <span className="section-label">Notre feuille de route</span>
            <h2
              className="font-accent font-extrabold uppercase leading-[0.9] tracking-tight text-primary-foreground break-words"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              LES GRANDES<br /><span className="text-campaign-lime">ÉTAPES</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll(-1)}
              className="w-12 h-12 rounded-xl border-2 border-primary-foreground/20 text-primary-foreground/60 flex items-center justify-center hover:border-campaign-lime hover:text-campaign-lime transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-12 h-12 rounded-xl border-2 border-primary-foreground/20 text-primary-foreground/60 flex items-center justify-center hover:border-campaign-lime hover:text-campaign-lime transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6">
          {milestones.map((m, i) => (
            <div
              key={i}
              className={`flex-shrink-0 w-[75vw] sm:w-[280px] md:w-[300px] rounded-2xl p-6 sm:p-7 flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                m.done
                  ? "bg-primary-foreground/[0.08] border-2 border-campaign-lime/40 shadow-[0_0_30px_-10px_hsl(var(--campaign-lime)/0.2)]"
                  : "bg-primary-foreground/[0.04] border border-primary-foreground/10"
              }`}
            >
              {/* Numéro filigrane */}
              <span className={`absolute top-4 right-5 font-accent text-7xl font-extrabold leading-none select-none ${
                m.done ? "text-campaign-lime/15" : "text-primary-foreground/5"
              }`}>
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Icône */}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-6 ${
                m.done ? "gradient-lime" : "bg-primary-foreground/10"
              }`}>
                <m.icon className={`w-5 h-5 ${m.done ? "text-accent-foreground" : "text-primary-foreground/40"}`} />
              </div>

              {/* Date + badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  m.done ? "text-campaign-lime" : "text-primary-foreground/40"
                }`}>
                  {m.date}
                </span>
                {m.done && (
                  <div className="w-5 h-5 rounded-full gradient-lime flex items-center justify-center">
                    <Check className="w-3 h-3 text-accent-foreground" />
                  </div>
                )}
              </div>

              {/* Titre */}
              <h3 className={`font-accent font-extrabold text-lg mb-3 uppercase tracking-wide ${
                m.done ? "text-primary-foreground" : "text-primary-foreground/35"
              }`}>
                {m.title}
              </h3>

              {/* Description */}
              <p className={`text-sm leading-relaxed mt-auto ${
                m.done ? "text-primary-foreground/60" : "text-primary-foreground/25"
              }`}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
