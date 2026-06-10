"use client";

import React from "react";
import Link from "next/link";
import { Section } from "../ui/section";
import { Container } from "../ui/container";
import { NeuCard } from "../ui/neu-card";
import { Users, Calendar, Newspaper, ArrowRight, Shield, Award, Radio } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";

const pillars = [
  {
    id: 1,
    title: "The Federation",
    subtitle: "Pillar I",
    description: "A unifying institutional platform bringing together corporates, NGOs, academia, government and subject-matter experts for collaborative disaster resilience and climate action.",
    icon: Shield,
    href: "/federation",
    highlights: ["Tiered Membership", "Working Groups", "Policy Advocacy", "Knowledge Hub"],
    color: "primary",
  },
  {
    id: 2,
    title: "Annual Disaster Management Event",
    subtitle: "Pillar II",
    description: "India's premier hybrid conference on disaster management and climate resilience, featuring plenaries, exhibitions, awards, and recognition for excellence in the field.",
    icon: Award,
    href: "/event",
    highlights: ["National Conference", "Awards Program", "Tech Exhibition", "Networking"],
    color: "accent",
  },
  {
    id: 3,
    title: "disastersnews.com",
    subtitle: "Pillar III",
    description: "A dedicated digital news and knowledge platform covering disasters, climate action, environment, disaster technology and space-based applications.",
    icon: Radio,
    href: "/news",
    highlights: ["Breaking News", "Expert Analysis", "Tech Insights", "Climate Reports"],
    color: "secondary",
  },
];

export function PillarsSection() {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: index * 0.15
      }
    })
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "text-brand-primary border-brand-primary/30 bg-brand-primary/5";
      case "accent":
        return "text-accent border-accent/30 bg-accent/5";
      case "secondary":
        return "text-brand-secondary border-brand-secondary/30 bg-brand-secondary/5";
      default:
        return "text-brand-primary border-brand-primary/30 bg-brand-primary/5";
    }
  };

  return (
    <Section
      badge="Our Foundation"
      title="Three Pillars of Impact"
      subtitle="DCRF operates through three interconnected pillars, each designed to strengthen India's disaster preparedness and climate resilience ecosystem."
      centered
      className="bg-gradient-resilience relative overflow-hidden"
      id="pillars"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-brand-primary blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-brand-secondary blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            const colorClasses = getColorClasses(pillar.color);
            
            return (
              <motion.div
                key={pillar.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={index}
              >
                <Link href={pillar.href}>
                  <NeuCard
                    variant="raised"
                    interactive
                    hoverEffect="lift"
                    className="h-full flex flex-col items-start gap-5 p-8 group border border-brand-primary/10 hover:border-brand-primary/30 transition-all duration-300 bg-background/80 backdrop-blur-sm"
                  >
                    {/* Pillar Badge */}
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted/70">
                        {pillar.subtitle}
                      </span>
                      <div className={`w-10 h-10 rounded-xl shadow-neu-inset flex items-center justify-center transition-all duration-300 group-hover:shadow-neu-raised ${colorClasses}`}>
                        <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-foreground font-display leading-tight group-hover:text-brand-primary transition-colors duration-300">
                      {pillar.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted/90 font-medium leading-relaxed flex-1">
                      {pillar.description}
                    </p>

                    {/* Highlights */}
                    <div className="grid grid-cols-2 gap-2 w-full pt-4 border-t border-border/10">
                      {pillar.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-muted font-semibold">
                          <div className={`w-1 h-1 rounded-full ${colorClasses.split(' ')[0]}`} />
                          {highlight}
                        </div>
                      ))}
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center gap-2 text-sm font-bold text-brand-primary group-hover:gap-3 transition-all duration-300 mt-2">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </NeuCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
