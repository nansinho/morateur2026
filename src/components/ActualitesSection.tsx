import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Newspaper } from "lucide-react";

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
  "Événement": "bg-campaign-gold text-primary",
  "Terrain": "bg-campaign-green text-primary-foreground",
  "Programme": "bg-campaign-coral text-primary-foreground",
  "Tribune": "bg-campaign-lavender text-primary-foreground",
};

const ActualitesSection = () => {
  return (
    <section className="py-24 bg-campaign-warm relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-campaign-coral text-primary-foreground font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full mb-4">
            <Newspaper className="w-3.5 h-3.5" />
            Sur le terrain
          </span>
          <h2 className="font-heading text-5xl md:text-7xl font-extrabold text-foreground leading-tight">
            Les <span className="text-campaign-green">actu</span><span className="text-campaign-gold">alités</span>
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
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider ${tagColors[actu.tag] || "bg-muted text-foreground"}`}>
                        {actu.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-3.5 h-3.5 text-campaign-green" />
                        <span className="text-primary-foreground/70 text-xs font-bold">{actu.date}</span>
                      </div>
                      <h3 className="font-heading font-extrabold text-primary-foreground text-lg leading-snug group-hover:text-campaign-green transition-colors duration-300">
                        {actu.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-4 mt-10">
            <CarouselPrevious className="static translate-y-0 w-14 h-14 rounded-full border-2 border-campaign-green bg-transparent text-campaign-green hover:bg-campaign-green hover:text-primary-foreground transition-all duration-300" />
            <CarouselNext className="static translate-y-0 w-14 h-14 rounded-full border-2 border-campaign-green bg-transparent text-campaign-green hover:bg-campaign-green hover:text-primary-foreground transition-all duration-300" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default ActualitesSection;
