import { Resend } from 'resend';

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html }: EmailData) {
  try {
    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not found, falling back to console logging');
      console.log('Email would be sent:', {
        to,
        subject,
        html: html.substring(0, 200) + '...', // Truncate for logging
      });
      return { success: true, message: 'Email logged (no API key)' };
    }

    const { data, error } = await resend.emails.send({
      from: 'noreply@smartslate.io',
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error('Email sending failed:', error);
      throw error;
    }

    console.log('Email sent successfully:', { to, subject, messageId: data?.id });
    return { success: true, data };
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
}

// Acknowledgement email template with minimal product suggestions
export function createAcknowledgementEmailTemplate(userName?: string, userMessage?: string): string {
  const userGreeting = userName ? `Hi ${userName},` : 'Hello,';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Reaching Out - Smartslate</title>
  <style>
    /* ============================================
       SMARTSLATE ACKNOWLEDGEMENT EMAIL TEMPLATE
       Focus: Thank you message with minimal product promotion
       Brand Colors: Teal Accent (#a7dadb), Blue Background (#020C1B)
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
      padding: 24px 16px;
    }

    /* === DESKTOP LAYOUT === */
    @media (min-width: 1024px) {
      body {
        padding: 40px 20px;
        background: linear-gradient(135deg, #020C1B 0%, #1a2838 100%);
      }

      .email-container {
        width: 100%;
        max-width: 600px;
        background: linear-gradient(135deg, rgba(13, 27, 42, 0.95) 0%, rgba(20, 35, 51, 0.95) 100%);
        backdrop-filter: blur(25px);
        -webkit-backdrop-filter: blur(25px);
        border-radius: 24px;
        overflow: hidden;
        box-shadow:
          0 30px 60px rgba(0, 0, 0, 0.6),
          0 0 0 1px rgba(167, 218, 219, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.1);
        margin: 0 auto;
        position: relative;
      }

      .email-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg,
          transparent 0%,
          #a7dadb 20%,
          #8fc9ca 50%,
          #a7dadb 80%,
          transparent 100%);
        z-index: 10;
      }

      .header {
        background: rgba(167, 218, 219, 0.08);
        padding: 40px 48px;
        border-bottom: 1px solid rgba(167, 218, 219, 0.15);
        text-align: center;
      }

      .header-brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 24px;
        margin-bottom: 16px;
      }

      .content {
        background: rgba(13, 27, 42, 0.3);
        padding: 40px 48px;
        border-bottom: 1px solid rgba(167, 218, 219, 0.1);
      }

      .footer {
        background: rgba(2, 12, 27, 0.9);
        padding: 32px 48px;
        border-top: 1px solid rgba(167, 218, 219, 0.15);
        text-align: center;
      }
    }

    /* === TABLET AND MOBILE LAYOUT === */
    @media (max-width: 1023px) {
      body {
        padding: 20px 16px;
      }

      .email-container {
        width: 100%;
        max-width: 500px;
        background: rgba(13, 27, 42, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-radius: 20px;
        overflow: hidden;
        box-shadow:
          0 20px 40px rgba(0, 0, 0, 0.5),
          0 0 0 1px rgba(167, 218, 219, 0.15);
        margin: 0 auto;
        position: relative;
      }

      .email-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, transparent, #a7dadb, transparent);
      }

      .header {
        background: linear-gradient(135deg, rgba(167, 218, 219, 0.12) 0%, rgba(167, 218, 219, 0.04) 100%);
        padding: 40px 32px;
        text-align: center;
        border-bottom: 1px solid rgba(167, 218, 219, 0.15);
        position: relative;
      }

      .header-brand {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin-bottom: 16px;
      }

      .content {
        padding: 36px 32px;
        background: rgba(13, 27, 42, 0.5);
      }

      .footer {
        background: rgba(2, 12, 27, 0.95);
        padding: 32px;
        text-align: center;
        border-top: 1px solid rgba(167, 218, 219, 0.1);
      }
    }

    /* === HEADER === */
    .header {
      background: linear-gradient(135deg, rgba(167, 218, 219, 0.08) 0%, rgba(167, 218, 219, 0.02) 100%);
      padding: 40px 32px;
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

    .header-brand {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-bottom: 16px;
    }

    .brand-logo {
      margin-bottom: 16px;
      text-align: center;
    }

    .brand-logo img {
      height: 28px;
      width: auto;
      display: inline-block;
    }

    .brand-logo-text {
      font-family: 'Quicksand', sans-serif;
      font-size: 24px;
      font-weight: 800;
      color: #a7dadb;
      letter-spacing: -1px;
      display: none;
    }

    @media (min-width: 768px) {
      .brand-logo img {
        height: 32px;
      }

      .brand-logo-text {
        font-size: 20px;
      }
    }

    .greeting {
      font-family: 'Quicksand', sans-serif;
      color: #e0e0e0;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 12px;
    }

    @media (min-width: 768px) {
      .greeting {
        font-size: 18px;
        margin-bottom: 8px;
      }
    }

    .thank-you-title {
      font-family: 'Quicksand', sans-serif;
      color: #e0e0e0;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 12px;
      opacity: 0.95;
    }

    @media (min-width: 768px) {
      .thank-you-title {
        font-size: 16px;
        margin-bottom: 8px;
      }
    }

    .thank-you-subtitle {
      color: #b0c5c6;
      font-size: 14px;
      line-height: 1.6;
      opacity: 0.9;
    }

    @media (min-width: 768px) {
      .thank-you-subtitle {
        font-size: 13px;
        margin: 0;
      }
    }

    /* === CONTENT === */
    .content {
      padding: 32px;
      background: rgba(13, 27, 42, 0.5);
    }

    @media (min-width: 768px) {
      .content {
        padding: 32px 40px;
      }
    }

    .message-section {
      margin-bottom: 24px;
    }

    .section-title {
      font-family: 'Quicksand', sans-serif;
      font-weight: 700;
      color: #a7dadb;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 16px;
    }

    @media (min-width: 768px) {
      .section-title {
        font-size: 12px;
        margin-bottom: 12px;
      }
    }

    .message-text {
      color: #e0e0e0;
      font-size: 15px;
      line-height: 1.8;
      margin-bottom: 24px;
    }

    @media (min-width: 768px) {
      .message-text {
        font-size: 14px;
        line-height: 1.6;
        margin-bottom: 16px;
      }
    }

    .info-box {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      padding: 20px 24px;
      border-radius: 14px;
      border: 1.5px solid rgba(167, 218, 219, 0.2);
      margin: 20px 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    @media (min-width: 768px) {
      .info-box {
        padding: 16px 20px;
        margin: 16px 0;
      }
    }

    .info-box p {
      color: #e0e0e0;
      font-size: 14px;
      margin: 0;
      line-height: 1.7;
    }

    @media (min-width: 768px) {
      .info-box p {
        font-size: 13px;
        line-height: 1.5;
      }
    }

    .info-box strong {
      color: #a7dadb;
      font-family: 'Quicksand', sans-serif;
    }

    .info-box a {
      color: #a7dadb !important;
      text-decoration: none !important;
      font-weight: 600;
      transition: color 0.2s ease;
    }

    .info-box a:hover {
      color: #d0edf0 !important;
      text-decoration: underline !important;
    }

    /* === GLOBAL LINK STYLING === */
    a {
      color: #a7dadb !important;
      text-decoration: none !important;
      font-weight: 600;
    }

    a:hover {
      color: #d0edf0 !important;
      text-decoration: underline !important;
    }

    /* === FOOTER LINKS === */
    .footer-link {
      color: #a7dadb !important;
      text-decoration: none !important;
      font-weight: 600;
      font-size: 12px;
      transition: color 0.2s ease;
      padding: 0 8px;
    }

    .footer-link:hover {
      color: #d0edf0 !important;
      text-decoration: underline !important;
    }

    .footer-link:first-child {
      padding-left: 0;
    }

    .footer-link:last-child {
      padding-right: 0;
    }

    .footer-separator {
      color: #b0c5c6;
      font-size: 12px;
      font-weight: 400;
      opacity: 0.6;
    }

    /* === BULB ICON === */
    .bulb-icon {
      display: inline-flex;
      align-items: center;
      margin-right: 6px;
      vertical-align: middle;
    }

    @keyframes glow {
      from {
        filter: drop-shadow(0 0 8px rgba(167, 218, 219, 0.6));
      }
      to {
        filter: drop-shadow(0 0 12px rgba(167, 218, 219, 0.9));
      }
    }

    /* === PRODUCT SUGGESTIONS === */
    .suggestions-section {
      background: rgba(255, 255, 255, 0.02);
      border-radius: 14px;
      padding: 32px;
      margin: 0;
      border: 1px solid rgba(167, 218, 219, 0.1);
    }

    
    .suggestions-title {
      font-family: 'Quicksand', sans-serif;
      color: #b0c5c6;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 16px;
      text-align: left;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      opacity: 0.8;
    }

    .suggestion-links {
      display: flex;
      gap: 16px;
      justify-content: flex-start;
      flex-wrap: wrap;
    }

    .suggestion-link {
      color: #a7dadb !important;
      text-decoration: none !important;
      font-size: 13px;
      font-weight: 600;
      padding: 8px 16px;
      border: 1px solid rgba(167, 218, 219, 0.2);
      border-radius: 20px;
      background: rgba(167, 218, 219, 0.05);
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .suggestion-link:hover {
      background: rgba(167, 218, 219, 0.1);
      border-color: rgba(167, 218, 219, 0.4);
      color: #d0edf0 !important;
      text-decoration: none !important;
    }

    /* === SIGNATURE === */
    .signature {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid rgba(167, 218, 219, 0.15);
      color: #e0e0e0;
      font-size: 15px;
    }

    @media (min-width: 768px) {
      .signature {
        margin-top: 24px;
        padding-top: 20px;
      }
    }

    .signature-closing {
      color: #b0c5c6;
      font-size: 14px;
      margin-bottom: 12px;
    }

    @media (min-width: 768px) {
      .signature-closing {
        font-size: 13px;
        margin-bottom: 8px;
      }
    }

    .signature-name {
      font-family: 'Quicksand', sans-serif;
      font-weight: 700;
      color: #a7dadb;
      font-size: 16px;
      margin-bottom: 6px;
    }

    @media (min-width: 768px) {
      .signature-name {
        font-size: 14px;
        margin-bottom: 4px;
      }
    }

    .signature-title {
      color: #b0c5c6;
      font-size: 13px;
      margin-bottom: 4px;
    }

    @media (min-width: 768px) {
      .signature-title {
        font-size: 12px;
        margin-bottom: 3px;
      }
    }

    .signature-brand {
      color: #e0e0e0;
      font-size: 13px;
      font-weight: 600;
    }

    @media (min-width: 768px) {
      .signature-brand {
        font-size: 12px;
      }
    }

    /* === FOOTER === */
    .footer {
      background: rgba(2, 12, 27, 0.95);
      padding: 24px 32px;
      text-align: left;
      border-top: 1px solid rgba(167, 218, 219, 0.1);
    }

    @media (min-width: 768px) {
      .footer {
        padding: 16px 40px;
      }
    }

    .footer-tagline {
      color: #a7dadb;
      font-family: 'Quicksand', sans-serif;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 16px;
      letter-spacing: 0.5px;
    }

    @media (min-width: 768px) {
      .footer-tagline {
        font-size: 12px;
        margin-bottom: 12px;
      }
    }

    .footer-links {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 20px;
      gap: 0;
    }

    @media (min-width: 768px) {
      .footer-links {
        margin-bottom: 12px;
      }
    }

    @media (max-width: 767px) {
      .footer-links {
        flex-direction: column;
        gap: 12px;
      }

      .footer-separator {
        display: none;
      }
    }

    .footer-link {
      color: #a7dadb;
      text-decoration: none;
      font-weight: 600;
      font-size: 12px;
      transition: color 0.2s ease;
    }

    @media (min-width: 768px) {
      .footer-link {
        font-size: 11px;
      }
    }

    .footer-link:hover {
      color: #d0edf0;
    }

    .footer-note {
      color: #b0c5c6;
      font-size: 11px;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid rgba(167, 218, 219, 0.1);
      opacity: 0.75;
      line-height: 1.6;
    }

    @media (min-width: 768px) {
      .footer-note {
        font-size: 10px;
        margin-top: 12px;
        padding-top: 12px;
      }
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
    <!-- HEADER -->
    <div class="header">
      <div class="brand-logo">
        <img src="https://www.smartslate.io/logo.png" alt="Smartslate" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
        <div class="brand-logo-text">Smartslate</div>
      </div>
      <div class="greeting">${userGreeting}</div>
      <h2 class="thank-you-title">Thank You for Reaching Out</h2>
      <p class="thank-you-subtitle">We've received your message and truly appreciate you taking the time to connect with us.</p>
    </div>

    <!-- CONTENT -->
    <div class="content">
      <div class="message-section">
        <div class="section-title">What Happens Next</div>
        <p class="message-text">
          Your message is important to us. Our team personally reviews every inquiry, and we'll get back to you within 24 hours on business days with a thoughtful response tailored to your needs.
        </p>

        <div class="info-box">
          <p><strong>While you wait:</strong> Feel free to explore <a href="https://www.smartslate.io" style="color: #a7dadb !important; text-decoration: none !important; font-weight: 600;">our website</a> to learn more about our mission to transform learning and career development in India.</p>
        </div>
      </div>

      
      <!-- SIGNATURE -->
      <div class="signature">
        <div class="signature-closing">Looking forward to connecting,</div>
        <div class="signature-name">The Smartslate Team</div>
        <div class="signature-title">Empowering Workforces Through Innovation</div>
        <div class="signature-brand">smartslate.io</div>
      </div>
    </div>

    <!-- PRODUCT SUGGESTIONS -->
    <div class="suggestions-section">
      <div class="suggestions-title">We're excited to share these with you, check these out!</div>
      <div class="suggestion-links">
        <a href="https://solara.smartslate.io" class="suggestion-link" style="color: #a7dadb !important; text-decoration: none !important;">
          <span class="bulb-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="width: 16px; height: 16px; fill: #a7dadb; filter: drop-shadow(0 0 8px rgba(167, 218, 219, 0.6)); animation: glow 2s ease-in-out infinite alternate;">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2 11.5V16h-4v-2.5c-1.58-.55-2.5-2.18-2.15-3.82.35-1.64 1.82-2.82 3.5-2.82s3.15 1.18 3.5 2.82c.35 1.64-.57 3.27-2.15 3.82z"/>
              <path d="M9 21h6v1c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1v-1z"/>
            </svg>
          </span>
          Solara Learning Engine
        </a>
        <a href="https://www.smartslate.io/products" class="suggestion-link" style="color: #a7dadb !important; text-decoration: none !important;">
          Ignite & Skills Architecture
        </a>
      </div>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <div class="footer-tagline">Smartslate · Transform Learning</div>
      <div class="footer-links">
        <a href="https://www.smartslate.io" class="footer-link" style="color: #a7dadb !important; text-decoration: none !important;">Visit Website</a>
        <span class="footer-separator"> | </span>
        <a href="https://www.smartslate.io/contact" class="footer-link" style="color: #a7dadb !important; text-decoration: none !important;">Contact Us</a>
        <span class="footer-separator"> | </span>
        <a href="https://www.smartslate.io/vision" class="footer-link" style="color: #a7dadb !important; text-decoration: none !important;">Our Vision</a>
      </div>
      <div class="footer-note">
        This is an automated acknowledgement email. We'll respond to your specific message personally within 24 hours.
        <br>If you need immediate assistance, please visit our contact page.
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

// Convenience function to send acknowledgement emails
export async function sendAcknowledgementEmail(to: string, userName?: string, userMessage?: string) {
  const subject = 'Thank You for Reaching Out - Smartslate';
  const html = createAcknowledgementEmailTemplate(userName, userMessage);

  return sendEmail({
    to,
    subject,
    html,
  });
}

// Legacy function for backward compatibility - now sends acknowledgement
export async function sendMarketingEmail(to: string, userName?: string) {
  return sendAcknowledgementEmail(to, userName);
}
