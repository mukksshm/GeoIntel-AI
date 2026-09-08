// Mock data types and data for GeoIntel AI prototype

export const cilSubsidiaries = [
  "Eastern Coalfields Limited (ECL)",
  "Bharat Coking Coal Limited (BCCL)",
  "Central Coalfields Limited (CCL)",
  "South Eastern Coalfields Limited (SECL)",
  "Northern Coalfields Limited (NCL)",
  "Western Coalfields Limited (WCL)",
  "Mahanadi Coalfields Limited (MCL)",
  "Central Mine Planning & Design Institute (CMPDI)",
];

export const associatedCoalEntities = [
  "Singareni Collieries Company Limited (SCCL) — Associated Entity",
];

export const subsidiaries = [
  "All Subsidiaries & Associated Entities",
  ...cilSubsidiaries,
  ...associatedCoalEntities,
];

export const mines = [
  "All Mines",
  "Korba",
  "Singrauli",
  "Ranchi",
  "Dhanbad",
  "Talcher",
  "Bokaro",
  "Raniganj",
  "Barkakana",
  "Jharia",
  "Gevra",
  "Kusmunda",
];

export const yearlyProduction = [
  { year: "2020-21", production: 716.08, openCast: 693.18, underground: 22.9 },
  { year: "2021-22", production: 777.23, openCast: 752.86, underground: 24.37 },
  { year: "2022-23", production: 893.19, openCast: 866.0, underground: 27.19 },
  { year: "2023-24", production: 997.83, openCast: 967.2, underground: 30.63 },
  { year: "2024-25", production: 1047.52, openCast: 1015.54, underground: 31.98 },
];

export const monthlyProduction2024 = [
  { month: "Apr", production: 78.4 },
  { month: "May", production: 82.1 },
  { month: "Jun", production: 75.6 },
  { month: "Jul", production: 71.2 },
  { month: "Aug", production: 79.8 },
  { month: "Sep", production: 84.3 },
  { month: "Oct", production: 92.1 },
  { month: "Nov", production: 95.7 },
  { month: "Dec", production: 98.4 },
  { month: "Jan", production: 101.2 },
  { month: "Feb", production: 94.8 },
  { month: "Mar", production: 93.9 },
];

export const subsidiaryProduction = [
  { name: "MCL", production: 198.4, color: "#4a7c59" },
  { name: "SECL", production: 184.2, color: "#4a7fa5" },
  { name: "NCL", production: 152.7, color: "#b5651d" },
  { name: "CCL", production: 134.1, color: "#e8b84b" },
  { name: "ECL", production: 118.6, color: "#6e6e78" },
  { name: "WCL", production: 92.3, color: "#5a93bd" },
  { name: "BCCL", production: 78.8, color: "#8b4c14" },
  { name: "SCCL", production: 88.4, color: "#3a6047" },
];

export const safetyIncidents = [
  { year: "2020-21", fatal: 52, serious: 134, minor: 412 },
  { year: "2021-22", fatal: 48, serious: 118, minor: 387 },
  { year: "2022-23", fatal: 43, serious: 102, minor: 341 },
  { year: "2023-24", fatal: 37, serious: 89, minor: 298 },
  { year: "2024-25", fatal: 29, serious: 72, minor: 241 },
];

export const dataQuality = [
  { name: "Validated", value: 8742, color: "#4a7c59" },
  { name: "Needs Review", value: 2184, color: "#e8b84b" },
  { name: "Conflicting", value: 384, color: "#b84a4a" },
  { name: "Missing Metadata", value: 1176, color: "#4a7fa5" },
];

export const documentActivity = [
  { month: "Apr", indexed: 182, validated: 156 },
  { month: "May", indexed: 204, validated: 189 },
  { month: "Jun", indexed: 167, validated: 142 },
  { month: "Jul", indexed: 228, validated: 203 },
  { month: "Aug", indexed: 312, validated: 287 },
  { month: "Sep", indexed: 264, validated: 239 },
  { month: "Oct", indexed: 344, validated: 312 },
  { month: "Nov", indexed: 391, validated: 362 },
  { month: "Dec", indexed: 418, validated: 384 },
  { month: "Jan", indexed: 476, validated: 441 },
  { month: "Feb", indexed: 384, validated: 357 },
  { month: "Mar", indexed: 502, validated: 468 },
];

export type Document = {
  id: string;
  name: string;
  type: "PDF" | "XLSX" | "DOCX" | "Scanned PDF" | "JPG";
  source: string;
  pages?: number;
  rows?: number;
  status: "Indexed" | "Validated" | "OCR Complete" | "Processing" | "Needs Review";
  confidence: number;
  lastUpdated: string;
  department: string;
  uploaded: string;
  description: string;
  mine?: string;
  year?: string;
  content?: string;
};

export const documents: Document[] = [
  {
    id: "DOC-CIL-2024-00482",
    name: "Coal_Directory_2024_25.pdf",
    type: "PDF",
    source: "Coal India Limited",
    pages: 284,
    status: "Validated",
    confidence: 98.2,
    lastUpdated: "Today, 10:22",
    department: "Planning & Development",
    uploaded: "12 Aug 2026",
    description: "Comprehensive coal directory covering production statistics, mine-wise data, and operational summaries for FY 2024-25.",
    year: "2024-25",
  },
  {
    id: "DOC-KOR-2025-00183",
    name: "Korba_Production_Q4_FY25.xlsx",
    type: "XLSX",
    source: "Korba Area Office",
    rows: 1240,
    status: "Validated",
    confidence: 99.1,
    lastUpdated: "Yesterday, 16:42",
    department: "Production",
    uploaded: "08 Aug 2026",
    description: "Quarter 4 production data for Korba Area including mine-wise breakdowns, dispatch records, and OMS data.",
    mine: "Korba",
    year: "2024-25",
  },
  {
    id: "DOC-CMD-2025-00741",
    name: "Safety_Reports_2025_Compilation.pdf",
    type: "Scanned PDF",
    source: "CMPDI Ranchi",
    pages: 186,
    status: "OCR Complete",
    confidence: 94.3,
    lastUpdated: "Today, 08:15",
    department: "Safety & Environment",
    uploaded: "10 Aug 2026",
    description: "Compiled safety inspection reports from multiple subsidiaries including incident data, near-miss reports, and corrective actions.",
    year: "2024-25",
  },
  {
    id: "DOC-MCL-2024-00328",
    name: "Annual_Report_MCL_2024_25.pdf",
    type: "PDF",
    source: "Mahanadi Coalfields Limited",
    pages: 312,
    status: "Indexed",
    confidence: 97.6,
    lastUpdated: "Today, 09:40",
    department: "Corporate Affairs",
    uploaded: "11 Aug 2026",
    description: "Annual report of Mahanadi Coalfields Limited covering financial performance, production data, and CSR activities for FY 2024-25.",
    mine: "Talcher",
    year: "2024-25",
  },
  {
    id: "DOC-CMD-2023-00512",
    name: "Geological_Assessment_Korba_Block.pdf",
    type: "PDF",
    source: "CMPDI",
    pages: 148,
    status: "Validated",
    confidence: 96.8,
    lastUpdated: "2 days ago",
    department: "Geological Survey",
    uploaded: "05 Aug 2026",
    description: "Geological assessment of Korba block including seam configuration, reserve estimation, and geotechnical evaluation.",
    mine: "Korba",
    year: "2023-24",
  },
  {
    id: "DOC-ECL-2025-00204",
    name: "Environmental_Compliance_ECL_2025.pdf",
    type: "PDF",
    source: "Eastern Coalfields Limited",
    pages: 94,
    status: "Needs Review",
    confidence: 91.4,
    lastUpdated: "Yesterday",
    department: "Environment",
    uploaded: "06 Aug 2026",
    description: "Environmental compliance status report for ECL mines including air quality monitoring, water management, and plantation data.",
    mine: "Raniganj",
    year: "2024-25",
  },
  {
    id: "DOC-CCL-2024-00619",
    name: "Production_Statistics_FY24.xlsx",
    type: "XLSX",
    source: "Central Coalfields Limited",
    rows: 2184,
    status: "Validated",
    confidence: 99.4,
    lastUpdated: "3 days ago",
    department: "Planning",
    uploaded: "01 Aug 2026",
    description: "Comprehensive production statistics for CCL mines covering year-wise, month-wise, and mine-wise data for FY 2023-24.",
    mine: "Barkakana",
    year: "2023-24",
  },
  {
    id: "DOC-HIST-2010-00001",
    name: "Historical_Production_Archive_2000_15.xlsx",
    type: "XLSX",
    source: "CIL Archives",
    rows: 8420,
    status: "Indexed",
    confidence: 88.7,
    lastUpdated: "1 week ago",
    department: "Archives",
    uploaded: "28 Jul 2026",
    description: "Historical production data compilation from 2000-2015 covering all subsidiaries, digitized from physical records.",
    year: "2000-2015",
  },
];

export const recentReports = [
  {
    id: "RPT-2026-041",
    title: "Quarterly Coal Production Analysis",
    mine: "Barkakana",
    generated: "Today 10:42",
    status: "Verified",
    confidence: 98.4,
    type: "Production Summary",
  },
  {
    id: "RPT-2026-040",
    title: "Mine Safety Incident Summary",
    mine: "Korba",
    generated: "Yesterday 16:18",
    status: "Verified",
    confidence: 96.8,
    type: "Safety Report",
  },
  {
    id: "RPT-2026-039",
    title: "Environmental Compliance Status",
    mine: "Raniganj",
    generated: "Yesterday 11:02",
    status: "Verified",
    confidence: 94.2,
    type: "Compliance",
  },
  {
    id: "RPT-2026-038",
    title: "Geological Assessment — Singrauli Block",
    mine: "Singrauli",
    generated: "2 days ago",
    status: "Verified",
    confidence: 97.1,
    type: "Geological",
  },
  {
    id: "RPT-2026-037",
    title: "Parliamentary Query Response — FY 24-25 Production",
    mine: "All Areas",
    generated: "2 days ago",
    status: "Verified",
    confidence: 99.2,
    type: "Parliamentary",
  },
];

export const auditLog = [
  {
    id: "AUD-001",
    time: "10:42 AM",
    action: "Report generated",
    detail: "RPT-2026-041 — Quarterly Coal Production Analysis",
    user: "Rajiv Kumar (Mining Officer)",
    source: "Report Studio",
    status: "Success",
    type: "report",
  },
  {
    id: "AUD-002",
    time: "10:38 AM",
    action: "Documents validated",
    detail: "3 documents marked as verified after cross-source check",
    user: "Rajiv Kumar (Mining Officer)",
    source: "Data Hub",
    status: "Success",
    type: "validate",
  },
  {
    id: "AUD-003",
    time: "10:22 AM",
    action: "Document indexed",
    detail: "Annual_Report_MCL_2024_25.pdf — 312 pages",
    user: "System Pipeline",
    source: "Document Pipeline",
    status: "Success",
    type: "index",
  },
  {
    id: "AUD-004",
    time: "10:15 AM",
    action: "AI Query executed",
    detail: "\"Compare coal production between 2023-24 and 2024-25\"",
    user: "Rajiv Kumar (Mining Officer)",
    source: "AI Search",
    status: "Success",
    type: "search",
  },
  {
    id: "AUD-005",
    time: "10:05 AM",
    action: "Production dataset updated",
    detail: "Korba_Production_Q4_FY25.xlsx — 1,240 rows refreshed",
    user: "System Pipeline",
    source: "Data Hub",
    status: "Success",
    type: "update",
  },
  {
    id: "AUD-006",
    time: "09:48 AM",
    action: "Document uploaded",
    detail: "Safety_Reports_2025_Compilation.pdf — 186 pages",
    user: "Suresh Patel (Data Analyst)",
    source: "Data Hub",
    status: "Success",
    type: "upload",
  },
  {
    id: "AUD-007",
    time: "09:32 AM",
    action: "OCR processing started",
    detail: "Safety_Reports_2025_Compilation.pdf — 186 pages",
    user: "System Pipeline",
    source: "OCR Engine",
    status: "Success",
    type: "ocr",
  },
  {
    id: "AUD-008",
    time: "09:15 AM",
    action: "User session started",
    detail: "Secure login from 192.168.1.104",
    user: "Rajiv Kumar (Mining Officer)",
    source: "Auth Service",
    status: "Success",
    type: "auth",
  },
  {
    id: "AUD-009",
    time: "Yesterday 16:18",
    action: "Report generated",
    detail: "RPT-2026-040 — Mine Safety Incident Summary",
    user: "Ananya Singh (Analyst)",
    source: "Report Studio",
    status: "Success",
    type: "report",
  },
  {
    id: "AUD-010",
    time: "Yesterday 14:42",
    action: "Parliamentary query response",
    detail: "Q. No. 2847 — Coal production FY 2024-25",
    user: "Rajiv Kumar (Mining Officer)",
    source: "AI Search",
    status: "Approved",
    type: "priority",
  },
];

export const topics = [
  {
    id: "TOP-001",
    name: "Mine Safety",
    mentions: 1284,
    trend: +18,
    category: "Safety",
    mines: ["Korba", "Jharia", "Barkakana", "Raniganj"],
    documents: 142,
    description: "Safety incidents, DGMS inspections, near-miss reports, and corrective action records.",
    relatedDocs: [
      { name: "Safety_Reports_2025_Compilation.pdf", source: "CMPDI / DGMS", page: 12, type: "Safety Audit" },
      { name: "Annual_Report_MCL_2024_25.pdf", source: "MCL", page: 87, type: "Incident Register" },
      { name: "DGMS_Underground_Safety_Circular_2024.pdf", source: "DGMS", page: 4, type: "Statutory Directive" },
      { name: "Korba_Safety_Audit_Q4_FY25.pdf", source: "SECL", page: 19, type: "Audit Report" },
    ],
  },
  {
    id: "TOP-002",
    name: "Environmental Compliance",
    mentions: 842,
    trend: +12,
    category: "Environment",
    mines: ["Raniganj", "Talcher", "Korba"],
    documents: 94,
    description: "Environmental clearances, pollution control measures, afforestation, and regulatory compliance.",
    relatedDocs: [
      { name: "Environmental_Compliance_ECL_2025.pdf", source: "ECL", page: 18, type: "MoEFCC Clearance" },
      { name: "Annual_Report_MCL_2024_25.pdf", source: "MCL", page: 203, type: "Environmental Statement" },
      { name: "Talcher_Air_Water_Quality_Monitoring_2024.pdf", source: "MCL", page: 34, type: "Statutory Filing" },
    ],
  },
  {
    id: "TOP-003",
    name: "Production Planning",
    mentions: 731,
    trend: +8,
    category: "Production",
    mines: ["Singrauli", "Barkakana", "Gevra"],
    documents: 78,
    description: "Annual production targets, mine plan compliance, and capacity utilization data.",
    relatedDocs: [
      { name: "Coal_Directory_2024_25.pdf", source: "CIL", page: 42, type: "Statistical Directory" },
      { name: "Production_Statistics_FY24.xlsx", source: "CCL", row: 184, type: "Area Master Sheet" },
      { name: "Gevra_OCP_Expansion_Plan_70MT.pdf", source: "SECL", page: 55, type: "Mine Plan" },
    ],
  },
  {
    id: "TOP-004",
    name: "Land Acquisition",
    mentions: 428,
    trend: +21,
    category: "Land Acquisition",
    mines: ["Dhanbad", "Singrauli", "Ranchi"],
    documents: 52,
    description: "CBA Act proceedings, R&R status, physical possession, and surface rights data.",
    relatedDocs: [
      { name: "Annual_Report_MCL_2024_25.pdf", source: "MCL", page: 156, type: "R&R Audit" },
      { name: "Singrauli_CBA_Land_Acquisition_Notice_2024.pdf", source: "NCL", page: 11, type: "Gazette Notification" },
    ],
  },
  {
    id: "TOP-005",
    name: "Coal Quality & Beneficiation",
    mentions: 612,
    trend: +5,
    category: "Coal Quality",
    mines: ["Korba", "Singrauli", "Barkakana"],
    documents: 68,
    description: "Grade-wise gross calorific value (GCV), washery yield, ash sampling, and dispatch consistency.",
    relatedDocs: [
      { name: "Coal_Directory_2024_25.pdf", source: "CIL", page: 118, type: "Grade Master" },
      { name: "Patherdih_Washery_Performance_FY25.pdf", source: "BCCL", page: 22, type: "Beneficiation Log" },
    ],
  },
  {
    id: "TOP-006",
    name: "Geological Survey & Exploration",
    mentions: 546,
    trend: +14,
    category: "Geology",
    mines: ["Korba", "Talcher", "Singrauli", "Jharia"],
    documents: 64,
    description: "CMPDI reserve estimation, borehole drilling logs, seam characterization, and stratigraphic analysis.",
    relatedDocs: [
      { name: "Geological_Assessment_Korba_Block.pdf", source: "CMPDI", page: 24, type: "Geological Assessment" },
      { name: "SECL_Geological_Report_2024.pdf", source: "SECL", page: 8, type: "Exploration Memoir" },
      { name: "Talcher_Coalfield_Seam_Stratigraphy_2025.pdf", source: "CMPDI RI-VII", page: 45, type: "Resource Estimate" },
      { name: "Jharia_Coking_Coal_Stratigraphy_Vol2.pdf", source: "CMPDI RI-II", page: 104, type: "Special Memoir" },
    ],
  },
  {
    id: "TOP-007",
    name: "Dispatch Logistics",
    mentions: 489,
    trend: +9,
    category: "Dispatch",
    mines: ["Korba", "Talcher", "Singrauli", "Barkakana"],
    documents: 56,
    description: "Railway rake loading, silo evacuation, merry-go-round (MGR) systems, and power sector supply.",
    relatedDocs: [
      { name: "Coal_Dispatch_FMC_Review_2024.pdf", source: "CIL", page: 31, type: "Logistics Audit" },
      { name: "Korba_Production_Q4_FY25.xlsx", source: "SECL", row: 22, type: "Rake Loading Register" },
    ],
  },
  {
    id: "TOP-008",
    name: "Mine Planning & Mechanisation",
    mentions: 395,
    trend: +11,
    category: "Mine Planning",
    mines: ["Gevra", "Kusmunda", "Jayant", "Nigahi"],
    documents: 47,
    description: "Surface miner deployment, in-pit crushing & conveying, continuous miners, and Highwall mining.",
    relatedDocs: [
      { name: "CMPDI_Mechanisation_Feasibility_Report.pdf", source: "CMPDI", page: 62, type: "Technical Feasibility" },
      { name: "Heavy_Earthmoving_Machinery_Performance_FY25.pdf", source: "CIL", page: 14, type: "Equipment Register" },
    ],
  },
  {
    id: "TOP-009",
    name: "Regulatory & Statutory Compliance",
    mentions: 342,
    trend: +7,
    category: "Compliance",
    mines: ["Jharia", "Raniganj", "Korba"],
    documents: 39,
    description: "Mines Act 1952, CMR 2017 compliance, Parliamentary starred questions, and CAG audit follow-ups.",
    relatedDocs: [
      { name: "Parliamentary_Standing_Committee_Coal_2024.pdf", source: "Ministry of Coal", page: 5, type: "Statutory Report" },
      { name: "DGMS_Statutory_Compliance_Audit_2024.pdf", source: "DGMS", page: 28, type: "Inspection Dossier" },
    ],
  },
];

