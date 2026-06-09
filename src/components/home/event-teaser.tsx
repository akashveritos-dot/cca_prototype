"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "../ui/container";
import { NeuCard } from "../ui/neu-card";
import { NeuButton } from "../ui/neu-button";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

export function EventTeaser() {
  // Target date: October 14, 2026
  const targetDate = new Date("2026-10-14T09:00:00+05:30").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    return (
      <section className="py-16 bg-background">
        <Container>
          <div className="w-full h-80 rounded-3xl bg-background shadow-neu-raised animate-pulse" />
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24 bg-background" id="events-teaser">
      <Container>
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand-secondary bg-brand-secondary/10 border border-brand-secondary/15 shadow-neu-inset-sm">
            Flagship Forum
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-foreground mt-3">
            India Climate Week 2026
          </h2>
          <p className="text-sm sm:text-base text-muted/90 max-w-2xl mx-auto font-medium mt-2">
            The national summit convening climate investors, project developers, and governmental agencies to outline the future of India's carbon markets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Details Card */}
          <div className="lg:col-span-7">
            <NeuCard variant="raised" className="p-8 border border-white/10 dark:border-white/5 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-brand-primary uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Oct 14 - 18, 2026
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    09:00 AM - 06:00 PM
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    New Delhi
                  </span>
                </div>
                
                <h3 className="text-xl font-extrabold text-foreground font-display leading-snug">
                  CCTS Compliance, Article 6, and High-Permanence Removals
                </h3>
                
                <p className="text-sm text-muted/90 font-medium leading-relaxed">
                  Join 1,000+ delegates across 5 days of panels, keynotes, and roundtables. Focus areas include CCTS target allocations, baseline verifications, soil sequestration methodologies, and green credit integrations.
                </p>
              </div>

              {/* Mini Agenda Info */}
              <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-background/50 border border-border/10 shadow-neu-inset-sm">
                <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Summit Highlights</span>
                <ul className="text-xs text-foreground font-semibold flex flex-col gap-1.5">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                    Day 1: CCTS Compliance Path and Target Allocation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
                    Day 3: Deep Tech Removals (Biochar, ERW, DAC)
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-2">
                <Link href="/events/india-climate-week-2026">
                  <NeuButton variant="primary" size="md" className="flex items-center gap-2 shadow-md">
                    Register Now
                    <ArrowRight className="w-4 h-4" />
                  </NeuButton>
                </Link>
                <Link href="/events">
                  <NeuButton variant="raised" size="md" className="hover:-translate-y-0.5">
                    View All Events
                  </NeuButton>
                </Link>
              </div>
            </NeuCard>
          </div>

          {/* Countdown Clock */}
          <div className="lg:col-span-5 h-full">
            <NeuCard
              variant="inset"
              className="p-8 h-full flex flex-col items-center justify-center border border-black/[0.03] dark:border-white/[0.02] bg-background/50 min-h-[300px]"
            >
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest mb-6">
                Event Starts In
              </span>

              {timeLeft.isExpired ? (
                <div className="text-xl font-bold text-brand-primary">The Summit is Live!</div>
              ) : (
                <div className="grid grid-cols-4 gap-4 sm:gap-6">
                  {/* Days */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-background shadow-neu-raised flex items-center justify-center font-display font-extrabold text-lg sm:text-xl text-foreground">
                      {timeLeft.days}
                    </div>
                    <span className="text-[9px] font-bold text-muted uppercase tracking-wider">Days</span>
                  </div>
                  {/* Hours */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-background shadow-neu-raised flex items-center justify-center font-display font-extrabold text-lg sm:text-xl text-foreground">
                      {timeLeft.hours}
                    </div>
                    <span className="text-[9px] font-bold text-muted uppercase tracking-wider">Hours</span>
                  </div>
                  {/* Minutes */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-background shadow-neu-raised flex items-center justify-center font-display font-extrabold text-lg sm:text-xl text-foreground">
                      {timeLeft.minutes}
                    </div>
                    <span className="text-[9px] font-bold text-muted uppercase tracking-wider">Mins</span>
                  </div>
                  {/* Seconds */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-background shadow-neu-raised flex items-center justify-center font-display font-extrabold text-lg sm:text-xl text-brand-primary">
                      {timeLeft.seconds}
                    </div>
                    <span className="text-[9px] font-bold text-muted uppercase tracking-wider">Secs</span>
                  </div>
                </div>
              )}

              <div className="mt-8 text-center bg-background/50 border border-border/10 rounded-full px-5 py-2 shadow-neu-inset-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-[10px] font-bold text-foreground uppercase tracking-widest">
                  Registrations Open
                </span>
              </div>
            </NeuCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
