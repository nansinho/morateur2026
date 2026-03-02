'use client'

import { motion } from "framer-motion";
import { Calendar, ChevronRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Article } from "@/lib/types/database";

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

export default function ActualitesContent({ articles }: { articles: Article[] }) {
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
            <p className="text-primary/60 max-w-xl text-lg mt-6 font-medium">
              Suivez notre campagne au quotidien, sur le terrain et auprès des Boucains.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2">
            {articles.map((article, i) => {
              const style = tagStyles[article.tag] || defaultStyle;
              const articleLink = article.slug ? `/actualites/${article.slug}` : '#';
              return (
                <Link key={article.id} href={articleLink} className="block">
                  <motion.article
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    whileHover={{ y: -4, transition: { type: "tween", duration: 0.15 } }}
                    whileTap={{ scale: 0.97 }}
                    className="group cursor-pointer"
                  >
                    <div className={`relative rounded-[1.25rem] overflow-hidden shadow-lg ${style.bg} flex flex-col h-full transition-all duration-200 group-hover:shadow-2xl group-hover:shadow-black/20`}>
                      {/* Image */}
                      <div className="aspect-[16/9] overflow-hidden relative">
                        <img
                          src={article.image}
                          alt={article.image_alt || article.title}
                          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent`} />
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

                        <h2 className={`font-accent font-extrabold ${style.text} text-lg sm:text-xl leading-snug mb-3 uppercase tracking-wide -rotate-1`}>
                          {article.title}
                        </h2>
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
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
