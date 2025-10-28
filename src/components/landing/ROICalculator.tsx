'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, Slider, Paper, Grow, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  TrendingUp,
  EmojiEvents,
  AccessTime,
  ArrowBack,
  Business,
  School,
  Person,
  Handshake,
  ArrowForward,
  Savings,
  Speed,
  AutoGraph,
  Groups,
  WorkspacePremium,
  MonetizationOn,
  Timeline,
} from '@mui/icons-material';
import Link from 'next/link';


const ROISection = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(3.6)} 0`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'radial-gradient(ellipse at center, rgba(79, 70, 229, 0.06) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  maxWidth: '100%',
  margin: `0 0 ${theme.spacing(4.8)} 0`,
  textAlign: 'left',
  position: 'relative',
}));

const CalculatorWrapper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: theme.spacing(1.8),
  padding: `${theme.spacing(3.6)} ${theme.spacing(4.8)}`,
  minHeight: 550,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -100,
    right: -100,
    width: 200,
    height: 200,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(167, 218, 219, 0.1), transparent)',
    pointerEvents: 'none',
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2.4),
  },
}));

const PersonaCard = styled(Button)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(3),
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(1.2),
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  width: '100%',
  position: 'relative',
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
    background: 'rgba(167, 218, 219, 0.08)',
    borderColor: 'rgba(167, 218, 219, 0.4)',
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 12px 32px rgba(167, 218, 219, 0.3)',
    '&::before': {
      left: '100%',
    },
    '& .persona-icon': {
      transform: 'scale(1.15) rotate(5deg)',
      filter: 'drop-shadow(0 0 20px rgba(167, 218, 219, 0.6))',
    },
  },
  '& .MuiSvgIcon-root': {
    fontSize: '3.5rem',
    color: theme.palette.primary.main,
    transition: 'all 0.3s ease',
  },
}));

const MetricCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: theme.spacing(1.2),
  padding: theme.spacing(2.4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.2),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.5s ease',
  },
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.04)',
    borderColor: 'rgba(167, 218, 219, 0.3)',
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(167, 218, 219, 0.2)',
    '&::after': {
      transform: 'scaleX(1)',
    },
    '& .metric-icon': {
      transform: 'scale(1.1) rotate(-5deg)',
      color: theme.palette.primary.light,
    },
  },
}));

const MetricValue = styled(Typography)(({ theme }) => ({
  fontSize: '2.75rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  fontFamily: theme.typography.h1.fontFamily,
  lineHeight: 1,
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.25rem',
  },
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main,
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
    background: theme.palette.primary.main,
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '3px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: '0 0 0 8px rgba(167, 218, 219, 0.16)',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-rail': {
    opacity: 0.3,
    backgroundColor: theme.palette.text.disabled,
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: theme.palette.primary.main,
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
}));

const BackButton = styled(Button)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.6),
  fontSize: '0.95rem',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  background: 'rgba(255, 255, 255, 0.02)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: theme.spacing(0.6),
  padding: `${theme.spacing(0.6)} ${theme.spacing(1.2)}`,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: theme.palette.text.primary,
    background: 'rgba(255, 255, 255, 0.04)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateX(-4px)',
  },
}));

const AccentText = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
}));

const AnimatedCounter = ({ value, format }: { value: number; format?: (v: number) => string }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepValue = value / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setDisplayValue(Math.round(stepValue * currentStep));
      
      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <>{format ? format(displayValue) : displayValue.toLocaleString()}</>;
};

interface ROICalculatorProps {
  onRevealNext: () => void;
}

type Persona = 'businessman' | 'educator' | 'student';

const PersonaSelector = ({ onSelect }: { onSelect: (persona: Persona) => void }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 4 }}>
    <Grow in={true} timeout={600}>
      <PersonaCard onClick={() => onSelect('businessman')}>
        <Business className="persona-icon" />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Business Leader</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
          Transform your workforce and unlock sustainable growth
        </Typography>
      </PersonaCard>
    </Grow>
    <Grow in={true} timeout={800}>
      <PersonaCard onClick={() => onSelect('educator')}>
        <School className="persona-icon" />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Educator</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
          Empower students with industry-ready skills
        </Typography>
      </PersonaCard>
    </Grow>
    <Grow in={true} timeout={1000}>
      <PersonaCard onClick={() => onSelect('student')}>
        <Person className="persona-icon" />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>Student/Professional</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
          Accelerate your career with future-ready skills
        </Typography>
      </PersonaCard>
    </Grow>
  </Box>
);

export default function ROICalculator({ onRevealNext }: ROICalculatorProps) {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [animateMetrics, setAnimateMetrics] = useState(false);
  
  // State for sliders
  const [teamSize, setTeamSize] = useState(50);
  const [studentCount, setStudentCount] = useState(500);
  const [currentSalary, setCurrentSalary] = useState(180000);



  // Add refs and inView hooks for animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const calculatorInView = useInView(calculatorRef, { once: true, amount: 0.2 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.3 });

  // Trigger animation when persona changes
  useEffect(() => {
    if (persona) {
      setAnimateMetrics(false);
      setTimeout(() => setAnimateMetrics(true), 300);
    }
  }, [persona]);

  // Business Metric Calculations
  const retentionSavings = Math.round(teamSize * 0.2 * 0.5 * 75000);
  const productivityBoost = Math.floor(teamSize * 2000 * 0.25);
  const aiRevenueLift = Math.round(teamSize * 10000);

  // Education Metric Calculations
  const employabilityBoost = Math.round(studentCount * 0.15);
  const fasterPlacement = 6;
  const industryPartnerships = Math.ceil(studentCount / 100);

  // Student Metric Calculations
  const salaryIncrease = Math.round(currentSalary * 0.22);
  const fasterPromotion = Math.round(18 * 0.35);
  const jobOpportunities = 5;

  const headlines: Record<Persona, string> = {
    businessman: 'Turn <strong>Talent</strong> into Your <strong>Greatest Financial Asset</strong>',
    educator: 'Forge the <strong>Future of Graduate Success</strong>',
    student: 'Engineer Your <strong>Career Trajectory</strong>',
  };

  const closingArguments: Record<Persona, string> = {
    businessman: `The data is clear: investing in your team is the most direct path to <strong>sustainable growth</strong>. Beyond the numbers, a culture of learning fosters <strong>unmatched loyalty</strong> and creates a <strong>resilient workforce</strong> ready to outmaneuver the competition. Let's build your competitive advantage, together.`,
    educator: `These numbers represent more than just statistics; they represent <strong>enhanced institutional prestige</strong> and a direct answer to the demands of the modern economy. By producing <strong>verifiably skilled graduates</strong>, you create a powerful flywheel of <strong>industry partnerships and top-tier student recruitment</strong>. Let's build the future of education, together.`,
    student: `Your career is your most valuable asset. The right skills don't just lead to a better salary; they unlock <strong>accelerated career paths</strong>, greater <strong>professional influence</strong>, and the freedom to pursue <strong>opportunities you're truly passionate about</strong>. Invest in yourself and take control of your future.`,
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <ROISection id="roi-calculator" ref={sectionRef}>
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
              <span style={{ color: 'white' }}>Calculate Your</span> <AccentText>ROI</AccentText>
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
              Your goals are <AccentText>unique</AccentText>. Your data should be too. Select the role
              that best describes you to unlock a
              <AccentText> personalized impact analysis</AccentText>.
            </Typography>
          </motion.div>
        </SectionHeader>

        <CalculatorWrapper elevation={0} ref={calculatorRef}>
          <AnimatePresence mode="wait">
            {!persona ? (
              <motion.div
                key="selector"
                initial={{ opacity: 0, y: 20 }}
                animate={calculatorInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <PersonaSelector onSelect={setPersona} />
              </motion.div>
            ) : (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, y: 20 }}
                animate={calculatorInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 3, flexWrap: 'wrap' }}>
                      <Typography 
                        variant="h3" 
                        sx={{ 
                          fontSize: { xs: '1.75rem', md: '2.25rem', lg: '2.5rem' },
                          flexGrow: 1,
                          lineHeight: 1.3
                        }}
                        dangerouslySetInnerHTML={{ __html: headlines[persona] }}
                      />
                      <BackButton onClick={() => setPersona(null)}>
                        <ArrowBack sx={{ fontSize: '1rem' }} />
                        <span>Change Persona</span>
                      </BackButton>
                    </Box>
                  </motion.div>

                  {persona === 'businessman' && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                      >
                        <Box>
                          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                            How large is your team?
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <StyledSlider
                              value={teamSize}
                              onChange={(_, value) => setTeamSize(value as number)}
                              min={10}
                              max={1000}
                              step={10}
                              valueLabelDisplay="auto"
                              sx={{ flexGrow: 1 }}
                            />
                            <Typography 
                              variant="h4" 
                              sx={{ 
                                minWidth: 120, 
                                textAlign: 'right', 
                                fontWeight: 700,
                                color: 'primary.main' 
                              }}
                            >
                              {teamSize}
                            </Typography>
                          </Box>
                        </Box>
                      </motion.div>
                      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                        >
                          <Grow in={animateMetrics} timeout={600}>
                            <MetricCard elevation={0}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Savings className="metric-icon" sx={{ fontSize: 40, transition: 'all 0.3s ease' }} />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>Turnover Costs Saved</Typography>
                              </Box>
                              <MetricValue>
                                <AnimatedCounter value={retentionSavings} format={formatCurrency} />
                              </MetricValue>
                              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                Annually, by cutting attrition in half through targeted upskilling.
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.disabled', mt: 1, display: 'block' }}>
                                Based on Gallup and LinkedIn Learning data on employee replacement costs.
                              </Typography>
                            </MetricCard>
                          </Grow>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                        >
                          <Grow in={animateMetrics} timeout={800}>
                            <MetricCard elevation={0}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Speed className="metric-icon" sx={{ fontSize: 40, transition: 'all 0.3s ease' }} />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>Productivity Hours Gained</Typography>
                              </Box>
                              <MetricValue>
                                +<AnimatedCounter value={productivityBoost} />
                              </MetricValue>
                              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                Per year, from a more efficient and capable workforce.
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.disabled', mt: 1, display: 'block' }}>
                                Based on ATD findings on productivity increases from effective training.
                              </Typography>
                            </MetricCard>
                          </Grow>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                        >
                          <Grow in={animateMetrics} timeout={1000}>
                            <MetricCard elevation={0}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <AutoGraph className="metric-icon" sx={{ fontSize: 40, transition: 'all 0.3s ease' }} />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>AI-Driven Revenue Lift</Typography>
                              </Box>
                              <MetricValue>
                                <AnimatedCounter value={aiRevenueLift} format={formatCurrency} />
                              </MetricValue>
                              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                Potential annual gain by equipping your team with strategic AI skills.
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.disabled', mt: 1, display: 'block' }}>
                                Modeled on McKinsey &amp; Accenture reports on AI adoption and revenue growth.
                              </Typography>
                            </MetricCard>
                          </Grow>
                        </motion.div>
                      </Box>
                    </>
                  )}

                  {persona === 'educator' && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                      >
                        <Box>
                          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                            How many students do you serve?
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <StyledSlider
                              value={studentCount}
                              onChange={(_, value) => setStudentCount(value as number)}
                              min={100}
                              max={10000}
                              step={100}
                              valueLabelDisplay="auto"
                              sx={{ flexGrow: 1 }}
                            />
                            <Typography 
                              variant="h4" 
                              sx={{ 
                                minWidth: 120, 
                                textAlign: 'right', 
                                fontWeight: 700,
                                color: 'primary.main' 
                              }}
                            >
                              {studentCount}
                            </Typography>
                          </Box>
                        </Box>
                      </motion.div>
                      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                        >
                          <Grow in={animateMetrics} timeout={600}>
                            <MetricCard elevation={0}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <WorkspacePremium className="metric-icon" sx={{ fontSize: 40, transition: 'all 0.3s ease' }} />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>Employability Boost</Typography>
                              </Box>
                              <MetricValue>+{employabilityBoost}</MetricValue>
                              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                More students placed in top-tier roles with targeted skills.
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.disabled', mt: 1, display: 'block' }}>
                                Based on NASSCOM data on skill-based hiring preferences.
                              </Typography>
                            </MetricCard>
                          </Grow>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                        >
                          <Grow in={animateMetrics} timeout={800}>
                            <MetricCard elevation={0}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <AccessTime className="metric-icon" sx={{ fontSize: 40, transition: 'all 0.3s ease' }} />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>Faster Time-to-Placement</Typography>
                              </Box>
                              <MetricValue>-{fasterPlacement} mo</MetricValue>
                              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                Reduction in average job search duration.
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.disabled', mt: 1, display: 'block' }}>
                                Analysis of placement data from leading technical institutions.
                              </Typography>
                            </MetricCard>
                          </Grow>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                        >
                          <Grow in={animateMetrics} timeout={1000}>
                            <MetricCard elevation={0}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Handshake className="metric-icon" sx={{ fontSize: 40, transition: 'all 0.3s ease' }} />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>Industry Partnerships</Typography>
                              </Box>
                              <MetricValue>+{industryPartnerships}</MetricValue>
                              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                New corporate connections through skill-verified graduates.
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.disabled', mt: 1, display: 'block' }}>
                                Based on industry-academia collaboration trends.
                              </Typography>
                            </MetricCard>
                          </Grow>
                        </motion.div>
                      </Box>
                    </>
                  )}

                  {persona === 'student' && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                      >
                        <Box>
                          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                            What&apos;s your current monthly salary?
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <StyledSlider
                              value={currentSalary}
                              onChange={(_, value) => setCurrentSalary(value as number)}
                              min={15000}
                              max={500000}
                              step={5000}
                              valueLabelDisplay="auto"
                              valueLabelFormat={(value) => `₹${(value/1000).toFixed(0)}k`}
                              sx={{ flexGrow: 1 }}
                            />
                            <Typography 
                              variant="h4" 
                              sx={{ 
                                minWidth: 140, 
                                textAlign: 'right', 
                                fontWeight: 700,
                                color: 'primary.main' 
                              }}
                            >
                              {formatCurrency(currentSalary)}
                            </Typography>
                          </Box>
                        </Box>
                      </motion.div>
                      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                        >
                          <Grow in={animateMetrics} timeout={600}>
                            <MetricCard elevation={0}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <MonetizationOn className="metric-icon" sx={{ fontSize: 40, transition: 'all 0.3s ease' }} />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>Potential Salary Increase</Typography>
                              </Box>
                              <MetricValue>
                                +<AnimatedCounter value={salaryIncrease} format={formatCurrency} />
                              </MetricValue>
                              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                Average increase with specialized skill certification.
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.disabled', mt: 1, display: 'block' }}>
                                Based on salary surveys from Glassdoor and LinkedIn.
                              </Typography>
                            </MetricCard>
                          </Grow>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                        >
                          <Grow in={animateMetrics} timeout={800}>
                            <MetricCard elevation={0}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Timeline className="metric-icon" sx={{ fontSize: 40, transition: 'all 0.3s ease' }} />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>Faster Career Growth</Typography>
                              </Box>
                              <MetricValue>{fasterPromotion} mo</MetricValue>
                              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                Earlier promotion compared to traditional career paths.
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.disabled', mt: 1, display: 'block' }}>
                                Analysis of tech career progression data.
                              </Typography>
                            </MetricCard>
                          </Grow>
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                        >
                          <Grow in={animateMetrics} timeout={1000}>
                            <MetricCard elevation={0}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Groups className="metric-icon" sx={{ fontSize: 40, transition: 'all 0.3s ease' }} />
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>New Opportunities</Typography>
                              </Box>
                              <MetricValue>{jobOpportunities}x</MetricValue>
                              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                More job opportunities with verified skills portfolio.
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.disabled', mt: 1, display: 'block' }}>
                                Based on hiring platform data for skilled professionals.
                              </Typography>
                            </MetricCard>
                          </Grow>
                        </motion.div>
                      </Box>
                    </>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                  >
                    <Fade in={animateMetrics} timeout={1200}>
                      <Box sx={{ 
                        mt: 4, 
                        p: 4, 
                        background: 'rgba(167, 218, 219, 0.05)',
                        borderRadius: 2,
                        border: '1px solid rgba(167, 218, 219, 0.2)'
                      }}>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            fontSize: '1.125rem',
                            lineHeight: 1.8,
                            color: 'text.secondary'
                          }}
                          dangerouslySetInnerHTML={{ __html: closingArguments[persona] }}
                        />
                      </Box>
                    </Fade>
                  </motion.div>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </CalculatorWrapper>

        <Box 
          ref={ctaRef}
          sx={{ 
            textAlign: 'left', 
            mt: 8,
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
              Ready to <AccentText>transform</AccentText> your future?
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, alignItems: { xs: 'stretch', sm: 'flex-start' } }}>
              <Button
                variant="contained"
                size="large"
                onClick={onRevealNext}
                endIcon={<Handshake aria-hidden="true" className="icon-anim icon-float" />}
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
                }}>
                Who we Partner with
              </Button>
              
              <Link href="/contact" passHref style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  size="large"
                  endIcon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>}
                  sx={{
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    padding: { xs: '12px 20px', sm: '12px 24px' },
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 1,
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: '#ffffff',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(167, 218, 219, 0.3)',
                      borderColor: 'primary.main',
                    },
                  }}>
                  Schedule a Demo
                </Button>
              </Link>
            </Box>
          </motion.div>
        </Box>
      </Container>


    </ROISection>
  );
}
