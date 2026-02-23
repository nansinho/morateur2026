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
      <p className="text-campaign-green font-heading text-4xl md:text-5xl font-extrabold">{count}+</p>
      <p className="text-muted-foreground text-sm mt-1">{label}</p>
    </div>
  );
};

const CandidateSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1.05]);
  const contentX = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={sectionRef} id="candidat" className="py-32 bg-background relative overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(222 47% 14%) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="container mx-auto px-6 relative">
        {/* Stats banner */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-24 p-8 rounded-3xl bg-primary/[0.03] border border-border"
        >
          <CounterStat value="6" label="ans adjoint" />
          <CounterStat value="36" label="ans" />
          <CounterStat value="10" label="colistiers" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative" ref={imgRef}>
            <motion.div
              className="relative overflow-hidden rounded-3xl"
              style={{ y: imgY, scale: imgScale }}
            >
              <img
                src={candidatImg}
                alt="Mathieu Morateur"
                className="w-full object-cover max-h-[600px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
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
            </motion.div>
            {/* Green accent behind */}
            <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-3xl gradient-green opacity-10" />
          </div>

          <motion.div style={{ x: contentX, opacity: contentOpacity }}>
            <span className="inline-flex items-center gap-2 text-campaign-green font-semibold text-xs uppercase tracking-[0.25em] mb-4">
              <span className="w-10 h-[2px] gradient-green inline-block" />
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
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.5 }}
                  whileHover={{ x: 8, transition: { duration: 0.25 } }}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border cursor-default group hover:shadow-lg hover:shadow-campaign-green/5 transition-shadow duration-500"
                >
                  <div className="w-12 h-12 rounded-xl gradient-green flex items-center justify-center flex-shrink-0 shadow-lg shadow-campaign-green/20 group-hover:scale-110 transition-transform duration-300">
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
