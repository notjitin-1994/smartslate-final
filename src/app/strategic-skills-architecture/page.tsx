'use client';

import { motion } from 'framer-motion';
import { Box, Container, Typography, Button, Grid, Card, CardContent, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  ArrowForward,
  Architecture,
  Lock,
  Straighten,
  School,
  Business,
  TrendingUp,
  CheckCircle,
  Lightbulb,
  Security,
  Engineering,
  HealthAndSafety,
  AccountBalance,
  Biotech,
  Factory,
  Gavel,
  CloudUpload,
  Timeline,
  Assessment,
  Build,
  Verified,
  RocketLaunch,
} from '@mui/icons-material';

// Styled Components
const PageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  background: theme.palette.background.default,
  overflow: 'hidden',
}));

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  padding: `${theme.spacing(20)} 0 ${theme.spacing(12)} 0`,
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    minHeight: '80vh',
    padding: `${theme.spacing(16)} 0 ${theme.spacing(8)} 0`,
  },
}));

const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(6.5)} 0`,
  position: 'relative',
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(5)} 0`,
  },
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(13, 27, 42, 0.7)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(167, 218, 219, 0.15)',
  borderRadius: '16px',
  padding: theme.spacing(4),
  height: '100%',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  willChange: 'transform, box-shadow',
  backfaceVisibility: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: '0 20px 40px rgba(167, 218, 219, 0.25)',
    background: 'rgba(13, 27, 42, 0.85)',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: theme.palette.primary.main,
    outlineOffset: '2px',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
    '&:hover': {
      transform: 'none',
    },
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  background: 'rgba(13, 27, 42, 0.7)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(167, 218, 219, 0.15)',
  borderRadius: '16px',
  padding: theme.spacing(4),
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  willChange: 'transform, box-shadow',
  backfaceVisibility: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: theme.palette.primary.main,
    boxShadow: '0 24px 48px rgba(167, 218, 219, 0.35)',
    background: 'rgba(13, 27, 42, 0.85)',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: theme.palette.primary.main,
    outlineOffset: '2px',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
    '&:hover': {
      transform: 'none',
    },
  },
}));

const AccentText = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
}));

const GradientHeadline = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(135deg, #a7dadb 0%, #d0edf0 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
  fontWeight: 700,
  lineHeight: 1.1,
  marginBottom: theme.spacing(3),
}));

const SectionChip = styled(Chip)(({ theme }) => ({
  background: 'rgba(167, 218, 219, 0.15)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(167, 218, 219, 0.3)',
  color: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: '0.875rem',
  padding: theme.spacing(1.5, 1.5),
  height: 'auto',
  letterSpacing: '0.5px',
  '& .MuiChip-icon': {
    fontSize: '1.25rem',
    marginLeft: theme.spacing(1),
  },
}));

const PillarCard = styled(Box)(({ theme }) => ({
  background: 'rgba(13, 27, 42, 0.7)',
  backdropFilter: 'blur(20px)',
  border: '2px solid rgba(167, 218, 219, 0.2)',
  borderRadius: '20px',
  padding: theme.spacing(5),
  height: '100%',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, #a7dadb, #d0edf0)',
  },
  '&:hover': {
    borderColor: theme.palette.primary.main,
    background: 'rgba(13, 27, 42, 0.85)',
    transform: 'translateY(-10px)',
    boxShadow: '0 28px 56px rgba(167, 218, 219, 0.4)',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: theme.palette.primary.main,
    outlineOffset: '2px',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
    '&:hover': {
      transform: 'none',
    },
  },
}));

