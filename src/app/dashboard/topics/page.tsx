'use client';

import { useState } from 'react';
import { 
  TrendingUp, FileText, MapPin, ChevronRight, X, 
  ExternalLink, ShieldCheck, Download, Layers, Tag
} from 'lucide-react';
import { topics, wordCloudData } from '@/lib/mock-data';
import { useToast } from '@/lib/toast';
import SourceTraceabilityModal, { SourceTraceItem } from '@/components/SourceTraceabilityModal';

function WordCloud({ 
  selectedTopicId, 
  onSelect 
}: { 
  selectedTopicId: string | null;
  onSelect: (topicId: string) => void;
}) {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  return (
    <div style={{
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      padding: '24px 28px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px 16px',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 180,
      borderRadius: 2,
    }}>
      {wordCloudData.map(item => {
        const fontSize = 0.6875 + (item.weight / 100) * 1.35;
        const isHovered = hoveredWord === item.word;
        const isSelected = item.topicId === selectedTopicId;

        return (
          <span
            key={item.word}
            onClick={() => {
              if (item.topicId) {
                onSelect(item.topicId);
              }
            }}
            onMouseEnter={() => setHoveredWord(item.word)}
            onMouseLeave={() => setHoveredWord(null)}
            style={{
              fontSize: `${fontSize}rem`,
              color: isSelected ? 'var(--copper)' : isHovered ? '#fff' : item.color,
              fontWeight: item.weight > 70 ? 700 : item.weight > 50 ? 600 : 500,
              cursor: 'pointer',
              letterSpacing: item.weight > 60 ? '-0.01em' : '0.01em',
              opacity: hoveredWord && !isHovered && !isSelected ? 0.45 : 1,
              transition: 'all 0.15s',
              padding: '4px 8px',
              borderRadius: 2,
              background: isSelected ? 'rgba(181, 101, 29, 0.18)' : isHovered ? item.color + '25' : 'transparent',
              border: isSelected ? '1px solid var(--copper)' : '1px solid transparent',
              userSelect: 'none',
              textTransform: 'uppercase',
            }}
            title={`Click to view intelligence documents on ${item.word}`}
          >
            {item.word}
          </span>
        );
      })}
    </div>
  );
}

