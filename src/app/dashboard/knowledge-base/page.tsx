'use client';

import { useState } from 'react';
import { 
  ChevronRight, ChevronDown, FileText, MapPin, 
  AlertTriangle, BarChart2, Leaf, Building2, X, ExternalLink,
  ShieldCheck, Database, Layers, CheckCircle
} from 'lucide-react';
import { knowledgeGraphData } from '@/lib/mock-data';
import { useToast } from '@/lib/toast';
import SourceTraceabilityModal, { SourceTraceItem } from '@/components/SourceTraceabilityModal';

const categoryIcons: Record<string, React.ReactNode> = {
  'Production Reports': <BarChart2 size={13} color="var(--info)" />,
  'Safety Reports': <AlertTriangle size={13} color="var(--alert)" />,
  'Geological Survey': <MapPin size={13} color="var(--copper)" />,
  'Annual Reports': <FileText size={13} color="var(--text-muted)" />,
  'Environmental Records': <Leaf size={13} color="var(--verified)" />,
  'Historical Records': <FileText size={13} color="var(--coal-400)" />,
  'Mine Plan': <Building2 size={13} color="var(--coal-400)" />,
  'Safety Records': <AlertTriangle size={13} color="var(--alert)" />,
  'Fire Control Records': <AlertTriangle size={13} color="var(--alert)" />,
  'Production Records': <BarChart2 size={13} color="var(--info)" />,
  'Geological Assessment': <MapPin size={13} color="var(--copper)" />,
};

const subsidiaryColors: Record<string, string> = {
  ECL: 'var(--coal-500)',
  BCCL: 'var(--alert)',
  CCL: 'var(--copper)',
  SECL: 'var(--info)',
  NCL: 'var(--verified)',
  WCL: 'var(--coal-400)',
  MCL: 'var(--safety)',
  'SCCL (Associated Entity)': 'var(--copper-dark)',
};

