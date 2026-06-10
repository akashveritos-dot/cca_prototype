"use client";

import React from "react";
import { Section } from "../ui/section";
import { Container } from "../ui/container";
import { NeuCard } from "../ui/neu-card";
import { Building2, Users2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function WhoWeAre() {
  return (
    <Section
      badge="About DCRF"
      title="A Convergence of Expertise"
      subtitle="Born from the strategic partnership of two pioneering organizations"
      centered
      className="bg-background relative overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent pointer-events-none" />

      <Container className="relative z-10">
        {/* Main intro card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <NeuCard variant="raised" className="p-8 md:p-10 mb-12 border border-brand-primary/10 bg-background/80 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary font-bold text-sm">
                <Building2 className="w-4 h-4" />
                Joint Venture Federation
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-foreground font-display leading-tight">
                Where CSR Research Meets <span className="text-brand-primary">Disaster Expertise</span>
              </h3>
              
              <p className="text-base text-muted/90 leading-relaxed">
                The Disaster & Climate Resilience Federation (DCRF) is a pioneering joint-venture federation founded by <strong className="text-foreground">TCU Impact Foundation (TCUIF)</strong> and <strong className="text-foreground">DiCAF (Disaster and Climate Action Federation)</strong>. We unite corporates, NGOs, academia, government bodies, and subject-matter experts to advance disaster preparedness, climate resilience, and sustainable development across India and the wider region.
              </p>
            </div>
          </NeuCard>
        </motion.div>

        {/* Founding partners grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <NeuCard 
              variant="raised" 
              interactive
              hoverEffect="lift"
              className="h-full p-8 border border-brand-primary/10 hover:border-brand-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-brand-primary/10 shadow-neu-inset flex items-center justify-center flex-shrink-0 group-hover:shadow-neu-raised transition-all duration-300">
                  <Building2 className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-1">
                    Founding Partner
                  </div>
                  <h4 className="text-xl font-bold text-foreground font-display">
                    TCU Impact Foundation
                  </h4>
                  <div className="text-xs text-muted font-semibold mt-1">TCUIF</div>
                </div>
              </div>
              
              <p className="text-sm text-muted/90 leading-relaxed mb-6">
                Brings extensive CSR research capabilities, corporate engagement expertise, and a proven track record of connecting industry with social impact initiatives across India.
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  CSR Research & Insights
                </div>
                <div className="flex items-center gap-2 text-xs text-muted font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  Corporate Network
                </div>
                <div className="flex items-center gap-2 text-xs text-muted font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  Strategic Communications
                </div>
              </div>
            </NeuCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <NeuCard 
              variant="raised" 
              interactive
              hoverEffect="lift"
              className="h-full p-8 border border-brand-secondary/10 hover:border-brand-secondary/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 shadow-neu-inset flex items-center justify-center flex-shrink-0 group-hover:shadow-neu-raised transition-all duration-300">
                  <Users2 className="w-6 h-6 text-brand-secondary" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-brand-secondary mb-1">
                    Founding Partner
                  </div>
                  <h4 className="text-xl font-bold text-foreground font-display">
                    DiCAF
                  </h4>
                  <div className="text-xs text-muted font-semibold mt-1">Disaster & Climate Action Federation</div>
                </div>
              </div>
              
              <p className="text-sm text-muted/90 leading-relaxed mb-6">
                Provides deep domain expertise in disaster management, climate action, and environmental resilience, with strong connections to government and technical communities.
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
                  Disaster Management Expertise
                </div>
                <div className="flex items-center gap-2 text-xs text-muted font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
                  Climate Action Programs
                </div>
                <div className="flex items-center gap-2 text-xs text-muted font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
                  Policy & Government Relations
                </div>
              </div>
            </NeuCard>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link 
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-background shadow-neu-raised hover:shadow-neu-inset text-brand-primary font-bold text-sm transition-all duration-300 group"
          >
            Learn More About Our Mission
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
