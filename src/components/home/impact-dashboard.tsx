"use client";

import React from "react";
import { Section } from "../ui/section";
import { Container } from "../ui/container";
import { NeuCard } from "../ui/neu-card";
import { AnimatedCounter } from "../ui/animated-counter";
import { Activity, ShieldCheck, Zap, Globe } from "lucide-react";

export function ImpactDashboard() {
  const stats = [
    {
      label: "Registered Projects",
      value: 3500,
      suffix: "+",
      icon: <Activity className="w-5 h-5 text-brand-primary" />,
      desc: "Accredited carbon emission offset projects across India",
    },
    {
      label: "Carbon Reduced (Tons CO₂e)",
      value: 220,
      suffix: "M+",
      icon: <ShieldCheck className="w-5 h-5 text-brand-secondary" />,
      desc: "Cumulatively avoided or sequestered from the atmosphere",
    },
    {
      label: "Member Organizations",
      value: 150,
      suffix: "+",
      icon: <Zap className="w-5 h-5 text-brand-accent" />,
      desc: "FPOs, project developers, corporates, and academia",
    },
    {
      label: "Policy Advices Submitted",
      value: 24,
      suffix: "",
      icon: <Globe className="w-5 h-5 text-brand-primary" />,
      desc: "Representations to ministries on CCTS, Article 6, and GCP guidelines",
    },
  ];

  return (
    <Section
      badge="Tracking Performance"
      title="Our Collective Impact"
      subtitle="Fostering transparency and real results. From regulatory submissions to direct soil sequestration, our efforts drive verifiable climate action."
      className="bg-background"
      id="impact"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <NeuCard
                variant="inset"
                className="flex flex-col items-start gap-4 p-7 h-full border border-black/[0.03] dark:border-white/[0.02] bg-background/50 relative overflow-hidden"
              >
                {/* Decorative highlight inside screen */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-primary/5 to-transparent blur-md pointer-events-none" />

                <div className="w-9 h-9 rounded-xl bg-background shadow-neu-raised flex items-center justify-center">
                  {stat.icon}
                </div>

                <div className="flex flex-col gap-1 mt-2">
                  <span className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight font-display">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-xs font-bold text-brand-primary uppercase tracking-widest mt-1">
                    {stat.label}
                  </span>
                </div>
                
                <p className="text-xs text-muted/90 leading-relaxed font-semibold mt-auto pt-2">
                  {stat.desc}
                </p>
              </NeuCard>
            </div>
          ))}
        </div>

        {/* Highlight Banner */}
        <div className="mt-12">
          <NeuCard
            variant="raised"
            className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-to-r from-brand-primary/5 via-brand-secondary/5 to-transparent border border-white/20 dark:border-white/5"
          >
            <div className="max-w-2xl text-center md:text-left">
              <h3 className="text-lg font-bold text-foreground font-display mb-2">
                India's First Comprehensive Carbon Project Registry Alignment
              </h3>
              <p className="text-sm text-muted/90 font-medium leading-relaxed">
                By bridging scientific researchers at CRIA with the massive industrial network of CMAI, we ensure that new projects implement best-in-class MRV (Measurement, Reporting, and Verification) methodologies.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="px-6 py-3.5 rounded-2xl bg-background shadow-neu-inset text-xs font-extrabold uppercase tracking-widest text-brand-primary border border-brand-primary/20">
                100% Verifiable Credits
              </div>
            </div>
          </NeuCard>
        </div>
      </Container>
    </Section>
  );
}
