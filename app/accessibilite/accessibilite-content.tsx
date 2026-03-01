'use client'

import { motion } from "framer-motion";
import { Accessibility, Eye, Ear, Brain, Heart, ArrowRight, Monitor, BookOpen, Users, Keyboard, Contrast, ImageIcon, Layout, Smartphone } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { scrollToHash } from "@/lib/scroll-to-hash";

const engagements: {
  icon: typeof Monitor;
  title: string;
  desc: string;
  bg: string;
  iconColor: string;
  textColor: string;
  subtextColor: string;
}[] = [
  {
    icon: Monitor,
    title: "Un site accessible",
    desc: "Ce site respecte les standards WCAG et a été conçu pour être navigable au clavier, compatible avec les lecteurs d'écran, et lisible par tous.",
    bg: "bg-gradient-to-br from-campaign-lime to-campaign-lime-light",
    iconColor: "text-accent-foreground",
    textColor: "text-accent-foreground",
    subtextColor: "text-accent-foreground/70",
  },
  {
    icon: Eye,
    title: "Handicap visuel",
    desc: "Contrastes renforcés, textes lisibles, descriptions alternatives sur les images. Chaque citoyen doit pouvoir s'informer sans obstacle.",
    bg: "gradient-teal",
    iconColor: "text-primary-foreground",
    textColor: "text-primary-foreground",
    subtextColor: "text-primary-foreground/70",
  },
  {
    icon: Ear,
    title: "Handicap auditif",
    desc: "Nos contenus sont principalement textuels. Nous nous engageons à sous-titrer toutes les vidéos de campagne.",
    bg: "bg-campaign-steel",
    iconColor: "text-primary-foreground",
    textColor: "text-primary-foreground",
    subtextColor: "text-primary-foreground/70",
  },
  {
    icon: Brain,
    title: "Handicap cognitif",
    desc: "Un langage clair, des parcours de navigation simples et des informations structurées pour faciliter la compréhension de tous.",
    bg: "bg-campaign-olive",
    iconColor: "text-primary-foreground",
    textColor: "text-primary-foreground",
    subtextColor: "text-primary-foreground/70",
  },
  {
    icon: Users,
    title: "Lieux publics accessibles",
    desc: "Nous porterons un audit complet de l'accessibilité des bâtiments et espaces publics de Bouc-Bel-Air dès notre prise de fonction.",
    bg: "gradient-teal-deep",
    iconColor: "text-campaign-lime",
    textColor: "text-primary-foreground",
    subtextColor: "text-primary-foreground/60",
  },
  {
    icon: BookOpen,
    title: "Écoute et dialogue",
    desc: "Nous créerons un comité consultatif handicap pour que les personnes concernées participent directement aux décisions qui les impactent.",
    bg: "bg-primary",
    iconColor: "text-primary-foreground",
    textColor: "text-primary-foreground",
    subtextColor: "text-primary-foreground/70",
  },
];

const rgaaBadges = [
  { icon: Keyboard, label: "Navigation clavier complète" },
  { icon: Contrast, label: "Contrastes AA minimum" },
  { icon: ImageIcon, label: "Textes alternatifs" },
  { icon: Layout, label: "Structure sémantique ARIA" },
  { icon: Smartphone, label: "Responsive tous appareils" },
];

