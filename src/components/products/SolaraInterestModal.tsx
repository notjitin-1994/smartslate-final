'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSolaraInterestModal } from '@/hooks/useSolaraInterestModal';
import { useState, FormEvent } from 'react';
import Modal from '@/components/ui/Modal';
import FormField from '@/components/ui/FormField';

export default function SolaraInterestModal() {
  const { isOpen, closeModal } = useSolaraInterestModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Contact & Professional Information
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    department: '',
    companySize: '',
    industry: '',
    location: '',
    
    // Step 2: Current Learning Infrastructure
    currentLMS: '',
    currentTools: [] as string[],
    learningChallenges: '',
    contentCreationProcess: '',
    learnerCount: '',
    contentVolume: '',
    
    // Step 3: Solara Interest & Use Cases
    primaryUseCase: '',
    solaraComponents: [] as string[],
    specificFeatures: [] as string[],
    integrationNeeds: [] as string[],
    aiRequirements: [] as string[],
    
    // Step 4: Implementation & Timeline
    timeline: '',
    budgetRange: '',
    teamSize: '',
    decisionMakers: '',
    implementationScope: '',
    
    // Step 5: Additional Context
    currentPainPoints: '',
    successMetrics: '',
    competitiveAnalysis: '',
    howDidYouHear: '',
    additionalNotes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 5;

  const currentToolsOptions = [
    { id: 'articulate', name: 'Articulate 360', description: 'Storyline, Rise, and other Articulate tools' },
    { id: 'captivate', name: 'Adobe Captivate', description: 'Adobe\'s eLearning authoring tool' },
    { id: 'camtasia', name: 'Camtasia', description: 'Screen recording and video editing' },
    { id: 'canva', name: 'Canva', description: 'Graphic design and visual content' },
    { id: 'figma', name: 'Figma', description: 'Design and prototyping' },
    { id: 'lms', name: 'Learning Management System', description: 'Moodle, Canvas, Blackboard, etc.' },
    { id: 'video-tools', name: 'Video Tools', description: 'Loom, Screencast-O-Matic, etc.' },
    { id: 'ai-tools', name: 'AI Tools', description: 'ChatGPT, Claude, Midjourney, etc.' },
    { id: 'other', name: 'Other Tools', description: 'Custom or specialized tools' },
  ];

  const solaraComponentsOptions = [
    { id: 'polaris', name: 'Solara Polaris', description: 'AI-powered needs analysis and requirements translation' },
    { id: 'constellation', name: 'Solara Constellation', description: 'Automated instructional design and content structuring' },
    { id: 'nova', name: 'Solara Nova', description: 'AI-assisted interactive content authoring' },
    { id: 'orbit', name: 'Solara Orbit', description: 'Learning platform and personalized delivery' },
    { id: 'nebula', name: 'Solara Nebula', description: 'Intelligent tutoring and adaptive support' },
    { id: 'spectrum', name: 'Solara Spectrum', description: 'Advanced analytics and insights' },
  ];

  const specificFeaturesOptions = [
    { id: 'ai-content-generation', name: 'AI Content Generation', description: 'Automated content creation from prompts' },
    { id: 'adaptive-learning', name: 'Adaptive Learning Paths', description: 'Personalized learning journeys' },
    { id: 'real-time-analytics', name: 'Real-time Analytics', description: 'Live learning effectiveness tracking' },
    { id: 'ai-tutoring', name: 'AI Tutoring', description: 'Intelligent support and guidance' },
    { id: 'content-transformation', name: 'Content Transformation', description: 'Convert existing content to interactive formats' },
    { id: 'integration-hub', name: 'Integration Hub', description: 'Connect with existing tools and systems' },
    { id: 'mobile-learning', name: 'Mobile Learning', description: 'Optimized for mobile devices' },
    { id: 'gamification', name: 'Gamification', description: 'Game-like elements and engagement' },
  ];

  const integrationNeedsOptions = [
    { id: 'lms-integration', name: 'LMS Integration', description: 'Connect with existing learning management systems' },
    { id: 'hr-systems', name: 'HR Systems', description: 'Integrate with HRIS and talent management' },
    { id: 'single-sign-on', name: 'Single Sign-On (SSO)', description: 'Seamless authentication' },
    { id: 'api-access', name: 'API Access', description: 'Custom integrations and data exchange' },
    { id: 'data-warehouse', name: 'Data Warehouse', description: 'Connect with analytics platforms' },
    { id: 'video-platforms', name: 'Video Platforms', description: 'Integrate with video hosting services' },
    { id: 'communication-tools', name: 'Communication Tools', description: 'Slack, Teams, etc.' },
    { id: 'other-systems', name: 'Other Systems', description: 'Custom enterprise systems' },
  ];

  const aiRequirementsOptions = [
    { id: 'content-creation', name: 'Content Creation', description: 'Generate learning materials automatically' },
    { id: 'personalization', name: 'Personalization', description: 'Adapt content to individual learners' },
    { id: 'assessment', name: 'Assessment', description: 'AI-powered quizzes and evaluations' },
    { id: 'feedback', name: 'Feedback & Support', description: 'Intelligent tutoring and guidance' },
    { id: 'analytics', name: 'Analytics & Insights', description: 'Predictive analytics and recommendations' },
    { id: 'translation', name: 'Translation', description: 'Multi-language content support' },
    { id: 'accessibility', name: 'Accessibility', description: 'AI-powered accessibility features' },
    { id: 'compliance', name: 'Compliance', description: 'Ensure regulatory compliance' },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    } else if (step === 3) {
      if (!formData.primaryUseCase) newErrors.primaryUseCase = 'Primary use case is required';
      if (formData.solaraComponents.length === 0) newErrors.solaraComponents = 'Please select at least one Solara component';
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
        department: '',
        companySize: '',
        industry: '',
        location: '',
        currentLMS: '',
        currentTools: [],
        learningChallenges: '',
        contentCreationProcess: '',
        learnerCount: '',
        contentVolume: '',
        primaryUseCase: '',
        solaraComponents: [],
        specificFeatures: [],
        integrationNeeds: [],
        aiRequirements: [],
        timeline: '',
        budgetRange: '',
        teamSize: '',
        decisionMakers: '',
        implementationScope: '',
        currentPainPoints: '',
        successMetrics: '',
        competitiveAnalysis: '',
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

  const toggleArrayField = (field: 'currentTools' | 'solaraComponents' | 'specificFeatures' | 'integrationNeeds' | 'aiRequirements', value: string) => {
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
            Join the Solara Revolution
          </h2>
          <p id="solara-modal-subtitle" className="text-secondary text-sm max-w-md mx-auto">
            Help us shape the future of AI-powered learning. Share your vision and get early access to the most advanced learning platform ever built.
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
            <h3 className="text-2xl font-semibold mb-3">Welcome to the Future!</h3>
            <p className="text-secondary mb-2">You&apos;re officially part of the Solara revolution.</p>
            <p className="text-sm text-secondary/70">
              Our product team will reach out with exclusive updates and early access opportunities.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-6">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex-1 flex items-center">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                        transition-all duration-300
                        ${currentStep >= step 
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' 
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
                    {step < 5 && (
                      <div className={`
                        flex-1 h-1 mx-2 rounded-full transition-all duration-300
                        ${currentStep > step ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-white/10'}
                      `} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step Labels */}
              <div className="flex justify-between mb-8 px-2">
                <span className={`text-xs ${currentStep >= 1 ? 'text-yellow-400' : 'text-secondary'}`}>
                  Contact
                </span>
                <span className={`text-xs ${currentStep >= 2 ? 'text-yellow-400' : 'text-secondary'}`}>
                  Current State
                </span>
                <span className={`text-xs ${currentStep >= 3 ? 'text-yellow-400' : 'text-secondary'}`}>
                  Solara Interest
                </span>
                <span className={`text-xs ${currentStep >= 4 ? 'text-yellow-400' : 'text-secondary'}`}>
                  Implementation
                </span>
                <span className={`text-xs ${currentStep >= 5 ? 'text-yellow-400' : 'text-secondary'}`}>
                  Context
                </span>
              </div>

              <AnimatePresence mode="wait">
                {/* Step 1: Contact & Professional Information */}
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
                        helpText="We'll use this to send exclusive updates"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Phone Number (Optional)"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(value) => updateFormData('phone', value)}
                        placeholder="+1 (555) 123-4567"
                        helpText="For priority notifications about launch"
                      />
                      <FormField
                        label="Company"
                        name="company"
                        value={formData.company}
                        onChange={(value) => updateFormData('company', value)}
                        placeholder="Acme Corporation"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        label="Your Role"
                        name="role"
                        value={formData.role}
                        onChange={(value) => updateFormData('role', value)}
                        placeholder="L&D Manager"
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
                          { value: '1-10', label: '1-10 employees' },
                          { value: '11-50', label: '11-50 employees' },
                          { value: '51-200', label: '51-200 employees' },
                          { value: '201-1000', label: '201-1,000 employees' },
                          { value: '1000+', label: '1,000+ employees' },
                        ]}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="Industry"
                        name="industry"
                        type="select"
                        value={formData.industry}
                        onChange={(value) => updateFormData('industry', value)}
                        options={[
                          { value: '', label: 'Select industry' },
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

                {/* Step 2: Current Learning Infrastructure */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <FormField
                      label="What LMS do you currently use?"
                      name="currentLMS"
                      type="select"
                      value={formData.currentLMS}
                      onChange={(value) => updateFormData('currentLMS', value)}
                      options={[
                        { value: '', label: 'Select your LMS' },
                        { value: 'none', label: 'No LMS currently' },
                        { value: 'moodle', label: 'Moodle' },
                        { value: 'canvas', label: 'Canvas' },
                        { value: 'blackboard', label: 'Blackboard' },
                        { value: 'workday', label: 'Workday Learning' },
                        { value: 'cornerstone', label: 'Cornerstone OnDemand' },
                        { value: 'saba', label: 'Saba' },
                        { value: 'other', label: 'Other' },
                      ]}
                      helpText="This helps us plan integration requirements"
                    />

                    <div>
                      <label className="block text-sm font-medium mb-3">
                        What tools do you currently use for learning content creation?
                      </label>
                      <div className="space-y-2">
                        {currentToolsOptions.map((tool) => (
                          <label
                            key={tool.id}
                            className={`
                              flex items-start p-3 md:p-4
                              bg-white/5 backdrop-blur-sm
                              border border-white/10
                              rounded-lg cursor-pointer
                              transition-all duration-200
                              hover:bg-white/10 hover:border-white/20
                              min-h-[48px] md:min-h-[52px]
                              ${formData.currentTools.includes(tool.id) ? 'border-yellow-400 bg-yellow-400/10' : ''}
                            `}
                          >
                            <input
                              type="checkbox"
                              checked={formData.currentTools.includes(tool.id)}
                              onChange={() => toggleArrayField('currentTools', tool.id)}
                              className="mt-2 mr-3 w-4 h-4 text-yellow-400 focus:ring-yellow-400 focus:ring-2"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-primary">{tool.name}</div>
                              <div className="text-sm text-secondary">{tool.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="How many learners do you support?"
                        name="learnerCount"
                        value={formData.learnerCount}
                        onChange={(value) => updateFormData('learnerCount', value)}
                        placeholder="E.g., 500, 1000-2000"
                        helpText="Approximate number of learners"
                      />
                      <FormField
                        label="How much content do you create monthly?"
                        name="contentVolume"
                        type="select"
                        value={formData.contentVolume}
                        onChange={(value) => updateFormData('contentVolume', value)}
                        options={[
                          { value: '', label: 'Select volume' },
                          { value: 'low', label: 'Low (1-5 courses/month)' },
                          { value: 'medium', label: 'Medium (6-20 courses/month)' },
                          { value: 'high', label: 'High (20+ courses/month)' },
                          { value: 'variable', label: 'Variable' },
                        ]}
                      />
                    </div>

                    <FormField
                      label="What are your biggest learning challenges?"
                      name="learningChallenges"
                      type="textarea"
                      value={formData.learningChallenges}
                      onChange={(value) => updateFormData('learningChallenges', value)}
                      placeholder="E.g., Content creation takes too long, learners aren't engaged, difficult to measure effectiveness..."
                      rows={3}
                      maxLength={300}
                      helpText="This helps us understand your pain points"
                    />

                    <FormField
                      label="Describe your current content creation process"
                      name="contentCreationProcess"
                      type="textarea"
                      value={formData.contentCreationProcess}
                      onChange={(value) => updateFormData('contentCreationProcess', value)}
                      placeholder="E.g., Subject matter experts create content, instructional designers review, multiple rounds of revisions..."
                      rows={3}
                      maxLength={300}
                    />
                  </motion.div>
                )}

                {/* Step 3: Solara Interest & Use Cases */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <FormField
                      label="How do you plan to use Solara?"
                      name="primaryUseCase"
                      type="radio-group"
                      value={formData.primaryUseCase}
                      onChange={(value) => updateFormData('primaryUseCase', value)}
                      required
                      options={[
                        { value: 'personal', label: 'Personal Use', description: 'For my own learning and development' },
                        { value: 'team', label: 'Team/Department', description: 'For my team or department training' },
                        { value: 'enterprise', label: 'Enterprise', description: 'Organization-wide implementation' },
                        { value: 'partner', label: 'Partner/Vendor', description: 'As a training provider or consultant' },
                        { value: 'startup', label: 'Startup/Scale-up', description: 'Building learning infrastructure from scratch' },
                      ]}
                      error={errors.primaryUseCase}
                    />

                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Which Solara components interest you most? <span className="text-red-400">*</span>
                      </label>
                      <div className="space-y-2">
                        {solaraComponentsOptions.map((component) => (
                          <label
                            key={component.id}
                            className={`
                              flex items-start p-3 md:p-4
                              bg-white/5 backdrop-blur-sm
                              border border-white/10
                              rounded-lg cursor-pointer
                              transition-all duration-200
                              hover:bg-white/10 hover:border-white/20
                              min-h-[48px] md:min-h-[52px]
                              ${formData.solaraComponents.includes(component.id) ? 'border-yellow-400 bg-yellow-400/10' : ''}
                            `}
                          >
                            <input
                              type="checkbox"
                              checked={formData.solaraComponents.includes(component.id)}
                              onChange={() => toggleArrayField('solaraComponents', component.id)}
                              className="mt-2 mr-3 w-4 h-4 text-yellow-400 focus:ring-yellow-400 focus:ring-2"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-primary">{component.name}</div>
                              <div className="text-sm text-secondary">{component.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                      {errors.solaraComponents && (
                        <p className="mt-2 text-sm text-red-400">{errors.solaraComponents}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3">
                        Which specific features excite you most?
                      </label>
                      <div className="space-y-2">
                        {specificFeaturesOptions.map((feature) => (
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
                              ${formData.specificFeatures.includes(feature.id) ? 'border-yellow-400 bg-yellow-400/10' : ''}
                            `}
                          >
                            <input
                              type="checkbox"
                              checked={formData.specificFeatures.includes(feature.id)}
                              onChange={() => toggleArrayField('specificFeatures', feature.id)}
                              className="mt-2 mr-3 w-4 h-4 text-yellow-400 focus:ring-yellow-400 focus:ring-2"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-primary">{feature.name}</div>
                              <div className="text-sm text-secondary">{feature.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3">
                        What integrations do you need?
                      </label>
                      <div className="space-y-2">
                        {integrationNeedsOptions.map((integration) => (
                          <label
                            key={integration.id}
                            className={`
                              flex items-start p-3 md:p-4
                              bg-white/5 backdrop-blur-sm
                              border border-white/10
                              rounded-lg cursor-pointer
                              transition-all duration-200
                              hover:bg-white/10 hover:border-white/20
                              min-h-[48px] md:min-h-[52px]
                              ${formData.integrationNeeds.includes(integration.id) ? 'border-yellow-400 bg-yellow-400/10' : ''}
                            `}
                          >
                            <input
                              type="checkbox"
                              checked={formData.integrationNeeds.includes(integration.id)}
                              onChange={() => toggleArrayField('integrationNeeds', integration.id)}
                              className="mt-2 mr-3 w-4 h-4 text-yellow-400 focus:ring-yellow-400 focus:ring-2"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-primary">{integration.name}</div>
                              <div className="text-sm text-secondary">{integration.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3">
                        What AI capabilities are most important to you?
                      </label>
                      <div className="space-y-2">
                        {aiRequirementsOptions.map((requirement) => (
                          <label
                            key={requirement.id}
                            className={`
                              flex items-start p-3 md:p-4
                              bg-white/5 backdrop-blur-sm
                              border border-white/10
                              rounded-lg cursor-pointer
                              transition-all duration-200
                              hover:bg-white/10 hover:border-white/20
                              min-h-[48px] md:min-h-[52px]
                              ${formData.aiRequirements.includes(requirement.id) ? 'border-yellow-400 bg-yellow-400/10' : ''}
                            `}
                          >
                            <input
                              type="checkbox"
                              checked={formData.aiRequirements.includes(requirement.id)}
                              onChange={() => toggleArrayField('aiRequirements', requirement.id)}
                              className="mt-2 mr-3 w-4 h-4 text-yellow-400 focus:ring-yellow-400 focus:ring-2"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-primary">{requirement.name}</div>
                              <div className="text-sm text-secondary">{requirement.description}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Implementation & Timeline */}
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
                        label="When do you want to implement Solara?"
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
                        label="What's your budget range?"
                        name="budgetRange"
                        type="select"
                        value={formData.budgetRange}
                        onChange={(value) => updateFormData('budgetRange', value)}
                        options={[
                          { value: '', label: 'Select budget' },
                          { value: '<10k', label: 'Under $10,000' },
                          { value: '10k-50k', label: '$10,000 - $50,000' },
                          { value: '50k-100k', label: '$50,000 - $100,000' },
                          { value: '100k-500k', label: '$100,000 - $500,000' },
                          { value: '500k+', label: 'Over $500,000' },
                          { value: 'tbd', label: 'To be determined' },
                        ]}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="How large is your implementation team?"
                        name="teamSize"
                        type="select"
                        value={formData.teamSize}
                        onChange={(value) => updateFormData('teamSize', value)}
                        options={[
                          { value: '', label: 'Select team size' },
                          { value: '1-2', label: '1-2 people' },
                          { value: '3-5', label: '3-5 people' },
                          { value: '6-10', label: '6-10 people' },
                          { value: '10+', label: '10+ people' },
                          { value: 'tbd', label: 'To be determined' },
                        ]}
                      />
                      <FormField
                        label="Who are the key decision makers?"
                        name="decisionMakers"
                        value={formData.decisionMakers}
                        onChange={(value) => updateFormData('decisionMakers', value)}
                        placeholder="E.g., CTO, VP of HR, Head of L&D"
                        helpText="This helps us prepare for discussions"
                      />
                    </div>

                    <FormField
                      label="What's your implementation scope?"
                      name="implementationScope"
                      type="radio-group"
                      value={formData.implementationScope}
                      onChange={(value) => updateFormData('implementationScope', value)}
                      options={[
                        { value: 'pilot', label: 'Pilot Program', description: 'Start with a small group or department' },
                        { value: 'department', label: 'Department-wide', description: 'Roll out to specific departments' },
                        { value: 'enterprise', label: 'Enterprise-wide', description: 'Full organization implementation' },
                        { value: 'gradual', label: 'Gradual Rollout', description: 'Phase implementation over time' },
                        { value: 'tbd', label: 'To be determined', description: 'Still planning the approach' },
                      ]}
                    />
                  </motion.div>
                )}

                {/* Step 5: Additional Context */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <FormField
                      label="What are your current pain points with learning technology?"
                      name="currentPainPoints"
                      type="textarea"
                      value={formData.currentPainPoints}
                      onChange={(value) => updateFormData('currentPainPoints', value)}
                      placeholder="E.g., Content creation is too slow, learners aren't engaged, difficult to measure ROI..."
                      rows={3}
                      maxLength={300}
                      helpText="This helps us prioritize features"
                    />

                    <FormField
                      label="How do you measure learning success?"
                      name="successMetrics"
                      type="textarea"
                      value={formData.successMetrics}
                      onChange={(value) => updateFormData('successMetrics', value)}
                      placeholder="E.g., Completion rates, skill assessments, business impact, learner satisfaction..."
                      rows={3}
                      maxLength={300}
                    />

                    <FormField
                      label="What competitive solutions are you considering?"
                      name="competitiveAnalysis"
                      type="textarea"
                      value={formData.competitiveAnalysis}
                      onChange={(value) => updateFormData('competitiveAnalysis', value)}
                      placeholder="E.g., Articulate 360, Adobe Captivate, custom solutions..."
                      rows={2}
                      maxLength={200}
                      helpText="This helps us understand the competitive landscape"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        label="How did you hear about Solara?"
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
                        placeholder="Anything else you'd like us to know..."
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
                        'Join the Revolution'
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
