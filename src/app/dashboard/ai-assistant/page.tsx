'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, Send, Compass, Database, Search, MapPin, 
  BarChart3, FileText, ArrowRight, ShieldCheck, HelpCircle, 
  Trash2, ExternalLink, CheckCircle2, ChevronRight, Layers,
  BookOpen, Terminal, Zap
} from 'lucide-react';
import { useToast } from '@/lib/toast';
import { searchResponses, resolveStateQuery } from '@/lib/mock-data';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  actionLinks?: { label: string; url: string; icon: any }[];
  sources?: string[];
  timestamp: string;
}

const presetQuestions = [
  {
    category: 'Website Guide',
    icon: Compass,
    query: 'How do I search for state coal production data and view the source document?',
    answer: 'To explore state-level coal statistics:\n1. Go to **AI Search** or **Data Hub**.\n2. Search any state name like "Jharkhand", "Odisha", or "Chhattisgarh".\n3. Click the **View Source** button to immediately view the raw authentic table, page number, and audit derivation chain without abbreviated summaries.',
    links: [
      { label: 'Open AI Search', url: '/dashboard/ai-search', icon: Search },
      { label: 'Open Data Hub', url: '/dashboard/data-hub', icon: Database },
    ],
    sources: ['Coal_Directory_2024_25.pdf', 'Table 8.4 State-wise Raw Coal Production'],
  },
  {
    category: 'State Mining',
    icon: MapPin,
    query: 'What are the top coal producing states in India?',
    answer: 'India\'s top coal producing states based on CMPDI / Ministry of Coal 2024-25 records:\n- **Odisha**: 210.85 MT (+8.9% YoY) led by MCL operations in Talcher & Ib Valley.\n- **Chhattisgarh**: 185.30 MT (+6.8% YoY) led by SECL across Korba.\n- **Jharkhand**: 168.45 MT (+5.4% YoY) led by CCL & BCCL (prime coking coal).\n- **Madhya Pradesh**: 142.10 MT via NCL Singrauli.',
    links: [
      { label: 'Geo Intelligence Map', url: '/dashboard/geo-intelligence', icon: MapPin },
      { label: 'State Analytics', url: '/dashboard/analytics', icon: BarChart3 },
    ],
    sources: ['Provisional_Coal_Statistics_2024_25.xlsx', 'CMPDI Master Geodatabase'],
  },
  {
    category: 'Document Upload',
    icon: Database,
    query: 'Where can I upload PDF or Excel reports and how do I find them?',
    answer: '1. Navigate to **Data Hub** (Module 02).\n2. Use the upload dropzone at the top right to upload `.pdf`, `.xlsx`, or `.csv` files.\n3. A green notification toast with an immediate **"View Document"** button will confirm the upload.\n4. Your document is instantly indexed and pinned to the top of the repository table with a glowing badge.',
    links: [
      { label: 'Go to Data Hub', url: '/dashboard/data-hub', icon: Database },
      { label: 'Audit Trail', url: '/dashboard/audit-trail', icon: Terminal },
    ],
    sources: ['Data Ingestion Pipeline v2.4', 'CMPDI Document Governance'],
  },
  {
    category: 'Safety & DGMS',
    icon: ShieldCheck,
    query: 'What are the latest DGMS safety compliance mandates?',
    answer: 'DGMS Directive DGMS/Tech/2024/08 mandates real-time continuous atmospheric monitoring (CAM) for CH₄, CO, and O₂ across all Degree II & III gassy underground mines, alongside slope stability radars for open-cast pits exceeding 100m depth. CIL reported a 14.2% fatal incident reduction.',
    links: [
      { label: 'Knowledge Base', url: '/dashboard/knowledge-base', icon: BookOpen },
      { label: 'Safety Reports', url: '/dashboard/report-studio', icon: FileText },
    ],
    sources: ['DGMS_Circular_Safety_2024.pdf', 'DGMS Technical Directorate'],
  },
];

