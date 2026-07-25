import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Foundations: Concept to Application | Smartslate',
  description:
    'A 15-16 hour, no-code course that takes non-technical professionals from AI awareness to confident application across 8 modules with a running project you choose.',
  openGraph: {
    title: 'AI Foundations: Concept to Application',
    description:
      'A 15-16 hour, no-code course for non-technical professionals. 8 modules, 12 project templates, zero coding required.',
    url: '/courses/aifoundations-concept2application',
    siteName: 'Smartslate',
    type: 'website',
  },
  alternates: { canonical: '/courses/aifoundations-concept2application' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
