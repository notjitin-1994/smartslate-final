'use client';

import { useState, useRef } from 'react';
import { Box, Container, Typography, Grid, Chip, Snackbar, Alert, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, useInView } from 'framer-motion';
import { submitModalForm } from '@/lib/api/modal-submission';
import StandardHero from '@/components/ui/StandardHero';
import {
  PageWrapper,
  SectionWrapper,
  ContentCard,
  PrimaryButton,
  AccentText,
  AnimatedChip,
} from '@/components/landing/styles/LandingStyles';
import {
  Email,
  Phone,
  LocationOn,
  Send,
  Business,
  Schedule,
  CheckCircle,
  SupportAgent,
  Public,
  ArrowForward,
} from '@mui/icons-material';

// Styled Components
const ContactSection = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(10)} 0`,
  backgroundColor: theme.palette.background.default,
  position: 'relative',
  overflow: 'hidden',
}));

const FormCard = styled(ContentCard)(() => ({
  height: '100%',
  minHeight: 500,
  display: 'flex',
  flexDirection: 'column',
}));

const InfoCard = styled(ContentCard)(() => ({
  height: '100%',
  minHeight: 500,
  display: 'flex',
  flexDirection: 'column',
}));

const StyledInput = styled('input')(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(167, 218, 219, 0.1)',
  borderRadius: theme.spacing(1.5),
  color: theme.palette.text.primary,
  fontSize: '1rem',
  fontFamily: theme.typography.fontFamily,
  transition: 'all 0.3s ease',
  outline: 'none',
  '&::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 0.7,
  },
  '&:hover': {
    borderColor: 'rgba(167, 218, 219, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  '&:focus': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}));

const StyledTextarea = styled('textarea')(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(167, 218, 219, 0.1)',
  borderRadius: theme.spacing(1.5),
  color: theme.palette.text.primary,
  fontSize: '1rem',
  fontFamily: theme.typography.fontFamily,
  transition: 'all 0.3s ease',
  outline: 'none',
  resize: 'vertical',
  minHeight: 140,
  '&::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 0.7,
  },
  '&:hover': {
    borderColor: 'rgba(167, 218, 219, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  '&:focus': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}));

const StyledSelect = styled('select')(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(167, 218, 219, 0.1)',
  borderRadius: theme.spacing(1.5),
  color: theme.palette.text.primary,
  fontSize: '1rem',
  fontFamily: theme.typography.fontFamily,
  transition: 'all 0.3s ease',
  outline: 'none',
  cursor: 'pointer',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a7dadb' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 16px center',
  paddingRight: theme.spacing(5),
  '&:hover': {
    borderColor: 'rgba(167, 218, 219, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  '&:focus': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  '& option': {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
}));

const FormField = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const Label = styled('label')(({ theme }) => ({
  fontSize: '0.95rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const RequiredIndicator = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: '1.2rem',
  lineHeight: 1,
}));

const CharacterCount = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  textAlign: 'right',
  marginTop: theme.spacing(0.5),
}));

const ContactMethodCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2.5),
  padding: theme.spacing(2.5),
  backgroundColor: 'rgba(167, 218, 219, 0.04)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(167, 218, 219, 0.12)',
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: 'rgba(167, 218, 219, 0.08)',
    borderColor: 'rgba(167, 218, 219, 0.3)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(167, 218, 219, 0.15)',
  },
  '&:focus-visible': {
    outline: `3px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },
}));

const ContactMethodIcon = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.2), rgba(79, 70, 229, 0.15))',
  border: '1px solid rgba(167, 218, 219, 0.3)',
  flexShrink: 0,
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
    color: theme.palette.primary.main,
  },
}));

const SupportHighlightCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(167, 218, 219, 0.25)',
  borderRadius: theme.spacing(2.5),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  marginTop: theme.spacing(4),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #a7dadb, #4F46E5)',
  },
}));

const OfficeLocationCard = styled(ContentCard)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  minHeight: 280,
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.15), rgba(79, 70, 229, 0.1))',
  border: '1px solid rgba(167, 218, 219, 0.3)',
  margin: '0 auto',
  marginBottom: theme.spacing(3),
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
    color: theme.palette.primary.main,
  },
}));

