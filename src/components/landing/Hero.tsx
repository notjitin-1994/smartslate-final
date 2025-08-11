'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Button } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { styled } from '@mui/material/styles';
import CaseStudyModal from '@/components/landing/CaseStudyModal';
import { useCaseStudyModal } from '@/hooks/useCaseStudyModal';
import StandardHero from '@/components/ui/StandardHero';

const FadeInContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isVisible' && prop !== 'delay'
})<{ delay: number; isVisible: boolean }>(
  ({ theme, delay, isVisible }) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
    transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
  })
);

const CTAContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    width: '100%',
  },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
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

interface HeroProps {
  onRevealNext: () => void;
}

export default function Hero({ onRevealNext }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { isOpen, openModal, closeModal } = useCaseStudyModal();

  useEffect(() => {
    // Trigger animations after mount
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <>
      <StandardHero
        title="Build Your Future-Ready Workforce"
        subtitle="India is on the cusp of a major economic expansion, fueled by its vibrant young population. However, a significant skills gap threatens progress—companies need job-ready talent but emerging professionals aren't yet prepared."
        description="The future of business is being written in India, yet a silent crisis threatens to derail it all. Millions of ambitious individuals are entering the workforce, but they lack the specific, critical skills your company needs to innovate and compete."
        accentWords={['Future-Ready', 'skills gap', 'job-ready talent', 'silent crisis']}
        showScrollIndicator={true}
      >
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'nowrap' }}>
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
          
          <FadeInContent delay={1200} isVisible={isVisible}>
            <SecondaryButton
              variant="outlined"
              size="large"
              startIcon={<AutoGraphIcon aria-hidden="true" className="icon-anim icon-float" />}
              onClick={openModal}
            >
              View Case Studies
            </SecondaryButton>
          </FadeInContent>
        </div>
      </StandardHero>

      <CaseStudyModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}
