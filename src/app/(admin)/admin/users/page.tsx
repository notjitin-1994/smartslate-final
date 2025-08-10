'use client';

import { useState, useEffect } from 'react';
import {
  PersonAdd,
  Edit,
  Delete,
  Security,
  Search,
  FilterList,
  MoreVert,
  CheckCircle,
  Cancel,
  Email,
  DateRange,
  AdminPanelSettings
} from '@mui/icons-material';
import { User } from '@prisma/client';

interface UserWithRoles extends User {
  roles?: string[];
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithRoles | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('/api/users', {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      
      if (!res.ok) {
        throw new Error(`Failed to fetch users: ${res.status}`);
      }
      
      const data = await res.json();
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (data && Array.isArray(data.users)) {
        // Handle case where API returns {users: [...]}
        setUsers(data.users);
      } else {
        console.error('Unexpected data format from API:', data);
        setUsers([]);
      }
    } catch (e) {
      console.error('Failed to load users:', e);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  async function createUser(email: string, name: string) {
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ email, name })
      });
      if (res.ok) {
        loadUsers();
        setShowCreateModal(false);
      }
    } catch (e) {
      console.error('Failed to create user:', e);
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = 
      filterRole === 'all' || 
      user.roles?.includes(filterRole);
    return matchesSearch && matchesRole;
  });

  async function updateUserRoles(userId: string, roles: string[]) {
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`/api/users/${userId}/roles`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ roles })
      });
      if (res.ok) {
        loadUsers();
        setSelectedUser(null);
      } else {
        const error = await res.json();
        alert(`Failed to update roles: ${error.error || 'Unknown error'}`);
      }
    } catch (e) {
      console.error('Failed to update user roles:', e);
      alert('Failed to update user roles');
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'learner': return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'smartslateCourse': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'smartslateSales': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'smartslateSupport': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50';
      case 'smartslateAnalytics': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50';
      case 'smartslateAdmin': return 'bg-red-500/20 text-red-400 border-red-500/50';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'owner': return 'Owner';
      case 'learner': return 'Learner';
      case 'smartslateCourse': return 'Course Manager';
      case 'smartslateSales': return 'Sales Manager';
      case 'smartslateSupport': return 'Support Agent';
      case 'smartslateAnalytics': return 'Analyst';
      case 'smartslateAdmin': return 'Platform Admin';
      default: return role;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-12 bg-gray-700 rounded-lg animate-pulse" />
        <div className="h-64 bg-gray-700 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">User Management</h1>
          <p className="text-text-secondary mt-1">Manage users and their permissions</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-secondary-accent text-white rounded-lg hover:bg-secondary-accent-dark transition-colors duration-200"
        >
          <PersonAdd className="w-5 h-5" />
          <span>Create User</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-xl p-4 border border-border-color">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Users</p>
              <p className="text-2xl font-bold text-text-primary">{users.length}</p>
            </div>
            <PersonAdd className="w-8 h-8 text-primary-accent opacity-50" />
          </div>
        </div>
        <div className="glass-effect rounded-xl p-4 border border-border-color">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Admins</p>
              <p className="text-2xl font-bold text-text-primary">
                {users.filter(u => u.roles?.includes('admin')).length}
              </p>
            </div>
            <AdminPanelSettings className="w-8 h-8 text-blue-400 opacity-50" />
          </div>
        </div>
        <div className="glass-effect rounded-xl p-4 border border-border-color">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Active Today</p>
              <p className="text-2xl font-bold text-text-primary">12</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400 opacity-50" />
          </div>
        </div>
        <div className="glass-effect rounded-xl p-4 border border-border-color">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">New This Week</p>
              <p className="text-2xl font-bold text-text-primary">5</p>
            </div>
            <DateRange className="w-8 h-8 text-orange-400 opacity-50" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass-effect-strong rounded-xl p-4 border border-border-color">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Search by email or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input-bg border border-border-color rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary-accent transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <FilterList className="w-5 h-5 text-text-secondary" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 bg-input-bg border border-border-color rounded-lg text-text-primary focus:outline-none focus:border-primary-accent transition-colors"
            >
              <option value="all">All Roles</option>
              <option value="owner">Owners</option>
              <option value="admin">Admins</option>
              <option value="user">Users</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      {filteredUsers.length === 0 ? (
        <div className="glass-effect-strong rounded-xl p-12 border border-border-color text-center">
          <PersonAdd className="w-16 h-16 mx-auto mb-4 text-text-secondary opacity-50" />
          <p className="text-text-secondary">
            {searchTerm ? 'No users found matching your search' : 'No users created yet'}
          </p>
        </div>
      ) : (
        <div className="glass-effect rounded-xl border border-border-color overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-color bg-white/5">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">User</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">Roles</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">Created</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-color">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-accent/20 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary-accent">
                            {user.email?.[0]?.toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-primary">{user.email}</p>
                          <p className="text-xs text-text-secondary">{user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {user.roles?.map((role) => (
                          <span
                            key={role}
                            className={`px-2 py-1 rounded-full text-xs font-semibold border ${getRoleBadgeColor(role)}`}
                          >
                            {getRoleDisplayName(role)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm text-green-400">Active</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-text-secondary">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="p-2 text-text-secondary hover:text-text-primary hover:bg-white/10 rounded-lg transition-colors"
                          title="Edit roles"
                        >
                          <Security className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-text-secondary hover:text-text-primary hover:bg-white/10 rounded-lg transition-colors"
                          title="More options"
                        >
                          <MoreVert className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-effect-strong rounded-xl p-6 border border-border-color max-w-md w-full">
            <h2 className="text-xl font-bold text-text-primary mb-4">Create New User</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              createUser(formData.get('email') as string, formData.get('name') as string);
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 bg-input-bg border border-border-color rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary-accent transition-colors"
                    placeholder="user@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-2 bg-input-bg border border-border-color rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary-accent transition-colors"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-secondary-accent text-white rounded-lg hover:bg-secondary-accent-dark transition-colors"
                >
                  Create User
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 bg-white/10 text-text-primary rounded-lg hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Role Management Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-effect-strong rounded-xl p-6 border border-border-color max-w-md w-full">
            <h2 className="text-xl font-bold text-text-primary mb-4">Manage User Roles</h2>
            <div className="mb-4">
              <p className="text-text-secondary">User: {selectedUser.email}</p>
              {selectedUser.email === 'jitin@smartslate.io' && (
                <p className="text-xs text-yellow-400 mt-1">⚠️ This user must remain as Owner</p>
              )}
            </div>
            <div className="space-y-2">
              {[
                { id: 'owner', name: 'Owner', description: 'Full system access' },
                { id: 'learner', name: 'Learner', description: 'Can browse and read courses' },
                { id: 'smartslateCourse', name: 'Course Manager', description: 'Manage courses' },
                { id: 'smartslateSales', name: 'Sales Manager', description: 'Access leads and CRM' },
                { id: 'smartslateSupport', name: 'Support Agent', description: 'Handle support tickets' },
                { id: 'smartslateAnalytics', name: 'Analyst', description: 'View metrics and reports' },
                { id: 'smartslateAdmin', name: 'Platform Admin', description: 'Configure platform settings' }
              ].map((role) => {
                const isOwnerEmail = selectedUser.email === 'jitin@smartslate.io';
                const isOwnerRole = role.id === 'owner';
                const isDisabled = isOwnerEmail && isOwnerRole;
                const tempRoles = [...(selectedUser.roles || [])];
                
                return (
                  <label 
                    key={role.id} 
                    className={`flex items-start gap-3 p-3 bg-white/5 rounded-lg ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-white/10'}`}
                  >
                    <input
                      type="checkbox"
                      checked={tempRoles.includes(role.id)}
                      disabled={isDisabled}
                      onChange={(e) => {
                        if (isDisabled) return;
                        const newRoles = e.target.checked 
                          ? [...tempRoles, role.id]
                          : tempRoles.filter(r => r !== role.id);
                        setSelectedUser({ ...selectedUser, roles: newRoles });
                      }}
                      className="w-4 h-4 mt-0.5 text-primary-accent bg-input-bg border-border-color rounded focus:ring-primary-accent"
                    />
                    <div className="flex-1">
                      <span className="text-text-primary block">{role.name}</span>
                      <span className="text-xs text-text-secondary">{role.description}</span>
                    </div>
                  </label>
                );
              })}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  if (selectedUser.email === 'jitin@smartslate.io' && !selectedUser.roles?.includes('owner')) {
                    alert('Cannot remove Owner role from jitin@smartslate.io');
                    return;
                  }
                  updateUserRoles(selectedUser.id, selectedUser.roles || []);
                }}
                className="flex-1 px-4 py-2 bg-secondary-accent text-white rounded-lg hover:bg-secondary-accent-dark transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setSelectedUser(null)}
                className="flex-1 px-4 py-2 bg-white/10 text-text-primary rounded-lg hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
