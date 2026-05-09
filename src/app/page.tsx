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
import BetaRequestModal from '@/components/landing/BetaRequestModal';
import { MagicCard } from '@/components/ui/magic-card';
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
  const [betaModalOpen, setBetaModalOpen] = useState(false);
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

      {/* Why Solara Section - Completely Revamped */}
      <Box
        component="section"
        aria-label="Why Solara"
        sx={{
          pt: { xs: 8, md: 12 }, pb: { xs: 12, md: 16 },
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
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
                  <Chip 
                    label="Polaris: LIVE" 
                    size="small" 
                    sx={{ bgcolor: '#a7dadb', color: '#091521', fontWeight: 800, borderRadius: '4px' }} 
                  />
                  <Chip 
                    label="Constellation: BETA" 
                    size="small" 
                    sx={{ bgcolor: '#a7dadb', color: '#091521', fontWeight: 800, borderRadius: '4px' }} 
                  />
                  <Chip 
                    label="Nova: BUILDING" 
                    size="small" 
                    sx={{ bgcolor: '#a7dadb', color: '#091521', fontWeight: 800, borderRadius: '4px' }} 
                  />
                  <Chip 
                    label="SLATED FOR 2027: Nebula, Orbit, Spectrum" 
                    size="small" 
                    variant="outlined"
                    sx={{ color: '#a7dadb', borderColor: '#a7dadb', fontWeight: 800, borderRadius: '4px' }} 
                  />
                </Stack>
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
                  THE SOLARA ENGINE ADVANTAGE
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
                  Are Switching to the{' '}
                  <Box component="span" sx={{ color: '#a7dadb' }}>
                    Solara Engine
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '1.125rem', md: '1.375rem' },
                    lineHeight: 1.6,
                    width: '100%',
                    textAlign: 'left'
                  }}
                >
                  Traditional requirements gathering is killing your velocity. Stop wasting time in meetings—
                  start building with the full power of the Solara ecosystem.
                </Typography>
              </Box>
            </motion.div>

            
            {/* Solara Ecosystem Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[
                {
                  icon: <Speed />,
                  name: 'Polaris',
                  status: 'LIVE',
                  subtitle: 'Design rigorously in 1 hour',
                  outcome: 'Generate comprehensive learning blueprints instantly so that you can align stakeholders before writing a single module.',
                  cta: 'Get Started',
                  link: 'https://polaris.smartslate.io'
                },
                {
                  icon: <AutoAwesome />,
                  name: 'Constellation',
                  status: 'BETA',
                  subtitle: 'Automate content structuring',
                  outcome: 'Transform raw source material into structured instructional logic automatically, so that you can focus on strategy rather than formatting.',
                  cta: 'Request Access to Beta',
                  isBeta: true
                },
                {
                  icon: <Lightbulb />,
                  name: 'Nova',
                  status: 'BUILDING',
                  subtitle: 'Co-author at scale',
                  outcome: 'Leverage intelligent authoring assistance to produce pedagogically sound content 10x faster without compromising quality.',
                  cta: 'Learn More',
                  link: 'https://solara.smartslate.io/nova'
                },
                {
                  icon: <Insights />,
                  name: 'Orbit',
                  status: '2027',
                  subtitle: 'Deliver adaptive trajectories',
                  outcome: 'Provide real-time, personalized learning paths for every individual so that you can ensure maximum engagement and mastery.',
                  cta: 'Learn More',
                  link: 'https://solara.smartslate.io/orbit'
                },
                {
                  icon: <Psychology />,
                  name: 'Nebula',
                  status: '2027',
                  subtitle: 'Scale 24/7 support',
                  outcome: 'Deploy an always-on AI tutor to guide learners exactly when they need it most, without overloading your instruction team.',
                  cta: 'Learn More',
                  link: 'https://solara.smartslate.io/orbit'
                },
                {
                  icon: <Analytics />,
                  name: 'Spectrum',
                  status: '2027',
                  subtitle: 'Prove financial impact',
                  outcome: 'Connect learning outcomes directly to business KPIs so that you can confidently demonstrate ROI to your executive leadership.',
                  cta: 'Learn More',
                  link: 'https://solara.smartslate.io/nova'
                }
              ].map((module, index) => (
                <motion.div key={index} variants={fadeInUp} className="h-full">
                  <MagicCard
                    className="h-full w-full flex-col items-start justify-between p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border-white/10"
                    gradientColor="rgba(167, 218, 219, 0.05)"
                  >
                    <div className="flex w-full items-start justify-between mb-8">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                        style={{ backgroundColor: 'rgba(167, 218, 219, 0.1)', color: '#a7dadb' }}
                      >
                        {module.icon}
                      </div>
                      <div 
                        className="rounded-full px-3 py-1 text-[10px] font-bold tracking-widest bg-[#a7dadb] text-[#091521] border border-[#a7dadb]/20"
                      >
                        {module.status}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 flex-grow text-left">
                      <h3 className="font-heading text-2xl font-bold text-[#e0e0e0] text-left">
                        {module.name}
                      </h3>
                      <h4 className="text-sm font-semibold tracking-wide uppercase text-[#a7dadb] text-left">
                        {module.subtitle}
                      </h4>
                      <div className="mt-4 h-px w-12 bg-[#a7dadb]/20" />
                      <p className="mt-4 text-base leading-relaxed text-[#b0c5c6] mb-8 text-left">
                        {module.outcome}
                      </p>
                    </div>

                    <div className="mt-auto pt-6 w-full border-t border-white/5">
                      {module.isBeta ? (
                        <Button
                          fullWidth
                          onClick={() => setBetaModalOpen(true)}
                          sx={{
                            py: 1.5,
                            bgcolor: 'rgba(167, 218, 219, 0.1)',
                            color: '#a7dadb',
                            fontWeight: 700,
                            borderRadius: '12px',
                            border: '1px solid rgba(167, 218, 219, 0.3)',
                            textTransform: 'none',
                            '&:hover': {
                              bgcolor: 'rgba(167, 218, 219, 0.2)',
                            }
                          }}
                        >
                          {module.cta}
                        </Button>
                      ) : (
                        <Link href={module.link || '#'} style={{ textDecoration: 'none' }}>
                          <Button
                            fullWidth
                            sx={{
                              py: 1.5,
                              bgcolor: module.name === 'Polaris' ? '#4F46E5' : 'transparent',
                              color: module.name === 'Polaris' ? '#fff' : '#a7dadb',
                              fontWeight: 700,
                              borderRadius: '12px',
                              border: module.name === 'Polaris' ? 'none' : '1px solid rgba(167, 218, 219, 0.3)',
                              textTransform: 'none',
                              '&:hover': {
                                bgcolor: module.name === 'Polaris' ? '#4338CA' : 'rgba(167, 218, 219, 0.1)',
                              }
                            }}
                          >
                            {module.cta}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </MagicCard>
                </motion.div>))}
            </div>
          </MotionBox>
        </Container>
      </Box>

      {/* Product Showcase Section - Completely Revamped */}
      <Box
        component="section"
        aria-label="Product showcase"
        sx={{
          pt: { xs: 8, md: 12 }, pb: { xs: 12, md: 16 },
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
        pt: { xs: 8, md: 12 }, pb: { xs: 12, md: 16 },
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
