                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, useInView } from 'framer-motion';
import {
  AutoAwesome,
  Psychology,
  Speed,
  Hub,
  TrendingUp,
  School,
  Extension,
  CheckCircle,
  Insights,
  CloudSync,
  Lock,
  BarChart,
  Layers,
  People,
  CurrencyRupee,
  SmartToy,
  EmojiObjects,
  Rocket,
  Lightbulb,
  BlurOn,
  Palette,
} from '@mui/icons-material';
import StandardHero from '@/components/ui/StandardHero';
import {
  Section,
  SectionWrapper,
  PageWrapper,
  ContentCard,
  PrimaryButton,
  AccentText,
  AnimatedChip,
  StatCard,
  StatNumber,
} from '@/components/landing/styles/LandingStyles';
import Link from 'next/link';

const FeaturesSection = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(10)} 0`,
  backgroundColor: theme.palette.background.default,
  position: 'relative',
  overflow: 'hidden',
}));

const FeatureCard = styled(ContentCard)(({ theme }) => ({
  height: '100%',
  minHeight: 300,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '100%',
  boxSizing: 'border-box',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.15), rgba(79, 70, 229, 0.1))',
  border: '1px solid rgba(167, 218, 219, 0.3)',
  marginBottom: theme.spacing(3),
  transition: 'all 0.3s ease',
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
    color: theme.palette.primary.main,
  },
}));

const CategorySection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(8),
  },
}));

const CategoryHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  textAlign: 'left',
}));

const FeatureList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(2),
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
    fontSize: '1.25rem',
    marginTop: theme.spacing(0.5),
    flexShrink: 0,
  },
}));

const StatsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: theme.spacing(4),
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(8),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const LiveBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: `${theme.spacing(0.75)} ${theme.spacing(2)}`,
  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  borderRadius: theme.spacing(3),
  fontSize: '0.75rem',
  fontWeight: 700,
  color: '#ffffff',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
  animation: 'pulse-glow 2s ease-in-out infinite',
  zIndex: 10,
  '&::before': {
    content: '""',
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    animation: 'pulse-dot 1.5s ease-in-out infinite',
  },
  '@keyframes pulse-glow': {
    '0%, 100%': {
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
    },
    '50%': {
      boxShadow: '0 4px 20px rgba(16, 185, 129, 0.6)',
    },
  },
  '@keyframes pulse-dot': {
    '0%, 100%': {
      opacity: 1,
      transform: 'scale(1)',
    },
    '50%': {
      opacity: 0.7,
      transform: 'scale(1.2)',
    },
  },
}));

const ComingSoonBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: `${theme.spacing(0.75)} ${theme.spacing(2)}`,
  background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.2), rgba(79, 70, 229, 0.2))',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(167, 218, 219, 0.4)',
  borderRadius: theme.spacing(3),
  fontSize: '0.75rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  boxShadow: '0 4px 12px rgba(167, 218, 219, 0.2)',
  zIndex: 10,
}));

export default function FeaturesPage() {
  const [isVisible, setIsVisible] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const platformRef = useRef<HTMLDivElement>(null);
  const learningRef = useRef<HTMLDivElement>(null);
  const businessRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const platformInView = useInView(platformRef, { once: true, amount: 0.2 });
  const learningInView = useInView(learningRef, { once: true, amount: 0.2 });
  const businessInView = useInView(businessRef, { once: true, amount: 0.2 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 });

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const platformFeatures = [
    {
      icon: AutoAwesome,
      title: 'Solara Polaris',
      description: 'AI-powered needs analysis that translates stakeholder requirements into comprehensive learning experience designs.',
      features: [
        'Intelligent stakeholder requirement gathering',
        'Automated learning objective generation',
        'Competency gap analysis and mapping',
        'Real-time collaboration and feedback',
      ],
      isLive: true,
      link: 'https://polaris.smartslate.io',
    },
    {
      icon: Layers,
      title: 'Solara Constellation',
      description: 'Picks up your Polaris design and intelligently maps existing content, performs instructional design and storyboarding, and identifies content gaps.',
      features: [
        'Seamless Polaris integration',
        'Intelligent content mapping and curation',
        'Automated instructional design and storyboarding',
        'Content gap analysis (available vs. needed)',
      ],
      comingSoon: true,
    },
    {
      icon: SmartToy,
      title: 'Solara Nova',
      description: 'Next-generation content authoring with AI assistance for creating engaging, interactive learning experiences.',
      features: [
        'AI-powered content generation',
        'Interactive element creation',
        'Multimedia integration',
        'Accessibility compliance automation',
      ],
      comingSoon: true,
    },
    {
      icon: Speed,
      title: 'Solara Orbit',
      description: 'Deliver personalized learning journeys at scale with adaptive pathways and intelligent recommendations.',
      features: [
        'Adaptive learning paths',
        'Real-time progress tracking',
        'Personalized content delivery',
        'Performance analytics and insights',
      ],
      comingSoon: true,
    },
    {
      icon: BlurOn,
      title: 'Solara Nebula',
      description: 'Provide intelligent, personalized tutoring support that adapts to each learner\'s pace and style with real-time guidance.',
      features: [
        'Personalized AI tutoring',
        'Adaptive learning support',
        'Real-time guidance and assistance',
        'Learner pace and style adaptation',
      ],
      comingSoon: true,
    },
    {
      icon: Palette,
      title: 'Solara Spectrum',
      description: 'Reveal deep insights into your learning effectiveness by analyzing complex data and presenting it with clarity.',
      features: [
        'Learning effectiveness analytics',
        'Complex data analysis',
        'Clear insight visualization',
        'Performance pattern recognition',
      ],
      comingSoon: true,
    },
  ];

  const learningFeatures = [
    {
      icon: Psychology,
      title: 'AI-Powered Learning Design',
      description: 'Leverage artificial intelligence to create pedagogically sound, engaging learning experiences that adapt to learner needs.',
    },
    {
      icon: People,
      title: 'Collaborative Workflows',
      description: 'Enable seamless collaboration between SMEs, instructional designers, and stakeholders throughout the design process.',
    },
    {
      icon: Extension,
      title: 'Modular Content Architecture',
      description: 'Build reusable learning components that can be mixed, matched, and repurposed across multiple programs.',
    },
    {
      icon: Insights,
      title: 'Data-Driven Insights',
      description: 'Make informed decisions with comprehensive analytics on learner engagement, performance, and outcomes.',
    },
    {
      icon: CloudSync,
      title: 'Seamless Integration',
      description: 'Connect with your existing HRMS, LMS, and enterprise tools for a unified learning ecosystem.',
    },
    {
      icon: Lock,
      title: 'Enterprise-Grade Security',
      description: 'Protect your intellectual property with industry-leading security standards and compliance certifications.',
    },
  ];

  const businessFeatures = [
    {
      icon: TrendingUp,
      title: 'Accelerated Time-to-Market',
      description: 'Reduce course development time by up to 70% with AI-assisted design and automation.',
      metric: '70%',
      metricLabel: 'Faster Development',
    },
    {
      icon: CurrencyRupee,
      title: 'Significant Cost Savings',
      description: 'Lower development costs while maintaining or improving quality through intelligent automation.',
      metric: '60%',
      metricLabel: 'Cost Reduction',
    },
    {
      icon: School,
      title: 'Improved Learning Outcomes',
      description: 'Deliver measurable improvements in learner engagement, retention, and performance.',
      metric: '85%',
      metricLabel: 'Higher Engagement',
    },
    {
      icon: BarChart,
      title: 'Scalable Growth',
      description: 'Scale your learning programs efficiently without proportional increases in resources.',
      metric: '10x',
      metricLabel: 'Scalability',
    },
  ];

  return (
    <PageWrapper>
      {/* Hero Section */}
      <Box ref={heroRef}>
        <StandardHero
          title="Solara — The Intelligent Learning Universe"
          subtitle="Where artificial intelligence meets pedagogical excellence to create transformative learning experiences that adapt, evolve, and inspire."
          description="Solara is not just another learning platform—it's a complete ecosystem that reimagines every facet of learning design and delivery. From stakeholder requirements to personalized learning journeys, Solara orchestrates the entire learning lifecycle with unprecedented intelligence and efficiency."
          accentWords={['Intelligent', 'Universe', 'transformative', 'ecosystem', 'orchestrates']}
        >
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
            <Link href="/contact" passHref style={{ textDecoration: 'none' }}>
              <PrimaryButton
                variant="contained"
                size="large"
                endIcon={<Rocket className="icon-anim icon-float" />}
              >
                Experience Solara
              </PrimaryButton>
            </Link>
          </div>
        </StandardHero>
      </Box>

      {/* Statistics Section */}
      <SectionWrapper className="visible" ref={statsRef}>
        <FeaturesSection>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ textAlign: 'center', mb: 6 }}>
                <AnimatedChip label="By The Numbers" sx={{ mb: 3 }} />
                <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                  Why Organizations Choose <AccentText>Smartslate</AccentText>
                </Typography>
              </Box>

              <StatsGrid>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <StatCard>
                    <StatNumber>70%</StatNumber>
                    <Typography variant="body2" color="text.secondary">
                      Faster Course Development
                    </Typography>
                  </StatCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <StatCard>
                    <StatNumber>60%</StatNumber>
                    <Typography variant="body2" color="text.secondary">
                      Reduction in Costs
                    </Typography>
                  </StatCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <StatCard>
                    <StatNumber>85%</StatNumber>
                    <Typography variant="body2" color="text.secondary">
                      Learner Engagement Rate
                    </Typography>
                  </StatCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <StatCard>
                    <StatNumber>10x</StatNumber>
                    <Typography variant="body2" color="text.secondary">
                      Scalability Multiplier
                    </Typography>
                  </StatCard>
                </motion.div>
              </StatsGrid>
            </motion.div>
          </Container>
        </FeaturesSection>
      </SectionWrapper>

      {/* Platform Features */}
      <SectionWrapper className="visible" ref={platformRef}>
        <FeaturesSection>
          <Container maxWidth="lg">
            <CategorySection>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={platformInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
              >
                <CategoryHeader>
                  <AnimatedChip label="Solara Platform" sx={{ mb: 3 }} />
                  <Typography variant="h3" sx={{ mb: 3, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                    The Complete <AccentText>Learning Platform</AccentText>
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem', maxWidth: '800px' }}>
                    Solara is our flagship platform—a unified ecosystem that covers every stage of the learning lifecycle, from needs analysis to delivery and analytics.
                  </Typography>
                </CategoryHeader>
              </motion.div>

              <Grid container spacing={4} sx={{ width: '100%', margin: 0 }}>
                {platformFeatures.map((feature, index) => (
                  <Grid size={{ xs: 12, md: 6 }} key={feature.title} sx={{ display: 'flex' }}>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={platformInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                      transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                      style={{ width: '100%', display: 'flex' }}
                    >
                      <FeatureCard
                        sx={{
                          position: 'relative',
                          width: '100%',
                          ...(feature.link && {
                            cursor: 'pointer',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: '0 12px 40px rgba(167, 218, 219, 0.3)',
                            },
                          }),
                        }}
                        onClick={feature.link ? () => window.open(feature.link, '_blank') : undefined}
                      >
                        {feature.isLive && (
                          <LiveBadge>
                            Live Now
                          </LiveBadge>
                        )}
                        {feature.comingSoon && (
                          <ComingSoonBadge>
                            Coming Soon
                          </ComingSoonBadge>
                        )}
                        <Box>
                          <IconWrapper>
                            <feature.icon />
                          </IconWrapper>
                          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                            {feature.description}
                          </Typography>
                          <FeatureList>
                            {feature.features.map((item, idx) => (
                              <FeatureItem key={idx}>
                                <CheckCircle />
                                <Typography variant="body2" color="text.secondary">
                                  {item}
                                </Typography>
                              </FeatureItem>
                            ))}
                          </FeatureList>
                        </Box>
                        {feature.link && (
                          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(167, 218, 219, 0.1)' }}>
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'primary.main',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                              }}
                            >
                              Try it now →
                            </Typography>
                          </Box>
                        )}
                      </FeatureCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </CategorySection>
          </Container>
        </FeaturesSection>
      </SectionWrapper>

      {/* Learning Features */}
      <SectionWrapper className="visible" ref={learningRef}>
        <FeaturesSection>
          <Container maxWidth="lg">
            <CategorySection>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={learningInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
              >
                <CategoryHeader>
                  <AnimatedChip label="Core Capabilities" sx={{ mb: 3 }} />
                  <Typography variant="h3" sx={{ mb: 3, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                    Built for <AccentText>Learning Excellence</AccentText>
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem', maxWidth: '800px' }}>
                    Every feature is designed to help you create exceptional learning experiences that drive real business results.
                  </Typography>
                </CategoryHeader>
              </motion.div>

              <Grid container spacing={4} sx={{ width: '100%', margin: 0 }}>
                {learningFeatures.map((feature, index) => (
                  <Grid size={{ xs: 12, md: 6 }} key={feature.title} sx={{ display: 'flex' }}>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={learningInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                      transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                      style={{ width: '100%', display: 'flex' }}
                    >
                      <FeatureCard sx={{ width: '100%' }}>
                        <Box>
                          <IconWrapper>
                            <feature.icon />
                          </IconWrapper>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                            {feature.description}
                          </Typography>
                        </Box>
                      </FeatureCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </CategorySection>
          </Container>
        </FeaturesSection>
      </SectionWrapper>

      {/* Business Value */}
      <SectionWrapper className="visible" ref={businessRef}>
        <FeaturesSection>
          <Container maxWidth="lg">
            <CategorySection>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={businessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
              >
                <CategoryHeader>
                  <AnimatedChip label="Business Impact" sx={{ mb: 3 }} />
                  <Typography variant="h3" sx={{ mb: 3, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                    Measurable <AccentText>Business Value</AccentText>
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem', maxWidth: '800px' }}>
                    Smartslate delivers tangible results that impact your bottom line—from reduced costs to improved learning outcomes.
                  </Typography>
                </CategoryHeader>
              </motion.div>

              <Grid container spacing={4} sx={{ width: '100%', margin: 0 }}>
                {businessFeatures.map((feature, index) => (
                  <Grid size={{ xs: 12, md: 6 }} key={feature.title} sx={{ display: 'flex' }}>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={businessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                      transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                      style={{ width: '100%', display: 'flex' }}
                    >
                      <FeatureCard sx={{ width: '100%' }}>
                        <Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                            <IconWrapper>
                              <feature.icon />
                            </IconWrapper>
                            <Box sx={{ textAlign: 'right' }}>
                              <Typography
                                variant="h4"
                                sx={{
                                  color: 'primary.main',
                                  fontWeight: 700,
                                  fontSize: { xs: '2rem', md: '2.5rem' }
                                }}
                              >
                                {feature.metric}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {feature.metricLabel}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                            {feature.description}
                          </Typography>
                        </Box>
                      </FeatureCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </CategorySection>

            {/* CTA Section */}
            <Box sx={{ textAlign: 'left', mt: 10, pt: 8, borderTop: '1px solid rgba(167, 218, 219, 0.1)' }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={businessInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Typography variant="h3" sx={{ mb: 3, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                  Ready to Transform Your <AccentText>Learning Programs</AccentText>?
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.125rem', maxWidth: '700px' }}>
                  See how Smartslate can help you build a future-ready workforce with intelligent, scalable learning solutions.
                </Typography>
                <Link href="/contact" passHref style={{ textDecoration: 'none' }}>
                  <PrimaryButton
                    variant="contained"
                    size="large"
                    endIcon={<EmojiObjects className="icon-anim icon-pulse" />}
                  >
                    Schedule a Demo
                  </PrimaryButton>
                </Link>
              </motion.div>
            </Box>
          </Container>
        </FeaturesSection>
      </SectionWrapper>

    </PageWrapper>
  );
}
