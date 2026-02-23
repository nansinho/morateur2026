import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import candidatImg from "@/assets/candidat-banner.png";
import { Briefcase, GraduationCap, Users } from "lucide-react";

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

const CounterStat = ({ value, label }: { value: string; label: string }) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const numericVal = parseInt(value);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * numericVal));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, numericVal]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-campaign-green font-heading text-4xl md:text-5xl font-black">{count}+</p>
      <p className="text-muted-foreground text-sm mt-1">{label}</p>
    </div>
  );
};

const CandidateSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={ref} id="candidat" className="py-32 bg-background relative overflow-hidden">
      {/* Subtle bg pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(220 65% 18%) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="container mx-auto px-6 relative">
        {/* Stats banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-20 p-8 rounded-2xl glass-dark bg-primary/5 border border-border"
        >
          <CounterStat value="6" label="ans adjoint" />
          <CounterStat value="36" label="ans" />
          <CounterStat value="10" label="colistiers" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <motion.img
                src={candidatImg}
                alt="Mathieu Morateur"
                className="w-full object-cover max-h-[550px]"
                style={{ y: imgY }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-primary-foreground font-heading text-3xl font-bold">
                    Mathieu Morateur
                  </p>
                  <p className="text-primary-foreground/60 text-sm mt-1">
                    Candidat aux municipales 2026
                  </p>
                </motion.div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full rounded-2xl gradient-green opacity-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 text-campaign-green font-semibold text-sm uppercase tracking-[0.2em] mb-4">
              <span className="w-8 h-[2px] gradient-green inline-block" />
              Le Candidat
            </span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6 leading-tight">
              Un enfant de{" "}
              <span className="text-gradient">Bouc-Bel-Air</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-lg">
              J'ai 36 ans et je me présente à vos suffrages pour devenir votre nouveau maire. Enfant de Bouc-Bel-Air, ma motivation est de permettre à mes enfants de grandir avec les mêmes chances que j'ai eues.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Notre commune se trouve à un tournant de son histoire. Le fragile équilibre entre développement et préservation se rompt. Si vous aussi pensez que Bouc-Bel-Air a de l'avenir, rejoignez-nous !
            </p>

            <div className="space-y-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover-lift cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl gradient-green flex items-center justify-center flex-shrink-0 shadow-lg shadow-campaign-green/20">
                    <h.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground">{h.title}</p>
                    <p className="text-muted-foreground text-sm">{h.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CandidateSection;
