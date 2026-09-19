// ─── Project ────────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  challenge?: string;
  solution?: string;
  keyFeatures?: string[];
  category: string;
  technologies: string[];
  image: string;
  gallery: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ProjectCategory = 'All' | 'E-commerce' | 'EdTech' | 'AI / SaaS' | 'Web';

// ─── Blog ────────────────────────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  authorAvatar?: string;
  publishedAt: string;
  readingTime: number;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type BlogCategory = 'All' | 'Development' | 'AI' | 'Web Development' | 'Business' | 'UI/UX' | 'Technology';

// ─── Service ─────────────────────────────────────────────────────────────────
export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  technologies: string[];
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Testimonial ─────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  message: string;
  rating: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Inquiry ─────────────────────────────────────────────────────────────────
export type InquiryStatus = 'New' | 'Contacted' | 'In Discussion' | 'Won' | 'Lost';

export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
}

// ─── Team ────────────────────────────────────────────────────────────────────
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Media ───────────────────────────────────────────────────────────────────
export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  createdAt: string;
}

// ─── Site Settings ───────────────────────────────────────────────────────────
export interface Stat {
  value: string;
  label: string;
}

export interface SiteSettings {
  // General
  companyName: string;
  tagline: string;
  email: string;
  phone?: string;
  location: string;
  // Homepage
  heroTitle: string;
  heroDescription: string;
  heroCTA: string;
  stats: Stat[];
  techBadges: string[];
  // Contact
  contactEmail: string;
  contactPhone?: string;
  contactLocation: string;
  availability: string;
  // Social
  github?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  // SEO
  metaTitle: string;
  metaDescription: string;
  ogImage?: string;
  // Footer
  footerDescription: string;
  copyright: string;
}

// ─── Auth ────────────────────────────────────────────────────────────────────
export type UserRole = 'admin' | 'editor' | 'viewer' | 'user';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ─── Generic ─────────────────────────────────────────────────────────────────
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
