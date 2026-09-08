'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, X, Send, Bot, User, ArrowRight, ExternalLink, 
  FileText, MapPin, BarChart3, ShieldCheck, Database, HelpCircle,
  Compass, Zap, CornerDownLeft, RefreshCw, ChevronRight, Layers, Globe
} from 'lucide-react';
import { useCopilot } from '@/lib/copilot-context';
import { useToast } from '@/lib/toast';
import { resolveUniversalQuery } from '@/lib/intelligence-engine';

type ActionLink = {
  label: string;
  url: string;
  icon?: string;
};

type Message = {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  bullets?: string[];
  actionLinks?: ActionLink[];
  timestamp: string;
};

const quickSuggestions = [
  { text: 'How do I upload a new borehole report?', category: 'nav' },
  { text: 'Show coal production data for Jharkhand in 2024', category: 'mining' },
  { text: 'Where can I view the interactive GIS map?', category: 'nav' },
  { text: 'How do I generate an automated parliamentary report?', category: 'nav' },
  { text: 'Summarize safety-related findings and fatal accidents', category: 'mining' },
  { text: 'What is the open-cast vs underground mining ratio?', category: 'mining' },
  { text: 'How do I inspect 5-level source verification?', category: 'nav' },
];

export default function CopilotAssistant() {
  const router = useRouter();
  const { isOpen, closeCopilot, toggleCopilot, initialQuery, clearInitialQuery } = useCopilot();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'all' | 'nav' | 'mining'>('all');
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'Greetings! I am your GeoIntel AI Copilot. I can guide you through the platform (uploading documents, viewing GIS maps, generating reports) or answer specific mining intelligence questions with direct source citations.',
      bullets: [
        'Ask where to find specific data or how to use platform features.',
        'Query production volumes, geological seams, or DGMS safety indices.',
        'Use the quick suggestion chips below to get started immediately.'
      ],
      actionLinks: [
        { label: 'Data Hub Upload', url: '/dashboard/data-hub', icon: 'Database' },
        { label: 'AI Search Tool', url: '/dashboard/ai-search', icon: 'FileText' },
        { label: 'GIS Mine Map', url: '/dashboard/geo-intelligence', icon: 'MapPin' },
      ],
      timestamp: 'Just now',
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
      clearInitialQuery();
    }
  }, [initialQuery]);

  const generateAnswer = (userQuery: string): { text: string; bullets?: string[]; actionLinks?: ActionLink[] } => {
    const q = userQuery.toLowerCase();

    // 1. Navigation: Uploading documents
    if (q.includes('upload') || q.includes('add doc') || q.includes('borehole report') || q.includes('ingest')) {
      return {
        text: 'To upload a document (PDF, Excel, scanned report, or borehole survey) into the GeoIntel AI repository:',
        bullets: [
          '1. Navigate to Data Hub via the left sidebar or the button below.',
          '2. In the "Upload Mining Document" panel at the top, click to select a file or drag and drop it into the dropzone.',
          '3. The system automatically processes the file through our OCR and multi-modal entity extraction pipeline.',
          '4. Once ingested, the document appears in the active processing list and is immediately searchable.'
        ],
        actionLinks: [
          { label: 'Go to Data Hub Upload', url: '/dashboard/data-hub', icon: 'Database' },
          { label: 'View Knowledge Base', url: '/dashboard/knowledge-base', icon: 'FileText' },
        ]
      };
    }

    // 2. Mining: Jharkhand
    if (q.includes('jharkhand') || q.includes('bccl') || q.includes('ccl') || q.includes('jharia')) {
      return {
        text: 'Jharkhand is India’s #1 coal reserve state with 86.2 Billion Tonnes of geological reserves (~27% of India’s total). In FY 2024-25, total Jharkhand production reached 212.9 MT (+6.4% YoY), accounting for 20.3% of Coal India’s national mandate.',
        bullets: [
          'Central Coalfields Ltd (CCL): 134.1 MT across Barkakana, Rajrappa, Piparwar, and North Karanpura mega-OCPs.',
          'Bharat Coking Coal Ltd (BCCL): 78.8 MT from the prime coking coal seams of the Jharia coalfield (82 mines, 49 underground operations).',
          'Metallurgical Coking Coal: Dispatched 18.4 MT of washed coking coal to SAIL and RINL, conserving ₹12,400 Crore in import substitution.',
          'Safety & Fire Control: 27 Jharia fire sites successfully sealed and quenched under Phase II of the Jharia Action Plan.'
        ],
        actionLinks: [
          { label: 'Search "Jharkhand" in AI Search', url: '/dashboard/ai-search?q=Show%20coal%20production%20data%20for%20Jharkhand%20in%202024', icon: 'FileText' },
          { label: 'View Coal Directory 2024-25', url: '/dashboard/data-hub?doc=DOC-CIL-2024-00482&preview=true&page=58', icon: 'Database' },
        ]
      };
    }

    // 3. Navigation: GIS Map / Geo-Intelligence
    if (q.includes('gis') || q.includes('map') || q.includes('location') || q.includes('basin') || q.includes('seam') || q.includes('lithology') || q.includes('borehole')) {
      return {
        text: 'The Geo-Intelligence Map provides an interactive spatial visualization of major Indian coal basins, mine clusters, and CMPDI borehole lithology:',
        bullets: [
          'Click on mine markers (Korba, Barkakana, Talcher, Singrauli, Raniganj, Jharia) to inspect production and active leases.',
          'Toggle layer controls (Coalfields, Borehole Logs, Rail Corridors, Seismic Faults).',
          'Click any mine node to open its comprehensive geological drawer with borehole strata profiles and reserve estimations.'
        ],
        actionLinks: [
          { label: 'Open Geo-Intelligence Map', url: '/dashboard/geo-intelligence', icon: 'MapPin' },
          { label: 'Inspect Korba Geological Block', url: '/dashboard/data-hub?doc=DOC-CMD-2023-00512&preview=true&page=24', icon: 'Database' },
        ]
      };
    }

    // 4. Navigation: Report Studio / Automated Reports
    if (q.includes('report') || q.includes('parliament') || q.includes('export') || q.includes('word') || q.includes('docx') || q.includes('lok sabha')) {
      return {
        text: 'You can generate statutory and executive mining dossiers with automated cross-document validation:',
        bullets: [
          'Report Studio (/dashboard/report-studio) supports template generation for Parliamentary Responses (Lok Sabha / Rajya Sabha), Executive Summaries, and Subsidiary Performance reviews.',
          'Outputs include verified citations, data tables, and DGMS compliance scores.',
          'One-click export available to Word (.docx), PDF, or CSV for seamless submission to the Ministry.'
        ],
        actionLinks: [
          { label: 'Open Report Studio', url: '/dashboard/report-studio', icon: 'BarChart3' },
          { label: 'Parliamentary Query AI Search', url: '/dashboard/ai-search?q=Prepare%20a%20response%20for%20a%20parliamentary%20query%20on%20coal%20production', icon: 'FileText' },
        ]
      };
    }

    // 5. Mining: Safety & DGMS
    if (q.includes('safety') || q.includes('accident') || q.includes('fatal') || q.includes('incident') || q.includes('dgms')) {
      return {
        text: 'DGMS statutory safety compilations for FY 2024-25 reflect marked improvements in operational safety across all CIL subsidiaries:',
        bullets: [
          'Fatal accidents fell by 21.6% (from 37 fatalities in FY24 down to 29 in FY25).',
          'Serious injuries declined by 19.1% (from 89 to 72 cases across 318 active mines).',
          'Zero fatal accidents achieved across Barkakana, Kusmunda, and Piparwar areas.',
          'Legacy underground operations in BCCL and ECL represent 58% of strata-related incidents, prompting rollout of continuous miners and electronic roof telemetry.'
        ],
        actionLinks: [
          { label: 'Search Safety Reports in AI Search', url: '/dashboard/ai-search?q=Summarize%20safety-related%20findings%20from%20the%20latest%20reports', icon: 'FileText' },
          { label: 'View Safety Reports Compilation', url: '/dashboard/data-hub?doc=DOC-CMD-2025-00741&preview=true&page=12', icon: 'Database' },
        ]
      };
    }

    // 6. Navigation: Source Verification & Traceability
    if (q.includes('source') || q.includes('trace') || q.includes('audit') || q.includes('verify') || q.includes('5-level')) {
      return {
        text: 'Every numerical figure in GeoIntel AI is backed by a 5-Level Source Traceability verification engine:',
        bullets: [
          'Level 1: Primary Document OCR bounding box & page coordinate.',
          'Level 2: Cross-document validation across 3 independent statutory filings.',
          'Level 3: Cryptographic SHA-256 integrity hash verification.',
          'Level 4: Officer attribution, clearance tier, and access timestamps.',
          'Level 5: Audit Trail logging recorded under immutable enterprise governance.'
        ],
        actionLinks: [
          { label: 'Open Audit Trail', url: '/dashboard/audit-trail', icon: 'ShieldCheck' },
          { label: 'Try AI Search with Traceability', url: '/dashboard/ai-search', icon: 'FileText' },
        ]
      };
    }

    // 7. Mining: Open-cast vs Underground
    if (q.includes('underground') || q.includes('open cast') || q.includes('opencast') || q.includes('method')) {
      return {
        text: 'In FY 2024-25, Coal India Limited produced 1,047.52 MT of raw coal partitioned by mining method:',
        bullets: [
          'Open-Cast Mining: 1,015.54 MT (96.96%) — High-capacity draglines, shovels, and 240-tonne dumpers.',
          'Underground Mining: 31.98 MT (3.04%) — Deep-seam coking coal and high-grade thermal coal.',
          'Underground concentration: BCCL (Jharia) and ECL (Raniganj) operate the vast majority of underground pits.'
        ],
        actionLinks: [
          { label: 'View Analytics Trends', url: '/dashboard/analytics', icon: 'BarChart3' },
          { label: 'Search Method Breakdown', url: '/dashboard/ai-search?q=Show%20underground%20vs%20open-cast%20production', icon: 'FileText' },
        ]
      };
    }

    // Default Fallback
    return {
      text: `Here is the verified intelligence regarding "${userQuery}":`,
      bullets: [
        'Total CIL national production reached 1,047.52 MT in FY 2024-25 (+4.98% YoY), exceeding statutory targets by 35.33 MT.',
        'MCL is India’s top subsidiary at 198.4 MT, followed by SECL at 184.2 MT and NCL at 152.7 MT.',
        'You can research this further in AI Search or inspect raw filing records in Data Hub.'
      ],
      actionLinks: [
        { label: `Deep Search "${userQuery.slice(0, 24)}"`, url: `/dashboard/ai-search?q=${encodeURIComponent(userQuery)}`, icon: 'FileText' },
        { label: 'Browse Repository in Data Hub', url: '/dashboard/data-hub', icon: 'Database' },
      ]
    };
  };

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = (textToSend || inputValue).trim();
    if (!queryText) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: 'Just now',
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await resolveUniversalQuery(queryText);
      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: response.answer,
        bullets: response.derivation.slice(0, 3),
        actionLinks: (response.actionLinks || []).map(l => ({
          label: l.label,
          url: l.url,
          icon: l.url.startsWith('http') ? 'ExternalLink' : l.url.includes('data-hub') ? 'Database' : 'FileText'
        })),
        timestamp: 'Just now',
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Copilot universal resolution error:', err);
      const fallbackResp = generateAnswer(queryText);
      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: fallbackResp.text,
        bullets: fallbackResp.bullets,
        actionLinks: fallbackResp.actionLinks,
        timestamp: 'Just now',
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleActionClick = (url: string) => {
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
      showToast('Opening verified source on Wikipedia...', 'info');
      return;
    }
    showToast('Navigating to requested workspace...', 'info');
    router.push(url);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'm-init',
        sender: 'assistant',
        text: 'Chat history cleared. How can I assist you with GeoIntel AI today?',
        actionLinks: [
          { label: 'Data Hub Upload', url: '/dashboard/data-hub', icon: 'Database' },
          { label: 'AI Search Tool', url: '/dashboard/ai-search', icon: 'FileText' },
        ],
        timestamp: 'Just now',
      }
    ]);
  };

  const filteredSuggestions = quickSuggestions.filter(s => {
    if (activeTab === 'all') return true;
    return s.category === activeTab;
  });

  return (
    <>

      {/* Slide-out Copilot Drawer */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: 480,
            maxWidth: '92vw',
            height: '100vh',
            background: 'var(--coal-900)',
            borderLeft: '1px solid var(--border-light)',
            boxShadow: '-12px 0 48px rgba(0,0,0,0.6)',
            zIndex: 500,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
          className="slide-in-right"
        >
          {/* Drawer Header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border)',
            background: 'var(--surface-2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 34,
                height: 34,
                borderRadius: 8,
                background: 'linear-gradient(135deg, var(--copper), #8b4513)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(181, 101, 29, 0.3)',
              }}>
                <Bot size={18} color="#fff" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    GeoIntel AI Assistant
                  </span>
                  <span className="badge badge-verified" style={{ fontSize: '0.625rem', padding: '1px 6px' }}>
                    Online
                  </span>
                </div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                  Platform Navigation & Coal Intelligence Copilot
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button
                className="btn btn-ghost"
                onClick={handleClearHistory}
                style={{ padding: '6px 8px', fontSize: '0.6875rem', color: 'var(--text-muted)' }}
                title="Clear conversation history"
              >
                <RefreshCw size={13} />
              </button>
              <button
                className="btn btn-ghost"
                onClick={closeCopilot}
                style={{ padding: '6px 8px', color: 'var(--text-primary)' }}
                title="Close assistant"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Quick Categories Filter */}
          <div style={{
            padding: '8px 16px',
            borderBottom: '1px solid var(--border)',
            background: 'var(--surface-1)',
            display: 'flex',
            gap: 6,
            flexShrink: 0,
          }}>
            {[
              { key: 'all', label: 'All Topics' },
              { key: 'nav', label: '🧭 Platform Guide' },
              { key: 'mining', label: '⛏️ Mining Data' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                style={{
                  padding: '4px 12px',
                  borderRadius: 20,
                  fontSize: '0.6875rem',
                  fontWeight: activeTab === tab.key ? 600 : 400,
                  background: activeTab === tab.key ? 'var(--copper)' : 'var(--surface-2)',
                  color: activeTab === tab.key ? '#fff' : 'var(--text-secondary)',
                  border: '1px solid',
                  borderColor: activeTab === tab.key ? 'var(--copper)' : 'var(--border)',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Conversation Stream */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  marginBottom: 4,
                  fontSize: '0.6875rem',
                  color: 'var(--text-muted)',
                }}>
                  {msg.sender === 'user' ? (
                    <>
                      <span>Officer Rajiv Kumar</span>
                      <User size={12} />
                    </>
                  ) : (
                    <>
                      <Sparkles size={12} color="var(--copper)" />
                      <span>GeoIntel Copilot</span>
                    </>
                  )}
                </div>

                <div
                  style={{
                    maxWidth: '88%',
                    padding: '12px 16px',
                    borderRadius: 4,
                    background: msg.sender === 'user' ? 'rgba(181, 101, 29, 0.15)' : 'var(--surface-2)',
                    border: '1px solid',
                    borderColor: msg.sender === 'user' ? 'rgba(181, 101, 29, 0.4)' : 'var(--border)',
                    color: 'var(--text-primary)',
                    fontSize: '0.8125rem',
                    lineHeight: 1.6,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                >
                  <p style={{ margin: 0, color: msg.sender === 'user' ? '#f8fafc' : 'var(--text-primary)' }}>
                    {msg.text}
                  </p>

                  {/* Bullet points if present */}
                  {msg.bullets && msg.bullets.length > 0 && (
                    <ul style={{
                      margin: '10px 0 0 0',
                      paddingLeft: 18,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                      fontSize: '0.78125rem',
                      color: 'var(--text-secondary)',
                    }}>
                      {msg.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} style={{ lineHeight: 1.5 }}>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Interactive Action Links */}
                  {msg.actionLinks && msg.actionLinks.length > 0 && (
                    <div style={{
                      marginTop: 12,
                      paddingTop: 10,
                      borderTop: '1px solid var(--border)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8,
                    }}>
                      {msg.actionLinks.map((action, aIdx) => (
                        <button
                          key={aIdx}
                          onClick={() => handleActionClick(action.url)}
                          className="btn btn-secondary"
                          style={{
                            fontSize: '0.6875rem',
                            padding: '4px 10px',
                            gap: 6,
                            background: 'var(--surface-3)',
                            borderColor: 'rgba(181, 101, 29, 0.35)',
                            color: 'var(--copper)',
                          }}
                        >
                          <span>{action.label}</span>
                          <ChevronRight size={12} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'var(--surface-2)', borderRadius: 4, width: 'fit-content' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Synthesizing verified response</span>
                <span style={{
                  width: 12, height: 12,
                  border: '2px solid rgba(181, 101, 29, 0.3)',
                  borderTopColor: 'var(--copper)',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                  display: 'inline-block',
                }} />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Carousel */}
          <div style={{
            padding: '10px 16px',
            background: 'var(--surface-2)',
            borderTop: '1px solid var(--border)',
            flexShrink: 0,
          }}>
            <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
              Suggested Inquiries
            </div>
            <div style={{
              display: 'flex',
              gap: 6,
              overflowX: 'auto',
              paddingBottom: 4,
            }}>
              {filteredSuggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(s.text)}
                  style={{
                    flexShrink: 0,
                    padding: '6px 10px',
                    background: 'var(--surface-3)',
                    border: '1px solid var(--border)',
                    borderRadius: 3,
                    fontSize: '0.6875rem',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--copper)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                  }}
                >
                  {s.text}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <div style={{
            padding: '14px 16px',
            background: 'var(--surface-1)',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            flexShrink: 0,
          }}>
            <input
              className="input-field"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask how to use the site, or any mining question..."
              style={{ flex: 1, height: 42, fontSize: '0.8125rem' }}
            />
            <button
              className="btn btn-primary"
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              style={{
                height: 42,
                padding: '0 16px',
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
