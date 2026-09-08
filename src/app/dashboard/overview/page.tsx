'use client';

import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts';
import { 
  FileText, Database, BarChart2, Zap, TrendingUp, TrendingDown,
  AlertCircle, CheckCircle, Clock, ChevronRight, Activity
} from 'lucide-react';
import { yearlyProduction, recentReports, documents } from '@/lib/mock-data';

const statCards = [
  {
    label: 'Documents Indexed',
    value: '12,486',
    change: '+8.4% this month',
    up: true,
    sub: '37 data sources · 5 formats',
    icon: FileText,
    color: 'var(--info)',
  },
  {
    label: 'Data Sources',
    value: '37',
    change: '5 file formats',
    up: true,
    sub: 'PDF, XLSX, DOCX, IMG, Archive',
    icon: Database,
    color: 'var(--copper)',
  },
  {
    label: 'Reports Generated',
    value: '284',
    change: 'This quarter',
    up: true,
    sub: 'Production, Safety, Geological',
    icon: BarChart2,
    color: 'var(--verified)',
  },
  {
    label: 'Query Response',
    value: '< 12 sec',
    change: 'Average',
    up: true,
    sub: 'Across 12,486 documents',
    icon: Zap,
    color: 'var(--safety)',
  },
];

const sourceCoverage = [
  { label: 'PDF Reports', count: 5420, pct: 43, color: 'var(--info)' },
  { label: 'Excel Sheets', count: 2184, pct: 18, color: 'var(--verified)' },
  { label: 'Scanned Records', count: 3920, pct: 31, color: 'var(--copper)' },
  { label: 'Historical Archive', count: 962, pct: 8, color: 'var(--coal-500)' },
];

const recentIntelligence = [
  { title: 'Production variance detected', area: 'Barkakana Area', time: '2 hours ago', type: 'alert', color: 'var(--safety)' },
  { title: 'New annual report indexed', area: 'FY 2025-26', time: 'Today', type: 'info', color: 'var(--info)' },
  { title: '3 documents require validation', area: 'Central Mine Planning', time: 'Today', type: 'review', color: 'var(--copper)' },
  { title: 'Topic trend identified', area: 'Mine Safety +18%', time: 'Yesterday', type: 'topic', color: 'var(--verified)' },
  { title: 'Parliamentary query processed', area: 'Q. No. 2847 — Production FY25', time: 'Yesterday', type: 'priority', color: 'var(--copper)' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--border-light)',
        borderRadius: 3,
        padding: '10px 14px',
        fontSize: '0.75rem',
      }}>
        <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
        <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.875rem' }}>
          {payload[0].value.toLocaleString('en-IN', { minimumFractionDigits: 2 })} MT
        </div>
      </div>
    );
  }
  return null;
};

