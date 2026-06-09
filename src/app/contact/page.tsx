"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { NeuInput, NeuTextarea } from "@/components/ui/neu-input";
import { Mail, Phone, MapPin, CheckCircle2, Send, Clock, Globe } from "lucide-react";

export default function ContactPage() {
  const [formSuccess, setFormSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    botField: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    // Simple validation
    const errors: Record<string, string> = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email || !formData.email.includes("@")) errors.email = "Valid email is required";
    if (!formData.subject) errors.subject = "Subject is required";
    if (!formData.message || formData.message.length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Honeypot check
    if (formData.botField) {
      setFormSuccess(true);
      return;
    }

    setSubmitting(true);

    try {
      // Simulate API submit
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormSuccess(true);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-2 pb-8">
      {/* Header Banner */}
      <Section
        badge="Get In Touch"
        title="Connect With Our Secretariat"
        subtitle="Have questions about our initiatives, membership tiers, or regulatory submissions? Drop us a line."
        variant="header"
        className="py-4"
      />

      <Container className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact info & map */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <NeuCard variant="raised" className="p-6 border border-white/10 dark:border-white/5 flex flex-col gap-6">
              <h3 className="text-base font-bold text-foreground font-display">Office Locations</h3>
              
              {/* HQ */}
              <div className="flex gap-4 items-start pb-4 border-b border-border/10">
                <MapPin className="w-5 h-5 text-brand-primary flex-shrink-0 mt-1" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Secretariat Head Office</span>
                  <h4 className="text-xs font-bold text-foreground">Climate Carbon Alliance India</h4>
                  <p className="text-xs text-muted/90 font-medium leading-relaxed">
                    6th Floor, Core 4B, India Habitat Centre, Lodhi Road, New Delhi - 110003
                  </p>
                </div>
              </div>

              {/* Bhopal */}
              <div className="flex gap-4 items-start">
                <MapPin className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-1" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest">Research & Field Hub</span>
                  <h4 className="text-xs font-bold text-foreground">CRIA Labs & Field Offices</h4>
                  <p className="text-xs text-muted/90 font-medium leading-relaxed">
                    Block B, Arera Hills, Near Lake View Road, Bhopal, Madhya Pradesh - 462011
                  </p>
                </div>
              </div>
            </NeuCard>

            <NeuCard variant="raised" className="p-6 border border-white/10 dark:border-white/5 flex flex-col gap-6">
              <h3 className="text-base font-bold text-foreground font-display">Communication Details</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-xs font-semibold text-foreground">
                  <Mail className="w-4 h-4 text-brand-primary" />
                  <span>info@climatecarbonalliance.in</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-foreground">
                  <Phone className="w-4 h-4 text-brand-secondary" />
                  <span>+91 11 4982 7300 / +91 755 491 8200</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold text-foreground">
                  <Clock className="w-4 h-4 text-brand-accent" />
                  <span>Monday - Friday, 9:00 AM - 6:00 PM IST</span>
                </div>
              </div>
            </NeuCard>

            {/* Embedded Map Visual */}
            <NeuCard variant="inset" className="h-64 border border-black/[0.03] dark:border-white/[0.02] bg-background/50 flex flex-col items-center justify-center p-6 text-center">
              <Globe className="w-8 h-8 text-brand-primary/60 mb-3 animate-spin-slow" />
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Geographic Hubs</span>
              <p className="text-xs text-muted/80 font-medium max-w-xs mt-1 leading-normal">
                Connecting national policy in Delhi with field implementation in MP and Maharashtra.
              </p>
            </NeuCard>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7">
            <NeuCard variant="raised" className="p-6 sm:p-10 border border-white/10 dark:border-white/5">
              {formSuccess ? (
                <div className="text-center py-12 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center shadow-neu-inset">
                    <CheckCircle2 className="w-8 h-8 text-brand-primary" />
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground font-display">Message Sent!</h3>
                  <p className="text-xs text-muted/90 max-w-sm mx-auto font-medium">
                    Thank you for contacting us. Your message has been received by our secretariat. We will get back to you shortly.
                  </p>
                  <NeuButton
                    variant="raised"
                    onClick={() => {
                      setFormSuccess(false);
                      setFormData({ name: "", email: "", subject: "", message: "", botField: "" });
                    }}
                    className="mt-4"
                  >
                    Send Another Message
                  </NeuButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Honeypot field */}
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
                      label="Your Name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      error={formErrors.name}
                      placeholder="e.g. Aditi Rao"
                    />
                    <NeuInput
                      label="Email Address"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      error={formErrors.email}
                      placeholder="e.g. aditi@tata.com"
                    />
                  </div>

                  <NeuInput
                    label="Subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    error={formErrors.subject}
                    placeholder="e.g. Partnership inquiry / CCTS advisory"
                  />

                  <NeuTextarea
                    label="Message Details"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    error={formErrors.message}
                    placeholder="Type your message details here..."
                  />

                  <NeuButton
                    type="submit"
                    variant="primary"
                    disabled={submitting}
                    className="w-full mt-2 flex items-center justify-center gap-2 shadow-md py-3.5"
                  >
                    <Send className="w-4 h-4" /> {submitting ? "Sending message..." : "Send Message"}
                  </NeuButton>
                </form>
              )}
            </NeuCard>
          </div>
        </div>
      </Container>
    </div>
  );
}
