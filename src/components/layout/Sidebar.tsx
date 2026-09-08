'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Database, Search, BarChart3, 
  Tags, FileText, BookOpen, Clock, Shield, ChevronRight,
  Cpu, MapPin, UserCheck, Sparkles
} from 'lucide-react';

const navItems = [
  { id: '01', label: 'Overview', icon: LayoutDashboard, href: '/dashboard/overview' },
  { id: '02', label: 'Data Hub', icon: Database, href: '/dashboard/data-hub' },
  { id: '03', label: 'AI Search', icon: Search, href: '/dashboard/ai-search' },
  { id: '04', label: 'Geo Intelligence', icon: MapPin, href: '/dashboard/geo-intelligence' },
  { id: '05', label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
  { id: '06', label: 'Topics', icon: Tags, href: '/dashboard/topics' },
  { id: '07', label: 'Report Studio', icon: FileText, href: '/dashboard/report-studio' },
  { id: '08', label: 'Knowledge Base', icon: BookOpen, href: '/dashboard/knowledge-base' },
  { id: '09', label: 'Audit Trail', icon: Clock, href: '/dashboard/audit-trail' },
  { id: '10', label: 'Admin & Profile', icon: UserCheck, href: '/dashboard/admin' },
];

const systemStatus = [
  { label: 'DOC PIPELINE', status: 'ONLINE', color: 'var(--verified)' },
  { label: 'KNOWLEDGE INDEX', status: 'HEALTHY', color: 'var(--verified)' },
  { label: 'VALIDATION ENGINE', status: 'ACTIVE', color: 'var(--info)' },
  { label: 'REPORT ENGINE', status: 'READY', color: 'var(--verified)' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: 224,
      minWidth: 224,
      background: 'var(--coal-950)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{ 
        padding: '20px 20px 16px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{ 
            width: 28, height: 28, 
            background: 'var(--copper)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 3,
          }}>
            <Cpu size={15} color="#fff" strokeWidth={2} />
          </div>
          <span style={{ 
            fontSize: '0.9375rem', fontWeight: 700, 
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
          }}>
            GeoIntel AI
          </span>
          <span style={{ 
            fontSize: '0.5625rem', fontWeight: 600,
            background: 'var(--surface-3)',
            color: 'var(--copper)',
            padding: '1px 5px',
            borderRadius: 2,
            border: '1px solid var(--border-light)',
            letterSpacing: '0.05em',
            marginLeft: 'auto',
          }}>
            ENTERPRISE
          </span>
        </div>
        <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', letterSpacing: '0.02em' }}>
          CMPDI / CIL Mining Intelligence Platform
        </div>
      </div>

      {/* Navigation Links */}
      <nav style={{ 
        flex: 1, 
        padding: '12px 0',
        overflowY: 'auto',
      }}>
        <div className="text-label" style={{ padding: '0 20px', marginBottom: 8 }}>
          Modules
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || (item.href === '/dashboard/overview' && pathname === '/dashboard');
          return (
            <Link
              key={item.id}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '7px 20px',
                color: active ? 'var(--copper)' : 'var(--text-muted)',
                background: active ? 'rgba(181, 101, 29, 0.08)' : 'transparent',
                borderLeft: active ? '2px solid var(--copper)' : '2px solid transparent',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                position: 'relative',
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '0.625rem', fontWeight: 600, color: active ? 'var(--copper)' : 'var(--coal-600)', letterSpacing: '0.04em', minWidth: 18 }}>
                {item.id}
              </span>
              <Icon size={14} strokeWidth={1.75} />
              <span style={{ fontSize: '0.8125rem', fontWeight: active ? 500 : 400 }}>{item.label}</span>
              {active && <ChevronRight size={12} style={{ marginLeft: 'auto', color: 'var(--copper)', opacity: 0.6 }} />}
            </Link>
          );
        })}
      </nav>

      {/* System Status */}
      <div style={{ 
        borderTop: '1px solid var(--border)',
        padding: '12px 20px',
      }}>
        <div className="text-label" style={{ marginBottom: 8 }}>System Status</div>
        {systemStatus.map(s => (
          <div key={s.label} style={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 4,
          }}>
            <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', letterSpacing: '0.03em' }}>{s.label}</span>
            <span style={{ 
              fontSize: '0.5625rem', fontWeight: 700, 
              color: s.color,
              letterSpacing: '0.05em',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <span className="status-dot pulse-dot" style={{ background: s.color, width: 5, height: 5 }} />
              {s.status}
            </span>
          </div>
        ))}
      </div>

      {/* User Profile / Admin Link */}
      <Link
        href="/dashboard/admin"
        style={{ 
          borderTop: '1px solid var(--border)',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          textDecoration: 'none',
          background: pathname === '/dashboard/admin' ? 'rgba(181,101,29,0.08)' : 'transparent',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={e => {
          if (pathname !== '/dashboard/admin') (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
        }}
        onMouseLeave={e => {
          if (pathname !== '/dashboard/admin') (e.currentTarget as HTMLElement).style.background = 'transparent';
        }}
        title="Open Admin Portal & Officer Profile"
      >
        <div style={{ 
          width: 32, height: 32, borderRadius: '50%',
          background: 'var(--coal-700)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.75rem', fontWeight: 600, color: 'var(--copper)',
          border: '1px solid var(--border-light)',
          flexShrink: 0,
        }}>
          RK
        </div>
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Dr. Rajiv Kumar
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Shield size={9} color="var(--verified)" />
            <span style={{ fontSize: '0.625rem', color: 'var(--verified)', letterSpacing: '0.03em' }}>Level 4 · Admin Portal</span>
          </div>
        </div>
        <ChevronRight size={12} color={pathname === '/dashboard/admin' ? 'var(--copper)' : 'var(--text-muted)'} />
      </Link>
    </aside>
  );
}
