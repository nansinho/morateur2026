import { motion } from "framer-motion";
import { Calendar, Newspaper } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const actualites = [
  {
    title: "Lancement officiel de la campagne",
    date: "15 Janvier 2026",
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&h=500&fit=crop",
    tag: "Événement",
  },
  {
    title: "Rencontre avec les commerçants du centre-ville",
    date: "28 Janvier 2026",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&h=500&fit=crop",
    tag: "Terrain",
  },
  {
    title: "Réunion publique : urbanisme et cadre de vie",
    date: "5 Février 2026",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
    tag: "Programme",
  },
  {
    title: "Porte-à-porte dans le quartier des Music",
    date: "12 Février 2026",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop",
    tag: "Terrain",
  },
  {
    title: "Tribune : Protégeons nos espaces naturels",
    date: "20 Février 2026",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=500&fit=crop",
    tag: "Tribune",
  },
];

const tagColors: Record<string, string> = {
  "Événement": "gradient-lime text-accent-foreground",
  "Terrain": "gradient-teal text-primary-foreground",
  "Programme": "bg-primary text-primary-foreground",
  "Tribune": "bg-foreground text-background",
};

const ActualitesSection = () => {
  return (
    <section aria-label="Actualités de la campagne" className="py-16 sm:py-24 bg-campaign-ice relative overflow-hidden">
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

        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-5">
            {actualites.map((actu, i) => (
              <CarouselItem key={i} className="pl-5 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="group cursor-pointer"
                >
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                    <img
                      src={actu.image}
                      alt={actu.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${tagColors[actu.tag] || "bg-muted text-foreground"}`}>
                        {actu.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-3.5 h-3.5 text-campaign-lime" />
                        <span className="text-primary-foreground/70 text-xs font-bold">{actu.date}</span>
                      </div>
                      <h3 className="font-accent font-extrabold text-primary-foreground text-lg leading-snug group-hover:text-campaign-lime transition-colors duration-300">
                        {actu.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-4 mt-10">
            <CarouselPrevious className="static translate-y-0 w-12 h-12 rounded-xl border-2 border-campaign-lime bg-transparent text-campaign-lime hover:bg-campaign-lime hover:text-accent-foreground transition-all duration-300" />
            <CarouselNext className="static translate-y-0 w-12 h-12 rounded-xl border-2 border-campaign-lime bg-transparent text-campaign-lime hover:bg-campaign-lime hover:text-accent-foreground transition-all duration-300" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default ActualitesSection;
