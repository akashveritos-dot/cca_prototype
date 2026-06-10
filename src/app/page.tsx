import React from "react";
import { Hero } from "@/components/home/hero";
import { WhoWeAre } from "@/components/home/who-we-are";
import { PillarsSection } from "@/components/home/pillars-section";
import { WorkingGroupsPreview } from "@/components/home/working-groups-preview";
import { ImpactDashboard } from "@/components/home/impact-dashboard";
import { FeaturedNews } from "@/components/home/featured-news";
import { PartnersMarquee } from "@/components/home/partners-marquee";
import { EventTeaser } from "@/components/home/event-teaser";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section - DCRF Mission */}
      <Hero />

      {/* 2. Who We Are - Joint Venture Introduction */}
      <WhoWeAre />

      {/* 3. Three Pillars - Core Structure */}
      <PillarsSection />

      {/* 4. Working Groups Preview */}
      <WorkingGroupsPreview />

      {/* 5. Impact Dashboard - Disaster & Resilience Metrics */}
      <ImpactDashboard />

      {/* 6. Featured News - disastersnews.com */}
      <FeaturedNews />

      {/* 7. Partners & Members */}
      <PartnersMarquee />

      {/* 8. Annual Event Teaser */}
      <EventTeaser />
    </div>
  );
}
