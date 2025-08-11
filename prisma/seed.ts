// Use Prisma Client directly for seeding
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding roles...');
  try {
    const { seedRoles } = require('../src/lib/rbac-db');
    if (typeof seedRoles === 'function') await seedRoles();
  } catch {
    console.warn('seedRoles not available, skipping role seeding');
  }

  console.log('Creating sample course...');
  const courseId = 'ai-foundations';
  const course = await prisma.course.upsert({
    where: { id: courseId },
    create: {
      id: courseId,
      slug: 'ai-foundations-concept-to-application',
      title: 'AI Foundations: Concept to Application',
      description: 'Learn the fundamentals of AI and apply them to real projects.',
      published: true,
      updatedAt: new Date(),
    },
    update: {},
  });

  console.log('Creating modules...');
  const moduleIntro = await prisma.module.upsert({
    where: { id: 'mod-intro' },
    create: { id: 'mod-intro', courseId: course.id, title: 'Introduction', order: 1, updatedAt: new Date() },
    update: {},
  });
  const moduleBuild = await prisma.module.upsert({
    where: { id: 'mod-build' },
    create: { id: 'mod-build', courseId: course.id, title: 'Build & Apply', order: 2, updatedAt: new Date() },
    update: {},
  });

  console.log('Creating lessons...');
  await prisma.lesson.upsert({
    where: { id: 'les-welcome' },
    create: {
      id: 'les-welcome',
      moduleId: moduleIntro.id,
      title: 'Welcome to the Course',
      type: 'TEXT',
      order: 1,
      textContent: 'Welcome! This course will take you from concepts to real-world applications.',
      updatedAt: new Date(),
    },
    update: {},
  });

  await prisma.lesson.upsert({
    where: { id: 'les-video1' },
    create: {
      id: 'les-video1',
      moduleId: moduleIntro.id,
      title: 'What is AI?',
      type: 'VIDEO',
      order: 2,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      metadata: { durationSec: 300 },
      updatedAt: new Date(),
    },
    update: {},
  });

  await prisma.lesson.upsert({
    where: { id: 'les-quiz1' },
    create: {
      id: 'les-quiz1',
      moduleId: moduleIntro.id,
      title: 'Intro Quiz',
      type: 'QUIZ',
      order: 3,
      quizSpec: {
        questions: [
          { id: 'q1', type: 'mc', prompt: 'AI stands for?', options: ['Awesome Intelligence', 'Artificial Intelligence'], answer: 1 },
        ],
      },
      updatedAt: new Date(),
    },
    update: {},
  });

  await prisma.lesson.upsert({
    where: { id: 'les-file1' },
    create: {
      id: 'les-file1',
      moduleId: moduleBuild.id,
      title: 'Download Dataset',
      type: 'FILE',
      order: 1,
      fileUrl: 'https://example.com/datasets/sample.csv',
      metadata: { filename: 'sample.csv', size: 1024 },
      updatedAt: new Date(),
    },
    update: {},
  });

  await prisma.lesson.upsert({
    where: { id: 'les-embed1' },
    create: {
      id: 'les-embed1',
      moduleId: moduleBuild.id,
      title: 'Embedded Demo',
      type: 'EMBED',
      order: 2,
      videoUrl: 'https://codesandbox.io/embed/demo',
      metadata: { provider: 'codesandbox' },
      updatedAt: new Date(),
    },
    update: {},
  });

  console.log('Seed completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

