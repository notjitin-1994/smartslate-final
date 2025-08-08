'use client';

import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Container, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useGetStartedModal } from '@/hooks/useGetStartedModal';
import { useAuth } from '@/contexts/AuthContext';

const HeaderWrapper = styled('header', {
  shouldForwardProp: (prop) => prop !== 'hide'
})<{ hide?: boolean }>(({ theme, hide }) => ({
  position: 'fixed',
  top: theme.spacing(2),
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1000,
  // Anchor width to the viewport to avoid body overflow affecting header width
  width: 'calc(100vw - 32px)',
  maxWidth: theme.breakpoints.values.lg, // Use theme breakpoint for lg (1280px)
  opacity: hide ? 0 : 1,
  visibility: hide ? 'hidden' : 'visible',
  transition: 'opacity 0.3s ease, visibility 0.3s ease',
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100vw - 16px)',
    top: theme.spacing(1),
  },
}));

const HeaderBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'rgba(9, 21, 33, 0.25)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(42, 58, 74, 0.5)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
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
  height: 32,
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('sm')]: {
    height: 28,
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
    height: 2,
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.3s ease',
  },
  '&:hover': {
    color: theme.palette.primary.main,
    '&::after': {
      width: '100%',
    },
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: '#ffffff',
  padding: `${theme.spacing(1)} ${theme.spacing(2.5)}`,
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.9rem',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
  },
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  display: 'none',
  color: theme.palette.text.primary,
  [theme.breakpoints.down('md')]: {
    display: 'flex',
  },
}));

const MobileMenuBackdrop = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open'
})<{ open: boolean }>(({ theme, open }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(5px)',
  opacity: open ? 1 : 0,
  visibility: open ? 'visible' : 'hidden',
  transition: 'all 0.3s ease',
  zIndex: 1100,
}));

const MobileMenuPanel = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open'
})<{ open: boolean }>(({ theme, open }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  width: '80%',
  maxWidth: 320,
  height: '100%',
  backgroundColor: 'rgba(13, 27, 42, 0.95)',
  backdropFilter: 'blur(20px)',
  zIndex: 1101,
  padding: theme.spacing(4),
  transform: open ? 'translateX(0)' : 'translateX(100%)',
  transition: 'transform 0.3s ease',
  boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.3)',
  borderLeft: `1px solid ${theme.palette.primary.main}`,
}));

const MobileNav = styled('nav')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  marginTop: theme.spacing(8),
}));

const MobileNavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  fontSize: '1.1rem',
  fontWeight: 500,
  padding: `${theme.spacing(1.5)} 0`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.2s ease',
  '&:hover': {
    color: theme.palette.primary.main,
    paddingLeft: theme.spacing(1),
  },
}));

const MobileCTAButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  backgroundColor: theme.palette.secondary.main,
  color: '#ffffff',
  padding: `${theme.spacing(1.5)} ${theme.spacing(3)}`,
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  width: '100%',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const { openModal } = useGetStartedModal();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Products', href: '/products' },
    { label: 'The SmartSlate Difference', href: '/difference' },
    { label: 'Partner & Collaborate', href: '/collaborate' },
  ];

  return (
    <>
      <HeaderWrapper hide={mobileMenuOpen}>
        <HeaderBackground />
        <HeaderContent maxWidth="lg">
          <LogoLink href="/">
            <Image
              src="/logo.png"
              alt="SmartSlate Logo"
              width={140}
              height={32}
              priority
            />
          </LogoLink>

          <NavContainer>
            <DesktopNav>
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </DesktopNav>

            {isAuthenticated ? (
              <CTAButton 
                variant="contained" 
                onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                startIcon={<AccountCircleIcon />}
              >
                {user?.full_name?.split(' ')[0] || 'Profile'}
              </CTAButton>
            ) : (
              <CTAButton variant="contained" onClick={openModal}>
                Get Started
              </CTAButton>
            )}

            <MobileMenuButton
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon />
            </MobileMenuButton>
          </NavContainer>
        </HeaderContent>
      </HeaderWrapper>

      <MobileMenuBackdrop
        open={mobileMenuOpen}
        onClick={() => setMobileMenuOpen(false)}
      />

      <MobileMenuPanel open={mobileMenuOpen}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Image
            src="/logo.png"
            alt="SmartSlate Logo"
            width={140}
            height={32}
          />
          <IconButton
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            sx={{ color: 'text.primary' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Logo removed - header logo remains visible */}

        <MobileNav>
          {navItems.map((item) => (
            <MobileNavLink
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </MobileNavLink>
          ))}
        </MobileNav>

        {isAuthenticated ? (
          <MobileCTAButton variant="contained" onClick={() => {
            setMobileMenuOpen(false);
            logout();
          }}>
            Logout
          </MobileCTAButton>
        ) : (
          <MobileCTAButton variant="contained" onClick={() => {
            setMobileMenuOpen(false);
            openModal();
          }}>
            Get Started
          </MobileCTAButton>
        )}
      </MobileMenuPanel>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={() => setUserMenuAnchor(null)}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(13, 27, 42, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(42, 58, 74, 0.5)',
            borderRadius: 2,
            mt: 1,
          }
        }}
      >
        <MenuItem 
          onClick={() => {
            setUserMenuAnchor(null);
            logout();
          }}
          sx={{ color: 'text.primary' }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
