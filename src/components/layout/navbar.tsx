"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/theme-provider";
import { Menu, X, Sun, Moon, Leaf } from "lucide-react";
import { NeuButton } from "../ui/neu-button";
import { Container } from "../ui/container";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Our Work", href: "/our-work" },
    { name: "News", href: "/news" },
    { name: "Resources", href: "/resources" },
    { name: "Events", href: "/events" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "glassmorphism shadow-md py-3"
          : "bg-background/80 border-b border-transparent py-5"
      }`}
    >
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg px-2 py-1">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-background shadow-neu-raised group-hover:shadow-neu-inset transition-all duration-300">
            <Leaf className="w-5 h-5 text-brand-primary group-hover:rotate-12 transition-transform duration-300" />
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

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-background/50 p-1.5 rounded-full shadow-neu-inset-sm border border-border/10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-background text-brand-primary shadow-neu-raised"
                    : "text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right side controls (Theme Toggle, Member CTA, Mobile Menu Button) */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-background shadow-neu-raised hover:shadow-neu-inset text-foreground transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brand-primary focus:outline-none"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 text-brand-secondary" />
            ) : (
              <Sun className="w-4 h-4 text-brand-accent" />
            )}
          </button>

          <Link href="/membership" className="hidden sm:inline-block">
            <NeuButton variant="primary" size="sm" className="px-5 py-2.5 text-xs tracking-wider uppercase">
              Become a Member
            </NeuButton>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-background shadow-neu-raised hover:shadow-neu-inset text-foreground transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brand-primary focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden w-full border-t border-border/10 bg-background overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`px-5 py-3.5 rounded-2xl font-bold uppercase tracking-wider text-xs transition-all ${
                        isActive
                          ? "bg-background text-brand-primary shadow-neu-inset"
                          : "text-muted hover:text-foreground bg-background/30"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </nav>
              <div className="pt-4 border-t border-border/10 flex flex-col gap-3">
                <Link href="/membership" className="w-full">
                  <NeuButton variant="primary" size="md" className="w-full uppercase tracking-wider text-xs py-3.5">
                    Become a Member
                  </NeuButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
