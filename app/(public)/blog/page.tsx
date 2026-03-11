import Link from 'next/link';
import { db } from '@/lib/db';
export const metadata = { title: 'Блог' };
export default function BlogPage() {
  const posts = db.posts.findPublished().sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '60px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontFamily: 'Space Mono', color: 'var(--accent)', fontSize: 12, marginBottom: 12 }}>// БЛОГ</div>
          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: 16 }}>Статьи и мысли</h1>
          <p style={{ color: 'var(--muted)', fontSize: 17 }}>Пишу о веб-разработке, архитектуре и инженерных практиках.</p>
        </div>
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
            <p>Статей пока нет. Заходите позже!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <article className="card card-glow" style={{ padding: '28px 32px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                    {post.tags.map((tag) => (<span key={tag} className="badge badge-purple">{tag}</span>))}
                  </div>
                  <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 22, marginBottom: 10, color: 'var(--text)' }}>{post.title}</h2>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 20 }}>{post.excerpt}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)' }}>
                      {new Date(post.createdAt).toLocaleDateString('ru', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <span style={{ fontFamily: 'Space Mono', fontSize: 12, color: 'var(--muted)' }}>{post.views} просмотров</span>
                      <span style={{ color: 'var(--accent)', fontSize: 13, fontWeight: 600 }}>Читать →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
