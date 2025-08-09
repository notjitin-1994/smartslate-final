import './stack-auth-custom.css';
import './stack-auth-animations.css';
import { Metadata } from 'next';
import React from 'react';
import AuthLayoutClient from './AuthLayoutClient';

export const metadata: Metadata = {
  title: 'SmartSlate - Sign In',
  description: 'Sign in to SmartSlate to access your learning journey',
};

export default function HandlerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="stack-auth-page" data-stack-auth>
      <AuthLayoutClient>{children}</AuthLayoutClient>
    </div>
  );
}
