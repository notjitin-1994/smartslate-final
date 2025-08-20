import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'company', 'role', 'companySize', 'industry', 'currentChallenges', 'skillGaps', 'targetAudience', 'primaryGoals', 'timeline', 'specificOutcomes'];
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
      
      // First, check if the table exists
      const { error: tableCheckError } = await supabase
        .from('ssa_interest_modal')
        .select('id')
        .limit(1);
      
      if (tableCheckError) {
        console.error('Table check error:', tableCheckError);
        if (tableCheckError.code === '42P01') {
          console.error('Table ssa_interest_modal does not exist. Please run the database setup script.');
          return NextResponse.json(
            { 
              error: 'Database not configured. Please contact support.',
              details: 'Table ssa_interest_modal does not exist'
            },
            { status: 500 }
          );
        }
      }
      
      const { data, error } = await supabase
        .from('ssa_interest_modal')
        .insert({
          name: body.name,
          email: body.email,
          phone: body.phone,
          company: body.company,
          role: body.role,
          department: body.department || null,
          company_size: body.companySize,
          industry: body.industry,
          location: body.location || null,
          current_challenges: body.currentChallenges,
          skill_gaps: Array.isArray(body.skillGaps) ? body.skillGaps : [],
          existing_lms: body.existingLMS || null,
          current_training_budget: body.currentTrainingBudget || null,
          employee_count: body.employeeCount || null,
          target_audience: body.targetAudience,
          primary_goals: Array.isArray(body.primaryGoals) ? body.primaryGoals : [],
          timeline: body.timeline,
          budget: body.budget || null,
          specific_outcomes: body.specificOutcomes,
          decision_makers: body.decisionMakers || null,
          success_metrics: body.successMetrics || null,
          how_did_you_hear: body.howDidYouHear || null,
          additional_notes: body.additionalNotes || null,
          privacy_consent: body.privacyConsent || false,
          ip_address: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
          user_agent: request.headers.get('user-agent') || null,
        })
        .select('id, created_at')
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        return NextResponse.json(
          { error: 'Failed to save SSA inquiry', details: error.message },
          { status: 500 }
        );
      }

      const leadId = data.id;
      const createdAt = data.created_at;

      // Send notification email to enterprise sales team
      const to = process.env.LEADS_EMAIL_TO || 'hello@smartslate.io';
      const subject = `SSA Interest: ${body.company} (${body.name})`;
      const html = `
        <h2>New SSA Interest Submission</h2>
        <p><strong>Lead ID:</strong> ${leadId}</p>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Company:</strong> ${body.company}</p>
        <p><strong>Role:</strong> ${body.role}</p>
        <p><strong>Department:</strong> ${body.department || 'Not specified'}</p>
        <p><strong>Company Size:</strong> ${body.companySize}</p>
        <p><strong>Industry:</strong> ${body.industry}</p>
        <p><strong>Location:</strong> ${body.location || 'Not specified'}</p>
        <hr>
        <h3>Current Challenges</h3>
        <p>${body.currentChallenges}</p>
        <h3>Skill Gaps</h3>
        <p>${Array.isArray(body.skillGaps) ? body.skillGaps.join(', ') : 'None specified'}</p>
        <h3>Target Audience</h3>
        <p>${body.targetAudience}</p>
        <hr>
        <h3>Primary Goals</h3>
        <p>${Array.isArray(body.primaryGoals) ? body.primaryGoals.join(', ') : 'None specified'}</p>
        <h3>Timeline</h3>
        <p>${body.timeline}</p>
        <h3>Budget</h3>
        <p>${body.budget || 'Not specified'}</p>
        <h3>Specific Outcomes</h3>
        <p>${body.specificOutcomes}</p>
        <hr>
        <p><strong>Submitted:</strong> ${createdAt}</p>
        <p><strong>Source:</strong> SSA Interest Modal</p>
      `;

      // Fire-and-forget email; don't block response on failures
      sendEmail({ to, subject, html }).catch((err) => console.error('Failed to send SSA email', err));

      return NextResponse.json(
        { 
          success: true, 
          message: 'SSA inquiry submitted successfully',
          leadId: leadId,
          createdAt: createdAt
        },
        { status: 201 }
      );

    } catch (dbError) {
      console.error('Database insert failed:', dbError);
      return NextResponse.json(
        { error: 'Failed to save SSA inquiry' },
        { status: 500 }
      );
    }



  } catch (error) {
    console.error('Error processing SSA lead:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
