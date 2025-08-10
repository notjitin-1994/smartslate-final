'use client';

import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  BarChart,
  Timeline,
  DateRange,
  Assessment,
  Group,
  School,
  AttachMoney
} from '@mui/icons-material';
import { LineChart, Line, AreaChart, Area, BarChart as RechartsBarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  // Mock data - will be replaced by API data
  const mockData = {
    leadsOverTime: [
      { date: 'Mon', leads: 12 },
      { date: 'Tue', leads: 19 },
      { date: 'Wed', leads: 15 },
      { date: 'Thu', leads: 25 },
      { date: 'Fri', leads: 22 },
      { date: 'Sat', leads: 18 },
      { date: 'Sun', leads: 30 },
    ],
    leadsBySource: [
      { name: 'Course Waitlist', value: 45, color: '#06b6d4' },
      { name: 'Solara', value: 30, color: '#8b5cf6' },
      { name: 'SSA', value: 20, color: '#10b981' },
      { name: 'Partners', value: 15, color: '#f59e0b' },
      { name: 'Case Studies', value: 10, color: '#ef4444' },
    ],
    conversionFunnel: [
      { stage: 'Visitors', count: 1000 },
      { stage: 'Leads', count: 250 },
      { stage: 'Qualified', count: 100 },
      { stage: 'Customers', count: 25 },
    ],
    metrics: {
      totalLeads: { value: 141, change: 12.5, trend: 'up' },
      conversionRate: { value: 2.5, change: -0.3, trend: 'down' },
      avgDealSize: { value: 4500, change: 8.2, trend: 'up' },
      activeUsers: { value: 342, change: 5.1, trend: 'up' },
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  async function loadAnalytics() {
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`/api/admin/analytics?timeRange=${timeRange}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      
      if (res.ok) {
        const data = await res.json();
        setAnalyticsData(data.analytics);
      }
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  }

  const MetricCard = ({ title, value, change, trend, icon: Icon, prefix = '' }: any) => (
    <div className="glass-effect rounded-xl p-6 border border-border-color hover:border-primary-accent/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-8 h-8 text-primary-accent" />
        <span className={`flex items-center gap-1 text-sm font-semibold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {change}%
        </span>
      </div>
      <h3 className="text-sm font-medium text-text-secondary mb-1">{title}</h3>
      <p className="text-2xl font-bold text-text-primary">
        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-12 bg-gray-700 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-700 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Analytics Dashboard</h1>
          <p className="text-text-secondary mt-1">Track your business metrics and performance</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 bg-input-bg border border-border-color rounded-lg text-text-primary focus:outline-none focus:border-primary-accent transition-colors"
        >
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Leads"
          value={(analyticsData || mockData).metrics.totalLeads.value}
          change={(analyticsData || mockData).metrics.totalLeads.change}
          trend={(analyticsData || mockData).metrics.totalLeads.trend}
          icon={Group}
        />
        <MetricCard
          title="Conversion Rate"
          value={`${(analyticsData || mockData).metrics.conversionRate.value}%`}
          change={(analyticsData || mockData).metrics.conversionRate.change}
          trend={(analyticsData || mockData).metrics.conversionRate.trend}
          icon={TrendingUp}
        />
        <MetricCard
          title="Avg Deal Size"
          value={(analyticsData || mockData).metrics.avgDealSize.value}
          change={(analyticsData || mockData).metrics.avgDealSize.change}
          trend={(analyticsData || mockData).metrics.avgDealSize.trend}
          icon={AttachMoney}
          prefix="$"
        />
        <MetricCard
          title="Active Users"
          value={(analyticsData || mockData).metrics.activeUsers.value}
          change={(analyticsData || mockData).metrics.activeUsers.change}
          trend={(analyticsData || mockData).metrics.activeUsers.trend}
          icon={School}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads Over Time */}
        <div className="glass-effect-strong rounded-xl p-6 border border-border-color">
          <h2 className="text-xl font-bold text-text-primary mb-4">Lead Generation Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={(analyticsData || mockData).leadsOverTime}>
              <defs>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a7dadb" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#a7dadb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3a4a" />
              <XAxis dataKey="date" stroke="#b0c5c6" />
              <YAxis stroke="#b0c5c6" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#142433', border: '1px solid #2a3a4a', borderRadius: '8px' }}
                labelStyle={{ color: '#b0c5c6' }}
              />
              <Area type="monotone" dataKey="leads" stroke="#a7dadb" fillOpacity={1} fill="url(#colorLeads)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Leads by Source */}
        <div className="glass-effect-strong rounded-xl p-6 border border-border-color">
          <h2 className="text-xl font-bold text-text-primary mb-4">Leads by Source</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={(analyticsData || mockData).leadsBySource}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {(analyticsData || mockData).leadsBySource.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#142433', border: '1px solid #2a3a4a', borderRadius: '8px' }}
                labelStyle={{ color: '#b0c5c6' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-4">
            {(analyticsData || mockData).leadsBySource.map((source: any) => (
              <div key={source.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                <span className="text-sm text-text-secondary">{source.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="glass-effect-strong rounded-xl p-6 border border-border-color">
        <h2 className="text-xl font-bold text-text-primary mb-4">Conversion Funnel</h2>
        <ResponsiveContainer width="100%" height={300}>
          <RechartsBarChart data={(analyticsData || mockData).conversionFunnel} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#2a3a4a" />
            <XAxis dataKey="stage" stroke="#b0c5c6" />
            <YAxis stroke="#b0c5c6" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#142433', border: '1px solid #2a3a4a', borderRadius: '8px' }}
              labelStyle={{ color: '#b0c5c6' }}
            />
            <Bar dataKey="count" fill="#4F46E5" radius={[8, 8, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>

      {/* Additional Insights */}
      <div className="glass-effect-strong rounded-xl p-6 border border-border-color">
        <h2 className="text-xl font-bold text-text-primary mb-4">Quick Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <Assessment className="w-6 h-6 text-primary-accent mb-2" />
            <h3 className="text-sm font-medium text-text-secondary mb-1">Best Performing Source</h3>
            <p className="text-lg font-semibold text-text-primary">Course Waitlist</p>
            <p className="text-xs text-green-400">↑ 32% conversion rate</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <Timeline className="w-6 h-6 text-primary-accent mb-2" />
            <h3 className="text-sm font-medium text-text-secondary mb-1">Peak Activity Time</h3>
            <p className="text-lg font-semibold text-text-primary">2-4 PM EST</p>
            <p className="text-xs text-text-secondary">Most leads generated</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <DateRange className="w-6 h-6 text-primary-accent mb-2" />
            <h3 className="text-sm font-medium text-text-secondary mb-1">Average Sales Cycle</h3>
            <p className="text-lg font-semibold text-text-primary">21 days</p>
            <p className="text-xs text-green-400">↓ 3 days from last month</p>
          </div>
        </div>
      </div>
    </div>
  );
}
