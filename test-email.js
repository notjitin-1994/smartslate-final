// Simple test script to verify email functionality
const { sendEmail } = require('./src/lib/email.ts');

async function testEmail() {
  try {
    console.log('Testing email functionality...');
    
    const testEmailData = {
      to: 'jitin@smartslate.io',
      subject: 'Test Email from Smartslate Contact Form',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to verify the contact form email functionality.</p>
        <p><strong>Name:</strong> Test User</p>
        <p><strong>Email:</strong> test@example.com</p>
        <p><strong>Message:</strong> This is a test message from the contact form.</p>
      `
    };
    
    const result = await sendEmail(testEmailData);
    console.log('Email test result:', result);
    console.log('✅ Email functionality is working!');
  } catch (error) {
    console.error('❌ Email test failed:', error);
  }
}

testEmail();