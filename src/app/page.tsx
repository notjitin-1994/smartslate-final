'use client';

import { Box, Container, Typography, Button, Card, CardContent, Chip, Stack, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import JsonLd from '@/components/seo/JsonLd';
import { getOrganizationJsonLd, getWebsiteJsonLd } from '@/components/seo/jsonld';
import { ProductIcons } from '@/components/icons/ProductIcons';
import Link from 'next/link';
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
      {/* Hero Section - Completely Revamped */}
      <Box
        component="section"
        aria-label="Hero section"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          pt: { xs: 12, md: 10 },
          pb: { xs: 8, md: 10 },
          position: 'relative',
          zIndex: 1
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid size={{ xs: 12, lg: 7 }}>
              <MotionBox
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {/* Status Badge */}
                <motion.div variants={fadeInUp}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 3,
                      px: 2.5,
                      py: 1,
                      background: 'rgba(16, 185, 129, 0.12)',
                      border: '1.5px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: '50px',
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    <Box
                      sx={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#10b981',
                        animation: 'pulse-dot 2s ease-in-out infinite',
                        '@keyframes pulse-dot': {
                          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
                          '50%': { opacity: 0.5, transform: 'scale(1.2)' }
                        }
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: '#10b981',
                        letterSpacing: '0.05em'
                      }}
                    >
                      POLARIS NOW LIVE
                    </Typography>
                  </Box>
                </motion.div>

                {/* Problem-Focused Headline */}
                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="h1"
                    sx={{
                      mb: 3,
                      fontSize: { xs: '2.75rem', sm: '3.75rem', md: '4.75rem', lg: '5.5rem' },
                      fontWeight: 800,
                      lineHeight: 1.05,
                      color: 'text.primary',
                      textAlign: 'left',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    Stop Juggling{' '}
                    <Box component="span" sx={{ color: '#ef4444' }}>15 Tools</Box>.
                    <br />
                    Start Building with{' '}
                    <Box component="span" sx={{ color: '#a7dadb' }}>
                      Solara
                    </Box>.
                  </Typography>
                </motion.div>

                {/* Compelling Subheading */}
                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 5,
                      color: 'text.primary',
                      fontSize: { xs: '1.2rem', md: '1.5rem' },
                      lineHeight: 1.6,
                      fontWeight: 400,
                      textAlign: 'left',
                      maxWidth: '700px'
                    }}
                  >
                    You&apos;re spending thousands or more on fragmented tools. Losing weeks to disconnected data.
                    Watching learner engagement collapse.
                    <br /><br />
                    <Box component="span" sx={{ color: '#a7dadb', fontWeight: 700 }}>
                      Solara replaces your entire learning tech stack with one intelligent platform.
                    </Box>
                    {' '}Design. Deliver. Measure. All unified. All AI-powered. All transformative.
                  </Typography>
                </motion.div>

                {/* Enhanced CTA Buttons */}
                <motion.div variants={fadeInUp}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    sx={{ mb: 6 }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      component={Link}
                      href="https://polaris.smartslate.io"
                      startIcon={<Rocket />}
                      sx={{
                        px: 4,
                        py: 2,
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        background: '#4F46E5',
                        color: '#fff',
                        minWidth: '240px',
                        boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
                        '&:hover': {
                          background: '#4338CA',
                          transform: 'translateY(-3px)',
                          boxShadow: '0 12px 32px rgba(79, 70, 229, 0.5)'
                        },
                        '&:active': {
                          transform: 'translateY(-1px)'
                        },
                        '&:focus-visible': {
                          outline: '3px solid',
                          outlineColor: '#a7dadb',
                          outlineOffset: '3px'
                        }
                      }}
                    >
                      Start Free Forever
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      component={Link}
                      href="/demo"
                      startIcon={<PlayCircle />}
                      sx={{
                        px: 4,
                        py: 2,
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        borderColor: '#a7dadb',
                        color: '#a7dadb',
                        borderWidth: 2,
                        minWidth: '240px',
                        '&:hover': {
                          borderWidth: 2,
                          backgroundColor: 'rgba(167, 218, 219, 0.12)',
                          transform: 'translateY(-2px)',
                          borderColor: '#a7dadb'
                        }
                      }}
                    >
                      Watch Demo
                    </Button>
                  </Stack>
                </motion.div>

                {/* Action-Focused CTA Banner */}
                <motion.div variants={fadeInUp}>
                  <Box
                    sx={{
                      mb: 6,
                      p: 3,
                      background: 'rgba(167, 218, 219, 0.15)',
                      border: '2px solid rgba(167, 218, 219, 0.3)',
                      borderRadius: 3,
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
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '12px',
                          background: '#4F46E5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: '0 8px 24px rgba(79, 70, 229, 0.4)',
                          animation: 'pulse-scale 2s ease-in-out infinite',
                          '@keyframes pulse-scale': {
                            '0%, 100%': { transform: 'scale(1)' },
                            '50%': { transform: 'scale(1.05)' }
                          }
                        }}
                      >
                        <Rocket sx={{ color: '#fff', fontSize: '2rem' }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{
                            color: 'text.primary',
                            fontWeight: 800,
                            fontSize: '1.125rem',
                            mb: 0.5
                          }}
                        >
                          Be First. Transform Now.
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            fontWeight: 600,
                            fontSize: '0.9375rem'
                          }}
                        >
                          Join the early adopters revolutionizing learning design
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </motion.div>

                {/* Impact Metrics - Enhanced Design */}
                <motion.div variants={fadeInUp}>
                  <Box
                    sx={{
                      p: 3,
                      background: 'rgba(167, 218, 219, 0.05)',
                      backdropFilter: 'blur(16px)',
                      border: '1.5px solid rgba(167, 218, 219, 0.2)',
                      borderRadius: 3
                    }}
                  >
                    <Grid container spacing={3}>
                      {[
                        {
                          value: '95%',
                          label: 'Faster Requirements',
                          icon: <Speed />,
                          color: '#a7dadb'
                        },
                        {
                          value: '70%',
                          label: 'Reduced Launch Time',
                          icon: <Rocket />,
                          color: '#4F46E5'
                        },
                        {
                          value: '100%',
                          label: 'Business Alignment',
                          icon: <Verified />,
                          color: '#10b981'
                        }
                      ].map((stat, idx) => (
                        <Grid size={{ xs: 12, sm: 4 }} key={idx}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Box sx={{
                              color: stat.color,
                              fontSize: '2rem',
                              mb: 1,
                              display: 'flex',
                              justifyContent: 'center'
                            }}>
                              {stat.icon}
                            </Box>
                            <Typography
                              variant="h3"
                              sx={{
                                color: stat.color,
                                fontWeight: 800,
                                mb: 0.5,
                                fontSize: { xs: '2rem', md: '2.5rem' }
                              }}
                            >
                              {stat.value}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                              {stat.label}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </motion.div>
              </MotionBox>
            </Grid>

            {/* Solara Ecosystem - Visual Infographic */}
            <Grid size={{ xs: 12, lg: 5 }}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Box
                  sx={{
                    p: 4,
                    background: 'rgba(167, 218, 219, 0.08)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                    border: '2px solid rgba(167, 218, 219, 0.3)',
                    borderRadius: 4,
                    boxShadow: '0 20px 60px rgba(167, 218, 219, 0.2), inset 0 2px 0 rgba(167, 218, 219, 0.15)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Header */}
                  <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography
                      variant="overline"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        fontSize: '0.75rem',
                        display: 'block',
                        mb: 1
                      }}
                    >
                      THE COMPLETE PLATFORM
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        color: '#a7dadb',
                        fontWeight: 800,
                        fontSize: '1.5rem'
                      }}
                    >
                      One Platform. Six Powers.
                    </Typography>
                  </Box>

                  {/* Modules Stack */}
                  <Stack spacing={2}>
                    {[
                      {
                        icon: <Speed />,
                        title: 'Polaris',
                        desc: 'AI blueprint generation',
                        status: 'LIVE',
                        color: '#10b981'
                      },
                      {
                        icon: <CloudUpload />,
                        title: 'Constellation',
                        desc: 'Content transformation',
                        status: 'Q2 2026'
                      },
                      {
                        icon: <AutoAwesome />,
                        title: 'Nova',
                        desc: 'AI content authoring',
                        status: 'Q3 2026'
                      },
                      {
                        icon: <TrendingUp />,
                        title: 'Orbit',
                        desc: 'Personalized delivery',
                        status: 'Q4 2026'
                      },
                      {
                        icon: <Psychology />,
                        title: 'Nebula',
                        desc: 'Intelligent tutoring',
                        status: 'Q1 2027'
                      },
                      {
                        icon: <Analytics />,
                        title: 'Spectrum',
                        desc: 'Advanced analytics',
                        status: 'Q2 2027'
                      }
                    ].map((module, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          p: 2,
                          background: module.status === 'LIVE'
                            ? 'rgba(16, 185, 129, 0.1)'
                            : 'rgba(255, 255, 255, 0.03)',
                          backdropFilter: 'blur(8px)',
                          borderRadius: 2.5,
                          border: module.status === 'LIVE'
                            ? '1.5px solid rgba(16, 185, 129, 0.3)'
                            : '1px solid rgba(167, 218, 219, 0.15)',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          overflow: 'hidden',
                          '&:hover': {
                            background: module.status === 'LIVE'
                              ? 'rgba(16, 185, 129, 0.15)'
                              : 'rgba(167, 218, 219, 0.08)',
                            borderColor: module.status === 'LIVE'
                              ? 'rgba(16, 185, 129, 0.4)'
                              : 'rgba(167, 218, 219, 0.3)',
                            transform: 'translateX(6px)'
                          }
                        }}
                      >
                        {/* Icon */}
                        <Box
                          sx={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: module.status === 'LIVE'
                              ? '#10b981'
                              : '#a7dadb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#091521',
                            fontSize: '1.5rem',
                            flexShrink: 0,
                            boxShadow: module.status === 'LIVE'
                              ? '0 4px 12px rgba(16, 185, 129, 0.3)'
                              : '0 4px 12px rgba(167, 218, 219, 0.3)'
                          }}
                        >
                          {module.icon}
                        </Box>

                        {/* Content */}
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 700,
                              color: 'text.primary',
                              mb: 0.25
                            }}
                          >
                            {module.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                              fontSize: '0.875rem',
                              lineHeight: 1.4
                            }}
                          >
                            {module.desc}
                          </Typography>
                        </Box>

                        {/* Status Badge */}
                        <Chip
                          label={module.status}
                          size="small"
                          sx={{
                            height: '24px',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            background: module.status === 'LIVE'
                              ? '#10b981'
                              : 'rgba(167, 218, 219, 0.15)',
                            color: module.status === 'LIVE'
                              ? '#fff'
                              : 'text.secondary',
                            border: 'none',
                            letterSpacing: '0.05em'
                          }}
                        />
                      </Box>
                    ))}
                  </Stack>

                  {/* Bottom CTA */}
                  <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
                      Start with Polaris. Scale to the complete platform.
                    </Typography>
                    <Button
                      component={Link}
                      href="/products"
                      variant="text"
                      sx={{
                        color: '#a7dadb',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        '&:hover': {
                          background: 'rgba(167, 218, 219, 0.1)'
                        }
                      }}
                    >
                      Explore All Products →
                    </Button>
                  </Box>
                </Box>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Polaris Introduction Section - Revamped */}
      <Box
        component="section"
        aria-label="Polaris introduction"
        sx={{
          py: { xs: 6, md: 9.6 },
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
            {/* Premium Branding Header */}
            <motion.div variants={fadeInUp}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 5 }}>
                <Box
                  sx={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '16px',
                    background: '#a7dadb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 12px 32px rgba(167, 218, 219, 0.4)'
                  }}
                >
                  <Speed sx={{ fontSize: '2.5rem', color: '#091521' }} />
                </Box>
                <Box>
                  <Typography
                    variant="overline"
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 800,
                      color: '#a7dadb',
                      letterSpacing: '0.1em',
                      display: 'block',
                      mb: 0.5
                    }}
                  >
                    SOLARA POLARIS
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.95rem' }}>
                    The AI Learning Blueprint Engine
                  </Typography>
                </Box>
              </Stack>
            </motion.div>

            {/* Emotionally Compelling Headline */}
            <motion.div variants={fadeInUp}>
              <Typography
                variant="h1"
                sx={{
                  mb: 3,
                  fontSize: { xs: '2.75rem', md: '4.5rem' },
                  fontWeight: 800,
                  lineHeight: 1.05,
                  color: '#a7dadb',
                  letterSpacing: '-0.02em'
                }}
              >
                Stop Wasting Weeks on
                <br />
                Stakeholder Alignment
              </Typography>
            </motion.div>

            {/* Problem-Focused Subheading */}
            <motion.div variants={fadeInUp}>
              <Typography
                variant="h5"
                sx={{
                  mb: 7,
                  color: 'text.primary',
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  lineHeight: 1.6,
                  fontWeight: 400,
                  maxWidth: '900px'
                }}
              >
                You&apos;re an expert instructional designer. But you spend{' '}
                <Box component="span" sx={{ color: '#ef4444', fontWeight: 700 }}>70% of your time</Box> in meetings—
                wrestling with vague requirements, conflicting priorities, and the constant dread of misalignment.
                <br /><br />
                <Box component="span" sx={{ color: '#a7dadb', fontWeight: 700 }}>What if you could skip straight to the design?</Box>
              </Typography>
            </motion.div>

            {/* Interactive Process Infographic */}
            <motion.div variants={fadeInUp}>
              <Box
                sx={{
                  p: { xs: 3, md: 5 },
                  background: 'rgba(167, 218, 219, 0.06)',
                  backdropFilter: 'blur(24px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                  border: '1px solid rgba(167, 218, 219, 0.25)',
                  borderRadius: 4,
                  mb: 6,
                  boxShadow: '0 12px 40px rgba(167, 218, 219, 0.12), inset 0 1px 0 rgba(167, 218, 219, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Process Flow Visualization */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ color: '#a7dadb', fontWeight: 700, mb: 3, textAlign: 'center' }}>
                    THE POLARIS TRANSFORMATION
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', mb: 4 }}>
                    {/* Connecting Line */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '40%',
                        left: '10%',
                        right: '10%',
                        height: '2px',
                        background: 'rgba(167, 218, 219, 0.3)',
                        zIndex: 0
                      }}
                    />
                    
                    {/* Process Steps */}
                    {[
                      { step: '1', label: 'Input Business Goals', time: '6 days' },
                      { step: '2', label: 'AI Analysis', time: '3-5 mins' },
                      { step: '3', label: 'Generate Blueprint', time: '2 mins' }
                    ].map((item, idx) => (
                      <Box key={idx} sx={{ zIndex: 1, textAlign: 'center' }}>
                        <Box
                          sx={{
                            width: { xs: '60px', md: '80px' },
                            height: { xs: '60px', md: '80px' },
                            borderRadius: '50%',
                            background: '#a7dadb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 1.2,
                            boxShadow: '0 8px 24px rgba(167, 218, 219, 0.3)',
                            border: '3px solid rgba(255, 255, 255, 0.1)'
                          }}
                        >
                          <Typography variant="h4" sx={{ color: '#000', fontWeight: 700 }}>
                            {item.step}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600, mb: 0.5 }}>
                          {item.label}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#a7dadb', fontWeight: 700 }}>
                          {item.time}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Enhanced Value Proposition Grid */}
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        p: 4,
                        background: 'rgba(239, 68, 68, 0.08)',
                        borderRadius: 3,
                        border: '2px solid rgba(239, 68, 68, 0.2)',
                        height: '100%',
                        position: 'relative',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '4px',
                          background: '#ef4444',
                          borderRadius: '3px 3px 0 0'
                        }
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                        <Close sx={{ color: '#ef4444', fontSize: '2rem' }} />
                        <Typography variant="h5" sx={{ color: '#ef4444', fontWeight: 800 }}>
                          THE OLD WAY
                        </Typography>
                      </Stack>

                      <Stack spacing={2.5}>
                        {[
                          {
                            icon: <CalendarMonth />,
                            title: '4-6 Weeks of Stakeholder Meetings',
                            description: 'Endless calendaring, conflicting schedules, and meeting fatigue'
                          },
                          {
                            icon: <Loop />,
                            title: '7+ Revision Cycles',
                            description: '"Actually, what we meant was..." after you\'ve already built it'
                          },
                          {
                            icon: <ErrorOutline />,
                            title: 'Missed Requirements',
                            description: 'Critical business objectives discovered in user testing'
                          },
                          {
                            icon: <Description />,
                            title: 'Manual Documentation Hell',
                            description: 'Hours spent formatting Word docs no one reads'
                          },
                          {
                            icon: <Straighten />,
                            title: 'Misalignment Risk',
                            description: 'Constant fear you missed something important'
                          }
                        ].map((item, idx) => (
                          <Box key={idx} sx={{ display: 'flex', gap: 2 }}>
                            <Box sx={{ color: '#ef4444', flexShrink: 0, fontSize: '1.5rem', mt: 0.5 }}>
                              {item.icon}
                            </Box>
                            <Box>
                              <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 700, mb: 0.5 }}>
                                {item.title}
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                {item.description}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                      sx={{
                        p: 4,
                        background: 'rgba(16, 185, 129, 0.08)',
                        borderRadius: 3,
                        border: '2px solid rgba(16, 185, 129, 0.3)',
                        height: '100%',
                        position: 'relative',
                        boxShadow: '0 16px 48px rgba(16, 185, 129, 0.15)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '4px',
                          background: '#10b981',
                          borderRadius: '3px 3px 0 0'
                        }
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                        <CheckCircle sx={{ color: '#10b981', fontSize: '2rem' }} />
                        <Typography variant="h5" sx={{ color: '#10b981', fontWeight: 800 }}>
                          THE POLARIS WAY
                        </Typography>
                      </Stack>

                      <Stack spacing={2.5}>
                        {[
                          {
                            icon: <Speed />,
                            title: '1-Week Blueprint Generation',
                            description: 'From business goals to comprehensive learning design in days, not months'
                          },
                          {
                            icon: <AutoAwesome />,
                            title: 'AI-Perfect First Draft',
                            description: 'Structured, complete, and aligned from the start'
                          },
                          {
                            icon: <Verified />,
                            title: '100% Requirements Captured',
                            description: 'AI identifies gaps you didn\'t even know existed'
                          },
                          {
                            icon: <Description />,
                            title: 'Auto-Generated Documentation',
                            description: 'Executive summaries, objectives, KPIs—all formatted and ready'
                          },
                          {
                            icon: <TrendingUp />,
                            title: 'Perfect Stakeholder Alignment',
                            description: 'Business objectives mapped to learning outcomes from day one'
                          }
                        ].map((item, idx) => (
                          <Box key={idx} sx={{ display: 'flex', gap: 2 }}>
                            <Box sx={{ color: '#10b981', flexShrink: 0, fontSize: '1.5rem', mt: 0.5 }}>
                              {item.icon}
                            </Box>
                            <Box>
                              <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 700, mb: 0.5 }}>
                                {item.title}
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                {item.description}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </motion.div>

            {/* Impact Metrics */}
            <motion.div variants={fadeInUp}>
              <Grid container spacing={1.8} sx={{ mb: 6 }}>
                {[
                  {
                    value: '6 weeks → 1 week',
                    label: 'Requirements Gathering Time',
                    icon: <Speed />,
                    color: '#a7dadb'
                  },
                  {
                    value: '100%',
                    label: 'Business Goal Alignment',
                    icon: <TrendingUp />,
                    color: '#4F46E5'
                  },
                  {
                    value: '0',
                    label: 'Missed Requirements',
                    icon: <Verified />,
                    color: '#10b981'
                  },
                  {
                    value: '15x',
                    label: 'Faster Time-to-Launch',
                    icon: <Rocket />,
                    color: '#f59e0b'
                  }
                ].map((metric, idx) => (
                  <Grid size={{ xs: 6, md: 3 }} key={idx}>
                    <Box
                      sx={{
                        p: 1.8,
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(167, 218, 219, 0.2)',
                        borderRadius: 3,
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 16px 40px rgba(167, 218, 219, 0.2)',
                          background: 'rgba(167, 218, 219, 0.08)'
                        }
                      }}
                    >
                      <Box
                        sx={{
                          color: metric.color,
                          fontSize: '2.5rem',
                          mb: 1.2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {metric.icon}
                      </Box>
                      <Typography
                        variant="h4"
                        sx={{
                          color: metric.color,
                          fontWeight: 800,
                          mb: 0.6,
                          fontSize: { xs: '1.5rem', md: '2rem' }
                        }}
                      >
                        {metric.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                        {metric.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </motion.div>

            

            {/* Compelling CTA Section */}
            <motion.div variants={fadeInUp}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: { xs: 4, md: 6 },
                  background: 'rgba(167, 218, 219, 0.08)',
                  borderRadius: 4,
                  border: '2px solid rgba(167, 218, 219, 0.3)',
                  mb: 6
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    color: '#a7dadb',
                    fontWeight: 800,
                    mb: 2,
                    fontSize: { xs: '1.75rem', md: '2.25rem' }
                  }}
                >
                  Ready to 10x Your Design Speed?
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mb: 4,
                    maxWidth: '700px',
                    mx: 'auto',
                    fontSize: '1.125rem',
                    lineHeight: 1.7
                  }}
                >
                  Experience the future of learning design—where AI handles the complexity and you focus on creativity.
                  <br />
                  <Box component="span" sx={{ color: '#10b981', fontWeight: 700 }}>
                    Start free, stay free.
                  </Box> Unlock powerful features the moment you sign up—no credit card, no trials, just instant access.
                </Typography>

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  justifyContent="center"
                  sx={{ mb: 3 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    href="https://polaris.smartslate.io"
                    startIcon={<Rocket />}
                    sx={{
                      px: 5,
                      py: 2,
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      background: '#4F46E5',
                      color: '#fff',
                      boxShadow: '0 12px 32px rgba(79, 70, 229, 0.4)',
                      minWidth: '240px',
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
                    Get Started Free
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    component={Link}
                    href="/demo"
                    startIcon={<PlayCircle />}
                    sx={{
                      px: 5,
                      py: 2,
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      borderColor: '#a7dadb',
                      color: '#a7dadb',
                      borderWidth: 2,
                      minWidth: '240px',
                      '&:hover': {
                        borderWidth: 2,
                        backgroundColor: 'rgba(167, 218, 219, 0.12)',
                        transform: 'translateY(-2px)',
                        borderColor: '#a7dadb'
                      }
                    }}
                  >
                    Watch Demo
                  </Button>
                </Stack>

                <Stack direction="row" spacing={3} justifyContent="center" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CheckCircle sx={{ fontSize: '1.25rem', color: '#10b981' }} />
                    <span>Free tier forever</span>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CheckCircle sx={{ fontSize: '1.25rem', color: '#10b981' }} />
                    <span>No credit card</span>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CheckCircle sx={{ fontSize: '1.25rem', color: '#10b981' }} />
                    <span>Instant access</span>
                  </Box>
                </Stack>
              </Box>
            </motion.div>

            {/* Enhanced Target Audience Badges */}
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
          py: { xs: 8, md: 12 },
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
                  title: '6 Weeks → 1 Week',
                  subtitle: 'Requirements in Days, Not Months',
                  problem: 'Stop losing momentum to endless stakeholder meetings and revision cycles',
                  solution: 'Polaris generates comprehensive blueprints in a single week, capturing every requirement while stakeholders\' insights are fresh',
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
                  solution: 'Polaris embeds ADDIE, SAM, Bloom\'s Taxonomy, and Kirkpatrick automatically—every blueprint is expert-grade',
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
                  While you&apos;re coordinating calendars, you could have your blueprints done.
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
          py: { xs: 8, md: 12 },
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
        py: { xs: 6, md: 9.6 },
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
