'use client';

import { useState } from 'react';

export type Currency = 'USD' | 'INR';

interface CurrencyToggleProps {
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export default function CurrencyToggle({ currency, onCurrencyChange }: CurrencyToggleProps) {
  return (
    <div className="inline-flex items-center gap-4">
      <div className="inline-flex p-1 rounded-lg border border-white/10 bg-white/5">
        <button
          onClick={() => onCurrencyChange('USD')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
            currency === 'USD'
              ? 'border border-[rgb(167,218,219)] bg-[rgba(167,218,219,0.15)] text-[rgb(167,218,219)]'
              : 'border-none bg-transparent text-[rgb(176,197,198)] hover:bg-white/5'
          }`}
        >
          <span className="text-base">$</span>
          <span>USD</span>
        </button>
        <button
          onClick={() => onCurrencyChange('INR')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
            currency === 'INR'
              ? 'border border-[rgb(167,218,219)] bg-[rgba(167,218,219,0.15)] text-[rgb(167,218,219)]'
              : 'border-none bg-transparent text-[rgb(176,197,198)] hover:bg-white/5'
          }`}
        >
          <span className="text-base">₹</span>
          <span>INR</span>
        </button>
      </div>
    </div>
  );
}
