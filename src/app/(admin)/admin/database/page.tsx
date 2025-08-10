'use client';

import { useState } from 'react';
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

export default function AdminDatabasePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [queryResult, setQueryResult] = useState<any>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const tables = [
    { name: 'users', records: 342, size: '2.4 MB', lastModified: '2024-01-15' },
    { name: 'courses', records: 12, size: '156 KB', lastModified: '2024-01-14' },
    { name: 'course_waitlist_leads', records: 45, size: '340 KB', lastModified: '2024-01-15' },
    { name: 'solara_waitlist_leads', records: 30, size: '220 KB', lastModified: '2024-01-15' },
    { name: 'ssa_inquiries', records: 20, size: '180 KB', lastModified: '2024-01-14' },
    { name: 'case_study_requests', records: 10, size: '90 KB', lastModified: '2024-01-13' },
    { name: 'partner_inquiries', records: 15, size: '120 KB', lastModified: '2024-01-12' },
  ];

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
    if (action === 'clear' && !confirm('Are you sure you want to clear test data? This cannot be undone.')) {
      return;
    }

    setIsExecuting(true);
    try {
      // Simulate action execution
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(`Executing action: ${action}`);
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
                    <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">Size</th>
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
                      <td className="px-4 py-3 text-sm text-text-secondary">{table.size}</td>
                      <td className="px-4 py-3 text-sm text-text-secondary">{table.lastModified}</td>
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
                placeholder="Enter your SQL query here..."
                className="w-full h-48 px-4 py-3 bg-input-bg border border-border-color rounded-lg text-text-primary placeholder-text-secondary font-mono text-sm focus:outline-none focus:border-primary-accent transition-colors resize-none"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-yellow-400">
                  <Warning className="w-4 h-4" />
                  <span>Use with caution - queries run directly on production database</span>
                </div>
                <button
                  onClick={() => setQueryResult({ message: 'Query execution simulated' })}
                  disabled={isExecuting}
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
              <h3 className="text-lg font-semibold text-text-primary mb-4">Query Result</h3>
              <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-green-400">{JSON.stringify(queryResult, null, 2)}</code>
              </pre>
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
