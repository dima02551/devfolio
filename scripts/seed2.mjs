import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const DB_PATH = path.join(process.cwd(), 'data');
function generateId() { return Math.random().toString(36).substr(2,12)+Date.now().toString(36); }

async function seed() {
  if (!fs.existsSync(DB_PATH)) fs.mkdirSync(DB_PATH,{recursive:true});

  const hashedPassword = await bcrypt.hash('admin123',12);
  const adminId = generateId();
  const admin = { id:adminId, email:'admin@devfolio.dev', password:hashedPassword, name:'Алекс Девенко', role:'admin', bio:'Full-stack разработчик, влюблённый в элегантные решения. 5+ лет опыта с React, Next.js и Node.js.', createdAt:new Date().toISOString() };
  fs.writeFileSync(path.join(DB_PATH,'users.json'),JSON.stringify([admin],null,2));
  console.log('✅ Администратор создан: admin@devfolio.dev / admin123');

  const posts = [
    {
      id:generateId(), title:'Создание современного портфолио на Next.js 14',
      slug:'sozdanie-portfolio-nextjs-14',
      excerpt:'Разбираем, как построить готовое к продакшну портфолио разработчика с использованием App Router, Server Components и других новых возможностей Next.js.',
      content:`# Создание современного портфолио на Next.js 14\n\nВ этой статье мы разберём, как построить потрясающее портфолио на Next.js 14 с App Router.\n\n## Почему Next.js?\n\nNext.js предлагает идеальный баланс производительности и удобства разработки. С Server Components вы получаете молниеносные страницы без потери интерактивности.\n\n## Структура проекта\n\nХорошо организованное портфолио должно иметь чёткое разделение ответственности:\n\n- **app/** — маршруты страниц\n- **components/** — переиспользуемые UI компоненты\n- **lib/** — утилиты и доступ к базе данных\n- **public/** — статические ресурсы\n\n## Аутентификация\n\nДля портфолио с CMS-дашбордом отлично подходит JWT-аутентификация. Используем \`jose\` для edge-совместимой подписи токенов.\n\n## Заключение\n\nС Next.js 14 вы можете создать первоклассное портфолио — быстрое, SEO-оптимизированное и удобное в управлении.`,
      published:true, tags:['Next.js','React','TypeScript','Портфолио'], views:142, authorId:adminId,
      createdAt:new Date(Date.now()-7*24*60*60*1000).toISOString(), updatedAt:new Date().toISOString(),
    },
    {
      id:generateId(), title:'Мастерство TypeScript: продвинутые паттерны',
      slug:'masterstvo-typescript-prodvinutye-patterny',
      excerpt:'Глубокое погружение в продвинутые паттерны TypeScript: условные типы, mapped types, template literal типы и многое другое для прокачки вашего кода.',
      content:`# Мастерство TypeScript: продвинутые паттерны\n\nСистема типов TypeScript невероятно мощная. Изучим продвинутые паттерны.\n\n## Условные типы\n\nУсловные типы позволяют создавать типы, зависящие от других типов:\n\n\`\`\`typescript\ntype IsString<T> = T extends string ? 'да' : 'нет';\n\`\`\`\n\n## Mapped Types\n\nMapped types позволяют трансформировать существующие типы:\n\n\`\`\`typescript\ntype Readonly<T> = {\n  readonly [K in keyof T]: T[K];\n};\n\`\`\`\n\n## Template Literal Types\n\nМощный инструмент для создания типизированных строковых паттернов:\n\n\`\`\`typescript\ntype EventName = \`on\${Capitalize<string>}\`;\n\`\`\``,
      published:true, tags:['TypeScript','JavaScript','Программирование'], views:89, authorId:adminId,
      createdAt:new Date(Date.now()-14*24*60*60*1000).toISOString(), updatedAt:new Date().toISOString(),
    },
    {
      id:generateId(), title:'Искусство чистого кода: принципы, которые важны',
      slug:'iskusstvo-chistogo-koda',
      excerpt:'Изучаем вечные принципы чистого кода, которые должен знать каждый разработчик — от соглашений об именовании до SOLID принципов.',
      content:`# Искусство чистого кода\n\nПисать код легко. Писать **чистый** код — это искусство.\n\n## Понятные имена\n\nИмена должны раскрывать намерение. \`d\` ничего нам не говорит. \`elapsedTimeInDays\` говорит всё.\n\n## Единственная ответственность\n\nКаждая функция должна делать одно и делать это хорошо. Если для описания функции нужен союз «и», она делает слишком много.\n\n## Комментарии — это ложь\n\nКод должен быть самодокументирующимся. Комментарии устаревают. Код не лжёт (ну, обычно).`,
      published:false, tags:['Чистый код','Лучшие практики','Архитектура'], views:0, authorId:adminId,
      createdAt:new Date().toISOString(), updatedAt:new Date().toISOString(),
    },
  ];
  fs.writeFileSync(path.join(DB_PATH,'posts.json'),JSON.stringify(posts,null,2));
  console.log('✅ Демо-статьи созданы');

  const projects = [
    {
      id:generateId(), title:'DevFolio Platform',
      description:'Full-stack платформа портфолио с авторизацией, CMS-дашбордом и блогом.',
      longDesc:'Готовая к продакшну платформа, построенная на Next.js 16, TypeScript и SQLite. Включает JWT-аутентификацию, блог-CMS, управление проектами и адаптивный дизайн.',
      image:null, demoUrl:'https://devfolio.vercel.app', githubUrl:'https://github.com/dima02551/devfolio',
      tags:['Next.js','TypeScript','SQLite','Tailwind'], featured:true, order:1, authorId:adminId, createdAt:new Date().toISOString(),
    },
    {
      id:generateId(), title:'AI Chat Ассистент',
      description:'Чат с ИИ в реальном времени со стриминговыми ответами и историей диалогов.',
      longDesc:'Построен на OpenAI API и Next.js с поддержкой стриминга. Поддержка нескольких моделей, история диалогов и красивый тёмный интерфейс.',
      image:null, demoUrl:'https://ai-chat.vercel.app', githubUrl:'https://github.com/dima02551/ai-chat',
      tags:['OpenAI','Next.js','WebSockets','AI'], featured:true, order:2, authorId:adminId, createdAt:new Date().toISOString(),
    },
    {
      id:generateId(), title:'E-Commerce Дашборд',
      description:'Современный аналитический дашборд для интернет-магазина с метриками в реальном времени.',
      longDesc:'Комплексный дашборд на Recharts и Next.js. Отображает метрики продаж, аналитику пользователей и управление складом.',
      image:null, demoUrl:'https://ecom-dash.vercel.app', githubUrl:'https://github.com/dima02551/ecom-dashboard',
      tags:['React','Recharts','Дашборд','Аналитика'], featured:false, order:3, authorId:adminId, createdAt:new Date().toISOString(),
    },
  ];
  fs.writeFileSync(path.join(DB_PATH,'projects.json'),JSON.stringify(projects,null,2));
  console.log('✅ Демо-проекты созданы');
  console.log('\n🚀 База данных наполнена успешно!');
  console.log('   Логин: admin@devfolio.dev');
  console.log('   Пароль: admin123');
}
seed().catch(console.error);
