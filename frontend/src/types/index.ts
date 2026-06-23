export interface NavItem {
  label: string;
  href: string;
  submenu?: NavItem[];
}

export interface HeroSection {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  buttons?: Array<{
    label: string;
    href: string;
    variant: 'primary' | 'secondary' | 'outline';
  }>;
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image?: string;
  date: string;
  author: string;
  category: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image?: string;
  email?: string;
  phone?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  image?: string;
  head: TeamMember;
  teachers: TeamMember[];
  subjects: string[];
  achievements: string[];
}

export interface Program {
  id: string;
  name: string;
  description: string;
  level: 'early-childhood' | 'primary' | 'junior-secondary' | 'senior-secondary' | 'technical';
  subjects: string[];
  image?: string;
  curriculum?: string;
}

export interface PageContent {
  id: string;
  title: string;
  slug: string;
  content: string;
  sections: Record<string, any>;
  metadata: {
    createdAt: string;
    updatedAt: string;
    updatedBy: string;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  createdAt: string;
}

export interface AdminSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  contactEmail: string;
  phone: string;
  address: string;
  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}
