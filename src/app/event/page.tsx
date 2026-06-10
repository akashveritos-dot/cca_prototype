"use client";

import React, { useState, useEffect } from "react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { Calendar, MapPin, Users, Award, Radio, Mic, BookOpen, Network, ArrowRight, Clock, Trophy, Star } from "lucide-react";
import Link from "next/link";

const awardCategories = [
  {
    id: 1,
    title: "Best Corporate Disaster Response",
    description: "Recognizing corporate excellence in disaster response and community support during emergencies.",
    criteria: "Impact, innovation, scalability, and sustainability of disaster response initiatives.",
    icon: Trophy,
    color: "#FF3B30",
  },
  {
    id: 2,
    title: "Best NGO Initiative",
    description: "Honoring NGOs demonstrating outstanding disaster preparedness and community resilience programs.",
    criteria: "Community impact, innovation, and long-term sustainability of programs.",
    icon: Award,
    color: "#10B981",
  },
  {
    id: 3,
    title: "Climate Resilient Community",
    description: "Celebrating communities showing exemplary climate adaptation and resilience practices.",
    criteria: "Community participation, measurable outcomes, and replicability.",
    icon: Users,
    color: "#1FB6C1",
  },
  {
    id: 4,
    title: "Disaster-Tech Innovator",
    description: "Recognizing breakthrough technological solutions in disaster management and climate resilience.",
    criteria: "Innovation, scalability, effectiveness, and adoption potential.",
    icon: Radio,
    color: "#3B82F6",
  },
  {
    id: 5,
    title: "Lifetime Achievement",
    description: "Honoring individuals with sustained contributions to disaster management and climate action.",
    criteria: "Career-long impact, leadership, and influence in the field.",
    icon: Star,
    color: "#FF9500",
  },
];

