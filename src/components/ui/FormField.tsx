'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel' | 'url' | 'select' | 'textarea' | 'radio-group';
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  error?: string;
  options?: { value: string; label: string; description?: string }[];
  rows?: number;
  autoComplete?: string;
  maxLength?: number;
}

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  placeholder,
  helpText,
  error,
  options = [],
  rows = 4,
  autoComplete,
  maxLength
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  const baseInputClasses = `
    w-full px-3 py-3 md:px-4 md:py-3
    bg-white/5 backdrop-blur-sm
    border border-white/10
    rounded-lg
    text-primary
    placeholder:text-secondary/50
    transition-all duration-200
    focus:outline-none
    focus:border-primary-accent
    focus:bg-white/10
    hover:border-white/20
    text-base md:text-base
    min-h-[44px] md:min-h-[48px]
  `;

  const renderField = () => {
    switch (type) {
      case 'select':
        return (
          <select
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required={required}
            className={`${baseInputClasses} ${error ? 'border-red-500/50' : ''}`}
            aria-describedby={helpText ? `${name}-help` : undefined}
            aria-invalid={!!error}
          >
            <option value="" disabled>{placeholder || 'Select an option'}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <div className="relative">
            <textarea
              id={name}
              name={name}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              required={required}
              placeholder={placeholder}
              rows={rows}
              maxLength={maxLength}
              className={`${baseInputClasses} resize-none ${error ? 'border-red-500/50' : ''}`}
              aria-describedby={helpText ? `${name}-help` : undefined}
              aria-invalid={!!error}
            />
            {maxLength && (
              <span className="absolute bottom-2 right-3 text-xs text-secondary bg-background-dark/80 px-1 rounded">
                {value.length}/{maxLength}
              </span>
            )}
          </div>
        );

      case 'radio-group':
        return (
          <div className="space-y-3">
            {options.map((option) => (
              <label
                key={option.value}
                className={`
                  flex items-start p-3 md:p-4 
                  bg-white/5 backdrop-blur-sm
                  border border-white/10
                  rounded-lg cursor-pointer
                  transition-all duration-200
                  hover:bg-white/10 hover:border-white/20
                  min-h-[48px] md:min-h-[52px]
                  ${value === option.value ? 'border-primary-accent bg-primary-accent/10' : ''}
                `}
              >
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(e.target.value)}
                  className="mt-2 mr-3 w-4 h-4 text-primary-accent focus:ring-primary-accent focus:ring-2"
                  required={required}
                />
                <div className="flex-1">
                  <div className="text-sm md:text-base font-medium text-primary leading-relaxed">{option.label}</div>
                  {option.description && (
                    <div className="mt-1 text-xs md:text-sm text-secondary leading-relaxed">{option.description}</div>
                  )}
                </div>
              </label>
            ))}
          </div>
        );

      default:
        return (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            required={required}
            placeholder={placeholder}
            autoComplete={autoComplete}
            className={`${baseInputClasses} ${error ? 'border-red-500/50' : ''}`}
            aria-describedby={helpText ? `${name}-help` : undefined}
            aria-invalid={!!error}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      {/* Label */}
      <label 
        htmlFor={name} 
        className={`
          block text-sm font-medium transition-colors duration-200
          ${isFocused || hasValue ? 'text-primary-accent' : 'text-secondary'}
        `}
      >
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>

      {/* Field */}
      {renderField()}

      {/* Help Text or Error */}
      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-sm text-red-400 flex items-center gap-1"
            id={`${name}-help`}
            role="alert"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </motion.p>
        ) : helpText ? (
          <motion.p
            key="help"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-sm text-secondary"
            id={`${name}-help`}
          >
            {helpText}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}