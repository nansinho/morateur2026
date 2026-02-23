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
  "Programme": "bg-campaign-sky text-primary",
  "Tribune": "bg-secondary text-primary-foreground",
};

const ActualitesSection = () => {
  return (
    <section className="py-24 bg-campaign-warm relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-campaign-green font-semibold text-xs uppercase tracking-[0.3em] mb-4">
            Sur le terrain
          </p>
          <h2 className="font-heading text-5xl md:text-6xl font-extrabold text-foreground leading-tight">
            Les <span className="text-campaign-green">actualités</span>
          </h2>
        </motion.div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {actualites.map((actu, i) => (
              <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group cursor-pointer"
                >
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                    <img
                      src={actu.image}
                      alt={actu.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
                    
                    {/* Tag */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${tagColors[actu.tag] || "bg-muted text-foreground"}`}>
                        {actu.tag}
                      </span>
                    </div>

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-3.5 h-3.5 text-campaign-green" />
                        <span className="text-primary-foreground/60 text-xs font-medium">{actu.date}</span>
                      </div>
                      <h3 className="font-heading font-bold text-primary-foreground text-lg leading-snug group-hover:text-campaign-green transition-colors duration-300">
                        {actu.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center gap-3 mt-8">
            <CarouselPrevious className="static translate-y-0 w-12 h-12 rounded-full border-2 border-foreground/10 bg-card hover:bg-campaign-green hover:border-campaign-green hover:text-primary-foreground transition-all duration-300" />
            <CarouselNext className="static translate-y-0 w-12 h-12 rounded-full border-2 border-foreground/10 bg-card hover:bg-campaign-green hover:border-campaign-green hover:text-primary-foreground transition-all duration-300" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default ActualitesSection;
