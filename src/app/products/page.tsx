'use client';

import { useState, useMemo } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Hero from "@/components/products/Hero";
import ProductList from "@/components/products/ProductList";
import SSAInterestModal from "@/components/products/SSAInterestModal";
import SolaraInterestModal from "@/components/products/SolaraInterestModal";
import { productRegistry } from '@/lib/data/products';
import { Product } from '@/lib/types/products';
import { useModalManager } from '@/hooks/useModalManager';

const PageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
}));

export default function ProductsPage() {
  // Get modal manager for global state
  const { modalStates } = useModalManager();
  
  // Get all active products directly without complex filtering
  const allProducts = useMemo(() => {
    return productRegistry.getActiveProducts();
  }, []);

  return (
    <PageWrapper>
      <Hero />
      
      {/* Product List */}
      <ProductList
        products={allProducts}
        layout="default"
        showVisuals={true}
        containerMaxWidth="lg"
      />
      
      {/* Modals */}
      <SSAInterestModal />
      <SolaraInterestModal />
    </PageWrapper>
  );
}
