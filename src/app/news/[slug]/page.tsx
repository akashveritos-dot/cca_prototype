import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { NeuCard } from "@/components/ui/neu-card";
import { NeuButton } from "@/components/ui/neu-button";
import { getNewsBySlug, getNews } from "@/lib/content/api";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { ShareButtons } from "@/components/news/share-buttons";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/news/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: article.thumbnail,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

// Generate static params for all articles to enable SSG
export async function generateStaticParams() {
  const news = await getNews();
  return news.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  // Get related articles
  const allNews = await getNews();
  const related = allNews
    .filter((n) => n.id !== article.id)
    .slice(0, 2);

  // Script tag JSON-LD content
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "image": [article.thumbnail],
    "datePublished": article.date,
    "dateModified": article.date,
    "author": [{
      "@type": "Person",
      "name": article.author
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Climate Carbon Alliance India",
      "logo": {
        "@type": "ImageObject",
        "url": "https://climatecarbonalliance.in/favicon.ico"
      }
    },
    "description": article.excerpt
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="py-12">
        <Container>
          {/* Back link */}
          <Link href="/news" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary mb-8 hover:translate-x-[-4px] transition-transform">
            <ArrowLeft className="w-4 h-4" /> Back to Newsroom
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Main Content */}
            <article className="lg:col-span-8">
              <NeuCard variant="raised" className="p-6 sm:p-10 border border-white/10 dark:border-white/5">
                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold text-muted uppercase tracking-wider mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(article.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    By {article.author}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary">
                    {article.tags[0]}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground font-display leading-tight mb-8">
                  {article.title}
                </h1>

                {/* Main Cover Image */}
                <div className="relative w-full h-[280px] sm:h-[400px] rounded-2xl overflow-hidden mb-8 shadow-neu-inset p-1 bg-background">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                {/* Body Content */}
                <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-muted/90 font-medium whitespace-pre-line flex flex-col gap-5">
                  {article.body}
                </div>

                {/* Tags bottom list */}
                <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border/10">
                  {article.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-background shadow-neu-inset text-[10px] font-bold text-muted uppercase tracking-wider">
                      #{tag}
                    </span>
                  ))}
                </div>
              </NeuCard>
            </article>

            {/* Sidebar widgets */}
            <aside className="lg:col-span-4 flex flex-col gap-8">
              {/* Share widget */}
              <NeuCard variant="raised" className="p-6 border border-white/10 dark:border-white/5">
                <h3 className="text-sm font-bold text-foreground font-display mb-4 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-brand-primary" /> Share Article
                </h3>
                <ShareButtons slug={article.slug} title={article.title} />
              </NeuCard>

              {/* Related posts */}
              <div className="flex flex-col gap-4">
                <h3 className="text-xs font-bold text-brand-primary uppercase tracking-widest pl-2">
                  Related Stories
                </h3>
                {related.map((item) => (
                  <Link key={item.id} href={`/news/${item.slug}`}>
                    <NeuCard variant="raised" interactive hoverEffect="press" className="p-4 flex gap-4 border border-white/10 dark:border-white/5 items-center">
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-foreground line-clamp-2 leading-snug hover:text-brand-primary transition-colors font-display">
                          {item.title}
                        </h4>
                        <span className="text-[9px] font-bold text-muted uppercase mt-1 block">
                          {formatDate(item.date)}
                        </span>
                      </div>
                    </NeuCard>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </Container>
      </div>
    </>
  );
}
