import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const actualites = [
  {
    title: "Lancement officiel de la campagne 🎉",
    date: "15 Janvier 2026",
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&h=500&fit=crop",
    tag: "Événement",
  },
  {
    title: "Rencontre avec les commerçants 🛍️",
    date: "28 Janvier 2026",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&h=500&fit=crop",
    tag: "Terrain",
  },
  {
    title: "Réunion publique : urbanisme 🏗️",
    date: "5 Février 2026",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
    tag: "Programme",
  },
  {
    title: "Porte-à-porte quartier des Music 🚪",
    date: "12 Février 2026",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop",
    tag: "Terrain",
  },
  {
    title: "Tribune : Espaces naturels 🌳",
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
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-campaign-mint/40 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-campaign-gold/15 blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <motion.span
            className="inline-block bg-campaign-coral text-primary-foreground font-extrabold text-sm uppercase tracking-wider px-5 py-2 rounded-full mb-4 shadow-md"
            whileHover={{ scale: 1.05, rotate: -2 }}
          >
            📰 Sur le terrain
          </motion.span>
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
                  whileHover={{ y: -8, rotate: 1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg">
                    <img
                      src={actu.image}
                      alt={actu.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-md ${tagColors[actu.tag] || "bg-muted text-foreground"}`}>
                        {actu.tag}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-3.5 h-3.5 text-campaign-green" />
                        <span className="text-primary-foreground/70 text-xs font-bold">{actu.date}</span>
                      </div>
                      <h3 className="font-heading font-extrabold text-primary-foreground text-lg leading-snug">
                        {actu.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-4 mt-10">
            <CarouselPrevious className="static translate-y-0 w-14 h-14 rounded-full border-2 border-campaign-green bg-campaign-green/10 text-campaign-green hover:bg-campaign-green hover:text-primary-foreground transition-all duration-300" />
            <CarouselNext className="static translate-y-0 w-14 h-14 rounded-full border-2 border-campaign-green bg-campaign-green/10 text-campaign-green hover:bg-campaign-green hover:text-primary-foreground transition-all duration-300" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default ActualitesSection;
