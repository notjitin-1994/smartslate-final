'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, Paper, Fade, Grow, Collapse, Avatar } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import {
  AccountBalance,
  Shield,
  Extension,
  TrendingUp,
  ArrowForward,
  Hub,
  Group,
  School,
  Work,
  Timeline,
  AddCircle,
  RemoveCircle,
} from '@mui/icons-material';
import {
  Section,
  GridLayout,
  LeftPanel,
  SectionButton,
  ContentCard,
  DataVisualization,
  StatCard,
  StatNumber,
  AccentText,
  ProgressBar,
  MobileAccordionWrapper,
  MobileAccordionSection,
  MobileAccordionButton,
  MobileAccordionHeader,
  MobileAccordionIcon,
  MobileAccordionToggle,
  MobileAccordionContent,
} from './styles/LandingStyles';

interface TalentParadoxProps {
  onRevealNext: () => void;
}

type SectionId = 'economic' | 'employability' | 'skills' | 'opportunity';

interface DataPoint {
  label: string;
  value: string;
  icon: React.ElementType;
  trend?: 'up' | 'down';
}

const sectionData: Record<SectionId, DataPoint[]> = {
  economic: [
    { label: 'GDP Impact', value: '$1.2T', icon: AccountBalance, trend: 'down' },
    { label: 'Lost Productivity', value: '30%', icon: TrendingUp, trend: 'down' },
    { label: 'Growth at Risk', value: '2.5%', icon: Timeline, trend: 'down' },
  ],
  employability: [
    { label: 'Graduates Yearly', value: '6.5M', icon: School },
    { label: 'Industry Ready', value: '25%', icon: Work, trend: 'down' },
    { label: 'Skills Gap', value: '75%', icon: Shield, trend: 'up' },
  ],
  skills: [
    { label: 'Skill Lifecycle', value: '2.5yrs', icon: Timeline, trend: 'down' },
    { label: 'Reskilling Need', value: '40%', icon: Extension, trend: 'up' },
    { label: 'Digital Skills Gap', value: '56%', icon: TrendingUp, trend: 'up' },
  ],
  opportunity: [
    { label: 'Learning Intent', value: '94%', icon: School, trend: 'up' },
    { label: 'Self-Learners', value: '67%', icon: Group, trend: 'up' },
    { label: 'Career Growth', value: '3.2x', icon: TrendingUp, trend: 'up' },
  ],
};

const sections = [
  {
    id: 'economic' as SectionId,
    label: 'The Economic Equation',
    icon: AccountBalance,
    title: 'The Economic Equation: A Nation\'s Potential on the Line',
    description: 'The talent paradox isn\'t just an abstract challenge; it\'s a direct threat to our economic momentum. When a nation\'s workforce can\'t keep pace with digital transformation, the cost is measured in lost growth and missed opportunities.',
  },
  {
    id: 'employability' as SectionId,
    label: 'The Employability Crisis',
    icon: Shield,
    title: 'The Employability Crisis: The Gap Between Campus and Career',
    description: 'The root of the economic risk lies in a fundamental disconnect between education and industry. We have thousands or more of graduates, but are they truly ready for the modern workplace?',
  },
  {
    id: 'skills' as SectionId,
    label: 'Critical Skills Shift',
    icon: Extension,
    title: 'The Moving Target of Talent',
    description: 'The skills that defined a valuable employee yesterday are quickly becoming obsolete. By 2030, the very definition of "core skill" will be transformed.',
  },
  {
    id: 'opportunity' as SectionId,
    label: 'Hidden Opportunity',
    icon: TrendingUp,
    title: 'The Solution Lies Within Your Organization',
    description: 'Here is the most hopeful part of the paradox. The desire to adapt is already there. Your future leaders and innovators aren\'t waiting to be told; they are actively seeking ways to stay relevant.',
  },
];

