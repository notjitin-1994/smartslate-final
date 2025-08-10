'use client';
import { useEffect, useState } from 'react';
import { Tabs, Tab } from '@mui/material';

interface LeadsResponse {
  waitlist: any[];
  solara: any[];
  ssa: any[];
  caseStudies: any[];
  partners: any[];
}

export default function AdminLeadsPage() {
  const [data, setData] = useState<LeadsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState('waitlist');

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem('auth_token');
        const res = await fetch('/api/admin/leads', {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          cache: 'no-store',
        });
        const json = await res.json();
        if (!res.ok || !json.ok) throw new Error(json.error || 'Failed to fetch leads');
        setData(json.data);
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
  if (!data) return null;

  const current = data[tab as keyof LeadsResponse] as any[];

  return (
    <div>
      <Tabs value={tab} onChange={(_e, newValue) => setTab(newValue)} sx={{ marginBottom: 2 }}>
        <Tab value="waitlist" label="Course Waitlist" />
        <Tab value="solara" label="Solara" />
        <Tab value="ssa" label="SSA" />
        <Tab value="caseStudies" label="Case Studies" />
        <Tab value="partners" label="Partners" />
      </Tabs>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              {current.length > 0 ? Object.keys(current[0]).map((key) => (
                <th key={key} className="px-3 py-2 text-left font-semibold capitalize">
                  {key}
                </th>
              )) : (
                <th className="p-4">No data</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {current.map((row) => (
              <tr key={row.id}>
                {Object.keys(row).map((key) => (
                  <td key={key} className="px-3 py-2 whitespace-nowrap">{String(row[key])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
