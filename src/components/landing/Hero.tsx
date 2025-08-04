'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import GroupsIcon from '@mui/icons-material/Groups';
import { styled } from '@mui/material/styles';
import CaseStudyModal from '@/components/landing/CaseStudyModal';
import { useCaseStudyModal } from '@/hooks/useCaseStudyModal';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: 'calc(100vh - 100px)', // Account for header space
  display: 'flex',
  alignItems: 'center',
  padding: `${theme.spacing(8)} 0`,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(6)} 0`,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'radial-gradient(ellipse at top right, rgba(167, 218, 219, 0.1) 0%, transparent 50%), radial-gradient(ellipse at bottom left, rgba(79, 70, 229, 0.08) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  textAlign: 'left',
  zIndex: 1,
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(6),
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '1.2fr 0.8fr',
    alignItems: 'center',
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  position: 'relative',
}));

const WordWrapper = styled('span')({
  display: 'inline-block',
  verticalAlign: 'bottom',
});

const AnimatedWord = styled('span', {
  shouldForwardProp: (prop) => prop !== 'isVisible' && prop !== 'delay'
})<{ delay: number; isVisible: boolean }>(
  ({ theme, delay, isVisible }) => ({
    display: 'inline-block',
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
    transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    paddingRight: '0.25em',
  })
);

const AccentText = styled('span', {
  shouldForwardProp: (prop) => prop !== 'finalColor'
})<{ finalColor?: boolean }>(({ theme, finalColor }) => ({
  color: finalColor ? theme.palette.primary.main : '#fff',
  transition: 'color 0.8s ease-in-out',
}));

const FadeInContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isVisible' && prop !== 'delay'
})<{ delay: number; isVisible: boolean }>(
  ({ theme, delay, isVisible }) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
    transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
  })
);

const StatsCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  textAlign: 'left',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    boxShadow: '0 10px 30px rgba(167, 218, 219, 0.2)',
    '& .stat-icon': {
      transform: 'scale(1.1) rotate(5deg)',
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: 'linear-gradient(45deg, transparent, rgba(167, 218, 219, 0.3), transparent)',
    borderRadius: theme.spacing(2),
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::before': {
    opacity: 1,
  },
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

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
  padding: `${theme.spacing(1.5)} ${theme.spacing(4)}`,
  fontSize: '1.1rem',
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
    width: '100%',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: `${theme.spacing(1.5)} ${theme.spacing(4)}`,
  fontSize: '1.1rem',
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
    width: '100%',
  },
}));

const ScrollIndicator = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(4),
  left: '50%',
  transform: 'translateX(-50%)',
  color: theme.palette.primary.main,
  backgroundColor: 'rgba(167, 218, 219, 0.1)',
  border: '2px solid rgba(167, 218, 219, 0.3)',
  animation: 'pulse 2s infinite',
  '&:hover': {
    backgroundColor: 'rgba(167, 218, 219, 0.2)',
  },
}));

interface HeroProps {
  onRevealNext: () => void;
}

export default function Hero({ onRevealNext }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [finalColorChange, setFinalColorChange] = useState(false);
  const { isOpen, openModal, closeModal } = useCaseStudyModal();

  useEffect(() => {
    // Trigger animations after mount
    setTimeout(() => setIsVisible(true), 100);
    // Trigger final color change
    setTimeout(() => setFinalColorChange(true), 3100);
  }, []);

  return (
    <HeroSection>
      <Container maxWidth="lg">
        <ContentWrapper>
          <MainContent>
            <Typography
              variant="h1"
              component="h1"
              sx={{ mb: 4, fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' }, lineHeight: 1.2 }}
              aria-label="Build Your Future-Ready Workforce"
            >
              <WordWrapper>
                <AnimatedWord delay={0} isVisible={isVisible}>
                  Build
                </AnimatedWord>
              </WordWrapper>
              <WordWrapper>
                <AnimatedWord delay={400} isVisible={isVisible}>
                  Your
                </AnimatedWord>
              </WordWrapper>
              <WordWrapper>
                <AnimatedWord delay={800} isVisible={isVisible}>
                  <AccentText finalColor={finalColorChange}>
                    Future-Ready Workforce
                  </AccentText>
                </AnimatedWord>
              </WordWrapper>
            </Typography>

            <FadeInContent delay={1600} isVisible={isVisible}>
              <Typography variant="body1" paragraph sx={{ mb: 3, fontSize: '1.125rem', lineHeight: 1.8, color: 'text.secondary' }}>
                India is on the cusp of a major economic expansion, fueled by its vibrant young population.
                However, a{' '}
                <Box component="strong" sx={{ color: 'text.primary', fontWeight: 700 }}>
                  significant skills gap
                </Box>{' '}
                threatens progress—companies need{' '}
                <Box component="strong" sx={{ color: 'text.primary', fontWeight: 700 }}>
                  job-ready talent
                </Box>{' '}
                but emerging professionals aren't yet prepared.
              </Typography>
            </FadeInContent>

            <FadeInContent delay={2100} isVisible={isVisible}>
              <Typography variant="body1" paragraph sx={{ mb: 4, fontSize: '1.125rem', lineHeight: 1.8, color: 'text.secondary' }}>
                The future of business is being written in India, yet a{' '}
                <Box component="strong" sx={{ color: 'text.primary', fontWeight: 700 }}>
                  silent crisis
                </Box>{' '}
                threatens to derail it all. Millions of ambitious individuals are entering the workforce, but
                they lack the specific, critical skills your company needs to innovate and compete. This{' '}
                <Box component="strong" sx={{ color: 'text.primary', fontWeight: 700 }}>
                  talent paradox
                </Box>{' '}
                isn't just a statistic—it's a{' '}
                <Box component="strong" sx={{ color: 'text.primary', fontWeight: 700 }}>
                  direct threat to your bottom line and future success
                </Box>
                .
              </Typography>
            </FadeInContent>

            <FadeInContent delay={3100} isVisible={isVisible}>
              <CTAContainer>
                <PrimaryButton
                  variant="contained"
                  size="large"
                  onClick={onRevealNext}
                  endIcon={<ArrowForwardIcon />}
                >
                  Uncover the Crisis
                </PrimaryButton>
                <SecondaryButton
                  variant="outlined"
                  size="large"
                  startIcon={<AutoGraphIcon />}
                  onClick={openModal}
                >
                  View Case Studies
                </SecondaryButton>
              </CTAContainer>
            </FadeInContent>
          </MainContent>

          <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
            <FadeInContent delay={3500} isVisible={isVisible}>
              <Box sx={{ display: 'grid', gap: 3 }}>
                <StatsCard>
                  <AutoGraphIcon 
                    className="stat-icon"
                    sx={{ 
                      fontSize: 40, 
                      color: 'primary.main', 
                      mb: 2,
                      transition: 'all 0.3s ease' 
                    }} 
                  />
                  <StatNumber variant="h3">65%</StatNumber>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Skills Gap in Tech Sector
                  </Typography>
                </StatsCard>

                <StatsCard>
                  <GroupsIcon 
                    className="stat-icon"
                    sx={{ 
                      fontSize: 40, 
                      color: 'secondary.main', 
                      mb: 2,
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <StatNumber variant="h3">12M+</StatNumber>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Graduates Enter Workforce Yearly
                  </Typography>
                </StatsCard>
              </Box>
            </FadeInContent>
          </Box>
        </ContentWrapper>


      </Container>

      {/* Case Study Modal */}
      <CaseStudyModal isOpen={isOpen} onClose={closeModal} />
    </HeroSection>
  );
}