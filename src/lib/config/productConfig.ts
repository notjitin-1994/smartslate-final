import { Product, ProductStatus } from '@/lib/types/products';

/**
 * Product Configuration System
 * Manages product visibility, feature flags, and environment-specific settings
 */

export interface ProductConfig {
  // Feature flags for products
  features: {
    enableProductSearch: boolean;
    enableProductCategories: boolean;
    enableProductAnalytics: boolean;
    enableProductComparison: boolean;
    enableProductReviews: boolean;
  };
  
  // Environment-specific settings
  environment: {
    showComingSoonProducts: boolean;
    enableProductPreviews: boolean;
    enableBetaFeatures: boolean;
    maxProductsPerPage: number;
  };
  
  // Product display rules
  display: {
    defaultSortOrder: 'priority' | 'name' | 'category' | 'status';
    enableProductFiltering: boolean;
    enableProductSorting: boolean;
    showProductMetadata: boolean;
    showProductPricing: boolean;
  };
  
  // SEO and metadata settings
  seo: {
    enableProductSchema: boolean;
    enableProductSitemap: boolean;
    enableProductCanonical: boolean;
    defaultMetaDescription: string;
  };
}

// Default configuration
export const defaultProductConfig: ProductConfig = {
  features: {
    enableProductSearch: true,
    enableProductCategories: true,
    enableProductAnalytics: true,
    enableProductComparison: false,
    enableProductReviews: false,
  },
  environment: {
    showComingSoonProducts: true,
    enableProductPreviews: true,
    enableBetaFeatures: false,
    maxProductsPerPage: 10,
  },
  display: {
    defaultSortOrder: 'priority',
    enableProductFiltering: true,
    enableProductSorting: true,
    showProductMetadata: true,
    showProductPricing: true,
  },
  seo: {
    enableProductSchema: true,
    enableProductSitemap: true,
    enableProductCanonical: true,
    defaultMetaDescription: 'Discover Smartslate\'s innovative learning solutions designed to bridge the talent gap and empower organizations.',
  },
};

// Environment-specific configurations
export const productConfigs: Record<string, Partial<ProductConfig>> = {
  development: {
    environment: {
      showComingSoonProducts: true,
      enableProductPreviews: true,
      enableBetaFeatures: true,
    },
    features: {
      enableProductComparison: true,
      enableProductReviews: true,
    },
  },
  staging: {
    environment: {
      showComingSoonProducts: true,
      enableProductPreviews: true,
      enableBetaFeatures: false,
    },
  },
  production: {
    environment: {
      showComingSoonProducts: false,
      enableProductPreviews: false,
      enableBetaFeatures: false,
    },
    features: {
      enableProductComparison: false,
      enableProductReviews: false,
    },
  },
};

/**
 * Get configuration for current environment
 */
export function getProductConfig(environment: string = 'development'): ProductConfig {
  const envConfig = productConfigs[environment] || {};
  
  return {
    ...defaultProductConfig,
    ...envConfig,
    features: {
      ...defaultProductConfig.features,
      ...envConfig.features,
    },
    environment: {
      ...defaultProductConfig.environment,
      ...envConfig.environment,
    },
    display: {
      ...defaultProductConfig.display,
      ...envConfig.display,
    },
    seo: {
      ...defaultProductConfig.seo,
      ...envConfig.seo,
    },
  };
}

/**
 * Check if a product should be displayed based on configuration
 */
export function shouldDisplayProductByConfig(
  product: Product, 
  config: ProductConfig
): boolean {
  // Check if product is active
  if (!product.isActive) return false;
  
  // Check coming-soon products based on environment
  if (product.status === 'coming-soon' && !config.environment.showComingSoonProducts) {
    return false;
  }
  
  // Add more configuration-based checks here
  return true;
}

/**
 * Get filtered products based on configuration
 */
export function getFilteredProducts(
  products: Product[], 
  config: ProductConfig
): Product[] {
  return products.filter(product => shouldDisplayProductByConfig(product, config));
}