export default function AccessibiliteContent() {
  const router = useRouter();

  const handleCTA = () => {
    router.push('/');
    setTimeout(() => scrollToHash('#procuration'), 500);
  };

  return (
    <main className="min-h-screen bg-campaign-ice">
      <Navbar />

      {/* Hero with banner image */}
      <section className="relative overflow-hidden">
        {/* Banner image */}
        <div className="relative aspect-[16/7] sm:aspect-[21/9] w-full">
          <Image
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1600&h=700&fit=crop"
            alt="Des personnes diverses ensemble, symbole d'inclusion et d'accessibilité"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />

          {/* Text overlay */}
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 sm:px-6 pb-10 sm:pb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="section-label">Pour tous</span>
                <h1
                  className="font-accent font-extrabold text-primary-foreground leading-[0.9] uppercase tracking-tight break-words"
                  style={{ fontSize: "clamp(2.5rem, 8vw, 5.5rem)" }}
                >
                  ACCES<span className="text-campaign-lime">SIBILITÉ</span>
                </h1>
                <p className="text-primary-foreground/60 max-w-lg text-base sm:text-lg mt-4 font-medium leading-relaxed">
                  L&apos;accessibilité n&apos;est pas une option, c&apos;est un droit fondamental.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre engagement — 2 columns */}
      <section className="py-16 sm:py-24 bg-campaign-ice">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Left — text */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl gradient-lime flex items-center justify-center flex-shrink-0">
                    <Heart className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <div>
                    <h2 className="font-accent font-extrabold text-primary text-2xl uppercase tracking-wide">
                      Notre engagement
                    </h2>
                    <p className="text-muted-foreground text-sm font-medium">Mathieu Morateur &amp; son équipe</p>
                  </div>
                </div>
                <div className="space-y-5 text-foreground/80 text-base leading-relaxed">
                  <p>
                    Trop souvent, les personnes en situation de handicap sont les grandes absentes
                    des projets municipaux. Des trottoirs impraticables en fauteuil, des bâtiments
                    publics sans rampe d&apos;accès, des informations inaccessibles... Ce n&apos;est pas la
                    ville que nous voulons construire.
                  </p>
                  <p>
                    Si nous sommes élus, l&apos;accessibilité sera une priorité transversale de chaque
                    décision. Pas un sujet à part, mais un réflexe dans chaque projet — de la voirie
                    aux écoles, des espaces verts aux services numériques.
                  </p>
                  <p className="font-semibold text-primary">
                    Chaque Boucain compte. Chaque voix mérite d&apos;être entendue. Chaque citoyen mérite
                    de participer pleinement à la vie de sa commune.
                  </p>
                </div>
              </div>

              {/* Right — pull quote */}
              <div className="flex items-center">
                <div className="relative pl-8 border-l-4 border-campaign-lime">
                  <span className="absolute -top-4 -left-4 text-8xl font-accent font-black text-campaign-lime/20 leading-none select-none">&ldquo;</span>
                  <blockquote className="font-accent font-extrabold text-primary text-2xl sm:text-3xl leading-snug uppercase tracking-wide">
                    Nous pensons à vous.<br />
                    Nous ne vous<br />
                    <span className="text-campaign-lime">oublierons pas.</span>
                  </blockquote>
                  <p className="mt-4 text-muted-foreground text-sm font-bold uppercase tracking-wider">
                    — Mathieu Morateur
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Engagements — colored cards */}
      <section className="py-16 sm:py-24 gradient-teal-deep overflow-x-clip">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="section-label">Concrètement</span>
            <h2
              className="font-accent font-extrabold text-primary-foreground leading-[0.9] uppercase tracking-tight break-words"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              NOS <span className="text-campaign-lime">ENGAGEMENTS</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pt-2">
            {engagements.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4, transition: { type: "tween", duration: 0.15 } }}
                whileTap={{ scale: 0.97 }}
                className="group"
              >
                <div className={`relative rounded-[1.25rem] ${e.bg} p-7 sm:p-8 h-full flex flex-col overflow-hidden shadow-lg transition-all duration-200 group-hover:shadow-2xl group-hover:shadow-black/20`}>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                    <e.icon className={`w-7 h-7 ${e.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <h3 className={`font-accent font-extrabold ${e.textColor} text-lg sm:text-xl uppercase tracking-wide mb-3 -rotate-1`}>
                    {e.title}
                  </h3>
                  <p className={`${e.subtextColor} text-sm leading-relaxed flex-1`}>
                    {e.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conformité RGAA — badges */}
      <section className="py-16 sm:py-20 bg-campaign-ice">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <Accessibility className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="font-accent font-extrabold text-primary text-xl sm:text-2xl uppercase tracking-wide">
                Accessibilité de ce site
              </h2>
            </div>

            <p className="text-foreground/70 text-sm leading-relaxed max-w-2xl mb-8">
              Ce site a été conçu en tenant compte des recommandations du RGAA
              (Référentiel Général d&apos;Amélioration de l&apos;Accessibilité) et des
              standards internationaux WCAG 2.1.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {rgaaBadges.map((badge, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2.5 bg-white rounded-xl px-4 py-3 shadow-sm border border-primary/5"
                >
                  <div className="w-2 h-2 rounded-full bg-campaign-lime flex-shrink-0" />
                  <badge.icon className="w-4 h-4 text-primary/50 flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground/80">{badge.label}</span>
                </div>
              ))}
            </div>

            <p className="text-foreground/50 text-sm leading-relaxed max-w-2xl">
              Si vous rencontrez des difficultés d&apos;accès à notre site, n&apos;hésitez
              pas à nous contacter. Nous ferons le maximum pour corriger tout problème signalé.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-teal-deep border-t border-primary-foreground/[0.08] py-16 sm:py-24 text-center">
        <div className="container mx-auto px-4 sm:px-6">
          <span className="section-label justify-center">Ensemble</span>
          <h2
            className="font-accent font-extrabold text-primary-foreground uppercase tracking-tight leading-[0.9] mb-4 break-words"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            UNE VILLE POUR <span className="text-campaign-lime">TOUS</span>
          </h2>
          <p className="text-primary-foreground/40 mb-10 max-w-lg mx-auto text-lg">
            Participez à construire une commune accessible et inclusive.
          </p>
          <motion.button
            onClick={handleCTA}
            className="inline-flex items-center gap-3 gradient-lime text-accent-foreground px-10 py-5 rounded-2xl font-extrabold uppercase tracking-wider text-base shadow-lg -rotate-2 hover:rotate-0 hover:shadow-[0_20px_50px_-10px_hsl(var(--campaign-lime)/0.5)] active:scale-95 transition-all duration-200"
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.94, rotate: -4 }}
          >
            Rejoignez-nous
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
