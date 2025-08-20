'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Box, Typography, Avatar, Rating } from '@mui/material';
import { 
  SectionTitle, 
  SectionSubtitle, 
  MetricsGrid, 
  StatsGrid,
  MetricCard,
  TestimonialCard,
  MetricValue,
  MetricTitle,
  CardDescription,
  ResponsiveContainer
} from './styles/DifferenceStyles';
import { impactMetricsData, testimonialsData, animationConfig } from '@/lib/data/differencePage';

// ============================================================================
// METRIC CARD COMPONENT
// ============================================================================

interface MetricCardProps {
  metric: typeof impactMetricsData[0];
  isActive: boolean;
  onClick: () => void;
}

function MetricCardComponent({ metric, isActive, onClick }: MetricCardProps) {
  return (
    <MetricCard active={isActive} onClick={onClick}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{ fontSize: '2rem' }}>
          {metric.icon}
        </Box>
        <Box sx={{ flex: 1 }}>
          <MetricValue>
            {metric.value}{metric.unit}
          </MetricValue>
          <MetricTitle>
            {metric.title}
          </MetricTitle>
        </Box>
        {metric.trend && (
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: metric.trend === 'up' ? 'success.main' : 'error.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              color: 'white'
            }}
          >
            {metric.trend === 'up' ? '↗' : '↘'}
          </Box>
        )}
      </Box>
      <CardDescription>
        {metric.description}
      </CardDescription>
    </MetricCard>
  );
}

// ============================================================================
// TESTIMONIAL CARD COMPONENT
// ============================================================================

interface TestimonialCardProps {
  testimonial: typeof testimonialsData[0];
}

function TestimonialCardComponent({ testimonial }: TestimonialCardProps) {
  return (
    <TestimonialCard>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 3 }}>
        <Avatar
          src={testimonial.avatar}
          alt={testimonial.name}
          sx={{ width: 56, height: 56 }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 0.5
            }}
          >
            {testimonial.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              mb: 1
            }}
          >
            {testimonial.role} at {testimonial.company}
          </Typography>
          <Rating value={testimonial.rating} readOnly size="small" />
        </Box>
      </Box>
      <Typography
        variant="body1"
        sx={{
          color: 'text.primary',
          lineHeight: 1.7,
          fontStyle: 'italic'
        }}
      >
        "{testimonial.content}"
      </Typography>
    </TestimonialCard>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ImpactMetrics() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  const handleMetricClick = (metricId: string) => {
    setActiveMetric(activeMetric === metricId ? null : metricId);
  };

  return (
    <Box ref={ref}>
      <ResponsiveContainer>
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={animationConfig.fadeIn}
        >
          <SectionTitle sx={{ textAlign: 'left' }}>
            Measurable Impact
          </SectionTitle>
          <SectionSubtitle sx={{ textAlign: 'left' }}>
            Our approach delivers concrete, measurable results that transform organizations and accelerate career growth.
          </SectionSubtitle>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          variants={animationConfig.container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <MetricsGrid>
            {impactMetricsData.map((metric, index) => (
              <motion.div
                key={metric.id}
                variants={animationConfig.item}
                custom={index}
              >
                <MetricCardComponent
                  metric={metric}
                  isActive={activeMetric === metric.id}
                  onClick={() => handleMetricClick(metric.id)}
                />
              </motion.div>
            ))}
          </MetricsGrid>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={animationConfig.fadeIn}
          transition={{ delay: 0.4 }}
        >
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h4"
              sx={{
                textAlign: 'left',
                color: 'primary.main',
                fontWeight: 700,
                mb: 4
              }}
            >
              What Our Clients Say
            </Typography>
          </Box>

          <StatsGrid>
            {testimonialsData.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                variants={animationConfig.item}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <TestimonialCardComponent testimonial={testimonial} />
              </motion.div>
            ))}
          </StatsGrid>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={animationConfig.fadeIn}
          transition={{ delay: 0.8 }}
        >
          <Box
            sx={{
              mt: 8,
              p: 4,
              background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.08), rgba(79, 70, 229, 0.04))',
              backdropFilter: 'blur(16px)',
              borderRadius: 3,
              border: '2px solid rgba(167, 218, 219, 0.2)',
              textAlign: 'center'
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                mb: 2
              }}
            >
              Proven Results Across Industries
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.7
              }}
            >
              Organizations that partner with Smartslate consistently see significant improvements in learner engagement, 
              skill development, and business outcomes. Our data-driven approach ensures every learning investment 
              delivers measurable returns.
            </Typography>
          </Box>
        </motion.div>
      </ResponsiveContainer>
    </Box>
  );
}