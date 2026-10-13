export type Language = 'fr' | 'en' | 'ar';

export type ServiceCurrency = 'USD' | 'TND' | 'EUR' | 'GBP' | 'CAD';

export type ServicePrices = {
  USD?: number;
  TND?: number;
  EUR?: number;
  GBP?: number;
  CAD?: number;
};

export type LocalizedString = {
  fr: string;
  en: string;
  ar?: string;
  [key: string]: string | undefined;
};

export type LocalizedArray = {
  fr: string[];
  en: string[];
  ar?: string[];
  [key: string]: string[] | undefined;
};

export interface ServiceItem {
  id: string;
  slug: string;
  title: LocalizedString;
  shortDescription: LocalizedString;
  fullDescription: LocalizedString;
  iconName: string;
  technologies: string[];
  deliverables: LocalizedArray;
  benefits: LocalizedArray;
  category: 'web' | 'ecommerce' | 'cms' | 'custom' | 'perf' | string;
  priceStartingEUR?: number;
  priceStartingTND?: number;
  priceStartingUSD?: number;
  priceStartingGBP?: number;
  priceStartingCAD?: number;
  prices?: ServicePrices;
  active?: boolean;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  domain: string;
  liveUrl: string;
  category: 'institutionnel' | 'ecommerce' | 'formation' | 'portal' | 'vitrine' | string;
  categoryLabel: LocalizedString;
  imageUrl: string;
  description: LocalizedString;
  context: LocalizedString;
  objectives: LocalizedArray;
  solution: LocalizedArray;
  technologies: string[];
  role: LocalizedString;
  features: LocalizedArray;
  verifiedResults: LocalizedString;
  published?: boolean;
}

export interface FAQItem {
  question: LocalizedString;
  answer: LocalizedString;
  category?: string;
}

export interface BlogPostItem {
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedArray;
  category: 'creation-site-web' | 'wordpress' | 'e-commerce' | 'seo' | string;
  categoryLabel: LocalizedString;
  readTime: string;
  publishDate: string;
  author: string;
  imageUrl?: string;
  tags?: LocalizedArray;
  published?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: LocalizedString;
  company: string;
  location: LocalizedString;
  projectSlug?: string;
  projectTitle?: LocalizedString;
  rating: number;
  date: string;
  feedback: LocalizedString;
  highlightMetric?: LocalizedString;
}

export interface NewsletterSubscription {
  email: string;
  subscribedAt: string;
  lang: Language;
}

export interface NewsletterResult {
  success: boolean;
  message?: string;
  error?: 'REQUIRED' | 'INVALID_EMAIL' | 'ALREADY_SUBSCRIBED' | 'SERVER_ERROR';
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  honeypot?: string; // anti-spam
}
