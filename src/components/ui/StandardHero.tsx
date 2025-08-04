'use client';

import { motion } from 'framer-motion';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: 'calc(100vh - 100px)', // Account for header space
  display: 'flex',
  alignItems: 'center',
  padding: `${theme.spacing(0.16)} 0`, // Reduced by 80% from original 0.8
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(0.12)} 0`, // Reduced by 80% from original 0.6
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'radial-gradient(ellipse at top right, rgba(167, 218, 219, 0.1) 0%, transparent 50%), radial-gradient(ellipse at bottom left, rgba(79, 70, 229, 0.08) 0%, transparent 50%)',
    pointerEvents: 'none',
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
}

export default function StandardHero({ 
  title, 
  subtitle, 
  description, 
  accentWords = [],
  showScrollIndicator = false 
}: StandardHeroProps) {
  return (
    <HeroSection>
      <Container maxWidth="lg">
        <ContentWrapper>
          {/* Background decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute -top-10 -left-10 w-40 h-40 bg-primary-accent rounded-full blur-3xl opacity-10"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -bottom-10 -right-10 w-60 h-60 bg-secondary-accent rounded-full blur-3xl opacity-10"
          />

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight">
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
                className="text-lg sm:text-xl md:text-2xl text-primary mb-4 sm:mb-6 leading-relaxed max-w-4xl font-light"
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
                className="text-base sm:text-lg md:text-xl text-primary-accent leading-relaxed max-w-3xl"
              >
                {description}
              </motion.p>
            )}
          </motion.div>

          {/* Scroll indicator */}
          {showScrollIndicator && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 sm:mt-12 md:mt-16"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 border border-primary-accent/20 rounded-full bg-primary-accent/5 backdrop-blur-sm"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-accent/80" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </motion.div>
            </motion.div>
          )}
        </ContentWrapper>
      </Container>
    </HeroSection>
  );
} 