'use client';

import { useState, useRef } from 'react';
import { Box, Container, Card, CardContent, Typography, Button, Chip, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, useInView } from 'framer-motion';
import StandardHero from '@/components/ui/StandardHero';
import Link from 'next/link';
import { 
  Check, 
  Star, 
  TrendingUp, 
  Support, 
  Security,
  AutoAwesome,
  Layers,
  SmartToy,
  Speed,
  CloudSync,
  People,
  BarChart,
  Lock,
  EmojiObjects,
  Rocket,
  AccessTime,
  Storage,
  Api,
  Settings,
  VerifiedUser,
  Assessment,
  Schedule,
  GroupWork
} from '@mui/icons-material';
import {
  PageWrapper,
  SectionWrapper,
  ContentCard,
  PrimaryButton,
  AccentText,
  AnimatedChip,
  StatCard,
  StatNumber,
} from '@/components/landing/styles/LandingStyles';
import DemoModal from '@/components/landing/DemoModal';
import { useModalManager } from '@/hooks/useModalManager';

const PricingCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'featured' && prop !== 'comingSoon',
})<{ featured?: boolean; comingSoon?: boolean }>(({ theme, featured, comingSoon }) => ({
  height: '100%',
  backgroundColor: featured 
    ? 'rgba(167, 218, 219, 0.05)' 
    : 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: featured 
    ? `2px solid ${theme.palette.primary.main}` 
    : `1px solid rgba(255, 255, 255, 0.08)`,
  borderRadius: '20px',
  position: 'relative',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: featured 
    ? '0 20px 60px rgba(167, 218, 219, 0.3)' 
    : '0 8px 32px rgba(0, 0, 0, 0.2)',
  overflow: 'hidden',
  opacity: comingSoon ? 0.7 : 1,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: featured ? '5px' : '3px',
    background: featured 
      ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
      : 'transparent',
  },
  '&:hover': {
    transform: comingSoon ? 'none' : 'translateY(-8px)',
    borderColor: comingSoon ? 'rgba(255, 255, 255, 0.08)' : theme.palette.primary.main,
    boxShadow: comingSoon 
      ? '0 8px 32px rgba(0, 0, 0, 0.2)'
      : '0 24px 60px rgba(167, 218, 219, 0.25)',
  },
}));

const FeaturedBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 20,
  right: 20,
  backgroundColor: theme.palette.primary.main,
  color: '#000000',
  fontWeight: 700,
  fontSize: '0.75rem',
  padding: '4px 8px',
  height: 'auto',
  boxShadow: '0 4px 12px rgba(167, 218, 219, 0.4)',
  zIndex: 2,
}));

const ComingSoonBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 20,
  right: 20,
  backgroundColor: theme.palette.secondary.main,
  color: '#ffffff',
  fontWeight: 700,
  fontSize: '0.75rem',
  padding: '4px 8px',
  height: 'auto',
  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)',
  zIndex: 2,
}));

const PriceTag = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(2),
}));

const FeatureSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(6),
  background: 'rgba(255, 255, 255, 0.02)',
  borderRadius: theme.spacing(3),
  border: '1px solid rgba(255, 255, 255, 0.08)',
}));

const ComparisonTable = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  overflowX: 'auto',
  '& table': {
    width: '100%',
    borderCollapse: 'collapse',
    '& th, & td': {
      padding: theme.spacing(2),
      textAlign: 'left',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    },
    '& th': {
      fontWeight: 700,
      color: theme.palette.primary.main,
      backgroundColor: 'rgba(167, 218, 219, 0.05)',
    },
  },
}));

