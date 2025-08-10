import type { ReactNode } from 'react';
import { Suspense } from 'react';

export default function AdminRouteGroupLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        <div className="text-center">
          <div className="mb-4">Loading Admin...</div>
          <div className="text-sm text-gray-400">Please wait</div>
        </div>
      </div>
    }>
      {children}
    </Suspense>
  );
}
