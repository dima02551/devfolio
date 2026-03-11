import Link from 'next/link';
import { db } from '@/lib/db';

export default function HomePage() {
  const projects = db.projects.findFeatured().slice(0, 3);
  const posts = db.posts.findPublished().slice(0, 3);

  const skills = [
    { name: 'Next.js', level: 95 },
    { name: 'TypeScript', level: 92 },
    { name: 'React', level: 94 },
    { name: 'Node.js', level: 88 },
    { name: 'PostgreSQL', level: 82 },
    { name: 'Docker', level: 75 },
  ];

  const stats = [
    { value: '5+', label: 'Лет опыта' },
    { value: '40+', label: 'Проектов' },
    { value: '15+', label: 'Клиентов' },
    { value: '∞', label: 'Чашек кофе' },
  ];

  return (
    <div className="grid-bg" style={{ minHeight: '100vh' }}>
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 60px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }} />
            <span className="badge badge-green">Открыт к работе</span>
          </div>
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.1, marginBottom: 24 }}>
            Создаю <span className="gradient-text">быстрые, современные</span><br />веб-приложения.
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 18, maxWidth: 560, marginBottom: 40, lineHeight: 1.7 }}>
            Full-stack разработчик, специализирующийся на Next.js, TypeScript и масштабируемых API.
            Превращаю сложные идеи в элегантные, производительные продукты.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/projects" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>Мои проекты</Link>
            <Link href="/blog" className="btn-ghost" style={{ textDecoration: 'none', display: 'inline-block' }}>Блог</Link>
            <Link href="/contact" className="btn-outline" style={{ textDecoration: 'none', display: 'inline-block' }}>Нанять меня</Link>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 40 }}>
            {['Next.js', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'Redis', 'Tailwind'].map((t) => (
              <span key={t} style={{ padding: '4px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 100, fontSize: 12, color: 'var(--muted)', fontFamily: 'Space Mono' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 800, fontFamily: 'Syne', color: 'var(--accent)', marginBottom: 4 }}>{s.value}</div>
              <div style={{ color: 'var(--muted)', fontSize: 14 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontFamily: 'Space Mono', color: 'var(--accent)', fontSize: 12, marginBottom: 8 }}>// НАВЫКИ</div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 32 }}>Технический стек</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {skills.map((skill) => (
            <div key={skill.name} className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontWeight: 700 }}>{skill.name}</span>
                <span style={{ fontFamily: 'Space Mono', color: 'var(--accent)', fontSize: 13 }}>{skill.level}%</span>
              </div>
              <div style={{ height: 6, background: 'var(--border2)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${skill.level}%`, background: 'linear-gradient(90deg, var(--accent), var(--accent2))', borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
            <div>
              <div style={{ fontFamily: 'Space Mono', color: 'var(--accent)', fontSize: 12, marginBottom: 8 }}>// ПРОЕКТЫ</div>
              <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 32 }}>Избранные работы</h2>
            </div>
            <Link href="/projects" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Все проекты →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {projects.map((project, i) => (
              <div key={project.id} className="card card-glow" style={{ padding: 24, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: `radial-gradient(circle, ${i === 0 ? 'rgba(0,212,255,0.15)' : i === 1 ? 'rgba(124,58,237,0.15)' : 'rgba(245,158,11,0.15)'} 0%, transparent 70%)` }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: `linear-gradient(135deg, ${i === 0 ? 'var(--accent), #0099cc' : i === 1 ? '#7c3aed, #a78bfa' : 'var(--accent3), #ef4444'})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 16 }}>
                    {i === 0 ? '🚀' : i === 1 ? '🤖' : '📊'}
                  </div>
                  <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{project.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{project.description}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                    {project.tags.slice(0, 3).map((tag) => (<span key={tag} className="badge badge-accent">{tag}</span>))}
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>Демо ↗</a>}
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>GitHub ↗</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
            <div>
              <div style={{ fontFamily: 'Space Mono', color: 'var(--accent)', fontSize: 12, marginBottom: 8 }}>// БЛОГ</div>
              <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 32 }}>Последние статьи</h2>
            </div>
            <Link href="/blog" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Все статьи →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div className="card card-glow" style={{ padding: 24, height: '100%', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                    {post.tags.slice(0, 2).map((tag) => (<span key={tag} className="badge badge-purple">{tag}</span>))}
                  </div>
                  <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 17, marginBottom: 10, color: 'var(--text)' }}>{post.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)' }}>
                      {new Date(post.createdAt).toLocaleDateString('ru', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)' }}>{post.views} просмотров</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section style={{ borderTop: '1px solid var(--border)', background: 'linear-gradient(180deg, var(--bg) 0%, rgba(0,212,255,0.03) 100%)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Space Mono', color: 'var(--accent)', fontSize: 12, marginBottom: 16 }}>// ДАВАЙТЕ РАБОТАТЬ ВМЕСТЕ</div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: 20 }}>Есть идея для проекта?</h2>
          <p style={{ color: 'var(--muted)', fontSize: 18, maxWidth: 480, margin: '0 auto 36px' }}>
            Открыт для фриланса, полной занятости и сотрудничества по интересным идеям.
          </p>
          <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', padding: '14px 36px', fontSize: 16 }}>Написать мне</Link>
        </div>
      </section>
    </div>
  );
}
