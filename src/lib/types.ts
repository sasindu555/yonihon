export type AdminRole = "super_admin" | "editor" | "support";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: AdminRole;
  createdAt: string;
  lastLogin: string | null;
  active: boolean;
}

export interface Experience {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  duration: string;
  groupSize: string;
  language: string;
  experienceType: string;
  location: string;
  destination: string;
  category: string;
  price: number;
  currency: string;
  image: string;
  images: string[];
  featured: boolean;
  popular: boolean;
  rating: number;
  reviewCount: number;
  meetingPoint: string;
  cancellationPolicy: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  itinerary: { title: string; description: string }[];
  hostName: string;
  hostInstagram: string;
  bookingNote: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  heroImage: string;
  images: string[];
  startDate: string;
  endDate: string;
  location: string;
  prefecture: string;
  area: string;
  category: string;
  tags: string[];
  admission: string;
  bestFor: string;
  goodFor: string;
  nearestStation: string;
  officialSite: string;
  whyPeopleLoveIt: string;
  tipsForVisitors: string[];
  highlightTitle?: string;
}

export interface Guide {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  categorySlug: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  tableOfContents?: { title: string; anchor: string }[];
}

export interface Destination {
  name: string;
  slug: string;
}

export interface GuideCategory {
  name: string;
  slug: string;
  icon: string;
  count: number;
}

export interface Session {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  permissions: string[];
}
