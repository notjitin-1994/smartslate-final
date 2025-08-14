import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const title: string = body?.title || 'Partner/Collaboration Inquiry';
    const collaborationType: string = body?.collaborationType || 'general';
    const data: Record<string, unknown> = body?.data || {};

    // Minimal validation
    const email = typeof data?.email === 'string' ? String(data.email) : '';
    const name = typeof data?.name === 'string' ? String(data.name) : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'A valid email is required' },
        { status: 400 }
      );
    }

    // Ensure table exists (lightweight guard for first-run environments)
    const db = getDb();
    await db.query(
      `CREATE SCHEMA IF NOT EXISTS app;
       CREATE TABLE IF NOT EXISTS app.partner_inquiries (
         id BIGSERIAL PRIMARY KEY,
         title TEXT NOT NULL,
         collaboration_type TEXT NOT NULL DEFAULT 'general',
         name TEXT,
         email TEXT NOT NULL,
         company TEXT,
         role TEXT,
         phone TEXT,
         fund TEXT,
         linkedin_url TEXT,
         github_url TEXT,
         source TEXT,
         status TEXT NOT NULL DEFAULT 'new',
         tags TEXT[],
         data JSONB NOT NULL,
         created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
         ip_address INET,
         user_agent TEXT
       );
       ALTER TABLE app.partner_inquiries ADD COLUMN IF NOT EXISTS collaboration_type TEXT NOT NULL DEFAULT 'general';
       ALTER TABLE app.partner_inquiries ADD COLUMN IF NOT EXISTS name TEXT;
       ALTER TABLE app.partner_inquiries ADD COLUMN IF NOT EXISTS email TEXT;
       ALTER TABLE app.partner_inquiries ADD COLUMN IF NOT EXISTS company TEXT;
       ALTER TABLE app.partner_inquiries ADD COLUMN IF NOT EXISTS role TEXT;
       ALTER TABLE app.partner_inquiries ADD COLUMN IF NOT EXISTS phone TEXT;
       ALTER TABLE app.partner_inquiries ADD COLUMN IF NOT EXISTS fund TEXT;
       ALTER TABLE app.partner_inquiries ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
       ALTER TABLE app.partner_inquiries ADD COLUMN IF NOT EXISTS github_url TEXT;
       ALTER TABLE app.partner_inquiries ADD COLUMN IF NOT EXISTS source TEXT;
       ALTER TABLE app.partner_inquiries ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new';
       ALTER TABLE app.partner_inquiries ADD COLUMN IF NOT EXISTS tags TEXT[];`
    );

    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null;
    const userAgent = request.headers.get('user-agent') || null;

    const normalizedName = name || (typeof (data as any)?.fullName === 'string' ? String((data as any).fullName) : null);
    const normalizedCompany = typeof (data as any)?.company === 'string' ? String((data as any).company) : null;
    const normalizedRole = typeof (data as any)?.role === 'string' ? String((data as any).role) : null;
    const normalizedPhone = typeof (data as any)?.phone === 'string' ? String((data as any).phone) : null;
    const normalizedFund = typeof (data as any)?.fund === 'string' ? String((data as any).fund) : null;
    const normalizedLinkedIn = typeof (data as any)?.linkedin === 'string' ? String((data as any).linkedin) : (typeof (data as any)?.linkedin_url === 'string' ? String((data as any).linkedin_url) : null);
    const normalizedGithub = typeof (data as any)?.github === 'string' ? String((data as any).github) : (typeof (data as any)?.github_url === 'string' ? String((data as any).github_url) : null);
    const source = typeof body?.source === 'string' ? body.source : 'collaborate-page';
    const status = 'new';
    const tags = Array.isArray(body?.tags) ? body.tags : null;

    const insert = await db.query(
      `INSERT INTO app.partner_inquiries (
         title, collaboration_type, name, email, company, role, phone, fund, linkedin_url, github_url, source, status, tags, data, ip_address, user_agent
       ) VALUES (
         $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13::text[], $14::jsonb, $15::inet, $16
       )
       RETURNING id, created_at`,
      [
        title,
        collaborationType,
        normalizedName,
        email,
        normalizedCompany,
        normalizedRole,
        normalizedPhone,
        normalizedFund,
        normalizedLinkedIn,
        normalizedGithub,
        source,
        status,
        tags,
        JSON.stringify(data),
        ipAddress,
        userAgent,
      ]
    );

    const requestId = insert.rows[0]?.id;
    const createdAt = insert.rows[0]?.created_at;

    // Notify team
    const to = process.env.LEADS_EMAIL_TO || 'hello@smartslate.io';
    const subject = `Partner Inquiry: ${title} [${collaborationType}] (${name || 'Unknown'})`;
    const html = `
      <h2>New Partner/Collaboration Inquiry</h2>
      <p><strong>Request ID:</strong> ${requestId}</p>
      <p><strong>Submitted:</strong> ${createdAt}</p>
      <p><strong>Source:</strong> Partner Contact Modal</p>
      <p><strong>Type:</strong> ${collaborationType}</p>
      <hr/>
      <pre style="white-space:pre-wrap;font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;">${JSON.stringify({ title, data }, null, 2)}</pre>
    `;
    // Fire-and-forget
    sendEmail({ to, subject, html }).catch((err) => console.error('Failed to send partner inquiry email', err));

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry submitted successfully',
        requestId,
        createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing partner inquiry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


