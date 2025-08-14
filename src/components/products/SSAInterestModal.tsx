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
    // Step 1: Contact & Company Information
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    department: '',
    companySize: '',
    industry: '',
    location: '',
    
    // Step 2: Current State & Challenges
    currentChallenges: '',
    skillGaps: [] as string[],
    existingLMS: '',
    currentTrainingBudget: '',
    employeeCount: '',
    targetAudience: '',
    
    // Step 3: SSA Requirements & Goals
    primaryGoals: [] as string[],
    timeline: '',
    budget: '',
    specificOutcomes: '',
    technicalRequirements: '',
    integrationNeeds: '',
    
    // Step 4: Additional Context
    decisionMakers: '',
    competingPriorities: '',
    successMetrics: '',
    howDidYouHear: '',
    additionalNotes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 4;

  const skillGapOptions = [
    { id: 'technical-skills', name: 'Technical Skills (AI/ML, Cloud, DevOps)', description: 'Programming, data science, infrastructure' },
    { id: 'leadership', name: 'Leadership & Management', description: 'Team management, strategic thinking, decision-making' },
    { id: 'soft-skills', name: 'Soft Skills & Communication', description: 'Communication, collaboration, problem-solving' },
    { id: 'domain-expertise', name: 'Domain-Specific Knowledge', description: 'Industry-specific skills and knowledge' },
    { id: 'digital-transformation', name: 'Digital Transformation', description: 'Digital literacy, change management' },
    { id: 'compliance', name: 'Compliance & Regulatory', description: 'Industry regulations, safety protocols' },
  ];

  const primaryGoalOptions = [
    { id: 'reduce-attrition', name: 'Reduce Employee Attrition', description: 'Improve retention through upskilling' },
    { id: 'fill-skills-gaps', name: 'Fill Critical Skills Gaps', description: 'Address immediate skill shortages' },
    { id: 'improve-productivity', name: 'Improve Productivity & Performance', description: 'Enhance team efficiency and output' },
    { id: 'digital-transformation', name: 'Support Digital Transformation', description: 'Enable organizational change' },
    { id: 'compliance-training', name: 'Ensure Compliance & Safety', description: 'Meet regulatory requirements' },
    { id: 'career-development', name: 'Career Development & Growth', description: 'Support employee advancement' },
    { id: 'competitive-advantage', name: 'Gain Competitive Advantage', description: 'Differentiate through learning' },
    { id: 'cost-reduction', name: 'Reduce Training Costs', description: 'Optimize learning investment' },
  ];

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
      if (!formData.companySize) newErrors.companySize = 'Company size is required';
      if (!formData.industry) newErrors.industry = 'Industry is required';
    } else if (step === 2) {
      if (!formData.currentChallenges) newErrors.currentChallenges = 'Please describe your challenges';
      if (formData.skillGaps.length === 0) newErrors.skillGaps = 'Please select at least one skill gap';
      if (!formData.targetAudience) newErrors.targetAudience = 'Target audience is required';
    } else if (step === 3) {
      if (formData.primaryGoals.length === 0) newErrors.primaryGoals = 'Please select at least one primary goal';
      if (!formData.timeline) newErrors.timeline = 'Timeline is required';
      if (!formData.specificOutcomes) newErrors.specificOutcomes = 'Please describe your desired outcomes';
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
      const res = await fetch('/api/leads/ssa', {
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
        name: '',
        email: '',
        phone: '',
        company: '',
        role: '',
        department: '',
        companySize: '',
        industry: '',
        location: '',
        currentChallenges: '',
        skillGaps: [],
        existingLMS: '',
        currentTrainingBudget: '',
        employeeCount: '',
        targetAudience: '',
        primaryGoals: [],
        timeline: '',
        budget: '',
        specificOutcomes: '',
        technicalRequirements: '',
        integrationNeeds: '',
        decisionMakers: '',
        competingPriorities: '',
        successMetrics: '',
        howDidYouHear: '',
        additionalNotes: '',
      });
      setCurrentStep(1);
      setIsSuccess(false);
      closeModal();
    }, 3000);
  };

  const updateFormData = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleArrayField = (field: 'skillGaps' | 'primaryGoals', value: string) => {
    const currentValues = formData[field];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    updateFormData(field, newValues);
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-1.227l.128-.054a2 2 0 012.115 0l.128.054c.55.22 1.02.685 1.11 1.227l.068.416a2 2 0 001.943 1.542l.433-.064a2 2 0 012.23 2.23l-.064.433a2 2 0 001.542 1.943l.416.068c.542.09 1.007.56 1.227 1.11l.054.128a2 2 0 010 2.115l-.054.128c-.22.55-.685 1.02-1.227 1.11l-.416.068a2 2 0 00-1.542 1.943l.064.433a2 2 0 01-2.23 2.23l-.433-.064a2 2 0 00-1.943 1.542l-.068.416c-.09.542-.56 1.007-1.11 1.227l-.128.054a2 2 0 01-2.115 0l-.128-.054c-.55-.22-1.02-.685-1.11-1.227l-.068-.416a2 2 0 00-1.943-1.542l-.433.064a2 2 0 01-2.23-2.23l.064-.433a2 2 0 00-1.542-1.943l-.416-.068c-.542-.09-1.007-.56-1.227-1.11l-.054-.128a2 2 0 010-2.115l.054.128c.22-.55.685-1.02 1.227-1.11l.416-.068a2 2 0 001.542-1.943l-.064-.433a2 2 0 012.23-2.23l.433.064a2 2 0 001.943-1.542l.068-.416zM12 15a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
          </motion.div>
          <h2 id="ssa-modal-title" className="text-xl md:text-2xl font-bold mb-2">
            Strategic Skills Architecture
          </h2>
          <p id="ssa-modal-subtitle" className="text-secondary text-sm max-w-md mx-auto">
            Let&apos;s architect a custom learning solution that transforms your organization&apos;s unique challenges into competitive advantages
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
            <p className="text-secondary mb-2">Your SSA consultation request has been received.</p>
            <p className="text-sm text-secondary/70">
              Our enterprise solutions team will reach out within 24 hours to schedule your architecture session.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-6">
                {[1, 2, 3, 4].map((step) => (
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
                    {step < 4 && (
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
                  Company Info
                </span>
                <span className={`text-xs ${currentStep >= 2 ? 'text-primary-accent' : 'text-secondary'}`}>
                  Current State
                </span>
                <span className={`text-xs ${currentStep >= 3 ? 'text-primary-accent' : 'text-secondary'}`}>
                  SSA Goals
                </span>
                <span className={`text-xs ${currentStep >= 4 ? 'text-primary-accent' : 'text-secondary'}`}>
                  Context
                </span>
              </div>

              <AnimatePresence mode="wait">
                {/* Step 1: Contact & Company Information */}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <FormField
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={(value) => updateFormData('department', value)}
                        placeholder="HR, IT, Operations, etc."
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                          { value: 'energy', label: 'Energy & Utilities' },
                          { value: 'government', label: 'Government' },
                          { value: 'other', label: 'Other' },
                        ]}
                        error={errors.industry}
                      />
                      <FormField
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={(value) => updateFormData('location', value)}
                        placeholder="City, Country"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Current State & Challenges */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <FormField
                      label="What are your primary talent challenges?"
                      name="currentChallenges"
                      type="textarea"
                      value={formData.currentChallenges}
                      onChange={(value) => updateFormData('currentChallenges', value)}
                      required
                      placeholder="E.g., High attrition in technical roles, skills gaps in AI/ML, difficulty scaling teams, compliance training needs..."
                      rows={4}
                      maxLength={500}
                      error={errors.currentChallenges}
                      helpText="Be specific - this helps us understand your unique situation"
                    />

                    <div>
                      <label className="block text-sm font-medium mb-3">
                        What skill gaps are you looking to address? <span className="text-red-400">*</span>
                      </label>
                      <div className="space-y-2">
                        {skillGapOptions.map((option) => (
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
                              ${formData.skillGaps.includes(option.id) ? 'border-primary-accent bg-primary-accent/10' : ''}
                            `}
                          >
                            <input
                              type="checkbox"
                              checked={formData.skillGaps.includes(option.id)}
                              onChange={() => toggleArrayField('skillGaps', option.id)}
                              className="mt-2 mr-3 w-4 h-4 text-primary-accent focus:ring-primary-accent focus:ring-2"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-primary">{option.name}</div>
                              <div className="text-sm text-secondary">{option.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                      {errors.skillGaps && (
                        <p className="text-sm text-red-400 mt-2">{errors.skillGaps}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Do you have an existing LMS?"
                        name="existingLMS"
                        type="select"
                        value={formData.existingLMS}
                        onChange={(value) => updateFormData('existingLMS', value)}
                        options={[
                          { value: '', label: 'Select an option' },
                          { value: 'none', label: 'No LMS currently' },
                          { value: 'workday', label: 'Workday' },
                          { value: 'cornerstone', label: 'Cornerstone OnDemand' },
                          { value: 'saba', label: 'Saba' },
                          { value: 'successfactors', label: 'SuccessFactors' },
                          { value: 'taleo', label: 'Oracle Taleo' },
                          { value: 'other', label: 'Other' },
                        ]}
                        helpText="This helps us plan integration requirements"
                      />
                      <FormField
                        label="Current Annual Training Budget"
                        name="currentTrainingBudget"
                        type="select"
                        value={formData.currentTrainingBudget}
                        onChange={(value) => updateFormData('currentTrainingBudget', value)}
                        options={[
                          { value: '', label: 'Select an option' },
                          { value: '<100k', label: 'Under $100,000' },
                          { value: '100k-500k', label: '$100,000 - $500,000' },
                          { value: '500k-1m', label: '$500,000 - $1M' },
                          { value: '1m-5m', label: '$1M - $5M' },
                          { value: '5m+', label: 'Over $5M' },
                        ]}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Number of Employees to Train"
                        name="employeeCount"
                        value={formData.employeeCount}
                        onChange={(value) => updateFormData('employeeCount', value)}
                        placeholder="E.g., 500, 1000-2000"
                        helpText="Approximate number of employees who need training"
                      />
                      <FormField
                        label="Primary Target Audience"
                        name="targetAudience"
                        type="select"
                        value={formData.targetAudience}
                        onChange={(value) => updateFormData('targetAudience', value)}
                        required
                        options={[
                          { value: '', label: 'Select primary audience' },
                          { value: 'technical', label: 'Technical Teams (Engineers, Developers)' },
                          { value: 'management', label: 'Management & Leadership' },
                          { value: 'sales', label: 'Sales & Customer Success' },
                          { value: 'operations', label: 'Operations & Support' },
                          { value: 'all-employees', label: 'All Employees' },
                          { value: 'new-hires', label: 'New Hires & Onboarding' },
                          { value: 'other', label: 'Other' },
                        ]}
                        error={errors.targetAudience}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: SSA Requirements & Goals */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium mb-3">
                        What are your primary goals for this SSA initiative? <span className="text-red-400">*</span>
                      </label>
                      <div className="space-y-2">
                        {primaryGoalOptions.map((option) => (
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
                              ${formData.primaryGoals.includes(option.id) ? 'border-primary-accent bg-primary-accent/10' : ''}
                            `}
                          >
                            <input
                              type="checkbox"
                              checked={formData.primaryGoals.includes(option.id)}
                              onChange={() => toggleArrayField('primaryGoals', option.id)}
                              className="mt-2 mr-3 w-4 h-4 text-primary-accent focus:ring-primary-accent focus:ring-2"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-primary">{option.name}</div>
                              <div className="text-sm text-secondary">{option.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                      {errors.primaryGoals && (
                        <p className="text-sm text-red-400 mt-2">{errors.primaryGoals}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          { value: 'year', label: 'Next 12 Months', description: 'Strategic planning phase' },
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
                          { value: '<100k', label: 'Under $100,000' },
                          { value: '100k-250k', label: '$100,000 - $250,000' },
                          { value: '250k-500k', label: '$250,000 - $500,000' },
                          { value: '500k-1m', label: '$500,000 - $1M' },
                          { value: '1m+', label: 'Over $1M' },
                        ]}
                        helpText="This helps us recommend solutions within your range"
                      />
                    </div>

                    <FormField
                      label="What specific outcomes are you looking to achieve?"
                      name="specificOutcomes"
                      type="textarea"
                      value={formData.specificOutcomes}
                      onChange={(value) => updateFormData('specificOutcomes', value)}
                      required
                      placeholder="E.g., Reduce time-to-productivity by 50%, build AI capabilities across 500 engineers, improve retention by 25%..."
                      rows={3}
                      maxLength={300}
                      error={errors.specificOutcomes}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Technical Requirements"
                        name="technicalRequirements"
                        type="textarea"
                        value={formData.technicalRequirements}
                        onChange={(value) => updateFormData('technicalRequirements', value)}
                        placeholder="E.g., SSO integration, mobile compatibility, API requirements..."
                        rows={3}
                        maxLength={200}
                        helpText="Any specific technical needs or constraints"
                      />
                      <FormField
                        label="Integration Needs"
                        name="integrationNeeds"
                        type="textarea"
                        value={formData.integrationNeeds}
                        onChange={(value) => updateFormData('integrationNeeds', value)}
                        placeholder="E.g., HRIS integration, CRM connection, analytics tools..."
                        rows={3}
                        maxLength={200}
                        helpText="Systems you need to connect with"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Additional Context */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Key Decision Makers"
                        name="decisionMakers"
                        value={formData.decisionMakers}
                        onChange={(value) => updateFormData('decisionMakers', value)}
                        placeholder="E.g., CTO, VP of HR, Head of L&D"
                        helpText="Who else should be involved in the consultation"
                      />
                      <FormField
                        label="Competing Priorities"
                        name="competingPriorities"
                        type="textarea"
                        value={formData.competingPriorities}
                        onChange={(value) => updateFormData('competingPriorities', value)}
                        placeholder="E.g., Digital transformation, cost reduction, compliance..."
                        rows={2}
                        maxLength={200}
                        helpText="Other initiatives that might impact this project"
                      />
                    </div>

                    <FormField
                      label="Success Metrics"
                      name="successMetrics"
                      type="textarea"
                      value={formData.successMetrics}
                      onChange={(value) => updateFormData('successMetrics', value)}
                      placeholder="E.g., 90% completion rates, 25% skill improvement, 40% reduction in time-to-productivity..."
                      rows={3}
                      maxLength={300}
                      helpText="How will you measure the success of this initiative"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        placeholder="Any other information that would be helpful..."
                        rows={3}
                        maxLength={300}
                      />
                    </div>
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
                        'Request SSA Consultation'
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
