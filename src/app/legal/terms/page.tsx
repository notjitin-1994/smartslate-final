import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Smartslate',
  description: 'Smartslate Terms of Service - Learn about the terms and conditions governing your use of our learning management platform and services.',
  keywords: 'terms of service, terms and conditions, user agreement, Smartslate, legal',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background-dark">
      {/* Header */}
      <div className="bg-background-paper border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="text-primary-accent hover:text-primary-accent-light transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold text-primary-accent">Terms of Service</h1>
          </div>
          <p className="text-secondary mt-2">Last updated: {new Date().toLocaleDateString('en-IN')}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="bg-background-paper rounded-xl p-8 border border-border">
            
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">1. Acceptance of Terms</h2>
              <p className="text-secondary leading-relaxed mb-4">
                By accessing and using Smartslate's learning management platform and related services ("Services"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p className="text-secondary leading-relaxed">
                These Terms of Service ("Terms") govern your use of the Services provided by Smartslate Learning ("Smartslate," "we," "our," or "us"). These Terms constitute a legally binding agreement between you and Smartslate.
              </p>
            </section>

            {/* Definitions */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">2. Definitions</h2>
              <div className="space-y-4 text-secondary">
                <div>
                  <strong className="text-primary-accent-light">"Services"</strong> means the Smartslate learning management platform, including all features, content, and functionality available through our website and applications.
                </div>
                <div>
                  <strong className="text-primary-accent-light">"User," "you," "your"</strong> means any individual or entity that accesses or uses our Services.
                </div>
                <div>
                  <strong className="text-primary-accent-light">"Content"</strong> means all information, data, text, software, music, sound, photographs, graphics, video, messages, and other materials available through our Services.
                </div>
                <div>
                  <strong className="text-primary-accent-light">"User Content"</strong> means any content that you submit, post, or display on or through our Services.
                </div>
                <div>
                  <strong className="text-primary-accent-light">"Account"</strong> means the account you create to access and use our Services.
                </div>
              </div>
            </section>

            {/* Eligibility */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">3. Eligibility and Registration</h2>
              <p className="text-secondary leading-relaxed mb-4">
                To use our Services, you must:
              </p>
              <ul className="list-disc list-inside text-secondary space-y-2 mb-6">
                <li>Be at least 18 years old or have parental/guardian consent</li>
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
              <p className="text-secondary leading-relaxed">
                You are responsible for all activities that occur under your account. We reserve the right to terminate accounts that violate these Terms.
              </p>
            </section>

            {/* Use of Services */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">4. Use of Services</h2>
              <p className="text-secondary leading-relaxed mb-4">
                Our Services are provided for educational and professional development purposes. You agree to use our Services only for lawful purposes and in accordance with these Terms.
              </p>
              
              <h3 className="text-xl font-semibold text-primary-accent-light mb-3">4.1 Permitted Uses</h3>
              <ul className="list-disc list-inside text-secondary space-y-2 mb-6">
                <li>Accessing and completing educational courses and training materials</li>
                <li>Participating in learning activities and assessments</li>
                <li>Communicating with instructors and other learners</li>
                <li>Downloading course materials for personal use</li>
                <li>Sharing your learning progress and achievements</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-accent-light mb-3">4.2 Prohibited Uses</h3>
              <p className="text-secondary leading-relaxed mb-4">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-secondary space-y-2 mb-6">
                <li>Use the Services for any illegal or unauthorized purpose</li>
                <li>Violate any applicable laws, regulations, or third-party rights</li>
                <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
                <li>Interfere with or disrupt the Services or servers</li>
                <li>Share your account credentials with others</li>
                <li>Copy, distribute, or modify our content without permission</li>
                <li>Use automated systems to access our Services</li>
                <li>Harass, abuse, or harm other users</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">5. Intellectual Property Rights</h2>
              <p className="text-secondary leading-relaxed mb-4">
                The Services and their original content, features, and functionality are owned by Smartslate and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              
              <h3 className="text-xl font-semibold text-primary-accent-light mb-3">5.1 Our Content</h3>
              <p className="text-secondary leading-relaxed mb-4">
                All content provided through our Services, including but not limited to courses, videos, text, graphics, logos, and software, is the property of Smartslate or its licensors and is protected by copyright and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-primary-accent-light mb-3">5.2 Your Content</h3>
              <p className="text-secondary leading-relaxed mb-4">
                You retain ownership of any content you submit to our Services. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content in connection with providing our Services.
              </p>

              <h3 className="text-xl font-semibold text-primary-accent-light mb-3">5.3 License to Use</h3>
              <p className="text-secondary leading-relaxed">
                We grant you a limited, non-exclusive, non-transferable, revocable license to access and use our Services for your personal, non-commercial use, subject to these Terms.
              </p>
            </section>

            {/* Privacy and Data */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">6. Privacy and Data Protection</h2>
              <p className="text-secondary leading-relaxed mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
              <p className="text-secondary leading-relaxed">
                By using our Services, you consent to the collection and use of your information as described in our Privacy Policy. We are committed to protecting your data in compliance with applicable Indian data protection laws.
              </p>
            </section>

            {/* Payment Terms */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">7. Payment Terms</h2>
              <p className="text-secondary leading-relaxed mb-4">
                Some of our Services may require payment. By purchasing a subscription or course, you agree to pay all applicable fees and taxes.
              </p>
              
              <h3 className="text-xl font-semibold text-primary-accent-light mb-3">7.1 Pricing and Billing</h3>
              <ul className="list-disc list-inside text-secondary space-y-2 mb-6">
                <li>All prices are in Indian Rupees (INR) unless otherwise stated</li>
                <li>Prices are subject to change with 30 days' notice</li>
                <li>Payment is due at the time of purchase</li>
                <li>We accept payment through secure third-party payment processors</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-accent-light mb-3">7.2 Refunds and Cancellations</h3>
              <ul className="list-disc list-inside text-secondary space-y-2 mb-6">
                <li>Refunds are provided according to our refund policy</li>
                <li>Subscription cancellations take effect at the end of the current billing period</li>
                <li>No refunds for partially used subscriptions</li>
                <li>Course refunds may be available within 7 days of purchase</li>
              </ul>
            </section>

            {/* Disclaimers */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">8. Disclaimers and Limitations</h2>
              
              <h3 className="text-xl font-semibold text-primary-accent-light mb-3">8.1 Service Availability</h3>
              <p className="text-secondary leading-relaxed mb-4">
                We strive to provide reliable and uninterrupted Services, but we do not guarantee that our Services will be available at all times. We may suspend or discontinue Services for maintenance, updates, or other reasons.
              </p>

              <h3 className="text-xl font-semibold text-primary-accent-light mb-3">8.2 Educational Content</h3>
              <p className="text-secondary leading-relaxed mb-4">
                While we strive to provide accurate and up-to-date educational content, we do not guarantee the accuracy, completeness, or usefulness of any information provided through our Services. Educational outcomes may vary based on individual effort and circumstances.
              </p>

              <h3 className="text-xl font-semibold text-primary-accent-light mb-3">8.3 Limitation of Liability</h3>
              <p className="text-secondary leading-relaxed">
                To the maximum extent permitted by law, Smartslate shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or relating to your use of our Services.
              </p>
            </section>

            {/* Indemnification */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">9. Indemnification</h2>
              <p className="text-secondary leading-relaxed">
                You agree to indemnify, defend, and hold harmless Smartslate and its officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to your use of our Services or violation of these Terms.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">10. Termination</h2>
              <p className="text-secondary leading-relaxed mb-4">
                We may terminate or suspend your account and access to our Services at any time, with or without cause, with or without notice, effective immediately.
              </p>
              <p className="text-secondary leading-relaxed mb-4">
                You may terminate your account at any time by contacting us or using the account deletion feature in your account settings.
              </p>
              <p className="text-secondary leading-relaxed">
                Upon termination, your right to use the Services will cease immediately, and we may delete your account and data in accordance with our data retention policies.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">11. Governing Law and Dispute Resolution</h2>
              <p className="text-secondary leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to these Terms or our Services shall be subject to the exclusive jurisdiction of the courts in [Your City], India.
              </p>
              <p className="text-secondary leading-relaxed">
                We encourage you to contact us first to resolve any disputes amicably before pursuing legal action.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">12. Changes to Terms</h2>
              <p className="text-secondary leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the new Terms on our website and updating the "Last updated" date. Your continued use of our Services after such changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            {/* Severability */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">13. Severability</h2>
              <p className="text-secondary leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
              </p>
            </section>

            {/* Entire Agreement */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">14. Entire Agreement</h2>
              <p className="text-secondary leading-relaxed">
                These Terms, together with our Privacy Policy and any other agreements referenced herein, constitute the entire agreement between you and Smartslate regarding your use of our Services.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">15. Contact Us</h2>
              <p className="text-secondary leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-background-surface rounded-lg p-6 border border-border">
                <div className="space-y-2 text-secondary">
                  <p><strong>Email:</strong> jitin@smartslate.io</p>
                  <p><strong>Address:</strong> Smartslate Learning</p>
                  <p className="ml-4">India</p>
                  <p><strong>Phone:</strong> +91 9008898642</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="border-t border-border pt-8 mt-12">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-secondary">
                  © {new Date().getFullYear()} Smartslate Learning. All rights reserved.
                </p>
                <div className="flex gap-6 text-sm">
                  <Link href="/legal/privacy" className="text-primary-accent hover:underline">
                    Privacy Policy
                  </Link>
                  <Link href="/" className="text-primary-accent hover:underline">
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
