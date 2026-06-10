import React from "react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { NeuCard } from "@/components/ui/neu-card";
import { BarChart3, MapPin, TrendingUp, Activity, AlertTriangle, Thermometer } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data & Insights",
  description: "Interactive visualizations and data-driven insights on India's disaster risk landscape, climate indicators, and resilience metrics.",
};

export default function InsightsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Section className="bg-gradient-storm pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-disaster-overlay pointer-events-none" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                             linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            color: 'var(--primary)'
          }} />
        </div>
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-secondary/10 border border-brand-secondary/30 text-brand-secondary font-bold text-sm mb-6">
              <BarChart3 className="w-4 h-4" />
              Data & Analytics
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-foreground leading-tight mb-6">
              Disaster Risk <span className="text-gradient-primary">Insights</span>
            </h1>
            
            <p className="text-lg text-muted/90 leading-relaxed max-w-3xl mx-auto mb-8">
              Interactive visualizations and data-driven insights on India's disaster risk landscape, climate indicators, and resilience metrics — powered by real-time monitoring and analysis.
            </p>
          </div>
        </Container>
      </Section>

      {/* Coming Soon - Placeholder for Data Visualizations */}
      <Section badge="Interactive Dashboards" title="Data Visualizations" className="bg-background">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <NeuCard variant="inset" className="p-8 border border-brand-primary/10 bg-background/80 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-xl bg-brand-primary/10 shadow-neu-raised flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7 text-brand-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-display mb-3">India Disaster Risk Map</h3>
              <p className="text-sm text-muted/90 leading-relaxed mb-4">
                Interactive choropleth map showing composite risk scores across Indian states and union territories.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold">
                Coming Soon
              </div>
            </NeuCard>

            <NeuCard variant="inset" className="p-8 border border-alert-red/10 bg-background/80 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-xl bg-alert-red/10 shadow-neu-raised flex items-center justify-center mb-4">
                <AlertTriangle className="w-7 h-7 text-alert-red" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-display mb-3">Disaster Frequency Trends</h3>
              <p className="text-sm text-muted/90 leading-relaxed mb-4">
                Time-series analysis of floods, cyclones, earthquakes, and other disasters over the past decade.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold">
                Coming Soon
              </div>
            </NeuCard>

            <NeuCard variant="inset" className="p-8 border border-brand-secondary/10 bg-background/80 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-xl bg-brand-secondary/10 shadow-neu-raised flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-brand-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-display mb-3">Economic Impact Analysis</h3>
              <p className="text-sm text-muted/90 leading-relaxed mb-4">
                Visualization of economic losses and recovery metrics by disaster type and geographic region.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold">
                Coming Soon
              </div>
            </NeuCard>

            <NeuCard variant="inset" className="p-8 border border-success-green/10 bg-background/80 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-xl bg-success-green/10 shadow-neu-raised flex items-center justify-center mb-4">
                <Thermometer className="w-7 h-7 text-success-green" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-display mb-3">Climate Indicators</h3>
              <p className="text-sm text-muted/90 leading-relaxed mb-4">
                Temperature anomalies, rainfall patterns, and extreme weather event tracking across India.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold">
                Coming Soon
              </div>
            </NeuCard>

            <NeuCard variant="inset" className="p-8 border border-accent/10 bg-background/80 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-xl bg-accent/10 shadow-neu-raised flex items-center justify-center mb-4">
                <Activity className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-display mb-3">Working Group Metrics</h3>
              <p className="text-sm text-muted/90 leading-relaxed mb-4">
                Radar chart showing focus areas and activity levels across the six DCRF working groups.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold">
                Coming Soon
              </div>
            </NeuCard>

            <NeuCard variant="inset" className="p-8 border border-brand-primary/10 bg-background/80 backdrop-blur-sm">
              <div className="w-14 h-14 rounded-xl bg-brand-primary/10 shadow-neu-raised flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-brand-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground font-display mb-3">Federation Growth</h3>
              <p className="text-sm text-muted/90 leading-relaxed mb-4">
                Membership growth trends and distribution across different member categories and regions.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold">
                Coming Soon
              </div>
            </NeuCard>
          </div>

          {/* Note */}
          <div className="mt-12">
            <NeuCard variant="raised" className="p-8 text-center border border-brand-primary/20 bg-gradient-resilience">
              <h3 className="text-xl font-bold text-foreground font-display mb-3">
                Interactive Dashboards Under Development
              </h3>
              <p className="text-sm text-muted/90 max-w-2xl mx-auto">
                We're building comprehensive data visualization tools powered by real-time disaster monitoring, climate data, and federation metrics. These dashboards will be available soon to all DCRF members.
              </p>
            </NeuCard>
          </div>
        </Container>
      </Section>
    </div>
  );
}
