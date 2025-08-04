'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

interface Metric {
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: JSX.Element;
}

const metrics: Metric[] = [
  {
    value: 94,
    suffix: '%',
    label: 'Completion Rate',
    description: 'Learners who complete our programs',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: 87,
    suffix: '%',
    label: 'Skills Application',
    description: 'Apply new skills within 30 days',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 3.95-.102.21-.217.42-.344.625M11.42 15.17L2.3 6.05" />
      </svg>
    ),
  },
  {
    value: 3.2,
    suffix: 'x',
    label: 'ROI Average',
    description: 'Return on learning investment',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    value: 98,
    suffix: '%',
    label: 'Satisfaction Score',
    description: 'Learner satisfaction rating',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
  },
];

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 50;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-accent to-secondary-accent bg-clip-text text-transparent">
      {suffix === 'x' ? count.toFixed(1) : count}
      {suffix}
    </span>
  );
}

export default function ImpactMetrics() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-left mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-left">
          The <span className="bg-gradient-to-r from-primary-accent to-secondary-accent bg-clip-text text-transparent">Impact</span> We Create
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl text-primary-accent max-w-4xl leading-relaxed text-left">
          Real results from organizations that chose SmartSlate for their learning transformation
        </p>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{ y: -3 }}
            className="relative group"
          >
            <div className="glass-effect-strong p-6 md:p-8 rounded-2xl text-center h-full border border-primary-accent/10 hover:border-primary-accent/30 transition-all duration-300">
              {/* Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-primary-accent/20 to-secondary-accent/20 rounded-xl flex items-center justify-center text-primary-accent mx-auto mb-4">
                {metric.icon}
              </div>

              {/* Counter */}
              <div className="mb-3">
                <AnimatedCounter value={metric.value} suffix={metric.suffix} inView={inView} />
              </div>

              {/* Label */}
              <h3 className="text-lg font-bold mb-2 text-primary">{metric.label}</h3>
              
              {/* Progress Bar */}
              <div className="relative h-2 bg-border-color/30 rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${metric.suffix === 'x' ? (metric.value / 4) * 100 : metric.value}%` } : { width: 0 }}
                  transition={{ duration: 2, delay: index * 0.1, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-full"
                />
              </div>

              {/* Description */}
              <p className="text-primary-accent/80 text-sm leading-relaxed text-left">{metric.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Integrated Testimonial Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        <div className="glass-effect-strong p-8 md:p-12 rounded-2xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-accent to-secondary-accent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-secondary-accent to-primary-accent rounded-full blur-3xl" />
          </div>

          {/* Quote Icon */}
          <div className="relative">
            <svg className="w-12 h-12 text-primary-accent/30 mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            {/* Testimonial Content */}
            <blockquote className="mb-6">
              <p className="text-lg md:text-xl text-primary-accent italic leading-relaxed mb-6 text-left">
                &quot;SmartSlate didn&apos;t just train our team—they transformed how we think about learning and development. 
                The results speak for themselves: improved performance, higher engagement, and measurable business impact.&quot;
              </p>
              <footer className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-accent/20 to-secondary-accent/20 rounded-full"></div>
                <div>
                  <cite className="text-primary-accent font-semibold not-italic">Sarah Chen</cite>
                  <p className="text-primary-accent/70 text-sm">Chief Learning Officer, TechCorp Global</p>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </motion.div>

      {/* Additional Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12"
      >
        <div className="glass-effect p-6 md:p-8 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl md:text-3xl font-bold text-primary-accent mb-1">50K+</div>
              <p className="text-primary-accent text-sm md:text-base">Professionals Transformed</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl md:text-3xl font-bold text-secondary-accent mb-1">200+</div>
              <p className="text-primary-accent text-sm md:text-base">Enterprise Clients</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl md:text-3xl font-bold text-primary-accent mb-1">15+</div>
              <p className="text-primary-accent text-sm md:text-base">Industry Verticals</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}