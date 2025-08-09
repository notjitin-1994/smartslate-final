'use client';

import { useEffect, useState } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

export default function PWAInstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault?.();
      setDeferred(e as BeforeInstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler as EventListener);
    return () => window.removeEventListener('beforeinstallprompt', handler as EventListener);
  }, []);

  if (!visible || !deferred) return null;

  const onInstall = async () => {
    try {
      await deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice.outcome === 'accepted') {
        setVisible(false);
        setDeferred(null);
      }
    } catch {}
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        zIndex: 10000,
        background: 'rgba(9,21,33,0.95)',
        color: '#fff',
        padding: '12px 14px',
        borderRadius: 12,
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <span style={{ fontSize: 14 }}>Install Smartslate?</span>
      <button
        onClick={onInstall}
        style={{
          background: '#32a6ff',
          color: '#091521',
          border: 'none',
          padding: '8px 10px',
          borderRadius: 8,
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        Install
      </button>
      <button
        onClick={onClose}
        aria-label="Dismiss install prompt"
        style={{
          background: 'transparent',
          color: '#9bb3c7',
          border: '1px solid #2a3b4d',
          padding: '7px 10px',
          borderRadius: 8,
          cursor: 'pointer',
        }}
      >
        Later
      </button>
    </div>
  );
}