export default function TalentParadox({ onRevealNext }: TalentParadoxProps) {
  const [activeSection, setActiveSection] = useState<SectionId>('economic');
  const [animateData, setAnimateData] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [mobileRevealed, setMobileRevealed] = useState<Partial<Record<SectionId, boolean>>>({
    economic: true, // Default expanded
  });
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { 
    once: true, 
    amount: 0.2,
    margin: "-100px 0px -100px 0px"
  });
  const activeSectionData = sections.find(s => s.id === activeSection);
  const activeData = sectionData[activeSection];

  useEffect(() => {
    if (inView) {
      setIsInView(true);
    }
  }, [inView]);

  useEffect(() => {
    setAnimateData(false);
    const timer = setTimeout(() => setAnimateData(true), 100);
    return () => clearTimeout(timer);
  }, [activeSection]);

  const toggleMobile = (section: SectionId) => {
    setMobileRevealed(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const formatTitle = (title: string) => {
    const patterns = [
      'Economic Equation',
      'Employability Crisis',
      'Moving Target of Talent',
      'Solution Lies Within Your Organization'
    ];
    
    let formattedTitle = title;
    patterns.forEach(pattern => {
      formattedTitle = formattedTitle.replace(pattern, `<span class="accent">${pattern}</span>`);
    });
    
    return formattedTitle;
  };

  return (
    <Section ref={sectionRef}>
      <Container maxWidth="lg">
        <GridLayout>
          <LeftPanel>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Box sx={{ mb: 6 }}>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    mb: 3, 
                    fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                    lineHeight: 1.2,
                    color: 'white'
                  }}
                >
                  India&apos;s <AccentText>Talent Paradox</AccentText>: Bridging the{' '}
                  <AccentText>Billion-Person Opportunity Gap</AccentText>
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary', 
                    fontSize: '1.125rem',
                    lineHeight: 1.8
                  }}
                >
                  India&apos;s potential is a force of nature. But this immense human capital is facing a
                  widening chasm between aspiration and reality. This isn&apos;t just a challenge; it&apos;s a
                  multi-trillion-dollar crisis of scale. Let&apos;s break it down.
                </Typography>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ 
                      duration: 0.5, 
                      ease: "easeOut", 
                      delay: 0.4 + (index * 0.1) 
                    }}
                  >
                    <SectionButton
                      active={activeSection === section.id}
                      onClick={() => setActiveSection(section.id)}
                    >
                      <section.icon />
                      <span>{section.label}</span>
                    </SectionButton>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </LeftPanel>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          >
            <Box sx={{ minHeight: 550, position: 'relative' }}>
              {activeSectionData && (
                <Fade in={true} timeout={300}>
                  <ContentCard elevation={0}>
                  <Typography
                    variant="h3"
                    sx={{ 
                      mb: 3, 
                      fontSize: { xs: '1.5rem', md: '1.875rem', lg: '2.25rem' },
                      lineHeight: 1.3
                    }}
                    dangerouslySetInnerHTML={{ __html: formatTitle(activeSectionData.title) }}
                  />
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 4, 
                      color: 'text.secondary', 
                      fontSize: '1.125rem',
                      lineHeight: 1.8
                    }}
                  >
                    {activeSectionData.description}
                  </Typography>
                  
                  <DataVisualization>
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: 3 
                      }}>
                        {activeData.map((data, index) => (
                          <Grow 
                            in={animateData} 
                            timeout={300 + (index * 100)}
                            key={data.label}
                          >
                            <StatCard>
                              <data.icon 
                                sx={{ 
                                  fontSize: 40, 
                                  color: 'primary.main',
                                  mb: 2 
                                }} 
                              />
                              <StatNumber variant="h3">{data.value}</StatNumber>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: 'text.secondary',
                                  fontSize: '0.875rem' 
                                }}
                              >
                                {data.label}
                              </Typography>
                            </StatCard>
                          </Grow>
                        ))}
                      </Box>
                      
                      {activeSection === 'skills' && (
                        <Box sx={{ mt: 4 }}>
                          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                            Skills Relevance Timeline
                          </Typography>
                          <ProgressBar value={75} />
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            mt: 1 
                          }}>
                            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                              Today
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                              2.5 Years
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </DataVisualization>
                </ContentCard>
              </Fade>
            )}
          </Box>
            </motion.div>
        </GridLayout>

        {/* Mobile Accordion View */}
        <MobileAccordionWrapper>
          {/* Mobile Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Box sx={{ mb: 6, textAlign: 'left' }}>
              <Typography 
                variant="h2" 
                sx={{ 
                  mb: 3, 
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  lineHeight: 1.2,
                  color: 'white'
                }}
              >
                India&apos;s <AccentText>Talent Paradox</AccentText>: Bridging the{' '}
                <AccentText>Billion-Person Opportunity Gap</AccentText>
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'text.secondary', 
                  fontSize: '1.125rem',
                  lineHeight: 1.8
                }}
              >
                India&apos;s potential is a force of nature. But this immense human capital is facing a
                widening chasm between aspiration and reality. This isn&apos;t just a challenge; it&apos;s a
                multi-trillion-dollar crisis of scale. Let&apos;s break it down.
              </Typography>
            </Box>
          </motion.div>
          
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut", 
                delay: 0.2 + (index * 0.1) 
              }}
            >
              <MobileAccordionSection>
              <MobileAccordionButton
                revealed={mobileRevealed[section.id]}
                onClick={() => toggleMobile(section.id)}
              >
                <MobileAccordionHeader>
                  <MobileAccordionIcon className="section-icon">
                    <section.icon />
                  </MobileAccordionIcon>
                  <Box>
                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 700 }}>
                      {section.label}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {section.title}
                    </Typography>
                  </Box>
                </MobileAccordionHeader>
                <MobileAccordionToggle sx={{ transform: mobileRevealed[section.id] ? 'rotate(45deg)' : 'rotate(0)' }}>
                  <AddCircle />
                </MobileAccordionToggle>
              </MobileAccordionButton>
              <Collapse in={mobileRevealed[section.id]} timeout={500}>
                <MobileAccordionContent>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 4, 
                      color: 'text.secondary', 
                      fontSize: '1rem',
                      lineHeight: 1.7
                    }}
                  >
                    {section.description}
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: 2,
                    mb: 3
                  }}>
                    {sectionData[section.id].map((data, index) => (
                      <Box
                        key={data.label}
                        sx={{
                          textAlign: 'center',
                          padding: 2,
                          background: 'rgba(0, 0, 0, 0.2)',
                          borderRadius: 1,
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                        }}
                      >
                        <data.icon 
                          sx={{ 
                            fontSize: 32, 
                            color: 'primary.main',
                            mb: 1 
                          }} 
                        />
                        <Typography variant="h6" sx={{ fontSize: '1.25rem', fontWeight: 700, color: 'primary.main', mb: 0.5 }}>
                          {data.value}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                          {data.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  
                  {section.id === 'skills' && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        Skills Relevance Timeline
                      </Typography>
                      <ProgressBar value={75} />
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        mt: 1 
                      }}>
                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                          Today
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                          2.5 Years
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </MobileAccordionContent>
              </Collapse>
            </MobileAccordionSection>
            </motion.div>
          ))}
        </MobileAccordionWrapper>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
        >
          <Box sx={{ 
            textAlign: 'left', 
            mt: 10, 
            pt: 6, 
            borderTop: '1px solid rgba(167, 218, 219, 0.1)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100px',
              height: '2px',
              background: 'linear-gradient(90deg, var(--primary-accent), var(--secondary-accent))',
            }
          }}>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 3, 
                fontSize: { xs: '1.75rem', md: '2.25rem', lg: '2.5rem' } 
              }}
            >
              Your <AccentText>Workforce is Ready to Evolve</AccentText>
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 5, 
                color: 'text.secondary', 
                fontSize: '1.25rem',
                lineHeight: 1.8 
              }}
            >
              Understanding the problem is the first step. Solving it is the next. Smartslate is
              designed to be the bridge across this divide—connecting motivated talent with the
              future-focused skills your company needs to thrive.
            </Typography>
            
            <Button
              variant="contained"
              size="large"
              onClick={onRevealNext}
              endIcon={<Hub aria-hidden="true" className="icon-anim icon-float" />}
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
              Discover our Framework
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Section>
  );
}
