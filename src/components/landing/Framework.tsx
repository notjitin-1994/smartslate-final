'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Paper, Fade, Slide, Chip, Grow } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import {
  ElectricBolt,
  Hub,
  Layers,
  ArrowForward,
  CurrencyRupee,
  AutoAwesome,
  Speed,
  Psychology,
  Extension,
  CheckCircle,
  TrendingUp,
} from '@mui/icons-material';

const FrameworkSection = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(10)} 0`,
  backgroundColor: theme.palette.background.default,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'radial-gradient(ellipse at top left, rgba(167, 218, 219, 0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  marginBottom: theme.spacing(10),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -theme.spacing(4),
    left: 0,
    width: 80,
    height: 3,
    background: theme.palette.primary.main,
    borderRadius: theme.spacing(0.5),
  },
}));

const InteractiveLayout = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '0.8fr 1.2fr',
  gap: theme.spacing(8),
  alignItems: 'stretch',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(6),
  },
}));

const StepperNavigation = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  position: 'sticky',
  top: 120,
  [theme.breakpoints.down('md')]: {
    position: 'static',
  },
}));

const StepButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>(({ theme, active }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  background: active
    ? 'linear-gradient(135deg, rgba(167, 218, 219, 0.12), rgba(79, 70, 229, 0.08))'
    : 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: `1px solid ${active ? 'rgba(167, 218, 219, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
  borderLeft: `4px solid ${active ? theme.palette.primary.main : 'transparent'}`,
  textAlign: 'left',
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  cursor: 'pointer',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  width: '100%',
  justifyContent: 'flex-start',
  transform: active ? 'translateX(8px) scale(1.02)' : 'translateX(0)',
  boxShadow: active ? '0 12px 32px rgba(167, 218, 219, 0.2)' : 'none',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: -100,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(167, 218, 219, 0.1), transparent)',
    transition: 'left 0.6s ease',
  },
  '&:hover': {
    backgroundColor: 'rgba(167, 218, 219, 0.06)',
    borderColor: 'rgba(167, 218, 219, 0.5)',
    color: theme.palette.text.primary,
    transform: 'translateX(4px)',
    boxShadow: '0 6px 20px rgba(167, 218, 219, 0.15)',
    '&::before': {
      left: '100%',
    },
  },
}));

const StepIcon = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>(({ theme, active }) => ({
  flexShrink: 0,
  marginRight: theme.spacing(3),
  color: active ? theme.palette.primary.main : theme.palette.secondary.main,
  transition: 'all 0.4s ease',
  backgroundColor: active 
    ? 'rgba(167, 218, 219, 0.15)' 
    : 'rgba(79, 70, 229, 0.1)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transform: active ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
  boxShadow: active ? '0 8px 20px rgba(167, 218, 219, 0.3)' : 'none',
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
  },
}));

const StepLabel = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
});

const ContentPanel = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(6),
  border: '1px solid rgba(255, 255, 255, 0.08)',
  minHeight: 450,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'radial-gradient(circle at top right, rgba(167, 218, 219, 0.1), transparent 50%)',
    opacity: 0,
    transition: 'opacity 0.4s ease',
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.3)',
    '&::before': {
      opacity: 1,
    },
  },
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(2),
    minHeight: 'auto',
    padding: theme.spacing(4),
  },
}));

const FeatureGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: theme.spacing(3),
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1.5),
  background: 'rgba(0, 0, 0, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    background: 'rgba(167, 218, 219, 0.05)',
    borderColor: 'rgba(167, 218, 219, 0.3)',
    transform: 'translateX(4px)',
  },
}));

const AnimatedChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(79, 70, 229, 0.15)',
  color: theme.palette.secondary.light,
  border: '1px solid rgba(79, 70, 229, 0.3)',
  fontWeight: 600,
  animation: 'pulse 2s infinite',
}));

const AccentText = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
}));

