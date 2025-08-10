'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Dashboard,
  School,
  People,
  PersonAdd,
  Analytics,
  Settings,
  Storage,
  Api,
  Security,
  CloudSync
} from '@mui/icons-material';

const navSections = [
  {
    title: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', icon: Dashboard },
      { href: '/admin/analytics', label: 'Analytics', icon: Analytics },
    ]
  },
  {
    title: 'Content Management',
    items: [
      { href: '/admin/courses', label: 'Courses', icon: School },
      { href: '/admin/leads', label: 'Leads', icon: People },
    ]
  },
  {
    title: 'User Management',
    items: [
      { href: '/admin/users', label: 'Users', icon: PersonAdd },
      { href: '/admin/roles', label: 'Roles & Permissions', icon: Security },
    ]
  },
  {
    title: 'System',
    items: [
      { href: '/admin/database', label: 'Database', icon: Storage },
      { href: '/admin/api-debug', label: 'API Debug', icon: Api },
      { href: '/admin/sync', label: 'Sync & Seed', icon: CloudSync },
      { href: '/admin/settings', label: 'Settings', icon: Settings },
    ]
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 h-screen overflow-y-auto bg-background-paper border-r border-border-color glass-effect-strong">
      {/* Header */}
      <div className="p-6 border-b border-border-color">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-accent to-secondary-accent bg-clip-text text-transparent">
          Admin Portal
        </h2>
        <p className="text-xs text-text-secondary mt-1">Full Backend Control</p>
      </div>
      
      {/* Navigation */}
      <nav className="p-4 space-y-6">
        {navSections.map((section) => (
          <div key={section.title}>
            <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 px-2">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                      active
                        ? 'bg-secondary-accent text-white shadow-lg shadow-secondary-accent/20'
                        : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      
      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border-color bg-background-paper">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-text-secondary">System Operational</span>
        </div>
      </div>
    </aside>
  );
}

// Simple utility to join classnames (avoids adding another dependency)
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}
