import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Foundations for Enterprise & Higher-Ed | Smartslate',
  description: 'The AI course that built Smartslate — scale cohorts, improve ROI, and deploy real solutions with a repeatable framework.',
  alternates: {
    canonical: '/smartslate-testimony',
  },
  openGraph: {
    title: 'AI Foundations for Enterprise & Higher-Ed | Smartslate',
    description: 'The AI course that built Smartslate — scale cohorts, improve ROI, and deploy real solutions with a repeatable framework.',
    type: 'website',
  },
};

export default function SmartslateTestimonyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
