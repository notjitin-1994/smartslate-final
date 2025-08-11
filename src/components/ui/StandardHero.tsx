'use client';

import { motion } from 'framer-motion';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { ReactNode } from 'react';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: 'auto', // Remove fixed height constraint
  display: 'flex',
  alignItems: 'center',
  padding: `${theme.spacing(30)} 0`, // Increased top padding for header clearance
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(18)} 0`, // Increased top padding for header clearance
  },
  // Remove the problematic radial-gradient from ::before
  // and use individual positioned elements instead
}));

const BackgroundGradient = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '100%',
  pointerEvents: 'none',
  zIndex: 0,
  // Use multiple smaller gradients instead of one large radial-gradient
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '10%',
    right: '10%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(167, 218, 219, 0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    transform: 'translate(50%, -50%)',
    [theme.breakpoints.down('md')]: {
      width: '200px',
      height: '200px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '150px',
      height: '150px',
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '20%',
    left: '5%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(79, 70, 229, 0.06) 0%, transparent 70%)',
    borderRadius: '50%',
    transform: 'translate(-50%, 50%)',
    [theme.breakpoints.down('md')]: {
      width: '250px',
      height: '250px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '180px',
      height: '180px',
    },
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  textAlign: 'left',
  zIndex: 1,
  position: 'relative',
}));

interface StandardHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  accentWords?: string[];
  showScrollIndicator?: boolean;
  children?: ReactNode;
}

export default function StandardHero({ 
  title, 
  subtitle, 
  description, 
  accentWords = [],
  showScrollIndicator = false,
  children,
}: StandardHeroProps) {
  return (
    <HeroSection>
      {/* Add the new background gradient component */}
      <BackgroundGradient />
      
      <Container maxWidth="lg">
        <ContentWrapper>
          {/* Background decorative elements - improved for Safari/iPad */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute -top-10 -left-10 w-40 h-40 bg-primary-accent rounded-full opacity-10"
            style={{
              // Use transform3d for hardware acceleration on Safari
              transform: 'translate3d(0, 0, 0)',
              // Add webkit prefix for better Safari support
              WebkitTransform: 'translate3d(0, 0, 0)',
              // Use a more Safari-friendly blur approach
              filter: 'blur(60px)',
              WebkitFilter: 'blur(60px)',
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -bottom-10 -right-10 w-60 h-60 bg-secondary-accent rounded-full opacity-10"
            style={{
              // Use transform3d for hardware acceleration on Safari
              transform: 'translate3d(0, 0, 0)',
              // Add webkit prefix for better Safari support
              WebkitTransform: 'translate3d(0, 0, 0)',
              // Use a more Safari-friendly blur approach
              filter: 'blur(80px)',
              WebkitFilter: 'blur(80px)',
            }}
          />

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight tracking-tight">
              {title.split(' ').map((word, index) => {
                const isAccent = accentWords.some(accent => 
                  word.toLowerCase().includes(accent.toLowerCase())
                );
                return (
                  <span key={index} className={isAccent ? 'text-primary-accent' : ''}>
                    {word}{' '}
                  </span>
                );
              })}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl text-primary mb-3 sm:mb-4 leading-relaxed font-light"
              >
                {subtitle}
              </motion.p>
            )}

            {/* Description */}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-primary-accent leading-relaxed mb-4"
              >
                {description}
              </motion.p>
            )}

            {/* Inline children (e.g., CTAs) right under the text with minimal spacing */}
            {children && (
              <div className="mt-2">
                {children}
              </div>
            )}
          </motion.div>

          {/* Scroll indicator removed */}
        </ContentWrapper>
      </Container>
    </HeroSection>
  );
} 