export default function EventPage() {
  const targetDate = new Date("2026-11-15T09:00:00+05:30").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
      });
    };
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Section className="bg-gradient-alert pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-accent blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-alert-red blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent font-bold text-sm mb-6">
              <Award className="w-4 h-4" />
              Pillar II - Annual Event
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-foreground leading-tight mb-6">
              Annual Disaster Management <span className="text-gradient-alert">Conference 2026</span>
            </h1>
            
            <p className="text-lg text-muted/90 leading-relaxed max-w-3xl mx-auto mb-4">
              India's premier hybrid conference on disaster preparedness, climate resilience, and emergency response — uniting 1,500+ experts, innovators, and decision-makers.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-muted mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                <span>November 15-16, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                <span>Mumbai, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-accent" />
                <span>Hybrid: In-Person + Virtual</span>
              </div>
            </div>

            {mounted && !timeLeft.isExpired && (
              <div className="flex items-center justify-center gap-4 mb-8">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Mins', value: timeLeft.minutes },
                  { label: 'Secs', value: timeLeft.seconds },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-xl bg-background shadow-neu-raised flex items-center justify-center">
                      <span className="text-2xl font-extrabold text-foreground font-display">{item.value}</span>
                    </div>
                    <span className="text-xs font-bold text-muted uppercase tracking-wider mt-2">{item.label}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#register">
                <NeuButton variant="primary" size="lg" className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold border-0 shadow-lg">
                  Register Now
                  <ArrowRight className="w-4 h-4" />
                </NeuButton>
              </Link>
              <Link href="#awards">
                <NeuButton variant="raised" size="lg" className="flex items-center gap-2 text-gray-900 dark:text-foreground font-bold">
                  <Award className="w-4 h-4" />
                  Nominate for Awards
                </NeuButton>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Event Format */}
      <Section badge="Event Format" title="Conference Structure" className="bg-background/80">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <NeuCard variant="raised" className="p-6 border border-brand-primary/10 text-center">
              <div className="w-14 h-14 rounded-xl bg-brand-primary/10 shadow-neu-inset flex items-center justify-center mx-auto mb-4">
                <Mic className="w-7 h-7 text-brand-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground font-display mb-2">Plenaries & Panels</h3>
              <p className="text-sm text-muted/90">
                Keynote sessions and expert panel discussions on disaster preparedness and climate action
              </p>
            </NeuCard>

            <NeuCard variant="raised" className="p-6 border border-brand-secondary/10 text-center">
              <div className="w-14 h-14 rounded-xl bg-brand-secondary/10 shadow-neu-inset flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7 text-brand-secondary" />
              </div>
              <h3 className="text-lg font-bold text-foreground font-display mb-2">Masterclasses</h3>
              <p className="text-sm text-muted/90">
                Deep-dive technical sessions on early warning systems, geospatial tech, and resilience planning
              </p>
            </NeuCard>

            <NeuCard variant="raised" className="p-6 border border-accent/10 text-center">
              <div className="w-14 h-14 rounded-xl bg-accent/10 shadow-neu-inset flex items-center justify-center mx-auto mb-4">
                <Radio className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground font-display mb-2">Tech Exhibition</h3>
              <p className="text-sm text-muted/90">
                Showcase of disaster-tech innovations, geospatial tools, and resilient infrastructure solutions
              </p>
            </NeuCard>

            <NeuCard variant="raised" className="p-6 border border-success-green/10 text-center">
              <div className="w-14 h-14 rounded-xl bg-success-green/10 shadow-neu-inset flex items-center justify-center mx-auto mb-4">
                <Network className="w-7 h-7 text-success-green" />
              </div>
              <h3 className="text-lg font-bold text-foreground font-display mb-2">Networking Zones</h3>
              <p className="text-sm text-muted/90">
                Dedicated spaces for partnerships, collaborations, and knowledge exchange
              </p>
            </NeuCard>
          </div>
        </Container>
      </Section>

      {/* Awards */}
      <Section 
        id="awards"
        badge="Recognition Program" 
        title="DCRF Recognition Awards" 
        subtitle="Honoring excellence in disaster management, climate resilience, and community preparedness"
        className="bg-gradient-storm"
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {awardCategories.map((award) => {
              const IconComponent = award.icon;
              return (
                <NeuCard 
                  key={award.id}
                  variant="raised" 
                  interactive
                  hoverEffect="lift"
                  className="p-6 border border-white/5 hover:border-brand-primary/20 transition-all duration-300 bg-background/80 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl shadow-neu-inset flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${award.color}15` }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: award.color }} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-foreground font-display leading-tight mb-2">
                        {award.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted/90 leading-relaxed mb-3">
                    {award.description}
                  </p>
                  
                  <div className="pt-3 border-t border-border/10">
                    <p className="text-xs text-muted font-semibold">
                      <strong>Criteria:</strong> {award.criteria}
                    </p>
                  </div>
                </NeuCard>
              );
            })}
          </div>

          <div className="text-center">
            <NeuCard variant="raised" className="inline-block p-8 border border-orange-300 dark:border-accent/20 bg-white dark:bg-background/90 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-foreground font-display mb-3">
                Nominations Open Until October 31, 2026
              </h3>
              <p className="text-sm text-gray-700 dark:text-muted/90 mb-6 max-w-xl">
                Submit your nominations for individuals, organizations, or communities demonstrating exceptional work in disaster management and climate resilience.
              </p>
              <Link href="/event/nominate">
                <NeuButton variant="primary" size="lg" className="flex items-center gap-2 mx-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0">
                  <Award className="w-4 h-4" />
                  Submit Nomination
                  <ArrowRight className="w-4 h-4" />
                </NeuButton>
              </Link>
            </NeuCard>
          </div>
        </Container>
      </Section>

      {/* Registration CTA */}
      <Section id="register" className="bg-white dark:bg-background">
        <Container>
          <NeuCard variant="raised" className="p-12 text-center border border-orange-300 dark:border-brand-primary/20 bg-gradient-to-br from-orange-50 to-red-50 dark:bg-gradient-resilience">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground font-display mb-4">
              Secure Your Spot Today
            </h2>
            <p className="text-gray-700 dark:text-muted/90 max-w-2xl mx-auto mb-8">
              Join 1,500+ disaster management professionals, policymakers, technologists, and community leaders at India's most comprehensive disaster resilience conference.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/event/register">
                <NeuButton variant="primary" size="lg" className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0">
                  Register for Conference
                  <ArrowRight className="w-4 h-4" />
                </NeuButton>
              </Link>
              <Link href="/event/sponsor">
                <NeuButton variant="raised" size="lg" className="border-2 border-orange-300 dark:border-brand-primary/20 text-gray-900 dark:text-foreground hover:bg-orange-50 dark:hover:bg-background">
                  Become a Sponsor
                </NeuButton>
              </Link>
            </div>
          </NeuCard>
        </Container>
      </Section>
    </div>
  );
}
