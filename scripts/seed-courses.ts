import { getDb } from '../src/lib/db';

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
  
  const db = getDb();
  for (const course of courses) {
    try {
      await db.query(
        `INSERT INTO app.courses (id, title, description, slug, image_url, category, level, status, status_color, published, created_at, updated_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, now(), now())
         ON CONFLICT (slug) DO UPDATE SET
           title = EXCLUDED.title,
           description = EXCLUDED.description,
           image_url = EXCLUDED.image_url,
           category = EXCLUDED.category,
           level = EXCLUDED.level,
           status = EXCLUDED.status,
           status_color = EXCLUDED.status_color,
           published = EXCLUDED.published,
           updated_at = now()`,
        [
          course.id,
          course.title,
          course.description,
          course.slug,
          course.imageUrl,
          course.category,
          course.level,
          course.status,
          course.statusColor,
          course.published,
        ]
      );
      console.log(`✅ Seeded course: ${course.title}`);
    } catch (error) {
      console.error(`❌ Failed to seed course ${course.title}:`, error);
    }
  }
  
  const { rows } = await db.query('SELECT COUNT(*)::int AS count FROM app.courses');
  console.log(`\n🎉 Course seeding completed! Total courses in database: ${rows?.[0]?.count ?? 0}`);
}

seedCourses()
  .catch((e) => {
    console.error('Error seeding courses:', e);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });
