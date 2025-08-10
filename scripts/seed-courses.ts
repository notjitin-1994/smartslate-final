import prisma from '../src/lib/prisma';

const courses = [
  {
    id: 'course-ai-foundations',
    title: 'AI Foundations: Concept to Application',
    description: 'Unlock the power of AI and learn to leverage it for personal and professional growth.',
    slug: 'ai-foundations-concept-to-application',
    imageUrl: '/images/courses/AILiteracy.jpg',
    category: 'Technology',
    level: 'Intermediate',
    status: 'Releasing in Aug',
    statusColor: 'green',
    published: true
  },
  {
    id: 'course-data-science',
    title: 'Applied Data Science with Python',
    description: 'Master the tools and techniques to analyze data and build predictive models.',
    slug: 'applied-data-science-with-python',
    imageUrl: '/images/courses/applieddatascience.jpg',
    category: 'Data Science',
    level: 'Advanced',
    status: 'Release not scheduled yet',
    statusColor: 'yellow',
    published: true
  },
  {
    id: 'course-aws-architect',
    title: 'AWS Solutions Architect - Professional',
    description: 'Design and deploy scalable, highly available, and fault-tolerant systems on AWS.',
    slug: 'aws-solutions-architect-professional',
    imageUrl: '/images/courses/awssolutionsarchitect.jpg',
    category: 'Cloud Computing',
    level: 'Advanced',
    status: 'Release not scheduled yet',
    statusColor: 'yellow',
    published: true
  },
  {
    id: 'course-ethical-hacker',
    title: 'Certified Ethical Hacker (CEH)',
    description: 'Learn to think like a hacker to defend against and identify network vulnerabilities.',
    slug: 'certified-ethical-hacker-ceh',
    imageUrl: '/images/courses/certifiedethicalhacker.jpg',
    category: 'Cybersecurity',
    level: 'Advanced',
    status: 'Release not scheduled yet',
    statusColor: 'yellow',
    published: true
  },
  {
    id: 'course-fullstack-dev',
    title: 'Advanced Full-Stack Development with TypeScript',
    description: 'Build robust, scalable, and maintainable web applications from end to end.',
    slug: 'advanced-full-stack-development-with-typescript',
    imageUrl: '/images/courses/advancedfullstackdevelopment.jpg',
    category: 'Development',
    level: 'Advanced',
    status: 'Release not scheduled yet',
    statusColor: 'yellow',
    published: true
  },
  {
    id: 'course-product-management',
    title: 'Technical Product Management & Agile Leadership',
    description: 'Lead product teams and drive the development of successful tech products.',
    slug: 'technical-product-management-agile-leadership',
    imageUrl: '/images/courses/technicalproductmanagement.jpg',
    category: 'Management',
    level: 'Intermediate',
    status: 'Release not scheduled yet',
    statusColor: 'yellow',
    published: true
  },
  {
    id: 'course-performance-marketing',
    title: 'Data-Driven Performance Marketing',
    description: 'Optimize marketing campaigns and maximize ROI with data-driven strategies.',
    slug: 'data-driven-performance-marketing',
    imageUrl: '/images/courses/performancemarketing.jpg',
    category: 'Marketing',
    level: 'Intermediate',
    status: 'Release not scheduled yet',
    statusColor: 'yellow',
    published: true
  },
  {
    id: 'course-blockchain',
    title: 'Enterprise Blockchain Solutions',
    description: 'Explore the potential of blockchain technology for enterprise applications.',
    slug: 'enterprise-blockchain-solutions',
    imageUrl: '/images/courses/enterpriseblockchain.jpg',
    category: 'Technology',
    level: 'Advanced',
    status: 'Release not scheduled yet',
    statusColor: 'yellow',
    published: true
  },
  {
    id: 'course-devops',
    title: 'Advanced DevOps: Kubernetes and CI/CD Pipelines',
    description: 'Automate and streamline the software development and deployment lifecycle.',
    slug: 'advanced-devops-kubernetes-cicd-pipelines',
    imageUrl: '/images/courses/advanceddevops.jpg',
    category: 'DevOps',
    level: 'Advanced',
    status: 'Release not scheduled yet',
    statusColor: 'yellow',
    published: true
  }
];

async function seedCourses() {
  console.log('🌱 Starting course seeding...');
  
  for (const course of courses) {
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
      console.log(`✅ Seeded course: ${course.title}`);
    } catch (error) {
      console.error(`❌ Failed to seed course ${course.title}:`, error);
    }
  }
  
  const count = await prisma.course.count();
  console.log(`\n🎉 Course seeding completed! Total courses in database: ${count}`);
}

seedCourses()
  .catch((e) => {
    console.error('Error seeding courses:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
