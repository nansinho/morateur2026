'use client'

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { slugify } from "@/lib/slugify";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { getIcon } from "@/lib/icon-map";
import type { ProgrammePillar } from '@/lib/types/database';

const cardStyles = [
  {
    bg: "bg-gradient-to-br from-campaign-lime to-campaign-lime-light",
    iconColor: "text-accent-foreground",
    textColor: "text-accent-foreground",
    subtextColor: "text-accent-foreground/70",
  },
  {
    bg: "gradient-teal",
    iconColor: "text-primary-foreground",
    textColor: "text-primary-foreground",
    subtextColor: "text-primary-foreground/70",
  },
  {
    bg: "bg-campaign-steel",
    iconColor: "text-primary-foreground",
    textColor: "text-primary-foreground",
    subtextColor: "text-primary-foreground/70",
  },
  {
    bg: "bg-campaign-olive",
    iconColor: "text-primary-foreground",
    textColor: "text-primary-foreground",
    subtextColor: "text-primary-foreground/70",
  },
  {
    bg: "gradient-teal-deep",
    iconColor: "text-campaign-lime",
    textColor: "text-primary-foreground",
    subtextColor: "text-primary-foreground/60",
  },
  {
    bg: "bg-gradient-to-br from-campaign-lime/90 to-campaign-lime",
    iconColor: "text-accent-foreground",
    textColor: "text-accent-foreground",
    subtextColor: "text-accent-foreground/70",
  },
  {
    bg: "bg-gradient-to-br from-campaign-steel to-campaign-teal",
    iconColor: "text-primary-foreground",
    textColor: "text-primary-foreground",
    subtextColor: "text-primary-foreground/70",
  },
  {
    bg: "bg-gradient-to-br from-campaign-olive to-campaign-olive/80",
    iconColor: "text-primary-foreground",
    textColor: "text-primary-foreground",
    subtextColor: "text-primary-foreground/70",
  },
  {
    bg: "bg-gradient-to-br from-[#0a2e3d] to-campaign-teal",
    iconColor: "text-campaign-lime",
    textColor: "text-primary-foreground",
    subtextColor: "text-primary-foreground/60",
  },
];

interface ProgrammeSectionProps {
  pillars: ProgrammePillar[];
}

const ProgrammeSection = ({ pillars }: ProgrammeSectionProps) => {
  const router = useRouter();

  return (
    <section id="programme" aria-label="Programme de campagne" className="gradient-teal-deep relative overflow-x-clip">
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-28 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 sm:mb-20"
        >
          <span className="section-label justify-center mb-6">Notre vision</span>
          <h2
            className="font-accent font-extrabold text-primary-foreground leading-[0.9] uppercase tracking-tight break-words"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            LE <span className="text-campaign-lime">PROGRAMME</span>
          </h2>
          <p className="text-primary-foreground/40 max-w-2xl mx-auto text-lg mt-8 font-medium">
            {pillars.length} engagements concrets pour redonner à Bouc-Bel-Air le cadre de vie qu&apos;elle mérite.
          </p>
        </motion.div>

        {/* Carousel */}
        <Carousel opts={{ align: "start", loop: true, dragFree: true }} className="w-full">
          <CarouselContent className="-ml-5">
            {pillars.map((pillar, i) => {
              const style = cardStyles[i % cardStyles.length];
              const Icon = getIcon(pillar.icon);
              const number = String(i + 1).padStart(2, "0");
              return (
                <CarouselItem key={pillar.id} className="pl-5 basis-[75%] sm:basis-[40%] lg:basis-[28%]">
                  <Link href={`/programme#${slugify(pillar.title)}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    whileHover={{ y: -4, transition: { type: "tween", duration: 0.15 } }}
                    whileTap={{ scale: 0.97 }}
                    className="cursor-pointer group"
                  >
                      <div
                        className={`relative rounded-[1.25rem] aspect-[9/16] ${style.bg}
                        flex flex-col items-center justify-between p-6 sm:p-8 text-center overflow-hidden
                        transition-all duration-200 shadow-lg
                        group-hover:shadow-2xl group-hover:shadow-black/20`}
                    >
                      {/* Number watermark */}
                      <span className={`absolute top-4 right-6 font-accent text-7xl sm:text-8xl font-black ${style.textColor} opacity-[0.12] leading-none select-none`}>
                        {number}
                      </span>

                      {/* Icon */}
                      <div className="relative z-10 mt-8">
                        <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto">
                          <Icon className={`w-10 h-10 ${style.iconColor}`} strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex-1 flex flex-col justify-center py-4">
                        <h3 className={`font-accent text-xl sm:text-2xl lg:text-3xl font-extrabold ${style.textColor} uppercase tracking-wide leading-tight mb-3 break-words -rotate-3`}>
                          {pillar.title}
                        </h3>
                        <p className={`${style.subtextColor} text-sm sm:text-base leading-relaxed`}>
                          {pillar.intro}
                        </p>
                      </div>

                      {/* Bottom indicator */}
                      <div className={`relative z-10 flex items-center gap-2 ${style.textColor} opacity-60 group-hover:opacity-100 transition-opacity duration-200`}>
                        <span className="text-sm font-bold uppercase tracking-wider">En savoir plus</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </motion.div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="flex items-center justify-center gap-4 mt-10">
            <CarouselPrevious className="static translate-y-0 w-12 h-12 rounded-xl border-2 border-campaign-lime bg-transparent text-campaign-lime hover:bg-campaign-lime hover:text-accent-foreground transition-all duration-200" />
            <CarouselNext className="static translate-y-0 w-12 h-12 rounded-xl border-2 border-campaign-lime bg-transparent text-campaign-lime hover:bg-campaign-lime hover:text-accent-foreground transition-all duration-200" />
          </div>
        </Carousel>

        {/* CTA */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.button
            onClick={() => router.push("/programme")}
            className="inline-flex items-center gap-3 gradient-lime text-accent-foreground px-12 py-5 rounded-2xl font-extrabold text-base shadow-xl uppercase tracking-wide -rotate-1 hover:rotate-0 hover:shadow-[0_20px_50px_-10px_hsl(var(--campaign-lime)/0.5)] transition-all duration-200"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94, rotate: -3 }}
          >
            Voir le programme complet
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgrammeSection;
