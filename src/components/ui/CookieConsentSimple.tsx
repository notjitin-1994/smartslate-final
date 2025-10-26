'use client';

import { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  IconButton, 
  Chip,
  Switch,
  FormControlLabel,
  Divider,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  Close as CloseIcon,
  Cookie as CookieIcon,
  Settings as SettingsIcon,
  CheckCircle as CheckIcon,
  Info as InfoIcon,
  Security as SecurityIcon,
  Analytics as AnalyticsIcon,
  Campaign as MarketingIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

// Styled Components
const ConsentBanner = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(9, 21, 33, 0.95)',
  backdropFilter: 'blur(16px) saturate(180%)',
  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
  borderTop: '1px solid rgba(167, 218, 219, 0.3)',
  padding: theme.spacing(3),
  zIndex: 9999,
  boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)',
}));

const ConsentContent = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: theme.spacing(2),
  },
}));

const ConsentText = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 300,
  [theme.breakpoints.down('sm')]: {
    minWidth: 'auto',
  },
}));

const ConsentActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}));

const SettingsDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.background.paper,
    backgroundImage: 'none',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.spacing(2),
    maxWidth: 600,
    width: '100%',
  },
}));

const CookieCategory = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const CookieCategoryHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const CookieDescription = styled(Typography)(({ theme }) => ({
  variant: 'body2',
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  lineHeight: 1.6,
  marginBottom: theme.spacing(1),
}));

export default function CookieConsentSimple() {
  const [showSettings, setShowSettings] = useState(false);
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);
  const [preferences, setPreferences] = useState({
    essential: true,
    performance: false,
    functional: false,
    marketing: false,
  });

  // Check if user has already made a choice
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookie-consent');
      const savedPreferences = localStorage.getItem('cookie-preferences');
      
      if (consent) {
        setHasConsent(true);
        try {
          const parsed = JSON.parse(savedPreferences || '{}');
          setPreferences(parsed);
        } catch (error) {
          console.error('Error parsing cookie preferences:', error);
        }
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      performance: true,
      functional: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-preferences', JSON.stringify(allAccepted));
    setHasConsent(true);
  };

  const handleRejectAll = () => {
    const onlyEssential = {
      essential: true,
      performance: false,
      functional: false,
      marketing: false,
    };
    setPreferences(onlyEssential);
    localStorage.setItem('cookie-consent', 'rejected');
    localStorage.setItem('cookie-preferences', JSON.stringify(onlyEssential));
    setHasConsent(true);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', 'custom');
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences));
    setShowSettings(false);
  };

  const handlePreferenceChange = (category: string, value: boolean) => {
    if (category === 'essential') return; // Essential cookies cannot be disabled
    setPreferences(prev => ({ ...prev, [category]: value }));
  };

  const cookieCategories = [
    {
      key: 'essential',
      title: 'Essential Cookies',
      description: 'Required for the website to function properly, including security, authentication, and basic functionality.',
      icon: <SecurityIcon />,
      required: true,
    },
    {
      key: 'performance',
      title: 'Performance Cookies',
      description: 'Help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      icon: <AnalyticsIcon />,
      required: false,
    },
    {
      key: 'functional',
      title: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization, such as remembering your preferences and login status.',
      icon: <SettingsIcon />,
      required: false,
    },
    {
      key: 'marketing',
      title: 'Marketing Cookies',
      description: 'Used to deliver advertisements that are relevant to you and your interests.',
      icon: <MarketingIcon />,
      required: false,
    },
  ];

  if (hasConsent !== null) return null;

  return (
    <>
      <AnimatePresence>
        {hasConsent === null && (
          <ConsentBanner
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <ConsentContent>
              <ConsentText>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <CookieIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    We Value Your Privacy
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  We use cookies to enhance your experience, analyze site traffic, and personalize content. 
                  By clicking "Accept All", you consent to our use of all cookies. 
                  You can customize your preferences or learn more in our{' '}
                  <Link 
                    href="/cookies" 
                    sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    Cookie Policy
                  </Link>
                  .
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip 
                    icon={<CheckIcon />}
                    label="Essential" 
                    size="small" 
                    color="primary" 
                    sx={{ mb: 1 }}
                  />
                  <Chip 
                    icon={preferences.performance ? <CheckIcon /> : <InfoIcon />}
                    label="Performance" 
                    size="small" 
                    color={preferences.performance ? "success" : "default"}
                    sx={{ mb: 1 }}
                  />
                  <Chip 
                    icon={preferences.functional ? <CheckIcon /> : <InfoIcon />}
                    label="Functional" 
                    size="small" 
                    color={preferences.functional ? "success" : "default"}
                    sx={{ mb: 1 }}
                  />
                  <Chip 
                    icon={preferences.marketing ? <CheckIcon /> : <InfoIcon />}
                    label="Marketing" 
                    size="small" 
                    color={preferences.marketing ? "success" : "default"}
                    sx={{ mb: 1 }}
                  />
                </Box>
              </ConsentText>
              <ConsentActions>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setShowSettings(true)}
                  sx={{ 
                    borderColor: 'rgba(167, 218, 219, 0.5)',
                    color: 'text.secondary',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: 'rgba(167, 218, 219, 0.1)',
                    }
                  }}
                >
                  Customize
                </Button>
                <Button
                  variant="text"
                  size="small"
                  onClick={handleRejectAll}
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    }
                  }}
                >
                  Reject All
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleAcceptAll}
                  sx={{ 
                    backgroundColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    }
                  }}
                >
                  Accept All
                </Button>
              </ConsentActions>
            </ConsentContent>
          </ConsentBanner>
        )}
      </AnimatePresence>

      {/* Settings Dialog */}
      <SettingsDialog
        open={showSettings}
        onClose={() => setShowSettings(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CookieIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Cookie Preferences
          </Typography>
          <IconButton 
            onClick={() => setShowSettings(false)}
            sx={{ ml: 'auto' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Manage your cookie preferences below. Essential cookies are required for the website to function properly.
          </Typography>
          
          {cookieCategories.map((category) => (
            <CookieCategory key={category.key}>
              <CookieCategoryHeader>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {category.icon}
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {category.title}
                  </Typography>
                  {category.required && (
                    <Chip 
                      label="Required" 
                      size="small" 
                      color="primary"
                      sx={{ ml: 'auto' }}
                    />
                  )}
                </Box>
                <FormControlLabel
                  label=""
                  control={
                    <Switch
                      checked={preferences[category.key as keyof typeof preferences]}
                      onChange={(e) => handlePreferenceChange(category.key, e.target.checked)}
                      disabled={category.required}
                      size="small"
                    />
                  }
                />
              </CookieCategoryHeader>
              <CookieDescription>
                {category.description}
              </CookieDescription>
            </CookieCategory>
          ))}

          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
            <InfoIcon sx={{ color: 'primary.main', fontSize: 20 }} />
            <Typography variant="body2" color="text.secondary">
              Learn more about cookies in our{' '}
              <Link 
                href="/cookies" 
                sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Cookie Policy
              </Link>
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setShowSettings(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSavePreferences}
            sx={{ backgroundColor: 'primary.main' }}
          >
            Save Preferences
          </Button>
        </DialogActions>
      </SettingsDialog>
    </>
  );
}