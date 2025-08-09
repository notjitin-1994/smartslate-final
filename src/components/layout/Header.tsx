'use client';

import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Container, Menu, MenuItem, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useUserRoles } from '@/hooks/useUserRoles';

const HeaderWrapper = styled('header', {
  shouldForwardProp: (prop) => prop !== 'hide'
})<{ hide?: boolean }>(({ theme, hide }) => ({
  position: 'fixed',
  top: theme.spacing(2),
  left: '50%',
  transform: hide ? 'translateX(-50%) translateY(-8px)' : 'translateX(-50%)',
  zIndex: 1000,
  width: 'calc(100vw - 32px)',
  maxWidth: theme.breakpoints.values.lg,
  opacity: hide ? 0 : 1,
  visibility: hide ? 'hidden' : 'visible',
  transition: 'opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease',
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
  border: '0.25px solid var(--primary-accent)',
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
  const { isAuthenticated, user, logout } = useAuth();
  const { isOwner } = useUserRoles();
  const router = useRouter();

  const userInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] || '';
    const second = parts.length > 1 ? parts[1][0] : '';
    return (first + second).toUpperCase();
  };

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
              <IconButton
                onClick={(e) => setUserMenuAnchor(e.currentTarget)}
                aria-label="Account menu"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  p: 0,
                  border: '1px solid rgba(42,58,74,0.6)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
                  '&:hover': { borderColor: 'primary.main', backgroundColor: 'rgba(255,255,255,0.04)' },
                }}
              >
                <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>
                  {userInitials(user?.full_name)}
                </Avatar>
              </IconButton>
            ) : (
              <CTAButton variant="contained" onClick={() => (window.location.href = '/handler/sign-up')}>
                Get Started
              </CTAButton>
            )}

            <MobileMenuButton
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen ? 'true' : 'false'}
              sx={{
                display: { xs: 'flex', md: 'none' },
                transition: 'transform 0.3s ease',
                transform: mobileMenuOpen ? 'rotate(90deg)' : 'none',
              }}
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
            sx={{ color: 'text.primary', transition: 'transform 0.3s ease', transform: mobileMenuOpen ? 'rotate(-90deg)' : 'none' }}
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
          <>
            {isOwner && (
              <MobileCTAButton 
                variant="outlined" 
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push('/admin');
                }}
                sx={{ 
                  mb: 2,
                  borderColor: 'secondary.main',
                  color: 'secondary.main',
                  '&:hover': {
                    borderColor: 'secondary.light',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)'
                  }
                }}
              >
                Admin Dashboard
              </MobileCTAButton>
            )}
            <MobileCTAButton 
              variant="outlined" 
              onClick={() => {
                setMobileMenuOpen(false);
                router.push('/profile');
              }}
              sx={{ 
                mb: 2,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.light',
                  backgroundColor: 'rgba(167, 218, 219, 0.1)'
                }
              }}
            >
              Profile
            </MobileCTAButton>
            <MobileCTAButton 
              variant="contained" 
              onClick={() => {
                setMobileMenuOpen(false);
                window.location.href = '/handler/sign-out';
              }}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)'
                }
              }}
            >
              Sign Out
            </MobileCTAButton>
          </>
        ) : (
          <MobileCTAButton variant="contained" onClick={() => {
            setMobileMenuOpen(false);
            window.location.href = '/handler/sign-up';
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
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main' }}>
            {userInitials(user?.full_name)}
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box component="span" sx={{ fontSize: 14, fontWeight: 600, color: 'text.primary' }}>
              {user?.full_name || 'User'}
            </Box>
            <Box component="span" sx={{ fontSize: 12, color: 'text.secondary' }}>
              {user?.email}
            </Box>
          </Box>
        </Box>
        <Box sx={{ height: 1, bgcolor: 'rgba(255,255,255,0.06)', mx: 1 }} />
        {isOwner && (
          <MenuItem 
            onClick={() => {
              setUserMenuAnchor(null);
              router.push('/admin');
            }}
            sx={{ color: 'text.primary' }}
          >
            Admin Dashboard
          </MenuItem>
        )}
        <MenuItem 
          onClick={() => {
            setUserMenuAnchor(null);
            router.push('/profile');
          }}
          sx={{ color: 'text.primary' }}
        >
          Profile
        </MenuItem>
        <MenuItem 
          onClick={() => {
            setUserMenuAnchor(null);
            router.push('/courses');
          }}
          sx={{ color: 'text.primary' }}
        >
          My Courses
        </MenuItem>
        <Box sx={{ height: 1, bgcolor: 'rgba(255,255,255,0.06)', mx: 1, my: 0.5 }} />
        <MenuItem 
          onClick={() => {
            setUserMenuAnchor(null);
            window.location.href = '/handler/sign-out';
          }}
          sx={{ color: 'text.primary' }}
        >
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
}
