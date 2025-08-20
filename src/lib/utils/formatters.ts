// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

import { COURSE_DIFFICULTY, LEAD_STATUS, LEAD_PRIORITY, PROGRESS_STATUS } from './constants';

// ============================================================================
// TEXT FORMATTING
// ============================================================================

export function formatTitle(text: string, maxLength: number = 60): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

export function formatDescription(text: string, maxLength: number = 150): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

export function formatFullName(firstName: string, lastName: string): string {
  if (!firstName && !lastName) return '';
  if (!firstName) return lastName;
  if (!lastName) return firstName;
  return `${firstName} ${lastName}`;
}

export function formatInitials(firstName: string, lastName: string): string {
  if (!firstName && !lastName) return '';
  const first = firstName ? firstName.charAt(0).toUpperCase() : '';
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  return `${first}${last}`;
}

export function formatPhoneNumber(phone: string): string {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  } else if (cleaned.length === 7) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
  }
  
  return phone; // Return original if can't format
}

export function formatSocialMediaHandle(handle: string, platform?: string): string {
  if (!handle) return '';
  
  // Remove @ if present
  const cleaned = handle.startsWith('@') ? handle.slice(1) : handle;
  
  if (platform) {
    switch (platform.toLowerCase()) {
      case 'twitter':
      case 'x':
        return `@${cleaned}`;
      case 'instagram':
        return `@${cleaned}`;
      case 'linkedin':
        return cleaned;
      case 'github':
        return cleaned;
      default:
        return cleaned;
    }
  }
  
  return cleaned;
}

// ============================================================================
// NUMBER FORMATTING
// ============================================================================

export function formatNumber(num: number, options?: {
  decimals?: number;
  locale?: string;
  currency?: string;
  compact?: boolean;
}): string {
  if (num === null || num === undefined || isNaN(num)) return '0';
  
  const {
    decimals = 2,
    locale = 'en-US',
    currency,
    compact = false
  } = options || {};
  
  if (compact && num >= 1000) {
    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(num);
  }
  
  if (currency) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  }
  
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatPercentage(value: number, decimals: number = 1): string {
  if (value === null || value === undefined || isNaN(value)) return '0%';
  return `${(value * 100).toFixed(decimals)}%`;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
}

export function formatCount(count: number, singular: string, plural?: string): string {
  const pluralForm = plural || `${singular}s`;
  return count === 1 ? `1 ${singular}` : `${formatNumber(count)} ${pluralForm}`;
}

// ============================================================================
// DATE FORMATTING
// ============================================================================

export function formatDate(date: Date | string, options?: {
  format?: 'short' | 'long' | 'relative' | 'custom';
  customFormat?: string;
  locale?: string;
  timezone?: string;
}): string {
  if (!date) return '';
  
  const {
    format = 'short',
    customFormat,
    locale = 'en-US',
    timezone
  } = options || {};
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) return '';
  
  switch (format) {
    case 'short':
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(dateObj);
      
    case 'long':
      return new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(dateObj);
      
    case 'relative':
      return formatRelativeDate(dateObj);
      
    case 'custom':
      if (customFormat) {
        return formatCustomDate(dateObj, customFormat);
      }
      return dateObj.toLocaleDateString(locale);
      
    default:
      return dateObj.toLocaleDateString(locale);
  }
}

export function formatDateTime(date: Date | string, options?: {
  includeSeconds?: boolean;
  locale?: string;
  timezone?: string;
}): string {
  if (!date) return '';
  
  const {
    includeSeconds = false,
    locale = 'en-US',
    timezone
  } = options || {};
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) return '';
  
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: includeSeconds ? '2-digit' : undefined,
  }).format(dateObj);
}

export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  return `${Math.floor(diffInSeconds / 31536000)}y ago`;
}

export function formatCustomDate(date: Date, format: string): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

// ============================================================================
// STATUS FORMATTING
// ============================================================================

