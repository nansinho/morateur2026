import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import candidatImg from "@/assets/candidat-banner.png";
import { Briefcase, GraduationCap, Users, Quote } from "lucide-react";

const highlights = [
  { icon: Briefcase, title: "Ancien adjoint au maire", desc: "De 2014 à 2020, engagé pour Bouc-Bel-Air" },
  { icon: GraduationCap, title: "Analyste financier expert", desc: "Diplômé de Sciences Po Aix et de l'INSP (ex-ÉNA)" },
  { icon: Users, title: "Spécialiste du service public", desc: "Expert des délégations de service public et mutualisations" },
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
      className="text-center relative group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p className="text-campaign-green font-heading text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-[0_0_30px_hsl(160,84%,39%,0.3)]">
        {count}{suffix}
      </p>
      <div className="w-8 h-[2px] mx-auto mt-3 mb-2 gradient-green rounded-full opacity-50 group-hover:w-12 group-hover:opacity-100 transition-all duration-500" />
      <p className="text-primary-foreground/40 text-xs uppercase tracking-[0.2em] font-semibold">{label}</p>
    </motion.div>
  );
};

const CandidateSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const imgScale = useTransform(scrollYProgress, [0, 0.25, 0.5], [1.4, 1.1, 1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.25], [0.7, 0.3]);

  return (
    <section ref={sectionRef} id="candidat" className="relative overflow-hidden">
      {/* ─── Full-width cinematic photo ─── */}
      <div className="relative h-[85vh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
          <img src={candidatImg} alt="Mathieu Morateur" className="w-full h-full object-cover object-top" />
        </motion.div>
        <motion.div className="absolute inset-0 gradient-premium" style={{ opacity: overlayOpacity }} />
        <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-primary via-primary/90 to-transparent" />

        {/* Name reveal */}
        <div className="absolute bottom-20 left-0 right-0 z-10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-label">Le Candidat</span>
              <h2 className="font-heading text-5xl md:text-8xl font-extrabold text-primary-foreground leading-[0.9] mt-2">
                Mathieu<br />
                <span className="text-gradient">Morateur</span>
              </h2>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── Content on dark navy background ─── */}
      <div className="bg-primary relative overflow-hidden">
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute top-0 left-[15%] w-[500px] h-[500px] bg-campaign-green/[0.04] rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-campaign-gold/[0.03] rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-6 py-28 relative z-10">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto mb-28">
            {stats.map((s, i) => (
              <CounterStat key={i} value={s.value} label={s.label} suffix={s.suffix} />
            ))}
          </div>

          {/* Quote */}
          <motion.div
            className="max-w-3xl mx-auto mb-28 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            <Quote className="absolute -top-8 -left-4 w-16 h-16 text-campaign-green/10" />
            <blockquote className="relative pl-8 border-l-[3px] border-campaign-green/30">
              <p className="text-primary-foreground/80 italic text-2xl md:text-4xl leading-snug font-heading font-light">
                Ma motivation est de permettre à mes enfants de grandir avec les mêmes chances que j'ai eues.
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <div className="w-16 h-px gradient-green rounded-full" />
                <p className="text-campaign-green text-sm font-semibold tracking-wider uppercase">Mathieu Morateur</p>
              </footer>
            </blockquote>
          </motion.div>

          {/* Bio */}
          <div className="max-w-3xl mx-auto mb-24 space-y-6">
            <motion.p
              className="text-primary-foreground/50 leading-relaxed text-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              J'ai 36 ans et je me présente à vos suffrages pour devenir votre nouveau maire. Enfant de Bouc-Bel-Air, je suis profondément attaché à notre commune.
            </motion.p>
            <motion.p
              className="text-primary-foreground/50 leading-relaxed text-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Notre commune se trouve à un tournant de son histoire. Le fragile équilibre entre développement et préservation se rompt. Si vous aussi pensez que Bouc-Bel-Air a de l'avenir, rejoignez-nous !
            </motion.p>
          </div>

          {/* Highlight cards */}
          <div className="max-w-3xl mx-auto space-y-5">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="flex items-start gap-5 p-7 rounded-2xl glass-card hover:border-campaign-green/25 transition-all duration-500 group cursor-default"
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <div className="w-14 h-14 rounded-2xl gradient-green flex items-center justify-center flex-shrink-0 glow-green-sm group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-campaign-green/30 transition-all duration-300">
                    <h.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-primary-foreground text-lg">{h.title}</p>
                    <p className="text-primary-foreground/40 text-sm mt-1">{h.desc}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="section-divider-wide" />
      </div>
    </section>
  );
};

export default CandidateSection;
