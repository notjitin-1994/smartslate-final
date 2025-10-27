import { useState, useEffect, useCallback } from 'react';

interface ExchangeRateCache {
  rate: number;
  timestamp: number;
}

interface UseCurrencyExchangeReturn {
  rate: number;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refresh: () => Promise<void>;
}

const CACHE_KEY = 'smartslate_exchange_rate';
const CACHE_DURATION = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
const FALLBACK_RATE = 83.50; // Fallback USD to INR rate
const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

export const useCurrencyExchange = (): UseCurrencyExchangeReturn => {
  const [rate, setRate] = useState<number>(FALLBACK_RATE);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchExchangeRate = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Failed to fetch exchange rate');
      }

      const data = await response.json();
      const inrRate = data.rates?.INR;

      if (!inrRate || typeof inrRate !== 'number') {
        throw new Error('Invalid exchange rate data');
      }

      // Cache the rate with timestamp
      const cacheData: ExchangeRateCache = {
        rate: inrRate,
        timestamp: Date.now(),
      };

      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

      setRate(inrRate);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (err) {
      console.error('Error fetching exchange rate:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');

      // Try to use cached rate, otherwise use fallback
      const cachedData = getCachedRate();
      if (cachedData) {
        setRate(cachedData.rate);
        setLastUpdated(new Date(cachedData.timestamp));
      } else {
        setRate(FALLBACK_RATE);
      }

      setLoading(false);
    }
  }, []);

  const getCachedRate = (): ExchangeRateCache | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const parsed: ExchangeRateCache = JSON.parse(cached);
      return parsed;
    } catch {
      return null;
    }
  };

  const isCacheValid = (cache: ExchangeRateCache): boolean => {
    return Date.now() - cache.timestamp < CACHE_DURATION;
  };

  useEffect(() => {
    const initializeRate = async () => {
      const cachedData = getCachedRate();

      if (cachedData && isCacheValid(cachedData)) {
        // Use valid cached rate
        setRate(cachedData.rate);
        setLastUpdated(new Date(cachedData.timestamp));
        setLoading(false);
      } else {
        // Fetch fresh rate
        await fetchExchangeRate();
      }
    };

    initializeRate();
  }, [fetchExchangeRate]);

  return {
    rate,
    loading,
    error,
    lastUpdated,
    refresh: fetchExchangeRate,
  };
};