export const wordCloudData = [
  { word: "GEOLOGY", weight: 96, color: "#b5651d", topicId: "TOP-006" },
  { word: "SAFETY", weight: 95, color: "#b84a4a", topicId: "TOP-001" },
  { word: "PRODUCTION", weight: 90, color: "#4a7c59", topicId: "TOP-003" },
  { word: "ENVIRONMENT", weight: 82, color: "#4a7c59", topicId: "TOP-002" },
  { word: "EXPLORATION", weight: 78, color: "#4a7fa5", topicId: "TOP-006" },
  { word: "LAND ACQUISITION", weight: 72, color: "#e8b84b", topicId: "TOP-004" },
  { word: "MINE PLANNING", weight: 68, color: "#b5651d", topicId: "TOP-008" },
  { word: "COMPLIANCE", weight: 65, color: "#4a7fa5", topicId: "TOP-009" },
  { word: "COAL QUALITY", weight: 64, color: "#b5651d", topicId: "TOP-005" },
  { word: "DISPATCH", weight: 62, color: "#4a7fa5", topicId: "TOP-007" },
  { word: "RESERVES", weight: 58, color: "#b5651d", topicId: "TOP-006" },
  { word: "KORBA", weight: 52, color: "#b5651d", topicId: "TOP-006" },
  { word: "JHARIA", weight: 48, color: "#9999a6", topicId: "TOP-001" },
  { word: "TALCHER", weight: 46, color: "#4a7c59", topicId: "TOP-003" },
  { word: "SINGRAULI", weight: 44, color: "#4a7fa5", topicId: "TOP-008" },
  { word: "BARKAKANA", weight: 42, color: "#e8b84b", topicId: "TOP-003" },
  { word: "VENTILATION", weight: 40, color: "#6e6e78", topicId: "TOP-001" },
  { word: "WASHERY", weight: 38, color: "#9999a6", topicId: "TOP-005" },
  { word: "OVERBURDEN", weight: 36, color: "#6e6e78", topicId: "TOP-008" },
  { word: "DRILLING", weight: 34, color: "#6e6e78", topicId: "TOP-006" },
];

export type SearchResponse = {
  query: string;
  answer: string;
  insight: { label: string; value: string; change?: string };
  sources: Array<{ id: number; name: string; page?: number; sheet?: string; row?: number; url?: string; isExternal?: boolean }>;
  derivation: string[];
  kpiCards?: Array<{ label: string; value: string; sub?: string; trend?: string }>;
  detailedSections?: Array<{
    title: string;
    badge?: string;
    content: string;
    points?: string[];
  }>;
  traceItem?: {
    documentName: string;
    sourceAuthority: string;
    page?: number;
    sectionOrTable: string;
    rowOrField: string;
    extractedValue: string;
    metricLabel: string;
    confidence: number;
    snippetText: string;
    crossValidatedSources?: Array<{ name: string; pageOrRow: string }>;
    auditId?: string;
  };
  wikipediaRef?: {
    title: string;
    url: string;
    description?: string;
    thumbnail?: string;
  };
  actionLinks?: Array<{ label: string; url: string; icon?: string }>;
};

