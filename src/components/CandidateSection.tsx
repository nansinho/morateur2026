import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import candidatImg from "@/assets/candidat-banner.png";
import { Briefcase, GraduationCap, Users } from "lucide-react";

const highlights = [
  { icon: Briefcase, title: "Ancien adjoint au maire", desc: "De 2014 à 2020, engagé pour Bouc-Bel-Air", color: "bg-campaign-green", emoji: "🏛️" },
  { icon: GraduationCap, title: "Analyste financier expert", desc: "Diplômé de Sciences Po Aix et de l'INSP (ex-ÉNA)", color: "bg-campaign-gold", emoji: "🎓" },
  { icon: Users, title: "Spécialiste du service public", desc: "Expert des délégations de service public et mutualisations", color: "bg-campaign-coral", emoji: "🤝" },
];

const stats = [
  { value: 6, label: "ans adjoint", suffix: "+", emoji: "💼" },
  { value: 36, label: "ans", emoji: "🎂" },
  { value: 10, label: "colistiers", suffix: "+", emoji: "👥" },
];

const CounterStat = ({ value, label, suffix = "", emoji }: { value: number; label: string; suffix?: string; emoji: string }) => {
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
      className="text-center bg-card rounded-3xl p-6 border border-border shadow-sm"
      whileHover={{ scale: 1.08, rotate: Math.random() > 0.5 ? 2 : -2 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <span className="text-3xl mb-2 block">{emoji}</span>
      <p className="text-campaign-green font-heading text-5xl md:text-6xl font-extrabold tracking-tight">
        {count}{suffix}
      </p>
      <p className="text-muted-foreground text-sm uppercase tracking-[0.15em] font-bold mt-2">{label}</p>
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
              <motion.span
                className="inline-block bg-campaign-green text-primary-foreground font-extrabold text-sm uppercase tracking-wider px-5 py-2 rounded-full mb-4 shadow-lg"
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                👋 Le Candidat
              </motion.span>
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
        {/* Decorative blob */}
        <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-campaign-mint/50 blur-3xl" />
        <div className="absolute bottom-40 left-0 w-60 h-60 rounded-full bg-campaign-gold/10 blur-3xl" />

        <div className="container mx-auto px-6 py-20 relative z-10">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-5 max-w-2xl mx-auto mb-20">
            {stats.map((s, i) => (
              <CounterStat key={i} value={s.value} label={s.label} suffix={s.suffix} emoji={s.emoji} />
            ))}
          </div>

          {/* Quote */}
          <motion.div
            className="max-w-3xl mx-auto mb-20 bg-card rounded-3xl p-10 border border-border shadow-sm relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <span className="absolute top-4 right-6 text-6xl opacity-10">💬</span>
            <blockquote className="relative">
              <p className="text-foreground/80 italic text-xl md:text-2xl leading-snug font-heading font-medium">
                « Ma motivation est de permettre à mes enfants de grandir avec les <span className="text-campaign-green font-extrabold not-italic">mêmes chances</span> que j'ai eues. »
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <div className="w-12 h-1.5 bg-campaign-gold rounded-full" />
                <p className="text-campaign-green text-sm font-extrabold tracking-wider uppercase">Mathieu Morateur</p>
              </footer>
            </blockquote>
          </motion.div>

          {/* Bio */}
          <div className="max-w-3xl mx-auto mb-16 space-y-4">
            <motion.p className="text-muted-foreground leading-relaxed text-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              J'ai 36 ans et je me présente à vos suffrages pour devenir votre nouveau maire. Enfant de Bouc-Bel-Air, je suis profondément attaché à notre commune. 🌿
            </motion.p>
            <motion.p className="text-muted-foreground leading-relaxed text-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              Notre commune se trouve à un tournant de son histoire. Si vous aussi pensez que Bouc-Bel-Air a de l'avenir, rejoignez-nous ! 💪
            </motion.p>
          </div>

          {/* Highlight cards */}
          <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-5">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
                whileHover={{ y: -8, rotate: i === 1 ? -2 : 2 }}
                className={`p-6 rounded-3xl text-center cursor-pointer ${h.color} shadow-lg`}
              >
                <span className="text-4xl mb-3 block">{h.emoji}</span>
                <p className="font-heading font-extrabold text-primary-foreground text-base mb-1">{h.title}</p>
                <p className="text-primary-foreground/70 text-sm">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CandidateSection;
