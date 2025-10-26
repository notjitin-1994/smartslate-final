'use client';

import { useMemo } from 'react';
import { Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import ProductHero from "@/components/products/ProductHero";
import SolaraProductCards from "@/components/products/SolaraProductCards";
import ProductSectionRevamped from "@/components/products/ProductSectionRevamped";
import IgniteInfographic from "@/components/products/IgniteInfographic";
import StrategicSkillsInfographic from "@/components/products/StrategicSkillsInfographic";
import SSAInterestModal from "@/components/products/SSAInterestModal";
import SolaraInterestModal from "@/components/products/SolaraInterestModal";
import { productRegistry } from '@/lib/data/products';
import { useModalManager } from '@/hooks/useModalManager';

const PageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  background: theme.palette.background.default,
}));

const SectionDivider = styled(Divider)(({ theme }) => ({
  margin: `${theme.spacing(8)} 0`,
  borderColor: 'rgba(255, 255, 255, 0.08)',
  [theme.breakpoints.down('md')]: {
    margin: `${theme.spacing(6)} 0`,
  },
  [theme.breakpoints.down('sm')]: {
    margin: `${theme.spacing(4)} 0`,
  },
}));

export default function ProductsPage() {
  // Get modal manager for global state
  const { modalStates } = useModalManager();

  // Get specific products by ID
  const products = useMemo(() => ({
    ignite: productRegistry.getProductById('ignite-series'),
    ssa: productRegistry.getProductById('strategic-skills-architecture'),
  }), []);

  return (
    <PageWrapper>
      {/* Hero Section */}
      <ProductHero />

      {/* Section 1: Solara Product Suite (First) */}
      <SolaraProductCards />

      <SectionDivider />

      {/* Section 2: Ignite Series (Second) */}
      {products.ignite && (
        <ProductSectionRevamped product={products.ignite} reverse={false}>
          <IgniteInfographic />
        </ProductSectionRevamped>
      )}

      <SectionDivider />

      {/* Section 3: Strategic Skills Architecture (Third) */}
      {products.ssa && (
        <ProductSectionRevamped product={products.ssa} reverse={true}>
          <StrategicSkillsInfographic />
        </ProductSectionRevamped>
      )}

      {/* Modals */}
      <SSAInterestModal />
      <SolaraInterestModal />
    </PageWrapper>
  );
}
