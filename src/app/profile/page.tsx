'use client';

import { useAuth } from '@/contexts/AuthContext';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

// Add global CSS for animations
const globalStyles = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
    }
    50% {
      transform: translateY(-20px) rotate(1deg);
    }
  }
  
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  @keyframes slideInUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fadeInScale {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

// Inject global styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = globalStyles;
  document.head.appendChild(style);
}
import { 
  Container, 
  Box, 
  Typography, 
  Avatar, 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  Stack, 
  IconButton, 
  CircularProgress, 
  Snackbar, 
  Alert,
  Divider,
  Chip,
  Card,
  CardContent,
  Fade,
  Slide
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { 
  CameraAlt, 
  Save, 
  Edit, 
  Person, 
  Business, 
  Phone, 
  LocationOn, 
  Language, 
  Twitter, 
  LinkedIn, 
  GitHub,
  Description,
  CheckCircle,
  ArrowBack
} from '@mui/icons-material';

// Styled Components
const ProfileWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, var(--background-dark) 0%, var(--background-paper) 100%)',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(8),
}));

const HeroSection = styled(Box)(({ theme }) => ({
  background: `
    radial-gradient(circle at 20% 80%, rgba(167, 218, 219, 0.12) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.08) 0%, transparent 50%),
    linear-gradient(135deg, rgba(13, 27, 42, 0.95) 0%, rgba(20, 36, 51, 0.95) 100%)
  `,
  borderRadius: '24px',
  padding: theme.spacing(6),
  marginBottom: theme.spacing(6),
  position: 'relative',
  overflow: 'hidden',
  border: '1px solid rgba(167, 218, 219, 0.15)',
  boxShadow: `
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 8px 16px rgba(167, 218, 219, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.08)
  `,
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      linear-gradient(45deg, transparent 30%, rgba(167, 218, 219, 0.03) 50%, transparent 70%)
    `,
    pointerEvents: 'none',
    animation: 'shimmer 10s ease-in-out infinite',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '-1px',
    left: '-1px',
    right: '-1px',
    bottom: '-1px',
    background: 'linear-gradient(45deg, var(--primary-accent), var(--secondary-accent), var(--primary-accent))',
    borderRadius: '25px',
    zIndex: -1,
    opacity: 0.2,
    filter: 'blur(4px)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4),
    borderRadius: '20px',
  },
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  background: 'rgba(13, 27, 42, 0.6)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(167, 218, 219, 0.2)',
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(167, 218, 219, 0.3)',
  },
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: '0 auto',
  marginBottom: theme.spacing(3),
  background: `
    linear-gradient(135deg, var(--primary-accent) 0%, var(--secondary-accent) 50%, var(--primary-accent) 100%),
    linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%)
  `,
  fontSize: '3rem',
  fontWeight: 700,
  boxShadow: `
    0 12px 24px rgba(0, 0, 0, 0.2),
    0 4px 8px rgba(167, 218, 219, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.15)
  `,
  border: '3px solid rgba(167, 218, 219, 0.3)',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  '&:hover': {
    transform: 'scale(1.05) translateY(-4px)',
    boxShadow: `
      0 20px 32px rgba(0, 0, 0, 0.3),
      0 8px 16px rgba(167, 218, 219, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: -2,
    background: 'linear-gradient(45deg, var(--primary-accent), var(--secondary-accent), var(--primary-accent))',
    borderRadius: '50%',
    zIndex: -1,
    opacity: 0.3,
    animation: 'rotate 6s linear infinite',
    filter: 'blur(2px)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)',
    borderRadius: '50%',
    pointerEvents: 'none',
  },
}));

const UserInfoContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  zIndex: 2,
  animation: 'slideInUp 0.6s ease-out',
  '& .MuiTypography-h4': {
    background: 'linear-gradient(135deg, var(--primary-accent) 0%, var(--secondary-accent) 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 700,
    marginBottom: theme.spacing(1),
    fontSize: '1.8rem',
    textShadow: '0 0 20px rgba(167, 218, 219, 0.2)',
    letterSpacing: '-0.01em',
  },
  '& .MuiTypography-body1': {
    color: 'var(--text-secondary)',
    fontSize: '1rem',
    marginBottom: theme.spacing(2.5),
    opacity: 0.85,
    fontWeight: 400,
    letterSpacing: '0.01em',
  },
}));

const InfoChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  background: `
    linear-gradient(135deg, rgba(167, 218, 219, 0.12) 0%, rgba(79, 70, 229, 0.08) 100%)
  `,
  border: '1px solid rgba(167, 218, 219, 0.3)',
  color: 'var(--primary-accent)',
  fontWeight: 500,
  fontSize: '0.85rem',
  padding: theme.spacing(1),
  borderRadius: '16px',
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  backdropFilter: 'blur(8px)',
  boxShadow: `
    0 2px 8px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(167, 218, 219, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.08)
  `,
  '&:hover': {
    background: `
      linear-gradient(135deg, rgba(167, 218, 219, 0.2) 0%, rgba(79, 70, 229, 0.15) 100%)
    `,
    border: '1px solid rgba(167, 218, 219, 0.5)',
    transform: 'translateY(-2px) scale(1.02)',
    boxShadow: `
      0 4px 12px rgba(0, 0, 0, 0.12),
      0 2px 4px rgba(167, 218, 219, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.15)
    `,
  },
  '& .MuiChip-icon': {
    color: 'var(--primary-accent)',
    fontSize: '1rem',
  },
}));

const GreetingContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  animation: 'fadeInScale 0.8s ease-out 0.1s both',
  '& .MuiTypography-h2': {
    background: 'linear-gradient(135deg, var(--primary-accent) 0%, var(--secondary-accent) 50%, var(--primary-accent) 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 800,
    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
    lineHeight: 1,
    marginBottom: theme.spacing(2),
    textShadow: '0 0 25px rgba(167, 218, 219, 0.3)',
    letterSpacing: '-0.02em',
    animation: 'pulse 4s ease-in-out infinite',
  },
  '& .MuiTypography-h5': {
    color: 'var(--text-secondary)',
    fontWeight: 400,
    fontSize: { xs: '1.1rem', sm: '1.2rem' },
    opacity: 0.8,
    lineHeight: 1.3,
    letterSpacing: '0.01em',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
  },
}));

const SectionCard = styled(Card)(({ theme }) => ({
  background: 'rgba(20, 36, 51, 0.4)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(20, 36, 51, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: theme.spacing(1),
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(167, 218, 219, 0.3)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'var(--primary-accent)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'var(--text-secondary)',
    '&.Mui-focused': {
      color: 'var(--primary-accent)',
    },
  },
  '& .MuiInputBase-input': {
    color: 'var(--text-primary)',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, var(--primary-accent) 0%, var(--secondary-accent) 100%)',
  borderRadius: theme.spacing(2),
  padding: `${theme.spacing(1.5)} ${theme.spacing(4)}`,
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(167, 218, 219, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(167, 218, 219, 0.4)',
  },
}));

const BackButton = styled(Button)(({ theme }) => ({
  color: 'var(--text-secondary)',
  borderColor: 'rgba(167, 218, 219, 0.3)',
  borderRadius: '12px',
  padding: `${theme.spacing(1.5)} ${theme.spacing(4)}`,
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.9rem',
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  background: `
    linear-gradient(135deg, rgba(167, 218, 219, 0.08) 0%, rgba(79, 70, 229, 0.04) 100%)
  `,
  backdropFilter: 'blur(12px)',
  boxShadow: `
    0 2px 8px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(167, 218, 219, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.08)
  `,
  '&:hover': {
    borderColor: 'var(--primary-accent)',
    color: 'var(--primary-accent)',
    background: `
      linear-gradient(135deg, rgba(167, 218, 219, 0.15) 0%, rgba(79, 70, 229, 0.08) 100%)
    `,
    transform: 'translateY(-2px)',
    boxShadow: `
      0 4px 12px rgba(0, 0, 0, 0.12),
      0 2px 4px rgba(167, 218, 219, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.15)
    `,
  },
}));

const CameraButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: 8,
  right: -8,
  background: `
    linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.75) 100%)
  `,
  color: 'white',
  border: '2px solid var(--primary-accent)',
  width: 36,
  height: 36,
  backdropFilter: 'blur(8px)',
  boxShadow: `
    0 4px 12px rgba(0, 0, 0, 0.2),
    0 2px 4px rgba(167, 218, 219, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.08)
  `,
  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&:hover': {
    background: `
      linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.8) 100%)
    `,
    transform: 'scale(1.1) rotate(3deg)',
    boxShadow: `
      0 6px 16px rgba(0, 0, 0, 0.25),
      0 3px 6px rgba(167, 218, 219, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.15)
    `,
  },
}));

