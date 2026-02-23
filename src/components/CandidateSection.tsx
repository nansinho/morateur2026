import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import candidatImg from "@/assets/candidat-banner.png";
import { Briefcase, GraduationCap, Users, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const highlights: { icon: LucideIcon; title: string; desc: string; color: string }[] = [
  { icon: Briefcase, title: "Ancien adjoint au maire", desc: "De 2014 à 2020, engagé pour Bouc-Bel-Air", color: "bg-campaign-green" },
  { icon: GraduationCap, title: "Analyste financier expert", desc: "Diplômé de Sciences Po Aix et de l'INSP (ex-ÉNA)", color: "bg-campaign-gold" },
  { icon: Users, title: "Spécialiste du service public", desc: "Expert des délégations de service public", color: "bg-campaign-coral" },
];

const stats = [
  { value: 6, label: "ans adjoint", suffix: "+" },
  { value: 36, label: "ans" },
  { value: 10, label: "colistiers", suffix: "+" },
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
    <motion.div
      ref={ref}
      className="text-center bg-card rounded-2xl p-6 border border-border shadow-sm"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <p className="text-campaign-green font-heading text-5xl md:text-6xl font-extrabold tracking-tight">
        {count}{suffix}
      </p>
      <div className="w-8 h-1 mx-auto mt-3 mb-2 rounded-full bg-campaign-gold" />
      <p className="text-muted-foreground text-xs uppercase tracking-[0.15em] font-bold">{label}</p>
    </motion.div>
  );
};

const CandidateSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 0.25, 0.5], [1.3, 1.1, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.25], [0.6, 0.2]);

  return (
    <section ref={sectionRef} id="candidat" className="relative overflow-hidden">
      {/* Full-width cinematic photo */}
      <div className="relative h-[70vh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
          <img src={candidatImg} alt="Mathieu Morateur" className="w-full h-full object-cover object-top" />
        </motion.div>
        <motion.div className="absolute inset-0 gradient-premium" style={{ opacity: overlayOpacity }} />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-campaign-warm via-campaign-warm/80 to-transparent" />

        <div className="absolute bottom-12 left-0 right-0 z-10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 bg-campaign-green text-primary-foreground font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full mb-4">
                <Users className="w-3.5 h-3.5" />
                Le Candidat
              </span>
              <h2 className="font-heading text-5xl md:text-8xl font-extrabold text-foreground leading-[0.9]">
                Mathieu<br />
                <span className="text-campaign-green">Mora</span><span className="text-campaign-gold">teur</span>
              </h2>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content on light background */}
      <div className="bg-campaign-warm relative">
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid grid-cols-3 gap-5 max-w-2xl mx-auto mb-20">
            {stats.map((s, i) => (
              <CounterStat key={i} value={s.value} label={s.label} suffix={s.suffix} />
            ))}
          </div>

          <motion.div
            className="max-w-3xl mx-auto mb-20 bg-card rounded-2xl p-10 border border-border shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <blockquote className="relative border-l-4 border-campaign-gold pl-8">
              <p className="text-foreground/80 italic text-xl md:text-2xl leading-snug font-heading font-medium">
                « Ma motivation est de permettre à mes enfants de grandir avec les <span className="text-campaign-green font-extrabold not-italic">mêmes chances</span> que j'ai eues. »
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <div className="w-10 h-1 bg-campaign-green rounded-full" />
                <p className="text-campaign-green text-sm font-extrabold tracking-wider uppercase">Mathieu Morateur</p>
              </footer>
            </blockquote>
          </motion.div>

          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <motion.p className="text-muted-foreground leading-relaxed text-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              J'ai 36 ans et je me présente à vos suffrages pour devenir votre nouveau maire. Enfant de Bouc-Bel-Air, je suis profondément attaché à notre commune.
            </motion.p>
            <motion.p className="text-muted-foreground leading-relaxed text-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              Notre commune se trouve à un tournant de son histoire. Si vous aussi pensez que Bouc-Bel-Air a de l'avenir, rejoignez-nous.
            </motion.p>
          </div>

          {/* Highlight cards — horizontal, colorful, pro */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-5">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className={`p-7 rounded-2xl ${h.color} shadow-lg cursor-pointer group`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                  <h.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <p className="font-heading font-extrabold text-primary-foreground text-lg mb-1">{h.title}</p>
                <p className="text-primary-foreground/70 text-sm font-medium">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CandidateSection;
