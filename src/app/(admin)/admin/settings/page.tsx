'use client';

import { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  Security,
  Email,
  Notifications,
  Storage,
  Api,
  ColorLens,
  Language,
  Schedule,
  CheckCircle
} from '@mui/icons-material';

interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: any;
  fields: SettingField[];
}

interface SettingField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'toggle' | 'number';
  value: any;
  options?: { value: string; label: string }[];
  description?: string;
}

export default function AdminSettingsPage() {
  const [activeSection, setActiveSection] = useState('general');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    siteName: 'SmartSlate',
    siteUrl: 'https://smartslate.io',
    adminEmail: 'admin@smartslate.io',
    timezone: 'America/New_York',
    language: 'en',
    maintenanceMode: false,
    
    authProvider: 'stack',
    sessionTimeout: 30,
    requireEmailVerification: true,
    allowRegistration: true,
    
    emailProvider: 'sendgrid',
    emailFrom: 'noreply@smartslate.io',
    emailApiKey: '••••••••••••••••',
    
    databaseBackup: true,
    backupFrequency: 'daily',
    backupRetention: 30,
    
    apiRateLimit: 100,
    apiTimeout: 30,
    enableWebhooks: true,
    
    theme: 'dark',
    primaryColor: '#a7dadb',
    logoUrl: '/logo.png'
  });

  useEffect(() => {
    async function loadSettings() {
      setLoading(false);
    }
    loadSettings();
  }, []);

  const sections: SettingSection[] = [
    {
      id: 'general',
      title: 'General Settings',
      description: 'Basic site configuration',
      icon: Settings,
      fields: [
        { id: 'siteName', label: 'Site Name', type: 'text', value: settings.siteName },
        { id: 'siteUrl', label: 'Site URL', type: 'text', value: settings.siteUrl },
        { id: 'adminEmail', label: 'Admin Email', type: 'email', value: settings.adminEmail },
        {
          id: 'timezone',
          label: 'Timezone',
          type: 'select',
          value: settings.timezone,
          options: [
            { value: 'America/New_York', label: 'Eastern Time (ET)' },
            { value: 'America/Chicago', label: 'Central Time (CT)' },
            { value: 'America/Denver', label: 'Mountain Time (MT)' },
            { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' }
          ]
        },
        {
          id: 'language',
          label: 'Language',
          type: 'select',
          value: settings.language,
          options: [
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Spanish' },
            { value: 'fr', label: 'French' }
          ]
        },
        { id: 'maintenanceMode', label: 'Maintenance Mode', type: 'toggle', value: settings.maintenanceMode }
      ]
    },
    {
      id: 'authentication',
      title: 'Authentication',
      description: 'User authentication and security',
      icon: Security,
      fields: [
        {
          id: 'authProvider',
          label: 'Auth Provider',
          type: 'select',
          value: settings.authProvider,
          options: [
            { value: 'stack', label: 'Stack Auth' },
            { value: 'auth0', label: 'Auth0' },
            { value: 'supabase', label: 'Supabase' }
          ]
        },
        { id: 'sessionTimeout', label: 'Session Timeout (minutes)', type: 'number', value: settings.sessionTimeout },
        { id: 'requireEmailVerification', label: 'Require Email Verification', type: 'toggle', value: settings.requireEmailVerification },
        { id: 'allowRegistration', label: 'Allow Registration', type: 'toggle', value: settings.allowRegistration }
      ]
    },
    {
      id: 'email',
      title: 'Email Configuration',
      description: 'Email service settings',
      icon: Email,
      fields: [
        {
          id: 'emailProvider',
          label: 'Email Provider',
          type: 'select',
          value: settings.emailProvider,
          options: [
            { value: 'sendgrid', label: 'SendGrid' },
            { value: 'mailgun', label: 'Mailgun' },
            { value: 'ses', label: 'Amazon SES' }
          ]
        },
        { id: 'emailFrom', label: 'From Email', type: 'email', value: settings.emailFrom },
        { id: 'emailApiKey', label: 'API Key', type: 'password', value: settings.emailApiKey }
      ]
    },
    {
      id: 'database',
      title: 'Database & Storage',
      description: 'Database configuration and backups',
      icon: Storage,
      fields: [
        { id: 'databaseBackup', label: 'Enable Automatic Backups', type: 'toggle', value: settings.databaseBackup },
        {
          id: 'backupFrequency',
          label: 'Backup Frequency',
          type: 'select',
          value: settings.backupFrequency,
          options: [
            { value: 'hourly', label: 'Hourly' },
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' }
          ]
        },
        { id: 'backupRetention', label: 'Backup Retention (days)', type: 'number', value: settings.backupRetention }
      ]
    },
    {
      id: 'api',
      title: 'API Configuration',
      description: 'API settings and rate limiting',
      icon: Api,
      fields: [
        { id: 'apiRateLimit', label: 'Rate Limit (requests/minute)', type: 'number', value: settings.apiRateLimit },
        { id: 'apiTimeout', label: 'Request Timeout (seconds)', type: 'number', value: settings.apiTimeout },
        { id: 'enableWebhooks', label: 'Enable Webhooks', type: 'toggle', value: settings.enableWebhooks }
      ]
    },
    {
      id: 'appearance',
      title: 'Appearance',
      description: 'Theme and branding settings',
      icon: ColorLens,
      fields: [
        {
          id: 'theme',
          label: 'Theme',
          type: 'select',
          value: settings.theme,
          options: [
            { value: 'dark', label: 'Dark' },
            { value: 'light', label: 'Light' }
          ]
        },
        { id: 'primaryColor', label: 'Primary Color', type: 'text', value: settings.primaryColor },
        { id: 'logoUrl', label: 'Logo URL', type: 'text', value: settings.logoUrl }
      ]
    }
  ];

  const handleSave = async () => {
    alert('Backend not available');
  };

  const currentSection = sections.find(s => s.id === activeSection)!;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">System Settings</h1>
          <p className="text-text-secondary mt-1">Configure your application settings</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-secondary-accent text-white rounded-lg hover:bg-secondary-accent-dark transition-colors duration-200"
        >
          {saved ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
          <span>{saved ? 'Saved!' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-effect-strong rounded-xl border border-border-color overflow-hidden">
            <div className="p-4 border-b border-border-color">
              <h2 className="text-lg font-semibold text-text-primary">Settings</h2>
            </div>
            <nav className="p-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-secondary-accent text-white'
                        : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{section.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Form */}
        <div className="lg:col-span-3">
          <div className="glass-effect-strong rounded-xl p-6 border border-border-color">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-text-primary mb-1">{currentSection.title}</h2>
              <p className="text-sm text-text-secondary">{currentSection.description}</p>
            </div>

            <div className="space-y-6">
              {currentSection.fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    {field.label}
                  </label>
                  
                  {field.type === 'text' || field.type === 'email' || field.type === 'password' ? (
                    <input
                      type={field.type}
                      value={field.value}
                      onChange={(e) => setSettings({ ...settings, [field.id]: e.target.value })}
                      className="w-full px-4 py-2 bg-input-bg border border-border-color rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary-accent transition-colors"
                    />
                  ) : field.type === 'number' ? (
                    <input
                      type="number"
                      value={field.value}
                      onChange={(e) => setSettings({ ...settings, [field.id]: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 bg-input-bg border border-border-color rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary-accent transition-colors"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      value={field.value}
                      onChange={(e) => setSettings({ ...settings, [field.id]: e.target.value })}
                      className="w-full px-4 py-2 bg-input-bg border border-border-color rounded-lg text-text-primary focus:outline-none focus:border-primary-accent transition-colors"
                    >
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === 'toggle' ? (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => setSettings({ ...settings, [field.id]: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-accent"></div>
                    </label>
                  ) : null}
                  
                  {field.description && (
                    <p className="mt-1 text-sm text-text-secondary">{field.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Environment Variables Info */}
          <div className="mt-6 glass-effect rounded-xl p-6 border border-border-color">
            <div className="flex items-center gap-3 mb-4">
              <Api className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-text-primary">Environment Variables</h3>
            </div>
            <p className="text-sm text-text-secondary mb-4">
              Some settings require environment variables to be set. Make sure the following are configured:
            </p>
            <div className="space-y-2">
              <code className="block text-sm bg-black/30 p-3 rounded-lg text-green-400">
                COGNITO_USER_POOL_ID=your_user_pool_id<br/>
                COGNITO_APP_CLIENT_ID=your_app_client_id<br/>
                COGNITO_REGION=your_region
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
