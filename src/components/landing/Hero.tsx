'use client';

import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import StandardHero from '@/components/ui/StandardHero';
import { FadeInContent, PrimaryButton } from './styles/LandingStyles';

interface HeroProps {
  onRevealNext: () => void;
  openCaseStudyModal: () => void;
  openConsultationModal: () => void;
}

export default function Hero({ onRevealNext, openCaseStudyModal, openConsultationModal }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after mount
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <>
      <StandardHero
        title="Smartslate — Build Your Future-Ready Workforce"
        subtitle="India is on the cusp of a major economic expansion, fueled by its vibrant young population. However, a significant skills gap threatens progress—companies need job-ready talent but emerging professionals aren't yet prepared."
        description="The future of business is being written in India, yet a silent crisis threatens to derail it all. Millions of ambitious individuals are entering the workforce, but they lack the specific, critical skills your company needs to innovate and compete."
        accentWords={['Future-Ready', 'skills gap', 'job-ready talent', 'silent crisis']}
        showScrollIndicator={true}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <FadeInContent delay={1000} isVisible={isVisible}>
            <PrimaryButton
              variant="contained"
              size="large"
              onClick={onRevealNext}
              endIcon={<KeyboardDoubleArrowDownIcon aria-hidden="true" className="icon-anim icon-bounce-y" />}
            >
              Uncover the Crisis
            </PrimaryButton>
          </FadeInContent>
        </div>
      </StandardHero>
    </>
  );
}
