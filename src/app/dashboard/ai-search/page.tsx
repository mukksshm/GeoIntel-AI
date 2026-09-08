'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, ChevronRight, ExternalLink, CheckCircle, ArrowRight, 
  TrendingUp, FileText, Download, ShieldCheck, RefreshCw, X, Copy
} from 'lucide-react';
import { searchResponses, SearchResponse } from '@/lib/mock-data';
import { useToast } from '@/lib/toast';
import { exportToPdf, exportToDocx } from '@/lib/export-utils';
import SourceTraceabilityModal, { SourceTraceItem } from '@/components/SourceTraceabilityModal';

const canonicalQueries = [
  { 
    id: 1, 
    label: 'Compare coal production between FY 2023-24 and FY 2024-25.', 
    key: 'default',
    tag: 'Production Comparison'
  },
  { 
    id: 2, 
    label: 'What geological information is available for Korba?', 
    key: 'geological',
    tag: 'Geological Intelligence'
  },
  { 
    id: 3, 
    label: 'Show coal production data for Jharkhand in 2024.', 
    key: 'jharkhand',
    tag: 'State Analytics'
  },
  { 
    id: 4, 
    label: 'Summarize safety-related findings from the latest reports.', 
    key: 'safety',
    tag: 'Safety Compliance'
  },
  { 
    id: 5, 
    label: 'Prepare a response for a parliamentary query on coal production.', 
    key: 'parliamentary',
    tag: 'Parliamentary Query'
  },
];

