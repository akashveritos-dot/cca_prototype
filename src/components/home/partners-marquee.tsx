import React from "react";
import { Container } from "../ui/container";
import { NeuCard } from "../ui/neu-card";
import { getPartners } from "@/lib/content/api";
import { Shield } from "lucide-react";

export async function PartnersMarquee() {
  const partners = await getPartners();

  // Duplicate the array to create a seamless infinite scroll effect
  const marqueeItems = [...partners, ...partners, ...partners];

  return (
    <section className="py-12 bg-background/80 border-y border-brand-primary/10 overflow-hidden relative">
      {/* Decorative scan line */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-primary/5 to-transparent pointer-events-none" />
      
      <Container className="mb-8 text-center relative z-10">
        <span className="inline-flex items-center gap-2 text-[10px] font-bold text-brand-primary uppercase tracking-widest">
          <Shield className="w-3 h-3" />
          Federation Network
        </span>
        <h2 className="text-sm font-extrabold text-muted uppercase tracking-widest mt-1">
          Our Partners & Members
        </h2>
        <p className="text-xs text-muted/80 mt-2 max-w-xl mx-auto">
          Corporates, NGOs, Government Agencies, Research Institutions & Disaster Management Experts
        </p>
      </Container>
      
      <div className="marquee-container relative w-full">
        {/* Soft shadow masks on sides to fade out the marquee edge */}
        <div className="absolute top-0 left-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="marquee-content py-4">
          {marqueeItems.map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              className="flex-shrink-0 flex items-center"
            >
              <NeuCard
                variant="raised"
                hoverEffect="press"
                interactive
                className="px-6 py-3.5 flex items-center gap-3 border border-brand-primary/10 hover:border-brand-primary/30 bg-background shadow-neu-raised rounded-2xl whitespace-nowrap min-w-[200px] transition-all duration-300"
              >
                <div className="w-7 h-7 rounded-lg bg-brand-primary/10 flex items-center justify-center font-extrabold text-brand-primary text-xs tracking-tighter border border-brand-primary/20">
                  {partner.logo}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground">
                    {partner.name}
                  </span>
                  <span className="text-[8px] font-bold uppercase tracking-wider text-muted/80">
                    {partner.category}
                  </span>
                </div>
              </NeuCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
