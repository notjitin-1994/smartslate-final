interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailData) {
  // In production, you would integrate with a service like Resend, SendGrid, etc.
  // For now, we'll just log the email data
  console.log('Email would be sent:', {
    to,
    subject,
    html: html.substring(0, 200) + '...', // Truncate for logging
  });
  
  // You can implement actual email sending here
  // Example with Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({ to, subject, html });
}
