'use client';

import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend,
  AreaChart, Area
} from 'recharts';
import {
  yearlyProduction, monthlyProduction2024, subsidiaryProduction,
  safetyIncidents, dataQuality, documentActivity
} from '@/lib/mock-data';
import { TrendingUp, TrendingDown, Info, Download } from 'lucide-react';
import { exportToCsv, exportToPdf } from '@/lib/export-utils';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--surface-2)', border: '1px solid var(--border-light)',
      borderRadius: 3, padding: '10px 14px', fontSize: '0.75rem',
    }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ color: p.color || 'var(--text-primary)', fontWeight: 600 }}>
          {p.name}: {typeof p.value === 'number' ? p.value.toLocaleString('en-IN', { minimumFractionDigits: p.value % 1 !== 0 ? 2 : 0 }) : p.value}
          {p.name.toLowerCase().includes('mt') || p.dataKey === 'production' || p.dataKey === 'openCast' || p.dataKey === 'underground' ? ' MT' : ''}
        </div>
      ))}
    </div>
  );
};

const insights = [
  { text: 'Raw coal production has grown consistently from 716.08 MT in FY 2020-21 to 1,047.52 MT in FY 2024-25, a 46.3% increase over 5 years.', type: 'positive' },
  { text: 'Open-cast mining contributes 96.96% of total reported production. Underground operations remain limited to legacy mines.', type: 'neutral' },
  { text: 'Safety incidents show a consistent downward trend — fatal accidents declined by 44.2% from FY 2020-21 to FY 2024-25.', type: 'positive' },
  { text: 'Document indexing activity peaked in March with 502 records processed, reflecting end-of-fiscal reporting cycles.', type: 'neutral' },
  { text: 'MCL and SECL lead subsidiary-wise production, jointly contributing 36.5% of total CIL output in FY 2024-25.', type: 'positive' },
  { text: '13.1% of indexed documents are pending validation review. Conflicting data flags detected in 384 records.', type: 'caution' },
];

