"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center py-16 bg-background">
      <Container className="max-w-xl">
        <NeuCard
          variant="raised"
          className="p-8 sm:p-12 text-center flex flex-col items-center gap-6 border border-white/10 dark:border-white/5"
        >
          <div className="w-16 h-16 rounded-full bg-brand-accent/10 flex items-center justify-center shadow-neu-inset animate-pulse">
            <AlertTriangle className="w-8 h-8 text-brand-accent" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">
              Error 404
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground font-display">
              Page Not Found
            </h1>
            <p className="text-xs text-muted/90 max-w-sm mx-auto font-medium leading-relaxed mt-2">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mt-4">
            <Link href="/" className="w-full sm:w-auto">
              <NeuButton variant="primary" size="md" className="w-full sm:w-auto flex items-center justify-center gap-2 shadow-md">
                <Home className="w-4 h-4" /> Go to Home
              </NeuButton>
            </Link>
            <NeuButton 
              variant="raised" 
              size="md" 
              className="w-full sm:w-auto flex items-center justify-center gap-2"
              onClick={() => typeof window !== "undefined" && window.history.back()}
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </NeuButton>
          </div>
        </NeuCard>
      </Container>
    </div>
  );
}
