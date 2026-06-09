"use client";

import React from "react";
import { Container } from "../ui/container";
import { NeuCard } from "../ui/neu-card";
import { ShieldCheck, Scale, Award } from "lucide-react";

export function MissionStrip() {
  const badges = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-brand-primary" />,
      label: "Non-Partisan Alliance",
      desc: "Science-first and policy-neutral",
    },
    {
      icon: <Scale className="w-5 h-5 text-brand-secondary" />,
      label: "Not-for-Profit",
      desc: "Mission-driven, public interest-focused",
    },
    {
      icon: <Award className="w-5 h-5 text-brand-accent" />,
      label: "Industry-Led",
      desc: "Co-designed with India's top innovators",
    },
  ];

  return (
    <section className="py-12 bg-background/30 border-y border-border/10">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
          <div className="max-w-xl text-center lg:text-left">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-2">
              Our Organizational Mandate
            </h2>
            <p className="text-lg font-bold text-foreground leading-relaxed">
              Catalysing India's durable carbon dioxide removal (CDR) sector and accelerating carbon market readiness through rigorous policy advocacy, scientific research, and ecosystem alignment.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-5 w-full lg:w-auto">
            {badges.map((badge, idx) => (
              <NeuCard
                key={idx}
                variant="raised"
                hoverEffect="lift"
                interactive
                className="flex-1 sm:w-48 p-5 flex flex-col items-center text-center gap-2"
              >
                <div className="w-10 h-10 rounded-full bg-background shadow-neu-inset flex items-center justify-center mb-1">
                  {badge.icon}
                </div>
                <h3 className="text-xs font-extrabold tracking-tight text-foreground uppercase">
                  {badge.label}
                </h3>
                <p className="text-[10px] text-muted font-semibold leading-tight">
                  {badge.desc}
                </p>
              </NeuCard>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
