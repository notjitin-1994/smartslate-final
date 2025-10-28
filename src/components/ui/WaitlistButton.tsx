'use client';

import Link from 'next/link';

interface WaitlistButtonProps {
  source?: string;
  courseName?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

export default function WaitlistButton({
  source,
  courseName,
  variant = 'primary',
  size = 'md',
  className = '',
  children
}: WaitlistButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800 shadow-lg hover:shadow-xl',
    secondary: 'bg-gradient-to-r from-secondary-accent to-secondary-accent-dark text-white hover:from-secondary-accent-dark hover:to-secondary-accent shadow-lg hover:shadow-xl',
    outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const defaultText = courseName ? `Join ${courseName} Waitlist` : 'Join Waitlist';

  return (
    <Link
      href="/contact"
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children || defaultText}
    </Link>
  );
}
