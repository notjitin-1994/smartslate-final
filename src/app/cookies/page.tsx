'use client';

import { useState, useRef } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import StandardHero from '@/components/ui/StandardHero';
import {
  PageWrapper,
  SectionWrapper,
  ContentCard,
  AccentText,
  AnimatedChip,
} from '@/components/landing/styles/LandingStyles';
import {
  Cookie,
  Security,
  Settings,
  Update,
  ContactSupport,
  Gavel,
  Storage,
  Language,
  CheckCircle,
  Info,
  Warning,
  PrivacyTip,
} from '@mui/icons-material';

// Styled Components
const CookieSection = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(10)} 0`,
  backgroundColor: theme.palette.background.default,
  position: 'relative',
  overflow: 'hidden',
}));

const SectionCard = styled(ContentCard)(({ theme }) => ({
  height: '100%',
  minHeight: 'auto',
  display: 'flex',
  flexDirection: 'column',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 56,
  height: 56,
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

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
    fontSize: '0.875rem',
    marginTop: theme.spacing(0.5),
    flexShrink: 0,
  },
}));

const HighlightBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: 'rgba(167, 218, 219, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(167, 218, 219, 0.2)',
  borderRadius: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

const InfoSubCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(167, 218, 219, 0.12)',
  borderRadius: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(167, 218, 219, 0.05)',
    borderColor: 'rgba(167, 218, 219, 0.25)',
  },
  '&:last-child': {
    marginBottom: 0,
  },
}));

const CookieTypeCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(167, 218, 219, 0.12)',
  borderRadius: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: 4,
    height: '100%',
    backgroundColor: theme.palette.primary.main,
  },
}));

const LastUpdatedBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  backgroundColor: 'rgba(79, 70, 229, 0.15)',
  border: '1px solid rgba(79, 70, 229, 0.3)',
  borderRadius: theme.spacing(3),
  marginTop: theme.spacing(2),
  '& .MuiSvgIcon-root': {
    fontSize: '1rem',
    color: theme.palette.secondary.main,
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 600,
  transition: 'all 0.2s ease',
  '&:hover': {
    color: theme.palette.primary.light,
    textDecoration: 'underline',
  },
  '&:focus-visible': {
    outline: `3px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
    borderRadius: '4px',
  },
}));

