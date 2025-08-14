'use client';

import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/contexts/AuthContext';
import { useUserRoles } from '@/hooks/useUserRoles';
import { useAuthModal } from '@/hooks/useAuthModal';

// Styled components
const MobileMenuButton = styled(motion.button)(({ theme }) => ({
  display: 'none',
  position: 'relative',
  width: 32,
  height: 32,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  padding: 0,
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const HamburgerIcon = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  width: 24,
  height: 24,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const HamburgerLine = styled(motion.span)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: 2,
  backgroundColor: theme.palette.text.primary,
  borderRadius: 1,
  transition: 'background-color 0.2s ease',
}));

const MobileMenuBackdrop = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(8px)',
  zIndex: 1100,
}));

const MobileMenuPanel = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  width: '85%',
  maxWidth: 360,
  height: '100%',
  backgroundColor: 'rgba(13, 27, 42, 0.98)',
  backdropFilter: 'blur(24px)',
  zIndex: 1101,
  padding: theme.spacing(4),
  boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.4)',
  borderLeft: `1px solid ${theme.palette.primary.main}`,
  display: 'flex',
  flexDirection: 'column',
}));

const MobileNav = styled(motion.nav)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  marginTop: theme.spacing(6),
  flex: 1,
}));

const MobileNavLink = styled(motion.create(Link))(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  fontSize: '1.1rem',
  fontWeight: 500,
  padding: `${theme.spacing(2)} ${theme.spacing(2)}`,
  borderRadius: theme.spacing(1),
  transition: 'all 0.2s ease',
  border: '1px solid transparent',
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(167, 218, 219, 0.08)',
    borderColor: 'rgba(167, 218, 219, 0.2)',
    transform: 'translateX(4px)',
  },
}));

const MobileCTAButton = styled(motion.create(Button))(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: `${theme.spacing(1.5)} ${theme.spacing(3)}`,
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  width: '100%',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
}));

const CloseButton = styled(motion.create(IconButton))(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  color: theme.palette.text.primary,
  width: 40,
  height: 40,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
}));

// Animation variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants = {
  hidden: { 
    x: '100%',
    scale: 0.95,
  },
  visible: { 
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
      duration: 0.6,
    }
  },
  exit: { 
    x: '100%',
    scale: 0.95,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
      duration: 0.4,
    }
  },
};

const menuItemVariants = {
  hidden: { 
    opacity: 0, 
    x: 20,
    scale: 0.95,
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    }
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: 20,
    scale: 0.95,
    transition: {
      delay: (3 - i) * 0.03,
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    }
  }),
};

const buttonVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.9,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.2 + (i * 0.05),
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    }
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: 20,
    scale: 0.9,
    transition: {
      delay: (2 - i) * 0.03,
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1],
    }
  }),
};

const hamburgerVariants = {
  closed: {
    rotate: 0,
    scale: 1,
  },
  open: {
    rotate: 180,
    scale: 1.1,
  },
};

const lineVariants = {
  closed: {
    rotate: 0,
    y: 0,
  },
  open: (i: number) => ({
    rotate: i === 1 ? 45 : i === 2 ? -45 : 0,
    y: i === 1 ? 6 : i === 2 ? -6 : 0,
    opacity: i === 3 ? 0 : 1,
  }),
};

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navItems: Array<{ label: string; href: string }>;
}

export default function MobileMenu({ open, onClose, navItems }: MobileMenuProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const { isOwner } = useUserRoles();
  const router = useRouter();
  const { open: openAuth } = useAuthModal();

  const userInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] || '';
    const second = parts.length > 1 ? parts[1][0] : '';
    return (first + second).toUpperCase();
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const handleNavClick = (href: string) => {
    onClose();
    router.push(href);
  };

  const handleAuthAction = (action: () => void) => {
    onClose();
    action();
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <MobileMenuBackdrop
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <MobileMenuPanel
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header with logo and close button */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <Image
                  src="/logo.png"
                  alt="SmartSlate Logo"
                  width={140}
                  height={32}
                />
              </motion.div>
              
                             <CloseButton
                 onClick={onClose}
                 aria-label="Close menu"
                 variants={{
                   hidden: { opacity: 0, scale: 0.8 },
                   visible: { opacity: 1, scale: 1 },
                   exit: { opacity: 0, scale: 0.8 },
                 }}
                 initial="hidden"
                 animate="visible"
                 exit="exit"
                 transition={{ duration: 0.3 }}
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
               >
                 <Box
                   sx={{
                     fontSize: '1.5rem',
                     fontWeight: 'bold',
                     lineHeight: 1,
                     color: 'text.primary',
                   }}
                 >
                   ×
                 </Box>
               </CloseButton>
            </Box>

            {/* Navigation Items */}
            <MobileNav>
              {navItems.map((item, index) => (
                <MobileNavLink
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  custom={index}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </MobileNavLink>
              ))}
            </MobileNav>

            {/* Auth Buttons */}
            <Box sx={{ mt: 'auto', pt: 2 }}>
              {isAuthenticated ? (
                <>
                  {isOwner && (
                    <MobileCTAButton 
                      variant="outlined" 
                      onClick={() => handleAuthAction(() => router.push('/admin'))}
                      custom={0}
                      variants={buttonVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
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
                    onClick={() => handleAuthAction(() => router.push('/profile'))}
                    custom={1}
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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
                    onClick={() => handleAuthAction(() => logout())}
                    custom={2}
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
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
                <MobileCTAButton 
                  variant="contained" 
                  onClick={() => handleAuthAction(() => openAuth('signup'))}
                  custom={0}
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  sx={{
                    backgroundColor: 'secondary.main',
                    '&:hover': {
                      backgroundColor: 'secondary.dark',
                    }
                  }}
                >
                  Get Started
                </MobileCTAButton>
              )}
            </Box>
          </MobileMenuPanel>
        )}
      </AnimatePresence>
    </>
  );
}

// Animated Hamburger Button Component
export function AnimatedHamburgerButton({ 
  open, 
  onClick, 
  'aria-label': ariaLabel 
}: { 
  open: boolean; 
  onClick: () => void; 
  'aria-label': string; 
}) {
  return (
    <MobileMenuButton
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={open}
      variants={hamburgerVariants}
      animate={open ? 'open' : 'closed'}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <HamburgerIcon>
        {[1, 2, 3].map((i) => (
          <HamburgerLine
            key={i}
            custom={i}
            variants={lineVariants}
            animate={open ? 'open' : 'closed'}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              top: `${(i - 1) * 6 + 3}px`,
            }}
          />
        ))}
      </HamburgerIcon>
    </MobileMenuButton>
  );
}
