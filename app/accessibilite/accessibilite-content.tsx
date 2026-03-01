'use client'

import { motion } from "framer-motion";
import { Accessibility, Eye, Ear, Brain, Heart, ArrowRight, Monitor, BookOpen, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { scrollToHash } from "@/lib/scroll-to-hash";

const engagements = [
  {
    icon: Monitor,
    title: "Un site accessible",
    desc: "Ce site respecte les standards WCAG et a été conçu pour être navigable au clavier, compatible avec les lecteurs d'écran, et lisible par tous.",
  },
  {
    icon: Eye,
    title: "Handicap visuel",
    desc: "Contrastes renforcés, textes lisibles, descriptions alternatives sur les images. Chaque citoyen doit pouvoir s'informer sans obstacle.",
  },
  {
    icon: Ear,
    title: "Handicap auditif",
    desc: "Nos contenus sont principalement textuels. Nous nous engageons à sous-titrer toutes les vidéos de campagne.",
  },
  {
    icon: Brain,
    title: "Handicap cognitif",
    desc: "Un langage clair, des parcours de navigation simples et des informations structurées pour faciliter la compréhension de tous.",
  },
  {
    icon: Users,
    title: "Accessibilité des lieux publics",
    desc: "Nous porterons un audit complet de l'accessibilité des bâtiments et espaces publics de Bouc-Bel-Air dès notre prise de fonction.",
  },
  {
    icon: BookOpen,
    title: "Écoute et dialogue",
    desc: "Nous créerons un comité consultatif handicap pour que les personnes concernées participent directement aux décisions qui les impactent.",
  },
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

      {/* Hero */}
      <section className="gradient-teal-deep pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="section-label">Pour tous</span>
            <h1
              className="font-accent font-extrabold text-primary-foreground leading-[0.9] uppercase tracking-tight break-words"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
            >
              ACCES<span className="text-campaign-lime">SIBILITÉ</span>
            </h1>
            <p className="text-primary-foreground/50 max-w-xl text-lg mt-6 font-medium leading-relaxed">
              L'accessibilité n'est pas une option, c'est un droit fondamental.
              Notre engagement : que chaque habitant de Bouc-Bel-Air, quelle que soit sa situation,
              puisse accéder à l'information, participer à la vie citoyenne et se sentir pleinement inclus.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Message personnel */}
      <section className="py-16 sm:py-20 bg-campaign-ice">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="rounded-2xl border-2 border-primary/10 p-8 sm:p-10 bg-white/50 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl gradient-lime flex items-center justify-center flex-shrink-0">
                  <Heart className="w-7 h-7 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="font-accent font-extrabold text-primary text-xl uppercase tracking-wide">
                    Notre engagement
                  </h2>
                  <p className="text-muted-foreground text-sm font-medium">Mathieu Morateur &amp; son équipe</p>
                </div>
              </div>
              <div className="space-y-4 text-foreground/80 text-base leading-relaxed">
                <p>
                  Nous pensons à vous. Nous ne vous oublierons pas.
                </p>
                <p>
                  Trop souvent, les personnes en situation de handicap sont les grandes absentes
                  des projets municipaux. Des trottoirs impraticables en fauteuil, des bâtiments
                  publics sans rampe d'accès, des informations inaccessibles... Ce n'est pas la
                  ville que nous voulons construire.
                </p>
                <p>
                  Si nous sommes élus, l'accessibilité sera une priorité transversale de chaque
                  décision. Pas un sujet à part, mais un réflexe dans chaque projet — de la voirie
                  aux écoles, des espaces verts aux services numériques.
                </p>
                <p className="font-semibold text-primary">
                  Chaque Boucain compte. Chaque voix mérite d'être entendue. Chaque citoyen mérite
                  de participer pleinement à la vie de sa commune.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Engagements */}
      <section className="py-16 sm:py-20 gradient-teal-deep">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <span className="section-label">Concretement</span>
            <h2
              className="font-accent font-extrabold text-primary-foreground leading-[0.9] uppercase tracking-tight break-words"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              NOS <span className="text-campaign-lime">ENGAGEMENTS</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {engagements.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="rounded-2xl p-6 sm:p-7 bg-white/[0.06] border border-white/10 hover:border-campaign-lime/30 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl gradient-lime flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200">
                  <e.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-accent font-extrabold text-primary-foreground text-lg uppercase tracking-wide mb-3">
                  {e.title}
                </h3>
                <p className="text-primary-foreground/50 text-sm leading-relaxed">
                  {e.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessibilité du site */}
      <section className="py-16 sm:py-20 bg-campaign-ice">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <Accessibility className="w-6 h-6 text-primary-foreground" />
              </div>
              <h2 className="font-accent font-extrabold text-primary text-xl sm:text-2xl uppercase tracking-wide">
                Accessibilité de ce site
              </h2>
            </div>
            <div className="space-y-4 text-foreground/70 text-sm leading-relaxed">
              <p>
                Ce site a été conçu en tenant compte des recommandations du RGAA
                (Référentiel Général d'Amélioration de l'Accessibilité) et des
                standards internationaux WCAG 2.1.
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-campaign-lime mt-1.5 flex-shrink-0" />
                  Navigation au clavier complète
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-campaign-lime mt-1.5 flex-shrink-0" />
                  Contrastes de couleurs respectant le ratio minimum AA
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-campaign-lime mt-1.5 flex-shrink-0" />
                  Textes alternatifs sur les images
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-campaign-lime mt-1.5 flex-shrink-0" />
                  Structure sémantique (titres, landmarks ARIA)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-campaign-lime mt-1.5 flex-shrink-0" />
                  Site responsive, lisible sur tous les appareils
                </li>
              </ul>
              <p>
                Si vous rencontrez des difficultés d'accès à notre site, n'hésitez
                pas à nous contacter. Nous ferons le maximum pour corriger tout problème signalé.
              </p>
            </div>
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
