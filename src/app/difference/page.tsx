'use client';

import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import DifferenceHero from "@/components/difference/DifferenceHero";
import ComparisonSection from "@/components/difference/ComparisonSection";
import KeyDifferentiators from "@/components/difference/KeyDifferentiators";
import TransformationJourney from "@/components/difference/TransformationJourney";
import ImpactMetrics from "@/components/difference/ImpactMetrics";
import CTASection from "@/components/difference/CTASection";

const PageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
}));

const SectionWrapper = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(12)} 0`,
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(10)} 0`,
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(8)} 0`,
  },
}));

export default function DifferencePage() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <Box>
        <DifferenceHero />
      </Box>

      {/* Comparison Section */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <ComparisonSection />
        </Container>
      </SectionWrapper>

      {/* Key Differentiators */}
      <SectionWrapper sx={{ 
        bgcolor: 'rgba(20, 36, 51, 0.2)', 
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(167, 218, 219, 0.1)',
        borderBottom: '1px solid rgba(167, 218, 219, 0.1)',
      }}>
        <Container maxWidth="lg">
          <KeyDifferentiators />
        </Container>
      </SectionWrapper>

      {/* Transformation Journey */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <TransformationJourney />
        </Container>
      </SectionWrapper>

      {/* Impact Metrics */}
      <SectionWrapper sx={{ 
        bgcolor: 'rgba(13, 27, 42, 0.3)', 
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(79, 70, 229, 0.1)',
        borderBottom: '1px solid rgba(79, 70, 229, 0.1)',
      }}>
        <Container maxWidth="lg">
          <ImpactMetrics />
        </Container>
      </SectionWrapper>

      {/* Call to Action */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <CTASection />
        </Container>
      </SectionWrapper>
    </PageWrapper>
  );
}