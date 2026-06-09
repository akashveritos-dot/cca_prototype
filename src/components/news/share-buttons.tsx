"use client";

import React, { useState } from "react";
import { LinkedInIcon, TwitterIcon } from "@/components/ui/social-icons";
import { Link as LinkIcon, Check } from "lucide-react";

interface ShareButtonsProps {
  slug: string;
  title: string;
}

export function ShareButtons({ slug, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return `https://climatecarbonalliance.in/news/${slug}`;
  };

  const handleCopy = async () => {
    try {
      const url = getShareUrl();
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex gap-3">
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 w-10 h-10 flex items-center justify-center rounded-2xl bg-background shadow-neu-raised hover:shadow-neu-inset text-muted hover:text-brand-primary transition-all duration-300"
        aria-label="Share on LinkedIn"
      >
        <LinkedInIcon className="w-4 h-4" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(getShareUrl())}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 w-10 h-10 flex items-center justify-center rounded-2xl bg-background shadow-neu-raised hover:shadow-neu-inset text-muted hover:text-brand-primary transition-all duration-300"
        aria-label="Share on Twitter"
      >
        <TwitterIcon className="w-4 h-4" />
      </a>
      <button
        onClick={handleCopy}
        className="flex-1 w-10 h-10 flex items-center justify-center rounded-2xl bg-background shadow-neu-raised hover:shadow-neu-inset text-muted hover:text-brand-primary transition-all duration-300 focus:outline-none"
        aria-label={copied ? "Link Copied" : "Copy Link"}
      >
        {copied ? <Check className="w-4 h-4 text-brand-primary" /> : <LinkIcon className="w-4 h-4" />}
      </button>
    </div>
  );
}
