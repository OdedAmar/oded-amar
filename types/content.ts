export interface NavItem {
  label: string;
  href: string;
}

export interface WhyItWorksItem {
  title: string;
  description: string;
}

export interface Show {
  name: string;
  description: string;
  duration: string;
  suitableFor: string[];
  features: string[];
}

export interface WhatIncludedItem {
  icon: string;
  label: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
}

export interface ClientLogo {
  name: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SiteContent {
  seo: {
    title: string;
    description: string;
    ogImageUrl: string;
  };
  header: {
    logoUrl: string;
    ctaText: string;
    navItems: NavItem[];
  };
  hero: {
    headline: string;
    subheadline: string;
    valueProps: string[];
    ctaPrimary: string;
    ctaSecondary: string;
    videoButtonText: string;
    portraitUrl: string;
  };
  video: {
    youtubeId: string;
    headline: string;
    description: string;
  };
  whyItWorks: {
    headline: string;
    items: WhyItWorksItem[];
  };
  showTypes: {
    headline: string;
    shows: Show[];
  };
  whatIncluded: {
    headline: string;
    items: WhatIncludedItem[];
  };
  customization: {
    headline: string;
    text: string;
  };
  suitableFor: {
    headline: string;
    items: string[];
  };
  socialProof: {
    enabled: boolean;
    testimonials: Testimonial[];
    logos: ClientLogo[];
  };
  faq: {
    headline: string;
    items: FAQItem[];
  };
  contact: {
    headline: string;
    subheadline: string;
    ctaText: string;
    whatsappText: string;
    whatsappPhone: string;
    email: string;
  };
  footer: {
    tagline: string;
    phone: string;
    email: string;
    copyright: string;
  };
}

export interface Lead {
  id: string;
  createdAt: string;
  handled: boolean;
  fullName: string;
  phone: string;
  eventType: string;
  company?: string;
  email?: string;
  eventDate?: string;
  participants?: string;
  location?: string;
  packageInterest?: string;
  message?: string;
  source?: string;
}
