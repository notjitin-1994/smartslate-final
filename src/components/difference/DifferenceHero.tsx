'use client';

import StandardHero from '@/components/ui/StandardHero';

export default function DifferenceHero() {
  return (
    <StandardHero
      title="The SmartSlate Difference"
      subtitle="Where traditional training ends, transformative learning begins"
      description="At SmartSlate, we don't just deliver training—we architect learning ecosystems that evolve with your organization. Our approach transcends conventional boundaries, creating experiences that resonate, results that matter, and transformations that last."
      accentWords={['SmartSlate', 'transformative', 'learning ecosystems']}
      showScrollIndicator={true}
    />
  );
}