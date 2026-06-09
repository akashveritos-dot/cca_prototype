"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "../ui/container";
import { NeuButton } from "../ui/neu-button";
import { NeuInput } from "../ui/neu-input";
import { NeuDialog, NeuDialogActions } from "../ui/neu-dialog";
import { ArrowUp, Leaf, Mail, CheckCircle2 } from "lucide-react";
import { LinkedInIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from "../ui/social-icons";

export function Footer() {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessDialog(true);
    setEmail("");
  };

  return (
    <footer className="w-full bg-background border-t border-border/20 pt-16 pb-8 relative overflow-hidden mt-auto">
      {/* Decorative subtle background mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-brand-primary/5 via-transparent to-transparent opacity-70 pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-border/20">
          
          {/* Column 1: Info & Tagline */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-background shadow-neu-raised group-hover:shadow-neu-inset transition-all duration-300">
                <Leaf className="w-5 h-5 text-brand-primary" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-base tracking-tight leading-none text-foreground">
                  CCAI
                </span>
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest leading-none mt-1">
                  Climate Carbon Alliance
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted/90 leading-relaxed font-medium">
              Accelerating India's transition to Net Zero by building a high-integrity carbon market and promoting durable, high-permanence Carbon Dioxide Removal (CDR) solutions.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background shadow-neu-raised hover:shadow-neu-inset text-muted hover:text-brand-primary transition-all duration-300"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background shadow-neu-raised hover:shadow-neu-inset text-muted hover:text-brand-primary transition-all duration-300"
                aria-label="Twitter/X"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background shadow-neu-raised hover:shadow-neu-inset text-muted hover:text-brand-primary transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-background shadow-neu-raised hover:shadow-neu-inset text-muted hover:text-brand-primary transition-all duration-300"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-brand-primary">
              Alliance
            </h3>
            <ul className="flex flex-col gap-2.5">
              {["About Us", "Our Work", "Team & Board", "Careers", "Contact"].map((item, idx) => {
                const paths = ["/about", "/our-work", "/team", "/careers", "/contact"];
                return (
                  <li key={idx}>
                    <Link
                      href={paths[idx]}
                      className="text-sm text-muted hover:text-brand-primary font-medium transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-brand-primary">
              Resources
            </h3>
            <ul className="flex flex-col gap-2.5">
              {["Policy Briefs", "Scientific Reports", "Events & News", "Membership Tiers"].map((item, idx) => {
                const paths = ["/resources", "/resources", "/news", "/membership"];
                return (
                  <li key={idx}>
                    <Link
                      href={paths[idx]}
                      className="text-sm text-muted hover:text-brand-primary font-medium transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-brand-primary">
              Stay Informed
            </h3>
            <p className="text-sm text-muted/90 font-medium">
              Subscribe to our monthly newsletter for the latest regulatory updates, policy papers, and industry insights.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2.5 mt-1 items-end">
              <div className="flex-1">
                <NeuInput
                  type="email"
                  placeholder="Enter email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email for Newsletter"
                  className="rounded-full shadow-neu-inset px-4 py-2.5 h-11"
                />
              </div>
              <NeuButton
                type="submit"
                variant="primary"
                size="sm"
                className="h-11 px-5 flex items-center justify-center"
              >
                Join
              </NeuButton>
            </form>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-muted/80 font-semibold">
            © {new Date().getFullYear()} Climate Carbon Alliance India. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6 text-xs text-muted font-semibold">
            <Link href="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-primary transition-colors">Terms of Service</Link>
          </div>

          <button
            onClick={scrollToTop}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-background shadow-neu-raised hover:shadow-neu-inset text-muted hover:text-brand-primary transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brand-primary focus:outline-none"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </Container>

      {/* Success Dialog */}
      <NeuDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
      >
        <div className="flex flex-col items-center text-center gap-4 py-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-brand-primary/10 shadow-neu-inset">
            <CheckCircle2 className="w-8 h-8 text-brand-primary" />
          </div>
          
          <h3 className="text-xl font-display font-bold text-foreground">
            Successfully Subscribed!
          </h3>
          
          <p className="text-sm text-muted/90 leading-relaxed">
            Thank you for subscribing to our newsletter! You'll receive the latest regulatory updates, policy papers, and industry insights directly in your inbox.
          </p>

          <NeuDialogActions className="w-full justify-center">
            <NeuButton
              onClick={() => setShowSuccessDialog(false)}
              variant="primary"
              className="px-8"
            >
              Got it!
            </NeuButton>
          </NeuDialogActions>
        </div>
      </NeuDialog>
    </footer>
  );
}
