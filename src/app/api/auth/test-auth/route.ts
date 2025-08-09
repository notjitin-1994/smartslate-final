export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  
  const response: any = {
    hasAuthHeader: !!authHeader,
    authHeader: authHeader || 'None',
    timestamp: new Date().toISOString()
  };
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    try {
      const [headerB64, payloadB64] = token.split('.');
      
      if (payloadB64) {
        const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
        response.tokenPayload = payload;
        response.email = payload.email;
        response.hasSub = !!payload.sub;
        response.isJitin = payload.email === 'jitin@smartslate.io';
      }
    } catch (error) {
      response.tokenError = error instanceof Error ? error.message : 'Unknown error';
    }
  }
  
  return NextResponse.json(response);
}
