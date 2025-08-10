export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { withPermission } from '@/middleware/rbac';
import prisma from '@/lib/prisma';

// Get settings (requires settings:read permission)
export const GET = withPermission('settings:read', async (_req: NextRequest) => {
  try {
    // In a real app, you'd fetch from database
    // For now, return default settings
    const settings = {
      siteName: 'SmartSlate',
      siteUrl: 'https://smartslate.io',
      adminEmail: 'admin@smartslate.io',
      timezone: 'America/New_York',
      language: 'en',
      maintenanceMode: false,
      
      authProvider: 'stack',
      sessionTimeout: 30,
      requireEmailVerification: true,
      allowRegistration: true,
      
      emailProvider: 'sendgrid',
      emailFrom: 'noreply@smartslate.io',
      emailApiKey: '••••••••••••••••',
      
      databaseBackup: true,
      backupFrequency: 'daily',
      backupRetention: 30,
      
      apiRateLimit: 100,
      apiTimeout: 30,
      enableWebhooks: true,
      
      theme: 'dark',
      primaryColor: '#a7dadb',
      logoUrl: '/logo.png'
    };

    return NextResponse.json({ ok: true, settings });
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
});

// Update settings (requires settings:write permission)
export const POST = withPermission('settings:write', async (req: NextRequest) => {
  try {
    const settings = await req.json();

    // In a real app, you'd save to database
    // For demonstration, we'll log the settings
    console.log('Saving settings:', settings);

    // Simulate saving to database
    // You could create a Settings table in Prisma and save here
    
    return NextResponse.json({ 
      ok: true, 
      message: 'Settings saved successfully',
      settings 
    });
  } catch (error) {
    console.error('Failed to save settings:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
});
