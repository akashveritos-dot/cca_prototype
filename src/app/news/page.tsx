"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { NeuCard } from "@/components/ui/neu-card";
import { getNews } from "@/lib/content/api";
import { NewsArticle } from "@/lib/content/types";
import { Calendar, User, Search, Rss } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Fuse from "fuse.js";

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      const data = await getNews();
      setNews(data);
      setLoading(false);
    }
    fetchNews();
  }, []);

  const allTags = ["All", "Policy", "CCTS", "Compliance", "Research", "Biochar", "Agriculture", "Weathering", "Science", "GCP"];

  // Search setup using Fuse.js
  const fuse = new Fuse(news, {
    keys: ["title", "excerpt", "body", "tags"],
    threshold: 0.35,
  });

  const getFilteredNews = () => {
    let results = news;

    if (searchQuery.trim() !== "") {
      results = fuse.search(searchQuery).map((r) => r.item);
    }

    if (activeTag !== "All") {
      results = results.filter((item) => item.tags.includes(activeTag));
    }

    return results;
  };

  const filteredNews = getFilteredNews();

  return (
    <div className="pt-2 pb-8">
      {/* Header Banner */}
      <Section
        badge="Newsroom"
        title="Perspectives & Press Releases"
        subtitle="The latest developments in policy advocacy, carbon credits, scientific analysis, and national workshops."
        className="pb-2"
      />

      <Container className="mb-20">
        {/* Controls Layout */}
        <div className="flex flex-col gap-6 mb-12">
          {/* Top Row: Search and RSS */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-muted pointer-events-none">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search articles by title, tags, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-5 py-3 rounded-2xl bg-background border-none text-xs font-semibold shadow-neu-inset focus:outline-none focus:shadow-neu-raised focus:ring-1 focus:ring-brand-primary placeholder:text-muted/50"
              />
            </div>
            
            <a
              href="/feed.xml"
              target="_blank"
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-background shadow-neu-raised hover:shadow-neu-inset text-xs font-bold text-brand-primary uppercase tracking-wider transition-all duration-300"
            >
              <Rss className="w-4 h-4" /> RSS Feed
            </a>
          </div>

          {/* Tags Chips */}
          <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto scrollbar-none">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-full whitespace-nowrap transition-all duration-200 ${
                  activeTag === tag
                    ? "bg-background text-brand-primary shadow-neu-raised"
                    : "text-muted hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full h-80 rounded-3xl bg-background shadow-neu-raised animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`} className="group h-full focus:outline-none">
                <NeuCard
                  variant="raised"
                  interactive
                  hoverEffect="lift"
                  className="h-full flex flex-col p-0 overflow-hidden border border-white/10 dark:border-white/5"
                >
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

                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-muted uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(article.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
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

                    <div className="text-xs font-bold text-brand-primary mt-6">
                      Read Article →
                    </div>
                  </div>
                </NeuCard>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredNews.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-muted font-bold">No articles match your search criteria.</p>
          </div>
        )}
      </Container>
    </div>
  );
}
