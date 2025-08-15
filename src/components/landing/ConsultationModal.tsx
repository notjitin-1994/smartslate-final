'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useConsultationModal } from '@/hooks/useConsultationModal';
import { useState, FormEvent } from 'react';
import Modal from '@/components/ui/Modal';
import FormField from '@/components/ui/FormField';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Contact & Professional Information
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    department: '',
    industry: '',
    companySize: '',
    location: '',
    
    // Step 2: Consultation Preferences & Scheduling
    consultationType: '',
    preferredDate: '',
    preferredTime: '',
    timezone: '',
    consultationDuration: '60 minutes',
    attendeesCount: '',
    attendeeRoles: [] as string[],
    urgencyLevel: 'normal',
    
    // Step 3: Business Context & Challenges
    primaryChallenge: '',
    secondaryChallenges: [] as string[],
    teamSize: '',
    budgetRange: '',
    timeline: '',
    decisionMakers: '',
    implementationScope: '',
    
    // Step 4: Service Interest & Requirements
    serviceInterest: [] as string[],
    specificRequirements: [] as string[],
    useCase: '',
    integrationNeeds: [] as string[],
    complianceNeeds: [] as string[],
    
    // Step 5: Current State & Goals
    currentLMS: '',
    currentTools: [] as string[],
    learningGoals: '',
    successMetrics: '',
    painPoints: '',
    desiredOutcomes: '',
    
    // Step 6: Additional Context
    howDidYouHear: '',
    competitiveAnalysis: '',
    additionalNotes: '',
    referralSource: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 6;

  const consultationTypeOptions = [
    { value: 'strategic-assessment', label: 'Strategic Assessment', description: 'Comprehensive evaluation of your learning strategy' },
    { value: 'ssa-consultation', label: 'SSA Consultation', description: 'Strategic Skills Architecture planning' },
    { value: 'solara-exploration', label: 'Solara Platform Exploration', description: 'AI-powered learning platform consultation' },
    { value: 'implementation-planning', label: 'Implementation Planning', description: 'Roadmap for successful deployment' },
    { value: 'roi-analysis', label: 'ROI & Business Case Analysis', description: 'Financial impact and business justification' },
    { value: 'custom-solution', label: 'Custom Solution Design', description: 'Tailored learning solution architecture' },
  ];

  const serviceInterestOptions = [
    { value: 'ignite-series', label: 'Ignite Series', description: 'Pre-built courses for talent pipeline' },
    { value: 'strategic-skills-architecture', label: 'Strategic Skills Architecture', description: 'Custom learning solutions' },
    { value: 'solara-platform', label: 'Solara Platform', description: 'AI-powered learning platform' },
    { value: 'custom-development', label: 'Custom Development', description: 'Tailored learning solutions' },
    { value: 'integration-services', label: 'Integration Services', description: 'LMS and system integration' },
    { value: 'training-services', label: 'Training Services', description: 'Implementation and change management' },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.company) newErrors.company = 'Company is required';
    } else if (step === 2) {
      if (!formData.consultationType) newErrors.consultationType = 'Consultation type is required';
      if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required';
      if (!formData.preferredTime) newErrors.preferredTime = 'Preferred time is required';
    } else if (step === 3) {
      if (!formData.primaryChallenge) newErrors.primaryChallenge = 'Primary challenge is required';
    } else if (step === 4) {
      if (formData.serviceInterest.length === 0) newErrors.serviceInterest = 'Please select at least one service';
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

    try {
      const res = await fetch('/api/leads/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to submit');
    } catch (err) {
      setIsSubmitting(false);
      alert('There was an error submitting your request. Please try again.');
      return;
    }

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form and close modal after success
    setTimeout(() => {
      setFormData({
        name: '', email: '', phone: '', company: '', role: '', department: '',
        industry: '', companySize: '', location: '', consultationType: '',
        preferredDate: '', preferredTime: '', timezone: '', consultationDuration: '60 minutes',
        attendeesCount: '', attendeeRoles: [], urgencyLevel: 'normal', primaryChallenge: '',
        secondaryChallenges: [], teamSize: '', budgetRange: '', timeline: '',
        decisionMakers: '', implementationScope: '', serviceInterest: [],
        specificRequirements: [], useCase: '', integrationNeeds: [], complianceNeeds: [],
        currentLMS: '', currentTools: [], learningGoals: '', successMetrics: '',
        painPoints: '', desiredOutcomes: '', howDidYouHear: '', competitiveAnalysis: '',
        additionalNotes: '', referralSource: '',
      });
      setCurrentStep(1);
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  const updateFormData = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleArrayField = (field: 'secondaryChallenges' | 'serviceInterest' | 'specificRequirements' | 'integrationNeeds' | 'complianceNeeds' | 'currentTools' | 'attendeeRoles', value: string) => {
    const currentValues = formData[field];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    updateFormData(field, newValues);
  };

  // Generate time slots and date options
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      slots.push({ value: time, label: time });
    }
    return slots;
  };

  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        const formattedDate = date.toISOString().split('T')[0];
        const displayDate = date.toLocaleDateString('en-US', { 
          weekday: 'short', month: 'short', day: 'numeric' 
        });
        dates.push({ value: formattedDate, label: displayDate });
      }
    }
    return dates;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      labelledById="consultation-modal-title"
      describedById="consultation-modal-subtitle"
      initialFocusSelector="#name"
    >
      <div className="flex flex-col h-full max-h-[90vh]">
        {/* Header */}
        <div className="text-center p-4 sm:p-6 pb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4"
          >
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </motion.div>
          <h2 id="consultation-modal-title" className="text-xl md:text-2xl font-bold mb-2">
            Schedule Your Consultation
          </h2>
          <p id="consultation-modal-subtitle" className="text-secondary text-sm max-w-md mx-auto">
            Let's discuss your learning challenges and explore how Smartslate can transform your workforce development
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
            <h3 className="text-2xl font-semibold mb-3">Consultation Request Submitted!</h3>
            <p className="text-secondary mb-2">We've received your consultation request.</p>
            <p className="text-sm text-secondary/70">
              Our team will contact you within 24 hours to confirm your consultation time.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-6 px-4 sm:px-6">
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <div key={step} className="flex-1 flex items-center">
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                      transition-all duration-300
                      ${currentStep >= step 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
                        : 'bg-white/10 text-secondary'
                      }
                    `}
                  >
                    {currentStep > step ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step
                    )}
                  </div>
                  {step < 6 && (
                    <div className={`
                      flex-1 h-1 mx-2 rounded-full transition-all duration-300
                      ${currentStep > step ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-white/10'}
                    `} />
                  )}
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 space-y-6">
              <AnimatePresence mode="wait">
                {/* Step 1: Contact Information */}
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
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(value) => updateFormData('phone', value)}
                        placeholder="+1 (555) 123-4567"
                      />
                      <FormField
                        label="Company"
                        name="company"
                        value={formData.company}
                        onChange={(value) => updateFormData('company', value)}
                        required
                        placeholder="Acme Corporation"
                        error={errors.company}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        label="Your Role"
                        name="role"
                        value={formData.role}
                        onChange={(value) => updateFormData('role', value)}
                        placeholder="Head of L&D"
                      />
                      <FormField
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={(value) => updateFormData('department', value)}
                        placeholder="HR, IT, Training"
                      />
                      <FormField
                        label="Company Size"
                        name="companySize"
                        type="select"
                        value={formData.companySize}
                        onChange={(value) => updateFormData('companySize', value)}
                        options={[
                          { value: '', label: 'Select size' },
                          { value: '1-50', label: '1-50 employees' },
                          { value: '51-200', label: '51-200 employees' },
                          { value: '201-1000', label: '201-1,000 employees' },
                          { value: '1001-5000', label: '1,001-5,000 employees' },
                          { value: '5000+', label: '5,000+ employees' },
                        ]}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Consultation Type & Scheduling */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <FormField
                      label="What type of consultation do you need?"
                      name="consultationType"
                      type="radio-group"
                      value={formData.consultationType}
                      onChange={(value) => updateFormData('consultationType', value)}
                      required
                      options={consultationTypeOptions}
                      error={errors.consultationType}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        label="Preferred Date"
                        name="preferredDate"
                        type="select"
                        value={formData.preferredDate}
                        onChange={(value) => updateFormData('preferredDate', value)}
                        required
                        options={[
                          { value: '', label: 'Select date' },
                          ...generateDateOptions()
                        ]}
                        error={errors.preferredDate}
                      />
                      <FormField
                        label="Preferred Time"
                        name="preferredTime"
                        type="select"
                        value={formData.preferredTime}
                        onChange={(value) => updateFormData('preferredTime', value)}
                        required
                        options={[
                          { value: '', label: 'Select time' },
                          ...generateTimeSlots()
                        ]}
                        error={errors.preferredTime}
                      />
                      <FormField
                        label="Timezone"
                        name="timezone"
                        type="select"
                        value={formData.timezone}
                        onChange={(value) => updateFormData('timezone', value)}
                        options={[
                          { value: '', label: 'Select timezone' },
                          { value: 'EST', label: 'Eastern Time (EST/EDT)' },
                          { value: 'CST', label: 'Central Time (CST/CDT)' },
                          { value: 'MST', label: 'Mountain Time (MST/MDT)' },
                          { value: 'PST', label: 'Pacific Time (PST/PDT)' },
                          { value: 'UTC', label: 'UTC' },
                          { value: 'other', label: 'Other' },
                        ]}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Business Challenges */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <FormField
                      label="What is your primary business challenge?"
                      name="primaryChallenge"
                      type="textarea"
                      value={formData.primaryChallenge}
                      onChange={(value) => updateFormData('primaryChallenge', value)}
                      required
                      placeholder="Describe your main challenge in detail..."
                      rows={3}
                      maxLength={300}
                      error={errors.primaryChallenge}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Team Size for Training"
                        name="teamSize"
                        type="select"
                        value={formData.teamSize}
                        onChange={(value) => updateFormData('teamSize', value)}
                        options={[
                          { value: '', label: 'Select team size' },
                          { value: '1-10', label: '1-10 people' },
                          { value: '11-50', label: '11-50 people' },
                          { value: '51-100', label: '51-100 people' },
                          { value: '100+', label: '100+ people' },
                        ]}
                      />
                      <FormField
                        label="Budget Range"
                        name="budgetRange"
                        type="select"
                        value={formData.budgetRange}
                        onChange={(value) => updateFormData('budgetRange', value)}
                        options={[
                          { value: '', label: 'Select budget range' },
                          { value: 'under-10k', label: 'Under $10,000' },
                          { value: '10k-25k', label: '$10,000 - $25,000' },
                          { value: '25k-50k', label: '$25,000 - $50,000' },
                          { value: '50k-100k', label: '$50,000 - $100,000' },
                          { value: '100k+', label: '$100,000+' },
                          { value: 'not-sure', label: 'Not sure yet' },
                        ]}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Service Interest */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Which Smartslate services interest you? <span className="text-red-400">*</span>
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {serviceInterestOptions.map((option) => (
                          <label
                            key={option.value}
                            className={`
                              flex items-start p-3
                              bg-white/5 backdrop-blur-sm
                              border border-white/10
                              rounded-lg cursor-pointer
                              transition-all duration-200
                              hover:bg-white/10 hover:border-white/20
                              min-h-[48px]
                              ${formData.serviceInterest.includes(option.value) ? 'border-blue-500 bg-blue-500/10' : ''}
                            `}
                          >
                            <input
                              type="checkbox"
                              checked={formData.serviceInterest.includes(option.value)}
                              onChange={() => toggleArrayField('serviceInterest', option.value)}
                              className="mt-2 mr-3 w-4 h-4 text-blue-500 focus:ring-blue-500 focus:ring-2"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-primary text-sm">{option.label}</div>
                              <div className="text-xs text-secondary">{option.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                      {errors.serviceInterest && (
                        <p className="mt-2 text-sm text-red-400">{errors.serviceInterest}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Current State */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <FormField
                      label="Current LMS (if any)"
                      name="currentLMS"
                      value={formData.currentLMS}
                      onChange={(value) => updateFormData('currentLMS', value)}
                      placeholder="Moodle, Canvas, Workday, etc."
                    />

                    <FormField
                      label="Learning Goals"
                      name="learningGoals"
                      type="textarea"
                      value={formData.learningGoals}
                      onChange={(value) => updateFormData('learningGoals', value)}
                      placeholder="What are your primary learning objectives?"
                      rows={3}
                      maxLength={300}
                    />

                    <FormField
                      label="Desired Outcomes"
                      name="desiredOutcomes"
                      type="textarea"
                      value={formData.desiredOutcomes}
                      onChange={(value) => updateFormData('desiredOutcomes', value)}
                      placeholder="What outcomes do you hope to achieve?"
                      rows={3}
                      maxLength={300}
                    />
                  </motion.div>
                )}

                {/* Step 6: Additional Context */}
                {currentStep === 6 && (
                  <motion.div
                    key="step6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <FormField
                      label="How did you hear about us?"
                      name="howDidYouHear"
                      type="select"
                      value={formData.howDidYouHear}
                      onChange={(value) => updateFormData('howDidYouHear', value)}
                      options={[
                        { value: '', label: 'Select source' },
                        { value: 'search', label: 'Search Engine' },
                        { value: 'social', label: 'Social Media' },
                        { value: 'referral', label: 'Referral' },
                        { value: 'event', label: 'Event/Conference' },
                        { value: 'linkedin', label: 'LinkedIn' },
                        { value: 'case-study', label: 'Case Study' },
                        { value: 'other', label: 'Other' },
                      ]}
                    />

                    <FormField
                      label="Additional Notes"
                      name="additionalNotes"
                      type="textarea"
                      value={formData.additionalNotes}
                      onChange={(value) => updateFormData('additionalNotes', value)}
                      placeholder="Any additional information that will help us prepare for the consultation..."
                      rows={4}
                      maxLength={500}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer with Navigation */}
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
                    onClick={onClose}
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
                        'Schedule Consultation'
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
