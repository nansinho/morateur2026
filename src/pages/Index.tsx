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

const Index = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <MarqueeBand />
      <CandidateSection />
      <ProgrammeSection />
      <EngagezVousSection />
      <VillageBanner />
      <ActualitesSection />
      <ProcurationSection />
      <Footer />
    </main>
  );
};

export default Index;
