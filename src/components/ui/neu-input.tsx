"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface NeuInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const NeuInput = React.forwardRef<HTMLInputElement, NeuInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label className="text-xs font-bold tracking-wide uppercase text-muted/80 pl-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-5 py-3 rounded-2xl bg-background border-none text-sm shadow-neu-inset transition-all focus:outline-none focus:shadow-neu-raised focus:ring-1 focus:ring-brand-primary placeholder:text-muted/50",
            error && "ring-1 ring-red-500",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-500 pl-2">{error}</span>}
      </div>
    );
  }
);

NeuInput.displayName = "NeuInput";

interface NeuTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const NeuTextarea = React.forwardRef<HTMLTextAreaElement, NeuTextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label className="text-xs font-bold tracking-wide uppercase text-muted/80 pl-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full px-5 py-3 rounded-2xl bg-background border-none text-sm shadow-neu-inset transition-all focus:outline-none focus:shadow-neu-raised focus:ring-1 focus:ring-brand-primary placeholder:text-muted/50 resize-y min-h-[100px]",
            error && "ring-1 ring-red-500",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-500 pl-2">{error}</span>}
      </div>
    );
  }
);

NeuTextarea.displayName = "NeuTextarea";