export const searchResponses: Record<string, SearchResponse> = {
  default: {
    query: "Compare coal production between FY 2023-24 and FY 2024-25",
    answer: "Total raw coal production by Coal India Limited increased from 997.83 MT in FY 2023-24 to 1,047.52 MT in FY 2024-25, reflecting a year-on-year growth of 4.98% (net increase of 49.69 MT). Open-cast mining contributed 96.96% of total production (1,015.54 MT), while underground operations accounted for 3.04% (31.98 MT). Subsidiary-wise, Mahanadi Coalfields Limited (MCL) led with 198.4 MT, followed by South Eastern Coalfields Limited (SECL) at 184.2 MT and Northern Coalfields Limited (NCL) at 152.7 MT.",
    insight: { label: "Year-on-year production growth", value: "+4.98%", change: "49.69 MT increase (997.83 MT → 1,047.52 MT)" },
    sources: [
      { id: 1, name: "Coal_Directory_2024_25.pdf", page: 42 },
      { id: 2, name: "Production_Statistics_FY24.xlsx", sheet: "Area Summary", row: 184 },
      { id: 3, name: "Annual_Report_MCL_2024_25.pdf", page: 67 },
    ],
    derivation: [
      "Query parsed: Fiscal comparison [FY 2023-24 vs FY 2024-25]",
      "Indexed production records matched across 12,486 documents",
      "Evidence retrieved from CIL Annual Statistics and Coal Directory",
      "Cross-validated across 3 sources (CIL Statistical Cell, MCL Annual, Master Excel)",
      "Growth derived: ((1,047.52 - 997.83) / 997.83) * 100 = +4.98%",
      "Synthesized formal intelligence response with source citations"
    ],
    traceItem: {
      documentName: "Coal_Directory_2024_25.pdf",
      sourceAuthority: "Coal India Limited / Ministry of Coal, Govt. of India",
      page: 42,
      sectionOrTable: "Table 6.2: All-India Subsidiary-wise Raw Coal Production",
      rowOrField: "Row: Total Coal Production (Coal India Ltd)",
      extractedValue: "1,047.52 MT",
      metricLabel: "Total Raw Coal Production (FY 2024-25)",
      confidence: 98.6,
      snippetText: "TABLE 6.2: ALL-INDIA SUBSIDIARY-WISE RAW COAL PRODUCTION\nIn financial year 2024-25, Coal India Limited recorded an aggregate raw coal output of 1,047.52 MT, compared to 997.83 MT during FY 2023-24, registering an absolute growth of 49.69 MT (+4.98%). Open-cast mines accounted for 1,015.54 MT (96.96%) and underground mines contributed 31.98 MT (3.04%).",
      crossValidatedSources: [
        { name: "Annual_Report_MCL_2024_25.pdf", pageOrRow: "Page 67, Section 4.1" },
        { name: "Production_Statistics_FY24.xlsx", pageOrRow: "Sheet: Area Summary, Row 184" },
      ],
      auditId: "AUD-2026-CMP-01",
    },
  },
  geological: {
    query: "What geological information is available for Korba?",
    answer: "CMPDI geological records for the Korba coalfield (SECL, Chhattisgarh) indicate proven geological coal resources of approximately 12.84 Billion Tonnes across the Korba basin. The coalfield is part of the Lower Gondwana Barakar Formation and hosts 8 correlated seams ranging from 1.2m to 8.4m thickness. Primary seam (Seam IV) is extensively developed across Gevra and Kusmunda blocks with 284 exploration boreholes covering 1,840 sq km. Coal grade ranges from G7 to G10. Geotechnical assessment classifies the overburden as moderately competent sandstone. 27 geological reports and 18 exploration memoirs are indexed.",
    insight: { label: "Geological Resources — Korba Basin", value: "12.84 BT", change: "Barakar Formation, SECL Chhattisgarh" },
    sources: [
      { id: 1, name: "Geological_Assessment_Korba_Block.pdf", page: 24 },
      { id: 2, name: "SECL_Geological_Report_2024.pdf", page: 8 },
      { id: 3, name: "Coal_Directory_2024_25.pdf", page: 182 },
    ],
    derivation: [
      "Query parsed: Geological intelligence request for Korba Coalfield",
      "Matched CMPDI Regional Institute-V geological memoirs",
      "Extracted in-situ resource estimation, seam stratigraphy & borehole density",
      "Cross-validated across 3 sources (CMPDI RI-V, SECL Geology Dept, Coal Directory)",
      "Validated seam thickness (4.2–8.4 m) and coal grade (G7–G10)",
      "Synthesized geological intelligence profile"
    ],
    traceItem: {
      documentName: "Geological_Assessment_Korba_Block.pdf",
      sourceAuthority: "CMPDI Regional Institute V, Bilaspur",
      page: 24,
      sectionOrTable: "Table 4.1: Regional Seam Correlation & In-situ Resource Estimation",
      rowOrField: "Row: Korba Basin Total In-situ Reserves (Proved + Indicated)",
      extractedValue: "12.84 Billion Tonnes",
      metricLabel: "Geological Coal Resources — Korba Basin",
      confidence: 97.4,
      snippetText: "SECTION 4: GEOLOGICAL RESERVE EVALUATION — KORBA COALFIELD\nCMPDI geological assessment confirms total in-situ geological coal resources of 12.84 Billion Tonnes within the Barakar Formation of Korba Basin. The basin contains 8 major workable seams with cumulative borehole drilling density of 284 boreholes across 1,840 sq km.",
      crossValidatedSources: [
        { name: "SECL_Geological_Report_2024.pdf", pageOrRow: "Page 8, Table G-2" },
        { name: "Coal_Directory_2024_25.pdf", pageOrRow: "Page 182, Seam Inventory" },
      ],
      auditId: "AUD-2026-GEO-04",
    },
  },
  jharkhand: {
    query: "Show coal production data for Jharkhand in 2024",
    answer: "Jharkhand operations represent India's most strategically vital coal cluster, encompassing Central Coalfields Limited (CCL), Bharat Coking Coal Limited (BCCL), and Eastern Coalfields Limited (ECL perimeter). In FY 2024-25, total Jharkhand coal production reached 212.9 MT (~20.3% of Coal India's national output of 1,047.52 MT). CCL produced 134.1 MT across major open-cast mechanization corridors (North Karanpura, Barkakana, and Rajrappa), while BCCL recorded 78.8 MT from the premier coking coal seams of the Jharia Coalfield. Jharkhand holds India's highest geological reserves (86.2 Billion Tonnes) and is the sole domestic producer of metallurgical coking coal, saving ₹12,400 Crore in import substitution for domestic blast furnaces.",
    insight: { label: "Jharkhand Total Coal Output FY25", value: "212.9 MT", change: "20.3% of Coal India Total (+6.4% YoY Growth)" },
    kpiCards: [
      { label: "Geological Coal Reserves", value: "86.2 BT", sub: "27.3% of All-India Total (Rank #1)", trend: "7 Coalfield Basins" },
      { label: "FY 2024-25 Production", value: "212.9 MT", sub: "CCL: 134.1 MT | BCCL: 78.8 MT", trend: "+6.4% YoY Expansion" },
      { label: "Washery Coking Yield", value: "18.4 MT", sub: "Clean Feedstock for SAIL & RINL", trend: "Ash <18% Spec" },
      { label: "Import Substitution Value", value: "₹12,400 Cr", sub: "Displacing Met Coal from Australia", trend: "Forex Conserved" },
      { label: "Operating Mine Clusters", value: "146 Pits", sub: "82 BCCL (49 UG) + 64 CCL (52 OC)", trend: "Highest UG Density" },
      { label: "DGMS Safety Compliance", value: "94.8 / 100", sub: "Zero Fatalities in 6 Major Areas", trend: "Top Tier Audit" },
    ],
    detailedSections: [
      {
        title: "1. Executive Summary & Strategic National Footprint",
        badge: "National Strategic Anchor",
        content: "Jharkhand remains the foundational cornerstone of India's indigenous energy independence and industrial metallurgical security. Holding an audited 86.2 Billion Tonnes of geological coal reserves—representing over 27% of the nation's total inventory—the state achieved an aggregate production of 212.9 MT during FY 2024-25, supplying 20.3% of Coal India Limited's national output (1,047.52 MT). Furthermore, Jharkhand is the nation's sole domestic repository of prime and medium coking coal essential for integrated steel manufacturing.",
        points: [
          "86.2 Billion Tonnes total in-situ geological reserve across 7 Gondwana coalfields (Jharia, North Karanpura, South Karanpura, East Bokaro, West Bokaro, Ramgarh, and Rajmahal).",
          "212.9 MT aggregate extraction in FY 2024-25 against 200.1 MT in FY 2023-24 (+6.4% expansion).",
          "Total dispatched coal volume reached 218.4 MT (including pithead stockpile liquidation) via 108 daily Indian Railways rake loadings to power and steel utilities."
        ]
      },
      {
        title: "2. Subsidiary-Wise Breakdown: CCL vs. BCCL vs. ECL",
        badge: "Operational Matrix",
        content: "Mining operations across Jharkhand are partitioned among three premier Coal India subsidiaries operating under distinct geological and operational conditions:",
        points: [
          "Central Coalfields Limited (CCL) — 134.1 MT (63.0% of state output): Operating predominantly high-capacity mechanized open-cast mines across North Karanpura, South Karanpura, Bokaro, Ramgarh, and Barkakana areas. Flagship mega-mines Magadh (20 MTPA) and Amrapali (25 MTPA) registered record dispatch efficiency via electronic in-pit crushing and overland conveyors.",
          "Bharat Coking Coal Limited (BCCL) — 78.8 MT (37.0% of state output): Headquartered in Dhanbad and managing the world-renowned Jharia Coalfield. Operates 82 mines, including 49 underground operations—representing the highest concentration of underground extraction in India. BCCL extracts prime coking coal from deep Barakar seams under complex geo-mining conditions.",
          "Eastern Coalfields Limited (ECL - Jharkhand Perimeter): Operates the Rajmahal Open Cast Project (20 MTPA nominal) in Godda district, feeding dedicated Merry-Go-Round (MGR) rail tracks direct to NTPC Farakka and Kahalgaon super thermal stations."
        ]
      },
      {
        title: "3. Metallurgical Coking Coal & ₹12,400 Cr Import Substitution",
        badge: "Forex Protection",
        content: "To fulfill the Ministry of Coal's Atmanirbhar Bharat directive, Jharkhand's washery network underwent intensive modernization during FY 2024-25:",
        points: [
          "BCCL and CCL dispatched 18.4 MT of washed and direct-feed coking coal with ash content tailored under 18% to state steel majors SAIL, RINL, and private blast furnaces.",
          "Import substitution reduced dependency on high-cost metallurgical coal imports from Queensland (Australia) and Indonesia, conserving an estimated ₹12,400 Crore ($1.5 Billion USD) in foreign exchange reserves.",
          "Commissioning of the state-of-the-art Patherdih Washery (5.0 MTPA) and Madhuband Washery (5.0 MTPA) boosted clean coking coal yield by 4.2 percentage points."
        ]
      },
      {
        title: "4. Geological Seam Profile & Basin Stratigraphy",
        badge: "CMPDI Memoir Data",
        content: "Jharkhand's coal occurrences belong to the Lower Gondwana sequence, primarily preserved within faulted rift basins along the Damodar Valley:",
        points: [
          "Barakar Formation: Houses the thickest and most valuable seams (Seams I to XVIII in Jharia). Seam thicknesses range from 1.5m to over 22m (e.g. Kargali Seam in Bokaro, up to 30m composite thickness).",
          "Karharbari Formation: Lower stratigraphical units characterized by superior quality coal with low moisture (<2%) and low ash (<16%), providing premium blending feedstock.",
          "Borehole Coverage: CMPDI Regional Institute-II (Dhanbad) and RI-III (Ranchi) completed 412 detailed exploratory boreholes with 98.4% core recovery, certifying 3.4 BT of additional reserves into the 'Proved' category."
        ]
      },
      {
        title: "5. DGMS Strata Safety, Fire Control & Ecological Restoration",
        badge: "Statutory Compliance",
        content: "Rigorous statutory compliance overseen by the Directorate General of Mines Safety (DGMS) and CMPDI Environmental Division:",
        points: [
          "Jharia Fire Master Plan (Phase II): 27 surface/subsurface fire sites out of 77 legacy colonial fire areas have been completely sealed and quenched using high-pressure nitrogen flushing, surface blanket sand capping, and continuous infrared thermal drone surveillance.",
          "Zero Fatal Accidents achieved across Barkakana, Rajrappa, and Piparwar areas in FY 2024-25 through mechanized roof-bolting and real-time electronic strata-monitoring sensors.",
          "Eco-Restoration: 1,420 hectares of overburden dumps biologically stabilized with 2.8 million saplings, generating 4 national eco-parks on restored mine voids."
        ]
      }
    ],
    sources: [
      { id: 1, name: "Coal_Directory_2024_25.pdf", page: 58 },
      { id: 2, name: "Production_Statistics_FY24.xlsx", sheet: "State Summary", row: 14 },
      { id: 3, name: "Annual_Report_MCL_2024_25.pdf", page: 31 },
    ],
    derivation: [
      "Query parsed: State-level production extraction [Jharkhand, FY 2024-25]",
      "Identified participating CIL subsidiaries in Jharkhand (CCL & BCCL)",
      "Retrieved subsidiary production records: CCL (134.1 MT) + BCCL (78.8 MT)",
      "Cross-validated across 3 sources (Coal Directory Table 8.4, Master Sheet Row 14)",
      "Aggregated total: 134.1 + 78.8 = 212.9 MT",
      "Synthesized state-level mining profile"
    ],
    traceItem: {
      documentName: "Coal_Directory_2024_25.pdf",
      sourceAuthority: "Ministry of Coal / CIL Statistics Division",
      page: 58,
      sectionOrTable: "Table 8.4: State-wise Breakdown of CIL Subsidiary Production",
      rowOrField: "Row: State of Jharkhand (BCCL 78.8 MT + CCL 134.1 MT)",
      extractedValue: "212.9 MT",
      metricLabel: "State Production — Jharkhand (FY 2024-25)",
      confidence: 99.1,
      snippetText: "TABLE 8.4: STATE-WISE SUMMARY OF RAW COAL PRODUCTION\nIn the State of Jharkhand, mining operations achieved an aggregate production of 212.9 MT during FY 2024-25. This was led by Central Coalfields Limited with 134.1 MT and Bharat Coking Coal Limited with 78.8 MT, fulfilling 20.3% of Coal India's national mandate.",
      crossValidatedSources: [
        { name: "Production_Statistics_FY24.xlsx", pageOrRow: "Sheet: State Summary, Row 14" },
        { name: "Annual_Report_MCL_2024_25.pdf", pageOrRow: "Page 31, Comparative Review" },
      ],
      auditId: "AUD-2026-JHK-09",
    },
  },
  odisha: {
    query: "Show coal production and reserves for Odisha in 2024",
    answer: "Odisha represents India's highest coal producing state by volume in FY 2024-25, spearheaded by Mahanadi Coalfields Limited (MCL). Total state extraction reached an all-time record of 198.4 MT (+8.2% YoY growth), representing 18.9% of Coal India's national output (1,047.52 MT). Odisha holds 84.1 Billion Tonnes of geological coal reserves (~26.7% of India's total inventory) across the Talcher and IB Valley coalfields. MCL operates 18 open-cast mega-pits and 4 underground mines, serving as the primary energy lifeline for thermal power utilities across Odisha, Andhra Pradesh, Tamil Nadu, Karnataka, and Maharashtra.",
    insight: { label: "Odisha Total Coal Output FY25", value: "198.4 MT", change: "Rank #1 Producing State in India (+8.2% YoY)" },
    kpiCards: [
      { label: "Geological Reserves", value: "84.1 BT", sub: "26.7% of National Total (Rank #2)", trend: "Talcher & IB Valley" },
      { label: "FY 2024-25 Output", value: "198.4 MT", sub: "MCL Historic Extraction Record", trend: "+8.2% YoY Expansion" },
      { label: "Power Sector Offtake", value: "179.2 MT", sub: "Direct Grid Power Generation", trend: "90.3% Utility Ratio" },
      { label: "Active Mega Pits", value: "18 Open-Cast", sub: "Kulda, Bhubaneswari, Kaniha", trend: "High Mechanization" },
      { label: "Rail Dispatch Capacity", value: "104 Rakes/Day", sub: "Paradip & Dhamra Coastal Evacuation", trend: "MGR Corridors" },
      { label: "Stripping Ratio", value: "1:1.14 m³/T", sub: "Lowest Cost Extraction in India", trend: "World Benchmark" },
    ],
    detailedSections: [
      {
        title: "1. Executive Production Profile & National Leadership",
        badge: "Rank #1 Volume Leader",
        content: "Mahanadi Coalfields Limited (MCL) achieved 198.4 MT against 183.3 MT in FY 2023-24, reinforcing its position as the largest single coal producer in India. The Talcher Coalfield contributed 112.4 MT, while IB Valley contributed 86.0 MT across Jharsuguda and Sundargarh districts.",
        points: [
          "Record single-pit production: Bhubaneswari OCP (28.4 MT) and Kulda OCP (21.2 MT).",
          "Target fulfillment reached 104.2% against the statutory Ministry mandate of 190.4 MT.",
          "Surface miners accounted for 98.2% of open-cast cutting, eliminating primary blasting near settlements."
        ]
      },
      {
        title: "2. Dedicated Rail & Coastal Evacuation Infrastructure",
        badge: "Logistics Hub",
        content: "Odisha's coal logistics infrastructure underwent historic capacity additions during FY 2024-25:",
        points: [
          "MGR (Merry-Go-Round) dedicated rail loops dispatched 34.2 MT directly to NTPC Talcher Kaniha (3,000 MW) and OPGC IB Thermal.",
          "Coastal shipping via Paradip and Dhamra deepwater ports transported 28.4 MT to gencos in Ennore, Mettur, and Tuticorin.",
          "Commissioning of the Angul-Balram rail link (Jharsuguda-Barpali Phase II) enabled 18 additional rail rakes per day."
        ]
      },
      {
        title: "3. Geological Seam Profile & Stratigraphy",
        badge: "Talcher / IB Valley",
        content: "Coal-bearing sediments belong to the Lower Gondwana sequence in the Mahanadi Master Basin:",
        points: [
          "Talcher Coalfield: Features extraordinarily thick coal seams (Seam II/III composite thickness up to 45m).",
          "IB Valley: Houses the Lajkura, Rampur, and Ib seams with cumulative workable thickness of 32m.",
          "Proximate analysis: Non-coking thermal grade (G11 to G13), Gross Calorific Value (GCV) 3,400 to 4,200 kcal/kg, exceptionally low sulfur (<0.45%)."
        ]
      },
      {
        title: "4. Environmental Reclamation & DGMS Safety Review",
        badge: "Sustainable Mining",
        content: "Comprehensive ecological restoration executed alongside record extraction volumes:",
        points: [
          "840 hectares of overburden dumps biologically stabilized in the Sambalpur-Jharsuguda green corridor.",
          "Zero fatal accidents recorded across all IB Valley open-cast mines in FY 2024-25.",
          "Mine water treatment plants recycled 42.6 million liters per day for community irrigation in Talcher block."
        ]
      }
    ],
    sources: [
      { id: 1, name: "Annual_Report_MCL_2024_25.pdf", page: 22 },
      { id: 2, name: "Coal_Directory_2024_25.pdf", page: 58 },
      { id: 3, name: "Production_Statistics_FY24.xlsx", sheet: "State Summary", row: 15 },
    ],
    derivation: [
      "Query parsed: State extraction analysis [Odisha, FY 2024-25]",
      "Retrieved audited production registers for Mahanadi Coalfields Limited (MCL)",
      "Extracted production: 198.4 MT across Talcher (112.4 MT) and IB Valley (86.0 MT)",
      "Cross-validated across 3 official sources (MCL Annual p.22, Coal Directory p.58, Master Sheet Row 15)",
      "Verified national rank: #1 producing state (18.9% of Coal India output)",
      "Synthesized executive state intelligence dossier"
    ],
    traceItem: {
      documentName: "Annual_Report_MCL_2024_25.pdf",
      sourceAuthority: "Mahanadi Coalfields Limited / Ministry of Coal",
      page: 22,
      sectionOrTable: "Table 2.1: Operational Performance & Production Milestones",
      rowOrField: "Row: Total Raw Coal Output (MCL State of Odisha)",
      extractedValue: "198.4 MT (+8.2%)",
      metricLabel: "State Production — Odisha (FY 2024-25)",
      confidence: 99.4,
      snippetText: "OPERATIONAL HIGHLIGHTS FY 2024-25: Mahanadi Coalfields Limited registered an aggregate raw coal production of 198.4 MT, cementing its position as India's premier coal subsidiary. Dispatches to national power utilities stood at 179.2 MT.",
      crossValidatedSources: [
        { name: "Coal_Directory_2024_25.pdf", pageOrRow: "Page 58, Table 8.4" },
        { name: "Production_Statistics_FY24.xlsx", pageOrRow: "Sheet: State Summary, Row 15" },
      ],
      auditId: "AUD-2026-ODI-01",
    },
  },
  chhattisgarh: {
    query: "Show coal production and geological data for Chhattisgarh in 2024",
    answer: "Chhattisgarh is India's second-highest coal producing state, anchored by South Eastern Coalfields Limited (SECL). In FY 2024-25, Chhattisgarh operations generated 184.2 MT (+5.6% YoY growth), contributing 17.6% of national Coal India output. The state hosts the world's largest contiguous open-cast mines: Gevra (52.5 MTPA capacity), Kusmunda (50.0 MTPA capacity), and Dipka (38.0 MTPA capacity). Total geological coal reserves stand at 59.8 Billion Tonnes across the Korba, Mand-Raigarh, and Hasdeo-Arand coalfields.",
    insight: { label: "Chhattisgarh Total Coal Output FY25", value: "184.2 MT", change: "17.6% of National CIL Production (+5.6% YoY)" },
    kpiCards: [
      { label: "Geological Reserves", value: "59.8 BT", sub: "19.0% of All-India Total (Rank #3)", trend: "Korba & Mand-Raigarh" },
      { label: "FY 2024-25 Output", value: "184.2 MT", sub: "SECL Mega Open-Cast Operations", trend: "+5.6% YoY Expansion" },
      { label: "Gevra Mega OCP", value: "52.5 MT", sub: "World's Largest Single Open-Cast Pit", trend: "Continuous Haulage" },
      { label: "Kusmunda OCP", value: "48.6 MT", sub: "Surface Miner Mechanization", trend: "Blasting-Free Mining" },
      { label: "Active Operating Pits", value: "67 Mines", sub: "18 Open Cast + 49 Underground", trend: "High Capacity" },
      { label: "DGMS Safety Audit", value: "95.2 / 100", sub: "Zero Fatalities in Gevra & Kusmunda", trend: "Top Tier Audit" },
    ],
    detailedSections: [
      {
        title: "1. Global Mega Open-Cast Pits: Gevra, Kusmunda & Dipka",
        badge: "Global Scale",
        content: "The Korba Area in Chhattisgarh operates the most concentrated cluster of ultra-high-capacity open-cast mines in the global mining sector:",
        points: [
          "Gevra OCP achieved an unprecedented 52.5 MT production in FY 2024-25 utilizing 42 m³ electric shovels and 240-tonne heavy haul dumpers.",
          "Kusmunda OCP produced 48.6 MT using continuous in-pit crushing and high-speed overland conveyor belts.",
          "Dipka OCP produced 34.8 MT, maintaining an optimal stripping ratio of 1:1.82 m³/tonne."
        ]
      },
      {
        title: "2. Korba Basin Geology & Barakar Stratigraphy",
        badge: "CMPDI Memoir",
        content: "Geological formations within the Hasdeo River basin exhibit exceptional seam continuity and structural stability:",
        points: [
          "Barakar Formation: Houses 8 workable coal seams. Principal seam (Seam IV) has an aggregate thickness of 18m to 32m.",
          "Coal quality: Predominantly non-coking grades G7 to G10 (GCV 4,300 to 5,200 kcal/kg), ideal for pithead thermal generation.",
          "Exploration density: 284 CMPDI exploratory boreholes confirm 12.84 BT in the Korba Basin alone."
        ]
      },
      {
        title: "3. Railway Corridors & Industrial Evacuation",
        badge: "Corridor Infrastructure",
        content: "Strategic rail corridor expansion accelerated despatches to western industrial hubs:",
        points: [
          "East Rail Corridor (Kharsia to Dharamjaigarh) handled 92 daily coal rakes, relieving mainline congestion.",
          "East-West Rail Corridor (Gevra Road to Pendra Road) entered final commissioning to bypass Bilaspur bottleneck.",
          "Direct conveyor links supply 100% of fuel needs to NTPC Korba Super Thermal Power Station (2,600 MW)."
        ]
      }
    ],
    sources: [
      { id: 1, name: "Geological_Assessment_Korba_Block.pdf", page: 24 },
      { id: 2, name: "Coal_Directory_2024_25.pdf", page: 58 },
      { id: 3, name: "Production_Statistics_FY24.xlsx", sheet: "State Summary", row: 16 },
    ],
    derivation: [
      "Query parsed: State extraction & geology [Chhattisgarh, FY 2024-25]",
      "Retrieved SECL operational records and CMPDI RI-V geological memoirs",
      "Calculated state output: 184.2 MT (SECL)",
      "Cross-validated across 3 sources (Geological Assessment p.24, Coal Directory p.58, Master Sheet Row 16)",
      "Synthesized comprehensive mining profile with global mega-pit breakdown"
    ],
    traceItem: {
      documentName: "Geological_Assessment_Korba_Block.pdf",
      sourceAuthority: "CMPDI / SECL Statistics Division",
      page: 24,
      sectionOrTable: "Table 4.1: Korba Basin Regional Production & Geological Reserves",
      rowOrField: "Row: State of Chhattisgarh Aggregate",
      extractedValue: "184.2 MT (Reserves: 59.8 BT)",
      metricLabel: "State Production — Chhattisgarh (FY 2024-25)",
      confidence: 99.2,
      snippetText: "CHHATTISGARH STATE PROFILE: South Eastern Coalfields Limited recorded 184.2 MT in FY 2024-25 across Korba, Mand-Raigarh, and Korea areas. Gevra, Kusmunda, and Dipka accounted for over 72% of state extraction.",
      crossValidatedSources: [
        { name: "Coal_Directory_2024_25.pdf", pageOrRow: "Page 58, Table 8.4" },
        { name: "Production_Statistics_FY24.xlsx", pageOrRow: "Sheet: State Summary, Row 16" },
      ],
      auditId: "AUD-2026-CHH-02",
    },
  },
  madhyapradesh: {
    query: "Show coal production and stats for Madhya Pradesh in 2024",
    answer: "Madhya Pradesh operations produced 152.7 MT in FY 2024-25 (~14.6% of national CIL output), managed primarily by Northern Coalfields Limited (NCL - Singrauli Coalfield) and Western Coalfields Limited (WCL - Pench/Kanhan areas). NCL achieved 100% mechanized extraction across its 10 contiguous open-cast mega-mines (Jayant, Nigahi, Dudhichua, Amlohri, Bina, and Khadia). The state possesses 30.6 Billion Tonnes of geological coal reserves, almost entirely evacuated via pithead merry-go-round conveyors supplying over 13,000 MW of power.",
    insight: { label: "Madhya Pradesh Total Output FY25", value: "152.7 MT", change: "14.6% of CIL Total (100% Mechanized OCP)" },
    kpiCards: [
      { label: "Geological Reserves", value: "30.6 BT", sub: "Singrauli & Pench Valley Basins", trend: "Gondwana Strata" },
      { label: "FY 2024-25 Output", value: "152.7 MT", sub: "NCL (138.2 MT) + WCL (14.5 MT)", trend: "+4.1% YoY Expansion" },
      { label: "Pit-to-Plant Conveyor", value: "108.4 MT", sub: "Zero Road Pollution Evacuation", trend: "100% Eco-Transport" },
      { label: "Power Generation Feed", value: "138.2 MT", sub: "NTPC Singrauli, Vindhyachal, Rihand", trend: "13,000 MW Secured" },
      { label: "Mechanization Level", value: "100% OCP", sub: "Draglines & In-Pit Mobile Crushers", trend: "Highest in India" },
      { label: "OMS Productivity", value: "14.8 T/man", sub: "Output per Manshift Leader", trend: "Benchmark Standard" },
    ],
    detailedSections: [
      {
        title: "1. The Singrauli Energy Hub & NCL Operations",
        badge: "Power Corridor",
        content: "Northern Coalfields Limited (NCL) operates 10 fully mechanized open-cast mines in the Singrauli basin straddling MP and UP:",
        points: [
          "NCL produced 138.2 MT in MP territory, exceeding its annual target by 3.9%.",
          "Dedicated pit-to-plant Merry-Go-Round (MGR) conveyor belts evacuate over 70% of production directly to pithead power complexes.",
          "Zero inter-state coal shortages experienced by NTPC Vindhyachal (4,760 MW) and NTPC Rihand (3,000 MW)."
        ]
      },
      {
        title: "2. Pench & Kanhan Valley Operations (WCL)",
        badge: "Underground & OC",
        content: "Western Coalfields Limited operates in Chhindwara and Betul districts:",
        points: [
          "Pench Valley produced 14.5 MT from semi-mechanized open-cast and underground mines.",
          "High-grade thermal coal (G7 to G9) dispatched to MPPGCL Sarni thermal power station.",
          "DGMS strata control compliance score reached 96.4% with hydraulic sand stowing."
        ]
      }
    ],
    sources: [
      { id: 1, name: "Coal_Directory_2024_25.pdf", page: 58 },
      { id: 2, name: "Production_Statistics_FY24.xlsx", sheet: "State Summary", row: 17 },
      { id: 3, name: "Annual_Report_MCL_2024_25.pdf", page: 31 },
    ],
    derivation: [
      "Query parsed: State output analysis [Madhya Pradesh, FY 2024-25]",
      "Aggregated production: NCL (138.2 MT) + WCL (14.5 MT) = 152.7 MT",
      "Cross-validated across 3 sources (Coal Directory Table 8.4, Master Sheet Row 17, MCL Review p.31)",
      "Computed national share: 14.6% of CIL output",
      "Synthesized state mining dossier"
    ],
    traceItem: {
      documentName: "Coal_Directory_2024_25.pdf",
      sourceAuthority: "Ministry of Coal / CIL Statistics Division",
      page: 58,
      sectionOrTable: "Table 8.4: State-wise Summary of Raw Coal Production",
      rowOrField: "Row: State of Madhya Pradesh (NCL + WCL)",
      extractedValue: "152.7 MT",
      metricLabel: "State Production — Madhya Pradesh (FY 2024-25)",
      confidence: 98.9,
      snippetText: "MADHYA PRADESH PRODUCTION SUMMARY: Operations led by NCL in Singrauli and WCL in Pench Valley produced 152.7 MT in FY 2024-25 against 146.7 MT in FY 2023-24.",
      crossValidatedSources: [
        { name: "Production_Statistics_FY24.xlsx", pageOrRow: "Sheet: State Summary, Row 17" },
      ],
      auditId: "AUD-2026-MP-03",
    },
  },
  westbengal: {
    query: "Show coal production data for West Bengal in 2024",
    answer: "West Bengal operations produced 118.6 MT in FY 2024-25 (~11.3% of national CIL output), managed by Eastern Coalfields Limited (ECL) centered in the historic Raniganj Coalfield—the birthplace of commercial coal mining in India (1774). West Bengal holds 32.4 Billion Tonnes of geological coal reserves. ECL operates 74 mines, including 48 underground operations specializing in superior high-grade thermal coal (Grades B, C, and D) known for high volatile matter and excellent combustion reactivity.",
    insight: { label: "West Bengal Total Output FY25", value: "118.6 MT", change: "11.3% of CIL Total (Raniganj High-Grade Basin)" },
    kpiCards: [
      { label: "Geological Reserves", value: "32.4 BT", sub: "Raniganj Coalfield Lower Gondwana", trend: "High Grade Coals" },
      { label: "FY 2024-25 Output", value: "118.6 MT", sub: "ECL Open-Cast & Underground", trend: "+3.8% YoY Expansion" },
      { label: "High Grade Share", value: "42.8%", sub: "Superior G1 to G6 Thermal Coal", trend: "Premium Quality" },
      { label: "Underground Mines", value: "48 Operations", sub: "Continuous Miners & Strata Sensors", trend: "Deep Seam Extraction" },
      { label: "CBM Potential", value: "1.4 BCM", sub: "Coal Bed Methane Commercial Leases", trend: "Clean Gas Extraction" },
      { label: "Sand Stowing Index", value: "100%", sub: "Full Hydraulic Void Stabilization", trend: "DGMS Certified" },
    ],
    detailedSections: [
      {
        title: "1. Raniganj Coalfield Stratigraphy & High-Grade Seams",
        badge: "Historic Heritage",
        content: "Raniganj hosts the most complete Gondwana succession in India, divided into the Barakar Formation and the overlying Raniganj Formation:",
        points: [
          "Raniganj Formation coals possess exceptionally high volatile matter (32% to 40%) and low ash (14% to 22%).",
          "Deep underground extraction: Dishergarh, Sanctoria, and Samla seams mined at depths exceeding 400 meters.",
          "Total in-situ geological reserves evaluated at 32.4 Billion Tonnes under UNFC-111 guidelines."
        ]
      },
      {
        title: "2. Mechanization of Legacy Underground Mines",
        badge: "Mining Modernization",
        content: "ECL implemented extensive modernization in its underground operations to boost productivity and worker safety:",
        points: [
          "Deployment of 6 continuous miners in Sodepur and Kajora areas replaced manual basket loading.",
          "Electronic tele-monitoring system continuously tracks carbon monoxide, methane, and air velocity.",
          "Zero fatal roof falls recorded in mechanized panels during FY 2024-25."
        ]
      }
    ],
    sources: [
      { id: 1, name: "Coal_Directory_2024_25.pdf", page: 58 },
      { id: 2, name: "Environmental_Compliance_ECL_2025.pdf", page: 18 },
      { id: 3, name: "Production_Statistics_FY24.xlsx", sheet: "State Summary", row: 18 },
    ],
    derivation: [
      "Query parsed: State output analysis [West Bengal, FY 2024-25]",
      "Extracted ECL production data for Raniganj Coalfield",
      "Production total: 118.6 MT (104.1 MT OC + 14.5 MT UG)",
      "Cross-validated across 3 sources (Coal Directory p.58, ECL Compliance p.18, Master Sheet Row 18)",
      "Synthesized comprehensive state mining intelligence dossier"
    ],
    traceItem: {
      documentName: "Coal_Directory_2024_25.pdf",
      sourceAuthority: "Ministry of Coal / CIL Statistics Division",
      page: 58,
      sectionOrTable: "Table 8.4: State-wise Summary of Raw Coal Production",
      rowOrField: "Row: State of West Bengal (ECL)",
      extractedValue: "118.6 MT",
      metricLabel: "State Production — West Bengal (FY 2024-25)",
      confidence: 98.4,
      snippetText: "WEST BENGAL SUMMARY: Eastern Coalfields Limited extracted 118.6 MT in FY 2024-25 from the Raniganj basin, supporting thermal stations in West Bengal, Bihar, and Uttar Pradesh.",
      crossValidatedSources: [
        { name: "Environmental_Compliance_ECL_2025.pdf", pageOrRow: "Page 18, Section 3" },
        { name: "Production_Statistics_FY24.xlsx", pageOrRow: "Sheet: State Summary, Row 18" },
      ],
      auditId: "AUD-2026-WB-04",
    },
  },
  maharashtra: {
    query: "Show coal production data for Maharashtra in 2024",
    answer: "Maharashtra produced 64.5 MT in FY 2024-25 (~6.2% of national CIL output), managed by Western Coalfields Limited (WCL) across the Wardha Valley, Umrer-Bander, and Kamptee coalfields. Operating 54 mines (34 open-cast and 20 underground), WCL supplies essential thermal coal directly to state utility Mahagenco for the Chandrapur, Koradi, Khaparkheda, and Paras power stations. Maharashtra holds 12.8 Billion Tonnes of geological coal reserves characterized by non-coking Barakar coal.",
    insight: { label: "Maharashtra Total Output FY25", value: "64.5 MT", change: "6.2% of CIL Total (WCL Wardha Valley Corridor)" },
    kpiCards: [
      { label: "Geological Reserves", value: "12.8 BT", sub: "Wardha Valley & Umrer Coalfields", trend: "Barakar Basins" },
      { label: "FY 2024-25 Output", value: "64.5 MT", sub: "WCL Consolidated Operations", trend: "+3.2% YoY Growth" },
      { label: "Mahagenco Offtake", value: "56.4 MT", sub: "Direct Grid Thermal Security", trend: "87.4% Captive Feed" },
      { label: "Active Mines", value: "54 Mines", sub: "34 Open-Cast + 20 Underground", trend: "Stable Operations" },
      { label: "Chandrapur Super Thermal", value: "100% Secured", sub: "Continuous Rail Rake Supply", trend: "2,920 MW Sustained" },
      { label: "Sand Stowing Compliance", value: "98.6%", sub: "DGMS Environmental Audited", trend: "Zero Surface Void" },
    ],
    detailedSections: [
      {
        title: "1. WCL Wardha Valley & Regional Operations",
        badge: "Regional Energy Pillar",
        content: "Western Coalfields Limited (WCL) operates across Chandrapur, Nagpur, and Yavatmal districts:",
        points: [
          "Chandrapur Area produced 28.4 MT from major open-cast pits including Durgapur, Padmapur, and Bhatadi.",
          "Wani and Umrer areas contributed 24.8 MT with direct merry-go-round rail evacuation.",
          "Dispatches to Maharashtra State Power Generation Company (Mahagenco) totaled 56.4 MT."
        ]
      }
    ],
    sources: [
      { id: 1, name: "Coal_Directory_2024_25.pdf", page: 58 },
      { id: 2, name: "Production_Statistics_FY24.xlsx", sheet: "State Summary", row: 19 },
      { id: 3, name: "Safety_Reports_2025_Compilation.pdf", page: 34 },
    ],
    derivation: [
      "Query parsed: State extraction [Maharashtra, FY 2024-25]",
      "Extracted WCL operational records for Wardha Valley",
      "Production total: 64.5 MT (58.2 MT OC + 6.3 MT UG)",
      "Cross-validated across 3 sources (Coal Directory p.58, Master Sheet Row 19, DGMS Safety Compilation p.34)",
      "Synthesized state intelligence profile"
    ],
    traceItem: {
      documentName: "Coal_Directory_2024_25.pdf",
      sourceAuthority: "Ministry of Coal / CIL Statistics Division",
      page: 58,
      sectionOrTable: "Table 8.4: State-wise Summary of Raw Coal Production",
      rowOrField: "Row: State of Maharashtra (WCL)",
      extractedValue: "64.5 MT",
      metricLabel: "State Production — Maharashtra (FY 2024-25)",
      confidence: 98.2,
      snippetText: "MAHARASHTRA PRODUCTION: Western Coalfields Limited produced 64.5 MT in FY 2024-25 across Chandrapur, Nagpur, and Umrer areas, providing fuel security to Mahagenco power plants.",
      crossValidatedSources: [
        { name: "Production_Statistics_FY24.xlsx", pageOrRow: "Sheet: State Summary, Row 19" },
      ],
      auditId: "AUD-2026-MAH-05",
    },
  },
  telangana: {
    query: "Show coal production data for Telangana in 2024",
    answer: "Telangana operations produced 70.0 MT in FY 2024-25, extracted by state-owned Singareni Collieries Company Limited (SCCL - an associated coal sector entity jointly owned by Govt of Telangana 51% and Govt of India 49%). Operations span the Godavari Valley Coalfield across Kothagudem, Ramagundam, Bellampalli, and Mandamarri areas. Telangana holds 11.2 Billion Tonnes of geological coal reserves, providing thermal feed to southern power corporations (TSGENCO, APGENCO, and NTPC Ramagundam).",
    insight: { label: "Telangana (SCCL) Output FY25", value: "70.0 MT", change: "Associated Entity · Godavari Valley Basin" },
    kpiCards: [
      { label: "Geological Reserves", value: "11.2 BT", sub: "Godavari Valley Coalfield Basin", trend: "Pranhita-Godavari Rift" },
      { label: "FY 2024-25 Output", value: "70.0 MT", sub: "SCCL Consolidated Production", trend: "+3.0% YoY Expansion" },
      { label: "Southern Gencos Feed", value: "64.2 MT", sub: "TSGENCO & NTPC Ramagundam", trend: "91.7% Power Offtake" },
      { label: "Active Mines", value: "42 Mines", sub: "19 Open-Cast + 23 Underground", trend: "Highly Mechanized" },
      { label: "Adriyala Longwall", value: "2.8 MTPA", sub: "Deepest Longwall Project in India", trend: "State of Art" },
      { label: "DGMS National Safety", value: "First Class", sub: "National Safety Award Winner", trend: "Safety Benchmark" },
    ],
    detailedSections: [
      {
        title: "1. Godavari Valley Coalfield & SCCL Operational Mandate",
        badge: "Associated Coal Entity",
        content: "Singareni Collieries Company Limited (SCCL) operates the Pranhita-Godavari graben across 4 districts in Telangana:",
        points: [
          "Kothagudem and Ramagundam areas produced 44.2 MT, leading all SCCL operational divisions.",
          "Adriyala Shaft Project operates fully mechanized longwall equipment extracting high-grade thermal coal at 350m depth.",
          "Thermal dispatches supplied 100% of fuel requirements to NTPC Ramagundam (2,600 MW) and Kothagudem Thermal Power Station (1,800 MW)."
        ]
      }
    ],
    sources: [
      { id: 1, name: "Coal_Directory_2024_25.pdf", page: 58 },
      { id: 2, name: "Production_Statistics_FY24.xlsx", sheet: "State Summary", row: 20 },
      { id: 3, name: "Safety_Reports_2025_Compilation.pdf", page: 42 },
    ],
    derivation: [
      "Query parsed: State extraction [Telangana, FY 2024-25]",
      "Retrieved statutory filings for Singareni Collieries Company Limited (SCCL)",
      "Production total: 70.0 MT (62.0 MT OC + 8.0 MT UG)",
      "Cross-validated across 3 sources (Coal Directory Table 8.4, Master Sheet Row 20, Safety Reports p.42)",
      "Synthesized state-level coal intelligence dossier"
    ],
    traceItem: {
      documentName: "Coal_Directory_2024_25.pdf",
      sourceAuthority: "Ministry of Coal / SCCL Corporate Statistics",
      page: 58,
      sectionOrTable: "Table 8.4: State-wise Summary of Raw Coal Production",
      rowOrField: "Row: State of Telangana (SCCL Associated Entity)",
      extractedValue: "70.0 MT",
      metricLabel: "State Production — Telangana (FY 2024-25)",
      confidence: 98.7,
      snippetText: "TELANGANA STATE COAL SUMMARY: Singareni Collieries Company Limited produced 70.0 MT in FY 2024-25 across the Godavari Valley Coalfield, fulfilling power commitments to southern states.",
      crossValidatedSources: [
        { name: "Production_Statistics_FY24.xlsx", pageOrRow: "Sheet: State Summary, Row 20" },
      ],
      auditId: "AUD-2026-TEL-06",
    },
  },
  assam: {
    query: "Show coal production and reserves for Assam and North East",
    answer: "Assam and the North Eastern Coalfields (NEC) operating under Coal India Limited produced 0.90 MT of high-grade tertiary coal in FY 2024-25 against an annual statutory target of 1.00 MT. Operations center on the Makum Coalfield in Tinsukia district (Tikak OCP, Tipong Colliery, Ledo, and Tirap). Assam holds 1.6 Billion Tonnes of geological coal reserves characterized by extraordinarily low ash content (<8%), high volatile matter (>42%), and high Gross Calorific Value (GCV >6,500 kcal/kg). A distinctive geological characteristic is high organic sulfur (3.2% to 5.4%), necessitating specialized blending and desulfurization for thermal and industrial utilization.",
    insight: { label: "Assam & NEC Output FY25", value: "0.90 MT", change: "Makum Coalfield · Tertiary High-Calorific Basin (GCV >6,500 kcal/kg)" },
    kpiCards: [
      { label: "Geological Reserves", value: "1.6 BT", sub: "Tertiary Eocene-Oligocene Basin", trend: "Makum Coalfield" },
      { label: "FY 2024-25 Output", value: "0.90 MT", sub: "Tikak OCP & Tipong Colliery", trend: "+5.9% YoY Expansion" },
      { label: "Calorific Value (GCV)", value: "6,850 kcal/kg", sub: "Highest Heating Energy in India", trend: "Grade G1-G2" },
      { label: "Ash Content", value: "6.8%", sub: "Ultra-Low Inherent Ash Matrix", trend: "Premium Quality" },
      { label: "Organic Sulfur", value: "3.8%", sub: "Organic Complexed Pyritic Sulfur", trend: "Desulfurization Monitored" },
      { label: "DGMS Safety Status", value: "Zero Fatalities", sub: "Tinsukia District Operating Pits", trend: "100% Compliant" },
    ],
    detailedSections: [
      {
        title: "1. Makum Coalfield Stratigraphy & Structural Geology",
        badge: "Tertiary Belt",
        content: "Coal occurs in the Tikak Parbat Formation of the Barail Group (Upper Eocene to Oligocene) along the Belt of Schuppen in Upper Assam:",
        points: [
          "Seam Profile: Features the prominent 60-Foot Seam (18m thick) and 20-Foot Seam (6m thick) steeply dipping along the southern flank of the Namdang syncline.",
          "Caking Properties: Possesses strong caking indices (CI 18 to 22), rendering it an exceptional blending agent for metallurgical coke ovens when blended with low-sulfur Damodar Valley coal.",
          "Exploration: CMPDI Regional Institute-IV conducted deep geophysical mapping validating 180 MT of Proved Category reserves in the Ledo-Tirap extension."
        ]
      },
      {
        title: "2. Environmental Safeguards & Bio-Restoration in Upper Assam",
        badge: "Eco-Restoration",
        content: "Specialized ecological preservation implemented in proximity to the Dehing Patkai rainforest corridor:",
        points: [
          "Zero discharge acid-mine-drainage (AMD) neutralization plants treated 12.8 million liters of effluent using lime-slurry dosing.",
          "Biological capping with indigenous tea-bush and bamboo plantations over 140 hectares of backfilled voids.",
          "Continuous ambient air quality stations installed in Margherita and Ledo tracking SO2 and PM2.5 within statutory MoEFCC limits."
        ]
      }
    ],
    sources: [
      { id: 1, name: "Coal_Directory_2024_25.pdf", page: 58 },
      { id: 2, name: "Production_Statistics_FY24.xlsx", sheet: "State Summary", row: 21 },
      { id: 3, name: "Safety_Reports_2025_Compilation.pdf", page: 48 },
    ],
    derivation: [
      "Query parsed: State extraction [Assam & North East, FY 2024-25]",
      "Extracted CIL North Eastern Coalfields (NEC) operating records",
      "Production total: 0.90 MT (0.80 MT OC + 0.10 MT UG)",
      "Cross-validated across 3 sources (Coal Directory Table 8.4, Master Sheet Row 21, Safety Compilation p.48)",
      "Synthesized tertiary coal basin dossier"
    ],
    traceItem: {
      documentName: "Coal_Directory_2024_25.pdf",
      sourceAuthority: "Ministry of Coal / NEC Coal Controller Statistics",
      page: 58,
      sectionOrTable: "Table 8.4: State-wise Summary of Raw Coal Production",
      rowOrField: "Row: State of Assam & North Eastern Region (NEC)",
      extractedValue: "0.90 MT",
      metricLabel: "State Production — Assam & NEC (FY 2024-25)",
      confidence: 97.9,
      snippetText: "NORTH EASTERN COALFIELDS: Raw coal extraction in the State of Assam reached 0.90 MT in FY 2024-25 from the Makum Coalfield, supplying specialized high-calorific coal to regional industries.",
      crossValidatedSources: [
        { name: "Production_Statistics_FY24.xlsx", pageOrRow: "Sheet: State Summary, Row 21" },
      ],
      auditId: "AUD-2026-ASM-01",
    },
  },
  andhrapradesh: {
    query: "Show coal production, reserves and consumption for Andhra Pradesh",
    answer: "Andhra Pradesh consumed 48.6 MT of thermal coal in FY 2024-25 to sustain base-load power generation across APGENCO and private IPP stations (Dr. Narla Tata Rao Vijayawada TPS, Rayalaseema TPS, Krishnapatnam Ultra Mega, and Simhadri NTPC). While the state's historical coal-bearing Godavari Valley collieries lie in Telangana post-reorganization, Andhra Pradesh holds 0.4 Billion Tonnes of explored coal reserves in the Chintalapudi sub-basin. The state maintains vital fuel supply agreements with MCL (19.4 MT via coastal shipping from Paradip to Krishnapatnam) and SCCL (18.2 MT via rail corridors).",
    insight: { label: "Andhra Pradesh Coal Inflow FY25", value: "48.6 MT", change: "APGENCO & Coastal IPPs · MCL & SCCL Rail/Sea Corridors" },
    kpiCards: [
      { label: "Annual Consumption", value: "48.6 MT", sub: "APGENCO & Central Utilities", trend: "+4.1% Power Demand" },
      { label: "Coastal Sea Inflow", value: "19.4 MT", sub: "Paradip to Krishnapatnam Port", trend: "Coastal Evacuation" },
      { label: "SCCL Rail Inflow", value: "18.2 MT", sub: "Kothagudem & Ramagundam Corridors", trend: "Dedicated Rakes" },
      { label: "Chintalapudi Reserves", value: "0.4 BT", sub: "Explored Southern Fringe Seams", trend: "CMPDI Surveyed" },
      { label: "Base Load Power", value: "7,820 MW", sub: "Coal-Fired Installed Capacity", trend: "Grid Anchor" },
      { label: "Critical Stock Days", value: "16.8 Days", sub: "Average Power Plant Inventory", trend: "National Safe Zone" },
    ],
    detailedSections: [
      {
        title: "1. Utility Fuel Supply Agreements & Rail/Sea Multimodal Logistics",
        badge: "Power Security",
        content: "Andhra Pradesh relies on a robust dual-channel coal logistics framework to power industrial growth:",
        points: [
          "Coastal Shipping: Paradip and Dhamra deepwater ports dispatched 412 coastal colliers to Krishnapatnam and Gangavaram ports, unloading 19.4 MT for southern gencos.",
          "Rail Linkages: East Coast Railway (ECoR) and South Central Railway (SCR) operated 38 rakes per day delivering Talcher and Singareni coal to Vijayawada and Kadapa.",
          "CEA Compliance: All four major APGENCO coal-fired stations maintained coal stocks above the mandatory 15-day buffer throughout peak summer."
        ]
      },
      {
        title: "2. Chintalapudi Basin Geological Prospecting",
        badge: "Exploration",
        content: "CMPDI Regional Institute-VII completed 14 core boreholes in the Chintalapudi sub-basin in West Godavari district, delineating Lower Gondwana coal-bearing stratigraphy at depths exceeding 400m."
      }
    ],
    sources: [
      { id: 1, name: "Coal_Directory_2024_25.pdf", page: 58 },
      { id: 2, name: "Production_Statistics_FY24.xlsx", sheet: "State Summary", row: 22 },
      { id: 3, name: "Annual_Report_MCL_2024_25.pdf", page: 44 },
    ],
    derivation: [
      "Query parsed: State energy & coal balance [Andhra Pradesh, FY 2024-25]",
      "Audited APGENCO utility coal receipts: 48.6 MT total",
      "Corroborated MCL coastal shipments (19.4 MT) + SCCL rail deliveries (18.2 MT)",
      "Cross-validated across 3 sources (Coal Directory Table 8.4, Master Sheet Row 22, MCL Annual Report p.44)",
      "Synthesized state-level coal intelligence dossier"
    ],
    traceItem: {
      documentName: "Coal_Directory_2024_25.pdf",
      sourceAuthority: "Ministry of Coal / Central Electricity Authority",
      page: 58,
      sectionOrTable: "Table 8.4: State-wise Breakdown of Coal Offtake & Allocations",
      rowOrField: "Row: State of Andhra Pradesh (Utility Linkages)",
      extractedValue: "48.6 MT",
      metricLabel: "Power Sector Coal Offtake — Andhra Pradesh (FY 2024-25)",
      confidence: 98.4,
      snippetText: "ANDHRA PRADESH UTILITY OFFTAKE: Coal receipts by Andhra Pradesh power stations reached 48.6 MT in FY 2024-25, sourced via coastal shipping from MCL (19.4 MT) and all-rail routes from SCCL.",
      crossValidatedSources: [
        { name: "Production_Statistics_FY24.xlsx", pageOrRow: "Sheet: State Summary, Row 22" },
      ],
      auditId: "AUD-2026-AP-04",
    },
  },
  gujarat: {
    query: "Show coal and lignite production data for Gujarat in 2024",
    answer: "Gujarat produced 22.4 MT of lignite and consumed 68.2 MT of thermal coal in FY 2024-25. Lignite extraction is executed by state PSU Gujarat Mineral Development Corporation (GMDC) across Panandhro, Mata No Madh, Rajpardi, Bhavnagar, and Tadkeshwar opencast pits. Geological lignite reserves total 2.7 Billion Tonnes across Tertiary basins of Kutch, Bharuch, and Bhavnagar. In addition, base-load power stations (GSECL Wanakbori, Ukai, Gandhinagar, and Mundra UMPP) received 45.8 MT of domestic coal via dedicated Western Railway rakes dispatched from SECL and NCL.",
    insight: { label: "Gujarat Lignite Output FY25", value: "22.4 MT", change: "GMDC Opencast Mining + 68.2 MT Domestic Coal Inflow" },
    kpiCards: [
      { label: "Lignite Production", value: "22.4 MT", sub: "GMDC Consolidated Output", trend: "+6.8% YoY Growth" },
      { label: "Lignite Reserves", value: "2.7 BT", sub: "Kutch, Bharuch, Bhavnagar Basins", trend: "Tertiary Deposits" },
      { label: "Coal Inflow", value: "68.2 MT", sub: "Western Railway Freight Inflow", trend: "From SECL & NCL" },
      { label: "GSECL Power Supply", value: "11,240 MW", sub: "Thermal Generation Capacity", trend: "Baseload Anchor" },
      { label: "Captive Industrial Feed", value: "14.2 MT", sub: "Cement, Textiles & Chemicals", trend: "Lignite Dispatched" },
      { label: "Stripping Ratio", value: "1:4.8 m³/T", sub: "Opencast Overburden Removal", trend: "Mechanized Shovels" },
    ],
    detailedSections: [
      {
        title: "1. GMDC Lignite Operations & Basin Geology",
        badge: "Lignite Leader",
        content: "Gujarat's lignite deposits occur in the Eocene to Miocene sedimentary sequences along the coastal margin of Saurashtra and Kutch:",
        points: [
          "Major Pits: Mata No Madh and Panandhro in Kutch produced 12.8 MT of high-volatile lignite.",
          "Rajpardi (Bharuch) and Tadkeshwar (Surat) produced 6.2 MT providing critical fuel security to South Gujarat industrial belts.",
          "Lignite Quality: GCV ranges from 2,800 to 3,600 kcal/kg, moisture 35-42%, ash 12-16%."
        ]
      },
      {
        title: "2. Domestic Coal Freight Corridor & Thermal Linkages",
        badge: "Logistics",
        content: "Western Dedicated Freight Corridor (WDFC) integration facilitated 42 rakes per day delivering Korba and Singruali coal to Gujarat's coastal power utilities."
      }
    ],
    sources: [
      { id: 1, name: "Coal_Directory_2024_25.pdf", page: 58 },
      { id: 2, name: "Production_Statistics_FY24.xlsx", sheet: "State Summary", row: 23 },
      { id: 3, name: "Safety_Reports_2025_Compilation.pdf", page: 52 },
    ],
    derivation: [
      "Query parsed: State mining profile [Gujarat, FY 2024-25]",
      "Extracted GMDC lignite statutory production figures: 22.4 MT",
      "Aggregated thermal power and industrial domestic coal receipts: 68.2 MT",
      "Cross-validated across 3 sources (Coal Directory Table 8.4, Master Sheet Row 23, Safety Reports p.52)",
      "Synthesized state energy profile"
    ],
    traceItem: {
      documentName: "Coal_Directory_2024_25.pdf",
      sourceAuthority: "Ministry of Coal / GMDC Statutory Filings",
      page: 58,
      sectionOrTable: "Table 8.4: State-wise Summary of Raw Coal & Lignite Production",
      rowOrField: "Row: State of Gujarat (GMDC & Captive Units)",
      extractedValue: "22.4 MT",
      metricLabel: "Lignite Extraction — Gujarat (FY 2024-25)",
      confidence: 98.1,
      snippetText: "GUJARAT LIGNITE PRODUCTION: State-owned GMDC extracted 22.4 MT of lignite across Kutch, Bharuch, and Bhavnagar mines in FY 2024-25, supporting industrial boilers and state thermal units.",
      crossValidatedSources: [
        { name: "Production_Statistics_FY24.xlsx", pageOrRow: "Sheet: State Summary, Row 23" },
      ],
      auditId: "AUD-2026-GUJ-02",
    },
  },
  rajasthan: {
    query: "Show coal and lignite mining data for Rajasthan in 2024",
    answer: "Rajasthan produced 18.6 MT of lignite in FY 2024-25 and imported 38.4 MT of domestic thermal coal to energize Rajasthan Rajya Vidyut Utpadan Nigam Limited (RRVUNL) generation stations. Lignite extraction is spearheaded by Rajasthan State Mines and Minerals Limited (RSMML) and NLC India at Barsingsar, Giral, Sonari, Kapurdi, and Jalipa in Bikaner and Barmer districts. Geological lignite reserves stand at 5.7 Billion Tonnes. To meet baseload power requirements, RRVUNL operates captive coal blocks (Parsa East and Kente Basan - PEKB in Chhattisgarh) providing 15.0 MTPA dedicated rail supplies to Suratgarh, Chhabra, and Kalisindh super thermal stations.",
    insight: { label: "Rajasthan Lignite & Captive Inflow", value: "18.6 MT Lignite", change: "Barsingsar & PEKB Captive Rakes (38.4 MT Coal Inflow)" },
    kpiCards: [
      { label: "Lignite Output", value: "18.6 MT", sub: "RSMML & NLC Barsingsar", trend: "+4.2% YoY Expansion" },
      { label: "Lignite Reserves", value: "5.7 BT", sub: "Bikaner, Barmer, Nagaur Basins", trend: "Palana-Giral Series" },
      { label: "PEKB Captive Coal", value: "15.0 MT", sub: "Dedicated Fuel Linkage from Hasdeo", trend: "100% Target Met" },
      { label: "RRVUNL Stations", value: "8,640 MW", sub: "Suratgarh, Chhabra, Kota, Kalisindh", trend: "Baseload Anchor" },
      { label: "Rail Rakes Received", value: "32 Rakes/Day", sub: "North Western Railway Corridors", trend: "High Availability" },
      { label: "Pithead Power Units", value: "1,250 MW", sub: "Lignite-Fired Mine Mouth Plants", trend: "Zero Freight Cost" },
    ],
    detailedSections: [
      {
        title: "1. Bikaner-Nagaur-Barmer Lignite Basin Stratigraphy",
        badge: "Tertiary Lignite",
        content: "Lignite occurs in the Palana and Akli formations of Eocene age:",
        points: [
          "Barsingsar Mine (NLC): Highly mechanized surface miner deployment producing 2.1 MT feeding the pithead 250 MW thermal plant.",
          "Kapurdi and Jalipa: Large-scale open-cast pits in the Barmer basin supplying 6.8 MT directly to the Raj WestPower 1,080 MW plant.",
          "Lignite Quality: Low ash (<10%), high volatile matter (>40%), Gross Calorific Value 2,900 to 3,400 kcal/kg."
        ]
      },
      {
        title: "2. Captive Block Evacuation & Energy Security",
        badge: "Captive Blocks",
        content: "RRVUNL's operational captive coal block PEKB fulfilled 100% of its statutory 15.0 MT mandate, ensuring continuous fuel security across Rajasthan."
      }
    ],
    sources: [
      { id: 1, name: "Coal_Directory_2024_25.pdf", page: 58 },
      { id: 2, name: "Production_Statistics_FY24.xlsx", sheet: "State Summary", row: 24 },
      { id: 3, name: "Safety_Reports_2025_Compilation.pdf", page: 55 },
    ],
    derivation: [
      "Query parsed: State mining profile [Rajasthan, FY 2024-25]",
      "Extracted RSMML and NLC Barsingsar lignite production records: 18.6 MT",
      "Audited PEKB captive coal dispatches to RRVUNL power stations: 15.0 MT",
      "Cross-validated across 3 sources (Coal Directory Table 8.4, Master Sheet Row 24, Safety Reports p.55)",
      "Synthesized state intelligence dossier"
    ],
    traceItem: {
      documentName: "Coal_Directory_2024_25.pdf",
      sourceAuthority: "Ministry of Coal / RSMML Official Statistics",
      page: 58,
      sectionOrTable: "Table 8.4: State-wise Summary of Raw Coal & Lignite Production",
      rowOrField: "Row: State of Rajasthan (RSMML & NLC Barsingsar)",
      extractedValue: "18.6 MT",
      metricLabel: "Lignite Extraction — Rajasthan (FY 2024-25)",
      confidence: 97.8,
      snippetText: "RAJASTHAN LIGNITE PRODUCTION: Lignite operations in Bikaner and Barmer yielded 18.6 MT in FY 2024-25, powering pithead thermal stations alongside captive coal receipts from PEKB.",
      crossValidatedSources: [
        { name: "Production_Statistics_FY24.xlsx", pageOrRow: "Sheet: State Summary, Row 24" },
      ],
      auditId: "AUD-2026-RAJ-03",
    },
  },
  bihar: {
    query: "Show coal reserves, exploration and consumption for Bihar",
    answer: "Bihar holds 1.35 Billion Tonnes of explored coal reserves located in the Pirpainti-Barahat and Mandar Hill blocks of Bhagalpur and Banka districts (the northern subsurface continuation of the Rajmahal Coal Basin). CMPDI Regional Institute-I completed exploratory drilling across 18 boreholes in FY 2024-25 confirming multi-seam Barakar coal at 220–380m depth. In power generation, Bihar consumed 42.1 MT of thermal coal across NTPC Barh (3,300 MW), NTPC Kahalgaon (2,340 MW), and Nabinagar Super Thermal Power Project, supplied primarily by ECL Rajmahal OCP and CCL North Karanpura.",
    insight: { label: "Bihar Power Coal Offtake FY25", value: "42.1 MT", change: "NTPC Barh & Kahalgaon + 1.35 BT Explored Reserves (Pirpainti)" },
    kpiCards: [
      { label: "Explored Reserves", value: "1.35 BT", sub: "Pirpainti & Mandar Hill Blocks", trend: "Rajmahal Northern Belt" },
      { label: "Annual Consumption", value: "42.1 MT", sub: "NTPC Barh, Kahalgaon, Nabinagar", trend: "+5.4% Power Demand" },
      { label: "Installed Capacity", value: "8,940 MW", sub: "Super Thermal Stations", trend: "National Grid Hub" },
      { label: "Boreholes Drilled", value: "18 Deep Holes", sub: "CMPDI Regional Institute-I", trend: "98.2% Core Recovery" },
      { label: "Coal Inflow Rakes", value: "34 Rakes/Day", sub: "From Rajmahal OCP & CCL", trend: "MGR Loops" },
      { label: "Coal Grade", value: "G11-G13", sub: "Gross Calorific Value 3,400-3,800", trend: "Power Grade" },
    ],
    detailedSections: [
      {
        title: "1. Pirpainti-Barahat Deep Exploration & CMPDI Findings",
        badge: "Exploration",
        content: "Geological exploration in eastern Bihar confirmed major Gondwana coal seams under Gangetic alluvium:",
        points: [
          "Borehole core drilling confirmed Barakar coal seams (Seam I to IV) with cumulative coal thickness of up to 14.2m.",
          "Resource classification: 820 MT categorized as 'Proved' and 530 MT as 'Indicated'.",
          "Mining feasibility studies undertaken for commercial bidding under the Ministry of Coal's Auction Tranche X."
        ]
      },
      {
        title: "2. Strategic Base-Load Generation for Eastern Grid",
        badge: "Grid Anchor",
        content: "NTPC Barh (Stage I & II) and NTPC Kahalgaon operated at 82.4% PLF, receiving seamless coal dispatches via captive MGR loops from ECL Rajmahal OCP."
      }
    ],
    sources: [
      { id: 1, name: "Coal_Directory_2024_25.pdf", page: 58 },
      { id: 2, name: "Production_Statistics_FY24.xlsx", sheet: "State Summary", row: 25 },
      { id: 3, name: "Geological_Assessment_Korba_Block.pdf", page: 18 },
    ],
    derivation: [
      "Query parsed: State coal profile [Bihar, FY 2024-25]",
      "Compiled NTPC Barh, Kahalgaon & Nabinagar coal dispatches: 42.1 MT",
      "Retrieved CMPDI exploration memoir for Pirpainti-Barahat: 1.35 BT reserves",
      "Cross-validated across 3 sources (Coal Directory Table 8.4, Master Sheet Row 25, CMPDI Memoir)",
      "Synthesized state-level coal intelligence dossier"
    ],
    traceItem: {
      documentName: "Coal_Directory_2024_25.pdf",
      sourceAuthority: "Ministry of Coal / CMPDI Regional Institute-I",
      page: 58,
      sectionOrTable: "Table 8.4: State-wise Breakdown of Coal Reserves & Offtake",
      rowOrField: "Row: State of Bihar (Explored Reserves & Utility Receipts)",
      extractedValue: "42.1 MT",
      metricLabel: "Coal Offtake — Bihar (FY 2024-25)",
      confidence: 98.3,
      snippetText: "BIHAR RESERVES & OFFTAKE: Bihar recorded 42.1 MT of thermal coal consumption across NTPC mega-stations in FY 2024-25, alongside 1.35 BT of certified Gondwana reserves in Pirpainti.",
      crossValidatedSources: [
        { name: "Production_Statistics_FY24.xlsx", pageOrRow: "Sheet: State Summary, Row 25" },
      ],
      auditId: "AUD-2026-BHR-08",
    },
  },
  uttarpradesh: {
    query: "Show coal production, reserves and consumption for Uttar Pradesh",
    answer: "Uttar Pradesh hosts northern operations of the Singrauli Coalfield under Northern Coalfields Limited (NCL), with major pitheads Dudhichua, Bina, and Krishnashila straddling the Sonbhadra district border. Uttar Pradesh mines produced 46.8 MT of coal in FY 2024-25, forming part of NCL's consolidated 152.7 MT output. The state is India's largest thermal power consumer, with an aggregate coal consumption of 88.4 MT across NTPC Rihand (3,000 MW), Singrauli Super Thermal Shaktinagar (2,000 MW), Anpara (2,630 MW), Obra (1,094 MW), Harduaganj, and Rosa power stations, energized by dedicated pithead Merry-Go-Round (MGR) conveyor circuits.",
    insight: { label: "UP Pithead Production FY25", value: "46.8 MT", change: "NCL Sonbhadra Segment + 88.4 MT State Power Consumption" },
    kpiCards: [
      { label: "UP Pithead Extraction", value: "46.8 MT", sub: "NCL Sonbhadra District Pits", trend: "+5.1% YoY Expansion" },
      { label: "State Coal Inflow", value: "88.4 MT", sub: "Total Utility Coal Receipts", trend: "Rank #1 Power Consumer" },
      { label: "MGR Conveyor Loops", value: "100% Pithead", sub: "Direct Zero-Carbon Evacuation", trend: "World Benchmark" },
      { label: "Thermal Capacity", value: "16,420 MW", sub: "Operating Super Thermal Units", trend: "Northern Grid Backbone" },
      { label: "Stripping Ratio", value: "1:2.4 m³/T", sub: "Open Cast Dragline Operations", trend: "Lowest Extraction Cost" },
      { label: "DGMS Safety Index", value: "Zero Fatalities", sub: "NCL UP Pits in FY 2024-25", trend: "ISO 45001 Certified" },
    ],
    detailedSections: [
      {
        title: "1. Sonbhadra 'Energy Capital' Pithead Integration",
        badge: "NCL Pitheads",
        content: "The Sonbhadra region of Uttar Pradesh is known as India's 'Energy Capital' due to massive pithead coal-power synchronization:",
        points: [
          "Bina and Dudhichua open-cast pits dispatched coal via enclosed conveyor belts directly into the bunkers of NTPC Shaktinagar and Rihand.",
          "Elimination of long-haul rail transport saves over 2.4 million metric tonnes of diesel emissions annually.",
          "Massive draglines (including 24m³ and 33m³ walking draglines) achieve lowest per-tonne overburden removal costs."
        ]
      },
      {
        title: "2. Environmental Reclamation & Solar Hybridization",
        badge: "Eco-Restoration",
        content: "NCL deployed 50 MW of ground-mounted solar power plants over reclaimed overburden dumps in Bina and Dudhichua, generating 74 million units of green electricity."
      }
    ],
    sources: [
      { id: 1, name: "Coal_Directory_2024_25.pdf", page: 58 },
      { id: 2, name: "Production_Statistics_FY24.xlsx", sheet: "State Summary", row: 26 },
      { id: 3, name: "Safety_Reports_2025_Compilation.pdf", page: 28 },
    ],
    derivation: [
      "Query parsed: State coal profile [Uttar Pradesh, FY 2024-25]",
      "Extracted NCL Uttar Pradesh operational division statistics: 46.8 MT",
      "Audited UP state utility coal consumption records: 88.4 MT",
      "Cross-validated across 3 sources (Coal Directory Table 8.4, Master Sheet Row 26, Safety Reports p.28)",
      "Synthesized state intelligence dossier"
    ],
    traceItem: {
      documentName: "Coal_Directory_2024_25.pdf",
      sourceAuthority: "Ministry of Coal / NCL Corporate Operations",
      page: 58,
      sectionOrTable: "Table 8.4: State-wise Summary of Raw Coal Production",
      rowOrField: "Row: State of Uttar Pradesh (NCL Sonbhadra Division)",
      extractedValue: "46.8 MT",
      metricLabel: "Coal Production — Uttar Pradesh (FY 2024-25)",
      confidence: 99.0,
      snippetText: "UTTAR PRADESH PRODUCTION: Northern Coalfields Limited produced 46.8 MT in the Sonbhadra district of Uttar Pradesh in FY 2024-25, powering NTPC Rihand, Singrauli, and Anpara pithead stations.",
      crossValidatedSources: [
        { name: "Production_Statistics_FY24.xlsx", pageOrRow: "Sheet: State Summary, Row 26" },
      ],
      auditId: "AUD-2026-UP-07",
    },
  },
  tamilnadu: {
    query: "Show coal and lignite data for Tamil Nadu in 2024",
    answer: "Tamil Nadu is India's preeminent lignite powerhouse, producing 25.1 MT of lignite in FY 2024-25 from the Neyveli basin operated by Navratna PSU NLC India Limited (Mine-I, Mine-IA, and Mine-II). Geological lignite reserves stand at 30.2 Billion Tonnes (~80% of India's total lignite resource). In addition, Tamil Nadu Generation and Distribution Corporation (TANGEDCO) and central gencos consumed 34.2 MT of domestic coal for Tuticorin, Mettur, and North Chennai thermal stations, transported via dedicated coastal shipping corridors from MCL (Talcher) through Paradip and Dhamra ports.",
    insight: { label: "Tamil Nadu Lignite Extraction", value: "25.1 MT", change: "NLC India Neyveli Basin + 34.2 MT Coastal Coal Inflow" },
    kpiCards: [
      { label: "Lignite Extraction", value: "25.1 MT", sub: "NLC India Neyveli Mines", trend: "+3.8% YoY Expansion" },
      { label: "Lignite Reserves", value: "30.2 BT", sub: "80% of India's Total Lignite", trend: "Neyveli & Jayamkondam" },
      { label: "Coastal Coal Inflow", value: "34.2 MT", sub: "Paradip to Ennore/Tuticorin", trend: "Sea Evacuation Corridor" },
      { label: "NLC Pithead Power", value: "3,640 MW", sub: "Thermal Power Station I & II", trend: "Southern Grid Baseload" },
      { label: "Bucket Wheel Excavators", value: "14 Giant Units", sub: "Continuous Surface Mining", trend: "German Technology" },
      { label: "Reclaimed Land", value: "2,420 Hectares", sub: "Afforested Opencast Voids", trend: "National Award Winner" },
    ],
    detailedSections: [
      {
        title: "1. Neyveli Lignite Basin Geology & Continuous Mining Technology",
        badge: "NLC Navratna",
        content: "Lignite deposits occur in the Tertiary Cuddalore Sandstone Formation in Cuddalore and Ariyalur districts:",
        points: [
          "Mining Technology: NLC operates specialized German-engineered Bucket Wheel Excavators (BWE), spreaders, and 2,400mm high-speed overland conveyor belts.",
          "Quality Parameters: GCV 2,600 to 3,100 kcal/kg, moisture 48-52%, ash 4-8%, sulfur <1.0%.",
          "Water Management: Ground water control via pressure relief well pumping of 32,000 GPM used for regional drinking and irrigation."
        ]
      },
      {
        title: "2. Paradip-Ennore Coastal Shipping Expressway",
        badge: "Coastal Evacuation",
        content: "MCL Talcher coal hauled by rail to Paradip port was loaded onto 55,000 DWT geared vessels, reaching Kamarajar (Ennore) and V.O. Chidambaranar (Tuticorin) ports in 48 hours."
      }
    ],
    sources: [
      { id: 1, name: "Coal_Directory_2024_25.pdf", page: 58 },
      { id: 2, name: "Production_Statistics_FY24.xlsx", sheet: "State Summary", row: 27 },
      { id: 3, name: "Annual_Report_MCL_2024_25.pdf", page: 51 },
    ],
    derivation: [
      "Query parsed: State mining profile [Tamil Nadu, FY 2024-25]",
      "Extracted NLC India statutory lignite extraction: 25.1 MT",
      "Corroborated coastal coal shipping receipts for TANGEDCO: 34.2 MT",
      "Cross-validated across 3 sources (Coal Directory Table 8.4, Master Sheet Row 27, MCL Annual Report p.51)",
      "Synthesized state lignite dossier"
    ],
    traceItem: {
      documentName: "Coal_Directory_2024_25.pdf",
      sourceAuthority: "Ministry of Coal / NLC India Corporate Statistics",
      page: 58,
      sectionOrTable: "Table 8.4: State-wise Summary of Raw Coal & Lignite Production",
      rowOrField: "Row: State of Tamil Nadu (NLC India Neyveli Mines)",
      extractedValue: "25.1 MT",
      metricLabel: "Lignite Extraction — Tamil Nadu (FY 2024-25)",
      confidence: 98.6,
      snippetText: "TAMIL NADU LIGNITE SUMMARY: NLC India extracted 25.1 MT of lignite across Neyveli mines in FY 2024-25, providing baseload energy across Tamil Nadu and neighbouring southern states.",
      crossValidatedSources: [
        { name: "Production_Statistics_FY24.xlsx", pageOrRow: "Sheet: State Summary, Row 27" },
      ],
      auditId: "AUD-2026-TN-05",
    },
  },
  safety: {
    query: "Summarize safety-related findings from the latest reports",
    answer: "Safety incident data compiled from DGMS statutory filings and subsidiary annual reports for FY 2024-25 indicates an ongoing downward trend in mining casualties. Fatal accidents decreased from 37 (FY 2023-24) to 29 (FY 2024-25), achieving a 21.6% reduction. Serious injuries declined by 19.1% from 89 to 72 cases, while reportable minor incidents dropped from 298 to 241. Legacy underground operations in BCCL (Jharia) and ECL (Raniganj) represent 58% of serious incidents, primarily related to roof falls, strata control, and ventilation. Zero fatal accidents were recorded in Barkakana Area and Kusmunda OCP.",
    insight: { label: "Fatal accident reduction", value: "-21.6%", change: "From 37 to 29 fatalities (FY24 → FY25)" },
    kpiCards: [
      { label: "Fatal Accident Drop", value: "-21.6%", sub: "Down from 37 to 29 fatalities", trend: "Record Safety Benchmark" },
      { label: "Serious Injuries", value: "72 Cases", sub: "19.1% decline YoY", trend: "Strata Control Implemented" },
      { label: "Zero-Fatality Areas", value: "6 Areas", sub: "Barkakana, Kusmunda, Piparwar", trend: "ISO 45001 Certified" },
      { label: "Gas Detection IoT", value: "100% Coverage", sub: "Real-time CH4 & CO telemetry", trend: "All UG Mines Monitored" },
    ],
    detailedSections: [
      {
        title: "1. DGMS Annual Audit & Severity Index",
        badge: "DGMS Statutory",
        content: "Statutory inspections conducted by the Directorate General of Mines Safety (DGMS) across 318 active coal mines confirmed compliance with the Mines Act 1952 and Coal Mines Regulations 2017.",
        points: [
          "Fatality rate per Million Tonnes of coal produced improved to 0.027 in FY25 (down from 0.037 in FY24).",
          "Fatality rate per 1,000 persons employed declined to 0.11, the lowest ever recorded in Coal India's operating history.",
          "Roof-bolting density in underground bord-and-pillar workings increased to 1.2 bolts/m² with resin-grouted anchors."
        ]
      },
      {
        title: "2. Mechanization & High-Risk Mitigation",
        badge: "Safety Engineering",
        content: "Proactive engineering controls significantly curtailed traditional exposure risks:",
        points: [
          "Deployment of remote-controlled Continuous Miners in BCCL and ECL reduced in-seam worker presence in unsupported active zones.",
          "Electronic proximity detection systems installed on 100% of Heavy Earth Moving Machinery (HEMM) dumpers and shovels in mega open-cast pits.",
          "Surface subsidence monitoring via InSAR satellite interferometry across Jharia and Raniganj coalfields."
        ]
      }
    ],
    sources: [
      { id: 1, name: "Safety_Reports_2025_Compilation.pdf", page: 12 },
      { id: 2, name: "Annual_Report_MCL_2024_25.pdf", page: 87 },
      { id: 3, name: "Coal_Directory_2024_25.pdf", page: 218 },
    ],
    derivation: [
      "Query parsed: Safety report summarization across subsidiaries",
      "Retrieved DGMS statutory accident registries & internal safety reviews",
      "Compared fatal, serious, and minor incident totals (FY 2023-24 vs FY 2024-25)",
      "Cross-validated across 3 sources (DGMS Compilation, MCL Safety Section, CIL Directory)",
      "Calculated reductions: Fatal (-21.6%), Serious (-19.1%), Minor (-19.1%)",
      "Synthesized executive safety summary"
    ],
    traceItem: {
      documentName: "Safety_Reports_2025_Compilation.pdf",
      sourceAuthority: "Directorate General of Mines Safety (DGMS) / CMPDI",
      page: 12,
      sectionOrTable: "Table S-1: Annual Analysis of Mining Accidents and Severity Rates",
      rowOrField: "Row: Coal India Limited Fatal Accidents (FY 2024-25)",
      extractedValue: "29 Fatalities (-21.6%)",
      metricLabel: "Fatal Accident Rate FY 2024-25",
      confidence: 97.9,
      snippetText: "SECTION S-1: SAFETY PERFORMANCE AUDIT — COAL INDIA LIMITED\nStatutory incident registers reflect a 21.6% decrease in fatal accidents, from 37 fatalities in FY 2023-24 to 29 in FY 2024-25. Serious reportable injuries fell from 89 to 72 cases. Open-cast mechanization and real-time gas monitoring contributed to reduced strata-related incidents.",
      crossValidatedSources: [
        { name: "Annual_Report_MCL_2024_25.pdf", pageOrRow: "Page 87, Safety & Occupational Health" },
        { name: "Coal_Directory_2024_25.pdf", pageOrRow: "Page 218, DGMS Compliance Review" },
      ],
      auditId: "AUD-2026-SFT-12",
    },
  },
  parliamentary: {
    query: "Prepare a response for a parliamentary query on coal production",
    answer: "OFFICIAL PARLIAMENTARY STATEMENT (MINISTRY OF COAL):\nDuring FY 2024-25, total raw coal production by Coal India Limited was 1,047.52 Million Tonnes (MT), compared to 997.83 MT in FY 2023-24, representing an absolute increase of 49.69 MT and a growth rate of 4.98%. Open-cast operations contributed 1,015.54 MT (96.96%), while underground operations accounted for 31.98 MT (3.04%). Mahanadi Coalfields Limited (MCL) recorded the highest production at 198.4 MT, followed by South Eastern Coalfields Limited (SECL) at 184.2 MT. Total national CIL production target of 1,012.19 MT was exceeded by 35.33 MT, achieving 103.5% fulfillment.",
    insight: { label: "Parliamentary Response Validated", value: "1,047.52 MT", change: "103.5% target achievement (49.69 MT YoY growth)" },
    kpiCards: [
      { label: "Total National Output", value: "1,047.52 MT", sub: "Lok Sabha Q.No. 2847 Certified", trend: "+4.98% YoY Growth" },
      { label: "Target Achievement", value: "103.5%", sub: "35.33 MT above 1,012.19 MT target", trend: "Exceeded Target" },
      { label: "Open Cast Volume", value: "1,015.54 MT", sub: "96.96% of aggregate output", trend: "Mechanized Haulage" },
      { label: "Underground Volume", value: "31.98 MT", sub: "3.04% of aggregate output", trend: "Strategic Core" },
    ],
    detailedSections: [
      {
        title: "1. Formal Parliamentary Statement Structure",
        badge: "Lok Sabha Certified",
        content: "Prepared in accordance with Cabinet Secretariat standards for Lok Sabha / Rajya Sabha Starred & Unstarred parliamentary query submissions under Ministry of Coal jurisdiction.",
        points: [
          "(a) Actual Coal Production: Total raw coal production by Coal India Limited during FY 2024-25 reached 1,047.52 MT compared to 997.83 MT during FY 2023-24.",
          "(b) Subsidiary Breakdown: MCL (198.4 MT), SECL (184.2 MT), NCL (152.7 MT), CCL (134.1 MT), ECL (118.6 MT), WCL (92.3 MT), BCCL (78.8 MT), NEC (0.42 MT).",
          "(c) Thermal Power Offtake: Dispatches to national power sector achieved 814.2 MT, guaranteeing an average coal stock of 24 days across all domestic thermal power stations."
        ]
      }
    ],
    sources: [
      { id: 1, name: "Coal_Directory_2024_25.pdf", page: 42 },
      { id: 2, name: "Annual_Report_MCL_2024_25.pdf", page: 22 },
      { id: 3, name: "Production_Statistics_FY24.xlsx", sheet: "Subsidiary Summary", row: 8 },
    ],
    derivation: [
      "Parliamentary query parsed: Official Lok Sabha / Rajya Sabha response preparation",
      "Retrieved audited production data from Ministry of Coal & CIL Corporate Planning",
      "Computed target achievement: (1,047.52 MT / 1,012.19 MT) * 100 = 103.5%",
      "Cross-validated across 3 sources (Coal Directory p.42, MCL Annual p.22, Master Sheet row 8)",
      "Applied standardized Ministry of Coal Parliamentary format",
      "Formal response drafted and audited under ID: AUD-2026-PQ-2847"
    ],
    traceItem: {
      documentName: "Coal_Directory_2024_25.pdf",
      sourceAuthority: "Ministry of Coal / CIL Parliamentary Affairs Cell",
      page: 42,
      sectionOrTable: "Table 6.2: Official Parliamentary Production Statement (Lok Sabha/Rajya Sabha)",
      rowOrField: "Row: Total Raw Coal Production (Coal India Ltd)",
      extractedValue: "1,047.52 MT (Growth: +4.98%)",
      metricLabel: "Parliamentary Query Q.No. 2847 Production Response",
      confidence: 99.4,
      snippetText: "PARLIAMENTARY QUERY CELL — LOK SABHA UNSTARRED QUESTION NO. 2847\n(a) & (b): The total raw coal produced by Coal India Limited during the financial year 2024-25 stood at 1,047.52 MT as against 997.83 MT during FY 2023-24, registering an increase of 4.98%. Open-cast mining contributed 1,015.54 MT and underground mining contributed 31.98 MT. Target achievement stood at 103.5%.",
      crossValidatedSources: [
        { name: "Annual_Report_MCL_2024_25.pdf", pageOrRow: "Page 22, Parliamentary Review" },
        { name: "Production_Statistics_FY24.xlsx", pageOrRow: "Sheet: Subsidiary Summary, Row 8" },
      ],
      auditId: "AUD-2026-PQ-2847",
    },
  },
  barkakana: {
    query: "Show coal production for Barkakana during 2024 and compare it with 2023",
    answer: "Barkakana Area (under Central Coalfields Limited) recorded 18.42 MT of coal production in FY 2024-25, compared with 16.87 MT in FY 2023-24, representing a 9.2% year-on-year increase (1.55 MT addition). Open-cast production dominated at 94.8% (17.46 MT), with underground contributing 5.2% (0.96 MT). Dispatch efficiency reached 98.4% against a target of 97%.",
    insight: { label: "Barkakana year-on-year growth", value: "+9.2%", change: "1.55 MT increase (16.87 MT → 18.42 MT)" },
    sources: [
      { id: 1, name: "Barkakana_Annual_Report_2024.pdf", page: 42 },
      { id: 2, name: "Production_Statistics_FY24.xlsx", sheet: "Area Summary", row: 184 },
      { id: 3, name: "Coal_Directory_2024_25.pdf", page: 67 },
    ],
    derivation: ["Query parsed", "Barkakana area records identified", "Cross-document validation (3 sources)", "Figures reconciled", "Answer synthesized"],
    traceItem: {
      documentName: "Barkakana_Annual_Report_2024.pdf",
      sourceAuthority: "Central Coalfields Limited (CCL)",
      page: 42,
      sectionOrTable: "Table 3.2: Barkakana Area Operational Performance",
      rowOrField: "Row: Total Area Raw Coal Production",
      extractedValue: "18.42 MT",
      metricLabel: "Barkakana Area Coal Production FY 2024-25",
      confidence: 98.1,
      snippetText: "TABLE 3.2: BARKAKANA AREA ANNUAL PRODUCTION\nTotal coal production in Barkakana Area achieved 18.42 MT during FY 2024-25 against 16.87 MT in the preceding fiscal year, marking an expansion of 9.2%. Dispatches reached 18.14 MT.",
      crossValidatedSources: [
        { name: "Production_Statistics_FY24.xlsx", pageOrRow: "Sheet: Area Summary, Row 184" },
        { name: "Coal_Directory_2024_25.pdf", pageOrRow: "Page 67, Chapter 6" },
      ],
      auditId: "AUD-2026-BRK-08",
    },
  },
  subsidiaries: {
    query: "Compare production across subsidiaries",
    answer: "In FY 2024-25, Mahanadi Coalfields Limited (MCL) led all CIL subsidiaries with 198.4 MT production, followed by South Eastern Coalfields Limited (SECL) at 184.2 MT and Northern Coalfields Limited (NCL) at 152.7 MT. Central Coalfields Limited (CCL) recorded 134.1 MT. Eastern Coalfields Limited (ECL) produced 118.6 MT, Western Coalfields Limited (WCL) 92.3 MT, and Bharat Coking Coal Limited (BCCL) 78.8 MT. Combined CIL production reached 1,047.52 MT against a target of 1,012.19 MT — 103.5% achievement.",
    insight: { label: "Target achievement", value: "103.5%", change: "35.33 MT above target" },
    sources: [
      { id: 1, name: "Coal_Directory_2024_25.pdf", page: 38 },
      { id: 2, name: "Annual_Report_MCL_2024_25.pdf", page: 22 },
      { id: 3, name: "Production_Statistics_FY24.xlsx", sheet: "Subsidiary Summary", row: 8 },
    ],
    derivation: ["Query parsed", "Subsidiary-wise records retrieved", "Production targets fetched", "Achievement calculated", "Answer synthesized"],
    traceItem: {
      documentName: "Coal_Directory_2024_25.pdf",
      sourceAuthority: "Coal India Limited Corporate HQ, Kolkata",
      page: 38,
      sectionOrTable: "Table 5.1: Subsidiary Production vs Operational Targets",
      rowOrField: "Row: Aggregate All CIL Subsidiaries",
      extractedValue: "1,047.52 MT",
      metricLabel: "Total CIL Subsidiary Production FY 2024-25",
      confidence: 99.2,
      snippetText: "TABLE 5.1: SUBSIDIARY PRODUCTION PERFORMANCE FY 2024-25\nSubsidiary rankings: MCL 198.4 MT, SECL 184.2 MT, NCL 152.7 MT, CCL 134.1 MT, ECL 118.6 MT, WCL 92.3 MT, BCCL 78.8 MT. Total Coal India output: 1,047.52 MT (103.5% target achievement).",
      crossValidatedSources: [
        { name: "Annual_Report_MCL_2024_25.pdf", pageOrRow: "Page 22, Subsidiary Summary" },
        { name: "Production_Statistics_FY24.xlsx", pageOrRow: "Sheet: Subsidiary Summary, Row 8" },
      ],
      auditId: "AUD-2026-SUB-11",
    },
  },
  underground: {
    query: "Show underground vs open-cast production",
    answer: "In FY 2024-25, open-cast mining contributed 1,015.54 MT (96.96%) of total CIL production, while underground mines accounted for 31.98 MT (3.04%). The dominance of open-cast operations reflects the ongoing shift in extraction methodology over the past two decades. Underground production has remained relatively stable between 22-32 MT from FY 2020-21 to 2024-25, concentrated mainly in BCCL (Jharia coalfields) and ECL (Raniganj coalfields) which have legacy underground operations.",
    insight: { label: "Open-cast share of production", value: "96.96%", change: "1,015.54 MT open-cast vs 31.98 MT underground" },
    sources: [
      { id: 1, name: "Coal_Directory_2024_25.pdf", page: 45 },
      { id: 2, name: "Production_Statistics_FY24.xlsx", sheet: "Mining Method", row: 12 },
    ],
    derivation: ["Query parsed", "Mining method records retrieved", "Historical comparison computed", "Answer synthesized"],
    traceItem: {
      documentName: "Coal_Directory_2024_25.pdf",
      sourceAuthority: "Ministry of Coal / CIL",
      page: 45,
      sectionOrTable: "Table 6.4: Method-wise Production Breakdown (OC vs UG)",
      rowOrField: "Row: All-India Open-Cast & Underground Aggregate",
      extractedValue: "OC: 1,015.54 MT (96.96%) | UG: 31.98 MT (3.04%)",
      metricLabel: "Mining Method Distribution FY 2024-25",
      confidence: 98.8,
      snippetText: "TABLE 6.4: METHOD-WISE PRODUCTION BREAKDOWN\nTotal production of 1,047.52 MT is partitioned into 1,015.54 MT (96.96%) from open-cast mines and 31.98 MT (3.04%) from underground mines.",
      crossValidatedSources: [
        { name: "Production_Statistics_FY24.xlsx", pageOrRow: "Sheet: Mining Method, Row 12" },
      ],
      auditId: "AUD-2026-MTH-05",
    },
  },
};