// Polaris pricing plans
const polarisPricing = [
  {
    tier: 'Explorer',
    subtitle: 'Perfect for getting started',
    priceMonthly: 19,
    maxStarmapGenerations: 5,
    maxStarmaps: 5,
    description: 'Perfect for individuals exploring Solara-powered learning design',
    features: [
      'Solara-powered blueprint generation',
      'Professional templates & formatting',
      'Export to PDF & Word',
      'Community support',
    ],
    highlighted: ['5 generations/month', '5 saved (rolls over 12 months)'],
    limits: [],
    featured: false,
    cta: 'Get Started Free',
    ctaLink: 'https://polaris.smartslate.io/auth/signup',
    badge: 'BEST FOR BEGINNERS',
  },
  {
    tier: 'Navigator',
    subtitle: 'For professionals & creators',
    priceMonthly: 39,
    maxStarmapGenerations: 20,
    maxStarmaps: 20,
    description: 'For individual L&D professionals who need more capacity',
    features: [
      'Everything in Explorer',
      'Save $1.85 per generation (49% cheaper)',
      'Priority support (24h response)',
    ],
    highlighted: ['20 generations/month', '20 saved (rolls over 12 months)'],
    limits: [],
    featured: true,
    cta: 'Start Free Trial',
    ctaLink: 'https://polaris.smartslate.io/auth/signup',
    popular: true,
  },
  {
    tier: 'Voyager',
    subtitle: 'For power users & consultants',
    priceMonthly: 79,
    maxStarmapGenerations: 40,
    maxStarmaps: 40,
    description: 'For power users who need more generation and storage capacity',
    features: [
      'Everything in Navigator',
      'Save $1.78 per generation (47% cheaper)',
    ],
    highlighted: ['40 generations/month', '40 saved (480/year with rollover)'],
    limits: [],
    featured: false,
    cta: 'Start Free Trial',
    ctaLink: 'https://polaris.smartslate.io/auth/signup',
    badge: 'PROFESSIONAL',
  },
];

// Team pricing plans
const teamPricing = [
  {
    tier: 'Crew',
    subtitle: 'Small teams, big impact',
    pricePerSeatMonthly: 24,
    seatRange: '2–5 seats',
    minSeats: 2,
    maxSeats: 5,
    maxStarmapGenerationsPerUser: 5,
    maxStarmapsPerUser: 5,
    description: 'Perfect for small teams just getting started with collaborative learning design',
    features: [
      'Shared team workspace',
      'Real-time collaboration',
      'Role-based permissions',
      'Team analytics dashboard',
      'Bulk export to Word & PDF',
      'Priority email support',
    ],
    highlighted: ['5 generations/user/month', '5 saved (rolls over 12 months)'],
    limits: [],
    featured: false,
    cta: 'Start Team Trial',
    ctaLink: '/contact',
  },
  {
    tier: 'Fleet',
    subtitle: 'Scale your operations',
    pricePerSeatMonthly: 64,
    seatRange: '6–15 seats',
    minSeats: 6,
    maxSeats: 15,
    maxStarmapGenerationsPerUser: 20,
    maxStarmapsPerUser: 10,
    description: 'For growing L&D teams scaling their learning programs',
    features: [
      'Everything in Crew',
      'SSO with OAuth/SAML',
      'Advanced user management',
      'Priority support SLA (4h response)',
      'Custom onboarding session',
      'Advanced team analytics',
      'Audit logs',
    ],
    highlighted: ['20 generations/user/month', '10 saved (rolls over 12 months)'],
    limits: [],
    featured: true,
    popular: true,
    cta: 'Contact Sales',
    ctaLink: '/contact',
  },
  {
    tier: 'Armada',
    subtitle: 'Department & organization scale',
    pricePerSeatMonthly: 129,
    seatRange: '16–50 seats',
    minSeats: 16,
    maxSeats: 50,
    maxStarmapGenerationsPerUser: 50,
    maxStarmapsPerUser: 50,
    description: 'Enterprise-grade solution for large L&D organizations',
    features: [
      'Everything in Fleet',
      'Dedicated success manager',
      'Quarterly business reviews',
      'Custom integrations & API',
      'Advanced security controls',
      'Custom usage alerts',
      'SLA with uptime guarantee',
      'Training & workshops',
    ],
    highlighted: ['50 generations/user/month', '50 saved (rolls over 12 months)'],
    limits: [],
    featured: false,
    cta: 'Contact Enterprise Sales',
    ctaLink: '/contact',
  },
];

