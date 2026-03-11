import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const DB_PATH = path.join(process.cwd(), 'data');

function generateId() {
  return Math.random().toString(36).substr(2, 12) + Date.now().toString(36);
}

async function seed() {
  if (!fs.existsSync(DB_PATH)) {
    fs.mkdirSync(DB_PATH, { recursive: true });
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  const adminId = generateId();
  const admin = {
    id: adminId,
    email: 'admin@devfolio.dev',
    password: hashedPassword,
    name: 'Alex Devenko',
    role: 'admin',
    bio: 'Full-stack developer passionate about building elegant solutions. 5+ years of experience with React, Next.js, and Node.js.',
    createdAt: new Date().toISOString(),
  };
  fs.writeFileSync(path.join(DB_PATH, 'users.json'), JSON.stringify([admin], null, 2));
  console.log('✅ Admin user created: admin@devfolio.dev / admin123');

  // Create sample blog posts
  const posts = [
    {
      id: generateId(),
      title: 'Building a Modern Portfolio with Next.js 14',
      slug: 'building-modern-portfolio-nextjs-14',
      excerpt: 'Learn how to build a production-ready developer portfolio using the latest Next.js features including App Router, Server Components, and more.',
      content: `# Building a Modern Portfolio with Next.js 14\n\nIn this article, we'll explore how to build a stunning developer portfolio using Next.js 14 with the App Router.\n\n## Why Next.js?\n\nNext.js offers the perfect balance of performance and developer experience. With server components, you get lightning-fast pages without sacrificing interactivity.\n\n## Project Structure\n\nA well-organized portfolio needs clear separation of concerns:\n\n- **app/** — Your page routes\n- **components/** — Reusable UI components\n- **lib/** — Utilities and database access\n- **public/** — Static assets\n\n## Authentication\n\nFor a portfolio with a CMS dashboard, JWT-based authentication works perfectly. We use \`jose\` for edge-compatible token signing.\n\n## Conclusion\n\nWith Next.js 14, you can build a world-class portfolio that's fast, SEO-friendly, and easy to manage.`,
      published: true,
      tags: ['Next.js', 'React', 'TypeScript', 'Portfolio'],
      views: 142,
      authorId: adminId,
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      title: 'Mastering TypeScript: Advanced Patterns',
      slug: 'mastering-typescript-advanced-patterns',
      excerpt: 'Deep dive into advanced TypeScript patterns including conditional types, mapped types, template literals, and more to level up your code.',
      content: `# Mastering TypeScript: Advanced Patterns\n\nTypeScript's type system is incredibly powerful. Let's explore some advanced patterns.\n\n## Conditional Types\n\nConditional types allow you to create types that depend on other types:\n\n\`\`\`typescript\ntype IsString<T> = T extends string ? 'yes' : 'no';\n\`\`\`\n\n## Mapped Types\n\nMapped types allow you to transform existing types:\n\n\`\`\`typescript\ntype Readonly<T> = {\n  readonly [K in keyof T]: T[K];\n};\n\`\`\`\n\n## Template Literal Types\n\nPowerful for creating typed string patterns:\n\n\`\`\`typescript\ntype EventName = \`on\${Capitalize<string>}\`;\n\`\`\``,
      published: true,
      tags: ['TypeScript', 'JavaScript', 'Programming'],
      views: 89,
      authorId: adminId,
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      title: 'The Art of Clean Code: Principles That Matter',
      slug: 'art-of-clean-code-principles',
      excerpt: 'Explore timeless clean code principles that every developer should know — from naming conventions to SOLID principles and beyond.',
      content: `# The Art of Clean Code\n\nWriting code is easy. Writing **clean** code is an art form.\n\n## Meaningful Names\n\nNames should reveal intent. \`d\` tells us nothing. \`elapsedTimeInDays\` tells us everything.\n\n## Single Responsibility\n\nEvery function should do one thing, and do it well. If you need "and" to describe what a function does, it does too much.\n\n## Comments Are Lies\n\nCode should be self-explanatory. Comments rot. Code doesn't lie (well, usually).`,
      published: false,
      tags: ['Clean Code', 'Best Practices', 'Architecture'],
      views: 0,
      authorId: adminId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
  fs.writeFileSync(path.join(DB_PATH, 'posts.json'), JSON.stringify(posts, null, 2));
  console.log('✅ Sample posts created');

  // Create sample projects
  const projects = [
    {
      id: generateId(),
      title: 'DevFolio Platform',
      description: 'Full-stack portfolio platform with auth, CMS dashboard, and blog.',
      longDesc: 'A production-ready portfolio platform built with Next.js 14, TypeScript, and SQLite. Features include JWT authentication, blog CMS, project management dashboard, and responsive design.',
      image: null,
      demoUrl: 'https://devfolio.vercel.app',
      githubUrl: 'https://github.com/devenko/devfolio',
      tags: ['Next.js', 'TypeScript', 'SQLite', 'Tailwind'],
      featured: true,
      order: 1,
      authorId: adminId,
      createdAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      title: 'AI Chat Assistant',
      description: 'Real-time AI-powered chat with streaming responses and conversation history.',
      longDesc: 'Built with the OpenAI API and Next.js streaming. Features include multi-model support, conversation history, and a beautiful dark UI.',
      image: null,
      demoUrl: 'https://ai-chat.vercel.app',
      githubUrl: 'https://github.com/devenko/ai-chat',
      tags: ['OpenAI', 'Next.js', 'WebSockets', 'AI'],
      featured: true,
      order: 2,
      authorId: adminId,
      createdAt: new Date().toISOString(),
    },
    {
      id: generateId(),
      title: 'E-Commerce Dashboard',
      description: 'Modern analytics dashboard for e-commerce with real-time metrics.',
      longDesc: 'A comprehensive dashboard built with Recharts and Next.js. Displays sales metrics, user analytics, and inventory management.',
      image: null,
      demoUrl: 'https://ecom-dash.vercel.app',
      githubUrl: 'https://github.com/devenko/ecom-dashboard',
      tags: ['React', 'Recharts', 'Dashboard', 'Analytics'],
      featured: false,
      order: 3,
      authorId: adminId,
      createdAt: new Date().toISOString(),
    },
  ];
  fs.writeFileSync(path.join(DB_PATH, 'projects.json'), JSON.stringify(projects, null, 2));
  console.log('✅ Sample projects created');
  console.log('\n🚀 Database seeded successfully!');
  console.log('   Login: admin@devfolio.dev');
  console.log('   Password: admin123');
}

seed().catch(console.error);
