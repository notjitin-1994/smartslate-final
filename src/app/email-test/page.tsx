'use client';

import React, { useState, useEffect } from 'react';

export default function EmailTestPage() {
  const [copied, setCopied] = useState(false);
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [userName, setUserName] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  const [emailTemplate, setEmailTemplate] = useState('');
  const [emailType, setEmailType] = useState<'user' | 'admin'>('user');

  // Admin email form data
  const [adminData, setAdminData] = useState({
    name: 'Alex Chen',
    email: 'alex@innovatecorp.com',
    phone: '+1 (555) 123-4567',
    company: 'InnovateCorp Solutions',
    subject: 'Enterprise AI Training Partnership',
    message: 'We are interested in exploring a comprehensive AI training partnership for our 500+ employees. Your platform seems to align perfectly with our goals of upskilling our workforce in artificial intelligence and machine learning.',
    inquiryType: 'Enterprise Partnership'
  });

  // Generate the user-facing acknowledgement email template
  const generateUserEmailTemplate = () => {
    const userGreeting = userName ? `Hi ${userName},` : 'Hello,';

    return `<!DOCTYPE html>
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

    /* === CONTAINER === */
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: rgba(13, 27, 42, 0.9);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(167, 218, 219, 0.15);
    }

    /* === HEADER === */
    .header {
      background: linear-gradient(135deg, rgba(167, 218, 219, 0.08) 0%, rgba(167, 218, 219, 0.02) 100%);
      padding: 48px 32px 40px;
      text-align: left;
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

    .brand-logo {
      margin-bottom: 24px;
      text-align: left;
    }

    .brand-logo img {
      height: 32px;
      width: auto;
      display: block;
    }

    .brand-logo-text {
      font-family: 'Quicksand', sans-serif;
      font-size: 28px;
      font-weight: 800;
      color: #a7dadb;
      letter-spacing: -1px;
      display: none;
    }

    .greeting {
      font-family: 'Quicksand', sans-serif;
      color: #e0e0e0;
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .thank-you-title {
      font-family: 'Quicksand', sans-serif;
      color: #e0e0e0;
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 16px;
      opacity: 0.95;
    }

    .thank-you-subtitle {
      color: #b0c5c6;
      font-size: 15px;
      line-height: 1.7;
      opacity: 0.9;
    }

    /* === CONTENT === */
    .content {
      padding: 40px 32px;
      background: rgba(13, 27, 42, 0.5);
    }

    .message-section {
      margin-bottom: 32px;
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

    .message-text {
      color: #e0e0e0;
      font-size: 15px;
      line-height: 1.8;
      margin-bottom: 24px;
    }

    .info-box {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      padding: 24px 28px;
      border-radius: 14px;
      border: 1.5px solid rgba(167, 218, 219, 0.2);
      margin: 24px 0;
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

    .info-box a {
      color: #a7dadb;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.2s ease;
    }

    .info-box a:hover {
      color: #d0edf0;
      text-decoration: underline;
    }

    /* === MINIMAL PRODUCT SUGGESTIONS === */
    .suggestions-section {
      background: rgba(255, 255, 255, 0.02);
      border-radius: 14px;
      padding: 24px;
      margin: 32px 0;
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
      color: #a7dadb;
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      padding: 8px 16px;
      border: 1px solid rgba(167, 218, 219, 0.2);
      border-radius: 20px;
      background: rgba(167, 218, 219, 0.05);
      transition: all 0.2s ease;
    }

    .suggestion-link:hover {
      background: rgba(167, 218, 219, 0.1);
      border-color: rgba(167, 218, 219, 0.4);
      color: #d0edf0;
    }

    /* === BULB ICON === */
    .bulb-icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 6px;
      vertical-align: middle;
      position: relative;
    }

    .bulb-icon svg {
      width: 100%;
      height: 100%;
      fill: #a7dadb;
      filter: drop-shadow(0 0 8px rgba(167, 218, 219, 0.6));
      animation: glow 2s ease-in-out infinite alternate;
    }

    @keyframes glow {
      from {
        filter: drop-shadow(0 0 8px rgba(167, 218, 219, 0.6));
      }
      to {
        filter: drop-shadow(0 0 12px rgba(167, 218, 219, 0.9));
      }
    }

    /* === SIGNATURE === */
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

    /* === FOOTER === */
    .footer {
      background: rgba(2, 12, 27, 0.95);
      padding: 32px;
      text-align: left;
      border-top: 1px solid rgba(167, 218, 219, 0.1);
    }

    .footer-tagline {
      color: #a7dadb;
      font-family: 'Quicksand', sans-serif;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 16px;
      letter-spacing: 0.5px;
    }

    .footer-links {
      display: flex;
      justify-content: flex-start;
      gap: 24px;
      margin-bottom: 20px;
    }

    @media (max-width: 767px) {
      .footer-links {
        flex-direction: column;
        gap: 12px;
      }
    }

    .footer-link {
      color: #a7dadb;
      text-decoration: none;
      font-weight: 600;
      font-size: 12px;
      transition: color 0.2s ease;
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
          <p><strong>While you wait:</strong> Feel free to explore <a href="https://www.smartslate.io">our website</a> to learn more about our mission to transform learning and career development in India.</p>
        </div>
      </div>

      <!-- MINIMAL PRODUCT SUGGESTIONS -->
      <div class="suggestions-section">
        <div class="suggestions-title">We're excited to share these with you, check these out!</div>
        <div class="suggestion-links">
          <a href="https://solara.smartslate.io" class="suggestion-link">
            <span class="bulb-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zm2 11.5V16h-4v-2.5c-1.58-.55-2.5-2.18-2.15-3.82.35-1.64 1.82-2.82 3.5-2.82s3.15 1.18 3.5 2.82c.35 1.64-.57 3.27-2.15 3.82z"/>
                <path d="M9 21h6v1c0 .55-.45 1-1 1h-4c-.55 0-1-.45-1-1v-1z"/>
              </svg>
            </span>
            Solara Learning Engine
          </a>
          <a href="https://www.smartslate.io/products" class="suggestion-link">
            Ignite & Skills Architecture
          </a>
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

    <!-- FOOTER -->
    <div class="footer">
      <div class="footer-tagline">Smartslate · Transform Learning</div>
      <div class="footer-links">
        <a href="https://www.smartslate.io" class="footer-link">Visit Website</a>
        <a href="https://www.smartslate.io/contact" class="footer-link">Contact Us</a>
        <a href="https://www.smartslate.io/vision" class="footer-link">Our Vision</a>
      </div>
      <div class="footer-note">
        This is an automated acknowledgement email. We'll respond to your specific message personally within 24 hours.
        <br>If you need immediate assistance, please visit our contact page.
      </div>
    </div>
  </div>
</body>
</html>`;
  };

  // Generate the admin email template
  const generateAdminEmailTemplate = () => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    /* ============================================
       SMARTSLATE ADMIN EMAIL - MINIMALISTIC DESIGN
       Clean, Professional, Brand-Compliant
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
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
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
      text-align: left;
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
      font-size: 26px;
      font-weight: 700;
      margin-bottom: 16px;
      letter-spacing: -0.5px;
    }

    .header-subtitle {
      color: #b0c5c6;
      font-size: 15px;
      margin-bottom: 20px;
      opacity: 0.9;
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
      margin-bottom: 16px;
    }

    .timestamp {
      color: #b0c5c6;
      font-size: 13px;
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

    .divider {
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(167, 218, 219, 0.25), transparent);
      margin: 32px 0;
    }

    /* === FOOTER === */
    .footer {
      background: rgba(2, 12, 27, 0.95);
      padding: 32px;
      text-align: left;
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

    .footer-actions {
      margin-top: 20px;
      display: flex;
      gap: 12px;
      justify-content: flex-start;
      flex-wrap: wrap;
    }

    .action-button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #a7dadb;
      color: #020C1B;
      text-decoration: none;
      font-weight: 700;
      font-family: 'Quicksand', sans-serif;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 13px;
      border: none;
      transition: all 0.2s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .action-button:hover {
      background: #8fc9ca;
      color: #020C1B;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(167, 218, 219, 0.3);
    }

    /* === RESPONSIVE DESIGN === */
    @media (max-width: 768px) {
      body {
        padding: 24px 12px;
      }

      .email-container {
        border-radius: 16px;
      }

      .header, .content, .footer {
        padding: 24px;
      }

      .header h1 {
        font-size: 22px;
      }

      .field {
        padding: 16px 20px;
      }

      .message-field {
        padding: 20px;
      }

      .footer-actions {
        flex-direction: column;
        align-items: flex-start;
      }

      .action-button {
        width: auto;
        justify-content: flex-start;
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
    <div class="header">
      <h1>New Contact Form Submission</h1>
      <p class="header-subtitle">A visitor has reached out from the website</p>
      <div class="badge">${adminData.inquiryType}</div>
      <div class="timestamp">${new Date().toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata'
      })}</div>
    </div>

    <div class="content">
      <div class="field">
        <div class="field-label">Name</div>
        <div class="field-value">${adminData.name}</div>
      </div>

      <div class="field">
        <div class="field-label">Email</div>
        <div class="field-value">
          <a href="mailto:${adminData.email}">${adminData.email}</a>
        </div>
      </div>

      <div class="field">
        <div class="field-label">Phone</div>
        <div class="field-value">
          <a href="tel:${adminData.phone}">${adminData.phone}</a>
        </div>
      </div>

      <div class="field">
        <div class="field-label">Company</div>
        <div class="field-value">${adminData.company}</div>
      </div>

      <div class="field">
        <div class="field-label">Subject</div>
        <div class="field-value">${adminData.subject}</div>
      </div>

      <div class="divider"></div>

      <div class="message-field">
        <div class="field-label">Message</div>
        <div class="field-value">${adminData.message}</div>
      </div>
    </div>

    <div class="footer">
      <p>Sent from <span class="footer-highlight">Smartslate</span> contact form</p>
      <p>Reply directly to respond to <span class="footer-highlight">${adminData.name}</span></p>
      <div class="footer-actions">
        <a href="mailto:${adminData.email}" class="action-button">
          Reply Now
        </a>
      </div>
    </div>
  </div>
</body>
</html>`;
  };

  // Generate email template based on type
  const generateEmailTemplate = () => {
    return emailType === 'user' ? generateUserEmailTemplate() : generateAdminEmailTemplate();
  };

  // Initialize template on mount and when inputs change
  useEffect(() => {
    setEmailTemplate(generateEmailTemplate());
  }, [userName, userMessage, emailType, adminData]);

  return (
    <div style={{ minHeight: '100vh', background: '#020C1B', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: 'rgba(13, 27, 42, 0.9)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '20px',
          border: '1px solid rgba(167, 218, 219, 0.2)'
        }}>
          <h1 style={{
            color: '#a7dadb',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: '24px',
            fontWeight: 700,
            marginBottom: '10px'
          }}>
            Email Template Test
          </h1>
          <p style={{
            color: '#b0c5c6',
            fontSize: '14px',
            marginBottom: '20px'
          }}>
            Test and preview both user acknowledgement and admin notification emails.
          </p>

          {/* Email Type Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '20px',
            padding: '16px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '8px',
            border: '1px solid rgba(167, 218, 219, 0.1)'
          }}>
            <span style={{
              color: '#a7dadb',
              fontSize: '14px',
              fontWeight: 600,
              fontFamily: 'Quicksand, sans-serif'
            }}>
              Email Type:
            </span>
            <div style={{
              display: 'flex',
              background: 'rgba(167, 218, 219, 0.1)',
              borderRadius: '8px',
              padding: '4px'
            }}>
              <button
                onClick={() => setEmailType('user')}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: emailType === 'user' ? '#a7dadb' : 'transparent',
                  color: emailType === 'user' ? '#020C1B' : '#a7dadb'
                }}
              >
                👤 User Acknowledgement
              </button>
              <button
                onClick={() => setEmailType('admin')}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: emailType === 'admin' ? '#a7dadb' : 'transparent',
                  color: emailType === 'admin' ? '#020C1B' : '#a7dadb'
                }}
              >
                🔐 Admin Notification
              </button>
            </div>
          </div>
          <div style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginBottom: '20px'
          }}>
            <button
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(emailTemplate);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                } catch (err) {
                  console.error('Failed to copy:', err);
                }
              }}
              style={{
                background: 'linear-gradient(135deg, #a7dadb 0%, #8fc9ca 100%)',
                color: '#020C1B',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {copied ? 'Copied!' : 'Copy HTML Template'}
            </button>
            <button
              onClick={async () => {
                setSending(true);
                setMessage('');
                try {
                  const response = await fetch('/api/email-test', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      to: testEmail,
                      userName: userName || undefined,
                      testMode: true
                    }),
                  });

                  const data = await response.json();
                  if (data.success) {
                    setMessage('✅ Template generated successfully! Check the console.');
                    console.log('Generated HTML:', data.html);
                  } else {
                    setMessage('❌ Error: ' + data.error);
                  }
                } catch (err) {
                  setMessage('❌ Failed to generate template: ' + err);
                } finally {
                  setSending(false);
                }
              }}
              style={{
                background: 'rgba(167, 218, 219, 0.15)',
                color: '#a7dadb',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '12px',
                border: '1px solid rgba(167, 218, 219, 0.3)',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              {sending ? 'Generating...' : 'Generate Test Template'}
            </button>
          </div>

          {/* Test Form - User Email */}
          {emailType === 'user' && (
            <div style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              alignItems: 'end',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px',
              border: '1px solid rgba(167, 218, 219, 0.1)'
            }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label style={{
                  color: '#a7dadb',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '4px'
                }}>
                  Test Email:
                </label>
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(167, 218, 219, 0.2)',
                    borderRadius: '4px',
                    color: '#e0e0e0',
                    fontSize: '12px'
                  }}
                  placeholder="test@example.com"
                />
              </div>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <label style={{
                  color: '#a7dadb',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '4px'
                }}>
                  User Name (optional):
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(167, 218, 219, 0.2)',
                    borderRadius: '4px',
                    color: '#e0e0e0',
                    fontSize: '12px'
                  }}
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          {/* Test Form - Admin Email */}
          {emailType === 'admin' && (
            <div style={{
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.02)',
              borderRadius: '8px',
              border: '1px solid rgba(167, 218, 219, 0.1)'
            }}>
              <div style={{
                color: '#a7dadb',
                fontSize: '12px',
                fontWeight: 600,
                marginBottom: '12px',
                fontFamily: 'Quicksand, sans-serif'
              }}>
                Admin Email Data (Edit to test different scenarios):
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '12px'
              }}>
                <div>
                  <label style={{
                    color: '#a7dadb',
                    fontSize: '11px',
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '4px'
                  }}>
                    Name:
                  </label>
                  <input
                    type="text"
                    value={adminData.name}
                    onChange={(e) => setAdminData({...adminData, name: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '6px 10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(167, 218, 219, 0.2)',
                      borderRadius: '4px',
                      color: '#e0e0e0',
                      fontSize: '11px'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    color: '#a7dadb',
                    fontSize: '11px',
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '4px'
                  }}>
                    Email:
                  </label>
                  <input
                    type="email"
                    value={adminData.email}
                    onChange={(e) => setAdminData({...adminData, email: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '6px 10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(167, 218, 219, 0.2)',
                      borderRadius: '4px',
                      color: '#e0e0e0',
                      fontSize: '11px'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    color: '#a7dadb',
                    fontSize: '11px',
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '4px'
                  }}>
                    Phone:
                  </label>
                  <input
                    type="tel"
                    value={adminData.phone}
                    onChange={(e) => setAdminData({...adminData, phone: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '6px 10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(167, 218, 219, 0.2)',
                      borderRadius: '4px',
                      color: '#e0e0e0',
                      fontSize: '11px'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    color: '#a7dadb',
                    fontSize: '11px',
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '4px'
                  }}>
                    Company:
                  </label>
                  <input
                    type="text"
                    value={adminData.company}
                    onChange={(e) => setAdminData({...adminData, company: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '6px 10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(167, 218, 219, 0.2)',
                      borderRadius: '4px',
                      color: '#e0e0e0',
                      fontSize: '11px'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    color: '#a7dadb',
                    fontSize: '11px',
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '4px'
                  }}>
                    Subject:
                  </label>
                  <input
                    type="text"
                    value={adminData.subject}
                    onChange={(e) => setAdminData({...adminData, subject: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '6px 10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(167, 218, 219, 0.2)',
                      borderRadius: '4px',
                      color: '#e0e0e0',
                      fontSize: '11px'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    color: '#a7dadb',
                    fontSize: '11px',
                    fontWeight: 600,
                    display: 'block',
                    marginBottom: '4px'
                  }}>
                    Inquiry Type:
                  </label>
                  <input
                    type="text"
                    value={adminData.inquiryType}
                    onChange={(e) => setAdminData({...adminData, inquiryType: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '6px 10px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(167, 218, 219, 0.2)',
                      borderRadius: '4px',
                      color: '#e0e0e0',
                      fontSize: '11px'
                    }}
                  />
                </div>
              </div>
              <div style={{ marginTop: '12px' }}>
                <label style={{
                  color: '#a7dadb',
                  fontSize: '11px',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '4px'
                }}>
                  Message:
                </label>
                <textarea
                  value={adminData.message}
                  onChange={(e) => setAdminData({...adminData, message: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(167, 218, 219, 0.2)',
                    borderRadius: '4px',
                    color: '#e0e0e0',
                    fontSize: '11px',
                    minHeight: '80px',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>
          )}

          {/* Message Display */}
          {message && (
            <div style={{
              padding: '12px',
              borderRadius: '6px',
              marginTop: '12px',
              background: message.startsWith('✅') ? 'rgba(167, 218, 219, 0.1)' : 'rgba(255, 0, 0, 0.1)',
              border: `1px solid ${message.startsWith('✅') ? 'rgba(167, 218, 219, 0.3)' : 'rgba(255, 0, 0, 0.3)'}`,
              color: message.startsWith('✅') ? '#a7dadb' : '#ff6b6b',
              fontSize: '13px'
            }}>
              {message}
            </div>
          )}
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: emailTemplate }}
          style={{
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
          }}
        />
      </div>
    </div>
  );
}