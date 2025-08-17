import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'source'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
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

    // Store in database using Supabase service role to bypass RLS
    try {
      const supabase = getSupabaseService();
      const { data, error } = await supabase
        .from('waitlist_leads')
        .insert({
          name: body.name,
          email: body.email,
          phone: body.phone || null,
          company: body.company || null,
          role: body.role || null,
          industry: body.industry || null,
          company_size: body.companySize || null,
          location: body.location || null,
          source: body.source,
          course_name: body.courseName || null,
          interest_level: body.interestLevel || 'high',
          learning_goals: body.learningGoals || null,
          preferred_start_date: body.preferredStartDate || null,
          learning_format: body.learningFormat || null,
          experience_level: body.experienceLevel || null,
          team_size: body.teamSize || null,
          budget_range: body.budgetRange || null,
          timeline: body.timeline || null,
          referral_source: body.referralSource || null,
          additional_info: body.additionalInfo || null,
          how_did_you_hear: body.howDidYouHear || null,
          ip_address: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
          user_agent: request.headers.get('user-agent') || null,
        })
        .select('id, created_at')
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        return NextResponse.json(
          { error: 'Failed to save waitlist lead' },
          { status: 500 }
        );
      }

      const leadId = data.id;
      const createdAt = data.created_at;

      // Send notification email to team
      const to = process.env.LEADS_EMAIL_TO || 'hello@smartslate.io';
      const subject = `Waitlist Lead: ${body.source} - ${body.name}`;
      const html = `
        <h2>New Waitlist Lead</h2>
        <p><strong>Lead ID:</strong> ${leadId}</p>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${body.company || 'Individual'}</p>
        <p><strong>Role:</strong> ${body.role || 'Not specified'}</p>
        <p><strong>Industry:</strong> ${body.industry || 'Not specified'}</p>
        <p><strong>Company Size:</strong> ${body.companySize || 'Not specified'}</p>
        <p><strong>Location:</strong> ${body.location || 'Not specified'}</p>
        <hr>
        <h3>Waitlist Details</h3>
        <p><strong>Source:</strong> ${body.source}</p>
        <p><strong>Course/Product:</strong> ${body.courseName || 'General waitlist'}</p>
        <p><strong>Interest Level:</strong> ${body.interestLevel || 'high'}</p>
        <p><strong>Learning Goals:</strong> ${body.learningGoals || 'Not specified'}</p>
        <p><strong>Preferred Start Date:</strong> ${body.preferredStartDate || 'Not specified'}</p>
        <p><strong>Learning Format:</strong> ${body.learningFormat || 'Not specified'}</p>
        <p><strong>Experience Level:</strong> ${body.experienceLevel || 'Not specified'}</p>
        <hr>
        <h3>Business Context</h3>
        <p><strong>Team Size:</strong> ${body.teamSize || 'Not specified'}</p>
        <p><strong>Budget Range:</strong> ${body.budgetRange || 'Not specified'}</p>
        <p><strong>Timeline:</strong> ${body.timeline || 'Not specified'}</p>
        <p><strong>Referral Source:</strong> ${body.referralSource || 'Not specified'}</p>
        <p><strong>How did you hear:</strong> ${body.howDidYouHear || 'Not specified'}</p>
        <hr>
        <h3>Additional Information</h3>
        <p><strong>Additional Info:</strong> ${body.additionalInfo || 'None'}</p>
        <hr>
        <p><strong>Submitted:</strong> ${createdAt}</p>
        <p><strong>Source:</strong> ${body.source} Waitlist</p>
      `;

      // Fire-and-forget email; don't block response on failures
      sendEmail({ to, subject, html }).catch((err) => console.error('Failed to send waitlist email', err));

      return NextResponse.json(
        { 
          success: true, 
          message: 'Waitlist submission successful',
          leadId: leadId,
          createdAt: createdAt
        },
        { status: 201 }
      );

    } catch (dbError) {
      console.error('Database insert failed:', dbError);
      return NextResponse.json(
        { error: 'Failed to save waitlist lead' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error processing waitlist submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


