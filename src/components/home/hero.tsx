"use client";

import React from "react";
import Link from "next/link";
import { NeuButton } from "../ui/neu-button";
import { NeuCard } from "../ui/neu-card";
import { HeroCanvas } from "./hero-canvas";
import { AnimatedCounter } from "../ui/animated-counter";
import { Container } from "../ui/container";
import { ArrowRight, ChevronDown, Shield, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden py-12 md:py-16 bg-white dark:bg-background">
      {/* Background canvas animation - subtle for light bg */}
      <HeroCanvas />

      {/* Light themed gradient overlays - emergency alert colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-white to-red-50/60 dark:from-transparent dark:via-transparent dark:to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-orange-200/30 via-red-200/20 to-amber-200/30 dark:from-brand-primary/15 dark:via-brand-secondary/10 dark:to-alert-red/5 blur-3xl pointer-events-none" />

      {/* Emergency alert accent lines */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-red-500 to-amber-500 opacity-80" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 opacity-60" />

      {/* Spacer to push content down slightly */}
      <div className="flex-1 flex items-center">
        <Container className="w-full flex justify-center py-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-4xl"
          >
            <NeuCard variant="raised" className="relative p-6 sm:p-10 md:p-12 text-center overflow-hidden border-2 border-orange-200/60 dark:border-brand-primary/20 shadow-2xl bg-white/95 dark:bg-background/90 backdrop-blur-sm">
              {/* Alert-themed decorative elements */}
              <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-orange-300/20 dark:bg-brand-primary/10 blur-xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-red-300/20 dark:bg-alert-red/10 blur-xl pointer-events-none" />

              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-brand-primary bg-orange-100 dark:bg-brand-primary/10 border-2 border-orange-300 dark:border-brand-primary/30 shadow-sm mb-6">
                <Shield className="w-4 h-4" /> Joint Venture: TCUIF × DiCAF
              </span>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display leading-[1.15] mb-6">
                <span className="text-gray-900 dark:text-foreground">Uniting India for</span>{" "}
                <span className="bg-gradient-to-r from-orange-600 to-red-600 dark:from-brand-primary dark:to-brand-secondary bg-clip-text text-transparent">
                  Disaster Resilience
                </span>{" "}
                <span className="text-gray-900 dark:text-foreground">&</span>{" "}
                <span className="bg-gradient-to-r from-red-600 to-amber-600 dark:from-alert-red dark:to-accent bg-clip-text text-transparent">
                  Climate Action
                </span>
              </h1>

              <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-700 dark:text-muted/95 font-medium leading-relaxed mb-10">
                A national federation uniting corporates, NGOs, academia, government and experts to advance disaster preparedness, climate resilience and sustainable development across India.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link href="/membership" className="w-full sm:w-auto">
                  <NeuButton variant="primary" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 group shadow-lg bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0">
                    Become a Founding Member
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </NeuButton>
                </Link>
                <Link href="/federation" className="w-full sm:w-auto">
                  <NeuButton variant="raised" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 border-2 border-orange-200 dark:border-brand-primary/20 text-gray-900 dark:text-foreground">
                    Explore the Federation
                  </NeuButton>
                </Link>
              </div>
            </NeuCard>
          </motion.div>
        </Container>
      </div>

      {/* Live Impact Statistics Strip - Light theme with emergency colors */}
      <div className="w-full py-8 border-t-2 border-orange-200/60 dark:border-brand-primary/20 bg-orange-50/50 dark:bg-background/60 backdrop-blur-md shadow-inner">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-1 items-center"
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-orange-600 dark:text-brand-primary font-display flex items-center">
                <AnimatedCounter value={28} suffix="+" />
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-gray-700 dark:text-muted uppercase tracking-widest">
                States Covered
              </span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-1 items-center"
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-600 dark:text-alert-red font-display flex items-center">
                <AnimatedCounter value={450} suffix="+" />
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-gray-700 dark:text-muted uppercase tracking-widest">
                Disasters Monitored
              </span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-1 items-center"
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-foreground font-display flex items-center">
                <AnimatedCounter value={120} suffix="+" />
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-gray-700 dark:text-muted uppercase tracking-widest">
                Federation Members
              </span>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-1 items-center"
            >
              <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-brand-secondary font-display flex items-center">
                <AnimatedCounter value={15} suffix="M+" />
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-gray-700 dark:text-muted uppercase tracking-widest">
                Lives Impacted
              </span>
            </motion.div>
          </div>
        </Container>
      </div>
      
      {/* Down arrow indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-orange-600 dark:text-brand-primary/70 animate-bounce pointer-events-none">
        <span className="text-[9px] font-bold tracking-widest uppercase opacity-70">Discover More</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}
