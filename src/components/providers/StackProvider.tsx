'use client';

import { StackProvider, StackClientApp } from '@stackframe/stack';

export default function AuthStackProvider({ children }: { children: React.ReactNode }) {
  const app = new StackClientApp({
    projectId: process.env.NEXT_PUBLIC_STACK_PROJECT_ID!,
    publishableClientKey: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY!,
    redirectMethod: 'nextjs',
    tokenStore: 'nextjs-cookie',
  });

  return (
    <StackProvider app={app}>
      {children}
    </StackProvider>
  );
}


