import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = db.posts.findBySlug(slug);
  if (!post) return { title: 'Not Found' };
  return { title: post.title, description: post.excerpt };
}

function renderMarkdown(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hupol])/gm, '<p>$&')
    .replace(/(?<![>])$/gm, '$&</p>');
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = db.posts.findBySlug(slug);
  if (!post || !post.published) notFound();

  db.posts.incrementViews(post.id);

  const html = renderMarkdown(post.content);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '60px 24px 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Link href="/blog" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 14, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
            ← Back to Blog
          </Link>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
            {post.tags.map((tag) => (
              <span key={tag} className="badge badge-purple">{tag}</span>
            ))}
          </div>

          <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: 20, lineHeight: 1.2 }}>
            {post.title}
          </h1>

          <p style={{ color: 'var(--muted)', fontSize: 17, lineHeight: 1.7, marginBottom: 24 }}>
            {post.excerpt}
          </p>

          <div style={{ display: 'flex', gap: 24, color: 'var(--muted)', fontSize: 13, fontFamily: 'Space Mono' }}>
            <span>{new Date(post.createdAt).toLocaleDateString('en', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>{post.views} views</span>
            <span>~{Math.ceil(post.content.split(' ').length / 200)} min read</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <div
          className="prose"
          style={{ maxWidth: '100%' }}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="divider" style={{ margin: '60px 0 40px' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/blog" className="btn-ghost" style={{ textDecoration: 'none', display: 'inline-block' }}>
            ← All Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
