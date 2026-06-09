import { NewsArticle, Publication, Event, TeamMember, Job, Partner, MemberTier } from "./types";

import newsData from "../../content/news.json";
import publicationsData from "../../content/publications.json";
import eventsData from "../../content/events.json";
import teamData from "../../content/team.json";
import jobsData from "../../content/jobs.json";
import partnersData from "../../content/partners.json";
import membershipData from "../../content/membership-tiers.json";

// In a real application, these functions could fetch from a Headless CMS (e.g. Sanity, Contentful)
// By abstracting the data access here, the front-end remains unchanged if the backend is updated.

export async function getNews(): Promise<NewsArticle[]> {
  return newsData as NewsArticle[];
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | undefined> {
  const news = await getNews();
  return news.find((item) => item.slug === slug);
}

export async function getFeaturedNews(): Promise<NewsArticle[]> {
  const news = await getNews();
  return news.filter((item) => item.isFeatured);
}

export async function getPublications(): Promise<Publication[]> {
  return publicationsData as Publication[];
}

export async function getEvents(): Promise<Event[]> {
  return eventsData as Event[];
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  const events = await getEvents();
  return events.find((item) => item.slug === slug);
}

export async function getTeam(): Promise<TeamMember[]> {
  return teamData as TeamMember[];
}

export async function getJobs(): Promise<Job[]> {
  return jobsData as Job[];
}

export async function getPartners(): Promise<Partner[]> {
  return partnersData as Partner[];
}

export async function getMembershipTiers(): Promise<MemberTier[]> {
  return membershipData as MemberTier[];
}
