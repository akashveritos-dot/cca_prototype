import React from "react";
import Link from "next/link";
import { Section } from "../ui/section";
import { Container } from "../ui/container";
import { NeuCard } from "../ui/neu-card";
import { NeuButton } from "../ui/neu-button";
import { getFeaturedNews } from "@/lib/content/api";
import { ArrowRight, Calendar, User } from "lucide-react";
import { formatDate } from "@/lib/utils";

export async function FeaturedNews() {
  const featuredNews = await getFeaturedNews();

  return (
    <Section
      badge="Latest Updates"
      title="Featured News & Insights"
      subtitle="Stay informed about policy revisions, carbon removal science updates, and our corporate networks across India."
      className="bg-background/20"
      id="news"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredNews.map((article) => (
            <Link key={article.id} href={`/news/${article.slug}`} className="group h-full focus:outline-none">
              <NeuCard
                variant="raised"
                interactive
                hoverEffect="lift"
                className="h-full flex flex-col p-0 overflow-hidden border border-white/10 dark:border-white/5"
              >
                {/* Image Header */}
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-background/80 backdrop-blur-sm text-brand-primary shadow-sm">
                      {article.tags[0]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="flex flex-col gap-3">
                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-[10px] font-bold text-muted uppercase tracking-wider">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(article.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {article.source || "Alliance"}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-foreground line-clamp-2 group-hover:text-brand-primary transition-colors duration-200 font-display">
                      {article.title}
                    </h3>
                    <p className="text-xs text-muted/90 leading-relaxed font-semibold line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-brand-primary mt-6 group-hover:gap-3 transition-all duration-300">
                    Read Full Article
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </NeuCard>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/news">
            <NeuButton variant="raised" size="md" className="flex items-center gap-2 mx-auto">
              View All News & Press
              <ArrowRight className="w-4 h-4" />
            </NeuButton>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
