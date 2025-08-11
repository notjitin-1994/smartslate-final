'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, Chip, Grow, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  ElectricBolt,
  Hub,
  Layers,
  AutoAwesome,
  Speed,
  Psychology,
  Extension,
  CheckCircle,
  School,
  TrendingUp,
  CurrencyRupee,
} from '@mui/icons-material';
import Accordion from '@/components/ui/Accordion';
import { useSSAInterestModal } from '@/hooks/useSSAInterestModal';
import { useSolaraInterestModal } from '@/hooks/useSolaraInterestModal';
import SSAInterestModal from '@/components/products/SSAInterestModal';
import SolaraInterestModal from '@/components/products/SolaraInterestModal';

const FrameworkSection = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(10)} 0`,
  backgroundColor: theme.palette.background.default,
  position: 'relative',
  overflow: 'hidden',
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  marginBottom: theme.spacing(10),
  position: 'relative',
}));

const InteractiveLayout = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(4),
  },
}));

const ProductShowcase = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: theme.spacing(4),
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: '1fr',
  },
}));

const ProductCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>(({ theme, active }) => ({
  position: 'relative',
  background: active
    ? 'linear-gradient(135deg, rgba(167, 218, 219, 0.08), rgba(79, 70, 229, 0.04))'
    : 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: `2px solid ${active ? 'rgba(167, 218, 219, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
  borderRadius: theme.spacing(3),
  padding: theme.spacing(4),
  cursor: 'pointer',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  transform: active ? 'translateY(-8px) scale(1.02)' : 'translateY(0)',
  boxShadow: active ? '0 20px 40px rgba(167, 218, 219, 0.15)' : '0 8px 24px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: active 
      ? `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
      : 'transparent',
    transform: active ? 'scaleX(1)' : 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '&:hover': {
    background: 'rgba(167, 218, 219, 0.04)',
    borderColor: 'rgba(167, 218, 219, 0.3)',
    transform: 'translateY(-4px)',
    boxShadow: '0 16px 32px rgba(167, 218, 219, 0.12)',
    '&::before': {
      transform: 'scaleX(1)',
    },
  },
}));

const ProductHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(3),
}));

const ProductIcon = styled(Box)(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.15), rgba(79, 70, 229, 0.1))',
  border: '1px solid rgba(167, 218, 219, 0.3)',
  transition: 'all 0.3s ease',
  '& .MuiSvgIcon-root': {
    fontSize: '1.75rem',
    color: theme.palette.primary.main,
  },
}));

const ProductBadge = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
  borderRadius: theme.spacing(2),
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  background: 'rgba(167, 218, 219, 0.15)',
  color: theme.palette.primary.main,
  border: '1px solid rgba(167, 218, 219, 0.3)',
}));

const ProductContent = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const FeatureList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  background: 'rgba(0, 0, 0, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(167, 218, 219, 0.05)',
    borderColor: 'rgba(167, 218, 219, 0.2)',
    transform: 'translateX(4px)',
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
    fontSize: '1.25rem',
    flexShrink: 0,
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
    subtitle: 'From Classroom to Career',
    description: 'We bridge the critical gap between academic knowledge and real-world impact. Our pre-built courses are engineered in collaboration with industry leaders to cultivate the next generation of market-ready professionals.',
    features: [
      { icon: School, title: 'Industry-Forged Curriculum', description: 'Market-driven courses designed with industry leaders' },
      { icon: Psychology, title: 'Trusted Talent Signal', description: 'SmartSlate Certification validates career-focused education' },
      { icon: CheckCircle, title: 'Commitment to Excellence', description: 'Rigorous certification ensures immediate impact' },
      { icon: TrendingUp, title: 'Seamless Pipeline', description: 'Transform students into high-performing new hires' },
    ],
    badge: 'Most Popular',
    buttonText: 'Explore our Courses',
    href: '/courses',
  },
  {
    id: 'architecture' as StepId,
    icon: Hub,
    title: 'Strategic Skills Architecture',
    subtitle: 'Bespoke Learning Solutions',
    description: 'When off-the-shelf training falls short, we step in. We partner with you to architect learning experiences that are a true reflection of your organization\'s unique culture, challenges, and vision.',
    features: [
      { icon: Extension, title: 'Signature Content Creation', description: 'Built from the ground up for your specific challenges' },
      { icon: CheckCircle, title: 'Your Intellectual Property', description: 'Guaranteed confidential, competitive asset' },
      { icon: TrendingUp, title: 'Precision Skill Enhancement', description: 'Laser-focused training for maximum ROI' },
      { icon: Hub, title: 'Seamless Integration', description: 'Works with your existing HRMS and workflows' },
    ],
    badge: 'Enterprise',
    buttonText: 'Set up SSA',
    href: '/solutions',
  },
  {
    id: 'solara' as StepId,
    icon: AutoAwesome,
    title: 'Solara',
    subtitle: 'The Future of Learning',
    description: 'Enter Solara, the singular, intelligent platform engineered to unify every facet of learning design and delivery. We\'re not just improving the old model; we are building its replacement—an engine for continuous growth.',
    features: [
      { icon: Psychology, title: 'Solara Polaris', description: 'Translate stakeholder needs into learning requirements' },
      { icon: Extension, title: 'Solara Constellation', description: 'Transform raw content into structured blueprints' },
      { icon: AutoAwesome, title: 'Solara Nova', description: 'AI-assisted authoring for interactive experiences' },
      { icon: Speed, title: 'Solara Orbit', description: 'Deliver personalized learning journeys' },
    ],
    badge: 'Innovation',
    buttonText: 'Register Interest',
    href: '/solara',
  },
];

export default function Framework({ onRevealNext }: FrameworkProps) {
  const [activeStep, setActiveStep] = useState<StepId>('ignite');
  const stepEndIcons = {
    ignite: <School aria-hidden="true" className="icon-anim icon-float" />,
    architecture: <Hub aria-hidden="true" className="icon-anim icon-wiggle" />,
    solara: <AutoAwesome aria-hidden="true" className="icon-anim icon-pulse" />,
  } as const;
  const [animateTransform, setAnimateTransform] = useState(false);
  
  // Add modal hooks
  const { openModal: openSSAModal } = useSSAInterestModal();
  const { openModal: openSolaraModal } = useSolaraInterestModal();
  
  // Add refs and inView hooks for animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const productsInView = useInView(productsRef, { once: true, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  useEffect(() => {
    // Trigger animations
    setTimeout(() => setAnimateTransform(true), 500);
  }, []);

  // Function to handle button clicks based on step
  const handleButtonClick = (stepId: StepId) => {
    if (stepId === 'ignite') {
      // Navigate to courses page
      window.location.href = '/courses';
    } else if (stepId === 'architecture') {
      // Open SSA modal
      openSSAModal();
    } else if (stepId === 'solara') {
      // Open Solara modal
      openSolaraModal();
    }
  };

  return (
    <FrameworkSection ref={sectionRef}>
      <Container maxWidth="lg">
        <SectionHeader ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                mb: 3, 
                fontSize: { xs: '2.5rem', md: '3rem', lg: '3.5rem' },
                lineHeight: 1.2
              }}
            >
              <span style={{ color: 'white' }}>The</span> <AnimateText animate={animateTransform}>SmartSlate</AnimateText> <span style={{ color: 'white' }}>Framework</span>
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <Typography variant="body1" sx={{ 
              fontSize: '1.25rem', 
              color: 'text.secondary',
              lineHeight: 1.8
            }}>
              We don&apos;t just train; we <AnimateText animate={animateTransform}>transform</AnimateText>. Our integrated
              ecosystem bridges the critical gap between education and industry, creating a workforce that&apos;s ready for tomorrow. This is our complete framework for achieving our mission—and these are our flagship products.
            </Typography>
          </motion.div>
        </SectionHeader>

        <InteractiveLayout ref={productsRef}>
          <ProductShowcase>
            {frameworkSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                animate={productsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeOut", 
                  delay: 0.3 + (index * 0.2) 
                }}
              >
                <ProductCard
                  active={activeStep === step.id}
                  onClick={() => setActiveStep(step.id)}
                >
                  <ProductHeader>
                    <ProductIcon>
                      <step.icon />
                    </ProductIcon>
                    <ProductBadge>
                      {step.badge}
                    </ProductBadge>
                  </ProductHeader>

                  <ProductContent>
                    <Typography variant="h4" sx={{ 
                      mb: 2, 
                      fontSize: { xs: '1.5rem', md: '1.75rem' },
                      fontWeight: 700,
                      color: 'white'
                    }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      mb: 3, 
                      color: 'text.secondary',
                      fontSize: '1rem',
                      lineHeight: 1.6
                    }}>
                      {step.subtitle}
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      mb: 3, 
                      color: 'text.secondary',
                      fontSize: '0.95rem',
                      lineHeight: 1.7
                    }}>
                      {step.description}
                    </Typography>
                  </ProductContent>

                  <FeatureList>
                    {/* Mobile: Accordion */}
                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                      <Accordion title={`${step.title === 'Ignite Series' ? 'Career Transformation Engine' : step.title === 'Strategic Skills Architecture' ? 'Enterprise Advantages' : 'AI-Powered Capabilities'}`} defaultExpanded={false}>
                        {step.features.map((feature, index) => (
                          <Box key={feature.title} sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                            <Box sx={{ color: 'primary.main', mt: 0.5, flexShrink: 0 }}>
                              <feature.icon />
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, color: 'white' }}>
                                {feature.title}
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                                {feature.description}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Accordion>
                    </Box>
                    
                    {/* Desktop: Regular feature list */}
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                      {step.features.map((feature, index) => (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={productsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ 
                            duration: 0.5, 
                            ease: "easeOut", 
                            delay: 0.5 + (index * 0.1) 
                          }}
                        >
                          <FeatureItem>
                            <feature.icon />
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, color: 'white' }}>
                                {feature.title}
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                                {feature.description}
                              </Typography>
                            </Box>
                          </FeatureItem>
                        </motion.div>
                      ))}
                    </Box>
                  </FeatureList>

                  <Box sx={{ mt: 'auto' }}>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={stepEndIcons[step.id]}
                      fullWidth
                      onClick={() => handleButtonClick(step.id)}
                      sx={{
                        backgroundColor: 'secondary.main',
                        color: '#ffffff',
                        padding: { xs: '12px 20px', sm: '12px 24px' },
                        fontSize: '1rem',
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
                      {step.buttonText}
                    </Button>
                  </Box>
                </ProductCard>
              </motion.div>
            ))}
          </ProductShowcase>
        </InteractiveLayout>

        <Box 
          ref={ctaRef}
          sx={{ 
            textAlign: 'left', 
            mt: 10,
            pt: 6,
            borderTop: '1px solid rgba(167, 218, 219, 0.1)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Typography variant="h4" sx={{ mb: 3, fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
              Ready to see the <AccentText>numbers</AccentText>?
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4, 
                color: 'text.secondary',
                fontSize: '1.125rem'
              }}
            >
              Calculate your potential ROI and discover how SmartSlate can transform your workforce economics.
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={onRevealNext}
              endIcon={<CurrencyRupee aria-hidden="true" className="icon-anim icon-float" />}
              sx={{
                backgroundColor: 'secondary.main',
                color: '#ffffff',
                padding: { xs: '12px 20px', sm: '12px 24px' },
                fontSize: '1rem',
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
          </motion.div>
        </Box>
      </Container>

      {/* Add the modals */}
      <SSAInterestModal />
      <SolaraInterestModal />
    </FrameworkSection>
  );
}
