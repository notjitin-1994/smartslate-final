'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedHamburgerButton } from './MobileMenu';
import dynamic from 'next/dynamic';

const MobileMenu = dynamic(() => import('./MobileMenu'), { ssr: false });

const HeaderWrapper = styled('header', {
  shouldForwardProp: (prop) => prop !== 'hide'
})<{ hide?: boolean }>(({ theme, hide }) => ({
  position: 'fixed',
  top: theme.spacing(2),
  left: '50%',
  transform: hide 
    ? 'translateX(-50%) translateY(-20px) scale(0.95)' 
    : 'translateX(-50%) translateY(0) scale(1)',
  zIndex: 1000,
  width: 'calc(100vw - 32px)',
  maxWidth: theme.breakpoints.values.lg,
  opacity: hide ? 0 : 1,
  visibility: hide ? 'hidden' : 'visible',
  transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100vw - 16px)',
    top: theme.spacing(1),
  },
}));

const HeaderBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'rgba(9, 21, 33, 0.4)', // Slightly more opaque fallback
  backdropFilter: 'blur(16px) saturate(180%)',
  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
  border: '1px solid #A7DADB', // Brand accent teal color
  borderRadius: theme.spacing(2),
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  // Support for browsers that don't support backdrop-filter
  '@supports not (backdrop-filter: blur(1px))': {
    backgroundColor: 'rgba(9, 21, 33, 0.85)',
  },
}));

const HeaderContent = styled(Container)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(0.75)} ${theme.spacing(2)}`,
  },
}));

const LogoLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  height: 48,
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('sm')]: {
    height: 44,
  },
}));

const NavContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(4),
}));

const DesktopNav = styled('nav')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  fontSize: '0.9rem',
  fontWeight: 500,
  position: 'relative',
  transition: 'color 0.2s ease',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -4,
    left: 0,
    width: 0,
    height: '2px',
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.3s ease',
  },
  '&:hover::after': {
    width: '100%',
  },
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.primary,
  fontWeight: 600,
  padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
  borderRadius: 4, // Thin rounded square
  textTransform: 'none',
  fontSize: '0.9rem',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none', // Hide on mobile since it's in the hamburger menu
  },
}));

export default function Header() {
  const [hide, setHide] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Only hide when scrolling down and past threshold
          // Show when scrolling up or at the top
          if (currentScrollY < lastScrollY || currentScrollY <= 50) {
            setHide(false);
          } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setHide(true);
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Products', href: '/products' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Vision', href: '/vision' },
  ];

  return (
    <>
      <HeaderWrapper hide={hide}>
        <HeaderBackground />
        <HeaderContent>
          <LogoLink href="/">
            <Image
              src="/logo.png"
              alt="Smartslate"
              width={160}
              height={40}
              priority
              style={{ height: 'auto' }}
            />
          </LogoLink>

          <NavContainer>
            <DesktopNav>
              {navItems.map((item) => (
                <NavLink key={item.label} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </DesktopNav>

            <Link href="/get-started" style={{ textDecoration: 'none' }}>
              <CTAButton variant="contained">
                Get Started
              </CTAButton>
            </Link>

            <AnimatedHamburgerButton
              open={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            />
          </NavContainer>
        </HeaderContent>
      </HeaderWrapper>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
