import { NextRequest, NextResponse } from 'next/server';
import { sendAcknowledgementEmail, createAcknowledgementEmailTemplate } from '@/lib/email';

interface TestEmailRequest {
  to?: string;
  userName?: string;
  testMode?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, userName, testMode = false } = body as TestEmailRequest;

    // Default test email if not provided
    const testEmail = to || 'test@example.com';

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(testEmail)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // In test mode, just return the HTML without sending
    if (testMode) {
      const htmlTemplate = createAcknowledgementEmailTemplate(userName);

      return NextResponse.json({
        success: true,
        message: 'Acknowledgement email template generated successfully (test mode)',
        html: htmlTemplate,
        email: testEmail,
      });
    }

    // Send the acknowledgement email
    try {
      const result = await sendAcknowledgementEmail(testEmail, userName);

      return NextResponse.json({
        success: true,
        message: `Acknowledgement email sent successfully to ${testEmail}`,
        result,
      });
    } catch (emailError) {
      console.error('Failed to send acknowledgement email:', emailError);
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send email. Please check your email configuration.',
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Test email API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred while processing your request.',
      },
      { status: 500 }
    );
  }
}

// GET method to test the API
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Acknowledgement email test API is available.',
    usage: {
      method: 'POST',
      body: {
        to: 'string (email address)',
        userName: 'string (optional, for personalization)',
        testMode: 'boolean (optional, returns HTML without sending)'
      },
      examples: [
        {
          description: 'Send acknowledgement email',
          body: { to: 'test@example.com', userName: 'John' }
        },
        {
          description: 'Generate HTML template only',
          body: { to: 'test@example.com', userName: 'Jane', testMode: true }
        }
      ]
    }
  });
}