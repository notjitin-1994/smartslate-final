'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Paper, Fade, Grow } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  AccountBalance,
  Shield,
  Extension,
  TrendingUp,
  ArrowForward,
  Group,
  School,
  Work,
  Timeline,
} from '@mui/icons-material';

const Section = styled(Box)(({ theme }) => ({
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

const GridLayout = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '0.8fr 1.2fr',
  gap: theme.spacing(6),
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(4),
  },
}));

const LeftPanel = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: `calc(100px + ${theme.spacing(4)})`,
  alignSelf: 'start',
  [theme.breakpoints.down('lg')]: {
    position: 'static',
    top: 'auto',
  },
}));

const SectionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>(({ theme, active }) => ({
  position: 'relative',
  background: active
    ? 'linear-gradient(135deg, rgba(167, 218, 219, 0.15), rgba(79, 70, 229, 0.1))'
    : 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: `1px solid ${active ? 'rgba(167, 218, 219, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
  borderLeft: `4px solid ${active ? theme.palette.primary.main : 'transparent'}`,
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  padding: `${theme.spacing(2.5)} ${theme.spacing(3)}`,
  borderRadius: theme.spacing(1.5),
  textAlign: 'left',
  fontSize: '1rem',
  fontWeight: active ? 600 : 500,
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2.5),
  width: '100%',
  justifyContent: 'flex-start',
  textTransform: 'none',
  overflow: 'hidden',
  boxShadow: active ? '0 8px 24px rgba(167, 218, 219, 0.25)' : 'none',
  transform: active ? 'translateX(8px) scale(1.02)' : 'translateX(0) scale(1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: -100,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(167, 218, 219, 0.1), transparent)',
    transition: 'left 0.5s ease',
  },
  '&:hover': {
    backgroundColor: 'rgba(167, 218, 219, 0.08)',
    borderColor: 'rgba(167, 218, 219, 0.5)',
    color: theme.palette.text.primary,
    transform: 'translateX(4px)',
    boxShadow: '0 4px 16px rgba(167, 218, 219, 0.2)',
    '&::before': {
      left: '100%',
    },
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.75rem',
    color: active ? theme.palette.primary.main : theme.palette.secondary.main,
    transform: active ? 'scale(1.15) rotate(5deg)' : 'scale(1)',
    filter: active ? 'drop-shadow(0 0 12px rgba(167, 218, 219, 0.6))' : 'none',
    transition: 'all 0.3s ease',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '0.875rem',
    padding: `${theme.spacing(1.5)} ${theme.spacing(2)}`,
  },
}));

const ContentCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  borderRadius: theme.spacing(2.5),
  padding: theme.spacing(6),
  border: '1px solid rgba(255, 255, 255, 0.08)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -50,
    right: -50,
    width: 100,
    height: 100,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(167, 218, 219, 0.2), transparent)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.3)',
    '&::before': {
      transform: 'scaleX(1)',
    },
    '&::after': {
      opacity: 1,
    },
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4),
  },
}));

const DataVisualization = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  background: 'rgba(0, 0, 0, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  position: 'relative',
  minHeight: 350,
  [theme.breakpoints.down('md')]: {
    minHeight: 250,
    padding: theme.spacing(2),
  },
}));

const StatCard = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.02)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(255, 255, 255, 0.08)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px) scale(1.05)',
    background: 'rgba(255, 255, 255, 0.04)',
    boxShadow: '0 8px 24px rgba(167, 218, 219, 0.2)',
  },
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const AccentText = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
}));

const ProgressBar = styled(Box)<{ value: number }>(({ theme, value }) => ({
  width: '100%',
  height: 12,
  borderRadius: theme.spacing(1),
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  overflow: 'hidden',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: `${value}%`,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: theme.spacing(1),
    transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
  },
}));

interface TalentParadoxProps {
  onRevealNext: () => void;
}

type SectionId = 'economic' | 'employability' | 'skills' | 'opportunity';

interface DataPoint {
  label: string;
  value: string;
  icon: any;
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
    description: 'The root of the economic risk lies in a fundamental disconnect between education and industry. We have millions of graduates, but are they truly ready for the modern workplace?',
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
    title: 'Your Workforce is Ready to Evolve',
    description: 'Here is the most hopeful part of the paradox. The desire to adapt is already there. Your future leaders and innovators aren\'t waiting to be told; they are actively seeking ways to stay relevant.',
  },
];

export default function TalentParadox({ onRevealNext }: TalentParadoxProps) {
  const [activeSection, setActiveSection] = useState<SectionId>('economic');
  const [animateData, setAnimateData] = useState(false);
  const activeSectionData = sections.find(s => s.id === activeSection);
  const activeData = sectionData[activeSection];

  useEffect(() => {
    setAnimateData(false);
    const timer = setTimeout(() => setAnimateData(true), 100);
    return () => clearTimeout(timer);
  }, [activeSection]);

  const formatTitle = (title: string) => {
    const patterns = [
      'Economic Equation',
      'Employability Crisis',
      'Moving Target of Talent',
      'Workforce is Ready to Evolve'
    ];
    
    let formattedTitle = title;
    patterns.forEach(pattern => {
      formattedTitle = formattedTitle.replace(pattern, `<span class="accent">${pattern}</span>`);
    });
    
    return formattedTitle;
  };

  return (
    <Section>
      <Container maxWidth="lg">
        <GridLayout>
          <LeftPanel>
            <Box sx={{ mb: 6 }}>
              <Typography 
                variant="h2" 
                sx={{ 
                  mb: 3, 
                  fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
                  lineHeight: 1.2 
                }}
              >
                India's <AccentText>Talent Paradox</AccentText>: Bridging the{' '}
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
                India's potential is a force of nature. But this immense human capital is facing a
                widening chasm between aspiration and reality. This isn't just a challenge; it's a
                multi-trillion-dollar crisis of scale. Let's break it down.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {sections.map((section) => (
                <SectionButton
                  key={section.id}
                  active={activeSection === section.id}
                  onClick={() => setActiveSection(section.id)}
                >
                  <section.icon />
                  <span>{section.label}</span>
                </SectionButton>
              ))}
            </Box>
          </LeftPanel>

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
                                  color: data.trend === 'down' ? 'error.main' : 'primary.main',
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
        </GridLayout>

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
              maxWidth: '65ch',
              fontSize: '1.25rem',
              lineHeight: 1.8 
            }}
          >
            Understanding the problem is the first step. Solving it is the next. SmartSlate is
            designed to be the bridge across this divide—connecting motivated talent with the
            future-focused skills your company needs to thrive.
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            onClick={onRevealNext}
            endIcon={<ArrowForward />}
            sx={{
              backgroundColor: 'secondary.main',
              color: '#ffffff',
              padding: '12px 32px',
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
            Discover our Framework
          </Button>
        </Box>
      </Container>
    </Section>
  );
}