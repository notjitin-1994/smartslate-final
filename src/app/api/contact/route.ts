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
    /* ============================================
       SMARTSLATE EMAIL TEMPLATE - BRAND COMPLIANT
       ============================================ */

    /* === RESET & BASE === */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.65;
      background-color: #020C1B;
      padding: 48px 20px;
    }

    /* === CONTAINER === */
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: rgba(13, 27, 42, 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(167, 218, 219, 0.1);
    }

    /* === HEADER === */
    .header {
      background: linear-gradient(135deg, rgba(167, 218, 219, 0.08) 0%, rgba(167, 218, 219, 0.02) 100%);
      padding: 48px 32px 40px;
      text-align: center;
      position: relative;
      border-bottom: 1px solid rgba(167, 218, 219, 0.15);
    }

    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, #a7dadb, transparent);
    }

    .header-content {
      text-align: center;
    }

    .header h1 {
      font-family: 'Quicksand', sans-serif;
      color: #e0e0e0;
      font-size: 26px;
      font-weight: 700;
      margin-bottom: 16px;
      letter-spacing: -0.5px;
    }

    .badge {
      display: inline-block;
      background: rgba(167, 218, 219, 0.12);
      color: #a7dadb;
      border: 1px solid rgba(167, 218, 219, 0.25);
      padding: 8px 20px;
      border-radius: 24px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 8px;
    }

    .timestamp {
      color: #b0c5c6;
      font-size: 13px;
      margin-top: 16px;
      font-weight: 400;
      opacity: 0.85;
    }

    /* === CONTENT === */
    .content {
      padding: 40px 32px;
      background: rgba(13, 27, 42, 0.5);
    }

    .field {
      margin-bottom: 16px;
      padding: 20px 24px;
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-radius: 14px;
      border: 1.5px solid rgba(167, 218, 219, 0.25);
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .field:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(167, 218, 219, 0.45);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(167, 218, 219, 0.1);
      transform: translateY(-2px);
    }

    .field-label {
      font-family: 'Quicksand', sans-serif;
      font-weight: 700;
      color: #a7dadb;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      margin-bottom: 8px;
      display: block;
    }

    .field-value {
      color: #e0e0e0;
      font-size: 15px;
      font-weight: 400;
      word-wrap: break-word;
      line-height: 1.6;
    }

    .field-value a {
      color: #a7dadb;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s ease;
    }

    .field-value a:hover {
      color: #d0edf0;
    }

    .message-field {
      margin-top: 32px;
      padding: 28px;
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-radius: 14px;
      border: 1.5px solid rgba(167, 218, 219, 0.3);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .message-field .field-label {
      margin-bottom: 12px;
    }

    .message-field .field-value {
      white-space: pre-wrap;
      line-height: 1.8;
      color: #e0e0e0;
    }

    .footer {
      background: rgba(2, 12, 27, 0.95);
      padding: 32px;
      text-align: center;
      border-top: 1px solid rgba(167, 218, 219, 0.1);
    }

    .footer p {
      color: #b0c5c6;
      font-size: 13px;
      margin: 6px 0;
      line-height: 1.6;
    }

    .footer-highlight {
      color: #a7dadb;
      font-weight: 700;
      font-family: 'Quicksand', sans-serif;
    }

    .divider {
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(167, 218, 219, 0.25), transparent);
      margin: 32px 0;
    }

    /* === BRAND COLORS REFERENCE ===
       Primary Accent: #a7dadb (Teal)
       Background Dark: #020C1B
       Background Paper: #0d1b2a
       Background Surface: #142433
       Text Primary: #e0e0e0
       Text Secondary: #b0c5c6
       ================================ */
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="header-content">
        <h1>New Contact Form Submission</h1>
        <div class="badge">${data.inquiryType || 'General Inquiry'}</div>
        <div class="timestamp">${new Date().toLocaleString('en-US', {
          dateStyle: 'full',
          timeStyle: 'short',
          timeZone: 'Asia/Kolkata'
        })}</div>
      </div>
    </div>

    <div class="content">
      <div class="field">
        <div class="field-label">Name</div>
        <div class="field-value">${data.name}</div>
      </div>

      <div class="field">
        <div class="field-label">Email</div>
        <div class="field-value">
          <a href="mailto:${data.email}">${data.email}</a>
        </div>
      </div>

      ${data.phone ? `
      <div class="field">
        <div class="field-label">Phone</div>
        <div class="field-value">
          <a href="tel:${data.phone}">${data.phone}</a>
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

      <div class="divider"></div>

      <div class="message-field">
        <div class="field-label">Message</div>
        <div class="field-value">${data.message}</div>
      </div>
    </div>

    <div class="footer">
      <p>Sent from <span class="footer-highlight">Smartslate</span> contact form</p>
      <p>Reply directly to respond to ${data.name}</p>
    </div>
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - Smartslate</title>
  <style>
    /* ============================================
       SMARTSLATE EMAIL TEMPLATE - BRAND COMPLIANT
       ============================================ */

    /* === RESET & BASE === */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.65;
      background-color: #020C1B;
      padding: 48px 20px;
    }

    /* === CONTAINER === */
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: rgba(13, 27, 42, 0.8);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(167, 218, 219, 0.1);
    }

    /* === HEADER === */
    .header {
      background: linear-gradient(135deg, rgba(167, 218, 219, 0.08) 0%, rgba(167, 218, 219, 0.02) 100%);
      padding: 56px 32px 48px;
      text-align: center;
      position: relative;
      border-bottom: 1px solid rgba(167, 218, 219, 0.15);
    }

    .header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, #a7dadb, transparent);
    }

    .header h1 {
      font-family: 'Quicksand', sans-serif;
      color: #e0e0e0;
      font-size: 30px;
      font-weight: 700;
      margin-bottom: 12px;
      letter-spacing: -0.5px;
    }

    .header p {
      color: #b0c5c6;
      font-size: 15px;
      margin-top: 8px;
      opacity: 0.9;
    }

    /* === CONTENT === */
    .content {
      padding: 44px 32px;
      background: rgba(13, 27, 42, 0.5);
    }

    .greeting {
      font-family: 'Quicksand', sans-serif;
      font-size: 20px;
      color: #e0e0e0;
      margin-bottom: 28px;
      font-weight: 600;
    }

    .message-text {
      color: #e0e0e0;
      font-size: 15px;
      line-height: 1.8;
      margin-bottom: 28px;
      opacity: 0.95;
    }

    .quote-box {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      padding: 24px 28px;
      border-radius: 14px;
      border: 1.5px solid rgba(167, 218, 219, 0.3);
      margin: 28px 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .quote-label {
      font-family: 'Quicksand', sans-serif;
      font-weight: 700;
      color: #a7dadb;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      margin-bottom: 12px;
      display: block;
    }

    .quote-text {
      color: #e0e0e0;
      font-size: 14px;
      line-height: 1.75;
      font-style: italic;
      opacity: 0.9;
    }

    .info-box {
      background: linear-gradient(135deg, rgba(167, 218, 219, 0.08) 0%, rgba(167, 218, 219, 0.03) 100%);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      padding: 24px 28px;
      border-radius: 14px;
      border: 1.5px solid rgba(167, 218, 219, 0.35);
      margin: 28px 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .info-box p {
      color: #e0e0e0;
      font-size: 14px;
      margin: 0;
      line-height: 1.7;
    }

    .info-box strong {
      color: #a7dadb;
      font-family: 'Quicksand', sans-serif;
    }

    .signature {
      margin-top: 40px;
      padding-top: 28px;
      border-top: 1px solid rgba(167, 218, 219, 0.15);
      color: #e0e0e0;
      font-size: 15px;
    }

    .signature-closing {
      color: #b0c5c6;
      font-size: 14px;
      margin-bottom: 12px;
    }

    .signature-name {
      font-family: 'Quicksand', sans-serif;
      font-weight: 700;
      color: #a7dadb;
      font-size: 16px;
      margin-bottom: 6px;
    }

    .signature-title {
      color: #b0c5c6;
      font-size: 13px;
      margin-bottom: 4px;
    }

    .signature-brand {
      color: #e0e0e0;
      font-size: 13px;
      font-weight: 600;
    }

    .footer {
      background: rgba(2, 12, 27, 0.95);
      padding: 36px 32px;
      text-align: center;
      border-top: 1px solid rgba(167, 218, 219, 0.1);
    }

    .footer-tagline {
      color: #a7dadb;
      font-family: 'Quicksand', sans-serif;
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 16px;
      letter-spacing: 0.5px;
    }

    .footer-note {
      color: #b0c5c6;
      font-size: 12px;
      margin: 8px 0;
      line-height: 1.7;
      opacity: 0.85;
    }

    .footer-link {
      color: #a7dadb;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s ease;
    }

    .footer-link:hover {
      color: #d0edf0;
    }

    .divider {
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(167, 218, 219, 0.25), transparent);
      margin: 32px 0;
    }

    /* === BRAND COLORS REFERENCE ===
       Primary Accent: #a7dadb (Teal)
       Background Dark: #020C1B
       Background Paper: #0d1b2a
       Background Surface: #142433
       Text Primary: #e0e0e0
       Text Secondary: #b0c5c6
       ================================ */
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Thank You for Reaching Out</h1>
      <p>We've received your message</p>
    </div>

    <div class="content">
      <div class="greeting">Hi ${name},</div>

      <div class="message-text">
        Your message has reached us. We appreciate you taking the time to connect with Smartslate.
      </div>

      <div class="info-box">
        <p><strong>What happens next?</strong> Our team reviews every inquiry personally. You'll hear from us within 24 hours on business days.</p>
      </div>

      <div class="message-text">
        In the meantime, feel free to explore our learning solutions or connect with us on social media.
      </div>

      <div class="signature">
        <div class="signature-closing">Looking forward to connecting,</div>
        <div class="signature-name">The Smartslate Team</div>
        <div class="signature-title">Empowering Workforces Through Innovation</div>
        <div class="signature-brand">smartslate.io</div>
      </div>
    </div>

    <div class="footer">
      <div class="footer-tagline">Smartslate · Transform Learning</div>
      <div class="footer-note">This is an automated confirmation from our contact system.</div>
      <div class="footer-note">For immediate assistance, visit <a href="https://www.smartslate.io/contact" class="footer-link">smartslate.io/contact</a></div>
    </div>
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
