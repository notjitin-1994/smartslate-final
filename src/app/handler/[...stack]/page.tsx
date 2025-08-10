import { StackHandler } from '@stackframe/stack';
import { stackServerApp } from '@/stack';
import { redirect } from 'next/navigation';

export default async function Handler(props: any) {
  // Get the full path from the catch-all route
  const segments = (await props.params)?.stack || [];
  const path = segments.join('/').toLowerCase();
  

  
  // Redirect all sign-in variations to our custom page
  if (path.includes('sign-in') || path.includes('signin') || path === 'sign-in' || path === '') {
    redirect('/handler/sign-in');
  }
  
  // Redirect all sign-up variations to our custom page
  if (path.includes('sign-up') || path.includes('signup') || path === 'sign-up') {
    redirect('/handler/sign-up');
  }
  
  // Only use Stack Auth handler for other auth flows (password reset, email verification, etc.)
  return <StackHandler fullPage app={stackServerApp} routeProps={props} />;
}


