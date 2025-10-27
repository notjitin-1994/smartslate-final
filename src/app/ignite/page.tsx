'use client';

import { motion } from 'framer-motion';
import { Box, Container, Typography, Button, Grid, Card, CardContent, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  TrendingUp,
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
  AttachMoney,
  CheckCircle,
  ArrowForward,
  Rocket
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
  minHeight: '90vh',
  display: 'flex',
  alignItems: 'center',
  padding: `${theme.spacing(20)} 0 ${theme.spacing(12)} 0`,
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    minHeight: '70vh',
    padding: `${theme.spacing(16)} 0 ${theme.spacing(8)} 0`,
  },
}));

const BackgroundGradient = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  zIndex: 0,
}));

const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(12)} 0`,
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(8)} 0`,
  },
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '24px',
  padding: theme.spacing(4),
  height: '100%',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: '0 24px 48px rgba(167, 218, 219, 0.2)',
  },
}));

const StatsCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(167, 218, 219, 0.2)',
  borderRadius: '20px',
  padding: theme.spacing(4),
  textAlign: 'left',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 32px rgba(167, 218, 219, 0.25)',
  },
}));

const ProgramCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '20px',
  padding: theme.spacing(3),
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: theme.palette.primary.main,
  },
  '&:hover': {
    transform: 'translateY(-6px)',
    borderColor: theme.palette.primary.main,
    boxShadow: '0 20px 40px rgba(167, 218, 219, 0.3)',
  },
}));

const AccentText = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
}));

