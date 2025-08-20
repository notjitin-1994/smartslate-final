'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types/products';
import ProductSection from './ProductSection';
import { renderProductVisual } from '@/lib/utils/productMapping';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const ListWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
}));

const SectionWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: `${theme.spacing(8)} 0`,
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(6)} 0`,
  },
}));

interface ProductListProps {
  products: Product[];
  layout?: 'default' | 'compact' | 'grid' | 'carousel';
  showVisuals?: boolean;
  containerMaxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children?: ReactNode;
}

export default function ProductList({
  products,
  layout = 'default',
  showVisuals = true,
  containerMaxWidth = 'lg',
  className,
  children
}: ProductListProps) {
  if (layout === 'compact') {
    return (
      <ListWrapper className={className}>
        <Container maxWidth={containerMaxWidth}>
          <div className="space-y-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect-strong rounded-xl p-6"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-1">
                    {product.status === 'coming-soon' && (
                      <span className="inline-block px-3 py-1 text-xs font-medium text-primary-accent bg-primary-accent/10 rounded-full border border-primary-accent/20 mb-3">
                        Coming Soon
                      </span>
                    )}
                    <h3 className="text-xl font-bold mb-2">{product.heading}</h3>
                    <p className="text-primary-accent font-medium mb-3">{product.tagline}</p>
                    <p className="text-secondary text-sm mb-4">{product.description}</p>
                    
                    {product.oneLinerFeatures && (
                      <div className="space-y-2 mb-4">
                        {product.oneLinerFeatures.slice(0, 2).map((feature, idx) => (
                          <div key={idx} className="flex gap-2 items-start">
                            <div className="flex-shrink-0 text-primary-accent mt-0.5">{feature.icon}</div>
                            <p className="text-sm text-secondary">{feature.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {showVisuals && (
                    <div className="w-full md:w-48 h-32 glass-effect-strong rounded-lg flex items-center justify-center">
                      {renderProductVisual(product)}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </ListWrapper>
    );
  }

  if (layout === 'grid') {
    return (
      <ListWrapper className={className}>
        <Container maxWidth={containerMaxWidth}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-effect-strong rounded-xl p-6 h-full flex flex-col"
              >
                {product.status === 'coming-soon' && (
                  <span className="inline-block px-3 py-1 text-xs font-medium text-primary-accent bg-primary-accent/10 rounded-full border border-primary-accent/20 mb-3 self-start">
                    Coming Soon
                  </span>
                )}
                
                <h3 className="text-lg font-bold mb-2">{product.heading}</h3>
                <p className="text-primary-accent font-medium text-sm mb-3">{product.tagline}</p>
                <p className="text-secondary text-sm mb-4 flex-1">{product.description}</p>
                
                {product.oneLinerFeatures && (
                  <div className="space-y-2 mb-4">
                    {product.oneLinerFeatures.slice(0, 2).map((feature, idx) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <div className="flex-shrink-0 text-primary-accent mt-0.5">{feature.icon}</div>
                        <p className="text-xs text-secondary">{feature.text}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {showVisuals && (
                  <div className="w-full h-24 glass-effect-strong rounded-lg flex items-center justify-center mb-4">
                    {renderProductVisual(product)}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </ListWrapper>
    );
  }

  // Default layout - full product sections
  return (
    <ListWrapper className={className}>
      {children}
      {products.map((product, index) => (
        <SectionWrapper key={product.id}>
          <Container maxWidth={containerMaxWidth}>
            <ProductSection
              product={product}
              reverse={product.reverse}
            >
              {showVisuals && renderProductVisual(product)}
            </ProductSection>
          </Container>
        </SectionWrapper>
      ))}
    </ListWrapper>
  );
}
