import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Smartslate',
  description: 'Smartslate Privacy Policy - Learn how we collect, use, and protect your personal information in compliance with Indian data protection laws.',
  keywords: 'privacy policy, data protection, personal information, Smartslate, Indian law',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-paper to-background-surface">
      {/* Enhanced Header with Brand Elements */}
      <div 
        className="relative bg-gradient-to-r from-background-paper to-background-surface border-b border-border/50 animate-fade-in"
      >
        {/* Background Brand Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-10 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-brand-secondary/10 rounded-full blur-2xl animate-pulse"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="flex items-center gap-6 mb-6">
            <Link 
              href="/"
              className="group flex items-center gap-3 text-brand-primary hover:text-brand-primary-light transition-all duration-300 hover:scale-105"
            >
              <div className="p-2 rounded-full bg-brand-primary/10 group-hover:bg-brand-primary/20 transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <span className="font-medium">Back to Home</span>
            </Link>
          </div>
          
          <div className="animate-slide-up">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-brand-primary to-brand-primary-light bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl">
              Your privacy is fundamental to our mission. We're committed to transparency and protecting your data with the highest standards of security.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-2 text-text-secondary">
                <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                <span className="text-sm">Last updated: {new Date().toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Content with Modern Cards */}
      <div 
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid gap-8">
          
          {/* Introduction Section */}
          <section 
            className="bg-gradient-to-br from-background-paper/80 to-background-surface/80 rounded-3xl p-8 border border-border/30 backdrop-blur-sm shadow-brand-lg hover:shadow-brand-xl transition-all duration-500 hover:scale-[1.02] animate-fade-in"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-brand-primary/20 text-brand-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-4">1. Introduction</h2>
                <p className="text-text-secondary leading-relaxed text-lg mb-4">
                  Smartslate ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our learning management platform and related services.
                </p>
                <p className="text-text-secondary leading-relaxed text-lg">
                  This policy complies with the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and other applicable Indian data protection laws and regulations.
                </p>
              </div>
            </div>
          </section>

          {/* Information Collection Section */}
          <section 
            className="bg-gradient-to-br from-background-paper/80 to-background-surface/80 rounded-3xl p-8 border border-border/30 backdrop-blur-sm shadow-brand-lg hover:shadow-brand-xl transition-all duration-500 hover:scale-[1.02] animate-fade-in"
          >
            <div className="flex items-start gap-4 mb-8">
              <div className="p-3 rounded-2xl bg-brand-secondary/20 text-brand-secondary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-text-primary mb-6">2. Information We Collect</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-primary mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                      2.1 Personal Information
                    </h3>
                    <p className="text-text-secondary leading-relaxed mb-4">
                      We may collect the following personal information:
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        'Name, email address, and contact information',
                        'Company name, job title, and professional details',
                        'Profile information and preferences',
                        'Payment and billing information',
                        'Communication preferences and marketing consent'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-background-surface/50 border border-border/20 hover:border-brand-primary/30 transition-colors duration-300">
                          <div className="w-1.5 h-1.5 bg-brand-primary rounded-full"></div>
                          <span className="text-text-secondary">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-brand-primary mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                      2.2 Usage Information
                    </h3>
                    <p className="text-text-secondary leading-relaxed mb-4">
                      We automatically collect certain information when you use our services:
                    </p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        'Log data (IP address, browser type, access times)',
                        'Device information and identifiers',
                        'Usage patterns and learning progress',
                        'Course interactions and completion data',
                        'Performance analytics and user behavior'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-background-surface/50 border border-border/20 hover:border-brand-primary/30 transition-colors duration-300">
                          <div className="w-1.5 h-1.5 bg-brand-primary rounded-full"></div>
                          <span className="text-text-secondary">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-brand-primary mb-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                      2.3 Cookies and Tracking Technologies
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      We use cookies, web beacons, and similar technologies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser preferences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Information Section */}
          <section 
            className="bg-gradient-to-br from-background-paper/80 to-background-surface/80 rounded-3xl p-8 border border-border/30 backdrop-blur-sm shadow-brand-lg hover:shadow-brand-xl transition-all duration-500 hover:scale-[1.02] animate-fade-in"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-green-500/20 text-green-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-4">3. How We Use Your Information</h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  We use the collected information for the following purposes:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Providing and maintaining our learning platform',
                    'Personalizing your learning experience and content recommendations',
                    'Processing payments and managing subscriptions',
                    'Communicating with you about our services and updates',
                    'Analyzing usage patterns to improve our platform',
                    'Ensuring security and preventing fraud',
                    'Complying with legal obligations and regulations'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-background-surface/50 border border-border/20 hover:border-green-500/30 transition-all duration-300 hover:scale-105">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-text-secondary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Information Sharing Section */}
          <section 
            className="bg-gradient-to-br from-background-paper/80 to-background-surface/80 rounded-3xl p-8 border border-border/30 backdrop-blur-sm shadow-brand-lg hover:shadow-brand-xl transition-all duration-500 hover:scale-[1.02] animate-fade-in"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-orange-500/20 text-orange-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                </p>
                <div className="space-y-4">
                  {[
                    { title: 'Service Providers', desc: 'With trusted third-party service providers who assist in operating our platform' },
                    { title: 'Legal Requirements', desc: 'When required by law, court order, or government regulation' },
                    { title: 'Business Transfers', desc: 'In connection with a merger, acquisition, or sale of assets' },
                    { title: 'Consent', desc: 'With your explicit consent for specific purposes' },
                    { title: 'Safety and Security', desc: 'To protect our rights, property, or safety, or that of our users' }
                  ].map((item, index) => (
                    <div key={index} className="p-4 rounded-xl bg-background-surface/50 border border-border/20 hover:border-orange-500/30 transition-all duration-300">
                      <h4 className="font-semibold text-brand-primary mb-2">{item.title}</h4>
                      <p className="text-text-secondary">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Data Security Section */}
          <section 
            className="bg-gradient-to-br from-background-paper/80 to-background-surface/80 rounded-3xl p-8 border border-border/30 backdrop-blur-sm shadow-brand-lg hover:shadow-brand-xl transition-all duration-500 hover:scale-[1.02] animate-fade-in"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-4">5. Data Security</h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Encryption of data in transit and at rest',
                    'Regular security assessments and updates',
                    'Access controls and authentication mechanisms',
                    'Employee training on data protection practices',
                    'Incident response and breach notification procedures'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-background-surface/50 border border-border/20 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-text-secondary">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Your Rights Section */}
          <section 
            className="bg-gradient-to-br from-background-paper/80 to-background-surface/80 rounded-3xl p-8 border border-border/30 backdrop-blur-sm shadow-brand-lg hover:shadow-brand-xl transition-all duration-500 hover:scale-[1.02] animate-fade-in"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-text-primary mb-4">7. Your Rights and Choices</h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  You have the following rights regarding your personal information:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {[
                    { title: 'Access', desc: 'Request access to your personal information' },
                    { title: 'Correction', desc: 'Request correction of inaccurate or incomplete information' },
                    { title: 'Deletion', desc: 'Request deletion of your personal information' },
                    { title: 'Portability', desc: 'Request a copy of your data in a portable format' },
                    { title: 'Objection', desc: 'Object to processing of your personal information' },
                    { title: 'Withdrawal', desc: 'Withdraw consent for data processing' }
                  ].map((item, index) => (
                    <div key={index} className="p-4 rounded-xl bg-background-surface/50 border border-border/20 hover:border-purple-500/30 transition-all duration-300 hover:scale-105">
                      <h4 className="font-semibold text-brand-primary mb-2">{item.title}</h4>
                      <p className="text-text-secondary text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 border border-brand-primary/20">
                  <p className="text-text-secondary leading-relaxed">
                    To exercise these rights, please contact us at{' '}
                    <a href="mailto:jitin@smartslate.io" className="text-brand-primary hover:text-brand-primary-light underline transition-colors duration-300">
                      jitin@smartslate.io
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information Section */}
          <section 
            className="bg-gradient-to-br from-background-paper/80 to-background-surface/80 rounded-3xl p-8 border border-border/30 backdrop-blur-sm shadow-brand-lg hover:shadow-brand-xl transition-all duration-500 hover:scale-[1.02] animate-fade-in"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-brand-primary/20 text-brand-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-text-primary mb-6">11. Contact Us</h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-background-surface to-background-paper border border-border/30 hover:border-brand-primary/30 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-brand-primary mb-4">Company Information</h3>
                    <div className="space-y-3 text-text-secondary">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                        <span><strong>Company:</strong> Smartslate Learning</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                        <span><strong>Location:</strong> India</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                        <span><strong>Phone:</strong> +91 9008898642</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-background-surface to-background-paper border border-border/30 hover:border-brand-primary/30 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-brand-primary mb-4">Grievance Officer</h3>
                    <div className="space-y-3 text-text-secondary">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                        <span><strong>Name:</strong> Jitin Nair</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                        <span><strong>Email:</strong> jitin@smartslate.io</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                        <span><strong>Response Time:</strong> Within 30 days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Sections - Simplified for UX */}
          <section 
            className="bg-gradient-to-br from-background-paper/80 to-background-surface/80 rounded-3xl p-8 border border-border/30 backdrop-blur-sm shadow-brand-lg hover:shadow-brand-xl transition-all duration-500 hover:scale-[1.02] animate-fade-in"
          >
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-4">6. Data Retention</h2>
                <p className="text-text-secondary leading-relaxed">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-4">8. International Data Transfers</h2>
                <p className="text-text-secondary leading-relaxed">
                  Your personal information may be transferred to and processed in countries other than India. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-4">9. Children's Privacy</h2>
                <p className="text-text-secondary leading-relaxed">
                  Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-4">10. Changes to This Privacy Policy</h2>
                <p className="text-text-secondary leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Enhanced Footer */}
        <div 
          className="border-t border-border/30 pt-12 mt-16 animate-fade-in"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-center sm:text-left">
              <p className="text-text-secondary mb-2">
                © {new Date().getFullYear()} Smartslate Learning. All rights reserved.
              </p>
              <p className="text-sm text-text-disabled">
                Committed to protecting your privacy and data security
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link 
                href="/legal/terms" 
                className="text-brand-primary hover:text-brand-primary-light underline transition-colors duration-300 hover:scale-105"
              >
                Terms of Service
              </Link>
              <Link 
                href="/" 
                className="text-brand-primary hover:text-brand-primary-light underline transition-colors duration-300 hover:scale-105"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
