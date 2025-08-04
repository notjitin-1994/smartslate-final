'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
  showCloseButton?: boolean;
}

export default function Modal({ 
  isOpen, 
  onClose, 
  children, 
  maxWidth = 'md',
  showCloseButton = true 
}: ModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const maxWidthClass = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl'
  }[maxWidth];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6 overflow-y-auto">
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ 
                type: 'spring', 
                duration: 0.5,
                damping: 30,
                stiffness: 300
              }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full ${maxWidthClass} max-h-[90vh] my-auto modal-content flex flex-col`}
              role="dialog"
              aria-modal="true"
            >
              {/* Close Button */}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-200 group z-10"
                  aria-label="Close modal"
                >
                  <svg 
                    className="w-5 h-5 text-secondary transition-colors group-hover:text-primary" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="2" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              {/* Content */}
              <div className="relative overflow-y-auto flex-1 px-6 py-6">
                {children}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary-accent/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-secondary-accent/10 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}