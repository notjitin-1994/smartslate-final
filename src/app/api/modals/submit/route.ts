import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase';
import { sendEmail } from '@/lib/email';

// Supported modal types
const VALID_MODAL_TYPES = [
  'demo',
  'consultation',
  'case-study',
  'partner',
  'solara',
  'ssa',
  'waitlist',
  'job-application',
  'contact',
  'culture', // info-only modal
] as const;

type ModalType = typeof VALID_MODAL_TYPES[number];

interface ModalSubmissionRequest {
  modalType: ModalType;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  role?: string;
  formData: Record<string, any>;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: ModalSubmissionRequest = await request.json();

    // Validate required fields
    if (!body.modalType) {
      return NextResponse.json(
        { error: 'Modal type is required' },
        { status: 400 }
      );
    }

    // Validate modal type
    if (!VALID_MODAL_TYPES.includes(body.modalType)) {
      return NextResponse.json(
        { error: `Invalid modal type. Must be one of: ${VALID_MODAL_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    // Extract common fields
    const {
      modalType,
      name,
      email,
      phone,
      company,
      role,
      formData = {},
      utmSource,
      utmMedium,
      utmCampaign,
    } = body;

    // Validate email if provided
    if (email && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get IP address and user agent
    const ipAddress = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referrer = request.headers.get('referer') || request.headers.get('referrer') || null;

    // Determine priority based on modal type
    let priority: 'low' | 'normal' | 'high' | 'urgent' = 'normal';
    if (modalType === 'demo' || modalType === 'consultation') {
      priority = 'high';
    } else if (modalType === 'job-application') {
      priority = 'normal';
    } else if (modalType === 'partner') {
      priority = 'high';
    }

    // Check for urgency in form data
    if (formData.urgencyLevel === 'urgent' || formData.urgency === 'urgent') {
      priority = 'urgent';
    }

    // Initialize Supabase client
    const supabase = getSupabaseService();

    // Prepare submission data
    const submissionData = {
      modal_type: modalType,
      name: name || formData.name || null,
      email: email || formData.email || null,
      phone: phone || formData.phone || null,
      company: company || formData.company || null,
      role: role || formData.role || null,
      form_data: formData,
      ip_address: ipAddress,
      user_agent: userAgent,
      referrer,
      utm_source: utmSource || null,
      utm_medium: utmMedium || null,
      utm_campaign: utmCampaign || null,
      status: 'new',
      priority,
    };

    // Insert into database
    const { data, error } = await supabase
      .from('modal_submissions')
      .insert(submissionData)
      .select('id, created_at')
      .single();

    if (error) {
      console.error('Database error:', error);

      // Check if table doesn't exist
      if (error.code === '42P01') {
        return NextResponse.json(
          {
            error: 'Database table not found. Please run database migrations.',
            details: 'The modal_submissions table does not exist in the database.'
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          error: 'Failed to save submission',
          details: error.message
        },
        { status: 500 }
      );
    }

    // Send email notification for contact forms
    if (modalType === 'contact') {
      try {
        // Create email content from form data
        const emailSubject = `New Contact Form Submission: ${formData.subject}`;
        const emailHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4F46E5; border-bottom: 2px solid #a7dadb; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
              <p><strong>Name:</strong> ${name || 'Not provided'}</p>
              <p><strong>Email:</strong> ${email || 'Not provided'}</p>
              <p><strong>Company:</strong> ${company || 'Not provided'}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Inquiry Type:</strong> ${formData.inquiryType || 'general'}</p>
            </div>
            
            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4F46E5;">
              <h3 style="color: #333; margin-top: 0;">Subject</h3>
              <p style="font-size: 1.1em; color: #4F46E5;">${formData.subject || 'No subject'}</p>
            </div>
            
            <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb;">
              <h3 style="color: #333; margin-top: 0;">Message</h3>
              <p style="line-height: 1.6; white-space: pre-wrap;">${formData.message || 'No message provided'}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 0.9em; color: #666;">
              <p><strong>Submission Details:</strong></p>
              <p>Date: ${new Date().toLocaleString()}</p>
              <p>IP Address: ${ipAddress}</p>
              <p>User Agent: ${userAgent}</p>
              ${referrer ? `<p>Referrer: ${referrer}</p>` : ''}
            </div>
          </div>
        `;
        
        // Send email to the configured address
        await sendEmail({
          to: process.env.LEADS_EMAIL_TO || 'jitin@smartslate.io',
          subject: emailSubject,
          html: emailHtml,
        });
        
        console.log('Contact form email sent successfully');
      } catch (emailError) {
        console.error('Failed to send contact email:', emailError);
        // Don't fail the submission, just log the error
      }
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Submission received successfully',
      id: data.id,
      createdAt: data.created_at,
    }, { status: 201 });

  } catch (error) {
    console.error('Modal submission error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve submission by ID (for admin/tracking purposes)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Submission ID is required' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseService();

    const { data, error } = await supabase
      .from('modal_submissions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Submission not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to retrieve submission', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (error) {
    console.error('Retrieval error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}