export default function AIAssistantPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-0',
      sender: 'assistant',
      text: 'Hello! I am your GeoIntel AI Assistant. I can help you navigate this portal, query state production statistics, trace raw source documents, inspect DGMS compliance, and generate reports. What would you like to explore?',
      actionLinks: [
        { label: 'Search AI Database', url: '/dashboard/ai-search', icon: Search },
        { label: 'View Data Hub', url: '/dashboard/data-hub', icon: Database },
        { label: 'Geo Intelligence', url: '/dashboard/geo-intelligence', icon: MapPin },
      ],
      timestamp: 'Active Now',
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let replyText = '';
      let links: { label: string; url: string; icon: any }[] = [];
      let sources: string[] = [];

      // Check state queries
      const stateMatch = resolveStateQuery(lower);
      if (stateMatch) {
        replyText = `### ${stateMatch.insight.label}: ${stateMatch.insight.value} (${stateMatch.insight.change || 'Verified Metric'})\n\n` +
          `${stateMatch.answer}\n\n`;
        if (stateMatch.kpiCards && stateMatch.kpiCards.length > 0) {
          replyText += `**Key Statistical Metrics:**\n` + 
            stateMatch.kpiCards.map(k => `• **${k.label}:** ${k.value} ${k.sub ? `(${k.sub})` : ''}`).join('\n') + '\n\n';
        }
        replyText += `You can view the full authentic spreadsheet or document source in **Data Hub** or **AI Search**.`;
        links = [
          { label: `View in AI Search`, url: `/dashboard/ai-search?q=${encodeURIComponent(text)}`, icon: Search },
          { label: 'Geo Intelligence Map', url: '/dashboard/geo-intelligence', icon: MapPin },
        ];
        sources = stateMatch.sources.map(s => `${s.name}${s.page ? ` (p. ${s.page})` : s.sheet ? ` (${s.sheet})` : ''}`);
      } else if (lower.includes('upload') || lower.includes('pdf') || lower.includes('excel') || lower.includes('document')) {
        replyText = 'You can upload PDF and Excel mining reports directly in the **Data Hub** (Module 02). Simply drag-and-drop or select your file. Once uploaded, a notification appears with a direct link, and the file is highlighted at the top of the list.';
        links = [
          { label: 'Open Data Hub', url: '/dashboard/data-hub', icon: Database },
          { label: 'Audit Trail', url: '/dashboard/audit-trail', icon: Terminal },
        ];
        sources = ['Data Ingestion Pipeline v2.4'];
      } else if (lower.includes('source') || lower.includes('view source')) {
        replyText = 'Every record in GeoIntel AI is backed by verifiable source citations. When you click **View Source** in Data Hub, AI Search, or Geo Intelligence, the platform displays the exact source document, page, table row, and audit ID—ensuring complete traceability.';
        links = [
          { label: 'Try AI Search with Sources', url: '/dashboard/ai-search', icon: Search },
          { label: 'Data Hub Repository', url: '/dashboard/data-hub', icon: Database },
        ];
        sources = ['Source Traceability Engine v1.0'];
      } else if (lower.includes('korba') || lower.includes('geological') || lower.includes('formation')) {
        replyText = 'Korba Coalfield (SECL, Chhattisgarh) contains the famous Upper Kusmunda, Lower Kusmunda, and Gevra seams in the Barakar Formation. Total estimated reserves stand at 11,247 MT. Dip is gentle at 3° to 8° SSW.';
        links = [
          { label: 'Korba Geo Intelligence', url: '/dashboard/geo-intelligence', icon: MapPin },
        ];
        sources = ['CMPDI Geological Report Korba', 'Barakar Formation Stratigraphy'];
      } else if (lower.includes('safety') || lower.includes('dgms') || lower.includes('accident')) {
        replyText = 'DGMS compliance tracking is monitored across all CIL subsidiaries. Recent directives require continuous atmospheric monitoring (CAM) for methane and CO, slope stability radars, and automated dust suppression systems.';
        links = [
          { label: 'Knowledge Base', url: '/dashboard/knowledge-base', icon: BookOpen },
          { label: 'Generate Safety Report', url: '/dashboard/report-studio', icon: FileText },
        ];
        sources = ['DGMS Circular 2024/08', 'Safety Audit Directory'];
      } else {
        replyText = `Here is what I found regarding **"${text}"**:\n\nGeoIntel AI indexes 12,486 technical reports, geological surveys, and statistical directories across Coal India Limited (CIL) and CMPDI. You can conduct semantic searches, inspect subsidiary statistics, or generate official executive briefs.`;
        links = [
          { label: 'Search AI Database', url: `/dashboard/ai-search?q=${encodeURIComponent(text)}`, icon: Search },
          { label: 'Geo Intelligence', url: '/dashboard/geo-intelligence', icon: MapPin },
        ];
        sources = ['Coal_Directory_2024_25.pdf', 'CMPDI National Knowledge Store'];
      }

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        actionLinks: links,
        sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'm-reset',
        sender: 'assistant',
        text: 'Chat history cleared. How can I assist you with GeoIntel AI today?',
        actionLinks: [
          { label: 'AI Search Tool', url: '/dashboard/ai-search', icon: Search },
          { label: 'Data Hub', url: '/dashboard/data-hub', icon: Database },
        ],
        timestamp: 'Just now',
      }
    ]);
    showToast('Conversation reset', 'info');
  };

  return (
    <div className="page-container fade-in" style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        justifyContent: 'space-between',
        marginBottom: 20,
        borderBottom: '1px solid var(--border)',
        paddingBottom: 16,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{ 
              width: 32, 
              height: 32, 
              background: 'linear-gradient(135deg, var(--copper), #8a4810)',
              borderRadius: 4, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(181,101,29,0.3)',
            }}>
              <Sparkles size={18} color="#fff" />
            </div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Ask AI Assistant
            </h1>
            <span style={{ 
              fontSize: '0.625rem', 
              padding: '2px 6px', 
              borderRadius: 3, 
              background: 'rgba(34, 197, 94, 0.12)', 
              color: 'var(--verified)', 
              fontWeight: 600,
              border: '1px solid rgba(34, 197, 94, 0.25)',
              letterSpacing: '0.04em'
            }}>
              MODULE 11 • ACTIVE
            </span>
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
            Your dedicated AI co-pilot for navigating CMPDI / CIL datasets, state production figures, geological surveys, and portal guidance.
          </p>
        </div>

        <button
          onClick={handleClear}
          className="btn-secondary"
          style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px' }}
          title="Clear chat history"
        >
          <Trash2 size={13} />
          Clear Conversation
        </button>
      </div>

      {/* Main Grid: Chat Workspace + Quick Guides */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: 20 }}>
        
        {/* Chat Thread Container */}
        <div style={{
          background: 'var(--coal-900)',
          border: '1px solid var(--border)',
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 230px)',
          minHeight: 520,
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          overflow: 'hidden',
        }}>
          {/* Thread messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}>
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isUser ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    alignSelf: isUser ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div style={{ 
                    fontSize: '0.6875rem', 
                    color: 'var(--text-muted)', 
                    marginBottom: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}>
                    <span>{isUser ? 'You' : 'GeoIntel Assistant'}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div style={{
                    padding: '12px 16px',
                    borderRadius: 4,
                    background: isUser ? 'var(--copper)' : 'var(--surface-2)',
                    color: isUser ? '#fff' : 'var(--text-primary)',
                    border: isUser ? 'none' : '1px solid var(--border-light)',
                    fontSize: '0.875rem',
                    lineHeight: 1.55,
                    whiteSpace: 'pre-wrap',
                    boxShadow: isUser ? '0 2px 8px rgba(181, 101, 29, 0.3)' : 'none',
                  }}>
                    {msg.text}

                    {/* Sources snippet */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div style={{
                        marginTop: 10,
                        paddingTop: 8,
                        borderTop: '1px solid rgba(255,255,255,0.08)',
                        fontSize: '0.75rem',
                        color: isUser ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)',
                      }}>
                        <div style={{ fontWeight: 600, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <CheckCircle2 size={12} color={isUser ? '#fff' : 'var(--verified)'} />
                          Verified Derivation Sources:
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                          {msg.sources.map((src, idx) => (
                            <span 
                              key={idx} 
                              style={{ 
                                background: isUser ? 'rgba(0,0,0,0.2)' : 'var(--surface-3)', 
                                padding: '2px 6px', 
                                borderRadius: 3,
                                border: '1px solid var(--border)',
                                fontSize: '0.6875rem',
                              }}
                            >
                              {src}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quick navigation links */}
                    {msg.actionLinks && msg.actionLinks.length > 0 && (
                      <div style={{
                        marginTop: 12,
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 8,
                      }}>
                        {msg.actionLinks.map((link, idx) => {
                          const LinkIcon = link.icon || ExternalLink;
                          return (
                            <button
                              key={idx}
                              onClick={() => router.push(link.url)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 6,
                                background: isUser ? 'rgba(0,0,0,0.25)' : 'var(--surface-3)',
                                color: isUser ? '#fff' : 'var(--copper)',
                                border: '1px solid var(--border)',
                                padding: '5px 10px',
                                borderRadius: 3,
                                fontSize: '0.75rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--copper)'}
                              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                            >
                              <LinkIcon size={12} />
                              {link.label}
                              <ChevronRight size={11} />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 14px',
                background: 'var(--surface-2)',
                borderRadius: 4,
                border: '1px solid var(--border-light)',
                maxWidth: 200,
              }}>
                <Sparkles size={14} className="spin" color="var(--copper)" />
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>Analyzing query...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div style={{
            padding: '14px 16px',
            background: 'var(--surface-1)',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            gap: 10,
            alignItems: 'center',
          }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask anything about coal data, state figures, reports, or how to use the site..."
              style={{
                flex: 1,
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
                borderRadius: 3,
                padding: '9px 12px',
                fontSize: '0.875rem',
                color: 'var(--text-primary)',
                outline: 'none',
              }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || isTyping}
              className="btn-primary"
              style={{
                padding: '9px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '0.8125rem',
                opacity: !inputValue.trim() || isTyping ? 0.6 : 1,
              }}
            >
              <Send size={13} />
              Send
            </button>
          </div>
        </div>

        {/* Right Column: Suggested Inquiries & Quick Modules */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          {/* Quick Questions Card */}
          <div style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border)',
            borderRadius: 4,
            padding: 16,
          }}>
            <div style={{ 
              fontSize: '0.8125rem', 
              fontWeight: 600, 
              color: 'var(--text-primary)', 
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <Zap size={14} color="var(--copper)" />
              Suggested Inquiries
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {presetQuestions.map((q, idx) => {
                const Icon = q.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSend(q.query)}
                    style={{
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 4,
                      padding: 10,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--copper)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-light)';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <span style={{ 
                        fontSize: '0.625rem', 
                        padding: '1px 5px', 
                        borderRadius: 2, 
                        background: 'rgba(181,101,29,0.12)', 
                        color: 'var(--copper)', 
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em'
                      }}>
                        {q.category}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78125rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
                      {q.query}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Platform Modules Navigation Card */}
          <div style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border)',
            borderRadius: 4,
            padding: 16,
          }}>
            <div style={{ 
              fontSize: '0.8125rem', 
              fontWeight: 600, 
              color: 'var(--text-primary)', 
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <Layers size={14} color="var(--copper)" />
              Jump to Key Modules
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { label: 'Data Hub', icon: Database, href: '/dashboard/data-hub' },
                { label: 'AI Search', icon: Search, href: '/dashboard/ai-search' },
                { label: 'GIS Map', icon: MapPin, href: '/dashboard/geo-intelligence' },
                { label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
                { label: 'Reports', icon: FileText, href: '/dashboard/report-studio' },
                { label: 'Audit Trail', icon: Terminal, href: '/dashboard/audit-trail' },
              ].map((mod, idx) => {
                const Icon = mod.icon;
                return (
                  <Link
                    key={idx}
                    href={mod.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 10px',
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                      borderRadius: 3,
                      textDecoration: 'none',
                      color: 'var(--text-secondary)',
                      fontSize: '0.75rem',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--copper)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                    }}
                  >
                    <Icon size={13} color="var(--copper)" />
                    <span>{mod.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Assistance Notice */}
          <div style={{
            background: 'rgba(59, 130, 246, 0.05)',
            border: '1px solid rgba(59, 130, 246, 0.15)',
            borderRadius: 4,
            padding: 12,
            display: 'flex',
            gap: 10,
            alignItems: 'flex-start',
          }}>
            <HelpCircle size={16} color="var(--info)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div style={{ fontSize: '0.71875rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              <strong style={{ color: 'var(--text-primary)' }}>Always Traceable:</strong> Every figure reported by the assistant links back to official CIL statistical yearbooks, DGMS directives, and CMPDI geological surveys.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
