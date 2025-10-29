'use client';

import { Box, Container, Card, CardContent, Typography, Button, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import StandardHero from '@/components/ui/StandardHero';
import Link from 'next/link';
import { Business, School, TrendingUp, Groups, Lightbulb, EmojiEvents } from '@mui/icons-material';

const StoryCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: theme.palette.primary.main,
    boxShadow: '0 20px 40px rgba(167, 218, 219, 0.15)',
  },
}));

const TeamMemberCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '16px',
  textAlign: 'center',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: theme.palette.primary.main,
    boxShadow: '0 20px 40px rgba(167, 218, 219, 0.15)',
  },
}));

const AvatarWrapper = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  marginBottom: theme.spacing(2),
  border: `3px solid ${theme.palette.primary.main}`,
  boxShadow: '0 8px 24px rgba(167, 218, 219, 0.2)',
}));

const storyData = [
  {
    year: '2020',
    title: 'The Beginning',
    description: 'Smartslate was founded with a simple mission: to revolutionize corporate learning through AI-powered personalization.',
    icon: <Lightbulb />,
  },
  {
    year: '2021',
    title: 'First Breakthrough',
    description: 'Launched our adaptive learning engine that personalizes content based on individual learning styles and pace.',
    icon: <TrendingUp />,
  },
  {
    year: '2022',
    title: 'Enterprise Adoption',
    description: 'Partnered with Fortune 500 companies to deliver scalable learning solutions for global teams.',
    icon: <Business />,
  },
  {
    year: '2023',
    title: 'Community Growth',
    description: 'Reached 100,000+ active learners and built a vibrant community of knowledge-sharing professionals.',
    icon: <Groups />,
  },
  {
    year: '2024',
    title: 'AI Innovation',
    description: 'Introduced groundbreaking AI features that predict learning outcomes and recommend optimal career paths.',
    icon: <School />,
  },
];

const teamMembers = [
  {
    name: 'Jitin Nair',
    role: 'Founder & CEO',
    bio: 'Visionary leader with 15+ years in EdTech. Previously led AI initiatives at major tech companies.',
    avatar: '/images/userheadshot.png',
  },
  {
    name: 'Dr. Sarah Chen',
    role: 'Chief Learning Officer',
    bio: 'PhD in Educational Psychology. Pioneer in adaptive learning methodologies and cognitive science.',
    avatar: '/images/userheadshot.png',
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO & Head of AI',
    bio: 'Former Google AI engineer. Architect of Smartslate\'s proprietary learning algorithms.',
    avatar: '/images/userheadshot.png',
  },
  {
    name: 'Jennifer Park',
    role: 'VP of Product',
    bio: 'Product leader with successful track record of scaling EdTech platforms to thousands or more of users.',
    avatar: '/images/userheadshot.png',
  },
];

const stats = [
  { number: '100K+', label: 'Active Learners' },
  { number: '500+', label: 'Enterprise Clients' },
  { number: '95%', label: 'Completion Rate' },
  { number: '50+', label: 'Countries Served' },
];

export default function AboutPage() {
  return (
    <>
      <StandardHero
        title="Transforming Learning Through Innovation"
        subtitle="Our mission to make education personal, effective, and accessible"
        description="We believe in the power of technology to unlock human potential. Every day, we work to create learning experiences that adapt, inspire, and transform."
        accentWords={['Transforming', 'Innovation', 'Personal']}
      />

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Stats Section */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, color: 'text.primary' }}>
            Our Impact by Numbers
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 4, mx: -2 }}>
            {stats.map((stat, index) => (
              <Box key={index} sx={{ 
                width: { xs: '100%', sm: '50%', md: '25%' }, 
                p: 3,
                textAlign: 'center',
                boxSizing: 'border-box'
              }}>
                <Typography variant="h2" sx={{ fontWeight: 700, color: 'primary.main', fontSize: '2.5rem' }}>
                  {stat.number}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Story Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, color: 'text.primary', textAlign: 'center' }}>
            Our Journey
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, p: 2 }}>
            {storyData.map((story, index) => (
              <Box key={index} sx={{ 
                display: 'flex', 
                alignItems: 'center',
                p: 3,
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                position: 'relative',
                '&:not(:last-child)::after': {
                  content: '""',
                  position: 'absolute',
                  left: '100%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 1,
                  height: '60%',
                  background: 'divider',
                }
              }}>
                <Box sx={{ color: 'primary.main', mr: 2, minWidth: 40 }}>
                  {story.icon}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>
                    {story.year}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    {story.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                    {story.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Mission Section */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 8, mx: -2 }}>
          <Box sx={{ 
            width: { xs: '100%', md: '50%' }, 
            p: 4,
            textAlign: 'center',
            boxSizing: 'border-box'
          }}>
            <StoryCard>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <EmojiEvents sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'text.primary' }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  To democratize access to world-class education through AI-powered personalization that adapts to every learner's unique needs and pace.
                </Typography>
              </CardContent>
            </StoryCard>
          </Box>
          
          <Box sx={{ 
            width: { xs: '100%', md: '50%' }, 
            p: 4,
            textAlign: 'center',
            boxSizing: 'border-box'
          }}>
            <StoryCard>
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Lightbulb sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'text.primary' }}>
                  Our Vision
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                  A world where every professional has access to personalized learning paths that unlock their full potential and accelerate career growth.
                </Typography>
              </CardContent>
            </StoryCard>
          </Box>
        </Box>

        {/* Team Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, color: 'text.primary', textAlign: 'center' }}>
            Meet Our Leadership Team
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mx: -2 }}>
            {teamMembers.map((member, index) => (
              <Box key={index} sx={{ 
                width: { xs: '100%', sm: '50%', md: '25%' }, 
                p: 2,
                boxSizing: 'border-box'
              }}>
                <TeamMemberCard>
                  <CardContent sx={{ p: 4 }}>
                    <AvatarWrapper
                      src={member.avatar}
                      alt={member.name}
                    />
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 700, color: 'text.primary' }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'primary.main', mb: 2 }}>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                      {member.bio}
                    </Typography>
                  </CardContent>
                </TeamMemberCard>
              </Box>
            ))}
          </Box>
        </Box>

        {/* CTA Section */}
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: 'text.primary' }}>
            Ready to Join Our Mission?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: 'text.secondary' }}>
            We're always looking for talented individuals who share our passion for transforming education.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              component={Link}
              href="/careers"
              variant="contained"
              color="secondary"
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              View Open Positions
            </Button>
            <Button
              component={Link}
              href="/contact"
              variant="outlined"
              color="primary"
              size="large"
              sx={{ px: 4, py: 1.5 }}
            >
              Get in Touch
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}