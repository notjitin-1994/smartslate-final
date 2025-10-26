'use client';

import { motion } from 'framer-motion';
import { useState, FormEvent } from 'react';
import Modal from '@/components/ui/Modal';
import FormField from '@/components/ui/FormField';
import { Box, Typography, Chip, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { CheckCircle, Star, Work, School, Schedule, LocationOn, AttachMoney } from '@mui/icons-material';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string;
  jobDescription?: string;
  responsibilities?: string[];
  requirements?: string[];
  jobType?: string;
  location?: string;
  equity?: string;
}

export default function JobApplicationModal({ 
  isOpen, 
  onClose, 
  jobTitle = '',
  jobDescription = '',
  responsibilities = [],
  requirements = [],
  jobType = '',
  location = '',
  equity = ''
}: JobApplicationModalProps) {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    
    // Professional Information
    linkedinProfile: '',
    portfolio: '',
    currentCompany: '',
    currentRole: '',
    experience: '',
    education: '',
    
    // Application Details
    coverLetter: '',
    whyInterested: '',
    salaryExpectation: '',
    startDate: '',
    workAuthorization: '',
    
    // Additional Information
    howDidYouHear: '',
    additionalInfo: '',
    agreeToTerms: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.experience) newErrors.experience = 'Experience level is required';
    if (!formData.workAuthorization) newErrors.workAuthorization = 'Work authorization is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
    if (!resumeFile) newErrors.resume = 'Resume is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Create form data for file upload
      const submissionData = new FormData();
      submissionData.append('jobTitle', jobTitle);
      submissionData.append('firstName', formData.firstName);
      submissionData.append('lastName', formData.lastName);
      submissionData.append('email', formData.email);
      submissionData.append('phone', formData.phone);
      submissionData.append('location', formData.location);
      submissionData.append('linkedinProfile', formData.linkedinProfile);
      submissionData.append('portfolio', formData.portfolio);
      submissionData.append('currentCompany', formData.currentCompany);
      submissionData.append('currentRole', formData.currentRole);
      submissionData.append('experience', formData.experience);
      submissionData.append('education', formData.education);
      submissionData.append('coverLetter', formData.coverLetter);
      submissionData.append('whyInterested', formData.whyInterested);
      submissionData.append('salaryExpectation', formData.salaryExpectation);
      submissionData.append('startDate', formData.startDate);
      submissionData.append('workAuthorization', formData.workAuthorization);
      submissionData.append('howDidYouHear', formData.howDidYouHear);
      submissionData.append('additionalInfo', formData.additionalInfo);
      
      if (resumeFile) {
        submissionData.append('resume', resumeFile);
      }

      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        body: submissionData,
      });
      
      if (!res.ok) throw new Error('Failed to submit application');
    } catch (err) {
      setIsSubmitting(false);
      alert('There was an error submitting your application. Please try again.');
      return;
    }

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset form and close modal after success
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        linkedinProfile: '',
        portfolio: '',
        currentCompany: '',
        currentRole: '',
        experience: '',
        education: '',
        coverLetter: '',
        whyInterested: '',
        salaryExpectation: '',
        startDate: '',
        workAuthorization: '',
        howDidYouHear: '',
        additionalInfo: '',
        agreeToTerms: false,
      });
      setResumeFile(null);
      setIsSuccess(false);
      onClose();
    }, 3000);
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
      if (errors.resume) {
        setErrors(prev => ({ ...prev, resume: '' }));
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      labelledById="job-application-modal-title"
      describedById="job-application-modal-subtitle"
      initialFocusSelector="#firstName"
    >
      <div className="flex flex-col h-full max-h-[90vh]">
        {/* Header */}
        <div className="text-left p-4 sm:p-6 pb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4"
          >
            <Work className="w-8 h-8 text-white" />
          </motion.div>
          <h2 id="job-application-modal-title" className="text-xl md:text-2xl font-bold mb-2">
            Apply for {jobTitle}
          </h2>
          <p id="job-application-modal-subtitle" className="text-secondary text-sm max-w-md">
            Join our team and help transform education through AI-powered learning experiences
          </p>
          
          {/* Job Details */}
          {jobDescription && (
            <Box sx={{ mt: 3, p: 2, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {jobDescription}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {jobType && (
                  <Chip
                    icon={<Schedule sx={{ fontSize: '16px' }} />}
                    label={jobType}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(167, 218, 219, 0.15)',
                      color: 'primary.main',
                      fontWeight: 600,
                    }}
                  />
                )}
                {location && (
                  <Chip
                    icon={<LocationOn sx={{ fontSize: '16px' }} />}
                    label={location}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(79, 70, 229, 0.15)',
                      color: 'secondary.light',
                      fontWeight: 600,
                    }}
                  />
                )}
                {equity && (
                  <Chip
                    icon={<AttachMoney sx={{ fontSize: '16px' }} />}
                    label={equity}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(34, 197, 94, 0.15)',
                      color: 'success.main',
                      fontWeight: 600,
                    }}
                  />
                )}
              </Box>
              
              {responsibilities.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
                    Key Responsibilities:
                  </Typography>
                  <List dense>
                    {responsibilities.slice(0, 3).map((item, idx) => (
                      <ListItem key={idx} sx={{ py: 0.5, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 24, color: 'primary.main' }}>
                          <CheckCircle fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{
                            variant: 'body2',
                            color: 'text.secondary',
                            sx: { fontSize: '0.875rem' }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Box>
          )}
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-left py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle className="w-10 h-10 text-green-500" />
            </motion.div>
            <h3 className="text-2xl font-semibold mb-3">Application Submitted Successfully!</h3>
            <p className="text-secondary mb-2">We&apos;ve received your application for the {jobTitle} position.</p>
            <p className="text-sm text-secondary/70">
              Our team will review your application and contact you within 5-7 business days if your profile matches our requirements.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={(value) => updateFormData('firstName', value)}
                    required
                    placeholder="John"
                    error={errors.firstName}
                  />
                  <FormField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={(value) => updateFormData('lastName', value)}
                    required
                    placeholder="Doe"
                    error={errors.lastName}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(value) => updateFormData('email', value)}
                    required
                    placeholder="john.doe@example.com"
                    error={errors.email}
                  />
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
                </div>

                <FormField
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={(value) => updateFormData('location', value)}
                  placeholder="City, Country"
                />
              </div>

              {/* Professional Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Professional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="LinkedIn Profile"
                    name="linkedinProfile"
                    value={formData.linkedinProfile}
                    onChange={(value) => updateFormData('linkedinProfile', value)}
                    placeholder="https://linkedin.com/in/johndoe"
                  />
                  <FormField
                    label="Portfolio/Website"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={(value) => updateFormData('portfolio', value)}
                    placeholder="https://johndoe.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Current Company"
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={(value) => updateFormData('currentCompany', value)}
                    placeholder="Acme Corporation"
                  />
                  <FormField
                    label="Current Role"
                    name="currentRole"
                    value={formData.currentRole}
                    onChange={(value) => updateFormData('currentRole', value)}
                    placeholder="Senior Developer"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Years of Experience"
                    name="experience"
                    type="select"
                    value={formData.experience}
                    onChange={(value) => updateFormData('experience', value)}
                    required
                    options={[
                      { value: '', label: 'Select experience' },
                      { value: '0-2', label: '0-2 years' },
                      { value: '3-5', label: '3-5 years' },
                      { value: '6-10', label: '6-10 years' },
                      { value: '10+', label: '10+ years' },
                    ]}
                    error={errors.experience}
                  />
                  <FormField
                    label="Education Level"
                    name="education"
                    type="select"
                    value={formData.education}
                    onChange={(value) => updateFormData('education', value)}
                    options={[
                      { value: '', label: 'Select education' },
                      { value: 'high-school', label: 'High School' },
                      { value: 'bachelors', label: 'Bachelor\'s Degree' },
                      { value: 'masters', label: 'Master\'s Degree' },
                      { value: 'phd', label: 'PhD' },
                      { value: 'other', label: 'Other' },
                    ]}
                  />
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Resume</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Upload Resume (PDF, DOC, DOCX) *
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-300
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-purple-50 file:text-purple-700
                      hover:file:bg-purple-100"
                  />
                  {errors.resume && (
                    <p className="mt-2 text-sm text-red-400">{errors.resume}</p>
                  )}
                  {resumeFile && (
                    <p className="mt-2 text-sm text-green-400">
                      Selected: {resumeFile.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Application Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Application Details</h3>
                <FormField
                  label="Why are you interested in this role?"
                  name="whyInterested"
                  type="textarea"
                  value={formData.whyInterested}
                  onChange={(value) => updateFormData('whyInterested', value)}
                  placeholder="Tell us why you're excited about this opportunity..."
                  rows={3}
                  maxLength={500}
                />

                <FormField
                  label="Cover Letter"
                  name="coverLetter"
                  type="textarea"
                  value={formData.coverLetter}
                  onChange={(value) => updateFormData('coverLetter', value)}
                  placeholder="Tell us more about your experience and why you'd be a great fit..."
                  rows={4}
                  maxLength={1000}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="Salary Expectation"
                    name="salaryExpectation"
                    value={formData.salaryExpectation}
                    onChange={(value) => updateFormData('salaryExpectation', value)}
                    placeholder="$80,000 - $100,000"
                  />
                  <FormField
                    label="Earliest Start Date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={(value) => updateFormData('startDate', value)}
                    placeholder="Immediately, 2 weeks, etc."
                  />
                </div>

                <FormField
                  label="Work Authorization"
                  name="workAuthorization"
                  type="select"
                  value={formData.workAuthorization}
                  onChange={(value) => updateFormData('workAuthorization', value)}
                  required
                  options={[
                    { value: '', label: 'Select authorization' },
                    { value: 'us-citizen', label: 'US Citizen' },
                    { value: 'green-card', label: 'Green Card Holder' },
                    { value: 'work-visa', label: 'Work Visa (H1B, etc.)' },
                    { value: 'student-visa', label: 'Student Visa (F1, etc.)' },
                    { value: 'other', label: 'Other' },
                  ]}
                  error={errors.workAuthorization}
                />
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                <FormField
                  label="How did you hear about this position?"
                  name="howDidYouHear"
                  type="select"
                  value={formData.howDidYouHear}
                  onChange={(value) => updateFormData('howDidYouHear', value)}
                  options={[
                    { value: '', label: 'Select source' },
                    { value: 'linkedin', label: 'LinkedIn' },
                    { value: 'company-website', label: 'Company Website' },
                    { value: 'referral', label: 'Employee Referral' },
                    { value: 'job-board', label: 'Job Board (Indeed, etc.)' },
                    { value: 'social-media', label: 'Social Media' },
                    { value: 'other', label: 'Other' },
                  ]}
                />

                <FormField
                  label="Additional Information"
                  name="additionalInfo"
                  type="textarea"
                  value={formData.additionalInfo}
                  onChange={(value) => updateFormData('additionalInfo', value)}
                  placeholder="Any additional information you'd like to share..."
                  rows={3}
                  maxLength={500}
                />

                <div className="mb-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
                      className="mt-1 mr-2 w-4 h-4 text-purple-600 focus:ring-purple-500 focus:ring-2"
                    />
                    <span className="text-sm text-gray-300">
                      I agree to the processing of my personal data for recruitment purposes and confirm that the information provided is accurate.
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="mt-2 text-sm text-red-400">{errors.agreeToTerms}</p>
                  )}
                </div>
              </div>
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
                      Submitting Application...
                    </span>
                  ) : (
                    'Submit Application'
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