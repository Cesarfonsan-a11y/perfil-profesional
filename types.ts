
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Skill {
  name: string;
  level: SkillLevel;
}

export type SimulatorType = 'inventory' | 'oee' | 'churn' | null;

export interface JourneyStage {
  title: string;
  situation: string;
  need: string;
  opportunity: string;
}

export interface ValueProp {
  service: string;
  impact: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  image: string;
  link: string;
  tags: string[]; // Technologies used
  results: string[]; // Key achievements/metrics
  simulatorType?: SimulatorType;
  journeyMap?: JourneyStage[];
  valueProps?: ValueProp[];
  videoUrl?: string;
}

export interface BlogPost {
  id: string;
  category: string;
  title: string;
  image: string;
  readTime: string;
  hook: string; // The narrative intro
  insightTitle: string;
  insightContent: string; // The core knowledge/metaphors
  steps: string[]; // Actionable steps
  outcome: string; // The transformation
  ctaText: string;
}

export interface SocialLink {
  provider: 'linkedin' | 'github' | 'twitter' | 'website' | 'email' | 'whatsapp';
  url: string;
}

export interface ContactInfo {
  email: string;
  phone: string | null;
  links: SocialLink[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  text: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: 'strategy' | 'code' | 'education' | 'startup' | 'ml';
  isFeatured?: boolean;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  logo: string;
}

export interface ProfileData {
  id: string;
  name: string;
  title: string;
  photo: string;
  summary: string;
  about: string;
  skills: Skill[];
  projects: Project[];
  services: Service[];
  certifications: Certification[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
  contact: ContactInfo;
  cv: string;
  updatedAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
