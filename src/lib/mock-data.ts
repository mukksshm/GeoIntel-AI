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
  sources: Array<{ id: number; name: string; page?: number; sheet?: string; row?: number }>;
  derivation: string[];
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
    answer: "Jharkhand operations encompass three Coal India entities: Central Coalfields Limited (CCL), Bharat Coking Coal Limited (BCCL), and Eastern Coalfields Limited (ECL partial). In FY 2024-25, total Jharkhand coal production reached 212.9 MT (~20.3% of national CIL output). CCL produced 134.1 MT (across Barkakana, Rajrappa, and North Karanpura), while BCCL recorded 78.8 MT from the prime coking coal seams of the Jharia coalfield. BCCL operates 82 mines, including 49 underground operations — representing the highest concentration of underground extraction in India.",
    insight: { label: "Jharkhand total production FY25", value: "212.9 MT", change: "20.3% of CIL total (CCL: 134.1 MT, BCCL: 78.8 MT)" },
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
  safety: {
    query: "Summarize safety-related findings from the latest reports",
    answer: "Safety incident data compiled from DGMS statutory filings and subsidiary annual reports for FY 2024-25 indicates an ongoing downward trend in mining casualties. Fatal accidents decreased from 37 (FY 2023-24) to 29 (FY 2024-25), achieving a 21.6% reduction. Serious injuries declined by 19.1% from 89 to 72 cases, while reportable minor incidents dropped from 298 to 241. Legacy underground operations in BCCL (Jharia) and ECL (Raniganj) represent 58% of serious incidents, primarily related to roof falls, strata control, and ventilation. Zero fatal accidents were recorded in Barkakana Area and Kusmunda OCP.",
    insight: { label: "Fatal accident reduction", value: "-21.6%", change: "From 37 to 29 fatalities (FY24 → FY25)" },
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

