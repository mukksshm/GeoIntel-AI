'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Upload, X, FileText, FileSpreadsheet, File, Image as ImageIcon,
  CheckCircle, Clock, AlertTriangle, ChevronRight, Eye, Download,
  MapPin, Calendar, Hash, Building, ExternalLink, Archive, Search
} from 'lucide-react';
import { documents, Document } from '@/lib/mock-data';
import { useToast } from '@/lib/toast';
import { exportToDocx, exportToCsv } from '@/lib/export-utils';

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

function DocumentDetailPanel({ doc, onClose }: { doc: Document; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'intelligence' | 'preview'>('intelligence');
  const { showToast } = useToast();

  const entities = [
    { key: 'Mine / Area', value: doc.mine || 'Multiple Areas' },
    { key: 'Department', value: doc.department },
    { key: 'Production', value: doc.year === '2024-25' ? '1,047.52 MT' : 'See document' },
    { key: 'Reporting Period', value: doc.year || 'N/A' },
    { key: 'Open Cast %', value: doc.year === '2024-25' ? '96.96%' : 'N/A' },
    { key: 'Underground %', value: doc.year === '2024-25' ? '3.04%' : 'N/A' },
  ];

  const traceability = [
    { step: 'Extracted value', note: '1,047.52 MT' },
    { step: 'Primary source', note: 'Page 42, Table 6.2' },
    { step: 'Confidence score', note: `${(doc.confidence * 100).toFixed(1)}% (High)` },
    { step: 'Cross-reference', note: 'Matches Annual Report FY24-25' },
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
              ['OCR Confidence Score', `${(doc.confidence * 100).toFixed(1)}%`],
              ['Document Scope', doc.pages ? `${doc.pages} pages` : doc.rows ? `${doc.rows} rows` : 'Digital Record'],
            ],
          },
        },
        {
          heading: '2. Ground Truth & Traceability Evidence',
          bulletPoints: [
            'Extracted Value: 1,047.52 MT Raw Coal Output',
            'Primary Evidence: Page 42, Table 6.2 (Annual Report FY25)',
            'Confidence Tier: Verified by Automated Validation Engine',
            'Cross-check: Validated against CIL Enterprise SAP Database',
          ],
        },
      ]
    );
  };

  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, bottom: 0,
      width: 740, background: 'var(--coal-900)',
      borderLeft: '1px solid var(--border-light)',
      zIndex: 300,
      display: 'flex', flexDirection: 'column',
      boxShadow: '-8px 0 40px rgba(0,0,0,0.4)',
      overscrollBehavior: 'contain',
    }} className="slide-in-right">
      {/* Header */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        background: 'var(--surface-2)',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <FileTypeIcon type={doc.type} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{doc.name}</span>
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { label: 'DOC ID', value: doc.id },
              { label: 'Source', value: doc.source },
              { label: 'Uploaded', value: doc.uploaded },
              { label: doc.pages ? 'Pages' : 'Rows', value: doc.pages ? `${doc.pages} pages` : `${doc.rows?.toLocaleString('en-IN')} rows` },
            ].map(m => (
              <div key={m.label} style={{ display: 'flex', gap: 6 }}>
                <span className="text-label" style={{ marginBottom: 0 }}>{m.label}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <StatusBadge status={doc.status} />
          <span style={{ fontSize: '0.75rem', color: 'var(--verified)', marginLeft: 4 }}>{doc.confidence}%</span>
          <button className="btn btn-ghost" style={{ padding: 6 }} onClick={onClose}>
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
        {[
          { key: 'intelligence', label: 'Extracted Intelligence' },
          { key: 'preview', label: 'Document Preview' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              padding: '10px 20px',
              fontSize: '0.8125rem', fontWeight: activeTab === tab.key ? 500 : 400,
              color: activeTab === tab.key ? 'var(--text-primary)' : 'var(--text-muted)',
              background: 'transparent', border: 'none', cursor: 'pointer',
              borderBottom: activeTab === tab.key ? '2px solid var(--copper)' : '2px solid transparent',
              marginBottom: -1,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
        {activeTab === 'intelligence' && (
          <div style={{ flex: 1, overflowY: 'auto', overscrollBehavior: 'contain', padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Description */}
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: '14px 18px', borderRadius: 2 }}>
              <div className="text-label" style={{ marginBottom: 8 }}>Document Description</div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{doc.description}</p>
            </div>

            {/* Key entities */}
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                <div className="text-label">Key Extracted Entities</div>
                <span style={{ fontSize: '0.625rem', color: 'var(--verified)', letterSpacing: '0.04em' }}>AI EXTRACTED</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                {entities.map((e, i) => (
                  <div key={i} style={{
                    padding: '12px 18px',
                    borderBottom: i < entities.length - 2 ? '1px solid var(--border)' : 'none',
                    borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none',
                  }}>
                    <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{e.key}</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{e.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Traceability */}
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--border)' }}>
                <div className="text-label">Source Traceability</div>
              </div>
              <div style={{ padding: '16px 18px' }}>
                {traceability.map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: i < traceability.length - 1 ? 8 : 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: i === traceability.length - 1 ? 'var(--copper)' : 'var(--info)', flexShrink: 0, marginTop: 4 }} />
                      {i < traceability.length - 1 && <div style={{ width: 1, height: 20, background: 'var(--border)', marginTop: 4 }} />}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>{t.step}</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)' }}>{t.note}</div>
                    </div>
                  </div>
                ))}
                <button
                  className="btn btn-secondary"
                  style={{ marginTop: 14 }}
                  onClick={() => showToast('Opening source document viewer...', 'info')}
                >
                  <ExternalLink size={13} />
                  View Source
                </button>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary" onClick={() => showToast('Report generated from document.', 'success')}>
                <FileText size={13} />
                Generate Report
              </button>
              <button className="btn btn-secondary" onClick={handleExportDoc} title="Download document dossier directly to your computer">
                <Download size={13} />
                Export Dossier (.doc)
              </button>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Mock PDF viewer */}
            <div style={{ background: 'var(--coal-800)', borderBottom: '1px solid var(--border)', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Page 42 of {doc.pages || 'N/A'}</span>
              <div style={{ flex: 1 }} />
              <span style={{ fontSize: '0.6875rem', color: 'var(--info)' }}>Highlighted: Production Data</span>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', background: 'var(--coal-800)', display: 'flex', justifyContent: 'center', padding: 24 }}>
              <div style={{
                width: '100%', maxWidth: 520,
                background: '#fff', color: '#1a1a1e',
                boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
                fontFamily: 'Georgia, serif',
                fontSize: '0.8125rem',
              }}>
                {/* Document header */}
                <div style={{ background: '#1a3a5c', color: '#fff', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.625rem', letterSpacing: '0.1em', opacity: 0.7 }}>COAL INDIA LIMITED</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, fontFamily: 'sans-serif' }}>Coal Directory 2024–25</div>
                  </div>
                  <div style={{ fontSize: '0.6875rem', opacity: 0.7 }}>Page 42</div>
                </div>

                <div style={{ padding: '20px 24px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#555', marginBottom: 12 }}>
                    Chapter 6 — Production Statistics
                  </div>
                  <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1e', marginBottom: 12, lineHeight: 1.3 }}>
                    Table 6.2: Company-wise / Subsidiary-wise Actual Raw Coal Production
                  </h2>
                  <p style={{ fontSize: '0.75rem', lineHeight: 1.6, color: '#333', marginBottom: 16 }}>
                    The raw coal production data for FY 2024-25 shows continued growth across subsidiaries, with total CIL production reaching 1,047.52 MT against a target of 1,012.19 MT.
                  </p>

                  {/* Highlighted table */}
                  <div style={{ 
                    background: 'rgba(181,101,29,0.08)', 
                    border: '2px solid rgba(181,101,29,0.4)',
                    borderRadius: 2, 
                    overflow: 'hidden', 
                    marginBottom: 16 
                  }}>
                    <div style={{ padding: '4px 8px', background: 'rgba(181,101,29,0.15)', fontSize: '0.625rem', color: '#b5651d', fontFamily: 'sans-serif', letterSpacing: '0.04em' }}>
                      AI EXTRACTED — High confidence (98.2%)
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                      <thead>
                        <tr style={{ background: '#f5f5f0' }}>
                          <th style={{ padding: '6px 10px', textAlign: 'left', borderBottom: '1px solid #ddd', fontFamily: 'sans-serif', fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Subsidiary</th>
                          <th style={{ padding: '6px 10px', textAlign: 'right', borderBottom: '1px solid #ddd', fontFamily: 'sans-serif', fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>FY 2023-24 (MT)</th>
                          <th style={{ padding: '6px 10px', textAlign: 'right', borderBottom: '1px solid #ddd', fontFamily: 'sans-serif', fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>FY 2024-25 (MT)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['ECL', '110.42', '118.6'],
                          ['BCCL', '72.14', '78.8'],
                          ['CCL', '124.38', '134.1'],
                          ['NCL', '141.22', '152.7'],
                          ['WCL', '86.47', '92.3'],
                          ['SECL', '172.84', '184.2'],
                          ['MCL', '188.94', '198.4'],
                          ['SCCL (Associated Entity)', '79.42', '88.4'],
                        ].map(([name, prev, curr]) => (
                          <tr key={name} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '5px 10px' }}>{name}</td>
                            <td style={{ padding: '5px 10px', textAlign: 'right', color: '#666' }}>{prev}</td>
                            <td style={{ padding: '5px 10px', textAlign: 'right', fontWeight: 700 }}>{curr}</td>
                          </tr>
                        ))}
                        <tr style={{ background: '#f0f0f0', fontWeight: 700 }}>
                          <td style={{ padding: '6px 10px' }}>CIL Total</td>
                          <td style={{ padding: '6px 10px', textAlign: 'right' }}>997.83</td>
                          <td style={{ padding: '6px 10px', textAlign: 'right', color: '#1a3a5c' }}>1,047.52</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p style={{ fontSize: '0.75rem', lineHeight: 1.6, color: '#333', marginBottom: 8 }}>
                    Open cast production accounted for 1,015.54 MT (96.96%) while underground production was 31.98 MT (3.04%). Production growth of 4.98% was achieved over FY 2023-24.
                  </p>
                  <p style={{ fontSize: '0.6875rem', color: '#888', fontStyle: 'italic' }}>
                    Source: Annual Production Returns submitted by Subsidiaries to CIL Planning Department.
                  </p>
                </div>
                <div style={{ padding: '8px 24px', borderTop: '1px solid #eee', fontSize: '0.625rem', color: '#aaa', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Coal India Limited — Internal Document</span>
                  <span>Page 42 of 284</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DataHubPage() {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [searchQ, setSearchQ] = useState('');
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    simulateUpload();
  };

  const simulateUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    let progress = 0;
    const interval = window.setInterval(() => {
      progress += 14;
      if (progress >= 100) {
        window.clearInterval(interval);
        setUploadProgress(100);
        setTimeout(() => {
          setUploading(false);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          showToast('Document indexed successfully. OCR pipeline initiated.', 'success');
        }, 250);
      } else {
        setUploadProgress(progress);
      }
    }, 120);
  };

  const filteredDocs = documents.filter(d => {
    if (filterStatus !== 'All' && d.status !== filterStatus) return false;
    if (filterType !== 'All' && d.type !== filterType) return false;
    if (searchQ && !d.name.toLowerCase().includes(searchQ.toLowerCase()) && !d.source.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: selectedDoc ? 'hidden' : 'auto' }}>
        <div className="page-container fade-in">
          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
              Data Hub
            </h1>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Bring scattered mining records into one searchable knowledge base.
            </p>
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
              <div style={{ maxWidth: 360, margin: '0 auto' }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: 12 }}>Processing document...</div>
                <div style={{ height: 4, background: 'var(--coal-700)', borderRadius: 2, overflow: 'hidden', marginBottom: 8 }}>
                  <div style={{ height: '100%', width: `${uploadProgress}%`, background: 'var(--copper)', borderRadius: 2, transition: 'width 0.2s' }} />
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                  {uploadProgress < 40 ? 'Uploading file...' : uploadProgress < 70 ? 'Extracting text...' : uploadProgress < 90 ? 'Classifying document...' : 'Indexing...'}
                </div>
              </div>
            ) : (
              <>
                <Upload size={28} color="var(--text-muted)" style={{ marginBottom: 12 }} />
                <div style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: 6 }}>
                  Drop mining documents here
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 16 }}>
                  Supported: PDF &bull; XLSX &bull; DOCX &bull; JPG &bull; PNG
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
                    onClick={simulateUpload}
                  >
                    <Archive size={13} />
                    Import Archive
                  </button>
                </div>
                <input ref={fileInputRef} type="file" style={{ display: 'none' }} multiple onChange={simulateUpload} />
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
                  style={{ paddingLeft: 28, height: 32, width: 180, fontSize: '0.75rem' }}
                />
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.map(doc => (
                  <tr
                    key={doc.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedDoc(doc)}
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FileTypeIcon type={doc.type} />
                        <div>
                          <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)' }}>{doc.name}</div>
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
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{doc.lastUpdated}</td>
                    <td>
                      <button
                        className="btn btn-ghost"
                        style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                        onClick={e => { e.stopPropagation(); setSelectedDoc(doc); }}
                      >
                        <Eye size={12} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
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
          <DocumentDetailPanel doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
        </>
      )}
    </div>
  );
}
