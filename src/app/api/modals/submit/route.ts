import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseService } from '@/lib/supabase';

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

    // Optionally send email notifications based on modal type
    // This can be implemented later with a separate email service
    // await sendNotificationEmail(modalType, submissionData);

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
