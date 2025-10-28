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
  Shield,
  DataObject,
  Lock,
  Person,
  Public,
  Update,
  ContactSupport,
  Gavel,
  Security,
  Storage,
  Language,
  ChildCare,
  Email,
  Phone,
  Business,
  CheckCircle,
} from '@mui/icons-material';

// Styled Components
const PrivacySection = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(10)} 0`,
  backgroundColor: theme.palette.background.default,
  position: 'relative',
  overflow: 'hidden',
}));

const SectionCard = styled(ContentCard)(() => ({
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

const ContactMethodCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(167, 218, 219, 0.12)',
  borderRadius: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  '& .MuiSvgIcon-root': {
    fontSize: '1.25rem',
    color: theme.palette.primary.main,
  },
  '&:last-child': {
    marginBottom: 0,
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

export default function PrivacyPolicyPage() {
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
        title="Privacy Policy"
        subtitle="Your privacy is our priority"
        description="At Smartslate, we respect your privacy while providing innovative AI-powered learning solutions. This policy explains how we collect, use, and protect your personal information in compliance with Indian data protection laws."
        accentWords={['Privacy', 'Priority', 'Protect']}
      >
        <LastUpdatedBadge>
          <Update />
          <Typography variant="caption" sx={{ fontWeight: 600, color: 'secondary.light' }}>
            Last updated: {currentDate}
          </Typography>
        </LastUpdatedBadge>
      </StandardHero>

      {/* Section 1: Introduction & Information Collection */}
      <SectionWrapper className="visible">
        <PrivacySection ref={section1Ref}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 6 }}>
              <AnimatedChip label="Privacy Overview" sx={{ mb: 3 }} />
              <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                Understanding Our <AccentText>Privacy Commitment</AccentText>
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
                        <Shield />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          1. Introduction
                        </Typography>
                      </Box>
                    </SectionHeader>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                      <strong>Smartslate Learning</strong> (&quot;Smartslate,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates an AI-powered learning platform that generates personalized learning blueprints and provides educational services.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                      By using our Services, you acknowledge that you have read, understood, and agree to this Privacy Policy. If you do not agree with this policy, you must not use our Services.
                    </Typography>
                    <HighlightBox>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, fontSize: '0.875rem' }}>
                        <strong>Legal Compliance:</strong> This policy complies with the Information Technology Act, 2000, the IT (Reasonable Security Practices) Rules, 2011, and other applicable Indian data protection laws.
                      </Typography>
                    </HighlightBox>
                  </SectionCard>
                </motion.div>
              </Grid>

              {/* Information Collection */}
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
                        <DataObject />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          2. Information We Collect
                        </Typography>
                      </Box>
                    </SectionHeader>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1.5 }}>
                        2.1 Information You Provide
                      </Typography>
                      <FeatureItem>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mt: 1 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                          Account information (name, email, password)
                        </Typography>
                      </FeatureItem>
                      <FeatureItem>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mt: 1 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                          Professional details (company, role, industry)
                        </Typography>
                      </FeatureItem>
                      <FeatureItem>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mt: 1 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                          Learning preferences and questionnaire responses
                        </Typography>
                      </FeatureItem>
                      <FeatureItem>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mt: 1 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                          Payment information for subscriptions
                        </Typography>
                      </FeatureItem>
                    </InfoSubCard>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1.5 }}>
                        2.2 Automatically Collected Data
                      </Typography>
                      <FeatureItem>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'secondary.main', mt: 1 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                          Device and browser information
                        </Typography>
                      </FeatureItem>
                      <FeatureItem>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'secondary.main', mt: 1 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                          Usage patterns and interaction metrics
                        </Typography>
                      </FeatureItem>
                      <FeatureItem>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'secondary.main', mt: 1 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                          Learning progress and performance data
                        </Typography>
                      </FeatureItem>
                      <FeatureItem>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'secondary.main', mt: 1 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                          Cookies and tracking technologies
                        </Typography>
                      </FeatureItem>
                    </InfoSubCard>
                  </SectionCard>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </PrivacySection>
      </SectionWrapper>

      {/* Section 2: How We Use Information & Sharing */}
      <SectionWrapper className="visible">
        <PrivacySection ref={section2Ref}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 6 }}>
              <AnimatedChip label="Data Usage" sx={{ mb: 3 }} />
              <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                How We Use and <AccentText>Share Your Data</AccentText>
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* How We Use Information */}
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
                        <Lock />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          3. How We Use Your Information
                        </Typography>
                      </Box>
                    </SectionHeader>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3, fontSize: '0.875rem' }}>
                      We use your information for the following purposes:
                    </Typography>

                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Providing and improving our AI-powered Services
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Generating personalized learning blueprints
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Processing transactions and managing subscriptions
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Communicating about your account and Services
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Ensuring platform security and preventing fraud
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Complying with legal obligations
                      </Typography>
                    </FeatureItem>

                    <HighlightBox>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary', display: 'block', mb: 1 }}>
                        Legal Basis for Processing
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.875rem' }}>
                        We process your information based on your consent, contractual necessity, legitimate interests, and legal obligations.
                      </Typography>
                    </HighlightBox>
                  </SectionCard>
                </motion.div>
              </Grid>

              {/* Information Sharing */}
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
                        <Public />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          4. Information Sharing
                        </Typography>
                      </Box>
                    </SectionHeader>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3, fontSize: '0.875rem' }}>
                      We may share your information in limited circumstances:
                    </Typography>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        Service Providers
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                        Third-party providers for hosting, analytics, and payment processing.
                      </Typography>
                    </InfoSubCard>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        AI Service Providers
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                        AI services (including Anthropic Claude) for generating learning content.
                      </Typography>
                    </InfoSubCard>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        Legal Requirements
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                        When required by law, court order, or government regulation.
                      </Typography>
                    </InfoSubCard>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                        Business Transfers
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                        In connection with mergers, acquisitions, or asset sales.
                      </Typography>
                    </InfoSubCard>

                    <HighlightBox>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.875rem' }}>
                        <strong>Important:</strong> We do not sell your personal information to third parties for marketing purposes.
                      </Typography>
                    </HighlightBox>
                  </SectionCard>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </PrivacySection>
      </SectionWrapper>

      {/* Section 3: Security, Rights & Data Retention */}
      <SectionWrapper className="visible">
        <PrivacySection ref={section3Ref}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 6 }}>
              <AnimatedChip label="Security & Rights" sx={{ mb: 3 }} />
              <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                Your Data <AccentText>Security and Rights</AccentText>
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* Data Security */}
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
                        <Security />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          5. Data Security
                        </Typography>
                      </Box>
                    </SectionHeader>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3, fontSize: '0.875rem' }}>
                      We implement comprehensive security measures to protect your information:
                    </Typography>

                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Encryption of data in transit and at rest
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Access controls and authentication mechanisms
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Regular security assessments and testing
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Employee training on data protection
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Incident response and breach notification procedures
                      </Typography>
                    </FeatureItem>

                    <HighlightBox>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary', display: 'block', mb: 1 }}>
                        Security Disclaimer
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.875rem' }}>
                        While we implement reasonable security measures, no system is completely secure. You are responsible for maintaining the confidentiality of your account credentials.
                      </Typography>
                    </HighlightBox>
                  </SectionCard>
                </motion.div>
              </Grid>

              {/* Your Rights */}
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
                        <Person />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          6. Your Rights and Choices
                        </Typography>
                      </Box>
                    </SectionHeader>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3, fontSize: '0.875rem' }}>
                      Subject to applicable law, you have the following rights:
                    </Typography>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>
                        Access
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Request access to your personal information
                      </Typography>
                    </InfoSubCard>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>
                        Correction
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Request correction of inaccurate information
                      </Typography>
                    </InfoSubCard>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>
                        Deletion
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Request deletion of your personal information
                      </Typography>
                    </InfoSubCard>

                    <InfoSubCard>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 0.5 }}>
                        Portability
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Request a copy in machine-readable format
                      </Typography>
                    </InfoSubCard>

                    <HighlightBox>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.primary', display: 'block', mb: 1 }}>
                        Exercise Your Rights
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.875rem' }}>
                        To exercise these rights, contact us at{' '}
                        <StyledLink href="mailto:jitin@smartslate.io">
                          jitin@smartslate.io
                        </StyledLink>
                        . We will respond within the timeframes required by law.
                      </Typography>
                    </HighlightBox>
                  </SectionCard>
                </motion.div>
              </Grid>

              {/* Data Retention */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={section3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  style={{ height: '100%' }}
                >
                  <SectionCard>
                    <SectionHeader>
                      <IconWrapper>
                        <Storage />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          7. Data Retention
                        </Typography>
                      </Box>
                    </SectionHeader>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3, fontSize: '0.875rem' }}>
                      We retain your information as long as necessary to fulfill the purposes outlined in this policy:
                    </Typography>

                    <FeatureItem>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mt: 1 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Account information: While your account is active
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mt: 1 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Learning data: To provide and improve Services
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', mt: 1 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Transaction records: As required by law
                      </Typography>
                    </FeatureItem>

                    <HighlightBox>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.875rem' }}>
                        When no longer needed, we delete or anonymize your information in a manner that prevents reconstruction.
                      </Typography>
                    </HighlightBox>
                  </SectionCard>
                </motion.div>
              </Grid>

              {/* International Transfers */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={section3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{ height: '100%' }}
                >
                  <SectionCard>
                    <SectionHeader>
                      <IconWrapper>
                        <Language />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          8. International Data Transfers
                        </Typography>
                      </Box>
                    </SectionHeader>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3, fontSize: '0.875rem' }}>
                      Your information may be transferred to and processed outside India. We ensure compliance through:
                    </Typography>

                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Standard contractual clauses for transfers
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Appropriate safeguards to protect your data
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Compliance with applicable data protection laws
                      </Typography>
                    </FeatureItem>

                    <HighlightBox>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.875rem' }}>
                        By using our Services, you consent to transfers to countries outside India, including those with different data protection standards.
                      </Typography>
                    </HighlightBox>
                  </SectionCard>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </PrivacySection>
      </SectionWrapper>

      {/* Section 4: Children's Privacy, Changes & Contact */}
      <SectionWrapper className="visible">
        <PrivacySection ref={section4Ref}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 6 }}>
              <AnimatedChip label="Additional Information" sx={{ mb: 3 }} />
              <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                Important <AccentText>Legal Information</AccentText>
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* Children's Privacy */}
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
                        <ChildCare />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          9. Children&apos;s Privacy
                        </Typography>
                      </Box>
                    </SectionHeader>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2, fontSize: '0.875rem' }}>
                      Our Services are not intended for children under the age of 18. We do not knowingly collect personal information from children under 18.
                    </Typography>
                    <HighlightBox sx={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.875rem' }}>
                        If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at{' '}
                        <StyledLink href="mailto:jitin@smartslate.io">
                          jitin@smartslate.io
                        </StyledLink>
                        . We will take steps to delete such information from our records.
                      </Typography>
                    </HighlightBox>
                  </SectionCard>
                </motion.div>
              </Grid>

              {/* Policy Changes */}
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
                        <Update />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          10. Changes to This Policy
                        </Typography>
                      </Box>
                    </SectionHeader>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3, fontSize: '0.875rem' }}>
                      We may update this Privacy Policy from time to time. When we do:
                    </Typography>

                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        We will post the updated policy on our website
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        We will update the &quot;Last updated&quot; date
                      </Typography>
                    </FeatureItem>
                    <FeatureItem>
                      <CheckCircle sx={{ fontSize: '1rem !important' }} />
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                        Material changes may be notified via email
                      </Typography>
                    </FeatureItem>

                    <HighlightBox>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.875rem' }}>
                        Your continued use of Services after changes constitutes acceptance. We encourage you to review this policy periodically.
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
                  transition={{ duration: 0.8, delay: 0.3 }}
                  style={{ height: '100%' }}
                >
                  <SectionCard>
                    <SectionHeader>
                      <IconWrapper>
                        <ContactSupport />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          11. Contact Us
                        </Typography>
                      </Box>
                    </SectionHeader>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 3, fontSize: '0.875rem' }}>
                      For questions or requests regarding this Privacy Policy or our data practices:
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
                        Data Protection Officer
                      </Typography>
                      <ContactMethodCard>
                        <Person />
                        <Box>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.75rem' }}>
                            Name
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                            Jitin Nair
                          </Typography>
                        </Box>
                      </ContactMethodCard>
                      <ContactMethodCard>
                        <Email />
                        <Box>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.75rem' }}>
                            Email
                          </Typography>
                          <StyledLink href="mailto:jitin@smartslate.io">
                            jitin@smartslate.io
                          </StyledLink>
                        </Box>
                      </ContactMethodCard>
                      <ContactMethodCard>
                        <Phone />
                        <Box>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.75rem' }}>
                            Phone
                          </Typography>
                          <StyledLink href="tel:+919008898642">
                            +91 9008898642
                          </StyledLink>
                        </Box>
                      </ContactMethodCard>
                      <ContactMethodCard>
                        <Business />
                        <Box>
                          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontSize: '0.75rem' }}>
                            Company
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                            Smartslate Learning, India
                          </Typography>
                        </Box>
                      </ContactMethodCard>
                    </Box>

                    <HighlightBox>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.875rem' }}>
                        <strong>Response Time:</strong> We will respond to your inquiries within 30 days.
                      </Typography>
                    </HighlightBox>
                  </SectionCard>
                </motion.div>
              </Grid>

              {/* Dispute Resolution */}
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
                        <Gavel />
                      </IconWrapper>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                          12. Dispute Resolution
                        </Typography>
                      </Box>
                    </SectionHeader>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2, fontSize: '0.875rem' }}>
                      If you have concerns about how we handle your personal information, please contact us first at{' '}
                      <StyledLink href="mailto:jitin@smartslate.io">
                        jitin@smartslate.io
                      </StyledLink>
                      . We will investigate and respond to your concerns.
                    </Typography>
                    <HighlightBox sx={{ backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.875rem' }}>
                        If we cannot resolve your concern, you may have the right to lodge a complaint with the appropriate data protection authority in India.
                      </Typography>
                    </HighlightBox>
                  </SectionCard>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </PrivacySection>
      </SectionWrapper>
    </PageWrapper>
  );
}
