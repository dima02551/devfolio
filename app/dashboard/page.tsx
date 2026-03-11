import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect('/login');

  const posts = db.posts.findAll();
  const projects = db.projects.findAll();
  const publishedPosts = posts.filter(p => p.published);
  const totalViews = posts.reduce((sum, p) => sum + p.views, 0);
  const featuredProjects = projects.filter(p => p.featured);

  const stats = [
    { label: 'Total Posts', value: posts.length, sub: `${publishedPosts.length} published`, color: 'var(--accent)', icon: '✏' },
    { label: 'Projects', value: projects.length, sub: `${featuredProjects.length} featured`, color: '#a78bfa', icon: '⚡' },
    { label: 'Total Views', value: totalViews, sub: 'across all posts', color: 'var(--green)', icon: '👁' },
    { label: 'Drafts', value: posts.length - publishedPosts.length, sub: 'unpublished', color: 'var(--accent3)', icon: '📝' },
  ];

  const recentPosts = posts
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 28, marginBottom: 6 }}>
          Welcome back 👋
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 15 }}>
          Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
        {stats.map((stat) => (
          <div key={stat.label} className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div style={{ fontSize: 24 }}>{stat.icon}</div>
              <span style={{ fontFamily: 'Space Mono', fontSize: 11, color: 'var(--muted)' }}>TODAY</span>
            </div>
            <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 36, color: stat.color, marginBottom: 4 }}>
              {stat.value}
            </div>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{stat.label}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        {/* Recent Posts */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 18 }}>Recent Posts</h2>
            <Link href="/dashboard/posts" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: 13, fontWeight: 600 }}>
              Manage →
            </Link>
          </div>

          {recentPosts.length === 0 ? (
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>No posts yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {recentPosts.map(post => (
                <div key={post.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {post.title}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>
                      {post.views} views
                    </div>
                  </div>
                  <span className={`badge ${post.published ? 'badge-green' : 'badge-yellow'}`} style={{ marginLeft: 12, flexShrink: 0 }}>
                    {post.published ? 'Live' : 'Draft'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 18, marginBottom: 20 }}>Quick Actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { href: '/dashboard/posts/new', label: 'Write New Post', icon: '✏', color: 'var(--accent)' },
              { href: '/dashboard/projects/new', label: 'Add Project', icon: '⚡', color: '#a78bfa' },
              { href: '/dashboard/settings', label: 'Edit Profile', icon: '👤', color: 'var(--accent3)' },
              { href: '/', label: 'View Portfolio', icon: '🌐', color: 'var(--green)' },
            ].map((action) => (
              <Link key={action.href} href={action.href} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'var(--surface2)', borderRadius: 8, textDecoration: 'none', border: '1px solid var(--border)', transition: 'border-color 0.15s' }}>
                <span style={{ fontSize: 18 }}>{action.icon}</span>
                <span style={{ fontWeight: 600, fontSize: 14, color: action.color }}>{action.label}</span>
                <span style={{ marginLeft: 'auto', color: 'var(--muted)', fontSize: 14 }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
