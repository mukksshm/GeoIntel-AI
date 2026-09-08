'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Upload, X, FileText, FileSpreadsheet, File, Image as ImageIcon,
  CheckCircle, Clock, AlertTriangle, ChevronRight, Eye, Download,
  MapPin, Calendar, Hash, Building, ExternalLink, Archive, Search, Sparkles,
  Maximize2, Minimize2, ZoomIn, ZoomOut, ArrowLeft, ArrowRight, ShieldCheck, Printer, Filter
} from 'lucide-react';
import { Document } from '@/lib/mock-data';
import { useDocuments } from '@/lib/documents-context';
import { useToast } from '@/lib/toast';
import { exportToDocx, exportToCsv, downloadFormatDoc } from '@/lib/export-utils';
import { useAuth } from '@/lib/auth-context';

function FileTypeIcon({ type }: { type: string }) {
  const s = { width: 14, height: 14 };
  if (type === 'XLSX') return <FileSpreadsheet {...s} color="var(--verified)" />;
  if (type === 'PDF' || type === 'Scanned PDF') return <FileText {...s} color="var(--info)" />;
  if (type === 'JPG') return <ImageIcon {...s} color="var(--copper)" />;
  return <File {...s} color="var(--text-muted)" />;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'Validated': 'badge-verified',
    'Indexed': 'badge-processing',
    'OCR Complete': 'badge-processing',
    'Processing': 'badge-review',
    'Needs Review': 'badge-review',
  };
  return <span className={`badge ${map[status] || 'badge-review'}`}>{status}</span>;
}

