'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

interface Differentiator {
  id: string;
  title: string;
  description: string;
  icon: React.ReactElement;
  details: string[];
  color: string;
}

const differentiators: Differentiator[] = [
  {
    id: 'research',
    title: 'Research-Driven Design',
    description: 'Every course is built on deep industry research and real-world insights',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    details: [
      'Direct interviews with industry leaders',
      'Analysis of emerging skill gaps',
      'Continuous curriculum updates',
      'Real-world case studies',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'ai',
    title: 'AI-Powered Personalization',
    description: 'Adaptive learning paths that evolve with each learner&apos;s progress',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
      </svg>
    ),
    details: [
      'Smart content recommendations',
      'Personalized learning pace',
      'Predictive skill gap analysis',
      'AI-driven feedback loops',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'outcomes',
    title: 'Outcome-Focused Approach',
    description: 'Measurable results that directly impact business performance',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
    details: [
      'Pre and post-skill assessments',
      'ROI tracking and reporting',
      'Performance improvement metrics',
      'Business impact measurement',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'support',
    title: 'Continuous Support Ecosystem',
    description: 'Ongoing mentorship and community-driven learning beyond the course',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    details: [
      'Expert mentor network',
      'Peer learning communities',
      '24/7 learning support',
      'Post-course engagement',
    ],
    color: 'from-orange-500 to-red-500',
  },
];

export default function KeyDifferentiators() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for touch-optimized interactions
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-left mb-16"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-[1.2] text-left">
          What Sets Us <span className="text-primary-accent font-bold">Apart</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary max-w-4xl leading-[1.5] sm:leading-relaxed text-left">
          Four pillars that make SmartSlate the choice for transformative learning
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
        {differentiators.map((item, index) => {
          const isActive = activeId === item.id;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              onClick={() => isMobile && setActiveId(isActive ? null : item.id)}
              onMouseEnter={() => !isMobile && setActiveId(item.id)}
              onMouseLeave={() => !isMobile && setActiveId(null)}
              className="relative group cursor-pointer"
            >
              <motion.div 
                whileHover={!isMobile ? { y: -4 } : {}}
                whileTap={isMobile ? { scale: 0.98 } : {}}
                transition={{ duration: 0.2 }}
                className={`glass-effect-strong p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl h-full border transition-all duration-300 ${
                  isActive ? 'border-primary-accent/50 shadow-lg shadow-primary-accent/10' : 'border-border-color/30'
                }`}
              >
                {/* Enhanced Icon Design */}
                <div className="relative mb-6">
                  <motion.div
                    animate={{ scale: isActive ? 1.05 : 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      item.color ? `bg-gradient-to-br ${item.color}` : 'bg-gradient-to-br from-primary-accent/20 to-secondary-accent/20'
                    }`}>
                      <div className="text-white">
                        {item.icon}
                      </div>
                    </div>
                    {/* Icon glow for active state */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                        className={`absolute inset-0 w-16 h-16 rounded-xl blur-xl opacity-30 ${
                          item.color ? `bg-gradient-to-br ${item.color}` : 'bg-gradient-to-br from-primary-accent to-secondary-accent'
                        }`}
                      />
                    )}
                  </motion.div>
                </div>

                                 <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-primary text-left">{item.title}</h3>
                <p className="text-primary text-sm sm:text-base md:text-lg mb-3 sm:mb-4 leading-[1.5] sm:leading-relaxed text-left">{item.description}</p>

                {/* Mobile-optimized expandable details */}
                <div className={`overflow-hidden transition-all duration-300 ${
                  isActive ? 'max-h-96' : 'max-h-0'
                }`}>
                  <div className="pt-4 border-t border-border-color/30">
                    <ul className="space-y-2">
                      {item.details.map((detail, idx) => (
                        <motion.li
                          key={idx}
                          initial={false}
                          animate={{ 
                            opacity: isActive ? 1 : 0,
                            x: isActive ? 0 : -10
                          }}
                          transition={{ delay: idx * 0.05, duration: 0.2 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-full flex-shrink-0 mt-2"></div>
                                                     <span className="text-primary text-sm md:text-base">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Enhanced mobile tap indicator / Desktop hover indicator */}
                <div className="flex justify-between items-center mt-3 sm:mt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-primary-accent/80">
                      {isMobile ? 'Tap to explore' : 'Hover to explore'}
                    </span>
                    {isMobile && !isActive && (
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-4 h-4"
                      >
                        <svg className="w-4 h-4 text-primary-accent/60" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                  <motion.div
                    animate={{ 
                      opacity: isActive ? 1 : 0.5,
                      rotate: isActive ? 45 : 0
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-8 h-8 sm:w-6 sm:h-6 bg-primary-accent/10 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 sm:w-3 sm:h-3 text-primary-accent" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}