export default function AnalyticsPage() {
  const [yearFilter, setYearFilter] = useState('All');
  const [subsidiaryFilter, setSubsidiaryFilter] = useState('All');

  const handleExportCsv = () => {
    const headers = ['Financial Year', 'Total Production (MT)', 'Open Cast (MT)', 'Underground (MT)'];
    const rows = yearlyProduction.map(y => [y.year, y.production, y.openCast, y.underground]);
    exportToCsv(`CIL_Production_Time_Series_${new Date().toISOString().slice(0, 10)}`, headers, rows);
  };

  const handleExportPdf = () => {
    exportToPdf(
      `CIL_Analytics_Report_${new Date().toISOString().slice(0, 10)}`,
      'MINING PRODUCTION & STATISTICAL INTELLIGENCE',
      'Coal India Limited · 5-Year National Performance Review',
      [
        {
          heading: '1. National Production Growth Summary',
          content: 'Raw coal production has grown from 716.08 MT in FY 2020-21 to 1,047.52 MT in FY 2024-25, representing an expansion of 46.3% over the 5-year evaluation horizon. Open-cast extraction represents 96.96% of aggregate output.',
          table: {
            headers: ['Year', 'Production (MT)', 'Open-cast (MT)', 'Underground (MT)'],
            rows: yearlyProduction.map(y => [y.year, `${y.production}`, `${y.openCast}`, `${y.underground}`]),
          },
        },
        {
          heading: '2. Subsidiary Contribution Matrix',
          table: {
            headers: ['Subsidiary', 'Raw Coal Production (MT)', 'Share of National Output (%)'],
            rows: subsidiaryProduction.map(s => [s.name, `${s.production} MT`, `${((s.production / 1047.52) * 100).toFixed(1)}%`]),
          },
        },
      ]
    );
  };

  return (
    <div className="page-container fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
            Mining Analytics
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            Production, safety, and document intelligence metrics.
          </p>
        </div>
        {/* Filter bar and exports */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <select className="select-field" value={subsidiaryFilter} onChange={e => setSubsidiaryFilter(e.target.value)} style={{ height: 32, fontSize: '0.75rem' }}>
            {['All', 'ECL', 'BCCL', 'CCL', 'SECL', 'NCL', 'WCL', 'MCL', 'SCCL (Associated Entity)'].map(v => <option key={v}>{v}</option>)}
          </select>
          <select className="select-field" value={yearFilter} onChange={e => setYearFilter(e.target.value)} style={{ height: 32, fontSize: '0.75rem' }}>
            {['All', '2020-21', '2021-22', '2022-23', '2023-24', '2024-25'].map(v => <option key={v}>{v}</option>)}
          </select>
          <button className="btn btn-secondary" style={{ height: 32, fontSize: '0.75rem' }} onClick={handleExportCsv} title="Download production dataset as CSV">
            <Download size={12} />
            Export CSV
          </button>
          <button className="btn btn-secondary" style={{ height: 32, fontSize: '0.75rem' }} onClick={handleExportPdf} title="Download analytics report as PDF">
            <Download size={12} />
            Export PDF
          </button>
        </div>
      </div>

      {/* Row 1: Production trend + open cast vs underground */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 16, marginBottom: 16 }}>
        {/* Production trend */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          <div style={{ padding: '14px 20px 10px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Coal Production Trend</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 1 }}>CIL Raw Coal Production (MT) — FY 2020-25</div>
          </div>
          <div style={{ padding: '16px 8px 8px' }}>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={yearlyProduction} margin={{ left: 0, right: 8 }}>
                <defs>
                  <linearGradient id="prodGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--copper)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--copper)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} domain={[600, 1100]} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255, 255, 255, 0.15)' }} />
                <Area type="monotone" dataKey="production" stroke="var(--copper)" strokeWidth={2} fill="url(#prodGrad)" dot={{ fill: 'var(--copper)', r: 4 }} name="Production" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Open cast vs underground */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          <div style={{ padding: '14px 20px 10px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Open Cast vs Underground</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 1 }}>FY 2024-25 production breakdown</div>
          </div>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Open Cast', value: 96.96 },
                      { name: 'Underground', value: 3.04 },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={78}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    <Cell fill="var(--copper)" />
                    <Cell fill="var(--coal-600)" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            {[
              { label: 'Open Cast', value: '1,015.54 MT', pct: '96.96%', color: 'var(--copper)' },
              { label: 'Underground', value: '31.98 MT', pct: '3.04%', color: 'var(--coal-500)' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 10, height: 10, background: item.color, borderRadius: 2, flexShrink: 0 }} />
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', flex: 1 }}>{item.label}</span>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</span>
                <span style={{ fontSize: '0.75rem', color: item.color, minWidth: 44, textAlign: 'right' }}>{item.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Subsidiary bar + Monthly */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Subsidiary bar */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          <div style={{ padding: '14px 20px 10px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Subsidiary & Associated Entity Production</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 1 }}>FY 2024-25 (MT) · SCCL: Integrated Coal Intelligence Entity</div>
          </div>
          <div style={{ padding: '12px 8px 8px' }}>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={subsidiaryProduction} layout="vertical" margin={{ left: 8, right: 16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} width={36} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }} />
                <Bar dataKey="production" radius={[0, 2, 2, 0]} maxBarSize={18} name="Production">
                  {subsidiaryProduction.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly production */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          <div style={{ padding: '14px 20px 10px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Monthly Production</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 1 }}>FY 2024-25 (MT per month)</div>
          </div>
          <div style={{ padding: '12px 8px 8px' }}>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={monthlyProduction2024} margin={{ left: 0, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} domain={[60, 110]} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }} />
                <Bar dataKey="production" fill="var(--info)" radius={[2, 2, 0, 0]} maxBarSize={28} name="Production" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Safety + Document activity + Data quality */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 240px', gap: 16, marginBottom: 20 }}>
        {/* Safety incidents */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          <div style={{ padding: '14px 20px 10px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Safety Incident Trend</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 1 }}>Fatal, Serious, Minor incidents</div>
          </div>
          <div style={{ padding: '12px 8px 8px' }}>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={safetyIncidents} margin={{ left: 0, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255, 255, 255, 0.15)' }} />
                <Line type="monotone" dataKey="fatal" stroke="var(--alert)" strokeWidth={2} dot={{ fill: 'var(--alert)', r: 3 }} name="Fatal" />
                <Line type="monotone" dataKey="serious" stroke="var(--safety)" strokeWidth={2} dot={{ fill: 'var(--safety)', r: 3 }} name="Serious" />
                <Line type="monotone" dataKey="minor" stroke="var(--info)" strokeWidth={2} dot={{ fill: 'var(--info)', r: 3 }} name="Minor" />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Document activity */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          <div style={{ padding: '14px 20px 10px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Document Activity</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 1 }}>Documents indexed and validated per month</div>
          </div>
          <div style={{ padding: '12px 8px 8px' }}>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={documentActivity} margin={{ left: 0, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.04)' }} />
                <Bar dataKey="indexed" fill="var(--coal-500)" radius={[2, 2, 0, 0]} name="Indexed" maxBarSize={14} />
                <Bar dataKey="validated" fill="var(--verified)" radius={[2, 2, 0, 0]} name="Validated" maxBarSize={14} />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Data quality */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
          <div style={{ padding: '14px 18px 10px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Data Quality</div>
          </div>
          <div style={{ padding: '14px 18px' }}>
            {dataQuality.map((item) => (
              <div key={item.name} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.name}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.value.toLocaleString('en-IN')}
                  </span>
                </div>
                <div style={{ height: 4, background: 'var(--coal-700)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(item.value / 12486) * 100}%`, background: item.color, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insight Summary */}
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Insight Summary</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 1 }}>Analyst-generated observations from indexed mining records</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          {insights.map((ins, i) => (
            <div key={i} style={{
              padding: '14px 20px',
              borderBottom: i < insights.length - 2 ? '1px solid var(--border)' : 'none',
              borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
              display: 'flex', gap: 10, alignItems: 'flex-start',
            }}>
              <div style={{ 
                width: 4, 
                background: ins.type === 'positive' ? 'var(--verified)' : ins.type === 'caution' ? 'var(--safety)' : 'var(--info)',
                borderRadius: 2, alignSelf: 'stretch', flexShrink: 0,
              }} />
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{ins.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
