'use client'

import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Briefcase, GraduationCap, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const candidatImg = "/images/header_candidat_portrait.png";

/* ─── Sub-components ─── */

const PullQuote = ({ children }: { children: React.ReactNode }) => (
  <blockquote className="border-l-4 border-campaign-lime pl-6 md:pl-8 my-8 md:my-12">
    <p className="font-heading font-bold text-primary-foreground text-lg md:text-xl leading-relaxed italic">
      {children}
    </p>
  </blockquote>
);

const GradientDivider = () => (
  <div className="my-8 md:my-12 flex items-center gap-4">
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-campaign-lime/40 to-transparent" />
    <div className="w-2 h-2 rounded-full bg-campaign-lime/60" />
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-campaign-lime/40 to-transparent" />
  </div>
);

const CounterStat = ({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center p-4 md:p-6 rounded-2xl bg-primary-foreground/[0.06] border border-primary-foreground/10">
      <p className="font-accent text-campaign-lime text-3xl md:text-5xl font-extrabold tracking-tight">
        {count}{suffix}
      </p>
      <div className="w-10 h-px mx-auto mt-3 mb-2 bg-campaign-lime/40" />
      <p className="text-primary-foreground/70 text-[10px] md:text-xs uppercase tracking-[0.15em] font-bold">{label}</p>
    </div>
  );
};

const HighlightCard = ({ Icon, title, desc, color = "from-campaign-lime/30 to-campaign-lime/10" }: { Icon: React.ElementType; title: string; desc: string; color?: string }) => (
  <div className={`flex items-start gap-4 p-4 md:p-5 rounded-xl bg-gradient-to-r ${color} backdrop-blur-sm`}>
    <div className="w-10 h-10 rounded-lg gradient-lime flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5 text-accent-foreground" />
    </div>
    <div>
      <h3 className="font-accent font-bold text-primary-foreground text-sm uppercase tracking-wide">{title}</h3>
      <p className="text-primary-foreground/70 text-sm mt-0.5">{desc}</p>
    </div>
  </div>
);

/* ─── Prose paragraph style ─── */
const prose = "text-primary-foreground/90 text-base md:text-lg leading-[1.85] md:leading-[1.9]";

/* ─── Main Page ─── */

