import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import candidatTerrain from "@/assets/candidat-terrain.jpg";
import candidatReunion from "@/assets/candidat-reunion.jpg";
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
      <p className="font-editorial italic text-campaign-green text-5xl md:text-7xl font-bold">
        {count}{suffix}
      </p>
      <div className="w-8 h-px mx-auto mt-3 mb-2 bg-campaign-gold" />
      <p className="text-muted-foreground text-xs uppercase tracking-[0.2em] font-bold">{label}</p>
    </div>
  );
};

const CandidateSection = () => {
  return (
    <section id="candidat" className="relative overflow-hidden">
      {/* Magazine layout: 2/3 photo + 1/3 quote */}
      <div className="grid lg:grid-cols-5 min-h-[70vh]">
        {/* Photo — 3/5 */}
        <motion.div
          className="lg:col-span-3 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <img src={candidatTerrain} alt="Mathieu Morateur sur le terrain" className="w-full h-full object-cover min-h-[50vh]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/30 hidden lg:block" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent lg:hidden" />
        </motion.div>

        {/* Quote + intro — 2/5 */}
        <div className="lg:col-span-2 flex flex-col justify-center px-8 lg:px-14 py-16 bg-background">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">Le Candidat</p>
            <h2 className="font-editorial italic text-5xl md:text-7xl text-foreground mb-8 leading-[0.95]">
              Mathieu<br />
              <span className="text-campaign-green">Mora</span><span className="text-campaign-gold">teur</span>
            </h2>

            <blockquote className="border-l-4 border-campaign-gold pl-6 mb-8">
              <p className="font-editorial italic text-foreground/80 text-xl md:text-2xl leading-snug">
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
      <div className="bg-primary py-16">
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

      {/* Editorial highlights — horizontal numbered */}
      <div className="bg-background py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {[
              { num: "01", Icon: Briefcase, title: "Ancien adjoint au maire", desc: "De 2014 à 2020, engagé au service de Bouc-Bel-Air" },
              { num: "02", Icon: GraduationCap, title: "Analyste financier expert", desc: "Diplômé de Sciences Po Aix et de l'INSP (ex-ÉNA)" },
              { num: "03", Icon: Users, title: "Spécialiste du service public", desc: "Expert des délégations de service public" },
            ].map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group"
              >
                <span className="font-editorial italic text-campaign-gold/30 text-7xl font-bold leading-none">{h.num}</span>
                <div className="flex items-center gap-3 mt-2 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-campaign-green/10 flex items-center justify-center">
                    <h.Icon className="w-5 h-5 text-campaign-green" />
                  </div>
                  <h3 className="font-heading font-extrabold text-foreground text-lg">{h.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed pl-[52px]">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Second full-width photo — réunion */}
      <motion.div
        className="relative h-[50vh] overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <img src={candidatReunion} alt="Mathieu Morateur en réunion publique" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      </motion.div>
    </section>
  );
};

export default CandidateSection;