export const resolveStateQuery = (rawQuery: string): SearchResponse | null => {
  const q = rawQuery.toLowerCase().trim();

  // 1. Direct State & Subsidiary Mapping
  if (q.includes('odisha') || q.includes('orissa') || q.includes('talcher') || q.includes('ib valley') || q.includes('sambalpur') || (q.includes('mcl') && !q.includes('subsidi'))) {
    return { ...searchResponses.odisha, query: rawQuery };
  }
  if (q.includes('chhattisgarh') || q.includes('chattisgarh') || q.includes('gevra') || q.includes('kusmunda') || q.includes('dipka') || q.includes('korba') || q.includes('secl') || q.includes('bilaspur') || q.includes('raigarh')) {
    return { ...searchResponses.chhattisgarh, query: rawQuery };
  }
  if (q.includes('jharkhand') || q.includes('bccl') || q.includes('ccl') || q.includes('jharia') || q.includes('dhanbad') || q.includes('bokaro') || q.includes('ranchi') || q.includes('barkakana')) {
    return { ...searchResponses.jharkhand, query: rawQuery };
  }
  if (q.includes('madhya pradesh') || q.includes('madhyapradesh') || q.includes(' singrauli') || q.includes('umaria') || q.includes('shahdol') || q.includes('sohagpur') || (q.includes('ncl') && !q.includes('subsidi'))) {
    return { ...searchResponses.madhyapradesh, query: rawQuery };
  }
  if (q.includes('west bengal') || q.includes('westbengal') || q.includes('bengal') || q.includes('raniganj') || q.includes('asansol') || q.includes('bardhaman') || (q.includes('ecl') && !q.includes('subsidi'))) {
    return { ...searchResponses.westbengal, query: rawQuery };
  }
  if (q.includes('maharashtra') || q.includes('chandrapur') || q.includes('wardha') || q.includes('umrer') || (q.includes('wcl') && !q.includes('subsidi'))) {
    return { ...searchResponses.maharashtra, query: rawQuery };
  }
  if (q.includes('telangana') || q.includes('singareni') || q.includes('sccl') || q.includes('godavari valley') || q.includes('kothagudem') || q.includes('ramagundam')) {
    return { ...searchResponses.telangana, query: rawQuery };
  }
  if (q.includes('assam') || q.includes('north east') || q.includes('northeastern') || q.includes('nec') || q.includes('makum') || q.includes('margherita') || q.includes('tikak') || q.includes('tipong')) {
    return { ...searchResponses.assam, query: rawQuery };
  }
  if (q.includes('andhra pradesh') || q.includes('andhra') || q.includes('apgenco') || q.includes('rayalaseema') || q.includes('krishnapatnam') || q.includes('chintalapudi')) {
    return { ...searchResponses.andhrapradesh, query: rawQuery };
  }
  if (q.includes('gujarat') || q.includes('gmdc') || q.includes('panandhro') || q.includes('rajpardi') || q.includes('bhavnagar') || q.includes('tadkeshwar') || q.includes('kutch lignite')) {
    return { ...searchResponses.gujarat, query: rawQuery };
  }
  if (q.includes('rajasthan') || q.includes('rsmml') || q.includes('barsingsar') || q.includes('giral') || q.includes('kapurdi') || q.includes('jalipa') || q.includes('pekb') || q.includes('suratgarh')) {
    return { ...searchResponses.rajasthan, query: rawQuery };
  }
  if (q.includes('bihar') || q.includes('pirpainti') || q.includes('mandar hill') || q.includes('kahalgaon') || q.includes('barh')) {
    return { ...searchResponses.bihar, query: rawQuery };
  }
  if (q.includes('uttar pradesh') || q.includes('uttarpradesh') || q.includes('sonbhadra') || q.includes('anpara') || q.includes('obra')) {
    return { ...searchResponses.uttarpradesh, query: rawQuery };
  }
  if (q.includes('tamil nadu') || q.includes('tamilnadu') || q.includes('neyveli') || q.includes('nlc') || q.includes('tuticorin') || q.includes('mettur')) {
    return { ...searchResponses.tamilnadu, query: rawQuery };
  }

  // 2. Secondary & Consuming States / Union Territories
  const otherStates: Record<string, {
    name: string;
    consumption: string;
    plants: string;
    rakes: string;
    reserves: string;
    sourceSubs: string;
    highlight: string;
  }> = {
    punjab: {
      name: "Punjab",
      consumption: "28.4 MT",
      plants: "Guru Hargobind Lehra Mohabbat (920 MW), Guru Gobind Singh Ropar (840 MW), Talwandi Sabo (1,980 MW)",
      rakes: "24 Rakes/Day",
      reserves: "0.0 BT (Non-Coal Bearing Province)",
      sourceSubs: "CCL (North Karanpura) & NCL (Singrauli)",
      highlight: "Dedicated Northern Railway grain/coal corridor maintaining 21-day strategic power buffer."
    },
    haryana: {
      name: "Haryana",
      consumption: "24.8 MT",
      plants: "Panipat TPS (710 MW), Rajiv Gandhi Khedar (1,200 MW), DCRTPS Yamunanagar (600 MW)",
      rakes: "21 Rakes/Day",
      reserves: "0.0 BT (Consuming State)",
      sourceSubs: "CCL & NCL via Northern Railway",
      highlight: "Over 94% baseload thermal capacity energized through long-term CIL SHAKTI linkages."
    },
    karnataka: {
      name: "Karnataka",
      consumption: "31.6 MT",
      plants: "Raichur TPS (1,720 MW), Bellary TPS (1,700 MW), NTPC Kudgi Super Thermal (2,400 MW)",
      rakes: "26 Rakes/Day (Rail + Coastal Sea)",
      reserves: "0.1 BT (Explored Southern Margin)",
      sourceSubs: "MCL (Talcher via Paradip) & SCCL (Singareni)",
      highlight: "Multi-modal logistics combining coastal shipping through Goa/Mangalore ports and South Western Railway."
    },
    kerala: {
      name: "Kerala",
      consumption: "4.8 MT",
      plants: "NTPC Kayamkulam Combined Cycle & Interstate Grid Quota Linkages",
      rakes: "6 Rakes/Day (Coastal Fuel Sea Link)",
      reserves: "0.0 BT (Southern Ecological Zone)",
      sourceSubs: "SCCL & MCL Coastal Dispatches",
      highlight: "Peak summer power demand stabilized through long-term interstate CIL coal allocations."
    },
    delhi: {
      name: "Delhi NCR",
      consumption: "14.2 MT",
      plants: "NTPC Dadri Super Thermal (1,820 MW), Indira Gandhi Super Thermal Jhajjar (1,500 MW)",
      rakes: "14 Rakes/Day",
      reserves: "0.0 BT (Capital Territory)",
      sourceSubs: "NCL (Singrauli) & CCL (Jharkhand)",
      highlight: "Strict DGMS and CPCB flue-gas desulfurization (FGD) compliant fuel supplies for the capital grid."
    },
    meghalaya: {
      name: "Meghalaya",
      consumption: "2.1 MT",
      plants: "Regional Industrial Kilns, Cement Grinding Units & Captive Boilers",
      rakes: "Truck Conveyance & Local Railheads",
      reserves: "0.58 BT (Tertiary Eocene Coal)",
      sourceSubs: "Garo, Khasi & Jaintia Hills Coal Formations",
      highlight: "Transitioning to statutory scientific rat-hole mining alternatives under DGMS & Supreme Court guidelines."
    },
    goa: {
      name: "Goa",
      consumption: "12.8 MT (Transit Cargo)",
      plants: "Mormugao Port Trust (MPT) Bulk Coal Handling Hub for Karnataka Hinterland",
      rakes: "18 Rakes/Day",
      reserves: "0.0 BT (Coastal Logistics Hub)",
      sourceSubs: "Imported & Domestic Coastal Transshipment",
      highlight: "Covered mechanized conveyor systems preventing dust dispersion during coastal rail evacuation."
    }
  };

  for (const [key, st] of Object.entries(otherStates)) {
    if (q.includes(key)) {
      return {
        query: rawQuery,
        answer: `State profile for ${st.name}: Total annual coal allocation and receipts reached ${st.consumption} in FY 2024-25, serving major power utilities including ${st.plants}. While ${st.name} holds ${st.reserves}, it operates as a vital pillar of the national energy grid, energized by dedicated freight linkages from ${st.sourceSubs}. Dispatches averaged ${st.rakes}, with ${st.highlight}`,
        insight: {
          label: `${st.name} Coal Inflow & Linkage`,
          value: st.consumption,
          change: `Powered by ${st.sourceSubs} (${st.rakes})`
        },
        kpiCards: [
          { label: "Annual Consumption", value: st.consumption, sub: "State Gencos & IPPs", trend: "+4.2% YoY Inflow" },
          { label: "Geological Reserves", value: st.reserves, sub: "GSI / CMPDI Resource Status", trend: "National Inventory" },
          { label: "Freight Inflow", value: st.rakes, sub: "Dedicated Railway Rakes", trend: "High Priority" },
          { label: "Primary Sources", value: st.sourceSubs.split('&')[0].trim(), sub: "CIL Fuel Supply Agreements", trend: "SHAKTI Scheme" },
          { label: "Power Generation", value: "Operating Baseload", sub: st.plants.slice(0, 24) + '...', trend: "Grid Anchor" },
          { label: "Stock Buffer", value: "18.4 Days", sub: "Central Electricity Authority Standard", trend: "Safe Zone" }
        ],
        detailedSections: [
          {
            title: `1. Energy Security & Utility Linkages (${st.name})`,
            badge: "Power Linkage",
            content: `Under the Ministry of Coal's SHAKTI policy, ${st.name} is granted assured domestic fuel linkages:`,
            points: [
              `Operating power stations: ${st.plants}.`,
              `Dispatches executed by ${st.sourceSubs} under long-term Fuel Supply Agreements (FSAs).`,
              `Indian Railways maintained an average of ${st.rakes} delivering consistent coal supplies without plant shutdown.`
            ]
          },
          {
            title: "2. Environmental & DGMS Monitoring Standards",
            badge: "Compliance",
            content: `All receiving power stations and handling railheads in ${st.name} operate in strict compliance with DGMS strata/safety protocols, continuous ambient air quality monitoring (CAAQM), and CEA coal stock benchmark directives.`
          }
        ],
        sources: [
          { id: 1, name: "Coal_Directory_2024_25.pdf", page: 58 },
          { id: 2, name: "Production_Statistics_FY24.xlsx", sheet: "State Summary", row: 28 },
          { id: 3, name: "Safety_Reports_2025_Compilation.pdf", page: 59 },
        ],
        derivation: [
          `Query parsed: State energy analysis [${st.name}, FY 2024-25]`,
          `Extracted CIL dispatches to state utilities: ${st.consumption}`,
          `Cross-validated across 3 sources (Coal Directory Table 8.4, Master Sheet Row 28, Safety Compilation)`,
          "Synthesized state-level intelligence dossier"
        ],
        traceItem: {
          documentName: "Coal_Directory_2024_25.pdf",
          sourceAuthority: "Ministry of Coal / Central Electricity Authority",
          page: 58,
          sectionOrTable: "Table 8.4: State-wise Summary of Coal Offtake, Reserves & Linkages",
          rowOrField: `Row: State of ${st.name} (Utility Allocation)`,
          extractedValue: st.consumption,
          metricLabel: `Coal Allocation — ${st.name} (FY 2024-25)`,
          confidence: 98.0,
          snippetText: `STATE SUMMARY (${st.name}): Annual coal deliveries reached ${st.consumption} in FY 2024-25 from ${st.sourceSubs}, energizing regional power plants with zero supply disruptions.`,
          crossValidatedSources: [
            { name: "Production_Statistics_FY24.xlsx", pageOrRow: "Sheet: State Summary, Row 28" },
          ],
          auditId: `AUD-2026-${st.name.slice(0, 3).toUpperCase()}-01`,
        }
      };
    }
  }

  return null;
};

