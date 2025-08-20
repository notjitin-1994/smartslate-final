'use client';

import { useModalManager } from '@/hooks/useModalManager';
import SSAInterestModal from '@/components/products/SSAInterestModal';
import SolaraInterestModal from '@/components/products/SolaraInterestModal';

export default function TestModalsPage() {
  const { actions } = useModalManager();

  return (
    <div className="min-h-screen bg-background-dark p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-8">Modal Test Page</h1>
        
        <div className="space-y-4">
          <button
            onClick={actions.openSSAInterestModal}
            className="btn btn-primary"
          >
            Open SSA Interest Modal
          </button>
          
          <button
            onClick={actions.openSolaraInterestModal}
            className="btn btn-secondary"
          >
            Open Solara Interest Modal
          </button>
        </div>

        {/* Modals */}
        <SSAInterestModal />
        <SolaraInterestModal />
      </div>
    </div>
  );
}
