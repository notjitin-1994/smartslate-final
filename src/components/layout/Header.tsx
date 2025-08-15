'use client';

import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Container, Menu, MenuItem, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useUserRoles } from '@/hooks/useUserRoles';
import MobileMenu, { AnimatedHamburgerButton } from './MobileMenu';
import AuthModal from '@/components/auth/AuthModal';
import { useAuthModal } from '@/hooks/useAuthModal';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

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



export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const { isAuthenticated, user, logout, token } = useAuth();
  const { isOwner } = useUserRoles();
  const router = useRouter();
  const { open } = useAuthModal();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarImgError, setAvatarImgError] = useState(false);

  const userInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] || '';
    const second = parts.length > 1 ? parts[1][0] : '';
    return (first + second).toUpperCase();
  };

  const normalizeAvatarUrl = (value?: string | null): string | null => {
    if (!value) return null;
    const s = String(value).trim();
    if (!s || s.toLowerCase() === 'null' || s.toLowerCase() === 'undefined') return null;
    if (/^https?:\/\//i.test(s) || s.startsWith('/')) return s;
    return null;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load avatar url from profile when authenticated
  useEffect(() => {
    let isMounted = true;
    async function loadProfile() {
      if (!isAuthenticated || !token) {
        if (isMounted) setAvatarUrl(null);
        return;
      }
      try {
        const res = await fetch('/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const data = await res.json().catch(() => ({}));
        if (isMounted) {
          let url = normalizeAvatarUrl(data?.profile?.avatar_url) || null;
          // Fallback to Supabase session user metadata if profile lacks avatar
          if (!url) {
            try {
              const supabase = getSupabaseBrowser();
              const { data: sess } = await supabase.auth.getSession();
              const meta: any = sess?.session?.user?.user_metadata || {};
              url = normalizeAvatarUrl(meta.avatar_url || meta.picture || null);
            } catch {}
          }
          setAvatarUrl(url);
          setAvatarImgError(false);
        }
      } catch {}
    }
    loadProfile();
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, token]);

  // Reset image error when url changes
  useEffect(() => {
    setAvatarImgError(false);
  }, [avatarUrl]);

  // React to avatar changes broadcasted from profile page
  useEffect(() => {
    function onAvatarChanged(e: Event) {
      try {
        const evt = e as CustomEvent<{ url?: string | null }>;
        setAvatarUrl(normalizeAvatarUrl(evt.detail?.url || null));
        setAvatarImgError(false);
      } catch {}
    }
    window.addEventListener('avatar-url-changed', onAvatarChanged as EventListener);
    return () => window.removeEventListener('avatar-url-changed', onAvatarChanged as EventListener);
  }, []);


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
          <LogoLink href="/" aria-label="Smartslate home">
            <Image
              src="/logo.png"
              alt="SmartSlate Logo"
              width={140}
              height={32}
              priority
            />
            <span className="sr-only">Smartslate</span>
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
                <Avatar
                  src={avatarImgError ? undefined : (avatarUrl || undefined)}
                  imgProps={{ onError: () => setAvatarImgError(true), referrerPolicy: 'no-referrer' }}
                  sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}
                >
                  {(avatarImgError || !avatarUrl) && userInitials(user?.full_name)}
                </Avatar>
              </IconButton>
            ) : (
              <CTAButton variant="contained" onClick={() => open('signup')}>
                Get Started
              </CTAButton>
            )}

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
          <Avatar
            src={avatarImgError ? undefined : (avatarUrl || undefined)}
            imgProps={{ onError: () => setAvatarImgError(true), referrerPolicy: 'no-referrer' }}
            sx={{ width: 28, height: 28, bgcolor: 'primary.main' }}
          >
            {(avatarImgError || !avatarUrl) && userInitials(user?.full_name)}
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
            logout();
          }}
          sx={{ color: 'text.primary' }}
        >
          Sign Out
        </MenuItem>
      </Menu>

      {/* Auth Modal root */}
      <AuthModal />
    </>
  );
}
