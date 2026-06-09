"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { Shield, Target, Compass, Globe, Download, Landmark, FileCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const values = [
    {
      icon: <Shield className="w-6 h-6 text-brand-primary" />,
      title: "Centuries-Scale Permanence",
      desc: "Focusing exclusively on high-durability carbon removal methods that store CO₂ safely for hundreds of years.",
    },
    {
      icon: <Target className="w-6 h-6 text-brand-secondary" />,
      title: "India-First Deployment",
      desc: "Tailoring solutions to leverage India's unique geological assets (e.g. Deccan basalts) and agricultural structures (FPOs).",
    },
    {
      icon: <Compass className="w-6 h-6 text-brand-accent" />,
      title: "Scientific Rigor",
      desc: "Ensuring every credit represented is backed by verifiable, double-counting-free MRV standards.",
    },
  ];

  const milestones = [
    { year: "2023", title: "Foundation & First Summit", desc: "Formed under a mandate to bring together leading academic researchers and private sector innovators." },
    { year: "2024", title: "CCTS Pilot & Consultation", desc: "Submitted first comprehensive policy response to Bureau of Energy Efficiency (BEE) regarding carbon registries." },
    { year: "2025", title: "Basalt Weathering Launch", desc: "Pioneered India's first large-scale Enhanced Rock Weathering field trials in Maharashtra, monitoring soil health." },
    { year: "2026", title: "The Unified Alliance", desc: "Merged the capabilities of CRIA and CMAI, forming a complete value chain coalition from research to market execution." }
  ];

  return (
    <div className="pt-2 pb-8">
      {/* Header Banner */}
      <Section
        badge="Who We Are"
        title="Pioneering the Future of India's Carbon Economy"
        subtitle="Unifying the academic rigor of Carbon Removal India Alliance (CRIA) and the market mobilization scale of Carbon Markets Association of India (CMAI)."
        className="bg-background/20 py-4"
        variant="header"
      />

      {/* Mission & Vision */}
      <Container className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <NeuCard variant="raised" className="p-8 border border-white/10 dark:border-white/5">
            <h3 className="text-xl font-bold text-foreground font-display mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-primary" /> Our Core Mission
            </h3>
            <p className="text-sm text-muted/95 leading-relaxed font-medium">
              To build a robust, science-backed, and highly liquid carbon market ecosystem in India. We work hand-in-hand with regulatory bodies, scientific institutions, project developers, and rural communities to establish carbon finance pathways that directly accelerate global Net Zero milestones.
            </p>
          </NeuCard>

          <NeuCard variant="raised" className="p-8 border border-white/10 dark:border-white/5">
            <h3 className="text-xl font-bold text-foreground font-display mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-secondary" /> Our Vision
            </h3>
            <p className="text-sm text-muted/95 leading-relaxed font-medium">
              To position India as a global exporter of high-permanence carbon removal credits and a pioneer in green credit schemes. By establishing absolute standard transparency, we aim to channel billions in sustainable finance into regional economies, revitalizing soils and communities.
            </p>
          </NeuCard>
        </div>
      </Container>

      {/* Values */}
      <Section
        badge="Our Core Beliefs"
        title="Driven by Value, Backed by Science"
        subtitle="We adhere to strict quality guidelines to protect market integrity and community trust."
        centered
        className="bg-background"
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <NeuCard key={idx} variant="raised" interactive hoverEffect="lift" className="p-8 flex flex-col gap-4 border border-white/10 dark:border-white/5">
                <div className="w-12 h-12 rounded-2xl bg-background shadow-neu-inset flex items-center justify-center">
                  {val.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground font-display">
                  {val.title}
                </h3>
                <p className="text-sm text-muted/90 font-medium leading-relaxed">
                  {val.desc}
                </p>
              </NeuCard>
            ))}
          </div>
        </Container>
      </Section>

      {/* Government & Institutional Engagement */}
      <Section
        badge="Policy Integration"
        title="Supporting National Frameworks"
        subtitle="We engage directly with central ministries and think tanks to ensure regulatory alignments."
        className="bg-background/20"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 flex flex-col gap-6">
              <p className="text-sm text-muted/90 font-medium leading-relaxed">
                Our policy working group is actively involved in drafting support guidelines for major national initiatives. We serve as an advisor-member to ministerial panels, providing technical research on:
              </p>
              <ul className="flex flex-col gap-3.5">
                {[
                  "Carbon Credit Trading Scheme (CCTS) - Registry rules & sector caps",
                  "Green Credit Programme (GCP) - Tree-plantation & water conservation credits",
                  "Article 6.2 and 6.4 - International transaction authorization criteria",
                  "Extended Producer Responsibility (EPR) integrations with carbon offsets"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-semibold text-foreground">
                    <Landmark className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4">
                <NeuButton variant="primary" size="md" className="flex items-center gap-2 shadow-md">
                  <Download className="w-4 h-4" /> Download Alliance Profile (PDF)
                </NeuButton>
              </div>
            </div>

            <div className="lg:col-span-6">
              <NeuCard variant="inset" className="p-6 bg-background/50 border border-black/[0.03] dark:border-white/[0.02]">
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-4">
                  Regulatory Collaboration Highlights
                </h4>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4 p-4 rounded-xl bg-background shadow-neu-raised border border-white/5">
                    <FileCheck className="w-5 h-5 text-brand-secondary flex-shrink-0" />
                    <div>
                      <h5 className="text-xs font-bold text-foreground">BEE CCTS Framework Proposal</h5>
                      <p className="text-[11px] text-muted mt-1 leading-normal font-medium">Submitted suggestions on double-counting prevention mechanisms between REC, PAT, and CCTS registries.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 rounded-xl bg-background shadow-neu-raised border border-white/5">
                    <FileCheck className="w-5 h-5 text-brand-secondary flex-shrink-0" />
                    <div>
                      <h5 className="text-xs font-bold text-foreground">GCP Soil Sequestration Methodologies</h5>
                      <p className="text-[11px] text-muted mt-1 leading-normal font-medium">Collaborating on developing standard sampling methodologies for organic carbon metrics in agroforestry.</p>
                    </div>
                  </div>
                </div>
              </NeuCard>
            </div>
          </div>
        </Container>
      </Section>

      {/* Timeline Section */}
      <Section
        badge="Our History"
        title="Path to Leadership"
        subtitle="Key milestones that shaped the formation of Climate Carbon Alliance India."
        centered
        className="bg-background"
      >
        <Container>
          <div className="relative border-l-2 border-brand-primary/20 ml-4 md:ml-32 py-4 flex flex-col gap-12">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="relative pl-6 md:pl-12">
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-background shadow-neu-raised flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                </div>
                
                {/* Year Label */}
                <div className="absolute left-[-110px] top-1 text-sm font-extrabold text-brand-primary font-display hidden md:block w-20 text-right">
                  {milestone.year}
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-brand-primary md:hidden">{milestone.year}</span>
                  <h4 className="text-base font-bold text-foreground font-display">{milestone.title}</h4>
                  <p className="text-xs text-muted/90 max-w-2xl font-medium leading-relaxed mt-1">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
