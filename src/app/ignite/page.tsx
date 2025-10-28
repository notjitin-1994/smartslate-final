'use client';

import { motion } from 'framer-motion';
import { Box, Container, Typography, Button, Grid, Card, CardContent, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  Verified,
  School,
  Work,
  Speed,
  Analytics,
  EmojiObjects,
  Code,
  BarChart,
  Palette,
  Cloud,
  CheckCircle,
  ArrowForward,
  Lightbulb,
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
  padding: `${theme.spacing(16)} 0`,
  position: 'relative',
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(12)} 0`,
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

const StatsCard = styled(Box)(({ theme }) => ({
  background: 'rgba(13, 27, 42, 0.7)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(167, 218, 219, 0.2)',
  borderRadius: '16px',
  padding: theme.spacing(4),
  textAlign: 'center',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  willChange: 'transform, box-shadow',
  backfaceVisibility: 'hidden',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 16px 32px rgba(167, 218, 219, 0.3)',
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

const ProgramCard = styled(Card)(({ theme }) => ({
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

const SocialProofChip = styled(Chip)(({ theme }) => ({
  background: 'rgba(167, 218, 219, 0.15)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(167, 218, 219, 0.3)',
  color: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: '0.875rem',
  padding: theme.spacing(1.5, 1),
  height: 'auto',
  '& .MuiChip-icon': {
    color: theme.palette.primary.main,
    fontSize: '1.25rem',
  },
}));

const OutcomesBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))',
  border: '1px solid rgba(34, 197, 94, 0.3)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
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

// Program Data
const programs = [
  {
    icon: <Code sx={{ fontSize: 40 }} />,
    title: 'Software Development',
    description: 'Full-stack development, modern frameworks, cloud-native applications',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker'],
    demand: 'High Demand',
    duration: '16 weeks',
    averageSalary: '₹6-9 LPA',
  },
  {
    icon: <BarChart sx={{ fontSize: 40 }} />,
    title: 'Data Analytics',
    description: 'Business intelligence, data visualization, predictive modeling',
    skills: ['SQL', 'Python', 'Tableau', 'Power BI', 'Statistics'],
    demand: 'High Demand',
    duration: '14 weeks',
    averageSalary: '₹5-8 LPA',
  },
  {
    icon: <TrendingUp sx={{ fontSize: 40 }} />,
    title: 'Digital Marketing',
    description: 'Growth strategies, SEO/SEM, social media, analytics',
    skills: ['SEO', 'Google Ads', 'Analytics', 'Content', 'Social Media'],
    demand: 'Growing',
    duration: '12 weeks',
    averageSalary: '₹4-7 LPA',
  },
  {
    icon: <EmojiObjects sx={{ fontSize: 40 }} />,
    title: 'Product Management',
    description: 'Strategy, roadmapping, user research, agile methodology',
    skills: ['Strategy', 'Agile', 'UX', 'Analytics', 'Stakeholder Mgmt'],
    demand: 'High Demand',
    duration: '14 weeks',
    averageSalary: '₹7-10 LPA',
  },
  {
    icon: <Cloud sx={{ fontSize: 40 }} />,
    title: 'Cloud & DevOps',
    description: 'Infrastructure, automation, CI/CD, containerization',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Jenkins', 'Git'],
    demand: 'Very High Demand',
    duration: '16 weeks',
    averageSalary: '₹7-11 LPA',
  },
  {
    icon: <Palette sx={{ fontSize: 40 }} />,
    title: 'UI/UX Design',
    description: 'User research, wireframing, prototyping, design systems',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'A/B Testing'],
    demand: 'Growing',
    duration: '12 weeks',
    averageSalary: '₹5-8 LPA',
  },
];

export default function IgnitePage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [problemRef, problemInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [solutionRef, solutionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [programsRef, programsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

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
                icon={<School />}
                label="Ignite Series"
                sx={{ mb: 4 }}
              />
              <GradientHeadline variant="h1">
                Transform Talent.<br />Transform India.
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
                12-16 week intensive programs that turn students into certified, industry-ready professionals
              </Typography>

              {/* Social Proof Stats */}
              <Box sx={{ display: 'flex', gap: 3, mb: 6, flexWrap: 'wrap' }}>
                <SocialProofChip
                  icon={<Analytics />}
                  label="95% Completion Rate"
                />
                <SocialProofChip
                  icon={<Verified />}
                  label="100% Skill Verified"
                />
                <SocialProofChip
                  icon={<Speed />}
                  label="Day 1 Ready"
                />
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
                  Apply to Ignite
                </Button>
                <Button
                  component={Link}
                  href="/contact"
                  variant="outlined"
                  size="large"
                  endIcon={<Work />}
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
                  Hire Our Graduates
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
                icon={<TrendingDown />}
                label="The Employability Gap"
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
                India&apos;s <AccentText>Employability Crisis</AccentText>
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
                Every year, <strong>6.5 million graduates</strong> enter India&apos;s workforce.
                Only <strong>1.6 million</strong> are actually ready to do the job.
                The rest? Brilliant, ambitious, eager to contribute—but lacking the specific, practical skills employers desperately need.
              </Typography>
            </Box>

            <Grid container spacing={4} sx={{ mt: 6 }}>
              <Grid size={{ xs: 6, md: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={problemInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <StatsCard tabIndex={0} role="article" aria-label="Time to productivity statistic">
                    <Typography variant="h3" sx={{ color: 'warning.main', fontWeight: 800, mb: 2 }}>
                      6-12
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                      Months to Productivity
                    </Typography>
                  </StatsCard>
                </motion.div>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={problemInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <StatsCard tabIndex={0} role="article" aria-label="Attrition rate statistic">
                    <Typography variant="h3" sx={{ color: 'warning.main', fontWeight: 800, mb: 2 }}>
                      40%
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                      Leave Within First Year
                    </Typography>
                  </StatsCard>
                </motion.div>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={problemInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <StatsCard tabIndex={0} role="article" aria-label="GDP impact statistic">
                    <Typography variant="h3" sx={{ color: 'warning.main', fontWeight: 800, mb: 2 }}>
                      $1.2T
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                      GDP Impact at Risk
                    </Typography>
                  </StatsCard>
                </motion.div>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={problemInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <StatsCard tabIndex={0} role="article" aria-label="Job readiness statistic">
                    <Typography variant="h3" sx={{ color: 'warning.main', fontWeight: 800, mb: 2 }}>
                      75%
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                      Graduates Not Job-Ready
                    </Typography>
                  </StatsCard>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* Solution Section */}
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
                icon={<Lightbulb />}
                label="How Ignite Works"
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
                How <AccentText>Ignite</AccentText> Works
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 4 }}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={solutionInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <GlassCard tabIndex={0} role="article" aria-label="Industry-forged curriculum">
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '16px',
                          background: 'rgba(167, 218, 219, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 3,
                        }}
                      >
                        <School sx={{ fontSize: 32, color: 'primary.main' }} />
                      </Box>
                      <Chip
                        label="01"
                        size="small"
                        sx={{
                          fontWeight: 700,
                          background: 'rgba(167, 218, 219, 0.15)',
                          color: 'primary.main',
                          px: 2,
                          py: 1,
                        }}
                      />
                    </Box>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 3 }}>
                      Industry-Forged Curriculum
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3 }}>
                      Built in collaboration with industry leaders who know exactly what skills they need.
                      Market-driven, skills-focused, project-based learning that evolves with industry demand.
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                      <CheckCircle sx={{ fontSize: 20, color: 'primary.main', mr: 1, verticalAlign: 'middle' }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Real hiring demand drives curriculum
                      </Typography>
                    </Box>
                  </GlassCard>
                </motion.div>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={solutionInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <GlassCard tabIndex={0} role="article" aria-label="Rigorous certification">
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '16px',
                          background: 'rgba(167, 218, 219, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 3,
                        }}
                      >
                        <Verified sx={{ fontSize: 32, color: 'primary.main' }} />
                      </Box>
                      <Chip
                        label="02"
                        size="small"
                        sx={{
                          fontWeight: 700,
                          background: 'rgba(167, 218, 219, 0.15)',
                          color: 'primary.main',
                          px: 2,
                          py: 1,
                        }}
                      />
                    </Box>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 3 }}>
                      Rigorous, Earned Certification
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3 }}>
                      Not a participation trophy. Certification is earned through demonstrated competency,
                      real-world projects, and strict quality standards. We certify capability, not effort.
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                      <CheckCircle sx={{ fontSize: 20, color: 'primary.main', mr: 1, verticalAlign: 'middle' }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Trusted signal employers rely on
                      </Typography>
                    </Box>
                  </GlassCard>
                </motion.div>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={solutionInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <GlassCard tabIndex={0} role="article" aria-label="Seamless talent pipeline">
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '16px',
                          background: 'rgba(167, 218, 219, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 3,
                        }}
                      >
                        <Work sx={{ fontSize: 32, color: 'primary.main' }} />
                      </Box>
                      <Chip
                        label="03"
                        size="small"
                        sx={{
                          fontWeight: 700,
                          background: 'rgba(167, 218, 219, 0.15)',
                          color: 'primary.main',
                          px: 2,
                          py: 1,
                        }}
                      />
                    </Box>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 3 }}>
                      Seamless Talent Pipeline
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3 }}>
                      Direct connection between certified graduates and employers actively hiring.
                      Pre-vetted candidates, skill transparency, reduced hiring risk, faster time-to-productivity.
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                      <CheckCircle sx={{ fontSize: 20, color: 'primary.main', mr: 1, verticalAlign: 'middle' }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Ready to contribute from day one
                      </Typography>
                    </Box>
                  </GlassCard>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* Programs Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <motion.div
            ref={programsRef}
            initial={{ opacity: 0 }}
            animate={programsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'left', mb: 10 }}>
              <SectionChip
                icon={<School />}
                label="Six Career Pathways"
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
                Build <AccentText>High-Demand</AccentText> Skills
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  color: 'text.primary',
                  maxWidth: '800px',
                  lineHeight: 1.8,
                }}
              >
                Comprehensive programs spanning the most in-demand sectors.
                Each designed with industry partners to ensure job-readiness.
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {programs.map((program, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={programsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProgramCard tabIndex={0} role="article" aria-label={`${program.title} program`}>
                      <CardContent sx={{ p: 0 }}>
                        <Box sx={{ p: 4 }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
                            <Box sx={{ color: 'primary.main' }}>
                              {program.icon}
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1.5 }}>
                              <Chip
                                label={program.duration}
                                size="small"
                                sx={{
                                  fontWeight: 600,
                                  fontSize: '0.75rem',
                                  background: 'rgba(167, 218, 219, 0.15)',
                                  color: 'primary.main',
                                  px: 2,
                                  py: 1,
                                }}
                              />
                              <Chip
                                label={program.demand}
                                size="small"
                                sx={{
                                  fontWeight: 600,
                                  fontSize: '0.75rem',
                                  background: 'rgba(34, 197, 94, 0.15)',
                                  color: 'success.main',
                                  px: 2,
                                  py: 1,
                                }}
                              />
                            </Box>
                          </Box>
                          <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 2 }}>
                            {program.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4, lineHeight: 1.7 }}>
                            {program.description}
                          </Typography>

                          {/* Skills */}
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 4 }}>
                            {program.skills.map((skill, idx) => (
                              <Chip
                                key={idx}
                                label={skill}
                                size="small"
                                sx={{
                                  fontSize: '0.75rem',
                                  background: 'rgba(167, 218, 219, 0.1)',
                                  border: '1px solid rgba(167, 218, 219, 0.2)',
                                  color: 'primary.main',
                                  px: 1.5,
                                  py: 0.5,
                                }}
                              />
                            ))}
                          </Box>

                          {/* Outcomes */}
                          <OutcomesBox>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Box>
                                <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 700, display: 'block' }}>
                                  Average Starting Salary
                                </Typography>
                                <Typography variant="h6" sx={{ color: 'success.main', fontWeight: 800 }}>
                                  {program.averageSalary}
                                </Typography>
                              </Box>
                              <Verified sx={{ fontSize: 32, color: 'success.main', opacity: 0.7 }} />
                            </Box>
                          </OutcomesBox>

                          {/* CTA */}
                          <Button
                            component={Link}
                            href="/contact"
                            variant="outlined"
                            size="small"
                            fullWidth
                            endIcon={<ArrowForward />}
                            sx={{
                              mt: 3,
                              borderColor: 'primary.main',
                              color: 'primary.main',
                              minHeight: '44px',
                              py: 1.5,
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
                            View Full Curriculum
                          </Button>
                        </Box>
                      </CardContent>
                    </ProgramCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* Impact Stats Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0 }}
            animate={statsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'left', mb: 10 }}>
              <SectionChip
                icon={<TrendingUp />}
                label="Proven Results"
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
                <AccentText>Transforming Lives</AccentText>, One Professional at a Time
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 4 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <StatsCard tabIndex={0} role="article" aria-label="Day one productivity">
                    <Speed sx={{ fontSize: 48, color: 'success.main', mb: 3 }} />
                    <Typography variant="h3" sx={{ color: 'success.main', fontWeight: 800, mb: 2 }}>
                      Day 1
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
                      Ready to Contribute
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 2 }}>
                      vs. 6-12 months with traditional hires
                    </Typography>
                  </StatsCard>
                </motion.div>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <StatsCard tabIndex={0} role="article" aria-label="Completion rate">
                    <Analytics sx={{ fontSize: 48, color: 'success.main', mb: 3 }} />
                    <Typography variant="h3" sx={{ color: 'success.main', fontWeight: 800, mb: 2 }}>
                      95%
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
                      Completion Rate
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 2 }}>
                      vs. 3-6% industry average
                    </Typography>
                  </StatsCard>
                </motion.div>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <StatsCard tabIndex={0} role="article" aria-label="Skill verification">
                    <Verified sx={{ fontSize: 48, color: 'success.main', mb: 3 }} />
                    <Typography variant="h3" sx={{ color: 'success.main', fontWeight: 800, mb: 2 }}>
                      100%
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
                      Skill Verified
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 2 }}>
                      Through real-world projects
                    </Typography>
                  </StatsCard>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </SectionWrapper>

      {/* CTA Section */}
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
              Ready to Close the <AccentText>Skills Gap</AccentText>?
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
              Whether you&apos;re a student seeking career-focused education, an employer building your talent pipeline,
              or an institution looking to improve graduate employability—Ignite is your solution.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'flex-start', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                href="/contact"
                variant="contained"
                size="large"
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
                Get Started Today
              </Button>
            </Box>
          </Box>
        </Container>
      </SectionWrapper>
    </PageWrapper>
  );
}