export default function TopicsPage() {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>('TOP-006'); // Default to Geology
  const [activeTraceItem, setActiveTraceItem] = useState<SourceTraceItem | null>(null);
  const { showToast } = useToast();

  const selectedTopic = topics.find(t => t.id === selectedTopicId);

  const handleOpenDocTrace = (doc: { name: string; source: string; page?: number; type?: string; row?: number }) => {
    setActiveTraceItem({
      documentName: doc.name,
      sourceAuthority: doc.source,
      page: doc.page || 24,
      sectionOrTable: doc.type ? `${doc.type} Section` : 'Technical Report Section',
      rowOrField: doc.row ? `Row ${doc.row}` : 'Verified Mining Findings',
      extractedValue: `${selectedTopic?.name || 'Mining Topic'} Verification`,
      metricLabel: `Topic Intelligence Citation · ${selectedTopic?.name}`,
      confidence: 97.6,
      snippetText: `Indexed in Topic Intelligence Knowledge Graph: ${doc.name} (${doc.source}). Pertains to category "${selectedTopic?.name}". Document verified for official CIL/CMPDI intelligence indexing.`,
      crossValidatedSources: [
        { name: 'Coal_Directory_2024_25.pdf', pageOrRow: 'General Appendix' },
      ],
      auditId: `AUD-TOP-${selectedTopic?.id || '001'}`,
    });
  };

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div className="page-container fade-in">
          
          {/* Header */}
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
              Topic Intelligence & Automated Semantic Taxonomy
            </h1>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Natural language clustering and topic distribution across 12,486 indexed mining reports, safety circulars, and geological memoirs.
            </p>
          </div>

          {/* Word Cloud Card */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Tag size={13} color="var(--copper)" />
                <span className="text-label" style={{ color: 'var(--text-primary)' }}>Automated Topic Word Cloud</span>
              </div>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                Click any keyword (e.g., GEOLOGY, SAFETY, PRODUCTION) to filter related documents
              </span>
            </div>
            
            <WordCloud 
              selectedTopicId={selectedTopicId} 
              onSelect={id => {
                setSelectedTopicId(id);
                const t = topics.find(topic => topic.id === id);
                if (t) showToast(`Loaded related documents for "${t.name}".`, 'info');
              }} 
            />
          </div>

          {/* Selected Topic Related Documents Banner (Real Demo Feature) */}
          {selectedTopic && (
            <div style={{ 
              background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 2, 
              padding: '16px 20px', marginBottom: 24 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Related Documents for: <span style={{ color: 'var(--copper)' }}>{selectedTopic.name}</span>
                    </span>
                    <span className="badge badge-verified" style={{ fontSize: '0.625rem' }}>
                      +{selectedTopic.trend}% Trend
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {selectedTopic.description} · {selectedTopic.mentions.toLocaleString('en-IN')} occurrences in {selectedTopic.documents} documents
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 6 }}>
                  {selectedTopic.mines.map(m => (
                    <span key={m} style={{ fontSize: '0.625rem', padding: '2px 8px', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 2, color: 'var(--text-muted)' }}>
                      <MapPin size={10} style={{ display: 'inline', marginRight: 3 }} />
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Documents Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {selectedTopic.relatedDocs.map((doc, idx) => (
                  <div 
                    key={idx}
                    style={{
                      background: 'var(--surface-3)',
                      border: '1px solid var(--border)',
                      borderRadius: 2,
                      padding: '12px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 12,
                      transition: 'border-color 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--copper)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 2, background: 'var(--coal-800)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                      }}>
                        <FileText size={14} color="var(--copper)" />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {doc.name}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                          {doc.source} {doc.page ? `· Page ${doc.page}` : (doc as any).row ? `· Row ${(doc as any).row}` : ''} {(doc as any).type ? `· ${(doc as any).type}` : ''}
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn btn-ghost"
                      style={{ fontSize: '0.6875rem', padding: '4px 8px', gap: 4, flexShrink: 0, color: 'var(--copper)' }}
                      onClick={() => handleOpenDocTrace(doc)}
                      title="Inspect source traceability"
                    >
                      <ShieldCheck size={12} color="var(--verified)" />
                      Trace Source
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Topic Distribution Grid */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div className="text-label" style={{ color: 'var(--text-primary)' }}>
                All Indexed Topic Domains ({topics.length} Domains)
              </div>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                Select any domain to explore domain-specific findings
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {topics.map(topic => {
                const isSelected = selectedTopicId === topic.id;
                return (
                  <div
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopicId(isSelected ? null : topic.id);
                    }}
                    style={{
                      background: isSelected ? 'rgba(181,101,29,0.08)' : 'var(--surface-2)',
                      border: `1px solid ${isSelected ? 'var(--copper)' : 'var(--border)'}`,
                      padding: '16px 18px',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      borderRadius: 2,
                    }}
                    onMouseEnter={e => {
                      if (!isSelected) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)';
                    }}
                    onMouseLeave={e => {
                      if (!isSelected) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {topic.name}
                      </div>
                      <div style={{ 
                        fontSize: '0.6875rem', fontWeight: 600, padding: '2px 6px',
                        background: 'rgba(74,124,89,0.15)', color: 'var(--verified)',
                        border: '1px solid rgba(74,124,89,0.3)', borderRadius: 2,
                        display: 'flex', alignItems: 'center', gap: 4,
                      }}>
                        <TrendingUp size={10} />
                        +{topic.trend}%
                      </div>
                    </div>
                    
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 12, minHeight: 34, lineHeight: 1.5 }}>
                      {topic.description}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 10 }}>
                      <div>
                        <div style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {topic.mentions.toLocaleString('en-IN')}
                        </div>
                        <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>
                          mentions in {topic.documents} documents
                        </div>
                      </div>
                      <ChevronRight size={15} color="var(--copper)" style={{ opacity: isSelected ? 1 : 0.4 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Side Slide Panel */}
      {selectedTopic && (
        <div style={{
          width: 380,
          background: 'var(--coal-900)',
          borderLeft: '1px solid var(--border-light)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }} className="slide-in-right">
          <div style={{ 
            padding: '16px 20px', 
            borderBottom: '1px solid var(--border)',
            background: 'var(--surface-2)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          }}>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                {selectedTopic.name}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--verified)', fontWeight: 500 }}>+{selectedTopic.trend}% trend</span>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{selectedTopic.mentions.toLocaleString('en-IN')} mentions</span>
              </div>
            </div>
            <button className="btn btn-ghost" style={{ padding: 6 }} onClick={() => setSelectedTopicId(null)}>
              <X size={14} />
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div className="text-label" style={{ marginBottom: 6 }}>Topic Description</div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {selectedTopic.description}
              </p>
            </div>

            {/* Associated Mines */}
            <div>
              <div className="text-label" style={{ marginBottom: 8 }}>Associated Mines & Blocks</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {selectedTopic.mines.map(mine => (
                  <span key={mine} style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '4px 8px', background: 'var(--surface-3)',
                    border: '1px solid var(--border)', borderRadius: 2,
                    fontSize: '0.75rem', color: 'var(--text-secondary)',
                  }}>
                    <MapPin size={11} color="var(--copper)" />
                    {mine}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Documents with Traceability */}
            <div>
              <div className="text-label" style={{ marginBottom: 8 }}>Indexed Source Documents</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {selectedTopic.relatedDocs.map((doc, i) => (
                  <div key={i} style={{
                    padding: '10px 12px', background: 'var(--surface-3)',
                    border: '1px solid var(--border)', borderRadius: 2,
                    cursor: 'pointer', transition: 'border-color 0.15s',
                  }}
                  onClick={() => handleOpenDocTrace(doc)}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--copper)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <FileText size={12} color="var(--text-muted)" />
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>{doc.name}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                        {doc.source} {doc.page ? `· Page ${doc.page}` : (doc as any).row ? `· Row ${(doc as any).row}` : ''}
                      </span>
                      <span style={{ fontSize: '0.625rem', color: 'var(--verified)', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <ShieldCheck size={10} /> Verify
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Source Traceability Modal */}
      <SourceTraceabilityModal 
        isOpen={Boolean(activeTraceItem)}
        onClose={() => setActiveTraceItem(null)}
        item={activeTraceItem}
      />

    </div>
  );
}
