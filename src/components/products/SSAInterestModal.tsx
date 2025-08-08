'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSSAInterestModal } from '@/hooks/useSSAInterestModal';
import { useState, FormEvent } from 'react';
import Modal from '@/components/ui/Modal';
import FormField from '@/components/ui/FormField';

export default function SSAInterestModal() {
  const { isOpen, closeModal } = useSSAInterestModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    // Step 2: Company Context
    companySize: '',
    industry: '',
    currentChallenges: '',
    // Step 3: Specific Needs
    timeline: '',
    budget: '',
    specificGoals: '',
    howDidYouHear: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 3;

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.phone) newErrors.phone = 'Phone is required';
      if (!formData.company) newErrors.company = 'Company is required';
      if (!formData.role) newErrors.role = 'Role is required';
    } else if (step === 2) {
      if (!formData.companySize) newErrors.companySize = 'Company size is required';
      if (!formData.industry) newErrors.industry = 'Industry is required';
      if (!formData.currentChallenges) newErrors.currentChallenges = 'Please describe your challenges';
    } else if (step === 3) {
      if (!formData.timeline) newErrors.timeline = 'Timeline is required';
      if (!formData.specificGoals) newErrors.specificGoals = 'Please describe your goals';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;

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
        companySize: '',
        industry: '',
        currentChallenges: '',
        timeline: '',
        budget: '',
        specificGoals: '',
        howDidYouHear: '',
      });
      setCurrentStep(1);
      setIsSuccess(false);
      closeModal();
    }, 3000);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      maxWidth="lg"
      labelledById="ssa-modal-title"
      describedById="ssa-modal-subtitle"
      initialFocusSelector="#name"
    >
      <div className="flex flex-col h-full max-h-[85vh]">
        {/* Header - Fixed */}
        <div className="text-center p-4 sm:p-6 pb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-accent to-primary-accent-dark rounded-full mb-3"
          >
            <svg className="w-8 h-8 text-background-dark" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </motion.div>
          <h2 id="ssa-modal-title" className="text-xl md:text-2xl font-bold mb-2">
            Strategic Skills Architecture
          </h2>
          <p id="ssa-modal-subtitle" className="text-secondary text-sm max-w-md mx-auto">
            Let&apos;s understand your unique needs to build a custom learning solution that drives real business impact
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
            <h3 className="text-2xl font-semibold mb-3">Thank You!</h3>
            <p className="text-secondary mb-2">Your request has been received.</p>
            <p className="text-sm text-secondary/70">
              Our team will reach out within 24 hours to schedule your consultation.
            </p>
          </motion.div>
                  ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex-1 flex items-center">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                      transition-all duration-300
                      ${currentStep >= step 
                        ? 'bg-primary-accent text-background-dark' 
                        : 'bg-white/10 text-secondary'
                      }
                    `}
                  >
                    {currentStep > step ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div className={`
                      flex-1 h-1 mx-2 rounded-full transition-all duration-300
                      ${currentStep > step ? 'bg-primary-accent' : 'bg-white/10'}
                    `} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Labels */}
            <div className="flex justify-between mb-8 px-2">
              <span className={`text-xs ${currentStep >= 1 ? 'text-primary-accent' : 'text-secondary'}`}>
                Basic Info
              </span>
              <span className={`text-xs ${currentStep >= 2 ? 'text-primary-accent' : 'text-secondary'}`}>
                Company Context
              </span>
              <span className={`text-xs ${currentStep >= 3 ? 'text-primary-accent' : 'text-secondary'}`}>
                Your Goals
              </span>
            </div>

              <AnimatePresence mode="wait">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
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
                        helpText="We'll use this to send consultation details"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(value) => updateFormData('phone', value)}
                        required
                        placeholder="+1 (555) 123-4567"
                        error={errors.phone}
                      />
                      <FormField
                        label="Company Name"
                        name="company"
                        value={formData.company}
                        onChange={(value) => updateFormData('company', value)}
                        required
                        placeholder="Acme Corporation"
                        error={errors.company}
                      />
                    </div>
                    <FormField
                      label="Your Role"
                      name="role"
                      value={formData.role}
                      onChange={(value) => updateFormData('role', value)}
                      required
                      placeholder="Head of Learning & Development"
                      error={errors.role}
                      helpText="This helps us tailor our conversation to your needs"
                    />
                  </motion.div>
                )}

                {/* Step 2: Company Context */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Company Size"
                        name="companySize"
                        type="select"
                        value={formData.companySize}
                        onChange={(value) => updateFormData('companySize', value)}
                        required
                        options={[
                          { value: '1-50', label: '1-50 employees' },
                          { value: '51-200', label: '51-200 employees' },
                          { value: '201-500', label: '201-500 employees' },
                          { value: '501-1000', label: '501-1,000 employees' },
                          { value: '1001-5000', label: '1,001-5,000 employees' },
                          { value: '5000+', label: '5,000+ employees' },
                        ]}
                        error={errors.companySize}
                      />
                      <FormField
                        label="Industry"
                        name="industry"
                        type="select"
                        value={formData.industry}
                        onChange={(value) => updateFormData('industry', value)}
                        required
                        options={[
                          { value: 'technology', label: 'Technology' },
                          { value: 'finance', label: 'Finance & Banking' },
                          { value: 'healthcare', label: 'Healthcare' },
                          { value: 'manufacturing', label: 'Manufacturing' },
                          { value: 'retail', label: 'Retail & E-commerce' },
                          { value: 'consulting', label: 'Consulting' },
                          { value: 'education', label: 'Education' },
                          { value: 'other', label: 'Other' },
                        ]}
                        error={errors.industry}
                      />
                    </div>
                    <FormField
                      label="What talent challenges are you facing?"
                      name="currentChallenges"
                      type="textarea"
                      value={formData.currentChallenges}
                      onChange={(value) => updateFormData('currentChallenges', value)}
                      required
                      placeholder="E.g., Skills gaps in AI/ML, high attrition rates, difficulty scaling technical teams..."
                      rows={4}
                      maxLength={500}
                      error={errors.currentChallenges}
                      helpText="Be specific - this helps us prepare relevant solutions for your consultation"
                    />
                  </motion.div>
                )}

                {/* Step 3: Specific Needs */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <FormField
                      label="Expected Timeline"
                      name="timeline"
                      type="radio-group"
                      value={formData.timeline}
                      onChange={(value) => updateFormData('timeline', value)}
                      required
                      options={[
                        { value: 'immediate', label: 'Immediate', description: 'Need to start within 30 days' },
                        { value: 'quarter', label: 'This Quarter', description: 'Within the next 3 months' },
                        { value: 'halfyear', label: 'Next 6 Months', description: 'Planning for H1/H2' },
                        { value: 'exploring', label: 'Just Exploring', description: 'Researching options' },
                      ]}
                      error={errors.timeline}
                    />
                    <FormField
                      label="Budget Range (Optional)"
                      name="budget"
                      type="select"
                      value={formData.budget}
                      onChange={(value) => updateFormData('budget', value)}
                      options={[
                        { value: '', label: 'Prefer not to say' },
                        { value: '<50k', label: 'Under $50,000' },
                        { value: '50k-100k', label: '$50,000 - $100,000' },
                        { value: '100k-250k', label: '$100,000 - $250,000' },
                        { value: '250k-500k', label: '$250,000 - $500,000' },
                        { value: '500k+', label: 'Over $500,000' },
                      ]}
                      helpText="This helps us recommend solutions within your range"
                    />
                    <FormField
                      label="What specific outcomes are you looking to achieve?"
                      name="specificGoals"
                      type="textarea"
                      value={formData.specificGoals}
                      onChange={(value) => updateFormData('specificGoals', value)}
                      required
                      placeholder="E.g., Reduce time-to-productivity by 50%, build AI capabilities across 500 engineers..."
                      rows={3}
                      maxLength={300}
                      error={errors.specificGoals}
                    />
                    <FormField
                      label="How did you hear about SmartSlate?"
                      name="howDidYouHear"
                      type="select"
                      value={formData.howDidYouHear}
                      onChange={(value) => updateFormData('howDidYouHear', value)}
                      options={[
                        { value: '', label: 'Select an option' },
                        { value: 'search', label: 'Search Engine' },
                        { value: 'social', label: 'Social Media' },
                        { value: 'referral', label: 'Referral' },
                        { value: 'event', label: 'Event/Conference' },
                        { value: 'other', label: 'Other' },
                      ]}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Fixed Footer with Navigation Buttons */}
            <div className="border-t border-white/10 p-4 sm:p-6 bg-background-dark/50 backdrop-blur-sm">
              <div className="flex justify-between">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn btn-tertiary"
                  >
                    Back
                  </button>
                )}
                <div className={`flex gap-3 ${currentStep === 1 ? 'ml-auto' : ''}`}>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn btn-tertiary"
                  >
                    Cancel
                  </button>
                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn btn-primary btn-lg"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-secondary btn-lg"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Submit Request'
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
