'use client';

import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

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
  overflow: 'hidden',
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
  borderRadius: 4, // Thin rounded square
  transition: 'all 0.2s ease',
  border: '1px solid transparent',
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(167, 218, 219, 0.08)',
    borderColor: 'rgba(167, 218, 219, 0.2)',
    transform: 'translateX(4px)',
  },
}));

const MobileCTAButton = styled(Button)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.text.primary,
  fontWeight: 600,
  padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
  borderRadius: 4, // Thin rounded square
  textTransform: 'none',
  fontSize: '1rem',
  transition: 'all 0.2s ease',
  border: '1px solid transparent',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  },
}));

const CloseButton = styled(motion.button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  width: 40,
  height: 40,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.primary,
  fontSize: '1.5rem',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'rotate(90deg)',
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

// Animation variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants = {
  hidden: { x: '100%' },
  visible: { x: 0 },
  exit: { x: '100%' },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
  exit: { opacity: 0, y: 20 },
};

const hamburgerVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const lineVariants = {
  open: (i: number) => ({
    rotate: i === 1 ? 45 : i === 2 ? -45 : 0,
    y: i === 1 ? 6 : i === 2 ? -6 : 0,
  }),
  closed: {
    rotate: 0,
    y: 0,
  },
};

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navItems: Array<{ label: string; href: string }>;
}

export default function MobileMenu({ open, onClose, navItems }: MobileMenuProps) {
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

  const handleAuthAction = (action: () => void) => {
    onClose();
    action();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <MobileMenuBackdrop
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <MobileMenuPanel
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <CloseButton onClick={onClose} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              ×
            </CloseButton>

            <LogoContainer>
              <Image
                src="/logo.png"
                alt="Smartslate"
                width={100}
                height={26}
                priority
                style={{ height: 'auto' }}
              />
            </LogoContainer>

            <MobileNav>
              {navItems.map((item, index) => (
                <MobileNavLink
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  custom={index}
                  variants={buttonVariants}
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

            <Box sx={{ mt: 'auto', pt: 2 }}>
              <Link href="/get-started" style={{ textDecoration: 'none' }}>
                <MobileCTAButton
                  variant="contained"
                  sx={{
                    backgroundColor: 'secondary.main',
                    '&:hover': {
                      backgroundColor: 'secondary.dark',
                    }
                  }}
                >
                  Get Started
                </MobileCTAButton>
              </Link>
            </Box>
          </MobileMenuPanel>
        </>
      )}
    </AnimatePresence>
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
            transition={{ duration: 0.3 }}
            style={{
              top: `${(i - 1) * 6 + 3}px`,
            }}
          />
        ))}
      </HamburgerIcon>
    </MobileMenuButton>
  );
}
