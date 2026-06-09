"use client";

import React, { useState } from "react";
import { Section } from "../ui/section";
import { Container } from "../ui/container";
import { NeuCard } from "../ui/neu-card";
import { Wind, ShieldCheck, Database, Award, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function WhyItMatters() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "1. CO₂ Absorption",
      short: "Capture",
      icon: <Wind className="w-5 h-5 text-brand-primary" />,
      color: "border-brand-primary/30",
      bg: "bg-brand-primary/10",
      description: "Durable removal pathways draw down carbon dioxide from the atmosphere. Biomass pyrolysis creates biochar, while weathering spreads silicate rocks to lock carbon away in mineral form for centuries.",
      stats: "Permanence: 100 to 1000+ years"
    },
    {
      title: "2. Scientific MRV",
      short: "Verification",
      icon: <ShieldCheck className="w-5 h-5 text-brand-secondary" />,
      color: "border-brand-secondary/30",
      bg: "bg-brand-secondary/10",
      description: "Measurement, Reporting, and Verification (MRV) protocols trace the sequestered carbon. Independent auditors verify additionality, baseline settings, and trace any leakage risks using geospatial data.",
      stats: "Audited by third-party agencies"
    },
    {
      title: "3. Registry Listing",
      short: "Issuance",
      icon: <Database className="w-5 h-5 text-brand-accent" />,
      color: "border-brand-accent/30",
      bg: "bg-brand-accent/10",
      description: "Verified carbon credits are minted on domestic registries under the Carbon Credit Trading Scheme (CCTS) or international standards (Verra, Gold Standard, GCC), preventing double-counting.",
      stats: "Integrated with national registries"
    },
    {
      title: "4. Compliance & Net Zero",
      short: "Retirement",
      icon: <Award className="w-5 h-5 text-brand-primary" />,
      color: "border-brand-primary/30",
      bg: "bg-brand-primary/10",
      description: "Obligated entities purchase certificates to meet compliance obligations. Voluntary buyers use high-permanence CDR to fulfill climate commitments, retiring the credits to finance new projects.",
      stats: "Accelerates green capital deployment"
    }
  ];

  return (
    <Section
      badge="Market & Science"
      title="The Carbon Credit & Removal Lifecycle"
      subtitle="How high-permanence carbon removals and robust regulatory markets work together to finance global-scale climate actions."
      className="bg-background/30 border-t border-border/10"
      id="lifecycle"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Steps List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className="w-full text-left focus:outline-none"
                  aria-label={`View details for step ${step.title}`}
                >
                  <NeuCard
                    variant={isActive ? "inset" : "raised"}
                    hoverEffect={isActive ? "none" : "press"}
                    interactive
                    className={`p-5 flex items-center gap-4 transition-all duration-300 border ${
                      isActive ? "border-brand-primary/25" : "border-white/10 dark:border-white/5"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${step.bg} flex items-center justify-center`}>
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-foreground">
                        {step.title}
                      </h3>
                      <span className="text-[10px] text-muted font-bold uppercase tracking-wider">
                        {step.short}
                      </span>
                    </div>
                    <ArrowRight className={`w-4 h-4 text-brand-primary transition-transform duration-300 ${
                      isActive ? "translate-x-1 opacity-100" : "opacity-30"
                    }`} />
                  </NeuCard>
                </button>
              );
            })}
          </div>

          {/* Interactive Screen Display */}
          <div className="lg:col-span-7 h-full">
            <NeuCard
              variant="inset"
              className="p-8 h-full min-h-[350px] flex flex-col justify-between border border-black/[0.03] dark:border-white/[0.02] bg-background/50 relative overflow-hidden"
            >
              {/* Radial gradient background based on active step */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-primary/5 via-transparent to-transparent opacity-60" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4 relative z-10"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-background shadow-neu-raised">
                      {steps[activeStep].icon}
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-primary font-bold uppercase tracking-widest">
                        Interactive Explorer
                      </span>
                      <h4 className="text-xl font-extrabold text-foreground font-display">
                        {steps[activeStep].title}
                      </h4>
                    </div>
                  </div>

                  <p className="text-sm text-muted/95 leading-relaxed font-medium mt-2">
                    {steps[activeStep].description}
                  </p>

                  <div className="mt-4 p-4 rounded-xl bg-background/40 border border-border/10 shadow-neu-inset-sm flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-pulse" />
                    <span className="text-xs font-bold text-foreground">
                      {steps[activeStep].stats}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress bar inside the screen */}
              <div className="w-full h-1 bg-background shadow-neu-inset rounded-full mt-8 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-500 ease-out"
                  style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </NeuCard>
          </div>

        </div>
      </Container>
    </Section>
  );
}
