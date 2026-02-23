import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import candidatImg from "@/assets/candidat-banner.png";
import { Briefcase, GraduationCap, Users } from "lucide-react";

const highlights = [
  { icon: Briefcase, title: "Ancien adjoint au maire", desc: "De 2014 à 2020, engagé pour Bouc-Bel-Air", color: "bg-campaign-green" },
  { icon: GraduationCap, title: "Analyste financier expert", desc: "Diplômé de Sciences Po Aix et de l'INSP (ex-ÉNA)", color: "bg-campaign-gold" },
  { icon: Users, title: "Spécialiste du service public", desc: "Expert des délégations de service public et mutualisations", color: "bg-campaign-sky" },
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
      className="text-center"
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <p className="text-campaign-green font-heading text-5xl md:text-7xl font-extrabold tracking-tight">
        {count}{suffix}
      </p>
      <div className="w-10 h-1 mx-auto mt-3 mb-2 rounded-full bg-campaign-gold" />
      <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] font-semibold">{label}</p>
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
      <div className="relative h-[80vh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
          <img src={candidatImg} alt="Mathieu Morateur" className="w-full h-full object-cover object-top" />
        </motion.div>
        <motion.div className="absolute inset-0 gradient-premium" style={{ opacity: overlayOpacity }} />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-campaign-warm via-campaign-warm/80 to-transparent" />

        <div className="absolute bottom-16 left-0 right-0 z-10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-campaign-green font-bold text-xs uppercase tracking-[0.3em] mb-3">Le Candidat</p>
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
        <div className="container mx-auto px-6 py-24 relative z-10">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-24">
            {stats.map((s, i) => (
              <CounterStat key={i} value={s.value} label={s.label} suffix={s.suffix} />
            ))}
          </div>

          {/* Quote */}
          <motion.div
            className="max-w-3xl mx-auto mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
          >
            <blockquote className="relative pl-8 border-l-4 border-campaign-gold">
              <p className="text-foreground/70 italic text-2xl md:text-3xl leading-snug font-heading font-light">
                Ma motivation est de permettre à mes enfants de grandir avec les <span className="text-campaign-green font-medium not-italic">mêmes chances</span> que j'ai eues.
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <div className="w-12 h-1 bg-campaign-green rounded-full" />
                <p className="text-campaign-green text-sm font-bold tracking-wider uppercase">Mathieu Morateur</p>
              </footer>
            </blockquote>
          </motion.div>

          {/* Bio */}
          <div className="max-w-3xl mx-auto mb-20 space-y-5">
            <motion.p className="text-muted-foreground leading-relaxed text-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              J'ai 36 ans et je me présente à vos suffrages pour devenir votre nouveau maire. Enfant de Bouc-Bel-Air, je suis profondément attaché à notre commune.
            </motion.p>
            <motion.p className="text-muted-foreground leading-relaxed text-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              Notre commune se trouve à un tournant de son histoire. Le fragile équilibre entre développement et préservation se rompt. Si vous aussi pensez que Bouc-Bel-Air a de l'avenir, rejoignez-nous !
            </motion.p>
          </div>

          {/* Highlight cards */}
          <div className="max-w-3xl mx-auto space-y-4">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, x: 8 }}
                className="flex items-start gap-5 p-6 rounded-2xl bg-card border border-border shadow-sm cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-2xl ${h.color} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <h.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground text-lg">{h.title}</p>
                  <p className="text-muted-foreground text-sm mt-1">{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </section>
  );
};

export default CandidateSection;
