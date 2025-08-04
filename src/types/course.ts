export interface Course {
  title: string;
  description: string;
  status: string;
  statusColor: 'releasing-soon' | 'unscheduled' | 'horizon';
  imageUrl: string;
  slug: string;
}

export const courseData: Course[] = [
  {
    title: '<span class="accent">AI Foundations</span>: Concept to Application',
    description: 'Unlock the power of AI and learn to leverage it for personal and professional growth.',
    status: 'Releasing in Aug',
    statusColor: 'releasing-soon',
    imageUrl: '/images/courses/AILiteracy.jpg',
    slug: 'ai-foundations-concept-to-application'
  },
  {
    title: 'Applied Data Science with Python',
    description: 'Master the tools and techniques to analyze data and build predictive models.',
    status: 'Release not scheduled yet',
    statusColor: 'unscheduled',
    imageUrl: '/images/courses/applieddatascience.jpg',
    slug: 'applied-data-science-with-python'
  },
  {
    title: 'AWS Solutions Architect - Professional',
    description: 'Design and deploy scalable, highly available, and fault-tolerant systems on AWS.',
    status: 'Release not scheduled yet',
    statusColor: 'unscheduled',
    imageUrl: '/images/courses/awssolutionsarchitect.jpg',
    slug: 'aws-solutions-architect-professional'
  },
  {
    title: 'Certified Ethical Hacker (CEH)',
    description: 'Learn to think like a hacker to defend against and identify network vulnerabilities.',
    status: 'Release not scheduled yet',
    statusColor: 'unscheduled',
    imageUrl: '/images/courses/certifiedethicalhacker.jpg',
    slug: 'certified-ethical-hacker'
  },
  {
    title: 'Advanced Full-Stack Development with TypeScript',
    description: 'Build robust, scalable, and maintainable web applications from end to end.',
    status: 'Release not scheduled yet',
    statusColor: 'unscheduled',
    imageUrl: '/images/courses/advancedfullstackdevelopment.jpg',
    slug: 'advanced-full-stack-development-with-typescript'
  },
  {
    title: 'Technical Product Management & Agile Leadership',
    description: 'Lead product teams and drive the development of successful tech products.',
    status: 'Release not scheduled yet',
    statusColor: 'unscheduled',
    imageUrl: '/images/courses/technicalproductmanagement.jpg',
    slug: 'technical-product-management-agile-leadership'
  },
  {
    title: 'Data-Driven Performance Marketing',
    description: 'Optimize marketing campaigns and maximize ROI with data-driven strategies.',
    status: 'Release not scheduled yet',
    statusColor: 'unscheduled',
    imageUrl: '/images/courses/performancemarketing.jpg',
    slug: 'data-driven-performance-marketing'
  },
  {
    title: 'Enterprise Blockchain Solutions',
    description: 'Explore the potential of blockchain technology for enterprise applications.',
    status: 'Release not scheduled yet',
    statusColor: 'unscheduled',
    imageUrl: '/images/courses/enterpriseblockchain.jpg',
    slug: 'enterprise-blockchain-solutions'
  },
  {
    title: 'Advanced DevOps: Kubernetes and CI/CD Pipelines',
    description: 'Automate and streamline the software development and deployment lifecycle.',
    status: 'Release not scheduled yet',
    statusColor: 'unscheduled',
    imageUrl: '/images/courses/advanceddevops.jpg',
    slug: 'advanced-devops-kubernetes-ci-cd-pipelines'
  },
  {
    title: 'Building Applications with Generative AI',
    description: 'Harness the power of generative AI to build innovative applications.',
    status: 'Release not scheduled yet',
    statusColor: 'unscheduled',
    imageUrl: '/images/courses/generativeaiaps.jpg',
    slug: 'building-applications-with-generative-ai'
  }
];