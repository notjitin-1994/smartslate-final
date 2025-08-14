'use client';

import React from 'react';
import { Container } from '@mui/material';
import StandardHero from '@/components/ui/StandardHero';
import dynamic from 'next/dynamic';
import DemoModal from '@/components/landing/DemoModal';
import { useDemoModal } from '@/hooks/useDemoModal';

const Partners = dynamic(() => import('@/components/landing/Partners'), { ssr: false });

export default function PartnerClient() {
  const { isOpen, openModal, closeModal } = useDemoModal();
  return (
    <>
      <StandardHero
        title="Strategic Partnerships for AI-Driven Talent Transformation"
        subtitle="For institutions and enterprises building future-ready capabilities"
        description="Co-create programs, accelerate upskilling, and measure outcomes with Smartslate’s platform."
        accentWords={["AI-Driven", "Partnerships", "Future-ready"]}
        showScrollIndicator={false}
      />
      <Container maxWidth="lg">
        <Partners openDemoModal={openModal} />
      </Container>
      <DemoModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
}