export default function AISearchPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadStep, setLoadStep] = useState(0);
  const [result, setResult] = useState<SearchResponse | null>(null);
  const [expandedEvidence, setExpandedEvidence] = useState(true);
  const [activeTraceItem, setActiveTraceItem] = useState<SourceTraceItem | null>(null);
  const { showToast } = useToast();

  const loadSteps = [
    'Understanding query semantics and extracting coal sector entities...',
    'Searching across 12,486 indexed documents and geological memoirs...',
    'Retrieving evidence from Annual Reports, Coal Directories and Master Sheets...',
    'Cross-validating data points across 3 independent official sources...',
    'Synthesizing verified answer with source traceability citations...',
  ];

  const handleExportPdf = () => {
    if (!result) return;
    const filename = `AI_Mining_Intelligence_${new Date().toISOString().slice(0, 10)}`;
    exportToPdf(
      filename,
      'MINING INTELLIGENCE RESEARCH DOSSIER',
      `Query: "${result.query}" · Cross-Validated Across 3 Sources`,
      [
        {
          heading: '1. Executive Intelligence Answer',
          content: result.answer,
        },
        {
          heading: '2. Key Quantitative Extraction',
          content: `${result.insight.label}: ${result.insight.value} ${result.insight.change || ''}`,
        },
        {
          heading: '3. Derivation Chain & Validation Sequence',
          bulletPoints: result.derivation,
        },
        {
          heading: '4. Source Evidence & Traceability',
          table: {
            headers: ['Document Name', 'Location / Coordinates', 'Status'],
            rows: result.sources.map(s => [
              s.name,
              s.page ? `Page ${s.page}` : s.sheet ? `Sheet: ${s.sheet}, Row: ${s.row}` : 'Verified',
              'Audited & Verified'
            ]),
          },
        },
        {
          heading: '5. Ground Truth Source Citation',
          content: result.traceItem ? 
            `${result.traceItem.metricLabel}: ${result.traceItem.extractedValue} | Source: ${result.traceItem.documentName}, ${result.traceItem.page ? `Page ${result.traceItem.page}, ` : ''}${result.traceItem.sectionOrTable}` :
            'Audited against CIL National Master Repository.',
        }
      ]
    );
  };

  const handleExportDocx = () => {
    if (!result) return;
    const filename = `AI_Mining_Intelligence_${new Date().toISOString().slice(0, 10)}`;
    exportToDocx(
      filename,
      'MINING INTELLIGENCE RESEARCH DOSSIER',
      `Query: "${result.query}" · Cross-Validated Across 3 Sources`,
      [
        {
          heading: '1. Executive Intelligence Answer',
          content: result.answer,
        },
        {
          heading: '2. Key Quantitative Extraction',
          content: `${result.insight.label}: ${result.insight.value} ${result.insight.change || ''}`,
        },
        {
          heading: '3. Derivation Chain & Validation Sequence',
          bulletPoints: result.derivation,
        },
        {
          heading: '4. Source Evidence & Traceability',
          table: {
            headers: ['Document Name', 'Location / Coordinates', 'Status'],
            rows: result.sources.map(s => [
              s.name,
              s.page ? `Page ${s.page}` : s.sheet ? `Sheet: ${s.sheet}, Row: ${s.row}` : 'Verified',
              'Audited & Verified'
            ]),
          },
        },
      ]
    );
  };

  const handleSearch = async (q?: string) => {
    const searchQuery = q !== undefined ? q : query;
    if (!searchQuery.trim()) {
      showToast('Please enter a research query.', 'info');
      return;
    }
    setQuery(searchQuery);
    setResult(null);
    setLoading(true);
    setLoadStep(0);

    for (let i = 0; i < loadSteps.length; i++) {
      setLoadStep(i);
      await new Promise(r => setTimeout(r, 400));
    }

    // Match query to response
    const qLower = searchQuery.toLowerCase();
    let key = 'default';
    if (qLower.includes('geological') || qLower.includes('geology') || qLower.includes('korba') || qLower.includes('seam') || qLower.includes('reserve')) {
      key = 'geological';
    } else if (qLower.includes('parliamentary') || qLower.includes('parliament') || qLower.includes('lok sabha') || qLower.includes('rajya') || qLower.includes('query response') || qLower.includes('question')) {
      key = 'parliamentary';
    } else if (qLower.includes('jharkhand') || qLower.includes('bccl') || qLower.includes('ccl') || qLower.includes('dhanbad') || qLower.includes('bokaro')) {
      key = 'jharkhand';
    } else if (qLower.includes('safety') || qLower.includes('incident') || qLower.includes('fatal') || qLower.includes('accident') || qLower.includes('dgms')) {
      key = 'safety';
    } else if (qLower.includes('barkakana')) {
      key = 'barkakana';
    } else if (qLower.includes('subsidi') || qLower.includes('ecl') || qLower.includes('mcl') || qLower.includes('secl') || qLower.includes('ncl') || qLower.includes('wcl')) {
      key = 'subsidiaries';
    } else if (qLower.includes('underground') || qLower.includes('open') || qLower.includes('cast') || qLower.includes('method')) {
      key = 'underground';
    } else {
      const matched = Object.keys(searchResponses).find(k => {
        const r = searchResponses[k];
        return r.query.toLowerCase().includes(qLower.slice(0, 15)) || qLower.includes(k);
      });
      if (matched) key = matched;
    }

    setResult({ ...searchResponses[key], query: searchQuery });
    setLoading(false);
  };

  const handleClear = () => {
    setQuery('');
    setResult(null);
  };

  const handleOpenSourceForCard = (src: { id: number; name: string; page?: number; sheet?: string; row?: number }) => {
    if (result?.traceItem) {
      setActiveTraceItem(result.traceItem);
    } else {
      setActiveTraceItem({
        documentName: src.name,
        sourceAuthority: 'Coal India Limited / CMPDI',
        page: src.page || 42,
        sectionOrTable: src.sheet ? `Worksheet: ${src.sheet}` : 'Statistical Section 6',
        rowOrField: src.row ? `Row ${src.row}` : 'Production Summary Line',
        extractedValue: result?.insight.value || '1,047.52 MT',
        metricLabel: result?.insight.label || 'Extracted Mining Figure',
        confidence: 98.4,
        snippetText: result?.answer || 'Verified against master document repository.',
        crossValidatedSources: [
          { name: 'Coal_Directory_2024_25.pdf', pageOrRow: 'Page 42' },
          { name: 'Annual_Report_MCL_2024_25.pdf', pageOrRow: 'Page 22' },
        ],
        auditId: 'AUD-SRC-VAL',
      });
    }
  };

  return (
    <div className="page-container fade-in">
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
          AI Mining Intelligence Research Tool
        </h1>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
          Direct semantic search across 12,486 indexed CMPDI/CIL records with verified cross-document derivation chains.
        </p>
      </div>

      {/* Main Search Interface */}
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        
        {/* Search Bar */}
        <div style={{
          background: 'var(--surface-2)',
          border: '1px solid var(--border-light)',
          borderRadius: 3,
          padding: 4,
          marginBottom: 16,
          display: 'flex',
          gap: 6,
          alignItems: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
        }}>
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={16} style={{ position: 'absolute', left: 14, color: 'var(--copper)' }} />
            <input
              className="input-field"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              placeholder="Ask any mining, production, geological, or parliamentary question..."
              style={{ 
                paddingLeft: 42, paddingRight: query ? 36 : 14, height: 46, fontSize: '0.9375rem',
                background: 'transparent', border: 'none',
              }}
            />
            {query && (
              <button 
                onClick={handleClear}
                style={{ 
                  position: 'absolute', right: 10, background: 'transparent', border: 'none', 
                  color: 'var(--text-muted)', cursor: 'pointer', padding: 4 
                }}
                title="Clear query"
              >
                <X size={14} />
              </button>
            )}
          </div>
          
          <button
            className="btn btn-primary"
            onClick={() => handleSearch()}
            disabled={loading}
            style={{ height: 46, padding: '0 24px', borderRadius: 2, fontSize: '0.875rem' }}
          >
            {loading ? (
              <span style={{ 
                width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', 
                borderTopColor: '#fff', borderRadius: '50%',
                animation: 'spin 0.8s linear infinite', display: 'inline-block'
              }} />
            ) : (
              <>
                Research Query <ChevronRight size={14} />
              </>
            )}
          </button>
        </div>

        {/* Canonical Example Queries (All 5 explicitly listed) */}
        {!result && !loading && (
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 3, padding: '18px 20px', marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div className="text-label" style={{ color: 'var(--text-primary)' }}>
                SIH Problem Statement 26023 — Canonical Demo Queries
              </div>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                Click any query to execute full multi-document verification
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {canonicalQueries.map(cq => (
                <div
                  key={cq.id}
                  onClick={() => handleSearch(cq.label)}
                  style={{
                    background: 'var(--surface-3)',
                    border: '1px solid var(--border)',
                    padding: '10px 14px',
                    borderRadius: 2,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--copper)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(181, 101, 29, 0.05)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.background = 'var(--surface-3)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ 
                      fontSize: '0.6875rem', fontWeight: 700, color: 'var(--copper)', 
                      width: 20, height: 20, borderRadius: '50%', background: 'rgba(181,101,29,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {cq.id}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{cq.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ 
                      fontSize: '0.625rem', padding: '2px 8px', background: 'var(--coal-800)', 
                      border: '1px solid var(--border)', borderRadius: 2, color: 'var(--text-muted)'
                    }}>
                      {cq.tag}
                    </span>
                    <ChevronRight size={14} color="var(--copper)" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Loading & Extraction State */}
        {loading && (
          <div style={{ 
            background: 'var(--surface-2)', border: '1px solid var(--border)',
            borderRadius: 3, padding: '24px 28px', marginTop: 16,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div className="text-label" style={{ color: 'var(--copper)' }}>
                Multi-Document Intelligence Processing
              </div>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                Step {loadStep + 1} of {loadSteps.length}
              </span>
            </div>

            {loadSteps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                {i < loadStep ? (
                  <CheckCircle size={15} color="var(--verified)" style={{ flexShrink: 0 }} />
                ) : i === loadStep ? (
                  <span style={{ 
                    width: 15, height: 15, border: '2px solid rgba(181,101,29,0.3)', 
                    borderTopColor: 'var(--copper)', borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite', display: 'inline-block',
                    flexShrink: 0,
                  }} />
                ) : (
                  <div style={{ width: 15, height: 15, border: '1.5px solid var(--border)', borderRadius: '50%', flexShrink: 0 }} />
                )}
                <span style={{ 
                  fontSize: '0.8125rem', 
                  color: i <= loadStep ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontWeight: i === loadStep ? 600 : 400
                }}>{step}</span>
              </div>
            ))}
          </div>
        )}

        {/* Search Results Workspace */}
        {result && !loading && (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
            
            {/* Query Header Strip */}
            <div style={{ 
              borderLeft: '3px solid var(--copper)', 
              paddingLeft: 14, paddingTop: 4, paddingBottom: 4,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div>
                <div className="text-label" style={{ marginBottom: 2 }}>Audited Search Query</div>
                <div style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                  "{result.query}"
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span className="badge badge-verified" style={{ fontSize: '0.6875rem', padding: '3px 8px' }}>
                  ✓ Cross-Validated (3 Sources)
                </span>
              </div>
            </div>

            {/* Answer Box */}
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ShieldCheck size={15} color="var(--verified)" />
                  <span className="text-label" style={{ color: 'var(--text-primary)' }}>Validated Intelligence Synthesis</span>
                </div>
                
                {result.traceItem && (
                  <button
                    className="btn btn-ghost"
                    style={{ fontSize: '0.75rem', color: 'var(--copper)', padding: '2px 8px', gap: 4 }}
                    onClick={() => setActiveTraceItem(result.traceItem!)}
                    title="Open 5-level source verification trace"
                  >
                    <ShieldCheck size={12} color="var(--copper)" />
                    Inspect Source Traceability
                  </button>
                )}
              </div>

              <div style={{ padding: 20 }}>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', lineHeight: 1.75, marginBottom: 16 }}>
                  {result.answer}
                </p>

                {/* Key Extracted Insight Card */}
                <div style={{ 
                  background: 'rgba(74,127,165,0.08)', border: '1px solid rgba(74,127,165,0.25)',
                  borderRadius: 2, padding: '14px 18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: 16,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 3, background: 'rgba(74,127,165,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <TrendingUp size={18} color="var(--info)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginBottom: 2 }}>
                        {result.insight.label}
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--info)' }}>
                        {result.insight.value}
                      </div>
                      {result.insight.change && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          {result.insight.change}
                        </div>
                      )}
                    </div>
                  </div>

                  {result.traceItem && (
                    <button 
                      className="btn btn-secondary"
                      style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                      onClick={() => setActiveTraceItem(result.traceItem!)}
                    >
                      <ShieldCheck size={12} color="var(--verified)" />
                      Verify Figure (Level 1–5)
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Source Evidence List (Cross-Validated 3 Sources) */}
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 3, overflow: 'hidden' }}>
              <div 
                style={{ 
                  padding: '12px 18px', borderBottom: '1px solid var(--border)', 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                  cursor: 'pointer' 
                }}
                onClick={() => setExpandedEvidence(!expandedEvidence)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FileText size={14} color="var(--copper)" />
                  <span className="text-label" style={{ color: 'var(--text-primary)' }}>
                    Cross-Validated Across {result.sources.length} Independent Official Sources
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Click to view source coordinate</span>
                  <ChevronRight size={14} style={{ color: 'var(--text-muted)', transform: expandedEvidence ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                </div>
              </div>

              {expandedEvidence && (
                <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {result.sources.map(src => (
                    <div 
                      key={src.id} 
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '10px 14px',
                        background: 'var(--surface-3)',
                        border: '1px solid var(--border)',
                        borderRadius: 2,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                      onClick={() => handleOpenSourceForCard(src)}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--copper)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
                    >
                      <span style={{ 
                        width: 24, height: 24, background: 'var(--coal-700)', 
                        borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.6875rem', fontWeight: 700, color: 'var(--copper)', flexShrink: 0,
                      }}>
                        {String(src.id).padStart(2, '0')}
                      </span>
                      <FileText size={14} color="var(--text-muted)" />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                          {src.name}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                          {src.page ? `Page ${src.page}` : ''}
                          {src.sheet ? ` Sheet: ${src.sheet}` : ''}
                          {src.row ? ` · Row: ${src.row}` : ''}
                          <span style={{ color: 'var(--verified)', marginLeft: 8 }}>✓ Audited</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.6875rem', color: 'var(--copper)' }}>
                        <span>View Source</span>
                        <ExternalLink size={12} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Derivation Reasoning Chain */}
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--border)' }}>
                <div className="text-label">Derivation Chain & Reasoning Sequence</div>
              </div>
              <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap' }}>
                {result.derivation.map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 6 }}>
                    <div style={{ 
                      padding: '6px 12px', 
                      background: i === result.derivation.length - 1 ? 'rgba(74,124,89,0.12)' : 'var(--surface-3)',
                      border: `1px solid ${i === result.derivation.length - 1 ? 'rgba(74,124,89,0.3)' : 'var(--border)'}`,
                      borderRadius: 2,
                      fontSize: '0.75rem',
                      color: i === result.derivation.length - 1 ? 'var(--verified)' : 'var(--text-secondary)',
                      fontWeight: i === result.derivation.length - 1 ? 600 : 400,
                    }}>
                      {step}
                    </div>
                    {i < result.derivation.length - 1 && (
                      <ArrowRight size={14} color="var(--text-muted)" style={{ margin: '0 6px' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href={`/dashboard/report-studio`} className="btn btn-primary">
                <FileText size={13} />
                Generate Formal Report
              </Link>
              
              {result.query.toLowerCase().includes('parliament') && (
                <Link href={`/dashboard/report-studio`} className="btn btn-secondary" style={{ borderColor: 'var(--copper)', color: 'var(--copper)' }}>
                  Draft Parliamentary Response (Lok Sabha)
                </Link>
              )}

              <button className="btn btn-secondary" onClick={handleExportPdf} title="Download dossier as PDF">
                <Download size={13} />
                Export PDF
              </button>
              <button className="btn btn-secondary" onClick={handleExportDocx} title="Download dossier as Word (.doc)">
                <Download size={13} />
                Export Word
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  navigator.clipboard.writeText(result.answer);
                  showToast('Answer copied to clipboard.', 'info');
                }}
              >
                <Copy size={13} />
                Copy Answer
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={handleClear}
                style={{ marginLeft: 'auto' }}
              >
                <RefreshCw size={13} />
                New Query
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Hero Source Traceability Modal */}
      <SourceTraceabilityModal 
        isOpen={Boolean(activeTraceItem)}
        onClose={() => setActiveTraceItem(null)}
        item={activeTraceItem}
      />

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
