'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSolaraInterestModal } from '@/hooks/useSolaraInterestModal';
import { useState, FormEvent } from 'react';
import Modal from '@/components/ui/Modal';
import FormField from '@/components/ui/FormField';

export default function SolaraInterestModal() {
  const { isOpen, closeModal } = useSolaraInterestModal();
  const [formData, setFormData] = useState({
    // Contact Information
    name: '',
    email: '',
    phone: '',
    // Professional Context
    company: '',
    role: '',
    companySize: '',
    // Interest Details
    primaryInterest: '',
    specificFeatures: [] as string[],
    useCase: '',
    timeline: '',
    // Additional Information
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
    if (!formData.primaryInterest) newErrors.primaryInterest = 'Please select your primary interest';
    if (formData.specificFeatures.length === 0) {
      newErrors.specificFeatures = 'Please select at least one feature';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Backend removed; stub request
      const res = await fetch('/api/leads/solara', {
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
        companySize: '',
        primaryInterest: '',
        specificFeatures: [],
        useCase: '',
        timeline: '',
        additionalInfo: '',
      });
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

  const toggleFeature = (feature: string) => {
    const currentFeatures = formData.specificFeatures;
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature];
    updateFormData('specificFeatures', newFeatures);
  };

  const solaraFeatures = [
    { id: 'polaris', name: 'Polaris - AI Needs Analysis', description: 'Translate requirements into learning objectives' },
    { id: 'constellation', name: 'Constellation - Instructional Design', description: 'Transform content into structured blueprints' },
    { id: 'nova', name: 'Nova - AI-Powered Authoring', description: 'Build interactive learning experiences' },
    { id: 'orbit', name: 'Orbit - Learning Platform', description: 'Deliver personalized learning journeys' },
    { id: 'spectrum', name: 'Spectrum - AI Analytics', description: 'Deep insights into learning effectiveness' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      maxWidth="lg"
      labelledById="solara-modal-title"
      describedById="solara-modal-subtitle"
      initialFocusSelector="#name"
    >
      <div className="flex flex-col h-full max-h-[85vh]">
        {/* Header - Fixed */}
        <div className="text-center p-4 sm:p-6 pb-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full mb-3 shadow-lg"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl font-bold text-white"
            >
              AI
            </motion.span>
          </motion.div>
          <h2 id="solara-modal-title" className="text-xl md:text-2xl font-bold mb-2">
            Join the Solara Waitlist
          </h2>
          <p id="solara-modal-subtitle" className="text-secondary text-sm max-w-md mx-auto">
            Get early access to the AI-powered learning platform
          </p>
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 px-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">Welcome to the Future!</h3>
            <p className="text-secondary mb-1">You&apos;re officially on the Solara pioneer list.</p>
            <p className="text-sm text-secondary/70">
              We&apos;ll send you exclusive updates and early access opportunities.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
              {/* Contact Information */}
              <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary-accent/20 flex items-center justify-center text-sm font-bold">1</span>
                Contact Information
              </h3>
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
              <div className="mt-4">
                <FormField
                  label="Phone (Optional)"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(value) => updateFormData('phone', value)}
                  placeholder="+1 (555) 123-4567"
                  helpText="For priority notifications about launch"
                />
              </div>
            </div>

            {/* Professional Context */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary-accent/20 flex items-center justify-center text-sm font-bold">2</span>
                Professional Context
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Company"
                  name="company"
                  value={formData.company}
                  onChange={(value) => updateFormData('company', value)}
                  placeholder="Acme Corporation"
                />
                <FormField
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={(value) => updateFormData('role', value)}
                  placeholder="L&amp;D Manager"
                />
              </div>
              <div className="mt-4">
                <FormField
                  label="Company Size"
                  name="companySize"
                  type="select"
                  value={formData.companySize}
                  onChange={(value) => updateFormData('companySize', value)}
                  options={[
                    { value: '', label: 'Select size' },
                    { value: '1-10', label: '1-10 employees' },
                    { value: '11-50', label: '11-50 employees' },
                    { value: '51-200', label: '51-200 employees' },
                    { value: '201-1000', label: '201-1,000 employees' },
                    { value: '1000+', label: '1,000+ employees' },
                  ]}
                />
              </div>
            </div>

            {/* Interest Details */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary-accent/20 flex items-center justify-center text-sm font-bold">3</span>
                Your Interest in Solara
              </h3>
              <FormField
                label="How do you plan to use Solara?"
                name="primaryInterest"
                type="radio-group"
                value={formData.primaryInterest}
                onChange={(value) => updateFormData('primaryInterest', value)}
                required
                options={[
                  { value: 'personal', label: 'Personal Use', description: 'For my own learning and development' },
                  { value: 'team', label: 'Team/Department', description: 'For my team or department training' },
                  { value: 'enterprise', label: 'Enterprise', description: 'Organization-wide implementation' },
                  { value: 'partner', label: 'Partner/Vendor', description: 'As a training provider or consultant' },
                ]}
                error={errors.primaryInterest}
              />

              <div className="mt-6">
                <label className="block text-sm font-medium mb-3">
                  Which Solara features excite you most? <span className="text-red-400">*</span>
                </label>
                <div className="space-y-2">
                  {solaraFeatures.map((feature) => (
                    <label
                      key={feature.id}
                      className={`
                        flex items-start p-3 md:p-4
                        bg-white/5 backdrop-blur-sm
                        border border-white/10
                        rounded-lg cursor-pointer
                        transition-all duration-200
                        hover:bg-white/10 hover:border-white/20
                        min-h-[48px] md:min-h-[52px]
                        ${formData.specificFeatures.includes(feature.id) ? 'border-primary-accent bg-primary-accent/10' : ''}
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={formData.specificFeatures.includes(feature.id)}
                        onChange={() => toggleFeature(feature.id)}
                        className="mt-2 mr-3 w-4 h-4 text-primary-accent focus:ring-primary-accent focus:ring-2"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-primary">{feature.name}</div>
                        <div className="text-sm text-secondary">{feature.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.specificFeatures && (
                  <p className="mt-2 text-sm text-red-400">{errors.specificFeatures}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <FormField
                  label="Expected Timeline"
                  name="timeline"
                  type="select"
                  value={formData.timeline}
                  onChange={(value) => updateFormData('timeline', value)}
                  options={[
                    { value: '', label: 'Select timeline' },
                    { value: 'asap', label: 'As soon as available' },
                    { value: '3months', label: 'Within 3 months' },
                    { value: '6months', label: 'Within 6 months' },
                    { value: 'year', label: 'Within a year' },
                    { value: 'exploring', label: 'Just exploring' },
                  ]}
                />
                <FormField
                  label="Use Case (Optional)"
                  name="useCase"
                  value={formData.useCase}
                  onChange={(value) => updateFormData('useCase', value)}
                  placeholder="E.g., Technical training"
                  helpText="Help us prioritize features"
                />
              </div>
            </div>

            {/* Additional Information */}
            <FormField
              label="Anything else you'd like us to know? (Optional)"
              name="additionalInfo"
              type="textarea"
              value={formData.additionalInfo}
              onChange={(value) => updateFormData('additionalInfo', value)}
              placeholder="Tell us about your learning challenges or what you hope Solara will solve..."
              rows={3}
              maxLength={300}
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
                    'Join the Waitlist'
                  )}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
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
