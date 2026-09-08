'use client';

import { useState } from 'react';
import {
  Shield, User, Key, Database, Cpu, CheckCircle, AlertTriangle,
  Download, RefreshCw, Save, Lock, Sliders, Globe, Server, FileText,
  Clock, ShieldAlert, Check, X, ExternalLink
} from 'lucide-react';
import { exportToCsv, exportToPdf, exportToJson } from '@/lib/export-utils';
import { showToast } from '@/lib/toast';
import { subsidiaries } from '@/lib/mock-data';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  subsidiary: string;
  clearance: string;
  status: 'Active' | 'Pending' | 'Restricted';
  lastActive: string;
}

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'rbac' | 'ai-pipeline' | 'governance'>('profile');

  // Officer Profile State
  const [officerName, setOfficerName] = useState('Dr. Rajiv Kumar');
  const [officerEmail, setOfficerEmail] = useState('rajiv.kumar@cmpdi.co.in');
  const [officerPhone, setOfficerPhone] = useState('+91 651 2230891 (Ext. 4410)');
  const [officerDesignation, setOfficerDesignation] = useState('Chief General Manager (Geology & Mining Informatics)');
  const [defaultSubsidiary, setDefaultSubsidiary] = useState('All Subsidiaries (National Access)');
  const [notificationsEmail, setNotificationsEmail] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  // RBAC State
  const [userRoster, setUserRoster] = useState<UserRecord[]>([
    { id: 'EMP-7842', name: 'Dr. Rajiv Kumar', email: 'rajiv.kumar@cmpdi.co.in', role: 'System Administrator & Chief Geologist', subsidiary: 'CMPDI / HQ', clearance: 'Level 4 (Classified)', status: 'Active', lastActive: 'Online Now' },
    { id: 'EMP-9012', name: 'S. Chatterjee', email: 's.chatterjee@ccl.gov.in', role: 'Senior Mining Planning Officer', subsidiary: 'CCL', clearance: 'Level 3 (Subsidiary Full)', status: 'Active', lastActive: '12 mins ago' },
    { id: 'EMP-6631', name: 'M. Sharma', email: 'm.sharma@secl.gov.in', role: 'Area Geologist — Korba', subsidiary: 'SECL', clearance: 'Level 3 (Subsidiary Full)', status: 'Active', lastActive: '1 hour ago' },
    { id: 'EMP-4428', name: 'P. Nayak', email: 'p.nayak@mcl.gov.in', role: 'Production Data Validator', subsidiary: 'MCL', clearance: 'Level 2 (Read / Validate)', status: 'Active', lastActive: 'Yesterday' },
    { id: 'EMP-3190', name: 'K. Rao', email: 'k.rao@sccl.gov.in', role: 'Parliamentary Query Liaison', subsidiary: 'SCCL (Associated Entity)', clearance: 'Level 3 (Subsidiary Full)', status: 'Active', lastActive: '3 hours ago' },
    { id: 'EMP-5514', name: 'V. Trivedi', email: 'v.trivedi@bccl.gov.in', role: 'Coking Seam Analyst', subsidiary: 'BCCL', clearance: 'Level 2 (Read / Validate)', status: 'Restricted', lastActive: '5 days ago' },
  ]);

  // AI Pipeline Parameters
  const [ocrConfidenceCutoff, setOcrConfidenceCutoff] = useState(85);
  const [similarityCutoff, setSimilarityCutoff] = useState(0.78);
  const [strictHallucinationFilter, setStrictHallucinationFilter] = useState(true);
  const [autoIndexNewDocs, setAutoIndexNewDocs] = useState(true);

  // Export handlers
  const handleExportSystemConfig = () => {
    const configData = {
      system: 'GeoIntel AI — Enterprise Mining Platform',
      version: '2.4.0-PROD',
      timestamp: new Date().toISOString(),
      officer: {
        name: officerName,
        designation: officerDesignation,
        email: officerEmail,
        clearance: 'Level 4 — National Mineral Inventory',
      },
      aiPipeline: {
        ocrConfidenceCutoff,
        similarityCutoff,
        strictHallucinationFilter,
        autoIndexNewDocs,
        vectorDb: 'Qdrant / Hybrid CMPDI Embeddings (842,190 vectors)',
        llmModel: 'Secured On-Premise Llama-3-70B Mining Model',
      },
      subsidiaryMatrix: subsidiaries.filter(s => s !== 'All Subsidiaries'),
      activeUsersCount: userRoster.length,
    };
    exportToJson('GeoIntel_System_Config_Backup', configData);
  };

  const handleExportUserMatrix = () => {
    const headers = ['Employee ID', 'Name', 'Email', 'Role', 'Subsidiary', 'Clearance Level', 'Status', 'Last Active'];
    const rows = userRoster.map(u => [u.id, u.name, u.email, u.role, u.subsidiary, u.clearance, u.status, u.lastActive]);
    exportToCsv('CIL_CMPDI_User_Access_Matrix', headers, rows);
  };

  const handleExportOfficerCredentialPdf = () => {
    exportToPdf(
      'Officer_Credential_Dr_Rajiv_Kumar',
      'OFFICER CREDENTIAL & SYSTEM CLEARANCE',
      'Ministry of Coal · Coal India Limited · CMPDI Ranchi',
      [
        {
          heading: '1. Officer Identification',
          content: `This credential certifies that ${officerName}, holding employee registration CIL-CMPDI-84920, is designated as ${officerDesignation} at CMPDI Headquarters, Ranchi. The officer is vested with national authority under the Mines Act, 1952.`,
          table: {
            headers: ['Attribute', 'Official Record'],
            rows: [
              ['Cadre / Grade', 'E-8 Senior Administrative Grade'],
              ['Headquarters', 'CMPDI Gondwana Place, Kanke Road, Ranchi, Jharkhand'],
              ['Contact Email', officerEmail],
              ['Official Phone', officerPhone],
              ['Assigned Jurisdiction', defaultSubsidiary],
              ['Security Clearance', 'Level 4 (Classified National Seam & Reserve Inventory)'],
            ],
          },
        },
        {
          heading: '2. Digital Signature Certificate (DSC) Specification',
          content: 'The cryptographic identity token linked to this profile is validated against the National Informatics Centre (NIC) Root Certifying Authority. Token serial: IN-CCA-2024-9981A. Validity: October 2024 through October 2027.',
        },
        {
          heading: '3. System Authorization & Delegated Powers',
          bulletPoints: [
            'Direct access to Classified Lithological Seam Data across all 8 CIL Subsidiaries.',
            'Final validation and cryptographic signing of Parliamentary Question Responses.',
            'Administrative governance over OCR ingestion pipelines and Vector Embeddings.',
            'Authority to commission, suspend, or audit regional Subsidiary Officer accounts.',
          ],
        },
      ]
    );
  };

  const handleSaveProfile = () => {
    showToast('Officer Profile and security credentials saved successfully.', 'success');
  };

  const toggleUserStatus = (id: string) => {
    setUserRoster(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Restricted' : 'Active';
        showToast(`User ${u.name} status updated to ${nextStatus}`, 'info');
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  return (
    <div className="page-container fade-in">
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span className="text-label" style={{ color: 'var(--copper)' }}>CIL / CMPDI GOVERNANCE</span>
              <span style={{ fontSize: '0.6875rem', color: 'var(--coal-600)' }}>•</span>
              <span style={{ fontSize: '0.6875rem', color: 'var(--verified)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <CheckCircle size={11} />
                NIC Class-3 DSC Active
              </span>
            </div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: 4 }}>
              Admin Portal & Officer Governance
            </h1>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
              Manage administrative identity, subsidiary data delegations, AI engine parameters, and security compliance.
            </p>
          </div>

          {/* Header Actions */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button className="btn btn-secondary" onClick={handleExportSystemConfig} title="Download system configuration as JSON">
              <Download size={13} />
              Export System Config (JSON)
            </button>
            <button className="btn btn-primary" onClick={handleExportOfficerCredentialPdf} title="Download official credentials as PDF">
              <Shield size={13} />
              Export Officer Credential (PDF)
            </button>
          </div>
        </div>
      </div>

      {/* Quick Status Bar */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20
      }}>
        {[
          { label: 'Authorized Officer', value: 'Dr. Rajiv Kumar', sub: 'CGM (Geology & IT), CMPDI', icon: User, color: 'var(--copper)' },
          { label: 'Clearance Tier', value: 'Level 4 — National', sub: 'Classified Seams & Reserves', icon: Key, color: 'var(--verified)' },
          { label: 'Subsidiaries Linked', value: '8 of 8 Connected', sub: 'Full Inter-Subsidiary Access', icon: Globe, color: 'var(--info)' },
          { label: 'Security Enforcement', value: '100% Tamper-Evident', sub: 'SHA-256 Merkle Audit Log', icon: Shield, color: 'var(--verified)' },
        ].map((item, i) => {
          const IconComponent = item.icon;
          return (
            <div key={i} style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: '14px 16px', borderRadius: 2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <span className="text-label">{item.label}</span>
                <IconComponent size={14} color={item.color} />
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>
                {item.value}
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{item.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Tabs Navigation */}
      <div style={{
        display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: 20, gap: 4
      }}>
        {[
          { key: 'profile', label: '1. Officer Profile & Identity', icon: User },
          { key: 'rbac', label: '2. Subsidiary Access & User Roster', icon: Key },
          { key: 'ai-pipeline', label: '3. AI Engine & Pipeline Config', icon: Cpu },
          { key: 'governance', label: '4. Security & Compliance Governance', icon: ShieldAlert },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 18px', fontSize: '0.8125rem', fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--copper)' : 'var(--text-muted)',
                background: isActive ? 'var(--surface-2)' : 'transparent',
                border: 'none', borderBottom: isActive ? '2px solid var(--copper)' : '2px solid transparent',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Officer Profile */}
      {activeTab === 'profile' && (
        <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
          {/* Profile Form */}
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: 22, borderRadius: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
              <div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Officer Information & Postings
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Authoritative personnel data synchronized with Ministry of Coal HRMS.
                </div>
              </div>
              <button className="btn btn-primary" onClick={handleSaveProfile}>
                <Save size={13} />
                Save Changes
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label className="text-label" style={{ display: 'block', marginBottom: 6 }}>Officer Full Name</label>
                <input
                  className="input-field"
                  value={officerName}
                  onChange={e => setOfficerName(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label className="text-label" style={{ display: 'block', marginBottom: 6 }}>Official Email Address</label>
                <input
                  className="input-field"
                  value={officerEmail}
                  onChange={e => setOfficerEmail(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label className="text-label" style={{ display: 'block', marginBottom: 6 }}>Official Designation</label>
                <input
                  className="input-field"
                  value={officerDesignation}
                  onChange={e => setOfficerDesignation(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label className="text-label" style={{ display: 'block', marginBottom: 6 }}>Phone / Intercom</label>
                <input
                  className="input-field"
                  value={officerPhone}
                  onChange={e => setOfficerPhone(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label className="text-label" style={{ display: 'block', marginBottom: 6 }}>Default Subsidiary Jurisdiction View</label>
              <select
                className="select-field"
                value={defaultSubsidiary}
                onChange={e => setDefaultSubsidiary(e.target.value)}
                style={{ width: '100%' }}
              >
                <option value="All Subsidiaries (National Access)">All Subsidiaries (National Level CMPDI Access)</option>
                {subsidiaries.filter(s => s !== 'All Subsidiaries').map(s => (
                  <option key={s} value={s}>{s} — Regional Command</option>
                ))}
              </select>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
              <div className="text-label" style={{ marginBottom: 12 }}>Security & Notification Preferences</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={twoFactorAuth}
                    onChange={e => setTwoFactorAuth(e.target.checked)}
                    style={{ accentColor: 'var(--copper)' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                      Enforce NIC e-Pramaan Hardware Token (2FA)
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                      Requires physical USB Crypto Token on every classified geological data export.
                    </div>
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={notificationsEmail}
                    onChange={e => setNotificationsEmail(e.target.checked)}
                    style={{ accentColor: 'var(--copper)' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                      Dispatch Urgent Parliamentary Query Alerts to Registered Email
                    </div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                      Immediate alerts for queries requiring Minister of Coal briefing files within 4 hours.
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Digital Badge & Security Token Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: 20, borderRadius: 2 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%', background: 'var(--coal-800)',
                  border: '2px solid var(--copper)', margin: '0 auto 10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.25rem', fontWeight: 700, color: 'var(--copper)'
                }}>
                  RK
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{officerName}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>CIL-CMPDI-84920</div>
                <div style={{
                  display: 'inline-block', marginTop: 8, padding: '2px 8px', borderRadius: 2,
                  background: 'rgba(74,124,89,0.15)', color: 'var(--verified)', border: '1px solid rgba(74,124,89,0.3)',
                  fontSize: '0.6875rem', fontWeight: 600
                }}>
                  AUTHORISED MINING OFFICER
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14, fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Organization:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>CMPDI / Coal India</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Base Post:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Gondwana Place, Ranchi</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>DSC Certificate:</span>
                  <span style={{ color: 'var(--verified)', fontWeight: 500 }}>Valid (Exp: Oct 2027)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Active IP:</span>
                  <span style={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}>10.42.18.91</span>
                </div>
              </div>

              <button
                className="btn btn-secondary"
                style={{ width: '100%', marginTop: 16, justifyContent: 'center' }}
                onClick={handleExportOfficerCredentialPdf}
              >
                <Download size={13} />
                Download Identity Card (PDF)
              </button>
            </div>

            {/* Quick Diagnostic */}
            <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: 16, borderRadius: 2 }}>
              <div className="text-label" style={{ marginBottom: 10 }}>Session Health</div>
              <div style={{ fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Encryption:</span>
                  <span style={{ color: 'var(--text-primary)' }}>TLS 1.3 · AES-256 GCM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Hardware Binding:</span>
                  <span style={{ color: 'var(--verified)' }}>Active (FIPS 140-2)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Session Idle Max:</span>
                  <span style={{ color: 'var(--text-primary)' }}>30 mins</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RBAC & User Roster */}
      {activeTab === 'rbac' && (
        <div className="fade-in">
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: 20, borderRadius: 2, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
              <div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Registered Personnel & Subsidiary Delegation
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Manage role-based clearances across Central Mine Planning and all 8 regional subsidiaries.
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-secondary" onClick={handleExportUserMatrix}>
                  <Download size={13} />
                  Export Access Matrix (CSV)
                </button>
                <button className="btn btn-primary" onClick={() => showToast('New Officer invitation link generated.', 'success')}>
                  + Add Authorized Personnel
                </button>
              </div>
            </div>

            {/* User Roster Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
              <thead>
                <tr style={{ background: 'var(--surface-3)', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontSize: '0.6875rem' }}>OFFICER</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontSize: '0.6875rem' }}>SUBSIDIARY</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontSize: '0.6875rem' }}>ROLE</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontSize: '0.6875rem' }}>CLEARANCE</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontSize: '0.6875rem' }}>STATUS</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 600, fontSize: '0.6875rem' }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {userRoster.map((u, i) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{u.name}</div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{u.email} · {u.id}</div>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ padding: '2px 8px', background: 'var(--surface-3)', borderRadius: 2, fontSize: '0.75rem', fontWeight: 500, color: 'var(--copper)' }}>
                        {u.subsidiary}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>
                      {u.role}
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{ fontSize: '0.75rem', color: u.clearance.includes('Level 4') ? 'var(--verified)' : 'var(--info)' }}>
                        {u.clearance}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.6875rem', fontWeight: 600,
                        color: u.status === 'Active' ? 'var(--verified)' : 'var(--alert)'
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: u.status === 'Active' ? 'var(--verified)' : 'var(--alert)' }} />
                        {u.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                      <button
                        className="btn btn-secondary"
                        style={{ fontSize: '0.6875rem', padding: '4px 8px' }}
                        onClick={() => toggleUserStatus(u.id)}
                      >
                        {u.status === 'Active' ? 'Suspend Access' : 'Restore Access'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: AI Engine & Pipeline Config */}
      {activeTab === 'ai-pipeline' && (
        <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* OCR Ingestion Engine */}
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: 22, borderRadius: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Cpu size={16} color="var(--copper)" />
              <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                OCR & Ingestion Parameters
              </div>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
              Tunes how scanned PDFs and historical geological survey sheets are processed.
            </p>

            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-primary)' }}>OCR Confidence Cutoff</span>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--copper)' }}>{ocrConfidenceCutoff}%</span>
              </div>
              <input
                type="range"
                min={70}
                max={98}
                value={ocrConfidenceCutoff}
                onChange={e => setOcrConfidenceCutoff(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--copper)' }}
              />
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 4 }}>
                Documents below {ocrConfidenceCutoff}% confidence will be routed to the Human-in-the-Loop review queue.
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={autoIndexNewDocs}
                  onChange={e => setAutoIndexNewDocs(e.target.checked)}
                  style={{ accentColor: 'var(--copper)' }}
                />
                <div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    Auto-Index Verified Ingestions
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                    Automatically embeds documents exceeding 95% confidence without manual signing.
                  </div>
                </div>
              </label>
            </div>

            <div style={{ marginTop: 24, padding: 14, background: 'var(--surface-3)', borderRadius: 2, border: '1px solid var(--border)' }}>
              <div className="text-label" style={{ marginBottom: 6 }}>Model Engine Active</div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Azure Document Intelligence v3.1 + CMPDI Lithology Tesseract
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--verified)', marginTop: 2 }}>
                Trained on 45,000+ Indian Coal seam borehole patterns
              </div>
            </div>
          </div>

          {/* RAG Vector Pipeline */}
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: 22, borderRadius: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Database size={16} color="var(--info)" />
              <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                RAG Vector Search & LLM Engine
              </div>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
              Controls similarity thresholds and anti-hallucination verification rules.
            </p>

            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-primary)' }}>Cosine Similarity Cutoff</span>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--info)' }}>{similarityCutoff}</span>
              </div>
              <input
                type="range"
                min={0.65}
                max={0.90}
                step={0.01}
                value={similarityCutoff}
                onChange={e => setSimilarityCutoff(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--info)' }}
              />
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 4 }}>
                Enforces strict semantic relevance between user questions and mining records.
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={strictHallucinationFilter}
                  onChange={e => setStrictHallucinationFilter(e.target.checked)}
                  style={{ accentColor: 'var(--verified)' }}
                />
                <div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    Mandatory Multi-Source Cross-Check
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                    Rejects answers that cannot be cited by at least 2 independent CMPDI/CIL files.
                  </div>
                </div>
              </label>
            </div>

            <div style={{ marginTop: 24, display: 'flex', gap: 8 }}>
              <button className="btn btn-secondary" onClick={() => showToast('Cache flushed successfully.', 'info')}>
                <RefreshCw size={12} />
                Flush Embeddings Cache
              </button>
              <button className="btn btn-primary" onClick={() => showToast('AI Engine configurations applied.', 'success')}>
                <Save size={12} />
                Save AI Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Security Governance & Backups */}
      {activeTab === 'governance' && (
        <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Security Compliance */}
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: 22, borderRadius: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Lock size={16} color="var(--verified)" />
              <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Government Cyber Security Compliance
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {[
                { standard: 'CERT-In Guidelines for Critical Mineral Infrastructure', status: 'Compliant (Audited)', date: 'Q1 2026' },
                { standard: 'ISO 27001 Information Security Management', status: 'Active Certification', date: 'Valid to 2028' },
                { standard: 'National Data Governance Framework Policy', status: 'Enforced', date: 'Tier 4 Sovereign' },
                { standard: 'Mines Act, 1952 Statutory Archival Directives', status: 'Permanent Archive', date: '100% Retained' },
              ].map((std, idx) => (
                <div key={idx} style={{ padding: '10px 14px', background: 'var(--surface-3)', border: '1px solid var(--border)', borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-primary)' }}>{std.standard}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{std.date}</div>
                  </div>
                  <span style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--verified)', background: 'rgba(74,124,89,0.15)', padding: '2px 8px', borderRadius: 2 }}>
                    {std.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* System Backup & Data Exports */}
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', padding: 22, borderRadius: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Download size={16} color="var(--copper)" />
              <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Export System Backups & Telemetry
              </div>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
              Export authoritative backups and logs directly into your computer&apos;s Downloads folder.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                className="btn btn-secondary"
                style={{ justifyContent: 'space-between', padding: '12px 16px' }}
                onClick={handleExportSystemConfig}
              >
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>Full System Configuration Backup</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>JSON payload with model parameters and subsidiary access rules</div>
                </div>
                <Download size={14} color="var(--copper)" />
              </button>

              <button
                className="btn btn-secondary"
                style={{ justifyContent: 'space-between', padding: '12px 16px' }}
                onClick={handleExportUserMatrix}
              >
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>Personnel & Clearance Matrix</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>CSV format with current CIL & CMPDI officer delegations</div>
                </div>
                <Download size={14} color="var(--copper)" />
              </button>

              <button
                className="btn btn-secondary"
                style={{ justifyContent: 'space-between', padding: '12px 16px' }}
                onClick={handleExportOfficerCredentialPdf}
              >
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-primary)' }}>Officer Statutory Credentials Dossier</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>Official signed PDF document for ministry briefing records</div>
                </div>
                <Download size={14} color="var(--copper)" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
