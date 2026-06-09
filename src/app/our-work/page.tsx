"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { NeuCard } from "@/components/ui/neu-card";
import { Leaf, Milestone, Flame, HelpCircle, FileText, CheckCircle2 } from "lucide-react";

export default function OurWorkPage() {
  const [activeTab, setActiveTab] = useState<"cdr" | "markets">("cdr");

  return (
    <div className="pt-2 pb-8">
      {/* Header Banner */}
      <Section
        badge="Sector Pathways"
        title="Scaling Solutions with Science & Policy"
        subtitle="Exploring the technical boundaries of durable carbon dioxide removal (CDR) and the regulatory instruments driving market growth."
        className="pb-2"
      />

      {/* Tabs Selector */}
      <Container className="mb-12">
        <div className="flex justify-center">
          <div className="flex bg-background/50 p-1.5 rounded-3xl shadow-neu-inset-sm border border-border/10">
            <button
              onClick={() => setActiveTab("cdr")}
              className={`px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-2xl transition-all duration-300 ${
                activeTab === "cdr"
                  ? "bg-background text-brand-primary shadow-neu-raised"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Durable CDR Pathways
            </button>
            <button
              onClick={() => setActiveTab("markets")}
              className={`px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-2xl transition-all duration-300 ${
                activeTab === "markets"
                  ? "bg-background text-brand-primary shadow-neu-raised"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Carbon Market Mechanisms
            </button>
          </div>
        </div>
      </Container>

      {/* Tab 1: CDR Content */}
      {activeTab === "cdr" && (
        <Container className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Explainer and Grid */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">
                  Technical Overview
                </span>
                <h3 className="text-xl font-extrabold text-foreground font-display">
                  Durable Carbon Dioxide Removal (CDR)
                </h3>
                <p className="text-sm text-muted/90 leading-relaxed font-medium">
                  Unlike traditional carbon offsets that only avoid emissions (e.g. building a solar farm), CDR actively pulls existing CO₂ out of the atmospheric cycle and stores it away for centuries.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <NeuCard variant="raised" className="p-6 border border-white/10 dark:border-white/5">
                  <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-brand-primary" /> Biochar Carbon Removal (BCR)
                  </h4>
                  <p className="text-xs text-muted/90 font-medium leading-relaxed">
                    Crop residue and woody biomass are heated in the absence of oxygen (pyrolysis). The resulting stable, carbon-rich biochar is added to soils, locking carbon for 500+ years while improving agricultural productivity.
                  </p>
                </NeuCard>

                <NeuCard variant="raised" className="p-6 border border-white/10 dark:border-white/5">
                  <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Milestone className="w-4 h-4 text-brand-secondary" /> Enhanced Rock Weathering (ERW)
                  </h4>
                  <p className="text-xs text-muted/90 font-medium leading-relaxed">
                    Spreading finely crushed silicate rocks (like basalt) on fields accelerated a natural chemical process that binds CO₂ into dissolved bicarbonate ions, washing into the oceans where it remains stable for over 10,000 years.
                  </p>
                </NeuCard>

                <NeuCard variant="raised" className="p-6 border border-white/10 dark:border-white/5">
                  <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-brand-accent" /> Soil Carbon Sequestration
                  </h4>
                  <p className="text-xs text-muted/90 font-medium leading-relaxed">
                    Adopting conservation tillage, cover cropping, and agroforestry to build humus-rich topsoils, boosting both water retention and organic carbon density.
                  </p>
                </NeuCard>
              </div>
            </div>

            {/* Visual Diagram Column */}
            <div className="lg:col-span-6 h-full">
              <NeuCard variant="inset" className="p-8 border border-black/[0.03] dark:border-white/[0.02] bg-background/50 flex flex-col justify-center min-h-[450px]">
                <h4 className="text-xs font-bold text-brand-primary uppercase tracking-widest text-center mb-6">
                  Biochar & Rock Weathering Cycles
                </h4>
                
                {/* SVG Flow illustration */}
                <div className="w-full flex justify-center py-4">
                  <svg viewBox="0 0 400 250" className="w-full max-w-[340px] drop-shadow-sm">
                    {/* Atmospheric CO2 */}
                    <circle cx="200" cy="40" r="30" className="fill-brand-secondary/10 stroke-brand-secondary/40 stroke-2 stroke-dasharray" />
                    <text x="200" y="44" textAnchor="middle" className="fill-foreground font-bold text-xs">CO₂ Atmosphere</text>

                    {/* Left Loop: Biomass / Biochar */}
                    <path d="M 170 40 Q 80 40 80 110" fill="none" className="stroke-brand-primary stroke-2" markerEnd="url(#arrow)" />
                    <rect x="30" y="110" width="100" height="50" rx="10" className="fill-background stroke-border stroke-2" />
                    <text x="80" y="130" textAnchor="middle" className="fill-foreground font-bold text-[10px]">Biomass Pyrolysis</text>
                    <text x="80" y="145" textAnchor="middle" className="fill-brand-primary font-bold text-[9px]">(Biochar to Soil)</text>

                    {/* Right Loop: Basalt / Weathering */}
                    <path d="M 230 40 Q 320 40 320 110" fill="none" className="stroke-brand-secondary stroke-2" markerEnd="url(#arrow)" />
                    <rect x="270" y="110" width="100" height="50" rx="10" className="fill-background stroke-border stroke-2" />
                    <text x="320" y="130" textAnchor="middle" className="fill-foreground font-bold text-[10px]">Basalt Weathering</text>
                    <text x="320" y="145" textAnchor="middle" className="fill-brand-secondary font-bold text-[9px]">(Bicarbonate Runoff)</text>

                    {/* Geological Sink */}
                    <path d="M 80 160 Q 80 220 185 220" fill="none" className="stroke-brand-primary stroke-2" />
                    <path d="M 320 160 Q 320 220 215 220" fill="none" className="stroke-brand-secondary stroke-2" />
                    <circle cx="200" cy="220" r="22" className="fill-brand-primary/10 stroke-brand-primary/40 stroke-2" />
                    <text x="200" y="224" textAnchor="middle" className="fill-foreground font-bold text-[9px]">Geological Storage</text>

                    {/* SVG Arrow definitions */}
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" className="fill-brand-primary" />
                      </marker>
                    </defs>
                  </svg>
                </div>

                <div className="flex flex-col gap-3.5 mt-4 border-t border-border/10 pt-6">
                  <div className="flex gap-2.5 items-center">
                    <CheckCircle2 className="w-4 h-4 text-brand-primary flex-shrink-0" />
                    <span className="text-xs text-foreground font-semibold">100% Additional: Sequesters new atmospheric CO₂</span>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <CheckCircle2 className="w-4 h-4 text-brand-primary flex-shrink-0" />
                    <span className="text-xs text-foreground font-semibold">No reversal risk: Mineralized storage is permanent</span>
                  </div>
                </div>
              </NeuCard>
            </div>
          </div>
        </Container>
      )}

      {/* Tab 2: Markets Content */}
      {activeTab === "markets" && (
        <Container className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Explainer and Grid */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest">
                  Regulatory Overview
                </span>
                <h3 className="text-xl font-extrabold text-foreground font-display">
                  Indian & Global Carbon Markets
                </h3>
                <p className="text-sm text-muted/90 leading-relaxed font-medium">
                  We bridge the Gap between compliance schemes and voluntary buyer pools, facilitating international trade and local investments under state frameworks.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <NeuCard variant="raised" className="p-6 border border-white/10 dark:border-white/5">
                  <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-brand-primary" /> Carbon Credit Trading Scheme (CCTS)
                  </h4>
                  <p className="text-xs text-muted/90 font-medium leading-relaxed">
                    India's domestic compliance market managed by the BEE. Obligated industries will be assigned specific emission intensity targets, promoting market-based trades of Carbon Credit Certificates (CCCs).
                  </p>
                </NeuCard>

                <NeuCard variant="raised" className="p-6 border border-white/10 dark:border-white/5">
                  <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-brand-secondary" /> Article 6 (Paris Agreement)
                  </h4>
                  <p className="text-xs text-muted/90 font-medium leading-relaxed">
                    Bilateral transactions (Article 6.2) and global public registries (Article 6.4). We guide project developers through the complexities of host country authorization and Corresponding Adjustments.
                  </p>
                </NeuCard>

                <NeuCard variant="raised" className="p-6 border border-white/10 dark:border-white/5">
                  <h4 className="text-sm font-extrabold text-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-brand-accent" /> Green Credit Programme (GCP)
                  </h4>
                  <p className="text-xs text-muted/90 font-medium leading-relaxed">
                    A market mechanism focused on environmental actions beyond carbon, such as water conservation and afforestation, creating incentives for sustainable land stewardship.
                  </p>
                </NeuCard>
              </div>
            </div>

            {/* Visual Diagram Column */}
            <div className="lg:col-span-6 h-full">
              <NeuCard variant="inset" className="p-8 border border-black/[0.03] dark:border-white/[0.02] bg-background/50 flex flex-col justify-center min-h-[450px]">
                <h4 className="text-xs font-bold text-brand-secondary uppercase tracking-widest text-center mb-6">
                  Carbon Asset Trading Structure
                </h4>

                {/* SVG Flow illustration for Markets */}
                <div className="w-full flex justify-center py-4">
                  <svg viewBox="0 0 400 250" className="w-full max-w-[340px] drop-shadow-sm">
                    {/* Developer */}
                    <rect x="20" y="30" width="100" height="50" rx="10" className="fill-background stroke-brand-primary stroke-2" />
                    <text x="70" y="55" textAnchor="middle" className="fill-foreground font-bold text-[10px]">Project Developer</text>
                    <text x="70" y="68" textAnchor="middle" className="fill-brand-primary font-bold text-[8px]">(Generates Credits)</text>

                    {/* Registry */}
                    <circle cx="200" cy="125" r="32" className="fill-brand-secondary/10 stroke-brand-secondary/40 stroke-2" />
                    <text x="200" y="123" textAnchor="middle" className="fill-foreground font-bold text-[10px]">National Registry</text>
                    <text x="200" y="135" textAnchor="middle" className="fill-brand-secondary font-bold text-[9px]">(BEE / CCTS)</text>

                    {/* Buyer */}
                    <rect x="280" y="30" width="100" height="50" rx="10" className="fill-background stroke-brand-accent stroke-2" />
                    <text x="330" y="55" textAnchor="middle" className="fill-foreground font-bold text-[10px]">Obligated Entity</text>
                    <text x="330" y="68" textAnchor="middle" className="fill-brand-accent font-bold text-[8px]">(Steel, Cement, Power)</text>

                    {/* Flow Paths */}
                    <path d="M 120 55 L 168 125" fill="none" className="stroke-brand-primary stroke-2" markerEnd="url(#arrow-market)" />
                    <path d="M 232 125 L 280 55" fill="none" className="stroke-brand-accent stroke-2" markerEnd="url(#arrow-market)" />

                    {/* Capital Refund Path */}
                    <path d="M 280 40 L 120 40" fill="none" className="stroke-brand-secondary stroke-2 stroke-dasharray" markerEnd="url(#arrow-capital)" />
                    <text x="200" y="35" textAnchor="middle" className="fill-brand-secondary font-bold text-[9px]">Finance/Capital Flow</text>

                    <defs>
                      <marker id="arrow-market" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" className="fill-brand-primary" />
                      </marker>
                      <marker id="arrow-capital" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" className="fill-brand-secondary" />
                      </marker>
                    </defs>
                  </svg>
                </div>

                <div className="flex flex-col gap-3.5 mt-4 border-t border-border/10 pt-6">
                  <div className="flex gap-2.5 items-center">
                    <CheckCircle2 className="w-4 h-4 text-brand-secondary flex-shrink-0" />
                    <span className="text-xs text-foreground font-semibold">CCTS Compliant: Audited emission tracking</span>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <CheckCircle2 className="w-4 h-4 text-brand-secondary flex-shrink-0" />
                    <span className="text-xs text-foreground font-semibold">Article 6 Compatible: Prevents double counting</span>
                  </div>
                </div>
              </NeuCard>
            </div>
          </div>
        </Container>
      )}
    </div>
  );
}
