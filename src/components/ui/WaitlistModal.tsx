'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, FormEvent } from 'react';
import Modal from '@/components/ui/Modal';
import FormField from '@/components/ui/FormField';
import { useWaitlistModal } from '@/hooks/useWaitlistModal';

export default function WaitlistModal() {
  const { isOpen, source, courseName, closeModal } = useWaitlistModal();
  
  const [formData, setFormData] = useState({
    // Contact Information
    name: '',
    email: '',
    phone: '',
    // Professional Context
    company: '',
    role: '',
    industry: '',
    companySize: '',
    location: '',
    // Waitlist Details
    interestLevel: '',
    learningGoals: '',
    preferredStartDate: '',
    learningFormat: '',
    experienceLevel: '',
    // Business Context
    teamSize: '',
    budgetRange: '',
    timeline: '',
    // Additional Information
    referralSource: '',
    howDidYouHear: '',
    additionalInfo: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const interestLevelOptions = [
    { value: 'very-high', label: 'Very High - Ready to start immediately' },
    { value: 'high', label: 'High - Planning to start within 3 months' },
    { value: 'medium', label: 'Medium - Interested, but not urgent' },
    { value: 'low', label: 'Low - Just exploring options' },
  ];

  const learningFormatOptions = [
    { value: 'self-paced', label: 'Self-paced online learning' },
    { value: 'live-online', label: 'Live online sessions' },
    { value: 'hybrid', label: 'Hybrid (online + in-person)' },
    { value: 'corporate', label: 'Corporate training program' },
    { value: 'not-sure', label: 'Not sure yet' },
  ];

  const experienceLevelOptions = [
    { value: 'beginner', label: 'Beginner - New to the field' },
    { value: 'intermediate', label: 'Intermediate - Some experience' },
    { value: 'advanced', label: 'Advanced - Experienced professional' },
    { value: 'expert', label: 'Expert - Looking to specialize further' },
  ];

  const companySizeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '501-1000', label: '501-1000 employees' },
    { value: '1000+', label: '1000+ employees' },
  ];

  const budgetRangeOptions = [
    { value: 'under-5k', label: 'Under $5,000' },
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-50k', label: '$15,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: '100k+', label: '$100,000+' },
    { value: 'not-sure', label: 'Not sure yet' },
  ];

  const timelineOptions = [
    { value: 'immediate', label: 'Immediate - Start right away' },
    { value: '1-3-months', label: '1-3 months' },
    { value: '3-6-months', label: '3-6 months' },
    { value: '6-12-months', label: '6-12 months' },
    { value: '12+months', label: '12+ months' },
    { value: 'not-sure', label: 'Not sure yet' },
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.interestLevel) newErrors.interestLevel = 'Please select your interest level';
    if (!formData.learningGoals) newErrors.learningGoals = 'Please share your learning goals';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/leads/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          source,
          courseName,
        }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to submit');
      }
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
        industry: '',
        companySize: '',
        location: '',
        interestLevel: '',
        learningGoals: '',
        preferredStartDate: '',
        learningFormat: '',
        experienceLevel: '',
        teamSize: '',
        budgetRange: '',
        timeline: '',
        referralSource: '',
        howDidYouHear: '',
        additionalInfo: '',
      });
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

  const getSourceDisplayName = () => {
    if (courseName) {
      return `${source} - ${courseName}`;
    }
    return source;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      maxWidth="lg"
      labelledById="waitlist-modal-title"
      describedById="waitlist-modal-subtitle"
      initialFocusSelector="#name"
    >
      <div className="flex flex-col h-full max-h-[90vh]">
        {/* Header - Fixed */}
        <div className="text-center p-4 sm:p-6 pb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-full mb-4"
          >
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
          </motion.div>
          <h2 id="waitlist-modal-title" className="text-xl md:text-2xl font-bold mb-2">
            Join the Waitlist
          </h2>
          <p id="waitlist-modal-subtitle" className="text-secondary text-sm max-w-md mx-auto">
            Be among the first to access {getSourceDisplayName()}
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
            <h3 className="text-2xl font-semibold mb-3">You're on the List!</h3>
            <p className="text-secondary mb-2">We'll notify you as soon as {getSourceDisplayName()} is available.</p>
            <p className="text-sm text-secondary/70">
              Check your inbox for updates and exclusive early access offers.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-400 border-b border-white/10 pb-2">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={(value) => updateFormData('name', value)}
                    required
                    placeholder="Amit Sharma"
                    error={errors.name}
                  />
                  <FormField
                    label="Work Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(value) => updateFormData('email', value)}
                    required
                    placeholder="amit@company.in"
                    error={errors.email}
                  />
                  <FormField
                    label="Phone (Optional)"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(value) => updateFormData('phone', value)}
                    placeholder="+91 98765 43210"
                  />
                  <FormField
                    label="Company (Optional)"
                    name="company"
                    value={formData.company}
                    onChange={(value) => updateFormData('company', value)}
                    placeholder="Your Company"
                  />
                </div>
              </div>

              {/* Professional Context */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-400 border-b border-white/10 pb-2">
                  Professional Context
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Your Role"
                    name="role"
                    value={formData.role}
                    onChange={(value) => updateFormData('role', value)}
                    placeholder="Software Engineer, Manager, etc."
                  />
                  <FormField
                    label="Industry"
                    name="industry"
                    value={formData.industry}
                    onChange={(value) => updateFormData('industry', value)}
                    placeholder="Technology, Healthcare, Finance, etc."
                  />
                  <FormField
                    label="Company Size"
                    name="companySize"
                    type="select"
                    value={formData.companySize}
                    onChange={(value) => updateFormData('companySize', value)}
                    options={companySizeOptions}
                    placeholder="Select company size"
                  />
                  <FormField
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={(value) => updateFormData('location', value)}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              {/* Waitlist Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-400 border-b border-white/10 pb-2">
                  Your Interest
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Interest Level"
                    name="interestLevel"
                    type="select"
                    value={formData.interestLevel}
                    onChange={(value) => updateFormData('interestLevel', value)}
                    required
                    options={interestLevelOptions}
                    placeholder="Select your interest level"
                    error={errors.interestLevel}
                  />
                  <FormField
                    label="Preferred Start Date"
                    name="preferredStartDate"
                    type="text"
                    value={formData.preferredStartDate}
                    onChange={(value) => updateFormData('preferredStartDate', value)}
                    placeholder="e.g., Next month, Q2 2024"
                  />
                  <FormField
                    label="Learning Format"
                    name="learningFormat"
                    type="select"
                    value={formData.learningFormat}
                    onChange={(value) => updateFormData('learningFormat', value)}
                    options={learningFormatOptions}
                    placeholder="Select preferred format"
                  />
                  <FormField
                    label="Experience Level"
                    name="experienceLevel"
                    type="select"
                    value={formData.experienceLevel}
                    onChange={(value) => updateFormData('experienceLevel', value)}
                    options={experienceLevelOptions}
                    placeholder="Select your experience level"
                  />
                </div>
                <FormField
                  label="Learning Goals"
                  name="learningGoals"
                  type="textarea"
                  value={formData.learningGoals}
                  onChange={(value) => updateFormData('learningGoals', value)}
                  required
                  placeholder="What do you hope to achieve? What skills are you looking to develop?"
                  error={errors.learningGoals}
                  rows={3}
                />
              </div>

              {/* Business Context */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-400 border-b border-white/10 pb-2">
                  Business Context
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Team Size"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={(value) => updateFormData('teamSize', value)}
                    placeholder="e.g., 5 people, 20 people"
                  />
                  <FormField
                    label="Budget Range"
                    name="budgetRange"
                    type="select"
                    value={formData.budgetRange}
                    onChange={(value) => updateFormData('budgetRange', value)}
                    options={budgetRangeOptions}
                    placeholder="Select budget range"
                  />
                  <FormField
                    label="Timeline"
                    name="timeline"
                    type="select"
                    value={formData.timeline}
                    onChange={(value) => updateFormData('timeline', value)}
                    options={timelineOptions}
                    placeholder="Select timeline"
                  />
                  <FormField
                    label="Referral Source"
                    name="referralSource"
                    value={formData.referralSource}
                    onChange={(value) => updateFormData('referralSource', value)}
                    placeholder="How did you find us?"
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-indigo-400 border-b border-white/10 pb-2">
                  Additional Information
                </h3>
                <FormField
                  label="How did you hear about us?"
                  name="howDidYouHear"
                  value={formData.howDidYouHear}
                  onChange={(value) => updateFormData('howDidYouHear', value)}
                  placeholder="Social media, search, referral, etc."
                />
                <FormField
                  label="Additional Information"
                  name="additionalInfo"
                  type="textarea"
                  value={formData.additionalInfo}
                  onChange={(value) => updateFormData('additionalInfo', value)}
                  placeholder="Any other details you'd like to share..."
                  rows={3}
                />
              </div>
            </div>

            {/* Footer - Fixed */}
            <div className="border-t border-white/10 p-4 sm:p-6 pt-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 text-secondary border border-white/20 rounded-lg hover:bg-white/5 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Joining Waitlist...
                    </span>
                  ) : (
                    'Join Waitlist'
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
