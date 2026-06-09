"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface NeuCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "raised" | "inset" | "flat";
  hoverEffect?: "press" | "lift" | "none";
  interactive?: boolean;
}

export const NeuCard = React.forwardRef<HTMLDivElement, NeuCardProps>(
  (
    {
      children,
      className,
      variant = "raised",
      hoverEffect = "lift",
      interactive = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-3xl border border-transparent bg-background p-6 transition-all duration-300 ease-out",
          // Base Neumorphic Shadows
          variant === "raised" && "shadow-neu-raised",
          variant === "inset" && "shadow-neu-inset",
          variant === "flat" && "border border-border/40 shadow-sm",
          
          // Interactive Hover States
          interactive && [
            "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
            hoverEffect === "press" && "hover:shadow-neu-inset active:shadow-neu-inset",
            hoverEffect === "lift" && "hover:-translate-y-1 hover:shadow-[10px_10px_20px_var(--neu-shadow-dark),-10px_-10px_20px_var(--neu-shadow-light)]",
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NeuCard.displayName = "NeuCard";
