import React from "react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { Building2, Trophy, Medal, Award, Star, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners & Sponsors",
  description: "Our network of corporate partners, government agencies, NGOs, and academic institutions supporting disaster resilience and climate action.",
};

const partnershipTiers = [
  {
    tier: "Platinum Partner",
    icon: Trophy,
    color: "#A78BFA",
    benefits: [
      "Logo on all event materials",
      "Keynote speaking slot",
      "Exhibition booth (premium)",
      "Annual report branding",
      "Press release co-authorship",
    ],
  },
  {
    tier: "Gold Partner",
    icon: Medal,
    color: "#FF9500",
    benefits: [
      "Logo on event materials",
      "Panel participation",
      "Exhibition booth",
      "Newsletter branding",
      "Social media features",
    ],
  },
  {
    tier: "Silver Partner",
    icon: Award,
    color: "#8B92A0",
    benefits: [
      "Logo on website",
      "Event participation",
      "Small exhibition space",
      "Member directory listing",
    ],
  },
  {
    tier: "Knowledge Partner",
    icon: Star,
    color: "#1FB6C1",
    benefits: [
      "Research collaboration",
      "Content co-creation",
      "Data sharing access",
      "Policy brief co-authorship",
    ],
  },
];

export default function PartnersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Section className="bg-gradient-storm pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-disaster-overlay pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary font-bold text-sm mb-6">
              <Shield className="w-4 h-4" />
              Partnership Network
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-foreground leading-tight mb-6">
              Our <span className="text-gradient-primary">Partners</span>
            </h1>
            
            <p className="text-lg text-muted/90 leading-relaxed max-w-3xl mx-auto mb-8">
              A diverse ecosystem of corporates, government agencies, NGOs, research institutions, and technology partners united in advancing disaster resilience and climate action across India.
            </p>

            <Link href="#partner-with-us">
              <NeuButton variant="primary" size="lg" className="flex items-center gap-2 mx-auto">
                Become a Partner
                <ArrowRight className="w-4 h-4" />
              </NeuButton>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Founding Partners */}
      <Section badge="Founding Organizations" title="Joint Venture Partners" className="bg-background/80">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <NeuCard variant="raised" interactive hoverEffect="lift" className="p-10 border border-brand-primary/20 text-center">
              <div className="w-20 h-20 rounded-xl bg-brand-primary/10 shadow-neu-inset flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-10 h-10 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground font-display mb-2">
                TCU Impact Foundation
              </h3>
              <div className="text-sm text-brand-primary font-bold mb-4">TCUIF</div>
              <p className="text-sm text-muted/90 leading-relaxed">
                CSR research expertise, corporate engagement, and strategic communications supporting the federation's mission.
              </p>
            </NeuCard>

            <NeuCard variant="raised" interactive hoverEffect="lift" className="p-10 border border-brand-secondary/20 text-center">
              <div className="w-20 h-20 rounded-xl bg-brand-secondary/10 shadow-neu-inset flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-brand-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground font-display mb-2">
                DiCAF
              </h3>
              <div className="text-sm text-brand-secondary font-bold mb-4">Disaster & Climate Action Federation</div>
              <p className="text-sm text-muted/90 leading-relaxed">
                Disaster management domain expertise, climate action programs, and government relations driving resilience initiatives.
              </p>
            </NeuCard>
          </div>
        </Container>
      </Section>

      {/* Partnership Tiers */}
      <Section 
        id="partner-with-us"
        badge="Partnership Opportunities" 
        title="Partnership Tiers" 
        subtitle="Support India's disaster resilience ecosystem through strategic partnerships"
        className="bg-gradient-resilience"
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnershipTiers.map((tier, index) => {
              const IconComponent = tier.icon;
              return (
                <NeuCard 
                  key={index}
                  variant="raised" 
                  interactive
                  hoverEffect="lift"
                  className="p-6 border border-white/5 hover:border-brand-primary/20 transition-all duration-300 bg-background/80 backdrop-blur-sm"
                >
                  <div 
                    className="w-14 h-14 rounded-xl shadow-neu-inset flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${tier.color}15` }}
                  >
                    <IconComponent className="w-7 h-7" style={{ color: tier.color }} />
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground font-display mb-4">
                    {tier.tier}
                  </h3>
                  
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-muted/90">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </NeuCard>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <NeuCard variant="raised" className="inline-block p-8 border border-brand-primary/20 bg-background/90 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-foreground font-display mb-3">
                Interested in Partnership?
              </h3>
              <p className="text-sm text-muted/90 mb-6 max-w-xl">
                Join our growing network of organizations committed to disaster resilience and climate action. Contact us to discuss partnership opportunities.
              </p>
              <Link href="/contact">
                <NeuButton variant="primary" size="lg" className="flex items-center gap-2 mx-auto">
                  Contact Partnership Team
                  <ArrowRight className="w-4 h-4" />
                </NeuButton>
              </Link>
            </NeuCard>
          </div>
        </Container>
      </Section>

      {/* Partner Logos Placeholder */}
      <Section badge="Our Network" title="Current Partners" className="bg-background">
        <Container>
          <NeuCard variant="raised" className="p-12 text-center border border-brand-primary/10">
            <p className="text-muted/90 mb-6">
              Partner logos and profiles will be displayed here once partnerships are finalized.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-bold">
              Partners Section Coming Soon
            </div>
          </NeuCard>
        </Container>
      </Section>
    </div>
  );
}
