'use client';

import AdminAuthGuard from '@/components/admin/AdminAuthGuard';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Suspense } from 'react';
import type { ReactNode } from 'react';

function AdminLayoutContent({ children }: { children: ReactNode }) {
  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen bg-background-dark text-text-primary">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-8 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </AdminAuthGuard>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-background-dark">
        <div className="text-center">
          <div className="mb-4 text-primary-accent text-lg font-semibold">Loading Admin Portal...</div>
          <div className="text-sm text-text-secondary">Initializing secure connection</div>
        </div>
      </div>
    }>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </Suspense>
  );
}
