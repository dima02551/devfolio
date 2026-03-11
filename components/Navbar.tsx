'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Главная' },
  { href: '/projects', label: 'Проекты' },
  { href: '/blog', label: 'Блог' },
  { href: '/contact', label: 'Контакты' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(5,8,16,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, var(--accent), var(--accent2))', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#000', fontFamily: 'Space Mono' }}>{'<>'}</div>
          <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 18, color: 'var(--text)' }}>Dev<span style={{ color: 'var(--accent)' }}>Folio</span></span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{ padding: '6px 16px', borderRadius: 6, textDecoration: 'none', fontSize: 14, fontWeight: 600, fontFamily: 'Syne', color: pathname === link.href ? 'var(--accent)' : 'var(--muted)', background: pathname === link.href ? 'rgba(0,212,255,0.08)' : 'transparent', transition: 'all 0.15s' }}>{link.label}</Link>
          ))}
          <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 8px' }} />
          <Link href="/dashboard" style={{ padding: '6px 16px', background: 'linear-gradient(135deg, var(--accent), #0099cc)', borderRadius: 6, textDecoration: 'none', fontSize: 14, fontWeight: 700, color: '#000', fontFamily: 'Syne' }}>Кабинет</Link>
        </div>
        <button onClick={() => setOpen(!open)} style={{ display: 'none', background: 'none', border: '1px solid var(--border2)', borderRadius: 6, padding: '6px 10px', color: 'var(--text)', cursor: 'pointer' }} className="mobile-menu-btn">{open ? '✕' : '☰'}</button>
      </div>
      {open && (
        <div style={{ borderTop: '1px solid var(--border)', padding: '12px 24px', background: 'var(--bg)' }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} style={{ display: 'block', padding: '10px 0', textDecoration: 'none', fontSize: 15, fontWeight: 600, color: pathname === link.href ? 'var(--accent)' : 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{link.label}</Link>
          ))}
          <Link href="/dashboard" onClick={() => setOpen(false)} style={{ display: 'block', padding: '10px 0', textDecoration: 'none', fontSize: 15, fontWeight: 700, color: 'var(--accent)' }}>→ Кабинет</Link>
        </div>
      )}
      <style>{`@media (max-width: 640px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: block !important; } }`}</style>
    </nav>
  );
}
