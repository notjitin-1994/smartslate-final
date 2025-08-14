'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Container, Box, Typography, Avatar, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/sign-in');
    }
  }, [loading, isAuthenticated, router]);

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

  return (
    <ProfileWrapper>
      <Container maxWidth="lg">
        <ProfileCard elevation={0}>
          <ProfileAvatar>
            {userInitials(user.full_name)}
          </ProfileAvatar>
          
          <Typography variant="h4" component="h1" gutterBottom fontWeight={700} color="primary">
            {user.full_name || 'User'}
          </Typography>
          
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {user.email}
          </Typography>

          <InfoSection>
            <Typography variant="h6" gutterBottom fontWeight={600} color="primary">
              Profile Information
            </Typography>
            
            <InfoRow>
              <Typography variant="body2" color="text.secondary">
                Full Name
              </Typography>
              <Typography variant="body1" color="text.primary" fontWeight={500}>
                {user.full_name || 'Not set'}
              </Typography>
            </InfoRow>
            
            <InfoRow>
              <Typography variant="body2" color="text.secondary">
                Email Address
              </Typography>
              <Typography variant="body1" color="text.primary" fontWeight={500}>
                {user.email}
              </Typography>
            </InfoRow>
            
            <InfoRow>
              <Typography variant="body2" color="text.secondary">
                Phone Number
              </Typography>
              <Typography variant="body1" color="text.primary" fontWeight={500}>
                {user.phone_number || 'Not set'}
              </Typography>
            </InfoRow>
            
            <InfoRow>
              <Typography variant="body2" color="text.secondary">
                Member Since
              </Typography>
              <Typography variant="body1" color="text.primary" fontWeight={500}>
                {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Typography>
            </InfoRow>
          </InfoSection>

          <Box mt={4} p={3} 
            sx={{ 
              background: 'rgba(167, 218, 219, 0.1)',
              borderRadius: 2,
              border: '1px solid rgba(167, 218, 219, 0.2)'
            }}
          >
            <Typography variant="body2" color="primary.main" fontWeight={600}>
              Profile management coming soon
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" mt={1}>
              You'll be able to update your profile information, change your password, and manage your account settings here.
            </Typography>
          </Box>
        </ProfileCard>
      </Container>
    </ProfileWrapper>
  );
}
