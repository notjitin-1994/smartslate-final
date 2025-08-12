'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  CheckCircle,
  Star,
  AccessTime,
  Group,
  School,
  Business,
  Book,
} from '@mui/icons-material';

const Section = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(10)} 0`,
  backgroundColor: 'transparent',
  position: 'relative',
  overflow: 'hidden',
}));

const MetricsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: theme.spacing(4),
  marginBottom: theme.spacing(8),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: theme.spacing(3),
  },
}));

const MetricCard = styled(Paper, {
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

const TestimonialCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.08), rgba(79, 70, 229, 0.04))',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '2px solid rgba(167, 218, 219, 0.2)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(6),
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const StatsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: theme.spacing(3),
  },
}));

const StatCard = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&:hover': {
    background: 'rgba(167, 218, 219, 0.04)',
    borderColor: 'rgba(167, 218, 219, 0.3)',
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 24px rgba(167, 218, 219, 0.12)',
  },
}));

interface Metric {
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: React.ReactElement;
  color: string;
}

const metrics: Metric[] = [
  {
    value: 87,
    suffix: '%',
    label: 'Course Completion',
    description: 'Industry average completion rate for online courses',
    color: '#10b981',
    icon: <CheckCircle />,
  },
  {
    value: 4.6,
    suffix: '/5',
    label: 'Student Rating',
    description: 'Average rating for quality online learning platforms',
    color: '#f59e0b',
    icon: <Star />,
  },
  {
    value: 8.5,
    suffix: 'hrs',
    label: 'Avg. Learning Time',
    description: 'Typical time investment per course module',
    color: '#3b82f6',
    icon: <AccessTime />,
  },
  {
    value: 180,
    suffix: 'M+',
    label: 'Global Learners',
    description: 'Worldwide online education market size',
    color: '#8b5cf6',
    icon: <Group />,
  },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 50;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <Typography
      variant="h3"
      component="span"
      sx={{
        fontWeight: 700,
        background: 'linear-gradient(135deg, #a7dadb, #4F46E5)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: { xs: '2rem', md: '2.5rem' },
      }}
    >
      {suffix === '/5' ? count.toFixed(1) : count}
      {suffix}
    </Typography>
  );
}

export default function ImpactMetrics() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Section ref={ref}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Box sx={{ textAlign: 'left', mb: 8 }}>
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                letterSpacing: 1,
                mb: 2,
                display: 'block',
              }}
            >
              Our Impact
            </Typography>
            
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3rem', lg: '3.5rem' },
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                color: 'white',
              }}
            >
              The <Box component="span" sx={{ color: 'primary.main' }}>Impact</Box> We Create
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                color: 'primary.main',
                fontWeight: 300,
                maxWidth: '800px',
                lineHeight: 1.8,
                fontSize: '1.25rem',
              }}
            >
              Real results from our innovative learning platform, designed to transform education and empower learners
            </Typography>
          </Box>
        </motion.div>

        {/* Metrics Grid */}
        <MetricsGrid>
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            >
                                            <motion.div
                 whileHover={{ y: -8, scale: 1.02 }}
                 transition={{ duration: 0.3 }}
               >
                 <MetricCard active={false}>
                   <Box sx={{ textAlign: 'left' }}>
                                        {/* Icon */}
                   <Box
                     sx={{
                       width: 64,
                       height: 64,
                       borderRadius: 2,
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       mb: 3,
                       background: `linear-gradient(135deg, ${metric.color}20, ${metric.color}10)`,
                       color: metric.color,
                     }}
                   >
                     {metric.icon}
                   </Box>

                     {/* Counter */}
                     <Box sx={{ mb: 2 }}>
                       <AnimatedCounter value={metric.value} suffix={metric.suffix} inView={inView} />
                     </Box>

                                        {/* Label */}
                   <Typography
                     variant="h4"
                     sx={{
                       fontWeight: 700,
                       mb: 1,
                       color: 'text.primary',
                       fontSize: { xs: '1.5rem', md: '1.75rem' },
                     }}
                   >
                     {metric.label}
                   </Typography>

                   {/* Description */}
                   <Typography
                     variant="body2"
                     sx={{
                       color: 'text.secondary',
                       lineHeight: 1.6,
                       fontSize: '1rem',
                     }}
                   >
                     {metric.description}
                   </Typography>
                   </Box>
                 </MetricCard>
               </motion.div>
            </motion.div>
          ))}
        </MetricsGrid>

        {/* Testimonial Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <TestimonialCard>
            <Box sx={{ position: 'relative' }}>
              {/* Quote Icon */}
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 4,
                  background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.2), rgba(79, 70, 229, 0.1))',
                  color: 'primary.main',
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 300 }}>"</Typography>
              </Box>

              {/* Testimonial Content */}
                             <Typography
                 variant="body1"
                 sx={{
                   fontStyle: 'italic',
                   mb: 4,
                   lineHeight: 1.7,
                   color: 'text.primary',
                   fontSize: '0.95rem',
                 }}
               >
                 &quot;The future of education is digital, and platforms like SmartSlate are leading the transformation. Our research shows that personalized, AI-driven learning experiences can improve completion rates by up to 40% compared to traditional methods.&quot;
               </Typography>

              {/* Author */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.3), rgba(79, 70, 229, 0.2))',
                    color: 'primary.main',
                    fontWeight: 600,
                  }}
                >
                                     BR
                </Avatar>
                <Box>
                                     <Typography
                     variant="h6"
                     sx={{
                       fontWeight: 600,
                       color: 'primary.main',
                     }}
                   >
                     Mr Bharat Ravindranath
                   </Typography>
                   <Typography
                     variant="body2"
                     sx={{
                       color: 'text.secondary',
                     }}
                   >
                     Founder, The Bangalore Editorial
                   </Typography>
                </Box>
              </Box>
            </Box>
          </TestimonialCard>
        </motion.div>

        {/* Startup Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Box sx={{ mt: 8 }}>
                         <Box sx={{ textAlign: 'left', mb: 6 }}>
               <Typography
                 variant="h3"
                 sx={{
                   fontWeight: 700,
                   mb: 2,
                   color: 'text.primary',
                   fontSize: { xs: '2rem', md: '2.5rem' },
                 }}
               >
                 Growing Together
               </Typography>
               <Typography
                 variant="body1"
                 sx={{
                   color: 'text.secondary',
                   fontWeight: 300,
                   fontSize: '1.25rem',
                   lineHeight: 1.8,
                 }}
               >
                 Join us on our journey to transform education
               </Typography>
             </Box>

            <StatsGrid>
                             {[
                 { icon: <School />, value: '92M+', label: 'Global Students', color: '#10b981' },
                 { icon: <Business />, value: '$350B+', label: 'Market Value', color: '#3b82f6' },
                 { icon: <Book />, value: '45%', label: 'Growth Rate', color: '#8b5cf6' },
               ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                                     <motion.div
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     transition={{ duration: 0.2 }}
                   >
                                          <StatCard>
                       <Box
                         sx={{
                           width: 48,
                           height: 48,
                           borderRadius: 2,
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           mb: 2,
                           background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`,
                           color: stat.color,
                         }}
                       >
                         {stat.icon}
                       </Box>
                                            <Typography
                       variant="h4"
                       sx={{
                         fontWeight: 700,
                         mb: 1,
                         background: `linear-gradient(135deg, ${stat.color}, ${stat.color}80)`,
                         backgroundClip: 'text',
                         WebkitBackgroundClip: 'text',
                         WebkitTextFillColor: 'transparent',
                         fontSize: { xs: '1.5rem', md: '1.75rem' },
                       }}
                     >
                       {stat.value}
                     </Typography>
                     <Typography
                       variant="body2"
                       sx={{
                         color: 'text.secondary',
                         fontWeight: 500,
                         fontSize: '1rem',
                       }}
                     >
                       {stat.label}
                     </Typography>
                     </StatCard>
                   </motion.div>
                </motion.div>
              ))}
            </StatsGrid>
          </Box>
        </motion.div>
      </Container>
    </Section>
  );
}