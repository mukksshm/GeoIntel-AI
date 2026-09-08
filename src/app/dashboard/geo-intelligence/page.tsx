'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  MapPin, FileText, ChevronRight, ExternalLink,
  Layers, Search, Filter, CheckCircle, AlertCircle, ShieldCheck, Download
} from 'lucide-react';
import {
  geoBlocks, geoRegions, totalGeologicalResources, GeoBlock, documents
} from '@/lib/mock-data';
import { useToast } from '@/lib/toast';
import { exportToPdf, exportToCsv } from '@/lib/export-utils';
import SourceTraceabilityModal, { SourceTraceItem } from '@/components/SourceTraceabilityModal';

const statusConfig = {
  'Explored': { cls: 'badge-verified', color: 'var(--verified)' },
  'Partially Explored': { cls: 'badge-review', color: 'var(--safety)' },
  'Under Exploration': { cls: 'badge-processing', color: 'var(--info)' },
};

function GeoDetailPanel({ 
  block, 
  onClose,
  onOpenSourceTrace
}: { 
  block: GeoBlock; 
  onClose: () => void;
  onOpenSourceTrace: (trace: SourceTraceItem) => void;
}) {
  const { showToast } = useToast();

  const handleExportPdf = () => {
    exportToPdf(
      `Geological_Assessment_${block.name.replace(/\s+/g, '_')}`,
      `GEOLOGICAL ASSESSMENT: ${block.name.toUpperCase()}`,
      `Subsidiary: ${block.subsidiary} · State: ${block.state} · Coalfield: ${block.coalfield} | ${block.period}`,
      [
        {
          heading: '1. Exploration & Resource Summary',
          table: {
            headers: ['Parameter', 'Assessment Value'],
            rows: [
              ['Total Geological Resources', `${block.resources} Billion Tonnes`],
              ['Proved Reserves', `${block.provedResources} Billion Tonnes`],
              ['Indicated Reserves', `${block.indicatedResources} Billion Tonnes`],
              ['Inferred Reserves', `${block.inferredResources} Billion Tonnes`],
              ['Geological Formation', block.formation],
              ['Exploration Status', block.status],
              ['Major Seams Identified', `${block.seams} Seams`],
              ['Primary Seam Thickness', block.primarySeamThickness],
              ['Predominant Coal Grade', block.coalGrade],
              ['Extraction Method', block.miningType],
              ['District / Regional Field', `${block.district}, ${block.state}`],
              ['Borehole Drilling Density', `${block.explorationBoreholes} CMPDI Boreholes`],
              ['Exploration Area Covered', `${block.areaCovered} sq km`],
            ],
          },
        },
        {
          heading: '2. Seam Stratigraphy & Characteristics',
          table: {
            headers: ['Seam Name', 'Thickness', 'Depth', 'Grade', 'Ash %', 'Moisture %'],
            rows: block.seamStratigraphy.map(s => [
              s.name, s.thickness, s.depth, s.coalGrade, s.ashContent, s.moisture
            ]),
          },
        },
        {
          heading: '3. Field Notes & Stratigraphic Analysis',
          content: block.notes,
        },
        {
          heading: '4. Source Traceability Reference',
          content: `Primary Citation: ${block.sourceTrace.documentName} (${block.sourceTrace.sourceAuthority}), Page ${block.sourceTrace.page}. ${block.sourceTrace.sectionOrTable}. Audit ID: ${block.sourceTrace.auditId || 'AUD-GEO'}.`,
        }
      ]
    );
  };

  const handleExportCsv = () => {
    const headers = ['Seam Name', 'Thickness', 'Depth', 'Grade', 'Ash Content', 'Moisture', 'Exploration Status'];
    const rows = block.seamStratigraphy.map(s => [
      s.name, s.thickness, s.depth, s.coalGrade, s.ashContent, s.moisture, s.explored ? 'Explored' : 'Partially Explored'
    ]);
    exportToCsv(`Seam_Stratigraphy_${block.name.replace(/\s+/g, '_')}`, headers, rows);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, right: 0, bottom: 0, width: 720,
      background: 'var(--coal-900)', borderLeft: '1px solid var(--border-light)',
      zIndex: 300, display: 'flex', flexDirection: 'column',
      boxShadow: '-8px 0 40px rgba(0,0,0,0.5)',
      overscrollBehavior: 'contain',
    }} className="slide-in-right">
      {/* Header */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <MapPin size={15} color="var(--copper)" />
              <span style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--text-primary)' }}>{block.name}</span>
              <span className={`badge ${statusConfig[block.status].cls}`}>{block.status}</span>
              <span className="badge badge-processing" style={{ fontSize: '0.625rem' }}>{block.period}</span>
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              {[
                { l: 'ID', v: block.id },
                { l: 'Subsidiary', v: block.subsidiary },
                { l: 'State', v: block.state },
                { l: 'District', v: block.district },
                { l: 'Area', v: block.mineArea },
              ].map(m => (
                <span key={m.l} style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.625rem' }}>{m.l}: </span>
                  <strong style={{ color: 'var(--text-secondary)' }}>{m.v}</strong>
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button 
              className="btn btn-primary" 
              style={{ fontSize: '0.75rem', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6 }}
              onClick={() => onOpenSourceTrace(block.sourceTrace)}
              title="Open 5-level source verification modal"
            >
              <ShieldCheck size={13} />
              Verify Source Trace
            </button>
            <button className="btn btn-ghost" style={{ padding: '6px 10px', fontSize: '1rem' }} onClick={onClose} title="Close panel">✕</button>
          </div>
        </div>
      </div>

      <div style={{ 
        flex: 1, 
        overflowY: 'auto', 
        overscrollBehavior: 'contain',
        padding: 20, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 16 
      }}>
        
        {/* Key Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 2, overflow: 'hidden' }}>
          {[
            { label: 'Total Geological Resources', value: `${block.resources} BT`, sub: 'In-situ reserves' },
            { label: 'Proved Resources', value: `${block.provedResources} BT`, sub: 'Highest confidence' },
            { label: 'Indicated + Inferred', value: `${(block.indicatedResources + block.inferredResources).toFixed(2)} BT`, sub: 'Exploration target' },
            { label: 'Identified Coal Seams', value: `${block.seams} Seams`, sub: `Thickest: ${block.primarySeamThickness}` },
            { label: 'Boreholes Drilled', value: block.explorationBoreholes.toLocaleString('en-IN'), sub: 'CMPDI core logs' },
            { label: 'Exploration Area', value: `${block.areaCovered.toLocaleString('en-IN')} km²`, sub: `Last Survey: ${block.lastSurvey}` },
          ].map((m, i) => (
            <div key={i} style={{ background: 'var(--surface-2)', padding: '12px 14px' }}>
              <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 1 }}>{m.value}</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Geological Formation & Stratigraphy */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: '14px 16px', borderRadius: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div className="text-label">Geological Formation & Stratigraphic Context</div>
            <span style={{ fontSize: '0.6875rem', color: 'var(--copper)', fontWeight: 600 }}>{block.formation}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 12 }}>
            {[
              { label: 'Coalfield', value: block.coalfield },
              { label: 'Predominant Grade', value: block.coalGrade },
              { label: 'Extraction Mode', value: block.miningType },
              { label: 'Borehole Spacing', value: '~400 m Grid' },
            ].map((p, i) => (
              <div key={i} style={{ background: 'var(--surface-3)', padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 2 }}>
                <div style={{ fontSize: '0.5625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{p.label}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>{p.value}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '10px 12px', background: 'rgba(74,127,165,0.06)', border: '1px solid rgba(74,127,165,0.2)', borderRadius: 2 }}>
            <div style={{ fontSize: '0.625rem', color: 'var(--info)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>CMPDI Field Memoir Notes</div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{block.notes}</p>
          </div>
        </div>

        {/* Coal Seam Stratigraphy Table */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', overflow: 'hidden', borderRadius: 2 }}>
          <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="text-label">Correlated Seam Stratigraphy</div>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{block.seamStratigraphy.length} active seams logged</span>
          </div>
          <div style={{ width: '100%', overflow: 'visible' }}>
            <table className="data-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Seam Identifier</th>
                  <th>Thickness (m)</th>
                  <th>Depth (m)</th>
                  <th>Grade</th>
                  <th>Ash %</th>
                  <th>Moisture %</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {block.seamStratigraphy.map(seam => (
                  <tr key={seam.name}>
                    <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{seam.name}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{seam.thickness}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{seam.depth}</td>
                    <td>
                      <span style={{ padding: '2px 6px', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 2, fontSize: '0.6875rem', color: 'var(--copper)' }}>
                        {seam.coalGrade}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{seam.ashContent}</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{seam.moisture}</td>
                    <td>
                      {seam.explored ? (
                        <span className="badge badge-verified" style={{ fontSize: '0.625rem' }}>
                          <CheckCircle size={9} /> Explored
                        </span>
                      ) : (
                        <span className="badge badge-review" style={{ fontSize: '0.625rem' }}>Partial</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Source Traceability Card (Hero Feature) */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={14} color="var(--verified)" />
              <span className="text-label" style={{ color: 'var(--text-primary)' }}>Source Document & Traceability Chain</span>
            </div>
            <span className="badge badge-verified" style={{ fontSize: '0.625rem' }}>
              ✓ Confidence {block.sourceTrace.confidence}%
            </span>
          </div>

          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* 4-Step Chain */}
            <div style={{ background: 'var(--surface-3)', border: '1px solid var(--border)', padding: '12px 14px', borderRadius: 2, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--text-muted)', minWidth: 90, textTransform: 'uppercase', fontSize: '0.625rem' }}>Document:</span>
                <strong style={{ color: 'var(--text-primary)' }}>{block.sourceTrace.documentName}</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.6875rem' }}>({block.sourceTrace.sourceAuthority})</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--text-muted)', minWidth: 90, textTransform: 'uppercase', fontSize: '0.625rem' }}>Page:</span>
                <span style={{ color: 'var(--copper)', fontWeight: 600 }}>Page {block.sourceTrace.page}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--text-muted)', minWidth: 90, textTransform: 'uppercase', fontSize: '0.625rem' }}>Section/Table:</span>
                <span style={{ color: 'var(--text-secondary)' }}>{block.sourceTrace.sectionOrTable}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--text-muted)', minWidth: 90, textTransform: 'uppercase', fontSize: '0.625rem' }}>Extracted Value:</span>
                <span style={{ color: 'var(--verified)', fontWeight: 700 }}>{block.sourceTrace.extractedValue}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.6875rem' }}>({block.sourceTrace.metricLabel})</span>
              </div>
            </div>

            <button 
              className="btn btn-primary" 
              onClick={() => onOpenSourceTrace(block.sourceTrace)}
              style={{ width: '100%', justifyContent: 'center', padding: '10px 16px', fontSize: '0.8125rem', gap: 8 }}
            >
              <ShieldCheck size={14} />
              Open 5-Level Source Traceability Modal
            </button>
          </div>
        </div>

        {/* Bottom scroll padding so card is never cut off */}
        <div style={{ height: 16 }} />

      </div>

      {/* Sticky Bottom Action Bar — Always 100% visible and clickable */}
      <div style={{ 
        padding: '12px 20px', 
        borderTop: '1px solid var(--border)', 
        background: 'var(--surface-2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        flexShrink: 0
      }}>
        <button 
          className="btn btn-primary" 
          onClick={() => onOpenSourceTrace(block.sourceTrace)}
          style={{ flex: 1, justifyContent: 'center', height: 38, fontSize: '0.8125rem', gap: 8 }}
          title="Open full 5-level source verification and OCR preview"
        >
          <ShieldCheck size={15} />
          Open 5-Level Source Traceability Modal
        </button>

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary" style={{ height: 38, fontSize: '0.75rem', padding: '0 12px' }} onClick={handleExportPdf} title="Download official geological report as PDF">
            <Download size={13} />
            Export PDF
          </button>
          <button className="btn btn-secondary" style={{ height: 38, fontSize: '0.75rem', padding: '0 12px' }} onClick={handleExportCsv} title="Download seam data as CSV">
            <Download size={13} />
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}

export default function GeoIntelligencePage() {
  const [selectedState, setSelectedState] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedMineArea, setSelectedMineArea] = useState('All');
  const [selectedSubsidiary, setSelectedSubsidiary] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('All Periods');
  const [searchQ, setSearchQ] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<GeoBlock | null>(null);
  const [activeTraceItem, setActiveTraceItem] = useState<SourceTraceItem | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (selectedBlock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedBlock]);

  const allStates = useMemo(() => ['All', ...Array.from(new Set(geoBlocks.map(b => b.state)))], []);
  
  const availableDistricts = useMemo(() => {
    const list = geoBlocks
      .filter(b => selectedState === 'All' || b.state === selectedState)
      .map(b => b.district);
    return ['All', ...Array.from(new Set(list))];
  }, [selectedState]);

  const availableMineAreas = useMemo(() => {
    const list = geoBlocks
      .filter(b => (selectedState === 'All' || b.state === selectedState) && (selectedDistrict === 'All' || b.district === selectedDistrict))
      .map(b => b.mineArea);
    return ['All', ...Array.from(new Set(list))];
  }, [selectedState, selectedDistrict]);

  const allSubsidiaries = [
    'All', 
    'ECL', 
    'BCCL', 
    'CCL', 
    'SECL', 
    'NCL', 
    'WCL', 
    'MCL', 
    'SCCL (Associated Entity)'
  ];

  const filtered = useMemo(() => {
    return geoBlocks.filter(b => {
      if (selectedState !== 'All' && b.state !== selectedState) return false;
      if (selectedDistrict !== 'All' && b.district !== selectedDistrict) return false;
      if (selectedMineArea !== 'All' && b.mineArea !== selectedMineArea) return false;
      if (selectedSubsidiary !== 'All' && b.subsidiary !== selectedSubsidiary) return false;
      if (selectedPeriod !== 'All Periods' && b.period !== selectedPeriod) return false;
      if (searchQ) {
        const q = searchQ.toLowerCase();
        const matches = b.name.toLowerCase().includes(q) || 
          b.coalfield.toLowerCase().includes(q) ||
          b.formation.toLowerCase().includes(q) ||
          b.mineArea.toLowerCase().includes(q) ||
          b.district.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [selectedState, selectedDistrict, selectedMineArea, selectedSubsidiary, selectedPeriod, searchQ]);

  const totalResources = filtered.reduce((sum, b) => sum + b.resources, 0);
  const totalProved = filtered.reduce((sum, b) => sum + b.provedResources, 0);
  const totalBoreholes = filtered.reduce((sum, b) => sum + b.explorationBoreholes, 0);
  const totalReports = filtered.reduce((sum, b) => sum + b.reports, 0);

  const handleResetFilters = () => {
    setSelectedState('All');
    setSelectedDistrict('All');
    setSelectedMineArea('All');
    setSelectedSubsidiary('All');
    setSelectedPeriod('All Periods');
    setSearchQ('');
    showToast('Filters reset to default view.', 'info');
  };

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: selectedBlock ? 'hidden' : 'auto' }}>
        <div className="page-container fade-in">
          
          {/* Header */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h1 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
                  Geological & Mining Resource Intelligence
                </h1>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                  CMPDI exploration memoirs, seam stratigraphy, and proven reserve models for CIL subsidiaries and integrated coal entities.
                </p>
              </div>
            </div>
          </div>

          {/* Top KPI Strip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, border: '1px solid var(--border)', marginBottom: 20, overflow: 'hidden', borderRadius: 2, background: 'var(--surface-2)' }}>
            {[
              { label: 'All-India Geological Coal Resources', value: `${totalGeologicalResources} BT`, sub: 'Ministry of Coal official inventory', color: 'var(--copper)' },
              { label: 'Active Field Records', value: `${filtered.length} Blocks`, sub: `Across ${new Set(filtered.map(f => f.state)).size} States`, color: 'var(--info)' },
              { label: 'Filtered Total Resources', value: `${totalResources.toFixed(2)} BT`, sub: `Proved: ${totalProved.toFixed(2)} BT`, color: 'var(--verified)' },
              { label: 'Exploration Borehole Logs', value: totalBoreholes.toLocaleString('en-IN'), sub: 'Core drilling density', color: 'var(--safety)' },
              { label: 'Available Reports & Memoirs', value: totalReports.toString(), sub: 'In knowledge base', color: 'var(--coal-400)' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '14px 18px', borderRight: i < 4 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: '1.0625rem', fontWeight: 700, color: s.color, marginBottom: 2 }}>{s.value}</div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Interactive Filter Bar with all 5 parameters (State, District, Mine/Area, Subsidiary, Period) */}
          <div style={{ 
            background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 2, 
            padding: '12px 16px', marginBottom: 18, display: 'flex', flexDirection: 'column', gap: 10 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Filter size={13} color="var(--copper)" />
                <span className="text-label" style={{ color: 'var(--text-primary)' }}>Interactive Geological Filters</span>
              </div>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                Displayed figures dynamically recalculate upon selection
              </span>
            </div>

            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Search */}
              <div style={{ position: 'relative', minWidth: 180 }}>
                <Search size={12} style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  className="input-field"
                  placeholder="Search basin, formation, area..."
                  value={searchQ}
                  onChange={e => setSearchQ(e.target.value)}
                  style={{ paddingLeft: 28, height: 32, width: '100%', fontSize: '0.75rem' }}
                />
              </div>

              {/* State Filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>State:</span>
                <select 
                  className="select-field" 
                  value={selectedState} 
                  onChange={e => { setSelectedState(e.target.value); setSelectedDistrict('All'); setSelectedMineArea('All'); }} 
                  style={{ height: 32, fontSize: '0.75rem', minWidth: 130 }}
                >
                  {allStates.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              {/* District Filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>District:</span>
                <select 
                  className="select-field" 
                  value={selectedDistrict} 
                  onChange={e => { setSelectedDistrict(e.target.value); setSelectedMineArea('All'); }} 
                  style={{ height: 32, fontSize: '0.75rem', minWidth: 130 }}
                >
                  {availableDistricts.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>

              {/* Mine / Area Filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Mine / Area:</span>
                <select 
                  className="select-field" 
                  value={selectedMineArea} 
                  onChange={e => setSelectedMineArea(e.target.value)} 
                  style={{ height: 32, fontSize: '0.75rem', minWidth: 130 }}
                >
                  {availableMineAreas.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>

              {/* Subsidiary Filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Subsidiary:</span>
                <select 
                  className="select-field" 
                  value={selectedSubsidiary} 
                  onChange={e => setSelectedSubsidiary(e.target.value)} 
                  style={{ height: 32, fontSize: '0.75rem', minWidth: 140 }}
                >
                  {allSubsidiaries.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              {/* Reporting Period Filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Period:</span>
                <select 
                  className="select-field" 
                  value={selectedPeriod} 
                  onChange={e => setSelectedPeriod(e.target.value)} 
                  style={{ height: 32, fontSize: '0.75rem', minWidth: 110 }}
                >
                  {['All Periods', 'FY 2024-25', 'FY 2023-24'].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>

              {/* Reset Action */}
              {(selectedState !== 'All' || selectedDistrict !== 'All' || selectedMineArea !== 'All' || selectedSubsidiary !== 'All' || selectedPeriod !== 'All Periods' || searchQ) && (
                <button
                  className="btn btn-ghost"
                  style={{ fontSize: '0.75rem', padding: '4px 10px', color: 'var(--copper)' }}
                  onClick={handleResetFilters}
                >
                  Reset All Filters
                </button>
              )}
            </div>
          </div>

          {/* Geo block cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 20 }}>
            {filtered.map(block => {
              const cfg = statusConfig[block.status];
              const isSelected = selectedBlock?.id === block.id;
              return (
                <div
                  key={block.id}
                  style={{
                    border: `1px solid ${isSelected ? 'var(--copper)' : 'var(--border)'}`,
                    borderRadius: 2, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.15s',
                    background: isSelected ? 'rgba(181,101,29,0.05)' : 'var(--surface-2)',
                  }}
                  onClick={() => setSelectedBlock(block)}
                  onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-light)'; }}
                  onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
                >
                  {/* Card Header */}
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                        <MapPin size={13} color="var(--copper)" />
                        <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>{block.name}</span>
                        <span className={`badge ${cfg.cls}`} style={{ fontSize: '0.625rem' }}>{block.status}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '0.6875rem', color: 'var(--copper)', fontWeight: 500 }}>{block.subsidiary}</span>
                        <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{block.state} · {block.district}</span>
                        <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Area: {block.mineArea}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 4, flexDirection: 'column', alignItems: 'flex-end' }}>
                      <span className="badge badge-processing" style={{ fontSize: '0.625rem' }}>{block.period}</span>
                      <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>{block.id}</span>
                    </div>
                  </div>

                  {/* Card Metrics */}
                  <div style={{ padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                    {[
                      { label: 'Total Resources', value: `${block.resources} BT` },
                      { label: 'Proved', value: `${block.provedResources} BT` },
                      { label: 'Seams Logged', value: `${block.seams}` },
                      { label: 'Boreholes', value: `${block.explorationBoreholes}` },
                    ].map((m, i) => (
                      <div key={i}>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-primary)' }}>{m.value}</div>
                        <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Formation & Source Trace Strip */}
                  <div style={{ padding: '8px 16px 12px', display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ padding: '2px 8px', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 2, fontSize: '0.6875rem', color: 'var(--info)' }}>
                        {block.formation}
                      </span>
                      <span style={{ padding: '2px 8px', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 2, fontSize: '0.6875rem', color: 'var(--copper)' }}>
                        {block.coalGrade}
                      </span>
                    </div>
                    
                    <button 
                      className="btn btn-ghost"
                      style={{ fontSize: '0.6875rem', padding: '3px 8px', gap: 4 }}
                      onClick={e => {
                        e.stopPropagation();
                        setActiveTraceItem(block.sourceTrace);
                      }}
                      title="Inspect exact source document citation"
                    >
                      <ShieldCheck size={12} color="var(--verified)" />
                      Verify Source
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Geological Resources Master Summary Table */}
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Comprehensive Geological Resource Inventory
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                  Source: CMPDI Regional Institute Geological Assessment Memoirs · {selectedPeriod}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button 
                  className="btn btn-secondary" 
                  style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                  onClick={() => {
                    const headers = ['Basin Name', 'Subsidiary', 'State', 'District', 'Mine Area', 'Period', 'Resources (BT)', 'Proved (BT)', 'Formation', 'Grade', 'Status'];
                    const rows = filtered.map(b => [
                      b.name, b.subsidiary, b.state, b.district, b.mineArea, b.period, b.resources, b.provedResources, b.formation, b.coalGrade, b.status
                    ]);
                    exportToCsv(`Geological_Inventory_${selectedPeriod.replace(/\s+/g, '_')}`, headers, rows);
                  }}
                >
                  <Download size={12} /> Export Table (CSV)
                </button>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Coalfield / Basin</th>
                    <th>Subsidiary</th>
                    <th>State & District</th>
                    <th>Area / Sector</th>
                    <th>Formation</th>
                    <th>Total (BT)</th>
                    <th>Proved (BT)</th>
                    <th>Grade</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(block => (
                    <tr key={block.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedBlock(block)}>
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{block.name}</div>
                        <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)' }}>{block.id} · {block.coalfield}</div>
                      </td>
                      <td>
                        <span style={{ color: block.subsidiary.includes('SCCL') ? 'var(--copper)' : 'var(--text-secondary)', fontWeight: 500 }}>
                          {block.subsidiary}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        {block.state} · {block.district}
                      </td>
                      <td style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{block.mineArea}</td>
                      <td style={{ color: 'var(--info)', fontSize: '0.6875rem' }}>{block.formation}</td>
                      <td>
                        <span style={{ fontWeight: 700, color: 'var(--copper)' }}>{block.resources}</span>
                        <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginLeft: 3 }}>BT</span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 600, color: 'var(--verified)' }}>{block.provedResources}</span>
                        <span style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginLeft: 3 }}>BT</span>
                      </td>
                      <td>
                        <span style={{ padding: '2px 6px', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 2, fontSize: '0.6875rem', color: 'var(--text-primary)' }}>
                          {block.coalGrade}
                        </span>
                      </td>
                      <td><span className={`badge ${statusConfig[block.status].cls}`}>{block.status}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button
                            className="btn btn-ghost"
                            style={{ fontSize: '0.6875rem', padding: '3px 6px' }}
                            onClick={e => { e.stopPropagation(); setSelectedBlock(block); }}
                          >
                            Stratigraphy
                          </button>
                          <button
                            className="btn btn-ghost"
                            style={{ fontSize: '0.6875rem', padding: '3px 6px', color: 'var(--verified)' }}
                            onClick={e => { e.stopPropagation(); setActiveTraceItem(block.sourceTrace); }}
                            title="Verify Source"
                          >
                            <ShieldCheck size={11} /> Source
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                Showing <strong>{filtered.length}</strong> of <strong>{geoBlocks.length}</strong> geological records · Filtered resources: <strong style={{ color: 'var(--text-primary)' }}>{totalResources.toFixed(2)} BT</strong> (Proved: <strong style={{ color: 'var(--verified)' }}>{totalProved.toFixed(2)} BT</strong>)
              </span>
              <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                All-India Total Coal Resources: <strong style={{ color: 'var(--copper)' }}>{totalGeologicalResources} Billion Tonnes</strong>
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Detail Slide Panel */}
      {selectedBlock && (
        <>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 299 }} onClick={() => setSelectedBlock(null)} />
          <GeoDetailPanel 
            block={selectedBlock} 
            onClose={() => setSelectedBlock(null)} 
            onOpenSourceTrace={trace => setActiveTraceItem(trace)}
          />
        </>
      )}

      {/* Hero Source Traceability Modal */}
      <SourceTraceabilityModal 
        isOpen={Boolean(activeTraceItem)}
        onClose={() => setActiveTraceItem(null)}
        item={activeTraceItem}
      />

    </div>
  );
}
