'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useCurrencyExchange } from '@/hooks/useCurrencyExchange';

export type Currency = 'USD' | 'INR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  exchangeRate: number;
  loading: boolean;
  convertPrice: (usdPrice: number) => number;
  formatPrice: (usdPrice: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CURRENCY_PREFERENCE_KEY = 'smartslate_preferred_currency';

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>('USD');
  const { rate: exchangeRate, loading } = useCurrencyExchange();

  // Initialize currency from localStorage
  useEffect(() => {
    try {
      const savedCurrency = localStorage.getItem(CURRENCY_PREFERENCE_KEY) as Currency | null;
      if (savedCurrency === 'USD' || savedCurrency === 'INR') {
        setCurrencyState(savedCurrency);
      }
    } catch (error) {
      console.error('Error loading currency preference:', error);
    }
  }, []);

  // Save currency preference to localStorage
  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    try {
      localStorage.setItem(CURRENCY_PREFERENCE_KEY, newCurrency);
    } catch (error) {
      console.error('Error saving currency preference:', error);
    }
  };

  // Convert USD price to current currency
  const convertPrice = (usdPrice: number): number => {
    if (currency === 'USD') {
      return usdPrice;
    }
    return Math.round(usdPrice * exchangeRate);
  };

  // Format price with currency symbol
  const formatPrice = (usdPrice: number): string => {
    const convertedPrice = convertPrice(usdPrice);

    if (currency === 'USD') {
      return `$${convertedPrice}`;
    }

    // Format INR with Indian numbering system (lakhs/crores)
    return `₹${convertedPrice.toLocaleString('en-IN')}`;
  };

  const value: CurrencyContextType = {
    currency,
    setCurrency,
    exchangeRate,
    loading,
    convertPrice,
    formatPrice,
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
