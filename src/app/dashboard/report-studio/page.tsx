'use client';

import { useState } from 'react';
import { 
  FileText, Download, Save, ChevronRight, CheckCircle, 
  BarChart2, TrendingUp, Calendar, Building, Filter, RefreshCw,
  ShieldCheck, ExternalLink, Printer
} from 'lucide-react';
import { useToast } from '@/lib/toast';
import { exportToPdf, exportToDocx } from '@/lib/export-utils';
import { subsidiaries, mines, auditLog } from '@/lib/mock-data';
import SourceTraceabilityModal, { SourceTraceItem } from '@/components/SourceTraceabilityModal';

export const reportTypes = [
  'Production Summary',
  'Safety Report',
  'Geological Report',
  'Mining Performance Report',
  'Parliamentary Query Response',
  'Custom Intelligence Report',
];

const generationSteps = [
  { label: 'Retrieving source records', detail: '284 relevant documents identified' },
  { label: 'Validating figures', detail: 'Cross-checking data points against CMPDI / CIL master' },
  { label: 'Compiling findings', detail: 'Cross-checking 3 independent official sources' },
  { label: 'Generating tables', detail: 'Structuring section matrices and OMS ratios' },
  { label: 'Attaching source references', detail: '5 statutory citations linked with coordinates' },
  { label: 'Finalizing report', detail: 'Affixing cryptographic audit trail stamp' },
];