export const knowledgeGraphData = {
  mines: [
    {
      name: "KORBA",
      subsidiary: "SECL",
      state: "Chhattisgarh",
      production: 48.2,
      type: "Open Cast",
      children: ["Production Reports", "Safety Reports", "Geological Survey", "Annual Reports", "Environmental Records"],
      documents: 184,
    },
    {
      name: "SINGRAULI",
      subsidiary: "NCL",
      state: "Madhya Pradesh",
      production: 92.4,
      type: "Open Cast",
      children: ["Production Reports", "Mine Plan", "Safety Records", "Annual Reports"],
      documents: 142,
    },
    {
      name: "BARKAKANA",
      subsidiary: "CCL",
      state: "Jharkhand",
      production: 18.4,
      type: "Mixed",
      children: ["Production Reports", "Safety Records", "Geological Assessment", "Annual Reports"],
      documents: 98,
    },
    {
      name: "TALCHER",
      subsidiary: "MCL",
      state: "Odisha",
      production: 74.8,
      type: "Open Cast",
      children: ["Production Reports", "Environmental Records", "Annual Reports", "Geological Survey"],
      documents: 156,
    },
    {
      name: "RANIGANJ",
      subsidiary: "ECL",
      state: "West Bengal",
      production: 42.6,
      type: "Underground + OC",
      children: ["Production Reports", "Safety Reports", "Historical Records", "Annual Reports", "Environmental Records"],
      documents: 212,
    },
    {
      name: "JHARIA",
      subsidiary: "BCCL",
      state: "Jharkhand",
      production: 28.4,
      type: "Underground",
      children: ["Safety Reports", "Production Records", "Fire Control Records", "Annual Reports"],
      documents: 178,
    },
    {
      name: "KOTHAGUDEM",
      subsidiary: "SCCL (Associated Entity)",
      state: "Telangana",
      production: 24.6,
      type: "Open Cast + UG",
      children: ["Production Reports", "Safety Reports", "Geological Survey", "Annual Reports"],
      documents: 116,
    },
  ],
};

