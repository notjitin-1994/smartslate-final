import { ReactNode } from 'react';

export interface ProductFeature {
  icon: ReactNode;
  text: string;
}

export interface ProductOneLinerFeature {
  icon: ReactNode;
  text: string;
}

export interface ProductCTA {
  text: string;
  link?: string;
  icon?: ReactNode;
  action?: 'openSSAModal' | 'openSolaraModal';
}

export interface ProductSecondaryCTA {
  text: string;
  link: string;
}

export type ProductStatus = 'live' | 'coming-soon';

export interface Product {
  id: string;
  slug: string;
  heading: string;
  tagline: string;
  description: string;
  features: ProductFeature[];
  oneLinerFeatures?: ProductOneLinerFeature[];
  cta: ProductCTA;
  secondaryCta?: ProductSecondaryCTA;
  status?: ProductStatus;
  reverse?: boolean;
  category: 'education' | 'custom' | 'platform';
  priority: number;
  isActive: boolean;
  metadata?: {
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string[];
    estimatedDevelopmentTime?: string;
    targetAudience?: string[];
    pricing?: {
      type: 'free' | 'paid' | 'enterprise' | 'custom';
      startingPrice?: number;
      currency?: string;
    };
  };
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  products: Product[];
}

export interface ProductRegistry {
  categories: ProductCategory[];
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductsByCategory: (categoryId: string) => Product[];
  getActiveProducts: () => Product[];
  getProductsByStatus: (status: ProductStatus) => Product[];
}
