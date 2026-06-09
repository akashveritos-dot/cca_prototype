import { MetadataRoute } from "next";
import { getNews, getEvents } from "@/lib/content/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://climatecarbonalliance.in";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/team",
    "/our-work",
    "/membership",
    "/news",
    "/resources",
    "/events",
    "/careers",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic news articles
  const news = await getNews();
  const newsRoutes = news.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic events
  const events = await getEvents();
  const eventRoutes = events.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: new Date(event.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...newsRoutes, ...eventRoutes];
}
