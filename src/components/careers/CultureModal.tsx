'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import { Box, Typography, Card, CardContent, Grid, Avatar, Chip } from '@mui/material';
import { 
  Balance, 
  TrendingUp, 
  Lightbulb, 
  Groups, 
  EmojiEvents, 
  AccessTime,
  WorkspacePremium,
  Diversity3,
  Timeline,
  Insights,
  RocketLaunch,
  PersonSearch,
  Star,
  FormatQuote as Quote
} from '@mui/icons-material';

interface CultureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TestimonialProps {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

const testimonials: TestimonialProps[] = [
  {
    name: 'Sarah Johnson',
    role: 'Senior AI Engineer',
    avatar: 'SJ',
    quote: 'Smartslate has given me the opportunity to work on cutting-edge AI projects that genuinely impact education. The equity-based compensation model ensures my contributions are recognized and rewarded.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Full Stack Developer',
    avatar: 'MC',
    quote: 'The collaborative culture here is exceptional. We have the autonomy to innovate while working together to solve complex challenges in educational technology.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'Learning Experience Designer',
    avatar: 'ER',
    quote: 'I love how we combine learning science with technology to create transformative experiences. The focus on equity and results drives everything we do.',
    rating: 5
  }
];

const cultureValues = [
  {
    icon: Balance,
    title: 'Equity First',
    description: 'We believe in fair compensation that reflects your impact. Our equity-based model ensures everyone shares in our collective success.',
    color: 'from-blue-500 to-purple-600'
  },
  {
    icon: TrendingUp,
    title: 'Results-Driven',
    description: 'Your remuneration grows with your impact. We reward measurable outcomes that drive our mission forward.',
    color: 'from-green-500 to-teal-600'
  },
  {
    icon: Lightbulb,
    title: 'Innovation Culture',
    description: 'Thrive in an environment where bold ideas are celebrated. We provide the resources and freedom to push boundaries.',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    icon: Groups,
    title: 'Collaborative Excellence',
    description: 'Join a diverse team of passionate experts who support each other\'s growth and success.',
    color: 'from-pink-500 to-rose-600'
  }
];

const benefits = [
  {
    icon: AccessTime,
    title: 'Flexible Work',
    description: 'Complete remote flexibility with autonomy to design your ideal work environment.'
  },
  {
    icon: EmojiEvents,
    title: 'Growth Opportunities',
    description: 'Continuous learning budget, conference sponsorships, and clear career progression paths.'
  },
  {
    icon: Diversity3,
    title: 'Inclusive Environment',
    description: 'A diverse workplace where different perspectives are valued and celebrated.'
  },
  {
    icon: Timeline,
    title: 'Work-Life Balance',
    description: 'We respect your time outside work with unlimited PTO and flexible schedules.'
  },
  {
    icon: Insights,
    title: 'Transparent Communication',
    description: 'Open access to company metrics and regular town halls with leadership.'
  }
];

export default function CultureModal({ isOpen, onClose }: CultureModalProps) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'Our Values', id: 0 },
    { label: 'Benefits', id: 1 }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      labelledById="culture-modal-title"
      describedById="culture-modal-subtitle"
      initialFocusSelector="#culture-modal-title"
    >
      <div className="flex flex-col h-full max-h-[90vh]">
        {/* Header */}
        <div className="text-left p-4 sm:p-6 pb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4"
          >
            <Groups className="w-8 h-8 text-white" />
          </motion.div>
          <h2 id="culture-modal-title" className="text-xl md:text-2xl font-bold mb-2">
            Life at Smartslate
          </h2>
          <p id="culture-modal-subtitle" className="text-secondary text-sm max-w-md mx-auto">
            Discover what makes Smartslate a special place to build your career
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-start mb-6 px-4">
          <div className="inline-flex rounded-lg bg-white/5 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
          {/* Values Tab */}
          {activeTab === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cultureValues.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card 
                      sx={{ 
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '16px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 40px rgba(167, 218, 219, 0.2)',
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4, textAlign: 'left', height: '100%' }}>
                        <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.color} rounded-full mb-4`}>
                          <value.icon className="w-8 h-8 text-white" />
                        </div>
                        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: 'text.primary' }}>
                          {value.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                          {value.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Benefits Tab */}
          {activeTab === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card 
                      sx={{ 
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.02)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '16px',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 40px rgba(167, 218, 219, 0.2)',
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4, height: '100%' }}>
                        <div className="flex items-start mb-3">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg mr-3">
                            <benefit.icon className="w-6 h-6 text-white" />
                          </div>
                          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                            {benefit.title}
                          </Typography>
                        </div>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                          {benefit.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-4 sm:p-6 bg-background-dark/50 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <Typography variant="body2" color="text.secondary">
              Ready to join our team? Check out our open positions.
            </Typography>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="btn btn-tertiary"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveTab(0);
                  // This would typically navigate to the careers page or open application modal
                }}
                className="btn btn-primary"
              >
                View Open Positions
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}