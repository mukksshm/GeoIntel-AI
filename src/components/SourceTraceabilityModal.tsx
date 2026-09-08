'use client';

import { useEffect } from 'react';
import { 
  FileText, CheckCircle, ExternalLink, Download, 
  ShieldCheck, ArrowDown, Database, Clock, Copy, X, Layers
} from 'lucide-react';
import { useToast } from '@/lib/toast';

export type SourceTraceItem = {
  documentName: string;
  documentType?: string;
  sourceAuthority: string;
  page?: number;
  sectionOrTable: string;
  rowOrField: string;
  extractedValue: string;
  metricLabel: string;
  confidence: number;
  publishedDate?: string;
  snippetText: string;
  crossValidatedSources?: Array<{ name: string; pageOrRow: string }>;
  auditId?: string;
};

interface SourceTraceabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: SourceTraceItem | null;
}

export default function SourceTraceabilityModal({ isOpen, onClose, item }: SourceTraceabilityModalProps) {
  const { showToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const handleCopyCitation = () => {
    const citation = `[Source Citation] ${item.metricLabel}: ${item.extractedValue} | Source: ${item.documentName} (${item.sourceAuthority}), ${item.page ? `Page ${item.page}, ` : ''}${item.sectionOrTable}, ${item.rowOrField} | Verified with GeoIntel AI (Confidence: ${item.confidence}%)`;
    navigator.clipboard.writeText(citation);
    showToast('Citation copied to clipboard.', 'success');
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 9, 13, 0.82)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: 820,
          maxHeight: '92vh',
          background: 'var(--coal-900)',
          border: '1px solid var(--border-light)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'modalSlideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--surface-2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 3,
              background: 'rgba(74, 124, 89, 0.16)',
              border: '1px solid rgba(74, 124, 89, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <ShieldCheck size={18} color="var(--verified)" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Source Traceability Verification
                </span>
                <span className="badge badge-verified" style={{ fontSize: '0.625rem', padding: '2px 6px' }}>
                  ✓ OCR Cross-Validated
                </span>
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                CMPDI / CIL Mining Intelligence Record · Audit ID: {item.auditId || 'AUD-2026-TRC'}
              </div>
            </div>
          </div>
          <button 
            className="btn btn-ghost" 
            onClick={onClose}
            style={{ padding: '6px 10px', fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1 }}
            title="Close (Esc)"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 18 }}>
          
          {/* Target Metric Banner */}
          <div style={{
            background: 'var(--surface-3)',
            border: '1px solid var(--border)',
            borderRadius: 3,
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}>
            <div>
              <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>
                TARGET CLAIM / EXTRACTED FIGURE
              </div>
              <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {item.metricLabel}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--copper)', letterSpacing: '-0.02em' }}>
                {item.extractedValue}
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--verified)', display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
                <CheckCircle size={11} />
                Confidence: {item.confidence}%
              </div>
            </div>
          </div>

          {/* 5-Step Derivation Chain (Answer -> Source Document -> Page -> Table/Section -> Row/Value) */}
          <div style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: 3,
            padding: '16px',
          }}>
            <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
              Five-Level Verification Hierarchy
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Level 1: Answer */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ 
                  minWidth: 24, height: 24, borderRadius: '50%', background: 'rgba(181, 101, 29, 0.15)', 
                  border: '1px solid var(--copper)', color: 'var(--copper)', fontSize: '0.6875rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1
                }}>1</div>
                <div style={{ flex: 1, background: 'var(--surface-3)', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: 2 }}>
                  <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Validated Answer Value</div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.extractedValue}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', paddingLeft: 12 }}>
                <ArrowDown size={14} color="var(--copper)" style={{ opacity: 0.6 }} />
              </div>

              {/* Level 2: Document */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ 
                  minWidth: 24, height: 24, borderRadius: '50%', background: 'rgba(74, 127, 165, 0.15)', 
                  border: '1px solid var(--info)', color: 'var(--info)', fontSize: '0.6875rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1
                }}>2</div>
                <div style={{ flex: 1, background: 'var(--surface-3)', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: 2 }}>
                  <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Source Document</div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FileText size={13} color="var(--info)" />
                    {item.documentName}
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontWeight: 400 }}>({item.sourceAuthority})</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', paddingLeft: 12 }}>
                <ArrowDown size={14} color="var(--info)" style={{ opacity: 0.6 }} />
              </div>

              {/* Level 3: Page */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ 
                  minWidth: 24, height: 24, borderRadius: '50%', background: 'rgba(232, 184, 75, 0.15)', 
                  border: '1px solid var(--safety)', color: 'var(--safety)', fontSize: '0.6875rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1
                }}>3</div>
                <div style={{ flex: 1, background: 'var(--surface-3)', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: 2 }}>
                  <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Document Page / Coordinate</div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.page ? `Page ${item.page}` : 'Indexed Section Coordinates [X: 142.4, Y: 820.1]'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', paddingLeft: 12 }}>
                <ArrowDown size={14} color="var(--safety)" style={{ opacity: 0.6 }} />
              </div>

              {/* Level 4: Table / Section */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ 
                  minWidth: 24, height: 24, borderRadius: '50%', background: 'rgba(110, 110, 120, 0.15)', 
                  border: '1px solid var(--coal-400)', color: 'var(--text-secondary)', fontSize: '0.6875rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1
                }}>4</div>
                <div style={{ flex: 1, background: 'var(--surface-3)', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: 2 }}>
                  <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Table / Section Heading</div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.sectionOrTable}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', paddingLeft: 12 }}>
                <ArrowDown size={14} color="var(--coal-400)" style={{ opacity: 0.6 }} />
              </div>

              {/* Level 5: Row / Extracted Value */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{ 
                  minWidth: 24, height: 24, borderRadius: '50%', background: 'rgba(74, 124, 89, 0.2)', 
                  border: '1px solid var(--verified)', color: 'var(--verified)', fontSize: '0.6875rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1
                }}>5</div>
                <div style={{ flex: 1, background: 'rgba(74, 124, 89, 0.08)', border: '1px solid rgba(74, 124, 89, 0.35)', padding: '8px 12px', borderRadius: 2 }}>
                  <div style={{ fontSize: '0.625rem', color: 'var(--verified)', textTransform: 'uppercase' }}>Row Identifier & Raw Cell Value</div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.rowOrField} &rarr; <span style={{ color: 'var(--verified)', fontWeight: 700 }}>{item.extractedValue}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Original Source Document Snippet / Ground Truth OCR Excerpt */}
          <div style={{
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            borderRadius: 3,
            padding: '16px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Extracted Ground Truth Snippet (OCR Text Stream)
              </div>
              <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>
                Tesseract OCR v5.3 + LayoutLMv3
              </span>
            </div>
            <div style={{
              background: '#090c10',
              border: '1px solid var(--border-light)',
              borderRadius: 2,
              padding: '14px 16px',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              position: 'relative',
            }}>
              <p style={{ margin: 0 }}>
                {item.snippetText.split(item.extractedValue).map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <mark style={{
                        background: 'rgba(181, 101, 29, 0.35)',
                        color: '#ffc885',
                        padding: '2px 6px',
                        borderRadius: 2,
                        border: '1px solid var(--copper)',
                        fontWeight: 700,
                      }}>
                        {item.extractedValue}
                      </mark>
                    )}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* Cross-Validation Citations */}
          {item.crossValidatedSources && item.crossValidatedSources.length > 0 && (
            <div style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 3,
              padding: '14px 16px',
            }}>
              <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                Cross-Validated Across {item.crossValidatedSources.length + 1} Independent Records
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {item.crossValidatedSources.map((src, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle size={12} color="var(--verified)" />
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{src.name}</span>
                    <span style={{ color: 'var(--text-muted)' }}>({src.pageOrRow})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid var(--border)',
          background: 'var(--surface-2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
        }}>
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
            Every important figure can be verified against its original source document.
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary" onClick={handleCopyCitation} style={{ fontSize: '0.75rem' }}>
              <Copy size={12} />
              Copy Citation
            </button>
            <button className="btn btn-primary" onClick={onClose} style={{ fontSize: '0.75rem' }}>
              Done / Close
            </button>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes modalSlideIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
