"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface NeuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "raised" | "inset" | "primary" | "secondary" | "flat";
  size?: "sm" | "md" | "lg";
}

export const NeuButton = React.forwardRef<HTMLButtonElement, NeuButtonProps>(
  ({ children, className, variant = "raised", size = "md", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center font-semibold text-center select-none transition-all duration-200 active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2",
          // Roundness
          "rounded-full",
          // Sizes
          size === "sm" && "px-4 py-2 text-xs",
          size === "md" && "px-6 py-3 text-sm",
          size === "lg" && "px-8 py-4 text-base",
          
          // Variants
          variant === "raised" && "bg-background text-foreground shadow-neu-raised hover:shadow-neu-inset",
          variant === "inset" && "bg-background text-foreground shadow-neu-inset hover:shadow-neu-raised",
          variant === "primary" && "bg-gradient-to-r from-brand-primary to-brand-primary-hover text-white shadow-lg hover:shadow-xl hover:brightness-105 active:brightness-95",
          variant === "secondary" && "bg-brand-secondary text-white shadow-lg hover:brightness-105 active:brightness-95",
          variant === "flat" && "border border-border/60 hover:bg-black/5 dark:hover:bg-white/5",
          
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

NeuButton.displayName = "NeuButton";
