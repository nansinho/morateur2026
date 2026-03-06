'use client'

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeBand from "@/components/MarqueeBand";
import CandidateSection from "@/components/CandidateSection";

const ProgrammeSection = dynamic(() => import("@/components/ProgrammeSection"));
const EngagezVousSection = dynamic(() => import("@/components/EngagezVousSection"));
const VillageBanner = dynamic(() => import("@/components/VillageBanner"));
const ActualitesSection = dynamic(() => import("@/components/ActualitesSection"));
const RoadmapSection = dynamic(() => import("@/components/RoadmapSection"));
const ProcurationSection = dynamic(() => import("@/components/ProcurationSection"));
const JoinPopup = dynamic(() => import("@/components/JoinPopup"));
const Footer = dynamic(() => import("@/components/Footer"));
const SocialSidebar = dynamic(() => import("@/components/SocialSidebar"));
import type { Article, Event, ProgrammePillar } from '@/lib/types/database'

interface HomeContentProps {
  articles: Article[]
  events: Event[]
  pillars: ProgrammePillar[]
}

export default function HomeContent({ articles, events, pillars }: HomeContentProps) {
  const [joinOpen, setJoinOpen] = useState(false);
  const openJoin = useCallback(() => setJoinOpen(true), []);
  const closeJoin = useCallback(() => setJoinOpen(false), []);

  return (
    <main>
      <SocialSidebar />
      <Navbar onJoinClick={openJoin} />
      <HeroSection />
      <MarqueeBand />
      <CandidateSection />
      <EngagezVousSection onJoinClick={openJoin} />
      <ProgrammeSection pillars={pillars} />
      <RoadmapSection events={events} />
      <VillageBanner />
      <ActualitesSection articles={articles} />
      <ProcurationSection />
      <Footer />
      <JoinPopup isOpen={joinOpen} onClose={closeJoin} />
    </main>
  );
}
