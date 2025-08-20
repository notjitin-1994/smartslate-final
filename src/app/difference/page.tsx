'use client';

import { Box, Container } from '@mui/material';
import DifferenceHero from "@/components/difference/DifferenceHero";
import ComparisonSection from "@/components/difference/ComparisonSection";
import KeyDifferentiators from "@/components/difference/KeyDifferentiators";
import TransformationJourney from "@/components/difference/TransformationJourney";

import CTASection from "@/components/difference/CTASection";
import { 
  PageWrapper, 
  SectionWrapper, 
  BackgroundVariants 
} from '@/components/difference/styles/DifferenceStyles';

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
      <SectionWrapper sx={BackgroundVariants.primary}>
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



      {/* Call to Action */}
      <SectionWrapper>
        <Container maxWidth="lg">
          <CTASection />
        </Container>
      </SectionWrapper>
    </PageWrapper>
  );
}