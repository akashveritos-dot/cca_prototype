"use client";

import React from "react";
import { Section } from "../ui/section";
import { Container } from "../ui/container";
import { NeuCard } from "../ui/neu-card";
import { AlertTriangle, Waves, Satellite, Users, TrendingUp, RefreshCw, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const workingGroups = [
  {
    id: 1,
    name: "Risk Assessment & Early Warning",
    icon: AlertTriangle,
    color: "#FF3B30",
    description: "Comprehensive risk frameworks and early warning systems",
  },
  {
    id: 2,
    name: "Climate Adaptation & Resilience",
    icon: Waves,
    color: "#1FB6C1",
    description: "Building climate-resilient communities and infrastructure",
  },
  {
    id: 3,
    name: "Disaster Technology & Innovation",
    icon: Satellite,
    color: "#3B82F6",
    description: "Leveraging AI, geospatial tools for disaster management",
  },
  {
    id: 4,
    name: "Capacity Building & Training",
    icon: Users,
    color: "#FF9500",
    description: "Strengthening institutional and community capacity",
  },
  {
    id: 5,
    name: "Climate Finance & Investment",
    icon: TrendingUp,
    color: "#10B981",
    description: "Mobilizing resources for climate resilience",
  },
  {
    id: 6,
    name: "Post-Disaster Recovery",
    icon: RefreshCw,
    color: "#8B5CF6",
    description: "Effective recovery, rehabilitation and reconstruction",
  },
];

export function WorkingGroupsPreview() {
  return (
    <Section
      badge="Collaborative Action"
      title="Six Working Groups"
      subtitle="Cross-sector expert groups driving focused action across critical areas of disaster resilience and climate adaptation"
      centered
      className="bg-gradient-storm relative overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                           linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          color: 'var(--primary)'
        }} />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workingGroups.map((group, index) => {
            const IconComponent = group.icon;
            
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <NeuCard
                  variant="raised"
                  interactive
                  hoverEffect="lift"
                  className="h-full p-6 border border-white/5 hover:border-brand-primary/30 transition-all duration-300 group bg-background/60 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-xl shadow-neu-inset flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:shadow-neu-raised"
                      style={{ 
                        backgroundColor: `${group.color}15`,
                        borderColor: `${group.color}30`,
                      }}
                    >
                      <IconComponent 
                        className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" 
                        style={{ color: group.color }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-foreground font-display leading-tight mb-2 group-hover:text-brand-primary transition-colors duration-300">
                        {group.name}
                      </h4>
                      <p className="text-xs text-muted/80 leading-relaxed">
                        {group.description}
                      </p>
                    </div>
                  </div>
                </NeuCard>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link 
            href="/federation#working-groups"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-background shadow-neu-raised hover:shadow-neu-inset text-brand-primary font-bold text-sm transition-all duration-300 group"
          >
            Explore All Working Groups
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
