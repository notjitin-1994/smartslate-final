'use client';

import React, { useRef, useEffect } from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';

import {
  ArrowForward,
  AutoAwesome,
  ViewModule,
  Schedule,
  Description,
  CodeOff,
  Explore,
  AutoFixHigh,
  Psychology,
  Handyman,
  PrecisionManufacturing,
  AccountTree,
  Dashboard,
  Apps,
  VideoLibrary,
  Create,
  Lightbulb,
  AutoStories,
  TouchApp,
  Campaign,
  Business,
  DesignServices,
  CheckCircle,
  Verified,
  RocketLaunch,
  EmojiObjects,
  Timeline,
} from '@mui/icons-material';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ---------------------------------------------------------------------------
// Design Tokens & Styled Components
// ---------------------------------------------------------------------------

const COLORS = {
  background: '#020C1B',
  surface: '#0A1526', // slightly lighter navy
  surfaceHover: '#0F1E33',
  teal: '#a7dadb',
  textPrimary: '#ffffff',
  textSecondary: '#94a3b8',
  border: 'rgba(167, 218, 219, 0.12)',
  indigoCTA: '#4F46E5', // Only used for primary button
};

const PageWrapper = styled(Box)({
  position: 'relative',
  background: COLORS.background,
  overflowX: 'hidden',
  color: COLORS.textPrimary,
});

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  paddingTop: 'calc(var(--header-total-height-desktop) - 3rem)',
  paddingBottom: theme.spacing(3),
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    paddingTop: 'calc(var(--header-total-height-mobile) - 2rem)',
    paddingBottom: theme.spacing(2),
  },
}));

const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(6)} 0`,
  position: 'relative',
  zIndex: 10,
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(4)} 0`,
  },
}));

const ElegantCard = styled(Box)({
  background: COLORS.surface,
  border: `1px solid ${COLORS.border}`,
  borderRadius: '24px',
  padding: '40px',
  height: '100%',
  transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    background: COLORS.surfaceHover,
    borderColor: 'rgba(167, 218, 219, 0.3)',
    transform: 'translateY(-4px)',
  },
});

const MonoHeadline = styled(Typography)(({ theme }) => ({
  color: COLORS.textPrimary,
  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
  fontWeight: 800,
  lineHeight: 1.05,
  letterSpacing: '-0.04em',
  marginBottom: theme.spacing(4),
}));

const SectionLabel = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  borderRadius: '100px',
  border: `1px solid ${COLORS.border}`,
  color: COLORS.teal,
  fontWeight: 600,
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: theme.spacing(4),
  '& svg': {
    fontSize: '1rem',
    marginRight: theme.spacing(1),
  }
}));

const ProjectCard = styled(Box)({
  background: 'transparent',
  borderTop: `1px solid ${COLORS.border}`,
  padding: '48px 0',
  transition: 'all 0.4s ease',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: -1,
    height: '1px',
    width: '0%',
    background: COLORS.teal,
    transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '&:hover': {
    '&::before': {
      width: '100%',
    }
  }
});

// ---------------------------------------------------------------------------
// Content Data
// ---------------------------------------------------------------------------

