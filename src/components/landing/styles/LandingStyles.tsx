import { Box, Button, Paper, Typography, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

// Section Wrappers
export const Section = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(6)} 0`,
  backgroundColor: 'transparent',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    background: 'radial-gradient(ellipse at bottom right, rgba(79, 70, 229, 0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
}));

export const SectionWrapper = styled(Box)(({ theme }) => ({
  opacity: 0,
  transform: 'translateY(30px)',
  transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
  '&.visible': {
    opacity: 1,
    transform: 'translateY(0)',
  },
}));

export const PageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: 'auto',
}));

// Navigation Components
export const NavigationDots = styled(Box)(({ theme }) => ({
  position: 'fixed',
  right: theme.spacing(2.4),
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.2),
  zIndex: 100,
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const Dot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active: boolean }>(({ theme, active }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  border: `2px solid ${active ? theme.palette.primary.main : 'rgba(167, 218, 219, 0.3)'}`,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.main : 'rgba(167, 218, 219, 0.2)',
    transform: 'scale(1.2)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 24,
    height: 24,
    borderRadius: '50%',
  },
}));

// Section Headers
export const SectionHeader = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  marginBottom: theme.spacing(6),
  position: 'relative',
}));

// Content Cards
export const ContentCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(3.6),
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
    background: 'radial-gradient(circle, rgba(167, 218, 219, 0.2), transparent)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.3)',
    '&::before': {
      transform: 'scaleX(1)',
    },
    '&::after': {
      opacity: 1,
    },
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2.4),
  },
}));

// Buttons
export const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: '#ffffff',
  padding: `${theme.spacing(0.9)} ${theme.spacing(1.8)}`,
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
    padding: `${theme.spacing(0.9)} ${theme.spacing(1.5)}`,
    fontSize: '0.9rem',
  },
}));

export const SectionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean }>(({ theme, active }) => ({
  position: 'relative',
  background: active
    ? 'linear-gradient(135deg, rgba(167, 218, 219, 0.15), rgba(79, 70, 229, 0.1))'
    : 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: `1px solid ${active ? 'rgba(167, 218, 219, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
  borderLeft: `4px solid ${active ? theme.palette.primary.main : 'transparent'}`,
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  padding: `${theme.spacing(1.5)} ${theme.spacing(1.8)}`,
  borderRadius: theme.spacing(0.9),
  textAlign: 'left',
  fontSize: '1rem',
  fontWeight: active ? 600 : 500,
  cursor: 'pointer',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  width: '100%',
  justifyContent: 'flex-start',
  textTransform: 'none',
  overflow: 'hidden',
  boxShadow: active ? '0 8px 24px rgba(167, 218, 219, 0.25)' : 'none',
  transform: active ? 'translateX(8px) scale(1.02)' : 'translateX(0) scale(1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: -100,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(167, 218, 219, 0.1), transparent)',
    transition: 'left 0.5s ease',
  },
  '&:hover': {
    backgroundColor: 'rgba(167, 218, 219, 0.08)',
    borderColor: 'rgba(167, 218, 219, 0.5)',
    color: theme.palette.text.primary,
    transform: 'translateX(4px)',
    boxShadow: '0 4px 16px rgba(167, 218, 219, 0.2)',
    '&::before': {
      left: '100%',
    },
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.75rem',
    color: active ? theme.palette.primary.main : theme.palette.secondary.main,
    transform: active ? 'scale(1.15) rotate(5deg)' : 'scale(1)',
    filter: active ? 'drop-shadow(0 0 12px rgba(167, 218, 219, 0.6))' : 'none',
    transition: 'all 0.3s ease',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '0.875rem',
    padding: `${theme.spacing(0.9)} ${theme.spacing(1.2)}`,
  },
}));

// Typography
export const AccentText = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
}));

export const AnimatedChip = styled(Chip)(({ theme }) => ({
  backgroundColor: 'rgba(79, 70, 229, 0.15)',
  color: theme.palette.secondary.light,
  border: '1px solid rgba(79, 70, 229, 0.3)',
  fontWeight: 600,
  animation: 'pulse 2s infinite',
}));

