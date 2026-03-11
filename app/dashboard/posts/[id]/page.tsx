'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function PostEditorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === 'new';

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    published: false,
    tags: '',
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/blog/${id}`)
        .then(r => r.json())
        .then(d => {
          if (d.post) {
            setForm({
              title: d.post.title,
              slug: d.post.slug,
              excerpt: d.post.excerpt,
              content: d.post.content,
              published: d.post.published,
              tags: d.post.tags.join(', '),
            });
          }
          setLoading(false);
        });
    }
  }, [id, isNew]);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const handleTitleChange = (title: string) => {
    setForm(f => ({ ...f, title, slug: isNew ? generateSlug(title) : f.slug }));
  };

  const handleSave = async () => {
    if (!form.title || !form.slug || !form.excerpt || !form.content) {
      setError('Please fill all required fields');
      return;
    }
    setSaving(true);
    setError('');

    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    };

    const url = isNew ? '/api/blog' : `/api/blog/${id}`;
    const method = isNew ? 'POST' : 'PUT';

    const r = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const d = await r.json();
    setSaving(false);

    if (!r.ok) { setError(d.error || 'Save failed'); return; }
    router.push('/dashboard/posts');
  };

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 48 }} />)}
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link href="/dashboard/posts" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 14 }}>← Posts</Link>
          <span style={{ color: 'var(--border2)' }}>/</span>
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 22 }}>{isNew ? 'New Post' : 'Edit Post'}</h1>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => setPreview(!preview)} className="btn-ghost" style={{ padding: '8px 16px', fontSize: 13 }}>
            {preview ? '✏ Edit' : '👁 Preview'}
          </button>
          <button onClick={() => setForm(f => ({ ...f, published: !f.published }))} className={form.published ? 'btn-outline' : 'btn-ghost'} style={{ padding: '8px 16px', fontSize: 13 }}>
            {form.published ? '✓ Published' : 'Draft'}
          </button>
          <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ padding: '8px 20px', fontSize: 14 }}>
            {saving ? 'Saving...' : isNew ? 'Publish' : 'Save'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(248,81,73,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 20, color: 'var(--red)', fontSize: 14 }}>
          ⚠ {error}
        </div>
      )}

      {preview ? (
        <div className="card" style={{ padding: 40 }}>
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 36, marginBottom: 12 }}>{form.title || 'Untitled'}</h1>
          <p style={{ color: 'var(--muted)', fontSize: 17, marginBottom: 24 }}>{form.excerpt}</p>
          <div className="divider" />
          <div className="prose" style={{ maxWidth: '100%', whiteSpace: 'pre-wrap', color: 'var(--text)' }}>
            {form.content}
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'start' }}>
          {/* Main editor */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <input
              className="input"
              placeholder="Post title..."
              value={form.title}
              onChange={e => handleTitleChange(e.target.value)}
              style={{ fontSize: 22, fontFamily: 'Syne', fontWeight: 700, padding: '14px 16px' }}
            />
            <textarea
              className="input"
              placeholder="Short excerpt / description..."
              value={form.excerpt}
              onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
              rows={3}
              style={{ resize: 'vertical' }}
            />
            <textarea
              className="input"
              placeholder="Write your content in Markdown...&#10;&#10;# Heading&#10;## Subheading&#10;**bold** *italic* `code`&#10;```js&#10;// code block&#10;```"
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              rows={24}
              style={{ resize: 'vertical', fontFamily: 'Space Mono', fontSize: 13, lineHeight: 1.7 }}
            />
          </div>

          {/* Sidebar settings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Post Settings</h3>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>URL SLUG</label>
                <input className="input" placeholder="my-post-slug" value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} style={{ fontFamily: 'Space Mono', fontSize: 12 }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>TAGS (comma separated)</label>
                <input className="input" placeholder="Next.js, TypeScript, React" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} style={{ fontSize: 13 }} />
              </div>
            </div>

            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 15, marginBottom: 12 }}>Status</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: form.published ? 'var(--green)' : 'var(--accent3)', boxShadow: form.published ? '0 0 8px var(--green)' : 'none' }} />
                <span style={{ fontWeight: 600, fontSize: 14, color: form.published ? 'var(--green)' : 'var(--accent3)' }}>
                  {form.published ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>

            <div className="card" style={{ padding: 20 }}>
              <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Markdown Help</h3>
              {[
                ['# H1', 'Heading 1'],
                ['## H2', 'Heading 2'],
                ['**text**', 'Bold'],
                ['*text*', 'Italic'],
                ['`code`', 'Inline code'],
                ['```lang', 'Code block'],
              ].map(([syntax, desc]) => (
                <div key={syntax} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <code style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--accent)' }}>{syntax}</code>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
