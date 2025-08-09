import React from 'react';
import type { Metadata } from 'next';
import CollaborateClient from './CollaborateClient';

export const metadata: Metadata = {
  title: 'Smartslate',
  description: 'Explore partnership opportunities with SmartSlate. Shape the future of learning together, whether you\'re an expert, organization, investor, or technologist.',
  openGraph: {
    title: 'Partner & Collaborate with SmartSlate',
    description: 'Join us in revolutionizing education through AI-driven learning solutions.',
    type: 'website',
  },
};

export default function CollaboratePage() {
  return <CollaborateClient />;
}