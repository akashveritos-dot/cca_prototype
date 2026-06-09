"use client";

import React, { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { NeuInput, NeuTextarea } from "@/components/ui/neu-input";
import { getPublications } from "@/lib/content/api";
import { Publication } from "@/lib/content/types";
import { Search, FileText, Download, Upload, CheckCircle2, ChevronDown } from "lucide-react";
import Fuse from "fuse.js";

export default function ResourcesPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeType, setActiveType] = useState("All");
  const [loading, setLoading] = useState(true);

  // Form states
  const [formSuccess, setFormSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    category: "Indian Carbon Market",
    details: "",
    botField: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadPublications() {
      const data = await getPublications();
      setPublications(data);
      setLoading(false);
    }
    loadPublications();
  }, []);

  const types = ["All", "Report", "Issue Brief", "Op-Ed", "Policy Recommendation"];

  const fuse = new Fuse(publications, {
    keys: ["title", "excerpt", "topic", "author"],
    threshold: 0.3,
  });

  const getFilteredPublications = () => {
    let results = publications;
    if (searchQuery.trim() !== "") {
      results = fuse.search(searchQuery).map((r) => r.item);
    }
    if (activeType !== "All") {
      results = results.filter((pub) => pub.type === activeType);
    }
    return results;
  };

  const filteredPublications = getFilteredPublications();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple verification
    const errors: Record<string, string> = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email || !formData.email.includes("@")) errors.email = "Valid email is required";
    if (!formData.details || formData.details.length < 15) {
      errors.details = "Please enter details of at least 15 characters";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (formData.botField) {
      setFormSuccess(true);
      return;
    }

    setSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setFormSuccess(true);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-2 pb-8">
      {/* Header */}
      <Section
        badge="Library"
        title="Reports, Briefs & Publications"
        subtitle="Explore our repository of research papers, legal analysis briefs, and policy submissions guiding the Indian carbon markets."
        className="pb-2"
      />

      <Container className="mb-20">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-5 items-center justify-between mb-12">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 bg-background/50 p-1.5 rounded-3xl shadow-neu-inset-sm border border-border/10">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-2xl transition-all duration-200 ${
                  activeType === type
                    ? "bg-background text-brand-primary shadow-neu-raised"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-muted pointer-events-none">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-3 rounded-2xl bg-background border-none text-xs font-semibold shadow-neu-inset focus:outline-none focus:shadow-neu-raised focus:ring-1 focus:ring-brand-primary placeholder:text-muted/50"
            />
          </div>
        </div>

        {/* List of Publications */}
        {loading ? (
          <div className="flex flex-col gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="w-full h-32 rounded-3xl bg-background shadow-neu-raised animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredPublications.map((pub) => (
              <NeuCard
                key={pub.id}
                variant="raised"
                className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-white/10 dark:border-white/5"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 shadow-neu-inset flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div className="flex flex-col gap-1.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-[9px] font-bold text-muted uppercase tracking-wider">
                      <span className="text-brand-primary">{pub.type}</span>
                      <span>•</span>
                      <span>{pub.topic}</span>
                      <span>•</span>
                      <span>{pub.year}</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-foreground font-display line-clamp-1">
                      {pub.title}
                    </h3>
                    <p className="text-xs text-muted/90 leading-relaxed font-medium line-clamp-2">
                      {pub.excerpt}
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-auto flex-shrink-0">
                  <a href={pub.pdfUrl} download className="block w-full md:w-auto">
                    <NeuButton variant="raised" size="sm" className="w-full md:w-auto flex items-center justify-center gap-2 hover:text-brand-primary">
                      <Download className="w-4 h-4" /> Download PDF
                    </NeuButton>
                  </a>
                </div>
              </NeuCard>
            ))}
          </div>
        )}

        {!loading && filteredPublications.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-muted font-bold">No publications found matching your query.</p>
          </div>
        )}
      </Container>

      {/* Policy Submission Section */}
      <Section
        badge="Call for Input"
        title="Submit Your Policy Recommendations"
        subtitle="Contribute to national representations. We collect, analyze, and present recommendations to key policy makers."
        className="bg-background/20"
        id="submit-recommendation"
      >
        <Container className="max-w-2xl">
          <NeuCard variant="raised" className="p-6 sm:p-10 border border-white/10 dark:border-white/5">
            {formSuccess ? (
              <div className="text-center py-8 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center shadow-neu-inset">
                  <CheckCircle2 className="w-8 h-8 text-brand-primary" />
                </div>
                <h3 className="text-xl font-extrabold text-foreground font-display">Recommendation Submitted</h3>
                <p className="text-xs text-muted/90 max-w-sm mx-auto font-medium">
                  Your inputs have been recorded. Our policy working group aggregates recommendations for upcoming ministry consultations.
                </p>
                <NeuButton
                  variant="raised"
                  onClick={() => {
                    setFormSuccess(false);
                    setFormData({ name: "", email: "", org: "", category: "Indian Carbon Market", details: "", botField: "" });
                  }}
                  className="mt-2"
                >
                  Submit Another Input
                </NeuButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                  type="text"
                  name="botField"
                  value={formData.botField}
                  onChange={handleInputChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <NeuInput
                    label="Full Name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    error={formErrors.name}
                    placeholder="e.g. Priyanshu Das"
                  />
                  <NeuInput
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    error={formErrors.email}
                    placeholder="e.g. p.das@org.in"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <NeuInput
                    label="Organization"
                    name="org"
                    value={formData.org}
                    onChange={handleInputChange}
                    placeholder="e.g. Energy Research Council"
                  />
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-xs font-bold tracking-wide uppercase text-muted/80 pl-2">
                      Topic Area
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-5 py-3 rounded-2xl bg-background border-none text-sm shadow-neu-inset transition-all focus:outline-none focus:shadow-neu-raised focus:ring-1 focus:ring-brand-primary text-foreground"
                    >
                      <option value="Indian Carbon Market">Indian Carbon Market (CCTS)</option>
                      <option value="Voluntary Carbon Market">Voluntary Carbon Market</option>
                      <option value="Article 6.2/6.4/6.8">Article 6.2/6.4/6.8 Bilaterals</option>
                      <option value="Green Credit Programme">Green Credit Programme (GCP)</option>
                      <option value="Durable CDR Pathways">Durable CDR (Biochar, ERW)</option>
                    </select>
                  </div>
                </div>

                <NeuTextarea
                  label="Recommendation Details"
                  name="details"
                  required
                  value={formData.details}
                  onChange={handleInputChange}
                  error={formErrors.details}
                  placeholder="Describe your policy recommendation, scientific baseline adjustment, or procedural challenge..."
                />

                <NeuButton
                  type="submit"
                  variant="primary"
                  disabled={submitting}
                  className="w-full mt-4 flex items-center justify-center gap-2 shadow-md"
                >
                  <Upload className="w-4 h-4" /> {submitting ? "Uploading..." : "Submit Recommendation"}
                </NeuButton>
              </form>
            )}
          </NeuCard>
        </Container>
      </Section>
    </div>
  );
}
