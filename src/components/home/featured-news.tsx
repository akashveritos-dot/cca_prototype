import React from "react";
import Link from "next/link";
import { Section } from "../ui/section";
import { Container } from "../ui/container";
import { NeuCard } from "../ui/neu-card";
import { NeuButton } from "../ui/neu-button";
import { getFeaturedNews } from "@/lib/content/api";
import { ArrowRight, Calendar, User, Radio, Flame } from "lucide-react";
import { formatDate } from "@/lib/utils";

export async function FeaturedNews() {
  const featuredNews = await getFeaturedNews();

  const getCategoryColor = (tag: string) => {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes('disaster')) return 'bg-alert-red/10 text-alert-red border-alert-red/30';
    if (tagLower.includes('climate')) return 'bg-brand-primary/10 text-brand-primary border-brand-primary/30';
    if (tagLower.includes('tech')) return 'bg-brand-secondary/10 text-brand-secondary border-brand-secondary/30';
    return 'bg-accent/10 text-accent border-accent/30';
  };

  return (
    <Section
      badge="Pillar III - disastersnews.com"
      title="Latest Disaster & Climate News"
      subtitle="Real-time coverage of disasters, climate action, environment, disaster technology and space-based applications across India and beyond."
      className="bg-gradient-storm relative overflow-hidden"
      id="news"
    >
      {/* Animated breaking news effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-alert-red to-transparent animate-pulse" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredNews.map((article, index) => (
            <Link key={article.id} href={`/news/${article.slug}`} className="group h-full focus:outline-none">
              <NeuCard
                variant="raised"
                interactive
                hoverEffect="lift"
                className="h-full flex flex-col p-0 overflow-hidden border border-brand-primary/10 hover:border-brand-primary/30 transition-all duration-300 bg-background/80 backdrop-blur-sm"
              >
                {/* Image Header with Breaking Badge */}
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Breaking/Featured badge for first article */}
                  {index === 0 && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-alert-red text-white shadow-lg flex items-center gap-1 animate-pulse">
                        <Flame className="w-3 h-3" />
                        Breaking
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm border ${getCategoryColor(article.tags[0])}`}>
                      {article.tags[0]}
                    </span>
                  </div>
                  {/* Severity indicator overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-alert-red via-accent to-brand-primary opacity-60" />
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
                        {article.source || "DCRF"}
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
                    Read Full Story
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </NeuCard>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/news">
            <NeuButton variant="primary" size="md" className="flex items-center gap-2">
              <Radio className="w-4 h-4" />
              Visit disastersnews.com
              <ArrowRight className="w-4 h-4" />
            </NeuButton>
          </Link>
          <Link href="/news?filter=breaking">
            <NeuButton variant="raised" size="md" className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-alert-red" />
              Breaking News
            </NeuButton>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
