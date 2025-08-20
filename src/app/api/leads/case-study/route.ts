import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const {
      name = '',
      email = '',
      phone = '',
      company = '',
      role = '',
      industry = '',
      caseStudyType = '',
      specificInterests = [],
      currentChallenges = '',
      followUp = '',
    } = data ?? {};

    if (!name || !email || !company || !caseStudyType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Store in database using Supabase service role to bypass RLS
    try {
      const supabase = getSupabaseService();
      const { data, error } = await supabase
        .from('case_study_requests')
        .insert({
          name: name,
          email: email,
          phone: phone || null,
          company: company,
          role: role || null,
          industry: industry || null,
          case_study_type: caseStudyType,
          specific_interests: Array.isArray(specificInterests) ? specificInterests : [],
          current_challenges: currentChallenges || null,
          follow_up: followUp || null,
          ip_address: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
          user_agent: req.headers.get('user-agent') || null,
        })
        .select('id, created_at')
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        return NextResponse.json(
          { error: 'Failed to save case study request' },
          { status: 500 }
        );
      }

      const leadId = data.id;
      const createdAt = data.created_at;

      // Send notification email to team
      const to = process.env.LEADS_EMAIL_TO || 'hello@smartslate.io';
      const subject = `Case Study Request: ${company} (${name})`;
      const html = `
        <h2>New Case Study Request</h2>
        <p><strong>Lead ID:</strong> ${leadId}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Role:</strong> ${role || 'Not specified'}</p>
        <p><strong>Industry:</strong> ${industry || 'Not specified'}</p>
        <p><strong>Case Study Type:</strong> ${caseStudyType}</p>
        <p><strong>Specific Interests:</strong> ${(Array.isArray(specificInterests) ? specificInterests : []).join(', ')}</p>
        <p><strong>Current Challenges:</strong> ${currentChallenges}</p>
        <p><strong>Follow Up:</strong> ${followUp}</p>
        <hr>
        <p><strong>Submitted:</strong> ${createdAt}</p>
        <p><strong>Source:</strong> Case Study Request Modal</p>
      `;

      // Fire-and-forget email; don't block response on failures
      sendEmail({ to, subject, html }).catch((err) => console.error('Failed to send case study email', err));

      return NextResponse.json(
        { ok: true, id: leadId, createdAt: createdAt },
        { status: 200 }
      );
    } catch (err) {
      console.error('DB insert failed', err);
      return NextResponse.json({ error: 'Failed to save request' }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}


