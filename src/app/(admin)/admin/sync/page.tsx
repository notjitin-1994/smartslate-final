'use client';

import { useState, useEffect } from 'react';
import {
  CloudSync,
  Refresh,
  CheckCircle,
  Error,
  Schedule,
  PlayArrow,
  Stop,
  History,
  AutorenewOutlined
} from '@mui/icons-material';

interface SyncJob {
  id: string;
  name: string;
  description: string;
  lastRun: string;
  status: 'success' | 'failed' | 'running' | 'never';
  duration?: string;
  nextRun?: string;
  isAutomatic?: boolean;
}

export default function AdminSyncPage() {
  const [loading, setLoading] = useState(true);
  const [syncJobs, setSyncJobs] = useState<SyncJob[]>([
    {
      id: 'roles',
      name: 'Sync Roles & Permissions',
      description: 'Synchronize role definitions and permissions with the database',
      lastRun: '2024-01-15 10:30:00',
      status: 'success',
      duration: '1.2s',
      isAutomatic: true,
      nextRun: '2024-01-16 10:30:00'
    },
    {
      id: 'users',
      name: 'Sync User Data',
      description: 'Synchronize user data between authentication provider and database',
      lastRun: '2024-01-15 09:00:00',
      status: 'success',
      duration: '3.5s',
      isAutomatic: true,
      nextRun: '2024-01-15 21:00:00'
    },
    {
      id: 'courses',
      name: 'Import Course Catalog',
      description: 'Import or update course catalog from external source',
      lastRun: '2024-01-14 15:00:00',
      status: 'success',
      duration: '5.2s',
      isAutomatic: false
    },
    {
      id: 'leads',
      name: 'Export Leads to CRM',
      description: 'Export lead data to external CRM system',
      lastRun: '2024-01-15 08:00:00',
      status: 'running',
      isAutomatic: true,
      nextRun: '2024-01-15 20:00:00'
    },
    {
      id: 'analytics',
      name: 'Aggregate Analytics Data',
      description: 'Process and aggregate analytics data for reporting',
      lastRun: '2024-01-15 00:00:00',
      status: 'failed',
      duration: '10.3s',
      isAutomatic: true,
      nextRun: '2024-01-16 00:00:00'
    }
  ]);

  const [runningJobs, setRunningJobs] = useState<Set<string>>(new Set());
  const [showLogs, setShowLogs] = useState<string | null>(null);

  useEffect(() => {
    loadSyncJobs();
  }, []);

  async function loadSyncJobs() {
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('/api/admin/sync', {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (res.ok) {
        const data = await res.json();
        setSyncJobs(data.jobs);
      }
    } catch (error) {
      console.error('Failed to load sync jobs:', error);
    } finally {
      setLoading(false);
    }
  }

  const runSync = async (jobId: string) => {
    setRunningJobs(new Set([...runningJobs, jobId]));
    
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('/api/admin/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ jobId })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setSyncJobs(prev => prev.map(job => 
          job.id === jobId 
            ? { ...job, status: 'success', lastRun: new Date().toISOString(), duration: data.duration }
            : job
        ));
        alert(`${data.message} (Duration: ${data.duration})`);
      } else {
        setSyncJobs(prev => prev.map(job => 
          job.id === jobId 
            ? { ...job, status: 'failed' }
            : job
        ));
        alert(`Sync failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to run sync:', error);
      setSyncJobs(prev => prev.map(job => 
        job.id === jobId 
          ? { ...job, status: 'failed' }
          : job
      ));
      alert('Failed to run sync job');
    } finally {
      setRunningJobs(prev => {
        const newSet = new Set(prev);
        newSet.delete(jobId);
        return newSet;
      });
    }
  };

  const runAllSync = async () => {
    const confirmRun = confirm('Are you sure you want to run all sync jobs? This may take a while.');
    if (!confirmRun) return;
    
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('/api/admin/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ jobId: 'all' })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        await loadSyncJobs();
        alert(`${data.message} (Duration: ${data.duration})`);
      } else {
        alert(`Failed to run all sync jobs: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Failed to run all sync:', error);
      alert('Failed to run all sync jobs');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'failed': return <Error className="w-5 h-5 text-red-400" />;
      case 'running': return <AutorenewOutlined className="w-5 h-5 text-blue-400 animate-spin" />;
      default: return <Schedule className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-400';
      case 'failed': return 'text-red-400';
      case 'running': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Sync & Seed Operations</h1>
          <p className="text-text-secondary mt-1">Manage data synchronization and seeding tasks</p>
        </div>
        <button
          onClick={runAllSync}
          className="flex items-center gap-2 px-4 py-2 bg-secondary-accent text-white rounded-lg hover:bg-secondary-accent-dark transition-colors duration-200"
        >
          <Refresh className="w-5 h-5" />
          <span>Run All Sync Jobs</span>
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-xl p-4 border border-border-color">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Jobs</p>
              <p className="text-2xl font-bold text-text-primary">{syncJobs.length}</p>
            </div>
            <CloudSync className="w-8 h-8 text-primary-accent opacity-50" />
          </div>
        </div>
        <div className="glass-effect rounded-xl p-4 border border-border-color">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Running</p>
              <p className="text-2xl font-bold text-blue-400">{runningJobs.size}</p>
            </div>
            <AutorenewOutlined className="w-8 h-8 text-blue-400 opacity-50 animate-spin" />
          </div>
        </div>
        <div className="glass-effect rounded-xl p-4 border border-border-color">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Successful</p>
              <p className="text-2xl font-bold text-green-400">
                {syncJobs.filter(j => j.status === 'success').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400 opacity-50" />
          </div>
        </div>
        <div className="glass-effect rounded-xl p-4 border border-border-color">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Failed</p>
              <p className="text-2xl font-bold text-red-400">
                {syncJobs.filter(j => j.status === 'failed').length}
              </p>
            </div>
            <Error className="w-8 h-8 text-red-400 opacity-50" />
          </div>
        </div>
      </div>

      {/* Sync Jobs List */}
      <div className="space-y-4">
        {syncJobs.map((job) => (
          <div
            key={job.id}
            className="glass-effect-strong rounded-xl p-6 border border-border-color hover:border-primary-accent/50 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon(job.status)}
                  <h3 className="text-lg font-semibold text-text-primary">{job.name}</h3>
                  {job.isAutomatic && (
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">
                      Automatic
                    </span>
                  )}
                </div>
                <p className="text-sm text-text-secondary mb-4">{job.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-text-secondary">Last Run:</span>
                    <p className={`font-medium ${getStatusColor(job.status)}`}>
                      {job.status === 'never' ? 'Never' : new Date(job.lastRun).toLocaleString()}
                    </p>
                  </div>
                  {job.duration && (
                    <div>
                      <span className="text-text-secondary">Duration:</span>
                      <p className="font-medium text-text-primary">{job.duration}</p>
                    </div>
                  )}
                  {job.nextRun && (
                    <div>
                      <span className="text-text-secondary">Next Run:</span>
                      <p className="font-medium text-text-primary">
                        {new Date(job.nextRun).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                {runningJobs.has(job.id) ? (
                  <button
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                    title="Stop"
                  >
                    <Stop className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={() => runSync(job.id)}
                    className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
                    title="Run Now"
                  >
                    <PlayArrow className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => setShowLogs(job.id)}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-white/10 rounded-lg transition-colors"
                  title="View Logs"
                >
                  <History className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {job.status === 'failed' && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-sm text-red-400">
                  Error: Failed to connect to external service. Please check your API credentials.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Logs Modal */}
      {showLogs && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-effect-strong rounded-xl p-6 border border-border-color max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-text-primary">
                Sync Logs - {syncJobs.find(j => j.id === showLogs)?.name}
              </h2>
              <button
                onClick={() => setShowLogs(null)}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-white/10 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              <pre className="bg-black/30 p-4 rounded-lg text-sm font-mono">
                <code className="text-green-400">
{`[2024-01-15 10:30:00] Starting sync job...
[2024-01-15 10:30:00] Connecting to database...
[2024-01-15 10:30:01] Connection established
[2024-01-15 10:30:01] Fetching role definitions...
[2024-01-15 10:30:01] Found 3 roles to sync
[2024-01-15 10:30:01] Syncing role: owner
[2024-01-15 10:30:01] Syncing role: admin
[2024-01-15 10:30:01] Syncing role: user
[2024-01-15 10:30:02] Role sync completed successfully
[2024-01-15 10:30:02] Total duration: 1.2s`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
