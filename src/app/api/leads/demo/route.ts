import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'company', 'demoType', 'preferredDate', 'preferredTime', 'productInterest'];
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

    // Validate preferred date is in the future
    const preferredDate = new Date(body.preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (preferredDate <= today) {
      return NextResponse.json(
        { error: 'Preferred date must be in the future' },
        { status: 400 }
      );
    }

    // Store in database using Supabase service role to bypass RLS
    try {
      const supabase = getSupabaseService();
      const { data, error } = await supabase
        .from('demo_requests')
        .insert({
          name: body.name,
          email: body.email,
          phone: body.phone || null,
          company: body.company,
          role: body.role || null,
          department: body.department || null,
          industry: body.industry || null,
          company_size: body.companySize || null,
          location: body.location || null,
          demo_type: body.demoType,
          preferred_date: body.preferredDate,
          preferred_time: body.preferredTime,
          timezone: body.timezone || null,
          demo_duration: body.demoDuration || '45 minutes',
          attendees_count: body.attendeesCount || null,
          attendee_roles: Array.isArray(body.attendeeRoles) ? body.attendeeRoles : [],
          urgency_level: body.urgencyLevel || 'normal',
          primary_interest: body.primaryInterest,
          secondary_interests: Array.isArray(body.secondaryInterests) ? body.secondaryInterests : [],
          team_size: body.teamSize || null,
          budget_range: body.budgetRange || null,
          timeline: body.timeline || null,
          decision_makers: body.decisionMakers || null,
          implementation_scope: body.implementationScope || null,
          product_interest: Array.isArray(body.productInterest) ? body.productInterest : [],
          specific_requirements: Array.isArray(body.specificRequirements) ? body.specificRequirements : [],
          use_case: body.useCase || null,
          integration_needs: Array.isArray(body.integrationNeeds) ? body.integrationNeeds : [],
          compliance_needs: Array.isArray(body.complianceNeeds) ? body.complianceNeeds : [],
          current_lms: body.currentLMS || null,
          current_tools: Array.isArray(body.currentTools) ? body.currentTools : [],
          learning_goals: body.learningGoals || null,
          success_metrics: body.successMetrics || null,
          pain_points: body.painPoints || null,
          desired_outcomes: body.desiredOutcomes || null,
          how_did_you_hear: body.howDidYouHear || null,
          competitive_analysis: body.competitiveAnalysis || null,
          additional_notes: body.additionalNotes || null,
          referral_source: body.referralSource || null,
          ip_address: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
          user_agent: request.headers.get('user-agent') || null,
        })
        .select('id, created_at')
        .single();

      if (error) {
        console.error('Supabase insert error:', error);
        return NextResponse.json(
          { error: 'Failed to save demo request' },
          { status: 500 }
        );
      }

      const leadId = data.id;
      const createdAt = data.created_at;

      // Send notification email to sales team
      const to = process.env.LEADS_EMAIL_TO || 'hello@smartslate.io';
      const subject = `Demo Request: ${body.company} (${body.name}) - ${body.demoType}`;
      const html = `
        <h2>New Demo Request</h2>
        <p><strong>Request ID:</strong> ${leadId}</p>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${body.company}</p>
        <p><strong>Role:</strong> ${body.role || 'Not specified'}</p>
        <p><strong>Department:</strong> ${body.department || 'Not specified'}</p>
        <p><strong>Industry:</strong> ${body.industry || 'Not specified'}</p>
        <p><strong>Company Size:</strong> ${body.companySize || 'Not specified'}</p>
        <p><strong>Location:</strong> ${body.location || 'Not specified'}</p>
        <hr>
        <h3>Demo Details</h3>
        <p><strong>Demo Type:</strong> ${body.demoType}</p>
        <p><strong>Preferred Date:</strong> ${body.preferredDate}</p>
        <p><strong>Preferred Time:</strong> ${body.preferredTime}</p>
        <p><strong>Timezone:</strong> ${body.timezone || 'Not specified'}</p>
        <p><strong>Demo Duration:</strong> ${body.demoDuration || '60 minutes'}</p>
        <p><strong>Attendees Count:</strong> ${body.attendeesCount || 'Not specified'}</p>
        <p><strong>Attendee Roles:</strong> ${Array.isArray(body.attendeeRoles) ? body.attendeeRoles.join(', ') : 'None specified'}</p>
        <hr>
        <h3>Business Context</h3>
        <p><strong>Current Challenges:</strong> ${body.currentChallenges || 'Not specified'}</p>
        <p><strong>Team Size:</strong> ${body.teamSize || 'Not specified'}</p>
        <p><strong>Budget Range:</strong> ${body.budgetRange || 'Not specified'}</p>
        <p><strong>Timeline:</strong> ${body.timeline || 'Not specified'}</p>
        <p><strong>Decision Makers:</strong> ${body.decisionMakers || 'Not specified'}</p>
        <p><strong>Implementation Scope:</strong> ${body.implementationScope || 'Not specified'}</p>
        <hr>
        <h3>Product Interest</h3>
        <p><strong>Products:</strong> ${Array.isArray(body.productInterest) ? body.productInterest.join(', ') : 'None specified'}</p>
        <p><strong>Specific Features:</strong> ${Array.isArray(body.specificFeatures) ? body.specificFeatures.join(', ') : 'None specified'}</p>
        <p><strong>Use Case:</strong> ${body.useCase || 'Not specified'}</p>
        <p><strong>Integration Needs:</strong> ${Array.isArray(body.integrationNeeds) ? body.integrationNeeds.join(', ') : 'None specified'}</p>
        <hr>
        <h3>Current State</h3>
        <p><strong>Current LMS:</strong> ${body.currentLMS || 'Not specified'}</p>
        <p><strong>Current Tools:</strong> ${Array.isArray(body.currentTools) ? body.currentTools.join(', ') : 'None specified'}</p>
        <p><strong>Learning Goals:</strong> ${body.learningGoals || 'Not specified'}</p>
        <p><strong>Success Metrics:</strong> ${body.successMetrics || 'Not specified'}</p>
        <p><strong>Compliance Needs:</strong> ${Array.isArray(body.complianceNeeds) ? body.complianceNeeds.join(', ') : 'None specified'}</p>
        <hr>
        <h3>Additional Context</h3>
        <p><strong>How did you hear:</strong> ${body.howDidYouHear || 'Not specified'}</p>
        <p><strong>Competitive Analysis:</strong> ${body.competitiveAnalysis || 'Not specified'}</p>
        <p><strong>Additional Notes:</strong> ${body.additionalNotes || 'None'}</p>
        <p><strong>Urgency Level:</strong> ${body.urgencyLevel || 'normal'}</p>
        <hr>
        <p><strong>Submitted:</strong> ${createdAt}</p>
        <p><strong>Source:</strong> Demo Request Modal</p>
      `;

      // Fire-and-forget email; don't block response on failures
      sendEmail({ to, subject, html }).catch((err) => console.error('Failed to send demo email', err));

      return NextResponse.json(
        { 
          success: true, 
          message: 'Demo request submitted successfully',
          requestId: leadId,
          createdAt: createdAt
        },
        { status: 201 }
      );

    } catch (dbError) {
      console.error('Database insert failed:', dbError);
      return NextResponse.json(
        { error: 'Failed to save demo request' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error processing demo request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
