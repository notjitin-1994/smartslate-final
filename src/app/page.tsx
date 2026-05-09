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
import BeyondSolara from '@/components/landing/BeyondSolara';
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
          pt: 4, pb: 6, md: { pt: 6, pb: 8 },
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
                        className="rounded-lg px-3 py-1 text-[10px] font-bold tracking-widest bg-[#a7dadb] text-[#091521] border border-[#a7dadb]/20"
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
                </motion.div>
              ))}
          </MotionBox>
        </Container>
      </Box>

      <BeyondSolara />

      {/* CTA Section */}
      <Box sx={{
        pt: 4, pb: 6, md: { pt: 6, pb: 8 },
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
      <BetaRequestModal 
        isOpen={betaModalOpen} 
        onClose={() => setBetaModalOpen(false)} 
        productName="Constellation" 
      />
    </Box>
  );
}
