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

export default function Hero() {
  return (
    <HeroSection>
      <Container maxWidth="lg">
        <ContentWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="text-gradient">Products</span>
            </h1>
            <p className="text-lg md:text-xl text-secondary max-w-3xl">
              Discover our suite of solutions designed to bridge the talent gap and empower organizations to thrive.
            </p>
          </motion.div>

          {/* Decorative Elements */}
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
        </ContentWrapper>
      </Container>
    </HeroSection>
  );
}