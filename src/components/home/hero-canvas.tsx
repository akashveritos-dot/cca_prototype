"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme-provider";

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Check prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return; // Do not run animation if user prefers reduced motion
    }

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      color: string;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = -Math.random() * 0.6 - 0.2; // Move upwards
        this.alpha = Math.random() * 0.5 + 0.1;
        
        // Use brand colors
        this.color = theme === "dark" 
          ? `rgba(24, 168, 122, ${this.alpha})` // Emerald
          : `rgba(15, 123, 92, ${this.alpha})`;  // Forest Green
      }

      update(w: number, h: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reset if goes off screen
        if (this.y < 0) {
          this.y = h;
          this.x = Math.random() * w;
        }
        if (this.x < 0 || this.x > w) {
          this.x = Math.random() * w;
        }
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
      }
    }

    const initParticles = () => {
      const rect = canvas.getBoundingClientRect();
      const density = Math.min(Math.floor((rect.width * rect.height) / 15000), 100);
      particles = [];
      for (let i = 0; i < density; i++) {
        particles.push(new Particle(rect.width, rect.height));
      }
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      particles.forEach((particle) => {
        particle.update(rect.width, rect.height);
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60 dark:opacity-40 pointer-events-none"
    />
  );
}