function DocumentDetailPanel({ 
  doc, 
  initialTab = 'intelligence',
  targetPage,
  highlightState,
  onClose 
}: { 
  doc: Document; 
  initialTab?: 'intelligence' | 'preview';
  targetPage?: number;
  highlightState?: string;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'intelligence' | 'preview'>(initialTab);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currPage, setCurrPage] = useState<number>(targetPage || (doc.name.includes('Coal_Directory') ? 58 : 42));
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [filterDocText, setFilterDocText] = useState<string>('');
  const [activeSheet, setActiveSheet] = useState<string>('State Summary');
  const [activeCell, setActiveCell] = useState<string>('G6');
  const { showToast } = useToast();

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (targetPage) {
      setCurrPage(targetPage);
    }
  }, [targetPage]);

  // Master All-India State Table (Table 8.4)
  const masterTable84 = [
    {
      sno: 1,
      state: 'Jharkhand',
      subsidiary: 'CCL (134.1 MT) + BCCL (78.8 MT)',
      reserves: '86.2 BT',
      ocMt: '186.40',
      ugMt: '26.50',
      totalFY25: '212.90',
      totalFY24: '204.50',
      growth: '+4.11%',
      share: '20.32%',
      target: '208.50',
      fulfillment: '102.1%',
      powerOfftake: '161.50',
      nonPowerOfftake: '51.40',
      status: 'Target Achieved',
      notes: 'Jharia Coking Washeries (14.2 MT) + Barkakana & Piparwar (CCL)'
    },
    {
      sno: 2,
      state: 'Odisha',
      subsidiary: 'MCL (Mahanadi Coalfields Limited)',
      reserves: '84.1 BT',
      ocMt: '188.20',
      ugMt: '10.20',
      totalFY25: '198.40',
      totalFY24: '183.30',
      growth: '+8.24%',
      share: '18.94%',
      target: '190.40',
      fulfillment: '104.2%',
      powerOfftake: '179.20',
      nonPowerOfftake: '19.20',
      status: 'Rank #1 Producer',
      notes: 'Talcher (112.4 MT) + IB Valley (86.0 MT) · Paradip Coastal Rail/Sea Link'
    },
    {
      sno: 3,
      state: 'Chhattisgarh',
      subsidiary: 'SECL (South Eastern Coalfields Limited)',
      reserves: '59.8 BT',
      ocMt: '172.80',
      ugMt: '11.40',
      totalFY25: '184.20',
      totalFY24: '177.00',
      growth: '+4.07%',
      share: '17.58%',
      target: '180.00',
      fulfillment: '102.3%',
      powerOfftake: '154.60',
      nonPowerOfftake: '29.60',
      status: 'Target Achieved',
      notes: 'Gevra Mega OCP (52.5 MT World Record), Kusmunda (48.1 MT), Dipka (38.2 MT)'
    },
    {
      sno: 4,
      state: 'Madhya Pradesh',
      subsidiary: 'NCL (105.9 MT) + WCL (28.4 MT) + SECL (18.4 MT)',
      reserves: '30.6 BT',
      ocMt: '144.10',
      ugMt: '8.60',
      totalFY25: '152.70',
      totalFY24: '145.20',
      growth: '+5.17%',
      share: '14.58%',
      target: '148.00',
      fulfillment: '103.2%',
      powerOfftake: '139.80',
      nonPowerOfftake: '12.90',
      status: 'Target Achieved',
      notes: 'Singrauli Pithead MGR Overland Belt Conveyor Circuits to NTPC'
    },
    {
      sno: 5,
      state: 'West Bengal',
      subsidiary: 'ECL (Eastern Coalfields Limited)',
      reserves: '32.4 BT',
      ocMt: '89.40',
      ugMt: '29.20',
      totalFY25: '118.60',
      totalFY24: '114.10',
      growth: '+3.94%',
      share: '11.32%',
      target: '115.00',
      fulfillment: '103.1%',
      powerOfftake: '92.40',
      nonPowerOfftake: '26.20',
      status: 'Target Achieved',
      notes: 'Raniganj High-Calorific Coalfield (Grades G1 to G4) · Deep Underground Workings'
    },
    {
      sno: 6,
      state: 'Maharashtra',
      subsidiary: 'WCL (Western Coalfields Limited)',
      reserves: '12.8 BT',
      ocMt: '58.30',
      ugMt: '6.20',
      totalFY25: '64.50',
      totalFY24: '61.80',
      growth: '+4.37%',
      share: '6.16%',
      target: '62.00',
      fulfillment: '104.0%',
      powerOfftake: '58.10',
      nonPowerOfftake: '6.40',
      status: 'Target Achieved',
      notes: 'Wardha Valley Coalfield · Chandrapur, Nagpur, Umrer feed to Mahagenco'
    },
    {
      sno: 7,
      state: 'Telangana',
      subsidiary: 'SCCL (Singareni Collieries Co. Ltd. - Associated)',
      reserves: '11.2 BT',
      ocMt: '62.00',
      ugMt: '8.00',
      totalFY25: '70.00',
      totalFY24: '67.50',
      growth: '+3.70%',
      share: '6.68%',
      target: '70.00',
      fulfillment: '100.0%',
      powerOfftake: '58.40',
      nonPowerOfftake: '11.60',
      status: 'Statutory Target Met',
      notes: 'Godavari Valley Coalfield · Adriyala Mechanized Longwall Project (350m depth)'
    },
    {
      sno: 8,
      state: 'Assam & North East',
      subsidiary: 'NEC (North Eastern Coalfields)',
      reserves: '1.6 BT',
      ocMt: '0.80',
      ugMt: '0.10',
      totalFY25: '0.90',
      totalFY24: '0.85',
      growth: '+5.88%',
      share: '0.09%',
      target: '1.00',
      fulfillment: '90.0%',
      powerOfftake: '0.70',
      nonPowerOfftake: '0.20',
      status: 'Tertiary High GCV',
      notes: 'Makum Coalfield (Tikak & Tipong) · GCV >6,500 kcal/kg, 3.8% Sulfur'
    },
    {
      sno: 9,
      state: 'Other States / Captive Units',
      subsidiary: 'Captive Power Blocks (PEKB, GMDC Gujarat, RSMML Rajasthan)',
      reserves: '3.2 BT',
      ocMt: '44.80',
      ugMt: '0.52',
      totalFY25: '45.32',
      totalFY24: '41.50',
      growth: '+9.20%',
      share: '4.33%',
      target: '44.00',
      fulfillment: '103.0%',
      powerOfftake: '36.80',
      nonPowerOfftake: '8.52',
      status: 'Captive Allocations',
      notes: 'Commercial Mining Tranches, GMDC Lignite (22.4 MT), RSMML Rajasthan (18.6 MT)'
    },
  ];

  const allIndiaTotal = {
    state: 'ALL-INDIA TOTAL (CIL + SCCL + Captive Blocks)',
    subsidiary: 'All Consolidated Entities',
    reserves: '321.9 BT',
    ocMt: '946.80',
    ugMt: '100.72',
    totalFY25: '1,047.52',
    totalFY24: '995.75',
    growth: '+5.20%',
    share: '100.00%',
    target: '1,018.90',
    fulfillment: '102.81%',
    powerOfftake: '881.60',
    nonPowerOfftake: '165.92',
    status: 'National Benchmark'
  };

  const isRowHighlighted = (rowState: string): boolean => {
    if (!highlightState) return false;
    const h = highlightState.toLowerCase().trim();
    const s = rowState.toLowerCase().trim();
    if (h.includes('odisha') || h.includes('orissa')) return s.includes('odisha');
    if (h.includes('chhattisgarh') || h.includes('chattisgarh') || h.includes('korba')) return s.includes('chhattisgarh');
    if (h.includes('jharkhand') || h.includes('jharia') || h.includes('ccl') || h.includes('bccl')) return s.includes('jharkhand');
    if (h.includes('madhya') || h.includes('singrauli')) return s.includes('madhya');
    if (h.includes('bengal') || h.includes('raniganj') || h.includes('ecl')) return s.includes('west bengal');
    if (h.includes('maharashtra') || h.includes('chandrapur') || h.includes('wcl')) return s.includes('maharashtra');
    if (h.includes('telangana') || h.includes('sccl') || h.includes('singareni')) return s.includes('telangana');
    if (h.includes('assam') || h.includes('north east') || h.includes('makum')) return s.includes('assam');
    if (h.includes('gujarat') || h.includes('rajasthan') || h.includes('captive')) return s.includes('captive');
    return s.includes(h) || h.includes(s);
  };

  const jumpToHighlightedRow = () => {
    const el = document.getElementById('target-highlighted-row');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showToast(`Scrolled to highlighted ${highlightState?.toUpperCase()} ground truth row.`, 'info');
    }
  };

  const entities = [
    { key: 'Mine / Area', value: doc.mine || 'All Operating Areas' },
    { key: 'Department', value: doc.department },
    { key: 'Production Volume', value: doc.year === '2024-25' ? '1,047.52 MT (+4.98%)' : 'Operational Extract' },
    { key: 'Reporting Period', value: doc.year || 'FY 2025-26' },
    { key: 'Open Cast Share', value: '96.96% (CIL Benchmark)' },
    { key: 'Underground Share', value: '3.04% (Strategic Expansion)' },
  ];

  const traceability = [
    { step: 'Extracted value', note: doc.year === '2024-25' ? '1,047.52 MT' : 'Statutory Ingestion Record' },
    { step: 'Primary source', note: doc.pages ? `Page 58, Table 8.4 (${doc.name})` : `Row 142 (${doc.name})` },
    { step: 'Confidence score', note: `${doc.confidence}% (Statutory Audit Verified)` },
    { step: 'Cross-reference', note: 'Cross-validated against Master Production Sheet & Coal Controller Gazetted Record' },
  ];

  const handleExportDoc = () => {
    exportToDocx(
      `Document_Dossier_${doc.name.replace(/\.[^/.]+$/, '')}`,
      doc.name,
      `Source: ${doc.source} · Department: ${doc.department} · Year: ${doc.year || 'N/A'}`,
      [
        {
          heading: '1. Document Specifications & Extraction Metadata',
          table: {
            headers: ['Attribute', 'Official Value'],
            rows: [
              ['Document Title', doc.name],
              ['Subsidiary / Office', doc.source],
              ['Department', doc.department],
              ['Mining Area', doc.mine || 'All Areas'],
              ['Financial / Reporting Year', doc.year || 'N/A'],
              ['Ingestion Status', doc.status],
              ['OCR Confidence Score', `${doc.confidence}%`],
              ['Document Scope', doc.pages ? `${doc.pages} pages` : doc.rows ? `${doc.rows} rows` : 'Digital Record'],
            ],
          },
        },
        {
          heading: '2. Ground Truth & Traceability Evidence',
          bulletPoints: [
            'Extracted Value: 1,047.52 MT Raw Coal Output',
            'Primary Evidence: Table 8.4 (Page 58), Coal Directory 2024-25',
            'Confidence Tier: Verified by Automated Multi-Modal Parsing Engine',
            'Cross-check: Validated against CIL Enterprise Master Record and Ministry Database',
          ],
        },
      ]
    );
  };

  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, bottom: 0,
      width: isExpanded ? 'min(1440px, 98vw)' : 760, maxWidth: '98vw',
      height: '100vh', maxHeight: '100vh',
      background: 'var(--coal-900)',
      borderLeft: '1px solid var(--border-light)',
      zIndex: 300,
      display: 'flex', flexDirection: 'column',
      boxShadow: '-8px 0 40px rgba(0,0,0,0.6)',
      overflow: 'hidden',
      transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    }} className="slide-in-right">
      
      {/* Drawer Header */}
      <div style={{
        flexShrink: 0,
        padding: '14px 20px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        background: 'var(--surface-2)',
      }}>
        <div style={{ flex: 1, minWidth: 0, marginRight: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <FileTypeIcon type={doc.type} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {doc.name}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {[
              { label: 'DOC ID', value: doc.id },
              { label: 'Authority', value: doc.source },
              { label: 'Ingested', value: doc.uploaded },
              { label: doc.pages ? 'Extent' : 'Matrix', value: doc.pages ? `${doc.pages} pages` : `${doc.rows?.toLocaleString('en-IN')} rows` },
            ].map(m => (
              <div key={m.label} style={{ display: 'flex', gap: 5 }}>
                <span className="text-label" style={{ marginBottom: 0, fontSize: '0.625rem' }}>{m.label}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          {/* Full Screen / Expand Toggle */}
          <button
            className="btn btn-secondary"
            style={{ fontSize: '0.75rem', padding: '5px 10px', gap: 6 }}
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? "Collapse to standard drawer" : "Expand to wide document viewer"}
          >
            {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            <span>{isExpanded ? "Standard View" : "Full Document View"}</span>
          </button>
          
          <StatusBadge status={doc.status} />
          <span style={{ fontSize: '0.75rem', color: 'var(--verified)', marginLeft: 2 }}>{doc.confidence}%</span>
          <button className="btn btn-ghost" style={{ padding: 6 }} onClick={onClose} title="Close viewer">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ flexShrink: 0, display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)', paddingLeft: 12 }}>
        {[
          { key: 'preview', label: 'Actual Source Document Reader' },
          { key: 'intelligence', label: 'Extracted Intelligence & Traceability' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              padding: '10px 18px',
              fontSize: '0.8125rem', fontWeight: activeTab === tab.key ? 600 : 400,
              color: activeTab === tab.key ? 'var(--copper)' : 'var(--text-muted)',
              borderBottom: activeTab === tab.key ? '2px solid var(--copper)' : '2px solid transparent',
              background: 'transparent',
              borderTop: 'none', borderLeft: 'none', borderRight: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            {tab.key === 'preview' && <FileText size={13} />}
            {tab.key === 'intelligence' && <ShieldCheck size={13} />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        
        {/* Tab 1: Extracted Intelligence */}
        {activeTab === 'intelligence' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
            {/* Metadata Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 18 }}>
              {entities.map(e => (
                <div key={e.key} style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 2, padding: '10px 12px' }}>
                  <div className="text-label" style={{ marginBottom: 2 }}>{e.key}</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{e.value}</div>
                </div>
              ))}
            </div>

            {/* Traceability */}
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 2, overflow: 'hidden', marginBottom: 18 }}>
              <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle size={14} color="var(--verified)" />
                <span className="text-label" style={{ color: 'var(--text-primary)', marginBottom: 0 }}>Statutory Audit & Ground Truth Evidence</span>
              </div>
              <div style={{ padding: '16px 18px' }}>
                {traceability.map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: i < traceability.length - 1 ? 12 : 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: i === traceability.length - 1 ? 'var(--copper)' : 'var(--info)', flexShrink: 0, marginTop: 4 }} />
                      {i < traceability.length - 1 && <div style={{ width: 1, height: 24, background: 'var(--border)', marginTop: 4 }} />}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>{t.step}</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', fontWeight: 500 }}>{t.note}</div>
                    </div>
                  </div>
                ))}
                
                {/* Switch directly to actual full source */}
                <button
                  className="btn btn-primary"
                  style={{ marginTop: 16, gap: 6 }}
                  onClick={() => setActiveTab('preview')}
                >
                  <FileText size={13} />
                  Inspect Actual Source Document ↗
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Actual Source Document Reader (Full-Fidelity Government Document) */}
        {activeTab === 'preview' && (
          <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', background: 'var(--coal-950)' }}>
            
            {/* Top Document Viewer Control Bar */}
            <div style={{
              background: 'var(--coal-800)',
              borderBottom: '1px solid var(--border)',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexWrap: 'wrap',
              flexShrink: 0,
              position: 'sticky',
              top: 0,
              zIndex: 10,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}>
              {/* Document Authority Tag */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="badge badge-copper" style={{ fontSize: '0.625rem', padding: '2px 8px' }}>
                  GOI / Ministry of Coal
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {doc.name}
                </span>
              </div>

              <div style={{ width: 1, height: 16, background: 'var(--border)' }} />

              {/* Page Navigator */}
              {doc.pages && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button
                    className="btn btn-ghost"
                    style={{ padding: 4, height: 26 }}
                    disabled={currPage <= 1}
                    onClick={() => setCurrPage(p => Math.max(1, p - 1))}
                    title="Previous Page"
                  >
                    <ArrowLeft size={13} />
                  </button>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                    Page {currPage} of {doc.pages}
                  </span>
                  <button
                    className="btn btn-ghost"
                    style={{ padding: 4, height: 26 }}
                    disabled={currPage >= doc.pages}
                    onClick={() => setCurrPage(p => Math.min(doc.pages || 60, p + 1))}
                    title="Next Page"
                  >
                    <ArrowRight size={13} />
                  </button>
                </div>
              )}

              {/* Quick Jump Buttons for Chapters */}
              {doc.name.includes('Coal_Directory') && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  {[
                    { page: 56, label: 'p.56 Foreword' },
                    { page: 57, label: 'p.57 Balance Sheet' },
                    { page: 58, label: 'p.58 Master Table 8.4' },
                    { page: 59, label: 'p.59 Draglines' },
                    { page: 60, label: 'p.60 DGMS Audit' },
                  ].map(p => (
                    <button
                      key={p.page}
                      className="btn btn-ghost"
                      style={{
                        fontSize: '0.6875rem', padding: '2px 8px', height: 24, borderRadius: 2,
                        background: currPage === p.page ? 'rgba(181, 101, 29, 0.2)' : 'var(--surface-2)',
                        color: currPage === p.page ? 'var(--copper)' : 'var(--text-secondary)',
                        border: currPage === p.page ? '1px solid var(--copper)' : '1px solid var(--border)',
                      }}
                      onClick={() => setCurrPage(p.page)}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Jump to Highlighted State Button if Query Matched */}
              {highlightState && (
                <button
                  className="btn btn-secondary"
                  style={{
                    fontSize: '0.6875rem', padding: '3px 10px', height: 26, gap: 5,
                    background: 'rgba(245, 158, 11, 0.15)', borderColor: '#f59e0b', color: '#f59e0b',
                    fontWeight: 600,
                  }}
                  onClick={jumpToHighlightedRow}
                  title="Scroll to the exact state row extracted by AI Search"
                >
                  <span>★ Focus: {highlightState.toUpperCase()} Row</span>
                </button>
              )}

              <div style={{ flex: 1 }} />

              {/* Table Search Filter */}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search size={12} style={{ position: 'absolute', left: 8, color: 'var(--text-muted)' }} />
                <input
                  value={filterDocText}
                  onChange={e => setFilterDocText(e.target.value)}
                  placeholder="Filter within document..."
                  style={{
                    height: 26, fontSize: '0.6875rem', paddingLeft: 24, paddingRight: 8,
                    background: 'var(--surface-3)', border: '1px solid var(--border)',
                    borderRadius: 2, color: 'var(--text-primary)', width: 160,
                  }}
                />
              </div>

              {/* Zoom Level Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <button
                  className="btn btn-ghost"
                  style={{ padding: 4, height: 26 }}
                  onClick={() => setZoomLevel(z => Math.max(75, z - 25))}
                  title="Zoom Out"
                >
                  <ZoomOut size={13} />
                </button>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                  {zoomLevel}%
                </span>
                <button
                  className="btn btn-ghost"
                  style={{ padding: 4, height: 26 }}
                  onClick={() => setZoomLevel(z => Math.min(150, z + 25))}
                  title="Zoom In"
                >
                  <ZoomIn size={13} />
                </button>
              </div>

              {/* Print / Export Document */}
              <button
                className="btn btn-ghost"
                style={{ padding: '4px 8px', height: 26, fontSize: '0.6875rem', gap: 4 }}
                onClick={() => {
                  showToast('Preparing full publication for printing/PDF download...', 'info');
                  window.print();
                }}
                title="Print full document or save as PDF"
              >
                <Printer size={13} />
                Print / PDF
              </button>
            </div>

            {/* Document Canvas Container */}
            <div style={{
              flex: 1,
              padding: isExpanded ? '24px 36px' : '20px',
              display: 'flex',
              justifyContent: 'center',
              transform: zoomLevel !== 100 ? `scale(${zoomLevel / 100})` : undefined,
              transformOrigin: 'top center',
              transition: 'transform 0.2s',
            }}>
              
              {/* === VIEW 1: COAL DIRECTORY 2024-25 (OFFICIAL GAZETTE PUBLICATION) === */}
              {doc.name.includes('Coal_Directory') ? (
                <div style={{
                  width: '100%',
                  maxWidth: isExpanded ? 1320 : 960,
                  background: '#ffffff',
                  color: '#111827',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  borderRadius: 2,
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  border: '1px solid #d1d5db',
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  
                  {/* Official Publication Header Banner */}
                  <div style={{
                    background: '#112233',
                    color: '#ffffff',
                    padding: '16px 24px',
                    borderBottom: '3px solid #b5651d',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      {/* Emblem / Seal */}
                      <div style={{
                        width: 44, height: 44, borderRadius: '50%',
                        border: '2px solid rgba(255,255,255,0.4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(255,255,255,0.08)',
                        fontFamily: 'serif', fontWeight: 700, fontSize: '1.1rem', color: '#f59e0b'
                      }}>
                        CCO
                      </div>
                      <div>
                        <div style={{ fontSize: '0.625rem', letterSpacing: '0.12em', color: '#93c5fd', textTransform: 'uppercase' }}>
                          GOVERNMENT OF INDIA · MINISTRY OF COAL
                        </div>
                        <div style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '0.02em', fontFamily: 'sans-serif' }}>
                          COAL CONTROLLER&apos;S ORGANISATION, KOLKATA
                        </div>
                        <div style={{ fontSize: '0.6875rem', opacity: 0.75 }}>
                          PROVISIONAL COAL STATISTICS 2024-25 · ISSN 0970-8774 · PUBLICATION NO. 84
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.6875rem', color: '#fbbf24', fontWeight: 600 }}>
                        STATUTORY GAZETTED REPORT
                      </div>
                      <div style={{ fontSize: '0.625rem', opacity: 0.8 }}>
                        REF: CCO/STAT/PUB-2025/VOL-VIII
                      </div>
                      <div style={{ fontSize: '0.6875rem', opacity: 0.9, marginTop: 2 }}>
                        Page {currPage} of 312
                      </div>
                    </div>
                  </div>

                  {/* Document Body */}
                  <div style={{ padding: '24px 28px' }}>
                    
                    {/* --- PAGE 58: TABLE 8.4 ALL-INDIA MASTER STATE PRODUCTION MATRIX --- */}
                    {currPage === 58 ? (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e5e7eb', paddingBottom: 10, marginBottom: 14 }}>
                          <div>
                            <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                              Chapter 8: State-Wise Production, Reserves, Mechanization & Offtake
                            </div>
                            <h1 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827', margin: '4px 0', lineHeight: 1.3 }}>
                              Table 8.4: Master Statement of State-Wise Coal Production, Offtake & Geological Reserves (FY 2024-25 vs FY 2023-24)
                            </h1>
                            <div style={{ fontSize: '0.75rem', color: '#4b5563', fontStyle: 'italic' }}>
                              Statutory compilation under Section 18 of the Collection of Statistics Act. Figures in Million Tonnes (MT) and Billion Tonnes (BT).
                            </div>
                          </div>
                          <span style={{ fontSize: '0.6875rem', background: '#ecfdf5', color: '#065f46', padding: '4px 8px', borderRadius: 3, border: '1px solid #a7f3d0', fontWeight: 600, flexShrink: 0 }}>
                            ✓ 100% CCO Audited Reconciliation
                          </span>
                        </div>

                        {/* Highlight State Banner Notice */}
                        {highlightState && (
                          <div style={{
                            background: '#fef3c7',
                            border: '1px solid #f59e0b',
                            borderRadius: 3,
                            padding: '8px 14px',
                            marginBottom: 14,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '0.75rem',
                            color: '#92400e',
                            fontFamily: 'sans-serif',
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <ShieldCheck size={16} color="#d97706" />
                              <span>
                                <strong>Active AI Query Ground Truth:</strong> Extracted data for <strong>{highlightState.toUpperCase()}</strong> has been verified against Row {masterTable84.findIndex(r => isRowHighlighted(r.state)) + 1} below.
                              </span>
                            </div>
                            <button
                              onClick={jumpToHighlightedRow}
                              style={{ background: '#d97706', color: '#fff', border: 'none', padding: '3px 8px', borderRadius: 2, cursor: 'pointer', fontSize: '0.6875rem', fontWeight: 600 }}
                            >
                              Jump to Row ↓
                            </button>
                          </div>
                        )}

                        {/* Full Master Table with all columns */}
                        <div style={{ border: '1px solid #d1d5db', borderRadius: 2, overflowX: 'auto', marginBottom: 16 }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', fontFamily: 'sans-serif' }}>
                            <thead style={{ background: '#f8fafc', borderBottom: '2px solid #cbd5e1' }}>
                              <tr>
                                <th style={{ padding: '8px 6px', textAlign: 'center', borderRight: '1px solid #e2e8f0', width: 32 }}>S.No</th>
                                <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid #e2e8f0' }}>State / Region</th>
                                <th style={{ padding: '8px 10px', textAlign: 'left', borderRight: '1px solid #e2e8f0' }}>Operating Entities</th>
                                <th style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0' }}>Reserves (BT)</th>
                                <th style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0' }}>Open-Cast (MT)</th>
                                <th style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0' }}>Underground (MT)</th>
                                <th style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0', background: '#f1f5f9' }}>Total Output FY25</th>
                                <th style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0' }}>Output FY24</th>
                                <th style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0' }}>YoY %</th>
                                <th style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0' }}>Share %</th>
                                <th style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0' }}>Target MT</th>
                                <th style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0' }}>Fulfillment %</th>
                                <th style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0' }}>Power Offtake</th>
                                <th style={{ padding: '8px 8px', textAlign: 'right' }}>Non-Power</th>
                              </tr>
                            </thead>
                            <tbody>
                              {masterTable84
                                .filter(r => !filterDocText || r.state.toLowerCase().includes(filterDocText.toLowerCase()) || r.subsidiary.toLowerCase().includes(filterDocText.toLowerCase()))
                                .map(row => {
                                  const highlighted = isRowHighlighted(row.state);
                                  return (
                                    <tr
                                      key={row.sno}
                                      id={highlighted ? 'target-highlighted-row' : undefined}
                                      style={{
                                        borderBottom: '1px solid #e2e8f0',
                                        background: highlighted ? '#fffbeb' : row.sno % 2 === 0 ? '#fafafa' : '#ffffff',
                                        borderLeft: highlighted ? '4px solid #d97706' : undefined,
                                        fontWeight: highlighted ? 600 : 400,
                                        transition: 'background 0.2s',
                                      }}
                                    >
                                      <td style={{ padding: '8px 6px', textAlign: 'center', borderRight: '1px solid #e2e8f0', color: '#6b7280' }}>
                                        {row.sno}
                                      </td>
                                      <td style={{ padding: '8px 10px', borderRight: '1px solid #e2e8f0', color: highlighted ? '#b45309' : '#111827' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                          {highlighted && <span style={{ color: '#d97706' }}>★</span>}
                                          <span>{row.state}</span>
                                        </div>
                                        {highlighted && (
                                          <div style={{ fontSize: '0.625rem', color: '#b45309', fontWeight: 700, textTransform: 'uppercase' }}>
                                            [Audited Extraction Match]
                                          </div>
                                        )}
                                      </td>
                                      <td style={{ padding: '8px 10px', borderRight: '1px solid #e2e8f0', fontSize: '0.6875rem', color: '#4b5563' }}>
                                        {row.subsidiary}
                                      </td>
                                      <td style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0', color: '#374151' }}>
                                        {row.reserves}
                                      </td>
                                      <td style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0', color: '#374151' }}>
                                        {row.ocMt}
                                      </td>
                                      <td style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0', color: '#374151' }}>
                                        {row.ugMt}
                                      </td>
                                      <td style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0', background: highlighted ? '#fef3c7' : '#f8fafc', fontWeight: 700, color: highlighted ? '#92400e' : '#111827' }}>
                                        {row.totalFY25} MT
                                      </td>
                                      <td style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0', color: '#4b5563' }}>
                                        {row.totalFY24} MT
                                      </td>
                                      <td style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0', color: '#059669', fontWeight: 600 }}>
                                        {row.growth}
                                      </td>
                                      <td style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0', color: '#374151' }}>
                                        {row.share}
                                      </td>
                                      <td style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0', color: '#4b5563' }}>
                                        {row.target}
                                      </td>
                                      <td style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0', color: '#047857', fontWeight: 600 }}>
                                        {row.fulfillment}
                                      </td>
                                      <td style={{ padding: '8px 8px', textAlign: 'right', borderRight: '1px solid #e2e8f0', color: '#374151' }}>
                                        {row.powerOfftake} MT
                                      </td>
                                      <td style={{ padding: '8px 8px', textAlign: 'right', color: '#374151' }}>
                                        {row.nonPowerOfftake} MT
                                      </td>
                                    </tr>
                                  );
                                })}

                              {/* All-India Grand Total Row */}
                              <tr style={{ background: '#1e293b', color: '#ffffff', fontWeight: 700 }}>
                                <td style={{ padding: '10px 6px', textAlign: 'center' }}>Σ</td>
                                <td style={{ padding: '10px 10px' }}>{allIndiaTotal.state}</td>
                                <td style={{ padding: '10px 10px', fontSize: '0.6875rem', opacity: 0.85 }}>{allIndiaTotal.subsidiary}</td>
                                <td style={{ padding: '10px 8px', textAlign: 'right' }}>{allIndiaTotal.reserves}</td>
                                <td style={{ padding: '10px 8px', textAlign: 'right' }}>{allIndiaTotal.ocMt} MT</td>
                                <td style={{ padding: '10px 8px', textAlign: 'right' }}>{allIndiaTotal.ugMt} MT</td>
                                <td style={{ padding: '10px 8px', textAlign: 'right', background: '#0f172a', color: '#f59e0b', fontSize: '0.8125rem' }}>
                                  {allIndiaTotal.totalFY25} MT
                                </td>
                                <td style={{ padding: '10px 8px', textAlign: 'right', opacity: 0.9 }}>{allIndiaTotal.totalFY24} MT</td>
                                <td style={{ padding: '10px 8px', textAlign: 'right', color: '#34d399' }}>{allIndiaTotal.growth}</td>
                                <td style={{ padding: '10px 8px', textAlign: 'right' }}>{allIndiaTotal.share}</td>
                                <td style={{ padding: '10px 8px', textAlign: 'right', opacity: 0.9 }}>{allIndiaTotal.target}</td>
                                <td style={{ padding: '10px 8px', textAlign: 'right', color: '#34d399' }}>{allIndiaTotal.fulfillment}</td>
                                <td style={{ padding: '10px 8px', textAlign: 'right' }}>{allIndiaTotal.powerOfftake} MT</td>
                                <td style={{ padding: '10px 8px', textAlign: 'right' }}>{allIndiaTotal.nonPowerOfftake} MT</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        {/* Statutory Explanatory Footnotes */}
                        <div style={{
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          padding: '12px 16px',
                          borderRadius: 2,
                          fontSize: '0.6875rem',
                          color: '#4b5563',
                          lineHeight: 1.6,
                          marginBottom: 16,
                        }}>
                          <div style={{ fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>STATUTORY EXPLANATORY NOTES:</div>
                          <div>[1] Production records include gross raw coal raised from opencast (OC) and underground (UG) workings across all 8 operating subsidiaries of Coal India Limited and Singareni Collieries Company Limited (SCCL).</div>
                          <div>[2] Reserves reflect Proved, Indicated and Inferred categories surveyed by the Geological Survey of India (GSI) and Central Mine Planning &amp; Design Institute (CMPDI) up to depths of 1,200 meters.</div>
                          <div>[3] Power utility offtake conforms to statutory allocations ratified by the Inter-Ministerial Sub-Committee on Coal Linkages (CEA, Ministry of Power, and Indian Railways).</div>
                          <div>[4] Highlighting indicates verified data points referenced in parliamentary queries, official cabinet notes, and AI mining intelligence extractions.</div>
                        </div>

                        {/* Statutory Attestation & Seals */}
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderTop: '2px solid #e2e8f0',
                          paddingTop: 14,
                          fontSize: '0.75rem',
                          color: '#374151',
                        }}>
                          <div>
                            <div style={{ fontWeight: 700 }}>Dr. A. K. Banerjee</div>
                            <div style={{ fontSize: '0.6875rem', color: '#6b7280' }}>Director of Statistics, Ministry of Coal</div>
                            <div style={{ fontSize: '0.625rem', color: '#9ca3af' }}>Government of India, New Delhi</div>
                          </div>

                          <div style={{ textAlign: 'center' }}>
                            <div style={{
                              display: 'inline-flex', alignItems: 'center', gap: 6,
                              padding: '4px 12px', background: '#ecfdf5', border: '1px solid #10b981',
                              borderRadius: 3, color: '#047857', fontWeight: 600, fontSize: '0.6875rem',
                            }}>
                              <ShieldCheck size={14} color="#047857" />
                              VERIFIED DIGITAL ATTESTATION · CCO STATISTICAL REPOSITORY
                            </div>
                            <div style={{ fontSize: '0.5625rem', color: '#9ca3af', marginTop: 2, fontFamily: 'monospace' }}>
                              SHA-256: 8f4b7a192c4e9104db8a101b2384f9810a9c2b4e · 2025-04-12T14:30:00Z
                            </div>
                          </div>

                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: 700 }}>Shri R. K. Mahapatra</div>
                            <div style={{ fontSize: '0.6875rem', color: '#6b7280' }}>Coal Controller of India</div>
                            <div style={{ fontSize: '0.625rem', color: '#9ca3af' }}>Council House Street, Kolkata</div>
                          </div>
                        </div>
                      </div>
                    ) : currPage === 57 ? (
                      /* --- PAGE 57: NATIONAL COAL BALANCE SHEET & IMPORT ECONOMICS --- */
                      <div>
                        <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: 10, marginBottom: 14 }}>
                          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>
                            Chapter 7: National Coal Balance Sheet & Import Substitution Economics
                          </div>
                          <h1 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827', margin: '4px 0' }}>
                            Statement 7.2: National Raw Coal Inflow, Washery Beneficiation & Forex Savings (FY 2024-25)
                          </h1>
                        </div>
                        <p style={{ fontSize: '0.8125rem', lineHeight: 1.7, color: '#374151', marginBottom: 16 }}>
                          Domestic coal output reached an all-time pinnacle of 1,047.52 MT in FY 2024-25, curbing non-coking coal imports by 24.2 MT and saving ₹12,400 Crore in foreign exchange reserves. Coking coal beneficiation through modern heavy-media cyclone washeries in BCCL and CCL produced 14.2 MT of washed coking coal for SAIL and RINL steel plants.
                        </p>
                        <div style={{ border: '1px solid #d1d5db', borderRadius: 2, overflow: 'hidden', marginBottom: 16 }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', fontFamily: 'sans-serif' }}>
                            <thead style={{ background: '#f8fafc', borderBottom: '1px solid #d1d5db' }}>
                              <tr>
                                <th style={{ padding: '8px', textAlign: 'left' }}>Grade Band (GCV kcal/kg)</th>
                                <th style={{ padding: '8px', textAlign: 'left' }}>Primary Utilization</th>
                                <th style={{ padding: '8px', textAlign: 'right' }}>Output (MT)</th>
                                <th style={{ padding: '8px', textAlign: 'right' }}>Share %</th>
                                <th style={{ padding: '8px', textAlign: 'right' }}>Import Substitution Value</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                <td style={{ padding: '8px' }}>Steel Grade I &amp; II (Coking)</td>
                                <td style={{ padding: '8px' }}>SAIL / RINL Blast Furnaces</td>
                                <td style={{ padding: '8px', textAlign: 'right' }}>18.4 MT</td>
                                <td style={{ padding: '8px', textAlign: 'right' }}>1.76%</td>
                                <td style={{ padding: '8px', textAlign: 'right', color: '#047857', fontWeight: 600 }}>₹7,800 Cr</td>
                              </tr>
                              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                <td style={{ padding: '8px' }}>Washery Grade I–IV (Semi-Coking)</td>
                                <td style={{ padding: '8px' }}>Piparwar, Kathara, Madhuband</td>
                                <td style={{ padding: '8px', textAlign: 'right' }}>34.2 MT</td>
                                <td style={{ padding: '8px', textAlign: 'right' }}>3.26%</td>
                                <td style={{ padding: '8px', textAlign: 'right', color: '#047857', fontWeight: 600 }}>₹4,600 Cr</td>
                              </tr>
                              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                <td style={{ padding: '8px' }}>Thermal Grade G1–G8 (High GCV)</td>
                                <td style={{ padding: '8px' }}>Raniganj &amp; Makum Pitheads</td>
                                <td style={{ padding: '8px', textAlign: 'right' }}>112.8 MT</td>
                                <td style={{ padding: '8px', textAlign: 'right' }}>10.77%</td>
                                <td style={{ padding: '8px', textAlign: 'right', color: '#047857', fontWeight: 600 }}>₹11,200 Cr</td>
                              </tr>
                              <tr>
                                <td style={{ padding: '8px' }}>Power Grade G9–G13 (Utility Steam)</td>
                                <td style={{ padding: '8px' }}>NTPC &amp; State Electricity Boards</td>
                                <td style={{ padding: '8px', textAlign: 'right' }}>882.12 MT</td>
                                <td style={{ padding: '8px', textAlign: 'right' }}>84.21%</td>
                                <td style={{ padding: '8px', textAlign: 'right', color: '#047857', fontWeight: 600 }}>₹42,800 Cr</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : currPage === 59 ? (
                      /* --- PAGE 59: HEMM MECHANIZATION FLEET --- */
                      <div>
                        <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: 10, marginBottom: 14 }}>
                          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>
                            Chapter 9: Heavy Earth Moving Machinery (HEMM) Deployment
                          </div>
                          <h1 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827', margin: '4px 0' }}>
                            Table 9.1: Dragline, Shovel, Dumper &amp; Continuous Surface Miner Inventory
                          </h1>
                        </div>
                        <p style={{ fontSize: '0.8125rem', lineHeight: 1.7, color: '#374151', marginBottom: 16 }}>
                          High mechanization ratios enabled Coal India to lift stripping ratios while maintaining low production costs. 18 giant walking draglines (24m³ to 42m³ bucket capacity) operated continuously across NCL (Singrauli) and SECL (Korba).
                        </p>
                        <div style={{ border: '1px solid #d1d5db', borderRadius: 2, overflow: 'hidden' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', fontFamily: 'sans-serif' }}>
                            <thead style={{ background: '#f8fafc', borderBottom: '1px solid #d1d5db' }}>
                              <tr>
                                <th style={{ padding: '8px', textAlign: 'left' }}>Machinery Class</th>
                                <th style={{ padding: '8px', textAlign: 'left' }}>Primary Capacity</th>
                                <th style={{ padding: '8px', textAlign: 'right' }}>Active Fleet Units</th>
                                <th style={{ padding: '8px', textAlign: 'right' }}>Availability Index %</th>
                                <th style={{ padding: '8px', textAlign: 'left' }}>Dominant Subsidiaries</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                <td style={{ padding: '8px', fontWeight: 600 }}>Walking Draglines</td>
                                <td style={{ padding: '8px' }}>24m³ to 42m³ Bucket</td>
                                <td style={{ padding: '8px', textAlign: 'right', fontWeight: 700 }}>18 Units</td>
                                <td style={{ padding: '8px', textAlign: 'right', color: '#047857' }}>88.4%</td>
                                <td style={{ padding: '8px' }}>NCL, SECL</td>
                              </tr>
                              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                <td style={{ padding: '8px', fontWeight: 600 }}>Electric Rope Shovels</td>
                                <td style={{ padding: '8px' }}>10m³ to 42m³</td>
                                <td style={{ padding: '8px', textAlign: 'right', fontWeight: 700 }}>248 Units</td>
                                <td style={{ padding: '8px', textAlign: 'right', color: '#047857' }}>84.2%</td>
                                <td style={{ padding: '8px' }}>MCL, SECL, NCL, CCL</td>
                              </tr>
                              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                <td style={{ padding: '8px', fontWeight: 600 }}>Heavy Dump Trucks</td>
                                <td style={{ padding: '8px' }}>100T to 240T Payload</td>
                                <td style={{ padding: '8px', textAlign: 'right', fontWeight: 700 }}>2,840 Units</td>
                                <td style={{ padding: '8px', textAlign: 'right', color: '#047857' }}>81.9%</td>
                                <td style={{ padding: '8px' }}>All Subsidiaries</td>
                              </tr>
                              <tr>
                                <td style={{ padding: '8px', fontWeight: 600 }}>Continuous Surface Miners</td>
                                <td style={{ padding: '8px' }}>Blast-Free Milling Drum</td>
                                <td style={{ padding: '8px', textAlign: 'right', fontWeight: 700 }}>114 Units</td>
                                <td style={{ padding: '8px', textAlign: 'right', color: '#047857' }}>92.1%</td>
                                <td style={{ padding: '8px' }}>MCL (98.2% OC Output)</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : currPage === 60 ? (
                      /* --- PAGE 60: DGMS AUDIT CERTIFICATE --- */
                      <div>
                        <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: 10, marginBottom: 14 }}>
                          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>
                            Chapter 10: DGMS Statutory Audit &amp; Environmental Compliance
                          </div>
                          <h1 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827', margin: '4px 0' }}>
                            Statutory Attestation of Mines Safety &amp; Ecological Restoration (FY 2024-25)
                          </h1>
                        </div>
                        <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 2, padding: '16px', marginBottom: 16 }}>
                          <p style={{ fontSize: '0.8125rem', lineHeight: 1.7, color: '#374151' }}>
                            The Directorate General of Mines Safety (DGMS), Ministry of Labour and Employment, hereby certifies that safety audits conducted across 318 active coal mines in FY 2024-25 confirmed a 21.6% reduction in fatal casualties. Mechanized roof-bolting in underground bord-and-pillar workings achieved 100% adherence to Coal Mines Regulations 2017.
                          </p>
                          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                            <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '10px', textAlign: 'center' }}>
                              <div style={{ fontSize: '0.6875rem', color: '#6b7280' }}>Fatality Rate / MT</div>
                              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#047857' }}>0.027</div>
                              <div style={{ fontSize: '0.625rem', color: '#059669' }}>-27.0% Improvement</div>
                            </div>
                            <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '10px', textAlign: 'center' }}>
                              <div style={{ fontSize: '0.6875rem', color: '#6b7280' }}>Eco-Restoration</div>
                              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1d4ed8' }}>4,280 Ha</div>
                              <div style={{ fontSize: '0.625rem', color: '#2563eb' }}>Overburden Afforested</div>
                            </div>
                            <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '10px', textAlign: 'center' }}>
                              <div style={{ fontSize: '0.6875rem', color: '#6b7280' }}>CH4 &amp; CO IoT Telemetry</div>
                              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#7c3aed' }}>100%</div>
                              <div style={{ fontSize: '0.625rem', color: '#6d28d9' }}>Real-Time Sensor Grid</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* --- DEFAULT OR OTHER PAGES --- */
                      <div>
                        <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: 10, marginBottom: 14 }}>
                          <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>
                            Chapter 6: Executive Statutory Foreword
                          </div>
                          <h1 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827', margin: '4px 0' }}>
                            Methodological Framework &amp; Data Validation Standards
                          </h1>
                        </div>
                        <p style={{ fontSize: '0.8125rem', lineHeight: 1.7, color: '#374151', marginBottom: 14 }}>
                          The data presented in this compendium embodies statutory submissions made under the Collection of Statistics Act 2008 by Coal India Limited and its eight operating subsidiaries, Singareni Collieries Company Limited, and all operational captive and commercial coal mining blocks across the Republic of India.
                        </p>
                        <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '12px 16px', borderRadius: 2, fontSize: '0.75rem', fontFamily: 'monospace' }}>
                          <div>Publication Volume: Vol. VIII · Comprehensive State Matrix</div>
                          <div>Authority: Coal Controller&apos;s Organisation, Ministry of Coal</div>
                          <div>Statutory Verification Status: Reconciled with SAP Master Ledger</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : doc.name.includes('Production_Statistics') ? (
                
                /* === VIEW 2: FULL MICROSOFT EXCEL SPREADSHEET READER === */
                <div style={{
                  width: '100%',
                  maxWidth: isExpanded ? 1360 : 960,
                  background: '#ffffff',
                  color: '#1e293b',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  borderRadius: 3,
                  fontFamily: 'Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif',
                  border: '1px solid #cbd5e1',
                  overflow: 'hidden',
                }}>
                  {/* Excel Top Green Header Bar */}
                  <div style={{ background: '#107c41', color: '#ffffff', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <FileSpreadsheet size={18} color="#fff" />
                      <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{doc.name} — Excel Matrix Viewer</span>
                      <span style={{ fontSize: '0.6875rem', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: 2 }}>
                        Autosaved · Ready
                      </span>
                    </div>
                    <div style={{ fontSize: '0.6875rem', opacity: 0.9 }}>
                      Active Worksheet: [{activeSheet}]
                    </div>
                  </div>

                  {/* Excel Ribbon Tabs */}
                  <div style={{ background: '#f3f4f6', borderBottom: '1px solid #d1d5db', padding: '4px 12px', display: 'flex', gap: 16, fontSize: '0.75rem', color: '#374151' }}>
                    {['File', 'Home', 'Insert', 'Page Layout', 'Formulas', 'Data', 'Review', 'View', 'Help'].map((tab, i) => (
                      <span key={tab} style={{ fontWeight: i === 1 ? 700 : 400, color: i === 1 ? '#107c41' : '#4b5563', cursor: 'pointer', padding: '2px 4px', borderBottom: i === 1 ? '2px solid #107c41' : 'none' }}>
                        {tab}
                      </span>
                    ))}
                  </div>

                  {/* Formula Bar */}
                  <div style={{ background: '#ffffff', borderBottom: '1px solid #d1d5db', padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', fontFamily: 'monospace' }}>
                    <div style={{ width: 44, padding: '2px 6px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 2, textAlign: 'center', color: '#107c41', fontWeight: 700 }}>
                      {activeCell}
                    </div>
                    <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>fx</span>
                    <div style={{ flex: 1, padding: '2px 8px', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 2, color: '#111827' }}>
                      =SUM(G5:G13)
                    </div>
                  </div>

                  {/* Excel Spreadsheet Grid */}
                  <div style={{ overflowX: 'auto', maxHeight: 480 }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                      <thead style={{ background: '#f1f5f9', position: 'sticky', top: 0, zIndex: 2 }}>
                        <tr>
                          <th style={{ width: 36, padding: '6px', background: '#e2e8f0', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1', textAlign: 'center' }}></th>
                          {['A: State', 'B: Entity Code', 'C: Target MT', 'D: Open-Cast', 'E: Underground', 'F: Total Actual', 'G: Offtake MT', 'H: Rakes/Day', 'I: Moisture %', 'J: Ash %'].map((col, idx) => (
                            <th key={idx} style={{ padding: '6px 10px', textAlign: idx >= 2 ? 'right' : 'left', borderRight: '1px solid #cbd5e1', borderBottom: '1px solid #cbd5e1', fontWeight: 600, color: '#475569' }}>
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { row: 4, state: 'Jharkhand (CCL+BCCL)', code: 'JHK-CIL-01', target: '208.50', oc: '186.40', ug: '26.50', total: '212.90', offtake: '218.40', rakes: '112', moist: '7.8%', ash: '22.4%' },
                          { row: 5, state: 'Odisha (MCL Total)', code: 'ODI-MCL-02', target: '190.40', oc: '188.20', ug: '10.20', total: '198.40', offtake: '194.20', rakes: '104', moist: '9.2%', ash: '34.8%' },
                          { row: 6, state: 'Chhattisgarh (SECL)', code: 'CHG-SEC-03', target: '180.00', oc: '172.80', ug: '11.40', total: '184.20', offtake: '181.60', rakes: '96', moist: '8.4%', ash: '38.2%' },
                          { row: 7, state: 'Madhya Pradesh (NCL)', code: 'MP-NCL-04', target: '148.00', oc: '144.10', ug: '8.60', total: '152.70', offtake: '150.10', rakes: '84', moist: '6.9%', ash: '32.4%' },
                          { row: 8, state: 'West Bengal (ECL)', code: 'WB-ECL-05', target: '115.00', oc: '89.40', ug: '29.20', total: '118.60', offtake: '116.80', rakes: '68', moist: '5.2%', ash: '18.6%' },
                          { row: 9, state: 'Maharashtra (WCL)', code: 'MAH-WCL-06', target: '62.00', oc: '58.30', ug: '6.20', total: '64.50', offtake: '63.20', rakes: '38', moist: '8.9%', ash: '39.4%' },
                          { row: 10, state: 'Telangana (SCCL)', code: 'TEL-SCC-07', target: '70.00', oc: '62.00', ug: '8.00', total: '70.00', offtake: '68.40', rakes: '42', moist: '9.4%', ash: '28.2%' },
                          { row: 11, state: 'Assam & NEC', code: 'ASM-NEC-08', target: '1.00', oc: '0.80', ug: '0.10', total: '0.90', offtake: '0.88', rakes: '4', moist: '3.8%', ash: '6.8%' },
                          { row: 12, state: 'Other / Captive Pits', code: 'IND-CAP-09', target: '44.00', oc: '44.80', ug: '0.52', total: '45.32', offtake: '44.20', rakes: '26', moist: '34.2%', ash: '14.8%' },
                        ].map(item => {
                          const highlighted = isRowHighlighted(item.state);
                          return (
                            <tr
                              key={item.row}
                              onClick={() => setActiveCell(`F${item.row}`)}
                              style={{
                                borderBottom: '1px solid #e2e8f0',
                                background: highlighted ? '#fef3c7' : activeCell.includes(String(item.row)) ? '#f0fdf4' : item.row % 2 === 0 ? '#fafafa' : '#ffffff',
                                cursor: 'pointer',
                              }}
                            >
                              <td style={{ padding: '6px', textAlign: 'center', background: '#f1f5f9', borderRight: '1px solid #cbd5e1', color: '#64748b' }}>
                                {item.row}
                              </td>
                              <td style={{ padding: '6px 10px', borderRight: '1px solid #e2e8f0', fontWeight: highlighted ? 700 : 500, color: highlighted ? '#92400e' : '#0f172a' }}>
                                {highlighted && '★ '}
                                {item.state}
                              </td>
                              <td style={{ padding: '6px 10px', borderRight: '1px solid #e2e8f0', color: '#64748b' }}>{item.code}</td>
                              <td style={{ padding: '6px 10px', textAlign: 'right', borderRight: '1px solid #cbd5e1' }}>{item.target}</td>
                              <td style={{ padding: '6px 10px', textAlign: 'right', borderRight: '1px solid #cbd5e1' }}>{item.oc}</td>
                              <td style={{ padding: '6px 10px', textAlign: 'right', borderRight: '1px solid #cbd5e1' }}>{item.ug}</td>
                              <td style={{ padding: '6px 10px', textAlign: 'right', borderRight: '1px solid #cbd5e1', fontWeight: 700, color: highlighted ? '#b45309' : '#047857' }}>{item.total}</td>
                              <td style={{ padding: '6px 10px', textAlign: 'right', borderRight: '1px solid #cbd5e1' }}>{item.offtake}</td>
                              <td style={{ padding: '6px 10px', textAlign: 'right', borderRight: '1px solid #cbd5e1' }}>{item.rakes}</td>
                              <td style={{ padding: '6px 10px', textAlign: 'right', borderRight: '1px solid #cbd5e1' }}>{item.moist}</td>
                              <td style={{ padding: '6px 10px', textAlign: 'right' }}>{item.ash}</td>
                            </tr>
                          );
                        })}

                        {/* Excel SUM formula row */}
                        <tr style={{ background: '#f8fafc', borderTop: '2px solid #94a3b8', fontWeight: 700, color: '#0f172a' }}>
                          <td style={{ padding: '8px', textAlign: 'center', background: '#e2e8f0', borderRight: '1px solid #cbd5e1' }}>13</td>
                          <td style={{ padding: '8px 10px', borderRight: '1px solid #cbd5e1' }}>=CONSOLIDATED TOTAL</td>
                          <td style={{ padding: '8px 10px', borderRight: '1px solid #cbd5e1', color: '#64748b' }}>ALL-CIL</td>
                          <td style={{ padding: '8px 10px', textAlign: 'right', borderRight: '1px solid #cbd5e1' }}>1,018.90</td>
                          <td style={{ padding: '8px 10px', textAlign: 'right', borderRight: '1px solid #cbd5e1' }}>946.80</td>
                          <td style={{ padding: '8px 10px', textAlign: 'right', borderRight: '1px solid #cbd5e1' }}>100.72</td>
                          <td style={{ padding: '8px 10px', textAlign: 'right', borderRight: '1px solid #cbd5e1', color: '#107c41', fontSize: '0.8125rem' }}>1,047.52</td>
                          <td style={{ padding: '8px 10px', textAlign: 'right', borderRight: '1px solid #cbd5e1' }}>1,021.40</td>
                          <td style={{ padding: '8px 10px', textAlign: 'right', borderRight: '1px solid #cbd5e1' }}>488</td>
                          <td style={{ padding: '8px 10px', textAlign: 'right', borderRight: '1px solid #cbd5e1' }}>8.6%</td>
                          <td style={{ padding: '8px 10px', textAlign: 'right' }}>31.4%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Excel Sheet Tabs at Bottom */}
                  <div style={{ background: '#f3f4f6', borderTop: '1px solid #d1d5db', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.6875rem' }}>
                    <span style={{ color: '#6b7280', marginRight: 6 }}>Sheets:</span>
                    {['State Summary', 'Subsidiary Matrix', 'Power Utility Offtake', 'Daily Rail Dispatches', 'DGMS Incidents'].map(sheet => (
                      <button
                        key={sheet}
                        className="btn btn-ghost"
                        style={{
                          padding: '3px 10px', height: 24, borderRadius: 2,
                          background: activeSheet === sheet ? '#ffffff' : 'transparent',
                          color: activeSheet === sheet ? '#107c41' : '#4b5563',
                          border: activeSheet === sheet ? '1px solid #cbd5e1' : 'none',
                          borderBottom: activeSheet === sheet ? '2px solid #107c41' : 'none',
                          fontWeight: activeSheet === sheet ? 600 : 400,
                        }}
                        onClick={() => {
                          setActiveSheet(sheet);
                          showToast(`Switched to worksheet [${sheet}].`, 'info');
                        }}
                      >
                        {sheet}
                      </button>
                    ))}
                    <div style={{ flex: 1 }} />
                    <span style={{ color: '#6b7280', fontFamily: 'monospace' }}>
                      Ready · Sum: 1,047.52 MT · Count: 9 Rows · 100% Validated
                    </span>
                  </div>
                </div>
              ) : (
                
                /* === VIEW 3: GEOLOGICAL / TECHNICAL MEMOIR (ANNUAL REPORT, KORBA, SAFETY) === */
                <div style={{
                  width: '100%',
                  maxWidth: isExpanded ? 1280 : 900,
                  background: '#ffffff',
                  color: '#1e293b',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  borderRadius: 2,
                  fontFamily: 'sans-serif',
                  border: '1px solid #cbd5e1',
                  overflow: 'hidden',
                  padding: '24px 28px',
                }}>
                  <div style={{ borderBottom: '2px solid #b5651d', paddingBottom: 12, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: '#b5651d', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        {doc.source} · OFFICIAL TECHNICAL MEMOIR
                      </div>
                      <h1 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', margin: '4px 0' }}>
                        {doc.name}
                      </h1>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {doc.description}
                      </div>
                    </div>
                    <span className="badge badge-verified" style={{ fontSize: '0.6875rem' }}>
                      Verified Extraction (Page {currPage})
                    </span>
                  </div>

                  {/* Section content based on doc type */}
                  <div style={{ fontSize: '0.8125rem', color: '#334155', lineHeight: 1.7, marginBottom: 16 }}>
                    <p>
                      Official multi-page technical report ingested and verified via the GeoIntel Optical Character Recognition &amp; Vector Semantic Indexing Pipeline. All strata logs, production metrics, and statutory safety certifications cross-referenced with enterprise master registries.
                    </p>
                  </div>

                  <div style={{ border: '1px solid #cbd5e1', borderRadius: 2, padding: '16px', background: '#f8fafc', marginBottom: 16 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a', marginBottom: 10 }}>
                      Extracted Geological &amp; Operational Attributes
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, fontSize: '0.75rem' }}>
                      <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '10px', borderRadius: 2 }}>
                        <div style={{ color: '#64748b', fontSize: '0.6875rem' }}>Operating Division</div>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{doc.mine || 'All Designated Areas'}</div>
                      </div>
                      <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '10px', borderRadius: 2 }}>
                        <div style={{ color: '#64748b', fontSize: '0.6875rem' }}>Department Authority</div>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{doc.department}</div>
                      </div>
                      <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '10px', borderRadius: 2 }}>
                        <div style={{ color: '#64748b', fontSize: '0.6875rem' }}>Reporting Period</div>
                        <div style={{ fontWeight: 600, color: '#0f172a' }}>{doc.year || 'FY 2024-25'}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '10px 14px', borderRadius: 2, fontSize: '0.75rem', color: '#065f46', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ShieldCheck size={16} color="#059669" />
                    <span>Cryptographically attested against Coal India enterprise data lake. Full multi-column source trace complete.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Persistent Footer Actions Bar */}
      <div style={{
        flexShrink: 0,
        padding: '12px 20px',
        borderTop: '1px solid var(--border)',
        background: 'var(--surface-2)',
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.3)',
      }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={() => showToast(`Intelligence report generated for ${doc.name}.`, 'success')}>
            <FileText size={13} />
            Generate Intelligence Briefing
          </button>
          <button className="btn btn-secondary" onClick={handleExportDoc} title="Download document dossier directly to your computer">
            <Download size={13} />
            Export Dossier (.docx)
          </button>
        </div>

        <button
          className="btn btn-ghost"
          style={{ fontSize: '0.75rem', color: 'var(--copper)', gap: 5 }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          <span>{isExpanded ? "Collapse to Side Panel" : "Expand to Full Width"}</span>
        </button>
      </div>

    </div>
  );
}

export default function DataHubPage() {
  const router = useRouter();
  const { documents, addDocument, recentUploadedId, setRecentUploadedId, deleteDocument } = useDocuments();
  const { isAdmin } = useAuth();
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [detailInitialTab, setDetailInitialTab] = useState<'intelligence' | 'preview'>('intelligence');
  const [detailTargetPage, setDetailTargetPage] = useState<number | undefined>(undefined);
  const [detailHighlightState, setDetailHighlightState] = useState<string | undefined>(undefined);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingDocName, setUploadingDocName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [searchQ, setSearchQ] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Read URL query parameters on mount or when URL changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q');
      const docId = params.get('doc');
      const preview = params.get('preview');
      const page = params.get('page');
      const state = params.get('state');
      if (q) {
        setSearchQ(q);
      }
      if (state) {
        setDetailHighlightState(state);
      }
      if (docId) {
        const needle = docId.toLowerCase();
        const found = documents.find(d => 
          d.id.toLowerCase() === needle || 
          d.name.toLowerCase() === needle ||
          d.name.toLowerCase().includes(needle) ||
          needle.includes(d.name.toLowerCase())
        );
        if (found) {
          setSelectedDoc(found);
          if (preview === 'true') {
            setDetailInitialTab('preview');
          } else {
            setDetailInitialTab('intelligence');
          }
          if (page) {
            setDetailTargetPage(parseInt(page, 10));
          }
        }
      }
    }
  }, [documents]);

  useEffect(() => {
    if (selectedDoc) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedDoc]);

  const startUploadWithFile = (file?: File) => {
    const rawName = file ? file.name : 'CMPDI_Exploration_Survey_Borehole_Lithology_2026.pdf';
    const fileName = rawName.replace(/\s+/g, '_');
    setUploadingDocName(fileName);
    setUploading(true);
    setUploadProgress(0);

    // Detect file type from extension
    const lower = fileName.toLowerCase();
    let detectedType: Document['type'] = 'PDF';
    if (lower.endsWith('.xlsx') || lower.endsWith('.xls') || lower.endsWith('.csv')) {
      detectedType = 'XLSX';
    } else if (lower.endsWith('.docx') || lower.endsWith('.doc')) {
      detectedType = 'DOCX';
    } else if (lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png')) {
      detectedType = 'JPG';
    } else if (lower.includes('scan') || lower.includes('ocr')) {
      detectedType = 'Scanned PDF';
    }

    const estPages = detectedType === 'XLSX' ? undefined : Math.max(1, Math.round((file?.size || 420000) / 38000));
    const estRows = detectedType === 'XLSX' ? Math.max(180, Math.round((file?.size || 65000) / 1024 * 16)) : undefined;
    const docId = `DOC-UPL-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const newDoc: Document = {
      id: docId,
      name: fileName,
      type: detectedType,
      source: file ? 'Coal India Upload Portal' : 'CMPDI Exploration Repository',
      pages: estPages,
      rows: estRows,
      status: 'Validated',
      confidence: 98.8,
      lastUpdated: 'Just now',
      department: 'Geological Survey & Field Operations',
      uploaded: 'Today',
      description: `Uploaded document "${fileName}" parsed, OCR extracted, and ingested into GeoIntel AI knowledge graph for statutory reporting.`,
      mine: 'Field Ingestion',
      year: '2025-26',
    };

    let progress = 0;
    const interval = window.setInterval(() => {
      progress += 14;
      if (progress >= 100) {
        window.clearInterval(interval);
        setUploadProgress(100);
        setTimeout(() => {
          setUploading(false);
          setUploadingDocName('');
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          addDocument(newDoc);
          setSelectedDoc(newDoc);
          setSearchQ('');
          showToast(`Document "${fileName}" uploaded and added to Processing Queue!`, 'success');
        }, 250);
      } else {
        setUploadProgress(progress);
      }
    }, 100);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      startUploadWithFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      startUploadWithFile(e.dataTransfer.files[0]);
    } else {
      startUploadWithFile();
    }
  };

  const query = searchQ.trim().toLowerCase();
  const filteredDocs = documents.filter(d => {
    if (filterStatus !== 'All' && d.status !== filterStatus) return false;
    if (filterType !== 'All' && d.type !== filterType) return false;
    if (!query) return true;
    return (
      d.name.toLowerCase().includes(query) ||
      d.id.toLowerCase().includes(query) ||
      d.source.toLowerCase().includes(query) ||
      (d.mine && d.mine.toLowerCase().includes(query)) ||
      d.department.toLowerCase().includes(query) ||
      d.type.toLowerCase().includes(query) ||
      d.description.toLowerCase().includes(query)
    );
  });

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: selectedDoc ? 'hidden' : 'auto' }}>
        <div className="page-container fade-in">
          {/* Header */}
          <div style={{
            marginBottom: 24,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}>
            <div>
              <h1 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
                Data Hub
              </h1>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                Bring scattered mining records into one searchable knowledge base.
              </p>
              {isAdmin && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 6,
                  padding: '3px 10px', borderRadius: 20,
                  background: 'rgba(181,101,29,0.15)',
                  border: '1px solid rgba(181,101,29,0.4)',
                  fontSize: '0.6875rem', fontWeight: 600, color: 'var(--copper)',
                  letterSpacing: '0.03em',
                }}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <circle cx="4" cy="4" r="4" fill="var(--copper)" opacity="0.9"/>
                  </svg>
                  ADMIN MODE — Delete Enabled
                </div>
              )}
            </div>

            {/* Right side: Download Format Doc Section */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <a
                href="/api/download-format-doc"
                download="GeoIntel_AI_Research_Dossier_Template.docx"
                id="download-format-doc-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 18px',
                  background: 'linear-gradient(135deg, var(--surface-2) 0%, rgba(181, 101, 29, 0.08) 100%)',
                  border: '1px solid rgba(181, 101, 29, 0.35)',
                  borderRadius: 6,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--copper)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(181,101,29,0.25)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(181, 101, 29, 0.35)';
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.25)';
                }}
                onClick={() => {
                  showToast('Downloading GeoIntel_AI_Research_Dossier_Template.docx from trial doc format...', 'success');
                }}
                title="Download official dossier template document (.docx) from trial doc format folder"
              >
                <div style={{
                  width: 34,
                  height: 34,
                  borderRadius: 6,
                  background: 'rgba(181, 101, 29, 0.15)',
                  border: '1px solid rgba(181, 101, 29, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--copper)',
                  flexShrink: 0,
                }}>
                  <FileText size={18} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-primary)' }}>
                    Download Format Doc
                    <Download size={13} color="var(--copper)" />
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                    Official Template (.DOCX) &bull; trial doc format
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Upload zone */}
          <div
            onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${isDragOver ? 'var(--copper)' : 'var(--border-light)'}`,
              background: isDragOver ? 'rgba(181,101,29,0.06)' : 'var(--surface-2)',
              borderRadius: 3,
              padding: '32px 24px',
              textAlign: 'center',
              marginBottom: 24,
              transition: 'all 0.2s',
            }}
          >
            {uploading ? (
              <div style={{ maxWidth: 380, margin: '0 auto' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: 8 }}>
                  Ingesting {uploadingDocName || 'document'}...
                </div>
                <div style={{ height: 6, background: 'var(--coal-700)', borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
                  <div style={{ height: '100%', width: `${uploadProgress}%`, background: 'var(--copper)', borderRadius: 3, transition: 'width 0.2s' }} />
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                  {uploadProgress < 30 ? 'Uploading and parsing binary buffer...' : uploadProgress < 65 ? 'Extracting OCR text, coordinates & tables...' : uploadProgress < 85 ? 'Classifying geological & mining entities...' : 'Indexing into active knowledge graph...'}
                </div>
              </div>
            ) : (
              <>
                <Upload size={28} color="var(--text-muted)" style={{ marginBottom: 12 }} />
                <div style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: 6 }}>
                  Drop mining documents here
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 16 }}>
                  Supported: PDF &bull; XLSX &bull; DOCX &bull; JPG &bull; PNG &bull; CSV
                </div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={13} />
                    Browse Files
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => startUploadWithFile()}
                  >
                    <Archive size={13} />
                    Import Archive
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileSelect}
                  accept=".pdf,.xlsx,.xls,.docx,.doc,.jpg,.jpeg,.png,.csv"
                />
              </>
            )}
          </div>

          {/* Processing queue header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Processing Queue</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{filteredDocs.length} of {documents.length} documents</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {/* Search */}
              <div style={{ position: 'relative' }}>
                <Search size={12} style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  className="input-field"
                  placeholder="Search documents..."
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  style={{ paddingLeft: 28, paddingRight: searchQ ? 24 : 8, height: 32, width: 190, fontSize: '0.75rem' }}
                />
                {searchQ && (
                  <button
                    onClick={() => setSearchQ('')}
                    style={{
                      position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
                      background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer',
                      padding: 2, display: 'flex'
                    }}
                    title="Clear filter"
                  >
                    <X size={11} />
                  </button>
                )}
              </div>
              {/* Status filter */}
              <select className="select-field" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ height: 32, fontSize: '0.75rem' }}>
                {['All', 'Validated', 'Indexed', 'OCR Complete', 'Needs Review'].map(v => <option key={v}>{v}</option>)}
              </select>
              {/* Type filter */}
              <select className="select-field" value={filterType} onChange={e => setFilterType(e.target.value)} style={{ height: 32, fontSize: '0.75rem' }}>
                {['All', 'PDF', 'XLSX', 'Scanned PDF', 'DOCX'].map(v => <option key={v}>{v}</option>)}
              </select>
              {/* Export Registry CSV */}
              <button
                className="btn btn-secondary"
                style={{ height: 32, fontSize: '0.75rem' }}
                onClick={() => {
                  const headers = ['File Name', 'Format', 'Source Subsidiary', 'Department', 'Scope', 'Status', 'Confidence', 'Last Updated'];
                  const rows = filteredDocs.map(d => [d.name, d.type, d.source, d.department, d.pages ? `${d.pages} pages` : d.rows ? `${d.rows} rows` : 'Digital', d.status, `${(d.confidence * 100).toFixed(1)}%`, d.lastUpdated]);
                  exportToCsv(`CIL_CMPDI_Document_Registry_${new Date().toISOString().slice(0, 10)}`, headers, rows);
                }}
                title="Download document registry as CSV"
              >
                <Download size={12} />
                Export Registry (CSV)
              </button>
            </div>
          </div>

          {/* Document table */}
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 2, overflow: 'hidden' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>File</th>
                  <th>Type</th>
                  <th>Source</th>
                  <th>Size</th>
                  <th>Status</th>
                  <th>Confidence</th>
                  <th>Last Updated</th>
                  <th>{isAdmin ? 'Actions' : ''}</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ textAlign: 'center', padding: '48px 24px' }}>
                      <Search size={24} color="var(--text-muted)" style={{ margin: '0 auto 8px', opacity: 0.5 }} />
                      <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: 4 }}>
                        No documents found matching &quot;{searchQ}&quot;
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 14 }}>
                        Try clearing your filters or query the AI Deep Search knowledge corpus.
                      </div>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                        <button className="btn btn-secondary" onClick={() => { setSearchQ(''); setFilterStatus('All'); setFilterType('All'); }}>
                          Clear Filters
                        </button>
                        <button className="btn btn-primary" onClick={() => router.push(`/dashboard/ai-search?q=${encodeURIComponent(searchQ)}`)}>
                          <Sparkles size={12} />
                          Search with AI Deep Search
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredDocs.map(doc => {
                    const isRecent = doc.id === recentUploadedId;
                    return (
                      <tr
                        key={doc.id}
                        style={{
                          cursor: 'pointer',
                          background: isRecent ? 'rgba(181,101,29,0.12)' : undefined,
                          borderLeft: isRecent ? '3px solid var(--copper)' : undefined,
                          transition: 'all 0.3s ease',
                        }}
                        onClick={() => setSelectedDoc(doc)}
                      >
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <FileTypeIcon type={doc.type} />
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <span style={{
                                  fontSize: '0.8125rem',
                                  color: isRecent ? 'var(--copper)' : 'var(--text-primary)',
                                  fontWeight: isRecent ? 600 : 400
                                }}>
                                  {doc.name}
                                </span>
                                {isRecent && (
                                  <span style={{
                                    fontSize: '0.5625rem', fontWeight: 700, padding: '1px 5px',
                                    background: 'var(--copper)', color: '#fff', borderRadius: 2,
                                    letterSpacing: '0.04em'
                                  }}>
                                    JUST UPLOADED
                                  </span>
                                )}
                              </div>
                              <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>{doc.id}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span style={{ 
                            fontSize: '0.625rem', fontWeight: 600, letterSpacing: '0.04em',
                            padding: '2px 6px', background: 'var(--coal-700)', borderRadius: 2,
                            color: 'var(--text-secondary)',
                          }}>{doc.type}</span>
                        </td>
                        <td style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{doc.source}</td>
                        <td style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                          {doc.pages ? `${doc.pages} pages` : `${doc.rows?.toLocaleString('en-IN')} rows`}
                        </td>
                        <td><StatusBadge status={doc.status} /></td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div className="confidence-bar-bg">
                              <div className="confidence-bar-fill" style={{ width: `${doc.confidence}%` }} />
                            </div>
                            <span style={{ fontSize: '0.75rem', color: doc.confidence >= 95 ? 'var(--verified)' : doc.confidence >= 85 ? 'var(--safety)' : 'var(--alert)' }}>
                              {doc.confidence}%
                            </span>
                          </div>
                        </td>
                        <td style={{ color: isRecent ? 'var(--copper)' : 'var(--text-muted)', fontSize: '0.75rem', fontWeight: isRecent ? 600 : 400 }}>
                          {doc.lastUpdated}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                            <button
                              className="btn btn-ghost"
                              style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                              onClick={e => { e.stopPropagation(); setSelectedDoc(doc); }}
                            >
                              <Eye size={12} />
                              View
                            </button>
                            {isAdmin && (
                              confirmDeleteId === doc.id ? (
                                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} onClick={e => e.stopPropagation()}>
                                  <button
                                    className="btn btn-ghost"
                                    style={{ padding: '4px 8px', fontSize: '0.6875rem', color: 'var(--alert)', borderColor: 'rgba(184,74,74,0.4)', border: '1px solid rgba(184,74,74,0.4)', borderRadius: 3 }}
                                    onClick={e => {
                                      e.stopPropagation();
                                      deleteDocument(doc.id);
                                      if (selectedDoc?.id === doc.id) setSelectedDoc(null);
                                      setConfirmDeleteId(null);
                                      showToast(`"${doc.name}" deleted from Data Hub.`, 'info');
                                    }}
                                    title="Confirm delete"
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    className="btn btn-ghost"
                                    style={{ padding: '4px 6px', fontSize: '0.6875rem', color: 'var(--text-muted)' }}
                                    onClick={e => { e.stopPropagation(); setConfirmDeleteId(null); }}
                                    title="Cancel delete"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <button
                                  className="btn btn-ghost"
                                  style={{ padding: '4px 8px', fontSize: '0.75rem', color: 'var(--alert)', opacity: 0.8 }}
                                  onClick={e => { e.stopPropagation(); setConfirmDeleteId(doc.id); }}
                                  title="Admin: Delete this document from Data Hub"
                                >
                                  <X size={12} />
                                  Delete
                                </button>
                              )
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Document detail panel */}
      {selectedDoc && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 299 }}
            onClick={() => setSelectedDoc(null)}
          />
          <DocumentDetailPanel 
            doc={selectedDoc} 
            initialTab={detailInitialTab}
            targetPage={detailTargetPage}
            highlightState={detailHighlightState}
            onClose={() => {
              setSelectedDoc(null);
              setDetailInitialTab('intelligence');
              setDetailTargetPage(undefined);
              setDetailHighlightState(undefined);
            }} 
          />
        </>
      )}
    </div>
  );
}
