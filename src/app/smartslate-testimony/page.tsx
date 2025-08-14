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











  const tocSections = [
    { id: 'hero', title: 'AI Foundations: Concept to Application' },
  ];

  const [activeSection, setActiveSection] = useState('hero');

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
    const sectionIds = ['hero'];
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
            {tocSections.map((section) => (
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
          ))}
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
          {tocSections.map((section) => (
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
          ))}
        </List>
      </StickyTOC>

      <Container maxWidth="lg">
        <SectionWrapper id="hero">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center', mb: 8 }}>
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
                AI Foundations: Concept to Application
              </Typography>
              
              <Typography variant="h3" sx={{ 
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 600,
                color: 'primary.main',
                mb: 4,
                fontStyle: 'italic'
              }}>
                The Course That Built Smartslate
              </Typography>
            </Box>

            <Box sx={{ width: '100%', position: 'relative' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                      <Typography variant="h4" sx={{ 
                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                        fontWeight: 700,
                        color: 'primary.main',
                        mb: 3
                      }}>
                        Course Overview
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontSize: { xs: '1rem', md: '1.125rem' },
                          lineHeight: 1.8,
                          color: 'text.primary',
                          mb: 3,
                          fontWeight: 400
                        }}
                      >
                        This course represents the structured approach that built Smartslate's AI-powered learning platform. 
                        Learn how to strengthen your team's capabilities through the same methodology that transformed 
                        our organization from concept to application.
                      </Typography>
                    </SectionCard>
                  </Box>
                </Box>
              </motion.div>
            </Box>
          </motion.div>
        </SectionWrapper>
      </Container>
    </>
  );
}
