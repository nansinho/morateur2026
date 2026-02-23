import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import candidatImg from "@/assets/candidat-banner.png";
import { Briefcase, GraduationCap, Users, Quote } from "lucide-react";

const highlights = [
  {
    icon: Briefcase,
    title: "Ancien adjoint au maire",
    desc: "De 2014 à 2020, engagé pour Bouc-Bel-Air",
  },
  {
    icon: GraduationCap,
    title: "Analyste financier expert",
    desc: "Diplômé de Sciences Po Aix et de l'INSP (ex-ÉNA)",
  },
  {
    icon: Users,
    title: "Spécialiste du service public",
    desc: "Expert des délégations de service public et mutualisations",
  },
];

const stats = [
  { value: 6, label: "ans adjoint", suffix: "+" },
  { value: 36, label: "ans" },
  { value: 10, label: "colistiers", suffix: "+" },
];

const CounterStat = ({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(eased * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <motion.p
        className="text-campaign-green font-heading text-5xl md:text-6xl font-extrabold tracking-tight"
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
      >
        {count}{suffix}
      </motion.p>
      <p className="text-muted-foreground text-sm mt-2 uppercase tracking-wider font-medium">{label}</p>
    </div>
  );
};

const quoteText = "Ma motivation est de permettre à mes enfants de grandir avec les mêmes chances que j'ai eues.";

const CandidateSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Photo zoom-out effect (Apple style): starts zoomed in, zooms out as you scroll
  const imgScale = useTransform(scrollYProgress, [0, 0.3, 0.6], [1.3, 1.05, 1]);
  const imgBorderRadius = useTransform(scrollYProgress, [0.1, 0.4], [0, 24]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 0.2]);

  // Background gradient shift
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.04, 0.08]);

  return (
    <section ref={sectionRef} id="candidat" className="relative overflow-hidden">
      {/* Evolving background */}
      <motion.div
        className="absolute inset-0 bg-campaign-warm pointer-events-none"
        style={{ opacity: bgOpacity }}
      />

      {/* ── Full-width photo with zoom-out ── */}
      <div className="relative h-[80vh] md:h-[90vh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ scale: imgScale }}
        >
          <img
            src={candidatImg}
            alt="Mathieu Morateur"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>
        {/* Cinematic gradient overlays */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-primary/50 via-transparent to-background"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent" />

        {/* Name overlay at bottom */}
        <div className="absolute bottom-16 left-0 right-0 z-10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="section-label">Le Candidat</span>
              <h2 className="font-heading text-5xl md:text-7xl font-extrabold text-foreground leading-[0.95]">
                Mathieu<br />
                <span className="text-gradient">Morateur</span>
              </h2>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Stats integrated in flow ── */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto mb-24">
          {stats.map((s, i) => (
            <CounterStat key={i} value={s.value} label={s.label} suffix={s.suffix} />
          ))}
        </div>

        {/* ── Quote with typewriter feel ── */}
        <motion.div
          className="max-w-3xl mx-auto mb-24 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <Quote className="absolute -top-6 -left-2 w-12 h-12 text-campaign-green/15" />
          <blockquote className="relative pl-8 border-l-[3px] border-campaign-green/30">
            <p className="text-foreground/80 italic text-2xl md:text-3xl leading-relaxed font-heading font-light">
              {quoteText}
            </p>
            <footer className="mt-6 flex items-center gap-3">
              <div className="w-12 h-px bg-campaign-green/40" />
              <p className="text-muted-foreground text-sm font-medium">Mathieu Morateur</p>
            </footer>
          </blockquote>
        </motion.div>

        {/* ── Bio text ── */}
        <div className="max-w-3xl mx-auto mb-20">
          <motion.p
            className="text-muted-foreground leading-relaxed text-lg mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
          >
            J'ai 36 ans et je me présente à vos suffrages pour devenir votre nouveau maire. Enfant de Bouc-Bel-Air, je suis profondément attaché à notre commune.
          </motion.p>
          <motion.p
            className="text-muted-foreground leading-relaxed text-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Notre commune se trouve à un tournant de son histoire. Le fragile équilibre entre développement et préservation se rompt. Si vous aussi pensez que Bouc-Bel-Air a de l'avenir, rejoignez-nous !
          </motion.p>
        </div>

        {/* ── Highlight cards — stagger slide-in ── */}
        <div className="max-w-3xl mx-auto space-y-5">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-start gap-5 p-6 rounded-2xl bg-card border border-border card-glow group cursor-default"
            >
              <div className="w-14 h-14 rounded-2xl gradient-green flex items-center justify-center flex-shrink-0 glow-green-sm group-hover:scale-110 transition-transform duration-300">
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

      {/* Bottom divider */}
      <div className="section-divider" />
    </section>
  );
};

export default CandidateSection;
