'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

interface JourneyStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactElement;
  duration: string;
  outcome: string;
}

const journeySteps: JourneyStep[] = [
  {
    number: '01',
    title: 'Discovery & Analysis',
    description: 'We deep-dive into your unique challenges, culture, and objectives to understand your true learning needs.',
    duration: '2-3 weeks',
    outcome: 'Comprehensive Learning Strategy',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Strategic Design',
    description: 'Our experts craft a custom learning architecture aligned with your business goals and learner profiles.',
    duration: '3-4 weeks',
    outcome: 'Custom Learning Blueprint',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Engaging Delivery',
    description: 'Launch immersive learning experiences that captivate learners and drive real behavioral change.',
    duration: 'Ongoing',
    outcome: 'Active Learning Platform',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Continuous Evolution',
    description: 'Monitor, measure, and refine the learning experience based on data-driven insights and feedback.',
    duration: 'Continuous',
    outcome: 'Optimized Learning Ecosystem',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
];

export default function TransformationJourney() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <div ref={ref}>
      {/* Header Section - Left Aligned */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-left mb-16"
      >
        <h2 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight tracking-tight text-left"
          style={{
            fontSize: 'clamp(1.875rem, 1.2vw + 1.25rem, 3.75rem)',
            lineHeight: '1.2',
            letterSpacing: '-0.02em'
          }}
        >
          Your Transformation <span className="text-primary-accent font-bold">Journey</span>
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-primary mb-3 sm:mb-4 leading-relaxed font-light text-left">
          From initial consultation to continuous improvement, we&apos;re with you every step of the way
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary-accent/20 via-primary-accent/40 to-primary-accent/20"></div>

        <div className="space-y-12 md:space-y-16">
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              {/* Timeline Node */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 -translate-x-1/2">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-primary-accent to-secondary-accent rounded-full shadow-lg shadow-primary-accent/30"></div>
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    className="absolute inset-0 bg-primary-accent rounded-full blur-sm"
                  />
                </motion.div>
              </div>

              {/* Content Card */}
              <div className={`flex-1 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="glass-effect-strong p-6 md:p-8 rounded-2xl"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl md:text-6xl font-bold text-primary-accent/20">{step.number}</div>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary-accent/20 to-secondary-accent/20 rounded-xl flex items-center justify-center text-primary-accent">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-primary text-left">{step.title}</h3>
                  <p className="text-primary text-base md:text-lg leading-relaxed text-left mb-4">{step.description}</p>
                  
                  {/* Duration and Outcome */}
                  <div className="flex flex-col sm:flex-row gap-4 text-sm">
                    <div className="flex items-center gap-2 text-primary-accent/80">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <span>{step.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary-accent/80">
                      <div className="w-2 h-2 bg-primary-accent rounded-full"></div>
                      <span>{step.outcome}</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Spacer for desktop layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        className="text-center mt-20"
      >
        <div className="glass-effect-strong p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl max-w-2xl mx-auto border border-primary-accent/20">
          <p className="text-base sm:text-lg md:text-xl text-primary mb-4 sm:mb-6 leading-[1.5] sm:leading-relaxed text-center">
            Ready to begin your transformation journey?
          </p>
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-[#4F46E5] to-[#3730A3] text-white font-bold text-sm sm:text-base md:text-lg rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#4F46E5]/20 transition-all duration-300"
            >
              Start Your Journey
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}