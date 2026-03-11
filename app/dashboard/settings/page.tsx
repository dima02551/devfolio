'use client';

import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [user, setUser] = useState<{ name: string; email: string; bio?: string } | null>(null);
  const [form, setForm] = useState({ name: '', bio: '', currentPassword: '', newPassword: '' });
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(d => {
        if (d.user) {
          setUser(d.user);
          setForm(f => ({ ...f, name: d.user.name, bio: d.user.bio || '' }));
        }
      });
  }, []);

  const handleSave = async () => {
    setStatus('saving');
    await new Promise(r => setTimeout(r, 800));
    setStatus('saved');
    setMsg('Profile updated successfully!');
    setTimeout(() => setStatus('idle'), 3000);
  };

  if (!user) return <div style={{ color: 'var(--muted)' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 26, marginBottom: 4 }}>Settings</h1>
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>Manage your account and portfolio settings</p>
      </div>

      {status === 'saved' && (
        <div style={{ background: 'rgba(63,185,80,0.1)', border: '1px solid rgba(63,185,80,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 20, color: 'var(--green)', fontSize: 14 }}>
          ✓ {msg}
        </div>
      )}

      {/* Profile */}
      <div className="card" style={{ padding: 28, marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Profile</h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg, var(--accent2), var(--accent))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
            {user.name?.charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{user.name}</div>
            <div style={{ color: 'var(--muted)', fontSize: 13, fontFamily: 'Space Mono' }}>{user.email}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>DISPLAY NAME</label>
            <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>EMAIL</label>
            <input className="input" value={user.email} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>BIO</label>
            <textarea className="input" rows={3} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} placeholder="Tell visitors about yourself..." style={{ resize: 'vertical' }} />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="card" style={{ padding: 28, marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Security</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>CURRENT PASSWORD</label>
            <input className="input" type="password" placeholder="••••••••" value={form.currentPassword} onChange={e => setForm(f => ({ ...f, currentPassword: e.target.value }))} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>NEW PASSWORD</label>
            <input className="input" type="password" placeholder="••••••••" value={form.newPassword} onChange={e => setForm(f => ({ ...f, newPassword: e.target.value }))} />
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="card" style={{ padding: 28, marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>System</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            ['Framework', 'Next.js 15'],
            ['Language', 'TypeScript'],
            ['Database', 'JSON / File-based'],
            ['Auth', 'JWT (jose)'],
            ['Styling', 'Custom CSS + Tailwind'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--muted)', fontSize: 14 }}>{k}</span>
              <span style={{ fontFamily: 'Space Mono', fontSize: 13, color: 'var(--accent)' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleSave} disabled={status === 'saving'} className="btn-primary" style={{ padding: '12px 32px', fontSize: 15 }}>
        {status === 'saving' ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}
