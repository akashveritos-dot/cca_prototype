"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { NeuButton } from "./neu-button";

interface NeuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  showClose?: boolean;
}

export function NeuDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  showClose = true,
}: NeuDialogProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "dialog-title" : undefined}
        aria-describedby={description ? "dialog-description" : undefined}
        className="relative bg-background rounded-3xl shadow-neu-raised p-6 sm:p-8 w-full max-w-md animate-in zoom-in-95 fade-in duration-200 border border-border/20"
      >
        {/* Close button */}
        {showClose && (
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-background shadow-neu-flat hover:shadow-neu-inset text-muted hover:text-foreground transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-primary focus:outline-none"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Content */}
        <div className="flex flex-col gap-4">
          {title && (
            <h2
              id="dialog-title"
              className="text-xl sm:text-2xl font-display font-bold text-foreground pr-8"
            >
              {title}
            </h2>
          )}
          
          {description && (
            <p
              id="dialog-description"
              className="text-sm sm:text-base text-muted/90 leading-relaxed"
            >
              {description}
            </p>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}

interface NeuDialogActionsProps {
  children: React.ReactNode;
  className?: string;
}

export function NeuDialogActions({ children, className = "" }: NeuDialogActionsProps) {
  return (
    <div className={`flex gap-3 mt-6 ${className}`}>
      {children}
    </div>
  );
}
