import { Box, Paper, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// ============================================================================
// SECTION WRAPPERS
// ============================================================================

export const PageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
}));

export const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(12)} 0`,
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(10)} 0`,
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(8)} 0`,
  },
}));

export const Section = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(10)} 0`,
  backgroundColor: 'transparent',
  position: 'relative',
  overflow: 'hidden',
}));

// ============================================================================
// BACKGROUND VARIATIONS
// ============================================================================

export const BackgroundVariants = {
  primary: {
    bgcolor: 'rgba(20, 36, 51, 0.2)',
    backdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(167, 218, 219, 0.1)',
    borderBottom: '1px solid rgba(167, 218, 219, 0.1)',
  },
  secondary: {
    bgcolor: 'rgba(13, 27, 42, 0.3)',
    backdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(79, 70, 229, 0.1)',
    borderBottom: '1px solid rgba(79, 70, 229, 0.1)',
  },
  accent: {
    bgcolor: 'rgba(167, 218, 219, 0.05)',
    backdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(167, 218, 219, 0.15)',
    borderBottom: '1px solid rgba(167, 218, 219, 0.15)',
  },
} as const;

// ============================================================================
// CARDS AND CONTAINERS
// ============================================================================

export const ContentCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(4),
  border: '1px solid rgba(255, 255, 255, 0.08)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    background: 'rgba(167, 218, 219, 0.04)',
    borderColor: 'rgba(167, 218, 219, 0.3)',
    transform: 'translateY(-4px)',
    boxShadow: '0 16px 32px rgba(167, 218, 219, 0.12)',
  },
}));

export const MetricCard = styled(Paper, {
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

export const TestimonialCard = styled(Paper)(({ theme }) => ({
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

export const JourneyCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'phase'
})<{ phase: string }>(({ theme, phase }) => ({
  position: 'relative',
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '2px solid rgba(255, 255, 255, 0.08)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(4),
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: getPhaseColor(phase, theme),
    transform: 'scaleX(0)',
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

// ============================================================================
// GRID LAYOUTS
// ============================================================================

export const MetricsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: theme.spacing(4),
  marginBottom: theme.spacing(8),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: theme.spacing(3),
  },
}));

export const StatsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: theme.spacing(4),
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: theme.spacing(3),
  },
}));

export const ComparisonGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(3),
  },
}));

export const DifferentiatorsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(3),
  },
}));

export const JourneyGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(3),
  },
}));

// ============================================================================
// TYPOGRAPHY COMPONENTS
// ============================================================================

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: 700,
  fontSize: 'clamp(2rem, 1.5vw + 1.5rem, 2.5rem)',
  lineHeight: 1.2,
  textAlign: 'left',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

export const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1.125rem, 0.5vw + 1rem, 1.25rem)',
  lineHeight: 1.6,
  textAlign: 'left',
  marginBottom: theme.spacing(6),
  color: theme.palette.text.secondary,
  maxWidth: '800px',
  marginLeft: 0,
  marginRight: 'auto',
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.h3.fontFamily,
  fontWeight: 700,
  fontSize: 'clamp(1.25rem, 0.5vw + 1.1rem, 1.5rem)',
  lineHeight: 1.3,
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

export const CardDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  lineHeight: 1.7,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(3),
}));

export const MetricValue = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: 700,
  fontSize: 'clamp(2.5rem, 2vw + 2rem, 3.5rem)',
  lineHeight: 1.1,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
}));

export const MetricTitle = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.h5.fontFamily,
  fontWeight: 600,
  fontSize: '1.125rem',
  lineHeight: 1.4,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
}));

// ============================================================================
// BUTTON COMPONENTS
// ============================================================================

export const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: '#ffffff',
  padding: `${theme.spacing(1.5)} ${theme.spacing(3)}`,
  fontSize: '1rem',
  fontWeight: 600,
  borderRadius: 4,
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
    backgroundColor: theme.palette.secondary.dark,
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(79, 70, 229, 0.3)',
    '&::before': {
      left: '100%',
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(1.5)} ${theme.spacing(2.5)}`,
    fontSize: '0.9rem',
  },
}));

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================

export const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: theme.spacing(2),
  backgroundColor: 'rgba(167, 218, 219, 0.1)',
  marginBottom: theme.spacing(2),
  fontSize: '1.5rem',
}));

export const Badge = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color'
})<{ color: string }>(({ theme, color }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
  borderRadius: theme.spacing(2),
  fontSize: '0.875rem',
  fontWeight: 600,
  backgroundColor: getBadgeColor(color, theme),
  color: getBadgeTextColor(color, theme),
}));

export const Divider = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '1px',
  background: 'linear-gradient(90deg, transparent, rgba(167, 218, 219, 0.3), transparent)',
  margin: `${theme.spacing(4)} 0`,
}));

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getPhaseColor(phase: string, theme: any): string {
  const colors = {
    discovery: theme.palette.primary.main,
    design: theme.palette.secondary.main,
    development: '#22c55e',
    deployment: '#f59e0b',
    optimization: '#8b5cf6',
  };
  return colors[phase as keyof typeof colors] || theme.palette.primary.main;
}

function getBadgeColor(color: string, theme: any): string {
  const colors = {
    primary: 'rgba(167, 218, 219, 0.2)',
    secondary: 'rgba(79, 70, 229, 0.2)',
    accent: 'rgba(34, 197, 94, 0.2)',
    success: 'rgba(34, 197, 94, 0.2)',
    warning: 'rgba(245, 158, 11, 0.2)',
    error: 'rgba(239, 68, 68, 0.2)',
  };
  return colors[color as keyof typeof colors] || colors.primary;
}

function getBadgeTextColor(color: string, theme: any): string {
  const colors = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    accent: '#22c55e',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
  };
  return colors[color as keyof typeof colors] || theme.palette.primary.main;
}

// ============================================================================
// ANIMATION UTILITIES
// ============================================================================

export const FadeInWrapper = styled(Box)(({ theme }) => ({
  opacity: 0,
  transform: 'translateY(30px)',
  transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
  '&.visible': {
    opacity: 1,
    transform: 'translateY(0)',
  },
}));

export const SlideInWrapper = styled(Box)(({ theme }) => ({
  opacity: 0,
  transform: 'translateX(-30px)',
  transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
  '&.visible': {
    opacity: 1,
    transform: 'translateX(0)',
  },
}));

// ============================================================================
// RESPONSIVE UTILITIES
// ============================================================================

export const ResponsiveContainer = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: `0 ${theme.spacing(3)}`,
  [theme.breakpoints.down('sm')]: {
    padding: `0 ${theme.spacing(2)}`,
  },
}));

export const MobileHidden = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const DesktopHidden = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));
