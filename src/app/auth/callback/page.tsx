'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSupabaseBrowser } from '@/lib/supabase-browser';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        console.log('Auth callback started, URL:', typeof window !== 'undefined' ? window.location.href : '');
        const supabase = getSupabaseBrowser();
        
        // Check for OAuth errors first
        const oauthError = params.get('error') || params.get('error_description');
        if (oauthError) {
          console.error('OAuth provider returned error:', oauthError);
          setError(decodeURIComponent(oauthError));
          return;
        }

        // Let Supabase automatically handle the session exchange
        // Since detectSessionInUrl is true, it should automatically detect and exchange the code
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          throw error;
        }
        
        if (!session) {
          console.error('No session returned from auth callback');
          throw new Error('No session returned');
        }
        
        const user = session.user;
        const fullName = (user.user_metadata?.full_name as string) || user.email?.split('@')[0] || 'User';
        console.log('Logging in user:', { id: user.id, full_name: fullName, email: user.email });
        
        login(session.access_token, { id: user.id, full_name: fullName, email: user.email as string });

        // First-login redirect: if user hasn't seen profile prompt, mark and send to profile
        const hasSeen = Boolean((user.user_metadata as any)?.has_seen_profile_prompt);
        if (!hasSeen) {
          try {
            await fetch('/api/auth/first-login', {
              method: 'POST',
              headers: { Authorization: `Bearer ${session.access_token}` },
            });
          } catch {}
          router.replace('/profile?first=1');
          return;
        }

        const next = params.get('next') || '/';
        console.log('Redirecting to:', next);
        router.replace(next);
      } catch (e: any) {
        console.error('Auth callback failed:', e);
        setError(e?.message || 'Authentication failed');
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-3">
        <p className="text-secondary">Completing sign-in…</p>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    </div>
  );
}



