'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cpu, Shield, Lock, Mail, Building2, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [org, setOrg] = useState('Coal India Limited (CIL)');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your credentials.');
      return;
    }
    setLoading(true);
    setError('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (
      (cleanEmail === 'admin@coalindia.in' || cleanEmail === 'admin') &&
      cleanPass === 'admin123'
    ) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('geointel_auth_role_v1', 'admin');
      }
    } else {
      if (typeof window !== 'undefined') {
        localStorage.setItem('geointel_auth_role_v1', 'officer');
      }
    }

    await new Promise(r => setTimeout(r, 900));
    router.push('/dashboard/data-hub');
  };




  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex',
      background: 'var(--coal-950)',
    }}>
      {/* Left panel */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '64px 80px',
        position: 'relative',
        overflow: 'hidden',
        borderRight: '1px solid var(--border)',
      }}>
        {/* Topographic background pattern */}
        <div className="topo-bg" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
        
        {/* Contour overlay - decorative */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }} viewBox="0 0 600 700" preserveAspectRatio="xMidYMid slice">
          {[100,150,200,250,300,350,400,450].map((r, i) => (
            <ellipse key={i} cx="300" cy="350" rx={r} ry={r * 0.6} fill="none" stroke="var(--copper)" strokeWidth="1" />
          ))}
          {[80,130,180,230,280,330,380].map((r, i) => (
            <ellipse key={i} cx="420" cy="200" rx={r} ry={r * 0.55} fill="none" stroke="var(--copper)" strokeWidth="0.8" />
          ))}
        </svg>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
            <div style={{ 
              width: 48, height: 48, 
              background: 'var(--copper)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 4,
            }}>
              <Cpu size={26} color="#fff" strokeWidth={1.75} />
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                GeoIntel AI
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>
                Mining Intelligence Platform
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 16 }}>
              From Scattered Mining Data<br />
              to <span style={{ color: 'var(--copper)', fontWeight: 600 }}>Actionable Intelligence</span>
            </h1>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 420 }}>
              AI-Powered Geological, Mining and Reporting Solution for CMPDI and CIL subsidiaries.
            </p>
          </div>

          {/* Flow diagram */}
          <div style={{ 
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border)',
            borderRadius: 4,
            padding: '20px 24px',
            maxWidth: 380,
          }}>
            <div className="text-label" style={{ marginBottom: 16 }}>Solution Architecture</div>
            {[
              { label: 'SCATTERED DATA', sub: 'PDFs, Excel, Scanned Records, Archives', color: 'var(--coal-500)' },
              { label: 'GEOINTEL AI', sub: 'OCR · Classification · Validation · Indexing', color: 'var(--copper)', arrow: false },
              { label: 'VALIDATED INTELLIGENCE', sub: 'Searchable, Traceable, Source-cited', color: 'var(--info)' },
              { label: 'ACTIONABLE REPORTS', sub: 'Auto-generated · Audit-ready · Export', color: 'var(--verified)' },
            ].map((item, i, arr) => (
              <div key={i}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 0' }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: item.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: item.color, letterSpacing: '0.04em' }}>{item.label}</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>{item.sub}</div>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ paddingLeft: 3.5, color: 'var(--border-light)', fontSize: '0.75rem' }}>↓</div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Ministry of Coal · Coal India Limited · CMPDI Ranchi
          </div>
        </div>
      </div>

      {/* Right panel — Login form */}
      <div style={{
        width: 440,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '64px 48px',
        background: 'var(--coal-900)',
      }}>
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
            Sign in to your account
          </h2>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Use your official CIL / CMPDI credentials
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
              Official Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={14} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="email"
                className="input-field"
                placeholder="officer@coalindia.in"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ paddingLeft: 34, height: 40 }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={14} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-field"
                placeholder="••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ paddingLeft: 34, paddingRight: 36, height: 40 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Organisation */}
          <div>
            <label style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
              Organisation
            </label>
            <div style={{ position: 'relative' }}>
              <Building2 size={14} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <select
                className="select-field"
                value={org}
                onChange={e => setOrg(e.target.value)}
                style={{ paddingLeft: 34, height: 40, width: '100%' }}
              >
                <option>Coal India Limited (CIL)</option>
                <option>CMPDI</option>
                <option>Eastern Coalfields Limited</option>
                <option>Mahanadi Coalfields Limited</option>
                <option>Central Coalfields Limited</option>
                <option>South Eastern Coalfields Limited</option>
                <option>Northern Coalfields Limited</option>
              </select>
            </div>
          </div>

          {error && (
            <div style={{ 
              background: 'rgba(184,74,74,0.1)',
              border: '1px solid rgba(184,74,74,0.3)',
              borderRadius: 3, padding: '8px 12px',
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: '0.8125rem', color: 'var(--alert-light)',
            }}>
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ 
              height: 42, justifyContent: 'center', 
              borderRadius: 3, marginTop: 4,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <>
                <span style={{ 
                  width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', 
                  borderTopColor: '#fff', borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite', display: 'inline-block'
                }} />
                Authenticating...
              </>
            ) : 'Sign In'}
          </button>
        </form>

        {/* Credentials reminder */}
        <div style={{
          marginTop: 24,
          padding: '12px 14px',
          background: 'rgba(181, 101, 29, 0.08)',
          border: '1px solid rgba(181, 101, 29, 0.25)',
          borderRadius: 4,
          fontSize: '0.75rem',
          lineHeight: 1.5,
        }}>
          <div style={{ fontWeight: 600, color: 'var(--copper)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Shield size={13} />
            Data Hub Deletion Authorization Credentials:
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>
            <strong>Admin ID:</strong> <code style={{ color: 'var(--text-primary)', background: 'rgba(0,0,0,0.3)', padding: '1px 5px', borderRadius: 3 }}>admin@coalindia.in</code><br />
            <strong>Password:</strong> <code style={{ color: 'var(--text-primary)', background: 'rgba(0,0,0,0.3)', padding: '1px 5px', borderRadius: 3 }}>admin123</code>
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 4 }}>
            Only Admin credentials have permission to delete files from the Data Hub.
          </div>
        </div>

        <div style={{ 
          marginTop: 32,
          padding: '12px 16px',
          background: 'rgba(74,127,165,0.08)',
          border: '1px solid rgba(74,127,165,0.2)',
          borderRadius: 3,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Shield size={14} color="var(--info)" />
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--info)', fontWeight: 500 }}>Secure Enterprise Environment</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: 2 }}>
              256-bit encryption · Session monitoring · Audit logging
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
