'use client';

import React, { useState, FormEvent } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { Close, Business, School, Handshake, TrendingUp, Groups, AutoAwesome } from '@mui/icons-material';
import FormField from '@/components/ui/FormField';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  partnerType?: 'institution' | 'business' | 'technology' | 'consulting' | 'research';
}

export default function PartnerModal({ isOpen, onClose, partnerType = 'business' }: PartnerModalProps) {
  const [formData, setFormData] = useState({
    // Contact Information
    name: '',
    email: '',
    phone: '',
    company: '',
    role: '',
    industry: '',
    
    // Partnership Details
    partnershipType: partnerType,
    organizationSize: '',
    currentInitiatives: '',
    partnershipGoals: [] as string[],
    timeline: '',
    budget: '',
    
    // Additional Information
    specificNeeds: '',
    preferredContact: 'email',
    followUp: 'yes',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const partnershipOptions = {
    institution: [
      { id: 'curriculum-integration', name: 'Curriculum Integration', description: 'Embed our programs into your existing courses' },
      { id: 'joint-certification', name: 'Joint Certification Programs', description: 'Co-create industry-recognized certifications' },
      { id: 'research-collaboration', name: 'Research Collaboration', description: 'Partner on AI/ML education research' },
      { id: 'student-placements', name: 'Student Placement Programs', description: 'Connect graduates with industry partners' },
      { id: 'faculty-development', name: 'Faculty Development', description: 'Train educators on emerging technologies' },
    ],
    business: [
      { id: 'corporate-training', name: 'Corporate Training Programs', description: 'Upskill your workforce with AI capabilities' },
      { id: 'talent-pipeline', name: 'Talent Pipeline Development', description: 'Build a pipeline of AI-ready talent' },
      { id: 'custom-solutions', name: 'Custom Learning Solutions', description: 'Tailored programs for your specific needs' },
      { id: 'consultation-services', name: 'Consultation Services', description: 'Strategic guidance on AI transformation' },
      { id: 'white-label', name: 'White-Label Solutions', description: 'Brand our platform as your own' },
    ],
    technology: [
      { id: 'platform-integration', name: 'Platform Integration', description: 'Integrate our learning platform with your systems' },
      { id: 'api-partnership', name: 'API Partnership', description: 'Access our learning APIs and data' },
      { id: 'co-development', name: 'Co-Development', description: 'Build new features together' },
      { id: 'marketplace', name: 'Marketplace Partnership', description: 'Distribute content through our marketplace' },
      { id: 'technology-licensing', name: 'Technology Licensing', description: 'License our AI learning technology' },
    ],
    consulting: [
      { id: 'implementation-support', name: 'Implementation Support', description: 'Help clients implement our solutions' },
      { id: 'custom-development', name: 'Custom Development', description: 'Build custom learning solutions for clients' },
      { id: 'training-delivery', name: 'Training Delivery', description: 'Deliver training programs to your clients' },
      { id: 'consulting-services', name: 'Consulting Services', description: 'Joint consulting on AI transformation' },
      { id: 'referral-partnership', name: 'Referral Partnership', description: 'Mutual client referrals' },
    ],
    research: [
      { id: 'academic-research', name: 'Academic Research', description: 'Collaborate on AI education research' },
      { id: 'industry-studies', name: 'Industry Studies', description: 'Joint industry impact studies' },
      { id: 'data-analysis', name: 'Data Analysis', description: 'Analyze learning outcomes and trends' },
      { id: 'publication-partnership', name: 'Publication Partnership', description: 'Co-publish research findings' },
      { id: 'conference-collaboration', name: 'Conference Collaboration', description: 'Organize joint events and workshops' },
    ],
  };

  const organizationSizeOptions = [
    { value: 'startup', label: 'Startup (1-50 employees)' },
    { value: 'small', label: 'Small Business (51-200 employees)' },
    { value: 'medium', label: 'Medium Business (201-1000 employees)' },
    { value: 'large', label: 'Large Enterprise (1000+ employees)' },
    { value: 'enterprise', label: 'Enterprise (5000+ employees)' },
  ];

  const timelineOptions = [
    { value: 'immediate', label: 'Immediate (within 3 months)' },
    { value: 'short-term', label: 'Short-term (3-6 months)' },
    { value: 'medium-term', label: 'Medium-term (6-12 months)' },
    { value: 'long-term', label: 'Long-term (12+ months)' },
    { value: 'exploratory', label: 'Exploratory discussion' },
  ];

  const budgetOptions = [
    { value: 'under-50k', label: 'Under ₹50,000' },
    { value: '50k-200k', label: '₹50,000 - ₹200,000' },
    { value: '200k-500k', label: '₹200,000 - ₹500,000' },
    { value: '500k-1m', label: '₹500,000 - ₹1,000,000' },
    { value: 'over-1m', label: 'Over ₹1,000,000' },
    { value: 'custom', label: 'Custom budget' },
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.company) newErrors.company = 'Organization name is required';
    if (!formData.organizationSize) newErrors.organizationSize = 'Please select organization size';
    if (formData.partnershipGoals.length === 0) newErrors.partnershipGoals = 'Please select at least one partnership goal';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/leads/partner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
          setFormData({
            name: '', email: '', phone: '', company: '', role: '', industry: '',
            partnershipType: partnerType, organizationSize: '', currentInitiatives: '',
            partnershipGoals: [], timeline: '', budget: '', specificNeeds: '',
            preferredContact: 'email', followUp: 'yes',
          });
        }, 2000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPartnerTypeIcon = () => {
    switch (partnerType) {
      case 'institution': return <School />;
      case 'technology': return <AutoAwesome />;
      case 'consulting': return <TrendingUp />;
      case 'research': return <Groups />;
      default: return <Business />;
    }
  };

  const getPartnerTypeTitle = () => {
    switch (partnerType) {
      case 'institution': return 'Educational Institution Partnership';
      case 'technology': return 'Technology Partnership';
      case 'consulting': return 'Consulting Partnership';
      case 'research': return 'Research Partnership';
      default: return 'Business Partnership';
    }
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          <Box sx={{ color: 'success.main', mb: 2 }}>
            <Handshake sx={{ fontSize: 60 }} />
          </Box>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Partnership Request Submitted!
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Thank you for your interest in partnering with Smartslate. Our team will review your request and get back to you within 2 business days.
          </Typography>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 2, 
        pb: 1,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          color: 'primary.main' 
        }}>
          {getPartnerTypeIcon()}
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {getPartnerTypeTitle()}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{ ml: 'auto', color: 'text.secondary' }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            Tell us about your organization and partnership goals. We'll connect you with the right team to explore collaboration opportunities.
          </Typography>

          {/* Contact Information */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Contact Information
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <FormField
                label="Full Name *"
                name="name"
                type="text"
                value={formData.name}
                onChange={(value) => updateFormData('name', value)}
                error={errors.name}
                placeholder="Enter your full name"
              />
              <FormField
                label="Email Address *"
                name="email"
                type="email"
                value={formData.email}
                onChange={(value) => updateFormData('email', value)}
                error={errors.email}
                placeholder="Enter your email address"
              />
              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(value) => updateFormData('phone', value)}
                placeholder="Enter your phone number"
              />
              <FormField
                label="Organization Name *"
                name="company"
                type="text"
                value={formData.company}
                onChange={(value) => updateFormData('company', value)}
                error={errors.company}
                placeholder="Enter your organization name"
              />
              <FormField
                label="Your Role"
                name="role"
                type="text"
                value={formData.role}
                onChange={(value) => updateFormData('role', value)}
                placeholder="e.g., Director, Manager, Professor"
              />
              <FormField
                label="Industry"
                name="industry"
                type="text"
                value={formData.industry}
                onChange={(value) => updateFormData('industry', value)}
                placeholder="e.g., Technology, Education, Healthcare"
              />
            </Box>
          </Box>

          {/* Organization Details */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Organization Details
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <FormField
                label="Organization Size *"
                name="organizationSize"
                type="select"
                value={formData.organizationSize}
                onChange={(value) => updateFormData('organizationSize', value)}
                options={organizationSizeOptions}
                error={errors.organizationSize}
              />
              <FormField
                label="Timeline for Partnership *"
                name="timeline"
                type="select"
                value={formData.timeline}
                onChange={(value) => updateFormData('timeline', value)}
                options={timelineOptions}
              />
            </Box>
            <FormField
              label="Current Initiatives (Optional)"
              name="currentInitiatives"
              type="textarea"
              value={formData.currentInitiatives}
              onChange={(value) => updateFormData('currentInitiatives', value)}
              placeholder="Tell us about your current learning, training, or technology initiatives"
              rows={3}
              maxLength={300}
            />
          </Box>

          {/* Partnership Goals */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Partnership Goals *
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              Select all that apply to your partnership objectives:
            </Typography>
            <div className="space-y-3">
              {partnershipOptions[partnerType].map((option) => (
                <label key={option.id} className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.partnershipGoals.includes(option.id)}
                    onChange={(e) => {
                      const goals = e.target.checked
                        ? [...formData.partnershipGoals, option.id]
                        : formData.partnershipGoals.filter(g => g !== option.id);
                      updateFormData('partnershipGoals', goals);
                    }}
                    className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-primary">{option.name}</div>
                    <div className="text-sm text-secondary">{option.description}</div>
                  </div>
                </label>
              ))}
            </div>
            {errors.partnershipGoals && (
              <Typography variant="caption" sx={{ color: 'error.main', mt: 1, display: 'block' }}>
                {errors.partnershipGoals}
              </Typography>
            )}
          </Box>

          {/* Budget and Specific Needs */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Additional Information
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
              <FormField
                label="Budget Range"
                name="budget"
                type="select"
                value={formData.budget}
                onChange={(value) => updateFormData('budget', value)}
                options={budgetOptions}
              />
              <FormField
                label="Preferred Contact Method"
                name="preferredContact"
                type="radio-group"
                value={formData.preferredContact}
                onChange={(value) => updateFormData('preferredContact', value)}
                options={[
                  { value: 'email', label: 'Email' },
                  { value: 'phone', label: 'Phone' },
                  { value: 'video', label: 'Video Call' },
                ]}
              />
            </Box>
            <FormField
              label="Specific Needs or Requirements"
              name="specificNeeds"
              type="textarea"
              value={formData.specificNeeds}
              onChange={(value) => updateFormData('specificNeeds', value)}
              placeholder="Tell us about any specific requirements, challenges, or goals for this partnership"
              rows={3}
              maxLength={500}
            />
          </Box>

          {/* Follow Up */}
          <Box sx={{ mb: 2 }}>
            <FormField
              label="Would you like a follow-up consultation?"
              name="followUp"
              type="radio-group"
              value={formData.followUp}
              onChange={(value) => updateFormData('followUp', value)}
              options={[
                { value: 'yes', label: 'Yes, schedule a consultation call' },
                { value: 'no', label: 'No, just send information' },
              ]}
            />
          </Box>

          {errors.submit && (
            <Typography variant="body2" sx={{ color: 'error.main', mt: 2, textAlign: 'center' }}>
              {errors.submit}
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, gap: 2 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ minWidth: 120 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{ 
              minWidth: 120,
              backgroundColor: 'secondary.main',
              '&:hover': { backgroundColor: 'secondary.dark' }
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Partnership Request'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
