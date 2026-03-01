'use client'

import { motion } from "framer-motion";
import { Calendar, ExternalLink, User } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPressStyle } from "@/lib/press-styles";
import type { PressArticle } from "@/lib/types/database";

interface PresseContentProps {
  articles: PressArticle[];
}

export default function PresseContent({ articles }: PresseContentProps) {
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
            <p className="text-primary/60 max-w-xl text-lg mt-6 font-medium">
              Retrouvez les articles de presse consacrés à notre campagne et à notre projet pour Bouc-Bel-Air.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles */}
      <section className="pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 pt-2">
            {articles.map((article, i) => {
              const style = getPressStyle(article.source);
              return (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { type: "tween", duration: 0.15 } }}
                whileTap={{ scale: 0.97 }}
                className="group block cursor-pointer"
              >
                <div className={`relative rounded-[1.25rem] overflow-hidden ${style.bg} shadow-lg flex flex-col h-full transition-all duration-200 group-hover:shadow-2xl group-hover:shadow-black/20`}>
                  {/* Header with logo */}
                  <div className="p-6 sm:p-7 pb-0 sm:pb-0 flex items-center justify-between">
                    <Image
                      src={article.logo}
                      alt={`Logo ${article.source}`}
                      width={160}
                      height={40}
                      className={`h-8 sm:h-10 w-auto object-contain ${style.logoBrightness}`}
                    />
                    <span className={`${style.tagBg} ${style.tagText} px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider`}>
                      Presse
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <h2 className={`font-accent font-extrabold ${style.text} text-lg sm:text-xl leading-snug mb-4 uppercase tracking-wide -rotate-1`}>
                      {article.title}
                    </h2>

                    <div className={`flex flex-wrap items-center gap-3 mb-4 text-[11px] font-bold ${style.accent}`}>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                      </div>
                    </div>

                    <p className={`${style.accent} text-sm leading-relaxed flex-1`}>
                      {article.excerpt}
                    </p>

                    <div className={`flex items-center gap-1.5 mt-5 ${style.linkColor} opacity-60 group-hover:opacity-100 transition-opacity duration-200`}>
                      <span className="text-xs font-bold uppercase tracking-wider">
                        Lire l&apos;article
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
