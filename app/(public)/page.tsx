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
    { value: '5+', label: 'Years Experience' },
    { value: '40+', label: 'Projects Built' },
    { value: '15+', label: 'Happy Clients' },
    { value: '∞', label: 'Coffee Cups' },
  ];

  return (
    <div className="grid-bg" style={{ minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 60px', position: 'relative' }}>
        {/* Glow orb */}
        <div style={{
          position: 'absolute', top: 0, right: '10%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)' }} />
            <span className="badge badge-green">Available for Work</span>
          </div>

          <h1 style={{
            fontFamily: 'Syne',
            fontWeight: 800,
            fontSize: 'clamp(40px, 6vw, 72px)',
            lineHeight: 1.1,
            marginBottom: 24,
          }}>
            I build{' '}
            <span className="gradient-text">fast, modern</span>
            <br />
            web experiences.
          </h1>

          <p style={{ color: 'var(--muted)', fontSize: 18, maxWidth: 560, marginBottom: 40, lineHeight: 1.7 }}>
            Full-stack developer specializing in Next.js, TypeScript, and scalable APIs.
            I transform complex ideas into elegant, performant products.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/projects" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
              View Projects
            </Link>
            <Link href="/blog" className="btn-ghost" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Read Blog
            </Link>
            <Link href="/contact" className="btn-outline" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Hire Me
            </Link>
          </div>

          {/* Tech stack pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 40 }}>
            {['Next.js', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'Redis', 'Tailwind'].map((t) => (
              <span key={t} style={{
                padding: '4px 12px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 100,
                fontSize: 12,
                color: 'var(--muted)',
                fontFamily: 'Space Mono',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 800, fontFamily: 'Syne', color: 'var(--accent)', marginBottom: 4 }}>
                {s.value}
              </div>
              <div style={{ color: 'var(--muted)', fontSize: 14 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: 'Space Mono', color: 'var(--accent)', fontSize: 12, marginBottom: 8 }}>// SKILLS</div>
            <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 32 }}>Technical Expertise</h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {skills.map((skill) => (
            <div key={skill.name} className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontWeight: 700 }}>{skill.name}</span>
                <span style={{ fontFamily: 'Space Mono', color: 'var(--accent)', fontSize: 13 }}>{skill.level}%</span>
              </div>
              <div style={{ height: 6, background: 'var(--border2)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${skill.level}%`,
                  background: 'linear-gradient(90deg, var(--accent), var(--accent2))',
                  borderRadius: 3,
                  transition: 'width 1s ease',
                }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
            <div>
              <div style={{ fontFamily: 'Space Mono', color: 'var(--accent)', fontSize: 12, marginBottom: 8 }}>// PROJECTS</div>
              <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 32 }}>Featured Work</h2>
            </div>
            <Link href="/projects" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
              All Projects →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {projects.map((project, i) => (
              <div key={project.id} className="card card-glow" style={{ padding: 24, position: 'relative', overflow: 'hidden' }}>
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: 80, height: 80,
                  background: `radial-gradient(circle, ${i === 0 ? 'rgba(0,212,255,0.15)' : i === 1 ? 'rgba(124,58,237,0.15)' : 'rgba(245,158,11,0.15)'} 0%, transparent 70%)`,
                }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: `linear-gradient(135deg, ${i === 0 ? 'var(--accent), #0099cc' : i === 1 ? '#7c3aed, #a78bfa' : 'var(--accent3), #ef4444'})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, marginBottom: 16,
                  }}>
                    {i === 0 ? '🚀' : i === 1 ? '🤖' : '📊'}
                  </div>

                  <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{project.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{project.description}</p>

                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="badge badge-accent">{tag}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 12 }}>
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
                        Demo ↗
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST BLOG */}
      {posts.length > 0 && (
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
            <div>
              <div style={{ fontFamily: 'Space Mono', color: 'var(--accent)', fontSize: 12, marginBottom: 8 }}>// BLOG</div>
              <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 32 }}>Latest Articles</h2>
            </div>
            <Link href="/blog" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
              All Articles →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div className="card card-glow" style={{ padding: 24, height: '100%', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="badge badge-purple">{tag}</span>
                    ))}
                  </div>
                  <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 17, marginBottom: 10, color: 'var(--text)' }}>{post.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)' }}>
                      {new Date(post.createdAt).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)' }}>
                      {post.views} views
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{
        borderTop: '1px solid var(--border)',
        background: 'linear-gradient(180deg, var(--bg) 0%, rgba(0,212,255,0.03) 100%)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Space Mono', color: 'var(--accent)', fontSize: 12, marginBottom: 16 }}>// LET'S WORK TOGETHER</div>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: 20 }}>
            Have a project in mind?
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: 18, maxWidth: 480, margin: '0 auto 36px' }}>
            I'm open to freelance opportunities, full-time roles, and collaboration on exciting ideas.
          </p>
          <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', padding: '14px 36px', fontSize: 16 }}>
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
