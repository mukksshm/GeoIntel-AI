'use client';

import { useState } from 'react';
import { 
  FileText, Search, CheckCircle, Upload, RefreshCw, 
  Lock, Eye, AlertTriangle, Shield, Filter
} from 'lucide-react';
import { auditLog } from '@/lib/mock-data';
import { exportToCsv, exportToPdf } from '@/lib/export-utils';

const typeConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  report: { icon: <FileText size={13} />, color: 'var(--info)', label: 'Report' },
  validate: { icon: <CheckCircle size={13} />, color: 'var(--verified)', label: 'Validation' },
  index: { icon: <RefreshCw size={13} />, color: 'var(--copper)', label: 'Indexing' },
  search: { icon: <Search size={13} />, color: 'var(--text-secondary)', label: 'Query' },
  update: { icon: <RefreshCw size={13} />, color: 'var(--info)', label: 'Update' },
  upload: { icon: <Upload size={13} />, color: 'var(--copper)', label: 'Upload' },
  ocr: { icon: <Eye size={13} />, color: 'var(--coal-400)', label: 'OCR' },
  auth: { icon: <Lock size={13} />, color: 'var(--verified)', label: 'Auth' },
  priority: { icon: <AlertTriangle size={13} />, color: 'var(--safety)', label: 'Priority' },
};

