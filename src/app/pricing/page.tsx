'use client';

import { useState, useRef } from 'react';
import { Box, Container, Card, CardContent, Typography, Button, Chip, List, ListItem, ListItemText, ListItemIcon, Divider, Tabs, Tab } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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
  GroupWork,
  MessageOutlined,
  Insights
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

// Styled Components
const TabsContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(6),
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(16px)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(255, 255, 255, 0.08)',
  padding: theme.spacing(1),
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 'auto',
  '& .MuiTabs-flexContainer': {
    gap: theme.spacing(1),
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  minHeight: '56px',
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.spacing(1.5),
  textTransform: 'none',
  fontSize: '0.9375rem',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  minWidth: 'auto',
  flex: '1 1 auto',
  maxWidth: '200px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'transparent',
    transition: 'all 0.3s ease',
    zIndex: -1,
  },
  '&:hover': {
    color: theme.palette.primary.main,
    background: 'rgba(167, 218, 219, 0.08)',
  },
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    background: 'rgba(167, 218, 219, 0.15)',
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: `0 4px 12px rgba(167, 218, 219, 0.2)`,
    '&::before': {
      background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.1), rgba(79, 70, 229, 0.05))',
    },
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1, 2),
    fontSize: '0.875rem',
    minWidth: 'auto',
    flex: '1 1 calc(50% - 8px)',
    maxWidth: 'none',
  },
}));

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
  overflow: 'visible',
  opacity: comingSoon ? 0.7 : 1,
  marginTop: '16px',
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
    '& .badge-container': {
      transform: 'scale(1.05)',
      boxShadow: '0 12px 32px rgba(167, 218, 219, 0.6)',
    },
  },
}));

const FeaturedBadge = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  top: -16,
  right: 20,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  color: '#000000',
  fontWeight: 800,
  fontSize: '0.75rem',
  padding: '8px 16px',
  borderRadius: '20px',
  boxShadow: '0 8px 24px rgba(167, 218, 219, 0.5)',
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  backdropFilter: 'blur(8px)',
  border: `1px solid rgba(255, 255, 255, 0.2)`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '20px',
    padding: '1px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), transparent)',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderTop: `8px solid ${theme.palette.primary.main}`,
  },
}));

const PopularChoiceBadge = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  top: -16,
  right: 20,
  background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
  color: '#ffffff',
  fontWeight: 800,
  fontSize: '0.75rem',
  padding: '8px 16px',
  borderRadius: '20px',
  boxShadow: '0 8px 24px rgba(79, 70, 229, 0.5)',
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  backdropFilter: 'blur(8px)',
  border: `1px solid rgba(255, 255, 255, 0.2)`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '20px',
    padding: '1px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), transparent)',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderTop: `8px solid ${theme.palette.secondary.main}`,
  },
}));

const ComingSoonBadge = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  top: -12,
  right: 20,
  background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
  color: '#ffffff',
  fontWeight: 800,
  fontSize: '0.75rem',
  padding: '8px 16px',
  borderRadius: '20px',
  boxShadow: '0 8px 24px rgba(79, 70, 229, 0.5)',
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  backdropFilter: 'blur(8px)',
  border: `1px solid rgba(255, 255, 255, 0.2)`,
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '20px',
    padding: '1px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), transparent)',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  },
}));

const PriceTag = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  marginTop: theme.spacing(2),
}));

const StarmapAllowance = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1.5, 2),
  marginBottom: theme.spacing(2),
  background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.08), rgba(79, 70, 229, 0.05))',
  border: '1px solid rgba(167, 218, 219, 0.2)',
  borderRadius: theme.spacing(1.5),
  textAlign: 'center',
}));

const ComingSoonCard = styled(motion.div)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(16px)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(6),
  border: '1px solid rgba(79, 70, 229, 0.2)',
  textAlign: 'center',
  minHeight: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

// Product Icons
const ProductIcons = {
  polaris: <Star sx={{ fontSize: '3rem' }} />,
  constellation: <Layers sx={{ fontSize: '3rem' }} />,
  nova: <AutoAwesome sx={{ fontSize: '3rem' }} />,
  orbit: <Speed sx={{ fontSize: '3rem' }} />,
  nebula: <MessageOutlined sx={{ fontSize: '3rem' }} />,
  spectrum: <Insights sx={{ fontSize: '3rem' }} />,
};

// Tab Data
interface ProductTab {
  id: string;
  label: string;
  shortName: string;
  description: string;
  icon: JSX.Element;
  status: 'live' | 'coming-soon';
  expectedLaunch?: string;
}

