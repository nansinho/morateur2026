'use client'

import { useState, useCallback, useEffect } from "react";
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
const NewsletterPopup = dynamic(() => import("@/components/NewsletterPopup"));
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

  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const closeNewsletter = useCallback(() => setNewsletterOpen(false), []);

  // Auto-show newsletter popup after 20s if user hasn't dismissed or subscribed
  useEffect(() => {
    try {
      if (localStorage.getItem('newsletter_subscribed') === '1') return;
      const dismissed = localStorage.getItem('newsletter_popup_dismissed');
      // Don't show again for 7 days after dismissal
      if (dismissed && Date.now() - parseInt(dismissed) < 7 * 24 * 60 * 60 * 1000) return;
    } catch {}

    const timer = setTimeout(() => {
      // Only show if JoinPopup isn't already open
      setNewsletterOpen(prev => {
        if (joinOpen) return false;
        return true;
      });
    }, 20000);

    return () => clearTimeout(timer);
  }, [joinOpen]);

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
      <NewsletterPopup isOpen={newsletterOpen && !joinOpen} onClose={closeNewsletter} />
    </main>
  );
}
