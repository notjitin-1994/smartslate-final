'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

export default function CTASection() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="relative">
      {/* Simplified background decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 -z-10 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-accent/10 to-secondary-accent/10 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="glass-effect-strong p-6 sm:p-8 md:p-12 lg:p-16 rounded-2xl sm:rounded-3xl text-center max-w-5xl mx-auto border border-primary-accent/20 relative overflow-hidden"
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary-accent/10 to-transparent rounded-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-secondary-accent/10 to-transparent rounded-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="relative z-10 text-left"
        >
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight tracking-tight text-left"
            style={{
              fontSize: 'clamp(1.875rem, 1.2vw + 1.25rem, 3.75rem)',
              lineHeight: '1.2',
              letterSpacing: '-0.02em'
            }}
          >
            Ready to Experience the{' '}
            <span className="text-primary-accent font-bold">
              SmartSlate Difference
            </span>?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-primary mb-3 sm:mb-4 leading-relaxed text-left">
            Join forward-thinking organizations that have transformed their learning culture and achieved measurable results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start items-start sm:items-center relative z-10"
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="btn btn-primary w-full sm:w-auto"
            >
              <span className="relative z-10">Schedule a Consultation</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#3730A3] to-[#4F46E5] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
          </Link>
          
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="btn btn-tertiary w-full sm:w-auto"
            >
              <span className="relative z-10">Explore Our Solutions</span>
            </motion.button>
          </Link>
        </motion.div>


      </motion.div>

      {/* Quick contact info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center sm:text-left mt-6 sm:mt-8 text-primary-accent/60"
      >
        <p className="text-xs sm:text-sm text-primary">
          Questions? Reach out at{' '}
          <a href="mailto:info@smartslate.io" className="text-primary-accent hover:underline font-medium">
            info@smartslate.io
          </a>
        </p>
      </motion.div>
    </div>
  );
}
