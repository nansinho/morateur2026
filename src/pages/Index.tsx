import useDocumentMeta from "@/hooks/useDocumentMeta";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeBand from "@/components/MarqueeBand";
import CandidateSection from "@/components/CandidateSection";
import ProgrammeSection from "@/components/ProgrammeSection";
import EngagezVousSection from "@/components/EngagezVousSection";
import VillageBanner from "@/components/VillageBanner";
import ActualitesSection from "@/components/ActualitesSection";
import ProcurationSection from "@/components/ProcurationSection";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";

const Index = () => {
  useDocumentMeta({
    title: "Morateur 2026 — Bouc Bel Air a de l'Avenir",
    description: "Mathieu Morateur, candidat aux élections municipales 2026 à Bouc-Bel-Air. Découvrez le programme et l'équipe.",
  });
  return (
    <main>
      <SocialSidebar />
      <Navbar />
      <HeroSection />
      <MarqueeBand />
      <CandidateSection />
      <EngagezVousSection />
      <ProgrammeSection />
      <VillageBanner />
      <ActualitesSection />
      <ProcurationSection />
      <Footer />
    </main>
  );
};

export default Index;
