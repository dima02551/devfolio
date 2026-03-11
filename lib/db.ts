import fs from 'fs';
import path from 'path';
import { randomBytes } from 'crypto';

const DB_PATH = path.join(process.cwd(), 'data');

export function generateId(): string {
  return randomBytes(12).toString('hex');
}

function ensureDir() {
  if (!fs.existsSync(DB_PATH)) {
    fs.mkdirSync(DB_PATH, { recursive: true });
  }
}

function readFile<T>(filename: string, defaultValue: T): T {
  ensureDir();
  const filePath = path.join(DB_PATH, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2));
    return defaultValue;
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T;
}

function writeFile<T>(filename: string, data: T): void {
  ensureDir();
  const filePath = path.join(DB_PATH, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
  bio?: string;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  coverImage?: string;
  tags: string[];
  views: number;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDesc?: string;
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  tags: string[];
  featured: boolean;
  order: number;
  authorId: string;
  createdAt: string;
}

// Users
export const db = {
  users: {
    findAll: (): User[] => readFile<User[]>('users.json', []),
    findByEmail: (email: string) => db.users.findAll().find(u => u.email === email),
    findById: (id: string) => db.users.findAll().find(u => u.id === id),
    create: (data: Omit<User, 'id' | 'createdAt'>): User => {
      const users = db.users.findAll();
      const user: User = { ...data, id: generateId(), createdAt: new Date().toISOString() };
      writeFile('users.json', [...users, user]);
      return user;
    },
    update: (id: string, data: Partial<User>): User | null => {
      const users = db.users.findAll();
      const idx = users.findIndex(u => u.id === id);
      if (idx === -1) return null;
      users[idx] = { ...users[idx], ...data };
      writeFile('users.json', users);
      return users[idx];
    },
  },

  posts: {
    findAll: (): Post[] => readFile<Post[]>('posts.json', []),
    findPublished: () => db.posts.findAll().filter(p => p.published),
    findBySlug: (slug: string) => db.posts.findAll().find(p => p.slug === slug),
    findById: (id: string) => db.posts.findAll().find(p => p.id === id),
    create: (data: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Post => {
      const posts = db.posts.findAll();
      const now = new Date().toISOString();
      const post: Post = { ...data, id: generateId(), views: 0, createdAt: now, updatedAt: now };
      writeFile('posts.json', [...posts, post]);
      return post;
    },
    update: (id: string, data: Partial<Post>): Post | null => {
      const posts = db.posts.findAll();
      const idx = posts.findIndex(p => p.id === id);
      if (idx === -1) return null;
      posts[idx] = { ...posts[idx], ...data, updatedAt: new Date().toISOString() };
      writeFile('posts.json', posts);
      return posts[idx];
    },
    delete: (id: string): boolean => {
      const posts = db.posts.findAll();
      const filtered = posts.filter(p => p.id !== id);
      if (filtered.length === posts.length) return false;
      writeFile('posts.json', filtered);
      return true;
    },
    incrementViews: (id: string) => {
      const posts = db.posts.findAll();
      const idx = posts.findIndex(p => p.id === id);
      if (idx !== -1) {
        posts[idx].views += 1;
        writeFile('posts.json', posts);
      }
    },
  },

  projects: {
    findAll: (): Project[] => readFile<Project[]>('projects.json', []),
    findFeatured: () => db.projects.findAll().filter(p => p.featured),
    findById: (id: string) => db.projects.findAll().find(p => p.id === id),
    create: (data: Omit<Project, 'id' | 'createdAt'>): Project => {
      const projects = db.projects.findAll();
      const project: Project = { ...data, id: generateId(), createdAt: new Date().toISOString() };
      writeFile('projects.json', [...projects, project]);
      return project;
    },
    update: (id: string, data: Partial<Project>): Project | null => {
      const projects = db.projects.findAll();
      const idx = projects.findIndex(p => p.id === id);
      if (idx === -1) return null;
      projects[idx] = { ...projects[idx], ...data };
      writeFile('projects.json', projects);
      return projects[idx];
    },
    delete: (id: string): boolean => {
      const projects = db.projects.findAll();
      const filtered = projects.filter(p => p.id !== id);
      if (filtered.length === projects.length) return false;
      writeFile('projects.json', filtered);
      return true;
    },
  },
};
