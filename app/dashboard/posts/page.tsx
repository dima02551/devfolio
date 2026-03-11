'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
interface Post { id:string; title:string; slug:string; published:boolean; views:number; tags:string[]; createdAt:string; updatedAt:string; }
export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string|null>(null);
  const load = async () => { setLoading(true); const r=await fetch('/api/blog?all=true'); const d=await r.json(); setPosts(d.posts||[]); setLoading(false); };
  useEffect(()=>{load();},[]);
  const togglePublish = async (post:Post) => { await fetch(`/api/blog/${post.id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({published:!post.published})}); load(); };
  const deletePost = async (id:string) => { if(!confirm('Удалить эту статью?'))return; setDeleting(id); await fetch(`/api/blog/${id}`,{method:'DELETE'}); setDeleting(null); load(); };
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
        <div>
          <h1 style={{ fontFamily:'Syne', fontWeight:800, fontSize:26, marginBottom:4 }}>Статьи блога</h1>
          <p style={{ color:'var(--muted)', fontSize:14 }}>{posts.length} статей всего</p>
        </div>
        <Link href="/dashboard/posts/new" className="btn-primary" style={{ textDecoration:'none', display:'inline-block' }}>+ Новая статья</Link>
      </div>
      {loading ? (
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>{[1,2,3].map(i=><div key={i} className="skeleton" style={{ height:72 }} />)}</div>
      ) : posts.length===0 ? (
        <div className="card" style={{ padding:60, textAlign:'center' }}>
          <div style={{ fontSize:48, marginBottom:16 }}>📝</div>
          <p style={{ color:'var(--muted)', marginBottom:20 }}>Статей пока нет. Напишите первую!</p>
          <Link href="/dashboard/posts/new" className="btn-primary" style={{ textDecoration:'none', display:'inline-block' }}>Написать первую статью</Link>
        </div>
      ) : (
        <div className="card" style={{ overflow:'hidden' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ borderBottom:'1px solid var(--border)' }}>
                {['Заголовок','Статус','Просмотры','Обновлено','Действия'].map(h=>(
                  <th key={h} style={{ padding:'12px 16px', textAlign:'left', fontFamily:'Space Mono', fontSize:11, color:'var(--muted)', fontWeight:600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} style={{ borderBottom:'1px solid var(--border)' }}>
                  <td style={{ padding:'14px 16px' }}>
                    <div style={{ fontWeight:600, fontSize:14, marginBottom:4 }}>{post.title}</div>
                    <div style={{ fontFamily:'Space Mono', fontSize:11, color:'var(--muted)' }}>/{post.slug}</div>
                  </td>
                  <td style={{ padding:'14px 16px' }}><span className={`badge ${post.published?'badge-green':'badge-yellow'}`}>{post.published?'Опубликовано':'Черновик'}</span></td>
                  <td style={{ padding:'14px 16px', fontFamily:'Space Mono', fontSize:13, color:'var(--muted)' }}>{post.views}</td>
                  <td style={{ padding:'14px 16px', fontFamily:'Space Mono', fontSize:12, color:'var(--muted)' }}>{new Date(post.updatedAt).toLocaleDateString('ru',{month:'short',day:'numeric'})}</td>
                  <td style={{ padding:'14px 16px' }}>
                    <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                      <Link href={`/dashboard/posts/${post.id}`} style={{ color:'var(--accent)', textDecoration:'none', fontSize:13, fontWeight:600 }}>Изменить</Link>
                      <button onClick={()=>togglePublish(post)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--muted)', fontSize:13, fontWeight:600, padding:0 }}>{post.published?'Снять':'Опубликовать'}</button>
                      {post.published&&<Link href={`/blog/${post.slug}`} target="_blank" style={{ color:'var(--muted)', textDecoration:'none', fontSize:13 }}>Смотреть ↗</Link>}
                      <button onClick={()=>deletePost(post.id)} disabled={deleting===post.id} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--red)', fontSize:13, fontWeight:600, padding:0 }}>{deleting===post.id?'...':'Удалить'}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
