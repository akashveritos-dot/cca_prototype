import React from "react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { Shield, Users, FileText, TrendingUp, BookOpen, Award, AlertTriangle, Waves, Satellite, RefreshCw, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Federation - Pillar I",
  description: "A unifying institutional platform for disaster preparedness and climate resilience, bringing together corporates, NGOs, academia, government and experts.",
};

const membershipTiers = [
  {
    tier: "Founding Member",
    price: "₹5,00,000",
    period: "/year",
    description: "Charter members shaping the federation's strategic direction",
    features: [
      "Steering Committee seat",
      "Priority in working groups",
      "Brand visibility at all events",
      "Exclusive policy briefings",
      "Annual report co-authorship",
      "Founding member badge",
    ],
    color: "alert-red",
    featured: true,
  },
  {
    tier: "Institutional Member",
    price: "₹2,50,000",
    period: "/year",
    description: "Organizations committed to disaster resilience ecosystem",
    features: [
      "Working group participation",
      "Event speaking opportunities",
      "Knowledge platform access",
      "Quarterly briefings",
      "Member directory listing",
      "Certificate of membership",
    ],
    color: "primary",
    featured: false,
  },
  {
    tier: "Corporate Member",
    price: "₹1,50,000",
    period: "/year",
    description: "Corporates advancing disaster CSR and resilience",
    features: [
      "CSR alignment support",
      "Event participation",
      "Member networking",
      "Resource library access",
      "Logo on website",
      "Annual certificate",
    ],
    color: "secondary",
    featured: false,
  },
  {
    tier: "Individual Member",
    price: "₹25,000",
    period: "/year",
    description: "Professionals and subject-matter experts",
    features: [
      "Expert network access",
      "Event discounts (50%)",
      "Knowledge resources",
      "Newsletter subscription",
      "Member ID card",
      "Conference access",
    ],
    color: "accent",
    featured: false,
  },
  {
    tier: "Student/Volunteer",
    price: "₹5,000",
    period: "/year",
    description: "Students and volunteers passionate about resilience",
    features: [
      "Free event access",
      "Volunteer opportunities",
      "Learning resources",
      "Mentorship programs",
      "Student ID benefits",
      "Certificate of participation",
    ],
    color: "success-green",
    featured: false,
  },
];

const workingGroups = [
  {
    id: 1,
    name: "Risk Assessment & Early Warning",
    icon: AlertTriangle,
    color: "#FF3B30",
    chair: "Dr. Rajesh Kumar",
    members: 24,
    description: "Developing comprehensive risk assessment frameworks, early warning systems, and vulnerability mapping across states.",
  },
  {
    id: 2,
    name: "Climate Adaptation & Resilience",
    icon: Waves,
    color: "#1FB6C1",
    chair: "Dr. Priya Sharma",
    members: 28,
    description: "Building climate-resilient communities, infrastructure adaptation, and nature-based solutions for climate resilience.",
  },
  {
    id: 3,
    name: "Disaster Technology & Innovation",
    icon: Satellite,
    color: "#3B82F6",
    chair: "Amit Verma",
    members: 32,
    description: "Leveraging AI, machine learning, IoT, geospatial technology and space applications for disaster management.",
  },
  {
    id: 4,
    name: "Capacity Building & Training",
    icon: Users,
    color: "#FF9500",
    chair: "Dr. Sunita Reddy",
    members: 21,
    description: "Strengthening institutional capacity, community training, and disaster preparedness education programs.",
  },
  {
    id: 5,
    name: "Climate Finance & Investment",
    icon: TrendingUp,
    color: "#10B981",
    chair: "Vikram Singh",
    members: 19,
    description: "Mobilizing financial resources, climate risk insurance, and investment for disaster risk reduction initiatives.",
  },
  {
    id: 6,
    name: "Post-Disaster Recovery",
    icon: RefreshCw,
    color: "#8B5CF6",
    chair: "Dr. Anjali Gupta",
    members: 26,
    description: "Coordinating effective post-disaster recovery, rehabilitation, reconstruction and livelihood restoration.",
  },
];

