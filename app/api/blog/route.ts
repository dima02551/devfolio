import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get('all') === 'true';
  const session = await getSession();

  let posts = all && session ? db.posts.findAll() : db.posts.findPublished();
  posts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { title, slug, excerpt, content, published = false, coverImage, tags = [] } = body;

  if (!title || !slug || !excerpt || !content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const existing = db.posts.findBySlug(slug);
  if (existing) {
    return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
  }

  const post = db.posts.create({ title, slug, excerpt, content, published, coverImage, tags, authorId: session.userId });
  return NextResponse.json({ post }, { status: 201 });
}
