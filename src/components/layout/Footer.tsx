'use client';

import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

const FooterWrapper = styled('footer')(({ theme }) => ({
  marginTop: theme.spacing(10),
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: `${theme.spacing(4)} 0`,
  backgroundColor: 'transparent',
}));

const FooterContent = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(3),
  textAlign: 'center',
}));

const LogoWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0.8,
  transition: 'opacity 0.2s ease',
  '&:hover': {
    opacity: 1,
  },
}));

const FooterText = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    gap: theme.spacing(3),
  },
}));

const Tagline = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.text.secondary,
  fontWeight: 400,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

const Copyright = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.disabled,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

const Divider = styled('span')(({ theme }) => ({
  display: 'none',
  color: theme.palette.text.disabled,
  [theme.breakpoints.up('sm')]: {
    display: 'inline',
  },
}));

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterContent maxWidth="lg">
        <LogoWrapper>
          <Image
            src="/logo.png"
            alt="SmartSlate Logo"
            width={100}
            height={24}
            style={{ height: 'auto' }}
          />
        </LogoWrapper>

        <FooterText>
          <Tagline variant="body2">
            Revolutionizing the way the World learns.
          </Tagline>
          <Divider>•</Divider>
          <Copyright variant="body2">
            © {currentYear} SmartSlate. All rights reserved.
          </Copyright>
        </FooterText>
      </FooterContent>
    </FooterWrapper>
  );
}