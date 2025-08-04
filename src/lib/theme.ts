'use client';

import { createTheme } from '@mui/material/styles';
import { Quicksand, Lato } from 'next/font/google';

// Configure fonts
const quicksand = Quicksand({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const lato = Lato({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

// Design tokens
export const designTokens = {
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '64px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  },
  transitions: {
    fast: 'all 0.2s ease-in-out',
    medium: 'all 0.3s ease-in-out',
  },
};

// Create Material UI theme with SmartSlate brand colors
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a7dadb',        // Brand primary accent
      light: '#d0edf0',       // Computed lighter variant
      dark: '#7bc5c7',        // Computed darker variant
      contrastText: '#091521', // Dark background for contrast
    },
    secondary: {
      main: '#4F46E5',        // Secondary accent (indigo)
      light: '#7C69F5',       // Computed lighter variant
      dark: '#3730A3',        // Computed darker variant
      contrastText: '#ffffff',
    },
    background: {
      default: '#020C1B',     // Primary dark background
      paper: '#0d1b2a',       // Container/card background
    },
    text: {
      primary: '#e0e0e0',     // Main text color
      secondary: '#b0c5c6',   // Secondary text
      disabled: '#7a8a8b',    // Muted text
    },
    divider: '#2a3a4a',       // Border color
    success: {
      main: '#22c55e',
    },
    error: {
      main: '#ef4444',
    },
    warning: {
      main: '#f59e0b',
    },
  },
  typography: {
    fontFamily: lato.style.fontFamily,
    h1: {
      fontFamily: quicksand.style.fontFamily,
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      color: '#a7dadb',
    },
    h2: {
      fontFamily: quicksand.style.fontFamily,
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      color: '#a7dadb',
    },
    h3: {
      fontFamily: quicksand.style.fontFamily,
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.4,
      color: '#a7dadb',
    },
    h4: {
      fontFamily: quicksand.style.fontFamily,
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      color: '#a7dadb',
    },
    h5: {
      fontFamily: quicksand.style.fontFamily,
      fontWeight: 700,
      fontSize: '1.25rem',
      lineHeight: 1.5,
      color: '#a7dadb',
    },
    h6: {
      fontFamily: quicksand.style.fontFamily,
      fontWeight: 700,
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#a7dadb',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  spacing: 8, // 8px base unit
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 5px 8px -2px rgba(0, 0, 0, 0.08), 0 7px 10px -2px rgba(0, 0, 0, 0.12)',
    '0 6px 10px -2px rgba(0, 0, 0, 0.1), 0 8px 12px -3px rgba(0, 0, 0, 0.14)',
    '0 7px 12px -3px rgba(0, 0, 0, 0.11), 0 9px 14px -3px rgba(0, 0, 0, 0.15)',
    '0 8px 14px -3px rgba(0, 0, 0, 0.12), 0 10px 16px -3px rgba(0, 0, 0, 0.16)',
    '0 9px 16px -4px rgba(0, 0, 0, 0.13), 0 11px 18px -4px rgba(0, 0, 0, 0.17)',
    '0 10px 18px -4px rgba(0, 0, 0, 0.14), 0 12px 20px -4px rgba(0, 0, 0, 0.18)',
    '0 11px 20px -4px rgba(0, 0, 0, 0.15), 0 13px 22px -4px rgba(0, 0, 0, 0.19)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 13px 24px -5px rgba(0, 0, 0, 0.17), 0 15px 26px -5px rgba(0, 0, 0, 0.21)',
    '0 14px 26px -5px rgba(0, 0, 0, 0.18), 0 16px 28px -5px rgba(0, 0, 0, 0.22)',
    '0 15px 28px -5px rgba(0, 0, 0, 0.19), 0 17px 30px -5px rgba(0, 0, 0, 0.23)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0 17px 32px -6px rgba(0, 0, 0, 0.21), 0 19px 34px -6px rgba(0, 0, 0, 0.25)',
    '0 18px 34px -6px rgba(0, 0, 0, 0.22), 0 20px 36px -6px rgba(0, 0, 0, 0.26)',
    '0 19px 36px -6px rgba(0, 0, 0, 0.23), 0 21px 38px -6px rgba(0, 0, 0, 0.27)',
    '0 20px 38px -7px rgba(0, 0, 0, 0.24), 0 22px 40px -7px rgba(0, 0, 0, 0.28)',
    '0 21px 40px -7px rgba(0, 0, 0, 0.25), 0 23px 42px -7px rgba(0, 0, 0, 0.29)',
    '0 22px 42px -7px rgba(0, 0, 0, 0.26), 0 24px 44px -7px rgba(0, 0, 0, 0.3)',
    '0 23px 44px -8px rgba(0, 0, 0, 0.27), 0 25px 46px -8px rgba(0, 0, 0, 0.31)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  ] as const,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#2a3a4a #0d1b2a',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#2a3a4a',
            border: '2px solid #0d1b2a',
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            backgroundColor: '#0d1b2a',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 700,
          padding: '10px 24px',
          fontSize: '1rem',
          transition: designTokens.transitions.fast,
        },
        containedPrimary: {
          backgroundColor: '#4F46E5',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#4338ca',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedSecondary: {
          backgroundColor: '#a7dadb',
          color: '#091521',
          '&:hover': {
            backgroundColor: '#7bc5c7',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 15px -3px rgba(167, 218, 219, 0.3)',
          },
        },
        outlinedPrimary: {
          borderColor: '#a7dadb',
          color: '#a7dadb',
          '&:hover': {
            backgroundColor: 'rgba(167, 218, 219, 0.1)',
            borderColor: '#d0edf0',
          },
        },
        text: {
          color: '#a7dadb',
          '&:hover': {
            backgroundColor: 'rgba(167, 218, 219, 0.08)',
          },
        },
        sizeLarge: {
          padding: '12px 32px',
          fontSize: '1.125rem',
        },
        sizeSmall: {
          padding: '6px 16px',
          fontSize: '0.875rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#0d1b2a',
          border: '1px solid #2a3a4a',
          borderRadius: '16px',
          backgroundImage: 'none',
          transition: designTokens.transitions.fast,
          '&:hover': {
            borderColor: '#a7dadb',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#0d1b2a',
        },
        elevation1: {
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        },
        elevation2: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        elevation3: {
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(2, 12, 27, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid #2a3a4a',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#2a3a4a',
            },
            '&:hover fieldset': {
              borderColor: '#a7dadb',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#a7dadb',
            },
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#a7dadb',
          textDecoration: 'none',
          transition: designTokens.transitions.fast,
          '&:hover': {
            color: '#d0edf0',
            textDecoration: 'underline',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(167, 218, 219, 0.1)',
          color: '#a7dadb',
          border: '1px solid rgba(167, 218, 219, 0.2)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#2a3a4a',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0d1b2a',
          borderRight: '1px solid #2a3a4a',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0d1b2a',
          backgroundImage: 'none',
          border: '1px solid #2a3a4a',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0d1b2a',
          border: '1px solid #2a3a4a',
          backgroundImage: 'none',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#142433',
          color: '#e0e0e0',
          border: '1px solid #2a3a4a',
          fontSize: '0.875rem',
        },
      },
    },
  },
});

export default theme;