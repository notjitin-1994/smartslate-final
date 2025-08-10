'use client';

import { useUser } from '@stackframe/stack';

export default function AdminPage() {
  const stackUser = useUser();

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Admin Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Welcome back!
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            You are logged in as {stackUser?.primaryEmail}
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Admin Access
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            You have owner privileges
          </p>
        </div>
      </div>
    </div>
  );
}
