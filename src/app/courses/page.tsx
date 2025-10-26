'use client';

import { motion } from 'framer-motion';
import { Box, Container, Typography, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useInView } from 'react-intersection-observer';

const PageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  background: theme.palette.background.default,
}));

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: 'auto',
  display: 'flex',
  alignItems: 'center',
  padding: `${theme.spacing(30)} 0 ${theme.spacing(12)} 0`,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(20)} 0 ${theme.spacing(8)} 0`,
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(18)} 0 ${theme.spacing(6)} 0`,
  },
}));

const BackgroundGradient = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '100%',
  pointerEvents: 'none',
  zIndex: 0,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '10%',
    right: '10%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(167, 218, 219, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    transform: 'translate(50%, -50%)',
    [theme.breakpoints.down('md')]: {
      width: '300px',
      height: '300px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '200px',
      height: '200px',
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '20%',
    left: '5%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(79, 70, 229, 0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    transform: 'translate(-50%, 50%)',
    [theme.breakpoints.down('md')]: {
      width: '350px',
      height: '350px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '250px',
      height: '250px',
    },
  },
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  textAlign: 'left',
  zIndex: 1,
  position: 'relative',
}));

const SubtitleText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '1.125rem',
  lineHeight: 1.75,
  maxWidth: '900px',
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9375rem',
  },
}));

const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(10)} 0`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '20%',
    left: '-10%',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(167, 218, 219, 0.04) 0%, transparent 70%)',
    borderRadius: '50%',
    pointerEvents: 'none',
    [theme.breakpoints.down('md')]: {
      width: '400px',
      height: '400px',
    },
  },
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(8)} 0`,
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(6)} 0`,
  },
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  marginBottom: theme.spacing(8),
  position: 'relative',
  zIndex: 1,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(6),
  },
}));

const CourseCard = styled(motion.div)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(5),
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
    background: 'radial-gradient(circle, rgba(167, 218, 219, 0.15), transparent)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 20px 48px rgba(0, 0, 0, 0.3), 0 0 30px rgba(167, 218, 219, 0.15)`,
    borderColor: 'rgba(167, 218, 219, 0.3)',
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

const ComingSoonBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(3),
  right: theme.spacing(3),
  backgroundColor: 'rgba(79, 70, 229, 0.15)',
  color: theme.palette.secondary.light,
  border: '1px solid rgba(79, 70, 229, 0.3)',
  fontWeight: 600,
  fontSize: '0.75rem',
  height: '28px',
}));

const CourseHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(4),
  paddingRight: theme.spacing(8),
}));

const CourseIcon = styled(Box)(({ theme }) => ({
  width: '72px',
  height: '72px',
  borderRadius: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.15), rgba(79, 70, 229, 0.1))',
  border: '1px solid rgba(167, 218, 219, 0.25)',
  marginBottom: theme.spacing(3),
  transition: 'all 0.3s ease',
  '& svg': {
    width: '36px',
    height: '36px',
    color: theme.palette.primary.main,
    filter: 'drop-shadow(0 0 8px rgba(167, 218, 219, 0.4))',
  },
  '.course-card:hover &': {
    transform: 'scale(1.1) rotate(5deg)',
    filter: 'drop-shadow(0 0 20px rgba(167, 218, 219, 0.6))',
  },
}));

const CourseTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.75rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  fontFamily: theme.typography.h3.fontFamily,
  lineHeight: 1.3,
  [theme.breakpoints.down('md')]: {
    fontSize: '1.5rem',
  },
}));

const CourseSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(3),
  lineHeight: 1.4,
}));

const CourseDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.9375rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.7,
  marginBottom: theme.spacing(4),
}));

const FeaturesList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1.5),
  padding: theme.spacing(1.5),
  background: 'rgba(255, 255, 255, 0.02)',
  borderRadius: theme.spacing(1),
  border: '1px solid rgba(255, 255, 255, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.04)',
    borderColor: 'rgba(167, 218, 219, 0.2)',
    transform: 'translateX(4px)',
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  width: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  marginTop: '2px',
  '& svg': {
    width: '100%',
    height: '100%',
  },
}));

const FeatureText = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.6,
  '& strong': {
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
}));

const CourseMetaInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(3),
  paddingTop: theme.spacing(3),
  marginTop: 'auto',
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
}));

const MetaItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  '& svg': {
    width: '18px',
    height: '18px',
    color: theme.palette.primary.main,
  },
}));

// Icon components
const AIIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const LevelIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 20H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M7 20V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M17 20V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ProjectIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
    <path d="M9 9L12 12L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function CoursesPage() {
  const { ref, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const course = {
    id: 'ai-foundations',
    title: 'AI Foundations: Concept2Application',
    subtitle: 'Build Production-Ready AI Skills from the Ground Up',
    description: 'Master the fundamentals of artificial intelligence and machine learning through hands-on projects. This comprehensive course takes you from core concepts to real-world applications, ensuring you can confidently build and deploy AI solutions.',
    status: 'coming-soon',
    features: [
      'Deep dive into machine learning algorithms and neural networks',
      'Practical projects using Python, TensorFlow, and PyTorch',
      'Real-world case studies from industry leaders',
      'Build and deploy production-ready AI models',
      'Comprehensive coverage of NLP, computer vision, and generative AI',
    ],
    meta: {
      duration: '12 weeks',
      level: 'Beginner to Intermediate',
      projects: '5+ hands-on projects',
    },
  };

  return (
    <PageWrapper>
      {/* Hero Section */}
      <HeroSection>
        <BackgroundGradient />
        <Container maxWidth="lg">
          <ContentWrapper>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' },
                  fontWeight: 700,
                  marginBottom: 3,
                  lineHeight: 1.1,
                }}
              >
                Our <Box component="span" sx={{ color: 'primary.main' }}>Courses</Box>
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <SubtitleText>
                Discover industry-validated courses designed to bridge the gap between theory and practice.
                Smartslate delivers cutting-edge curriculum that evolves with technology, ensuring you build skills that matter in today&apos;s market.
              </SubtitleText>
            </motion.div>
          </ContentWrapper>
        </Container>
      </HeroSection>

      {/* Courses Section */}
      <SectionWrapper ref={ref}>
        <Container maxWidth="lg">
          <SectionHeader>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  fontWeight: 700,
                  marginBottom: 2,
                }}
              >
                Featured Courses
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  color: 'text.secondary',
                  maxWidth: '900px',
                }}
              >
                Transform your career with courses built by industry experts. Each program combines theoretical foundations with practical application, ensuring you&apos;re ready for real-world challenges.
              </Typography>
            </motion.div>
          </SectionHeader>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <Box sx={{ maxWidth: '900px' }}>
              <CourseCard
                className="course-card"
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                role="article"
                aria-label={`${course.title}: ${course.description}`}
              >
                {/* Coming Soon Badge */}
                <ComingSoonBadge label="Coming Soon" size="small" />

                {/* Course Icon */}
                <CourseIcon>
                  <AIIcon />
                </CourseIcon>

                {/* Course Title */}
                <CourseTitle>{course.title}</CourseTitle>

                {/* Course Subtitle */}
                <CourseSubtitle>{course.subtitle}</CourseSubtitle>

                {/* Course Description */}
                <CourseDescription>{course.description}</CourseDescription>

                {/* Features List */}
                <FeaturesList>
                  {course.features.map((feature, index) => (
                    <FeatureItem key={index}>
                      <FeatureIcon>
                        <CheckIcon />
                      </FeatureIcon>
                      <FeatureText>{feature}</FeatureText>
                    </FeatureItem>
                  ))}
                </FeaturesList>

                {/* Course Meta Information */}
                <CourseMetaInfo>
                  <MetaItem>
                    <ClockIcon />
                    <span>{course.meta.duration}</span>
                  </MetaItem>
                  <MetaItem>
                    <LevelIcon />
                    <span>{course.meta.level}</span>
                  </MetaItem>
                  <MetaItem>
                    <ProjectIcon />
                    <span>{course.meta.projects}</span>
                  </MetaItem>
                </CourseMetaInfo>
              </CourseCard>
            </Box>
          </motion.div>
        </Container>
      </SectionWrapper>
    </PageWrapper>
  );
}
