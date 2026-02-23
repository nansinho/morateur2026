import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CandidateSection from "@/components/CandidateSection";
import ProgrammeSection from "@/components/ProgrammeSection";
import TeamSection from "@/components/TeamSection";
import ProcurationSection from "@/components/ProcurationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <CandidateSection />
      <ProgrammeSection />
      <TeamSection />
      <ProcurationSection />
      <Footer />
    </main>
  );
};

export default Index;
