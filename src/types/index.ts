export type ProductStatus = 'in-stock' | 'limited' | 'out-of-stock';

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  status: ProductStatus;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  date: string;
  status: 'new' | 'read';
}

export interface Testimonial {
  quote: string;
  author: string;
  title: string;
  rating: number;
}

export interface HomeContent {
  hero: {
    enabled: boolean;
    brandName: string;
    tagline: string;
    primaryCta: string;
    secondaryCta: string;
    backgroundImage: string;
  };
  featuredProducts: string[];
  stats: {
    years: string;
    brands: string;
    countries: string;
  };
  testimonials: Testimonial[];
}

export interface SiteSettings {
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  businessAddress: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}
