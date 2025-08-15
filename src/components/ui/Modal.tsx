'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
  showCloseButton?: boolean;
  title?: string;
  labelledById?: string;
  describedById?: string;
  initialFocusSelector?: string;
  closeOnOverlayClick?: boolean;
}

export default function Modal({ 
  isOpen, 
  onClose, 
  children, 
  maxWidth = 'md',
  showCloseButton = true,
  title,
  labelledById,
  describedById,
  initialFocusSelector,
  closeOnOverlayClick = true
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      
      setTimeout(() => {
        if (modalRef.current) {
          const root = modalRef.current;
          let target: HTMLElement | null = null;
          if (initialFocusSelector) {
            target = root.querySelector(initialFocusSelector) as HTMLElement | null;
          }
          if (!target) {
            const focusables = root.querySelectorAll<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            target = focusables[0] || root;
          }
          target.focus();
        }
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialFocusSelector]);

  // Handle escape key and focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      
      // Focus trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusableArray = Array.from(focusableElements) as HTMLElement[];
        
        if (focusableArray.length === 0) return;
        
        const firstElement = focusableArray[0];
        const lastElement = focusableArray[focusableArray.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Keep component mounted so exit animations can play via AnimatePresence

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
  }[maxWidth];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          aria-hidden={!isOpen}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledById}
          aria-describedby={describedById}
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal panel */}
          <motion.div
            ref={modalRef}
            className={`relative w-full ${maxWidthClass} mx-4 bg-background-dark text-primary rounded-xl shadow-xl border border-white/10 overflow-hidden`}
            initial={{ opacity: 0, scale: 0.98, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            {showCloseButton && (
              <button
                type="button"
                aria-label="Close"
                className="absolute top-3 right-3 inline-flex items-center justify-center rounded-md p-2 text-secondary hover:text-primary hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary-accent"
                onClick={onClose}
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 8.586l4.95-4.95a1 1 0 111.414 1.415L11.414 10l4.95 4.95a1 1 0 01-1.415 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.415L8.586 10l-4.95-4.95A1 1 0 115.05 3.636L10 8.586z" clipRule="evenodd" />
                </svg>
              </button>
            )}

            <div className="max-h-[90vh] overflow-hidden">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
