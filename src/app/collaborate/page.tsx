import React from 'react';
import type { Metadata } from 'next';
import CollaborateClient from './CollaborateClient';

export const metadata: Metadata = {
  title: 'Collaborate with Smartslate',
  description:
    'Four ways to collaborate: Become a Course Architect, Drive Strategic Growth, Invest in the Revolution, or Build the Future with Us.',
  openGraph: {
    title: 'Collaborate with Smartslate',
    description:
      'Four ways to collaborate: Become a Course Architect, Drive Strategic Growth, Invest in the Revolution, or Build the Future with Us.',
    type: 'website',
  },
};

export default function CollaboratePage() {
  return <CollaborateClient />;
}