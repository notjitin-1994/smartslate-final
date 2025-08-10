'use client';

import { useState, useEffect } from 'react';
import {
  Storage,
  CloudUpload,
  CloudDownload,
  DeleteSweep,
  PlayArrow,
  Warning,
  CheckCircle,
  ContentCopy,
  Code,
  TableChart,
  Refresh
} from '@mui/icons-material';

interface TableInfo {
  name: string;
  records: number;
  lastModified: string;
}

export default function AdminDatabasePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [queryResult, setQueryResult] = useState<any>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [sqlQuery, setSqlQuery] = useState('');

  useEffect(() => {
    loadDatabaseStats();
  }, []);

  async function loadDatabaseStats() {
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('/api/admin/database/stats', {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      const data = await res.json();
      if (data.ok) {
        setTables(data.tables);
      }
    } catch (e) {
      console.error('Failed to load database stats:', e);
    } finally {
      setLoading(false);
    }
  }

  const quickActions = [
    {
      title: 'Export Database',
      description: 'Download full database backup',
      icon: CloudDownload,
      action: 'export',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Import Data',
      description: 'Restore from backup file',
      icon: CloudUpload,
      action: 'import',
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Clear Test Data',
      description: 'Remove all test records',
      icon: DeleteSweep,
      action: 'clear',
      color: 'from-orange-500 to-red-600'
    },
    {
      title: 'Seed Roles',
      description: 'Initialize role permissions',
      icon: Refresh,
      action: 'seed',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const handleQuickAction = async (action: string) => {
    if (action === 'clear' && !confirm('Are you sure you want to clear all test data? This will keep jitin@smartslate.io and essential data.')) {
      return;
    }

    setIsExecuting(true);
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('/api/admin/database/operations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ action })
      });
      
      const data = await res.json();
      if (data.ok) {
        setQueryResult({
          type: 'success',
          message: data.message,
          data: data.data
        });
        // Reload stats after operation
        loadDatabaseStats();
        
        // Show alert for successful operations
        if (action === 'export' && data.data) {
          // For export, show the data in a modal or downloadable format
          const jsonStr = JSON.stringify(data.data, null, 2);
          const blob = new Blob([jsonStr], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `smartslate-backup-${new Date().toISOString().split('T')[0]}.json`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          alert('Database exported successfully! Check your downloads.');
        } else {
          alert(data.message);
        }
      } else {
        throw new Error(data.error || 'Operation failed');
      }
    } catch (e: any) {
      setQueryResult({
        type: 'error',
        message: e.message || 'Operation failed'
      });
      alert(`Error: ${e.message || 'Operation failed'}`);
    } finally {
      setIsExecuting(false);
    }
  };

  const executeQuery = async () => {
    if (!sqlQuery.trim()) {
      alert('Please enter a SQL query');
      return;
    }

    setIsExecuting(true);
    setQueryResult(null);

    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('/api/admin/database/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ query: sqlQuery })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setQueryResult({
          type: 'success',
          message: data.message,
          result: data.result,
          rowCount: data.rowCount
        });
      } else {
        setQueryResult({
          type: 'error',
          message: data.error,
          details: data.details
        });
      }
    } catch (error: any) {
      setQueryResult({
        type: 'error',
        message: 'Failed to execute query',
        error: error.message
      });
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Database Management</h1>
          <p className="text-text-secondary mt-1">Manage your database and run maintenance tasks</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Connected</span>
          </div>
        </div>
      </div>

      {/* Database Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-xl p-4 border border-border-color">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Tables</p>
              <p className="text-2xl font-bold text-text-primary">{tables.length}</p>
            </div>
            <TableChart className="w-8 h-8 text-primary-accent opacity-50" />
          </div>
        </div>
        <div className="glass-effect rounded-xl p-4 border border-border-color">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Records</p>
              <p className="text-2xl font-bold text-text-primary">
                {tables.reduce((sum, t) => sum + t.records, 0).toLocaleString()}
              </p>
            </div>
            <Storage className="w-8 h-8 text-primary-accent opacity-50" />
          </div>
        </div>
        <div className="glass-effect rounded-xl p-4 border border-border-color">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Database Size</p>
              <p className="text-2xl font-bold text-text-primary">3.8 MB</p>
            </div>
            <Storage className="w-8 h-8 text-primary-accent opacity-50" />
          </div>
        </div>
        <div className="glass-effect rounded-xl p-4 border border-border-color">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Last Backup</p>
              <p className="text-2xl font-bold text-text-primary">2h ago</p>
            </div>
            <CloudDownload className="w-8 h-8 text-primary-accent opacity-50" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border-color">
        {['overview', 'query', 'maintenance'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium capitalize transition-all duration-200 ${
              activeTab === tab
                ? 'text-primary-accent border-b-2 border-primary-accent'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Tables List */}
          <div className="glass-effect rounded-xl border border-border-color overflow-hidden">
            <div className="p-4 border-b border-border-color">
              <h2 className="text-lg font-semibold text-text-primary">Database Tables</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-color bg-white/5">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">Table Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">Records</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">Last Modified</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-color">
                  {tables.map((table) => (
                    <tr key={table.name} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <TableChart className="w-4 h-4 text-text-secondary" />
                          <span className="text-sm font-medium text-text-primary">{table.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{table.records.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{new Date(table.lastModified).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <button className="text-sm text-primary-accent hover:text-primary-accent-light transition-colors">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'query' && (
        <div className="space-y-6">
          <div className="glass-effect-strong rounded-xl p-6 border border-border-color">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-primary-accent" />
              <h2 className="text-lg font-semibold text-text-primary">SQL Query Editor</h2>
            </div>
            <div className="space-y-4">
              <textarea
                placeholder="Enter your SQL query here... (Only SELECT queries are allowed)"
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                className="w-full h-48 px-4 py-3 bg-input-bg border border-border-color rounded-lg text-text-primary placeholder-text-secondary font-mono text-sm focus:outline-none focus:border-primary-accent transition-colors resize-none"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-yellow-400">
                  <Warning className="w-4 h-4" />
                  <span>Only SELECT queries are allowed for safety</span>
                </div>
                <button
                  onClick={executeQuery}
                  disabled={isExecuting || !sqlQuery.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary-accent text-white rounded-lg hover:bg-secondary-accent-dark transition-colors disabled:opacity-50"
                >
                  <PlayArrow className="w-4 h-4" />
                  <span>{isExecuting ? 'Executing...' : 'Execute Query'}</span>
                </button>
              </div>
            </div>
          </div>

          {queryResult && (
            <div className="glass-effect-strong rounded-xl p-6 border border-border-color">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">Query Result</h3>
                {queryResult.rowCount !== undefined && (
                  <span className="text-sm text-text-secondary">
                    {queryResult.rowCount} row{queryResult.rowCount !== 1 ? 's' : ''} returned
                  </span>
                )}
              </div>
              
              {queryResult.type === 'error' ? (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400">{queryResult.message}</p>
                  {queryResult.details && (
                    <pre className="mt-2 text-xs text-red-300">
                      {JSON.stringify(queryResult.details, null, 2)}
                    </pre>
                  )}
                </div>
              ) : queryResult.result && Array.isArray(queryResult.result) ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border-color bg-white/5">
                        {queryResult.result.length > 0 && 
                          Object.keys(queryResult.result[0]).map((key) => (
                            <th key={key} className="px-4 py-2 text-left text-sm font-semibold text-text-primary">
                              {key}
                            </th>
                          ))
                        }
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-color">
                      {queryResult.result.map((row: any, idx: number) => (
                        <tr key={idx} className="hover:bg-white/5">
                          {Object.values(row).map((value: any, colIdx: number) => (
                            <td key={colIdx} className="px-4 py-2 text-sm text-text-secondary">
                              {value === null ? 'NULL' : String(value)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm text-green-400">{JSON.stringify(queryResult, null, 2)}</code>
                </pre>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'maintenance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.action}
                  className="glass-effect-strong rounded-xl p-6 border border-border-color hover:border-primary-accent/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${action.color} bg-opacity-20`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-text-primary mb-1">{action.title}</h3>
                      <p className="text-sm text-text-secondary mb-4">{action.description}</p>
                      <button
                        onClick={() => handleQuickAction(action.action)}
                        disabled={isExecuting}
                        className="px-4 py-2 bg-white/10 text-text-primary rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
                      >
                        {isExecuting ? 'Processing...' : 'Execute'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="glass-effect-strong rounded-xl p-6 border border-border-color">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Operations</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">Database backup completed</p>
                    <p className="text-xs text-text-secondary">2 hours ago</p>
                  </div>
                </div>
                <button className="text-sm text-primary-accent hover:text-primary-accent-light">
                  View Log
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">Roles seeded successfully</p>
                    <p className="text-xs text-text-secondary">1 day ago</p>
                  </div>
                </div>
                <button className="text-sm text-primary-accent hover:text-primary-accent-light">
                  View Log
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
