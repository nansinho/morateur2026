'use client'

import { motion } from "framer-motion";
import Image from "next/image";

const equipe1 = "/images/equipe-1.png";
const equipe2 = "/images/equipe-2.png";
const equipe3 = "/images/equipe-3.png";
const equipe4 = "/images/equipe-4.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const members = [
  { name: "Manon Clément-Costa", role: "Cheffe d'entreprise", img: equipe1 },
  { name: "Jean-Luc Berger", role: "Responsable financier", img: equipe2 },
  { name: "Valérie Castineiras", role: "RH & Pompier volontaire", img: equipe3 },
  { name: "François Deniau", role: "Dir. commercial retraité", img: equipe4 },
];

const TeamSection = () => {
  return (
    <section id="equipe" className="gradient-teal-deep relative overflow-x-clip">
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-28 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14"
        >
          <span className="section-label">Ensemble</span>
          <h2
            className="font-accent font-extrabold text-primary-foreground leading-[0.9] uppercase tracking-tight break-words"
            style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
          >
            L&apos;<span className="text-campaign-lime">ÉQUIPE</span>
          </h2>
          <p className="text-primary-foreground/40 max-w-xl text-base sm:text-lg mt-4 sm:mt-6 font-medium">
            Une équipe aux expériences multiples, engagée pour Bouc-Bel-Air.
          </p>
        </motion.div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {members.map((m, i) => (
              <CarouselItem key={i} className="pl-4 basis-1/2 lg:basis-1/4">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group"
                >
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <div className="aspect-[3/5] overflow-hidden relative">
                      <Image
                        src={m.img}
                        alt={m.name}
                        fill
                        className="object-cover object-center transition-transform duration-200 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                        <span className="gradient-lime text-accent-foreground px-3 py-1 sm:px-4 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                          {m.role}
                        </span>
                      </div>
                    </div>
                    {/* Info band - slide up on hover */}
                    <div className="absolute bottom-0 left-0 right-0 z-10 bg-primary/85 backdrop-blur-sm p-4 sm:p-5 max-h-[60%] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                      <h3 className="font-accent font-extrabold text-primary-foreground text-sm sm:text-base leading-snug group-hover:text-campaign-lime transition-colors duration-200 uppercase tracking-wide truncate">
                        {m.name}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-4 mt-8 sm:mt-10">
            <CarouselPrevious className="static translate-y-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 border-campaign-lime bg-transparent text-campaign-lime hover:bg-campaign-lime hover:text-accent-foreground transition-all duration-200" />
            <CarouselNext className="static translate-y-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 border-campaign-lime bg-transparent text-campaign-lime hover:bg-campaign-lime hover:text-accent-foreground transition-all duration-200" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TeamSection;
