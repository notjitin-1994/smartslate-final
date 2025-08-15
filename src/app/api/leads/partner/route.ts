import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase';
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

    // Store in database using Supabase service role to bypass RLS
    const supabase = getSupabaseService();
    const { data: insertData, error } = await supabase
      .from('partner_inquiries')
      .insert({
        title: title,
        collaboration_type: collaborationType,
        name: name,
        email: email,
        company: typeof data?.company === 'string' ? String(data.company) : null,
        role: typeof data?.role === 'string' ? String(data.role) : null,
        phone: typeof data?.phone === 'string' ? String(data.phone) : null,
        fund: typeof data?.fund === 'string' ? String(data.fund) : null,
        linkedin_url: typeof data?.linkedin === 'string' ? String(data.linkedin) : (typeof data?.linkedin_url === 'string' ? String(data.linkedin_url) : null),
        github_url: typeof data?.github === 'string' ? String(data.github) : (typeof data?.github_url === 'string' ? String(data.github_url) : null),
        source: typeof body?.source === 'string' ? body.source : 'collaborate-page',
        status: 'new',
        tags: Array.isArray(body?.tags) ? body.tags : null,
        data: data,
        ip_address: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
        user_agent: request.headers.get('user-agent') || null,
      })
      .select('id, created_at')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save partner inquiry' },
        { status: 500 }
      );
    }

    const leadId = insertData.id;
    const createdAt = insertData.created_at;

    // Notify team
    const to = process.env.LEADS_EMAIL_TO || 'hello@smartslate.io';
    const subject = `Partner Inquiry: ${title} [${collaborationType}] (${name || 'Unknown'})`;
    const html = `
      <h2>New Partner/Collaboration Inquiry</h2>
      <p><strong>Request ID:</strong> ${leadId}</p>
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
        requestId: leadId,
        createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing partner inquiry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