const productTabs: ProductTab[] = [
  {
    id: 'polaris',
    label: 'Solara Polaris',
    shortName: 'Polaris',
    description: 'AI-Powered Learning Blueprint Generator',
    icon: ProductIcons.polaris,
    status: 'live',
  },
  {
    id: 'constellation',
    label: 'Solara Constellation',
    shortName: 'Constellation',
    description: 'Content-to-Blueprint Automation',
    icon: ProductIcons.constellation,
    status: 'coming-soon',
    expectedLaunch: 'Q2 2026',
  },
  {
    id: 'nova',
    label: 'Solara Nova',
    shortName: 'Nova',
    description: 'AI-Assisted Content Authoring',
    icon: ProductIcons.nova,
    status: 'coming-soon',
    expectedLaunch: 'Q3 2026',
  },
  {
    id: 'orbit',
    label: 'Solara Orbit',
    shortName: 'Orbit',
    description: 'Personalized Learning Delivery',
    icon: ProductIcons.orbit,
    status: 'coming-soon',
    expectedLaunch: 'Q4 2026',
  },
  {
    id: 'nebula',
    label: 'Solara Nebula',
    shortName: 'Nebula',
    description: 'Intelligent Learning Assistant',
    icon: ProductIcons.nebula,
    status: 'coming-soon',
    expectedLaunch: 'Q1 2027',
  },
  {
    id: 'spectrum',
    label: 'Solara Spectrum',
    shortName: 'Spectrum',
    description: 'Advanced Learning Analytics',
    icon: ProductIcons.spectrum,
    status: 'coming-soon',
    expectedLaunch: 'Q2 2027',
  },
];

// Polaris pricing plans (existing data)
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

// Team pricing plans (existing data)
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

