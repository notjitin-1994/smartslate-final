'use client';

import { Box } from '@mui/material';
import Hero from '@/components/landing/Hero';
import JsonLd from '@/components/seo/JsonLd';
import { getOrganizationJsonLd, getWebsiteJsonLd } from '@/components/seo/jsonld';
import TalentParadox from '@/components/landing/TalentParadox';
import Framework from '@/components/landing/Framework';
import ROICalculator from '@/components/landing/ROICalculator';
import Partners from '@/components/landing/Partners';
import DemoModal from '@/components/landing/DemoModal';
import CaseStudyModal from '@/components/landing/CaseStudyModal';
import ConsultationModal from '@/components/landing/ConsultationModal';
import SSAInterestModal from '@/components/products/SSAInterestModal';
import SolaraInterestModal from '@/components/products/SolaraInterestModal';
import NavigationDots from '@/components/landing/NavigationDots';
import { PageWrapper, SectionWrapper } from '@/components/landing/styles/LandingStyles';
import { useLandingPage } from '@/hooks/useLandingPage';
import { useModalManager } from '@/hooks/useModalManager';

export default function Home() {
  const { state, actions, refs } = useLandingPage();
  const { modalStates, actions: modalActions } = useModalManager();

  return (
    <PageWrapper>
      <NavigationDots 
        currentSection={state.currentSection} 
        onSectionClick={actions.scrollToSection} 
      />

      <Box id="hero" ref={(el: HTMLDivElement | null) => { refs.sectionsRef.current[0] = el; }}>
        <Hero 
          onRevealNext={() => actions.revealNext('paradox')} 
          openCaseStudyModal={modalActions.openCaseStudyModal}
          openConsultationModal={modalActions.openConsultationModal}
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
            openSSAModal={modalActions.openSSAInterestModal}
            openSolaraModal={modalActions.openSolaraInterestModal}
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
            openDemoModal={modalActions.openDemoModal} 
          />
        </SectionWrapper>
      )}
      
      {state.revealedSections.partners && (
        <SectionWrapper 
          id="partners" 
          className="visible"
          ref={(el: HTMLDivElement | null) => { refs.sectionsRef.current[4] = el; }}
        >
          <Partners 
            openDemoModal={modalActions.openDemoModal} 
            openCaseStudyModal={modalActions.openCaseStudyModal} 
            openPartnerModal={modalActions.openPartnerModal}
          />
        </SectionWrapper>
      )}

      {/* Modals */}
      <DemoModal 
        isOpen={modalStates.demo} 
        onClose={modalActions.closeDemoModal} 
      />
      
      <CaseStudyModal 
        isOpen={modalStates.caseStudy} 
        onClose={modalActions.closeCaseStudyModal} 
      />
      
      <ConsultationModal 
        isOpen={modalStates.consultation} 
        onClose={modalActions.closeConsultationModal} 
      />

      {/* SSA and Solara Modals */}
      <SSAInterestModal />
      <SolaraInterestModal />

      {/* JSON-LD for Organization and WebSite */}
      <JsonLd data={getOrganizationJsonLd()} />
      <JsonLd data={getWebsiteJsonLd()} />
    </PageWrapper>
  );
}