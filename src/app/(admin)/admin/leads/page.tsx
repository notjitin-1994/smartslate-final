'use client';
import { useEffect, useState } from 'react';
import { 
  Download, 
  Search, 
  FilterList,
  Email,
  Person,
  Business,
  CalendarToday,
  School,
  Science,
  Handshake,
  Description,
  Group,
  Delete,
  CheckBox,
  CheckBoxOutlineBlank,
  IndeterminateCheckBox
} from '@mui/icons-material';

interface LeadsResponse {
  waitlist: any[];
  solara: any[];
  ssa: any[];
  caseStudies: any[];
  partners: any[];
}

const tabConfig = [
  { value: 'waitlist', label: 'Course Waitlist', icon: School, color: 'from-blue-500 to-cyan-600' },
  { value: 'solara', label: 'Solara Interest', icon: Science, color: 'from-purple-500 to-pink-600' },
  { value: 'ssa', label: 'SSA Inquiries', icon: Business, color: 'from-green-500 to-emerald-600' },
  { value: 'caseStudies', label: 'Case Studies', icon: Description, color: 'from-orange-500 to-red-600' },
  { value: 'partners', label: 'Partners', icon: Handshake, color: 'from-indigo-500 to-purple-600' },
];

export default function AdminLeadsPage() {
  const [data, setData] = useState<LeadsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('waitlist');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      setData({ waitlist: [], solara: [], ssa: [], caseStudies: [], partners: [] });
      setLoading(false);
    }
    load();
  }, []);

  async function deleteLead(_leadType: string, _leadId: string) { return false; }

  async function deleteSelectedLeads() {
    if (selectedLeads.size === 0) return;
    
    const confirmMsg = `Are you sure you want to delete ${selectedLeads.size} lead${selectedLeads.size > 1 ? 's' : ''}?`;
    if (!confirm(confirmMsg)) return;

    setIsDeleting(true);
    const deletePromises = Array.from(selectedLeads).map(leadId => 
      deleteLead(activeTab, leadId)
    );
    
    const results = await Promise.all(deletePromises);
    const successCount = results.filter(r => r).length;
    
    if (successCount > 0) {
      await load();
      setSelectedLeads(new Set());
    }
    
    setIsDeleting(false);
    
    if (successCount === selectedLeads.size) {
      alert(`Successfully deleted ${successCount} lead${successCount > 1 ? 's' : ''}`);
    } else {
      alert(`Deleted ${successCount} out of ${selectedLeads.size} leads. Some deletions failed.`);
    }
  }

  const toggleLeadSelection = (leadId: string) => {
    const newSelection = new Set(selectedLeads);
    if (newSelection.has(leadId)) {
      newSelection.delete(leadId);
    } else {
      newSelection.add(leadId);
    }
    setSelectedLeads(newSelection);
  };

  const toggleAllSelection = () => {
    if (selectedLeads.size === filteredLeads.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(filteredLeads.map(lead => lead.id)));
    }
  };

  const current = data?.[activeTab as keyof LeadsResponse] as any[] || [];
  const filteredLeads = current.filter(lead => {
    const searchLower = searchTerm.toLowerCase();
    return Object.values(lead).some(value => 
      String(value).toLowerCase().includes(searchLower)
    );
  });

  const exportLeads = () => {
    const headers = Object.keys(filteredLeads[0] || {});
    const csv = [
      headers.join(','),
      ...filteredLeads.map(lead => 
        headers.map(key => `"${String(lead[key] || '').replace(/"/g, '""')}"`).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeTab}-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const activeTabConfig = tabConfig.find(t => t.value === activeTab)!;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-12 bg-gray-700 rounded-lg animate-pulse" />
        <div className="h-64 bg-gray-700 rounded-lg animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-effect-strong rounded-xl p-8 border border-red-500/50 text-center">
        <p className="text-red-400 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Lead Management</h1>
          <p className="text-text-secondary mt-1">Track and manage all your leads in one place</p>
        </div>
        <button
          onClick={exportLeads}
          disabled={filteredLeads.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-primary-accent text-background-dark rounded-lg hover:bg-primary-accent-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-5 h-5" />
          <span>Export CSV</span>
        </button>
        {selectedLeads.size > 0 && (
          <button
            onClick={deleteSelectedLeads}
            disabled={isDeleting}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Delete className="w-5 h-5" />
            <span>{isDeleting ? 'Deleting...' : `Delete (${selectedLeads.size})`}</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabConfig.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.value;
          const count = data?.[tab.value as keyof LeadsResponse]?.length || 0;
          
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`
                relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-white/10 text-text-primary shadow-lg' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
              <span className={`
                ml-2 px-2 py-0.5 rounded-full text-xs font-semibold
                ${isActive ? 'bg-primary-accent text-background-dark' : 'bg-white/10'}
              `}>
                {count}
              </span>
              {isActive && (
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${tab.color}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="glass-effect-strong rounded-xl p-4 border border-border-color">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder={`Search ${activeTabConfig.label.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input-bg border border-border-color rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary-accent transition-colors"
            />
          </div>
          <div className="flex items-center gap-4 text-sm text-text-secondary">
            <span>{filteredLeads.length} leads found</span>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      {filteredLeads.length === 0 ? (
        <div className="glass-effect-strong rounded-xl p-12 border border-border-color text-center">
          <activeTabConfig.icon className="w-16 h-16 mx-auto mb-4 text-text-secondary opacity-50" />
          <p className="text-text-secondary">
            {searchTerm ? 'No leads found matching your search' : `No ${activeTabConfig.label.toLowerCase()} yet`}
          </p>
        </div>
      ) : (
        <div className="glass-effect rounded-xl border border-border-color overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-color bg-white/5">
                  <th className="px-4 py-3 w-12">
                    <button
                      onClick={toggleAllSelection}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                      title={selectedLeads.size === filteredLeads.length ? 'Deselect all' : 'Select all'}
                    >
                      {selectedLeads.size === 0 ? (
                        <CheckBoxOutlineBlank className="w-5 h-5 text-text-secondary" />
                      ) : selectedLeads.size === filteredLeads.length ? (
                        <CheckBox className="w-5 h-5 text-primary-accent" />
                      ) : (
                        <IndeterminateCheckBox className="w-5 h-5 text-primary-accent" />
                      )}
                    </button>
                  </th>
                  {Object.keys(filteredLeads[0]).map((key) => (
                    <th key={key} className="px-4 py-3 text-left text-sm font-semibold text-text-primary">
                      {formatColumnName(key)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color">
                {filteredLeads.map((lead, idx) => (
                  <tr key={lead.id || idx} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleLeadSelection(lead.id)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        {selectedLeads.has(lead.id) ? (
                          <CheckBox className="w-5 h-5 text-primary-accent" />
                        ) : (
                          <CheckBoxOutlineBlank className="w-5 h-5 text-text-secondary" />
                        )}
                      </button>
                    </td>
                    {Object.entries(lead).map(([key, value]) => (
                      <td key={key} className="px-4 py-3 text-sm text-text-secondary">
                        {formatCellValue(key, value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function formatColumnName(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace(/Id$/, 'ID');
}

function formatCellValue(key: string, value: any): string {
  if (value === null || value === undefined) return '-';
  if (key.includes('createdAt') || key.includes('updatedAt')) {
    return new Date(value).toLocaleDateString();
  }
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  return String(value);
}
