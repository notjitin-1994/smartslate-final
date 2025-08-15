// Optional runtime import; typing shim provided via ambient declaration
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import nodemailer from 'nodemailer';
import { withOptionalInsecureTLS } from './fetch';

export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const res = await fetch('https://api.resend.com/emails', withOptionalInsecureTLS({
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${resendKey}` },
      body: JSON.stringify({ from: 'no-reply@smartslate.io', to, subject, html }),
    }));
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Resend failed: ${text}`);
    }
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'localhost',
    port: Number(process.env.SMTP_PORT || 1025),
    secure: false,
  });
  await transporter.sendMail({ from: 'no-reply@smartslate.io', to, subject, html });
}



