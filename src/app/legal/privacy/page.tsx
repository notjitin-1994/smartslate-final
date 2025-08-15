import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Smartslate',
  description: 'Smartslate Privacy Policy - Learn how we collect, use, and protect your personal information in compliance with Indian data protection laws.',
  keywords: 'privacy policy, data protection, personal information, Smartslate, Indian law',
};

export default function PrivacyPolicy() {
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
            <h1 className="text-3xl font-bold text-primary-accent">Privacy Policy</h1>
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
              <h2 className="text-2xl font-bold text-primary-accent mb-4">1. Introduction</h2>
              <p className="text-secondary leading-relaxed mb-4">
                Smartslate ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our learning management platform and related services.
              </p>
              <p className="text-secondary leading-relaxed">
                This policy complies with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and other applicable Indian data protection laws and regulations.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-primary-accent-light mb-3">2.1 Personal Information</h3>
              <p className="text-secondary leading-relaxed mb-4">
                We may collect the following personal information:
              </p>
              <ul className="list-disc list-inside text-secondary space-y-2 mb-6">
                <li>Name, email address, and contact information</li>
                <li>Company name, job title, and professional details</li>
                <li>Profile information and preferences</li>
                <li>Payment and billing information</li>
                <li>Communication preferences and marketing consent</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-accent-light mb-3">2.2 Usage Information</h3>
              <p className="text-secondary leading-relaxed mb-4">
                We automatically collect certain information when you use our services:
              </p>
              <ul className="list-disc list-inside text-secondary space-y-2 mb-6">
                <li>Log data (IP address, browser type, access times)</li>
                <li>Device information and identifiers</li>
                <li>Usage patterns and learning progress</li>
                <li>Course interactions and completion data</li>
                <li>Performance analytics and user behavior</li>
              </ul>

              <h3 className="text-xl font-semibold text-primary-accent-light mb-3">2.3 Cookies and Tracking Technologies</h3>
              <p className="text-secondary leading-relaxed">
                We use cookies, web beacons, and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser preferences.
              </p>
            </section>

            {/* How We Use Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">3. How We Use Your Information</h2>
              <p className="text-secondary leading-relaxed mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside text-secondary space-y-2 mb-6">
                <li>Providing and maintaining our learning platform</li>
                <li>Personalizing your learning experience and content recommendations</li>
                <li>Processing payments and managing subscriptions</li>
                <li>Communicating with you about our services and updates</li>
                <li>Analyzing usage patterns to improve our platform</li>
                <li>Ensuring security and preventing fraud</li>
                <li>Complying with legal obligations and regulations</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-secondary leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-secondary space-y-2 mb-6">
                <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in operating our platform</li>
                <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                <li><strong>Consent:</strong> With your explicit consent for specific purposes</li>
                <li><strong>Safety and Security:</strong> To protect our rights, property, or safety, or that of our users</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">5. Data Security</h2>
              <p className="text-secondary leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside text-secondary space-y-2 mb-6">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection practices</li>
                <li>Incident response and breach notification procedures</li>
              </ul>
            </section>

            {/* Data Retention */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">6. Data Retention</h2>
              <p className="text-secondary leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">7. Your Rights and Choices</h2>
              <p className="text-secondary leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-secondary space-y-2 mb-6">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Objection:</strong> Object to processing of your personal information</li>
                <li><strong>Withdrawal:</strong> Withdraw consent for data processing</li>
              </ul>
              <p className="text-secondary leading-relaxed">
                                 To exercise these rights, please contact us at{' '}
                 <a href="mailto:jitin@smartslate.io" className="text-primary-accent hover:underline">
                   jitin@smartslate.io
                 </a>
              </p>
            </section>

            {/* International Transfers */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">8. International Data Transfers</h2>
              <p className="text-secondary leading-relaxed">
                Your personal information may be transferred to and processed in countries other than India. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">9. Children's Privacy</h2>
              <p className="text-secondary leading-relaxed">
                Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-secondary leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">11. Contact Us</h2>
              <p className="text-secondary leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-background-surface rounded-lg p-6 border border-border">
                <div className="space-y-2 text-secondary">
                  <p><strong>Email:</strong> jitin@smartslate.io</p>
                  <p><strong>Address:</strong> Smartslate Technologies Pvt. Ltd.</p>
                  <p className="ml-4">India</p>
                  <p><strong>Phone:</strong> +91 9008898642</p>
                </div>
              </div>
            </section>

            {/* Grievance Officer */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-accent mb-4">12. Grievance Officer</h2>
              <p className="text-secondary leading-relaxed mb-4">
                In accordance with Indian law, we have designated a Grievance Officer to address your concerns:
              </p>
              <div className="bg-background-surface rounded-lg p-6 border border-border">
                <div className="space-y-2 text-secondary">
                  <p><strong>Name:</strong> Jitin Nair</p>
                  <p><strong>Email:</strong> jitin@smartslate.io</p>
                  <p><strong>Response Time:</strong> Within 30 days of receiving your complaint</p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="border-t border-border pt-8 mt-12">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-sm text-secondary">
                  © {new Date().getFullYear()} Smartslate Technologies Pvt. Ltd. All rights reserved.
                </p>
                <div className="flex gap-6 text-sm">
                  <Link href="/legal/terms" className="text-primary-accent hover:underline">
                    Terms of Service
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
