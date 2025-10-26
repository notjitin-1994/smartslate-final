'use client';

import { motion } from 'framer-motion';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: 'auto',
  display: 'flex',
  alignItems: 'center',
  padding: `${theme.spacing(30)} 0 ${theme.spacing(12)} 0`,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(20)} 0 ${theme.spacing(8)} 0`,
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(18)} 0 ${theme.spacing(6)} 0`,
  },
}));

const BackgroundGradient = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '100%',
  pointerEvents: 'none',
  zIndex: 0,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '10%',
    right: '10%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(167, 218, 219, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    transform: 'translate(50%, -50%)',
    [theme.breakpoints.down('md')]: {
      width: '300px',
      height: '300px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '200px',
      height: '200px',
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '20%',
    left: '5%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(79, 70, 229, 0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    transform: 'translate(-50%, 50%)',
    [theme.breakpoints.down('md')]: {
      width: '350px',
      height: '350px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '250px',
      height: '250px',
    },
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  textAlign: 'left',
  zIndex: 1,
  position: 'relative',
}));

const GradientText = styled('span')(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}));

const SubtitleText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1.125rem',
  lineHeight: 1.75,
  maxWidth: '900px',
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9375rem',
  },
}));

export default function ProductHero() {
  return (
    <HeroSection>
      <BackgroundGradient />

      <Container maxWidth="lg">
        <ContentWrapper>
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                fontWeight: 700,
                marginBottom: 3,
                lineHeight: 1.1,
              }}
            >
              Our <Box component="span" sx={{ color: 'primary.main' }}>Products</Box>
            </Typography>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <SubtitleText>
              Discover our suite of solutions designed to bridge the talent gap and empower organizations to thrive.
              Smartslate delivers cutting-edge training programs that evolve with your business, ensuring your team stays ahead of industry demands.
            </SubtitleText>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              position: 'absolute',
              top: '20%',
              left: '10%',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(167, 218, 219, 0.1)',
              border: '1px solid rgba(167, 218, 219, 0.2)',
              filter: 'blur(1px)',
              zIndex: -1,
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              position: 'absolute',
              bottom: '15%',
              right: '15%',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(79, 70, 229, 0.08)',
              border: '1px solid rgba(79, 70, 229, 0.15)',
              filter: 'blur(1px)',
              zIndex: -1,
            }}
          />
        </ContentWrapper>
      </Container>
    </HeroSection>
  );
}
