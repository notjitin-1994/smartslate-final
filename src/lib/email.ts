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
