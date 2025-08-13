'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Stepper, 
  Step, 
  StepLabel, 
  StepContent, 
  useTheme, 
  useMediaQuery, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Collapse,
  Fab,
  Modal,
  Paper
} from '@mui/material';
// Removed Grid import; using CSS grid via Box for layout to avoid type issues
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import StandardHero from '@/components/ui/StandardHero';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CloseIcon from '@mui/icons-material/Close';
import ListIcon from '@mui/icons-material/List';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


// Styled components following the project's design system
const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(10)} 0`,
  backgroundColor: 'transparent',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'radial-gradient(ellipse at bottom right, rgba(79, 70, 229, 0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
}));

const SectionCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '2px solid rgba(255, 255, 255, 0.08)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(4),
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: '#ffffff',
  padding: `${theme.spacing(1.5)} ${theme.spacing(3)}`,
  fontSize: '1rem',
  fontWeight: 600,
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: -100,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s ease',
  },
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(79, 70, 229, 0.3)',
    '&::before': {
      left: '100%',
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(1.5)} ${theme.spacing(2.5)}`,
    fontSize: '0.9rem',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: `${theme.spacing(1.5)} ${theme.spacing(3)}`,
  fontSize: '1rem',
  fontWeight: 600,
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  border: '2px solid rgba(167, 218, 219, 0.3)',
  backgroundColor: 'transparent',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: 'rgba(167, 218, 219, 0.1)',
    transform: 'translateY(-2px)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(1.5)} ${theme.spacing(2.5)}`,
    fontSize: '0.9rem',
  },
}));

const TimelineStep = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(167, 218, 219, 0.1)',
  },
}));

const ROICard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 10px 30px rgba(167, 218, 219, 0.2)',
  },
}));

const StickyTOC = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: theme.spacing(3),
  transform: 'translateY(-50%)',
  zIndex: 100,
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '2px solid rgba(167, 218, 219, 0.3)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(3),
  maxWidth: 200,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  '&:hover': {
    boxShadow: '0 20px 40px rgba(167, 218, 219, 0.15)',
    borderColor: 'rgba(167, 218, 219, 0.5)',
  },
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

const ToggleButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== '$isOpen'
})<{ $isOpen?: boolean }>(({ theme, $isOpen }) => ({
  position: 'fixed',
  top: $isOpen ? 'calc(50% - 300px)' : '50%',
  left: theme.spacing(3),
  transform: 'translateY(-50%)',
  zIndex: 101,
  minWidth: 'auto',
  padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
  borderRadius: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  color: theme.palette.primary.main,
  fontSize: '0.875rem',
  fontWeight: 500,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  '&:hover': {
    background: 'rgba(167, 218, 219, 0.1)',
    transform: 'translateY(-50%) translateX(2px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
  },
  '& .MuiButton-startIcon': {
    marginRight: theme.spacing(1),
  },
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));



const MobileFAB = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  zIndex: 1000,
  background: 'rgba(79, 70, 229, 0.9)',
  backdropFilter: 'blur(12px)',
  border: '2px solid rgba(79, 70, 229, 0.3)',
  color: '#ffffff',
  boxShadow: '0 8px 24px rgba(79, 70, 229, 0.2)',
  '&:hover': {
    background: 'rgba(79, 70, 229, 1)',
    transform: 'scale(1.1)',
    boxShadow: '0 12px 32px rgba(79, 70, 229, 0.3)',
  },
  transition: 'all 0.3s ease',
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}));

const MobileTOCModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

const MobileTOCPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '2px solid rgba(167, 218, 219, 0.4)',
  borderRadius: theme.spacing(4),
  padding: theme.spacing(4),
  width: '85vw',
  maxHeight: '85vh',
  overflow: 'auto',
  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(167, 218, 219, 0.1)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'radial-gradient(ellipse at top right, rgba(167, 218, 219, 0.1) 0%, transparent 70%)',
    pointerEvents: 'none',
    borderRadius: 'inherit',
  },
}));

