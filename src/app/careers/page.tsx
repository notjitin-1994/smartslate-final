'use client';

import { useState, useRef } from 'react';
import { Box, Container, Typography, Button, Card, CardContent, Grid, Chip, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import StandardHero from '@/components/ui/StandardHero';
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
import {
  Psychology,
  Code,
  School,
  TrendingUp,
  Groups,
  EmojiEvents,
  Lightbulb,
  Rocket,
  CheckCircle,
  Star,
  AccessTime,
  LocationOn,
  AttachMoney,
  Balance,
  Handshake,
  AutoAwesome,
  WorkspacePremium,
  Diversity3,
  Timeline,
  Insights,
  RocketLaunch,
  PersonSearch,
  DesignServices,
  Computer,
  Biotech,
  Public,
  Speed,
  Security,
  CloudSync,
  Extension,
  Assessment,
  GroupWork,
  Schedule,
  VerifiedUser,
  BarChart,
  Lock,
  EmojiObjects,
  Hub,
  SmartToy,
  Extension as ExtensionIcon,
} from '@mui/icons-material';

const CareersSection = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(10)} 0`,
  backgroundColor: theme.palette.background.default,
  position: 'relative',
  overflow: 'hidden',
}));

const RoleCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: `1px solid rgba(255, 255, 255, 0.08)`,
  borderRadius: '20px',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 60px rgba(167, 218, 219, 0.3)',
    borderColor: theme.palette.primary.main,
    '&::before': {
      transform: 'scaleX(1)',
    },
  },
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

const ValueCard = styled(ContentCard)(({ theme }) => ({
  textAlign: 'left',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: theme.spacing(4),
}));

const BenefitCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: `1px solid rgba(255, 255, 255, 0.08)`,
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(167, 218, 219, 0.2)',
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

const roles = [
  {
    title: 'AI Engineer',
    icon: Psychology,
    description: 'Shape the future of learning by building cutting-edge AI systems that personalize education at scale.',
    responsibilities: [
      'Design and implement machine learning models for personalized learning',
      'Develop algorithms that adapt to individual learning styles',
      'Collaborate with product teams to integrate AI features',
      'Research and apply latest AI/ML advancements',
    ],
    requirements: [
      '3+ years of experience in machine learning and AI',
      'Strong programming skills in Python and TypeScript',
      'Experience with educational technology is a plus',
      'Passion for transforming education through technology',
    ],
    type: 'Full-time',
    location: 'Remote',
    equity: 'Competitive equity package',
  },
  {
    title: 'Full Stack Developer',
    icon: Code,
    description: 'Build robust, scalable platforms that deliver world-class learning experiences to millions of users.',
    responsibilities: [
      'Develop and maintain full-stack applications using modern frameworks',
      'Collaborate with cross-functional teams to deliver features',
      'Optimize applications for maximum speed and scalability',
      'Implement responsive and accessible user interfaces',
    ],
    requirements: [
      '4+ years of full-stack development experience',
      'Proficiency in React, Node.js, and modern databases',
      'Experience with cloud platforms (AWS, GCP, or Azure)',
      'Strong understanding of system design and architecture',
    ],
    type: 'Full-time',
    location: 'Remote',
    equity: 'Performance-based equity grants',
  },
  {
    title: 'Learning Experience Designer',
    icon: DesignServices,
    description: 'Create transformative learning experiences that engage, inspire, and drive measurable outcomes.',
    responsibilities: [
      'Design pedagogically sound learning pathways and curricula',
      'Collaborate with SMEs to transform content into engaging experiences',
      'Apply learning science principles to improve retention and engagement',
      'Measure and optimize learning effectiveness through data analysis',
    ],
    requirements: [
      '5+ years of experience in instructional design or learning experience design',
      'Deep understanding of learning science and pedagogical principles',
      'Experience with AI-powered learning tools is a plus',
      'Portfolio demonstrating innovative learning solutions',
    ],
    type: 'Full-time',
    location: 'Remote',
    equity: 'Results-based equity compensation',
  },
];

const values = [
  {
    icon: Balance,
    title: 'Equity First',
    description: 'We believe in fair compensation that reflects your impact. Our equity-based model ensures everyone shares in our collective success.',
  },
  {
    icon: TrendingUp,
    title: 'Results-Driven',
    description: 'Your remuneration grows with your impact. We reward measurable outcomes that drive our mission forward.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Culture',
    description: 'Thrive in an environment where bold ideas are celebrated. We provide the resources and freedom to push boundaries.',
  },
  {
    icon: Groups,
    title: 'Collaborative Excellence',
    description: 'Join a diverse team of passionate experts who support each other\'s growth and success.',
  },
];

const benefits = [
  {
    icon: AttachMoney,
    title: 'Competitive Base Salary',
    description: 'Market-competitive compensation that recognizes your expertise and experience.',
  },
  {
    icon: WorkspacePremium,
    title: 'Performance Equity',
    description: 'Generous equity grants that increase based on your measurable impact and results.',
  },
  {
    icon: AccessTime,
    title: 'Flexible Work',
    description: 'Complete remote flexibility with autonomy to design your ideal work environment.',
  },
  {
    icon: EmojiEvents,
    title: 'Growth Opportunities',
    description: 'Continuous learning budget, conference sponsorships, and clear career progression paths.',
  },
  {
    icon: Security,
    title: 'Comprehensive Health',
    description: 'Premium health, dental, and vision insurance for you and your family.',
  },
  {
    icon: Schedule,
    title: 'Unlimited PTO',
    description: 'Take the time you need to recharge and pursue your passions outside work.',
  },
];

const stats = [
  { number: '95%', label: 'Employee Satisfaction' },
  { number: '30%', label: 'Average Annual Equity Growth' },
  { number: '4.8/5', label: 'Work-Life Balance Rating' },
  { number: '50+', label: 'Countries Represented' },
];

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const rolesInView = useInView(rolesRef, { once: true, amount: 0.2 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.2 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.2 });

  return (
    <PageWrapper>
      {/* Hero Section */}
      <Box ref={heroRef}>
        <StandardHero
          title="Build the Future of Learning With Us"
          subtitle="Join a team that values equity, innovation, and results"
          description="At Smartslate, we're revolutionizing education through AI-powered learning experiences. We believe in fair compensation that reflects your impact, with equity-based remuneration that grows with your results."
          accentWords={['Future', 'Equity', 'Results']}
        >
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
            <PrimaryButton
              variant="contained"
              size="large"
              endIcon={<RocketLaunch className="icon-anim icon-float" />}
              onClick={() => rolesRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Open Positions
            </PrimaryButton>
            <Link href="/contact" passHref style={{ textDecoration: 'none' }}>
              <Button
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
                Learn About Our Culture
              </Button>
            </Link>
          </div>
        </StandardHero>
      </Box>

      {/* Stats Section */}
      <SectionWrapper className="visible" ref={statsRef}>
        <CareersSection>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ textAlign: 'left', mb: 6 }}>
                <AnimatedChip label="Why Join Smartslate" sx={{ mb: 3 }} />
                <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                  Join a Team That <AccentText>Values Your Impact</AccentText>
                </Typography>
              </Box>

              <StatsGrid>
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
                  >
                    <StatCard>
                      <StatNumber>{stat.number}</StatNumber>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </StatCard>
                  </motion.div>
                ))}
              </StatsGrid>
            </motion.div>
          </Container>
        </CareersSection>
      </SectionWrapper>

      {/* Open Roles Section */}
      <SectionWrapper className="visible" ref={rolesRef}>
        <CareersSection>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={rolesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ textAlign: 'left', mb: 6 }}>
                <AnimatedChip label="Open Positions" sx={{ mb: 3 }} />
                <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                  Find Your <AccentText>Perfect Role</AccentText>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem', maxWidth: '700px' }}>
                  We&apos;re looking for talented individuals who share our passion for transforming education through technology.
                </Typography>
              </Box>

              <Grid container spacing={4}>
                {roles.map((role, index) => (
                  <Grid size={{ xs: 12, md: 6 }} key={role.title}>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={rolesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                      transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                      style={{ height: '100%' }}
                    >
                      <RoleCard
                        onClick={() => setSelectedRole(selectedRole === index ? null : index)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <CardContent sx={{ p: 4, height: '100%' }}>
                          <IconWrapper>
                            <role.icon />
                          </IconWrapper>
                          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: 'text.primary' }}>
                            {role.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                            {role.description}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                            <Chip
                              label={role.type}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(167, 218, 219, 0.15)',
                                color: 'primary.main',
                                fontWeight: 600,
                              }}
                            />
                            <Chip
                              icon={<LocationOn sx={{ fontSize: '16px' }} />}
                              label={role.location}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(79, 70, 229, 0.15)',
                                color: 'secondary.light',
                                fontWeight: 600,
                              }}
                            />
                            <Chip
                              icon={<WorkspacePremium sx={{ fontSize: '16px' }} />}
                              label={role.equity}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                                color: 'success.main',
                                fontWeight: 600,
                              }}
                            />
                          </Box>

                          {selectedRole === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Box sx={{ mt: 3 }}>
                                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 700 }}>
                                  Key Responsibilities:
                                </Typography>
                                <List dense>
                                  {role.responsibilities.map((item, idx) => (
                                    <ListItem key={idx} sx={{ py: 0.5, px: 0 }}>
                                      <ListItemIcon sx={{ minWidth: 24, color: 'primary.main' }}>
                                        <CheckCircle fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary={item}
                                        primaryTypographyProps={{
                                          variant: 'body2',
                                          color: 'text.secondary',
                                          sx: { fontSize: '0.875rem' }
                                        }}
                                      />
                                    </ListItem>
                                  ))}
                                </List>

                                <Typography variant="subtitle2" sx={{ mt: 2, mb: 2, fontWeight: 700 }}>
                                  Requirements:
                                </Typography>
                                <List dense>
                                  {role.requirements.map((item, idx) => (
                                    <ListItem key={idx} sx={{ py: 0.5, px: 0 }}>
                                      <ListItemIcon sx={{ minWidth: 24, color: 'primary.main' }}>
                                        <Star fontSize="small" />
                                      </ListItemIcon>
                                      <ListItemText
                                        primary={item}
                                        primaryTypographyProps={{
                                          variant: 'body2',
                                          color: 'text.secondary',
                                          sx: { fontSize: '0.875rem' }
                                        }}
                                      />
                                    </ListItem>
                                  ))}
                                </List>

                                <Box sx={{ mt: 3, textAlign: 'center' }}>
                                  <Link href="/contact" passHref style={{ textDecoration: 'none' }}>
                                    <PrimaryButton
                                      variant="contained"
                                      size="large"
                                      fullWidth
                                      endIcon={<RocketLaunch />}
                                    >
                                      Apply Now
                                    </PrimaryButton>
                                  </Link>
                                </Box>
                              </Box>
                            </motion.div>
                          )}

                          <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'primary.main',
                                fontWeight: 600,
                                cursor: 'pointer',
                              }}
                            >
                              {selectedRole === index ? 'Show less' : 'Learn more →'}
                            </Typography>
                          </Box>
                        </CardContent>
                      </RoleCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Container>
        </CareersSection>
      </SectionWrapper>

      {/* Values Section */}
      <SectionWrapper className="visible" ref={valuesRef}>
        <CareersSection>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ textAlign: 'left', mb: 6 }}>
                <AnimatedChip label="Our Values" sx={{ mb: 3 }} />
                <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                  What We <AccentText>Stand For</AccentText>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem', maxWidth: '700px' }}>
                  Our culture is built on principles that empower every team member to do their best work.
                </Typography>
              </Box>

              <Grid container spacing={4}>
                {values.map((value, index) => (
                  <Grid size={{ xs: 12, md: 6 }} key={value.title}>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                      transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                      style={{ height: '100%' }}
                    >
                      <ValueCard>
                        <IconWrapper>
                          <value.icon />
                        </IconWrapper>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: 'text.primary' }}>
                          {value.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                          {value.description}
                        </Typography>
                      </ValueCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Container>
        </CareersSection>
      </SectionWrapper>

      {/* Benefits Section */}
      <SectionWrapper className="visible" ref={benefitsRef}>
        <CareersSection>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ textAlign: 'left', mb: 6 }}>
                <AnimatedChip label="Benefits & Perks" sx={{ mb: 3 }} />
                <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                  How We <AccentText>Invest in You</AccentText>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem', maxWidth: '700px' }}>
                  We offer comprehensive benefits that support your personal and professional growth.
                </Typography>
              </Box>

              <Grid container spacing={4}>
                {benefits.map((benefit, index) => (
                  <Grid size={{ xs: 12, md: 6 }} key={benefit.title}>
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                      transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
                      style={{ height: '100%' }}
                    >
                      <BenefitCard>
                        <CardContent sx={{ p: 4, textAlign: 'left', height: '100%' }}>
                          <IconWrapper>
                            <benefit.icon />
                          </IconWrapper>
                          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: 'text.primary' }}>
                            {benefit.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                            {benefit.description}
                          </Typography>
                        </CardContent>
                      </BenefitCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Container>
        </CareersSection>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper className="visible">
        <CareersSection>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'left', py: 8 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Typography variant="h3" sx={{ mb: 3, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                  Ready to <AccentText>Transform Education</AccentText> With Us?
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.125rem', maxWidth: '700px' }}>
                  Join a team that values your expertise, rewards your impact, and shares in your success through our equity-based compensation model.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                  <PrimaryButton
                    variant="contained"
                    size="large"
                    endIcon={<RocketLaunch className="icon-anim icon-pulse" />}
                    onClick={() => rolesRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Apply Now
                  </PrimaryButton>
                  <Link href="/contact" passHref style={{ textDecoration: 'none' }}>
                    <Button
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
                      Learn About Our Culture
                    </Button>
                  </Link>
                </Box>
              </motion.div>
            </Box>
          </Container>
        </CareersSection>
      </SectionWrapper>
    </PageWrapper>
  );
}