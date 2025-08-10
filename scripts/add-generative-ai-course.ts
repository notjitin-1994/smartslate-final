import prisma from '../src/lib/prisma';

async function addGenerativeAICourse() {
  const course = {
    id: 'course-generative-ai',
    title: 'Building Applications with Generative AI',
    description: 'Learn to build cutting-edge applications using generative AI technologies and large language models.',
    slug: 'building-applications-with-generative-ai',
    imageUrl: '/images/courses/generativeaiaps.jpg',
    category: 'AI & Machine Learning',
    level: 'Advanced',
    status: 'Release not scheduled yet',
    statusColor: 'yellow',
    published: true
  };

  try {
    await prisma.course.upsert({
      where: { slug: course.slug },
      update: {
        title: course.title,
        description: course.description,
        imageUrl: course.imageUrl,
        category: course.category,
        level: course.level,
        status: course.status,
        statusColor: course.statusColor,
        published: course.published,
        updatedAt: new Date()
      },
      create: {
        id: course.id,
        title: course.title,
        description: course.description,
        slug: course.slug,
        imageUrl: course.imageUrl,
        category: course.category,
        level: course.level,
        status: course.status,
        statusColor: course.statusColor,
        published: course.published,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
    
    console.log(`✅ Successfully added course: ${course.title}`);
    
    const count = await prisma.course.count();
    console.log(`\n🎉 Total courses in database: ${count}`);
    
  } catch (error) {
    console.error(`❌ Failed to add course:`, error);
  }
}

addGenerativeAICourse()
  .catch((e) => {
    console.error('Error adding course:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
