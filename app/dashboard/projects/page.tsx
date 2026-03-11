'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
  createdAt: string;
}

export default function ProjectsDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', longDesc: '', demoUrl: '', githubUrl: '', tags: '', featured: false, order: 0 });
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const r = await fetch('/api/projects');
    const d = await r.json();
    setProjects(d.projects || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ title: '', description: '', longDesc: '', demoUrl: '', githubUrl: '', tags: '', featured: false, order: 0 });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSave = async () => {
    if (!form.title || !form.description) return;
    setSaving(true);

    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };

    if (editingId) {
      await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingId, ...payload }),
      });
    } else {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }

    setSaving(false);
    resetForm();
    load();
  };

  const editProject = (p: Project) => {
    setForm({
      title: p.title,
      description: p.description,
      longDesc: '',
      demoUrl: p.demoUrl || '',
      githubUrl: p.githubUrl || '',
      tags: p.tags.join(', '),
      featured: p.featured,
      order: 0,
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 26, marginBottom: 4 }}>Projects</h1>
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>{projects.length} projects</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          + Add Project
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div className="card" style={{ width: '100%', maxWidth: 560, padding: 32, maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 20, marginBottom: 24 }}>
              {editingId ? 'Edit Project' : 'New Project'}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>TITLE *</label>
                <input className="input" placeholder="My Awesome Project" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>SHORT DESCRIPTION *</label>
                <input className="input" placeholder="Brief one-line description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>FULL DESCRIPTION</label>
                <textarea className="input" rows={3} placeholder="Detailed description..." value={form.longDesc} onChange={e => setForm(f => ({ ...f, longDesc: e.target.value }))} style={{ resize: 'vertical' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>DEMO URL</label>
                  <input className="input" placeholder="https://..." value={form.demoUrl} onChange={e => setForm(f => ({ ...f, demoUrl: e.target.value }))} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>GITHUB URL</label>
                  <input className="input" placeholder="https://github.com/..." value={form.githubUrl} onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>TAGS</label>
                <input className="input" placeholder="Next.js, TypeScript, React" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} style={{ width: 16, height: 16, accentColor: 'var(--accent)' }} />
                <label htmlFor="featured" style={{ fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Featured project</label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ flex: 1, padding: '11px' }}>
                {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Project'}
              </button>
              <button onClick={resetForm} className="btn-ghost" style={{ padding: '11px 20px' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Projects list */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 180 }} />)}
        </div>
      ) : projects.length === 0 ? (
        <div className="card" style={{ padding: 60, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚡</div>
          <p style={{ color: 'var(--muted)', marginBottom: 20 }}>No projects yet.</p>
          <button onClick={() => setShowForm(true)} className="btn-primary">Add First Project</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {projects.map(project => (
            <div key={project.id} className="card" style={{ padding: 20, position: 'relative' }}>
              {project.featured && (
                <div style={{ position: 'absolute', top: 12, right: 12 }}>
                  <span className="badge badge-yellow">Featured</span>
                </div>
              )}
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 17, marginBottom: 8, paddingRight: project.featured ? 70 : 0 }}>
                {project.title}
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>
                {project.description}
              </p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="badge badge-accent">{tag}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => editProject(project)} style={{ background: 'none', border: '1px solid var(--border2)', borderRadius: 6, padding: '6px 12px', color: 'var(--accent)', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                  Edit
                </button>
                <button onClick={() => deleteProject(project.id)} style={{ background: 'none', border: '1px solid var(--border2)', borderRadius: 6, padding: '6px 12px', color: 'var(--red)', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
