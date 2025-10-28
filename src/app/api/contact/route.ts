import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { getSupabaseService } from '@/lib/supabase';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  inquiryType?: string;
}

// Email template for contact form submissions
function createContactEmailTemplate(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #A7DADB 0%, #4F46E5 100%);
      color: white;
      padding: 30px;
      border-radius: 10px 10px 0 0;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      background: #f9fafb;
      padding: 30px;
      border: 1px solid #e5e7eb;
      border-top: none;
    }
    .field {
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #A7DADB;
    }
    .field-label {
      font-weight: 600;
      color: #4F46E5;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    .field-value {
      color: #1f2937;
      font-size: 15px;
      word-wrap: break-word;
    }
    .message-field {
      background: white;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      margin-top: 20px;
    }
    .message-field .field-label {
      margin-bottom: 10px;
    }
    .message-field .field-value {
      white-space: pre-wrap;
      line-height: 1.8;
    }
    .footer {
      background: #1f2937;
      color: #9ca3af;
      padding: 20px;
      border-radius: 0 0 10px 10px;
      text-align: center;
      font-size: 12px;
    }
    .badge {
      display: inline-block;
      background: #4F46E5;
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      margin-top: 10px;
    }
    .timestamp {
      color: #6b7280;
      font-size: 13px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>📩 New Contact Form Submission</h1>
    <div class="badge">${data.inquiryType || 'General Inquiry'}</div>
    <div class="timestamp">${new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata'
    })}</div>
  </div>

  <div class="content">
    <div class="field">
      <div class="field-label">Name</div>
      <div class="field-value">${data.name}</div>
    </div>

    <div class="field">
      <div class="field-label">Email</div>
      <div class="field-value">
        <a href="mailto:${data.email}" style="color: #4F46E5; text-decoration: none;">
          ${data.email}
        </a>
      </div>
    </div>

    ${data.phone ? `
    <div class="field">
      <div class="field-label">Phone</div>
      <div class="field-value">
        <a href="tel:${data.phone}" style="color: #4F46E5; text-decoration: none;">
          ${data.phone}
        </a>
      </div>
    </div>
    ` : ''}

    ${data.company ? `
    <div class="field">
      <div class="field-label">Company</div>
      <div class="field-value">${data.company}</div>
    </div>
    ` : ''}

    <div class="field">
      <div class="field-label">Subject</div>
      <div class="field-value">${data.subject}</div>
    </div>

    <div class="message-field">
      <div class="field-label">Message</div>
      <div class="field-value">${data.message}</div>
    </div>
  </div>

  <div class="footer">
    <p>This email was sent from the Smartslate contact form</p>
    <p>Reply directly to this email to respond to ${data.name}</p>
  </div>
</body>
</html>
  `;
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, subject, message, inquiryType } = body as ContactFormData;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: name, email, subject, and message are required.'
        },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 10 characters long.' },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { success: false, error: 'Message is too long. Please keep it under 5000 characters.' },
        { status: 400 }
      );
    }

    // Prepare email data
    const contactEmail = process.env.CONTACT_EMAIL || 'jitin@smartslate.io';
    const emailSubject = `🔔 Contact Form: ${subject}`;
    const emailHtml = createContactEmailTemplate({
      name,
      email,
      phone,
      company,
      subject,
      message,
      inquiryType,
    });

    // Send email using Resend
    try {
      await sendEmail({
        to: contactEmail,
        subject: emailSubject,
        html: emailHtml,
      });
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Don't fail the request if email fails, but log it
      // You might want to store in DB anyway
    }

    // Optional: Save to database (Supabase)
    try {
      const supabase = getSupabaseService();
      if (supabase) {
        await supabase.from('contact_submissions').insert([
          {
            name,
            email,
            phone: phone || null,
            company: company || null,
            subject,
            message,
            inquiry_type: inquiryType || 'general',
            submitted_at: new Date().toISOString(),
            user_agent: request.headers.get('user-agent') || null,
            ip_address: request.headers.get('x-forwarded-for') ||
                       request.headers.get('x-real-ip') ||
                       'unknown',
          },
        ]);
      }
    } catch (dbError) {
      console.error('Failed to save to database:', dbError);
      // Don't fail the request if DB save fails
    }

    // Send auto-reply to user
    try {
      await sendEmail({
        to: email,
        subject: 'Thank you for contacting Smartslate',
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #A7DADB 0%, #4F46E5 100%);
      color: white;
      padding: 30px;
      border-radius: 10px;
      text-align: center;
      margin-bottom: 30px;
    }
    .content {
      background: #f9fafb;
      padding: 30px;
      border-radius: 10px;
    }
    .footer {
      text-align: center;
      color: #6b7280;
      font-size: 12px;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Thank You for Reaching Out! 🎉</h1>
  </div>

  <div class="content">
    <p>Hi ${name},</p>

    <p>Thank you for contacting Smartslate. We've received your message and our team will review it shortly.</p>

    <p><strong>Your message:</strong></p>
    <p style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #A7DADB;">
      ${message.substring(0, 200)}${message.length > 200 ? '...' : ''}
    </p>

    <p>We typically respond within 24 hours. If your inquiry is urgent, please call us or reach out via our social media channels.</p>

    <p>Best regards,<br>The Smartslate Team</p>
  </div>

  <div class="footer">
    <p>Smartslate - Building Future-Ready Workforces</p>
    <p>This is an automated message, please do not reply directly to this email.</p>
  </div>
</body>
</html>
        `,
      });
    } catch (autoReplyError) {
      console.error('Failed to send auto-reply:', autoReplyError);
      // Don't fail the request if auto-reply fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We will get back to you soon!',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred while processing your request. Please try again.',
      },
      { status: 500 }
    );
  }
}
