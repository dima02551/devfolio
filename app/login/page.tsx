'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email:'', password:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    if (!form.email || !form.password) { setError('Заполните все поля'); return; }
    setLoading(true); setError('');
    const res = await fetch('/api/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || 'Ошибка входа'); return; }
    router.push('/dashboard');
  };
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:24, background:'var(--bg)' }} className="grid-bg">
      <div style={{ width:'100%', maxWidth:420 }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div style={{ width:56, height:56, background:'linear-gradient(135deg, var(--accent), var(--accent2))', borderRadius:14, display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:18, fontWeight:800, color:'#000', fontFamily:'Space Mono', marginBottom:16 }}>{'<>'}</div>
          <h1 style={{ fontFamily:'Syne', fontWeight:800, fontSize:28, marginBottom:6 }}>Dev<span style={{ color:'var(--accent)' }}>Folio</span></h1>
          <p style={{ color:'var(--muted)', fontSize:14 }}>Войдите в панель управления</p>
        </div>
        <div className="card" style={{ padding:32 }}>
          {error && <div style={{ background:'rgba(248,81,73,0.1)', border:'1px solid rgba(248,81,73,0.3)', borderRadius:8, padding:'10px 14px', marginBottom:20, color:'var(--red)', fontSize:14 }}>⚠ {error}</div>}
          <div style={{ marginBottom:16 }}>
            <label style={{ display:'block', fontSize:13, fontWeight:600, color:'var(--muted)', marginBottom:6 }}>Email</label>
            <input className="input" type="email" placeholder="admin@devfolio.dev" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} onKeyDown={e=>e.key==='Enter'&&handleLogin()} />
          </div>
          <div style={{ marginBottom:28 }}>
            <label style={{ display:'block', fontSize:13, fontWeight:600, color:'var(--muted)', marginBottom:6 }}>Пароль</label>
            <input className="input" type="password" placeholder="••••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} onKeyDown={e=>e.key==='Enter'&&handleLogin()} />
          </div>
          <button className="btn-primary" onClick={handleLogin} disabled={loading} style={{ width:'100%', padding:'12px', fontSize:15 }}>
            {loading ? 'Вход...' : 'Войти →'}
          </button>
          <div style={{ marginTop:20, padding:'12px 16px', background:'rgba(0,212,255,0.05)', border:'1px dashed rgba(0,212,255,0.2)', borderRadius:8, fontSize:12, fontFamily:'Space Mono', color:'var(--muted)' }}>
            Демо: admin@devfolio.dev / admin123
          </div>
        </div>
        <div style={{ textAlign:'center', marginTop:24 }}>
          <Link href="/" style={{ color:'var(--muted)', textDecoration:'none', fontSize:13 }}>← На главную</Link>
        </div>
      </div>
    </div>
  );
}
