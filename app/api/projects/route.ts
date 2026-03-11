import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const featured = searchParams.get('featured') === 'true';
  const projects = featured ? db.projects.findFeatured() : db.projects.findAll();
  return NextResponse.json({ projects: projects.sort((a, b) => a.order - b.order) });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { title, description, longDesc, image, demoUrl, githubUrl, tags = [], featured = false, order = 0 } = body;

  if (!title || !description) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const project = db.projects.create({ title, description, longDesc, image, demoUrl, githubUrl, tags, featured, order, authorId: session.userId });
  return NextResponse.json({ project }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { id, ...data } = body;
  const project = db.projects.update(id, data);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ project });
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const ok = db.projects.delete(id);
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ success: true });
}