// Coming Soon products
const comingSoonProducts = [
  {
    name: 'Solara Constellation',
    icon: Layers,
    description: 'Transform raw content into structured learning blueprints',
    expectedLaunch: 'Q2 2026',
  },
  {
    name: 'Solara Nova',
    icon: SmartToy,
    description: 'Next-generation AI-powered content authoring',
    expectedLaunch: 'Q3 2026',
  },
  {
    name: 'Solara Orbit',
    icon: Speed,
    description: 'Deliver personalized learning journeys at scale',
    expectedLaunch: 'Q4 2026',
  },
];

export default function PricingPage() {
  const { modalStates, actions: modalActions } = useModalManager();
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const annualMultiplier = 0.8; // 20% discount
  const annualSavings = 0.2; // 20% savings
  
  const heroRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const comingSoonRef = useRef<HTMLDivElement>(null);

  const pricingInView = useInView(pricingRef, { once: true, amount: 0.2 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });
  const comingSoonInView = useInView(comingSoonRef, { once: true, amount: 0.2 });

  return (
    <PageWrapper>
      {/* Hero Section */}
      <Box ref={heroRef}>
        <StandardHero
          title="Transform Ideas Into Learning Blueprints"
          subtitle="AI-powered learning design that adapts to your needs"
          description="Start creating professional learning blueprints in minutes with Solara Polaris. No credit card required."
          accentWords={['Transform', 'Learning', 'Blueprints']}
        >
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mt: 3 }}>
            <PrimaryButton
              variant="contained"
              size="large"
              onClick={modalActions.openDemoModal}
              endIcon={<Rocket className="icon-anim icon-float" />}
            >
              Schedule a Demo
            </PrimaryButton>
            <Button
              component={Link}
              href="https://polaris.smartslate.io/auth/signup"
              variant="outlined"
              size="large"
              sx={{ 
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.light',
                  backgroundColor: 'rgba(167, 218, 219, 0.08)',
                }
              }}
            >
              Try Polaris Free
            </Button>
          </Box>
        </StandardHero>
      </Box>

      {/* Polaris Pricing Section */}
      <SectionWrapper className="visible" ref={pricingRef}>
        <Box sx={{ py: 10, backgroundColor: 'background.default' }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={pricingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ textAlign: 'left', mb: 4 }}>
                <AnimatedChip label="Individual Plans" sx={{ mb: 3 }} />
                <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                  <AccentText>Solara Polaris</AccentText>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem', maxWidth: '800px', mb: 4 }}>
                  Transform organizational needs into comprehensive learning blueprints in minutes.
                </Typography>

                {/* Billing Toggle */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 4 }}>
                  <Box sx={{
                    display: 'inline-flex',
                    p: 0.5,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                  }}>
                    <Button
                      onClick={() => setBilling('monthly')}
                      sx={{
                        px: 3,
                        py: 1,
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        backgroundColor: billing === 'monthly' ? 'rgba(167, 218, 219, 0.15)' : 'transparent',
                        color: billing === 'monthly' ? 'primary.main' : 'text.secondary',
                        border: billing === 'monthly' ? '1px solid' : 'none',
                        borderColor: billing === 'monthly' ? 'primary.main' : 'transparent',
                        '&:hover': {
                          backgroundColor: billing === 'monthly' ? 'rgba(167, 218, 219, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        },
                      }}
                    >
                      Monthly
                    </Button>
                    <Button
                      onClick={() => setBilling('annual')}
                      sx={{
                        px: 3,
                        py: 1,
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        backgroundColor: billing === 'annual' ? 'rgba(167, 218, 219, 0.15)' : 'transparent',
                        color: billing === 'annual' ? 'primary.main' : 'text.secondary',
                        border: billing === 'annual' ? '1px solid' : 'none',
                        borderColor: billing === 'annual' ? 'primary.main' : 'transparent',
                        '&:hover': {
                          backgroundColor: billing === 'annual' ? 'rgba(167, 218, 219, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                        },
                      }}
                    >
                      Annual
                      <Chip
                        label="SAVE 20%"
                        size="small"
                        sx={{
                          ml: 1,
                          height: '20px',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          backgroundColor: 'success.main',
                          color: '#fff',
                        }}
                      />
                    </Button>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mx: -2 }}>
                {polarisPricing.map((plan, index) => (
                  <Box key={plan.tier} sx={{
                    width: { xs: '100%', md: 'calc(33.333% - 32px)' },
                    p: 2,
                    boxSizing: 'border-box'
                  }}>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={pricingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                      transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                      style={{ height: '100%' }}
                    >
                      <PricingCard featured={plan.featured}>
                        {plan.popular && (
                          <FeaturedBadge label="MOST POPULAR" icon={<Star sx={{ fontSize: '1rem' }} />} />
                        )}
                        
                        <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                          <Box sx={{ textAlign: 'left', mb: 3 }}>
                            <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                              {plan.subtitle}
                            </Typography>
                            <Typography variant="h4" sx={{ mt: 1, mb: 1, fontWeight: 700, color: 'text.primary' }}>
                              {plan.tier}
                            </Typography>
                            
                            <PriceTag>
                              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                ${billing === 'monthly' ? plan.priceMonthly : Math.ceil(plan.priceMonthly * annualMultiplier)}
                              </Typography>
                              <Typography variant="body1" sx={{ color: 'text.secondary', ml: 1 }}>
                                /month
                              </Typography>
                            </PriceTag>
                            
                            {billing === 'annual' && (
                              <Typography variant="body2" sx={{ color: 'success.main', textAlign: 'left', mb: 2, fontWeight: 600 }}>
                                Save ${Math.ceil(plan.priceMonthly * annualSavings * 12)}/year
                              </Typography>
                            )}
                            
                            <Typography variant="body2" sx={{ color: 'text.secondary', minHeight: 48 }}>
                              {plan.description}
                            </Typography>
                          </Box>
                          
                          <List sx={{ mb: 3, flex: 1 }}>
                            {plan.features.map((feature, featureIndex) => (
                              <ListItem key={featureIndex} sx={{ py: 0.5, px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 32, color: 'primary.main' }}>
                                  <Check fontSize="small" />
                                </ListItemIcon>
                                <ListItemText 
                                  primary={feature}
                                  primaryTypographyProps={{
                                    variant: 'body2',
                                    color: 'text.secondary',
                                    sx: { fontSize: '0.875rem' }
                                  }}
                                />
                              </ListItem>
                            ))}
                          </List>
                          
                          <Button
                            component={Link}
                            href={plan.ctaLink}
                            variant={plan.featured ? 'contained' : 'outlined'}
                            color={plan.featured ? 'secondary' : 'primary'}
                            size="large"
                            fullWidth
                            sx={{ 
                              py: 1.5,
                              fontWeight: 600,
                            }}
                          >
                            {plan.cta}
                          </Button>
                        </CardContent>
                      </PricingCard>
                    </motion.div>
                  </Box>
                ))}
              </Box>
            </motion.div>

            {/* Team Plans Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={pricingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Box sx={{ textAlign: 'left', mt: 12, mb: 6 }}>
                <Divider sx={{ mb: 8, borderColor: 'rgba(167, 218, 219, 0.2)' }} />
                <AnimatedChip label="Team Plans" sx={{ mb: 3 }} />
                <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                  Collaborate with Your <AccentText>Learning Team</AccentText>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem', maxWidth: '800px', mb: 6 }}>
                  Built for teams who need shared workspaces, collaboration features, and centralized management.
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mx: -2 }}>
                {teamPricing.map((plan, index) => (
                  <Box key={plan.tier} sx={{
                    width: { xs: '100%', md: 'calc(33.333% - 32px)' },
                    p: 2,
                    boxSizing: 'border-box'
                  }}>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={pricingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                      transition={{ duration: 0.8, delay: 0.8 + (index * 0.1) }}
                      style={{ height: '100%' }}
                    >
                      <PricingCard featured={plan.featured}>
                        {plan.popular && (
                          <FeaturedBadge label="POPULAR CHOICE" icon={<Star sx={{ fontSize: '1rem' }} />} />
                        )}
                        
                        <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                          <Box sx={{ textAlign: 'left', mb: 3 }}>
                            <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                              {plan.subtitle}
                            </Typography>
                            <Typography variant="h4" sx={{ mt: 1, mb: 1, fontWeight: 700, color: 'text.primary' }}>
                              {plan.tier}
                            </Typography>
                            
                            <Chip
                              label={plan.seatRange}
                              size="small"
                              sx={{
                                mb: 2,
                                backgroundColor: 'rgba(167, 218, 219, 0.15)',
                                color: 'primary.main',
                                fontWeight: 600,
                              }}
                            />
                            
                            <PriceTag>
                              <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>
                                ${billing === 'monthly' ? plan.pricePerSeatMonthly : Math.ceil(plan.pricePerSeatMonthly * annualMultiplier)}
                              </Typography>
                              <Typography variant="body1" sx={{ color: 'text.secondary', ml: 1 }}>
                                /seat/month
                              </Typography>
                            </PriceTag>
                            
                            {billing === 'annual' && (
                              <Typography variant="body2" sx={{ color: 'success.main', textAlign: 'left', mb: 2, fontWeight: 600 }}>
                                Save 20% annually
                              </Typography>
                            )}
                            
                            <Typography variant="body2" sx={{ color: 'text.secondary', minHeight: 48 }}>
                              {plan.description}
                            </Typography>
                          </Box>
                          
                          <List sx={{ mb: 3, flex: 1 }}>
                            {plan.features.map((feature, featureIndex) => (
                              <ListItem key={featureIndex} sx={{ py: 0.5, px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 32, color: 'primary.main' }}>
                                  <Check fontSize="small" />
                                </ListItemIcon>
                                <ListItemText
                                  primary={feature}
                                  primaryTypographyProps={{
                                    variant: 'body2',
                                    color: 'text.secondary',
                                    sx: { fontSize: '0.875rem' }
                                  }}
                                />
                              </ListItem>
                            ))}
                          </List>
                          
                          <Button
                            component={Link}
                            href={plan.ctaLink}
                            variant={plan.featured ? 'contained' : 'outlined'}
                            color={plan.featured ? 'secondary' : 'primary'}
                            size="large"
                            fullWidth
                            sx={{
                              py: 1.5,
                              fontWeight: 600,
                            }}
                          >
                            {plan.cta}
                          </Button>
                        </CardContent>
                      </PricingCard>
                    </motion.div>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Container>
        </Box>
      </SectionWrapper>

      {/* Features Comparison */}
      <SectionWrapper className="visible" ref={featuresRef}>
        <Box sx={{ py: 10, backgroundColor: 'background.default' }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ textAlign: 'left', mb: 6 }}>
                <Typography variant="h3" sx={{ mb: 3, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                  All Plans Include <AccentText>These Features</AccentText>
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mx: -1.5 }}>
                {[
                  { icon: <AutoAwesome />, title: 'Solara-Powered Generation', description: 'Advanced AI with intelligent processing' },
                  { icon: <Security />, title: 'Enterprise Security', description: 'Bank-level encryption and data protection' },
                  { icon: <CloudSync />, title: 'Auto-Save', description: 'Never lose your progress with automatic saves' },
                  { icon: <Assessment />, title: 'Comprehensive Blueprints', description: 'Executive summaries, objectives, and KPIs' },
                  { icon: <Schedule />, title: 'Quick Generation', description: 'Complete blueprints in 2-3 minutes' },
                  { icon: <VerifiedUser />, title: 'Data Privacy', description: 'Your data never used for AI training' },
                ].map((feature, index) => (
                  <Box key={index} sx={{
                    width: { xs: '100%', sm: 'calc(50% - 24px)', md: 'calc(33.333% - 24px)' },
                    p: 1.5,
                    boxSizing: 'border-box'
                  }}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={featuresInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
                    >
                      <ContentCard sx={{ textAlign: 'left', minHeight: 200 }}>
                        <Box sx={{ color: 'primary.main', mb: 2 }}>
                          {feature.icon}
                        </Box>
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {feature.description}
                        </Typography>
                      </ContentCard>
                    </motion.div>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Container>
        </Box>
      </SectionWrapper>

      {/* Coming Soon Products */}
      <SectionWrapper className="visible" ref={comingSoonRef}>
        <Box sx={{ py: 10, backgroundColor: 'background.default' }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={comingSoonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ textAlign: 'left', mb: 6 }}>
                <AnimatedChip label="Product Roadmap" sx={{ mb: 3 }} />
                <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                  Coming Soon: <AccentText>Full Solara Platform</AccentText>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem', maxWidth: '800px', mb: 6 }}>
                  Polaris is just the beginning. We&apos;re building a complete learning ecosystem to transform
                  every stage of your learning and development journey.
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mx: -2 }}>
                {comingSoonProducts.map((product, index) => (
                  <Box key={product.name} sx={{
                    width: { xs: '100%', md: 'calc(33.333% - 32px)' },
                    p: 2,
                    boxSizing: 'border-box'
                  }}>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={comingSoonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                      transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                      style={{ height: '100%' }}
                    >
                      <PricingCard comingSoon>
                        <ComingSoonBadge label="COMING SOON" />
                        <CardContent sx={{ p: 4, textAlign: 'left' }}>
                          <Box sx={{ 
                            width: 80, 
                            height: 80, 
                            margin: '0 auto 24px',
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.15), rgba(79, 70, 229, 0.1))',
                            border: '1px solid rgba(167, 218, 219, 0.3)',
                          }}>
                            <product.icon sx={{ fontSize: '2.5rem', color: 'primary.main' }} />
                          </Box>
                          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                            {product.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 60 }}>
                            {product.description}
                          </Typography>
                          <Chip 
                            label={`Expected: ${product.expectedLaunch}`}
                            sx={{ 
                              backgroundColor: 'rgba(79, 70, 229, 0.15)',
                              color: 'secondary.light',
                              fontWeight: 600,
                            }}
                          />
                        </CardContent>
                      </PricingCard>
                    </motion.div>
                  </Box>
                ))}
              </Box>

              <Box sx={{ textAlign: 'left', mt: 8, p: 6, background: 'rgba(167, 218, 219, 0.05)', borderRadius: 3, border: '1px solid rgba(167, 218, 219, 0.2)' }}>
                <EmojiObjects sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                  Want Early Access?
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600 }}>
                  Join our waitlist to get notified when new Solara products launch. 
                  Early adopters get exclusive discounts and priority support.
                </Typography>
                <PrimaryButton
                  variant="contained"
                  size="large"
                  onClick={modalActions.openDemoModal}
                  endIcon={<Rocket />}
                >
                  Join the Waitlist
                </PrimaryButton>
              </Box>
            </motion.div>
          </Container>
        </Box>
      </SectionWrapper>

      {/* FAQ / CTA Section */}
      <SectionWrapper className="visible">
        <Box sx={{ py: 10, backgroundColor: 'background.default' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
                Questions About Pricing?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.125rem' }}>
                Our team is here to help you find the perfect plan for your organization.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  href="/contact"
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ px: 4, py: 1.5 }}
                >
                  Contact Sales
                </Button>
                <Button
                  component={Link}
                  href="/features"
                  variant="outlined"
                  color="primary"
                  size="large"
                  sx={{ px: 4, py: 1.5 }}
                >
                  View All Features
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </SectionWrapper>

      {/* Modals */}
      <DemoModal isOpen={modalStates.demo} onClose={modalActions.closeDemoModal} />
    </PageWrapper>
  );
}