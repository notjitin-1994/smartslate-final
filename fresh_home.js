const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/app/page.tsx');

const freshHome = `'use client';

import { Box, Container, Typography, Button, Chip, Stack, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JsonLd from '@/components/seo/JsonLd';
import { getOrganizationJsonLd, getWebsiteJsonLd } from '@/components/seo/schemas';
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
  Architecture,
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
  WorkspacePremium
} from '@mui/icons-material';

const MotionBox = motion.create(Box);

const solaraModules = [
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
];

function ModuleCard({ module, onBetaClick }: { module: any, onBetaClick: () => void }) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={fadeInUp} className="h-full">
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
          <div className="rounded-lg px-3 py-1 text-[10px] font-bold tracking-widest bg-[#a7dadb] text-[#091521] border border-[#a7dadb]/20">
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
              onClick={onBetaClick}
              sx={{
                py: 1.5,
                bgcolor: 'rgba(167, 218, 219, 0.1)',
                color: '#a7dadb',
                fontWeight: 700,
                borderRadius: '12px',
                border: '1px solid rgba(167, 218, 219, 0.3)',
                textTransform: 'none',
                '&:hover': { bgcolor: 'rgba(167, 218, 219, 0.2)' }
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
                  '&:hover': { bgcolor: module.name === 'Polaris' ? '#4338CA' : 'rgba(167, 218, 219, 0.1)' }
                }}
              >
                {module.cta}
              </Button>
            </Link>
          )}
        </div>
      </MagicCard>
    </motion.div>
  );
}

export default function Home() {
  const [betaModalOpen, setBetaModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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
    <Box component="main" sx={{ minHeight: '100vh', background: (theme) => theme.palette.background.default, position: 'relative' }}>
      <RevampedHero />
      <PolarisIntro />

      {/* Why Solara Section */}
      <Box component="section" aria-label="Why Solara" sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 12, md: 16 }, position: 'relative', zIndex: 1 }}>
        <Container maxWidth="lg">
          <MotionBox initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}>
            <motion.div variants={fadeInUp}>
              <Box sx={{ mb: 6, textAlign: 'left' }}>
                <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 3 }}>
                  {['Polaris: LIVE', 'Constellation: BETA', 'Nova: BUILDING'].map((label, i) => (
                    <Chip key={i} label={label} size="small" sx={{ bgcolor: '#a7dadb', color: '#091521', fontWeight: 800, borderRadius: '4px', mb: 1 }} />
                  ))}
                  <Chip label="SLATED FOR 2027: Nebula, Orbit, Spectrum" size="small" variant="outlined" sx={{ color: '#a7dadb', borderColor: '#a7dadb', fontWeight: 800, borderRadius: '4px', mb: 1 }} />
                </Stack>
                <Typography variant="overline" sx={{ color: '#a7dadb', fontWeight: 800, fontSize: '0.875rem', letterSpacing: '0.15em', display: 'block', mb: 2 }}>
                  THE SOLARA ENGINE ADVANTAGE
                </Typography>
                <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 800, lineHeight: 1.1, color: 'text.primary', mb: 3, letterSpacing: '-0.02em' }}>
                  Why Your Competitors Are Switching to the <Box component="span" sx={{ color: '#a7dadb' }}>Solara Engine</Box>
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary', fontSize: { xs: '1.125rem', md: '1.375rem' }, lineHeight: 1.6, width: '100%', textAlign: 'left' }}>
                  Traditional requirements gathering is killing your velocity. Stop wasting time in meetings—start building with the full power of the Solara ecosystem.
                </Typography>
              </Box>
            </motion.div>

            <div className="mt-12 relative">
              {/* Desktop Grid */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {solaraModules.map((module, index) => (
                  <ModuleCard key={index} module={module} onBetaClick={() => setBetaModalOpen(true)} />
                ))}
              </div>

              {/* Mobile Marquee */}
              <div 
                className="md:hidden overflow-hidden py-4"
                onClick={() => setIsPaused(!isPaused)}
              >
                <motion.div 
                  className="flex gap-4 w-max"
                  animate={isPaused ? {} : { x: ["0%", "-50%"] }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  {[...solaraModules, ...solaraModules].map((module, index) => (
                    <div key={index} className="w-[80vw] shrink-0">
                      <ModuleCard module={module} onBetaClick={() => setBetaModalOpen(true)} />
                    </div>
                  ))}
                </motion.div>
                <div className="mt-8 flex flex-col items-center gap-2 opacity-50">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#a7dadb]">
                    {isPaused ? 'Click to Resume' : 'Touch Card to Pause'}
                  </span>
                  <div className="h-1 w-24 rounded-full bg-white/10 overflow-hidden">
                    <motion.div 
                      className="h-full bg-[#a7dadb]"
                      animate={isPaused ? {} : { x: ["-100%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </MotionBox>
        </Container>
      </Box>

      <BeyondSolara />

      {/* CTA Section */}
      <Box sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 12, md: 16 }, position: 'relative', zIndex: 1 }}>
        <Container maxWidth="lg">
          <MotionBox initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className="relative group w-full overflow-hidden rounded-[2.5rem] bg-[#0d1b2a] border border-white/5 shadow-2xl">
              <ShineBorder className="pointer-events-none" shineColor={["#a7dadb", "#4F46E5", "#ffffff"]} borderWidth={1} duration={14} />
              <Meteors number={35} />
              <div className="relative z-10 p-8 md:p-16">
                <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
                  <Grid size={{ xs: 12, md: 7 }}>
                    <div className="text-left flex flex-col items-start">
                      <div className="mb-6 inline-flex items-center rounded-lg bg-[#a7dadb]/10 border border-[#a7dadb]/20 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-[#a7dadb] uppercase">THE SMARTSLATE ECOSYSTEM</div>
                      <h2 className="mb-6 font-heading text-4xl font-extrabold leading-[1.1] text-white md:text-5xl lg:text-6xl text-left">Ready to Orchestrate <br /><span className="text-[#a7dadb]">Your Learning Future?</span></h2>
                      <div className="mb-8 space-y-4 text-left">
                        <p className="text-xl font-bold text-[#a7dadb]">Free tier. Full power. Forever.</p>
                        <p className="max-w-2xl text-lg leading-relaxed text-[#b0c5c6] md:text-xl">Transform every phase of your talent lifecycle—from intelligent design to industry-validated training and bespoke architecture. Smartslate is the only unified ecosystem built for the AI era.</p>
                      </div>
                      <div className="w-full sm:w-auto">
                        <Link href="https://www.smartslate.io/contact" style={{ textDecoration: 'none' }}>
                          <ShimmerButton background="#4F46E5" shimmerColor="#ffffff" className="h-14 w-full sm:min-w-[240px] px-10 text-lg font-bold shadow-[0_12px_40px_rgba(79,70,229,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98]">
                            <Rocket className="mr-2 h-5 w-5" />Reach Out
                          </ShimmerButton>
                        </Link>
                      </div>
                    </div>
                  </Grid>
                  <Grid size={{ xs: 12, md: 5 }}>
                    <div className="flex flex-col gap-4">
                      {[
                        { name: "Solara Engine", outcome: "Design AI-native learning with 10x velocity so that you can skip the chaos and focus on impact.", color: "#a7dadb", icon: <Speed className="h-5 w-5" /> },
                        { name: "Ignite Series", outcome: "Deploy industry-validated courses that produce job-ready talent so that you can bridge the gap on Day 1.", color: "#4F46E5", icon: <School className="h-5 w-5" /> },
                        { name: "Strategic Architecture", outcome: "Construct bespoke frameworks mapped to unique goals so that you can build uncopyable advantage.", color: "#a7dadb", icon: <Architecture className="h-5 w-5" /> }
                      ].map((item, i) => (
                        <MagicCard key={i} className="flex flex-col items-start gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm" gradientColor="rgba(167, 218, 219, 0.05)">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5" style={{ color: item.color }}>{item.icon}</div>
                            <h4 className="font-bold text-base uppercase tracking-wider" style={{ color: item.color }}>{item.name}</h4>
                          </div>
                          <p className="text-sm text-[#b0c5c6] text-left">{item.outcome}</p>
                        </MagicCard>
                      ))}
                    </div>
                  </Grid>
                </Grid>
              </div>
              <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-[2.5rem] bg-[#4F46E5]/20 blur-[120px] pointer-events-none" />
            </div>
          </MotionBox>
        </Container>
      </Box>

      <JsonLd data={getOrganizationJsonLd()} />
      <JsonLd data={getWebsiteJsonLd()} />
      <BetaRequestModal isOpen={betaModalOpen} onClose={() => setBetaModalOpen(false)} productName="Constellation" />
    </Box>
  );
}`;

fs.writeFileSync(filePath, freshHome);
console.log('Successfully wrote fresh Home page');
