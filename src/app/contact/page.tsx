import React from "react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { NeuInput } from "@/components/ui/neu-input";
import { Mail, Phone, MapPin, Send, Building2, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Disaster & Climate Resilience Federation team for partnerships, membership, or general inquiries.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Section className="bg-gradient-storm pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-disaster-overlay pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-foreground leading-tight mb-6">
              Get in <span className="text-gradient-primary">Touch</span>
            </h1>
            
            <p className="text-lg text-muted/90 leading-relaxed max-w-3xl mx-auto">
              Have questions about membership, partnerships, or our initiatives? We'd love to hear from you.
            </p>
          </div>
        </Container>
      </Section>

      {/* Contact Section */}
      <Section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <NeuCard variant="raised" className="p-8 border border-brand-primary/10">
              <h2 className="text-2xl font-bold text-foreground font-display mb-6">
                Send Us a Message
              </h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      First Name *
                    </label>
                    <NeuInput
                      type="text"
                      placeholder="John"
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      Last Name *
                    </label>
                    <NeuInput
                      type="text"
                      placeholder="Doe"
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    Email Address *
                  </label>
                  <NeuInput
                    type="email"
                    placeholder="john.doe@example.com"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    Organization
                  </label>
                  <NeuInput
                    type="text"
                    placeholder="Your organization name"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    Subject *
                  </label>
                  <NeuInput
                    type="text"
                    placeholder="How can we help?"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-background shadow-neu-inset border border-border/10 text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all resize-none"
                  />
                </div>

                <NeuButton 
                  variant="primary" 
                  size="lg" 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </NeuButton>
              </form>
            </NeuCard>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Registered Office */}
              <NeuCard variant="raised" className="p-8 border border-brand-primary/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 shadow-neu-inset flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground font-display mb-2">
                      Registered Office
                    </h3>
                    <p className="text-sm text-muted/90 leading-relaxed">
                      Disaster & Climate Resilience Federation (DCRF)<br />
                      [Address Line 1]<br />
                      [Address Line 2]<br />
                      New Delhi - 110001<br />
                      India
                    </p>
                  </div>
                </div>
              </NeuCard>

              {/* Contact Details */}
              <NeuCard variant="raised" className="p-8 border border-brand-secondary/10">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 shadow-neu-inset flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-brand-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground font-display mb-2">
                        Email
                      </h3>
                      <a 
                        href="mailto:info@dcrf.org.in"
                        className="text-sm text-brand-primary hover:text-brand-primary-hover transition-colors"
                      >
                        info@dcrf.org.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 shadow-neu-inset flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground font-display mb-2">
                        Phone
                      </h3>
                      <a 
                        href="tel:+911234567890"
                        className="text-sm text-brand-primary hover:text-brand-primary-hover transition-colors"
                      >
                        +91 12345 67890
                      </a>
                    </div>
                  </div>
                </div>
              </NeuCard>

              {/* Specific Inquiries */}
              <NeuCard variant="raised" className="p-8 border border-success-green/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-success-green/10 shadow-neu-inset flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-success-green" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground font-display mb-3">
                      Specific Inquiries
                    </h3>
                    <div className="space-y-2 text-sm text-muted/90">
                      <div>
                        <strong className="text-foreground">Membership:</strong>{" "}
                        <a href="mailto:membership@dcrf.org.in" className="text-brand-primary hover:text-brand-primary-hover">
                          membership@dcrf.org.in
                        </a>
                      </div>
                      <div>
                        <strong className="text-foreground">Partnerships:</strong>{" "}
                        <a href="mailto:partnerships@dcrf.org.in" className="text-brand-primary hover:text-brand-primary-hover">
                          partnerships@dcrf.org.in
                        </a>
                      </div>
                      <div>
                        <strong className="text-foreground">Media:</strong>{" "}
                        <a href="mailto:media@dcrf.org.in" className="text-brand-primary hover:text-brand-primary-hover">
                          media@dcrf.org.in
                        </a>
                      </div>
                      <div>
                        <strong className="text-foreground">Events:</strong>{" "}
                        <a href="mailto:events@dcrf.org.in" className="text-brand-primary hover:text-brand-primary-hover">
                          events@dcrf.org.in
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </NeuCard>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