export default function OverviewPage() {
  const [chartType, setChartType] = useState<'line' | 'bar'>('bar');

  return (
    <div className="page-container fade-in">
      {/* Page header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
              Mining Intelligence Overview
            </h1>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Unified view of geological, production and operational intelligence.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: 'rgba(74,124,89,0.08)', border: '1px solid rgba(74,124,89,0.2)', borderRadius: 3 }}>
            <span className="status-dot status-dot-green pulse-dot" />
            <span style={{ fontSize: '0.6875rem', color: 'var(--verified)', letterSpacing: '0.04em' }}>ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, marginBottom: 28, border: '1px solid var(--border)', borderRadius: 2, overflow: 'hidden' }}>
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} style={{
              background: 'var(--surface-2)',
              padding: '20px 22px',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <span className="text-label">{card.label}</span>
                <Icon size={14} color={card.color} />
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: 4 }}>
                {card.value}
              </div>
              <div style={{ fontSize: '0.6875rem', color: card.up ? 'var(--verified)' : 'var(--alert)', marginBottom: 4 }}>
                {card.change}
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{card.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, marginBottom: 20 }}>
        {/* Production chart */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Production Overview</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 2 }}>
                Raw coal production — CIL (MT)
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {(['bar', 'line'] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setChartType(t)}
                  style={{
                    padding: '4px 10px', fontSize: '0.6875rem', fontWeight: 500,
                    background: chartType === t ? 'var(--coal-700)' : 'transparent',
                    border: '1px solid ' + (chartType === t ? 'var(--border-light)' : 'transparent'),
                    color: chartType === t ? 'var(--text-primary)' : 'var(--text-muted)',
                    borderRadius: 2, cursor: 'pointer', textTransform: 'capitalize',
                    outline: 'none',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div style={{ padding: '20px 8px 12px' }}>
            <ResponsiveContainer width="100%" height={220}>
              {chartType === 'bar' ? (
                <BarChart data={yearlyProduction} margin={{ left: 0, right: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}`} domain={[600, 1100]} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }} />
                  <Bar dataKey="production" radius={[2, 2, 0, 0]} maxBarSize={52}>
                    {yearlyProduction.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={index === yearlyProduction.length - 1 ? 'var(--copper)' : 'var(--coal-600)'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              ) : (
                <LineChart data={yearlyProduction} margin={{ left: 0, right: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="year" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} domain={[600, 1100]} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255, 255, 255, 0.15)' }} />
                  <Line type="monotone" dataKey="production" stroke="var(--copper)" strokeWidth={2} dot={{ fill: 'var(--copper)', r: 4 }} activeDot={{ r: 5 }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
          <div style={{ padding: '0 20px 16px', display: 'flex', gap: 24 }}>
            {yearlyProduction.slice(-2).map((d, i) => (
              <div key={i}>
                <div className="text-label">{d.year}</div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: i === 1 ? 'var(--copper)' : 'var(--text-primary)' }}>
                  {d.production.toLocaleString('en-IN', { minimumFractionDigits: 2 })} MT
                </div>
              </div>
            ))}
            <div>
              <div className="text-label">Growth</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--verified)' }}>+4.98%</div>
            </div>
          </div>
        </div>

        {/* Recent intelligence */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Recent Intelligence</div>
          </div>
          <div>
            {recentIntelligence.map((item, i) => (
              <div key={i} style={{
                padding: '12px 20px',
                borderBottom: i < recentIntelligence.length - 1 ? '1px solid var(--border)' : 'none',
                display: 'flex', alignItems: 'flex-start', gap: 10,
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                <div style={{ width: 3, background: item.color, borderRadius: 2, alignSelf: 'stretch', flexShrink: 0, marginTop: 2 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{item.area}</div>
                </div>
                <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data coverage + recent reports */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20, marginBottom: 20 }}>
        {/* Data coverage */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          <div style={{ padding: '14px 18px 10px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Data Coverage</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 2 }}>Source document types</div>
          </div>
          <div style={{ padding: '14px 18px' }}>
            {sourceCoverage.map((s, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{s.label}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {s.count.toLocaleString('en-IN')}
                  </span>
                </div>
                <div style={{ height: 4, background: 'var(--coal-700)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: 2, transition: 'width 0.5s ease' }} />
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Total</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>12,486</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent reports table */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px 10px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Recent Reports</div>
            <span style={{ fontSize: '0.6875rem', color: 'var(--copper)', cursor: 'pointer' }}>View all</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Title</th>
                  <th>Mine / Area</th>
                  <th>Generated</th>
                  <th>Status</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((r) => (
                  <tr key={r.id} style={{ cursor: 'pointer' }}>
                    <td>
                      <span className="text-mono" style={{ color: 'var(--info)', fontSize: '0.75rem' }}>{r.id}</span>
                    </td>
                    <td style={{ maxWidth: 220 }}>
                      <span style={{ color: 'var(--text-primary)' }}>{r.title}</span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{r.mine}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{r.generated}</td>
                    <td>
                      <span className="badge badge-verified">{r.status}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div className="confidence-bar-bg">
                          <div className="confidence-bar-fill" style={{ width: `${r.confidence}%` }} />
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--verified)' }}>{r.confidence}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Key stats bottom row */}
      <div style={{ 
        background: 'var(--surface-2)', 
        border: '1px solid var(--border)',
        padding: '16px 20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 16,
      }}>
        {[
          { label: 'Geological Resources', value: '400.715 BT', sub: 'Billion Tonnes coal reserves' },
          { label: 'Open Cast Share', value: '96.96%', sub: 'FY 2024-25 production' },
          { label: 'Underground Share', value: '3.04%', sub: 'FY 2024-25 production' },
          { label: 'Indigenous Supply', value: '1,025.33 MT', sub: 'FY 2024-25 raw coal' },
          { label: 'Documents Validated', value: '8,742', sub: 'Of 12,486 total indexed' },
        ].map((item, i) => (
          <div key={i} style={{ borderLeft: i > 0 ? '1px solid var(--border)' : 'none', paddingLeft: i > 0 ? 16 : 0 }}>
            <div className="text-label" style={{ marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{item.value}</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{item.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
