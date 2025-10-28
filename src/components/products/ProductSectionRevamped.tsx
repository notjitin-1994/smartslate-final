'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Product } from '@/lib/types/products';

interface ProductSectionRevampedProps {
  product: Product;
  reverse?: boolean;
  children?: ReactNode;
}

const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(10)} 0`,
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(8)} 0`,
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(6)} 0`,
  },
}));

const BackgroundDecoration = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'reverse',
})<{ reverse?: boolean }>(({ theme, reverse }) => ({
  position: 'absolute',
  top: '20%',
  [reverse ? 'left' : 'right']: '-10%',
  width: '600px',
  height: '600px',
  background: reverse
    ? 'radial-gradient(circle, rgba(79, 70, 229, 0.05) 0%, transparent 70%)'
    : 'radial-gradient(circle, rgba(167, 218, 219, 0.05) 0%, transparent 70%)',
  borderRadius: '50%',
  pointerEvents: 'none',
  [theme.breakpoints.down('md')]: {
    width: '400px',
    height: '400px',
  },
}));

const ContentGrid = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'reverse',
})<{ reverse?: boolean }>(({ theme, reverse }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(8),
  alignItems: 'center',
  [theme.breakpoints.down('lg')]: {
    gap: theme.spacing(6),
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(6),
  },
}));

const ContentColumn = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'reverse',
})<{ reverse?: boolean }>(({ theme, reverse }) => ({
  order: reverse ? 2 : 1,
  [theme.breakpoints.down('md')]: {
    order: 1,
  },
}));

const VisualColumn = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'reverse',
})<{ reverse?: boolean }>(({ theme, reverse }) => ({
  order: reverse ? 1 : 2,
  [theme.breakpoints.down('md')]: {
    order: 2,
  },
}));

const StatusBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  backgroundColor: 'rgba(167, 218, 219, 0.1)',
  color: theme.palette.primary.main,
  borderRadius: theme.spacing(4),
  border: '1px solid rgba(167, 218, 219, 0.2)',
  fontSize: '0.875rem',
  fontWeight: 600,
  marginBottom: theme.spacing(3),
}));

const ProductHeading = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  fontFamily: theme.typography.h2.fontFamily,
  lineHeight: 1.2,
}));

const ProductTagline = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(3),
  lineHeight: 1.4,
}));

const ProductDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.8,
  marginBottom: theme.spacing(4),
}));

const FeaturesList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.02)',
  borderRadius: theme.spacing(1.5),
  border: '1px solid rgba(255, 255, 255, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.04)',
    borderColor: 'rgba(167, 218, 219, 0.2)',
    transform: 'translateX(8px)',
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  width: '24px',
  height: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  marginTop: '2px',
  '& svg': {
    width: '100%',
    height: '100%',
  },
}));

const FeatureText = styled(Typography)(({ theme }) => ({
  fontSize: '0.9375rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.7,
  '& strong': {
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
}));

const VisualContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(6),
  border: '1px solid rgba(255, 255, 255, 0.08)',
  minHeight: '450px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.05) 0%, rgba(79, 70, 229, 0.05) 100%)',
    opacity: 0,
    transition: 'opacity 0.4s ease',
    pointerEvents: 'none',
  },
  '&:hover': {
    borderColor: 'rgba(167, 218, 219, 0.2)',
    boxShadow: '0 20px 48px rgba(0, 0, 0, 0.3)',
    '&::before': {
      opacity: 1,
    },
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4),
    minHeight: '350px',
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: '#ffffff',
  padding: `${theme.spacing(1.75)} ${theme.spacing(4)}`,
  fontSize: '1rem',
  fontWeight: 600,
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(79, 70, 229, 0.3)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  '&:focus-visible': {
    outline: `3px solid ${theme.palette.primary.main}`,
    outlineOffset: '3px',
  },
  '& svg': {
    width: '20px',
    height: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    justifyContent: 'center',
  },
}));

export default function ProductSectionRevamped({
  product,
  reverse = false,
  children,
}: ProductSectionRevampedProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <SectionWrapper ref={ref}>
      <BackgroundDecoration reverse={reverse} />

      <Container maxWidth="lg">
        <ContentGrid reverse={reverse}>
          {/* Content Column */}
          <ContentColumn reverse={reverse}>
            <motion.div
              initial={{ opacity: 0, x: reverse ? 40 : -40 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: reverse ? 40 : -40 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Status Badge */}
              {product.status === 'coming-soon' && (
                <StatusBadge>Coming Soon</StatusBadge>
              )}

              {/* Product Heading */}
              <ProductHeading>{product.heading}</ProductHeading>

              {/* Tagline */}
              <ProductTagline>{product.tagline}</ProductTagline>

              {/* Description */}
              <ProductDescription>{product.description}</ProductDescription>

              {/* Features */}
              <FeaturesList>
                {product.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  >
                    <FeatureItem>
                      <FeatureIcon>{feature.icon}</FeatureIcon>
                      <FeatureText dangerouslySetInnerHTML={{ __html: feature.text }} />
                    </FeatureItem>
                  </motion.div>
                ))}
              </FeaturesList>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link href={product.cta.link || '/contact'} style={{ textDecoration: 'none' }}>
                  <CTAButton>
                    {product.cta.text}
                    {product.cta.icon}
                  </CTAButton>
                </Link>
              </motion.div>
            </motion.div>
          </ContentColumn>

          {/* Visual Column */}
          <VisualColumn reverse={reverse}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: '100%' }}
            >
              <VisualContainer>
                {children || (
                  <Box
                    sx={{
                      textAlign: 'center',
                      color: 'text.disabled',
                      fontSize: '1.25rem',
                      fontWeight: 600,
                    }}
                  >
                    {product.heading} Visual
                  </Box>
                )}
              </VisualContainer>
            </motion.div>
          </VisualColumn>
        </ContentGrid>
      </Container>
    </SectionWrapper>
  );
}
