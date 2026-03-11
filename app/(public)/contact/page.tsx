'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async () => {
    setStatus('sending');
    await new Promise(r => setTimeout(r, 1000));
    setStatus('sent');
  };

  const socials = [
    { label: 'GitHub', url: 'https://github.com', icon: '⌥' },
    { label: 'LinkedIn', url: 'https://linkedin.com', icon: '🔗' },
    { label: 'Twitter', url: 'https://twitter.com', icon: '✦' },
    { label: 'Email', url: 'mailto:hello@devfolio.dev', icon: '✉' },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '60px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: 'Space Mono', color: 'var(--accent)', fontSize: 12, marginBottom: 12 }}>// CONTACT</div>
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 48px)' }}>
            Let's Talk
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60 }}>
        {/* Info */}
        <div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 26, marginBottom: 16 }}>Have a project?</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 32 }}>
            I'm available for freelance work, consulting, and full-time opportunities.
            Let's build something great together.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
            <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>📍</span>
              <div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 2 }}>Location</div>
                <div style={{ fontWeight: 600 }}>Remote / Worldwide</div>
              </div>
            </div>
            <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>⚡</span>
              <div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 2 }}>Response Time</div>
                <div style={{ fontWeight: 600 }}>Within 24 hours</div>
              </div>
            </div>
            <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>✅</span>
              <div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 2 }}>Status</div>
                <div style={{ fontWeight: 600, color: 'var(--green)' }}>Available for Work</div>
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>SOCIALS</div>
            <div style={{ display: 'flex', gap: 12 }}>
              {socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer" title={s.label} style={{
                  width: 44, height: 44,
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, textDecoration: 'none',
                  transition: 'border-color 0.15s',
                }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div>
          {status === 'sent' ? (
            <div className="card" style={{ padding: 40, textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Message sent!</h3>
              <p style={{ color: 'var(--muted)' }}>I'll get back to you within 24 hours.</p>
              <button onClick={() => setStatus('idle')} className="btn-outline" style={{ marginTop: 24 }}>
                Send Another
              </button>
            </div>
          ) : (
            <div className="card" style={{ padding: 32 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>Name</label>
                  <input className="input" placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>Email</label>
                  <input className="input" placeholder="john@example.com" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>Subject</label>
                <input className="input" placeholder="Project discussion" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>Message</label>
                <textarea className="input" rows={6} placeholder="Tell me about your project..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: 'vertical' }} />
              </div>
              <button className="btn-primary" onClick={handleSubmit} disabled={status === 'sending'} style={{ width: '100%', padding: '12px', fontSize: 15 }}>
                {status === 'sending' ? 'Sending...' : 'Send Message →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
