import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
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

    // Store in database
    try {
      const db = getDb();
      const result = await db.query(
        `INSERT INTO app.ssa_interest_modal (
          name, email, phone, company, role, department,
          company_size, industry, location,
          current_challenges, skill_gaps, existing_lms,
          current_training_budget, employee_count, target_audience,
          primary_goals, timeline, budget, specific_outcomes,
          technical_requirements, integration_needs,
          decision_makers, competing_priorities, success_metrics,
          how_did_you_hear, additional_notes,
          ip_address, user_agent
        ) VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9,
          $10, $11::text[], $12,
          $13, $14, $15,
          $16::text[], $17, $18, $19,
          $20, $21,
          $22, $23, $24,
          $25, $26,
          $27::inet, $28
        ) RETURNING id, created_at`,
        [
          body.name,
          body.email,
          body.phone,
          body.company,
          body.role,
          body.department || null,
          body.companySize,
          body.industry,
          body.location || null,
          body.currentChallenges,
          Array.isArray(body.skillGaps) ? body.skillGaps : [],
          body.existingLMS || null,
          body.currentTrainingBudget || null,
          body.employeeCount || null,
          body.targetAudience,
          Array.isArray(body.primaryGoals) ? body.primaryGoals : [],
          body.timeline,
          body.budget || null,
          body.specificOutcomes,
          body.technicalRequirements || null,
          body.integrationNeeds || null,
          body.decisionMakers || null,
          body.competingPriorities || null,
          body.successMetrics || null,
          body.howDidYouHear || null,
          body.additionalNotes || null,
          // capture client context if proxied via headers; otherwise null
          request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
          request.headers.get('user-agent') || null,
        ]
      );

      const leadId = result.rows[0]?.id;
      const createdAt = result.rows[0]?.created_at;

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
