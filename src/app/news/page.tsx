import React from "react";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { Radio, Flame, Calendar, User, ArrowRight, Filter } from "lucide-react";
import { getFeaturedNews } from "@/lib/content/api";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "disastersnews.com - News Platform",
  description: "Real-time coverage of disasters, climate action, environment, disaster technology and space-based applications across India and beyond.",
};

const categories = [
  { id: "all", name: "All News", color: "brand-primary" },
  { id: "disasters", name: "Disasters", color: "alert-red" },
  { id: "climate-action", name: "Climate Action", color: "brand-primary" },
  { id: "environment", name: "Environment", color: "success-green" },
  { id: "disaster-tech", name: "Disaster Tech", color: "brand-secondary" },
  { id: "space-applications", name: "Space Applications", color: "accent" },
];

export default async function NewsPage() {
  const news = await getFeaturedNews();

  const getCategoryColor = (tag: string) => {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes('disaster') && !tagLower.includes('tech')) return 'bg-alert-red/10 text-alert-red border-alert-red/30';
    if (tagLower.includes('climate')) return 'bg-brand-primary/10 text-brand-primary border-brand-primary/30';
    if (tagLower.includes('tech')) return 'bg-brand-secondary/10 text-brand-secondary border-brand-secondary/30';
    if (tagLower.includes('environment')) return 'bg-success-green/10 text-success-green border-success-green/30';
    if (tagLower.includes('space')) return 'bg-accent/10 text-accent border-accent/30';
    return 'bg-brand-primary/10 text-brand-primary border-brand-primary/30';
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Section className="bg-gradient-storm pt-32 pb-16 relative overflow-hidden">
        {/* Breaking news ticker effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-alert-red to-transparent animate-pulse" />
        
        <div className="absolute inset-0 bg-disaster-overlay pointer-events-none" />
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-secondary/10 border border-brand-secondary/30 text-brand-secondary font-bold text-sm mb-6 animate-pulse">
              <Radio className="w-4 h-4" />
              Pillar III - News Platform
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-foreground leading-tight mb-6">
              <span className="text-gradient-primary">disasters</span>news.com
            </h1>
            
            <p className="text-lg text-muted/90 leading-relaxed max-w-3xl mx-auto mb-8">
              India's dedicated digital news platform covering disasters, climate action, environment, disaster technology and space-based applications — bringing you real-time updates and expert analysis.
            </p>

            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-alert-red/10 border border-alert-red/30 text-alert-red font-bold text-sm">
                <Flame className="w-4 h-4 animate-pulse" />
                Live Coverage
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background shadow-neu-inset text-foreground font-bold text-sm">
                <span className="w-2 h-2 rounded-full bg-success-green animate-pulse" />
                Real-Time Updates
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Category Filters */}
      <Section className="bg-background/80 py-8">
        <Container>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-sm font-bold text-muted">
              <Filter className="w-4 h-4" />
              Filter by Category
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link key={category.id} href={`/news?category=${category.id}`}>
                <NeuButton 
                  variant="raised" 
                  size="sm"
                  className="hover:-translate-y-0.5 transition-transform"
                >
                  {category.name}
                </NeuButton>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured/Breaking News */}
      {news.length > 0 && (
        <Section className="bg-gradient-alert py-12">
          <Container>
            <div className="flex items-center gap-2 mb-6">
              <Flame className="w-5 h-5 text-alert-red animate-pulse" />
              <h2 className="text-xl font-bold text-foreground font-display">Breaking News</h2>
            </div>
            
            <Link href={`/news/${news[0].slug}`} className="group">
              <NeuCard 
                variant="raised" 
                interactive
                hoverEffect="lift"
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-0 overflow-hidden border border-alert-red/20 hover:border-alert-red/40 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-64 lg:h-auto overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={news[0].thumbnail}
                    alt={news[0].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-alert-red text-white shadow-lg flex items-center gap-1 animate-pulse">
                      <Flame className="w-3 h-3" />
                      Breaking
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-alert-red via-accent to-brand-primary" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-xs font-bold text-muted uppercase tracking-wider mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(news[0].date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {news[0].source || "DCRF"}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-brand-primary transition-colors duration-200 font-display mb-4 leading-tight">
                    {news[0].title}
                  </h3>
                  
                  <p className="text-base text-muted/90 leading-relaxed mb-6">
                    {news[0].excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-bold text-brand-primary group-hover:gap-3 transition-all duration-300">
                    Read Full Story
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </NeuCard>
            </Link>
          </Container>
        </Section>
      )}

      {/* Latest News Grid */}
      <Section 
        badge="Latest Stories" 
        title="Recent Updates" 
        subtitle="Stay informed with the latest news on disasters, climate action, and resilience innovations"
        className="bg-background"
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.slice(1).map((article, index) => (
              <Link key={article.id} href={`/news/${article.slug}`} className="group h-full focus:outline-none">
                <NeuCard
                  variant="raised"
                  interactive
                  hoverEffect="lift"
                  className="h-full flex flex-col p-0 overflow-hidden border border-brand-primary/10 hover:border-brand-primary/30 transition-all duration-300 bg-background/80 backdrop-blur-sm"
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
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm border ${getCategoryColor(article.tags[0])}`}>
                        {article.tags[0]}
                      </span>
                    </div>
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
                      Read Story
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </NeuCard>
              </Link>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <Link href="/news?page=2">
              <NeuButton variant="raised" size="lg" className="flex items-center gap-2 mx-auto">
                Load More Stories
                <ArrowRight className="w-4 h-4" />
              </NeuButton>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Subscribe CTA */}
      <Section className="bg-gradient-storm">
        <Container>
          <NeuCard variant="raised" className="p-12 text-center border border-brand-primary/20 bg-background/90 backdrop-blur-sm">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-primary font-bold text-sm mb-6">
              <Radio className="w-4 h-4" />
              Stay Updated
            </div>
            
            <h2 className="text-3xl font-bold text-foreground font-display mb-4">
              Never Miss a Critical Update
            </h2>
            <p className="text-muted/90 max-w-2xl mx-auto mb-8">
              Subscribe to our newsletter for daily disaster alerts, climate action updates, and expert analysis delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/subscribe">
                <NeuButton variant="primary" size="lg" className="flex items-center gap-2">
                  Subscribe to Newsletter
                  <ArrowRight className="w-4 h-4" />
                </NeuButton>
              </Link>
              <Link href="/news/rss">
                <NeuButton variant="raised" size="lg">
                  <Radio className="w-4 h-4 mr-2" />
                  RSS Feed
                </NeuButton>
              </Link>
            </div>
          </NeuCard>
        </Container>
      </Section>
    </div>
  );
}
