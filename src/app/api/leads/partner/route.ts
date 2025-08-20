import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'company', 'organizationSize', 'partnershipGoals'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Format the email content
    const emailContent = `
New Partnership Request

Contact Information:
- Name: ${body.name}
- Email: ${body.email}
- Phone: ${body.phone || 'Not provided'}
- Company: ${body.company}
- Role: ${body.role || 'Not provided'}
- Industry: ${body.industry || 'Not provided'}

Organization Details:
- Size: ${body.organizationSize}
- Timeline: ${body.timeline || 'Not specified'}
- Current Initiatives: ${body.currentInitiatives || 'Not provided'}

Partnership Details:
- Type: ${body.partnershipType}
- Goals: ${body.partnershipGoals.join(', ')}
- Budget: ${body.budget || 'Not specified'}
- Preferred Contact: ${body.preferredContact}
- Follow-up Requested: ${body.followUp}

Additional Information:
- Specific Needs: ${body.specificNeeds || 'Not provided'}

Submitted at: ${new Date().toISOString()}
    `;

    // Send email notification
    await sendEmail({
      to: process.env.PARTNERSHIP_EMAIL || 'partnerships@smartslate.com',
      subject: `New Partnership Request - ${body.partnershipType} - ${body.company}`,
      html: emailContent.replace(/\n/g, '<br>'),
    });

    // Send confirmation email to the user
    const confirmationContent = `
Dear ${body.name},

Thank you for your interest in partnering with Smartslate!

We have received your partnership request and our team will review it within 2 business days. We'll get back to you at ${body.email} with next steps and to schedule a consultation if requested.

In the meantime, if you have any urgent questions, please don't hesitate to reach out to us.

Best regards,
The Smartslate Partnership Team
    `;

    await sendEmail({
      to: body.email,
      subject: 'Partnership Request Received - Smartslate',
      html: confirmationContent.replace(/\n/g, '<br>'),
    });

    return NextResponse.json(
      { message: 'Partnership request submitted successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing partnership request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


