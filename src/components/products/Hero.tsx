'use client';

import StandardHero from '@/components/ui/StandardHero';

export default function Hero() {
  return (
    <StandardHero
      title="Our Products"
      subtitle="Discover our suite of solutions designed to bridge the talent gap and empower organizations to thrive."
        description="Smartslate delivers cutting-edge training programs that evolve with your business, ensuring your team stays ahead of industry demands."
  accentWords={['Products', 'Smartslate']}
      showScrollIndicator={false}
    />
  );
}