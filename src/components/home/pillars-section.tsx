"use client";

import React from "react";
import { Section } from "../ui/section";
import { Container } from "../ui/container";
import { NeuCard } from "../ui/neu-card";

import { Beaker, FileText, Users, GraduationCap, Globe, BookOpen, LucideIcon } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import pillarsData from "../../content/pillars.json";

// Map string icon names to Lucide Icon components
const iconMap: Record<string, LucideIcon> = {
  Beaker: Beaker,
  FileText: FileText,
  Users: Users,
  GraduationCap: GraduationCap,
  Globe: Globe,
  BookOpen: BookOpen,
};

export function PillarsSection() {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <Section
      badge="Key Objectives"
      title="Strategic Pillars of Action"
      subtitle="Bringing together science-based research, robust policy frameworks, and industry coordination to build an active, reliable carbon value chain in India."
      centered
      className="bg-background/20"
      id="pillars"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillarsData.map((pillar, index) => {
            const IconComponent = iconMap[pillar.icon] || FileText;
            return (
              <motion.div
                key={pillar.id}
                variants={cardVariants}
                custom={index}
              >
                <NeuCard
                  variant="raised"
                  interactive
                  hoverEffect="press"
                  className="h-full flex flex-col items-start gap-4 p-8 group border border-white/10 dark:border-white/5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-background shadow-neu-inset flex items-center justify-center transition-all duration-300 group-hover:shadow-neu-raised">
                    <IconComponent className="w-6 h-6 text-brand-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground font-display mt-2 group-hover:text-brand-primary transition-colors duration-200">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted/90 font-medium leading-relaxed">
                    {pillar.description}
                  </p>
                </NeuCard>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
