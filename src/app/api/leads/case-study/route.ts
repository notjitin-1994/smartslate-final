import { NextRequest } from 'next/server';
import { sendEmail } from '@/lib/email';
import { getDb } from '@/lib/db';

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
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const to = process.env.LEADS_EMAIL_TO || 'hello@smartslate.io';
    const subject = `Case Study Request: ${company} (${name})`;
    const html = `
      <h2>New Case Study Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Role:</strong> ${role}</p>
      <p><strong>Industry:</strong> ${industry}</p>
      <p><strong>Case Study Type:</strong> ${caseStudyType}</p>
      <p><strong>Specific Interests:</strong> ${(Array.isArray(specificInterests) ? specificInterests : []).join(', ')}</p>
      <p><strong>Current Challenges:</strong> ${currentChallenges}</p>
      <p><strong>Follow Up:</strong> ${followUp}</p>
    `;

    // Persist to Supabase (Postgres)
    try {
      const db = getDb();
      const result = await db.query(
        `INSERT INTO app.case_study_requests (
          name, email, phone, company, role, industry,
          case_study_type, specific_interests, current_challenges, follow_up,
          ip_address, user_agent
        ) VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8::text[], $9, $10::app.follow_up_preference,
          $11::inet, $12
        ) RETURNING id, created_at`,
        [
          name,
          email,
          phone || null,
          company,
          role || null,
          industry || null,
          caseStudyType,
          Array.isArray(specificInterests) ? specificInterests : [],
          currentChallenges || null,
          followUp || null,
          // capture client context if proxied via headers; otherwise null
          req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
          req.headers.get('user-agent') || null,
        ]
      );
      // Fire-and-forget email; don't block response on failures
      sendEmail({ to, subject, html }).catch((err) => console.error('Failed to send case study email', err));

      return new Response(
        JSON.stringify({ ok: true, id: result.rows[0]?.id, createdAt: result.rows[0]?.created_at }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (err) {
      console.error('DB insert failed', err);
      return new Response(JSON.stringify({ error: 'Failed to save request' }), { status: 500 });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }
}


