"use client";

import React from "react";
import Link from "next/link";
import { NeuButton } from "../ui/neu-button";
import { NeuCard } from "../ui/neu-card";
import { HeroCanvas } from "./hero-canvas";
import { AnimatedCounter } from "../ui/animated-counter";
import { Container } from "../ui/container";
import { ArrowRight, ChevronDown, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden py-12 md:py-16">
      {/* Background canvas animation */}
      <HeroCanvas />

      {/* Decorative gradient glowing orb behind card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-gradient-to-tr from-brand-primary/10 via-brand-secondary/5 to-transparent blur-3xl pointer-events-none" />

      {/* Spacer to push content down slightly */}
      <div className="flex-1 flex items-center">
        <Container className="w-full flex justify-center py-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-4xl"
          >
            <NeuCard variant="raised" className="relative p-6 sm:p-10 md:p-12 text-center overflow-hidden border border-white/20 dark:border-white/5 shadow-2xl">
              {/* Outer decorative ring */}
              <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-brand-primary/5 blur-xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-brand-secondary/5 blur-xl pointer-events-none" />

              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand-primary bg-brand-primary/10 border border-brand-primary/20 shadow-neu-inset-sm mb-6 animate-pulse">
                <CheckCircle2 className="w-3.5 h-3.5" /> First-of-its-kind Coalition in India
              </span>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-foreground leading-[1.15] mb-6">
                Unifying High-Integrity{" "}
                <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                  Carbon Markets
                </span>{" "}
                &{" "}
                <span className="bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
                  Durable Removals
                </span>
              </h1>

              <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-muted/95 font-medium leading-relaxed mb-10">
                Pioneering carbon dioxide removal (CDR) ecosystems and accelerating the Net Zero transition across India. Guided by science, driven by industry, and trusted by government.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link href="/membership" className="w-full sm:w-auto">
                  <NeuButton variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 group shadow-lg">
                    Become a Member
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </NeuButton>
                </Link>
                <Link href="/our-work" className="w-full sm:w-auto">
                  <NeuButton variant="raised" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0">
                    Explore Our Work
                  </NeuButton>
                </Link>
              </div>
            </NeuCard>
          </motion.div>
        </Container>
      </div>

      {/* Live Impact Counter Strip */}
      <div className="w-full py-8 border-t border-border/10 bg-background/50 backdrop-blur-sm shadow-neu-inset">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col gap-1 items-center">
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-primary font-display flex items-center">
                <AnimatedCounter value={3500} suffix="+" />
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-muted uppercase tracking-widest">
                Projects Accelerated
              </span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-secondary font-display flex items-center">
                <AnimatedCounter value={220} suffix="M+" />
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-muted uppercase tracking-widest">
                Tons CO₂ Reduced
              </span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground font-display flex items-center">
                <AnimatedCounter value={150} suffix="+" />
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-muted uppercase tracking-widest">
                Ecosystem Partners
              </span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-accent font-display flex items-center">
                <AnimatedCounter value={500} suffix="K+" />
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-muted uppercase tracking-widest">
                Farmers Engaged
              </span>
            </div>
          </div>
        </Container>
      </div>
      
      {/* Down arrow indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-muted animate-bounce pointer-events-none">
        <span className="text-[9px] font-bold tracking-widest uppercase opacity-70">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}
