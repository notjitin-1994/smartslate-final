import { Product, ProductCategory } from '@/lib/types/products';
import { ProductIcons } from '@/components/icons/ProductIcons';

// Product data configuration
export const PRODUCTS_DATA: Product[] = [
  {
    id: 'ignite-series',
    slug: 'ignite-series',
    heading: 'Ignite Series',
    tagline: 'From Classroom to Career: A Direct Pipeline to Verified Talent',
    description: "We bridge the critical gap between academic knowledge and real-world impact. Our pre-built courses are engineered in collaboration with industry leaders to cultivate the next generation of market-ready professionals. We transform promising students into high-performing new hires, creating a seamless talent pipeline for leading companies.",
    features: [
      {
        icon: ProductIcons.users,
        text: '<strong>Industry-Forged Curriculum:</strong> Market-driven courses designed with industry leaders to build in-demand skills.'
      },
      {
        icon: ProductIcons.certification,
        text: '<strong>A Trusted Signal for Top Talent:</strong> Smartslate Certification validates career-focused education and de-risks hiring for businesses.'
      },
      {
        icon: ProductIcons.checkmark,
        text: '<strong>A Commitment to Excellence:</strong> Rigorous, earned certification ensures every professional is ready to make an immediate impact.'
      }
    ],
    oneLinerFeatures: [
      {
        icon: ProductIcons.users,
        text: 'Industry-forged curriculum for in-demand skills.'
      },
      {
        icon: ProductIcons.certification,
        text: 'A trusted signal for top talent, de-risking hiring.'
      },
      {
        icon: ProductIcons.checkmark,
        text: 'Rigorous certification for immediate impact.'
      }
    ],
    cta: {
      text: 'Explore our Courses',
      link: '/courses',
      icon: ProductIcons.book
    },
    category: 'education',
    priority: 1,
    isActive: true,
    metadata: {
      seoTitle: 'Ignite Series - Industry-Forged Training Programs',
      seoDescription: 'Transform promising students into high-performing professionals with our industry-validated training programs.',
      keywords: ['training', 'certification', 'industry', 'career', 'skills'],
      targetAudience: ['students', 'professionals', 'HR managers', 'business leaders']
    }
  },
  {
    id: 'strategic-skills-architecture',
    slug: 'strategic-skills-architecture',
    heading: 'Strategic Skills Architecture',
    tagline: 'Bespoke Learning Solutions, Built for Your Business DNA',
    description: "When off-the-shelf training falls short, we step in. We partner with you to architect learning experiences that are a true reflection of your organization's unique culture, challenges, and vision. This is not just customized content; this is your strategic vision, transformed into a powerful and proprietary learning asset.",
    features: [
      {
        icon: ProductIcons.edit,
        text: '<strong>Signature Content Creation:</strong> We build your programs from the ground up. Every module, case study, and assessment is crafted to speak your internal language and solve your specific challenges, ensuring seamless adoption and relevance.'
      },
      {
        icon: ProductIcons.shield,
        text: '<strong>Your Intellectual Property, Guaranteed:</strong> Your custom curriculum is yours alone. It remains a confidential, competitive asset designed exclusively for your teams, never to be shared or resold.'
      },
      {
        icon: ProductIcons.chart,
        text: '<strong>Precision Skill Enhancement:</strong> We deliver laser-focused training that targets your most critical skill gaps. This ensures maximum impact on performance, eliminates wasted training spend, and delivers a clear return on your investment.'
      }
    ],
    oneLinerFeatures: [
      {
        icon: ProductIcons.edit,
        text: 'Signature content creation for your unique challenges.'
      },
      {
        icon: ProductIcons.shield,
        text: 'Your intellectual property, guaranteed.'
      },
      {
        icon: ProductIcons.chart,
        text: 'Precision skill enhancement for maximum impact.'
      }
    ],
    cta: {
      text: 'Set up your Strategic Skills Architecture',
      icon: ProductIcons.settings,
      action: 'openSSAModal'
    },
    reverse: true,
    category: 'custom',
    priority: 2,
    isActive: true,
    metadata: {
      seoTitle: 'Strategic Skills Architecture - Custom Learning Solutions',
      seoDescription: 'Bespoke learning solutions tailored to your organization\'s unique culture, challenges, and vision.',
      keywords: ['custom training', 'bespoke learning', 'corporate training', 'skill development'],
      targetAudience: ['enterprise', 'HR directors', 'learning managers', 'business leaders'],
      pricing: {
        type: 'enterprise',
        currency: 'USD'
      }
    }
  },
  {
    id: 'solara',
    slug: 'solara',
    heading: 'Solara',
    tagline: 'The Future of Learning: An All-in-One AI-Powered Platform',
    description: "For too long, learning has been fragmented, inefficient, and impossible to measure effectively. That era is over. Enter Solara, the singular, intelligent platform engineered to unify every facet of learning design and delivery. We're not just improving the old model; we are building its replacement—an engine for continuous growth and unparalleled insight. The future of learning isn't coming. It's being built, and Solara is the learning experience design.",
    features: [
      {
        icon: ProductIcons.star,
        text: '<strong>Solara Polaris:</strong> Instantly translate stakeholder needs into actionable learning requirements, ensuring that every course is aligned with business goals from the start.'
      },
      {
        icon: ProductIcons.brain,
        text: '<strong>Solara Constellation:</strong> Picks up your Polaris design and intelligently curates existing content, performs instructional design and storyboarding, and identifies content gaps.'
      },
      {
        icon: ProductIcons.sparkles,
        text: '<strong>Solara Nova:</strong> Build powerful, interactive learning experiences with an AI-assisted authoring tool that makes content creation fast, easy, and engaging.'
      },
      {
        icon: ProductIcons.rocket,
        text: '<strong>Solara Orbit:</strong> Deliver personalized learning journeys and host all your courses in one place, creating a seamless and unified learning experience for your users.'
      },
      {
        icon: ProductIcons.chat,
        text: '<strong>Solara Nebula:</strong> Provide intelligent, personalized tutoring support that adapts to each learner\'s pace and style, offering real-time guidance and assistance throughout their learning journey.'
      },
      {
        icon: ProductIcons.analytics,
        text: '<strong>Solara Spectrum:</strong> Reveal deep insights into your learning effectiveness by analyzing complex data and presenting it with clarity.'
      }
    ],
    oneLinerFeatures: [
      {
        icon: ProductIcons.star,
        text: 'Translate stakeholder needs into learning requirements.'
      },
      {
        icon: ProductIcons.brain,
        text: 'Transform raw content into structured learning experience designs.'
      },
      {
        icon: ProductIcons.sparkles,
        text: 'Build interactive learning experiences with AI.'
      },
      {
        icon: ProductIcons.rocket,
        text: 'Deliver personalized learning journeys and hosting.'
      },
      {
        icon: ProductIcons.chat,
        text: 'Provide intelligent, personalized tutoring support.'
      },
      {
        icon: ProductIcons.analytics,
        text: 'Reveal deep insights with AI-powered analytics.'
      }
    ],
    cta: {
      text: 'Register Interest & Support Development',
      icon: ProductIcons.heart,
      action: 'openSolaraModal'
    },
    status: 'coming-soon',
    category: 'platform',
    priority: 3,
    isActive: true,
    metadata: {
      seoTitle: 'Solara - AI-Powered Learning Platform',
      seoDescription: 'The future of learning with an all-in-one AI-powered platform that unifies every facet of learning design and delivery.',
      keywords: ['AI learning', 'learning platform', 'AI training', 'learning management system'],
      targetAudience: ['enterprise', 'educational institutions', 'training providers', 'HR professionals'],
      estimatedDevelopmentTime: 'Q2 2024',
      pricing: {
        type: 'custom'
      }
    }
  }
];

