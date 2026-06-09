"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { getJobs } from "@/lib/content/api";
import { Job } from "@/lib/content/types";
import { Briefcase, MapPin, Calendar, Clock, ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedOrg, setSelectedOrg] = useState("All");
  const [selectedLoc, setSelectedLoc] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      const data = await getJobs();
      setJobs(data);
      setLoading(false);
    }
    fetchJobs();
  }, []);

  const orgs = ["All", "CMAI", "CRIA"];
  const locations = ["All", "New Delhi", "Bhopal", "Remote"];

  const filteredJobs = jobs.filter((job) => {
    const matchesOrg = selectedOrg === "All" || job.org === selectedOrg;
    const matchesLoc =
      selectedLoc === "All" ||
      job.location.toLowerCase().includes(selectedLoc.toLowerCase()) ||
      (selectedLoc === "Remote" && job.location.toLowerCase().includes("remote"));
    return matchesOrg && matchesLoc;
  });

  return (
    <div className="pt-2 pb-8">
      {/* Header */}
      <Section
        badge="Careers"
        title="Join Our Climate Mission"
        subtitle="Work with leading scientists, policy makers, and climate advocates to shape the future of carbon removal and market structures in India."
        variant="header"
        className="py-4"
      />

      <Container className="mb-20">
        {/* Filters */}
        <div className="flex flex-wrap gap-6 items-center justify-between mb-12 p-6 rounded-3xl bg-background/50 border border-border/10 shadow-neu-inset-sm">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Org Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Organization:</span>
              <div className="flex bg-background p-1 rounded-2xl shadow-neu-inset-sm border border-border/10">
                {orgs.map((org) => (
                  <button
                    key={org}
                    onClick={() => setSelectedOrg(org)}
                    className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all ${
                      selectedOrg === org
                        ? "bg-background text-brand-primary shadow-neu-raised"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {org}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Location:</span>
              <div className="flex bg-background p-1 rounded-2xl shadow-neu-inset-sm border border-border/10">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLoc(loc)}
                    className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all ${
                      selectedLoc === loc
                        ? "bg-background text-brand-primary shadow-neu-raised"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <span className="text-xs font-bold text-brand-primary">
            {filteredJobs.length} Positions Available
          </span>
        </div>

        {/* Job Listings */}
        {loading ? (
          <div className="flex flex-col gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="w-full h-36 rounded-3xl bg-background shadow-neu-raised animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredJobs.map((job) => (
              <NeuCard
                key={job.id}
                variant="raised"
                className="p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-white/10 dark:border-white/5"
              >
                <div className="flex flex-col gap-3 min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[9px] font-bold text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-2.5 py-0.5 rounded-full">
                      {job.org}
                    </span>
                    <span className="text-[9px] font-bold text-muted uppercase tracking-widest bg-background shadow-neu-inset-sm px-2.5 py-0.5 rounded-full">
                      {job.type}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground font-display">
                    {job.title}
                  </h3>

                  <p className="text-xs text-muted/90 font-medium leading-relaxed max-w-2xl">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-muted uppercase tracking-wider mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-secondary" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                      Posted {formatDate(job.date)}
                    </span>
                  </div>
                </div>

                <div className="w-full md:w-auto flex-shrink-0">
                  <a href={job.applyUrl} className="block w-full md:w-auto">
                    <NeuButton variant="primary" size="md" className="w-full md:w-auto flex items-center justify-center gap-1.5 shadow-md">
                      Apply Now <ArrowUpRight className="w-4 h-4" />
                    </NeuButton>
                  </a>
                </div>
              </NeuCard>
            ))}
          </div>
        )}

        {!loading && filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-muted font-bold">No jobs match the selected filter criteria.</p>
          </div>
        )}
      </Container>
    </div>
  );
}
