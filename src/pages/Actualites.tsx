import { motion } from "framer-motion";
import { Calendar, Newspaper } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const actualites = [
  {
    title: "Lancement officiel de la campagne",
    date: "15 Janvier 2026",
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&h=500&fit=crop",
    tag: "Événement",
    desc: "Le coup d'envoi de notre aventure collective pour redonner à Bouc-Bel-Air le dynamisme qu'elle mérite.",
  },
  {
    title: "Rencontre avec les commerçants du centre-ville",
    date: "28 Janvier 2026",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&h=500&fit=crop",
    tag: "Terrain",
    desc: "Échanges concrets avec les commerçants sur la revitalisation du centre ancien et les aides à l'installation.",
  },
  {
    title: "Réunion publique : urbanisme et cadre de vie",
    date: "5 Février 2026",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop",
    tag: "Programme",
    desc: "Présentation de nos mesures contre les promoteurs et pour un urbanisme maîtrisé.",
  },
  {
    title: "Porte-à-porte dans le quartier des Music",
    date: "12 Février 2026",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=500&fit=crop",
    tag: "Terrain",
    desc: "À la rencontre des habitants, quartier par quartier, pour écouter et comprendre vos besoins.",
  },
  {
    title: "Tribune : Protégeons nos espaces naturels",
    date: "20 Février 2026",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=500&fit=crop",
    tag: "Tribune",
    desc: "Un appel à la préservation des collines et espaces boisés face à la pression immobilière.",
  },
];

const tagColors: Record<string, string> = {
  "Événement": "gradient-lime text-accent-foreground",
  "Terrain": "gradient-teal text-primary-foreground",
  "Programme": "bg-primary text-primary-foreground",
  "Tribune": "bg-foreground text-background",
};

const Actualites = () => {
  return (
    <main className="min-h-screen bg-campaign-ice">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Sur le terrain</span>
            <h1
              className="font-accent font-extrabold text-primary leading-[0.9] uppercase tracking-tight break-words"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              ACTU<span className="text-campaign-lime">ALITÉS</span>
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg mt-6 font-medium">
              Suivez notre campagne au quotidien, sur le terrain et auprès des Boucains.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {actualites.map((actu, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-lg bg-background">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={actu.image}
                      alt={actu.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${tagColors[actu.tag] || "bg-muted text-foreground"}`}>
                        {actu.tag}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-3.5 h-3.5 text-campaign-lime" />
                      <span className="text-muted-foreground text-xs font-bold">{actu.date}</span>
                    </div>
                    <h2 className="font-accent font-extrabold text-foreground text-lg leading-snug mb-2 group-hover:text-primary transition-colors duration-300 uppercase">
                      {actu.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {actu.desc}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Actualites;
