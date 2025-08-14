'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Container, Box, Typography, Avatar, Paper, Grid, TextField, Button, Stack, IconButton, CircularProgress, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CameraAlt, Save } from '@mui/icons-material';

const ProfileWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(8),
}));

const ProfileCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(13, 27, 42, 0.5)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(42, 58, 74, 0.5)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(6),
  textAlign: 'center',
  maxWidth: 600,
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4),
  },
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  margin: '0 auto',
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.primary.main,
  fontSize: '3rem',
  fontWeight: 700,
  boxShadow: '0 0 30px rgba(167, 218, 219, 0.3)',
  border: '4px solid rgba(167, 218, 219, 0.2)',
}));

const InfoSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.02)',
  borderRadius: theme.spacing(1),
  border: '1px solid rgba(255, 255, 255, 0.05)',
}));

const InfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${theme.spacing(2)} 0`,
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  '&:last-child': {
    borderBottom: 'none',
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
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/sign-in');
    }
  }, [loading, isAuthenticated, router]);

  const displayName = useMemo(() => {
    return profile?.full_name || user?.full_name || 'User';
  }, [profile?.full_name, user?.full_name]);

  const loadProfile = useCallback(async () => {
    if (!token) return;
    setLoadingProfile(true);
    try {
      const res = await fetch('/api/profile', { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to load profile');
      const dbProfile = data.profile || {};
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
        avatar_url: dbProfile.avatar_url || undefined,
      });
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
            <Typography variant="h6" color="text.secondary">Loading...</Typography>
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
      setToast({ open: true, message: 'Profile updated', severity: 'success' });
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
      setToast({ open: true, message: 'Avatar updated', severity: 'success' });
    } catch (e: any) {
      setToast({ open: true, message: e?.message || 'Upload failed', severity: 'error' });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <ProfileWrapper>
      <Container maxWidth="lg">
        <ProfileCard elevation={0}>
          <Box position="relative" display="inline-block">
            <ProfileAvatar src={profile?.avatar_url || undefined}>
              {!profile?.avatar_url && userInitials(displayName)}
            </ProfileAvatar>
            <IconButton 
              aria-label="Change avatar"
              onClick={onAvatarClick}
              size="small"
              sx={{ position: 'absolute', bottom: 8, right: -8, background: 'rgba(0,0,0,0.6)', color: 'white', '&:hover': { background: 'rgba(0,0,0,0.8)' } }}
            >
              {uploading ? <CircularProgress size={18} color="inherit" /> : <CameraAlt fontSize="small" />}
            </IconButton>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={onAvatarChange} />
          </Box>
          
          <Typography variant="h4" component="h1" gutterBottom fontWeight={700} color="primary">
            {displayName}
          </Typography>
          
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {user.email}
          </Typography>

          <InfoSection>
            <Typography variant="h6" gutterBottom fontWeight={600} color="primary">
              Profile
            </Typography>
            {loadingProfile && (
              <Box display="flex" justifyContent="center" py={4}><CircularProgress size={24} /></Box>
            )}
            {!loadingProfile && profile && (
              <Box component="form" noValidate onSubmit={(e) => { e.preventDefault(); onSave(); }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Full name" fullWidth value={profile.full_name || ''} onChange={(e) => setProfile(p => ({ ...(p || {}), full_name: e.target.value }))} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Email" fullWidth value={user.email} disabled />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Company" fullWidth value={profile.company || ''} onChange={(e) => setProfile(p => ({ ...(p || {}), company: e.target.value }))} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Phone" fullWidth value={profile.phone || ''} onChange={(e) => setProfile(p => ({ ...(p || {}), phone: e.target.value }))} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Location" fullWidth value={profile.location || ''} onChange={(e) => setProfile(p => ({ ...(p || {}), location: e.target.value }))} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Website" fullWidth placeholder="https://..." value={profile.website || ''} onChange={(e) => setProfile(p => ({ ...(p || {}), website: e.target.value }))} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Twitter (X)" fullWidth placeholder="@handle" value={profile.twitter || ''} onChange={(e) => setProfile(p => ({ ...(p || {}), twitter: e.target.value }))} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="LinkedIn" fullWidth placeholder="Profile URL or handle" value={profile.linkedin || ''} onChange={(e) => setProfile(p => ({ ...(p || {}), linkedin: e.target.value }))} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="GitHub" fullWidth placeholder="username" value={profile.github || ''} onChange={(e) => setProfile(p => ({ ...(p || {}), github: e.target.value }))} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Bio" fullWidth multiline minRows={3} value={profile.bio || ''} onChange={(e) => setProfile(p => ({ ...(p || {}), bio: e.target.value }))} />
                  </Grid>
                </Grid>
                <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
                  <Button type="submit" variant="contained" color="primary" startIcon={<Save />} disabled={saving}>
                    {saving ? 'Saving...' : 'Save changes'}
                  </Button>
                  <Button variant="outlined" onClick={loadProfile} disabled={saving}>Reset</Button>
                </Stack>
              </Box>
            )}
          </InfoSection>
        </ProfileCard>
      </Container>
      <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast(t => ({ ...t, open: false }))}>
        <Alert onClose={() => setToast(t => ({ ...t, open: false }))} severity={toast.severity} variant="filled" sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </ProfileWrapper>
  );
}
