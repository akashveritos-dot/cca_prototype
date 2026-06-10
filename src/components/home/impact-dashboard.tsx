"use client";

import React from "react";
import { Section } from "../ui/section";
import { Container } from "../ui/container";
import { NeuCard } from "../ui/neu-card";
import { AnimatedCounter } from "../ui/animated-counter";
import { AlertTriangle, MapPin, Users, TrendingUp, Shield, Activity } from "lucide-react";
import { motion } from "framer-motion";

export function ImpactDashboard() {
  const stats = [
    {
      label: "States Covered",
      value: 28,
      suffix: "+",
      icon: <MapPin className="w-5 h-5 text-brand-primary" />,
      desc: "Active disaster preparedness and resilience programs",
      color: "primary",
    },
    {
      label: "Disasters Monitored",
      value: 450,
      suffix: "+",
      icon: <AlertTriangle className="w-5 h-5 text-alert-red" />,
      desc: "Real-time tracking and response coordination annually",
      color: "alert",
    },
    {
      label: "Federation Members",
      value: 120,
      suffix: "+",
      icon: <Users className="w-5 h-5 text-brand-secondary" />,
      desc: "Corporates, NGOs, academia, and government partners",
      color: "secondary",
    },
    {
      label: "Communities Reached",
      value: 15,
      suffix: "M+",
      icon: <Shield className="w-5 h-5 text-success-green" />,
      desc: "Disaster preparedness and climate adaptation training",
      color: "success",
    },
    {
      label: "Working Groups",
      value: 6,
      suffix: "",
      icon: <Activity className="w-5 h-5 text-accent" />,
      desc: "Expert panels driving focused resilience action",
      color: "accent",
    },
    {
      label: "Policy Advisories",
      value: 32,
      suffix: "+",
      icon: <TrendingUp className="w-5 h-5 text-brand-primary" />,
      desc: "Submitted to central and state governments",
      color: "primary",
    },
  ];

  const getColorClass = (color: string) => {
    switch (color) {
      case "primary": return "text-brand-primary border-brand-primary/20 bg-brand-primary/5";
      case "alert": return "text-alert-red border-alert-red/20 bg-alert-red/5";
      case "secondary": return "text-brand-secondary border-brand-secondary/20 bg-brand-secondary/5";
      case "success": return "text-success-green border-success-green/20 bg-success-green/5";
      case "accent": return "text-accent border-accent/20 bg-accent/5";
      default: return "text-brand-primary border-brand-primary/20 bg-brand-primary/5";
    }
  };

  return (
    <Section
      badge="Real-Time Impact"
      title="Disaster Resilience at Scale"
      subtitle="From early warning systems to post-disaster recovery, tracking our collective impact across India's disaster preparedness ecosystem."
      className="bg-gradient-resilience relative overflow-hidden"
      id="impact"
    >
      {/* Animated scan line effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 animate-data-scan bg-gradient-to-b from-transparent via-brand-primary/30 to-transparent h-2" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <NeuCard
                variant="inset"
                className="flex flex-col items-start gap-4 p-7 h-full border border-white/5 bg-background/80 backdrop-blur-sm relative overflow-hidden group hover:border-brand-primary/20 transition-all duration-300"
              >
                {/* Decorative glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${getColorClass(stat.color).split(' ')[2]}`} />

                <div className={`w-10 h-10 rounded-xl shadow-neu-raised flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${getColorClass(stat.color)}`}>
                  {stat.icon}
                </div>

                <div className="flex flex-col gap-1 mt-2 relative z-10">
                  <span className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight font-display">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-widest mt-1 ${getColorClass(stat.color).split(' ')[0]}`}>
                    {stat.label}
                  </span>
                </div>
                
                <p className="text-xs text-muted/90 leading-relaxed font-semibold mt-auto pt-2 relative z-10">
                  {stat.desc}
                </p>
              </NeuCard>
            </motion.div>
          ))}
        </div>

        {/* Key Highlight Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12"
        >
          <NeuCard
            variant="raised"
            className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-gradient-alert border border-alert-red/20 relative overflow-hidden"
          >
            {/* Animated pulse effect */}
            <div className="absolute top-1/2 left-0 w-2 h-32 bg-alert-red/50 blur-xl animate-pulse" />
            
            <div className="max-w-2xl text-center md:text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-alert-red/10 border border-alert-red/30 text-alert-red text-xs font-bold uppercase tracking-wider mb-3">
                <Shield className="w-3 h-3" />
                National Federation
              </div>
              <h3 className="text-xl font-bold text-foreground font-display mb-2">
                India's Premier Multi-Stakeholder Platform for Disaster Resilience
              </h3>
              <p className="text-sm text-muted/90 font-medium leading-relaxed">
                By uniting government agencies, corporates, NGOs, research institutions, and disaster management experts, DCRF ensures coordinated action and knowledge sharing across the entire disaster preparedness and climate resilience value chain.
              </p>
            </div>
            <div className="flex-shrink-0 relative z-10">
              <div className="px-6 py-3.5 rounded-2xl bg-background shadow-neu-raised text-xs font-extrabold uppercase tracking-widest text-brand-primary border border-brand-primary/20 hover:shadow-neu-inset transition-all duration-300">
                Join the Federation
              </div>
            </div>
          </NeuCard>
        </motion.div>
      </Container>
    </Section>
  );
}
