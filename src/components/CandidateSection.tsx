import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Briefcase, GraduationCap, Users } from "lucide-react";

const stats = [
  { value: 36, label: "ans", suffix: "" },
  { value: 6, label: "ans adjoint au maire", suffix: "+" },
  { value: 10, label: "colistiers engagés", suffix: "+" },
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
      <p className="font-accent text-campaign-green text-5xl md:text-6xl font-extrabold tracking-tight">
        {count}{suffix}
      </p>
      <div className="w-8 h-px mx-auto mt-3 mb-2 bg-campaign-gold" />
      <p className="text-primary-foreground/50 text-xs uppercase tracking-[0.2em] font-bold">{label}</p>
    </div>
  );
};

const CandidateSection = () => {
  return (
    <section id="candidat" className="relative overflow-hidden">
      {/* Text + quote on white */}
      <div className="bg-background py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p className="section-label">Le Candidat</p>
            <h2 className="font-heading text-5xl md:text-7xl font-extrabold text-foreground mb-8 leading-[0.95] tracking-tight">
              Mathieu<br />
              <span className="text-gradient">Morateur</span>
            </h2>

            <blockquote className="border-l-4 border-campaign-gold pl-6 mb-10">
              <p className="font-heading font-bold text-foreground/80 text-xl md:text-2xl leading-snug">
                « Ma motivation est de permettre à mes enfants de grandir avec les mêmes chances que j'ai eues. »
              </p>
            </blockquote>

            <p className="text-muted-foreground leading-relaxed text-base mb-4">
              J'ai 36 ans et je me présente à vos suffrages pour devenir votre nouveau maire. Enfant de Bouc-Bel-Air, je suis profondément attaché à notre commune.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base">
              Notre commune se trouve à un tournant de son histoire. Si vous aussi pensez que Bouc-Bel-Air a de l'avenir, rejoignez-nous.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats band */}
      <div className="gradient-premium py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <CounterStat value={s.value} label={s.label} suffix={s.suffix} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-background py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { Icon: Briefcase, title: "Ancien adjoint au maire", desc: "De 2014 à 2020, engagé au service de Bouc-Bel-Air" },
              { Icon: GraduationCap, title: "Analyste financier expert", desc: "Diplômé de Sciences Po Aix et de l'INSP (ex-ÉNA)" },
              { Icon: Users, title: "Spécialiste du service public", desc: "Expert des délégations de service public" },
            ].map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-start gap-4 p-6 rounded-2xl border border-border hover:border-campaign-green/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-campaign-green/10 flex items-center justify-center flex-shrink-0">
                  <h.Icon className="w-6 h-6 text-campaign-green" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-foreground text-base mb-1">{h.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CandidateSection;