export default function AuditTrailPage() {
  const [filterType, setFilterType] = useState('All');
  const [filterUser, setFilterUser] = useState('All');
  const [searchQ, setSearchQ] = useState('');

  const filteredLog = auditLog.filter(entry => {
    if (filterType !== 'All' && typeConfig[entry.type]?.label !== filterType) return false;
    if (filterUser !== 'All' && !entry.user.includes(filterUser)) return false;
    if (searchQ && !entry.detail.toLowerCase().includes(searchQ.toLowerCase()) && !entry.action.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  });

  const handleExportCsv = () => {
    const headers = ['Timestamp', 'Action', 'Officer', 'Detail', 'Classification'];
    const rows = filteredLog.map(e => [e.time, e.action, e.user, e.detail, 'OFFICIAL AUDIT']);
    exportToCsv(`CIL_Audit_Trail_${new Date().toISOString().slice(0, 10)}`, headers, rows);
  };

  const handleExportPdf = () => {
    const headers = ['Time', 'Action', 'Officer', 'Activity Detail'];
    const rows = filteredLog.slice(0, 25).map(e => [e.time, e.action, e.user, e.detail.slice(0, 40)]);
    exportToPdf(
      `CIL_Security_Audit_Report_${new Date().toISOString().slice(0, 10)}`,
      'SYSTEM SECURITY & AUDIT TRAIL LOG',
      'Coal India Limited · CMPDI Mining Intelligence Platform',
      [
        {
          heading: '1. Audit Scope & Verification Notice',
          content: 'This official document contains immutable, tamper-evident logs of all system operations, data access requests, parliamentary searches, and report generation activities. Under Ministry of Coal cybersecurity directives, all events are cryptographically recorded with officer credentials.',
        },
        {
          heading: '2. Recent System Transactions (Sample)',
          table: { headers, rows },
        },
      ]
    );
  };

  return (
    <div className="page-container fade-in">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
              Audit Trail
            </h1>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Complete log of all system activities, queries, and data operations.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: 'rgba(74,124,89,0.08)', border: '1px solid rgba(74,124,89,0.2)', borderRadius: 3 }}>
            <Shield size={12} color="var(--verified)" />
            <span style={{ fontSize: '0.6875rem', color: 'var(--verified)', letterSpacing: '0.04em' }}>TAMPER-EVIDENT LOG</span>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, marginBottom: 24, border: '1px solid var(--border)', background: 'var(--surface-2)', overflow: 'hidden', borderRadius: 2 }}>
        {[
          { label: 'Total Activities', value: '1,284', sub: 'Last 30 days' },
          { label: 'Documents Processed', value: '342', sub: 'Indexed and validated' },
          { label: 'Reports Generated', value: '41', sub: 'This quarter' },
          { label: 'Queries Executed', value: '187', sub: 'AI search queries' },
          { label: 'Active Users', value: '8', sub: 'Unique sessions today' },
        ].map((s, i) => (
          <div key={i} style={{ padding: '14px 18px', borderRight: i < 4 ? '1px solid var(--border)' : 'none' }}>
            <div className="text-label" style={{ marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{s.value}</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 280 }}>
          <Search size={12} style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            className="input-field"
            placeholder="Search audit log..."
            value={searchQ}
            onChange={e => setSearchQ(e.target.value)}
            style={{ paddingLeft: 28, height: 32, fontSize: '0.75rem' }}
          />
        </div>
        <Filter size={13} color="var(--text-muted)" />
        <select className="select-field" value={filterType} onChange={e => setFilterType(e.target.value)} style={{ height: 32, fontSize: '0.75rem' }}>
          {['All', 'Report', 'Validation', 'Indexing', 'Query', 'Update', 'Upload', 'OCR', 'Auth', 'Priority'].map(v => <option key={v}>{v}</option>)}
        </select>
        <select className="select-field" value={filterUser} onChange={e => setFilterUser(e.target.value)} style={{ height: 32, fontSize: '0.75rem' }}>
          {['All', 'Rajiv Kumar', 'Suresh Patel', 'Ananya Singh', 'System Pipeline'].map(v => <option key={v}>{v}</option>)}
        </select>
        <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginLeft: 4 }}>
          {filteredLog.length} entries
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 20 }}>
        {/* Timeline */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', overflow: 'hidden', borderRadius: 2 }}>
          <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Activity Log</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ fontSize: '0.625rem', color: 'var(--safety)', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span className="status-dot" style={{ background: 'var(--safety)', width: 5, height: 5 }} />
                LIVE
              </span>
            </div>
          </div>

          {/* Table */}
          <table className="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Type</th>
                <th>Action</th>
                <th>User</th>
                <th>Source</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLog.map(entry => {
                const cfg = typeConfig[entry.type] || { icon: <FileText size={13} />, color: 'var(--text-muted)', label: entry.type };
                return (
                  <tr key={entry.id}>
                    <td>
                      <span className="text-mono" style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{entry.time}</span>
                    </td>
                    <td>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.6875rem', color: cfg.color }}>
                        {cfg.icon}
                        {cfg.label}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', marginBottom: 2 }}>{entry.action}</div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {entry.detail}
                      </div>
                    </td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                      {entry.user.split(' (')[0]}
                      <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>
                        {entry.user.match(/\(([^)]+)\)/)?.[1] || ''}
                      </div>
                    </td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{entry.source}</td>
                    <td>
                      <span className={`badge ${entry.status === 'Success' ? 'badge-verified' : entry.status === 'Approved' ? 'badge-verified' : 'badge-review'}`}>
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Right sidebar: activity summary + compliance */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Activity by type */}
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: '14px 16px' }}>
            <div className="text-label" style={{ marginBottom: 12 }}>Activity by Type</div>
            {[
              { label: 'Indexing', count: 342, color: 'var(--copper)', pct: 27 },
              { label: 'Validation', count: 284, color: 'var(--verified)', pct: 22 },
              { label: 'Queries', count: 187, color: 'var(--info)', pct: 15 },
              { label: 'Reports', count: 41, color: 'var(--safety)', pct: 3 },
              { label: 'Other', count: 430, color: 'var(--coal-500)', pct: 33 },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.label}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.count}</span>
                </div>
                <div style={{ height: 4, background: 'var(--coal-700)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.pct}%`, background: item.color, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>

          {/* Compliance */}
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: '14px 16px' }}>
            <div className="text-label" style={{ marginBottom: 12 }}>Compliance Status</div>
            {[
              { label: 'Data Retention Policy', status: 'Compliant', ok: true },
              { label: 'Access Control Audit', status: 'Compliant', ok: true },
              { label: 'Source Traceability', status: 'Compliant', ok: true },
              { label: 'Export Controls', status: 'Active', ok: true },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.label}</span>
                <span style={{ fontSize: '0.625rem', fontWeight: 600, color: item.ok ? 'var(--verified)' : 'var(--alert)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  {item.ok ? <CheckCircle size={10} /> : <AlertTriangle size={10} />}
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          {/* Export */}
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: '14px 16px' }}>
            <div className="text-label" style={{ marginBottom: 10 }}>Export Audit Log</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.75rem' }} onClick={handleExportCsv}>
                Export as CSV
              </button>
              <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.75rem' }} onClick={handleExportPdf}>
                Export as PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
