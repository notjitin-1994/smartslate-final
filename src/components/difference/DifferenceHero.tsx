'use client';

import { motion } from 'framer-motion';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: 'calc(100vh - 100px)', // Account for header space
  display: 'flex',
  alignItems: 'center',
  padding: `${theme.spacing(8)} 0`,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(6)} 0`,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'radial-gradient(ellipse at top right, rgba(167, 218, 219, 0.06) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  textAlign: 'left',
  zIndex: 1,
  position: 'relative',
  maxWidth: '100%',
}));

export default function DifferenceHero() {
  return (
    <HeroSection>
      <Container maxWidth="lg">
        <ContentWrapper>
          {/* Single, subtle background accent */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute -top-20 -right-20 w-[600px] h-[600px] pointer-events-none"
          >
            <div className="w-full h-full bg-gradient-to-br from-primary-accent/10 to-transparent rounded-full blur-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.1] tracking-tight text-left">
              The <span className="bg-gradient-to-r from-primary-accent via-primary-accent to-secondary-accent bg-clip-text text-transparent inline-block">SmartSlate</span> Difference
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-secondary mb-8 leading-[1.4] max-w-4xl font-light text-left">
              Where traditional training ends, transformative learning begins
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="max-w-3xl text-left"
          >
            <p className="text-base sm:text-lg md:text-xl text-primary-accent leading-relaxed">
              At SmartSlate, we don&apos;t just deliver training—we architect learning ecosystems that evolve with your organization. 
              Our approach transcends conventional boundaries, creating experiences that resonate, results that matter, and transformations that last.
            </p>
          </motion.div>

          {/* Refined scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 md:mt-20"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="inline-flex items-center justify-center w-10 h-10 border border-primary-accent/20 rounded-full bg-primary-accent/5 backdrop-blur-sm"
            >
              <svg className="w-4 h-4 text-primary-accent/80" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
            </motion.div>
          </motion.div>
        </ContentWrapper>
      </Container>
    </HeroSection>
  );
}