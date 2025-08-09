'use client';
import { useEffect, useState } from 'react';

interface Metrics {
  leadsCount: number;
  coursesCount: number;
  usersCount: number;
}

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem('auth_token');
        const res = await fetch('/api/admin/metrics', {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        const data = await res.json();
        if (!res.ok || !data.ok) throw new Error(data.error || 'Failed');
        setMetrics(data.data as Metrics);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div>Loading…</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!metrics) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      <StatCard label="Leads" value={metrics.leadsCount} />
      <StatCard label="Courses" value={metrics.coursesCount} />
      <StatCard label="Users" value={metrics.usersCount} />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</div>
      <div className="mt-2 text-3xl font-semibold">{value}</div>
    </div>
  );
}