export default function FederationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Section className="bg-gradient-storm pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-disaster-overlay pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary font-bold text-sm mb-6">
              <Shield className="w-4 h-4" />
              Pillar I
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-foreground leading-tight mb-6">
              The <span className="text-gradient-primary">Federation</span>
            </h1>
            
            <p className="text-lg text-muted/90 leading-relaxed max-w-3xl mx-auto mb-8">
              A unifying institutional platform bringing together corporates, NGOs, academia, government and subject-matter experts for collaborative disaster resilience and climate action across India.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#membership">
                <NeuButton variant="primary" size="lg" className="flex items-center gap-2">
                  Join the Federation
                  <ArrowRight className="w-4 h-4" />
                </NeuButton>
              </Link>
              <Link href="#working-groups">
                <NeuButton variant="raised" size="lg">
                  Explore Working Groups
                </NeuButton>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Purpose & Governance */}
      <Section badge="Our Purpose" title="Why the Federation Exists" className="bg-background/80">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <NeuCard variant="raised" className="p-8 border border-brand-primary/10">
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 shadow-neu-inset flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-display mb-3">Multi-Stakeholder Unity</h3>
              <p className="text-sm text-muted/90 leading-relaxed">
                Breaking silos between government, private sector, civil society, and academia to enable coordinated disaster response and climate action.
              </p>
            </NeuCard>

            <NeuCard variant="raised" className="p-8 border border-brand-secondary/10">
              <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 shadow-neu-inset flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-brand-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-display mb-3">Policy Advocacy</h3>
              <p className="text-sm text-muted/90 leading-relaxed">
                Developing evidence-based policy recommendations and position papers to influence national and state-level disaster management frameworks.
              </p>
            </NeuCard>

            <NeuCard variant="raised" className="p-8 border border-accent/10">
              <div className="w-12 h-12 rounded-xl bg-accent/10 shadow-neu-inset flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-display mb-3">Knowledge Hub</h3>
              <p className="text-sm text-muted/90 leading-relaxed">
                Creating a centralized repository of best practices, case studies, research findings, and disaster management resources for the entire ecosystem.
              </p>
            </NeuCard>
          </div>
        </Container>
      </Section>

      {/* Working Groups */}
      <Section 
        id="working-groups"
        badge="Expert Panels" 
        title="Six Working Groups" 
        subtitle="Cross-sector expert groups driving focused action across critical areas of disaster resilience"
        className="bg-gradient-resilience"
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workingGroups.map((group) => {
              const IconComponent = group.icon;
              return (
                <NeuCard 
                  key={group.id}
                  variant="raised" 
                  interactive
                  hoverEffect="lift"
                  className="p-6 border border-white/5 hover:border-brand-primary/20 transition-all duration-300 bg-background/80 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div 
                      className="w-12 h-12 rounded-xl shadow-neu-inset flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${group.color}15`, borderColor: `${group.color}30` }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: group.color }} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-foreground font-display leading-tight mb-1">
                        {group.name}
                      </h3>
                      <div className="text-xs text-muted font-semibold">
                        {group.members} Members • Chair: {group.chair}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted/90 leading-relaxed">
                    {group.description}
                  </p>
                </NeuCard>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Membership Tiers */}
      <Section 
        id="membership"
        badge="Join Us" 
        title="Membership Tiers" 
        subtitle="Choose the membership level that fits your organization or individual commitment to disaster resilience"
        className="bg-background"
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {membershipTiers.map((tier, index) => (
              <NeuCard
                key={index}
                variant="raised"
                interactive
                hoverEffect="lift"
                className={`p-6 border ${
                  tier.featured 
                    ? 'border-alert-red/30 bg-alert-red/5 ring-2 ring-alert-red/20' 
                    : 'border-brand-primary/10'
                } transition-all duration-300 flex flex-col`}
              >
                {tier.featured && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-alert-red text-white text-xs font-bold mb-4 w-fit">
                    <Award className="w-3 h-3" />
                    Featured
                  </div>
                )}
                
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-foreground font-display mb-1">
                    {tier.tier}
                  </h3>
                  <p className="text-xs text-muted/80">
                    {tier.description}
                  </p>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-extrabold text-foreground font-display">
                    {tier.price}
                  </span>
                  <span className="text-sm text-muted">{tier.period}</span>
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-muted/90">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/membership/apply" className="w-full">
                  <NeuButton 
                    variant={tier.featured ? "primary" : "raised"} 
                    size="sm" 
                    className="w-full"
                  >
                    Apply Now
                  </NeuButton>
                </Link>
              </NeuCard>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-storm">
        <Container>
          <NeuCard variant="raised" className="p-12 text-center border border-brand-primary/20 bg-background/90 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-foreground font-display mb-4">
              Ready to Join the Federation?
            </h2>
            <p className="text-muted/90 max-w-2xl mx-auto mb-8">
              Be part of India's premier multi-stakeholder platform for disaster resilience and climate action. Together, we can build a more resilient future.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/membership/apply">
                <NeuButton variant="primary" size="lg" className="flex items-center gap-2">
                  Apply for Membership
                  <ArrowRight className="w-4 h-4" />
                </NeuButton>
              </Link>
              <Link href="/contact">
                <NeuButton variant="raised" size="lg">
                  Contact Us
                </NeuButton>
              </Link>
            </div>
          </NeuCard>
        </Container>
      </Section>
    </div>
  );
}
