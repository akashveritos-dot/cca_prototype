"use client";

import React, { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { RotateCcw, AlertOctagon } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center py-16 bg-background">
      <Container className="max-w-xl">
        <NeuCard
          variant="raised"
          className="p-8 sm:p-12 text-center flex flex-col items-center gap-6 border border-white/10 dark:border-white/5"
        >
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center shadow-neu-inset">
            <AlertOctagon className="w-8 h-8 text-red-500" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">
              Application Error
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground font-display">
              Something went wrong!
            </h1>
            <p className="text-xs text-muted/90 max-w-sm mx-auto font-medium leading-relaxed mt-2">
              An unexpected error occurred while rendering this page. Our team has been notified.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mt-4">
            <NeuButton
              variant="primary"
              size="md"
              onClick={() => reset()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 shadow-md"
            >
              <RotateCcw className="w-4 h-4" /> Try Again
            </NeuButton>
            <a href="/" className="w-full sm:w-auto">
              <NeuButton variant="raised" size="md" className="w-full sm:w-auto">
                Return Home
              </NeuButton>
            </a>
          </div>
        </NeuCard>
      </Container>
    </div>
  );
}