// Layout Components
export const GridLayout = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '0.8fr 1.2fr',
  gap: theme.spacing(3.6),
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

export const LeftPanel = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: `calc(100px + ${theme.spacing(2.4)})`,
  alignSelf: 'start',
  [theme.breakpoints.down('lg')]: {
    position: 'static',
    top: 'auto',
  },
}));

// Data Visualization Components
export const DataVisualization = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(2.4),
  padding: theme.spacing(2.4),
  borderRadius: theme.spacing(1.2),
  background: 'rgba(0, 0, 0, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  position: 'relative',
  minHeight: 350,
  [theme.breakpoints.down('md')]: {
    minHeight: 250,
    padding: theme.spacing(1.2),
  },
}));

export const StatCard = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  padding: theme.spacing(1.8),
  background: 'rgba(255, 255, 255, 0.02)',
  borderRadius: theme.spacing(1.2),
  border: '1px solid rgba(255, 255, 255, 0.08)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px) scale(1.05)',
    background: 'rgba(255, 255, 255, 0.04)',
    boxShadow: '0 8px 24px rgba(167, 218, 219, 0.2)',
  },
}));

export const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(0.3),
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

// Progress Components
export const ProgressBar = styled(Box)<{ value: number }>(({ theme, value }) => ({
  width: '100%',
  height: 12,
  borderRadius: theme.spacing(0.6),
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  overflow: 'hidden',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: `${value}%`,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    borderRadius: theme.spacing(0.6),
    transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
  },
}));

// Mobile Components
export const MobileAccordionWrapper = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('lg')]: {
    display: 'block',
    marginBottom: theme.spacing(3.6),
  },
}));

export const MobileAccordionSection = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(1.5),
  overflow: 'hidden',
  background: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  marginBottom: theme.spacing(1.8),
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.03)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  },
}));

export const MobileAccordionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'revealed'
})<{ revealed?: boolean }>(({ theme, revealed }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1.8),
  borderRadius: 0,
  transition: 'all 0.3s ease',
  width: '100%',
  backgroundColor: 'transparent',
  border: 'none',
  textAlign: 'left',
  color: 'inherit',
  fontFamily: 'inherit',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: revealed ? 0 : -100,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(167, 218, 219, 0.05), transparent)',
    transition: 'left 0.6s ease',
  },
  '&:hover': {
    backgroundColor: 'rgba(167, 218, 219, 0.03)',
    '&::before': {
      left: '100%',
    },
    '& .section-icon': {
      transform: 'scale(1.1) rotate(5deg)',
      filter: 'drop-shadow(0 0 20px rgba(167, 218, 219, 0.6))',
    },
  },
}));

export const MobileAccordionHeader = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.2),
}));

export const MobileAccordionIcon = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: theme.spacing(0.9),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.15), rgba(79, 70, 229, 0.1))',
  border: '1px solid rgba(167, 218, 219, 0.3)',
  transition: 'all 0.3s ease',
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
    color: theme.palette.primary.main,
  },
}));

export const MobileAccordionToggle = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  marginLeft: theme.spacing(1.2),
  color: theme.palette.primary.main,
  transition: 'transform 0.3s ease-in-out',
  cursor: 'pointer',
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
  },
}));

export const MobileAccordionContent = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(0)} ${theme.spacing(1.8)} ${theme.spacing(1.8)}`,
}));

// Animation Components
export const FadeInContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isVisible' && prop !== 'delay'
})<{ delay: number; isVisible: boolean }>(
  ({ theme, delay, isVisible }) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(15px)',
    transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
  })
);

export const AnimateText = styled('span', {
  shouldForwardProp: (prop) => prop !== 'animate'
})<{ animate?: boolean }>(({ theme, animate }) => ({
  color: animate ? theme.palette.primary.main : 'inherit',
  transition: 'all 1s ease-in-out',
  fontWeight: animate ? 700 : 'inherit',
}));
