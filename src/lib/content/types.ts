export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  author: string;
  date: string;
  tags: string[];
  thumbnail: string;
  source?: string;
  isFeatured?: boolean;
}

export interface Publication {
  id: string;
  title: string;
  slug: string;
  type: "Report" | "Issue Brief" | "Op-Ed" | "Policy Recommendation";
  topic: string;
  year: number;
  pdfUrl: string;
  excerpt: string;
  author: string;
  date: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  date: string;
  endDate: string;
  time: string;
  venue: string;
  description: string;
  agenda: string[];
  speakers: string[];
  registrationUrl: string;
  isFlagship?: boolean;
  photos?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedIn: string;
  category: "Leadership" | "Advisors" | "Board" | "Team";
}

export interface Job {
  id: string;
  title: string;
  org: string;
  location: string;
  type: string;
  description: string;
  applyUrl: string;
  date: string;
}

export interface MemberTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  benefits: string[];
  highlighted?: boolean;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  category: "Government" | "Industry" | "Research" | "International";
}
