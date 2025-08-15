'use client';

import { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Hero from '@/components/landing/Hero';
import JsonLd from '@/components/seo/JsonLd';
import { getOrganizationJsonLd, getWebsiteJsonLd } from '@/components/seo/jsonld';
import TalentParadox from '@/components/landing/TalentParadox';
import Framework from '@/components/landing/Framework';
import ROICalculator from '@/components/landing/ROICalculator';
import Partners from '@/components/landing/Partners';
import DemoModal from '@/components/landing/DemoModal';
import { useDemoModal } from '@/hooks/useDemoModal';

const PageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: 'auto',
}));



const SectionWrapper = styled(Box)(({ theme }) => ({
  opacity: 0,
  transform: 'translateY(30px)',
  transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
  '&.visible': {
    opacity: 1,
    transform: 'translateY(0)',
  },
}));

const NavigationDots = styled(Box)(({ theme }) => ({
  position: 'fixed',
  right: theme.spacing(4),
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  zIndex: 100,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const Dot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active: boolean }>(({ theme, active }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  border: `2px solid ${active ? theme.palette.primary.main : 'rgba(167, 218, 219, 0.3)'}`,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.main : 'rgba(167, 218, 219, 0.2)',
    transform: 'scale(1.2)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 24,
    height: 24,
    borderRadius: '50%',
  },
}));

export default function Home() {
  const [revealedSections, setRevealedSections] = useState({
    paradox: false,
    framework: false,
    roi: false,
    partners: false,
  });

  // Demo modal state - shared across all components
  const { isOpen: isDemoModalOpen, openModal: openDemoModal, closeModal: closeDemoModal } = useDemoModal();
  

  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef<Array<HTMLDivElement | null>>([]);

  // Track current section for navigation dots
  useEffect(() => {
    const handleScroll = () => {
      // Determine current section
      const sections = sectionsRef.current;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setCurrentSection(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [revealedSections]);

  const revealNext = (section: keyof typeof revealedSections) => {
    setRevealedSections(prev => ({ ...prev, [section]: true }));
    
    // Smooth scroll to the revealed section
    setTimeout(() => {
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        const headerHeight = 100;
        const elementTop = sectionElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementTop - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  const scrollToSection = (index: number) => {
    const sections = ['hero', 'paradox', 'framework', 'roi', 'partners'];
    const sectionId = sections[index];
    const element = document.getElementById(sectionId);
    
    if (element) {
      const headerHeight = 100;
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementTop - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const sections = [
    { id: 'hero', label: 'Introduction' },
    { id: 'paradox', label: 'The Paradox' },
    { id: 'framework', label: 'Our Solution' },
    { id: 'roi', label: 'ROI Calculator' },
    { id: 'partners', label: 'Partners' },
  ];

  return (
    <PageWrapper>
      <NavigationDots>
        {sections.map((section, index) => (
          <Dot
            key={section.id}
            active={currentSection === index}
            onClick={() => scrollToSection(index)}
            title={section.label}
            aria-label={`Navigate to ${section.label}`}
          />
        ))}
      </NavigationDots>

      <Box id="hero" ref={(el: HTMLDivElement | null) => { sectionsRef.current[0] = el; }}>
        <Hero onRevealNext={() => revealNext('paradox')} />
      </Box>
      
      {revealedSections.paradox && (
        <SectionWrapper 
          id="paradox" 
          className="visible"
          ref={(el: HTMLDivElement | null) => { sectionsRef.current[1] = el; }}
        >
          <TalentParadox onRevealNext={() => revealNext('framework')} />
        </SectionWrapper>
      )}
      
      {revealedSections.framework && (
        <SectionWrapper 
          id="framework" 
          className="visible"
          ref={(el: HTMLDivElement | null) => { sectionsRef.current[2] = el; }}
        >
          <Framework onRevealNext={() => revealNext('roi')} />
        </SectionWrapper>
      )}
      
      {revealedSections.roi && (
        <SectionWrapper 
          id="roi" 
          className="visible"
          ref={(el: HTMLDivElement | null) => { sectionsRef.current[3] = el; }}
        >
          <ROICalculator onRevealNext={() => revealNext('partners')} openDemoModal={openDemoModal} />
        </SectionWrapper>
      )}
      
      {revealedSections.partners && (
        <SectionWrapper 
          id="partners" 
          className="visible"
          ref={(el: HTMLDivElement | null) => { sectionsRef.current[4] = el; }}
        >
          <Partners openDemoModal={openDemoModal} />
        </SectionWrapper>
      )}

      {/* Demo Modal - shared across all components */}
      <DemoModal isOpen={isDemoModalOpen} onClose={closeDemoModal} />

      {/* JSON-LD for Organization and WebSite */}
      <JsonLd data={getOrganizationJsonLd()} />
      <JsonLd data={getWebsiteJsonLd()} />
    </PageWrapper>
  );
}

// Note: cannot export metadata from a Client Component.