export function formatCourseDifficulty(difficulty: string): string {
  switch (difficulty) {
    case COURSE_DIFFICULTY.BEGINNER:
      return 'Beginner';
    case COURSE_DIFFICULTY.INTERMEDIATE:
      return 'Intermediate';
    case COURSE_DIFFICULTY.ADVANCED:
      return 'Advanced';
    default:
      return difficulty;
  }
}

export function formatLeadStatus(status: string): string {
  switch (status) {
    case LEAD_STATUS.NEW:
      return 'New';
    case LEAD_STATUS.CONTACTED:
      return 'Contacted';
    case LEAD_STATUS.QUALIFIED:
      return 'Qualified';
    case LEAD_STATUS.PROPOSAL:
      return 'Proposal';
    case LEAD_STATUS.NEGOTIATION:
      return 'Negotiation';
    case LEAD_STATUS.CLOSED:
      return 'Closed';
    case LEAD_STATUS.LOST:
      return 'Lost';
    default:
      return status;
  }
}

export function formatLeadPriority(priority: string): string {
  switch (priority) {
    case LEAD_PRIORITY.LOW:
      return 'Low';
    case LEAD_PRIORITY.MEDIUM:
      return 'Medium';
    case LEAD_PRIORITY.HIGH:
      return 'High';
    case LEAD_PRIORITY.URGENT:
      return 'Urgent';
    default:
      return priority;
  }
}

export function formatProgressStatus(status: string): string {
  switch (status) {
    case PROGRESS_STATUS.NOT_STARTED:
      return 'Not Started';
    case PROGRESS_STATUS.IN_PROGRESS:
      return 'In Progress';
    case PROGRESS_STATUS.COMPLETED:
      return 'Completed';
    default:
      return status;
  }
}

// ============================================================================
// ADDRESS FORMATTING
// ============================================================================

export function formatAddress(address: {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}): string {
  const parts = [
    address.street,
    address.city,
    address.state,
    address.zipCode,
    address.country
  ].filter(Boolean);
  
  return parts.join(', ');
}

export function formatLocation(city?: string, state?: string, country?: string): string {
  const parts = [city, state, country].filter(Boolean);
  return parts.join(', ');
}

// ============================================================================
// CURRENCY FORMATTING
// ============================================================================

export function formatCurrency(amount: number, currency: string = 'USD', locale: string = 'en-US'): string {
  if (amount === null || amount === undefined || isNaN(amount)) return '$0.00';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPriceRange(min: number, max: number, currency: string = 'USD'): string {
  if (min === max) {
    return formatCurrency(min, currency);
  }
  return `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`;
}

// ============================================================================
// URL FORMATTING
// ============================================================================

export function formatUrl(url: string): string {
  if (!url) return '';
  
  // Add protocol if missing
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  
  return url;
}

export function formatSlug(text: string): string {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ============================================================================
// VALIDATION FORMATTING
// ============================================================================

export function formatValidationError(field: string, message: string): string {
  return `${field}: ${message}`;
}

export function formatPasswordStrength(score: number): string {
  if (score >= 4) return 'Strong';
  if (score >= 3) return 'Good';
  if (score >= 2) return 'Fair';
  return 'Weak';
}

// ============================================================================
// EXPORTS
// ============================================================================

export const formatters = {
  // Text
  formatTitle,
  formatDescription,
  formatFullName,
  formatInitials,
  formatPhoneNumber,
  formatSocialMediaHandle,
  
  // Numbers
  formatNumber,
  formatPercentage,
  formatFileSize,
  formatDuration,
  formatCount,
  
  // Dates
  formatDate,
  formatDateTime,
  formatRelativeDate,
  formatCustomDate,
  
  // Status
  formatCourseDifficulty,
  formatLeadStatus,
  formatLeadPriority,
  formatProgressStatus,
  
  // Address
  formatAddress,
  formatLocation,
  
  // Currency
  formatCurrency,
  formatPriceRange,
  
  // URLs
  formatUrl,
  formatSlug,
  
  // Validation
  formatValidationError,
  formatPasswordStrength,
};
