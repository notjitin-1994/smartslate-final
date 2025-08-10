'use client';

import { useState, useEffect } from 'react';
import {
  Security,
  Add,
  Edit,
  Delete,
  CheckBox,
  CheckBoxOutlineBlank,
  AdminPanelSettings,
  Person,
  School,
  Analytics,
  Storage,
  Settings
} from '@mui/icons-material';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isSystem: boolean;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'owner',
      name: 'Owner',
      description: 'Full system access with all permissions',
      permissions: ['*'],
      userCount: 1,
      isSystem: true
    },
    {
      id: 'admin',
      name: 'Admin',
      description: 'Administrative access to most features',
      permissions: ['lead:read', 'lead:write', 'course:read', 'course:write', 'course:publish', 'metrics:read', 'user:read', 'user:write'],
      userCount: 2,
      isSystem: true
    },
    {
      id: 'user',
      name: 'User',
      description: 'Basic user access',
      permissions: ['profile:read', 'profile:write'],
      userCount: 339,
      isSystem: true
    }
  ]);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showModal, setShowModal] = useState(false);

  const allPermissions: Permission[] = [
    // Lead Permissions
    { id: 'lead:read', name: 'Read Leads', description: 'View lead information', category: 'Leads' },
    { id: 'lead:write', name: 'Write Leads', description: 'Create and update leads', category: 'Leads' },
    { id: 'lead:delete', name: 'Delete Leads', description: 'Remove leads from system', category: 'Leads' },
    
    // Course Permissions
    { id: 'course:read', name: 'Read Courses', description: 'View course information', category: 'Courses' },
    { id: 'course:create', name: 'Create Courses', description: 'Create new courses', category: 'Courses' },
    { id: 'course:write', name: 'Update Courses', description: 'Edit existing courses', category: 'Courses' },
    { id: 'course:publish', name: 'Publish Courses', description: 'Publish/unpublish courses', category: 'Courses' },
    { id: 'course:delete', name: 'Delete Courses', description: 'Remove courses', category: 'Courses' },
    
    // User Permissions
    { id: 'user:read', name: 'Read Users', description: 'View user information', category: 'Users' },
    { id: 'user:write', name: 'Write Users', description: 'Create and update users', category: 'Users' },
    { id: 'user:delete', name: 'Delete Users', description: 'Remove users', category: 'Users' },
    { id: 'role:manage', name: 'Manage Roles', description: 'Create and assign roles', category: 'Users' },
    
    // System Permissions
    { id: 'metrics:read', name: 'Read Metrics', description: 'View analytics and metrics', category: 'System' },
    { id: 'settings:read', name: 'Read Settings', description: 'View system settings', category: 'System' },
    { id: 'settings:write', name: 'Write Settings', description: 'Modify system settings', category: 'System' },
    { id: 'database:manage', name: 'Manage Database', description: 'Database operations', category: 'System' },
    
    // Profile Permissions
    { id: 'profile:read', name: 'Read Profile', description: 'View own profile', category: 'Profile' },
    { id: 'profile:write', name: 'Update Profile', description: 'Update own profile', category: 'Profile' },
  ];

  const permissionCategories = [...new Set(allPermissions.map(p => p.category))];

  const getRoleIcon = (roleId: string) => {
    switch (roleId) {
      case 'owner': return AdminPanelSettings;
      case 'admin': return Security;
      case 'user': return Person;
      default: return Person;
    }
  };

  const getRoleColor = (roleId: string) => {
    switch (roleId) {
      case 'owner': return 'from-purple-500 to-pink-600';
      case 'admin': return 'from-blue-500 to-cyan-600';
      case 'user': return 'from-green-500 to-emerald-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Roles & Permissions</h1>
          <p className="text-text-secondary mt-1">Manage user roles and their permissions</p>
        </div>
        <button
          onClick={() => {
            setSelectedRole(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-secondary-accent text-white rounded-lg hover:bg-secondary-accent-dark transition-colors duration-200"
        >
          <Add className="w-5 h-5" />
          <span>Create Role</span>
        </button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => {
          const Icon = getRoleIcon(role.id);
          return (
            <div
              key={role.id}
              className="glass-effect rounded-xl border border-border-color hover:border-primary-accent/50 transition-all duration-300 overflow-hidden group cursor-pointer"
              onClick={() => setSelectedRole(role)}
            >
              <div className={`h-2 bg-gradient-to-r ${getRoleColor(role.id)}`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${getRoleColor(role.id)} bg-opacity-20`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">{role.name}</h3>
                      {role.isSystem && (
                        <span className="text-xs text-text-secondary">System Role</span>
                      )}
                    </div>
                  </div>
                  {!role.isSystem && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle delete
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-red-400 hover:bg-red-500/20 rounded"
                    >
                      <Delete className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <p className="text-sm text-text-secondary mb-4">{role.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Permissions</span>
                    <span className="font-semibold text-text-primary">
                      {role.permissions[0] === '*' ? 'All' : role.permissions.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Users</span>
                    <span className="font-semibold text-text-primary">{role.userCount}</span>
                  </div>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRole(role);
                    setShowModal(true);
                  }}
                  className="mt-4 w-full px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium text-text-primary transition-colors flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Role</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Permission Matrix */}
      <div className="glass-effect-strong rounded-xl p-6 border border-border-color">
        <h2 className="text-xl font-bold text-text-primary mb-6">Permission Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-color">
                <th className="px-4 py-3 text-left text-sm font-semibold text-text-primary">Permission</th>
                {roles.map((role) => (
                  <th key={role.id} className="px-4 py-3 text-center text-sm font-semibold text-text-primary">
                    {role.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {permissionCategories.map((category) => (
                <>
                  <tr key={category} className="border-b border-border-color bg-white/5">
                    <td colSpan={roles.length + 1} className="px-4 py-2 text-sm font-semibold text-text-secondary">
                      {category}
                    </td>
                  </tr>
                  {allPermissions
                    .filter(p => p.category === category)
                    .map((permission) => (
                      <tr key={permission.id} className="border-b border-border-color hover:bg-white/5">
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-text-primary">{permission.name}</p>
                            <p className="text-xs text-text-secondary">{permission.id}</p>
                          </div>
                        </td>
                        {roles.map((role) => (
                          <td key={role.id} className="px-4 py-3 text-center">
                            {role.permissions[0] === '*' || role.permissions.includes(permission.id) ? (
                              <CheckBox className="w-5 h-5 text-green-400" />
                            ) : (
                              <CheckBoxOutlineBlank className="w-5 h-5 text-gray-600" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Details Modal */}
      {selectedRole && !showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-effect-strong rounded-xl p-6 border border-border-color max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-text-primary">{selectedRole.name} Role</h2>
              <button
                onClick={() => setSelectedRole(null)}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-white/10 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Description</h3>
                <p className="text-text-secondary">{selectedRole.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className="text-sm text-text-secondary">Total Users</p>
                    <p className="text-2xl font-bold text-text-primary">{selectedRole.userCount}</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <p className="text-sm text-text-secondary">Permissions</p>
                    <p className="text-2xl font-bold text-text-primary">
                      {selectedRole.permissions[0] === '*' ? 'All' : selectedRole.permissions.length}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Permissions</h3>
                {selectedRole.permissions[0] === '*' ? (
                  <p className="text-primary-accent">This role has all permissions</p>
                ) : (
                  <div className="space-y-2">
                    {selectedRole.permissions.map((permId) => {
                      const perm = allPermissions.find(p => p.id === permId);
                      return perm ? (
                        <div key={permId} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                          <CheckBox className="w-5 h-5 text-green-400" />
                          <div>
                            <p className="text-sm font-medium text-text-primary">{perm.name}</p>
                            <p className="text-xs text-text-secondary">{perm.description}</p>
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
