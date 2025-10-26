'use client';

import { Box, Container, Typography } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';

const currentYear = new Date().getFullYear();

const FooterWrapper = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(6, 0),
  marginTop: 'auto',
}));

const FooterContent = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
}));

const LogoWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  '&:hover': {
    opacity: 0.9,
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
  fontSize: '1rem',
}));


const FooterLink = styled(Link)(({ theme }) => ({
  display: 'block',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  textDecoration: 'none',
  transition: 'color 0.2s ease',
  fontSize: '0.9rem',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
}));

export default function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterContent maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' },
            gap: 4
          }}
        >
          {/* Company Info */}
          <Box>
            <LogoWrapper>
              <Link href="/" aria-label="Smartslate home" style={{ textDecoration: 'none' }}>
                <Image
                  src="/logo.png"
                  alt="Smartslate Logo"
                  width={160}
                  height={40}
                  quality={100}
                  loading="lazy"
                  style={{ height: 'auto' }}
                />
              </Link>
            </LogoWrapper>
            <Typography variant="body1" color="text.secondary" sx={{ my: 2 }}>
              Revolutionizing the way the world learns through innovative educational technology.
            </Typography>
          </Box>
          
          {/* Quick Links */}
          <Box>
            <SectionTitle variant="h6">Product</SectionTitle>
            <FooterLink href="/features">Features</FooterLink>
            <FooterLink href="/pricing">Pricing</FooterLink>
          </Box>

          {/* Company */}
          <Box>
            <SectionTitle variant="h6">Company</SectionTitle>
            <FooterLink href="/difference">About Us</FooterLink>
            <FooterLink href="/careers">Careers</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/partner">Partners</FooterLink>
          </Box>

          {/* Legal */}
          <Box>
            <SectionTitle variant="h6">Legal</SectionTitle>
            <FooterLink href="/legal/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/legal/terms">Terms of Service</FooterLink>
            <FooterLink href="/cookies">Cookie Policy</FooterLink>
          </Box>
        </Box>
        
        {/* Copyright */}
        <Box sx={{ 
          mt: 6, 
          pt: 3, 
          borderTop: `1px solid ${theme.palette.divider}`,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          textAlign: { xs: 'center', sm: 'left' }
        }}>
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Smartslate. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Made with ❤️ for better education
          </Typography>
        </Box>
      </FooterContent>
    </FooterWrapper>
  );
}
