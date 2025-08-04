// Types for AI Foundations course page
export interface AnimatedStat {
  icon: string;
  endValue: number;
  unit: string;
  text: string;
}

export interface PersonaState {
  title: string;
  description: string;
}

export interface Persona {
  id: string;
  title: string;
  icon: string;
  before: PersonaState;
  after: PersonaState;
}

export interface CurriculumModule {
  title: string;
  description: string;
  keyApplication: string;
}

export interface ValueProposition {
  headline: string;
  description: string;
  icon: string;
}

export const aiCourseData = {
  name: 'AI Foundations: From Concept to Application',
  price: 50000,
  offerPrice: 29999
};

export const animatedStats: AnimatedStat[] = [
  {
    icon: 'BarChart',
    endValue: 85,
    unit: '%',
    text: 'of Indian enterprises are expected to use AI in some form by the end of this year.'
  },
  {
    icon: 'Briefcase',
    endValue: 45,
    unit: '%',
    text: 'increase in demand for AI specialists in India over the last 24 months.'
  }
];

export const personas: Persona[] = [
  {
    id: 'professionals',
    title: 'For Professionals',
    icon: 'Sparkles',
    before: {
      title: 'Before: Overwhelmed by AI Hype',
      description: 'Struggling to distinguish valuable AI knowledge from noise and feeling left behind in technical conversations.'
    },
    after: {
      title: 'After: Confident AI Practitioner',
      description: 'You will confidently apply AI concepts, lead strategic discussions, and position yourself for high-impact roles.'
    }
  },
  {
    id: 'leaders',
    title: 'For Leaders',
    icon: 'Users',
    before: {
      title: 'Before: Strategic Uncertainty',
      description: 'Unsure how to integrate AI into your business strategy or how to upskill your team for the future.'
    },
    after: {
      title: 'After: Visionary AI Leadership',
      description: 'You will identify high-ROI AI opportunities, foster a culture of innovation, and drive competitive advantage.'
    }
  },
  {
    id: 'educators',
    title: 'For Educators',
    icon: 'GraduationCap',
    before: {
      title: 'Before: Outdated Curriculum',
      description: 'Facing the challenge of preparing students for a job market that is being rapidly transformed by AI.'
    },
    after: {
      title: 'After: Future-Ready Institution',
      description: 'You will enrich your curriculum with practical, in-demand AI knowledge, boosting student employability.'
    }
  }
];

export const curriculum: CurriculumModule[] = [
  {
    title: 'Module 1: Deconstructing AI: Core Concepts & Landscape',
    description: 'Go beyond the buzzwords. Understand the history, types, and real-world impact of AI, establishing a rock-solid foundation.',
    keyApplication: 'Articulate the business value of different AI types.'
  },
  {
    title: 'Module 2: Machine Learning: The Engine of Modern AI',
    description: 'Explore the core of AI decision-making. Learn how algorithms learn from data through supervised, unsupervised, and reinforcement learning.',
    keyApplication: 'Identify the right ML approach for a given problem.'
  },
  {
    title: 'Module 3: The Anatomy of a Neural Network',
    description: 'Peek under the hood of deep learning. Demystify the structure of neural networks and how they power today\'s most advanced AI.',
    keyApplication: 'Explain how deep learning solves complex pattern recognition tasks.'
  },
  {
    title: 'Module 4: AI Ethics & Responsible Innovation',
    description: 'Navigate the critical landscape of AI ethics. Learn frameworks for building fair, transparent, and accountable AI systems.',
    keyApplication: 'Conduct a basic AI ethics and bias audit.'
  },
  {
    title: 'Module 5: Capstone: From Concept to Application',
    description: 'Synthesize your knowledge. Develop a strategic proposal for an AI initiative to solve a real-world problem in your domain.',
    keyApplication: 'Create a business case for an AI project.'
  }
];

export const valuePropositions: ValueProposition[] = [
  {
    headline: 'Expert-Led Modules',
    description: 'Master AI from core concepts to strategic application.',
    icon: 'BookOpen'
  },
  {
    headline: 'Real-World Case Studies',
    description: 'Apply knowledge to practical, industry-relevant problems.',
    icon: 'Lightbulb'
  },
  {
    headline: 'Direct Instructor Interaction',
    description: 'Get your questions answered in dedicated Q&A sessions.',
    icon: 'MessageSquare'
  },
  {
    headline: 'Founding Member Certificate',
    description: 'Earn a special designation on your official certificate.',
    icon: 'Award'
  },
  {
    headline: 'Lifetime Access',
    description: 'Revisit all course materials and future updates, forever.',
    icon: 'Infinity'
  },
  {
    headline: 'Exclusive Professional Community',
    description: 'Network with a curated group of AI professionals and leaders.',
    icon: 'Users'
  }
];