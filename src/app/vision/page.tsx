'use client';

import { Box } from '@mui/material';
import Hero from '@/components/landing/Hero';
import JsonLd from '@/components/seo/JsonLd';
import { getOrganizationJsonLd, getWebsiteJsonLd } from '@/components/seo/jsonld';
import TalentParadox from '@/components/landing/TalentParadox';
import Framework from '@/components/landing/Framework';
import ROICalculator from '@/components/landing/ROICalculator';
import Partners from '@/components/landing/Partners';

import { PageWrapper, SectionWrapper } from '@/components/landing/styles/LandingStyles';
import { useLandingPage } from '@/hooks/useLandingPage';

export default function Home() {
  const { state, actions, refs } = useLandingPage();

  return (
    <PageWrapper>


      <Box id="hero" ref={(el: HTMLDivElement | null) => { refs.sectionsRef.current[0] = el; }}>
        <Hero
          onRevealNext={() => actions.revealNext('paradox')}
        />
      </Box>

      {state.revealedSections.paradox && (
        <SectionWrapper
          id="paradox"
          className="visible"
          ref={(el: HTMLDivElement | null) => { refs.sectionsRef.current[1] = el; }}
        >
          <TalentParadox onRevealNext={() => actions.revealNext('framework')} />
        </SectionWrapper>
      )}

      {state.revealedSections.framework && (
        <SectionWrapper
          id="framework"
          className="visible"
          ref={(el: HTMLDivElement | null) => { refs.sectionsRef.current[2] = el; }}
        >
          <Framework
            onRevealNext={() => actions.revealNext('roi')}
          />
        </SectionWrapper>
      )}

      {state.revealedSections.roi && (
        <SectionWrapper
          id="roi"
          className="visible"
          ref={(el: HTMLDivElement | null) => { refs.sectionsRef.current[3] = el; }}
        >
          <ROICalculator
            onRevealNext={() => actions.revealNext('partners')}
          />
        </SectionWrapper>
      )}

      {state.revealedSections.partners && (
        <SectionWrapper
          id="partners"
          className="visible"
          ref={(el: HTMLDivElement | null) => { refs.sectionsRef.current[4] = el; }}
        >
          <Partners />
        </SectionWrapper>
      )}

      {/* JSON-LD for Organization and WebSite */}
      <JsonLd data={getOrganizationJsonLd()} />
      <JsonLd data={getWebsiteJsonLd()} />
    </PageWrapper>
  );
}
