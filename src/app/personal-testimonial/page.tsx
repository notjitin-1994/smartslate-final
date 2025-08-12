'use client';

import { motion } from 'framer-motion';
import { Box, Container, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const PageWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: `${theme.spacing(10)} 0`,
  backgroundColor: 'transparent',
}));

const StoryCard = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.08), rgba(79, 70, 229, 0.04))',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '2px solid rgba(167, 218, 219, 0.2)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(6),
  marginBottom: theme.spacing(4),
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
  },
}));

export default function PersonalTestimonialPage() {
  return (
    <PageWrapper>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                mb: 4,
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                color: 'white',
              }}
            >
              How <Box component="span" sx={{ color: 'primary.main' }}>AI</Box> and <Box component="span" sx={{ color: 'primary.main' }}>Human Ingenuity</Box> Built SmartSlate
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                fontWeight: 300,
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: '1.25rem',
              }}
            >
              The fascinating journey of creating an educational platform where artificial intelligence meets human creativity.
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <StoryCard>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'white' }}>
              The Vision
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}>
              In early 2024, we recognized a critical gap in the Indian education landscape. While the country was producing 
              millions of graduates annually, there was a disconnect between academic knowledge and industry requirements. 
              We envisioned something different—a platform that could adapt, learn, and grow with each student while maintaining 
              the human touch that makes education truly meaningful.
            </Typography>
          </StoryCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <StoryCard>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'white' }}>
              AI-Powered Design & Human Engineering
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}>
              We started with AI tools to analyze thousands of successful learning platforms and user behavior patterns. 
              AI helped us identify optimal user experience flows and content structures. However, we quickly realized that 
              AI alone couldn't capture the nuanced understanding of human learning psychology and cultural context.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary', mt: 3 }}>
              Our team of educators, psychologists, and learning specialists worked alongside AI-generated insights to create 
              learning paths that truly resonate with Indian students. We incorporated cultural nuances, regional learning 
              preferences, and real-world application scenarios that AI couldn't fully comprehend on its own.
            </Typography>
          </StoryCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <StoryCard>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'white' }}>
              The Hybrid Development Approach
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}>
              The development process became a fascinating dance between AI and human intelligence. AI handled repetitive 
              coding tasks, generated boilerplate code, and optimized performance algorithms. Human developers focused on 
              complex business logic, user experience refinements, and creative problem-solving that required deep 
              understanding of educational contexts.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary', mt: 3 }}>
              We continuously refined the platform through a feedback loop where AI analyzed user behavior and suggested 
              improvements, while human designers and educators evaluated these suggestions through the lens of educational 
              effectiveness and cultural appropriateness.
            </Typography>
          </StoryCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <StoryCard>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, color: 'white', textAlign: 'center' }}>
              The Result: A New Paradigm
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary', textAlign: 'center' }}>
              SmartSlate represents more than just another learning platform—it's a testament to what's possible when we 
              combine the computational power of AI with the nuanced understanding of human educators. We've created a 
              system that can scale globally while remaining deeply personal, technologically advanced while being 
              educationally sound, and efficient while maintaining the human touch that makes learning truly transformative.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary', textAlign: 'center', mt: 3 }}>
              This is the future of education: not AI replacing humans, but AI and humans working together to create 
              something greater than either could achieve alone.
            </Typography>
          </StoryCard>
        </motion.div>
      </Container>
    </PageWrapper>
  );
}
