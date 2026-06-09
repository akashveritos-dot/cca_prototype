import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { getEventBySlug, getEvents } from "@/lib/content/api";
import { Calendar, MapPin, Clock, ArrowLeft, Users, ClipboardList, Info } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";

interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};

  return {
    title: event.title,
    description: event.description,
    alternates: {
      canonical: `/events/${slug}`,
    },
    openGraph: {
      title: event.title,
      description: event.description,
      type: "website",
      url: `https://climatecarbonalliance.in/events/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e) => ({
    slug: e.slug,
  }));
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  // Script tag JSON-LD content
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "description": event.description,
    "startDate": event.date,
    "endDate": event.endDate || event.date,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": event.venue,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": event.venue.split(",").pop()?.trim() || "India",
        "addressCountry": "IN"
      }
    },
    "image": [
      event.photos?.[0] || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-12">
        <Container>
          {/* Back link */}
          <Link href="/events" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary mb-8 hover:translate-x-[-4px] transition-transform">
            <ArrowLeft className="w-4 h-4" /> Back to Forums
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Details, Speakers & Agenda */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              <NeuCard variant="raised" className="p-6 sm:p-10 border border-white/10 dark:border-white/5">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-muted uppercase tracking-wider mb-4">
                  <span className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary">
                    {event.isFlagship ? "Flagship Summit" : "Roundtable Dialogue"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(event.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {event.venue}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground font-display leading-tight mb-6">
                  {event.title}
                </h1>

                <p className="text-sm text-muted/95 leading-relaxed font-medium whitespace-pre-line mb-8">
                  {event.description}
                </p>

                {/* Agenda */}
                <div className="mt-8">
                  <h3 className="text-base font-bold text-foreground font-display flex items-center gap-2 mb-5">
                    <ClipboardList className="w-5 h-5 text-brand-primary" /> Event Agenda
                  </h3>
                  <div className="flex flex-col gap-4 pl-4 border-l-2 border-brand-primary/20">
                    {event.agenda.map((item, idx) => (
                      <div key={idx} className="relative py-1">
                        <div className="absolute -left-[21px] top-2 w-2 h-2 rounded-full bg-brand-primary" />
                        <p className="text-xs text-foreground font-bold">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </NeuCard>

              {/* Speakers list */}
              <NeuCard variant="raised" className="p-6 sm:p-10 border border-white/10 dark:border-white/5">
                <h3 className="text-base font-bold text-foreground font-display flex items-center gap-2 mb-6">
                  <Users className="w-5 h-5 text-brand-secondary" /> Featured Speakers
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {event.speakers.map((speaker, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-background/50 border border-border/10 shadow-neu-inset-sm flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center font-bold text-brand-primary text-xs">
                        {speaker.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-foreground line-clamp-1">{speaker}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-muted/80 font-bold uppercase tracking-wider mt-6 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-brand-accent" /> *Final confirmations pending official government schedules.
                </p>
              </NeuCard>
            </div>

            {/* Right Column: Register CTA */}
            <aside className="lg:col-span-4">
              <NeuCard variant="raised" className="p-6 border border-white/10 dark:border-white/5 flex flex-col gap-6 sticky top-28">
                <h3 className="text-sm font-bold text-foreground font-display">
                  Secure Your Seat
                </h3>
                <p className="text-xs text-muted/90 leading-relaxed font-medium">
                  Participation is free for alliance members, research associates, and government delegates. Standard passes are subject to secretariat confirmation.
                </p>

                <div className="flex flex-col gap-3 py-4 border-y border-border/10">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-muted">Standard Pass</span>
                    <span className="text-foreground font-bold">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-muted">Virtual Webcast</span>
                    <span className="text-foreground font-bold">Open Access</span>
                  </div>
                </div>

                <a href={event.registrationUrl}>
                  <NeuButton variant="primary" size="md" className="w-full text-xs uppercase tracking-wider shadow-md py-3.5">
                    Register for Event
                  </NeuButton>
                </a>

                <div className="text-center">
                  <span className="text-[9px] font-bold text-muted uppercase tracking-wider">
                    Questions? Contact info@climatecarbonalliance.in
                  </span>
                </div>
              </NeuCard>
            </aside>
          </div>
        </Container>
      </div>
    </>
  );
}
