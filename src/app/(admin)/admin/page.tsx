'use client';

import { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  People, 
  School, 
  Storage,
  Speed,
  CloudQueue,
  CheckCircle,
  Warning
} from '@mui/icons-material';
import Link from 'next/link';

interface Metrics {
  leadsCount: number;
  coursesCount: number;
  usersCount: number;
}

export default function AdminPage() {
  const stackUser: any = null;
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [systemStatus, setSystemStatus] = useState('operational');

  useEffect(() => {
    async function loadMetrics() {
      try {
        const token = localStorage.getItem('auth_token');
        const res = await fetch('/api/admin/metrics', {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          cache: 'no-store',
        });
        const json = await res.json();
        if (json.ok) {
          setMetrics(json.data);
        }
      } catch (e) {
        console.error('Failed to load metrics:', e);
      } finally {
        setLoading(false);
      }
    }
    loadMetrics();
  }, []);

  const quickActions = [
    { label: 'Add Course', href: '/admin/courses', color: 'from-purple-500 to-indigo-600' },
    { label: 'View Leads', href: '/admin/leads', color: 'from-cyan-500 to-blue-600' },
    { label: 'Manage Users', href: '/admin/users', color: 'from-green-500 to-emerald-600' },
    { label: 'API Debug', href: '/admin/api-debug', color: 'from-orange-500 to-red-600' },
  ];

  const systemChecks = [
    { name: 'Database', status: 'operational', icon: Storage },
    { name: 'Authentication', status: 'operational', icon: CheckCircle },
    { name: 'API Services', status: 'operational', icon: CloudQueue },
    { name: 'Performance', status: 'optimal', icon: Speed },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-effect-strong rounded-xl p-8 border border-border-color">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-text-primary mb-2">
              Admin Dashboard
            </h1>
             <p className="text-text-secondary">Welcome back</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-text-secondary">System Status</p>
            <p className="text-lg font-semibold text-green-400 flex items-center gap-2 justify-end">
              <CheckCircle className="w-5 h-5" />
              All Systems Operational
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <>
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-effect rounded-xl p-6 border border-border-color animate-pulse">
                <div className="h-4 bg-gray-700 rounded w-24 mb-4" />
                <div className="h-8 bg-gray-700 rounded w-16" />
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="glass-effect rounded-xl p-6 border border-border-color hover:border-primary-accent/50 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary">Total Leads</h3>
                <People className="w-5 h-5 text-primary-accent group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-3xl font-bold text-text-primary">{metrics?.leadsCount || 0}</p>
              <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12% from last month
              </p>
            </div>

            <div className="glass-effect rounded-xl p-6 border border-border-color hover:border-primary-accent/50 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary">Active Courses</h3>
                <School className="w-5 h-5 text-primary-accent group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-3xl font-bold text-text-primary">{metrics?.coursesCount || 0}</p>
              <p className="text-xs text-text-secondary mt-2">Published & Draft</p>
            </div>

            <div className="glass-effect rounded-xl p-6 border border-border-color hover:border-primary-accent/50 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-text-secondary">Total Users</h3>
                <People className="w-5 h-5 text-primary-accent group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-3xl font-bold text-text-primary">{metrics?.usersCount || 0}</p>
              <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +5 this week
              </p>
            </div>
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="glass-effect-strong rounded-xl p-6 border border-border-color">
        <h2 className="text-xl font-bold text-text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="relative overflow-hidden rounded-lg p-4 text-center transition-all duration-300 hover:scale-105 group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <span className="relative z-10 text-sm font-semibold text-text-primary">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-effect-strong rounded-xl p-6 border border-border-color">
          <h2 className="text-xl font-bold text-text-primary mb-4">System Health</h2>
          <div className="space-y-3">
            {systemChecks.map((check) => {
              const Icon = check.icon;
              return (
                <div key={check.name} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-text-secondary" />
                    <span className="text-sm font-medium text-text-primary">{check.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-green-400 uppercase">
                    {check.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-effect-strong rounded-xl p-6 border border-border-color">
          <h2 className="text-xl font-bold text-text-primary mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <p className="text-sm text-text-secondary">No recent activity to display</p>
          </div>
        </div>
      </div>
    </div>
  );
}