function MineNode({ 
  mine, 
  isSelected, 
  onClick 
}: { 
  mine: typeof knowledgeGraphData.mines[0]; 
  isSelected: boolean; 
  onClick: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ marginBottom: 8 }}>
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px',
          background: isSelected ? 'rgba(181,101,29,0.1)' : 'var(--surface-3)',
          border: `1px solid ${isSelected ? 'var(--copper)' : 'var(--border)'}`,
          borderRadius: 2, cursor: 'pointer', transition: 'all 0.15s',
        }}
        onClick={() => { onClick(); setExpanded(!expanded || !isSelected); }}
        onMouseEnter={e => !isSelected && ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)')}
        onMouseLeave={e => !isSelected && ((e.currentTarget as HTMLElement).style.borderColor = 'var(--border)')}
      >
        {expanded && isSelected ? (
          <ChevronDown size={12} color="var(--text-muted)" />
        ) : (
          <ChevronRight size={12} color="var(--text-muted)" />
        )}
        <div style={{
          width: 22, height: 22, borderRadius: 3,
          background: subsidiaryColors[mine.subsidiary] || 'var(--copper)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.625rem', fontWeight: 700, color: '#fff', flexShrink: 0,
        }}>
          {mine.subsidiary.charAt(0)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {mine.name}
          </div>
          <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>
            {mine.subsidiary} · {mine.state}
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>{mine.production} MT</div>
          <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>{mine.type}</div>
        </div>
      </div>

      {expanded && isSelected && (
        <div style={{ paddingLeft: 28, marginTop: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {mine.children.map(child => (
            <div
              key={child}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '7px 12px',
                background: 'var(--surface-2)', border: '1px solid var(--border)',
                borderRadius: 2, cursor: 'pointer',
                fontSize: '0.75rem', color: 'var(--text-secondary)',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--surface-3)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)'}
            >
              {categoryIcons[child] || <FileText size={12} color="var(--text-muted)" />}
              <span>{child}</span>
              <ExternalLink size={10} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function KnowledgeBasePage() {
  const [selectedMine, setSelectedMine] = useState<string | null>('KORBA');
  const [activeCategory, setActiveCategory] = useState<string | null>('Geological Data');
  const [activeTraceItem, setActiveTraceItem] = useState<SourceTraceItem | null>(null);
  const { showToast } = useToast();

  const mine = knowledgeGraphData.mines.find(m => m.name === selectedMine) || knowledgeGraphData.mines[0];

  const relationshipMap = [
    { 
      key: 'Production Reports', 
      icon: <BarChart2 size={14} color="var(--info)" />, 
      desc: 'Monthly area summaries, shift performance, OMS and dispatch logs', 
      count: 48,
      sampleDoc: `${mine.name}_Production_Annual_Review_FY25.pdf`,
      extractedValue: `${mine.production} MT Raw Coal`,
    },
    { 
      key: 'Safety Reports', 
      icon: <AlertTriangle size={14} color="var(--alert)" />, 
      desc: 'DGMS circular compliance, incident registries, and occupational health reviews', 
      count: 24,
      sampleDoc: `${mine.name}_Mine_Safety_Audit_Report.pdf`,
      extractedValue: 'Zero Fatalities / DGMS Compliant',
    },
    { 
      key: 'Geological Data', 
      icon: <MapPin size={14} color="var(--copper)" />, 
      desc: 'CMPDI core logs, seam stratigraphy, reserve estimates, and geotechnical models', 
      count: 12,
      sampleDoc: `Geological_Assessment_${mine.name}_Block.pdf`,
      extractedValue: '12.84 BT In-situ Coal Resources',
    },
    { 
      key: 'Annual Reports', 
      icon: <FileText size={14} color="var(--text-muted)" />, 
      desc: 'Yearly statutory financial, operational, and environmental compilations', 
      count: 9,
      sampleDoc: `Annual_Report_${mine.subsidiary.split(' ')[0]}_2024_25.pdf`,
      extractedValue: 'Audited Operational Matrix',
    },
    { 
      key: 'Environmental Records', 
      icon: <Leaf size={14} color="var(--verified)" />, 
      desc: 'MoEFCC environmental clearances, air/water quality monitoring, and afforestation', 
      count: 18,
      sampleDoc: `${mine.name}_Environmental_Compliance_Audit.pdf`,
      extractedValue: 'CTO / CTE Clearance Active',
    },
  ];

  const handleOpenCategoryTrace = (rel: typeof relationshipMap[0]) => {
    setActiveTraceItem({
      documentName: rel.sampleDoc,
      sourceAuthority: `${mine.subsidiary} / CMPDI`,
      page: 18,
      sectionOrTable: `${rel.key} Section`,
      rowOrField: 'Knowledge Graph Node Coordinate',
      extractedValue: rel.extractedValue,
      metricLabel: `${mine.name} · ${rel.key} Intelligence Node`,
      confidence: 98.4,
      snippetText: `Knowledge Base Entity Mapping: CIL → ${mine.subsidiary} → ${mine.name} Mining Area → ${rel.key}. Node links 12,486 cross-document intelligence vectors with verified audit history.`,
      crossValidatedSources: [
        { name: 'Coal_Directory_2024_25.pdf', pageOrRow: `Mine Profile: ${mine.name}` },
      ],
      auditId: `AUD-KB-${mine.name}`,
    });
  };

  return (
    <div className="page-container fade-in">
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
          Centralised Mining Knowledge Graph & Ontology
        </h1>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
          Multi-tiered hierarchical mapping from national holding to mine-level operational and geological records.
        </p>
      </div>

      {/* SIH Hierarchy Communication Banner */}
      <div style={{
        background: 'var(--surface-2)',
        border: '1px solid var(--border)',
        borderRadius: 3,
        padding: '12px 18px',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ padding: '3px 8px', background: 'var(--coal-800)', border: '1px solid var(--border)', borderRadius: 2, fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            CIL / MoC
          </span>
          <span style={{ color: 'var(--copper)', fontSize: '0.75rem' }}>&rarr;</span>
          <span style={{ padding: '3px 8px', background: 'rgba(74, 127, 165, 0.12)', border: '1px solid rgba(74, 127, 165, 0.3)', borderRadius: 2, fontSize: '0.6875rem', fontWeight: 600, color: 'var(--info)' }}>
            {mine.subsidiary}
          </span>
          <span style={{ color: 'var(--copper)', fontSize: '0.75rem' }}>&rarr;</span>
          <span style={{ padding: '3px 8px', background: 'rgba(232, 184, 75, 0.12)', border: '1px solid rgba(232, 184, 75, 0.3)', borderRadius: 2, fontSize: '0.6875rem', fontWeight: 600, color: 'var(--safety)' }}>
            {mine.name} Area
          </span>
          <span style={{ color: 'var(--copper)', fontSize: '0.75rem' }}>&rarr;</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ padding: '2px 6px', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 2, fontSize: '0.625rem', color: 'var(--text-secondary)' }}>
              Production Reports
            </span>
            <span style={{ padding: '2px 6px', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 2, fontSize: '0.625rem', color: 'var(--copper)' }}>
              Geological Reports
            </span>
            <span style={{ padding: '2px 6px', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 2, fontSize: '0.625rem', color: 'var(--alert)' }}>
              Safety Reports
            </span>
          </div>
        </div>

        <span style={{ fontSize: '0.6875rem', color: 'var(--verified)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <CheckCircle size={11} /> 100% Entity Traceability
        </span>
      </div>

      {/* Stats Strip */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 20, border: '1px solid var(--border)', background: 'var(--surface-2)', overflow: 'hidden', borderRadius: 2 }}>
        {[
          { label: 'Active Mine Nodes', value: `${knowledgeGraphData.mines.length} Complex Nodes` },
          { label: 'Entity Relationships', value: '3,842 Triples' },
          { label: 'Knowledge Graph Nodes', value: '18,740 Linked Vertices' },
          { label: 'Cross-Document Citations', value: '42,180 Cross-links' },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, padding: '14px 20px', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
            <div className="text-label" style={{ marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 20 }}>
        
        {/* Mine Nodes List */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 2 }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Mine & Area Entities</div>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Click to view details</span>
          </div>
          <div style={{ padding: '12px' }}>
            {knowledgeGraphData.mines.map(m => (
              <MineNode
                key={m.name}
                mine={m}
                isSelected={selectedMine === m.name}
                onClick={() => {
                  setSelectedMine(m.name);
                  showToast(`Selected ${m.name} knowledge cluster.`, 'info');
                }}
              />
            ))}
          </div>
        </div>

        {/* Selected Mine Detail & Relationship Mapping */}
        {mine && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} className="fade-in">
            
            {/* Overview Card */}
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: '18px 22px', borderRadius: 2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                    {mine.name} MINING COMPLEX
                  </div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--copper)', fontWeight: 600 }}>{mine.subsidiary}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{mine.state}</span>
                    <span style={{ fontSize: '0.6875rem', padding: '2px 8px', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 2, color: 'var(--text-secondary)' }}>
                      {mine.type}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="text-label">Indexed Documents</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--copper)' }}>{mine.documents}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {[
                  { label: 'Annual Production FY25', value: `${mine.production} MT` },
                  { label: 'Mining Methodology', value: mine.type },
                  { label: 'Controlling Authority', value: mine.subsidiary },
                ].map((item, i) => (
                  <div key={i} style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: 2 }}>
                    <div className="text-label" style={{ marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Knowledge Relationships List (Clickable and Traceable) */}
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 2 }}>
              <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Connected Intelligence Domains for {mine.name}
                </div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                  Click domain to verify ground truth evidence
                </span>
              </div>
              
              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {relationshipMap.map((rel, i) => {
                  const isCatActive = activeCategory === rel.key;
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 14,
                        padding: '12px 16px',
                        background: isCatActive ? 'rgba(181, 101, 29, 0.06)' : 'var(--surface-3)', 
                        border: `1px solid ${isCatActive ? 'var(--copper)' : 'var(--border)'}`,
                        borderRadius: 2, cursor: 'pointer', transition: 'all 0.15s',
                      }}
                      onClick={() => {
                        setActiveCategory(rel.key);
                        handleOpenCategoryTrace(rel);
                      }}
                      onMouseEnter={e => { if (!isCatActive) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)'; }}
                      onMouseLeave={e => { if (!isCatActive) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
                    >
                      <div style={{ 
                        width: 32, height: 32, background: 'var(--coal-700)', borderRadius: 3,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        {rel.icon}
                      </div>
                      
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{rel.key}</span>
                          <span style={{ fontSize: '0.6875rem', color: 'var(--copper)' }}>· {rel.sampleDoc}</span>
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{rel.desc}</div>
                      </div>
                      
                      <div style={{ textAlign: 'right', marginRight: 8 }}>
                        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{rel.count}</div>
                        <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>records</div>
                      </div>

                      <button
                        className="btn btn-ghost"
                        style={{ fontSize: '0.6875rem', padding: '4px 8px', color: 'var(--verified)', gap: 4 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenCategoryTrace(rel);
                        }}
                        title="Inspect source traceability"
                      >
                        <ShieldCheck size={12} /> Trace
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Document Tree */}
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: '16px 18px', borderRadius: 2 }}>
              <div className="text-label" style={{ marginBottom: 12 }}>Hierarchical File & Document Tree</div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <div style={{ color: 'var(--copper)', fontWeight: 700 }}>
                  [Holding] Coal India Limited &rarr; [Subsidiary] {mine.subsidiary}
                </div>
                <div style={{ paddingLeft: 16, color: 'var(--text-primary)', fontWeight: 600 }}>
                  └── [Mine / Area] {mine.name}
                </div>
                {mine.children.map((child, i) => (
                  <div 
                    key={i} 
                    style={{ paddingLeft: 36, color: 'var(--info)', cursor: 'pointer' }}
                    onClick={() => {
                      const rel = relationshipMap.find(r => r.key.includes(child.split(' ')[0]) || child.includes(r.key.split(' ')[0]));
                      if (rel) handleOpenCategoryTrace(rel);
                    }}
                  >
                    {i === mine.children.length - 1 ? '└── ' : '├── '}
                    <span>{child} (Audited & Indexed)</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Source Traceability Modal */}
      <SourceTraceabilityModal 
        isOpen={Boolean(activeTraceItem)}
        onClose={() => setActiveTraceItem(null)}
        item={activeTraceItem}
      />

    </div>
  );
}
