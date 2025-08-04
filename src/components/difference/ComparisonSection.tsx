'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ComparisonItem {
  traditional: string;
  smartslate: string;
  icon: 'content' | 'materials' | 'application' | 'skills' | 'certification';
}

const comparisons: ComparisonItem[] = [
  {
    traditional: 'One-size-fits-all content',
    smartslate: 'Tailored learning journeys',
    icon: 'content',
  },
  {
    traditional: 'Static, outdated materials',
    smartslate: 'Dynamic, evolving curriculum',
    icon: 'materials',
  },
  {
    traditional: 'Theory without application',
    smartslate: 'Real-world, project-based learning',
    icon: 'application',
  },
  {
    traditional: 'Isolated skill development',
    smartslate: 'Holistic competency building',
    icon: 'skills',
  },
  {
    traditional: 'Generic certifications',
    smartslate: 'Industry-validated credentials',
    icon: 'certification',
  },
];

const iconMap = {
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

export default function ComparisonSection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-left mb-16"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight text-left">
          Traditional Training vs. <span className="bg-gradient-to-r from-primary-accent to-secondary-accent bg-clip-text text-transparent">SmartSlate Learning</span>
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl text-primary-accent max-w-4xl leading-relaxed text-left">
          See why forward-thinking organizations choose SmartSlate over conventional training approaches
        </p>
      </motion.div>

      {/* Mobile-optimized comparison cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="space-y-6 max-w-5xl mx-auto"
      >
        {comparisons.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="relative"
          >
            {/* Comparison Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              {/* Traditional Side */}
              <motion.div
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="glass-effect p-6 rounded-2xl border border-red-400/20 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-red-400/10 rounded-lg flex items-center justify-center text-red-400">
                      {iconMap[item.icon]}
                    </div>
                    <span className="text-red-400 text-sm font-medium uppercase tracking-wide">Traditional</span>
                  </div>
                  <p className="text-primary-accent text-base md:text-lg">{item.traditional}</p>
                </div>
              </motion.div>

              {/* SmartSlate Side */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="glass-effect-strong p-6 rounded-2xl border border-primary-accent/30 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/10 to-secondary-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-accent/20 to-secondary-accent/20 rounded-lg flex items-center justify-center text-primary-accent">
                      {iconMap[item.icon]}
                    </div>
                    <span className="text-primary-accent text-sm font-medium uppercase tracking-wide">SmartSlate</span>
                  </div>
                  <p className="text-primary font-medium text-base md:text-lg">{item.smartslate}</p>
                </div>
              </motion.div>
            </div>

            {/* Mobile-friendly connector */}
            <div className="flex justify-center -mt-2 -mb-2 relative z-20 md:hidden">
              <motion.div 
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-8 h-8 bg-gradient-to-r from-primary-accent to-secondary-accent rounded-full flex items-center justify-center shadow-lg shadow-primary-accent/20"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>


      {/* Summary Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-16 text-left"
      >
        <div className="glass-effect-strong p-8 rounded-2xl max-w-3xl border border-primary-accent/20">
          <p className="text-lg md:text-xl text-primary-accent leading-relaxed text-left">
            The choice is clear: <span className="text-primary-accent font-semibold">SmartSlate</span> transforms 
            learning from a checkbox exercise into a strategic advantage that drives measurable business outcomes.
          </p>
        </div>
      </motion.div>
    </div>
  );
}