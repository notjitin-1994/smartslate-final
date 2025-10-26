'use client';

import { useState, useEffect, useCallback } from 'react';

export interface CookiePreferences {
  essential: boolean;
  performance: boolean;
  functional: boolean;
  marketing: boolean;
}

export interface CookieConsentState {
  hasConsent: boolean | null;
  preferences: CookiePreferences;
  isLoading: boolean;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true, // Essential cookies are always enabled
  performance: false,
  functional: false,
  marketing: false,
};

export function useCookieConsent() {
  const [state, setState] = useState<CookieConsentState>({
    hasConsent: null,
    preferences: DEFAULT_PREFERENCES,
    isLoading: true,
  });

  // Load saved preferences on mount
  useEffect(() => {
    const hasConsent = localStorage.getItem('cookie-consent');
    const savedPreferences = localStorage.getItem('cookie-preferences');
    
    let preferences: CookiePreferences = DEFAULT_PREFERENCES;
    
    if (savedPreferences) {
      try {
        preferences = JSON.parse(savedPreferences);
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
        preferences = DEFAULT_PREFERENCES;
      }
    }

    setState({
      hasConsent: hasConsent !== null ? hasConsent === 'accepted' || hasConsent === 'custom' : null,
      preferences,
      isLoading: false,
    });
  }, []);

  const savePreferences = useCallback((newPreferences: CookiePreferences) => {
    localStorage.setItem('cookie-preferences', JSON.stringify(newPreferences));
    setState(prev => ({
      ...prev,
      preferences: newPreferences,
    }));
  }, []);

  const acceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      essential: true,
      performance: true,
      functional: true,
      marketing: true,
    };
    
    localStorage.setItem('cookie-consent', 'accepted');
    savePreferences(allAccepted);
    setState(prev => ({
      ...prev,
      hasConsent: true,
    }));
  }, [savePreferences]);

  const rejectAll = useCallback(() => {
    const onlyEssential: CookiePreferences = {
      essential: true,
      performance: false,
      functional: false,
      marketing: false,
    };
    
    localStorage.setItem('cookie-consent', 'rejected');
    savePreferences(onlyEssential);
    setState(prev => ({
      ...prev,
      hasConsent: false,
    }));
  }, [savePreferences]);

  const updatePreference = useCallback((category: keyof CookiePreferences, value: boolean) => {
    if (category === 'essential') return; // Essential cookies cannot be disabled
    
    const newPreferences = {
      ...state.preferences,
      [category]: value,
    };
    
    // If user has already given consent, update to custom
    if (state.hasConsent !== null) {
      localStorage.setItem('cookie-consent', 'custom');
    }
    
    savePreferences(newPreferences);
  }, [state.preferences, savePreferences, state.hasConsent]);

  const resetConsent = useCallback(() => {
    localStorage.removeItem('cookie-consent');
    localStorage.removeItem('cookie-preferences');
    setState({
      hasConsent: null,
      preferences: DEFAULT_PREFERENCES,
      isLoading: false,
    });
  }, []);

  const canUseAnalytics = state.preferences.performance;
  const canUseFunctional = state.preferences.functional;
  const canUseMarketing = state.preferences.marketing;

  return {
    ...state,
    acceptAll,
    rejectAll,
    updatePreference,
    resetConsent,
    savePreferences,
    canUseAnalytics,
    canUseFunctional,
    canUseMarketing,
  };
}