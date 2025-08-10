'use client';

import { useUser } from '@stackframe/stack';
import { useEffect, useState } from 'react';

export default function DebugStackAuthPage() {
  const stackUser = useUser();
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (stackUser) {
      setLoading(true);
      
      const getDebugInfo = async () => {
        try {
          console.log('🔍 Debug: Getting Stack Auth debug info...');
          
          let authData;
          try {
            authData = await stackUser.getAuthJson();
            console.log('✅ Debug: getAuthJson() succeeded:', authData);
          } catch (error) {
            console.log('❌ Debug: getAuthJson() failed:', error);
            try {
              authData = await (stackUser as any).getAccessToken();
              console.log('✅ Debug: getAccessToken() succeeded:', authData);
            } catch (altError) {
              console.log('❌ Debug: getAccessToken() also failed:', altError);
              authData = null;
            }
          }

          const info = {
            user: {
              id: stackUser.id,
              email: stackUser.primaryEmail,
              displayName: stackUser.displayName,
              status: 'authenticated',
            },
            authData,
            timestamp: new Date().toISOString(),
          };

          setDebugInfo(info);
          console.log('🔍 Debug: Debug info collected:', info);
        } catch (error) {
          console.error('❌ Debug: Error collecting debug info:', error);
          setDebugInfo({ error: error instanceof Error ? error.message : 'Unknown error' });
        } finally {
          setLoading(false);
        }
      };

      getDebugInfo();
    }
  }, [stackUser]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Stack Auth Debug</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Stack Auth State</h2>
          
          {!stackUser ? (
            <div className="text-red-600">
              <p>❌ No Stack Auth user found</p>
              <p className="text-sm text-gray-600 mt-2">
                This means you are not authenticated through Stack Auth.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <strong>User ID:</strong> {stackUser.id}
              </div>
              <div>
                <strong>Email:</strong> {stackUser.primaryEmail}
              </div>
              <div>
                <strong>Display Name:</strong> {stackUser.displayName}
              </div>
              <div>
                <strong>Status:</strong> Authenticated
              </div>
            </div>
          )}
        </div>

        {stackUser && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Authentication Data</h2>
            
            {loading ? (
              <p>Loading...</p>
            ) : debugInfo?.error ? (
              <div className="text-red-600">
                <p>❌ Error: {debugInfo.error}</p>
              </div>
            ) : debugInfo?.authData ? (
              <div>
                <p className="text-green-600 mb-2">✅ Authentication data retrieved successfully</p>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(debugInfo.authData, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="text-yellow-600">
                <p>⚠️ No authentication data available</p>
              </div>
            )}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          
          {!stackUser ? (
            <div>
              <p className="mb-4">To access the admin panel, you need to:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Sign in through Stack Auth</li>
                <li>Ensure your email (jitin@smartslate.io) is properly authenticated</li>
                <li>Check that you have the owner role in the database</li>
              </ol>
            </div>
          ) : !debugInfo?.authData ? (
            <div>
              <p className="mb-4">Authentication issue detected:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>User is authenticated but no access token is available</li>
                <li>This might be a Stack Auth configuration issue</li>
                <li>Check the browser console for more details</li>
              </ul>
            </div>
          ) : (
            <div>
              <p className="text-green-600 mb-4">✅ Stack Auth appears to be working correctly</p>
              <p>If you still can't access the admin panel, check:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Browser console for any errors</li>
                <li>Network tab for failed API calls</li>
                <li>Database role assignments</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