const contactMethods = [
  {
    icon: Email,
    label: 'Email Us',
    value: 'jitin@smartslate.io',
    description: 'Get a response within 24 hours',
    href: 'mailto:jitin@smartslate.io',
    ariaLabel: 'Send us an email at jitin@smartslate.io',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 9008898642',
    description: 'Monday to Friday, 9 AM - 6 PM IST',
    href: 'tel:+919008898642',
    ariaLabel: 'Call us at +91 9008898642',
  },
  {
    icon: Schedule,
    label: 'Live Support',
    value: 'Available 24/7',
    description: 'Real-time assistance via chat',
    href: '#',
    ariaLabel: 'Access 24/7 live support chat (coming soon)',
    comingSoon: true,
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const officesRef = useRef<HTMLDivElement>(null);

  const formInView = useInView(formRef, { once: true, amount: 0.2 });
  const infoInView = useInView(infoRef, { once: true, amount: 0.2 });
  const officesInView = useInView(officesRef, { once: true, amount: 0.2 });

  const maxMessageLength = 500;

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 5) return 'Subject must be at least 5 characters';
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 20) return 'Message must be at least 20 characters';
        if (value.length > maxMessageLength) return `Message must not exceed ${maxMessageLength} characters`;
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (touched[name]) {
      const error = validateField(name, value);
      setFormErrors(prev => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setFormErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
    const errors: Record<string, string> = {};
    let isValid = true;

    requiredFields.forEach(field => {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) {
        errors[field] = error;
        isValid = false;
      }
    });

    if (!isValid) {
      setFormErrors(errors);
      setTouched({
        name: true,
        email: true,
        subject: true,
        message: true,
      });
      setSnackbar({
        open: true,
        message: 'Please fix the errors in the form before submitting.',
        severity: 'error',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Use unified modal submission system
      const result = await submitModalForm({
        modalType: 'contact',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        role: '', // Contact form doesn't have role field
        formData: {
          subject: formData.subject,
          message: formData.message,
          inquiryType: formData.inquiryType,
        },
      });

      if (result.success) {
        setSnackbar({
          open: true,
          message: 'Message sent successfully! We\'ll get back to you within 24 hours.',
          severity: 'success',
        });
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          message: '',
          inquiryType: 'general',
        });
        setFormErrors({});
        setTouched({});
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again or contact us directly via email.',
        severity: 'error',
      });
      console.error('Contact form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <PageWrapper>
      {/* Hero Section */}
      <StandardHero
        title="Get in Touch With Us"
        subtitle="We're here to help you transform learning"
        description="Have questions about our platform? Need a custom solution? Want to schedule a demo? Our team of experts is ready to assist you with world-class support."
        accentWords={['Get in Touch', 'Transform', 'Help']}
      />

      {/* Main Contact Section */}
      <SectionWrapper className="visible">
        <ContactSection>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              {/* Contact Form - Left Card */}
              <Grid size={{ xs: 12, md: 6 }} ref={formRef}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.8 }}
                  style={{ height: '100%' }}
                >
                  <FormCard>
                    <Box sx={{ mb: 4 }}>
                      <AnimatedChip label="Contact Form" sx={{ mb: 3 }} />
                      <Typography
                        variant="h4"
                        sx={{
                          mb: 2,
                          fontWeight: 700,
                          color: 'primary.main',
                        }}
                      >
                        Send Us a Message
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        Fill out the form below and our team will get back to you within 24 hours with personalized solutions.
                      </Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }} noValidate>
                      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                        <FormField>
                          <Label htmlFor="name">
                            Full Name <RequiredIndicator>*</RequiredIndicator>
                          </Label>
                          <StyledInput
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            disabled={isSubmitting}
                            aria-required="true"
                            aria-invalid={touched.name && !!formErrors.name}
                            aria-describedby={touched.name && formErrors.name ? 'name-error' : undefined}
                          />
                          {touched.name && formErrors.name && (
                            <Typography id="name-error" variant="caption" sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5 }}>
                              {formErrors.name}
                            </Typography>
                          )}
                        </FormField>

                        <FormField>
                          <Label htmlFor="email">
                            Email Address <RequiredIndicator>*</RequiredIndicator>
                          </Label>
                          <StyledInput
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@company.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            disabled={isSubmitting}
                            aria-required="true"
                            aria-invalid={touched.email && !!formErrors.email}
                            aria-describedby={touched.email && formErrors.email ? 'email-error' : undefined}
                          />
                          {touched.email && formErrors.email && (
                            <Typography id="email-error" variant="caption" sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5 }}>
                              {formErrors.email}
                            </Typography>
                          )}
                        </FormField>
                      </Box>

                      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
                        <FormField>
                          <Label htmlFor="company">Company</Label>
                          <StyledInput
                            id="company"
                            name="company"
                            type="text"
                            placeholder="Your Company"
                            value={formData.company}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                            aria-required="false"
                          />
                        </FormField>

                        <FormField>
                          <Label htmlFor="phone">Phone Number</Label>
                          <StyledInput
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                            aria-required="false"
                          />
                        </FormField>
                      </Box>

                      <FormField>
                        <Label htmlFor="inquiryType">Inquiry Type</Label>
                        <StyledSelect
                          id="inquiryType"
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          aria-required="false"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="sales">Sales Question</option>
                          <option value="support">Technical Support</option>
                          <option value="partnership">Partnership Opportunity</option>
                          <option value="demo">Request a Demo</option>
                        </StyledSelect>
                      </FormField>

                      <FormField>
                        <Label htmlFor="subject">
                          Subject <RequiredIndicator>*</RequiredIndicator>
                        </Label>
                        <StyledInput
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="How can we help you?"
                          value={formData.subject}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                          aria-required="true"
                          aria-invalid={touched.subject && !!formErrors.subject}
                          aria-describedby={touched.subject && formErrors.subject ? 'subject-error' : undefined}
                        />
                        {touched.subject && formErrors.subject && (
                          <Typography id="subject-error" variant="caption" sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5 }}>
                            {formErrors.subject}
                          </Typography>
                        )}
                      </FormField>

                      <FormField>
                        <Label htmlFor="message">
                          Message <RequiredIndicator>*</RequiredIndicator>
                        </Label>
                        <StyledTextarea
                          id="message"
                          name="message"
                          placeholder="Tell us about your learning challenges, goals, or how we can help you..."
                          value={formData.message}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          disabled={isSubmitting}
                          maxLength={maxMessageLength}
                          aria-required="true"
                          aria-invalid={touched.message && !!formErrors.message}
                          aria-describedby={touched.message && formErrors.message ? 'message-error' : 'message-count'}
                        />
                        {touched.message && formErrors.message ? (
                          <Typography id="message-error" variant="caption" sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5 }}>
                            {formErrors.message}
                          </Typography>
                        ) : (
                          <CharacterCount id="message-count">
                            {formData.message.length} / {maxMessageLength} characters
                          </CharacterCount>
                        )}
                      </FormField>

                      <motion.div
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      >
                        <PrimaryButton
                          type="submit"
                          variant="contained"
                          size="large"
                          fullWidth
                          disabled={isSubmitting}
                          endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <Send />}
                          sx={{ mt: 2 }}
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </PrimaryButton>
                      </motion.div>
                    </Box>
                  </FormCard>
                </motion.div>
              </Grid>

              {/* Contact Information - Right Card */}
              <Grid size={{ xs: 12, md: 6 }} ref={infoRef}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={infoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{ height: '100%' }}
                >
                  <InfoCard>
                    <Box sx={{ mb: 4 }}>
                      <AnimatedChip label="Get in Touch" sx={{ mb: 3 }} />
                      <Typography
                        variant="h4"
                        sx={{
                          mb: 2,
                          fontWeight: 700,
                          color: 'primary.main',
                        }}
                      >
                        Other Ways to Reach Us
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        Choose the method that works best for you. We&apos;re here to help every step of the way.
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 4 }}>
                      {contactMethods.map((method, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: method.comingSoon ? 1 : 1.02 }}
                          whileTap={{ scale: method.comingSoon ? 1 : 0.98 }}
                        >
                          <ContactMethodCard
                            {...(method.comingSoon ? {} : { component: 'a', href: method.href })}
                            aria-label={method.ariaLabel}
                            tabIndex={method.comingSoon ? -1 : 0}
                            sx={{
                              opacity: method.comingSoon ? 0.6 : 1,
                              cursor: method.comingSoon ? 'default' : 'pointer',
                              '&:hover': method.comingSoon ? {
                                transform: 'none',
                                boxShadow: 'none',
                              } : undefined,
                            }}
                          >
                            <ContactMethodIcon>
                              <method.icon />
                            </ContactMethodIcon>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
                                  {method.label}
                                </Typography>
                                {method.comingSoon && (
                                  <Chip
                                    label="Coming Soon"
                                    size="small"
                                    sx={{
                                      height: 20,
                                      fontSize: '0.65rem',
                                      backgroundColor: 'rgba(79, 70, 229, 0.2)',
                                      color: 'secondary.light',
                                      fontWeight: 600,
                                    }}
                                  />
                                )}
                              </Box>
                              <Typography variant="body2" color="primary.main" sx={{ fontWeight: 600, mb: 0.5 }}>
                                {method.value}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                {method.description}
                              </Typography>
                            </Box>
                            {!method.comingSoon && <ArrowForward sx={{ color: 'primary.main', fontSize: '1.25rem' }} />}
                          </ContactMethodCard>
                        </motion.div>
                      ))}
                    </Box>

                    <SupportHighlightCard>
                      <SupportAgent sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                      <Typography variant="h6" sx={{ color: 'primary.main', mb: 1, fontWeight: 700 }}>
                        World-Class Support
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.9rem' }}>
                        Our dedicated support team is committed to ensuring your success. We respond to all inquiries within 24 hours and provide ongoing assistance tailored to your needs.
                      </Typography>
                    </SupportHighlightCard>

                    <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid rgba(167, 218, 219, 0.1)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Business sx={{ color: 'primary.main', fontSize: '1.75rem' }} />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', mb: 0.5 }}>
                            Smartslate Learning
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                            Revolutionizing education through AI
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </InfoCard>
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </ContactSection>
      </SectionWrapper>

      {/* Office Locations Section */}
      <SectionWrapper className="visible">
        <ContactSection ref={officesRef}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={officesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ textAlign: 'left', mb: 6 }}>
                <AnimatedChip label="Our Offices" sx={{ mb: 3 }} />
                <Typography variant="h3" sx={{ mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
                  Find Us <AccentText>Worldwide</AccentText>
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem', maxWidth: '700px' }}>
                  We&apos;re expanding globally to serve organizations worldwide. Visit us at our offices or connect with our regional teams.
                </Typography>
              </Box>

              <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={officesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ height: '100%' }}
                  >
                    <OfficeLocationCard>
                      <IconWrapper>
                        <LocationOn />
                      </IconWrapper>
                      <Chip
                        label="Headquarters"
                        sx={{
                          mb: 2,
                          backgroundColor: 'rgba(34, 197, 94, 0.15)',
                          color: 'success.main',
                          fontWeight: 600,
                          border: '1px solid rgba(34, 197, 94, 0.3)',
                        }}
                      />
                      <Typography variant="h5" sx={{ color: 'primary.main', mb: 2, fontWeight: 700 }}>
                        Bangalore, India
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2 }}>
                        Smartslate Learning<br />
                        #123, Tech Park, 4th Floor<br />
                        Bangalore, Karnataka 560103<br />
                        India
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 3 }}>
                        <CheckCircle sx={{ color: 'success.main', fontSize: '1rem' }} />
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                          Main Office - Open Now
                        </Typography>
                      </Box>
                    </OfficeLocationCard>
                  </motion.div>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={officesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{ height: '100%' }}
                  >
                    <OfficeLocationCard>
                      <IconWrapper>
                        <Public />
                      </IconWrapper>
                      <Chip
                        label="Coming Soon"
                        sx={{
                          mb: 2,
                          backgroundColor: 'rgba(79, 70, 229, 0.15)',
                          color: 'secondary.light',
                          fontWeight: 600,
                          border: '1px solid rgba(79, 70, 229, 0.3)',
                        }}
                      />
                      <Typography variant="h5" sx={{ color: 'secondary.main', mb: 2, fontWeight: 700 }}>
                        Global Expansion
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 2 }}>
                        We&apos;re expanding to serve you better<br />
                        North America • Europe • APAC<br />
                        <br />
                        Multiple locations planned for 2025
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 3 }}>
                        <Schedule sx={{ color: 'secondary.main', fontSize: '1rem' }} />
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, fontStyle: 'italic' }}>
                          Opening Q2 2025
                        </Typography>
                      </Box>
                    </OfficeLocationCard>
                  </motion.div>
                </Grid>
              </Grid>
            </motion.div>
          </Container>
        </ContactSection>
      </SectionWrapper>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: '100%',
            maxWidth: 500,
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageWrapper>
  );
}
