"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { NeuInput, NeuTextarea } from "@/components/ui/neu-input";
import { Check, CheckCircle2, ChevronRight, ChevronLeft, Send, Sparkles } from "lucide-react";
import * as z from "zod";
import membershipData from "../../content/membership-tiers.json";

// Form schemas
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  organization: z.string().min(2, "Organization name must be at least 2 characters"),
  designation: z.string().min(2, "Designation must be at least 2 characters"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  tier: z.string().min(1, "Please select a membership tier"),
  interest: z.string().min(10, "Please describe your interest in at least 10 characters"),
  botField: z.string().optional(), // Honeypot field
});

type FormValues = z.infer<typeof formSchema>;

export default function MembershipPage() {
  const [step, setStep] = useState(1);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Form state tracking manually for simplicity & absolute reliability
  const [formData, setFormData] = useState<FormValues>({
    name: "",
    email: "",
    phone: "",
    organization: "",
    designation: "",
    website: "",
    tier: "tier-corporate",
    interest: "",
    botField: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleNext = () => {
    // Validate current step fields
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.name) newErrors.name = "Name is required";
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Valid email is required";
      }
      if (!formData.phone) newErrors.phone = "Phone number is required";
    } else if (step === 2) {
      if (!formData.organization) newErrors.organization = "Organization is required";
      if (!formData.designation) newErrors.designation = "Designation is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation
    const validationResult = formSchema.safeParse(formData);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setFormErrors(fieldErrors);
      return;
    }

    // Honeypot check
    if (formData.botField) {
      console.warn("Bot detected via honeypot!");
      setFormSuccess(true);
      return;
    }

    setSubmitting(true);

    // Simulate Server Action call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormSuccess(true);
    } catch (error) {
      alert("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const targets = [
    { type: "Project Developers", desc: "Unlock carbon financing for agriculture, forestry, and technical projects." },
    { type: "Large Industries", desc: "Gain critical strategic guidance to prepare for CCTS baseline target rules." },
    { type: "FPOs & Cooperatives", desc: "Access micro-pyrolyzers, scientific testing, and biochar credits." },
    { type: "Investors & Funds", desc: "Discover high-integrity carbon portfolios backed by rigorous science." },
  ];

  return (
    <div className="pt-2 pb-8">
      {/* Header Banner */}
      <Section
        badge="Join The Alliance"
        title="Membership Options & Benefits"
        subtitle="Unite with India's pioneering climate groups, project developers, and researchers to drive carbon market integrity."
        variant="header"
        className="py-4"
      />

      {/* Tiers Comparison Grid */}
      <Container className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {membershipData.map((tier) => (
            <NeuCard
              key={tier.id}
              variant={tier.highlighted ? "inset" : "raised"}
              className={`p-8 h-full flex flex-col justify-between border ${tier.highlighted ? "border-brand-primary/20 bg-background/50" : "border-white/10 dark:border-white/5"
                }`}
            >
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-foreground font-display">{tier.name}</h3>
                    <p className="text-[10px] text-muted font-bold uppercase tracking-wider mt-1">{tier.description}</p>
                  </div>
                  {tier.highlighted && (
                    <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-brand-primary text-white shadow-sm flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Popular
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1.5 py-4 border-y border-border/10">
                  <span className="text-3xl font-extrabold text-foreground font-display">{tier.price}</span>
                  <span className="text-xs font-bold text-muted uppercase">/ {tier.period}</span>
                </div>

                <ul className="flex flex-col gap-3.5">
                  {tier.benefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs font-semibold text-foreground">
                      <Check className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <NeuButton
                  variant={tier.highlighted ? "primary" : "raised"}
                  size="md"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, tier: tier.id }));
                    setStep(1);
                    document.getElementById("join-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full text-xs uppercase tracking-wider py-3"
                >
                  Select {tier.name}
                </NeuButton>
              </div>
            </NeuCard>
          ))}
        </div>
      </Container>

      {/* Target Audiences Section */}
      <Section
        badge="Who Belongs Here"
        title="Catalysing Collaborative Action Across Sectors"
        subtitle="Our membership comprises stakeholders from every node of the carbon removal value chain."
        centered
        className="bg-background/20"
      >
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {targets.map((target, idx) => (
              <NeuCard key={idx} variant="raised" interactive hoverEffect="press" className="p-6 border border-white/10 dark:border-white/5">
                <h4 className="text-sm font-extrabold text-brand-primary uppercase tracking-wider mb-2">
                  {target.type}
                </h4>
                <p className="text-xs text-muted/90 font-medium leading-relaxed">
                  {target.desc}
                </p>
              </NeuCard>
            ))}
          </div>
        </Container>
      </Section>

      {/* Registration Form Section */}
      <Section
        badge="Application"
        title="Become an Alliance Member"
        subtitle="Fill out the application below, and our secretariat will review your credentials for membership admission."
        className="bg-background"
        id="join-form"
      >
        <Container className="max-w-3xl">
          <NeuCard variant="raised" className="p-6 sm:p-10 border border-white/10 dark:border-white/5">
            {formSuccess ? (
              <div className="text-center py-12 flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center shadow-neu-inset">
                  <CheckCircle2 className="w-8 h-8 text-brand-primary" />
                </div>
                <h3 className="text-2xl font-extrabold text-foreground font-display">Application Submitted!</h3>
                <p className="text-sm text-muted/90 max-w-md mx-auto font-medium">
                  Thank you for applying. A representative from the Climate Carbon Alliance India secretariat will contact you within 3 business days regarding verification.
                </p>
                <NeuButton
                  variant="raised"
                  onClick={() => {
                    setFormSuccess(false);
                    setStep(1);
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      organization: "",
                      designation: "",
                      website: "",
                      tier: "tier-corporate",
                      interest: "",
                      botField: "",
                    });
                  }}
                  className="mt-4"
                >
                  Submit Another Application
                </NeuButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Honeypot anti-spam */}
                <input
                  type="text"
                  name="botField"
                  value={formData.botField}
                  onChange={handleInputChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Progress Header */}
                <div className="flex items-center justify-between border-b border-border/10 pb-6 mb-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">
                      Step {step} of 3
                    </span>
                    <h4 className="text-base font-extrabold text-foreground font-display">
                      {step === 1 && "Personal Information"}
                      {step === 2 && "Organization Details"}
                      {step === 3 && "Interests & Finalize"}
                    </h4>
                  </div>
                  <div className="w-24 h-1.5 bg-background shadow-neu-inset rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-primary transition-all duration-300"
                      style={{ width: `${(step / 3) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Step 1: Personal */}
                {step === 1 && (
                  <div className="flex flex-col gap-5">
                    <NeuInput
                      label="Full Name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      error={formErrors.name}
                      placeholder="e.g. Rahul Sharma"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <NeuInput
                        label="Email Address"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        error={formErrors.email}
                        placeholder="e.g. rahul@example.com"
                      />
                      <NeuInput
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        error={formErrors.phone}
                        placeholder="e.g. +91 98765 43210"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Org */}
                {step === 2 && (
                  <div className="flex flex-col gap-5">
                    <NeuInput
                      label="Organization / Affiliation"
                      name="organization"
                      required
                      value={formData.organization}
                      onChange={handleInputChange}
                      error={formErrors.organization}
                      placeholder="e.g. Tata Steel / IIT Delhi"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <NeuInput
                        label="Designation / Job Title"
                        name="designation"
                        required
                        value={formData.designation}
                        onChange={handleInputChange}
                        error={formErrors.designation}
                        placeholder="e.g. Sustainability Director"
                      />
                      <NeuInput
                        label="Website / Portfolio Link"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        error={formErrors.website}
                        placeholder="e.g. https://tata.com"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Interest & Tier */}
                {step === 3 && (
                  <div className="flex flex-col gap-5">
                    <div className="w-full flex flex-col gap-2">
                      <label className="text-xs font-bold tracking-wide uppercase text-muted/80 pl-2">
                        Preferred Membership Tier
                      </label>
                      <select
                        name="tier"
                        value={formData.tier}
                        onChange={handleInputChange}
                        className="w-full px-5 py-3 rounded-2xl bg-background border-none text-sm shadow-neu-inset transition-all focus:outline-none focus:shadow-neu-raised focus:ring-1 focus:ring-brand-primary text-foreground"
                      >
                        <option value="tier-individual">Associate Member (₹15,000/yr)</option>
                        <option value="tier-fpo">FPO & NGO Member (₹5,000/yr)</option>
                        <option value="tier-corporate">Corporate Patron (₹1,50,000/yr)</option>
                      </select>
                    </div>

                    <NeuTextarea
                      label="Why do you want to join Climate Carbon Alliance India?"
                      name="interest"
                      required
                      value={formData.interest}
                      onChange={handleInputChange}
                      error={formErrors.interest}
                      placeholder="Please explain how your organization works with carbon reduction, carbon offset, or high-permanence CDR technologies..."
                    />
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-border/10">
                  {step > 1 ? (
                    <NeuButton
                      type="button"
                      variant="raised"
                      onClick={handleBack}
                      className="flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </NeuButton>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <NeuButton
                      type="button"
                      variant="raised"
                      onClick={handleNext}
                      className="flex items-center gap-1.5 text-brand-primary"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </NeuButton>
                  ) : (
                    <NeuButton
                      type="submit"
                      variant="primary"
                      disabled={submitting}
                      className="flex items-center gap-2 px-8 shadow-md"
                    >
                      {submitting ? "Submitting..." : "Submit Application"}
                      <Send className="w-4 h-4" />
                    </NeuButton>
                  )}
                </div>
              </form>
            )}
          </NeuCard>
        </Container>
      </Section>
    </div>
  );
}
