'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bell, Search, Shield, User, Download, LogOut, ChevronDown, 
  FileText, FileSpreadsheet, File, Image as ImageIcon, 
  Sparkles, X, ArrowRight, CornerDownLeft, Database
} from 'lucide-react';
import { cilSubsidiaries, associatedCoalEntities, subsidiaries, auditLog } from '@/lib/mock-data';
import { useDocuments } from '@/lib/documents-context';
import { useCopilot } from '@/lib/copilot-context';
import { useToast } from '@/lib/toast';
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
  const router = useRouter();
  const { documents } = useDocuments();
  const { toggleCopilot } = useCopilot();
  const { showToast } = useToast();
  const [subsidiary, setSubsidiary] = useState('All Subsidiaries');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

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
      if (!target.closest('[data-search-panel]')) setSearchOpen(false);
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

  const query = searchVal.trim().toLowerCase();
  const matchingDocs = query ? documents.filter(d => 
    d.name.toLowerCase().includes(query) ||
    d.id.toLowerCase().includes(query) ||
    d.source.toLowerCase().includes(query) ||
    (d.mine && d.mine.toLowerCase().includes(query)) ||
    d.department.toLowerCase().includes(query) ||
    d.type.toLowerCase().includes(query) ||
    d.description.toLowerCase().includes(query)
  ).slice(0, 5) : [];

  const quickSections = [
    { name: 'AI Deep Search', path: `/dashboard/ai-search?q=${encodeURIComponent(searchVal)}`, desc: 'Semantic query engine with source traceability' },
    { name: 'Data Hub Records', path: `/dashboard/data-hub?q=${encodeURIComponent(searchVal)}`, desc: 'Filter all repository files and processing queue' },
    { name: 'Geo Intelligence', path: `/dashboard/geo-intelligence`, desc: 'Borehole lithology & Gondwana basin models' },
    { name: 'Analytics & Trends', path: `/dashboard/analytics`, desc: '5-year national & subsidiary statistics' },
    { name: 'Report Studio', path: `/dashboard/report-studio`, desc: 'Ministry & statutory report generation' },
  ].filter(s => {
    if (!query) return false;
    return s.name.toLowerCase().includes(query) || s.desc.toLowerCase().includes(query) ||
      (query.includes('ai') && s.name.includes('AI')) ||
      (query.includes('geo') && s.name.includes('Geo')) ||
      (query.includes('report') && s.name.includes('Report'));
  });

  const handleSelectDoc = (docId: string, docName: string) => {
    setSearchOpen(false);
    setSearchVal('');
    router.push(`/dashboard/data-hub?doc=${encodeURIComponent(docId)}&q=${encodeURIComponent(searchVal)}`);
    showToast(`Opening document ${docName} in Data Hub`, 'info');
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSearchOpen(false);
      if (!searchVal.trim()) return;
      if (matchingDocs.length > 0) {
        router.push(`/dashboard/data-hub?q=${encodeURIComponent(searchVal.trim())}`);
      } else {
        router.push(`/dashboard/ai-search?q=${encodeURIComponent(searchVal.trim())}`);
      }
    } else if (e.key === 'Escape') {
      setSearchOpen(false);
    }
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
      <div style={{ position: 'relative', width: 280 }} data-search-panel>
        <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
        <input
          className="input-field"
          placeholder="Search documents, reports..."
          value={searchVal}
          onChange={e => {
            setSearchVal(e.target.value);
            setSearchOpen(true);
          }}
          onFocus={() => {
            if (searchVal.trim()) setSearchOpen(true);
          }}
          onKeyDown={handleSearchKeyDown}
          style={{ paddingLeft: 30, paddingRight: searchVal ? 28 : 12, height: 32, fontSize: '0.8125rem', width: '100%' }}
        />
        {searchVal && (
          <button
            onClick={() => { setSearchVal(''); setSearchOpen(false); }}
            style={{
              position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', padding: 2
            }}
            title="Clear search"
          >
            <X size={12} />
          </button>
        )}

        {/* Live Search Results Dropdown */}
        {searchOpen && searchVal.trim().length > 0 && (
          <div style={{
            position: 'absolute',
            top: 38,
            right: 0,
            width: 420,
            maxHeight: 460,
            overflowY: 'auto',
            background: 'var(--surface-2)',
            border: '1px solid var(--border-light)',
            borderRadius: 4,
            boxShadow: '0 16px 40px rgba(0,0,0,0.65)',
            zIndex: 300,
          }}>
            {/* Header bar */}
            <div style={{
              padding: '10px 14px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'var(--surface-3)',
            }}>
              <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                SEARCH RESULTS ({matchingDocs.length} {matchingDocs.length === 1 ? 'DOC' : 'DOCS'})
              </span>
              <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>
                Press <kbd style={{ padding: '1px 4px', background: 'var(--coal-800)', borderRadius: 2, border: '1px solid var(--border)' }}>↵</kbd> to open
              </span>
            </div>

            {/* Matching Documents list */}
            {matchingDocs.length > 0 && (
              <div style={{ padding: '6px 0' }}>
                <div style={{ padding: '6px 14px 4px', fontSize: '0.625rem', fontWeight: 600, color: 'var(--copper)', letterSpacing: '0.06em' }}>
                  MATCHING DOCUMENTS
                </div>
                {matchingDocs.map(doc => (
                  <div
                    key={doc.id}
                    onClick={() => handleSelectDoc(doc.id, doc.name)}
                    style={{
                      padding: '8px 14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      transition: 'background 0.15s',
                      borderBottom: '1px solid rgba(255,255,255,0.03)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(181,101,29,0.1)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: 2,
                      background: 'var(--surface-3)', border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                      {doc.type === 'XLSX' ? (
                        <FileSpreadsheet size={14} color="var(--verified)" />
                      ) : (
                        <FileText size={14} color="var(--info)" />
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-primary)',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                      }}>
                        {doc.name}
                      </div>
                      <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', display: 'flex', gap: 6, alignItems: 'center' }}>
                        <span>{doc.id}</span>
                        <span>&bull;</span>
                        <span>{doc.source}</span>
                      </div>
                    </div>
                    <span className="badge badge-verified" style={{ fontSize: '0.5625rem', padding: '2px 5px', flexShrink: 0 }}>
                      {doc.type}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Sections matches */}
            {quickSections.length > 0 && (
              <div style={{ padding: '6px 0', borderTop: matchingDocs.length > 0 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ padding: '6px 14px 4px', fontSize: '0.625rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                  QUICK NAVIGATION
                </div>
                {quickSections.map(sec => (
                  <div
                    key={sec.name}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchVal('');
                      router.push(sec.path);
                    }}
                    style={{
                      padding: '8px 14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-primary)' }}>{sec.name}</div>
                      <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>{sec.desc}</div>
                    </div>
                    <ArrowRight size={12} color="var(--text-muted)" />
                  </div>
                ))}
              </div>
            )}

            {/* No matches state */}
            {matchingDocs.length === 0 && quickSections.length === 0 && (
              <div style={{ padding: '24px 16px', textAlign: 'center' }}>
                <Search size={22} color="var(--text-muted)" style={{ margin: '0 auto 8px', opacity: 0.6 }} />
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', marginBottom: 4 }}>
                  No repository files named &quot;{searchVal}&quot;
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: 12 }}>
                  Search across all 12,486 indexed records using AI Deep Semantic Search:
                </div>
                <button
                  className="btn btn-primary"
                  style={{ fontSize: '0.75rem', padding: '6px 14px', margin: '0 auto' }}
                  onClick={() => {
                    setSearchOpen(false);
                    router.push(`/dashboard/ai-search?q=${encodeURIComponent(searchVal)}`);
                  }}
                >
                  <Sparkles size={12} />
                  Run AI Deep Search
                </button>
              </div>
            )}

            {/* Footer action buttons */}
            <div style={{
              padding: '8px 12px',
              background: 'var(--surface-3)',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              gap: 8,
              justifyContent: 'flex-end',
            }}>
              <button
                className="btn btn-secondary"
                style={{ fontSize: '0.6875rem', padding: '4px 10px', height: 26 }}
                onClick={() => {
                  setSearchOpen(false);
                  router.push(`/dashboard/data-hub?q=${encodeURIComponent(searchVal)}`);
                }}
              >
                <Database size={11} />
                View in Data Hub
              </button>
              <button
                className="btn btn-primary"
                style={{ fontSize: '0.6875rem', padding: '4px 10px', height: 26 }}
                onClick={() => {
                  setSearchOpen(false);
                  router.push(`/dashboard/ai-search?q=${encodeURIComponent(searchVal)}`);
                }}
              >
                <Sparkles size={11} />
                AI Deep Search
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Ask Copilot Button */}
      <button
        onClick={toggleCopilot}
        className="btn btn-secondary"
        style={{
          height: 32,
          padding: '0 12px',
          fontSize: '0.75rem',
          gap: 6,
          borderColor: 'rgba(181, 101, 29, 0.45)',
          background: 'rgba(181, 101, 29, 0.1)',
          color: 'var(--copper)',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 3,
        }}
        title="Open GeoIntel AI Copilot & Website Guide"
      >
        <Sparkles size={13} color="var(--copper)" />
        <span style={{ fontWeight: 600 }}>Ask Copilot</span>
      </button>

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
