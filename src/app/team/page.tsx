"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { getTeam } from "@/lib/content/api";
import { TeamMember } from "@/lib/content/types";
import { Mail, Search } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/social-icons";
import { motion, AnimatePresence } from "framer-motion";

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeam() {
      const data = await getTeam();
      setTeam(data);
      setLoading(false);
    }
    loadTeam();
  }, []);

  const categories = ["All", "Leadership", "Board", "Advisors", "Team"];

  const filteredTeam = team.filter((member) => {
    const matchesCategory = activeCategory === "All" || member.category === activeCategory;
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          member.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-2 pb-8">
      {/* Header Section */}
      <Section
        badge="Alliance Leadership"
        title="Our Advisory & Executive Committee"
        subtitle="Meet the scientists, industry veterans, and policy specialists driving high-integrity carbon removal and market progress in India."
        className="pb-2"
      />

      <Container className="mb-16">
        {/* Filters and Search Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-2.5 bg-background/50 p-1.5 rounded-3xl shadow-neu-inset-sm border border-border/10 max-w-fit">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-2xl transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-background text-brand-primary shadow-neu-raised"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-muted pointer-events-none">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search team member..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-3 rounded-2xl bg-background border-none text-xs font-semibold shadow-neu-inset focus:outline-none focus:shadow-neu-raised focus:ring-1 focus:ring-brand-primary placeholder:text-muted/50"
            />
          </div>
        </div>

        {/* Team Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-full h-80 rounded-3xl bg-background shadow-neu-raised animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredTeam.map((member) => (
                <motion.div
                  layout
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <NeuCard
                    variant="raised"
                    interactive
                    hoverEffect="lift"
                    className="h-full flex flex-col justify-between p-6 border border-white/10 dark:border-white/5"
                  >
                    <div className="flex flex-col items-center text-center gap-4">
                      {/* Avatar */}
                      <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-neu-inset p-1 bg-background">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-full"
                          loading="lazy"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-bold text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-2 py-0.5 rounded-full">
                          {member.category}
                        </span>
                        <h3 className="text-base font-bold text-foreground font-display mt-1">
                          {member.name}
                        </h3>
                        <span className="text-xs text-muted/90 font-bold leading-tight min-h-[32px] flex items-center justify-center">
                          {member.role}
                        </span>
                      </div>

                      <p className="text-xs text-muted/80 leading-relaxed font-medium mt-2">
                        {member.bio}
                      </p>
                    </div>

                    {/* Footer / Social links */}
                    <div className="flex items-center justify-center gap-3 mt-6 pt-4 border-t border-border/10">
                      <a
                        href={member.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-background shadow-neu-raised hover:shadow-neu-inset text-muted hover:text-brand-primary transition-all duration-300"
                        aria-label={`${member.name}'s LinkedIn profile`}
                      >
                        <LinkedInIcon className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="mailto:info@climatecarbonalliance.in"
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-background shadow-neu-raised hover:shadow-neu-inset text-muted hover:text-brand-primary transition-all duration-300"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </NeuCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filteredTeam.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-muted font-bold">No team members match your criteria.</p>
          </div>
        )}
      </Container>
    </div>
  );
}