// ─── Geological Intelligence Data ─────────────────────────────────────────

export const geoRegions = [
  { state: 'Chhattisgarh', districts: ['Korba', 'Raigarh', 'Surguja'], subsidiaries: ['SECL'] },
  { state: 'Jharkhand', districts: ['Dhanbad', 'Ramgarh', 'Bokaro', 'Ranchi'], subsidiaries: ['BCCL', 'CCL', 'ECL'] },
  { state: 'Odisha', districts: ['Angul', 'Jharsuguda', 'Sundargarh'], subsidiaries: ['MCL'] },
  { state: 'Madhya Pradesh', districts: ['Singrauli', 'Umaria', 'Shahdol'], subsidiaries: ['NCL', 'SECL'] },
  { state: 'West Bengal', districts: ['Paschim Bardhaman', 'Birbhum'], subsidiaries: ['ECL'] },
  { state: 'Maharashtra', districts: ['Chandrapur', 'Nagpur', 'Yavatmal'], subsidiaries: ['WCL'] },
  { state: 'Telangana', districts: ['Bhadradri Kothagudem', 'Mancherial'], subsidiaries: ['SCCL (Associated Entity)'] },
];

export type SeamStratigraphyItem = {
  name: string;
  thickness: string;
  depth: string;
  coalGrade: string;
  ashContent: string;
  moisture: string;
  explored: boolean;
};

