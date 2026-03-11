'use client';
import { useState } from 'react';
export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [status, setStatus] = useState<'idle'|'sending'|'sent'>('idle');
  const handleSubmit = async () => { setStatus('sending'); await new Promise(r=>setTimeout(r,1000)); setStatus('sent'); };
  const socials = [
    { label:'GitHub', url:'https://github.com', icon:'⌥' },
    { label:'LinkedIn', url:'https://linkedin.com', icon:'🔗' },
    { label:'Telegram', url:'https://t.me', icon:'✈' },
    { label:'Email', url:'mailto:hello@devfolio.dev', icon:'✉' },
  ];
  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '60px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: 'Space Mono', color: 'var(--accent)', fontSize: 12, marginBottom: 12 }}>// КОНТАКТЫ</div>
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 48px)' }}>Давайте поговорим</h1>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60 }}>
        <div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 26, marginBottom: 16 }}>Есть проект?</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 32 }}>Открыт для фриланса, консалтинга и работы в команде. Давайте создадим что-то крутое вместе.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
            {[
              { icon:'📍', label:'Локация', value:'Удалённо / По всему миру' },
              { icon:'⚡', label:'Время ответа', value:'В течение 24 часов' },
              { icon:'✅', label:'Статус', value:'Открыт к работе', green: true },
            ].map(item => (
              <div key={item.label} className="card" style={{ padding:'16px 20px', display:'flex', alignItems:'center', gap:12 }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontWeight: 600, color: item.green ? 'var(--green)' : undefined }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)', marginBottom: 12 }}>СОЦСЕТИ</div>
            <div style={{ display: 'flex', gap: 12 }}>
              {socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer" title={s.label} style={{ width:44, height:44, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, textDecoration:'none' }}>{s.icon}</a>
              ))}
            </div>
          </div>
        </div>
        <div>
          {status === 'sent' ? (
            <div className="card" style={{ padding:40, textAlign:'center' }}>
              <div style={{ fontSize:48, marginBottom:16 }}>✅</div>
              <h3 style={{ fontFamily:'Syne', fontWeight:700, fontSize:22, marginBottom:8 }}>Сообщение отправлено!</h3>
              <p style={{ color:'var(--muted)' }}>Отвечу в течение 24 часов.</p>
              <button onClick={() => setStatus('idle')} className="btn-outline" style={{ marginTop:24 }}>Отправить ещё</button>
            </div>
          ) : (
            <div className="card" style={{ padding:32 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
                <div>
                  <label style={{ display:'block', fontSize:13, fontWeight:600, color:'var(--muted)', marginBottom:6 }}>Имя</label>
                  <input className="input" placeholder="Иван Иванов" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
                </div>
                <div>
                  <label style={{ display:'block', fontSize:13, fontWeight:600, color:'var(--muted)', marginBottom:6 }}>Email</label>
                  <input className="input" placeholder="ivan@example.com" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
                </div>
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'var(--muted)', marginBottom:6 }}>Тема</label>
                <input className="input" placeholder="Обсуждение проекта" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} />
              </div>
              <div style={{ marginBottom:24 }}>
                <label style={{ display:'block', fontSize:13, fontWeight:600, color:'var(--muted)', marginBottom:6 }}>Сообщение</label>
                <textarea className="input" rows={6} placeholder="Расскажите о вашем проекте..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} style={{ resize:'vertical' }} />
              </div>
              <button className="btn-primary" onClick={handleSubmit} disabled={status==='sending'} style={{ width:'100%', padding:'12px', fontSize:15 }}>
                {status==='sending' ? 'Отправка...' : 'Отправить сообщение →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
