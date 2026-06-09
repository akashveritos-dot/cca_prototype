import React from "react";
import { Container } from "../ui/container";
import { NeuCard } from "../ui/neu-card";
import { getPartners } from "@/lib/content/api";

export async function PartnersMarquee() {
  const partners = await getPartners();

  // Duplicate the array to create a seamless infinite scroll effect
  const marqueeItems = [...partners, ...partners, ...partners];

  return (
    <section className="py-12 bg-background border-y border-border/15 overflow-hidden">
      <Container className="mb-8 text-center">
        <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">
          Trusted Ecosystem
        </span>
        <h2 className="text-sm font-extrabold text-muted uppercase tracking-widest mt-1">
          Collaborative Institutional Networks
        </h2>
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
                className="px-6 py-3.5 flex items-center gap-3 border border-white/5 bg-background shadow-neu-raised rounded-2xl whitespace-nowrap min-w-[200px]"
              >
                <div className="w-7 h-7 rounded-lg bg-brand-primary/10 flex items-center justify-center font-extrabold text-brand-primary text-xs tracking-tighter">
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