const courseStats = [
  { icon: <ViewModule sx={{ fontSize: 28 }} />, value: '07', label: 'Modules', desc: 'Structured, metaphor-driven phases to map your journey.', visual: 'progress', bgImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80' },
  { icon: <Schedule sx={{ fontSize: 28 }} />, value: '15+', label: 'Hours', desc: 'Intensive pacing designed for busy working professionals.', visual: 'timeline', bgImage: 'https://images.unsplash.com/photo-1508144753681-9986d4df99b3?auto=format&fit=crop&w=600&q=80' },
  { icon: <Description sx={{ fontSize: 28 }} />, value: '12', label: 'Templates', desc: 'Production-ready workflow blueprints to use immediately.', visual: 'blocks', bgImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=600&q=80' },
  { icon: <CodeOff sx={{ fontSize: 28 }} />, value: 'Zero', label: 'Coding', desc: '100% logic and workflow orchestration, no syntax required.', visual: 'slash', bgImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80' },
];

const modules = [
  { 
    number: '01', 
    icon: <Explore sx={{ fontSize: 24 }} />, 
    title: 'Orientation', 
    description: 'Establish your local development environment and select a high-impact capstone project. We map the current state of large language models, stripping away media hype to define exactly what these systems can—and cannot—reliably execute in production.', 
    skills: ['Environment Setup', 'Project Scoping', 'Model Evaluation'],
    mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    number: '02', 
    icon: <AutoFixHigh sx={{ fontSize: 24 }} />, 
    title: 'The Intelligence Illusion', 
    description: 'Deconstruct the architecture of an LLM. By understanding tokenization, attention mechanisms, and probabilistic generation, you stop treating AI as a magical black box and start treating it as a highly sophisticated pattern-matching engine.', 
    skills: ['Tokenization Mechanics', 'Prompt Engineering', 'Hallucination Mitigation'],
    mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    number: '03', 
    icon: <Psychology sx={{ fontSize: 24 }} />, 
    title: 'The Goldfish Problem', 
    description: 'Models have zero persistent memory by default. Learn to architect context windows, manage token budgets, and implement Retrieval-Augmented Generation (RAG) to give your applications long-term memory over custom datasets.', 
    skills: ['Vector Databases', 'RAG Pipelines', 'Context Management'],
    mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    number: '04', 
    icon: <Handyman sx={{ fontSize: 24 }} />, 
    title: 'The Toolbelt', 
    description: 'Text generation is limiting. Break models out of the chat interface by binding them to external APIs and local scripts. You will use the Model Context Protocol (MCP) to allow models to read your file system, execute code, and query databases.', 
    skills: ['Function Calling', 'MCP Servers', 'API Integration'],
    mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    number: '05', 
    icon: <PrecisionManufacturing sx={{ fontSize: 24 }} />, 
    title: 'The Engine Room', 
    description: 'Transition from single-prompt scripts to robust orchestration layers. We cover the underlying infrastructure that manages state, handles retries, and maintains control flow when executing complex, multi-turn AI reasoning loops.', 
    skills: ['State Management', 'Execution Loops', 'Error Recovery'],
    mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    number: '06', 
    icon: <AccountTree sx={{ fontSize: 24 }} />, 
    title: 'The Assembly Line', 
    description: 'Design deterministic agentic workflows that actually ship work. You will learn to route tasks between specialized sub-agents, parse structured JSON outputs, and chain discrete operations into reliable, end-to-end automated pipelines.', 
    skills: ['Multi-Agent Systems', 'JSON Parsing', 'Workflow Routing'],
    mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' 
  },
  { 
    number: '07', 
    icon: <AutoAwesome sx={{ fontSize: 24 }} />, 
    title: 'The Horizon', 
    description: 'Present your completed capstone project. We finalize your personal AI resource library and outline a framework for staying current in an ecosystem that deprecates its own standards every six months.', 
    skills: ['System Architecture', 'Project Delivery', 'Future-Proofing'],
    mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' 
  },
];

const pillars = [
  { 
    icon: <Dashboard sx={{ fontSize: 32 }} />, 
    title: 'Intelligent Web Interfaces', 
    description: 'Build frontends that mutate based on context. Move past static CRUD apps and architect interfaces that act as human-in-the-loop control planes for underlying agentic swarms.', 
    projects: ['Dynamic BI Dashboard', 'Conversational Onboarding', 'Human-in-the-Loop Control Center'],
    bgImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=600&q=80'
  },
  { 
    icon: <Apps sx={{ fontSize: 32 }} />, 
    title: 'AI-Integrated Apps', 
    description: 'Software where LLMs are the core computational engine, not a bolted-on chat widget. Design systems that reason, plan, and execute tasks autonomously on the user’s behalf.', 
    projects: ['OS-Level Workflow Assistant', 'Edge-AI Health Coach', 'Enterprise Knowledge Navigator'],
    bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80'
  },
  { 
    icon: <VideoLibrary sx={{ fontSize: 32 }} />, 
    title: 'Content Pipeline', 
    description: 'Construct deterministic content factories. Chain together multiple specialized agents to research, synthesize, format, and localize high-volume production outputs reliably.', 
    projects: ['Digital Twin ABM Orchestrator', 'Longform-to-Viral Clip Engine', 'Zero-Touch Localization Engine'],
    bgImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80'
  },
  { 
    icon: <Create sx={{ fontSize: 32 }} />, 
    title: 'Writing Engine', 
    description: 'A personal knowledge architecture that compounds your voice and research. Build RAG pipelines that instantly surface your past thinking to generate novel, contrarian insights.', 
    projects: ['Omnichannel Content Repurposer', 'Academic Research Synthesizer', 'Creative World-Building Co-Pilot'],
    bgImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&q=80'
  },
];

const audiences = [
  { icon: <Campaign sx={{ fontSize: 32 }} />, title: 'Marketing & Content', description: 'Brief AI like a junior creative. Ship campaigns and edit at machine speed without losing voice.' },
  { icon: <Business sx={{ fontSize: 32 }} />, title: 'Operations & Consulting', description: 'Map a workflow, find the AI seam, and stand up an automation that your team will adopt.' },
  { icon: <DesignServices sx={{ fontSize: 32 }} />, title: 'Design, Finance & HR', description: 'Professionals who never write code but must make decisions about where AI fits.' },
];

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function AIFoundationsCoursePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePayment = () => {
    const loadScript = (src: string) => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    const displayRazorpay = async () => {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
      if (!res) {
        alert('Razorpay SDK failed to load. Are you offline?');
        return;
      }

      // Fetch order from our backend
      try {
        const orderResponse = await fetch('/api/razorpay/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: 2999900 }), // ₹29,999.00
        });
        
        const orderData = await orderResponse.json();

        if (!orderData.id) {
          alert('Server failed to generate order. Please check Razorpay keys.');
          return;
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_1DP5mmOlF5G5ag', 
          amount: '2999900',
          currency: 'INR',
          name: 'Smartslate',
          description: 'AI Foundations: Concept to Application',
          order_id: orderData.id,
          handler: function () {
            window.location.href = 'https://polaris.smartslate.io/aifoundations-concept2application';
          },
          prefill: {
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            contact: '9999999999',
          },
          theme: {
            color: COLORS.indigoCTA,
          },
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
      } catch (err) {
        console.error(err);
        alert('Payment initialization failed.');
      }
    };

    displayRazorpay();
  };

  useGSAP(() => {
    // Hero Entrance
    const tl = gsap.timeline();
    tl.fromTo('.hero-label', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .fromTo('.hero-title-word', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out' }, '-=0.6')
      .fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '-=0.6');

    // Generic Fade Up for Sections
    gsap.utils.toArray('.gsap-fade-up').forEach((el: any) => {
      gsap.fromTo(el, 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        }
      );
    });

    // Pillar Cards Stagger Entry
    gsap.fromTo('.gsap-pillar-card', 
      { opacity: 0, y: 50, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8, 
        stagger: 0.15,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.pillars-grid-container',
          start: 'top 80%',
        }
      }
    );

    // Scrollytelling Pinned Sequence for Curriculum Cards
    const cards = gsap.utils.toArray('.gsap-curriculum-card') as HTMLElement[];
    if (cards.length > 0) {
      
      // Animate the header in only when fully inside the viewport
      gsap.fromTo('.curriculum-header', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.curriculum-header',
            start: 'bottom 90%',
          }
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.curriculum-pin-wrapper',
          start: 'center center', // Pin the cards perfectly in the vertical center of the viewport
          end: `+=${cards.length * 100}%`, // Scroll duration scales with number of cards
          pin: true,
          scrub: 1, 
        }
      });

      // Initialize all cards to be hidden initially
      gsap.set(cards, { opacity: 0, scale: 0.9, y: 50 });

      // First step: Fade in the first card (happens immediately upon pinning/scrubbing)
      tl.to(cards[0], { opacity: 1, scale: 1, y: 0, duration: 1 });

      cards.forEach((card: any, i) => {
        if (i > 0) {
          // Fade OUT previous card
          tl.to(cards[i - 1], { opacity: 0, scale: 0.9, y: -50, duration: 1 }, `+=${0.2}`);
          // Fade IN current card
          tl.to(card, { opacity: 1, scale: 1, y: 0, duration: 1 }, '<');
        }
      });
      
      // Buffer at the end to hold the last card briefly before unpinning
      tl.to({}, { duration: 0.5 });
    }

  }, { scope: containerRef });

  return (
    <PageWrapper ref={containerRef}>
      {/* SECTION 1: Hero */}
      <HeroSection>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.4,
              filter: 'grayscale(100%)',
              animation: 'slowPan 40s ease-in-out infinite',
              '@keyframes slowPan': {
                '0%': { transform: 'scale(1.05) translate(0, 0)' },
                '50%': { transform: 'scale(1.15) translate(-1%, -2%)' },
                '100%': { transform: 'scale(1.05) translate(0, 0)' },
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020C1B]/80 via-[#020C1B]/60 to-[#020C1B]/30" />
        </div>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10 }}>
          <Box sx={{ maxWidth: '800px' }}>
            <MonoHeadline variant="h1" className="hero-title" sx={{ display: 'flex', flexWrap: 'wrap', columnGap: '0.25em' }}>
              <Box sx={{ overflow: 'hidden' }}>
                <span className="hero-title-word inline-block">AI Foundations:</span>
              </Box>
              <Box sx={{ overflow: 'hidden', color: COLORS.teal }}>
                <span className="hero-title-word inline-block">Concept2Application</span>
              </Box>
            </MonoHeadline>
            
            <Typography
              className="hero-desc"
              variant="h5"
              sx={{
                fontSize: { xs: '1.125rem', md: '1.25rem' },
                color: COLORS.textSecondary,
                fontWeight: 400,
                mb: 4,
                lineHeight: 1.6,
                letterSpacing: '-0.01em',
                maxWidth: '700px'
              }}
            >
              Most professionals are stuck treating AI like a sophisticated search engine. This 15-hour, zero-code intensive forces you past the chat interface. You will learn how models actually reason, orchestrate multi-step workflows, and ship a functional capstone project that automates a real piece of your job.
            </Typography>

            <Box className="hero-cta" sx={{ mb: 6, display: 'flex', alignItems: 'baseline', gap: 2 }}>
              <Typography sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 800, color: COLORS.textPrimary }}>
                ₹29,999
              </Typography>
              <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.textSecondary, textDecoration: 'line-through' }}>
                ₹50,000
              </Typography>
              <Typography sx={{ ml: 2, background: 'rgba(167, 218, 219, 0.1)', color: COLORS.teal, px: 1.5, py: 0.5, borderRadius: '4px', fontWeight: 700, fontSize: '0.875rem' }}>
                Introductory Discount
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                className="hero-cta"
                onClick={handlePayment}
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  borderRadius: '12px',
                  background: COLORS.indigoCTA,
                  color: '#fff',
                  textTransform: 'none',
                  '&:hover': {
                    background: alpha(COLORS.indigoCTA, 0.9),
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Enroll Now
              </Button>
              <Button
                className="hero-cta"
                component={Link}
                href="#curriculum"
                variant="outlined"
                size="large"
                endIcon={<ViewModule />}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.125rem',
                  fontWeight: 600,
                  borderRadius: '12px',
                  borderColor: COLORS.border,
                  color: '#fff',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#fff',
                    background: 'transparent',
                  },
                }}
              >
                Explore Curriculum
              </Button>
            </Box>
          </Box>
        </Container>
      </HeroSection>

      {/* SECTION 2: Course at a glance */}
      <SectionWrapper sx={{ borderTop: `1px solid ${COLORS.border}` }}>
        <Container maxWidth="lg">
          <Box className="gsap-fade-up" sx={{ mb: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 4 }}>
            <Box sx={{ maxWidth: '600px' }}>
              <SectionLabel>
                <Verified /> Course at a Glance
              </SectionLabel>
              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>
                Built for the <br />
                <span style={{ color: COLORS.teal }}>busy professional.</span>
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '1.125rem', color: COLORS.textSecondary, maxWidth: '400px', pb: 1 }}>
              A focused sprint, not an open-ended commitment. The exact shape of the course, represented in four numbers.
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {courseStats.map((stat, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={index}>
                <ElegantCard className="gsap-fade-up" sx={{ textAlign: 'left', p: 4, height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background: 'transparent' }}>
                  {/* Background Image Layer */}
                  <Box sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${stat.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(30%)',
                    opacity: 0.45,
                    zIndex: 0
                  }} />

                  {/* Glassmorphic Overlay Layer */}
                  <Box sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(135deg, rgba(2, 12, 27, 0.65) 0%, rgba(2, 12, 27, 0.90) 100%)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    zIndex: 0,
                  }} />

                  {/* Decorative Background Element */}
                  <Box sx={{ position: 'absolute', top: -30, right: -30, opacity: 0.05, transform: 'scale(3)', pointerEvents: 'none', zIndex: 1 }}>
                    {stat.icon}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, position: 'relative', zIndex: 1 }}>
                    <Box sx={{ background: 'rgba(167, 218, 219, 0.1)', p: 1.5, borderRadius: '12px', color: COLORS.teal }}>
                      {stat.icon}
                    </Box>
                  </Box>

                  <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <Typography variant="h3" sx={{ color: '#fff', fontWeight: 800, mb: 1, fontSize: { xs: '2.5rem', md: '3rem' }, letterSpacing: '-0.04em', lineHeight: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body1" sx={{ color: COLORS.teal, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.875rem', mb: 2 }}>
                      {stat.label}
                    </Typography>
                    <Typography sx={{ color: COLORS.textSecondary, fontSize: '0.875rem', lineHeight: 1.5, mt: 'auto' }}>
                      {stat.desc}
                    </Typography>
                  </Box>
                  

                </ElegantCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionWrapper>

      {/* SECTION 3: The 8-Module Journey (Timeline) */}
      <SectionWrapper id="curriculum" className="curriculum-section-wrapper" sx={{ background: COLORS.surface }}>
        <Container maxWidth="lg">
          <Box className="curriculum-header" sx={{ textAlign: 'left', mb: 12 }}>
            <SectionLabel>
              <ViewModule /> The Curriculum
            </SectionLabel>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800, letterSpacing: '-0.03em', mb: 3 }}>
              From Awareness <br/> to <span style={{ color: COLORS.teal }}>Application</span>
            </Typography>
            <Typography sx={{ fontSize: '1.25rem', color: COLORS.textSecondary, maxWidth: '600px' }}>
              Seven metaphor-driven modules. Each one reframes a real piece of how AI works, handing it back to you as a usable capability.
            </Typography>
          </Box>

          {/* Rich Media Curriculum Layout - Pinned Scrollytelling Stack */}
          <Box className="curriculum-pin-wrapper" sx={{ position: 'relative', height: { xs: '600px', md: '500px' }, width: '100%', mb: 8 }}>
            {modules.map((module, index) => {
              const isEven = index % 2 === 0;
              return (
                <ElegantCard 
                  key={index} 
                  className="gsap-curriculum-card"
                  sx={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: isEven ? 'row' : 'row-reverse' },
                    overflow: 'hidden',
                    p: 0,
                    background: 'transparent',
                    border: `1px solid rgba(167, 218, 219, 0.1)`,
                    zIndex: index
                  }}
                >
                  {/* Media Section */}
                  <Box sx={{ width: { xs: '100%', md: '50%' }, position: 'relative', minHeight: { xs: '250px', md: 'auto' } }}>
                    {module.mediaType === 'image' ? (
                      <Box sx={{ 
                        position: 'absolute', inset: 0, 
                        backgroundImage: `url(${module.mediaUrl})`, 
                        backgroundSize: 'cover', backgroundPosition: 'center',
                        filter: 'grayscale(30%)', opacity: 0.7
                      }} />
                    ) : (
                      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                        <video 
                          autoPlay loop muted playsInline 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(30%)', opacity: 0.7 }}
                          src={module.mediaUrl}
                        />
                      </Box>
                    )}
                    {/* Media Overlay Gradient (Blends media into text section) */}
                    <Box sx={{
                      position: 'absolute', inset: 0,
                      background: isEven 
                        ? 'linear-gradient(to right, rgba(2, 12, 27, 0) 0%, rgba(2, 12, 27, 1) 100%)' 
                        : 'linear-gradient(to left, rgba(2, 12, 27, 0) 0%, rgba(2, 12, 27, 1) 100%)',
                      display: { xs: 'none', md: 'block' }
                    }} />
                    <Box sx={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to bottom, rgba(2, 12, 27, 0) 0%, rgba(2, 12, 27, 1) 100%)',
                      display: { xs: 'block', md: 'none' }
                    }} />
                  </Box>

                  {/* Content Section */}
                  <Box sx={{ 
                    width: { xs: '100%', md: '50%' }, 
                    p: { xs: 4, md: 8 }, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    background: 'rgba(2, 12, 27, 0.95)',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                      <Box sx={{ background: 'rgba(167, 218, 219, 0.1)', p: 1.5, borderRadius: '12px', color: COLORS.teal }}>
                        {module.icon}
                      </Box>
                      <Typography sx={{ color: COLORS.teal, fontWeight: 700, fontSize: '1.25rem', letterSpacing: '0.1em' }}>MODULE {module.number}</Typography>
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '2rem', md: '2.5rem' }, letterSpacing: '-0.03em' }}>
                      {module.title}
                    </Typography>
                    <Typography sx={{ color: COLORS.textSecondary, fontSize: '1.125rem', lineHeight: 1.6, mb: 4 }}>
                      {module.description}
                    </Typography>
                    
                    {/* Skills Pills */}
                    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                      {module.skills.map((skill, idx) => (
                        <Box key={idx} sx={{ 
                          border: `1px solid rgba(167, 218, 219, 0.2)`, 
                          background: 'rgba(167, 218, 219, 0.05)',
                          color: COLORS.teal,
                          px: 2, 
                          py: 0.75, 
                          borderRadius: '8px',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          letterSpacing: '0.05em',
                          backdropFilter: 'blur(4px)'
                        }}>
                          {skill}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </ElegantCard>
              );
            })}
          </Box>
        </Container>
      </SectionWrapper>

      {/* SECTION 4: Running Project (Horizontal Stack) */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <Box className="gsap-fade-up" sx={{ mb: 12 }}>
            <SectionLabel>
              <RocketLaunch /> Running Project
            </SectionLabel>
            <Grid container spacing={4} alignItems="flex-end">
              <Grid size={{ xs: 12, md: 7 }}>
                <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3.5rem' }, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>
                  Pick a project. <br/>
                  <span style={{ color: COLORS.teal }}>Carry it through.</span>
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <Typography sx={{ fontSize: '1.125rem', color: COLORS.textSecondary }}>
                  Four pillars. Twelve project templates. You choose one in Module 0 and systematically evolve it into a robust capstone by Module 8.
                </Typography>
              </Grid>
            </Grid>
                <Grid container spacing={4} className="pillars-grid-container" sx={{ mt: 4 }}>
            {pillars.map((pillar, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <ElegantCard 
                  className="gsap-pillar-card"
                  sx={{ 
                    height: '100%', 
                    position: 'relative', 
                    overflow: 'hidden',
                    p: { xs: 4, md: 5 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '420px',
                    background: 'transparent',
                    border: '1px solid rgba(167, 218, 219, 0.15)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      borderColor: 'rgba(167, 218, 219, 0.4)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 40px rgba(167, 218, 219, 0.15)',
                      '& .pillar-bg': {
                        transform: 'scale(1.05)',
                        opacity: 0.4,
                        filter: 'grayscale(30%)'
                      },
                      '& .project-pill': {
                        color: '#fff',
                      },
                      '& .project-dot': {
                        boxShadow: `0 0 10px ${COLORS.teal}`,
                      }
                    }
                  }}
                >
                  {/* Background Image Layer */}
                  <Box className="pillar-bg" sx={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${pillar.bgImage})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    opacity: 0.1, filter: 'grayscale(100%)',
                    transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 0
                  }} />
                  
                  {/* Gradient Overlay to ensure text legibility */}
                  <Box sx={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(2, 12, 27, 0.4) 0%, rgba(2, 12, 27, 0.95) 100%)',
                    zIndex: 1
                  }} />

                  {/* Content (Top Half) */}
                  <Box sx={{ position: 'relative', zIndex: 2, mb: 4 }}>
                    <Box sx={{ 
                      display: 'inline-flex', 
                      p: 2, 
                      borderRadius: '16px', 
                      background: 'rgba(167, 218, 219, 0.1)', 
                      color: COLORS.teal,
                      mb: 3,
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(167, 218, 219, 0.2)'
                    }}>
                      {pillar.icon}
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, fontSize: '1.75rem', mb: 2, letterSpacing: '-0.02em' }}>
                      {pillar.title}
                    </Typography>
                    <Typography sx={{ color: COLORS.textSecondary, fontSize: '1.05rem', lineHeight: 1.6 }}>
                      {pillar.description}
                    </Typography>
                  </Box>

                  {/* Projects List (Bottom Half) */}
                  <Box sx={{ position: 'relative', zIndex: 2 }}>
                    <Typography sx={{ 
                      fontSize: '0.8rem', 
                      fontWeight: 800, 
                      color: COLORS.teal, 
                      letterSpacing: '0.15em', 
                      mb: 2.5, 
                      textTransform: 'uppercase',
                      borderBottom: '1px solid rgba(167, 218, 219, 0.2)',
                      paddingBottom: '8px',
                      display: 'inline-block'
                    }}>
                      Capstone Templates
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      {pillar.projects.map((proj, idx) => (
                        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box className="project-dot" sx={{ width: '6px', height: '6px', borderRadius: '50%', background: COLORS.teal, transition: 'all 0.3s ease' }} />
                          <Typography className="project-pill" sx={{ 
                            fontSize: '0.95rem', 
                            color: COLORS.textSecondary,
                            fontWeight: 500,
                            transition: 'color 0.3s ease'
                          }}>
                            {proj}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </ElegantCard>
              </Grid>
            ))}
          </Grid>      </Box>
        </Container>
      </SectionWrapper>

      {/* SECTION 5: Methodology */}
      <SectionWrapper sx={{ position: 'relative', overflow: 'hidden', borderTop: `1px solid ${COLORS.border}` }}>
        {/* Background Video */}
        <Box sx={{
          position: 'absolute', inset: 0, zIndex: 0,
          '&::after': {
            content: '""',
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(2,12,27,0.92) 0%, rgba(2,12,27,0.85) 100%)',
          }
        }}>
          <video 
            autoPlay loop muted playsInline 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, filter: 'grayscale(100%)' }}
            src="https://assets.mixkit.co/videos/preview/mixkit-architect-working-with-blueprint-and-pencil-2856-large.mp4" 
          />
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box className="gsap-fade-up" sx={{ textAlign: 'left', mb: 8 }}>
            <SectionLabel>
              <EmojiObjects /> Methodology
            </SectionLabel>
            <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3.5rem' }, fontWeight: 800, letterSpacing: '-0.03em', mb: 3 }}>
              Architected for <span style={{ color: COLORS.teal }}>Cognitive Retention.</span>
            </Typography>
            <Typography sx={{ fontSize: '1.25rem', color: COLORS.textSecondary, maxWidth: '800px' }}>
              Adult learning requires immediate application. We discarded traditional lecture formats in favor of a constructivist learning model. You build mental models through metaphor, and ground them in immediate practice.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              { icon: <AccountTree sx={{ fontSize: 32 }} />, title: 'Scaffolded Mental Models', desc: 'We bypass deep technical jargon in favor of strong structural metaphors. Anchoring complex AI architectures to concepts you already intuitively understand drastically reduces cognitive load.' },
              { icon: <Timeline sx={{ fontSize: 32 }} />, title: 'Situated Application Spine', desc: 'Passive learning evaporates. Every theoretical concept is immediately tested against your continuous "running capstone" project, constructing knowledge directly within your own business context.' },
              { icon: <TouchApp sx={{ fontSize: 32 }} />, title: 'Frictionless Execution', desc: 'We remove the barrier of environment setup and syntax errors. Concepts land through interactive simulations and guided exercises, so you master the core mechanics of AI without writing a single line of code.' }
            ].map((method, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <ElegantCard className="gsap-fade-up" sx={{ 
                  height: '100%', 
                  background: 'rgba(2, 12, 27, 0.6)', 
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(167, 218, 219, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    borderColor: 'rgba(167, 218, 219, 0.3)',
                    background: 'rgba(2, 12, 27, 0.8)', 
                  }
                }}>
                  <Box sx={{ display: 'inline-flex', p: 1.5, borderRadius: '12px', background: 'rgba(167, 218, 219, 0.1)', color: COLORS.teal, mb: 4 }}>
                    {method.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, letterSpacing: '-0.01em' }}>{method.title}</Typography>
                  <Typography sx={{ color: COLORS.textSecondary, fontSize: '1.05rem', lineHeight: 1.6 }}>{method.desc}</Typography>
                </ElegantCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionWrapper>

      {/* SECTION 6: Who It's For & Outcomes */}
      <SectionWrapper sx={{ background: COLORS.surface }}>
        <Container maxWidth="lg">
          <Grid container spacing={10}>
            {/* Audience */}
            <Grid size={{ xs: 12, md: 6 }} className="gsap-fade-up">
              <SectionLabel>
                <Business /> Audience
              </SectionLabel>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 6, letterSpacing: '-0.02em', fontSize: '2rem' }}>
                For the people who <span style={{ color: COLORS.teal }}>decide</span> about AI.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {audiences.map((aud, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 3 }}>
                    <Box sx={{ color: COLORS.teal, mt: 0.5 }}>{aud.icon}</Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>{aud.title}</Typography>
                      <Typography sx={{ color: COLORS.textSecondary, lineHeight: 1.6 }}>{aud.description}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
            
            {/* Outcomes */}
            <Grid size={{ xs: 12, md: 6 }} className="gsap-fade-up">
              <Box sx={{ background: COLORS.background, border: `1px solid ${COLORS.border}`, borderRadius: '24px', p: { xs: 4, md: 6 }, height: '100%' }}>
                <SectionLabel>
                  <Verified /> Outcomes
                </SectionLabel>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 6, letterSpacing: '-0.02em', fontSize: '2rem' }}>
                  Concrete Capabilities
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {[
                    'Confidently prompt, evaluate, and iterate on AI output',
                    'Design multi-step AI workflows with the right guardrails',
                    'A completed capstone project tied to your real work',
                    'A personal strategy for staying current as AI evolves'
                  ].map((outcome, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                      <CheckCircle sx={{ color: COLORS.teal, mt: 0.25 }} />
                      <Typography sx={{ fontWeight: 600, fontSize: '1.125rem', color: COLORS.textPrimary }}>{outcome}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </SectionWrapper>

      {/* SECTION 7: Final CTA */}
      <SectionWrapper sx={{ borderTop: `1px solid ${COLORS.border}` }}>
        <Container maxWidth="md" className="gsap-fade-up" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 800, letterSpacing: '-0.04em', mb: 4 }}>
            Ready for <span style={{ color: COLORS.teal }}>Application?</span>
          </Typography>
          <Typography sx={{ fontSize: '1.25rem', color: COLORS.textSecondary, mb: 4, maxWidth: '600px', mx: 'auto' }}>
            Spend 15 hours. Walk away with a working AI project, a vocabulary you can defend, and a strategy for staying current.
          </Typography>

          <Box className="gsap-fade-up" sx={{ mb: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <Typography sx={{ fontSize: '2.5rem', fontWeight: 800, color: COLORS.textPrimary }}>
              ₹29,999
            </Typography>
            <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.textSecondary, textDecoration: 'line-through' }}>
              ₹50,000
            </Typography>
          </Box>

          <Button
            onClick={handlePayment}
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            sx={{
              px: 6,
              py: 2.5,
              fontSize: '1.25rem',
              fontWeight: 700,
              borderRadius: '12px',
              background: COLORS.indigoCTA,
              color: '#fff',
              textTransform: 'none',
              '&:hover': {
                background: alpha(COLORS.indigoCTA, 0.9),
                transform: 'translateY(-2px)',
              },
            }}
          >
            Enroll in AI Foundations
          </Button>
        </Container>
      </SectionWrapper>
    </PageWrapper>
  );
}
