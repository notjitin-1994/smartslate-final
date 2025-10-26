'use client';

import CookieConsent from './CookieConsent';

export default function CookieConsentWrapper() {
  return <CookieConsent 
    onAccept={(preferences) => {
      console.log('Cookie preferences accepted:', preferences);
    }}
    onReject={() => {
      console.log('All cookies rejected');
    }}
    onSavePreferences={(preferences) => {
      console.log('Cookie preferences saved:', preferences);
    }}
  />;
}