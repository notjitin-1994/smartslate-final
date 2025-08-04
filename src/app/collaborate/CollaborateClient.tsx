'use client';

import React, { useState } from 'react';
import { Box, Container, Typography, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import ContactModal from '@/components/collaborate/ContactModal';
import StandardHero from '@/components/ui/StandardHero';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

// Styled components
const PageWrapper = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(10),
  backgroundColor: 'transparent',
  minHeight: '100vh',
  [theme.breakpoints.down('md')]: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(8),
  },
}));



const PartnershipSection = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isVisible' && prop !== 'delay'
})<{ isVisible: boolean; delay: number }>(({ theme, isVisible, delay }) => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
  transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
  marginBottom: theme.spacing(6),
  maxWidth: 800,
  padding: theme.spacing(4),
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: -100,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(167, 218, 219, 0.1), transparent)',
    transition: 'left 0.5s ease',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    boxShadow: '0 10px 30px rgba(167, 218, 219, 0.2)',
    '&::before': {
      left: '100%',
    },
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
  },
}));

const SectionHeading = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    fontSize: '1.75rem',
  },
}));

const SectionDescription = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.7,
  marginBottom: theme.spacing(3),
}));

const CTAButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: '#ffffff',
  padding: `${theme.spacing(1.5)} ${theme.spacing(4)}`,
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(79, 70, 229, 0.3)',
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  borderColor: 'rgba(255, 255, 255, 0.08)',
  margin: `${theme.spacing(6)} 0`,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50px',
    height: '1px',
    background: theme.palette.primary.main,
    opacity: 0.5,
  },
}));

// Partnership data
const partnershipOpportunities = [
  {
    id: 'course-architect',
    title: 'Become a Course Architect',
    description:
      'You are a leader in your field with deep, practical expertise. Partner with us to transform your knowledge into world-class courses that will shape the next generation of talent and elevate your professional brand.',
    buttonText: 'Share Your Expertise',
    modalConfig: {
      title: 'Become a Course Architect',
      formFields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'linkedin', label: 'Link to LinkedIn/Portfolio', type: 'url' }
      ]
    }
  },
  {
    id: 'strategic-growth',
    title: 'Drive Strategic Growth',
    description:
      "Your organization has unique challenges and skill gaps. Let's collaborate to build bespoke learning solutions and talent pipelines that deliver measurable ROI and a decisive competitive advantage.",
    buttonText: 'Form a Partnership',
    modalConfig: {
      title: 'Strategic Partnership Inquiry',
      formFields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'company', label: 'Company/Institution', type: 'text' },
        { name: 'role', label: 'Your Role', type: 'text' }
      ]
    }
  },
  {
    id: 'invest',
    title: 'Invest in the Revolution',
    description:
      'Smartslate is at the forefront of the AI-driven education market. We are building the future with our next-gen platform, Solara. We invite visionary investors to join our journey and share in our success.',
    buttonText: 'Explore Investment',
    modalConfig: {
      title: 'Investment Opportunities',
      formFields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'fund', label: 'Fund/Organization Name', type: 'text' }
      ]
    }
  },
  {
    id: 'build-future',
    title: 'Build the Future with Us',
    description:
      'Are you an AI engineer, developer, or designer passionate about solving hard problems? Join our core team to build cutting-edge products that will redefine how the world learns and works.',
    buttonText: 'Join the Team',
    modalConfig: {
      title: 'Build with Us',
      formFields: [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'github', label: 'Link to GitHub/Portfolio', type: 'url' }
      ]
    }
  }
];

export default function CollaborateClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    formFields: [] as { name: string; label: string; type: string }[]
  });

  const openModal = (config: typeof modalConfig) => {
    setModalConfig(config);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Create refs for each section
  const sectionRefs = partnershipOpportunities.map(() => {
    const { ref, isVisible } = useFadeInOnScroll();
    return { ref, isVisible };
  });

  return (
    <PageWrapper>
      <StandardHero
        title="Let's Shape the Future of Learning, Together."
        subtitle="The AI revolution in education requires a symphony of diverse talents and visionary partners. We believe in the power of collaboration to build something truly transformative. Find your role in our journey."
        description="Join us in revolutionizing education through AI-driven learning solutions and strategic partnerships."
        accentWords={['Future', 'Learning', 'AI revolution', 'collaboration']}
        showScrollIndicator={false}
      />
      
      <Container maxWidth="lg">

        <Box>
          {partnershipOpportunities.map((opportunity, index) => (
            <React.Fragment key={opportunity.id}>
              <PartnershipSection
                ref={sectionRefs[index].ref}
                isVisible={sectionRefs[index].isVisible}
                delay={index * 150}
              >
                <SectionHeading>{opportunity.title}</SectionHeading>
                <SectionDescription>{opportunity.description}</SectionDescription>
                <CTAButton
                  variant="contained"
                  onClick={() => openModal(opportunity.modalConfig)}
                >
                  {opportunity.buttonText}
                </CTAButton>
              </PartnershipSection>
              {index < partnershipOpportunities.length - 1 && (
                <StyledDivider />
              )}
            </React.Fragment>
          ))}
        </Box>
      </Container>

      <ContactModal
        open={modalOpen}
        onClose={closeModal}
        title={modalConfig.title}
        formFields={modalConfig.formFields}
      />
    </PageWrapper>
  );
}