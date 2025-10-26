/**
 * Unified Modal Submission Helper
 *
 * This module provides a centralized way to submit all modal forms
 * to the unified modal_submissions table in the database.
 */

type ModalType =
  | 'demo'
  | 'consultation'
  | 'case-study'
  | 'partner'
  | 'solara'
  | 'ssa'
  | 'waitlist'
  | 'job-application'
  | 'contact';

interface ModalSubmissionData {
  modalType: ModalType;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  role?: string;
  formData: Record<string, any>;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

interface SubmissionResponse {
  success: boolean;
  message?: string;
  id?: string;
  createdAt?: string;
  error?: string;
  details?: string;
}

/**
 * Submit a modal form to the unified submissions endpoint
 *
 * @param data - The form data to submit
 * @returns Promise with submission response
 *
 * @example
 * ```typescript
 * const result = await submitModalForm({
 *   modalType: 'demo',
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   company: 'Acme Corp',
 *   formData: {
 *     demoType: 'product',
 *     preferredDate: '2025-01-15',
 *     // ... other demo-specific fields
 *   }
 * });
 *
 * if (result.success) {
 *   console.log('Submission ID:', result.id);
 * }
 * ```
 */
export async function submitModalForm(
  data: ModalSubmissionData
): Promise<SubmissionResponse> {
  try {
    // Extract UTM parameters from URL if not provided
    if (typeof window !== 'undefined' && (!data.utmSource && !data.utmMedium && !data.utmCampaign)) {
      const urlParams = new URLSearchParams(window.location.search);
      data.utmSource = urlParams.get('utm_source') || undefined;
      data.utmMedium = urlParams.get('utm_medium') || undefined;
      data.utmCampaign = urlParams.get('utm_campaign') || undefined;
    }

    const response = await fetch('/api/modals/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result: SubmissionResponse = await response.json();

    if (!response.ok) {
      console.error('Modal submission failed:', result);
      return {
        success: false,
        error: result.error || 'Submission failed',
        details: result.details,
      };
    }

    return result;
  } catch (error) {
    console.error('Modal submission error:', error);
    return {
      success: false,
      error: 'Network error occurred',
      details: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get a submission by ID (for admin/tracking purposes)
 *
 * @param id - The submission UUID
 * @returns Promise with submission data
 */
export async function getSubmission(id: string): Promise<any> {
  try {
    const response = await fetch(`/api/modals/submit?id=${id}`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to retrieve submission');
    }

    return result.data;
  } catch (error) {
    console.error('Failed to get submission:', error);
    throw error;
  }
}

/**
 * Helper to extract common fields from form data
 * This standardizes how we extract name, email, etc. from various form structures
 */
export function extractCommonFields(formData: Record<string, any>) {
  return {
    name: formData.name || formData.firstName && formData.lastName
      ? `${formData.firstName} ${formData.lastName}`.trim()
      : undefined,
    email: formData.email,
    phone: formData.phone,
    company: formData.company,
    role: formData.role,
  };
}

/**
 * Validate required fields before submission
 * Different modal types have different required fields
 */
export function validateModalSubmission(
  modalType: ModalType,
  formData: Record<string, any>
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Common validation
  if (!formData.email) {
    errors.push('Email is required');
  } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(formData.email)) {
    errors.push('Invalid email format');
  }

  // Modal-specific validation
  switch (modalType) {
    case 'demo':
    case 'consultation':
      if (!formData.name) errors.push('Name is required');
      if (!formData.company) errors.push('Company is required');
      if (!formData.preferredDate) errors.push('Preferred date is required');
      if (!formData.preferredTime) errors.push('Preferred time is required');
      break;

    case 'job-application':
      if (!formData.firstName) errors.push('First name is required');
      if (!formData.lastName) errors.push('Last name is required');
      if (!formData.phone) errors.push('Phone is required');
      if (!formData.resume) errors.push('Resume is required');
      break;

    case 'contact':
      if (!formData.name) errors.push('Name is required');
      if (!formData.subject) errors.push('Subject is required');
      if (!formData.message) errors.push('Message is required');
      break;

    case 'solara':
    case 'ssa':
      if (!formData.name) errors.push('Name is required');
      if (!formData.company) errors.push('Company is required');
      if (!formData.privacyConsent) errors.push('Privacy consent is required');
      break;

    case 'waitlist':
    case 'case-study':
    case 'partner':
      if (!formData.name) errors.push('Name is required');
      break;
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