// Program Data
const programs = [
  {
    icon: <Code sx={{ fontSize: 40 }} />,
    title: 'Software Development',
    description: 'Full-stack development, modern frameworks, cloud-native applications',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker'],
    demand: 'High Demand',
  },
  {
    icon: <BarChart sx={{ fontSize: 40 }} />,
    title: 'Data Analytics',
    description: 'Business intelligence, data visualization, predictive modeling',
    skills: ['SQL', 'Python', 'Tableau', 'Power BI', 'Statistics'],
    demand: 'High Demand',
  },
  {
    icon: <TrendingUp sx={{ fontSize: 40 }} />,
    title: 'Digital Marketing',
    description: 'Growth strategies, SEO/SEM, social media, analytics',
    skills: ['SEO', 'Google Ads', 'Analytics', 'Content', 'Social Media'],
    demand: 'Growing',
  },
  {
    icon: <EmojiObjects sx={{ fontSize: 40 }} />,
    title: 'Product Management',
    description: 'Strategy, roadmapping, user research, agile methodology',
    skills: ['Strategy', 'Agile', 'UX', 'Analytics', 'Stakeholder Mgmt'],
    demand: 'High Demand',
  },
  {
    icon: <Cloud sx={{ fontSize: 40 }} />,
    title: 'Cloud & DevOps',
    description: 'Infrastructure, automation, CI/CD, containerization',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Jenkins', 'Git'],
    demand: 'Very High Demand',
  },
  {
    icon: <Palette sx={{ fontSize: 40 }} />,
    title: 'UI/UX Design',
    description: 'User research, wireframing, prototyping, design systems',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'A/B Testing'],
    demand: 'Growing',
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
      <BackgroundGradient />

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
              <Chip
                label="Ignite Series"
                sx={{
                  mb: 3,
                  px: 2,
                  py: 0.5,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  background: 'rgba(167, 218, 219, 0.2)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(167, 218, 219, 0.3)',
                  color: 'primary.main',
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem', lg: '4.5rem' },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 3,
                  color: '#fff',
                }}
              >
                From Classroom to Career
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.75rem' },
                  color: 'primary.main',
                  fontWeight: 600,
                  mb: 4,
                  maxWidth: '900px',
                }}
              >
                A Direct Pipeline to Verified, Job-Ready Talent
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  color: 'text.secondary',
                  maxWidth: '800px',
                  mb: 6,
                  lineHeight: 1.8,
                }}
              >
                We transform promising students into high-performing professionals through{' '}
                <AccentText>industry-forged curriculum</AccentText>,{' '}
                <AccentText>rigorous certification</AccentText>, and{' '}
                <AccentText>real-world experience</AccentText>. Not a certificate of participation—a signal of capability.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  href="/contact"
                  variant="contained"
                  size="large"
                  endIcon={<Rocket />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    background: (theme) => theme.palette.primary.main,
                    boxShadow: '0 8px 32px rgba(167, 218, 219, 0.3)',
                    '&:hover': {
                      background: (theme) => theme.palette.primary.dark,
                      boxShadow: '0 12px 40px rgba(167, 218, 219, 0.4)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Start Your Journey
                </Button>
                <Button
                  component={Link}
                  href="/contact"
                  variant="outlined"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      borderColor: 'primary.light',
                      backgroundColor: 'rgba(167, 218, 219, 0.08)',
                    },
                  }}
                >
                  Partner With Us
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </HeroSection>

      {/* Problem Section */}
      <SectionWrapper sx={{ background: 'rgba(0, 0, 0, 0.2)' }}>
        <Container maxWidth="lg">
          <motion.div
            ref={problemRef}
            initial={{ opacity: 0 }}
            animate={problemInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'left', mb: 8 }}>
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  fontSize: '1rem',
                  letterSpacing: 2,
                }}
              >
                THE CHALLENGE
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 700,
                  mt: 2,
                  mb: 3,
                }}
              >
                India's <AccentText>Employability Crisis</AccentText>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  color: 'text.secondary',
                  maxWidth: '900px',
                  lineHeight: 1.8,
                }}
              >
                Every year, <strong>6.5 million graduates</strong> enter India's workforce.
                Only <strong>1.6 million</strong> are actually ready to do the job.
                The rest? Brilliant, ambitious, eager to contribute—but lacking the specific, practical skills employers desperately need.
              </Typography>
            </Box>

            <Grid container spacing={4} sx={{ mt: 4 }}>
              <Grid item xs={12} md={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={problemInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <StatsCard>
                    <Typography variant="h3" sx={{ color: 'error.main', fontWeight: 800, mb: 1 }}>
                      6-12
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      Months to Productivity
                    </Typography>
                  </StatsCard>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={problemInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <StatsCard>
                    <Typography variant="h3" sx={{ color: 'error.main', fontWeight: 800, mb: 1 }}>
                      40%
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      Leave Within First Year
                    </Typography>
                  </StatsCard>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={problemInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <StatsCard>
                    <Typography variant="h3" sx={{ color: 'error.main', fontWeight: 800, mb: 1 }}>
                      $1.2T
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      GDP Impact at Risk
                    </Typography>
                  </StatsCard>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={3}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={problemInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <StatsCard>
                    <Typography variant="h3" sx={{ color: 'error.main', fontWeight: 800, mb: 1 }}>
                      75%
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
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
            <Box sx={{ textAlign: 'left', mb: 8 }}>
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  fontSize: '1rem',
                  letterSpacing: 2,
                }}
              >
                THE SOLUTION
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 700,
                  mt: 2,
                  mb: 3,
                }}
              >
                How <AccentText>Ignite</AccentText> Works
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={solutionInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <GlassCard>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '16px',
                          background: 'rgba(167, 218, 219, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
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
                        }}
                      />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                      Industry-Forged Curriculum
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2 }}>
                      Built in collaboration with industry leaders who know exactly what skills they need.
                      Market-driven, skills-focused, project-based learning that evolves with industry demand.
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <CheckCircle sx={{ fontSize: 18, color: 'primary.main', mr: 1, verticalAlign: 'middle' }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Real hiring demand drives curriculum
                      </Typography>
                    </Box>
                  </GlassCard>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={solutionInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <GlassCard>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '16px',
                          background: 'rgba(167, 218, 219, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
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
                        }}
                      />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                      Rigorous, Earned Certification
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2 }}>
                      Not a participation trophy. Certification is earned through demonstrated competency,
                      real-world projects, and strict quality standards. We certify capability, not effort.
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <CheckCircle sx={{ fontSize: 18, color: 'primary.main', mr: 1, verticalAlign: 'middle' }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Trusted signal employers rely on
                      </Typography>
                    </Box>
                  </GlassCard>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={solutionInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <GlassCard>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '16px',
                          background: 'rgba(167, 218, 219, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
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
                        }}
                      />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                      Seamless Talent Pipeline
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2 }}>
                      Direct connection between certified graduates and employers actively hiring.
                      Pre-vetted candidates, skill transparency, reduced hiring risk, faster time-to-productivity.
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <CheckCircle sx={{ fontSize: 18, color: 'primary.main', mr: 1, verticalAlign: 'middle' }} />
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
      <SectionWrapper sx={{ background: 'rgba(0, 0, 0, 0.2)' }}>
        <Container maxWidth="lg">
          <motion.div
            ref={programsRef}
            initial={{ opacity: 0 }}
            animate={programsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'left', mb: 8 }}>
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  fontSize: '1rem',
                  letterSpacing: 2,
                }}
              >
                CERTIFICATION PROGRAMS
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 700,
                  mt: 2,
                  mb: 3,
                }}
              >
                Build <AccentText>High-Demand</AccentText> Skills
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  color: 'text.secondary',
                  maxWidth: '800px',
                  lineHeight: 1.8,
                }}
              >
                Comprehensive programs spanning the most in-demand sectors.
                Each designed with industry partners to ensure job-readiness.
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {programs.map((program, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={programsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProgramCard>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                          <Box sx={{ color: 'primary.main' }}>
                            {program.icon}
                          </Box>
                          <Chip
                            label={program.demand}
                            size="small"
                            sx={{
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              background: 'rgba(34, 197, 94, 0.15)',
                              color: 'success.main',
                            }}
                          />
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                          {program.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
                          {program.description}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
                              }}
                            />
                          ))}
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
            <Box sx={{ textAlign: 'left', mb: 8 }}>
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  fontSize: '1rem',
                  letterSpacing: 2,
                }}
              >
                THE IMPACT
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 700,
                  mt: 2,
                  mb: 3,
                }}
              >
                <AccentText>Transforming Lives</AccentText>, One Professional at a Time
              </Typography>
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <StatsCard>
                    <Speed sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 800, mb: 1 }}>
                      Day 1
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      Ready to Contribute
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
                      vs. 6-12 months with traditional hires
                    </Typography>
                  </StatsCard>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <StatsCard>
                    <Analytics sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 800, mb: 1 }}>
                      95%
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      Completion Rate
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
                      vs. 3-6% industry average
                    </Typography>
                  </StatsCard>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <StatsCard>
                    <Verified sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h3" sx={{ color: 'primary.main', fontWeight: 800, mb: 1 }}>
                      100%
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      Skill Verified
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
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
        sx={{
          background: 'rgba(167, 218, 219, 0.08)',
          borderTop: '1px solid rgba(167, 218, 219, 0.2)',
          borderBottom: '1px solid rgba(167, 218, 219, 0.2)',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'left' }}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 800,
                mb: 3,
              }}
            >
              Ready to Close the <AccentText>Skills Gap</AccentText>?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.25rem' },
                color: 'text.secondary',
                mb: 5,
                lineHeight: 1.8,
              }}
            >
              Whether you're a student seeking career-focused education, an employer building your talent pipeline,
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
                  background: (theme) => theme.palette.primary.main,
                  boxShadow: '0 8px 32px rgba(167, 218, 219, 0.3)',
                  '&:hover': {
                    background: (theme) => theme.palette.primary.dark,
                    boxShadow: '0 12px 40px rgba(167, 218, 219, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Get Started Today
              </Button>
              <Button
                component={Link}
                href="/contact"
                variant="outlined"
                size="large"
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.light',
                    backgroundColor: 'rgba(167, 218, 219, 0.08)',
                  },
                }}
              >
                Schedule a Call
              </Button>
            </Box>
          </Box>
        </Container>
      </SectionWrapper>
    </PageWrapper>
  );
}
