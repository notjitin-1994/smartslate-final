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
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { Meteors } from '@/components/ui/meteors';
import { ShineBorder } from '@/components/ui/shine-border';
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
                </motion.div>))}
            </div>
          </MotionBox>
        </Container>
      </Box>

      <BeyondSolara />

      {/* CTA Section */}
      <Box sx={{
        pt: 8, pb: 12, md: { pt: 12, pb: 16 },
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
            <div className="relative group w-full overflow-hidden rounded-[2.5rem] bg-[#0d1b2a] border border-white/5 shadow-2xl">
              <ShineBorder
                className="pointer-events-none"
                shineColor={["#a7dadb", "#4F46E5", "#ffffff"]}
                borderWidth={1}
                duration={10}
              />
              <Meteors number={30} />
              
              <div className="relative z-10 p-8 md:p-16">
                <Grid container spacing={8} alignItems="center">
                  <Grid size={{ xs: 12, md: 7 }}>
                    <div className="text-left">
                      <div className="mb-6 inline-flex items-center rounded-lg bg-[#a7dadb]/10 border border-[#a7dadb]/20 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-[#a7dadb] uppercase">
                        THE SMARTSLATE ECOSYSTEM
                      </div>
                      
                      <h2 className="mb-6 font-heading text-4xl font-extrabold leading-[1.1] text-white md:text-5xl lg:text-6xl text-left">
                        Ready to Transform <br />
                        <span className="text-[#a7dadb]">Learning?</span>
                      </h2>
                      
                      <p className="mb-10 max-w-2xl text-lg leading-relaxed text-[#b0c5c6] md:text-xl text-left">
                        <Box component="span" sx={{ color: '#a7dadb', fontWeight: 700 }}>Free tier. Full power. Forever.</Box>
                        <br /><br />
                        Transform your learning workflow with the most advanced AI-powered design platform. 
                        No credit card. No trials. Just sign up and start building.
                      </p>
                      
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-start">
                        <Link href="https://www.smartslate.io/contact" style={{ textDecoration: 'none' }}>
                          <ShimmerButton
                            background="#4F46E5"
                            shimmerColor="#ffffff"
                            className="h-14 min-w-[240px] px-10 text-lg font-bold shadow-[0_12px_40px_rgba(79,70,229,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <Rocket className="mr-2 h-5 w-5" />
                            Reach Out
                          </ShimmerButton>
                        </Link>
                      </div>
                    </div>
                  </Grid>

                  <Grid size={{ xs: 12, md: 5 }}>
                    <div className="flex flex-col gap-6">
                      {[
                        {
                          icon: <CheckCircle className="h-6 w-6 text-[#10b981]" />,
                          title: "Free Tier Forever",
                          desc: "Full access—no trials, no limits"
                        },
                        {
                          icon: <Speed className="h-6 w-6 text-[#a7dadb]" />,
                          title: "Instant Activation",
                          desc: "Sign up and start creating immediately"
                        },
                        {
                          icon: <WorkspacePremium className="h-6 w-6 text-[#a7dadb]" />,
                          title: "Premium Features Included",
                          desc: "Access powerful tools from day one"
                        }
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                          <div className="mt-1">{item.icon}</div>
                          <div className="text-left">
                            <h4 className="font-bold text-white text-lg">{item.title}</h4>
                            <p className="text-sm text-[#b0c5c6] leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Grid>
                </Grid>
              </div>
              
              {/* Radial Glow */}
              <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-[2.5rem] bg-[#4F46E5]/20 blur-[120px] pointer-events-none" />
            </div>
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
