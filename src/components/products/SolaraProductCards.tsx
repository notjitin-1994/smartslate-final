'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Box, Container, Typography, Chip, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ProductIcons } from '@/components/icons/ProductIcons';

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

const ProductCard = styled(motion.div)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  borderRadius: theme.spacing(2.5),
  padding: theme.spacing(4),
  border: '1px solid rgba(255, 255, 255, 0.08)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
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
    padding: theme.spacing(3),
  },
}));

const LiveNowBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: 'rgba(34, 197, 94, 0.15)',
  color: '#22c55e',
  border: '1px solid rgba(34, 197, 94, 0.3)',
  fontWeight: 700,
  fontSize: '0.75rem',
  height: '28px',
  animation: 'pulse 2s ease-in-out infinite',
  '@keyframes pulse': {
    '0%, 100%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.7,
    },
  },
  '& .MuiChip-icon': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#22c55e',
    animation: 'blink 1.5s ease-in-out infinite',
    marginLeft: 0,
  },
  '@keyframes blink': {
    '0%, 100%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.3,
    },
  },
}));

const ComingSoonBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: 'rgba(79, 70, 229, 0.15)',
  color: theme.palette.secondary.light,
  border: '1px solid rgba(79, 70, 229, 0.3)',
  fontWeight: 600,
  fontSize: '0.75rem',
  height: '28px',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '64px',
  height: '64px',
  borderRadius: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.15), rgba(79, 70, 229, 0.1))',
  border: '1px solid rgba(167, 218, 219, 0.25)',
  marginBottom: theme.spacing(3),
  transition: 'all 0.3s ease',
  '& svg': {
    width: '32px',
    height: '32px',
    color: theme.palette.primary.main,
    filter: 'drop-shadow(0 0 8px rgba(167, 218, 219, 0.4))',
  },
  '.product-card:hover &': {
    transform: 'scale(1.1) rotate(5deg)',
    filter: 'drop-shadow(0 0 20px rgba(167, 218, 219, 0.6))',
  },
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  fontFamily: theme.typography.h3.fontFamily,
  [theme.breakpoints.down('md')]: {
    fontSize: '1.375rem',
  },
}));

const ProductDescription = styled(Typography)(({ theme }) => ({
  fontSize: '0.9375rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.7,
  flexGrow: 1,
  marginBottom: theme.spacing(2),
}));

const LiveIndicator = () => (
  <Box
    component="span"
    sx={{
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: '#22c55e',
      display: 'inline-block',
    }}
  />
);

interface SolaraProduct {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: React.ReactNode;
  status: 'live' | 'coming-soon';
  link?: string;
}

const solaraProducts: SolaraProduct[] = [
  {
    id: 'polaris',
    name: 'Solara Polaris',
    shortName: 'Polaris',
    description: 'Instantly translate stakeholder needs into actionable learning requirements, ensuring every course aligns with business goals from the start.',
    icon: ProductIcons.star,
    status: 'live',
    link: 'https://polaris.smartslate.io',
  },
  {
    id: 'constellation',
    name: 'Solara Constellation',
    shortName: 'Constellation',
    description: 'Transform raw content into structured learning blueprints automatically, saving countless hours of manual instructional design work.',
    icon: ProductIcons.brain,
    status: 'coming-soon',
  },
  {
    id: 'nova',
    name: 'Solara Nova',
    shortName: 'Nova',
    description: 'Build powerful, interactive learning experiences with an AI-assisted authoring tool that makes content creation fast, easy, and engaging.',
    icon: ProductIcons.sparkles,
    status: 'coming-soon',
  },
  {
    id: 'orbit',
    name: 'Solara Orbit',
    shortName: 'Orbit',
    description: 'Deliver personalized learning journeys and host all your courses in one place, creating a seamless and unified learning experience.',
    icon: ProductIcons.rocket,
    status: 'coming-soon',
  },
  {
    id: 'nebula',
    name: 'Solara Nebula',
    shortName: 'Nebula',
    description: 'Provide intelligent, personalized tutoring support that adapts to each learner\'s pace and style with real-time guidance.',
    icon: ProductIcons.chat,
    status: 'coming-soon',
  },
  {
    id: 'spectrum',
    name: 'Solara Spectrum',
    shortName: 'Spectrum',
    description: 'Reveal deep insights into your learning effectiveness by analyzing complex data and presenting it with clarity.',
    icon: ProductIcons.analytics,
    status: 'coming-soon',
  },
];

export default function SolaraProductCards() {
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

  return (
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
              Solara Learning Engine
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem' },
                color: 'text.secondary',
                maxWidth: '900px',
              }}
            >
              For too long, learning has been fragmented, inefficient, and impossible to measure effectively. That era is over. Enter Solara, the singular, intelligent platform engineered to unify every facet of learning design and delivery. We're not just improving the old model; we are building its replacement—an engine for continuous growth and unparalleled insight. The future of learning isn't coming. It's being built, and Solara is the blueprint.
            </Typography>
          </motion.div>
        </SectionHeader>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <Grid container spacing={4}>
            {solaraProducts.map((product) => {
              const CardContent = (
                <ProductCard
                  className="product-card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  role={product.link ? 'link' : 'article'}
                  aria-label={`${product.name}: ${product.description}`}
                  tabIndex={product.link ? 0 : undefined}
                  onKeyDown={
                    product.link
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            window.open(product.link, '_blank', 'noopener,noreferrer');
                          }
                        }
                      : undefined
                  }
                >
                  {/* Status Badge */}
                  {product.status === 'live' ? (
                    <LiveNowBadge
                      label="Live Now"
                      size="small"
                      icon={<LiveIndicator />}
                    />
                  ) : (
                    <ComingSoonBadge label="Coming Soon" size="small" />
                  )}

                  {/* Icon */}
                  <IconWrapper>{product.icon}</IconWrapper>

                  {/* Product Name */}
                  <ProductTitle>{product.name}</ProductTitle>

                  {/* Description */}
                  <ProductDescription>{product.description}</ProductDescription>

                  {/* Visual indicator for link */}
                  {product.link && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: 'primary.main',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        mt: 'auto',
                        pt: 2,
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                      }}
                    >
                      <span>Explore Now</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        style={{ transition: 'transform 0.3s ease' }}
                      >
                        <path
                          d="M6 3L11 8L6 13"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Box>
                  )}
                </ProductCard>
              );

              return (
                <Grid size={{ xs: 12, sm: 6 }} key={product.id}>
                  {product.link ? (
                    <Link
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                    >
                      {CardContent}
                    </Link>
                  ) : (
                    CardContent
                  )}
                </Grid>
              );
            })}
          </Grid>
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}
