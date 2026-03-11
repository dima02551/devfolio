import { db } from '@/lib/db';

export const metadata = { title: 'Projects' };

export default function ProjectsPage() {
  const projects = db.projects.findAll().sort((a, b) => a.order - b.order);

  const tagColors = ['badge-accent', 'badge-purple', 'badge-yellow', 'badge-green'];

  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '60px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: 'Space Mono', color: 'var(--accent)', fontSize: 12, marginBottom: 12 }}>// PROJECTS</div>
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: 16 }}>
            My Work
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 17, maxWidth: 600 }}>
            A selection of projects I've built — from full-stack SaaS platforms to open-source tools.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
        {projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🛠</div>
            <p>No projects yet.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {projects.map((project, i) => (
              <div key={project.id} className="card card-glow" style={{ padding: 28, position: 'relative', overflow: 'hidden' }}>
                {project.featured && (
                  <div style={{
                    position: 'absolute', top: 16, right: 16,
                  }}>
                    <span className="badge badge-yellow">Featured</span>
                  </div>
                )}

                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `linear-gradient(135deg, ${
                    i % 3 === 0 ? 'var(--accent), #0099cc' :
                    i % 3 === 1 ? '#7c3aed, #a78bfa' :
                    'var(--accent3), #ef4444'
                  })`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, marginBottom: 16,
                }}>
                  {i % 4 === 0 ? '🚀' : i % 4 === 1 ? '🤖' : i % 4 === 2 ? '📊' : '⚡'}
                </div>

                <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 20, marginBottom: 10 }}>{project.title}</h2>
                <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
                  {project.longDesc || project.description}
                </p>

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                  {project.tags.map((tag, ti) => (
                    <span key={tag} className={`badge ${tagColors[ti % tagColors.length]}`}>{tag}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', padding: '7px 16px', fontSize: 13 }}>
                      Live Demo ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-ghost" style={{ textDecoration: 'none', display: 'inline-block', padding: '7px 16px', fontSize: 13 }}>
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
