import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'company', 'productName'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: \${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Store in database
    try {
      const supabase = getSupabaseService();
      const { data, error } = await supabase
        .from('waitlist_leads')
        .insert({
          name: body.name,
          email: body.email,
          company: body.company,
          additional_info: body.useCase || null,
          source: \`\${body.productName} Beta Request\`,
          course_name: body.productName,
          ip_address: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
          user_agent: request.headers.get('user-agent') || null,
        })
        .select('id, created_at')
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        return NextResponse.json(
          { error: 'Failed to save beta lead' },
          { status: 500 }
        );
      }

      const leadId = data.id;
      const createdAt = data.created_at;

      // Send notification email to team
      const to = process.env.LEADS_EMAIL_TO || 'hello@smartslate.io';
      const subject = \`Beta Request: \${body.productName} - \${body.name}\`;
      const html = \`
        <h2>New Beta Access Request</h2>
        <p><strong>Product:</strong> \${body.productName}</p>
        <p><strong>Name:</strong> \${body.name}</p>
        <p><strong>Email:</strong> \${body.email}</p>
        <p><strong>Organization:</strong> \${body.company}</p>
        <hr>
        <h3>Use Case Details</h3>
        <p>\${body.useCase || 'Not specified'}</p>
        <hr>
        <p><strong>Submitted:</strong> \${createdAt}</p>
        <p><strong>Lead ID:</strong> \${leadId}</p>
      \`;

      sendEmail({ to, subject, html }).catch((err) => console.error('Failed to send beta email', err));

      return NextResponse.json(
        { 
          success: true, 
          message: 'Beta request submission successful',
          leadId: leadId
        },
        { status: 201 }
      );

    } catch (dbError) {
      console.error('Database insert failed:', dbError);
      return NextResponse.json(
        { error: 'Failed to save beta lead' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error processing beta submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
