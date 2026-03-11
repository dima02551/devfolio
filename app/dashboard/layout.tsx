'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const navItems = [
  { href:'/dashboard', label:'Обзор', icon:'◈' },
  { href:'/dashboard/posts', label:'Статьи', icon:'✏' },
  { href:'/dashboard/projects', label:'Проекты', icon:'⚡' },
  { href:'/dashboard/settings', label:'Настройки', icon:'⚙' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{name:string;email:string;role:string}|null>(null);

  useEffect(() => {
    fetch('/api/auth/me').then(r=>r.json()).then(d => {
      if (d.user) setUser(d.user); else router.push('/login');
    }).catch(()=>router.push('/login'));
  }, [router]);

  const handleLogout = async () => { await fetch('/api/auth/logout',{method:'POST'}); router.push('/login'); };

  if (!user) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)' }}>
      <div style={{ fontFamily:'Space Mono', color:'var(--accent)', fontSize:14 }}>Загрузка...</div>
    </div>
  );

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'var(--bg)' }}>
      <aside style={{ width:240, background:'var(--surface)', borderRight:'1px solid var(--border)', display:'flex', flexDirection:'column', position:'fixed', top:0, bottom:0, zIndex:40 }}>
        <div style={{ padding:'20px 20px 16px', borderBottom:'1px solid var(--border)' }}>
          <Link href="/" style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:32, height:32, background:'linear-gradient(135deg, var(--accent), var(--accent2))', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:800, color:'#000', fontFamily:'Space Mono' }}>{'<>'}</div>
            <span style={{ fontFamily:'Syne', fontWeight:800, fontSize:16 }}>Dev<span style={{ color:'var(--accent)' }}>Folio</span></span>
          </Link>
        </div>
        <nav style={{ flex:1, padding:'16px 12px' }}>
          <div style={{ marginBottom:4, padding:'4px 8px', fontFamily:'Space Mono', fontSize:10, color:'var(--muted)' }}>НАВИГАЦИЯ</div>
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 10px', borderRadius:8, textDecoration:'none', fontSize:14, fontWeight:600, fontFamily:'Syne', color:active?'var(--accent)':'var(--muted)', background:active?'rgba(0,212,255,0.08)':'transparent', marginBottom:2, transition:'all 0.15s' }}>
                <span style={{ fontSize:16 }}>{item.icon}</span>{item.label}
              </Link>
            );
          })}
          <div style={{ marginTop:16, padding:'4px 8px', fontFamily:'Space Mono', fontSize:10, color:'var(--muted)' }}>САЙТ</div>
          <Link href="/" style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 10px', borderRadius:8, textDecoration:'none', fontSize:14, fontWeight:600, fontFamily:'Syne', color:'var(--muted)', marginBottom:2 }}>
            <span style={{ fontSize:16 }}>🌐</span>Смотреть сайт
          </Link>
          <Link href="/blog" style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 10px', borderRadius:8, textDecoration:'none', fontSize:14, fontWeight:600, fontFamily:'Syne', color:'var(--muted)', marginBottom:2 }}>
            <span style={{ fontSize:16 }}>📖</span>Блог
          </Link>
        </nav>
        <div style={{ padding:'16px', borderTop:'1px solid var(--border)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
            <div style={{ width:36, height:36, background:'linear-gradient(135deg, var(--accent2), var(--accent))', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:700, color:'#fff', flexShrink:0 }}>{user.name?.charAt(0)||'A'}</div>
            <div style={{ overflow:'hidden' }}>
              <div style={{ fontWeight:700, fontSize:14, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{user.name}</div>
              <div style={{ fontSize:11, color:'var(--muted)', fontFamily:'Space Mono' }}>{user.role}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="btn-ghost" style={{ width:'100%', padding:'7px', fontSize:13, textAlign:'center' }}>Выйти</button>
        </div>
      </aside>
      <main style={{ flex:1, marginLeft:240, minHeight:'100vh', display:'flex', flexDirection:'column' }} className="dashboard-main">
        <header style={{ borderBottom:'1px solid var(--border)', padding:'0 32px', height:60, display:'flex', alignItems:'center', justifyContent:'space-between', background:'rgba(5,8,16,0.8)', backdropFilter:'blur(8px)', position:'sticky', top:0, zIndex:30 }}>
          <div style={{ fontFamily:'Space Mono', fontSize:12, color:'var(--muted)' }}>
            {pathname.split('/').filter(Boolean).map((p,i,arr) => (
              <span key={p}><span style={{ color:i===arr.length-1?'var(--text)':'var(--muted)', textTransform:'capitalize' }}>{p}</span>{i<arr.length-1&&<span style={{ color:'var(--border2)', margin:'0 6px' }}>/</span>}</span>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:'var(--green)', boxShadow:'0 0 8px var(--green)' }} />
            <span style={{ fontFamily:'Space Mono', fontSize:11, color:'var(--muted)' }}>ОНЛАЙН</span>
          </div>
        </header>
        <div style={{ flex:1, padding:'32px' }}>{children}</div>
      </main>
      <style>{`@media (max-width: 768px) { .dashboard-main { margin-left: 0 !important; } }`}</style>
    </div>
  );
}