export default function PricingPage() {
  const { modalStates, actions: modalActions } = useModalManager();
  const [activeTab, setActiveTab] = useState(0);
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const annualMultiplier = 0.8; // 20% discount
  const annualSavings = 0.2; // 20% savings

  const heroRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const pricingInView = useInView(pricingRef, { once: true, amount: 0.2 });
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const activeProduct = productTabs[activeTab];

  return (
    <PageWrapper>
      {/* Hero Section */}
      <Box ref={heroRef}>
        <StandardHero
          title="One Platform. Every Stage of Learning. Unlimited Potential."
          subtitle="Unified pricing for the complete Solara Learning Engine"
          description="From ideation to impact, Solara transforms learning at every touchpoint. Choose a product. Start a revolution. Our pricing adapts to how you grow—because transforming learning shouldn't mean breaking budgets."
          accentWords={['Platform', 'Learning', 'Potential']}
        >
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mt: 3 }}>
            <PrimaryButton
              variant="contained"
              size="large"
              onClick={modalActions.openDemoModal}
              endIcon={<Rocket className="icon-anim icon-float" />}
            >
              Explore Solara Solutions
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
              Start with Polaris
            </Button>
          </Box>
        </StandardHero>
      </Box>

      {/* Pricing Section with Tabs */}
      <SectionWrapper className="visible" ref={pricingRef}>
        <Box sx={{ py: 10, backgroundColor: 'background.default' }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={pricingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ textAlign: 'left', mb: 6 }}>
                <AnimatedChip label="Solara Product Suite" sx={{ mb: 3 }} />
                <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                  Choose Your <AccentText>Solara Product</AccentText>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem', maxWidth: '800px', mb: 4 }}>
                  Select from our suite of AI-powered learning products. Each designed to transform a specific aspect of your learning and development workflow.
                </Typography>
              </Box>

              {/* Product Tabs */}
              <TabsContainer>
                <StyledTabs
                  value={activeTab}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  allowScrollButtonsMobile
                >
                  {productTabs.map((product, index) => (
                    <StyledTab
                      key={product.id}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            '& svg': { fontSize: '1.25rem' }
                          }}>
                            {product.icon}
                          </Box>
                          <Box sx={{ textAlign: 'left' }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                              {product.shortName}
                            </Typography>
                            {product.status === 'live' && (
                              <Typography variant="caption" sx={{ color: 'success.main', fontSize: '0.625rem', fontWeight: 700 }}>
                                LIVE
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      }
                    />
                  ))}
                </StyledTabs>
              </TabsContainer>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeProduct.status === 'live' ? (
                    // Polaris Pricing Content
                    <>
                      <Box sx={{ textAlign: 'left', mb: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Box sx={{
                            width: 64,
                            height: 64,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.15), rgba(79, 70, 229, 0.1))',
                            border: '1px solid rgba(167, 218, 219, 0.3)',
                          }}>
                            {activeProduct.icon}
                          </Box>
                          <Box>
                            <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                              {activeProduct.label}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {activeProduct.description}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Billing Toggle */}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4 }}>
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

                      {/* Individual Plans */}
                      <Box sx={{ mb: 8 }}>
                        <Typography variant="h5" sx={{ mb: 4, fontWeight: 700 }}>
                          Individual Plans
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mx: -2 }}>
                          {polarisPricing.map((plan, index) => (
                            <Box key={plan.tier} sx={{
                              width: { xs: '100%', md: 'calc(33.333% - 32px)' },
                              p: 2,
                              boxSizing: 'border-box'
                            }}>
                              <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
                                style={{ height: '100%' }}
                              >
                                <PricingCard featured={plan.featured}>
                                  {plan.popular && (
                                    <FeaturedBadge
                                      className="badge-container"
                                      initial={{ opacity: 0, scale: 0.8, y: -20 }}
                                      animate={{ opacity: 1, scale: 1, y: 0 }}
                                      transition={{ duration: 0.5, delay: 0.2 }}
                                      whileHover={{
                                        scale: 1.05,
                                        boxShadow: '0 12px 32px rgba(167, 218, 219, 0.6)'
                                      }}
                                    >
                                      <Star sx={{ fontSize: '0.875rem' }} />
                                      MOST POPULAR
                                    </FeaturedBadge>
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

                                      <StarmapAllowance>
                                        <Star sx={{ fontSize: '1.25rem', color: 'primary.main' }} />
                                        <Box>
                                          <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.2 }}>
                                            {billing === 'monthly'
                                              ? `${plan.maxStarmapGenerations} Starmaps/month`
                                              : `${plan.maxStarmapGenerations * 12} Starmaps/year`
                                            }
                                          </Typography>
                                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                                            {plan.maxStarmaps} saved (12-month rollover)
                                          </Typography>
                                        </Box>
                                      </StarmapAllowance>

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
                      </Box>

                      <Divider sx={{ my: 8, borderColor: 'rgba(167, 218, 219, 0.2)' }} />

                      {/* Team Plans */}
                      <Box>
                        <Typography variant="h5" sx={{ mb: 4, fontWeight: 700 }}>
                          Team Plans
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mx: -2 }}>
                          {teamPricing.map((plan, index) => (
                            <Box key={plan.tier} sx={{
                              width: { xs: '100%', md: 'calc(33.333% - 32px)' },
                              p: 2,
                              boxSizing: 'border-box'
                            }}>
                              <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
                                style={{ height: '100%' }}
                              >
                                <PricingCard featured={plan.featured}>
                                  {plan.popular && (
                                    <PopularChoiceBadge
                                      className="badge-container"
                                      initial={{ opacity: 0, scale: 0.8, y: -20 }}
                                      animate={{ opacity: 1, scale: 1, y: 0 }}
                                      transition={{ duration: 0.5, delay: 0.2 }}
                                      whileHover={{
                                        scale: 1.05,
                                        boxShadow: '0 12px 32px rgba(79, 70, 229, 0.6)'
                                      }}
                                    >
                                      <Star sx={{ fontSize: '0.875rem' }} />
                                      POPULAR CHOICE
                                    </PopularChoiceBadge>
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

                                      <StarmapAllowance>
                                        <Star sx={{ fontSize: '1.25rem', color: 'primary.main' }} />
                                        <Box>
                                          <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.2 }}>
                                            {billing === 'monthly'
                                              ? `${plan.maxStarmapGenerationsPerUser * plan.minSeats}–${plan.maxStarmapGenerationsPerUser * plan.maxSeats} Starmaps/month`
                                              : `${plan.maxStarmapGenerationsPerUser * plan.minSeats * 12}–${plan.maxStarmapGenerationsPerUser * plan.maxSeats * 12} Starmaps/year`
                                            }
                                          </Typography>
                                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                                            {plan.maxStarmapGenerationsPerUser}/user · {plan.maxStarmapsPerUser} saved/user
                                          </Typography>
                                        </Box>
                                      </StarmapAllowance>

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
                      </Box>
                    </>
                  ) : (
                    // Coming Soon Content
                    <ComingSoonCard
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Box sx={{
                        width: 100,
                        height: 100,
                        margin: '0 auto 32px',
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.15), rgba(79, 70, 229, 0.1))',
                        border: '1px solid rgba(167, 218, 219, 0.3)',
                      }}>
                        {activeProduct.icon}
                      </Box>

                      <Chip
                        label="COMING SOON"
                        sx={{
                          mb: 3,
                          backgroundColor: 'rgba(79, 70, 229, 0.15)',
                          color: 'secondary.light',
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          padding: '8px 16px',
                          height: 'auto',
                        }}
                      />

                      <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, color: 'primary.main' }}>
                        {activeProduct.label}
                      </Typography>

                      <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary', fontWeight: 500 }}>
                        {activeProduct.description}
                      </Typography>

                      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
                        We&apos;re building the future of learning technology. {activeProduct.label} will transform how you approach learning and development.
                      </Typography>

                      <Box sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 3,
                        py: 1.5,
                        backgroundColor: 'rgba(79, 70, 229, 0.1)',
                        borderRadius: 2,
                        border: '1px solid rgba(79, 70, 229, 0.2)',
                      }}>
                        <AccessTime sx={{ fontSize: '1.25rem', color: 'secondary.main' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          Expected Launch: {activeProduct.expectedLaunch}
                        </Typography>
                      </Box>

                      <Box sx={{ mt: 4 }}>
                        <PrimaryButton
                          variant="contained"
                          size="large"
                          onClick={modalActions.openDemoModal}
                          endIcon={<Rocket />}
                        >
                          Join Waitlist
                        </PrimaryButton>
                      </Box>

                      <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
                        Be among the first to experience the future of learning
                      </Typography>
                    </ComingSoonCard>
                  )}
                </motion.div>
              </AnimatePresence>
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
