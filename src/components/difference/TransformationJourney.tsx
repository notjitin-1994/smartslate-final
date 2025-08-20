'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Box, Typography } from '@mui/material';
import { 
  SectionTitle, 
  SectionSubtitle, 
  JourneyGrid, 
  JourneyCard,
  CardTitle,
  CardDescription,
  ResponsiveContainer,
  Badge,
  Divider
} from './styles/DifferenceStyles';
import { transformationJourneyData, animationConfig } from '@/lib/data/differencePage';

// ============================================================================
// JOURNEY STEP COMPONENT
// ============================================================================

interface JourneyStepProps {
  step: typeof transformationJourneyData[0];
  index: number;
  totalSteps: number;
}

function JourneyStepComponent({ step, index, totalSteps }: JourneyStepProps) {
  return (
    <JourneyCard phase={step.phase}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
        <Box sx={{ fontSize: '2rem' }}>
          {step.icon}
        </Box>
        <Box sx={{ flex: 1 }}>
          <CardTitle>
            {step.title}
          </CardTitle>
          <Badge color="primary">
            Phase {index + 1} of {totalSteps}
          </Badge>
        </Box>
      </Box>

      <CardDescription>
        {step.description}
      </CardDescription>

      <Box sx={{ mt: 3, mb: 3 }}>
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
          Duration: {step.duration}
        </Typography>
      </Box>

      <Box>
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
          Key Outcomes
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {step.outcomes.map((outcome, outcomeIndex) => (
            <Box
              key={outcomeIndex}
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
                {outcome}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </JourneyCard>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function TransformationJourney() {
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
            Your Transformation Journey
          </SectionTitle>
          <SectionSubtitle sx={{ textAlign: 'left' }}>
            From initial assessment to continuous optimization, we guide you through every step of your learning transformation with a proven, systematic approach.
          </SectionSubtitle>
        </motion.div>

        {/* Journey Steps Grid */}
        <motion.div
          variants={animationConfig.container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <JourneyGrid>
            {transformationJourneyData.map((step, index) => (
              <motion.div
                key={step.id}
                variants={animationConfig.item}
                custom={index}
              >
                <JourneyStepComponent
                  step={step}
                  index={index}
                  totalSteps={transformationJourneyData.length}
                />
              </motion.div>
            ))}
          </JourneyGrid>
        </motion.div>

        {/* Process Flow Visualization */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={animationConfig.fadeIn}
          transition={{ delay: 0.6 }}
        >
          <Box sx={{ mt: 8, mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                textAlign: 'center',
                color: 'primary.main',
                fontWeight: 600,
                mb: 4
              }}
            >
              Continuous Improvement Cycle
            </Typography>
            
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                flexWrap: 'wrap',
                mb: 4
              }}
            >
              {transformationJourneyData.map((step, index) => (
                <Box key={step.id} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.875rem'
                    }}
                  >
                    {index + 1}
                  </Box>
                  {index < transformationJourneyData.length - 1 && (
                    <Box
                      sx={{
                        width: 60,
                        height: 2,
                        backgroundColor: 'primary.main',
                        mx: 2,
                        opacity: 0.3
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Box>
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
              A Proven Path to Success
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
              Our systematic approach has been refined through hundreds of successful implementations. 
              Each phase builds upon the previous one, ensuring a smooth transition and maximum impact 
              for your organization's learning transformation.
            </Typography>
          </Box>
        </motion.div>
      </ResponsiveContainer>
    </Box>
  );
}