// Analytics tracking function
async function trackEvent(name: string, label: string, location: string) {
  try {
    await fetch('/api/track/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'interaction',
        data: {
          event: 'interaction',
          name,
          label,
          location,
        },
      }),
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

export default function SmartslateTestimonyPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [desktopTocOpen, setDesktopTocOpen] = useState(false);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [subtitleTransition, setSubtitleTransition] = useState(false);
  const [showSkillStackExploration, setShowSkillStackExploration] = useState(false);

  // Inline highlighter for brand-accent emphasis within paragraphs
  const highlightPhrases = (text: string, phrases: string[]) => {
    if (!phrases || phrases.length === 0) return text;
    const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const sorted = [...phrases].sort((a, b) => b.length - a.length);
    const pattern = new RegExp(`(${sorted.map(escapeRegex).join('|')})`, 'gi');
    const parts = text.split(pattern);
    return parts.map((part, idx) => {
      const isMatch = sorted.some(p => part.toLowerCase() === p.toLowerCase());
      return isMatch ? (
        <Box key={idx} component="span" sx={{ color: '#06B6D4', fontWeight: 700 }}>
          {part}
        </Box>
      ) : (
        <Box key={idx} component="span">{part}</Box>
      );
    });
  };

  // Chapter data (birth-of-organisation narrative)
  const chapters = [
    {
      title: 'Chapter 1: The Spark',
      content: [
        {
          text: 'In a buzzing operations floor—rows of desks, overlapping conversations, and constant ring tones—a pattern began to emerge. Teams learned fastest when clarity was engineered, not improvised.',
          italic: false,
        },
        {
          text: 'From that signal, an idea took shape: a system for learning that could be designed, repeated, and scaled. This was the first spark that would become Smartslate.',
          italic: false,
        },
      ],
      highlights: [
        'clarity was engineered, not improvised',
        'designed, repeated, and scaled',
        'first spark',
        'Smartslate',
      ],
    },
    {
      title: 'Chapter 2: The Blueprint',
      content: [
        {
          text: 'The spark matured into a blueprint. Outcomes were defined, curricula were mapped, and workflows were drawn to produce consistent \"aha!\" moments across cohorts and contexts.',
          italic: false,
        },
        {
          text: 'Instructional design evolved into programme architecture—an operating model designed to work across organisations of every size.',
          italic: false,
        },
      ],
      highlights: [
        'blueprint',
        'Outcomes were defined',
        'programme architecture',
        'operating model',
      ],
    },
    {
      title: 'Chapter 3: The Gap',
      content: [
        {
          text: 'A gap in the learning ecosystem became obvious. Tools existed, but the operating system for learning did not. What was needed was a platform that could turn capability into outcomes—reliably and repeatedly.',
          italic: false,
        },
        {
          text: 'The path forward was clear: design a platform built for repeatability, measurement, and real deployment inside institutions and enterprises.',
          italic: false,
        },
      ],
      highlights: [
        'gap in the learning ecosystem',
        'operating system for learning',
        'repeatability, measurement, and real deployment',
      ],
    },
    {
      title: 'Chapter 4: The Build',
      content: [
        {
          text: 'Language, interface, and full‑stack systems converged into a single foundation. An LMS, authoring tools, and orchestration services were assembled into one coherent ecosystem.',
          italic: false,
        },
        {
          text: 'Piece by piece, a platform emerged—not just software, but a structured way to create, deliver, and sustain learning at scale.',
          italic: false,
        },
      ],
      highlights: [
        'LMS, authoring tools, and orchestration services',
        'coherent ecosystem',
        'structured way to create, deliver, and sustain learning at scale',
      ],
    },
    {
      title: 'Chapter 5: The AI Partnership',
      content: [
        {
          text: 'AI joined as a co‑engineer. From copy and visual identity to flows and infrastructure, each artefact moved from concept to code through a governed, auditable process.',
          italic: false,
        },
        {
          text: 'Acceleration met rigour: AI accelerated production; design and engineering standards ensured reliability.',
          italic: false,
        },
      ],
      highlights: [
        'AI joined as a co‑engineer',
        'governed, auditable process',
        'Acceleration met rigour',
      ],
    },
    {
      title: 'Chapter 6: The Launch',
      content: [
        {
          text: 'The system gained a name: Smartslate.',
          italic: false,
        },
        {
          text: 'What began as a spark became an organisation—a living platform purpose‑built to turn capability into outcomes.',
          italic: false,
        },
        {
          text: 'Read on to see how capability became a system, and how Smartslate came to life.',
          italic: true,
          isLink: true,
        },
      ],
      highlights: [
        'Smartslate',
        'purpose‑built to turn capability into outcomes',
        'came to life',
      ],
    },
  ];

  // Skill Stack Exploration content
  const skillStackContent = [
    {
      text: 'The traditional approach to technology implementation focuses on tools and infrastructure—what we call the "Tech Stack." But Smartslate represents a fundamental shift: the "Skill Stack."',
      italic: false,
    },
    {
      text: 'While Tech Stack emphasizes what you use, Skill Stack emphasizes what you can do. It\'s the difference between having powerful software and having the capability to wield it effectively.',
      italic: false,
    },
    {
      text: 'In the Skill Stack paradigm, every tool becomes an extension of human capability. Teams don\'t just learn to use AI—they learn to think with AI, to collaborate with AI, and to create new possibilities that neither humans nor AI could achieve alone.',
      italic: false,
    },
    {
      text: 'This is why Smartslate\'s platform exists: to transform capability gaps into capability bridges, turning every learner into a force multiplier for their organisation.',
      italic: false,
    },
  ];

  // Navigation handlers
  const handleNextChapter = () => {
    if (currentChapter < chapters.length) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  // Subtitle transition handler
  const handleSubtitleTransition = () => {
    setSubtitleTransition(true);
    setShowSkillStackExploration(true);
  };



  const tocSections = [
    { id: 'why-leaders', title: 'From a Bustling Bay to Founder\'s Desk: The Smartslate Story' },
    { id: 'skill-stack-exploration', title: 'Skill Stack Exploration', conditional: true },
    { id: 'skills-impact', title: 'Skills With Direct Organisational Impact' },
    { id: 'proven-practice', title: 'Proven in Practice' },
    { id: 'roi', title: 'ROI for Your Organisation' },
    { id: 'cohort-delivery', title: 'Cohort Delivery That Scales' },
    { id: 'timeline', title: 'Typical rollout timeline' },
    { id: 'bottom-line', title: 'The Bottom Line' },
  ];

  const [activeSection, setActiveSection] = useState('why-leaders');

  // Track pageview on mount
  useEffect(() => {
    trackEvent('pageview', 'smartslate_testimony', 'page');
  }, []);

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections with exact ID matching
    const sectionIds = ['why-leaders', 'skill-stack-exploration', 'skills-impact', 'proven-practice', 'roi', 'cohort-delivery', 'timeline', 'bottom-line'];
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  const handleCTAClick = (label: 'talk_to_sales' | 'view_syllabus') => {
    trackEvent('cta_click', label, 'smartslate_testimony_hero');
  };

  const timelineSteps = [
    {
      weeks: 'Weeks 1–2',
      title: 'AI literacy, prompt engineering fundamentals, tool selection',
    },
    {
      weeks: 'Weeks 3–6',
      title: 'Applied projects solving organisation-specific problems',
    },
    {
      weeks: 'Weeks 7–8',
      title: 'Deployment of working solutions, ready to integrate into your operations',
    },
  ];

  const enterpriseBenefits = [
    'Accelerated delivery — complete projects and initiatives faster.',
    'Efficiency gains — integrate AI to streamline internal workflows.',
    'Cost optimisation — reduce spend on external development or repetitive tasks.',
  ];

  const educationBenefits = [
    'Graduate employability — equip students with skills that match industry demand.',
    'Industry partnerships — position your institution as a source of job-ready talent.',
    'Reputation growth — be recognised for delivering modern, AI-ready education.',
  ];

  const skillsList = [
    'Master AI concepts and workflows tailored to real business and academic contexts.',
    'Convert vague requirements into precisely engineered prompts that produce accurate, relevant outputs.',
    'Identify and deploy the right AI resources to meet organisational goals.',
    'Integrate AI solutions seamlessly into existing operations and processes, ensuring improvements stay embedded within your systems.',
  ];

  const aiTools = [
    'Code Development: SWE from Windsurf, Cursor AI, Claude Opus 4, Gemini 2.5 Pro, ChatGPT-5, Devin AI, Devika AI.',
    'Generative Content: ElevenLabs, Sora, Veo 3, Imagen, RunwayML, Adobe Firefly.',
  ];

  return (
    <>
      {/* Hero Section */}
      <StandardHero
        title="AI Foundations: Concept to Application — The Course That Built Smartslate"
        subtitle="The same structured approach that built Smartslate's AI-powered learning platform can strengthen your team's capabilities"
        accentWords={['AI Foundations', 'Smartslate', 'Transform']}
      >
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3 }}>
          <Link href="/collaborate" style={{ textDecoration: 'none' }}>
            <CTAButton 
              variant="contained" 
              size="large"
              onClick={() => handleCTAClick('talk_to_sales')}
            >
              Talk to Sales
            </CTAButton>
          </Link>
          <Link href="/courses" style={{ textDecoration: 'none' }}>
            <SecondaryButton 
              variant="outlined" 
              size="large"
              onClick={() => handleCTAClick('view_syllabus')}
            >
              View AI Foundations: Concept to Application Syllabus
            </SecondaryButton>
          </Link>
        </Box>
      </StandardHero>

      {/* Mobile Floating Action Button */}
      <MobileFAB
        color="primary"
        aria-label="Table of Contents"
        onClick={() => setMobileTocOpen(true)}
      >
        <ListIcon />
      </MobileFAB>

      {/* Mobile TOC Modal */}
      <MobileTOCModal
        open={mobileTocOpen}
        onClose={() => setMobileTocOpen(false)}
        aria-labelledby="mobile-toc-modal"
      >
        <MobileTOCPaper>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3,
            pb: 2,
            borderBottom: '2px solid rgba(167, 218, 219, 0.2)'
          }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 700, 
              color: 'primary.main',
              fontSize: '1.1rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              textShadow: '0 1px 2px rgba(167, 218, 219, 0.1)'
            }}>
              Table of Contents
            </Typography>
            <Button
              onClick={() => setMobileTocOpen(false)}
              sx={{ 
                minWidth: 'auto', 
                p: 1.5,
                borderRadius: '50%',
                color: 'text.secondary',
                backgroundColor: 'rgba(167, 218, 219, 0.1)',
                border: '1px solid rgba(167, 218, 219, 0.2)',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  color: 'primary.main',
                  backgroundColor: 'rgba(167, 218, 219, 0.2)',
                  transform: 'scale(1.1)'
                }
              }}
            >
              <CloseIcon fontSize="small" />
            </Button>
          </Box>
          <List>
            {tocSections.map((section) => {
              // Skip conditional sections that aren't active yet
              if (section.conditional && !showSkillStackExploration) {
                return null;
              }
              
              return (
                <ListItem key={section.id} disablePadding sx={{ mb: 1.5 }}>
                  <ListItemButton
                    component="a"
                    href={`#${section.id}`}
                    onClick={() => setMobileTocOpen(false)}
                    sx={{ 
                      borderRadius: 2,
                      py: 2,
                      px: 3,
                      color: activeSection === section.id ? 'primary.main' : '#ffffff',
                      backgroundColor: activeSection === section.id ? 'rgba(167, 218, 219, 0.15)' : 'transparent',
                      borderLeft: activeSection === section.id ? '4px solid' : '4px solid transparent',
                      borderColor: activeSection === section.id ? 'primary.main' : 'transparent',
                      transition: 'all 0.3s ease',
                      boxShadow: activeSection === section.id ? '0 4px 12px rgba(167, 218, 219, 0.2)' : 'none',
                      '&:hover': { 
                        backgroundColor: 'rgba(167, 218, 219, 0.1)',
                        transform: 'translateX(6px)',
                        boxShadow: '0 6px 16px rgba(167, 218, 219, 0.15)'
                      }
                    }}
                  >
                    <ListItemText 
                      primary={section.title} 
                      primaryTypographyProps={{ 
                        sx: { 
                          fontSize: '1rem', 
                          color: activeSection === section.id ? 'primary.main' : '#ffffff',
                          fontWeight: activeSection === section.id ? 700 : 600,
                          lineHeight: 1.4,
                          letterSpacing: activeSection === section.id ? '0.2px' : '0px',
                          textShadow: activeSection === section.id ? '0 1px 2px rgba(167, 218, 219, 0.1)' : '0 2px 4px rgba(0, 0, 0, 0.8)'
                      } 
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        </MobileTOCPaper>
      </MobileTOCModal>

      {/* Desktop TOC Toggle Button */}
      <ToggleButton
        $isOpen={desktopTocOpen}
        onClick={() => setDesktopTocOpen(!desktopTocOpen)}
        aria-label={desktopTocOpen ? 'Hide table of contents' : 'Show table of contents'}
        startIcon={desktopTocOpen ? <CloseIcon /> : <MenuBookIcon />}
        variant="outlined"
      >
        {desktopTocOpen ? 'Hide Contents' : 'Contents'}
      </ToggleButton>

      {/* Desktop Sticky TOC */}
      <StickyTOC
        sx={{
          transform: desktopTocOpen ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(-100%)',
          opacity: desktopTocOpen ? 1 : 0,
          visibility: desktopTocOpen ? 'visible' : 'hidden',
          boxShadow: desktopTocOpen ? '0 10px 30px rgba(0, 0, 0, 0.3)' : 'none',
        }}
      >
        <Typography variant="h6" sx={{ 
          fontWeight: 700, 
          color: 'primary.main', 
          mb: 2,
          fontSize: '0.9rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Table of Contents
        </Typography>
        <List dense>
          {tocSections.map((section) => {
            // Skip conditional sections that aren't active yet
            if (section.conditional && !showSkillStackExploration) {
              return null;
            }
            
            return (
              <ListItem key={section.id} disablePadding>
                <ListItemButton
                  component="a"
                  href={`#${section.id}`}
                  onClick={() => setDesktopTocOpen(false)}
                  sx={{ 
                    py: 1.5,
                    px: 2,
                    borderRadius: 1,
                    color: activeSection === section.id ? 'primary.main' : '#ffffff',
                    backgroundColor: activeSection === section.id ? 'rgba(167, 218, 219, 0.1)' : 'transparent',
                    borderLeft: activeSection === section.id ? '3px solid' : '3px solid transparent',
                    borderColor: activeSection === section.id ? 'primary.main' : 'transparent',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      backgroundColor: 'rgba(167, 218, 219, 0.1)',
                      transform: 'translateX(4px)'
                    }
                  }}
                >
                  <ListItemText 
                    primary={section.title} 
                    primaryTypographyProps={{ 
                      sx: { 
                        fontSize: '0.75rem', 
                        color: activeSection === section.id ? 'primary.main' : '#ffffff',
                        fontWeight: activeSection === section.id ? 600 : 500,
                        lineHeight: 1.3,
                        textShadow: activeSection === section.id ? '0 1px 2px rgba(167, 218, 219, 0.1)' : '0 1px 3px rgba(0, 0, 0, 0.8)'
                      } 
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </StickyTOC>

      <Container maxWidth="lg">
                {/* From a Bustling Bay to Founder's Desk: The Smartslate Story */}
        <SectionWrapper id="why-leaders">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Story Header */}
            <Box sx={{ textAlign: 'left', mb: 8, position: 'relative', minHeight: '80px' }}>
              <Typography variant="h2" component="h2" gutterBottom sx={{
                background: 'linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2.5rem', md: '3rem', lg: '3.5rem' },
                fontWeight: 700,
                mb: 3,
                lineHeight: 1.2
              }}>
                From a Bustling Bay to Founder's Desk
              </Typography>
              
              {/* Original Subtitle with Fade Out */}
              <motion.div
                initial={{ opacity: 1, x: 0 }}
                animate={{ 
                  opacity: subtitleTransition ? 0 : 1, 
                  x: subtitleTransition ? -20 : 0 
                }}
                transition={{ 
                  duration: 0.2, 
                  ease: "easeInOut"
                }}
                style={{ 
                  position: 'absolute',
                  width: '100%'
                }}
              >
                <Typography variant="h3" sx={{ 
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 600,
                  color: 'primary.main',
                  mb: 2,
                  fontStyle: 'italic'
                }}>
                  The Smartslate Story
                </Typography>
              </motion.div>

              {/* New Subtitle with Fade In from Right */}
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: subtitleTransition ? 1 : 0, 
                  x: subtitleTransition ? 0 : 100 
                }}
                transition={{ 
                  duration: 0.5, 
                  ease: "easeOut",
                  delay: 5.0,
                  opacity: { duration: 0.8 },
                  x: { duration: 1.0 }
                }}
                style={{ 
                  position: 'absolute',
                  width: '100%'
                }}
              >
                <Typography variant="h3" sx={{ 
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 600,
                  color: 'primary.main',
                  mb: 2,
                  fontStyle: 'italic'
                }}>
                  The dawn of Skill Stack - Tech Stack vs. Skill Stack
                </Typography>
              </motion.div>
            </Box>

            {/* Interactive Story Timeline */}
            <Box sx={{ width: '100%', position: 'relative' }}>
              {/* Chapter Content with Fade Animation */}
              <motion.div
                key={currentChapter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', md: 'row' }, 
                  gap: 4,
                  alignItems: { xs: 'center', md: 'flex-start' }
                }}>
                  {/* Text Content */}
                  <Box sx={{ flex: 1 }}>
                    <SectionCard sx={{ minHeight: '400px' }}>
                      {!showSkillStackExploration ? (
                        <>
                          <Typography variant="h4" sx={{ 
                            fontSize: { xs: '1.25rem', md: '1.5rem' },
                            fontWeight: 700,
                            color: 'primary.main',
                            mb: 3
                          }}>
                            {chapters[currentChapter - 1].title}
                          </Typography>
                          {chapters[currentChapter - 1].content.map((paragraph, index) => (
                            paragraph.isLink ? (
                              <Box 
                                key={index}
                                onClick={handleSubtitleTransition}
                                sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  gap: 1,
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    transform: 'translateX(4px)',
                                    '& .arrow-icon': {
                                      transform: 'translateX(4px)',
                                    }
                                  }
                                }}
                              >
                                <Typography 
                                  variant="body1" 
                                  sx={{ 
                                    fontSize: { xs: '1rem', md: '1.125rem' },
                                    lineHeight: 1.8,
                                    color: '#06B6D4',
                                    mb: 0,
                                    fontWeight: 600,
                                    fontStyle: 'italic',
                                    textDecoration: 'none'
                                  }}
                                >
                                  {paragraph.text}
                                </Typography>
                                <ArrowForwardIcon 
                                  className="arrow-icon"
                                  sx={{ 
                                    color: '#06B6D4', 
                                    fontSize: '1.2rem',
                                    transition: 'transform 0.3s ease'
                                  }} 
                                />
                              </Box>
                            ) : (
                              <Typography 
                                key={index}
                                variant="body1" 
                                sx={{ 
                                  fontSize: { xs: '1rem', md: '1.125rem' },
                                  lineHeight: 1.8,
                                  color: 'text.primary',
                                  mb: index < chapters[currentChapter - 1].content.length - 1 ? 3 : 0,
                                  fontWeight: 400,
                                  fontStyle: paragraph.italic ? 'italic' : 'normal'
                                }}
                              >
                                {highlightPhrases(
                                  paragraph.text,
                                  (chapters[currentChapter - 1] as any).highlights || []
                                )}
                              </Typography>
                            )
                          ))}
                        </>
                      ) : (
                        <Box id="skill-stack-exploration">
                          <Typography variant="h4" sx={{ 
                            fontSize: { xs: '1.25rem', md: '1.5rem' },
                            fontWeight: 700,
                            color: 'primary.main',
                            mb: 3
                          }}>
                            Skill Stack Exploration
                          </Typography>
                          {skillStackContent.map((paragraph, index) => (
                            <Typography 
                              key={index}
                              variant="body1" 
                              sx={{ 
                                fontSize: { xs: '1rem', md: '1.125rem' },
                                lineHeight: 1.8,
                                color: 'text.primary',
                                mb: index < skillStackContent.length - 1 ? 3 : 0,
                                fontWeight: 400,
                                fontStyle: paragraph.italic ? 'italic' : 'normal'
                              }}
                            >
                              {highlightPhrases(
                                paragraph.text,
                                ['Tech Stack', 'Skill Stack', 'Smartslate', 'capability', 'AI']
                              )}
                            </Typography>
                          ))}
                        </Box>
                      )}
                    </SectionCard>
                  </Box>
                </Box>
              </motion.div>

              {/* Fixed Navigation Controls - Below Chapters */}
              <Box sx={{ 
                position: 'sticky',
                bottom: 20,
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                mt: 4,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                border: '1px solid rgba(167, 218, 219, 0.2)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                overflow: 'hidden'
              }}>
                {/* Horizontal Progress Bar */}
                <Box sx={{
                  width: '100%',
                  height: '2px',
                  background: 'rgba(167, 218, 219, 0.1)',
                  position: 'relative'
                }}>
                  <Box sx={{
                    width: `${(currentChapter / chapters.length) * 100}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #06B6D4 0%, #4F46E5 100%)',
                    transition: 'width 0.6s ease-in-out',
                    borderRadius: '0 1px 1px 0'
                  }} />
                </Box>

                {/* Navigation Buttons */}
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  px: 1.5,
                  py: 1.5
                }}>
                  {/* Previous Button */}
                  <Box
                    onClick={handlePrevChapter}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.75,
                      opacity: currentChapter === 1 ? 0.3 : 1,
                      cursor: currentChapter === 1 ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': currentChapter !== 1 ? {
                        transform: 'translateX(-3px)',
                        '& .nav-arrow': {
                          transform: 'translateX(-1px) rotate(180deg)',
                        }
                      } : {},
                    }}
                  >
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)',
                      border: '1.5px solid rgba(167, 218, 219, 0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': currentChapter !== 1 ? {
                        background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.2) 0%, rgba(79, 70, 229, 0.2) 100%)',
                        borderColor: 'rgba(167, 218, 219, 0.6)',
                        boxShadow: '0 6px 20px rgba(167, 218, 219, 0.3)',
                      } : {},
                    }}>
                      <ArrowForwardIcon 
                        className="nav-arrow"
                        sx={{ 
                          color: '#06B6D4', 
                          fontSize: '1.25rem',
                          transform: 'rotate(180deg)',
                          transition: 'transform 0.3s ease'
                        }} 
                      />
                    </Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#06B6D4',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        opacity: 0.8,
                        transition: 'opacity 0.3s ease',
                        '&:hover': {
                          opacity: 1
                        }
                      }}
                    >
                      Previous
                    </Typography>
                  </Box>

                  {/* Next Button */}
                  <Box
                    onClick={handleNextChapter}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.75,
                      opacity: currentChapter === chapters.length ? 0.3 : 1,
                      cursor: currentChapter === chapters.length ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': currentChapter !== chapters.length ? {
                        transform: 'translateX(3px)',
                        '& .nav-arrow': {
                          transform: 'translateX(1px)',
                        }
                      } : {},
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#06B6D4',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        opacity: 0.8,
                        transition: 'opacity 0.3s ease',
                        '&:hover': {
                          opacity: 1
                        }
                      }}
                    >
                      Next
                    </Typography>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)',
                      border: '1.5px solid rgba(167, 218, 219, 0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': currentChapter !== chapters.length ? {
                        background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.2) 0%, rgba(79, 70, 229, 0.2) 100%)',
                        borderColor: 'rgba(167, 218, 219, 0.6)',
                        boxShadow: '0 6px 20px rgba(167, 218, 219, 0.3)',
                      } : {},
                    }}>
                      <ArrowForwardIcon 
                        className="nav-arrow"
                        sx={{ 
                          color: '#06B6D4', 
                          fontSize: '1.25rem',
                          transition: 'transform 0.3s ease'
                        }} 
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </SectionWrapper>

        {/* Skills With Direct Organisational Impact */}
        <SectionWrapper id="skills-impact">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h2" component="h2" gutterBottom sx={{ 
              fontSize: { xs: '2.5rem', md: '3rem', lg: '3.5rem' },
              fontWeight: 700,
              color: 'text.primary',
              mb: 6,
              lineHeight: 1.2
            }}>
              Skills With Direct Organisational Impact
            </Typography>
            
            <SectionCard>
              <Box component="ul" sx={{ pl: 3, m: 0 }}>
                {skillsList.map((skill, index) => (
                                     <Typography 
                     key={index}
                     component="li" 
                     variant="body1" 
                     sx={{ 
                       fontSize: { xs: '1rem', md: '1.125rem' },
                       lineHeight: 1.7,
                       color: 'text.primary',
                       mb: 3,
                       fontWeight: 400,
                       '&:last-child': { mb: 0 }
                     }}
                   >
                     {skill}
                   </Typography>
                ))}
              </Box>
            </SectionCard>
          </motion.div>
        </SectionWrapper>

        {/* Proven in Practice */}
        <SectionWrapper id="proven-practice">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h2" component="h2" gutterBottom sx={{ 
              fontSize: { xs: '2.5rem', md: '3rem', lg: '3.5rem' },
              fontWeight: 700,
              color: 'text.primary',
              mb: 6,
              lineHeight: 1.2
            }}>
              Proven in Practice — Built With the Same Skills We Teach
            </Typography>
            
            <SectionCard>
              <Typography variant="body1" sx={{ 
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.7,
                color: 'text.primary',
                mb: 4,
                fontWeight: 400
              }}>
                Smartslate's platform was developed using the very principles in AI Foundations, powered by leading-edge AI tools:
              </Typography>
              
              <Box component="ul" sx={{ pl: 3, mb: 3 }}>
                                 {aiTools.map((tool, index) => (
                   <Typography 
                     key={index}
                     component="li" 
                     variant="body1" 
                     sx={{ 
                       fontSize: { xs: '1rem', md: '1.125rem' },
                       lineHeight: 1.7,
                       color: 'text.primary',
                       mb: 3,
                       fontWeight: 400,
                       '&:last-child': { mb: 0 }
                     }}
                   >
                     {tool}
                   </Typography>
                 ))}
              </Box>
              
                             <Typography variant="body1" sx={{ 
                 fontSize: { xs: '1rem', md: '1.125rem' },
                 lineHeight: 1.7,
                 color: 'text.primary',
                 fontWeight: 400
               }}>
                 The result is a fully operational, scalable learning platform — a real-world demonstration of what's possible when you have a clear, repeatable process. Many organisations invest heavily in AI initiatives without fully understanding how to structure them, leading to costly trial-and-error. AI Foundations: Concept to Application gives your team the framework to execute with precision from the start — avoiding wasted time and resources while achieving results that stand up at an enterprise level.
               </Typography>
            </SectionCard>
          </motion.div>
        </SectionWrapper>

        {/* ROI for Your Organisation */}
        <SectionWrapper id="roi">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h2" component="h2" gutterBottom sx={{ 
              fontSize: { xs: '2.5rem', md: '3rem', lg: '3.5rem' },
              fontWeight: 700,
              color: 'text.primary',
              mb: 6,
              lineHeight: 1.2
            }}>
              ROI for Your Organisation
            </Typography>
            
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4
            }}>
              <Box>
                <ROICard>
                  <Typography variant="h3" component="h3" gutterBottom sx={{ 
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'primary.main',
                    mb: 3
                  }}>
                    Enterprises
                  </Typography>
                  <Box component="ul" sx={{ pl: 3, m: 0 }}>
                    {enterpriseBenefits.map((benefit, index) => (
                      <Typography 
                        key={index}
                        component="li" 
                        variant="body1" 
                        sx={{ 
                          fontSize: { xs: '1rem', md: '1.125rem' },
                          lineHeight: 1.7,
                          color: 'text.primary',
                          mb: 3,
                          fontWeight: 400,
                          '&:last-child': { mb: 0 }
                        }}
                      >
                        {benefit}
                      </Typography>
                    ))}
                  </Box>
                </ROICard>
              </Box>
              
              <Box>
                <ROICard>
                  <Typography variant="h3" component="h3" gutterBottom sx={{ 
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'primary.main',
                    mb: 3
                  }}>
                    Higher Education
                  </Typography>
                  <Box component="ul" sx={{ pl: 3, m: 0 }}>
                    {educationBenefits.map((benefit, index) => (
                      <Typography 
                        key={index}
                        component="li" 
                        variant="body1" 
                        sx={{ 
                          fontSize: { xs: '1rem', md: '1.125rem' },
                          lineHeight: 1.7,
                          color: 'text.primary',
                          mb: 3,
                          fontWeight: 400,
                          '&:last-child': { mb: 0 }
                        }}
                      >
                        {benefit}
                      </Typography>
                    ))}
                  </Box>
                </ROICard>
              </Box>
            </Box>
          </motion.div>
        </SectionWrapper>

        {/* Cohort Delivery That Scales */}
        <SectionWrapper id="cohort-delivery">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h2" component="h2" gutterBottom sx={{ 
              fontSize: { xs: '2.5rem', md: '3rem', lg: '3.5rem' },
              fontWeight: 700,
              color: 'text.primary',
              mb: 6,
              lineHeight: 1.2
            }}>
              Cohort Delivery That Scales
            </Typography>
            
            <SectionCard>
              <Box component="ul" sx={{ pl: 3, m: 0 }}>
                <Typography 
                  component="li" 
                  variant="body1" 
                  sx={{ 
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    lineHeight: 1.7,
                    color: 'text.primary',
                    mb: 3,
                    fontWeight: 400
                  }}
                >
                  Custom-fit delivery — run as bootcamps, semester modules, or targeted upskilling tracks.
                </Typography>
                <Typography 
                  component="li" 
                  variant="body1" 
                  sx={{ 
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    lineHeight: 1.7,
                    color: 'text.primary',
                    mb: 3,
                    fontWeight: 400
                  }}
                >
                  Context-specific projects — all exercises reflect the realities of your industry or discipline.
                </Typography>
                <Typography 
                  component="li" 
                  variant="body1" 
                  sx={{ 
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    lineHeight: 1.7,
                    color: 'text.primary',
                    fontWeight: 400
                  }}
                >
                  Scalable learning — deliver consistently to 10 or 1,000+ participants without losing engagement.
                </Typography>
              </Box>
            </SectionCard>
          </motion.div>
        </SectionWrapper>

        {/* Typical rollout timeline */}
        <SectionWrapper id="timeline">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h2" component="h2" gutterBottom sx={{ 
              fontSize: { xs: '2.5rem', md: '3rem', lg: '3.5rem' },
              fontWeight: 700,
              color: 'text.primary',
              mb: 6,
              lineHeight: 1.2
            }}>
              Typical rollout timeline
            </Typography>
            
            {isMobile ? (
              // Mobile: Stacked timeline
              <Box>
                {timelineSteps.map((step, index) => (
                  <TimelineStep key={index}>
                    <Typography variant="h6" component="h3" sx={{ 
                      fontWeight: 700,
                      color: 'primary.main',
                      mb: 1
                    }}>
                      {step.weeks}
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      fontSize: { xs: '1rem', md: '1.125rem' },
                      lineHeight: 1.7,
                      color: 'text.primary',
                      fontWeight: 400
                    }}>
                      {step.title}
                    </Typography>
                  </TimelineStep>
                ))}
              </Box>
            ) : (
              // Desktop: Stepper timeline
              <SectionCard>
                <Stepper orientation="vertical" sx={{ 
                  '& .MuiStepConnector-line': {
                    borderLeftColor: 'primary.main',
                    borderLeftWidth: 2,
                  },
                  '& .MuiStepLabel-root': {
                    '& .MuiStepLabel-label': {
                      fontSize: '1.125rem',
                      color: 'text.primary',
                      fontWeight: 600,
                    },
                  },
                }}>
                  {timelineSteps.map((step, index) => (
                    <Step key={index} active={true}>
                      <StepLabel>
                        <Typography variant="h6" component="span" sx={{ 
                          fontWeight: 700,
                          color: 'primary.main'
                        }}>
                          {step.weeks}
                        </Typography>
                      </StepLabel>
                      <StepContent>
                                              <Typography variant="body1" sx={{ 
                        fontSize: { xs: '1rem', md: '1.125rem' },
                        lineHeight: 1.7,
                        color: 'text.primary',
                        mt: 1,
                        fontWeight: 400
                      }}>
                        {step.title}
                      </Typography>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </SectionCard>
            )}
          </motion.div>
        </SectionWrapper>

        {/* The Bottom Line */}
        <SectionWrapper id="bottom-line">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography variant="h2" component="h2" gutterBottom sx={{ 
              fontSize: { xs: '2.5rem', md: '3rem', lg: '3.5rem' },
              fontWeight: 700,
              color: 'text.primary',
              mb: 6,
              lineHeight: 1.2
            }}>
              The Bottom Line
            </Typography>
            
            <SectionCard>
              <Typography variant="body1" sx={{ 
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.7,
                color: 'text.primary',
                mb: 4,
                fontWeight: 400
              }}>
                I built Smartslate using the frameworks from AI Foundations: Concept to Application. Your teams can use the same structured, proven approach to accelerate projects, improve performance, and strengthen your organisation's competitive edge — all while keeping innovation focused where it matters most: inside your institution or company.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Link href="/collaborate" style={{ textDecoration: 'none' }}>
                  <CTAButton 
                    variant="contained" 
                    size="large"
                    onClick={() => handleCTAClick('talk_to_sales')}
                  >
                    Talk to Sales
                  </CTAButton>
                </Link>
                <Link href="/courses" style={{ textDecoration: 'none' }}>
                                <SecondaryButton 
                variant="outlined" 
                size="large"
                onClick={() => handleCTAClick('view_syllabus')}
              >
                View AI Foundations: Concept to Application Syllabus
              </SecondaryButton>
                </Link>
              </Box>
            </SectionCard>
          </motion.div>
        </SectionWrapper>
      </Container>
    </>
  );
}
