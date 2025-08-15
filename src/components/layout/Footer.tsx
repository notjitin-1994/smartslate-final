'use client';

import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';

const FooterWrapper = styled('footer')(({ theme }) => ({
  marginTop: theme.spacing(0.02),
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: `${theme.spacing(0.8)} 0`,
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
          <Link href="/" aria-label="Smartslate home">
            <Image
              src="/logo.png"
              alt="Smartslate Logo"
              width={140}
              height={34}
              quality={45}
              sizes="(max-width: 640px) 112px, 140px"
              loading="lazy"
              style={{ height: 'auto' }}
            />
            <span className="sr-only">Smartslate</span>
          </Link>
        </LogoWrapper>

        <FooterText>
          <Tagline variant="body2">
            Revolutionizing the way the World learns.
          </Tagline>
          <Divider>•</Divider>
          <Copyright variant="body2">
            © {currentYear} Smartslate. All rights reserved.
          </Copyright>
        </FooterText>
        
        {/* Legal Links */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link 
            href="/legal/privacy" 
            style={{ 
              color: 'rgba(176, 197, 198, 0.8)', 
              textDecoration: 'none', 
              fontSize: '0.875rem',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#a7dadb'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(176, 197, 198, 0.8)'}
          >
            Privacy Policy
          </Link>
          <span style={{ color: 'rgba(176, 197, 198, 0.4)' }}>•</span>
          <Link 
            href="/legal/terms" 
            style={{ 
              color: 'rgba(176, 197, 198, 0.8)', 
              textDecoration: 'none', 
              fontSize: '0.875rem',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#a7dadb'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(176, 197, 198, 0.8)'}
          >
            Terms of Service
          </Link>
        </Box>
      </FooterContent>
    </FooterWrapper>
  );
}
