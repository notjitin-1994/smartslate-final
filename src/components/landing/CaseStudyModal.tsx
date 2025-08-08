'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, FormEvent } from 'react';
import Modal from '@/components/ui/Modal';
import FormField from '@/components/ui/FormField';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CaseStudyModal({ isOpen, onClose }: CaseStudyModalProps) {
  const [formData, setFormData] = useState({
    // Contact Information
    name: '',
    email: '',
    phone: '',
    // Professional Context
    company: '',
    role: '',
    industry: '',
    // Case Study Interest
    caseStudyType: '',
    specificInterests: [] as string[],
    currentChallenges: '',
    // Engagement
    followUp: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const caseStudyOptions = [
    { id: 'ai-transformation', name: 'AI Skills Transformation', description: 'How companies built AI capabilities at scale' },
    { id: 'talent-retention', name: 'Talent Retention', description: 'Reducing attrition through upskilling programs' },
    { id: 'roi-impact', name: 'ROI & Business Impact', description: 'Measurable outcomes from learning initiatives' },
    { id: 'rapid-deployment', name: 'Rapid Deployment', description: 'Fast-track implementation strategies' },
    { id: 'custom-solutions', name: 'Custom Learning Solutions', description: 'Tailored programs for unique needs' },
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.company) newErrors.company = 'Company is required';
    if (!formData.caseStudyType) newErrors.caseStudyType = 'Please select a case study type';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form and close modal after success
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        industry: '',
        caseStudyType: '',
        specificInterests: [],
        currentChallenges: '',
        followUp: '',
      });
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  const updateFormData = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleInterest = (interest: string) => {
    const currentInterests = formData.specificInterests;
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];
    updateFormData('specificInterests', newInterests);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      labelledById="case-modal-title"
      describedById="case-modal-subtitle"
      initialFocusSelector="#name"
    >
      <div className="flex flex-col h-full max-h-[85vh]">
        {/* Header - Fixed */}
        <div className="text-center p-4 sm:p-6 pb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary-accent to-secondary-accent-dark rounded-full mb-4"
          >
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </motion.div>
          <h2 id="case-modal-title" className="text-xl md:text-2xl font-bold mb-2">
            Explore Success Stories
          </h2>
          <p id="case-modal-subtitle" className="text-secondary text-sm max-w-md mx-auto">
            See how industry leaders transformed their workforce with SmartSlate
          </p>
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-semibold mb-3">Case Studies on the Way!</h3>
            <p className="text-secondary mb-2">We&apos;re preparing personalized case studies for you.</p>
            <p className="text-sm text-secondary/70">
              Check your inbox within 24 hours for relevant success stories.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 space-y-6">
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={(value) => updateFormData('name', value)}
                required
                placeholder="John Doe"
                error={errors.name}
              />
              <FormField
                label="Work Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(value) => updateFormData('email', value)}
                required
                placeholder="john@company.com"
                error={errors.email}
              />
            </div>

            {/* Professional Context */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Company"
                name="company"
                value={formData.company}
                onChange={(value) => updateFormData('company', value)}
                required
                placeholder="Acme Corporation"
                error={errors.company}
              />
              <FormField
                label="Role"
                name="role"
                value={formData.role}
                onChange={(value) => updateFormData('role', value)}
                placeholder="Head of L&amp;D"
              />
            </div>

            <FormField
              label="Industry"
              name="industry"
              type="select"
              value={formData.industry}
              onChange={(value) => updateFormData('industry', value)}
              options={[
                { value: '', label: 'Select your industry' },
                { value: 'technology', label: 'Technology' },
                { value: 'finance', label: 'Finance & Banking' },
                { value: 'healthcare', label: 'Healthcare' },
                { value: 'manufacturing', label: 'Manufacturing' },
                { value: 'retail', label: 'Retail & E-commerce' },
                { value: 'consulting', label: 'Consulting' },
                { value: 'education', label: 'Education' },
                { value: 'other', label: 'Other' },
              ]}
              helpText="We&apos;ll prioritize case studies from your industry"
            />

            {/* Case Study Interest */}
            <FormField
              label="What type of case study interests you most?"
              name="caseStudyType"
              type="radio-group"
              value={formData.caseStudyType}
              onChange={(value) => updateFormData('caseStudyType', value)}
              required
              options={[
                { value: 'transformation', label: 'Digital Transformation', description: 'Organization-wide skill transformation' },
                { value: 'technical', label: 'Technical Upskilling', description: 'AI, Cloud, DevOps training programs' },
                { value: 'leadership', label: 'Leadership Development', description: 'Executive and management training' },
                { value: 'custom', label: 'Custom Solutions', description: 'Tailored learning architectures' },
              ]}
              error={errors.caseStudyType}
            />

            {/* Specific Interests */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Specific areas of interest (select all that apply)
              </label>
              <div className="space-y-2">
                {caseStudyOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`
                      flex items-start p-3 md:p-4
                      bg-white/5 backdrop-blur-sm
                      border border-white/10
                      rounded-lg cursor-pointer
                      transition-all duration-200
                      hover:bg-white/10 hover:border-white/20
                      min-h-[48px] md:min-h-[52px]
                      ${formData.specificInterests.includes(option.id) ? 'border-primary-accent bg-primary-accent/10' : ''}
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={formData.specificInterests.includes(option.id)}
                      onChange={() => toggleInterest(option.id)}
                      className="mt-2 mr-3 w-4 h-4 text-primary-accent focus:ring-primary-accent focus:ring-2"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-primary">{option.name}</div>
                      <div className="text-sm text-secondary">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Current Challenges */}
            <FormField
              label="What challenges are you looking to solve? (Optional)"
              name="currentChallenges"
              type="textarea"
              value={formData.currentChallenges}
              onChange={(value) => updateFormData('currentChallenges', value)}
              placeholder="E.g., High attrition, skills gaps, slow onboarding..."
              rows={3}
              maxLength={300}
              helpText="This helps us select the most relevant case studies"
            />

            {/* Follow Up */}
            <FormField
              label="Would you like a follow-up consultation?"
              name="followUp"
              type="radio-group"
              value={formData.followUp}
              onChange={(value) => updateFormData('followUp', value)}
              options={[
                { value: 'yes', label: 'Yes, schedule a call to discuss' },
                { value: 'maybe', label: 'Maybe later' },
                { value: 'no', label: 'Just send the case studies' },
              ]}
            />
            </div>

            {/* Fixed Footer with Submit Buttons */}
            <div className="border-t border-white/10 p-4 sm:p-6 bg-background-dark/50 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Requesting Case Studies...
                    </span>
                  ) : (
                    'Get Case Studies'
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-tertiary w-full sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