export default function CandidatContent() {
  return (
    <main>
      <Navbar />

      {/* ── Hero ── */}
      <section className="gradient-teal-deep relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-end">
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={candidatImg}
                    alt="Mathieu Morateur, candidat aux municipales 2026 à Bouc-Bel-Air"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-primary/60 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl gradient-lime opacity-40 -z-10" aria-hidden="true" />
            </div>

            <div className="text-center lg:text-left">
              <span className="section-label">Le Candidat</span>
              <h1
                className="font-accent font-extrabold uppercase leading-[0.95] text-primary-foreground mb-4 break-words"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                MATHIEU<br />MORATEUR
              </h1>
              <p className="text-primary-foreground/60 text-lg md:text-xl font-heading leading-relaxed max-w-lg mx-auto lg:mx-0">
                Lettre aux Boucaines et aux Boucains
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lettre intégrale ── */}
      <section className="gradient-teal-deep relative" aria-label="Lettre intégrale du candidat">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl py-12 md:py-20 space-y-7">

          {/* ── Bloc 1 : Introduction ── */}
          <p className="text-primary-foreground text-lg md:text-xl leading-relaxed font-heading font-semibold">
            Chères Boucaines, Chers Boucains,
          </p>

          <p className={prose}>
            Le 15 mars prochain, vous élirez votre nouveau maire. Je m&apos;appelle{" "}
            <strong className="text-primary-foreground font-bold">Mathieu Morateur</strong>, j&apos;ai 36 ans et je me présente à vos
            suffrages pour le devenir.
          </p>

          <p className={prose}>
            Enfant de Bouc-Bel-Air, la principale motivation de ma candidature est de permettre à mes très jeunes
            enfants de grandir avec les mêmes chances et les mêmes opportunités que j&apos;ai eues à leur âge :{" "}
            <strong className="text-primary-foreground font-bold">
              grandir dans une commune audacieuse, au cadre de vie préservé.
            </strong>
          </p>

          <PullQuote>
            « Ma motivation est de permettre à mes enfants de grandir avec les mêmes chances que j&apos;ai eues. »
          </PullQuote>

          <GradientDivider />

          {/* ── Bloc 2 : Urbanisme ── */}
          <p className={prose}>
            Notre commune se trouve aujourd&apos;hui même à un{" "}
            <strong className="text-campaign-lime font-bold">tournant de son histoire</strong>. Nous le ressentons dans chacun
            de nos quartiers : le fragile équilibre entre développement et préservation se rompt. Et ce n&apos;est qu&apos;un
            aperçu de ce qui nous attend les 5 prochaines années si nous ne reprenons pas en mains notre destinée le
            15 mars !
          </p>

          <p className={prose}>
            Car en moins d&apos;un an, ce sont des permis de construire pour{" "}
            <strong className="text-primary-foreground font-bold">plus de 1 000 logements</strong> qui ont été déposés et à ce
            jour <strong className="text-primary-foreground font-bold">650 logements nouveaux</strong> ont été acceptés par la
            mairie.
          </p>

          <div className="grid grid-cols-3 gap-3 md:gap-5 my-4">
            <CounterStat value={1000} label="logements déposés" suffix="+" />
            <CounterStat value={650} label="acceptés par la mairie" />
            <CounterStat value={450} label="annulés par la préfecture" />
          </div>

          <p className={prose}>
            Heureusement, la préfecture a annulé 3 projets représentant 450 logements afin de permettre une{" "}
            <em>« évaluation environnementale »</em>, en raison des{" "}
            <em>« effets cumulatifs »</em> de cette avalanche d&apos;autorisations municipales. Mais le répit est de courte
            durée : environ 1 an.{" "}
            <strong className="text-campaign-lime font-bold">
              Il faudra donc agir dès mars prochain pour contrecarrer les projets des promoteurs.
            </strong>
          </p>

          <GradientDivider />

          {/* ── Bloc 3 : Infrastructures ── */}
          <p className={prose}>
            Car en face, nos services et nos infrastructures publics se dégradent. La vétusté très avancée des
            crèches, des écoles et des bâtiments publics en général, comme le foyer des Anciens, est{" "}
            <strong className="text-primary-foreground font-bold">indigne d&apos;une commune comme la nôtre</strong>.
          </p>

          <p className={prose}>
            Il est inacceptable que les toitures des écoles présentent des défauts d&apos;étanchéité, ou que même dans la
            dernière née, l&apos;école Virginie Dedieu, qui a été inaugurée il y a 10 ans, le thermomètre monte au-dessus
            de <strong className="text-primary-foreground font-bold">30 °C dès la fin du mois de mai</strong>, et baisse à 16 °C
            en hiver.
          </p>

          <PullQuote>
            « Il est inacceptable que le thermomètre monte au-dessus de 30 °C dans nos écoles dès le mois de mai. »
          </PullQuote>

          <p className={prose}>
            Il en va de même de nos voiries, dont le renouvellement est sans cesse repoussé. Les projets s&apos;enlisent,
            les permis défilent,{" "}
            <strong className="text-campaign-lime font-bold">
              Bouc-Bel-Air s&apos;asphyxie dans une crise de croissance non-maîtrisée.
            </strong>
          </p>

          <GradientDivider />

          {/* ── Bloc 4 : Village ── */}
          <p className={prose}>
            Et dans le même temps, notre village se meurt. Les animations se concentrent sur la place principale et
            oublient les ruelles pittoresques du centre ancien. Pourtant,{" "}
            <strong className="text-primary-foreground font-bold">il a tant à offrir !</strong>
          </p>

          <p className={prose}>
            Je me souviens, enfant, des retraites aux flambeaux qui l&apos;éclairaient, et des commerces qui lui donnaient
            de la vie.{" "}
            <strong className="text-campaign-lime font-bold">
              Retrouver cette âme, dans ce lieu central qui nous unit, sera notre priorité.
            </strong>
          </p>

          <PullQuote>
            « Je me souviens, enfant, des retraites aux flambeaux qui éclairaient nos ruelles. Retrouver cette âme sera
            notre priorité. »
          </PullQuote>

          <GradientDivider />

          {/* ── Bloc 5 : Parcours ── */}
          <p className={prose}>
            Vous pourrez compter sur mon équipe, aux expériences multiples et avérées, et sur moi-même.
          </p>

          <div className="space-y-3">
            <HighlightCard
              Icon={Briefcase}
              title="Ancien adjoint au maire"
              desc="De 2014 à 2020, engagé au service de Bouc-Bel-Air"
              color="from-campaign-lime/30 to-campaign-lime/10"
            />
            <HighlightCard
              Icon={GraduationCap}
              title="Analyste financier expert"
              desc="Diplômé de Sciences Po Aix et de l'INSP (ex-ÉNA)"
              color="from-campaign-teal/30 to-campaign-teal/10"
            />
            <HighlightCard
              Icon={Users}
              title="Spécialiste du service public"
              desc="Expert des délégations de service public et de mutualisation des ressources"
              color="from-campaign-steel/30 to-campaign-steel/10"
            />
          </div>

          <GradientDivider />

          {/* ── Bloc 6 : Appel ── */}
          <p className="text-primary-foreground text-lg md:text-xl leading-relaxed font-heading font-semibold text-center">
            Si vous aussi, vous pensez que{" "}
            <span className="text-campaign-lime">Bouc-Bel-Air a de l&apos;avenir</span>, rejoignez-nous !
          </p>

          {/* Signature */}
          <div className="pt-8 flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-campaign-lime/40 shadow-lg relative">
              <Image
                src={candidatImg}
                alt="Mathieu Morateur"
                fill
                className="object-cover object-top"
                sizes="80px"
              />
            </div>
            <div className="text-center">
              <p className="font-accent font-extrabold text-primary-foreground text-lg uppercase tracking-wide">
                Mathieu Morateur
              </p>
              <p className="text-primary-foreground/50 text-sm">Candidat aux élections municipales 2026</p>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-6 text-center">
            <Link
              href="/#procuration"
              className="inline-block gradient-lime text-accent-foreground px-8 py-4 sm:px-10 sm:py-5 rounded-xl text-sm sm:text-base font-extrabold tracking-wide shadow-md -rotate-1 hover:rotate-0 hover:shadow-[0_10px_30px_-8px_hsl(var(--campaign-lime)/0.5)] hover:scale-105 transition-all duration-200"
            >
              Rejoignez-nous
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
