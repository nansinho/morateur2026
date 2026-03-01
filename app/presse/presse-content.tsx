'use client'

import { motion } from "framer-motion";
import { Calendar, ExternalLink, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const logoMarseillaise = "/images/logo-lamarseillaise.svg";
const logoProvence = "/images/logo-laprovence.svg";

const articles = [
  {
    media: "La Marseillaise",
    logo: logoMarseillaise,
    title: "Mathieu Morateur revient comme candidat",
    date: "24 Décembre 2025",
    author: "Eva Bonnet-Gonnet",
    excerpt:
      "Après une première expérience municipale, Mathieu Morateur annonce son retour sur la scène politique locale de Bouc-Bel-Air avec l'ambition de proposer une alternative crédible aux habitants.",
    url: "https://www.lamarseillaise.fr/accueil/mathieu-morateur-revient-comme-candidat-ON19366109",
    bg: "bg-primary",
    text: "text-primary-foreground",
    accent: "text-primary-foreground/60",
    tagBg: "bg-campaign-lime/20",
    tagText: "text-campaign-lime",
    linkColor: "text-campaign-lime",
    logoBrightness: "brightness-0 invert",
  },
  {
    media: "La Provence",
    logo: logoProvence,
    title: "Municipales 2026 à Bouc-Bel-Air : Mathieu Morateur veut faire barrage aux promoteurs",
    date: "25 Octobre 2025",
    author: "Carole Barletta",
    excerpt:
      "Le candidat aux municipales de 2026 à Bouc-Bel-Air affirme sa volonté de protéger le cadre de vie des Boucains face à la pression immobilière et aux projets des promoteurs.",
    url: "https://www.laprovence.com/article/elections/1485411779646614/municipales-2026-a-bouc-bel-air-mathieu-morateur-se-veut-faire-barrage-aux-promoteurs",
    bg: "bg-campaign-lime-light",
    text: "text-accent-foreground",
    accent: "text-accent-foreground/60",
    tagBg: "bg-accent-foreground/15",
    tagText: "text-accent-foreground",
    linkColor: "text-accent-foreground",
    logoBrightness: "",
  },
];

export default function PresseContent() {
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
            <span className="section-label">Ils parlent de nous</span>
            <h1
              className="font-accent font-extrabold text-primary leading-[0.9] uppercase tracking-tight break-words"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              REVUE DE <span className="text-campaign-lime">PRESSE</span>
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg mt-6 font-medium">
              Retrouvez les articles de presse consacrés à notre campagne et à notre projet pour Bouc-Bel-Air.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {articles.map((article, i) => (
              <motion.a
                key={i}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="group block cursor-pointer"
              >
                <div className={`relative rounded-[1.25rem] overflow-hidden ${article.bg} shadow-lg flex flex-col h-full transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-black/20`}>
                  {/* Header with logo */}
                  <div className="p-6 sm:p-7 pb-0 sm:pb-0 flex items-center justify-between">
                    <img
                      src={article.logo}
                      alt={`Logo ${article.media}`}
                      className={`h-8 sm:h-10 w-auto object-contain ${article.logoBrightness}`}
                    />
                    <span className={`${article.tagBg} ${article.tagText} px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider`}>
                      Presse
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <h2 className={`font-accent font-extrabold ${article.text} text-lg sm:text-xl leading-snug mb-4 uppercase tracking-wide -rotate-1`}>
                      {article.title}
                    </h2>

                    <div className={`flex flex-wrap items-center gap-3 mb-4 text-[11px] font-bold ${article.accent}`}>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                      </div>
                    </div>

                    <p className={`${article.accent} text-sm leading-relaxed flex-1`}>
                      {article.excerpt}
                    </p>

                    <div className={`flex items-center gap-1.5 mt-5 ${article.linkColor} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}>
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Lire l&apos;article
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
