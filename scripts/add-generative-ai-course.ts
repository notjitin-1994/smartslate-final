import { getDb } from '../src/lib/db';

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
    const db = getDb();
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
    console.log(`✅ Successfully added/updated course: ${course.title}`);
    const { rows } = await db.query('SELECT COUNT(*)::int AS count FROM app.courses');
    console.log(`\n🎉 Total courses in database: ${rows?.[0]?.count ?? 0}`);
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
    process.exit(0);
  });
