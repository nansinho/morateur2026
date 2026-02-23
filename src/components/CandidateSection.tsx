import { motion } from "framer-motion";
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

const CandidateSection = () => (
  <section id="candidat" className="py-24 bg-background">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <img
              src={candidatImg}
              alt="Mathieu Morateur"
              className="rounded-sm shadow-xl w-full object-cover max-h-[500px]"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-6">
              <p className="text-primary-foreground font-heading text-2xl font-bold">
                Mathieu Morateur
              </p>
              <p className="text-primary-foreground/70 text-sm">
                Candidat aux municipales 2026
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-campaign-green font-semibold text-sm uppercase tracking-[0.2em]">
            Le Candidat
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
            Un enfant de{" "}
            <span className="text-campaign-green">Bouc-Bel-Air</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            J'ai 36 ans et je me présente à vos suffrages pour devenir votre nouveau maire. Enfant de Bouc-Bel-Air, ma motivation est de permettre à mes enfants de grandir avec les mêmes chances que j'ai eues : dans une commune audacieuse, au cadre de vie préservé.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Notre commune se trouve à un tournant de son histoire. Le fragile équilibre entre développement et préservation se rompt. Si vous aussi pensez que Bouc-Bel-Air a de l'avenir, rejoignez-nous !
          </p>

          <div className="space-y-4">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-sm bg-muted/50">
                <div className="w-10 h-10 rounded-sm bg-campaign-green/10 flex items-center justify-center flex-shrink-0">
                  <h.icon className="w-5 h-5 text-campaign-green" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{h.title}</p>
                  <p className="text-muted-foreground text-sm">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default CandidateSection;