const AnimateText = styled('span', {
  shouldForwardProp: (prop) => prop !== 'animate'
})<{ animate?: boolean }>(({ theme, animate }) => ({
  color: animate ? theme.palette.primary.main : 'inherit',
  transition: 'all 1s ease-in-out',
  fontWeight: animate ? 700 : 'inherit',
}));

interface FrameworkProps {
  onRevealNext: () => void;
}

type StepId = 'ignite' | 'architecture' | 'solara';

type FeatureItem = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const frameworkSteps = [
  {
    id: 'ignite' as StepId,
    icon: ElectricBolt,
    title: 'Ignite Series',
    subtitle: 'AI-Powered Learning',
    description: 'Experience the future of education with our pre-built AI-assisted courses, featuring your personal AI tutor that adapts to your learning style.',
    features: [
      { icon: Psychology, title: 'AI Tutor', description: 'Personalized guidance 24/7' },
      { icon: Speed, title: 'Adaptive Learning', description: 'Content that evolves with you' },
      { icon: AutoAwesome, title: 'Smart Analytics', description: 'Track progress in real-time' },
      { icon: Extension, title: 'Skill Modules', description: '500+ industry-ready courses' },
    ],
    badge: 'Most Popular',
    buttonText: 'Explore our Courses',
    href: '/courses',
  },
  {
    id: 'architecture' as StepId,
    icon: Hub,
    title: 'Strategic Skill Architecture',
    subtitle: 'Future-Proof Workforce',
    description: 'We conduct comprehensive skill gap analysis and design custom learning ecosystems that evolve with your business needs.',
    features: [
      { icon: CheckCircle, title: 'Gap Analysis', description: 'Identify skill deficiencies' },
      { icon: Layers, title: 'Custom Pathways', description: 'Tailored learning journeys' },
      { icon: TrendingUp, title: 'ROI Tracking', description: 'Measure business impact' },
      { icon: Hub, title: 'Integration', description: 'Seamless HRMS connection' },
    ],
    badge: 'Enterprise',
    buttonText: 'Create your Strategic Skills Architecture',
    href: '/solutions',
  },
  {
    id: 'solara' as StepId,
    icon: Layers,
    title: 'Solara',
    subtitle: 'End-to-End Learning Platform',
    description: 'Revolutionize learning content creation with our all-in-one platform featuring interactive elements and a custom interaction builder.',
    features: [
      { icon: AutoAwesome, title: 'Content Studio', description: 'Create engaging content' },
      { icon: Extension, title: 'Interaction Builder', description: 'No-code interactivity' },
      { icon: Psychology, title: 'AI Assistant', description: 'Content generation help' },
      { icon: Speed, title: 'Rapid Deploy', description: 'Publish in minutes' },
    ],
    badge: 'Innovation',
    buttonText: 'Discover Solara',
    href: '/solara',
  },
];

