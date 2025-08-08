'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useSSAInterestModal } from '@/hooks/useSSAInterestModal';
import { useSolaraInterestModal } from '@/hooks/useSolaraInterestModal';

interface Feature {
  icon: ReactNode;
  text: string;
}

interface OneLinerFeature {
  icon: ReactNode;
  text: string;
}

interface CTA {
  text: string;
  link?: string;
  icon?: ReactNode;
  action?: 'openSSAModal' | 'openSolaraModal';
}

interface Product {
  heading: string;
  tagline: string;
  description: string;
  features: Feature[];
  oneLinerFeatures?: OneLinerFeature[];
  cta: CTA;
  secondaryCta?: {
    text: string;
    link: string;
  };
  status?: 'live' | 'coming-soon';
}

interface ProductSectionProps {
  product: Product;
  reverse?: boolean;
  children?: ReactNode;
}

export default function ProductSection({ product, reverse = false, children }: ProductSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { openModal: openSSAModal } = useSSAInterestModal();
  const { openModal: openSolaraModal } = useSolaraInterestModal();

  const handleCtaClick = () => {
    if (product.cta.action === 'openSSAModal') {
      openSSAModal();
    } else if (product.cta.action === 'openSolaraModal') {
      openSolaraModal();
    }
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
        reverse ? 'lg:grid-flow-dense' : ''
      }`}
    >
      {/* Content Side */}
      <div className={`space-y-6 ${reverse ? 'lg:col-start-2' : ''}`}>
        {product.status === 'coming-soon' && (
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-4 py-1 text-sm font-medium text-primary-accent bg-primary-accent/10 rounded-full border border-primary-accent/20"
          >
            Coming Soon
          </motion.span>
        )}

        <motion.div
          initial={{ opacity: 0, x: reverse ? 20 : -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: reverse ? 20 : -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{product.heading}</h2>
          <p className="text-xl md:text-2xl text-primary-accent font-medium mb-6">{product.tagline}</p>
          <p className="text-base md:text-lg text-secondary leading-relaxed">{product.description}</p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          {/* Show oneLinerFeatures on mobile, features on desktop */}
          <div className="block md:hidden space-y-3">
            {product.oneLinerFeatures?.map((feature, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="flex-shrink-0 text-primary-accent mt-0.5">{feature.icon}</div>
                <p className="text-sm text-secondary">{feature.text}</p>
              </div>
            ))}
          </div>

          <div className="hidden md:block space-y-4">
            {product.features.map((feature, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-shrink-0 text-primary-accent mt-1">{feature.icon}</div>
                <p
                  className="text-secondary leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: feature.text }}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 pt-4"
        >
          {product.cta.link ? (
            <Link
              href={product.cta.link}
              className="btn btn-primary"
            >
              {product.cta.text}
              {product.cta.icon}
            </Link>
          ) : (
            <button
              onClick={handleCtaClick}
              className="btn btn-primary"
            >
              {product.cta.text}
              {product.cta.icon}
            </button>
          )}

        </motion.div>
      </div>

      {/* Visual Side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={`relative ${reverse ? 'lg:col-start-1' : ''}`}
      >
        <div className="relative z-10 glass-effect-strong rounded-2xl p-8 lg:p-12 min-h-[400px] flex items-center justify-center">
          {children || (
            <div className="text-center">
              <span className="text-2xl font-bold text-primary-accent/30">
                {product.heading} Visual
              </span>
            </div>
          )}
        </div>
        
        {/* Decorative glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/20 to-secondary-accent/20 rounded-2xl blur-2xl -z-10" />
      </motion.div>
    </motion.section>
  );
}
