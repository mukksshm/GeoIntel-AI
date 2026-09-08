/**
 * Comprehensive GeoIntel AI Site Knowledge & Bot Assistant Engine
 * Gives accurate, verified guidance about every feature, module, workflow,
 * document, and operational capability across the GeoIntel AI platform.
 */

export interface SiteKnowledgeAnswer {
  matched: boolean;
  category: 'feature' | 'navigation' | 'upload' | 'source' | 'data' | 'system';
  topic: string;
  summary: string;
  steps?: string[];
  actionLinks: Array<{ label: string; url: string; icon: string }>;
  verifiedSources: string[];
}

export function matchSiteKnowledge(rawQuery: string): SiteKnowledgeAnswer | null {
  const q = rawQuery.toLowerCase().trim();

  // 1. UPLOAD & FINDING UPLOADED DOCUMENTS
  if (
    q.includes('upload') || 
    q.includes('where is my doc') || 
    q.includes('where is it uploaded') || 
    q.includes('unable to find that where it is uploaded') || 
    q.includes('uploaded file') || 
    q.includes('upload pdf') || 
    q.includes('upload excel')
  ) {
    return {
      matched: true,
      category: 'upload',
      topic: 'Document Upload & Storage in Data Hub',
      summary: 'In GeoIntel AI, all document uploads (PDF, XLSX, CSV, DOCX) are handled directly in **Data Hub** (Module 02). Once uploaded, your file is immediately indexed and pinned with a special badge at the top of the repository table.',
      steps: [
        'Navigate to **Data Hub** (Module 02) from the sidebar.',
        'Use the top-right upload dropzone: drag-and-drop your file or click **Browse Files**.',
        'When upload completes, a bright green toast notification appears with an instant **"View Document"** button.',
        'Your uploaded file is automatically pinned right at the top of the table marked with a green badge: **"NEW UPLOAD · YOU"**.',
        'Click on the document row or click **View Source** to inspect full page-by-page text or interactive Excel grid rows.',
      ],
      actionLinks: [
        { label: 'Open Data Hub to Upload', url: '/dashboard/data-hub', icon: 'Database' },
        { label: 'Check Audit Trail for Ingestion', url: '/dashboard/audit-trail', icon: 'Clock' },
      ],
      verifiedSources: ['Data Ingestion Pipeline v2.4', 'CMPDI Master Repository Guidelines'],
    };
  }

  // 2. VIEW SOURCE / ACTUAL RAW DATA
  if (
    q.includes('view source') || 
    q.includes('actual source') || 
    q.includes('source option') || 
    q.includes('raw data') || 
    q.includes('source document') || 
    q.includes('traceability') ||
    q.includes('full details')
  ) {
    return {
      matched: true,
      category: 'source',
      topic: 'Direct Authentic Source Traceability',
      summary: 'GeoIntel AI ensures 100% data auditability without abbreviated summaries. Every statistical figure and insight provides a direct **View Source** action that takes you directly to the original raw document.',
      steps: [
        'In **Data Hub** or **AI Search**, click the **View Source** button on any search result or document item.',
        'For Excel datasets, you will see the interactive multi-sheet spreadsheet viewer showing exact rows, columns, and figures (e.g., Table 8.4 State-wise raw coal production).',
        'For PDF reports, you will see the precise page preview, highlighting the exact paragraph and paragraph coordinate citation.',
        'In the **Source Traceability Modal**, you can inspect the cryptographic Audit ID, confidence score (e.g. 98.4%), and cross-validation across 3 independent official authorities.',
      ],
      actionLinks: [
        { label: 'Inspect Sources in AI Search', url: '/dashboard/ai-search', icon: 'Search' },
        { label: 'Browse Documents in Data Hub', url: '/dashboard/data-hub', icon: 'Database' },
      ],
      verifiedSources: ['Coal Directory of India 2024-25', 'Provisional Coal Statistics 2024-25', 'Source Traceability Protocol v1.0'],
    };
  }

  // 3. OVERVIEW / DASHBOARD CAPABILITIES
  if (q.includes('overview') || q.includes('dashboard') || q.includes('kpi') || q.includes('what does this site do') || q.includes('about site') || q.includes('summary of website')) {
    return {
      matched: true,
      category: 'feature',
      topic: 'GeoIntel AI Enterprise Platform Overview',
      summary: 'GeoIntel AI is CMPDI and Coal India Limited\'s AI-powered mining intelligence and geological analysis platform. It unifies 12,486 technical reports, geological surveys, and statistical directories into an auditable intelligence system.',
      steps: [
        '**Module 01 Overview:** Executive KPI telemetry (Total Production 1,047.52 MT, Documents Indexed: 12,486, Query latency < 12s).',
        '**Module 02 Data Hub:** Enterprise document library with real-time PDF and Excel spreadsheet viewer.',
        '**Module 03 AI Search:** Deep semantic search cross-validated with derivation citations and live Wikipedia encyclopedia sync.',
        '**Module 04 Geo Intelligence:** Interactive GIS mapping of Indian coalfields, stratigraphy, seams, and Barakar formations.',
        '**Module 05 Analytics:** Production trends, subsidiary performance comparisons, and dispatch variances.',
        '**Module 07 Report Studio:** Automated generation of parliamentary briefs, executive summaries, and compliance memos.',
        '**Module 11 Ask AI Assistant:** Conversational AI guide that answers queries and navigates the site.',
      ],
      actionLinks: [
        { label: 'Go to Overview Dashboard', url: '/dashboard/overview', icon: 'LayoutDashboard' },
        { label: 'Explore All Modules in Sidebar', url: '/dashboard/overview', icon: 'Compass' },
      ],
      verifiedSources: ['CMPDI Technology Directorate', 'Ministry of Coal Enterprise Charter'],
    };
  }

  // 4. GIS / GEO INTELLIGENCE MAP
  if (q.includes('geo intelligence') || q.includes('gis') || q.includes('map') || q.includes('coalfield') || q.includes('formation') || q.includes('seam') || q.includes('stratigraphy')) {
    return {
      matched: true,
      category: 'feature',
      topic: 'Geo Intelligence & Coalfield Stratigraphy',
      summary: 'Module 04 (Geo Intelligence) provides GIS mapping across major Indian coal basins including Korba, Raniganj, Singrauli, Talcher, Jharia, and Ib Valley with deep geological borehole and seam modeling.',
      steps: [
        'Open **Geo Intelligence** (Module 04).',
        'Select any coalfield pin on the map or choose from the quick basin selector.',
        'View the geological drawer showing seam thickness, Barakar formation stratigraphy, dip/strike angles, and strike faults.',
        'Inspect estimated reserves (e.g., Korba has 11,247 MT reserves across Upper & Lower Kusmunda seams).',
      ],
      actionLinks: [
        { label: 'Open Geo Intelligence GIS', url: '/dashboard/geo-intelligence', icon: 'MapPin' },
        { label: 'View Topic Entities', url: '/dashboard/topics', icon: 'Tags' },
      ],
      verifiedSources: ['CMPDI Master Geodatabase', 'Geological Survey of India (GSI) Memoirs'],
    };
  }

  // 5. ANALYTICS & PRODUCTION CHARTS
  if (q.includes('analytics') || q.includes('chart') || q.includes('graph') || q.includes('trend') || q.includes('dispatch') || q.includes('bar chart') || q.includes('line chart')) {
    return {
      matched: true,
      category: 'feature',
      topic: 'Analytics & Mining Performance Telemetry',
      summary: 'Module 05 (Analytics) offers interactive visualization tools for raw coal output, subsidiary rankings, monthly off-take dispatch targets, and multi-year production comparisons.',
      steps: [
        'Open **Analytics** (Module 05) from the sidebar.',
        'Toggle between **Monthly Target vs Actual** bar charts and **Subsidiary Breakdown** visualizations.',
        'Hover over any bar or trend node to view exact figures (e.g. MCL 210.85 MT, SECL 185.30 MT).',
        'Click the **Export CSV** or **Export Dossier** button to download raw data directly to your computer.',
      ],
      actionLinks: [
        { label: 'Open Analytics Dashboard', url: '/dashboard/analytics', icon: 'BarChart3' },
        { label: 'Overview Quick Charts', url: '/dashboard/overview', icon: 'LayoutDashboard' },
      ],
      verifiedSources: ['CIL Monthly Operations MIS', 'Coal Controller Organization (CCO) Records'],
    };
  }

  // 6. REPORT STUDIO & EXPORTING
  if (q.includes('report') || q.includes('export') || q.includes('download pdf') || q.includes('download word') || q.includes('parliamentary brief')) {
    return {
      matched: true,
      category: 'feature',
      topic: 'Report Studio & Automated Dossier Generation',
      summary: 'Module 07 (Report Studio) generates publication-ready official reports for Ministry of Coal briefings, parliamentary Q&A, and subsidiary performance audits with automatic cryptographic verification.',
      steps: [
        'Go to **Report Studio** (Module 07).',
        'Select a template: Parliamentary Question Brief, Quarterly Production Dossier, or DGMS Safety Audit.',
        'Click **Generate Report** to assemble verified data and cross-references in seconds.',
        'Export instantly as formatted **PDF** or editable **Word (DOCX)**.',
      ],
      actionLinks: [
        { label: 'Open Report Studio', url: '/dashboard/report-studio', icon: 'FileText' },
        { label: 'Download AI Search Dossier', url: '/dashboard/ai-search', icon: 'Search' },
      ],
      verifiedSources: ['Parliamentary Research Wing Template', 'CMPDI Standard Reporting Format'],
    };
  }

  // 7. SAFETY, ACCIDENTS & DGMS COMPLIANCE
  if (q.includes('safety') || q.includes('dgms') || q.includes('accident') || q.includes('fatal') || q.includes('methane') || q.includes('sensor')) {
    return {
      matched: true,
      category: 'data',
      topic: 'Mine Safety & DGMS Regulatory Mandates',
      summary: 'GeoIntel AI monitors Directorate General of Mines Safety (DGMS) regulatory circulars, continuous atmospheric monitoring (CAM) standards, and accident rate reductions.',
      steps: [
        'View the **Knowledge Base** (Module 08) for full DGMS compliance directives.',
        'All Degree II & III gassy underground mines must operate continuous telemetry for CH₄, CO, and O₂.',
        'Open-cast mines with bench heights over 100m require real-time slope stability radar surveillance.',
        'In FY 2024-25, CIL reported a 14.2% reduction in fatal incidents, maintaining a safety compliance rating of 94.8/100.',
      ],
      actionLinks: [
        { label: 'Knowledge Base Safety Archive', url: '/dashboard/knowledge-base', icon: 'BookOpen' },
        { label: 'Generate Safety Memo', url: '/dashboard/report-studio', icon: 'FileText' },
      ],
      verifiedSources: ['DGMS Circular No. 2024/08', 'CIL Safety Committee Annual Review'],
    };
  }

  // 8. AUDIT TRAIL & SYSTEM INTEGRITY
  if (q.includes('audit') || q.includes('sha-256') || q.includes('governance') || q.includes('immutable') || q.includes('integrity') || q.includes('verification')) {
    return {
      matched: true,
      category: 'system',
      topic: 'Cryptographic Audit Trail & Governance',
      summary: 'Module 09 (Audit Trail) maintains an immutable log of every document ingested, search query executed, report compiled, and user access event, secured via SHA-256 derivation hashes.',
      steps: [
        'Access **Audit Trail** (Module 09) from the sidebar.',
        'Filter logs by Category: System, Search, Ingestion, or Report Generation.',
        'View full SHA-256 verification hashes confirming that no numbers were modified or hallucinated.',
        'Export audit logs for external ISO / CIMS compliance reviews.',
      ],
      actionLinks: [
        { label: 'View Audit Trail Logs', url: '/dashboard/audit-trail', icon: 'Clock' },
        { label: 'Admin Security Governance', url: '/dashboard/admin', icon: 'Shield' },
      ],
      verifiedSources: ['ISO 27001 Data Integrity Specification', 'CIL Digital Governance Charter'],
    };
  }

  // 9. SUBSIDIARY SELECTION
  if (q.includes('subsidiary') || q.includes('change subsidiary') || q.includes('switch company') || q.includes('mcl') || q.includes('secl') || q.includes('ccl') || q.includes('bccl')) {
    return {
      matched: true,
      category: 'navigation',
      topic: 'Subsidiary Context Switching',
      summary: 'You can filter telemetry and documents by Coal India subsidiary at any time using the global topbar selector.',
      steps: [
        'Locate the **Subsidiary** dropdown in the top bar (next to the search bar).',
        'Select any operating subsidiary: MCL, SECL, CCL, BCCL, NCL, WCL, ECL, or CMPDI.',
        'All dashboard KPIs, documents, and analytics will dynamically filter to that entity.',
      ],
      actionLinks: [
        { label: 'Go to Overview', url: '/dashboard/overview', icon: 'LayoutDashboard' },
        { label: 'Subsidiary Roster in Admin', url: '/dashboard/admin', icon: 'UserCheck' },
      ],
      verifiedSources: ['Coal India Limited Corporate Roster 2024-25'],
    };
  }

  return null;
}
