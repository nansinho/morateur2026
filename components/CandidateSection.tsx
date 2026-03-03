'use client'

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Briefcase, GraduationCap, Users } from "lucide-react";
import Image from "next/image";

const candidatImg = "/images/header_candidat_portrait.png";

const stats = [
  { value: 36, label: "ans", suffix: "" },
  { value: 6, label: "ans adjoint au maire", suffix: "+" },
  { value: 10, label: "colistiers engagés", suffix: "+" },
];

const highlights = [
  { Icon: Briefcase, title: "Ancien adjoint au maire", desc: "De 2014 à 2020, engagé au service de Bouc-Bel-Air", color: "from-campaign-lime/30 to-campaign-lime/10" },
  { Icon: GraduationCap, title: "Analyste financier expert", desc: "Diplômé de Sciences Po Aix et de l'INSP (ex-ÉNA)", color: "from-campaign-teal/30 to-campaign-teal/10" },
  { Icon: Users, title: "Spécialiste du service public", desc: "Expert des délégations de service public", color: "from-campaign-steel/30 to-campaign-steel/10" },
];

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
    <div ref={ref} className="text-center">
      <p className="font-accent text-campaign-lime text-4xl md:text-5xl font-extrabold tracking-tight">
        {count}{suffix}
      </p>
      <div className="w-8 h-px mx-auto mt-2 mb-1.5 bg-campaign-lime/40" />
      <p className="text-primary-foreground/50 text-xs uppercase tracking-[0.2em] font-bold">{label}</p>
    </div>
  );
};

const CandidateSection = () => {
  return (
    <section id="candidat" aria-label="Le candidat Mathieu Morateur" className="gradient-teal-deep relative overflow-hidden">
      <div className="py-16 sm:py-24 w-full">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4]">
                <Image src={candidatImg} alt="Mathieu Morateur, candidat aux municipales 2026 à Bouc-Bel-Air" fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-primary/60 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl gradient-lime opacity-40 -z-10" aria-hidden="true" />
            </motion.div>

            {/* Text + Stats + Highlights all together */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="section-label">Le Candidat</span>
              <h2
                className="font-accent font-extrabold uppercase leading-[0.95] text-primary-foreground mb-6 break-words"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                MATHIEU<br />MORATEUR
              </h2>

              <blockquote className="border-l-4 border-campaign-lime pl-6 mb-8">
                <p className="font-heading font-bold text-primary-foreground/80 text-lg md:text-xl leading-snug">
                  « Ma motivation est de permettre à mes enfants de grandir avec les mêmes chances que j&#39;ai eues. »
                </p>
              </blockquote>

              <p className="text-primary-foreground/50 leading-relaxed text-base mb-8">
                J&#39;ai 36 ans et je me présente à vos suffrages pour devenir votre nouveau maire. Enfant de Bouc-Bel-Air, je suis profondément attaché à notre commune.
              </p>

              {/* Stats inline */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 p-4 sm:p-6 rounded-2xl bg-primary-foreground/[0.05] border border-primary-foreground/10">
                {stats.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <CounterStat value={s.value} label={s.label} suffix={s.suffix} />
                  </motion.div>
                ))}
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                {highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={`flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r ${h.color} backdrop-blur-sm hover:scale-[1.02] transition-transform`}
                  >
                    <div className="w-10 h-10 rounded-lg gradient-lime flex items-center justify-center flex-shrink-0">
                      <h.Icon className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-accent font-bold text-primary-foreground text-sm uppercase tracking-wide">{h.title}</h3>
                      <p className="text-primary-foreground/50 text-sm">{h.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CandidateSection;
