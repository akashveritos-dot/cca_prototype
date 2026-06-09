"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionProps extends React.ComponentPropsWithoutRef<"section"> {
  badge?: string;
  title?: string;
  subtitle?: string;
  centered?: boolean;
  animate?: boolean;
  delay?: number;
  variant?: "default" | "header";
}

export function Section({
  children,
  className,
  badge,
  title,
  subtitle,
  centered = false,
  animate = true,
  delay = 0,
  variant = "default",
  ...props
}: SectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const enableAnimation = animate && !shouldReduceMotion;

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: enableAnimation ? 20 : 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: enableAnimation ? 15 : 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const defaultPadding = variant === "header"
    ? "pt-4 pb-4 sm:pt-6 sm:pb-6"
    : "py-8 sm:py-12";

  const content = (
    <>
      {(badge || title || subtitle) && (
        <Container>
          <div
            className={cn(
              "flex flex-col gap-2 max-w-3xl w-full",
              children ? "mb-6" : "",
              centered ? "mx-auto text-center items-center" : "text-left"
            )}
          >
            {badge && (
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand-primary bg-brand-primary/10 border border-brand-primary/15 shadow-neu-inset-sm">
                {badge}
              </span>
            )}
            {title && (
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display text-foreground leading-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm sm:text-base text-muted/90 font-medium leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </Container>
      )}
      {children}
    </>
  );

  if (enableAnimation) {
    return (
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className={cn(defaultPadding, className)}
        {...(props as any)}
      >
        {content}
      </motion.section>
    );
  }

  return (
    <section className={cn(defaultPadding, className)} {...props}>
      {content}
    </section>
  );
}
