import { Product } from '@/lib/types/products';
import IgniteInfographic from '@/components/products/IgniteInfographic';
import StrategicSkillsInfographic from '@/components/products/StrategicSkillsInfographic';
import SolaraInfographic from '@/components/products/SolaraInfographic';

// Map product IDs to their visual components
export const PRODUCT_VISUAL_MAP: Record<string, React.ComponentType> = {
  'ignite-series': IgniteInfographic,
  'strategic-skills-architecture': StrategicSkillsInfographic,
  'solara': SolaraInfographic,
};

// Get visual component for a product
export function getProductVisual(product: Product): React.ComponentType | null {
  return PRODUCT_VISUAL_MAP[product.id] || null;
}

// Check if a product has a visual component
export function hasProductVisual(product: Product): boolean {
  return product.id in PRODUCT_VISUAL_MAP;
}

// Get all products that have visual components
export function getProductsWithVisuals(products: Product[]): Product[] {
  return products.filter(hasProductVisual);
}

// Render product visual component
export function renderProductVisual(product: Product): React.ReactNode {
  const VisualComponent = getProductVisual(product);
  if (!VisualComponent) {
    return (
      <div className="text-center">
        <span className="text-2xl font-bold text-primary-accent/30">
          {product.heading} Visual
        </span>
      </div>
    );
  }
  return <VisualComponent />;
}
