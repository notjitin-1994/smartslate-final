'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from '@/components/ui/Modal';
import FormField from '@/components/ui/FormField';

interface FormFieldBase {
  name: string;
  label: string;
  type: 'text' | 'email' | 'url' | 'tel' | 'textarea' | 'select';
  required?: boolean;
}

interface SelectField extends FormFieldBase {
  type: 'select';
  options: { label: string; value: string }[];
}

type FormField = FormFieldBase | SelectField;

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  formFields: FormField[];
}


export default function ContactModal({
  open,
  onClose,
  title,
  formFields,
}: ContactModalProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const collaborationType = formData['collaborationType'] || undefined;
      const res = await fetch('/api/leads/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, collaborationType, data: formData }),
      });
      if (!res.ok) throw new Error('Failed to submit');
      
      // Success state consistent with other modals
      setIsSuccess(true);
      
      // Reset form and close modal after brief confirmation
      setTimeout(() => {
        setFormData({});
        setIsSuccess(false);
        onClose();
      }, 2500);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({});
      onClose();
    }
  };

  return (
    <Modal
      isOpen={open}
      onClose={handleClose}
      maxWidth="md"
      labelledById="collab-modal-title"
      describedById="collab-modal-subtitle"
      initialFocusSelector="#name"
    >
      <div className="flex flex-col h-full max-h-[90vh]">
        <div className="text-center p-4 sm:p-6 pb-4">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-accent to-primary-accent-dark rounded-full mb-4">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h.01M12 7h.01M16 7h.01M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 11-3.8-3.8L22 22" />
            </svg>
          </div>
          <h2 id="collab-modal-title" className="text-xl md:text-2xl font-bold mb-2">{title}</h2>
          <p id="collab-modal-subtitle" className="text-secondary text-sm max-w-md mx-auto">
            Share a few details and we’ll get back within 1–2 business days.
          </p>
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring' }}
              className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-semibold mb-2">Submission Received</h3>
            <p className="text-secondary">Thanks for reaching out. Our team will get back to you shortly.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 space-y-4">
              {formFields.map((field) => (
                <FormField
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  type={field.type === 'select' ? 'select' : field.type === 'textarea' ? 'textarea' : field.type}
                  value={formData[field.name] || ''}
                  onChange={(value) => handleChange(field.name, value)}
                  required={field.required !== false}
                  options={field.type === 'select' ? (field as SelectField).options.map(o => ({ value: o.value, label: o.label })) : undefined}
                  rows={field.type === 'textarea' ? 3 : undefined}
                />
              ))}
            </div>

            <div className="border-t border-white/10 p-4 sm:p-6 bg-background-dark/50 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row gap-3">
                <button type="submit" disabled={loading} className="btn btn-primary w-full">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit'
                  )}
                </button>
                <button type="button" onClick={handleClose} className="btn btn-tertiary w-full sm:w-auto">
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
