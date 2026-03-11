import Link from 'next/link';
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)', padding: '40px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 20, marginBottom: 6 }}>Dev<span style={{ color: 'var(--accent)' }}>Folio</span></div>
          <div style={{ color: 'var(--muted)', fontSize: 14 }}>Создано на Next.js + TypeScript</div>
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {[{href:'/',label:'Главная'},{href:'/projects',label:'Проекты'},{href:'/blog',label:'Блог'},{href:'/contact',label:'Контакты'},{href:'/dashboard',label:'Кабинет'}].map(l => (
            <Link key={l.href} href={l.href} style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>{l.label}</Link>
          ))}
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 13, fontFamily: 'Space Mono' }}>© {year} DevFolio</div>
      </div>
    </footer>
  );
}