const CookieTable = styled(Box)(({ theme }) => ({
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: theme.spacing(2),
  '& th, & td': {
    padding: theme.spacing(1.5),
    textAlign: 'left',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '& th': {
    backgroundColor: 'rgba(167, 218, 219, 0.1)',
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  '& tr:hover': {
    backgroundColor: 'rgba(167, 218, 219, 0.05)',
  },
}));

export default function CookiePolicyPage() {
  const [currentDate] = useState(new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }));

  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);

  const section1InView = useInView(section1Ref, { once: true, amount: 0.2 });
  const section2InView = useInView(section2Ref, { once: true, amount: 0.2 });
  const section3InView = useInView(section3Ref, { once: true, amount: 0.2 });
  const section4InView = useInView(section4Ref, { once: true, amount: 0.2 });

  return (
    <PageWrapper>
      {/* Hero Section */}
      <StandardHero
        title="Cookie Policy"
        subtitle="Your privacy and choice matter"
        description="At Smartslate, we use cookies to enhance your experience and provide personalized learning solutions. This policy explains how we use cookies and your choices regarding them."
        accentWords={['Cookies', 'Privacy', 'Choice']}
      >
        <LastUpdatedBadge>
          <Update />
          <Typography variant="caption" sx={{ fontWeight: 600, color: 'secondary.light' }}>
            Last updated: {currentDate}
          </Typography>
        </LastUpdatedBadge>
      </StandardHero>

      {/* Section 1: Introduction & What are Cookies */}
      <SectionWrapper className="visible">
        <CookieSection ref={section1Ref}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 6 }}>
              <AnimatedChip label="Cookie Overview" sx={{ mb: 3 }} />
              <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                Understanding <AccentText>Cookies and Their Purpose</AccentText>
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* Introduction */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={section1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.8 }}
                  style={{ height: '100%' }}
                >
                  <SectionCard>
                    <SectionHeader>
                      <IconWrapper>
                        <Cookie />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          1. What Are Cookies?
                        </Typography>
                      </Box>
                    </SectionHeader>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                      Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They help us provide you with a better experience by:
                    </Typography>
                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Remembering your preferences and settings
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Keeping you logged in to your account
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Understanding how you use our Services
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Providing personalized content and recommendations
                      </Typography>
                    </FeatureItem>
                    <HighlightBox>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '0.875rem' }}>
                        <strong>Legal Compliance:</strong> Our use of cookies complies with the Information Technology Act, 2000, and relevant data protection regulations in India.
                      </Typography>
                    </HighlightBox>
                  </SectionCard>
                </motion.div>
              </Grid>

              {/* Types of Cookies */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={section1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{ height: '100%' }}
                >
                  <SectionCard>
                    <SectionHeader>
                      <IconWrapper>
                        <Settings />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          2. Types of Cookies We Use
                        </Typography>
                      </Box>
                    </SectionHeader>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1.5 }}>
                        Essential Cookies
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                        Required for the website to function properly, including security, authentication, and basic functionality.
                      </Typography>
                    </InfoSubCard>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1.5 }}>
                        Performance Cookies
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                        Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                      </Typography>
                    </InfoSubCard>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1.5 }}>
                        Functional Cookies
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                        Enable enhanced functionality and personalization, such as remembering your preferences and login status.
                      </Typography>
                    </InfoSubCard>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1.5 }}>
                        Marketing Cookies
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                        Used to deliver advertisements that are relevant to you and your interests, both on and off our website.
                      </Typography>
                    </InfoSubCard>
                  </SectionCard>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </CookieSection>
      </SectionWrapper>

      {/* Section 2: How We Use Cookies & Cookie Details */}
      <SectionWrapper className="visible">
        <CookieSection ref={section2Ref}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 6 }}>
              <AnimatedChip label="Cookie Usage" sx={{ mb: 3 }} />
              <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                How We Use <AccentText>Cookies on Smartslate</AccentText>
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* How We Use Cookies */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={section2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.8 }}
                  style={{ height: '100%' }}
                >
                  <SectionCard>
                    <SectionHeader>
                      <IconWrapper>
                        <Security />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          3. Specific Uses of Cookies
                        </Typography>
                      </Box>
                    </SectionHeader>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3, fontSize: '0.875rem' }}>
                      We use cookies for the following specific purposes:
                    </Typography>

                    <CookieTypeCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        Authentication & Security
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Keep you logged in and protect your account from unauthorized access.
                      </Typography>
                    </CookieTypeCard>

                    <CookieTypeCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        Learning Experience
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Track your learning progress and provide personalized recommendations.
                      </Typography>
                    </CookieTypeCard>

                    <CookieTypeCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        Website Performance
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Analyze website usage to improve performance and user experience.
                      </Typography>
                    </CookieTypeCard>

                    <CookieTypeCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        Communication
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Enable features like chat, notifications, and customer support.
                      </Typography>
                    </CookieTypeCard>
                  </SectionCard>
                </motion.div>
              </Grid>

              {/* Cookie Details Table */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={section2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{ height: '100%' }}
                >
                  <SectionCard>
                    <SectionHeader>
                      <IconWrapper>
                        <Storage />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          4. Cookie Details
                        </Typography>
                      </Box>
                    </SectionHeader>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3, fontSize: '0.875rem' }}>
                      Here are the main cookies we use on our platform:
                    </Typography>

                    <Box sx={{ overflowX: 'auto' }}>
                      <Box
                        component="table"
                        sx={{
                          width: '100%',
                          borderCollapse: 'collapse',
                          mt: 2,
                          '& th, & td': {
                            p: 1.5,
                            textAlign: 'left',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                          },
                          '& th': {
                            backgroundColor: 'rgba(167, 218, 219, 0.1)',
                            fontWeight: 600,
                            color: 'primary.main',
                          },
                          '& tr:hover': {
                            backgroundColor: 'rgba(167, 218, 219, 0.05)',
                          },
                        }}
                      >
                        <thead>
                          <tr>
                            <th>Cookie Name</th>
                            <th>Purpose</th>
                            <th>Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><Typography variant="body2" sx={{ fontSize: '0.875rem' }}>session_id</Typography></td>
                            <td><Typography variant="body2" sx={{ fontSize: '0.875rem' }}>Maintains user session</Typography></td>
                            <td><Typography variant="body2" sx={{ fontSize: '0.875rem' }}>Session</Typography></td>
                          </tr>
                          <tr>
                            <td><Typography variant="body2" sx={{ fontSize: '0.875rem' }}>auth_token</Typography></td>
                            <td><Typography variant="body2" sx={{ fontSize: '0.875rem' }}>Authentication</Typography></td>
                            <td><Typography variant="body2" sx={{ fontSize: '0.875rem' }}>30 days</Typography></td>
                          </tr>
                          <tr>
                            <td><Typography variant="body2" sx={{ fontSize: '0.875rem' }}>preferences</Typography></td>
                            <td><Typography variant="body2" sx={{ fontSize: '0.875rem' }}>User preferences</Typography></td>
                            <td><Typography variant="body2" sx={{ fontSize: '0.875rem' }}>1 year</Typography></td>
                          </tr>
                          <tr>
                            <td><Typography variant="body2" sx={{ fontSize: '0.875rem' }}>analytics_id</Typography></td>
                            <td><Typography variant="body2" sx={{ fontSize: '0.875rem' }}>Website analytics</Typography></td>
                            <td><Typography variant="body2" sx={{ fontSize: '0.875rem' }}>2 years</Typography></td>
                          </tr>
                          <tr>
                            <td><Typography variant="body2" sx={{ fontSize: '0.875rem' }}>marketing_consent</Typography></td>
                            <td><Typography variant="body2" sx={{ fontSize: '0.875rem' }}>Marketing preferences</Typography></td>
                            <td><Typography variant="body2" sx={{ fontSize: '0.875rem' }}>5 years</Typography></td>
                          </tr>
                        </tbody>
                      </Box>
                    </Box>

                    <HighlightBox>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.875rem' }}>
                        <strong>Note:</strong> We regularly review and update our cookie usage to ensure compliance with changing regulations and user expectations.
                      </Typography>
                    </HighlightBox>
                  </SectionCard>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </CookieSection>
      </SectionWrapper>

      {/* Section 3: Managing Cookies & Third-Party Cookies */}
      <SectionWrapper className="visible">
        <CookieSection ref={section3Ref}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 6 }}>
              <AnimatedChip label="Cookie Management" sx={{ mb: 3 }} />
              <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                Managing Your <AccentText>Cookie Preferences</AccentText>
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* Managing Cookies */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={section3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.8 }}
                  style={{ height: '100%' }}
                >
                  <SectionCard>
                    <SectionHeader>
                      <IconWrapper>
                        <Settings />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          5. Managing Your Cookie Preferences
                        </Typography>
                      </Box>
                    </SectionHeader>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3, fontSize: '0.875rem' }}>
                      You have several options to manage your cookie preferences:
                    </Typography>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        Cookie Consent Banner
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                        Use our cookie consent banner to accept or reject different types of cookies when you first visit our site.
                      </Typography>
                    </InfoSubCard>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        Browser Settings
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                        Configure your browser to block, delete, or warn you about cookies. Note that this may affect website functionality.
                      </Typography>
                    </InfoSubCard>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        Cookie Settings Panel
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                        Access our cookie settings panel anytime to update your preferences for different cookie categories.
                      </Typography>
                    </InfoSubCard>

                    <HighlightBox>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.875rem' }}>
                        <strong>Important:</strong> Disabling essential cookies may prevent you from using certain features of our website, such as logging in or accessing your learning content.
                      </Typography>
                    </HighlightBox>
                  </SectionCard>
                </motion.div>
              </Grid>

              {/* Third-Party Cookies */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={section3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{ height: '100%' }}
                >
                  <SectionCard>
                    <SectionHeader>
                      <IconWrapper>
                        <Language />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          6. Third-Party Cookies
                        </Typography>
                      </Box>
                    </SectionHeader>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3, fontSize: '0.875rem' }}>
                      We work with trusted third-party services that may place cookies on your device:
                    </Typography>

                    <CookieTypeCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        Analytics Services
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Google Analytics and similar tools help us understand how visitors use our website.
                      </Typography>
                    </CookieTypeCard>

                    <CookieTypeCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        Payment Processors
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Secure payment services like Stripe use cookies to process transactions safely.
                      </Typography>
                    </CookieTypeCard>

                    <CookieTypeCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        Social Media
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Social media platforms may place cookies when you interact with their features on our site.
                      </Typography>
                    </CookieTypeCard>

                    <CookieTypeCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        Learning Platforms
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Third-party learning tools and content providers may use cookies for their functionality.
                      </Typography>
                    </CookieTypeCard>
                  </SectionCard>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </CookieSection>
      </SectionWrapper>

      {/* Section 4: Your Rights & Contact */}
      <SectionWrapper className="visible">
        <CookieSection ref={section4Ref}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 6 }}>
              <AnimatedChip label="Your Rights" sx={{ mb: 3 }} />
              <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                Your Rights and <AccentText>Contact Information</AccentText>
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* Your Rights */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={section4InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.8 }}
                  style={{ height: '100%' }}
                >
                  <SectionCard>
                    <SectionHeader>
                      <IconWrapper>
                        <PrivacyTip />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          7. Your Rights Regarding Cookies
                        </Typography>
                      </Box>
                    </SectionHeader>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3, fontSize: '0.875rem' }}>
                      You have the following rights regarding cookies:
                    </Typography>

                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        <strong>Right to Information:</strong> Know what cookies we use and why
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        <strong>Right to Consent:</strong> Choose which cookies to accept
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        <strong>Right to Withdraw:</strong> Change your cookie preferences anytime
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        <strong>Right to Access:</strong> View what data is stored in cookies
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        <strong>Right to Deletion:</strong> Request deletion of cookie data
                      </Typography>
                    </FeatureItem>

                    <HighlightBox>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.875rem' }}>
                        <strong>Exercise Your Rights:</strong> You can manage your cookie preferences through our cookie consent banner or by contacting our privacy team.
                      </Typography>
                    </HighlightBox>
                  </SectionCard>
                </motion.div>
              </Grid>

              {/* Contact Information */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={section4InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{ height: '100%' }}
                >
                  <SectionCard>
                    <SectionHeader>
                      <IconWrapper>
                        <ContactSupport />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          8. Contact Us
                        </Typography>
                      </Box>
                    </SectionHeader>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3, fontSize: '0.875rem' }}>
                      If you have questions about our Cookie Policy or need assistance with managing your cookie preferences:
                    </Typography>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1.5 }}>
                        Privacy Team Contact
                      </Typography>
                      <FeatureItem>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mt: 1 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                          <strong>Email:</strong> privacy@smartslate.io
                        </Typography>
                      </FeatureItem>
                      <FeatureItem>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mt: 1 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                          <strong>Phone:</strong> +91 9008898642
                        </Typography>
                      </FeatureItem>
                      <FeatureItem>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mt: 1 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                          <strong>Response Time:</strong> Within 7 business days
                        </Typography>
                      </FeatureItem>
                    </InfoSubCard>

                    <HighlightBox>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.875rem' }}>
                        <strong>Data Protection Officer:</strong> For serious privacy concerns, contact our DPO at dpo@smartslate.io
                      </Typography>
                    </HighlightBox>
                  </SectionCard>
                </motion.div>
              </Grid>

              {/* Policy Updates */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={section4InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  style={{ height: '100%' }}
                >
                  <SectionCard>
                    <SectionHeader>
                      <IconWrapper>
                        <Update />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          9. Updates to This Policy
                        </Typography>
                      </Box>
                    </SectionHeader>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3, fontSize: '0.875rem' }}>
                      We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws.
                    </Typography>

                    <FeatureItem>
                      <Info sx={{ fontSize: '1rem !important', color: 'primary.main' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        We will post the updated policy on our website
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <Info sx={{ fontSize: '1rem !important', color: 'primary.main' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        The &quot;Last updated&quot; date will be revised
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <Info sx={{ fontSize: '1rem !important', color: 'primary.main' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Material changes may be notified via email
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <Info sx={{ fontSize: '1rem !important', color: 'primary.main' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Your continued use constitutes acceptance
                      </Typography>
                    </FeatureItem>

                    <HighlightBox>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.875rem' }}>
                        We encourage you to review this policy periodically to stay informed about our cookie practices.
                      </Typography>
                    </HighlightBox>
                  </SectionCard>
                </motion.div>
              </Grid>

              {/* Browser-Specific Instructions */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={section4InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{ height: '100%' }}
                >
                  <SectionCard>
                    <SectionHeader>
                      <IconWrapper>
                        <Warning />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          10. Browser-Specific Instructions
                        </Typography>
                      </Box>
                    </SectionHeader>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3, fontSize: '0.875rem' }}>
                      Different browsers have different methods for managing cookies:
                    </Typography>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        Chrome
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                        Settings → Privacy and security → Cookies and other site data
                      </Typography>
                    </InfoSubCard>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        Firefox
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                        Options → Privacy & Security → Cookies and Site Data
                      </Typography>
                    </InfoSubCard>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        Safari
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                        Preferences → Privacy → Cookies and website data
                      </Typography>
                    </InfoSubCard>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        Edge
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                        Settings → Privacy, search, and services → Cookies
                      </Typography>
                    </InfoSubCard>
                  </SectionCard>
                </motion.div>
              </Grid>
            </Grid>

            {/* Footer Links */}
            <Box sx={{ borderTop: '1px solid rgba(167, 218, 219, 0.1)', pt: 6, mt: 8, textAlign: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={section4InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  © {new Date().getFullYear()} Smartslate Learning. All rights reserved.
                </Typography>
                <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mb: 3 }}>
                  Committed to transparency and your privacy
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <StyledLink href="/legal/privacy">
                    Privacy Policy
                  </StyledLink>
                  <StyledLink href="/legal/terms">
                    Terms of Service
                  </StyledLink>
                  <StyledLink href="/">
                    Back to Home
                  </StyledLink>
                  <StyledLink href="/contact">
                    Contact Us
                  </StyledLink>
                </Box>
              </motion.div>
            </Box>
          </Container>
        </CookieSection>
      </SectionWrapper>
    </PageWrapper>
  );
}