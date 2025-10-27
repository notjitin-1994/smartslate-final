import { Currency } from '@/contexts/CurrencyContext';

export interface PriceFormatOptions {
  currency: Currency;
  exchangeRate: number;
  showDecimals?: boolean;
  showSymbol?: boolean;
}

/**
 * Format a USD price to the specified currency
 */
export const formatPrice = (
  usdPrice: number,
  options: PriceFormatOptions
): string => {
  const { currency, exchangeRate, showDecimals = false, showSymbol = true } = options;

  if (currency === 'USD') {
    const formatted = showDecimals
      ? usdPrice.toFixed(2)
      : Math.round(usdPrice).toString();
    return showSymbol ? `$${formatted}` : formatted;
  }

  // Convert to INR
  const inrPrice = Math.round(usdPrice * exchangeRate);
  const formatted = inrPrice.toLocaleString('en-IN');
  return showSymbol ? `₹${formatted}` : formatted;
};

/**
 * Format price with billing period suffix
 */
export const formatPriceWithPeriod = (
  usdPrice: number,
  options: PriceFormatOptions,
  period: 'monthly' | 'annual' | 'seat' = 'monthly'
): string => {
  const basePrice = formatPrice(usdPrice, options);

  switch (period) {
    case 'monthly':
      return `${basePrice}/month`;
    case 'annual':
      return `${basePrice}/year`;
    case 'seat':
      return `${basePrice}/seat/month`;
    default:
      return basePrice;
  }
};

/**
 * Calculate and format annual savings
 */
export const formatAnnualSavings = (
  monthlyUsdPrice: number,
  options: PriceFormatOptions
): string => {
  const annualSavingsUsd = Math.ceil(monthlyUsdPrice * 0.2 * 12);
  return formatPrice(annualSavingsUsd, options);
};

/**
 * Get currency symbol
 */
export const getCurrencySymbol = (currency: Currency): string => {
  return currency === 'USD' ? '$' : '₹';
};

/**
 * Get currency name
 */
export const getCurrencyName = (currency: Currency): string => {
  return currency === 'USD' ? 'US Dollar' : 'Indian Rupee';
};

/**
 * Convert USD to target currency
 */
export const convertToTargetCurrency = (
  usdPrice: number,
  currency: Currency,
  exchangeRate: number
): number => {
  if (currency === 'USD') {
    return usdPrice;
  }
  return Math.round(usdPrice * exchangeRate);
};
