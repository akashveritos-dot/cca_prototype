"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "../ui/container";
import { NeuCard } from "../ui/neu-card";
import { NeuButton } from "../ui/neu-button";
import { Calendar, MapPin, Clock, ArrowRight, Award, Users, Radio } from "lucide-react";

export function EventTeaser() {
  // Target date: November 15, 2026 - Annual Disaster Management Conference
  const targetDate = new Date("2026-11-15T09:00:00+05:30").getTime();

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
    <section className="py-16 sm:py-24 bg-gradient-alert relative overflow-hidden" id="events-teaser">
      {/* Animated alert pulses */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-alert-red blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-accent blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <Container className="relative z-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/30 shadow-neu-inset-sm">
            <Award className="w-3.5 h-3.5" />
            Pillar II - Flagship Event
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-foreground mt-3">
            Annual Disaster Management Conference 2026
          </h2>
          <p className="text-sm sm:text-base text-muted/90 max-w-2xl mx-auto font-medium mt-2">
            India's premier forum on disaster preparedness, climate resilience, and emergency response — uniting experts, innovators, and decision-makers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Details Card */}
          <div className="lg:col-span-7">
            <NeuCard variant="raised" className="p-8 border border-accent/20 bg-background/90 backdrop-blur-sm flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-accent uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Nov 15 - 16, 2026
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    09:00 AM - 06:00 PM
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    Mumbai
                  </span>
                </div>
                
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold w-fit">
                  <Radio className="w-3 h-3" />
                  Hybrid: In-Person + Virtual
                </div>
                
                <h3 className="text-xl font-extrabold text-foreground font-display leading-snug">
                  Conference • Exhibition • Awards • Networking
                </h3>
                
                <p className="text-sm text-muted/90 font-medium leading-relaxed">
                  Join 1,500+ delegates across plenaries, panel discussions, masterclasses, and networking zones. Featuring disaster-tech exhibition, geospatial innovations, and the DCRF Recognition Awards ceremony.
                </p>
              </div>

              {/* Event Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-background/50 border border-border/10 shadow-neu-inset-sm">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Conference Tracks</span>
                  <ul className="text-xs text-foreground font-semibold flex flex-col gap-1.5">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                      Early Warning Systems
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary" />
                      Climate Resilient Infrastructure
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Post-Disaster Recovery
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-2.5 p-4 rounded-2xl bg-background/50 border border-border/10 shadow-neu-inset-sm">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Award Categories</span>
                  <ul className="text-xs text-foreground font-semibold flex flex-col gap-1.5">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-alert-red" />
                      Best Corporate Response
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-success-green" />
                      Best NGO Initiative
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      Disaster-Tech Innovator
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-2">
                <Link href="/event">
                  <NeuButton variant="primary" size="md" className="flex items-center gap-2 shadow-md bg-accent hover:bg-accent/90">
                    Register Now
                    <ArrowRight className="w-4 h-4" />
                  </NeuButton>
                </Link>
                <Link href="/event#awards">
                  <NeuButton variant="raised" size="md" className="flex items-center gap-2 hover:-translate-y-0.5">
                    <Award className="w-4 h-4" />
                    Nominate for Awards
                  </NeuButton>
                </Link>
              </div>
            </NeuCard>
          </div>

          {/* Countdown Clock */}
          <div className="lg:col-span-5 h-full">
            <NeuCard
              variant="inset"
              className="p-8 h-full flex flex-col items-center justify-center border border-accent/20 bg-background/90 backdrop-blur-sm min-h-[300px]"
            >
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest mb-6">
                Event Starts In
              </span>

              {timeLeft.isExpired ? (
                <div className="text-xl font-bold text-accent">The Conference is Live!</div>
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
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-background shadow-neu-raised flex items-center justify-center font-display font-extrabold text-lg sm:text-xl text-accent">
                      {timeLeft.seconds}
                    </div>
                    <span className="text-[9px] font-bold text-muted uppercase tracking-wider">Secs</span>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 w-full">
                <div className="text-center bg-background/50 border border-border/10 rounded-full px-5 py-2 shadow-neu-inset-sm flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success-green animate-pulse" />
                  <span className="text-[10px] font-bold text-foreground uppercase tracking-widest">
                    Registrations Open
                  </span>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-xs text-muted">
                  <Users className="w-3.5 h-3.5" />
                  <span className="font-bold">1,500+ Expected Delegates</span>
                </div>
              </div>
            </NeuCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
