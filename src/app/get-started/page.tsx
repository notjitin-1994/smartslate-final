'use client';

import { motion } from 'framer-motion';
import { Box, Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RocketLaunch } from '@mui/icons-material';
import { productRegistry } from '@/lib/data/products';

const PageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  background: theme.palette.background.default,
}));

const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(15)} 0`,
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(10)} 0`,
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(8)} 0`,
  },
}));

const SectionDivider = styled(Box)(({ theme }) => ({
  height: '1px',
  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
  margin: `${theme.spacing(4)} 0`,
  [theme.breakpoints.down('md')]: {
    margin: `${theme.spacing(3)} 0`,
  },
}));

const ContentGrid = styled(Box)(({ theme }) => ({
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

const ContentColumn = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    order: 1,
  },
}));

const VisualColumn = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    order: 2,
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

const AnimatedGraphic = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& svg': {
    width: '100%',
    height: '100%',
    maxWidth: '280px',
    maxHeight: '280px',
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

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: 'auto',
  display: 'flex',
  alignItems: 'center',
  padding: `${theme.spacing(20)} 0 ${theme.spacing(10)} 0`,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(15)} 0 ${theme.spacing(6)} 0`,
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(12)} 0 ${theme.spacing(4)} 0`,
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

const StepIndicator = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  color: '#000000',
  fontWeight: 700,
  fontSize: '1.25rem',
  marginBottom: theme.spacing(2),
}));

const StepTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

const StepDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
  marginBottom: theme.spacing(3),
}));

export default function GetStartedPage() {
  const router = useRouter();

  // Get specific products by ID
  const products = {
    solara: productRegistry.getProductById('solara'),
    ignite: productRegistry.getProductById('ignite-series'),
    ssa: productRegistry.getProductById('strategic-skills-architecture'),
  };

  const handleSolaraCtaClick = () => {
    // Redirect to solara.smartslate.io
    window.open('https://solara.smartslate.io', '_blank');
  };

  const handleIgniteCtaClick = () => {
    // Navigate to ignite page
    router.push('/ignite');
  };

  return (
    <PageWrapper>
      {/* Hero Section */}
      <HeroSection>
        <BackgroundGradient />
        <Container maxWidth="lg">
          <ContentWrapper>
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
                Start Your <Box component="span" sx={{ color: 'primary.main' }}>Learning Journey</Box>
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <SubtitleText>
                Choose your path to transformation. Whether you&apos;re an individual looking to enhance your skills,
                an organization seeking custom learning solutions, or ready to experience the future of learning platforms,
                we have the perfect starting point for you.
              </SubtitleText>
            </motion.div>

            {/* Journey Steps */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 4, mt: 6, mb: 4 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <StepIndicator>1</StepIndicator>
                <StepTitle>Choose Your Path</StepTitle>
                <StepDescription>Select the solution that best fits your learning goals</StepDescription>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <StepIndicator>2</StepIndicator>
                <StepTitle>Get Started</StepTitle>
                <StepDescription>Sign up, explore courses, or schedule a consultation</StepDescription>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <StepIndicator>3</StepIndicator>
                <StepTitle>Transform</StepTitle>
                <StepDescription>Begin your journey toward enhanced skills and capabilities</StepDescription>
              </motion.div>
            </Box>
          </ContentWrapper>
        </Container>
      </HeroSection>

      {/* Section 1: Solara */}
      <SectionWrapper>
        <BackgroundDecoration />
        <Container maxWidth="lg">
          <ContentGrid>
            <ContentColumn>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                {products.solara?.status === 'coming-soon' && (
                  <StatusBadge>Coming Soon</StatusBadge>
                )}

                <ProductHeading>{products.solara?.heading}</ProductHeading>
                <ProductTagline>The complete AI-powered learning lifecycle</ProductTagline>
                <ProductDescription>
                  From initial needs analysis to measurable outcomes, Solara&apos;s integrated suite transforms how learning is designed, delivered, and optimized. Experience the full power of AI across every stage of the learning journey.
                </ProductDescription>

                <FeaturesList>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <FeatureItem>
                      <FeatureIcon>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </FeatureIcon>
                      <FeatureText>
                        <strong>Polaris - Blueprint Generation:</strong> Transform ideas into launch-ready learning blueprints in hours, not weeks. AI-driven needs analysis captures 100% of requirements with zero revision cycles.
                      </FeatureText>
                    </FeatureItem>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <FeatureItem>
                      <FeatureIcon>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                        </svg>
                      </FeatureIcon>
                      <FeatureText>
                        <strong>Constellation - Content Architecture:</strong> Intelligently structures complex content into coherent learning pathways. Creates logical sequences that maximize comprehension and retention.
                      </FeatureText>
                    </FeatureItem>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <FeatureItem>
                      <FeatureIcon>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </FeatureIcon>
                      <FeatureText>
                        <strong>Nova - AI Content Authoring:</strong> Turns subject matter expertise into engaging learning experiences. Generates production-ready content that matches your brand voice and pedagogical standards.
                      </FeatureText>
                    </FeatureItem>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <FeatureItem>
                      <FeatureIcon>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </FeatureIcon>
                      <FeatureText>
                        <strong>Orbit - Adaptive Delivery:</strong> Personalizes every learner&apos;s journey based on their unique needs, pace, and progress. Real-time adaptation ensures optimal engagement and outcomes.
                      </FeatureText>
                    </FeatureItem>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <FeatureItem>
                      <FeatureIcon>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </FeatureIcon>
                      <FeatureText>
                        <strong>Spectrum - Learning Intelligence:</strong> Transforms data into actionable insights that drive measurable outcomes. Predict trends, identify gaps, and optimize learning strategies with AI-powered analytics.
                      </FeatureText>
                    </FeatureItem>
                  </motion.div>
                </FeaturesList>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <CTAButton onClick={handleSolaraCtaClick}>
                    Explore Solara Learning Engine
                    <RocketLaunch />
                  </CTAButton>
                </motion.div>
              </motion.div>
            </ContentColumn>

            <VisualColumn>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                style={{ height: '100%' }}
              >
                <VisualContainer>
                  <AnimatedGraphic>
                    {/* Solara Platform - AI-powered learning platform visualization */}
                    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Background circle */}
                      <circle cx="100" cy="100" r="90" stroke="rgba(167, 218, 219, 0.2)" strokeWidth="1" fill="rgba(167, 218, 219, 0.05)" />
                      
                      {/* Central core representing AI */}
                      <motion.circle
                        cx="100"
                        cy="100"
                        r="25"
                        fill="rgba(79, 70, 229, 0.8)"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Orbiting data points */}
                      {[0, 120, 240].map((angle, index) => (
                        <motion.circle
                          key={index}
                          cx={100 + 60 * Math.cos((angle * Math.PI) / 180)}
                          cy={100 + 60 * Math.sin((angle * Math.PI) / 180)}
                          r="4"
                          fill="#A7DADB"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.5,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                      
                      {/* Connecting lines */}
                      {[0, 120, 240].map((angle, index) => (
                        <motion.line
                          key={index}
                          x1={100}
                          y1={100}
                          x2={100 + 40 * Math.cos((angle * Math.PI) / 180)}
                          y2={100 + 40 * Math.sin((angle * Math.PI) / 180)}
                          stroke="rgba(167, 218, 219, 0.4)"
                          strokeWidth="1"
                          animate={{
                            opacity: [0.4, 0.8, 0.4],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.5,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </svg>
                  </AnimatedGraphic>
                </VisualContainer>
              </motion.div>
            </VisualColumn>
          </ContentGrid>
        </Container>
      </SectionWrapper>

      <SectionDivider />

      {/* Section 2: Ignite Series */}
      <SectionWrapper>
        <BackgroundDecoration reverse={true} />
        <Container maxWidth="lg">
          <ContentGrid>
            <VisualColumn>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                style={{ height: '100%' }}
              >
                <VisualContainer>
                  <AnimatedGraphic>
                    {/* Ignite Series - Career acceleration visualization */}
                    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Background circle */}
                      <circle cx="100" cy="100" r="90" stroke="rgba(79, 70, 229, 0.2)" strokeWidth="1" fill="rgba(79, 70, 229, 0.05)" />
                      
                      {/* Central flame representing growth */}
                      <motion.path
                        d="M100,70 Q90,50 100,30 T100,70"
                        stroke="rgba(255, 167, 218, 0.8)"
                        strokeWidth="3"
                        fill="none"
                        animate={{
                          pathLength: [0, 100],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Orbiting achievement points */}
                      {[45, 135, 225, 315].map((angle, index) => (
                        <motion.circle
                          key={index}
                          cx={100 + 50 * Math.cos((angle * Math.PI) / 180)}
                          cy={100 + 50 * Math.sin((angle * Math.PI) / 180)}
                          r="6"
                          fill="#FFA718"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: index * 0.4,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                      
                      {/* Connecting paths */}
                      {[45, 135, 225, 315].map((angle, index) => (
                        <motion.path
                          key={index}
                          d={`M100,100 Q${100 + 35 * Math.cos((angle * Math.PI) / 180)},${100 + 35 * Math.sin((angle * Math.PI) / 180)} ${100 + 50 * Math.cos((angle * Math.PI) / 180)},${100 + 50 * Math.sin((angle * Math.PI) / 180)}`}
                          stroke="rgba(255, 167, 218, 0.4)"
                          strokeWidth="2"
                          fill="none"
                          animate={{
                            opacity: [0.3, 0.7, 0.3],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: index * 0.4,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </svg>
                  </AnimatedGraphic>
                </VisualContainer>
              </motion.div>
            </VisualColumn>

            <ContentColumn>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <ProductHeading>{products.ignite?.heading}</ProductHeading>
                <ProductTagline>Ready to accelerate your career?</ProductTagline>
                <ProductDescription>
                  Explore our industry-validated courses designed to bridge the gap between academic knowledge
                  and real-world impact. Start building in-demand skills today.
                </ProductDescription>

                <FeaturesList>
                  {products.ignite?.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                      viewport={{ once: true }}
                    >
                      <FeatureItem>
                        <FeatureIcon>{feature.icon}</FeatureIcon>
                        <FeatureText dangerouslySetInnerHTML={{ __html: feature.text }} />
                      </FeatureItem>
                    </motion.div>
                  ))}
                </FeaturesList>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <CTAButton onClick={handleIgniteCtaClick}>
                    Explore Ignite Series
                    {products.ignite?.cta.icon}
                  </CTAButton>
                </motion.div>
              </motion.div>
            </ContentColumn>
          </ContentGrid>
        </Container>
      </SectionWrapper>

      <SectionDivider />

      {/* Section 3: Strategic Skills Architecture */}
      <SectionWrapper>
        <BackgroundDecoration />
        <Container maxWidth="lg">
          <ContentGrid>
            <ContentColumn>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <ProductHeading>{products.ssa?.heading}</ProductHeading>
                <ProductTagline>Ready for a custom solution?</ProductTagline>
                <ProductDescription>
                  Let&apos;s architect learning experiences tailored to your organization&apos;s unique challenges and vision.
                  Schedule a consultation to build your strategic skills architecture.
                </ProductDescription>

                <FeaturesList>
                  {products.ssa?.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                      viewport={{ once: true }}
                    >
                      <FeatureItem>
                        <FeatureIcon>{feature.icon}</FeatureIcon>
                        <FeatureText dangerouslySetInnerHTML={{ __html: feature.text }} />
                      </FeatureItem>
                    </motion.div>
                  ))}
                </FeaturesList>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Link href="/strategic-skills-architecture" passHref style={{ textDecoration: 'none' }}>
                    <CTAButton>
                      Explore Strategic Skills Architecture
                      {products.ssa?.cta.icon}
                    </CTAButton>
                  </Link>
                </motion.div>
              </motion.div>
            </ContentColumn>

            <VisualColumn>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                style={{ height: '100%' }}
              >
                <VisualContainer>
                  <AnimatedGraphic>
                    {/* Strategic Skills Architecture - Custom learning solution visualization */}
                    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Background hexagon */}
                      <motion.polygon
                        points="100,40 140,70 140,130 100,70 60,130 100,40"
                        stroke="rgba(167, 218, 219, 0.2)"
                        strokeWidth="1"
                        fill="rgba(167, 218, 219, 0.05)"
                        animate={{
                          rotate: [0, 5, 0],
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Central core representing customization */}
                      <motion.circle
                        cx="100"
                        cy="100"
                        r="20"
                        fill="rgba(79, 70, 229, 0.8)"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Orbiting skill modules */}
                      {[0, 60, 120, 180, 240, 300].map((angle, index) => (
                        <motion.rect
                          key={index}
                          x={100 + 35 * Math.cos((angle * Math.PI) / 180) - 8}
                          y={100 + 35 * Math.sin((angle * Math.PI) / 180) - 8}
                          width="16"
                          height="16"
                          rx="4"
                          fill="#A7DADB"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                      
                      {/* Connecting lines */}
                      {[0, 60, 120, 180, 240, 300].map((angle, index) => (
                        <motion.line
                          key={index}
                          x1={100 + 20 * Math.cos((angle * Math.PI) / 180)}
                          y1={100 + 20 * Math.sin((angle * Math.PI) / 180)}
                          x2={100 + 35 * Math.cos((angle * Math.PI) / 180)}
                          y2={100 + 35 * Math.sin((angle * Math.PI) / 180)}
                          stroke="rgba(167, 218, 219, 0.4)"
                          strokeWidth="1"
                          animate={{
                            opacity: [0.4, 0.8, 0.4],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </svg>
                  </AnimatedGraphic>
                </VisualContainer>
              </motion.div>
            </VisualColumn>
          </ContentGrid>
        </Container>
      </SectionWrapper>

    </PageWrapper>
  );
}