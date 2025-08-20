'use client';

import React from 'react';
import { Container } from '@mui/material';
import StandardHero from '@/components/ui/StandardHero';
import dynamic from 'next/dynamic';
import DemoModal from '@/components/landing/DemoModal';
import PartnerModal from '@/components/landing/PartnerModal';
import { useDemoModal } from '@/hooks/useDemoModal';
import { usePartnerModal } from '@/hooks/usePartnerModal';

const Partners = dynamic(() => import('@/components/landing/Partners'), { ssr: false });

export default function PartnerClient() {
  const { isOpen: isDemoOpen, openModal: openDemoModal, closeModal: closeDemoModal } = useDemoModal();
  const { isOpen: isPartnerOpen, partnerType, openModal: openPartnerModal, closeModal: closePartnerModal } = usePartnerModal();
  
  return (
    <>
      <StandardHero
        title="Strategic Partnerships for AI-Driven Talent Transformation"
        subtitle="For institutions and enterprises building future-ready capabilities"
        description="Co-create programs, accelerate upskilling, and measure outcomes with Smartslate's platform."
        accentWords={["AI-Driven", "Partnerships", "Future-ready"]}
        showScrollIndicator={false}
      />
      <Container maxWidth="lg">
        <Partners 
          openDemoModal={openDemoModal} 
          openPartnerModal={openPartnerModal}
        />
      </Container>
      <DemoModal isOpen={isDemoOpen} onClose={closeDemoModal} />
      <PartnerModal 
        isOpen={isPartnerOpen} 
        onClose={closePartnerModal} 
        partnerType={partnerType}
      />
    </>
  );
}