export type GeoBlock = {
  id: string;
  name: string;
  subsidiary: string;
  state: string;
  district: string;
  mineArea: string;
  period: 'FY 2024-25' | 'FY 2023-24';
  coalfield: string;
  formation: string;
  resources: number; // Billion Tonnes total
  provedResources: number;
  indicatedResources: number;
  inferredResources: number;
  seams: number;
  primarySeamThickness: string;
  coalGrade: string;
  miningType: string;
  explorationBoreholes: number;
  areaCovered: number; // sq km
  lastSurvey: string;
  reports: number;
  status: 'Explored' | 'Under Exploration' | 'Partially Explored';
  notes: string;
  seamStratigraphy: SeamStratigraphyItem[];
  sourceTrace: {
    documentName: string;
    sourceAuthority: string;
    page: number;
    sectionOrTable: string;
    rowOrField: string;
    extractedValue: string;
    metricLabel: string;
    confidence: number;
    snippetText: string;
    crossValidatedSources?: Array<{ name: string; pageOrRow: string }>;
    auditId?: string;
  };
};

export const geoBlocks: GeoBlock[] = [
  {
    id: 'GEO-KOR-001',
    name: 'Korba Main Basin',
    subsidiary: 'SECL',
    state: 'Chhattisgarh',
    district: 'Korba',
    mineArea: 'Korba Area',
    period: 'FY 2024-25',
    coalfield: 'Korba Coalfield',
    formation: 'Barakar Formation (Lower Gondwana)',
    resources: 12.84,
    provedResources: 9.42,
    indicatedResources: 2.38,
    inferredResources: 1.04,
    seams: 8,
    primarySeamThickness: '4.2–8.4 m',
    coalGrade: 'G7–G10',
    miningType: 'Open Cast',
    explorationBoreholes: 284,
    areaCovered: 1840,
    lastSurvey: 'Mar 2024',
    reports: 27,
    status: 'Explored',
    notes: 'Primary production horizon is Seam IV (Kusmunda & Gevra extensions). Characterized by massive sandstone roof and low dip angles.',
    seamStratigraphy: [
      { name: 'Seam I', thickness: '1.8–2.4 m', depth: '45 m', coalGrade: 'G7', ashContent: '24.2%', moisture: '5.8%', explored: true },
      { name: 'Seam II', thickness: '2.1–3.2 m', depth: '78 m', coalGrade: 'G8', ashContent: '26.4%', moisture: '6.1%', explored: true },
      { name: 'Seam III', thickness: '3.0–4.5 m', depth: '112 m', coalGrade: 'G9', ashContent: '29.1%', moisture: '5.4%', explored: true },
      { name: 'Seam IV (Main)', thickness: '6.2–8.4 m', depth: '148 m', coalGrade: 'G7', ashContent: '23.8%', moisture: '6.8%', explored: true },
      { name: 'Seam V', thickness: '2.4–3.6 m', depth: '185 m', coalGrade: 'G10', ashContent: '32.5%', moisture: '5.2%', explored: true },
      { name: 'Seam VI', thickness: '1.6–2.8 m', depth: '210 m', coalGrade: 'G10', ashContent: '34.1%', moisture: '4.9%', explored: false },
    ],
    sourceTrace: {
      documentName: 'Geological_Assessment_Korba_Block.pdf',
      sourceAuthority: 'CMPDI Regional Institute V, Bilaspur',
      page: 24,
      sectionOrTable: 'Table 4.1: Regional Seam Correlation & In-situ Resource Estimation',
      rowOrField: 'Row: Korba Basin Total In-situ Reserves',
      extractedValue: '12.84 Billion Tonnes',
      metricLabel: 'Korba Basin Total Geological Resources',
      confidence: 97.4,
      snippetText: 'SECTION 4: GEOLOGICAL RESERVE EVALUATION — KORBA BASIN\nCMPDI geological assessment confirms total in-situ geological coal resources of 12.84 Billion Tonnes within the Barakar Formation of Korba Basin across 8 workable seams.',
      crossValidatedSources: [
        { name: 'SECL_Geological_Report_2024.pdf', pageOrRow: 'Page 8, Table G-2' },
        { name: 'Coal_Directory_2024_25.pdf', pageOrRow: 'Page 182, Seam Inventory' },
      ],
      auditId: 'AUD-GEO-KOR-01',
    },
  },
  {
    id: 'GEO-KUS-001B',
    name: 'Kusmunda Deep Block',
    subsidiary: 'SECL',
    state: 'Chhattisgarh',
    district: 'Korba',
    mineArea: 'Kusmunda',
    period: 'FY 2024-25',
    coalfield: 'Korba Coalfield',
    formation: 'Barakar Formation',
    resources: 6.45,
    provedResources: 5.12,
    indicatedResources: 1.05,
    inferredResources: 0.28,
    seams: 4,
    primarySeamThickness: '5.8–11.2 m',
    coalGrade: 'G9–G11',
    miningType: 'Open Cast',
    explorationBoreholes: 198,
    areaCovered: 640,
    lastSurvey: 'Dec 2024',
    reports: 16,
    status: 'Explored',
    notes: 'Kusmunda Upper and Lower seams merge in western quadrant. Designed for 50 MTPA high-capacity opencast mining.',
    seamStratigraphy: [
      { name: 'Kusmunda Upper', thickness: '5.8–8.2 m', depth: '62 m', coalGrade: 'G9', ashContent: '28.6%', moisture: '6.2%', explored: true },
      { name: 'Kusmunda Lower', thickness: '7.4–11.2 m', depth: '124 m', coalGrade: 'G10', ashContent: '31.4%', moisture: '5.9%', explored: true },
      { name: 'Bottom Rider', thickness: '1.4–2.2 m', depth: '168 m', coalGrade: 'G11', ashContent: '35.0%', moisture: '5.1%', explored: false },
    ],
    sourceTrace: {
      documentName: 'SECL_Geological_Report_2024.pdf',
      sourceAuthority: 'SECL Planning & Geology Directorate',
      page: 18,
      sectionOrTable: 'Table 2.3: Kusmunda Mine Geological Reserve Block Model',
      rowOrField: 'Row: Kusmunda Deep Block Total In-situ Coal',
      extractedValue: '6.45 Billion Tonnes',
      metricLabel: 'Kusmunda Block In-situ Coal Reserves',
      confidence: 98.2,
      snippetText: 'KUSMUNDA DEEP BLOCK EXPANSION MEMOIR\nResource estimation using 3D geological modeling calculates 6.45 Billion Tonnes in-situ geological reserves suitable for mechanized shovel-dumper extraction.',
      crossValidatedSources: [
        { name: 'Geological_Assessment_Korba_Block.pdf', pageOrRow: 'Page 34, Kusmunda Incline Section' },
      ],
      auditId: 'AUD-GEO-KUS-02',
    },
  },
  {
    id: 'GEO-SIN-002',
    name: 'Singrauli Basin (Jayant/Nigahi)',
    subsidiary: 'NCL',
    state: 'Madhya Pradesh',
    district: 'Singrauli',
    mineArea: 'Singrauli',
    period: 'FY 2024-25',
    coalfield: 'Singrauli Coalfield',
    formation: 'Barakar Formation & Raniganj Formation',
    resources: 18.62,
    provedResources: 14.80,
    indicatedResources: 2.92,
    inferredResources: 0.90,
    seams: 6,
    primarySeamThickness: '5.0–16.5 m',
    coalGrade: 'G5–G9',
    miningType: 'Open Cast',
    explorationBoreholes: 412,
    areaCovered: 2340,
    lastSurvey: 'Sep 2024',
    reports: 34,
    status: 'Explored',
    notes: 'Hosts the famous Purewa and Turra seams. Purewa Bottom seam measures up to 16.5m in Jayant block.',
    seamStratigraphy: [
      { name: 'Purewa Top', thickness: '4.5–7.8 m', depth: '35 m', coalGrade: 'G6', ashContent: '21.5%', moisture: '7.1%', explored: true },
      { name: 'Purewa Bottom', thickness: '8.2–16.5 m', depth: '82 m', coalGrade: 'G7', ashContent: '24.1%', moisture: '6.8%', explored: true },
      { name: 'Turra Seam', thickness: '12.0–15.4 m', depth: '142 m', coalGrade: 'G5', ashContent: '19.8%', moisture: '7.4%', explored: true },
      { name: 'Kota Seam', thickness: '2.1–3.4 m', depth: '195 m', coalGrade: 'G9', ashContent: '30.2%', moisture: '5.9%', explored: false },
    ],
    sourceTrace: {
      documentName: 'Coal_Directory_2024_25.pdf',
      sourceAuthority: 'CMPDI RI-VI, Singrauli / CIL',
      page: 142,
      sectionOrTable: 'Table 7.4: Singrauli Coalfield Stratigraphic Correlation & Reserves',
      rowOrField: 'Row: Singrauli Basin (MP Section) Total Coal Reserves',
      extractedValue: '18.62 Billion Tonnes',
      metricLabel: 'Singrauli Basin Geological Resources',
      confidence: 98.9,
      snippetText: 'CMPDI SINGRAULI FIELD MEMOIR\nSingrauli Coalfield reserves within Madhya Pradesh jurisdiction total 18.62 Billion Tonnes, predominantly within thick Purewa and Turra horizons.',
      crossValidatedSources: [
        { name: 'Production_Statistics_FY24.xlsx', pageOrRow: 'Sheet: NCL Reserves, Row 42' },
      ],
      auditId: 'AUD-GEO-SIN-03',
    },
  },
  {
    id: 'GEO-TAL-003',
    name: 'Talcher Coalfield',
    subsidiary: 'MCL',
    state: 'Odisha',
    district: 'Angul',
    mineArea: 'Talcher',
    period: 'FY 2024-25',
    coalfield: 'Talcher Coalfield',
    formation: 'Barakar & Karharbari Formations',
    resources: 52.28,
    provedResources: 38.40,
    indicatedResources: 10.15,
    inferredResources: 3.73,
    seams: 12,
    primarySeamThickness: '2.8–18.2 m',
    coalGrade: 'G9–G13',
    miningType: 'Open Cast',
    explorationBoreholes: 684,
    areaCovered: 5080,
    lastSurvey: 'Jan 2025',
    reports: 48,
    status: 'Explored',
    notes: 'Largest single coal resource repository in India. Seam II and III reach colossal thicknesses up to 18m.',
    seamStratigraphy: [
      { name: 'Seam I (Bottom)', thickness: '3.2–6.4 m', depth: '40 m', coalGrade: 'G9', ashContent: '29.2%', moisture: '8.4%', explored: true },
      { name: 'Seam II (Main)', thickness: '10.5–18.2 m', depth: '95 m', coalGrade: 'G11', ashContent: '34.8%', moisture: '7.9%', explored: true },
      { name: 'Seam III', thickness: '6.4–12.0 m', depth: '155 m', coalGrade: 'G12', ashContent: '38.1%', moisture: '7.2%', explored: true },
      { name: 'Seam IV-VIII', thickness: '2.0–5.5 m', depth: '210 m', coalGrade: 'G13', ashContent: '41.0%', moisture: '6.8%', explored: false },
    ],
    sourceTrace: {
      documentName: 'Annual_Report_MCL_2024_25.pdf',
      sourceAuthority: 'MCL / CMPDI RI-VII Bhubaneswar',
      page: 67,
      sectionOrTable: 'Table 4.8: Talcher Basin Proved and Indicated Geological Reserves',
      rowOrField: 'Row: Total Talcher Coalfield Geological Resources',
      extractedValue: '52.28 Billion Tonnes',
      metricLabel: 'Talcher Coalfield Total Resources',
      confidence: 99.3,
      snippetText: 'TALCHER BASIN GEOLOGICAL COMPILATION\nTalcher Coalfield holds 52.28 Billion Tonnes of power-grade thermal coal across 12 distinct seams, anchoring national energy supply for NTPC Super Thermal stations.',
      crossValidatedSources: [
        { name: 'Coal_Directory_2024_25.pdf', pageOrRow: 'Page 198, Odisha Coal Inventory' },
      ],
      auditId: 'AUD-GEO-TAL-04',
    },
  },
  {
    id: 'GEO-JHA-004',
    name: 'Jharia Coalfield',
    subsidiary: 'BCCL',
    state: 'Jharkhand',
    district: 'Dhanbad',
    mineArea: 'Jharia',
    period: 'FY 2024-25',
    coalfield: 'Jharia Coalfield',
    formation: 'Barakar & Raniganj Formations (Damuda Group)',
    resources: 19.40,
    provedResources: 15.20,
    indicatedResources: 3.10,
    inferredResources: 1.10,
    seams: 23,
    primarySeamThickness: '1.5–4.2 m',
    coalGrade: 'Coking Coal (Prime & Medium Coking)',
    miningType: 'Underground',
    explorationBoreholes: 520,
    areaCovered: 456,
    lastSurvey: 'Nov 2024',
    reports: 62,
    status: 'Explored',
    notes: 'Sole depository of prime metallurgical coking coal in India. Complex multi-seam underground workings with active fire control zones.',
    seamStratigraphy: [
      { name: 'Seam XVIII (Top)', thickness: '1.5–2.4 m', depth: '60 m', coalGrade: 'Medium Coking', ashContent: '18.4%', moisture: '1.8%', explored: true },
      { name: 'Seam XV/XVI (Prime)', thickness: '3.2–4.2 m', depth: '145 m', coalGrade: 'Prime Coking (Steel Grade I)', ashContent: '15.2%', moisture: '1.4%', explored: true },
      { name: 'Seam X/XI', thickness: '2.8–3.8 m', depth: '220 m', coalGrade: 'Prime Coking (Steel Grade II)', ashContent: '17.1%', moisture: '1.5%', explored: true },
      { name: 'Seam I–VIII (Bottom)', thickness: '1.8–3.2 m', depth: '310 m', coalGrade: 'Semi-Coking', ashContent: '21.0%', moisture: '1.9%', explored: false },
    ],
    sourceTrace: {
      documentName: 'Coal_Directory_2024_25.pdf',
      sourceAuthority: 'CMPDI RI-II, Dhanbad / BCCL',
      page: 118,
      sectionOrTable: 'Table 5.3: Jharia Coalfield Coking Coal Reserves by Seam',
      rowOrField: 'Row: Jharia Coalfield Total Prime & Medium Coking Resources',
      extractedValue: '19.40 Billion Tonnes',
      metricLabel: 'Jharia Prime Coking Coal Resources',
      confidence: 98.7,
      snippetText: 'CMPDI SPECIAL MEMOIR — JHARIA COKING COAL INVENTORY\nTotal geological resource in Jharia Coalfield stands at 19.40 Billion Tonnes, providing essential domestic metallurgical feedstocks for integrated steel plants.',
      crossValidatedSources: [
        { name: 'Safety_Reports_2025_Compilation.pdf', pageOrRow: 'Page 44, Strata Mechanics' },
      ],
      auditId: 'AUD-GEO-JHA-05',
    },
  },
  {
    id: 'GEO-RAN-005',
    name: 'Raniganj Coalfield',
    subsidiary: 'ECL',
    state: 'West Bengal',
    district: 'Paschim Bardhaman',
    mineArea: 'Raniganj',
    period: 'FY 2024-25',
    coalfield: 'Raniganj Coalfield',
    formation: 'Raniganj & Barakar Formations',
    resources: 16.87,
    provedResources: 12.40,
    indicatedResources: 3.15,
    inferredResources: 1.32,
    seams: 14,
    primarySeamThickness: '1.2–3.8 m',
    coalGrade: 'G8–G12',
    miningType: 'Underground + OC',
    explorationBoreholes: 380,
    areaCovered: 1530,
    lastSurvey: 'Aug 2024',
    reports: 41,
    status: 'Explored',
    notes: 'Birthplace of Indian commercial coal mining (1774). Contains superior non-coking coal with high volatile content.',
    seamStratigraphy: [
      { name: 'Dishergarh Seam', thickness: '3.2–3.8 m', depth: '85 m', coalGrade: 'G8', ashContent: '19.8%', moisture: '3.4%', explored: true },
      { name: 'Sanctoria Seam', thickness: '2.4–3.1 m', depth: '140 m', coalGrade: 'G9', ashContent: '22.1%', moisture: '3.8%', explored: true },
      { name: 'Poniati Seam', thickness: '1.8–2.6 m', depth: '205 m', coalGrade: 'G9', ashContent: '24.5%', moisture: '3.6%', explored: true },
      { name: 'Koithee Seam', thickness: '1.2–2.0 m', depth: '275 m', coalGrade: 'G11', ashContent: '28.9%', moisture: '3.1%', explored: false },
    ],
    sourceTrace: {
      documentName: 'Environmental_Compliance_ECL_2025.pdf',
      sourceAuthority: 'ECL / CMPDI RI-I Asansol',
      page: 18,
      sectionOrTable: 'Table 1.4: Raniganj Basin Geological Setting & Mine Boundaries',
      rowOrField: 'Row: Total In-situ Coal Resources (Raniganj Field)',
      extractedValue: '16.87 Billion Tonnes',
      metricLabel: 'Raniganj Coalfield Geological Resources',
      confidence: 97.8,
      snippetText: 'ECL STATUTORY REGIONAL MEMOIR\nRaniganj Coalfield possesses 16.87 Billion Tonnes of geological coal resources, characterized by the high volatile Dishergarh and Sanctoria measures.',
      crossValidatedSources: [
        { name: 'Coal_Directory_2024_25.pdf', pageOrRow: 'Page 76, Chapter 8' },
      ],
      auditId: 'AUD-GEO-RAN-06',
    },
  },
  {
    id: 'GEO-BAR-006',
    name: 'Barkakana Block',
    subsidiary: 'CCL',
    state: 'Jharkhand',
    district: 'Ramgarh',
    mineArea: 'Barkakana',
    period: 'FY 2024-25',
    coalfield: 'Bokaro Coalfield',
    formation: 'Barakar Formation',
    resources: 3.42,
    provedResources: 2.65,
    indicatedResources: 0.55,
    inferredResources: 0.22,
    seams: 5,
    primarySeamThickness: '2.4–5.8 m',
    coalGrade: 'G8–G11',
    miningType: 'Mixed (OC + UG)',
    explorationBoreholes: 142,
    areaCovered: 480,
    lastSurvey: 'Jun 2024',
    reports: 18,
    status: 'Partially Explored',
    notes: 'Katherine and Barkakana East inclines operate underground. Open-cast expansion project under environmental appraisal.',
    seamStratigraphy: [
      { name: 'Top Seam', thickness: '2.4–3.8 m', depth: '52 m', coalGrade: 'G8', ashContent: '25.4%', moisture: '5.2%', explored: true },
      { name: 'Middle Combined', thickness: '4.2–5.8 m', depth: '110 m', coalGrade: 'G9', ashContent: '28.1%', moisture: '4.8%', explored: true },
      { name: 'Bottom Seam', thickness: '1.8–2.6 m', depth: '175 m', coalGrade: 'G11', ashContent: '33.2%', moisture: '4.2%', explored: false },
    ],
    sourceTrace: {
      documentName: 'Barkakana_Annual_Report_2024.pdf',
      sourceAuthority: 'Central Coalfields Limited (CCL RI-III)',
      page: 42,
      sectionOrTable: 'Table 3.2: Barkakana Area Geological Assessment',
      rowOrField: 'Row: Barkakana Exploration Area Total Resources',
      extractedValue: '3.42 Billion Tonnes',
      metricLabel: 'Barkakana Block Coal Resources',
      confidence: 98.1,
      snippetText: 'BARKAKANA AREA EXPLORATION DOSSIER\nBarkakana Area records total geological resources of 3.42 Billion Tonnes with 142 exploratory boreholes completed.',
      crossValidatedSources: [
        { name: 'Production_Statistics_FY24.xlsx', pageOrRow: 'Sheet: Area Summary, Row 184' },
      ],
      auditId: 'AUD-GEO-BAR-07',
    },
  },
  {
    id: 'GEO-WAR-007',
    name: 'Wardha Valley Basin',
    subsidiary: 'WCL',
    state: 'Maharashtra',
    district: 'Chandrapur',
    mineArea: 'Chandrapur Area',
    period: 'FY 2024-25',
    coalfield: 'Wardha Valley Coalfield',
    formation: 'Barakar Formation (Gondwana Supergroup)',
    resources: 6.18,
    provedResources: 4.80,
    indicatedResources: 1.05,
    inferredResources: 0.33,
    seams: 3,
    primarySeamThickness: '4.8–11.5 m',
    coalGrade: 'G9–G12',
    miningType: 'Open Cast + UG',
    explorationBoreholes: 215,
    areaCovered: 890,
    lastSurvey: 'Oct 2024',
    reports: 22,
    status: 'Explored',
    notes: 'Single composite seam development (Composite Main Seam). Extensive opencast operations supplying Vidarbha thermal stations.',
    seamStratigraphy: [
      { name: 'Composite Main Seam', thickness: '8.5–11.5 m', depth: '75 m', coalGrade: 'G10', ashContent: '32.1%', moisture: '9.4%', explored: true },
      { name: 'Lower Seam', thickness: '2.1–3.4 m', depth: '150 m', coalGrade: 'G12', ashContent: '39.0%', moisture: '8.8%', explored: false },
    ],
    sourceTrace: {
      documentName: 'Coal_Directory_2024_25.pdf',
      sourceAuthority: 'WCL / CMPDI RI-IV Nagpur',
      page: 165,
      sectionOrTable: 'Table 6.8: Wardha Valley Coalfield Geological Resources',
      rowOrField: 'Row: Total Wardha Valley In-situ Reserves',
      extractedValue: '6.18 Billion Tonnes',
      metricLabel: 'Wardha Valley Coalfield Resources',
      confidence: 97.2,
      snippetText: 'WCL EXPLORATION REPORT — WARDHA VALLEY\nWardha Valley basin records 6.18 Billion Tonnes in-situ resources across Chandrapur and Ballarpur mining areas.',
      crossValidatedSources: [
        { name: 'Production_Statistics_FY24.xlsx', pageOrRow: 'Sheet: WCL Reserves, Row 19' },
      ],
      auditId: 'AUD-GEO-WAR-08',
    },
  },
  {
    id: 'GEO-SCC-008',
    name: 'Godavari Valley Coalfield',
    subsidiary: 'SCCL (Associated Entity)',
    state: 'Telangana',
    district: 'Bhadradri Kothagudem',
    mineArea: 'Kothagudem Area',
    period: 'FY 2024-25',
    coalfield: 'Godavari Valley Coalfield',
    formation: 'Barakar & Kamthi Formations',
    resources: 10.45,
    provedResources: 7.90,
    indicatedResources: 1.85,
    inferredResources: 0.70,
    seams: 7,
    primarySeamThickness: '3.2–6.8 m',
    coalGrade: 'G7–G11',
    miningType: 'Open Cast + UG',
    explorationBoreholes: 340,
    areaCovered: 1620,
    lastSurvey: 'Feb 2025',
    reports: 29,
    status: 'Explored',
    notes: 'Integrated Coal Intelligence Entity (Joint Venture: Govt of Telangana 51% & Govt of India 49%). Queen Seam is principal extraction target.',
    seamStratigraphy: [
      { name: 'Queen Seam', thickness: '4.8–6.8 m', depth: '92 m', coalGrade: 'G8', ashContent: '26.8%', moisture: '7.2%', explored: true },
      { name: 'King Seam', thickness: '3.2–5.1 m', depth: '165 m', coalGrade: 'G7', ashContent: '24.0%', moisture: '7.5%', explored: true },
      { name: 'Bottom Seams', thickness: '1.8–3.0 m', depth: '240 m', coalGrade: 'G11', ashContent: '33.4%', moisture: '6.9%', explored: false },
    ],
    sourceTrace: {
      documentName: 'Coal_Directory_2024_25.pdf',
      sourceAuthority: 'Singareni Collieries (SCCL) / Ministry of Coal',
      page: 290,
      sectionOrTable: 'Table 12.1: Associated Coal Entities — Godavari Valley Geological Resources',
      rowOrField: 'Row: SCCL Total In-situ Coal Resources',
      extractedValue: '10.45 Billion Tonnes',
      metricLabel: 'Godavari Valley Geological Resources (SCCL)',
      confidence: 98.4,
      snippetText: 'SECTION 12: ASSOCIATED COAL-SECTOR ENTITIES (SCCL)\nSingareni Collieries Company Limited (associated coal entity, 51% GoTS, 49% GoI) holds 10.45 Billion Tonnes in Godavari Valley Coalfield.',
      crossValidatedSources: [
        { name: 'Safety_Reports_2025_Compilation.pdf', pageOrRow: 'Page 88, Southern Mining Sector' },
      ],
      auditId: 'AUD-GEO-SCC-09',
    },
  },
  // Historical Period baseline for FY 2023-24 comparison
  {
    id: 'GEO-KOR-001-H',
    name: 'Korba Basin (Baseline FY24)',
    subsidiary: 'SECL',
    state: 'Chhattisgarh',
    district: 'Korba',
    mineArea: 'Korba Area',
    period: 'FY 2023-24',
    coalfield: 'Korba Coalfield',
    formation: 'Barakar Formation',
    resources: 12.61,
    provedResources: 9.15,
    indicatedResources: 2.42,
    inferredResources: 1.04,
    seams: 8,
    primarySeamThickness: '4.2–8.4 m',
    coalGrade: 'G7–G10',
    miningType: 'Open Cast',
    explorationBoreholes: 268,
    areaCovered: 1840,
    lastSurvey: 'Mar 2023',
    reports: 24,
    status: 'Explored',
    notes: 'FY 2023-24 baseline before Kusmunda deep drilling program.',
    seamStratigraphy: [
      { name: 'Seam IV (Main)', thickness: '6.2–8.4 m', depth: '148 m', coalGrade: 'G7', ashContent: '23.8%', moisture: '6.8%', explored: true },
    ],
    sourceTrace: {
      documentName: 'Production_Statistics_FY24.xlsx',
      sourceAuthority: 'CMPDI RI-V',
      page: 18,
      sectionOrTable: 'Historical Basin Summary',
      rowOrField: 'Row: Korba FY24 Baseline',
      extractedValue: '12.61 Billion Tonnes',
      metricLabel: 'Korba Geological Resources FY24',
      confidence: 96.5,
      snippetText: 'FY24 CMPDI Baseline for Korba Basin records 12.61 Billion Tonnes.',
      auditId: 'AUD-GEO-KOR-H',
    },
  },
];

export const totalGeologicalResources = 400.715; // Billion Tonnes — all India (Ministry of Coal official inventory)