const FloatingOrbs = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  zIndex: 1,
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(167, 218, 219, 0.08) 0%, transparent 70%)',
    animation: 'float 8s ease-in-out infinite',
  },
  '&::before': {
    width: '80px',
    height: '80px',
    top: '15%',
    right: '20%',
    animationDelay: '0s',
  },
  '&::after': {
    width: '60px',
    height: '60px',
    bottom: '25%',
    left: '15%',
    animationDelay: '4s',
  },
}));

export default function ProfilePage() {
  const { isAuthenticated, user, loading, token } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [profile, setProfile] = useState<{
    full_name?: string;
    company?: string;
    phone?: string;
    bio?: string;
    location?: string;
    website?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
    avatar_url?: string;
  } | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const [avatarImgError, setAvatarImgError] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/sign-in');
    }
  }, [loading, isAuthenticated, router]);

  const displayName = useMemo(() => {
    return profile?.full_name || user?.full_name || 'User';
  }, [profile?.full_name, user?.full_name]);

  const firstName = useMemo(() => {
    return displayName.split(' ')[0] || 'User';
  }, [displayName]);

  const loadProfile = useCallback(async () => {
    if (!token) return;
    setLoadingProfile(true);
    try {
      const res = await fetch('/api/profile', { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to load profile');
      const dbProfile = data.profile || {};
      let candidate: string | undefined = ((): string | undefined => {
        const v = dbProfile.avatar_url as string | undefined;
        if (!v) return undefined;
        const s = String(v).trim();
        if (!s || s.toLowerCase() === 'null' || s.toLowerCase() === 'undefined') return undefined;
        if (/^https?:\/\//i.test(s) || s.startsWith('/')) return s;
        return undefined;
      })();

      if (!candidate) {
        try {
          const supabase = getSupabaseBrowser();
          const { data: sess } = await supabase.auth.getSession();
          const meta: any = sess?.session?.user?.user_metadata || {};
          const fallback = meta.avatar_url || meta.picture || null;
          if (fallback && (typeof fallback === 'string')) {
            const s = String(fallback).trim();
            if (s && s.toLowerCase() !== 'null' && s.toLowerCase() !== 'undefined' && (/^https?:\/\//i.test(s) || s.startsWith('/'))) {
              candidate = s;
            }
          }
        } catch {}
      }

      setProfile({
        full_name: dbProfile.full_name || user?.full_name,
        company: dbProfile.company || '',
        phone: dbProfile.phone || '',
        bio: dbProfile.bio || '',
        location: dbProfile.location || '',
        website: dbProfile.website || '',
        twitter: dbProfile.twitter || '',
        linkedin: dbProfile.linkedin || '',
        github: dbProfile.github || '',
        avatar_url: candidate,
      });
      setAvatarImgError(false);
    } catch (e: any) {
      setToast({ open: true, message: e?.message || 'Could not load profile', severity: 'error' });
    } finally {
      setLoadingProfile(false);
    }
  }, [token, user?.full_name]);

  useEffect(() => {
    if (isAuthenticated && token) {
      loadProfile();
    }
  }, [isAuthenticated, token, loadProfile]);

  if (loading) {
    return (
      <ProfileWrapper>
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <CircularProgress size={40} sx={{ color: 'var(--primary-accent)' }} />
          </Box>
        </Container>
      </ProfileWrapper>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const userInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] || '';
    const second = parts.length > 1 ? parts[1][0] : '';
    return (first + second).toUpperCase();
  };

  const onSave = async () => {
    if (!token || !profile) return;
    setSaving(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          full_name: profile.full_name,
          company: profile.company,
          phone: profile.phone,
          bio: profile.bio,
          location: profile.location,
          website: profile.website,
          twitter: profile.twitter,
          linkedin: profile.linkedin,
          github: profile.github,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Failed to save');
      setToast({ open: true, message: 'Profile updated successfully!', severity: 'success' });
      setEditing(false);
    } catch (e: any) {
      setToast({ open: true, message: e?.message || 'Failed to save', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const onAvatarClick = () => fileInputRef.current?.click();
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/profile/avatar', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Upload failed');
      setProfile((p) => ({ ...(p || {}), avatar_url: data.url }));
      try {
        window.dispatchEvent(new CustomEvent('avatar-url-changed', { detail: { url: data.url } }));
      } catch {}
      setAvatarImgError(false);
      setToast({ open: true, message: 'Avatar updated successfully!', severity: 'success' });
    } catch (e: any) {
      setToast({ open: true, message: e?.message || 'Upload failed', severity: 'error' });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const hasSocialLinks = profile?.twitter || profile?.linkedin || profile?.github || profile?.website;

  return (
    <ProfileWrapper>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <HeroSection>
          <FloatingOrbs />
          <Box position="relative" zIndex={2}>
            <Stack direction="row" alignItems="center" spacing={2} mb={4}>
              <BackButton
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => router.back()}
              >
                Back
              </BackButton>
            </Stack>
            
            <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} alignItems="center" gap={{ xs: 3, lg: 6 }}>
              {/* Left side - Avatar and basic info */}
              <UserInfoContainer flex={{ lg: '0 0 40%' }}>
                <Box position="relative" display="inline-block">
                  <ProfileAvatar src={avatarImgError ? undefined : (profile?.avatar_url || undefined)} onError={() => setAvatarImgError(true)}>
                    {(avatarImgError || !profile?.avatar_url) && userInitials(displayName)}
                  </ProfileAvatar>
                  <CameraButton
                    aria-label="Change avatar"
                    onClick={onAvatarClick}
                  >
                    {uploading ? <CircularProgress size={20} color="inherit" /> : <CameraAlt fontSize="small" />}
                  </CameraButton>
                  <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={onAvatarChange} />
                </Box>
                
                <Typography variant="h4" component="h2" gutterBottom>
                  {displayName}
                </Typography>
                
                <Typography variant="body1" gutterBottom>
                  {user.email}
                </Typography>

                <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                  {profile?.company && (
                    <InfoChip 
                      icon={<Business />} 
                      label={profile.company} 
                      variant="outlined" 
                    />
                  )}

                  {profile?.location && (
                    <InfoChip 
                      icon={<LocationOn />} 
                      label={profile.location} 
                      variant="outlined" 
                    />
                  )}
                </Box>
              </UserInfoContainer>

              {/* Right side - Greeting */}
              <GreetingContainer flex={{ lg: '0 0 60%' }}>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  gutterBottom 
                >
                  Hello, {firstName}! 👋
                </Typography>
                <Typography 
                  variant="h5" 
                  color="text.secondary" 
                >
                  Welcome to your profile dashboard
                </Typography>
              </GreetingContainer>
            </Box>
          </Box>
        </HeroSection>

        {/* Main Profile Content */}
        <Box>
          {/* Profile Details Form */}
          <Box>
            <Slide direction="up" in timeout={800}>
              <SectionCard>
                <CardContent sx={{ p: 4 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h5" component="h3" fontWeight={600} color="primary">
                      Profile Information
                    </Typography>
                    <Button
                      variant={editing ? "outlined" : "contained"}
                      startIcon={editing ? <CheckCircle /> : <Edit />}
                      onClick={() => setEditing(!editing)}
                      sx={{ 
                        background: editing ? 'transparent' : 'linear-gradient(135deg, var(--primary-accent) 0%, var(--secondary-accent) 100%)',
                        borderColor: editing ? 'var(--primary-accent)' : 'transparent',
                        color: editing ? 'var(--primary-accent)' : 'white',
                        textTransform: 'none',
                        borderRadius: 2
                      }}
                    >
                      {editing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                  </Box>

                  {loadingProfile && (
                    <Box display="flex" justifyContent="center" py={4}>
                      <CircularProgress size={32} sx={{ color: 'var(--primary-accent)' }} />
                    </Box>
                  )}

                  {!loadingProfile && profile && (
                    <Box component="form" noValidate onSubmit={(e) => { e.preventDefault(); onSave(); }}>
                      <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={3}>
                        <StyledTextField
                          label="Full Name"
                          fullWidth
                          value={profile.full_name || ''}
                          onChange={(e) => setProfile(p => ({ ...(p || {}), full_name: e.target.value }))}
                          disabled={!editing}
                          InputProps={{
                            startAdornment: <Person sx={{ mr: 1, color: 'var(--text-secondary)' }} />
                          }}
                        />
                        <StyledTextField
                          label="Email"
                          fullWidth
                          value={user.email}
                          disabled
                          InputProps={{
                            startAdornment: <Person sx={{ mr: 1, color: 'var(--text-secondary)' }} />
                          }}
                        />
                        <StyledTextField
                          label="Company"
                          fullWidth
                          value={profile.company || ''}
                          onChange={(e) => setProfile(p => ({ ...(p || {}), company: e.target.value }))}
                          disabled={!editing}
                          InputProps={{
                            startAdornment: <Business sx={{ mr: 1, color: 'var(--text-secondary)' }} />
                          }}
                        />
                        <StyledTextField
                          label="Phone"
                          fullWidth
                          value={profile.phone || ''}
                          onChange={(e) => setProfile(p => ({ ...(p || {}), phone: e.target.value }))}
                          disabled={!editing}
                          InputProps={{
                            startAdornment: <Phone sx={{ mr: 1, color: 'var(--text-secondary)' }} />
                          }}
                        />
                        <StyledTextField
                          label="Location"
                          fullWidth
                          value={profile.location || ''}
                          onChange={(e) => setProfile(p => ({ ...(p || {}), location: e.target.value }))}
                          disabled={!editing}
                          InputProps={{
                            startAdornment: <LocationOn sx={{ mr: 1, color: 'var(--text-secondary)' }} />
                          }}
                        />
                        <StyledTextField
                          label="Website"
                          fullWidth
                          placeholder="https://..."
                          value={profile.website || ''}
                          onChange={(e) => setProfile(p => ({ ...(p || {}), website: e.target.value }))}
                          disabled={!editing}
                          InputProps={{
                            startAdornment: <Language sx={{ mr: 1, color: 'var(--text-secondary)' }} />
                          }}
                        />
                        <StyledTextField
                          label="Twitter (X)"
                          fullWidth
                          placeholder="@handle"
                          value={profile.twitter || ''}
                          onChange={(e) => setProfile(p => ({ ...(p || {}), twitter: e.target.value }))}
                          disabled={!editing}
                          InputProps={{
                            startAdornment: <Twitter sx={{ mr: 1, color: 'var(--text-secondary)' }} />
                          }}
                        />
                        <StyledTextField
                          label="LinkedIn"
                          fullWidth
                          placeholder="Profile URL"
                          value={profile.linkedin || ''}
                          onChange={(e) => setProfile(p => ({ ...(p || {}), linkedin: e.target.value }))}
                          disabled={!editing}
                          InputProps={{
                            startAdornment: <LinkedIn sx={{ mr: 1, color: 'var(--text-secondary)' }} />
                          }}
                        />
                        <StyledTextField
                          label="GitHub"
                          fullWidth
                          placeholder="username"
                          value={profile.github || ''}
                          onChange={(e) => setProfile(p => ({ ...(p || {}), github: e.target.value }))}
                          disabled={!editing}
                          InputProps={{
                            startAdornment: <GitHub sx={{ mr: 1, color: 'var(--text-secondary)' }} />
                          }}
                        />
                        <Box gridColumn={{ xs: '1', sm: '1 / -1' }}>
                          <StyledTextField
                            label="Bio"
                            fullWidth
                            multiline
                            minRows={4}
                            value={profile.bio || ''}
                            onChange={(e) => setProfile(p => ({ ...(p || {}), bio: e.target.value }))}
                            disabled={!editing}
                            InputProps={{
                              startAdornment: <Description sx={{ mr: 1, color: 'var(--text-secondary)', alignSelf: 'flex-start', mt: 1 }} />
                            }}
                          />
                        </Box>
                      </Box>

                      {editing && (
                        <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
                          <ActionButton
                            type="submit"
                            startIcon={<Save />}
                            disabled={saving}
                            variant="contained"
                          >
                            {saving ? 'Saving...' : 'Save Changes'}
                          </ActionButton>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              setEditing(false);
                              loadProfile();
                            }}
                            disabled={saving}
                            sx={{
                              borderColor: 'rgba(255, 255, 255, 0.2)',
                              color: 'var(--text-secondary)',
                              '&:hover': {
                                borderColor: 'var(--primary-accent)',
                                color: 'var(--primary-accent)'
                              }
                            }}
                          >
                            Cancel
                          </Button>
                        </Stack>
                      )}
                    </Box>
                  )}
                </CardContent>
              </SectionCard>
            </Slide>
          </Box>
        </Box>
      </Container>

      <Snackbar 
        open={toast.open} 
        autoHideDuration={4000} 
        onClose={() => setToast(t => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setToast(t => ({ ...t, open: false }))} 
          severity={toast.severity} 
          variant="filled" 
          sx={{ 
            width: '100%',
            background: toast.severity === 'success' ? 'var(--primary-accent)' : undefined
          }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ProfileWrapper>
  );
}
