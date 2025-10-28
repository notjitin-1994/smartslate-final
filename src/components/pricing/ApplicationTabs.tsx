'use client';

import { useState } from 'react';

interface Application {
  id: string;
  name: string;
  description: string;
  isLive: boolean;
}

const applications: Application[] = [
  {
    id: 'polaris',
    name: 'Polaris',
    description: 'AI-powered needs analysis & learning blueprints',
    isLive: true,
  },
  {
    id: 'constellation',
    name: 'Constellation',
    description: 'Intelligent content structuring',
    isLive: false,
  },
  {
    id: 'nova',
    name: 'Nova',
    description: 'AI-assisted content authoring',
    isLive: false,
  },
  {
    id: 'orbit',
    name: 'Orbit',
    description: 'Personalized learning delivery',
    isLive: false,
  },
  {
    id: 'spectrum',
    name: 'Spectrum',
    description: 'Learning analytics & insights',
    isLive: false,
  },
];

export default function ApplicationTabs() {
  const [activeTab] = useState('polaris');

  return (
    <div className="w-full">
      {/* Tabs Header */}
      <div>
        <div className="flex items-center gap-1 p-1.5 rounded-xl bg-[rgba(167,218,219,0.05)] border border-[rgba(167,218,219,0.2)]">
          {applications.map((app) => (
            <button
              key={app.id}
              disabled={!app.isLive}
              className={`
                relative flex-1 px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300
                ${
                  activeTab === app.id && app.isLive
                    ? 'bg-[rgb(79,70,229)] text-[rgb(224,224,224)] shadow-lg'
                    : app.isLive
                    ? 'text-[rgb(176,197,198)] hover:text-[rgb(224,224,224)] hover:bg-[rgba(167,218,219,0.1)]'
                    : 'text-[rgb(122,138,139)] cursor-not-allowed'
                }
              `}
            >
              <div className="flex items-center justify-center">
                <span className="font-bold">{app.name}</span>
                {!app.isLive && (
                  <span className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-[rgba(255,215,0,0.2)] border border-[rgba(255,215,0,0.4)] text-[rgb(255,215,0)] text-[10px] font-bold uppercase tracking-wide">
                    Soon
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
