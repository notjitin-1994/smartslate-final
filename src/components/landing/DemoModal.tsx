'use client';

import { motion } from 'framer-motion';
import { useState, FormEvent } from 'react';
import Modal from '@/components/ui/Modal';
import FormField from '@/components/ui/FormField';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
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
    
    // Step 2: Demo Preferences & Scheduling
    demoType: '',
    preferredDate: '',
    preferredTime: '',
    timezone: '',
    demoDuration: '60 minutes',
    attendeesCount: '',
    attendeeRoles: [] as string[],
    
    // Step 3: Business Context & Challenges
    currentChallenges: '',
    teamSize: '',
    budgetRange: '',
    timeline: '',
    decisionMakers: '',
    implementationScope: '',
    
    // Step 4: Product Interest & Features
    productInterest: [] as string[],
    specificFeatures: [] as string[],
    useCase: '',
    integrationNeeds: [] as string[],
    
    // Step 5: Current State & Requirements
    currentLMS: '',
    currentTools: [] as string[],
    learningGoals: '',
    successMetrics: '',
    complianceNeeds: [] as string[],
    
    // Step 6: Additional Context
    howDidYouHear: '',
    competitiveAnalysis: '',
    additionalNotes: '',
    urgencyLevel: 'normal',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const featureOptions = [
    { id: 'ai-courses', name: 'AI & ML Courses', description: 'Advanced AI literacy and technical skills' },
    { id: 'cloud-devops', name: 'Cloud & DevOps', description: 'AWS, Azure, and DevOps practices' },
    { id: 'leadership', name: 'Leadership Development', description: 'Executive and management training' },
    { id: 'custom-learning', name: 'Custom Learning Paths', description: 'Tailored curriculum design' },
    { id: 'analytics', name: 'Learning Analytics', description: 'Progress tracking and insights' },
    { id: 'integration', name: 'System Integration', description: 'HRIS and LMS integration' },
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.company) newErrors.company = 'Company is required';
    if (!formData.demoType) newErrors.demoType = 'Please select a demo type';
    if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required';
    if (!formData.preferredTime) newErrors.preferredTime = 'Preferred time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Map specificFeatures to productInterest for API compatibility
      const submissionData = {
        ...formData,
        productInterest: formData.specificFeatures
      };

      const res = await fetch('/api/leads/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(submissionData),
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
        industry: '',
        companySize: '',
        location: '',
        demoType: '',
        preferredDate: '',
        preferredTime: '',
        timezone: '',
        demoDuration: '60 minutes',
        attendeesCount: '',
        attendeeRoles: [],
        currentChallenges: '',
        teamSize: '',
        budgetRange: '',
        timeline: '',
        decisionMakers: '',
        implementationScope: '',
        productInterest: [],
        specificFeatures: [],
        useCase: '',
        integrationNeeds: [],
        currentLMS: '',
        currentTools: [],
        learningGoals: '',
        successMetrics: '',
        complianceNeeds: [],
        howDidYouHear: '',
        competitiveAnalysis: '',
        additionalNotes: '',
        urgencyLevel: 'normal',
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

  const toggleFeature = (feature: string) => {
    const currentFeatures = formData.specificFeatures;
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature];
    updateFormData('specificFeatures', newFeatures);
  };

  // Generate time slots for the next 7 days
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    
    for (let hour = startHour; hour <= endHour; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      slots.push({ value: time, label: time });
    }
    return slots;
  };

  // Generate date options for the next 14 days
  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        const formattedDate = date.toISOString().split('T')[0];
        const displayDate = date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
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
      labelledById="demo-modal-title"
      describedById="demo-modal-subtitle"
      initialFocusSelector="#name"
    >
      <div className="flex flex-col h-full max-h-[90vh]">
        {/* Header - Fixed */}
        <div className="text-center p-4 sm:p-6 pb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-accent to-primary-accent-dark rounded-full mb-4"
          >
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </motion.div>
          <h2 id="demo-modal-title" className="text-xl md:text-2xl font-bold mb-2">
            Schedule Your Demo
          </h2>
          <p id="demo-modal-subtitle" className="text-secondary text-sm max-w-md mx-auto">
            See Smartslate in action and discover how it can transform your workforce development
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
            <h3 className="text-2xl font-semibold mb-3">Demo Scheduled Successfully!</h3>
            <p className="text-secondary mb-2">We&apos;ve received your demo request.</p>
            <p className="text-sm text-secondary/70">
              Our team will contact you within 24 hours to confirm your demo time and prepare a personalized experience.
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

              {/* Professional Context */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Your Role"
                  name="role"
                  value={formData.role}
                  onChange={(value) => updateFormData('role', value)}
                  placeholder="Head of L&D, HR Director, etc."
                />
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
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Company Size"
                  name="companySize"
                  type="select"
                  value={formData.companySize}
                  onChange={(value) => updateFormData('companySize', value)}
                  options={[
                    { value: '', label: 'Select company size' },
                    { value: '1-50', label: '1-50 employees' },
                    { value: '51-200', label: '51-200 employees' },
                    { value: '201-1000', label: '201-1,000 employees' },
                    { value: '1001-5000', label: '1,001-5,000 employees' },
                    { value: '5000+', label: '5,000+ employees' },
                  ]}
                />
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
              </div>

              {/* Demo Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Demo Type"
                  name="demoType"
                  type="radio-group"
                  value={formData.demoType}
                  onChange={(value) => updateFormData('demoType', value)}
                  required
                  options={[
                    { value: 'platform-overview', label: 'Platform Overview', description: 'General platform walkthrough' },
                    { value: 'custom-demo', label: 'Custom Demo', description: 'Tailored to your specific needs' },
                    { value: 'technical-deep-dive', label: 'Technical Deep Dive', description: 'Advanced features and integration' },
                    { value: 'roi-workshop', label: 'ROI Workshop', description: 'Business case and ROI analysis' },
                  ]}
                  error={errors.demoType}
                />
                <FormField
                  label="Timeline for Implementation"
                  name="timeline"
                  type="select"
                  value={formData.timeline}
                  onChange={(value) => updateFormData('timeline', value)}
                  options={[
                    { value: '', label: 'Select timeline' },
                    { value: 'immediate', label: 'Immediate (within 30 days)' },
                    { value: '1-3-months', label: '1-3 months' },
                    { value: '3-6-months', label: '3-6 months' },
                    { value: '6+months', label: '6+ months' },
                    { value: 'exploring', label: 'Just exploring options' },
                  ]}
                />
              </div>

              {/* Scheduling */}
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

              {/* Business Context */}
              <FormField
                label="What challenges are you looking to solve?"
                name="currentChallenges"
                type="textarea"
                value={formData.currentChallenges}
                onChange={(value) => updateFormData('currentChallenges', value)}
                placeholder="E.g., High attrition, skills gaps, slow onboarding, compliance training needs..."
                rows={3}
                maxLength={300}
                helpText="This helps us tailor the demo to your specific needs"
              />

              <FormField
                label="Budget Range (Optional)"
                name="budget"
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
                helpText="This helps us recommend the right solution tier"
              />

              {/* Specific Features */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Which features interest you most? (select all that apply)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {featureOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`
                        flex items-start p-3
                        bg-white/5 backdrop-blur-sm
                        border border-white/10
                        rounded-lg cursor-pointer
                        transition-all duration-200
                        hover:bg-white/10 hover:border-white/20
                        min-h-[48px]
                        ${formData.specificFeatures.includes(option.id) ? 'border-primary-accent bg-primary-accent/10' : ''}
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={formData.specificFeatures.includes(option.id)}
                        onChange={() => toggleFeature(option.id)}
                        className="mt-2 mr-3 w-4 h-4 text-primary-accent focus:ring-primary-accent focus:ring-2"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-primary text-sm">{option.name}</div>
                        <div className="text-xs text-secondary">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Notes */}
              <FormField
                label="Additional Notes or Questions"
                name="additionalNotes"
                type="textarea"
                value={formData.additionalNotes}
                onChange={(value) => updateFormData('additionalNotes', value)}
                placeholder="Any specific questions, requirements, or additional context..."
                rows={3}
                maxLength={500}
                helpText="Optional: Share any additional details that will help us prepare a better demo"
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
                      Scheduling Demo...
                    </span>
                  ) : (
                    'Schedule Demo'
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
