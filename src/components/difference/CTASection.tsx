'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { 
  SectionTitle, 
  SectionSubtitle, 
  CTAButton,
  ResponsiveContainer
} from './styles/DifferenceStyles';
import { ctaSectionData, animationConfig } from '@/lib/data/differencePage';

export default function CTASection() {
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
            {ctaSectionData.title}
          </SectionTitle>
          <SectionSubtitle sx={{ textAlign: 'left' }}>
            {ctaSectionData.subtitle}
          </SectionSubtitle>
        </motion.div>

        {/* Description */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={animationConfig.fadeIn}
          transition={{ delay: 0.2 }}
        >
          <Typography
            variant="body1"
            sx={{
              textAlign: 'left',
              color: 'text.secondary',
              maxWidth: '800px',
              mb: 6,
              fontSize: '1.125rem',
              lineHeight: 1.7
            }}
          >
            {ctaSectionData.description}
          </Typography>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={animationConfig.fadeIn}
          transition={{ delay: 0.4 }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              mb: 6
            }}
          >
            <Link href={ctaSectionData.primaryAction.href} style={{ textDecoration: 'none' }}>
              <CTAButton variant={ctaSectionData.primaryAction.variant} size="large">
                {ctaSectionData.primaryAction.label}
              </CTAButton>
            </Link>

            {ctaSectionData.secondaryAction && (
              <Link href={ctaSectionData.secondaryAction.href} style={{ textDecoration: 'none' }}>
                <CTAButton 
                  variant={ctaSectionData.secondaryAction.variant} 
                  size="large"
                  sx={{
                    backgroundColor: 'transparent',
                    color: 'primary.main',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'rgba(167, 218, 219, 0.1)',
                      borderColor: 'primary.light',
                    }
                  }}
                >
                  {ctaSectionData.secondaryAction.label}
                </CTAButton>
              </Link>
            )}
          </Box>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={animationConfig.fadeIn}
          transition={{ delay: 0.6 }}
        >
          <Box
            sx={{
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
                mb: 2,
                textAlign: 'left'
              }}
            >
              Why Choose Smartslate?
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: 3,
                mt: 3
              }}
            >
              {[
                {
                  title: 'Proven Results',
                  description: '94% engagement rate and 87% completion rate across all programs'
                },
                {
                  title: 'Industry Expertise',
                  description: 'Direct partnerships with leading companies and industry experts'
                },
                {
                  title: 'Continuous Support',
                  description: 'Ongoing optimization and support throughout your learning journey'
                }
              ].map((item, index) => (
                <Box key={index} sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 600,
                      mb: 1,
                      fontSize: '1rem'
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.875rem',
                      lineHeight: 1.5
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>
      </ResponsiveContainer>
    </Box>
  );
}
