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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-[1.2] text-left">
            Ready to Experience the{' '}
            <span className="text-primary-accent font-bold">
              SmartSlate Difference
            </span>?
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary mb-6 sm:mb-8 md:mb-10 max-w-3xl leading-[1.5] sm:leading-relaxed text-left">
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

        {/* Mobile-optimized Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-border-color/30 relative z-10"
        >
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
              <svg className="w-5 h-5 text-primary-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-primary text-xs sm:text-sm md:text-base leading-tight">ISO 27001<br className="xs:hidden"/> Certified</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
              <svg className="w-5 h-5 text-primary-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span className="text-primary text-xs sm:text-sm md:text-base leading-tight">Enterprise<br className="xs:hidden"/> Security</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
              <svg className="w-5 h-5 text-primary-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              <span className="text-primary text-xs sm:text-sm md:text-base leading-tight">Global<br className="xs:hidden"/> Delivery</span>
            </div>
          </div>
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
          <a href="mailto:connect@smartslate.ai" className="text-primary-accent hover:underline font-medium">
            connect@smartslate.ai
          </a>
        </p>
      </motion.div>
    </div>
  );
}
