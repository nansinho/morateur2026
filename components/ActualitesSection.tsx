'use client'

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { Article } from '@/lib/types/database';

const tagStyles: Record<string, { bg: string; text: string; accent: string; tagBg: string }> = {
  "Événement": {
    bg: "bg-campaign-lime-light",
    text: "text-accent-foreground",
    accent: "text-accent-foreground/60",
    tagBg: "bg-accent-foreground/15",
  },
  "Terrain": {
    bg: "bg-primary",
    text: "text-primary-foreground",
    accent: "text-primary-foreground/60",
    tagBg: "bg-campaign-lime/20",
  },
  "Programme": {
    bg: "bg-campaign-olive",
    text: "text-primary-foreground",
    accent: "text-primary-foreground/50",
    tagBg: "bg-primary-foreground/15",
  },
  "Tribune": {
    bg: "bg-campaign-steel",
    text: "text-primary-foreground",
    accent: "text-primary-foreground/60",
    tagBg: "bg-primary-foreground/15",
  },
};

const defaultStyle = { bg: "bg-muted", text: "text-foreground", accent: "text-muted-foreground", tagBg: "bg-foreground/10" };

const ActualitesSection = ({ articles }: { articles: Article[] }) => {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  );
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    setScrollSnaps(api.scrollSnapList());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, onSelect]);

  return (
    <section aria-label="Actualités de la campagne" className="py-16 sm:py-24 bg-campaign-ice relative overflow-x-clip">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="section-label">Sur le terrain</span>
          <h2
            className="font-accent font-extrabold uppercase leading-[0.9] tracking-tight text-primary break-words"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            ACTU<span className="text-campaign-lime">ALITÉS</span>
          </h2>
        </motion.div>

        <Carousel
          opts={{ align: "start", loop: true, dragFree: true }}
          plugins={[autoplayPlugin.current]}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent className="-ml-5">
            {articles.map((article) => {
              const style = tagStyles[article.tag] || defaultStyle;
              const articleLink = article.slug ? `/actualites/${article.slug}` : '/actualites';
              return (
                <CarouselItem key={article.id} className="pl-5 basis-full sm:basis-1/2 lg:basis-1/3">
                  <Link href={articleLink} className="block">
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ y: -4, transition: { type: "tween", duration: 0.15 } }}
                      whileTap={{ scale: 0.97 }}
                      className="group cursor-pointer"
                    >
                      <div className={`relative rounded-[1.25rem] overflow-hidden shadow-lg ${style.bg} flex flex-col h-full transition-all duration-200 group-hover:shadow-2xl group-hover:shadow-black/20`}>
                        {/* Image */}
                        <div className="aspect-[16/9] overflow-hidden relative">
                          <Image
                            src={article.image}
                            alt={article.image_alt || article.title}
                            fill
                            className="object-cover transition-transform duration-200 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-6 sm:p-7 flex flex-col flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <span className={`${style.tagBg} ${style.text} px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider`}>
                              {article.tag}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <Calendar className={`w-3 h-3 ${style.accent}`} />
                              <span className={`${style.accent} text-[11px] font-bold`}>{article.date}</span>
                            </div>
                          </div>

                          <h3 className={`font-accent font-extrabold ${style.text} text-lg sm:text-xl leading-snug mb-3 uppercase tracking-wide -rotate-1`}>
                            {article.title}
                          </h3>
                          <p className={`${style.accent} text-sm leading-relaxed flex-1`}>
                            {article.description}
                          </p>

                          <div className={`flex items-center gap-1.5 mt-5 ${style.text} opacity-60 group-hover:opacity-100 transition-opacity duration-200`}>
                            <span className="text-xs font-bold uppercase tracking-wider">Lire la suite</span>
                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {/* Navigation arrows + dots */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <CarouselPrevious className="static translate-y-0 w-12 h-12 rounded-xl border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200" />

            {/* Pagination dots */}
            <div className="flex items-center gap-2">
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Aller à la diapositive ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === selectedIndex
                      ? "bg-primary w-6"
                      : "bg-primary/30 w-2 hover:bg-primary/50"
                  )}
                />
              ))}
            </div>

            <CarouselNext className="static translate-y-0 w-12 h-12 rounded-xl border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200" />
          </div>
        </Carousel>

        {/* CTA */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link href="/actualites">
            <motion.span
              className="inline-flex items-center gap-3 gradient-lime text-accent-foreground px-12 py-5 rounded-2xl font-extrabold text-base shadow-xl uppercase tracking-wide -rotate-1 hover:rotate-0 hover:shadow-[0_20px_50px_-10px_hsl(var(--campaign-lime)/0.5)] transition-all duration-200"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94, rotate: -3 }}
            >
              Toutes les actualités
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ActualitesSection;
