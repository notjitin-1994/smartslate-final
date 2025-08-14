import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'primaryUseCase', 'solaraComponents'];
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
        `INSERT INTO app.solara_interest_modal (
          name, email, phone, company, role, department,
          company_size, industry, location,
          current_lms, current_tools, learning_challenges,
          content_creation_process, learner_count, content_volume,
          primary_use_case, solara_components, specific_features,
          integration_needs, ai_requirements,
          timeline, budget_range, team_size, decision_makers,
          implementation_scope, current_pain_points, success_metrics,
          competitive_analysis, how_did_you_hear, additional_notes,
          ip_address, user_agent
        ) VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9,
          $10, $11::text[], $12,
          $13, $14, $15,
          $16, $17::text[], $18::text[],
          $19::text[], $20::text[],
          $21, $22, $23, $24,
          $25, $26, $27,
          $28, $29, $30,
          $31::inet, $32
        ) RETURNING id, created_at`,
        [
          body.name,
          body.email,
          body.phone || null,
          body.company || null,
          body.role || null,
          body.department || null,
          body.companySize || null,
          body.industry || null,
          body.location || null,
          body.currentLMS || null,
          Array.isArray(body.currentTools) ? body.currentTools : [],
          body.learningChallenges || null,
          body.contentCreationProcess || null,
          body.learnerCount || null,
          body.contentVolume || null,
          body.primaryUseCase,
          Array.isArray(body.solaraComponents) ? body.solaraComponents : [],
          Array.isArray(body.specificFeatures) ? body.specificFeatures : [],
          Array.isArray(body.integrationNeeds) ? body.integrationNeeds : [],
          Array.isArray(body.aiRequirements) ? body.aiRequirements : [],
          body.timeline || null,
          body.budgetRange || null,
          body.teamSize || null,
          body.decisionMakers || null,
          body.implementationScope || null,
          body.currentPainPoints || null,
          body.successMetrics || null,
          body.competitiveAnalysis || null,
          body.howDidYouHear || null,
          body.additionalNotes || null,
          // capture client context if proxied via headers; otherwise null
          request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
          request.headers.get('user-agent') || null,
        ]
      );

      const leadId = result.rows[0]?.id;
      const createdAt = result.rows[0]?.created_at;

      // Send notification email to product team
      const to = process.env.LEADS_EMAIL_TO || 'hello@smartslate.io';
      const subject = `Solara Interest: ${body.company || 'Individual'} (${body.name})`;
      const html = `
        <h2>New Solara Interest Submission</h2>
        <p><strong>Lead ID:</strong> ${leadId}</p>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${body.company || 'Individual'}</p>
        <p><strong>Role:</strong> ${body.role || 'Not specified'}</p>
        <p><strong>Department:</strong> ${body.department || 'Not specified'}</p>
        <p><strong>Company Size:</strong> ${body.companySize || 'Not specified'}</p>
        <p><strong>Industry:</strong> ${body.industry || 'Not specified'}</p>
        <p><strong>Location:</strong> ${body.location || 'Not specified'}</p>
        <hr>
        <h3>Current Learning Infrastructure</h3>
        <p><strong>Current LMS:</strong> ${body.currentLMS || 'Not specified'}</p>
        <p><strong>Current Tools:</strong> ${Array.isArray(body.currentTools) ? body.currentTools.join(', ') : 'None specified'}</p>
        <p><strong>Learning Challenges:</strong> ${body.learningChallenges || 'Not specified'}</p>
        <p><strong>Content Creation Process:</strong> ${body.contentCreationProcess || 'Not specified'}</p>
        <p><strong>Learner Count:</strong> ${body.learnerCount || 'Not specified'}</p>
        <p><strong>Content Volume:</strong> ${body.contentVolume || 'Not specified'}</p>
        <hr>
        <h3>Solara Interest</h3>
        <p><strong>Primary Use Case:</strong> ${body.primaryUseCase}</p>
        <p><strong>Solara Components:</strong> ${Array.isArray(body.solaraComponents) ? body.solaraComponents.join(', ') : 'None specified'}</p>
        <p><strong>Specific Features:</strong> ${Array.isArray(body.specificFeatures) ? body.specificFeatures.join(', ') : 'None specified'}</p>
        <p><strong>Integration Needs:</strong> ${Array.isArray(body.integrationNeeds) ? body.integrationNeeds.join(', ') : 'None specified'}</p>
        <p><strong>AI Requirements:</strong> ${Array.isArray(body.aiRequirements) ? body.aiRequirements.join(', ') : 'None specified'}</p>
        <hr>
        <h3>Implementation Details</h3>
        <p><strong>Timeline:</strong> ${body.timeline || 'Not specified'}</p>
        <p><strong>Budget Range:</strong> ${body.budgetRange || 'Not specified'}</p>
        <p><strong>Team Size:</strong> ${body.teamSize || 'Not specified'}</p>
        <p><strong>Decision Makers:</strong> ${body.decisionMakers || 'Not specified'}</p>
        <p><strong>Implementation Scope:</strong> ${body.implementationScope || 'Not specified'}</p>
        <hr>
        <h3>Additional Context</h3>
        <p><strong>Current Pain Points:</strong> ${body.currentPainPoints || 'Not specified'}</p>
        <p><strong>Success Metrics:</strong> ${body.successMetrics || 'Not specified'}</p>
        <p><strong>Competitive Analysis:</strong> ${body.competitiveAnalysis || 'Not specified'}</p>
        <p><strong>How did you hear:</strong> ${body.howDidYouHear || 'Not specified'}</p>
        <p><strong>Additional Notes:</strong> ${body.additionalNotes || 'None'}</p>
        <hr>
        <p><strong>Submitted:</strong> ${createdAt}</p>
        <p><strong>Source:</strong> Solara Interest Modal</p>
      `;

      // Fire-and-forget email; don't block response on failures
      sendEmail({ to, subject, html }).catch((err) => console.error('Failed to send Solara email', err));

      return NextResponse.json(
        { 
          success: true, 
          message: 'Solara interest submitted successfully',
          leadId: leadId,
          createdAt: createdAt
        },
        { status: 201 }
      );

    } catch (dbError) {
      console.error('Database insert failed:', dbError);
      return NextResponse.json(
        { error: 'Failed to save Solara interest' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error processing Solara interest:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
