import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase';
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

    // Store in database using Supabase service role to bypass RLS
    try {
      const supabase = getSupabaseService();
      
      // First, check if the table exists
      const { error: tableCheckError } = await supabase
        .from('solara_interest_modal')
        .select('id')
        .limit(1);
      
      if (tableCheckError) {
        console.error('Table check error:', tableCheckError);
        if (tableCheckError.code === '42P01') {
          console.error('Table solara_interest_modal does not exist. Please run the database setup script.');
          return NextResponse.json(
            { 
              error: 'Database not configured. Please contact support.',
              details: 'Table solara_interest_modal does not exist'
            },
            { status: 500 }
          );
        }
      }
      
      const { data, error } = await supabase
        .from('solara_interest_modal')
        .insert({
          name: body.name,
          email: body.email,
          phone: body.phone || null,
          company: body.company || 'Individual',
          role: body.role || null,
          department: body.department || null,
          company_size: body.companySize || null,
          industry: body.industry || null,
          location: body.location || null,
          current_lms: body.currentLMS || null,
          current_tools: Array.isArray(body.currentTools) ? body.currentTools : [],
          learning_challenges: body.learningChallenges || null,
          content_creation_process: body.contentCreationProcess || null,
          learner_count: body.learnerCount || null,
          content_volume: body.contentVolume || null,
          primary_use_case: body.primaryUseCase,
          solara_components: Array.isArray(body.solaraComponents) ? body.solaraComponents : [],
          specific_features: Array.isArray(body.specificFeatures) ? body.specificFeatures : [],
          integration_needs: Array.isArray(body.integrationNeeds) ? body.integrationNeeds : [],
          ai_requirements: Array.isArray(body.aiRequirements) ? body.aiRequirements : [],
          timeline: body.timeline || null,
          budget_range: body.budgetRange || null,
          team_size: body.teamSize || null,
          decision_makers: body.decisionMakers || null,
          implementation_scope: body.implementationScope || null,
          current_pain_points: body.currentPainPoints || null,
          success_metrics: body.successMetrics || null,
          competitive_analysis: body.competitiveAnalysis || null,
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
          { error: 'Failed to save Solara inquiry', details: error.message },
          { status: 500 }
        );
      }

      const leadId = data.id;
      const createdAt = data.created_at;

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
        { status: 200 }
      );

    } catch (dbError) {
      console.error('Database insert failed:', dbError);
      return NextResponse.json(
        { error: 'Failed to save Solara inquiry' },
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