// Product categories
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'education',
    name: 'Education & Training',
    description: 'Pre-built courses and certification programs designed for immediate impact',
    icon: ProductIcons.book,
    products: PRODUCTS_DATA.filter(p => p.category === 'education')
  },
  {
    id: 'custom',
    name: 'Custom Solutions',
    description: 'Bespoke learning experiences tailored to your organization',
    icon: ProductIcons.edit,
    products: PRODUCTS_DATA.filter(p => p.category === 'custom')
  },
  {
    id: 'platform',
    name: 'Platform & Technology',
    description: 'Next-generation learning platforms and tools',
    icon: ProductIcons.rocket,
    products: PRODUCTS_DATA.filter(p => p.category === 'platform')
  }
];

// Product registry implementation
export class ProductRegistryImpl implements ProductRegistry {
  categories = PRODUCT_CATEGORIES;
  products = PRODUCTS_DATA;

  getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  getProductBySlug(slug: string): Product | undefined {
    return this.products.find(p => p.slug === slug);
  }

  getProductsByCategory(categoryId: string): Product[] {
    return this.products.filter(p => p.category === categoryId);
  }

  getActiveProducts(): Product[] {
    return this.products.filter(p => p.isActive);
  }

  getProductsByStatus(status: ProductStatus): Product[] {
    return this.products.filter(p => p.status === status);
  }
}

// Export singleton instance
export const productRegistry = new ProductRegistryImpl();

// Export individual products for direct access
export const {
  'ignite-series': igniteSeries,
  'strategic-skills-architecture': strategicSkillsArchitecture,
  'solara': solara
} = Object.fromEntries(
  PRODUCTS_DATA.map(product => [product.id, product])
) as Record<string, Product>;