// Use Case Data
const useCases = [
  {
    icon: <Engineering sx={{ fontSize: 40 }} />,
    title: 'Digital Transformation',
    description: 'Reskilling teams on proprietary technology stacks, change management, and new workflows',
    examples: [
      'Custom cloud migration training',
      'Internal platform adoption programs',
      'DevOps transformation curriculum',
    ],
  },
  {
    icon: <HealthAndSafety sx={{ fontSize: 40 }} />,
    title: 'Regulatory Compliance',
    description: 'Industry-specific training for healthcare, finance, pharma, and highly regulated sectors',
    examples: [
      'HIPAA & patient data security',
      'Financial compliance & risk management',
      'FDA protocols & quality systems',
    ],
  },
  {
    icon: <RocketLaunch sx={{ fontSize: 40 }} />,
    title: 'Product & Technology',
    description: 'Train teams on proprietary platforms, complex products, and customer-facing systems',
    examples: [
      'Internal tools & systems training',
      'Product certification programs',
      'Technical sales enablement',
    ],
  },
  {
    icon: <TrendingUp sx={{ fontSize: 40 }} />,
    title: 'Leadership Development',
    description: 'Custom executive education aligned with company values and strategic objectives',
    examples: [
      'Executive leadership programs',
      'High-potential development tracks',
      'Succession planning curriculum',
    ],
  },
  {
    icon: <Factory sx={{ fontSize: 40 }} />,
    title: 'Manufacturing & Operations',
    description: 'Specialized training for production processes, quality control, and operational excellence',
    examples: [
      'Lean manufacturing methodologies',
      'Six Sigma certification programs',
      'Safety & operational compliance',
    ],
  },
  {
    icon: <Biotech sx={{ fontSize: 40 }} />,
    title: 'Industry Expertise',
    description: 'Deep domain knowledge transfer for specialized sectors and technical disciplines',
    examples: [
      'Biotechnology & lab protocols',
      'Advanced manufacturing techniques',
      'Specialized engineering practices',
    ],
  },
];

// Process Phases
const processPhases = [
  {
    number: '01',
    title: 'Discovery',
    duration: '2-4 Weeks',
    description: 'Deep dive into your organization, stakeholder interviews, skills gap analysis, and success metrics definition',
    deliverables: [
      'Comprehensive needs assessment',
      'Skills gap report',
      'Success criteria framework',
    ],
  },
  {
    number: '02',
    title: 'Design',
    duration: '4-6 Weeks',
    description: 'Custom curriculum architecture, learning experience design, and technology integration planning',
    deliverables: [
      'Complete curriculum blueprint',
      'Learning journey maps',
      'Assessment framework',
    ],
  },
  {
    number: '03',
    title: 'Development',
    duration: '8-16 Weeks',
    description: 'Bespoke content creation, interactive module development, and rigorous quality assurance',
    deliverables: [
      'Custom learning content',
      'Interactive assessments',
      'Facilitator guides',
    ],
  },
  {
    number: '04',
    title: 'Deployment',
    duration: 'Ongoing',
    description: 'Program launch, learner support, performance measurement, and continuous optimization',
    deliverables: [
      'Launch & rollout support',
      'Analytics & insights',
      'Continuous improvement',
    ],
  },
];

// Competitive Advantages
const advantages = [
  {
    icon: <Architecture />,
    title: 'Not Adapted. Built from Scratch.',
    description: 'Every program is designed exclusively for your organization—not a generic course with your logo slapped on it.',
  },
  {
    icon: <Lock />,
    title: 'Your IP. Forever.',
    description: 'Custom content becomes your proprietary intellectual property. We never share, resell, or repurpose it.',
  },
  {
    icon: <Straighten />,
    title: 'Precision Skill Enhancement',
    description: 'Laser-focused on critical gaps identified through comprehensive analysis. No wasted training spend.',
  },
  {
    icon: <Verified />,
    title: 'Outcome-Obsessed',
    description: 'Every feature, every module evaluated against measurable business impact. ROI tracking built-in from day one.',
  },
  {
    icon: <CloudUpload />,
    title: 'Technology Agnostic',
    description: 'Seamlessly integrates with your existing LMS, HRIS, and collaboration tools. We meet you where you are.',
  },
  {
    icon: <Timeline />,
    title: 'Continuous Evolution',
    description: 'Programs adapt as your business evolves. Quarterly reviews and content updates ensure sustained relevance.',
  },
];

