'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Box, Typography } from '@mui/material';
import { 
  SectionTitle, 
  SectionSubtitle, 
  ComparisonGrid, 
  ContentCard,
  IconWrapper,
  CardTitle,
  CardDescription,
  ResponsiveContainer
} from './styles/DifferenceStyles';
import { comparisonData, iconMap, animationConfig } from '@/lib/data/differencePage';

export default function ComparisonSection() {
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
            Traditional vs Smartslate
          </SectionTitle>
          <SectionSubtitle sx={{ textAlign: 'left' }}>
            See how our innovative approach transforms learning from a one-size-fits-all model to a personalized, outcome-driven experience.
          </SectionSubtitle>
        </motion.div>

        {/* Comparison Grid */}
        <motion.div
          variants={animationConfig.container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <ComparisonGrid>
            {comparisonData.map((item, index) => (
              <motion.div
                key={item.id}
                variants={animationConfig.item}
                custom={index}
              >
                <ContentCard>
                  <IconWrapper>
                    <span style={{ fontSize: '1.5rem' }}>{iconMap[item.icon]}</span>
                  </IconWrapper>
                  
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: '#ef4444',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          mb: 1
                        }}
                      >
                        Traditional Approach
                      </Typography>
                      <CardTitle sx={{ color: '#ef4444' }}>
                        {item.traditional}
                      </CardTitle>
                    </Box>

                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'primary.main',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          mb: 1
                        }}
                      >
                        Smartslate Solution
                      </Typography>
                      <CardTitle>
                        {item.smartslate}
                      </CardTitle>
                      {item.description && (
                        <CardDescription>
                          {item.description}
                        </CardDescription>
                      )}
                    </Box>
                  </Box>
                </ContentCard>
              </motion.div>
            ))}
          </ComparisonGrid>
        </motion.div>
      </ResponsiveContainer>
    </Box>
  );
}