export default function Framework({ onRevealNext }: FrameworkProps) {
  const [activeStep, setActiveStep] = useState<StepId>('ignite');
  const [animateTransform, setAnimateTransform] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  
  const activeContent = frameworkSteps.find(s => s.id === activeStep);

  useEffect(() => {
    // Trigger animations
    setTimeout(() => setAnimateTransform(true), 500);
  }, []);

  useEffect(() => {
    // Reset and show features with delay
    setShowFeatures(false);
    const timer = setTimeout(() => setShowFeatures(true), 300);
    return () => clearTimeout(timer);
  }, [activeStep]);

  return (
    <FrameworkSection>
      <Container maxWidth="lg">
        <SectionHeader>
          <Typography 
            variant="h2" 
            sx={{ 
              mb: 3, 
              fontSize: { xs: '2.5rem', md: '3rem', lg: '3.5rem' },
              lineHeight: 1.2
            }}
          >
            The SmartSlate <AnimateText animate={animateTransform}>Framework</AnimateText>
          </Typography>
          <Typography variant="body1" sx={{ 
            fontSize: '1.25rem', 
            color: 'text.secondary',
            maxWidth: '65ch',
            lineHeight: 1.8
          }}>
            We don&apos;t just train; we <AnimateText animate={animateTransform}>transform</AnimateText>. Our integrated
            ecosystem bridges the critical gap between education and industry, creating a workforce that&apos;s ready for tomorrow.
          </Typography>
        </SectionHeader>

        <InteractiveLayout>
          <StepperNavigation>
            {frameworkSteps.map((step) => (
              <StepButton
                key={step.id}
                active={activeStep === step.id}
                onClick={() => setActiveStep(step.id)}
              >
                <StepIcon active={activeStep === step.id}>
                  <step.icon />
                </StepIcon>
                <StepLabel>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {step.subtitle}
                  </Typography>
                </StepLabel>
              </StepButton>
            ))}
          </StepperNavigation>

          <ContentPanel elevation={0}>
            {activeContent && (
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Slide in={true} direction="down" timeout={400}>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        color: 'primary.main',
                        fontSize: { xs: '1.75rem', md: '2.25rem' },
                        fontWeight: 700
                      }}
                    >
                      {activeContent.title}
                    </Typography>
                  </Slide>
                  <Fade in={true} timeout={600}>
                    <AnimatedChip label={activeContent.badge} size="small" />
                  </Fade>
                </Box>

                <Slide in={true} direction="up" timeout={400} style={{ transitionDelay: '100ms' }}>
                  <Typography variant="body1" sx={{ 
                    mb: 4, 
                    color: 'text.secondary',
                    fontSize: '1.125rem',
                    lineHeight: 1.8,
                  }}>
                    {activeContent.description}
                  </Typography>
                </Slide>

                <FeatureGrid>
                  {activeContent.features.map((feature, index) => (
                    <Grow 
                      key={feature.title}
                      in={showFeatures} 
                      timeout={500 + (index * 100)}
                    >
                      <FeatureCard>
                        <feature.icon 
                          sx={{ 
                            color: 'primary.main', 
                            fontSize: 28,
                            mt: 0.5
                          }} 
                        />
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                            {feature.description}
                          </Typography>
                        </Box>
                      </FeatureCard>
                    </Grow>
                  ))}
                </FeatureGrid>

                <Box sx={{ mt: 'auto', pt: 4 }}>
                  <Fade in={showFeatures} timeout={800}>
                    <Link href={activeContent.href} passHref>
                      <Button
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForward />}
                        fullWidth
                        sx={{
                          backgroundColor: 'secondary.main',
                          color: '#ffffff',
                          padding: '14px 32px',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          borderRadius: 1.5,
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
                            backgroundColor: 'secondary.dark',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 20px rgba(79, 70, 229, 0.3)',
                            '&::before': {
                              left: '100%',
                            },
                          },
                        }}
                      >
                        {activeContent.buttonText}
                      </Button>
                    </Link>
                  </Fade>
                </Box>
              </Box>
            )}
          </ContentPanel>
        </InteractiveLayout>

        <Box sx={{ 
          textAlign: 'left', 
          mt: 10,
          pt: 6,
          borderTop: '1px solid rgba(167, 218, 219, 0.1)',
        }}>
          <Typography variant="h4" sx={{ mb: 3, fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
            Ready to see the <AccentText>numbers</AccentText>?
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 4, 
              color: 'text.secondary',
              fontSize: '1.125rem',
              maxWidth: '55ch'
            }}
          >
            Calculate your potential ROI and discover how SmartSlate can transform your workforce economics.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={onRevealNext}
            endIcon={<CurrencyRupee />}
            sx={{
              backgroundColor: 'secondary.main',
              color: '#ffffff',
              padding: '12px 40px',
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 1,
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
                backgroundColor: 'secondary.dark',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(79, 70, 229, 0.3)',
                '&::before': {
                  left: '100%',
                },
              },
            }}
          >
            Calculate your ROI
          </Button>
        </Box>
      </Container>
          </FrameworkSection>
    );
  }
