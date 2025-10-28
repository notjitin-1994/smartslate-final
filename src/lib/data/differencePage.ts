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
    icon: 'Psychology',
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
    icon: 'Business',
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
    icon: 'TrackChanges',
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
    icon: 'Search',
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
    icon: 'Architecture',
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
    icon: 'Build',
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
    icon: 'RocketLaunch',
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
    icon: 'TrendingUp',
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
    icon: 'BarChart',
    category: 'engagement',
    trend: 'up'
  },
  {
    id: 'completion-rate',
    title: 'Completion Rate',
    value: '87',
    unit: '%',
    description: 'Program completion rate vs industry average of 45%',
    icon: 'CheckCircle',
    category: 'performance',
    trend: 'up'
  },
  {
    id: 'skill-improvement',
    title: 'Skill Improvement',
    value: '3.2',
    unit: 'x',
    description: 'Average skill improvement multiplier',
    icon: 'RocketLaunch',
    category: 'performance',
    trend: 'up'
  },
  {
    id: 'satisfaction-score',
    title: 'Satisfaction Score',
    value: '4.8',
    unit: '/5',
    description: 'Average learner satisfaction rating',
    icon: 'Star',
    category: 'satisfaction',
    trend: 'up'
  },
  {
    id: 'career-advancement',
    title: 'Career Advancement',
    value: '73',
    unit: '%',
    description: 'Learners who advanced in their careers within 6 months',
    icon: 'TrendingUp',
    category: 'growth',
    trend: 'up'
  },
  {
    id: 'time-to-competency',
    title: 'Time to Competency',
    value: '60',
    unit: '%',
    description: 'Reduction in time to achieve job competency',
    icon: 'Schedule',
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
  }
};

// ============================================================================
// ICON MAPPINGS
// ============================================================================

export const iconMap = {
  content: 'MenuBook',
  materials: 'Description',
  application: 'Build',
  skills: 'Bolt',
  certification: 'EmojiEvents',
} as const;

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
