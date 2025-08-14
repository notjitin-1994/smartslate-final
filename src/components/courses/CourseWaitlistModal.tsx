'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, FormEvent } from 'react';
import Modal from '@/components/ui/Modal';
import FormField from '@/components/ui/FormField';

interface Course {
  title: string;
  description: string;
  status: string;
  statusColor: string;
  imageUrl: string;
  slug: string;
}

interface CourseWaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
}

export default function CourseWaitlistModal({ 
  isOpen, 
  onClose, 
  course
}: CourseWaitlistModalProps) {
  const courseName = course?.title.replace(/<[^>]*>/g, '') || 'AI Foundations';
  const discountPercentage = 30; // You can calculate this based on course data if needed
  
  const [formData, setFormData] = useState({
    // Contact Information
    name: '',
    email: '',
    phone: '',
    // Professional Context
    company: '',
    role: '',
    teamSize: '',
    // Learning Preferences
    learningGoals: '',
    preferredStartDate: '',
    learningFormat: '',
    // Additional Information
    experience: '',
    referralSource: '',
    additionalInfo: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.learningGoals) newErrors.learningGoals = 'Please share your learning goals';
    if (!formData.learningFormat) newErrors.learningFormat = 'Please select a learning format';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Backend removed; stub request
      const res = await fetch('/api/leads/course-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          courseSlug: course?.slug ?? null,
          courseName: courseName,
          ...formData,
        }),
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
        teamSize: '',
        learningGoals: '',
        preferredStartDate: '',
        learningFormat: '',
        experience: '',
        referralSource: '',
        additionalInfo: '',
      });
      setIsSuccess(false);
      onClose();
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
      onClose={onClose}
      maxWidth="md"
      labelledById="course-modal-title"
      describedById="course-modal-subtitle"
      initialFocusSelector="#name"
    >
      <div className="flex flex-col h-full max-h-[85vh]">
        {/* Header - Fixed */}
        <div className="text-center p-4 sm:p-6 pb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-accent to-secondary-accent rounded-full mb-4"
          >
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </motion.div>
          <h2 id="course-modal-title" className="text-2xl md:text-3xl font-bold mb-2">
            Join the {courseName} Waitlist
          </h2>
          <p id="course-modal-subtitle" className="text-secondary mb-2">
            Be among the first to experience our revolutionary learning approach
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z" />
            </svg>
            Exclusive {discountPercentage}% Early Bird Discount
          </div>
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
            <h3 className="text-2xl font-semibold mb-3">You&apos;re on the List!</h3>
            <p className="text-secondary mb-4">Your {discountPercentage}% discount has been reserved.</p>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 max-w-sm mx-auto">
              <p className="text-sm text-secondary">
                We&apos;ll email you as soon as enrollment opens with your exclusive discount code.
              </p>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 space-y-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={(value) => updateFormData('name', value)}
                  required
                  placeholder="John Doe"
                  error={errors.name}
                />
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(value) => updateFormData('email', value)}
                  required
                  placeholder="john@example.com"
                  error={errors.email}
                  helpText="We'll send your discount code here"
                />
              </div>
              <div className="mt-4">
                <FormField
                  label="Phone (Optional)"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(value) => updateFormData('phone', value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Professional Context */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Professional Context</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Company (Optional)"
                  name="company"
                  value={formData.company}
                  onChange={(value) => updateFormData('company', value)}
                  placeholder="Acme Corporation"
                />
                <FormField
                  label="Role (Optional)"
                  name="role"
                  value={formData.role}
                  onChange={(value) => updateFormData('role', value)}
                  placeholder="Software Engineer"
                />
              </div>
              <div className="mt-4">
                <FormField
                  label="Are you enrolling with a team?"
                  name="teamSize"
                  type="select"
                  value={formData.teamSize}
                  onChange={(value) => updateFormData('teamSize', value)}
                  options={[
                    { value: '', label: 'Just myself' },
                    { value: '2-5', label: '2-5 people' },
                    { value: '6-10', label: '6-10 people' },
                    { value: '11-20', label: '11-20 people' },
                    { value: '20+', label: 'More than 20 people' },
                  ]}
                  helpText="Teams get additional benefits and support"
                />
              </div>
            </div>

            {/* Learning Preferences */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Learning Preferences</h3>
              <FormField
                label="What do you hope to achieve with this course?"
                name="learningGoals"
                type="textarea"
                value={formData.learningGoals}
                onChange={(value) => updateFormData('learningGoals', value)}
                required
                placeholder="E.g., Build AI applications, understand ML concepts, transition to AI role..."
                rows={3}
                maxLength={300}
                error={errors.learningGoals}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <FormField
                  label="Preferred Start Date"
                  name="preferredStartDate"
                  type="select"
                  value={formData.preferredStartDate}
                  onChange={(value) => updateFormData('preferredStartDate', value)}
                  options={[
                    { value: '', label: 'As soon as available' },
                    { value: 'thisMonth', label: 'This month' },
                    { value: 'nextMonth', label: 'Next month' },
                    { value: 'quarter', label: 'Next quarter' },
                    { value: 'flexible', label: 'I&apos;m flexible' },
                  ]}
                />
                <FormField
                  label="Preferred Learning Format"
                  name="learningFormat"
                  type="select"
                  value={formData.learningFormat}
                  onChange={(value) => updateFormData('learningFormat', value)}
                  required
                  options={[
                    { value: '', label: 'Select format' },
                    { value: 'self-paced', label: 'Self-paced online' },
                    { value: 'cohort', label: 'Live cohort-based' },
                    { value: 'hybrid', label: 'Hybrid (mix of both)' },
                    { value: 'corporate', label: 'Corporate training' },
                  ]}
                  error={errors.learningFormat}
                />
              </div>
            </div>

            {/* Additional Information */}
            <FormField
              label="Your current experience with AI/ML"
              name="experience"
              type="radio-group"
              value={formData.experience}
              onChange={(value) => updateFormData('experience', value)}
              options={[
                { value: 'beginner', label: 'Beginner', description: 'Little to no experience' },
                { value: 'intermediate', label: 'Intermediate', description: 'Some knowledge and practice' },
                { value: 'advanced', label: 'Advanced', description: 'Strong foundation, looking to deepen' },
              ]}
            />

            <FormField
              label="How did you hear about us?"
              name="referralSource"
              type="select"
              value={formData.referralSource}
              onChange={(value) => updateFormData('referralSource', value)}
              options={[
                { value: '', label: 'Select source' },
                { value: 'search', label: 'Search engine' },
                { value: 'social', label: 'Social media' },
                { value: 'referral', label: 'Friend/colleague' },
                { value: 'employer', label: 'My employer' },
                { value: 'other', label: 'Other' },
              ]}
            />
            </div>

            {/* Fixed Footer with Submit Buttons */}
            <div className="border-t border-white/10 p-4 sm:p-6 bg-background-dark/50 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full sm:flex-1"
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
                    `Secure My ${discountPercentage}% Discount`
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-tertiary w-full sm:w-auto"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
