'use client';

import { useState } from 'react';
import {
  Api,
  Send,
  ContentCopy,
  ExpandMore,
  ExpandLess,
  CheckCircle,
  Error,
  Schedule,
  Speed
} from '@mui/icons-material';

interface ApiEndpoint {
  path: string;
  method: string;
  description: string;
  requiresAuth: boolean;
  permissions?: string[];
  samplePayload?: any;
}

export default function AdminApiDebugPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [showHeaders, setShowHeaders] = useState(false);

  const apiEndpoints: ApiEndpoint[] = [
    // Backend routes removed; add AWS API Gateway endpoints here after integration
  ];

  const executeRequest = async () => {
    if (!selectedEndpoint) return;

    setIsLoading(true);
    setResponse(null);

    try {
      const token = localStorage.getItem('auth_token');
      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...headers,
        ...(token && selectedEndpoint.requiresAuth ? { Authorization: `Bearer ${token}` } : {})
      };

      let url = selectedEndpoint.path;
      let options: RequestInit = {
        method: selectedEndpoint.method,
        headers: requestHeaders,
      };

      if (['POST', 'PATCH', 'PUT'].includes(selectedEndpoint.method) && requestBody) {
        options.body = requestBody;
      }

      if (selectedEndpoint.method === 'DELETE' && requestBody) {
        const params = JSON.parse(requestBody);
        url += '?' + new URLSearchParams(params).toString();
      }

      const startTime = Date.now();
      const res = await fetch(url, options);
      const duration = Date.now() - startTime;

      const contentType = res.headers.get('content-type');
      let data;
      if (contentType?.includes('application/json')) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data,
        duration
      });
    } catch (error: any) {
      setResponse({
        status: 0,
        statusText: 'Network Error',
        error: error.message,
        duration: 0
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-text-primary">API Debug Console</h1>
        <p className="text-text-secondary mt-1">Test and debug API endpoints directly</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Endpoints List */}
        <div className="lg:col-span-1">
          <div className="glass-effect-strong rounded-xl border border-border-color overflow-hidden">
            <div className="p-4 border-b border-border-color">
              <h2 className="text-lg font-semibold text-text-primary">API Endpoints</h2>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {apiEndpoints.map((endpoint, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedEndpoint(endpoint);
                    setRequestBody(endpoint.samplePayload ? JSON.stringify(endpoint.samplePayload, null, 2) : '');
                    setResponse(null);
                  }}
                  className={`w-full text-left p-4 border-b border-border-color hover:bg-white/5 transition-colors ${
                    selectedEndpoint?.path === endpoint.path && selectedEndpoint?.method === endpoint.method
                      ? 'bg-white/10'
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400' :
                      endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                      endpoint.method === 'PATCH' ? 'bg-yellow-500/20 text-yellow-400' :
                      endpoint.method === 'DELETE' ? 'bg-red-500/20 text-red-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {endpoint.method}
                    </span>
                    {endpoint.requiresAuth && (
                      <span className="text-xs text-orange-400">🔒 Auth</span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-text-primary mb-1">{endpoint.path}</p>
                  <p className="text-xs text-text-secondary line-clamp-2">{endpoint.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Request/Response Panel */}
        <div className="lg:col-span-2 space-y-6">
          {selectedEndpoint ? (
            <>
              {/* Request Configuration */}
              <div className="glass-effect-strong rounded-xl p-6 border border-border-color">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-text-primary">Request Configuration</h2>
                  <button
                    onClick={executeRequest}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary-accent text-white rounded-lg hover:bg-secondary-accent-dark transition-colors disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isLoading ? 'Sending...' : 'Send Request'}</span>
                  </button>
                </div>

                {/* Endpoint Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-text-secondary">Endpoint:</span>
                    <code className="text-sm font-mono text-primary-accent">{selectedEndpoint.path}</code>
                  </div>
                  {selectedEndpoint.permissions && selectedEndpoint.permissions.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-text-secondary">Required Permissions:</span>
                      <div className="flex gap-2">
                        {selectedEndpoint.permissions.map((perm) => (
                          <span key={perm} className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">
                            {perm}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Headers */}
                <div className="mb-4">
                  <button
                    onClick={() => setShowHeaders(!showHeaders)}
                    className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {showHeaders ? <ExpandLess className="w-4 h-4" /> : <ExpandMore className="w-4 h-4" />}
                    <span>Custom Headers</span>
                  </button>
                  {showHeaders && (
                    <textarea
                      placeholder='{"X-Custom-Header": "value"}'
                      value={JSON.stringify(headers, null, 2)}
                      onChange={(e) => {
                        try {
                          setHeaders(JSON.parse(e.target.value));
                        } catch {}
                      }}
                      className="mt-2 w-full h-24 px-4 py-3 bg-input-bg border border-border-color rounded-lg text-text-primary font-mono text-sm focus:outline-none focus:border-primary-accent transition-colors resize-none"
                    />
                  )}
                </div>

                {/* Request Body */}
                {['POST', 'PATCH', 'PUT'].includes(selectedEndpoint.method) && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm text-text-secondary">Request Body</label>
                      {selectedEndpoint.samplePayload && (
                        <button
                          onClick={() => setRequestBody(JSON.stringify(selectedEndpoint.samplePayload, null, 2))}
                          className="text-xs text-primary-accent hover:text-primary-accent-light"
                        >
                          Load Sample
                        </button>
                      )}
                    </div>
                    <textarea
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      className="w-full h-48 px-4 py-3 bg-input-bg border border-border-color rounded-lg text-text-primary font-mono text-sm focus:outline-none focus:border-primary-accent transition-colors resize-none"
                      placeholder="Enter JSON body..."
                    />
                  </div>
                )}

                {selectedEndpoint.method === 'DELETE' && (
                  <div>
                    <label className="text-sm text-text-secondary mb-2 block">Query Parameters</label>
                    <textarea
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      className="w-full h-24 px-4 py-3 bg-input-bg border border-border-color rounded-lg text-text-primary font-mono text-sm focus:outline-none focus:border-primary-accent transition-colors resize-none"
                      placeholder='{"slug": "course-slug"}'
                    />
                  </div>
                )}
              </div>

              {/* Response */}
              {response && (
                <div className="glass-effect-strong rounded-xl p-6 border border-border-color">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-text-primary">Response</h2>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Speed className="w-4 h-4 text-text-secondary" />
                        <span className="text-text-secondary">{response.duration}ms</span>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                        response.status >= 200 && response.status < 300
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {response.status >= 200 && response.status < 300 ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Error className="w-4 h-4" />
                        )}
                        <span>{response.status} {response.statusText}</span>
                      </div>
                    </div>
                  </div>

                  {/* Response Body */}
                  <div className="relative">
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(response.data, null, 2))}
                      className="absolute top-2 right-2 p-2 text-text-secondary hover:text-text-primary transition-colors"
                      title="Copy response"
                    >
                      <ContentCopy className="w-4 h-4" />
                    </button>
                    <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto max-h-96">
                      <code className="text-sm text-green-400">
                        {typeof response.data === 'object'
                          ? JSON.stringify(response.data, null, 2)
                          : response.data}
                      </code>
                    </pre>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="glass-effect-strong rounded-xl p-12 border border-border-color text-center">
              <Api className="w-16 h-16 mx-auto mb-4 text-text-secondary opacity-50" />
              <p className="text-text-secondary">Select an endpoint to start testing</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
