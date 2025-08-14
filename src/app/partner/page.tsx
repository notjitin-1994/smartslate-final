import React from 'react';
import type { Metadata } from 'next';
import PartnerClient from './PartnerClient';

export const metadata: Metadata = {
  title: 'Partner with Smartslate',
  description: 'Collaborate with Smartslate to build AI-driven learning and workforce development programs.',
  openGraph: {
    title: 'Partner with Smartslate',
    description: 'Collaborate with Smartslate to build AI-driven learning and workforce development programs.',
    type: 'website',
  },
};

export default function PartnerPage() {
  return <PartnerClient />;
}


