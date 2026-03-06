'use client'

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeBand from "@/components/MarqueeBand";
import CandidateSection from "@/components/CandidateSection";
import ProgrammeSection from "@/components/ProgrammeSection";
import EngagezVousSection from "@/components/EngagezVousSection";
import VillageBanner from "@/components/VillageBanner";
import ActualitesSection from "@/components/ActualitesSection";
import RoadmapSection from "@/components/RoadmapSection";
import ProcurationSection from "@/components/ProcurationSection";
import Footer from "@/components/Footer";
import SocialSidebar from "@/components/SocialSidebar";
import type { Article, Event, ProgrammePillar } from '@/lib/types/database'

interface HomeContentProps {
  articles: Article[]
  events: Event[]
  pillars: ProgrammePillar[]
}

export default function HomeContent({ articles, events, pillars }: HomeContentProps) {
  return (
    <main>
      <SocialSidebar />
      <Navbar />
      <HeroSection />
      <MarqueeBand />
      <CandidateSection />
      <EngagezVousSection />
      <ProgrammeSection pillars={pillars} />
      <RoadmapSection events={events} />
      <VillageBanner />
      <ActualitesSection articles={articles} />
      <ProcurationSection />
      <Footer />
    </main>
  );
}
