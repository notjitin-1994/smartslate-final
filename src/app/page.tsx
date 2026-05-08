'use client';

import { Box, Container, Typography, Button, Card, CardContent, Chip, Stack, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import JsonLd from '@/components/seo/JsonLd';
import { getOrganizationJsonLd, getWebsiteJsonLd } from '@/components/seo/schemas';
import { ProductIcons } from '@/components/icons/ProductIcons';
import Link from 'next/link';
import RevampedHero from '@/components/landing/RevampedHero';
import PolarisIntro from '@/components/landing/PolarisIntro';
import {
  AutoAwesome,
  Speed,
  TrendingUp,
  Verified,
  Analytics,
  School,
  Business,
  Psychology,
  CloudUpload,
  Security,
  Insights,
  Lightbulb,
  Rocket,
  Timeline,
  CheckCircle,
  Groups,
  EmojiObjects,
  WorkspacePremium,
  AutoStories,
  PlayCircle,
  Description,
  CalendarMonth,
  Loop,
  ErrorOutline,
  Straighten,
  Close
} from '@mui/icons-material';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        background: (theme) => theme.palette.background.default,
        position: 'relative'
      }}
    >
      <RevampedHero />

      <PolarisIntro />

      {/* Enhanced Target Audience Badges */}
      <Box
        component="section"
        aria-label="Target Audience"
        sx={{
          pb: 'var(--section-padding-y)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Container maxWidth="lg">
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: 'text.secondary',
                    mb: 3,
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    letterSpacing: '0.15em',
                    display: 'block'
                  }}
                >
                  TRUSTED BY LEARNING PROFESSIONALS AT
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" useFlexGap>
                  {[
                    { label: 'Instructional Designers', icon: <Psychology /> },
                    { label: 'LXDs', icon: <AutoAwesome /> },
                    { label: 'L&D Leaders', icon: <TrendingUp /> },
                    { label: 'HR Directors', icon: <Groups /> },
                    { label: 'Training Consultants', icon: <Rocket /> }
                  ].map((role, idx) => (
                    <Chip
                      key={idx}
                      icon={role.icon}
                      label={role.label}
                      sx={{
                        background: 'rgba(167, 218, 219, 0.1)',
                        border: '1.5px solid rgba(167, 218, 219, 0.3)',
                        color: 'text.primary',
                        fontWeight: 700,
                        fontSize: '0.9375rem',
                        padding: '24px 16px',
                        '& .MuiChip-icon': {
                          color: '#a7dadb',
                          fontSize: '1.25rem'
                        },
                        '&:hover': {
                          background: 'rgba(167, 218, 219, 0.15)',
                          borderColor: '#a7dadb',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 24px rgba(167, 218, 219, 0.2)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            </motion.div>
          </MotionBox>
        </Container>
      </Box>

      {/* Why Polaris Section - Completely Revamped */}
      <Box
        component="section"
        aria-label="Why Polaris"
        sx={{
          py: 'var(--section-padding-y)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Container maxWidth="lg">
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {/* Compelling Header */}
            <motion.div variants={fadeInUp}>
              <Box sx={{ mb: 6, textAlign: 'left' }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: '#a7dadb',
                    fontWeight: 800,
                    fontSize: '0.875rem',
                    letterSpacing: '0.15em',
                    display: 'block',
                    mb: 2
                  }}
                >
                  THE POLARIS ADVANTAGE
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: 'text.primary',
                    mb: 3,
                    letterSpacing: '-0.02em'
                  }}
                >
                  Why Your Competitors
                  <br />
                  Are Switching to{' '}
                  <Box component="span" sx={{ color: '#a7dadb' }}>
                    Polaris
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '1.125rem', md: '1.375rem' },
                    lineHeight: 1.6,
                    maxWidth: '800px',
                    textAlign: 'left'
                  }}
                >
                  Traditional requirements gathering is killing your velocity. Stop wasting time in meetings—
                  start building with AI-powered intelligence.
                </Typography>
              </Box>
            </motion.div>

            {/* Feature Grid - Enhanced with Problem/Solution Format */}
            <Grid container spacing={4}>
              {[
                {
                  icon: <Speed />,
                  title: '6 Weeks → 1 Hour',
                  subtitle: 'Requirements in Days, Not Months',
                  problem: 'Stop losing momentum to endless stakeholder meetings and revision cycles',
                  solution: 'Polaris generates comprehensive learning experience designs in a single week, capturing every requirement while stakeholders\' insights are fresh',
                  color: '#a7dadb'
                },
                {
                  icon: <Verified />,
                  title: '100% Business Alignment',
                  subtitle: 'Zero Misalignment Risk',
                  problem: 'Tired of building the wrong thing because requirements were misunderstood?',
                  solution: 'AI maps every learning objective directly to business KPIs, ensuring perfect alignment from day one with stakeholder buy-in',
                  color: '#10b981'
                },
                {
                  icon: <ErrorOutline />,
                  title: 'Catches 100% of Gaps',
                  subtitle: 'AI-Powered Gap Detection',
                  problem: 'Critical requirements discovered in user testing? Never again.',
                  solution: 'Advanced AI analyzes requirements against 50+ instructional design frameworks, catching gaps you didn\'t know existed',
                  color: '#4F46E5'
                },
                {
                  icon: <TrendingUp />,
                  title: '10x ROI Documentation',
                  subtitle: 'Executive-Ready Reports',
                  problem: 'Spending hours formatting Word docs that executives skim in 30 seconds?',
                  solution: 'Auto-generate executive summaries, ROI projections, and stakeholder presentations that leadership actually reads',
                  color: '#f59e0b'
                },
                {
                  icon: <Groups />,
                  title: 'Instant Stakeholder Buy-In',
                  subtitle: 'Collaboration Without Chaos',
                  problem: 'Endless email chains and conflicting feedback destroying your timeline?',
                  solution: 'Real-time collaboration with version control and automated conflict resolution keeps everyone aligned',
                  color: '#8b5cf6'
                },
                {
                  icon: <WorkspacePremium />,
                  title: 'Expert-Level Quality',
                  subtitle: 'Best Practices Automated',
                  problem: 'Junior designers need 6 months to master instructional design frameworks',
                  solution: 'Polaris embeds ADDIE, SAM, Bloom\'s Taxonomy, and Kirkpatrick automatically—every learning experience design is expert-grade',
                  color: '#ec4899'
                }
              ].map((feature, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <motion.div variants={fadeInUp}>
                    <Box
                      sx={{
                        height: '100%',
                        p: 4,
                        background: 'rgba(167, 218, 219, 0.05)',
                        backdropFilter: 'blur(24px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                        border: '2px solid rgba(167, 218, 219, 0.2)',
                        borderRadius: 4,
                        boxShadow: '0 12px 40px rgba(167, 218, 219, 0.1), inset 0 2px 0 rgba(167, 218, 219, 0.1)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '4px',
                          height: '100%',
                          background: feature.color,
                          opacity: 0.7
                        },
                        '&:hover': {
                          borderColor: 'rgba(167, 218, 219, 0.4)',
                          background: 'rgba(167, 218, 219, 0.08)',
                          transform: 'translateY(-12px)',
                          boxShadow: '0 24px 64px rgba(167, 218, 219, 0.25)',
                          '&::before': {
                            opacity: 1,
                            width: '6px'
                          }
                        }
                      }}
                    >
                      {/* Icon Background */}
                      <Box
                        sx={{
                          width: '72px',
                          height: '72px',
                          borderRadius: '16px',
                          background: feature.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3,
                          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                          color: '#fff',
                          fontSize: '2rem'
                        }}
                      >
                        {feature.icon}
                      </Box>

                      {/* Title */}
                      <Typography
                        variant="h4"
                        component="h3"
                        sx={{
                          mb: 0.5,
                          color: 'text.primary',
                          fontWeight: 800,
                          fontSize: { xs: '1.5rem', md: '1.75rem' }
                        }}
                      >
                        {feature.title}
                      </Typography>

                      {/* Subtitle */}
                      <Typography
                        variant="subtitle1"
                        sx={{
                          mb: 3,
                          color: '#a7dadb',
                          fontWeight: 700,
                          fontSize: '1rem'
                        }}
                      >
                        {feature.subtitle}
                      </Typography>

                      {/* Problem Statement */}
                      <Box
                        sx={{
                          mb: 2,
                          p: 2,
                          background: 'rgba(239, 68, 68, 0.05)',
                          borderLeft: '3px solid #ef4444',
                          borderRadius: '0 8px 8px 0'
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#ef4444',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            display: 'block',
                            mb: 0.5
                          }}
                        >
                          THE PROBLEM
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            lineHeight: 1.6,
                            fontSize: '0.9375rem',
                            fontStyle: 'italic'
                          }}
                        >
                          {feature.problem}
                        </Typography>
                      </Box>

                      {/* Solution Statement */}
                      <Box
                        sx={{
                          p: 2,
                          background: 'rgba(16, 185, 129, 0.05)',
                          borderLeft: '3px solid #10b981',
                          borderRadius: '0 8px 8px 0'
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#10b981',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            display: 'block',
                            mb: 0.5
                          }}
                        >
                          THE SOLUTION
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.primary',
                            lineHeight: 1.7,
                            fontSize: '0.9375rem',
                            fontWeight: 500
                          }}
                        >
                          {feature.solution}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {/* Compelling CTA Banner */}
            <motion.div variants={fadeInUp}>
              <Box
                sx={{
                  mt: 8,
                  p: { xs: 4, md: 6 },
                  background: 'rgba(167, 218, 219, 0.12)',
                  backdropFilter: 'blur(24px)',
                  border: '2px solid rgba(167, 218, 219, 0.3)',
                  borderRadius: 4,
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: '#a7dadb'
                  }
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    color: 'text.primary',
                    fontWeight: 800,
                    mb: 2,
                    fontSize: { xs: '1.75rem', md: '2.5rem' }
                  }}
                >
                  Still Scheduling Stakeholder Meetings?
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'text.secondary',
                    mb: 4,
                    fontSize: { xs: '1.125rem', md: '1.375rem' },
                    maxWidth: '700px',
                    mx: 'auto',
                    lineHeight: 1.6
                  }}
                >
                  While you&apos;re coordinating calendars, you could have your learning experience designs done.
                  <br />
                  <Box component="span" sx={{ color: '#a7dadb', fontWeight: 700 }}>
                    Start building today.
                  </Box>
                </Typography>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  justifyContent="center"
                >
                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    href="https://polaris.smartslate.io"
                    startIcon={<Rocket />}
                    sx={{
                      px: 5,
                      py: 2.5,
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      background: '#4F46E5',
                      color: '#fff',
                      minWidth: '260px',
                      boxShadow: '0 12px 32px rgba(79, 70, 229, 0.4)',
                      '&:hover': {
                        background: '#4338CA',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 16px 48px rgba(79, 70, 229, 0.5)'
                      },
                      '&:focus-visible': {
                        outline: '3px solid',
                        outlineColor: '#a7dadb',
                        outlineOffset: '3px'
                      }
                    }}
                  >
                    Start Free—Build Now
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={Link}
                    href="/demo"
                    startIcon={<PlayCircle />}
                    sx={{
                      px: 5,
                      py: 2.5,
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      borderColor: '#a7dadb',
                      color: '#a7dadb',
                      borderWidth: 2,
                      minWidth: '260px',
                      '&:hover': {
                        borderWidth: 2,
                        backgroundColor: 'rgba(167, 218, 219, 0.12)',
                        transform: 'translateY(-2px)',
                        borderColor: '#a7dadb'
                      }
                    }}
                  >
                    See It In Action
                  </Button>
                </Stack>

                <Box sx={{ mt: 4 }}>
                  <Stack direction="row" spacing={4} justifyContent="center" flexWrap="wrap" useFlexGap>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle sx={{ color: '#10b981', fontSize: '1.5rem' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        Free tier forever
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle sx={{ color: '#10b981', fontSize: '1.5rem' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        No credit card required
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle sx={{ color: '#10b981', fontSize: '1.5rem' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        Instant access—start in minutes
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </motion.div>
          </MotionBox>
        </Container>
      </Box>

      {/* Product Showcase Section - Completely Revamped */}
      <Box
        component="section"
        aria-label="Product showcase"
        sx={{
          py: 'var(--section-padding-y)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Container maxWidth="lg">
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {/* Compelling Header */}
            <motion.div variants={fadeInUp}>
              <Box sx={{ mb: 6, textAlign: 'left' }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: '#a7dadb',
                    fontWeight: 800,
                    fontSize: '0.875rem',
                    letterSpacing: '0.15em',
                    display: 'block',
                    mb: 2
                  }}
                >
                  BEYOND POLARIS
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: 'text.primary',
                    mb: 3,
                    letterSpacing: '-0.02em'
                  }}
                >
                  One Platform.
                  <br />
                  Every Learning Need.
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '1.125rem', md: '1.375rem' },
                    lineHeight: 1.6,
                    maxWidth: '800px',
                    textAlign: 'left'
                  }}
                >
                  Stop cobbling together 15 disconnected tools. Solara replaces your entire learning tech stack with unified, AI-powered intelligence.
                </Typography>
              </Box>
            </motion.div>

            <Grid container spacing={2.4}>
              {/* Solara Platform - Full Width */}
              <Grid size={{ xs: 12 }}>
                <motion.div variants={fadeInUp}>
                  <Box
                    sx={{
                      height: '100%',
                      p: 3,
                      background: 'rgba(167, 218, 219, 0.08)',
                      backdropFilter: 'blur(24px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                      border: '2px solid rgba(167, 218, 219, 0.3)',
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(167, 218, 219, 0.15), inset 0 1px 0 rgba(167, 218, 219, 0.15)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: '#a7dadb'
                      },
                      '&:hover': {
                        borderColor: '#a7dadb',
                        background: 'rgba(167, 218, 219, 0.15)',
                        transform: 'translateY(-8px)',
                        boxShadow: '0 16px 48px rgba(167, 218, 219, 0.35)'
                      }
                    }}
                  >
                    {/* Icon Container */}
                    <Box
                      sx={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        background: '#a7dadb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        boxShadow: '0 8px 24px rgba(167, 218, 219, 0.4)'
                      }}
                    >
                      <Box sx={{ fontSize: '2rem', color: '#091521', display: 'flex' }}>
                        {ProductIcons.rocket}
                      </Box>
                    </Box>

                    {/* Headline */}
                    <Typography variant="h4" component="h3" sx={{ color: 'text.primary', fontWeight: 700, mb: 1 }}>
                      Solara Platform
                    </Typography>

                    <Chip
                      label="Coming Soon"
                      size="small"
                      sx={{
                        fontSize: '0.75rem',
                        height: '24px',
                        background: 'rgba(167, 218, 219, 0.2)',
                        border: '1px solid rgba(167, 218, 219, 0.3)',
                        color: '#a7dadb',
                        fontWeight: 600,
                        mb: 2
                      }}
                    />

                    {/* Subheading */}
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#a7dadb',
                        fontWeight: 600,
                        fontSize: '1.125rem',
                        mb: 2,
                        lineHeight: 1.4
                      }}
                    >
                      15 Tools → 1 Platform
                    </Typography>

                    {/* Problem Statement */}
                    <Box
                      sx={{
                        p: 2,
                        mb: 2,
                        background: 'rgba(239, 68, 68, 0.05)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderLeft: '3px solid #ef4444',
                        borderRadius: 2
                      }}
                    >
                      <Typography variant="caption" sx={{ color: '#ef4444', fontWeight: 700, display: 'block', mb: 0.5 }}>
                        THE PROBLEM
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', lineHeight: 1.6 }}>
                        You're managing LMS, authoring tool, video platform, quiz maker, collaboration tools, analytics dashboard... The list never ends. Neither does the integration chaos.
                      </Typography>
                    </Box>

                    {/* Solution Statement */}
                    <Box
                      sx={{
                        p: 2,
                        mb: 3,
                        background: 'rgba(16, 185, 129, 0.05)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        borderLeft: '3px solid #10b981',
                        borderRadius: 2
                      }}
                    >
                      <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700, display: 'block', mb: 0.5 }}>
                        THE SOLUTION
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, lineHeight: 1.6 }}>
                        One unified platform. Six AI-powered modules. From needs analysis (Polaris) to delivery (Orbit) to analytics (Spectrum). Everything talks to everything.
                      </Typography>
                    </Box>

                    {/* CTA */}
                    <Box
                      sx={{
                        p: 2.5,
                        background: 'rgba(167, 218, 219, 0.12)',
                        border: '2px solid rgba(167, 218, 219, 0.3)',
                        borderRadius: 2,
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '3px',
                          background: '#a7dadb'
                        }
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                        Be First to Experience the Future
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontSize: '0.875rem' }}>
                        Join our exclusive early access program
                      </Typography>
                      <Button
                        variant="contained"
                        component={Link}
                        href="https://solara.smartslate.io"
                        startIcon={<Rocket />}
                        fullWidth
                        sx={{
                          px: 2,
                          py: 1.2,
                          background: '#4F46E5',
                          color: '#fff',
                          fontWeight: 600,
                          boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)',
                          '&:hover': {
                            background: '#4338CA',
                            boxShadow: '0 6px 20px rgba(79, 70, 229, 0.5)',
                            transform: 'translateY(-2px)'
                          },
                          '&:focus-visible': {
                            outline: '3px solid',
                            outlineColor: '#a7dadb',
                            outlineOffset: '2px'
                          }
                        }}
                      >
                        Explore Solara Learning Engine
                      </Button>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>

              {/* Strategic Skills Architecture */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                  <Box
                    sx={{
                      height: '100%',
                      p: 3,
                      background: 'rgba(167, 218, 219, 0.08)',
                      backdropFilter: 'blur(24px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                      border: '2px solid rgba(167, 218, 219, 0.3)',
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(167, 218, 219, 0.15), inset 0 1px 0 rgba(167, 218, 219, 0.15)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: '#a7dadb'
                      },
                      '&:hover': {
                        borderColor: '#a7dadb',
                        background: 'rgba(167, 218, 219, 0.15)',
                        transform: 'translateY(-8px)',
                        boxShadow: '0 16px 48px rgba(167, 218, 219, 0.35)'
                      }
                    }}
                  >
                    {/* Icon Container */}
                    <Box
                      sx={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        background: '#8b5cf6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)'
                      }}
                    >
                      <Box sx={{ fontSize: '2rem', color: '#fff', display: 'flex' }}>
                        {ProductIcons.edit}
                      </Box>
                    </Box>

                    {/* Headline */}
                    <Typography variant="h4" component="h3" sx={{ color: 'text.primary', fontWeight: 700, mb: 2 }}>
                      Strategic Skills Architecture
                    </Typography>

                    {/* Subheading */}
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#a7dadb',
                        fontWeight: 600,
                        fontSize: '1.125rem',
                        mb: 2,
                        lineHeight: 1.4
                      }}
                    >
                      Off-the-Shelf Won't Cut It. Build Your Proprietary Advantage.
                    </Typography>

                    {/* Problem Statement */}
                    <Box
                      sx={{
                        p: 2,
                        mb: 2,
                        background: 'rgba(239, 68, 68, 0.05)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderLeft: '3px solid #ef4444',
                        borderRadius: 2
                      }}
                    >
                      <Typography variant="caption" sx={{ color: '#ef4444', fontWeight: 700, display: 'block', mb: 0.5 }}>
                        THE PROBLEM
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', lineHeight: 1.6 }}>
                        Generic courses teach your team the same skills as your competitors. You're training people to be replaceable, not indispensable.
                      </Typography>
                    </Box>

                    {/* Solution Statement */}
                    <Box
                      sx={{
                        p: 2,
                        mb: 3,
                        background: 'rgba(16, 185, 129, 0.05)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        borderLeft: '3px solid #10b981',
                        borderRadius: 2
                      }}
                    >
                      <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700, display: 'block', mb: 0.5 }}>
                        THE SOLUTION
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, lineHeight: 1.6 }}>
                        Custom-built curriculum designed exclusively for your organization. Turn your unique processes into proprietary learning experiences your competitors can't copy.
                      </Typography>
                    </Box>

                    {/* CTA */}
                    <Box
                      sx={{
                        mt: 'auto',
                        p: 2.5,
                        background: 'rgba(139, 92, 246, 0.12)',
                        border: '2px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: 2,
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '3px',
                          background: '#8b5cf6'
                        }
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                        Build What Others Can't Buy
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontSize: '0.875rem' }}>
                        Schedule a consultation with our learning architects
                      </Typography>
                      <Button
                        variant="contained"
                        component={Link}
                        href="/contact"
                        startIcon={<CheckCircle />}
                        fullWidth
                        sx={{
                          px: 2,
                          py: 1.2,
                          background: '#4F46E5',
                          color: '#fff',
                          fontWeight: 600,
                          boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)',
                          '&:hover': {
                            background: '#4338CA',
                            boxShadow: '0 6px 20px rgba(79, 70, 229, 0.5)',
                            transform: 'translateY(-2px)'
                          },
                          '&:focus-visible': {
                            outline: '3px solid',
                            outlineColor: '#a7dadb',
                            outlineOffset: '2px'
                          }
                        }}
                      >
                        Start Building
                      </Button>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>

              {/* Ignite Series */}
              <Grid size={{ xs: 12, md: 6 }}>
                <motion.div variants={fadeInUp} style={{ height: '100%' }}>
                  <Box
                    sx={{
                      height: '100%',
                      p: 3,
                      background: 'rgba(13, 27, 42, 0.7)',
                      backdropFilter: 'blur(24px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                      border: '2px solid rgba(167, 218, 219, 0.3)',
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: '#a7dadb'
                      },
                      '&:hover': {
                        borderColor: '#a7dadb',
                        background: 'rgba(167, 218, 219, 0.12)',
                        transform: 'translateY(-8px)',
                        boxShadow: '0 16px 48px rgba(167, 218, 219, 0.3)'
                      }
                    }}
                  >
                    {/* Icon Container */}
                    <Box
                      sx={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        background: '#f59e0b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4)'
                      }}
                    >
                      <Box sx={{ fontSize: '2rem', color: '#fff', display: 'flex' }}>
                        {ProductIcons.book}
                      </Box>
                    </Box>

                    {/* Headline */}
                    <Typography variant="h4" component="h3" sx={{ color: 'text.primary', fontWeight: 700, mb: 2 }}>
                      Ignite Series
                    </Typography>

                    {/* Subheading */}
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#a7dadb',
                        fontWeight: 600,
                        fontSize: '1.125rem',
                        mb: 2,
                        lineHeight: 1.4
                      }}
                    >
                      Stop Graduating Students Nobody Will Hire
                    </Typography>

                    {/* Problem Statement */}
                    <Box
                      sx={{
                        p: 2,
                        mb: 2,
                        background: 'rgba(239, 68, 68, 0.05)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderLeft: '3px solid #ef4444',
                        borderRadius: 2
                      }}
                    >
                      <Typography variant="caption" sx={{ color: '#ef4444', fontWeight: 700, display: 'block', mb: 0.5 }}>
                        THE PROBLEM
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', lineHeight: 1.6 }}>
                        Graduates with certificates but zero real-world skills. Employers still need 6 months of training before they're productive.
                      </Typography>
                    </Box>

                    {/* Solution Statement */}
                    <Box
                      sx={{
                        p: 2,
                        mb: 3,
                        background: 'rgba(16, 185, 129, 0.05)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        borderLeft: '3px solid #10b981',
                        borderRadius: 2
                      }}
                    >
                      <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700, display: 'block', mb: 0.5 }}>
                        THE SOLUTION
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500, lineHeight: 1.6 }}>
                        Industry-validated courses that produce job-ready professionals from day one. Built with employers, certified by experts, proven in production.
                      </Typography>
                    </Box>

                    {/* CTA */}
                    <Box
                      sx={{
                        mt: 'auto',
                        p: 2.5,
                        background: 'rgba(245, 158, 11, 0.12)',
                        border: '2px solid rgba(245, 158, 11, 0.3)',
                        borderRadius: 2,
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '3px',
                          background: '#f59e0b'
                        }
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                        Transform Your Institution
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontSize: '0.875rem' }}>
                        Produce job-ready graduates that employers actually want to hire
                      </Typography>
                      <Button
                        variant="contained"
                        component={Link}
                        href="/courses"
                        fullWidth
                        startIcon={<AutoStories />}
                        sx={{
                          px: 2,
                          py: 1.2,
                          background: '#4F46E5',
                          color: '#fff',
                          fontWeight: 600,
                          boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)',
                          '&:hover': {
                            background: '#4338CA',
                            boxShadow: '0 6px 20px rgba(79, 70, 229, 0.5)',
                            transform: 'translateY(-2px)'
                          },
                          '&:focus-visible': {
                            outline: '3px solid',
                            outlineColor: '#a7dadb',
                            outlineOffset: '2px'
                          }
                        }}
                      >
                        View Course Catalog
                      </Button>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </MotionBox>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{
        py: 'var(--section-padding-y)',
        position: 'relative',
        zIndex: 1
      }}>
        <Container maxWidth="lg">
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Box
              sx={{
                background: 'rgba(167, 218, 219, 0.08)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '2px solid rgba(167, 218, 219, 0.3)',
                borderRadius: 3,
                p: { xs: 4, md: 8 },
                boxShadow: '0 8px 32px rgba(167, 218, 219, 0.15), inset 0 1px 0 rgba(167, 218, 219, 0.15)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #a7dadb 0%, rgba(167, 218, 219, 0.3) 100%)'
                }
              }}
            >
              <Grid container spacing={3.6} alignItems="center">
                <Grid size={{ xs: 12, md: 7 }}>
                  <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 3 }}>
                    <Rocket sx={{ fontSize: '2.5rem', color: '#a7dadb' }} />
                    <Typography
                      variant="h3"
                      sx={{
                        fontSize: { xs: '1.75rem', md: '2.5rem' },
                        fontWeight: 700,
                        textAlign: 'left'
                      }}
                    >
                      Ready to Transform Learning?
                    </Typography>
                  </Stack>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2.4,
                      color: 'text.secondary',
                      fontSize: { xs: '1rem', md: '1.25rem' },
                      lineHeight: 1.8,
                      textAlign: 'left'
                    }}
                  >
                    <Box component="span" sx={{ color: '#10b981', fontWeight: 700 }}>
                      Free tier. Full power. Forever.
                    </Box>{' '}
                    Transform your learning workflow with the most advanced AI-powered design platform.
                    No credit card. No trials. Just sign up and start building.
                  </Typography>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={1.2}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      component={Link}
                      href="https://solara.smartslate.io"
                      startIcon={<Rocket />}
                      sx={{
                        px: 2.4,
                        py: 1.05,
                        fontSize: '1.125rem',
                        fontWeight: 600,
                        background: '#4F46E5',
                        color: '#fff',
                        boxShadow: '0 4px 12px rgba(79, 70, 229, 0.4)',
                        '&:hover': {
                          background: '#4338CA',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px rgba(79, 70, 229, 0.5)'
                        },
                        '&:focus-visible': {
                          outline: '3px solid',
                          outlineColor: '#a7dadb',
                          outlineOffset: '2px'
                        }
                      }}
                    >
                      Explore Solara Learning Engine
                    </Button>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 5 }}>
                  <Box
                    sx={{
                      p: 2.4,
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(167, 218, 219, 0.2)',
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(167, 218, 219, 0.1)'
                    }}
                  >
                    <Stack spacing={1.8}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <CheckCircle sx={{ color: '#a7dadb', fontSize: '2rem' }} />
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            Free Tier Forever
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Full access—no trials, no limits
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Speed sx={{ color: '#a7dadb', fontSize: '2rem' }} />
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            Instant Activation
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Sign up and start creating immediately
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Analytics sx={{ color: '#a7dadb', fontSize: '2rem' }} />
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                            Premium Features Included
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Access powerful tools from day one
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </MotionBox>
        </Container>
      </Box>

      {/* JSON-LD */}
      <JsonLd data={getOrganizationJsonLd()} />
      <JsonLd data={getWebsiteJsonLd()} />
    </Box>
  );
}
