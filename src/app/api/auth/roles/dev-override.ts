export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

/**
 * Development override endpoint for testing admin access when database is unavailable
 * This should be removed in production!
 */
export async function POST(req: NextRequest) {
  console.warn('⚠️ Using development override for role checking - Database unavailable');
  
  // Extract token from Authorization header
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  
  const token = authHeader.substring(7);
  
  try {
    // Decode the token (without verification since it's a mock token)
    const [, payloadB64] = token.split('.');
    if (!payloadB64) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
    
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    const email = payload.email;
    
    // Override for jitin@smartslate.io
    if (email === 'jitin@smartslate.io') {
      console.log('✅ Granting owner role to jitin@smartslate.io (dev override)');
      return NextResponse.json({ 
        ok: true, 
        roles: ['owner', 'learner'],
        devOverride: true 
      });
    }
    
    // Default learner role for other users
    return NextResponse.json({ 
      ok: true, 
      roles: ['learner'],
      devOverride: true 
    });
    
  } catch (error) {
    console.error('Error in dev override:', error);
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}
