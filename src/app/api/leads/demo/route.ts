import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
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

    // Store in database
    try {
      const db = getDb();
      const result = await db.query(
        `INSERT INTO app.demo_requests (
          name, email, phone, company, role, department,
          industry, company_size, location,
          demo_type, preferred_date, preferred_time, timezone,
          demo_duration, attendees_count, attendee_roles,
          current_challenges, team_size, budget_range, timeline,
          decision_makers, implementation_scope,
          product_interest, specific_features, use_case,
          integration_needs, current_lms, current_tools,
          learning_goals, success_metrics, compliance_needs,
          how_did_you_hear, competitive_analysis, additional_notes,
          urgency_level, ip_address, user_agent
        ) VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9,
          $10, $11::date, $12, $13,
          $14, $15, $16::text[],
          $17, $18, $19, $20,
          $21, $22,
          $23::text[], $24::text[], $25,
          $26::text[], $27, $28::text[],
          $29, $30, $31::text[],
          $32, $33, $34,
          $35, $36::inet, $37
        ) RETURNING id, created_at`,
        [
          body.name,
          body.email,
          body.phone || null,
          body.company,
          body.role || null,
          body.department || null,
          body.industry || null,
          body.companySize || null,
          body.location || null,
          body.demoType,
          body.preferredDate,
          body.preferredTime,
          body.timezone || null,
          body.demoDuration || '60 minutes',
          body.attendeesCount || null,
          Array.isArray(body.attendeeRoles) ? body.attendeeRoles : [],
          body.currentChallenges || null,
          body.teamSize || null,
          body.budgetRange || null,
          body.timeline || null,
          body.decisionMakers || null,
          body.implementationScope || null,
          Array.isArray(body.productInterest) ? body.productInterest : [],
          Array.isArray(body.specificFeatures) ? body.specificFeatures : [],
          body.useCase || null,
          Array.isArray(body.integrationNeeds) ? body.integrationNeeds : [],
          body.currentLMS || null,
          Array.isArray(body.currentTools) ? body.currentTools : [],
          body.learningGoals || null,
          body.successMetrics || null,
          Array.isArray(body.complianceNeeds) ? body.complianceNeeds : [],
          body.howDidYouHear || null,
          body.competitiveAnalysis || null,
          body.additionalNotes || null,
          body.urgencyLevel || 'normal',
          // capture client context if proxied via headers; otherwise null
          request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
          request.headers.get('user-agent') || null,
        ]
      );

      const requestId = result.rows[0]?.id;
      const createdAt = result.rows[0]?.created_at;

      // Send notification email to sales team
      const to = process.env.LEADS_EMAIL_TO || 'hello@smartslate.io';
      const subject = `Demo Request: ${body.company} (${body.name}) - ${body.demoType}`;
      const html = `
        <h2>New Demo Request</h2>
        <p><strong>Request ID:</strong> ${requestId}</p>
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
          requestId: requestId,
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
