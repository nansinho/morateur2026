'use client'

import { useRef, useCallback, useEffect, useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { getIcon } from "@/lib/icon-map";
import type { Event } from '@/lib/types/database';
import { createClient } from '@/lib/supabase/client';

interface RoadmapSectionProps {
  events?: Event[]
}

const RoadmapSection = ({ events: propEvents }: RoadmapSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<Event[]>(propEvents ?? []);

  // If no events passed as props, fetch from Supabase (for programme/equipe pages)
  useEffect(() => {
    if (propEvents && propEvents.length > 0) return;
    const supabase = createClient();
    supabase.from('events').select('*').order('sort_order').then(({ data }) => {
      if (data) setEvents(data as Event[]);
    });
  }, [propEvents]);

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

        <div ref={scrollRef} className="flex gap-4 sm:gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 items-stretch">
          {events.map((m, i) => {
            const Icon = getIcon(m.icon);
            const isNext = !m.is_done && events.findIndex(e => !e.is_done) === i;
            return (
              <div
                key={m.id}
                className={`flex-shrink-0 w-[75vw] sm:w-[280px] md:w-[300px] rounded-2xl p-6 sm:p-7 flex flex-col relative overflow-hidden transition-all duration-200 hover:-translate-y-1 active:scale-[0.97] ${
                  m.is_done
                    ? "bg-primary-foreground/[0.08] shadow-[0_0_30px_-10px_hsl(var(--campaign-lime)/0.2)]"
                    : isNext
                      ? "bg-blue-500/20 border-2 border-blue-400/50 shadow-[0_0_30px_-10px_rgba(59,130,246,0.5)]"
                      : "bg-primary-foreground/[0.04]"
                }`}
              >
                {/* Numéro filigrane */}
                <span className={`absolute top-4 right-5 font-accent text-7xl font-extrabold leading-none select-none ${
                  m.is_done ? "text-campaign-lime/15" : isNext ? "text-blue-400/20" : "text-primary-foreground/5"
                }`}>
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icône */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-6 ${
                  m.is_done ? "gradient-lime" : isNext ? "bg-blue-500/30" : "bg-primary-foreground/10"
                }`}>
                  <Icon className={`w-5 h-5 ${m.is_done ? "text-accent-foreground" : isNext ? "text-blue-300" : "text-primary-foreground/40"}`} />
                </div>

                {/* Date + badge */}
                <div className="flex items-center gap-2 mb-3">
                  <time className={`text-xs font-bold uppercase tracking-wider ${
                    m.is_done ? "text-campaign-lime" : isNext ? "text-blue-300" : "text-primary-foreground/40"
                  }`}>
                    {m.date}
                  </time>
                  {m.is_done && (
                    <div className="w-5 h-5 rounded-full gradient-lime flex items-center justify-center">
                      <Check className="w-3 h-3 text-accent-foreground" />
                    </div>
                  )}
                  {isNext && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded-full">
                      Prochain
                    </span>
                  )}
                </div>

                {/* Titre */}
                <h3 className={`font-accent font-extrabold text-lg mb-3 uppercase tracking-wide ${
                  m.is_done ? "text-primary-foreground" : isNext ? "text-primary-foreground" : "text-primary-foreground/35"
                }`}>
                  {m.title}
                </h3>

                {/* Description */}
                <p className={`text-sm leading-relaxed mt-auto line-clamp-3 ${
                  m.is_done ? "text-primary-foreground/60" : isNext ? "text-primary-foreground/70" : "text-primary-foreground/25"
                }`}>
                  {m.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
