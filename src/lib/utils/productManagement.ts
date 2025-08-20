import { Product, ProductStatus } from '@/lib/types/products';
import { productRegistry } from '@/lib/data/products';

/**
 * Product Management Utilities
 * Provides common operations for managing products across the application
 */

/**
 * Get products by multiple criteria
 */
export function getProductsByCriteria(criteria: {
  category?: string;
  status?: ProductStatus;
  isActive?: boolean;
  hasVisual?: boolean;
  limit?: number;
}): Product[] {
  let products = productRegistry.products;

  if (criteria.category) {
    products = products.filter(p => p.category === criteria.category);
  }

  if (criteria.status) {
    products = products.filter(p => p.status === criteria.status);
  }

  if (criteria.isActive !== undefined) {
    products = products.filter(p => p.isActive === criteria.isActive);
  }

  if (criteria.limit) {
    products = products.slice(0, criteria.limit);
  }

  return products.sort((a, b) => a.priority - b.priority);
}

/**
 * Get featured products (top priority active products)
 */
export function getFeaturedProducts(limit: number = 3): Product[] {
  return getProductsByCriteria({
    isActive: true,
    limit
  });
}

/**
 * Get products for a specific page or section
 */
export function getProductsForSection(sectionId: string): Product[] {
  const sectionProductMap: Record<string, string[]> = {
    'hero': ['ignite-series'], // Products to highlight in hero section
    'main': ['ignite-series', 'strategic-skills-architecture', 'solara'], // Main product showcase
    'coming-soon': ['solara'], // Products not yet available
    'enterprise': ['strategic-skills-architecture'], // Enterprise-focused products
    'education': ['ignite-series'], // Education-focused products
  };

  const productIds = sectionProductMap[sectionId] || [];
  return productIds
    .map(id => productRegistry.getProductById(id))
    .filter((p): p is Product => p !== undefined && p.isActive);
}

/**
 * Get related products (same category or similar features)
 */
export function getRelatedProducts(productId: string, limit: number = 2): Product[] {
  const product = productRegistry.getProductById(productId);
  if (!product) return [];

  return getProductsByCriteria({
    category: product.category,
    isActive: true,
    limit: limit + 1 // +1 to exclude the current product
  }).filter(p => p.id !== productId);
}

/**
 * Search products by text
 */
export function searchProducts(query: string): Product[] {
  const searchTerm = query.toLowerCase();
  
  return productRegistry.products.filter(product => 
    product.isActive && (
      product.heading.toLowerCase().includes(searchTerm) ||
      product.tagline.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.metadata?.keywords?.some(keyword => 
        keyword.toLowerCase().includes(searchTerm)
      ) ||
      product.metadata?.targetAudience?.some(audience => 
        audience.toLowerCase().includes(searchTerm)
      )
    )
  );
}

/**
 * Get product statistics
 */
export function getProductStats() {
  const products = productRegistry.products;
  
  return {
    total: products.length,
    active: products.filter(p => p.isActive).length,
    comingSoon: products.filter(p => p.status === 'coming-soon').length,
    byCategory: {
      education: products.filter(p => p.category === 'education').length,
      custom: products.filter(p => p.category === 'custom').length,
      platform: products.filter(p => p.category === 'platform').length,
    },
    byStatus: {
      live: products.filter(p => p.status === 'live' || !p.status).length,
      comingSoon: products.filter(p => p.status === 'coming-soon').length,
    }
  };
}

/**
 * Validate product data structure
 */
export function validateProduct(product: Partial<Product>): string[] {
  const errors: string[] = [];
  
  if (!product.id) errors.push('Product ID is required');
  if (!product.slug) errors.push('Product slug is required');
  if (!product.heading) errors.push('Product heading is required');
  if (!product.tagline) errors.push('Product tagline is required');
  if (!product.description) errors.push('Product description is required');
  if (!product.features || product.features.length === 0) {
    errors.push('Product must have at least one feature');
  }
  if (!product.cta) errors.push('Product CTA is required');
  if (!product.category) errors.push('Product category is required');
  if (product.priority === undefined) errors.push('Product priority is required');
  if (product.isActive === undefined) errors.push('Product active status is required');
  
  return errors;
}

/**
 * Get product breadcrumb data
 */
export function getProductBreadcrumbs(productId: string) {
  const product = productRegistry.getProductById(productId);
  if (!product) return [];
  
  return [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: product.heading, href: `/products/${product.slug}`, current: true }
  ];
}

/**
 * Check if a product should be displayed based on feature flags or conditions
 */
export function shouldDisplayProduct(product: Product, conditions?: {
  userRole?: string;
  featureFlags?: string[];
  environment?: string;
}): boolean {
  // Always check if product is active
  if (!product.isActive) return false;
  
  // Check environment-specific conditions
  if (conditions?.environment === 'production' && product.status === 'coming-soon') {
    return false; // Hide coming-soon products in production
  }
  
  // Add more conditional logic here as needed
  // e.g., role-based access, feature flag checks, etc.
  
  return true;
}
