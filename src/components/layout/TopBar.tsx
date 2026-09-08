'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, Search, Shield, User, Download, LogOut, ChevronDown } from 'lucide-react';
import { cilSubsidiaries, associatedCoalEntities, subsidiaries, auditLog } from '@/lib/mock-data';
import { exportToCsv } from '@/lib/export-utils';

function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // Set initial time on client only to avoid hydration mismatch
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  const pad = (n: number) => String(n).padStart(2, '0');
  const day = pad(now.getDate());
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h12 = pad(hours % 12 || 12);

  return (
    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', letterSpacing: '0.03em', textAlign: 'right', lineHeight: 1.6, fontVariantNumeric: 'tabular-nums' }}>
      <div style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{day} {month} {year}</div>
      <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.02em' }}>
        {h12}:{minutes}:{seconds} {ampm}
      </div>
    </div>
  );
}

export default function TopBar() {
  const [subsidiary, setSubsidiary] = useState('All Subsidiaries');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const notifications = [
    { id: 1, text: 'Production variance detected — Barkakana Area', time: '2 hours ago', dot: 'var(--safety)' },
    { id: 2, text: '3 documents require validation review', time: 'Today, 09:48', dot: 'var(--copper)' },
    { id: 3, text: 'New topic trend identified: Mine Safety +18%', time: 'Yesterday', dot: 'var(--info)' },
    { id: 4, text: 'Geological report indexed — SECL Korba Block', time: 'Yesterday', dot: 'var(--verified)' },
  ];

  // Close panels when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-notif-panel]')) setNotifOpen(false);
      if (!target.closest('[data-profile-panel]')) setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleQuickExportAudit = () => {
    const headers = ['Time', 'Action', 'Officer', 'Detail', 'Classification'];
    const rows = auditLog.map(a => [a.time, a.action, a.user, a.detail, 'Official CIL Audit']);
    exportToCsv(`CIL_Security_Audit_${new Date().toISOString().slice(0, 10)}`, headers, rows);
    setProfileOpen(false);
  };

  return (
    <header style={{
      height: 52,
      background: 'var(--coal-900)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: 16,
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Subsidiary selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 4 }}>
        <span className="text-label" style={{ whiteSpace: 'nowrap' }}>Subsidiary</span>
        <select
          className="select-field"
          value={subsidiary}
          onChange={e => setSubsidiary(e.target.value)}
          style={{ minWidth: 230, fontSize: '0.75rem' }}
        >
          <option value="All Subsidiaries & Associated Entities">All Subsidiaries & Associated Entities</option>
          <optgroup label="CIL Operating Subsidiaries">
            {cilSubsidiaries.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </optgroup>
          <optgroup label="Associated Coal-Sector Entity">
            {associatedCoalEntities.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </optgroup>
        </select>
      </div>

      <div style={{ flex: 1 }} />

      {/* Global search */}
      <div style={{ position: 'relative', width: 220 }}>
        <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          className="input-field"
          placeholder="Search documents, reports..."
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          style={{ paddingLeft: 30, height: 32, fontSize: '0.8125rem' }}
        />
      </div>

      {/* Notifications */}
      <div style={{ position: 'relative' }} data-notif-panel>
        <button
          className="btn-ghost btn"
          style={{ padding: '6px 8px', position: 'relative' }}
          onClick={() => { setNotifOpen(v => !v); setProfileOpen(false); }}
          aria-label="Notifications"
        >
          <Bell size={15} />
          <span style={{
            position: 'absolute', top: 4, right: 4,
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--copper)', border: '2px solid var(--coal-900)',
          }} />
        </button>

        {notifOpen && (
          <div style={{
            position: 'absolute', top: 44, right: 0,
            width: 340, background: 'var(--surface-2)',
            border: '1px solid var(--border-light)',
            borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            zIndex: 200,
          }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="text-label">Notifications</span>
              <button
                style={{ fontSize: '0.6875rem', color: 'var(--copper)', cursor: 'pointer', background: 'none', border: 'none' }}
                onClick={() => setNotifOpen(false)}
              >
                Mark all read
              </button>
            </div>
            {notifications.map(n => (
              <div
                key={n.id}
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.025)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                <span className="status-dot" style={{ background: n.dot, marginTop: 5, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', marginBottom: 2 }}>{n.text}</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{n.time}</div>
                </div>
              </div>
            ))}
            <div style={{ padding: '10px 16px', textAlign: 'center' }}>
              <Link href="/dashboard/audit-trail" style={{ fontSize: '0.6875rem', color: 'var(--copper)', textDecoration: 'none' }} onClick={() => setNotifOpen(false)}>
                View all activity in Audit Trail &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Officer Profile Dropdown */}
      <div style={{ position: 'relative' }} data-profile-panel>
        <button
          className="btn-ghost btn"
          style={{
            padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 8,
            borderRadius: 3, border: '1px solid var(--border-light)',
            background: profileOpen ? 'rgba(255,255,255,0.05)' : 'transparent',
          }}
          onClick={() => { setProfileOpen(v => !v); setNotifOpen(false); }}
        >
          <div style={{
            width: 24, height: 24, borderRadius: '50%', background: 'var(--coal-700)',
            color: 'var(--copper)', fontSize: '0.6875rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            RK
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-primary)' }}>
            Dr. Rajiv Kumar
          </span>
          <ChevronDown size={11} color="var(--text-muted)" />
        </button>

        {profileOpen && (
          <div style={{
            position: 'absolute', top: 44, right: 0,
            width: 260, background: 'var(--surface-2)',
            border: '1px solid var(--border-light)',
            borderRadius: 4, boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            zIndex: 200, padding: 6,
          }}>
            <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>Dr. Rajiv Kumar</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>CGM (Geology & IT) · CMPDI Ranchi</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                <Shield size={9} color="var(--verified)" />
                <span style={{ fontSize: '0.625rem', color: 'var(--verified)', letterSpacing: '0.04em' }}>Level 4 Clearance</span>
              </div>
            </div>

            <div style={{ padding: '4px 0' }}>
              <Link
                href="/dashboard/admin"
                className="btn-ghost"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
                  width: '100%', fontSize: '0.75rem', color: 'var(--text-primary)', textDecoration: 'none',
                  borderRadius: 2,
                }}
                onClick={() => setProfileOpen(false)}
              >
                <User size={13} color="var(--copper)" />
                Admin Portal & Profile
              </Link>

              <button
                className="btn-ghost"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
                  width: '100%', fontSize: '0.75rem', color: 'var(--text-primary)',
                  borderRadius: 2, textAlign: 'left',
                }}
                onClick={handleQuickExportAudit}
              >
                <Download size={13} color="var(--info)" />
                Export Audit Log (CSV)
              </button>

              <div style={{ borderTop: '1px solid var(--border)', margin: '4px 0' }} />

              <Link
                href="/login"
                className="btn-ghost"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
                  width: '100%', fontSize: '0.75rem', color: 'var(--alert)', textDecoration: 'none',
                  borderRadius: 2,
                }}
                onClick={() => setProfileOpen(false)}
              >
                <LogOut size={13} />
                Sign Out
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Live clock */}
      <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: 16 }}>
        <LiveClock />
      </div>
    </header>
  );
}
