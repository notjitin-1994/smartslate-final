'use client';

import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDemoModal } from '@/hooks/useDemoModal';

const StyledDemoButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: `${theme.spacing(1.5)} ${theme.spacing(3)}`,
  fontSize: '1rem',
  fontWeight: 600,
  borderRadius: 4, // Thin rounded square
  textTransform: 'none',
  border: '2px solid rgba(167, 218, 219, 0.3)',
  backgroundColor: 'transparent',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: 'rgba(167, 218, 219, 0.1)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(167, 218, 219, 0.2)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(1.5)} ${theme.spacing(2.5)}`,
    fontSize: '0.9rem',
  },
}));

interface DemoButtonProps extends Omit<ButtonProps, 'onClick'> {
  children?: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  size?: 'small' | 'medium' | 'large';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function DemoButton({
  children = 'Schedule Demo',
  variant = 'outlined',
  size = 'large',
  startIcon,
  endIcon,
  fullWidth = false,
  disabled = false,
  ...props
}: DemoButtonProps) {
  const { openModal } = useDemoModal();

  const defaultStartIcon = startIcon || (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );

  return (
    <StyledDemoButton
      variant={variant}
      size={size}
      onClick={openModal}
      startIcon={defaultStartIcon}
      endIcon={endIcon}
      fullWidth={fullWidth}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledDemoButton>
  );
}
