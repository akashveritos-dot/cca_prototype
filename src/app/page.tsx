import React from "react";
import { Hero } from "@/components/home/hero";
import { MissionStrip } from "@/components/home/mission-strip";
import { PillarsSection } from "@/components/home/pillars-section";
import { ImpactDashboard } from "@/components/home/impact-dashboard";
import { WhyItMatters } from "@/components/home/why-it-matters";
import { FeaturedNews } from "@/components/home/featured-news";
import { PartnersMarquee } from "@/components/home/partners-marquee";
import { EventTeaser } from "@/components/home/event-teaser";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Mission Strip */}
      <MissionStrip />

      {/* 3. Pillars of Action */}
      <PillarsSection />

      {/* 4. Impact Dashboard */}
      <ImpactDashboard />

      {/* 5. Carbon Lifecycle Explorer */}
      <WhyItMatters />

      {/* 6. Featured News & Articles */}
      <FeaturedNews />

      {/* 7. Ecosystem Partners Marquee */}
      <PartnersMarquee />

      {/* 8. Flagship Event Teaser */}
      <EventTeaser />
    </div>
  );
}
