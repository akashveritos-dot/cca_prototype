"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { getEvents } from "@/lib/content/api";
import { Event } from "@/lib/content/types";
import { Calendar, MapPin, Clock, ArrowRight, Sparkles } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const data = await getEvents();
      setEvents(data);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const getFilteredEvents = () => {
    const now = new Date().getTime();
    return events.filter((e) => {
      const eventTime = new Date(e.date).getTime();
      if (activeTab === "upcoming") {
        return eventTime >= now || e.isFlagship; // Keeping flagship event visible for registration demo
      } else {
        return eventTime < now && !e.isFlagship;
      }
    });
  };

  const filteredEvents = getFilteredEvents();

  return (
    <div className="pt-2 pb-8">
      {/* Header Banner */}
      <Section
        badge="Summits & Symposia"
        title="Forums & Convenings"
        subtitle="Uniting industry practitioners, researchers, and government departments to collaborate on climate guidelines and initiatives."
        variant="header"
        className="py-4"
      />

      <Container className="mb-20">
        {/* Toggle tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-background/50 p-1.5 rounded-3xl shadow-neu-inset-sm border border-border/10">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-2xl transition-all duration-300 ${
                activeTab === "upcoming"
                  ? "bg-background text-brand-primary shadow-neu-raised"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Upcoming Forums
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-2xl transition-all duration-300 ${
                activeTab === "past"
                  ? "bg-background text-brand-primary shadow-neu-raised"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Past Proceedings
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="w-full h-64 rounded-3xl bg-background shadow-neu-raised animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredEvents.map((event) => (
              <NeuCard
                key={event.id}
                variant="raised"
                className="p-6 sm:p-8 flex flex-col justify-between border border-white/10 dark:border-white/5"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start gap-4">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-brand-primary uppercase tracking-wider bg-brand-primary/10 px-3 py-1 rounded-full">
                      {event.isFlagship ? "Flagship Event" : "Roundtable & Seminar"}
                    </span>
                    {event.isFlagship && (
                      <span className="flex items-center gap-1 text-[9px] font-bold text-brand-accent uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" /> High Interest
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-foreground font-display leading-snug">
                    {event.title}
                  </h3>

                  <p className="text-xs text-muted/90 leading-relaxed font-medium line-clamp-3">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-2 py-4 border-y border-border/10 text-[10px] font-bold text-muted uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-brand-primary" />
                      {formatDate(event.date).split(",")[0]}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-brand-secondary" />
                      {event.time.split(" ")[0] + " " + event.time.split(" ")[1]}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-brand-accent" />
                      {event.venue.split(",")[0]}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-6">
                  <Link href={`/events/${event.slug}`} className="flex-1">
                    <NeuButton variant="primary" size="md" className="w-full text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md">
                      View details
                      <ArrowRight className="w-4 h-4" />
                    </NeuButton>
                  </Link>
                  <a href={event.registrationUrl} className="flex-1">
                    <NeuButton variant="raised" size="md" className="w-full text-xs uppercase tracking-wider hover:text-brand-secondary">
                      Register Free
                    </NeuButton>
                  </a>
                </div>
              </NeuCard>
            ))}
          </div>
        )}

        {!loading && filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-muted font-bold">No events scheduled at the moment.</p>
          </div>
        )}
      </Container>
    </div>
  );
}
