import { useState, useEffect, useRef, useCallback } from 'react';

export interface LandingPageState {
  revealedSections: {
    paradox: boolean;
    framework: boolean;
    roi: boolean;
    partners: boolean;
  };
  currentSection: number;
}

export interface LandingPageActions {
  revealNext: (section: keyof LandingPageState['revealedSections']) => void;
  scrollToSection: (index: number) => void;
  setCurrentSection: (index: number) => void;
}

export function useLandingPage() {
  const [revealedSections, setRevealedSections] = useState({
    paradox: false,
    framework: false,
    roi: false,
    partners: false,
  });

  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef<Array<HTMLDivElement | null>>([]);

  const revealNext = useCallback((section: keyof typeof revealedSections) => {
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
  }, []);

  const scrollToSection = useCallback((index: number) => {
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
  }, []);

  // Track current section for navigation dots
  useEffect(() => {
    const handleScroll = () => {
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

  return {
    state: {
      revealedSections,
      currentSection,
    },
    actions: {
      revealNext,
      scrollToSection,
      setCurrentSection,
    },
    refs: {
      sectionsRef,
    },
  };
}