export default function StrategicSkillsArchitecturePage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [problemRef, problemInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [solutionRef, solutionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [useCasesRef, useCasesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [advantagesRef, advantagesInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <PageWrapper>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'left' }}>
              <SectionChip
                icon={<Architecture />}
                label="Strategic Skills Architecture"
                sx={{ mb: 4 }}
              />
              <GradientHeadline variant="h1">
                When Generic Training<br />Isn&apos;t Enough
              </GradientHeadline>
              <Typography
                variant="h5"
                component="p"
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.75rem' },
                  color: 'text.primary',
                  fontWeight: 600,
                  mb: 5,
                  maxWidth: '900px',
                  lineHeight: 1.6,
                }}
              >
                Bespoke learning solutions built exclusively for your business DNA.
                <br />
                <Box component="span" sx={{ color: 'primary.main' }}>
                  Not adapted. Not customized. Built from scratch, for you.
                </Box>
              </Typography>

              {/* Value Props */}
              <Grid container spacing={3} sx={{ mb: 6 }}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '12px',
                        background: 'rgba(167, 218, 219, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Architecture sx={{ fontSize: 28, color: 'primary.main' }} />
                    </Box>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                        Signature Content
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Built from the ground up
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '12px',
                        background: 'rgba(167, 218, 219, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Lock sx={{ fontSize: 28, color: 'primary.main' }} />
                    </Box>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                        Your IP Forever
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Proprietary to you alone
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '12px',
                        background: 'rgba(167, 218, 219, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Straighten sx={{ fontSize: 28, color: 'primary.main' }} />
                    </Box>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                        Precision Skills
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Laser-focused on gaps
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', gap: 3, justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  href="/contact"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 5,
                    py: 2,
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #4F46E5, #3730A3)',
                    boxShadow: '0 8px 32px rgba(79, 70, 229, 0.4)',
                    minWidth: '44px',
                    minHeight: '44px',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4338ca, #312e81)',
                      boxShadow: '0 12px 40px rgba(79, 70, 229, 0.5)',
                      transform: 'translateY(-2px)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                    '&:focus-visible': {
                      outline: '3px solid',
                      outlineColor: 'secondary.main',
                      outlineOffset: '2px',
                    },
                  }}
                >
                  Schedule Consultation
                </Button>
                <Button
                  component={Link}
                  href="/contact"
                  variant="outlined"
                  size="large"
                  endIcon={<Assessment />}
                  sx={{
                    px: 4,
                    py: 2,
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    background: 'transparent',
                    minWidth: '44px',
                    minHeight: '44px',
                    '&:hover': {
                      borderColor: 'primary.light',
                      backgroundColor: 'rgba(167, 218, 219, 0.08)',
                    },
                    '&:focus-visible': {
                      outline: '3px solid',
                      outlineColor: 'primary.main',
                      outlineOffset: '2px',
                    },
                  }}
                >
                  Request Needs Assessment
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </HeroSection>

      {/* Problem Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <motion.div
            ref={problemRef}
            initial={{ opacity: 0 }}
            animate={problemInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'left', mb: 10 }}>
              <SectionChip
                icon={<Lightbulb />}
                label="The Challenge"
                sx={{
                  mb: 4,
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  color: 'warning.main',
                  '& .MuiChip-icon': {
                    color: 'warning.main',
                  },
                }}
              />
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 700,
                  mt: 2,
                  mb: 4,
                  lineHeight: 1.2,
                }}
              >
                Generic Solutions for <AccentText>Unique Challenges</AccentText>
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  color: 'text.primary',
                  maxWidth: '900px',
                  lineHeight: 1.8,
                  mb: 5,
                }}
              >
                Every organization has specific challenges that off-the-shelf training simply cannot address:
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={problemInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <GlassCard tabIndex={0} role="article" aria-label="Proprietary technology stacks challenge">
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '16px',
                          background: 'rgba(239, 68, 68, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 3,
                        }}
                      >
                        <Engineering sx={{ fontSize: 32, color: 'error.main' }} />
                      </Box>
                    </Box>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 3, color: 'error.main' }}>
                      Proprietary Tech Stacks
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                      Your internal platforms, custom tools, and specialized systems aren&apos;t covered in any LinkedIn Learning course.
                      You need training built specifically for your technology ecosystem.
                    </Typography>
                  </GlassCard>
                </motion.div>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={problemInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <GlassCard tabIndex={0} role="article" aria-label="Specialized industry knowledge challenge">
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '16px',
                          background: 'rgba(239, 68, 68, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 3,
                        }}
                      >
                        <Biotech sx={{ fontSize: 32, color: 'error.main' }} />
                      </Box>
                    </Box>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 3, color: 'error.main' }}>
                      Specialized Industry Knowledge
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                      Your industry has unique regulatory requirements, compliance standards, and domain expertise that generic content
                      cannot adequately address. You need industry-specific curriculum.
                    </Typography>
                  </GlassCard>
                </motion.div>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={problemInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <GlassCard tabIndex={0} role="article" aria-label="Company-specific processes challenge">
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '16px',
                          background: 'rgba(239, 68, 68, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 3,
                        }}
                      >
                        <Business sx={{ fontSize: 32, color: 'error.main' }} />
                      </Box>
                    </Box>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 3, color: 'error.main' }}>
                      Company-Specific Processes
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                      Your methodologies, workflows, and operational processes are what make you different from competitors.
                      Generic training teaches employees to be replaceable, not indispensable.
                    </Typography>
                  </GlassCard>
                </motion.div>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={problemInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <GlassCard tabIndex={0} role="article" aria-label="Cultural nuances challenge">
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '16px',
                          background: 'rgba(239, 68, 68, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 3,
                        }}
                      >
                        <School sx={{ fontSize: 32, color: 'error.main' }} />
                      </Box>
                    </Box>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 3, color: 'error.main' }}>
                      Cultural Nuances
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                      Your organizational culture, values, and internal language create context that external training providers
                      cannot replicate. You need content that speaks your team&apos;s language.
                    </Typography>
                  </GlassCard>
                </motion.div>
              </Grid>
            </Grid>

            <Box
              sx={{
                mt: 8,
                p: 4,
                background: 'rgba(239, 68, 68, 0.08)',
                border: '2px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '16px',
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'error.main', mb: 2 }}>
                The Cost of Generic Training
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                When training doesn&apos;t address your specific challenges, you waste budget on content that doesn&apos;t stick,
                skills that don&apos;t transfer, and ROI you can&apos;t measure. <strong>You deserve better.</strong>
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* Solution Section - Three Pillars */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <motion.div
            ref={solutionRef}
            initial={{ opacity: 0 }}
            animate={solutionInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'left', mb: 10 }}>
              <SectionChip
                icon={<Architecture />}
                label="The Solution"
                sx={{ mb: 4 }}
              />
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 700,
                  mt: 2,
                  mb: 4,
                  lineHeight: 1.2,
                }}
              >
                Your Competitive <AccentText>Learning Advantage</AccentText>
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  color: 'text.primary',
                  maxWidth: '900px',
                  lineHeight: 1.8,
                }}
              >
                Strategic Skills Architecture delivers custom learning solutions built exclusively for your organization.
                Not adapted. Not customized. <strong>Built from scratch for your business DNA.</strong>
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 4 }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={solutionInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <PillarCard tabIndex={0} role="article" aria-label="Signature content creation pillar">
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, #a7dadb, #d0edf0)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 4,
                        boxShadow: '0 12px 32px rgba(167, 218, 219, 0.4)',
                      }}
                    >
                      <Architecture sx={{ fontSize: 40, color: '#091521' }} />
                    </Box>
                    <Typography variant="h4" component="h3" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
                      Signature Content Creation
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', mb: 3, lineHeight: 1.8 }}>
                      Every program created from the ground up—custom modules, real-world case studies, and assessments that speak
                      your internal language and solve your actual business challenges.
                    </Typography>
                    <Box sx={{ mt: 4 }}>
                      <CheckCircle sx={{ fontSize: 20, color: 'primary.main', mr: 1.5, verticalAlign: 'middle' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', display: 'inline' }}>
                        Content designed for your context
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <CheckCircle sx={{ fontSize: 20, color: 'primary.main', mr: 1.5, verticalAlign: 'middle' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', display: 'inline' }}>
                        Scenarios based on real challenges
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <CheckCircle sx={{ fontSize: 20, color: 'primary.main', mr: 1.5, verticalAlign: 'middle' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', display: 'inline' }}>
                        Aligned with organizational structure
                      </Typography>
                    </Box>
                  </PillarCard>
                </motion.div>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={solutionInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <PillarCard tabIndex={0} role="article" aria-label="IP ownership pillar">
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, #a7dadb, #d0edf0)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 4,
                        boxShadow: '0 12px 32px rgba(167, 218, 219, 0.4)',
                      }}
                    >
                      <Lock sx={{ fontSize: 40, color: '#091521' }} />
                    </Box>
                    <Typography variant="h4" component="h3" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
                      Your IP. Forever.
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', mb: 3, lineHeight: 1.8 }}>
                      Custom curriculum becomes your proprietary intellectual property. Completely confidential, never shared
                      with other clients, never resold. A competitive asset that gives you an edge.
                    </Typography>
                    <Box sx={{ mt: 4 }}>
                      <CheckCircle sx={{ fontSize: 20, color: 'primary.main', mr: 1.5, verticalAlign: 'middle' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', display: 'inline' }}>
                        Exclusive ownership guaranteed
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <CheckCircle sx={{ fontSize: 20, color: 'primary.main', mr: 1.5, verticalAlign: 'middle' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', display: 'inline' }}>
                        Never repurposed or resold
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <CheckCircle sx={{ fontSize: 20, color: 'primary.main', mr: 1.5, verticalAlign: 'middle' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', display: 'inline' }}>
                        Proprietary competitive advantage
                      </Typography>
                    </Box>
                  </PillarCard>
                </motion.div>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={solutionInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <PillarCard tabIndex={0} role="article" aria-label="Precision skill enhancement pillar">
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, #a7dadb, #d0edf0)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 4,
                        boxShadow: '0 12px 32px rgba(167, 218, 219, 0.4)',
                      }}
                    >
                      <Straighten sx={{ fontSize: 40, color: '#091521' }} />
                    </Box>
                    <Typography variant="h4" component="h3" sx={{ fontWeight: 700, mb: 3, color: 'primary.main' }}>
                      Precision Skill Enhancement
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', mb: 3, lineHeight: 1.8 }}>
                      Laser-focused on critical skill gaps identified through comprehensive analysis. Targeted curriculum,
                      outcome measurement, and continuous optimization. No wasted training spend.
                    </Typography>
                    <Box sx={{ mt: 4 }}>
                      <CheckCircle sx={{ fontSize: 20, color: 'primary.main', mr: 1.5, verticalAlign: 'middle' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', display: 'inline' }}>
                        Data-driven skills gap analysis
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <CheckCircle sx={{ fontSize: 20, color: 'primary.main', mr: 1.5, verticalAlign: 'middle' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', display: 'inline' }}>
                        Measurable performance impact
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      <CheckCircle sx={{ fontSize: 20, color: 'primary.main', mr: 1.5, verticalAlign: 'middle' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', display: 'inline' }}>
                        Continuous program optimization
                      </Typography>
                    </Box>
                  </PillarCard>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* Use Cases Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <motion.div
            ref={useCasesRef}
            initial={{ opacity: 0 }}
            animate={useCasesInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'left', mb: 10 }}>
              <SectionChip
                icon={<Business />}
                label="Use Cases"
                sx={{ mb: 4 }}
              />
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 700,
                  mt: 2,
                  mb: 4,
                  lineHeight: 1.2,
                }}
              >
                When You Need <AccentText>More Than Generic</AccentText>
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  color: 'text.primary',
                  maxWidth: '900px',
                  lineHeight: 1.8,
                }}
              >
                Strategic Skills Architecture programs address the unique challenges that off-the-shelf training simply cannot solve.
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {useCases.map((useCase, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={useCasesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <FeatureCard tabIndex={0} role="article" aria-label={`${useCase.title} use case`}>
                      <CardContent sx={{ p: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                          <Box
                            sx={{
                              width: 72,
                              height: 72,
                              borderRadius: '16px',
                              background: 'rgba(167, 218, 219, 0.2)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 3,
                            }}
                          >
                            <Box sx={{ color: 'primary.main' }}>
                              {useCase.icon}
                            </Box>
                          </Box>
                        </Box>
                        <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 2 }}>
                          {useCase.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
                          {useCase.description}
                        </Typography>
                        <Box sx={{ pl: 2, borderLeft: '3px solid', borderColor: 'primary.main' }}>
                          {useCase.examples.map((example, idx) => (
                            <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                              <CheckCircle sx={{ fontSize: 18, color: 'success.main', mr: 1.5, mt: 0.25 }} />
                              <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.6 }}>
                                {example}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                    </FeatureCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* Process Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <motion.div
            ref={processRef}
            initial={{ opacity: 0 }}
            animate={processInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'left', mb: 10 }}>
              <SectionChip
                icon={<Timeline />}
                label="Our Process"
                sx={{ mb: 4 }}
              />
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 700,
                  mt: 2,
                  mb: 4,
                  lineHeight: 1.2,
                }}
              >
                How We <AccentText>Build Excellence</AccentText>
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  color: 'text.primary',
                  maxWidth: '900px',
                  lineHeight: 1.8,
                }}
              >
                A proven four-phase approach that transforms insights into impact.
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {processPhases.map((phase, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={processInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <GlassCard tabIndex={0} role="article" aria-label={`Phase ${phase.number}: ${phase.title}`}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Chip
                          label={`Phase ${phase.number}`}
                          sx={{
                            fontWeight: 700,
                            fontSize: '0.875rem',
                            background: 'rgba(167, 218, 219, 0.2)',
                            color: 'primary.main',
                            px: 2,
                            py: 1,
                          }}
                        />
                        <Chip
                          label={phase.duration}
                          size="small"
                          sx={{
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            background: 'rgba(167, 218, 219, 0.1)',
                            color: 'text.secondary',
                            px: 1.5,
                          }}
                        />
                      </Box>
                      <Typography variant="h4" component="h3" sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}>
                        {phase.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.primary', mb: 3, lineHeight: 1.7 }}>
                        {phase.description}
                      </Typography>
                      <Box
                        sx={{
                          mt: 3,
                          pt: 3,
                          borderTop: '1px solid',
                          borderColor: 'rgba(167, 218, 219, 0.2)',
                        }}
                      >
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', mb: 2, display: 'block' }}>
                          Key Deliverables
                        </Typography>
                        {phase.deliverables.map((deliverable, idx) => (
                          <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1.5 }}>
                            <CheckCircle sx={{ fontSize: 18, color: 'primary.main', mr: 1.5, mt: 0.25 }} />
                            <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.6 }}>
                              {deliverable}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </GlassCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* Competitive Advantages Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <motion.div
            ref={advantagesRef}
            initial={{ opacity: 0 }}
            animate={advantagesInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'left', mb: 10 }}>
              <SectionChip
                icon={<Verified />}
                label="Why Strategic Skills Architecture"
                sx={{
                  mb: 4,
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  color: 'success.main',
                  '& .MuiChip-icon': {
                    color: 'success.main',
                  },
                }}
              />
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 700,
                  mt: 2,
                  mb: 4,
                  lineHeight: 1.2,
                }}
              >
                The <AccentText>Strategic Skills Architecture Difference</AccentText>
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  color: 'text.primary',
                  maxWidth: '900px',
                  lineHeight: 1.8,
                }}
              >
                Six competitive advantages that set Strategic Skills Architecture apart from traditional training providers.
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {advantages.map((advantage, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={advantagesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <GlassCard tabIndex={0} role="article" aria-label={advantage.title}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '16px',
                          background: 'rgba(34, 197, 94, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                        }}
                      >
                        <Box sx={{ color: 'success.main', fontSize: '2rem' }}>
                          {advantage.icon}
                        </Box>
                      </Box>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 2, color: 'success.main' }}>
                        {advantage.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                        {advantage.description}
                      </Typography>
                    </GlassCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* Final CTA Section */}
      <SectionWrapper
        sx={(theme) => ({
          backgroundColor: theme.palette.background.default,
          borderTop: '1px solid rgba(167, 218, 219, 0.2)',
          borderBottom: '1px solid rgba(167, 218, 219, 0.2)',
        })}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'left' }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                mb: 4,
                lineHeight: 1.2,
              }}
            >
              Ready to Build Your <AccentText>Competitive Learning Advantage</AccentText>?
            </Typography>
            <Typography
              variant="body1"
              component="p"
              sx={{
                fontSize: { xs: '1rem', md: '1.25rem' },
                color: 'text.primary',
                mb: 6,
                lineHeight: 1.8,
              }}
            >
              Stop settling for generic training that teaches your team the same skills as your competitors.
              Build proprietary learning experiences that create competitive advantage and drive measurable business outcomes.
            </Typography>

            <Box
              sx={{
                mb: 6,
                p: 4,
                background: 'rgba(167, 218, 219, 0.08)',
                border: '2px solid rgba(167, 218, 219, 0.3)',
                borderRadius: '16px',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 3 }}>
                What Happens Next:
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Chip
                      label="1"
                      sx={{
                        minWidth: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'rgba(167, 218, 219, 0.2)',
                        color: 'primary.main',
                        fontWeight: 700,
                      }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                        Discovery Call
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        30-minute consultation to understand your challenges
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Chip
                      label="2"
                      sx={{
                        minWidth: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'rgba(167, 218, 219, 0.2)',
                        color: 'primary.main',
                        fontWeight: 700,
                      }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                        Needs Assessment
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Complimentary skills gap analysis and proposal
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Chip
                      label="3"
                      sx={{
                        minWidth: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'rgba(167, 218, 219, 0.2)',
                        color: 'primary.main',
                        fontWeight: 700,
                      }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                        Custom Blueprint
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Detailed program design and implementation roadmap
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Chip
                      label="4"
                      sx={{
                        minWidth: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'rgba(167, 218, 219, 0.2)',
                        color: 'primary.main',
                        fontWeight: 700,
                      }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                        Partnership Launch
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Begin development and transformation journey
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'flex-start', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                href="/contact"
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #4F46E5, #3730A3)',
                  boxShadow: '0 8px 32px rgba(79, 70, 229, 0.4)',
                  minWidth: '44px',
                  minHeight: '44px',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4338ca, #312e81)',
                    boxShadow: '0 12px 40px rgba(79, 70, 229, 0.5)',
                    transform: 'translateY(-2px)',
                  },
                  '&:focus-visible': {
                    outline: '3px solid',
                    outlineColor: 'secondary.main',
                    outlineOffset: '2px',
                  },
                }}
              >
                Schedule Your Consultation
              </Button>
              <Button
                component={Link}
                href="/contact"
                variant="outlined"
                size="large"
                endIcon={<Assessment />}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  background: 'transparent',
                  minWidth: '44px',
                  minHeight: '44px',
                  '&:hover': {
                    borderColor: 'primary.light',
                    backgroundColor: 'rgba(167, 218, 219, 0.08)',
                  },
                  '&:focus-visible': {
                    outline: '3px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: '2px',
                  },
                }}
              >
                Request Needs Assessment
              </Button>
            </Box>
          </Box>
        </Container>
      </SectionWrapper>
    </PageWrapper>
  );
}
