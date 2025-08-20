'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Box, Typography, Chip } from '@mui/material';
import { 
  SectionTitle, 
  SectionSubtitle, 
  DifferentiatorsGrid, 
  ContentCard,
  IconWrapper,
  CardTitle,
  CardDescription,
  ResponsiveContainer,
  Badge
} from './styles/DifferenceStyles';
import { keyDifferentiatorsData, animationConfig } from '@/lib/data/differencePage';

export default function KeyDifferentiators() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
            What Sets Us Apart
          </SectionTitle>
          <SectionSubtitle sx={{ textAlign: 'left' }}>
            Our unique combination of cutting-edge technology, industry expertise, and outcome-focused methodology creates learning experiences that deliver measurable results.
          </SectionSubtitle>
        </motion.div>

        {/* Differentiators Grid */}
        <motion.div
          variants={animationConfig.container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <DifferentiatorsGrid>
            {keyDifferentiatorsData.map((differentiator, index) => (
              <motion.div
                key={differentiator.id}
                variants={animationConfig.item}
                custom={index}
              >
                <ContentCard>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                    <IconWrapper sx={{ fontSize: '2rem' }}>
                      {differentiator.icon}
                    </IconWrapper>
                    <Box sx={{ flex: 1 }}>
                      <CardTitle>
                        {differentiator.title}
                      </CardTitle>
                      <Badge color={differentiator.color}>
                        {differentiator.color === 'primary' && 'AI-Powered'}
                        {differentiator.color === 'secondary' && 'Industry-Led'}
                        {differentiator.color === 'accent' && 'Outcome-Focused'}
                      </Badge>
                    </Box>
                  </Box>

                  <CardDescription>
                    {differentiator.description}
                  </CardDescription>

                  <Box sx={{ mt: 'auto' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'text.secondary',
                        mb: 2,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      Key Features
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {differentiator.features.map((feature, featureIndex) => (
                        <Box
                          key={featureIndex}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            py: 0.5
                          }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              backgroundColor: 'primary.main',
                              flexShrink: 0
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                              fontSize: '0.875rem',
                              lineHeight: 1.5
                            }}
                          >
                            {feature}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </ContentCard>
              </motion.div>
            ))}
          </DifferentiatorsGrid>
        </motion.div>

        {/* Summary Statement */}
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
              The Complete Package
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.7
              }}
            >
              When you choose Smartslate, you're not just getting a learning platform—you're getting a comprehensive 
              ecosystem that combines AI-powered personalization, industry-leading content, and proven methodologies 
              to deliver transformative results.
            </Typography>
          </Box>
        </motion.div>
      </ResponsiveContainer>
    </Box>
  );
}