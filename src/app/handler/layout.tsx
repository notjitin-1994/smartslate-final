import './auth-page.css';
import './force-custom-auth.css';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Smartslate',
  description: 'Sign in to SmartSlate to access your learning journey',
};

export default function HandlerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="auth-layout-wrapper">{children}</div>;
}
