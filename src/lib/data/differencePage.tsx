// ============================================================================
// DIFFERENCE PAGE DATA LAYER
// ============================================================================

export interface ComparisonItem {
  id: string;
  traditional: string;
  smartslate: string;
  icon: 'content' | 'materials' | 'application' | 'skills' | 'certification';
  description?: string;
}

export interface KeyDifferentiator {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  color: 'primary' | 'secondary' | 'accent';
}

export interface JourneyStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  outcomes: string[];
  phase: 'discovery' | 'design' | 'development' | 'deployment' | 'optimization';
}

export interface ImpactMetric {
  id: string;
  title: string;
  value: string;
  unit: string;
  description: string;
  icon: string;
  category: 'engagement' | 'performance' | 'satisfaction' | 'growth';
  trend?: 'up' | 'down' | 'stable';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface CTASection {
  title: string;
  subtitle: string;
  description: string;
  primaryAction: {
    label: string;
    href: string;
    variant: 'contained' | 'outlined';
  };
  secondaryAction?: {
    label: string;
    href: string;
    variant: 'text' | 'outlined';
  };
}

// ============================================================================
// PAGE CONTENT DATA
// ============================================================================

export const comparisonData: ComparisonItem[] = [
  {
    id: 'content-approach',
    traditional: 'One-size-fits-all content',
    smartslate: 'Tailored learning journeys',
    icon: 'content',
    description: 'Personalized content that adapts to individual learning styles and pace'
  },
  {
    id: 'materials-quality',
    traditional: 'Static, outdated materials',
    smartslate: 'Dynamic, evolving curriculum',
    icon: 'materials',
    description: 'Content that stays current with industry trends and best practices'
  },
  {
    id: 'application-focus',
    traditional: 'Theory without application',
    smartslate: 'Real-world, project-based learning',
    icon: 'application',
    description: 'Hands-on projects that build practical, job-ready skills'
  },
  {
    id: 'skill-development',
    traditional: 'Isolated skill development',
    smartslate: 'Holistic competency building',
    icon: 'skills',
    description: 'Comprehensive skill development that considers the full professional context'
  },
  {
    id: 'certification-value',
    traditional: 'Generic certifications',
    smartslate: 'Industry-validated credentials',
    icon: 'certification',
    description: 'Certifications recognized and valued by leading industry organizations'
  },
];

export const keyDifferentiatorsData: KeyDifferentiator[] = [
  {
    id: 'ai-powered-personalization',
    title: 'AI-Powered Personalization',
    description: 'Our advanced AI algorithms create truly personalized learning experiences that adapt to each individual\'s needs, pace, and learning style.',
    icon: '🤖',
    features: [
      'Adaptive learning paths',
      'Real-time progress tracking',
      'Intelligent content recommendations',
      'Personalized feedback systems'
    ],
    color: 'primary'
  },
  {
    id: 'industry-integration',
    title: 'Industry Integration',
    description: 'Direct partnerships with leading companies ensure our curriculum stays current with real-world industry demands and emerging technologies.',
    icon: '🏢',
    features: [
      'Industry expert collaboration',
      'Current technology integration',
      'Real-world project scenarios',
      'Professional network access'
    ],
    color: 'secondary'
  },
  {
    id: 'outcome-focused',
    title: 'Outcome-Focused Approach',
    description: 'Every learning experience is designed with measurable outcomes in mind, ensuring tangible results that translate to career advancement.',
    icon: '🎯',
    features: [
      'Clear learning objectives',
      'Measurable skill development',
      'Career outcome tracking',
      'ROI measurement tools'
    ],
    color: 'accent'
  }
];

export const transformationJourneyData: JourneyStep[] = [
  {
    id: 'discovery-phase',
    title: 'Discovery & Assessment',
    description: 'We begin by understanding your organization\'s unique challenges, goals, and current learning landscape.',
    icon: '🔍',
    duration: '1-2 weeks',
    outcomes: [
      'Comprehensive needs analysis',
      'Current state assessment',
      'Goal alignment framework',
      'Success metrics definition'
    ],
    phase: 'discovery'
  },
  {
    id: 'design-phase',
    title: 'Strategic Design',
    description: 'Our learning architects design a customized solution that aligns with your organizational objectives.',
    icon: '🎨',
    duration: '2-3 weeks',
    outcomes: [
      'Custom learning strategy',
      'Technology stack selection',
      'Content architecture design',
      'Implementation roadmap'
    ],
    phase: 'design'
  },
  {
    id: 'development-phase',
    title: 'Content Development',
    description: 'We create engaging, interactive content that combines cutting-edge technology with proven learning methodologies.',
    icon: '⚡',
    duration: '4-6 weeks',
    outcomes: [
      'Interactive learning modules',
      'Assessment frameworks',
      'Progress tracking systems',
      'Performance analytics'
    ],
    phase: 'development'
  },
  {
    id: 'deployment-phase',
    title: 'Seamless Deployment',
    description: 'Our team ensures smooth implementation with comprehensive training and ongoing support.',
    icon: '🚀',
    duration: '1-2 weeks',
    outcomes: [
      'System integration',
      'User training programs',
      'Change management support',
      'Go-live assistance'
    ],
    phase: 'deployment'
  },
  {
    id: 'optimization-phase',
    title: 'Continuous Optimization',
    description: 'We continuously monitor, analyze, and optimize your learning ecosystem for maximum impact.',
    icon: '📈',
    duration: 'Ongoing',
    outcomes: [
      'Performance analytics',
      'Content optimization',
      'User feedback integration',
      'Continuous improvement'
    ],
    phase: 'optimization'
  }
];

export const impactMetricsData: ImpactMetric[] = [
  {
    id: 'engagement-rate',
    title: 'Engagement Rate',
    value: '94',
    unit: '%',
    description: 'Average learner engagement across all programs',
    icon: '📊',
    category: 'engagement',
    trend: 'up'
  },
  {
    id: 'completion-rate',
    title: 'Completion Rate',
    value: '87',
    unit: '%',
    description: 'Program completion rate vs industry average of 45%',
    icon: '✅',
    category: 'performance',
    trend: 'up'
  },
  {
    id: 'skill-improvement',
    title: 'Skill Improvement',
    value: '3.2',
    unit: 'x',
    description: 'Average skill improvement multiplier',
    icon: '🚀',
    category: 'performance',
    trend: 'up'
  },
  {
    id: 'satisfaction-score',
    title: 'Satisfaction Score',
    value: '4.8',
    unit: '/5',
    description: 'Average learner satisfaction rating',
    icon: '⭐',
    category: 'satisfaction',
    trend: 'up'
  },
  {
    id: 'career-advancement',
    title: 'Career Advancement',
    value: '73',
    unit: '%',
    description: 'Learners who advanced in their careers within 6 months',
    icon: '📈',
    category: 'growth',
    trend: 'up'
  },
  {
    id: 'time-to-competency',
    title: 'Time to Competency',
    value: '60',
    unit: '%',
    description: 'Reduction in time to achieve job competency',
    icon: '⏱️',
    category: 'performance',
    trend: 'up'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Sarah Chen',
    role: 'Learning & Development Director',
    company: 'TechCorp Solutions',
    content: 'Smartslate transformed our training program completely. The AI-powered personalization has increased our engagement rates by 40% and our employees are actually excited about learning again.',
    rating: 5,
    avatar: '/images/userheadshot.png'
  },
  {
    id: 'testimonial-2',
    name: 'Michael Rodriguez',
    role: 'VP of Engineering',
    company: 'InnovateTech',
    content: 'The industry integration aspect is what sets Smartslate apart. Our team is learning current technologies that we can immediately apply to our projects.',
    rating: 5,
    avatar: '/images/userheadshot.png'
  },
  {
    id: 'testimonial-3',
    name: 'Jennifer Park',
    role: 'HR Manager',
    company: 'Global Dynamics',
    content: 'The outcome-focused approach has given us measurable results we can present to leadership. We\'ve seen a 60% improvement in skill assessments.',
    rating: 5,
    avatar: '/images/userheadshot.png'
  }
];

export const ctaSectionData: CTASection = {
  title: 'Ready to Transform Your Learning?',
  subtitle: 'Join the Future of Professional Development',
  description: 'Experience the Smartslate difference and see how our AI-powered, outcome-focused approach can revolutionize your organization\'s learning and development.',
  primaryAction: {
    label: 'Start Your Transformation',
    href: '/contact',
    variant: 'contained'
  },
  secondaryAction: {
    label: 'View Case Studies',
    href: '/case-studies',
    variant: 'outlined'
  }
};

// ============================================================================
// ICON MAPPINGS
// ============================================================================

export const iconMap = {
  content: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  materials: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  ),
  application: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 3.95-.102.21-.217.42-.344.625M11.42 15.17 2.3 6.05" />
    </svg>
  ),
  skills: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  certification: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
  ),
};

// ============================================================================
// ANIMATION CONFIGURATIONS
// ============================================================================

export const animationConfig = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  },
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  },
  slideIn: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  }
};

// ============================================================================
// EXPORT ALL DATA
// ============================================================================

export const differencePageData = {
  comparison: comparisonData,
  differentiators: keyDifferentiatorsData,
  journey: transformationJourneyData,
  metrics: impactMetricsData,
  testimonials: testimonialsData,
  cta: ctaSectionData,
  icons: iconMap,
  animations: animationConfig,
} as const;