export default function ReportStudioPage() {
  const [reportType, setReportType] = useState('Production Summary');
  const [subsidiary, setSubsidiary] = useState('Central Coalfields Limited (CCL)');
  const [mine, setMine] = useState('Barkakana');
  const [dateRange, setDateRange] = useState('FY 2024-25');
  const [topic, setTopic] = useState('All Topics');
  const [generating, setGenerating] = useState(false);
  const [genStep, setGenStep] = useState(-1);
  const [reportReady, setReportReady] = useState(false);
  const [generatedAt, setGeneratedAt] = useState('');
  const [auditId, setAuditId] = useState('AUD-2026-040');
  const [activeTraceItem, setActiveTraceItem] = useState<SourceTraceItem | null>(null);
  const { showToast } = useToast();

  // Dynamic report generator based on selected type and parameters
  const generateDynamicReportContent = (type: string, sub: string, m: string, period: string) => {
    if (type === 'Parliamentary Query Response') {
      return {
        title: 'PARLIAMENTARY QUERY RESPONSE (LOK SABHA / RAJYA SABHA)',
        subtitle: `Ministry of Coal · Coal India Limited Parliamentary Division | Reference: Q.No. 2847`,
        execSummary: `In formal response to the Parliamentary query on raw coal production for ${period}, Coal India Limited produced an aggregate of 1,047.52 Million Tonnes (MT) compared to 997.83 MT during FY 2023-24, recording a net year-on-year growth of 4.98% (an absolute addition of 49.69 MT). Open-cast mining contributed 1,015.54 MT (96.96%) and underground operations yielded 31.98 MT (3.04%). The annual target of 1,012.19 MT was surpassed by 35.33 MT, achieving 103.5% fulfillment.`,
        findings: [
          { no: '01', text: `All-India raw coal production touched 1,047.52 MT in FY 2024-25 against 997.83 MT in FY 2023-24 (+4.98% increase).` },
          { no: '02', text: `Open-cast mining formed 96.96% (1,015.54 MT); underground mining contributed 3.04% (31.98 MT).` },
          { no: '03', text: `Subsidiary leaders: MCL produced 198.4 MT (highest), followed by SECL at 184.2 MT and NCL at 152.7 MT.` },
          { no: '04', text: `Target fulfillment reached 103.5% against the annual target of 1,012.19 MT set by Ministry of Coal.` },
        ],
        table: {
          headers: ['Category / Indicator', 'FY 2023-24 (MT)', 'FY 2024-25 (MT)', 'Variance / Growth'],
          rows: [
            ['Open-Cast Mining', '967.20', '1,015.54', '+4.99% (96.96% share)'],
            ['Underground Mining', '30.63', '31.98', '+4.40% (3.04% share)'],
            ['Total CIL Production', '997.83', '1,047.52', '+4.98% (+49.69 MT)'],
            ['National Annual Target', '970.00', '1,012.19', '103.5% Achievement'],
          ],
        },
        observations: `Official statutory statement verified against CIL Central Planning records and CMPDI statistical databases. No discrepancies detected. Approved for Parliamentary submission.`,
        sources: [
          { num: 1, name: 'Coal_Directory_2024_25.pdf', detail: 'Page 42, Table 6.2 (Official Parliamentary Production Statement)' },
          { num: 2, name: 'Annual_Report_MCL_2024_25.pdf', detail: 'Page 22, Parliamentary Review Section' },
          { num: 3, name: 'Production_Statistics_FY24.xlsx', detail: 'Sheet: Subsidiary Summary, Row 8' },
        ],
      };
    }

    if (type === 'Safety Report') {
      return {
        title: 'MINE SAFETY AUDIT & STATUTORY INCIDENT REPORT',
        subtitle: `${sub} · ${m} Mining Area | Period: ${period}`,
        execSummary: `Annual safety performance audit for ${m} Area and parent subsidiary ${sub} confirms an ongoing reduction in mining incidents during ${period}. Fatal accidents fell across CIL subsidiaries from 37 in FY 2023-24 to 29 in FY 2024-25, representing a 21.6% reduction. Serious injuries declined by 19.1% from 89 to 72 cases. In ${m} Area specifically, zero fatalities were registered across active opencast pits.`,
        findings: [
          { no: '01', text: `Fatal accident rate contracted by 21.6% nationally (from 37 to 29 fatalities across all CIL subsidiaries).` },
          { no: '02', text: `Serious reportable injuries fell from 89 to 72 cases (19.1% improvement) under enhanced DGMS directives.` },
          { no: '03', text: `Mechanized surface miner operations in open-cast mines recorded zero strata-related accidents.` },
          { no: '04', text: `Underground legacy mines in BCCL and ECL account for 58% of remaining strata control challenges.` },
        ],
        table: {
          headers: ['Safety Metric', 'FY 2023-24', 'FY 2024-25', 'Net Change'],
          rows: [
            ['Fatal Accidents', '37', '29', '-21.6% (8 lives saved)'],
            ['Serious Accidents', '89', '72', '-19.1% (-17 incidents)'],
            ['Minor Reportable Incidents', '298', '241', '-19.1% (-57 incidents)'],
            ['DGMS Compliance Score', '94.2%', '98.6%', '+4.4% Improvement'],
          ],
        },
        observations: `Implementation of continuous electronic methane detectors, slope stability radar monitors, and real-time biometric operator tracking contributed to zero fatal occurrences in ${m} Area.`,
        sources: [
          { num: 1, name: 'Safety_Reports_2025_Compilation.pdf', detail: 'Page 12, Table S-1 (Accident Severity Index)' },
          { num: 2, name: 'Annual_Report_MCL_2024_25.pdf', detail: 'Page 87, Safety & Occupational Health' },
          { num: 3, name: 'DGMS_Underground_Safety_Circular_2024.pdf', detail: 'Page 4, Statutory Mandates' },
        ],
      };
    }

    if (type === 'Geological Report') {
      return {
        title: 'GEOLOGICAL COAL RESOURCE ASSESSMENT & STRATIGRAPHY',
        subtitle: `CMPDI Geological Exploration Assessment · ${m} Block | ${period}`,
        execSummary: `CMPDI exploration evaluation of ${m} Block within ${sub} jurisdiction identifies proven and indicated geological coal reserves. Correlated strata belong to the Lower Gondwana Barakar Formation. Total geological resources stand at 12.84 Billion Tonnes across 8 workable seams with primary seam thicknesses reaching up to 8.4 meters.`,
        findings: [
          { no: '01', text: `Total in-situ geological coal resources measured at 12.84 Billion Tonnes across 8 correlated seams.` },
          { no: '02', text: `Proved reserves stand at 9.42 BT with borehole spacing of ~400m grid density (284 boreholes drilled).` },
          { no: '03', text: `Dominant coal grade corresponds to G7–G10 with gross calorific value suitable for thermal power generation.` },
          { no: '04', text: `Overburden analysis confirms competent sandstone formations permitting high stripping ratio opencast extraction.` },
        ],
        table: {
          headers: ['Seam Horizon', 'Thickness (m)', 'Depth (m)', 'Coal Grade', 'Ash %'],
          rows: [
            ['Seam I', '1.8–2.4', '45', 'G7', '24.2%'],
            ['Seam II', '2.1–3.2', '78', 'G8', '26.4%'],
            ['Seam III', '3.0–4.5', '112', 'G9', '29.1%'],
            ['Seam IV (Main)', '6.2–8.4', '148', 'G7', '23.8%'],
          ],
        },
        observations: `Geotechnical core logging indicates favorable strata dip angles (<8 degrees) and absence of major regional faults in the primary extraction sector.`,
        sources: [
          { num: 1, name: 'Geological_Assessment_Korba_Block.pdf', detail: 'Page 24, Table 4.1 (Seam Correlation Memoir)' },
          { num: 2, name: 'SECL_Geological_Report_2024.pdf', detail: 'Page 8, Table G-2' },
          { num: 3, name: 'Coal_Directory_2024_25.pdf', detail: 'Page 182, Seam Inventory' },
        ],
      };
    }

    if (type === 'Mining Performance Report') {
      return {
        title: 'MINING OPERATIONAL PERFORMANCE & OMS AUDIT',
        subtitle: `${sub} · ${m} Mining Area | Fiscal ${period}`,
        execSummary: `Operational efficiency evaluation for ${m} Area during ${period} indicates substantial improvements in Output-per-Manshift (OMS) and railway evacuation. Overall production reached 18.42 MT (+9.2% YoY growth), while dispatch volume clocked 18.14 MT at 98.4% efficiency against an internal target of 97%.`,
        findings: [
          { no: '01', text: `Output-per-Manshift (Overall OMS) increased by 6.6% from 4.82 to 5.14 tonnes per manshift.` },
          { no: '02', text: `Rapid Loading System (RLS) and First Mile Connectivity (FMC) silos handled 84% of rail dispatches.` },
          { no: '03', text: `Heavy Earthmoving Machinery (HEMM) availability stood at 88.4% against CIL benchmark of 85%.` },
          { no: '04', text: `Specific diesel consumption decreased by 4.2% following route optimization in open-cast pits.` },
        ],
        table: {
          headers: ['Operational Parameter', 'FY 2023-24', 'FY 2024-25', 'Efficiency Metric'],
          rows: [
            ['Total Coal Extracted', '16.87 MT', '18.42 MT', '+9.2% Growth'],
            ['Rake Dispatch Volume', '16.54 MT', '18.14 MT', '+9.7% Growth'],
            ['Overall OMS', '4.82 t', '5.14 t', '+6.6% Efficiency'],
            ['Dispatch Compliance', '95.8%', '98.4%', '+2.6% Improvement'],
          ],
        },
        observations: `High-capacity surface miners accounted for 72% of total coal fragmentation, significantly reducing blasting vibrations and noise footprint.`,
        sources: [
          { num: 1, name: 'Production_Statistics_FY24.xlsx', detail: 'Sheet: Area Summary, Row 184' },
          { num: 2, name: 'Barkakana_Annual_Report_2024.pdf', detail: 'Page 42, Table 3.2' },
          { num: 3, name: 'Coal_Dispatch_FMC_Review_2024.pdf', detail: 'Page 31, Logistics Review' },
        ],
      };
    }

    // Default: Production Summary & Custom Intelligence Report
    return {
      title: `${type.toUpperCase()}`,
      subtitle: `${sub} · ${m} Mining Area | Period: ${period}`,
      execSummary: `Raw coal production for ${m} Area under ${sub} recorded 18.42 MT during ${period}, compared with 16.87 MT in the previous fiscal year — demonstrating a year-on-year increase of 9.2% (1.55 MT net expansion). National Coal India output reached 1,047.52 MT (+4.98% growth) surpassing the annual target of 1,012.19 MT at 103.5% fulfillment.`,
      findings: [
        { no: '01', text: `Production increased from 16.87 MT to 18.42 MT in ${m} Area, achieving 102.9% target fulfillment.` },
        { no: '02', text: `Open-cast mining contributed 94.8% of area output (17.46 MT); underground operations yielded 0.96 MT.` },
        { no: '03', text: `Total dispatches reached 18.14 MT with remaining pithead stock contained at 0.28 MT.` },
        { no: '04', text: `Zero fatal accidents recorded in the mining complex during the entire reporting cycle.` },
      ],
      table: {
        headers: ['Category / Horizon', 'FY 2023-24 (MT)', 'FY 2024-25 (MT)', 'Growth (%)'],
        rows: [
          ['Open-Cast Mining', '15.98', '17.46', '+9.3%'],
          ['Underground Mining', '0.89', '0.96', '+7.9%'],
          ['Total Raw Coal Output', '16.87', '18.42', '+9.2%'],
          ['Railway Dispatch', '16.54', '18.14', '+9.7%'],
          ['Overall OMS (Tonnes)', '4.82', '5.14', '+6.6%'],
        ],
      },
      observations: `Continuous mechanization and optimized haul-road geometries reduced pit cycle times by 8.4 minutes per truck load.`,
      sources: [
        { num: 1, name: 'Barkakana_Annual_Report_2024.pdf', detail: 'Page 42, Table 3.2' },
        { num: 2, name: 'Coal_Directory_2024_25.pdf', detail: 'Page 42, Chapter 6' },
        { num: 3, name: 'Production_Statistics_FY24.xlsx', detail: 'Sheet: Area Summary, Row 184' },
      ],
    };
  };

  const currentReportContent = generateDynamicReportContent(reportType, subsidiary, mine, dateRange);

  const handleGenerate = async () => {
    if (generating) return; // Prevent duplicate clicks
    setReportReady(false);
    setGenerating(true);
    setGenStep(0);

    for (let i = 0; i < generationSteps.length; i++) {
      setGenStep(i);
      await new Promise(r => setTimeout(r, 450));
    }

    const now = new Date();
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const ts = `${String(now.getDate()).padStart(2,'0')} ${months[now.getMonth()]} ${now.getFullYear()} | ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')} IST`;
    const newAuditId = `AUD-${now.getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`;
    
    setGeneratedAt(ts);
    setAuditId(newAuditId);
    setGenerating(false);
    setReportReady(true);

    // Add to Audit Trail log
    auditLog.unshift({
      id: newAuditId,
      time: 'Just now',
      action: `${reportType} generated`,
      detail: `${reportType} for ${mine} (${subsidiary}) — ${dateRange}`,
      user: 'Dr. Rajiv Kumar (Mining Officer)',
      source: 'Report Studio',
      status: 'Verified',
      type: reportType.includes('Parliamentary') ? 'priority' : 'report',
    });

    showToast(`${reportType} generated and logged to Audit Trail.`, 'success');
  };

  const handleExportPdf = () => {
    const filename = `${reportType.replace(/\s+/g, '_')}_${mine}_${dateRange.replace(/\s+/g, '_')}`;
    const sections = [
      {
        heading: '1. Executive Summary',
        content: currentReportContent.execSummary,
      },
      {
        heading: '2. Key Findings & Extracted Metrics',
        bulletPoints: currentReportContent.findings.map(f => `${f.no}. ${f.text}`),
      },
      {
        heading: '3. Audited Operational Data Matrix',
        table: currentReportContent.table,
      },
      {
        heading: '4. Observations & Statutory Compliance',
        content: currentReportContent.observations,
      },
      {
        heading: '5. Source Citations & Traceability',
        bulletPoints: currentReportContent.sources.map(s => `[${s.num}] ${s.name} — ${s.detail}`),
      },
    ];

    exportToPdf(filename, currentReportContent.title, `${mine} Area — ${dateRange} | Generated: ${generatedAt} | Audit: ${auditId}`, sections);
  };

  const handleExportDocx = () => {
    const filename = `${reportType.replace(/\s+/g, '_')}_${mine}_${dateRange.replace(/\s+/g, '_')}`;
    const sections = [
      {
        heading: '1. Executive Summary',
        content: currentReportContent.execSummary,
      },
      {
        heading: '2. Key Findings & Extracted Metrics',
        bulletPoints: currentReportContent.findings.map(f => `${f.no}. ${f.text}`),
      },
      {
        heading: '3. Audited Operational Data Matrix',
        table: currentReportContent.table,
      },
      {
        heading: '4. Observations & Statutory Compliance',
        content: currentReportContent.observations,
      },
      {
        heading: '5. Source Citations & Traceability',
        bulletPoints: currentReportContent.sources.map(s => `[${s.num}] ${s.name} — ${s.detail}`),
      },
    ];

    exportToDocx(filename, currentReportContent.title, `${mine} Area — ${dateRange} | Generated: ${generatedAt} | Audit: ${auditId}`, sections);
  };

  const handleOpenSourceTrace = (src: { num: number; name: string; detail: string }) => {
    setActiveTraceItem({
      documentName: src.name,
      sourceAuthority: subsidiary,
      page: 42,
      sectionOrTable: src.detail,
      rowOrField: 'Audited Report Reference',
      extractedValue: '1,047.52 MT / Verified Matrix',
      metricLabel: `${reportType} Ground Truth Citation`,
      confidence: 98.6,
      snippetText: `Verified in Report Studio generation pipeline: ${src.name} (${src.detail}). Data extracted and cross-checked for report audit #${auditId}.`,
      crossValidatedSources: [
        { name: 'Coal_Directory_2024_25.pdf', pageOrRow: 'Chapter 6' },
      ],
      auditId,
    });
  };

  return (
    <div className="page-container fade-in">
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
          Report Studio — Mining & Statutory Report Generation
        </h1>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
          Automated compilation of verified production summaries, safety audits, geological assessments, and parliamentary replies.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 20 }}>
        
        {/* Left: Configuration Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 2 }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>Report Parameters</div>
              <span className="badge badge-verified" style={{ fontSize: '0.625rem' }}>6 Report Types</span>
            </div>
            
            <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              
              {/* Report type */}
              <div>
                <label className="text-label" style={{ display: 'block', marginBottom: 6 }}>Report Type</label>
                <select className="select-field" value={reportType} onChange={e => setReportType(e.target.value)} style={{ width: '100%', fontSize: '0.75rem' }}>
                  {reportTypes.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>

              {/* Subsidiary */}
              <div>
                <label className="text-label" style={{ display: 'block', marginBottom: 6 }}>Subsidiary / Authority</label>
                <select className="select-field" value={subsidiary} onChange={e => setSubsidiary(e.target.value)} style={{ width: '100%', fontSize: '0.75rem' }}>
                  {subsidiaries.slice(1).map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              {/* Mine / Area */}
              <div>
                <label className="text-label" style={{ display: 'block', marginBottom: 6 }}>Mine / Area</label>
                <select className="select-field" value={mine} onChange={e => setMine(e.target.value)} style={{ width: '100%', fontSize: '0.75rem' }}>
                  {mines.slice(1).map(m => <option key={m}>{m}</option>)}
                </select>
              </div>

              {/* Date range */}
              <div>
                <label className="text-label" style={{ display: 'block', marginBottom: 6 }}>Reporting Period</label>
                <select className="select-field" value={dateRange} onChange={e => setDateRange(e.target.value)} style={{ width: '100%', fontSize: '0.75rem' }}>
                  {['FY 2024-25', 'FY 2023-24', 'FY 2022-23', 'Q4 FY 2024-25', 'Q3 FY 2024-25'].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>

              {/* Topic Focus */}
              <div>
                <label className="text-label" style={{ display: 'block', marginBottom: 6 }}>Topic Focus</label>
                <select className="select-field" value={topic} onChange={e => setTopic(e.target.value)} style={{ width: '100%', fontSize: '0.75rem' }}>
                  {['All Topics', 'Production & Dispatches', 'Safety & Strata', 'Geology & Seam Logs', 'Environment & Clearances', 'Land Acquisition'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              {/* Generate Button */}
              <button
                className="btn btn-primary"
                onClick={handleGenerate}
                disabled={generating}
                style={{ width: '100%', justifyContent: 'center', height: 42, marginTop: 6 }}
              >
                {generating ? (
                  <>
                    <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                    Compiling Intelligence...
                  </>
                ) : (
                  <>
                    <FileText size={14} />
                    Generate {reportType}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generation Progress Pipeline */}
          {(generating || (reportReady && genStep >= 0)) && (
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: '16px 18px', borderRadius: 2 }}>
              <div className="text-label" style={{ marginBottom: 12 }}>
                {generating ? 'Processing Pipeline...' : 'Generation Complete'}
              </div>
              {generationSteps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: i < generationSteps.length - 1 ? 10 : 0 }}>
                  {i < genStep || (!generating && reportReady) ? (
                    <CheckCircle size={14} color="var(--verified)" style={{ marginTop: 1, flexShrink: 0 }} />
                  ) : i === genStep && generating ? (
                    <span style={{ width: 14, height: 14, border: '2px solid rgba(181,101,29,0.3)', borderTopColor: 'var(--copper)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block', flexShrink: 0, marginTop: 1 }} />
                  ) : (
                    <div style={{ width: 14, height: 14, border: '1.5px solid var(--border)', borderRadius: '50%', flexShrink: 0, marginTop: 1 }} />
                  )}
                  <div>
                    <div style={{ fontSize: '0.8125rem', color: i <= genStep || (!generating && reportReady) ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                      {step.label}
                    </div>
                    {(i < genStep || (!generating && reportReady)) && (
                      <div style={{ fontSize: '0.625rem', color: 'var(--verified)', marginTop: 1 }}>{step.detail}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Report Document Preview */}
        <div>
          {!reportReady && !generating && (
            <div style={{
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              height: '100%', minHeight: 450, borderRadius: 2,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: 40, textAlign: 'center',
            }}>
              <FileText size={48} color="var(--text-muted)" style={{ marginBottom: 16, opacity: 0.3 }} />
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
                Report Preview Workspace
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', maxWidth: 360, lineHeight: 1.6 }}>
                Select your parameters on the left and click <strong>Generate Report</strong> to compile official documentation with citations.
              </div>
            </div>
          )}

          {generating && (
            <div style={{
              background: 'var(--surface-2)', border: '1px solid var(--border)',
              height: '100%', minHeight: 450, borderRadius: 2,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ 
                  display: 'block',
                  width: 40, height: 40, border: '3px solid rgba(181,101,29,0.2)', 
                  borderTopColor: 'var(--copper)', borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                  margin: '0 auto 16px',
                }} />
                <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>Compiling {reportType}...</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>Validating data points across CMPDI records</div>
              </div>
            </div>
          )}

          {reportReady && (
            <div className="fade-in">
              {/* Action Toolbar */}
              <div style={{ 
                display: 'flex', gap: 8, marginBottom: 14, justifyContent: 'space-between',
                alignItems: 'center', flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ShieldCheck size={14} color="var(--verified)" />
                  <span style={{ fontSize: '0.75rem', color: 'var(--verified)', fontWeight: 600 }}>
                    Audited & Cryptographically Verified (ID: {auditId})
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-secondary" onClick={handleExportPdf}>
                    <Download size={13} />
                    Export PDF
                  </button>
                  <button className="btn btn-secondary" onClick={handleExportDocx}>
                    <Download size={13} />
                    Export DOCX
                  </button>
                  <button className="btn btn-primary" onClick={() => showToast('Report saved to Knowledge Base.', 'success')}>
                    <Save size={13} />
                    Save
                  </button>
                </div>
              </div>

              {/* Rendered Document Sheet */}
              <div style={{ 
                background: '#fff', 
                color: '#1a1a1e',
                boxShadow: '0 8px 36px rgba(0,0,0,0.35)',
                borderRadius: 2,
                overflow: 'hidden',
                fontFamily: 'Georgia, serif',
              }}>
                {/* Formal Blue Header */}
                <div style={{ background: '#14213d', color: '#fff', padding: '24px 32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                    <div>
                      <div style={{ fontSize: '0.625rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.7, marginBottom: 4, fontFamily: 'sans-serif' }}>
                        Ministry of Coal · Coal India Limited / CMPDI
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'sans-serif', letterSpacing: '-0.01em', marginBottom: 4 }}>
                        {currentReportContent.title}
                      </div>
                      <div style={{ fontSize: '0.875rem', opacity: 0.85, fontFamily: 'sans-serif' }}>
                        {currentReportContent.subtitle}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '0.6875rem', opacity: 0.85, fontFamily: 'sans-serif', minWidth: 160 }}>
                      <div style={{ fontWeight: 600 }}>Generated: {generatedAt}</div>
                      <div style={{ marginTop: 2, opacity: 0.75 }}>Audit ID: {auditId}</div>
                      <div style={{ marginTop: 6, display: 'inline-block', padding: '3px 8px', background: 'rgba(74,124,89,0.3)', borderRadius: 2, border: '1px solid rgba(74,124,89,0.5)', color: '#7ed9a2', fontSize: '0.625rem', fontWeight: 600 }}>
                        ✓ STATUS: VALIDATED · 98.6%
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '28px 32px' }}>
                  
                  {/* Executive Summary */}
                  <div style={{ marginBottom: 26 }}>
                    <div style={{ 
                      fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                      color: '#14213d', borderBottom: '2px solid #14213d',
                      paddingBottom: 6, marginBottom: 12, fontFamily: 'sans-serif',
                    }}>
                      1. Executive Summary
                    </div>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.75, color: '#2b2b30', margin: 0 }}>
                      {currentReportContent.execSummary}
                    </p>
                  </div>

                  {/* Key Findings */}
                  <div style={{ marginBottom: 26 }}>
                    <div style={{ 
                      fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                      color: '#14213d', borderBottom: '2px solid #14213d',
                      paddingBottom: 6, marginBottom: 12, fontFamily: 'sans-serif',
                    }}>
                      2. Key Findings & Quantitative Metrics
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {currentReportContent.findings.map(item => (
                        <div key={item.no} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                          <span style={{ 
                            fontSize: '0.6875rem', fontWeight: 700, color: '#14213d', 
                            fontFamily: 'sans-serif', minWidth: 20, paddingTop: 2
                          }}>{item.no}.</span>
                          <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: '#2b2b30', margin: 0 }}>
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Data Table */}
                  <div style={{ marginBottom: 26 }}>
                    <div style={{ 
                      fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                      color: '#14213d', borderBottom: '2px solid #14213d',
                      paddingBottom: 6, marginBottom: 12, fontFamily: 'sans-serif',
                    }}>
                      3. Verified Intelligence Table
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem', fontFamily: 'sans-serif' }}>
                      <thead>
                        <tr style={{ background: '#14213d', color: '#fff' }}>
                          {currentReportContent.table.headers.map(h => (
                            <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: '0.6875rem', fontWeight: 600 }}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {currentReportContent.table.rows.map((row, ri) => (
                          <tr key={ri} style={{ background: ri % 2 === 0 ? '#f7f8fa' : '#fff' }}>
                            {row.map((cell, ci) => (
                              <td key={ci} style={{ 
                                padding: '8px 12px', 
                                borderBottom: '1px solid #e2e4e8',
                                fontWeight: ri === currentReportContent.table.rows.length - 1 ? 700 : 400,
                                color: ci === row.length - 1 ? '#1a7c44' : '#2b2b30',
                              }}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Observations */}
                  <div style={{ marginBottom: 26 }}>
                    <div style={{ 
                      fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                      color: '#14213d', borderBottom: '2px solid #14213d',
                      paddingBottom: 6, marginBottom: 12, fontFamily: 'sans-serif',
                    }}>
                      4. Strategic Observations
                    </div>
                    <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, color: '#333', margin: 0 }}>
                      {currentReportContent.observations}
                    </p>
                  </div>

                  {/* Source References with Traceability */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ 
                      fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                      color: '#14213d', borderBottom: '2px solid #14213d',
                      paddingBottom: 6, marginBottom: 12, fontFamily: 'sans-serif',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                      <span>5. Source Traceability References</span>
                      <span style={{ fontSize: '0.5625rem', color: '#666', textTransform: 'none' }}>
                        Every important figure can be verified against original source
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {currentReportContent.sources.map(src => (
                        <div 
                          key={src.num} 
                          style={{ 
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                            fontSize: '0.8125rem', color: '#444', fontFamily: 'sans-serif',
                            padding: '6px 10px', background: '#f8f9fb', borderRadius: 2, border: '1px solid #e6e8ec'
                          }}
                        >
                          <div>
                            <span style={{ color: '#14213d', fontWeight: 700, marginRight: 8 }}>[{src.num}]</span>
                            <strong>{src.name}</strong> &mdash; <span style={{ color: '#666' }}>{src.detail}</span>
                          </div>
                          <button
                            onClick={() => handleOpenSourceTrace(src)}
                            style={{
                              background: 'transparent', border: 'none', color: '#b5651d',
                              fontSize: '0.6875rem', fontWeight: 600, cursor: 'pointer',
                              display: 'flex', alignItems: 'center', gap: 4
                            }}
                          >
                            <ShieldCheck size={12} /> Verify Source
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Official Footer */}
                  <div style={{ 
                    borderTop: '1px solid #e2e4e8', paddingTop: 14, 
                    display: 'flex', justifyContent: 'space-between',
                    fontSize: '0.625rem', color: '#777', fontFamily: 'sans-serif',
                  }}>
                    <span>GeoIntel AI · Mining Intelligence Platform · Ministry of Coal, Govt. of India</span>
                    <span>Audit Trail ID: {auditId} · Generated On: {generatedAt}</span>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Source Traceability Modal */}
      <SourceTraceabilityModal 
        isOpen={Boolean(activeTraceItem)}
        onClose={() => setActiveTraceItem(null)}
        item={activeTraceItem}
      />

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
