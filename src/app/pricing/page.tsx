'use client';

import { useState } from 'react';
import Link from 'next/link';
import CurrencyToggle, { Currency } from '@/components/pricing/CurrencyToggle';
import ApplicationTabs from '@/components/pricing/ApplicationTabs';

export default function PricingPage() {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [activeFilter, setActiveFilter] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const pricing = {
    individual: {
      explorer: { USD: 19, INR: 1599, starmaps: 5 },
      navigator: { USD: 39, INR: 3299, starmaps: 25 },
      voyager: { USD: 79, INR: 6699, starmaps: 50 }
    },
    team: {
      crew: { USD: 24, INR: 1999, blueprints: 10 },
      fleet: { USD: 64, INR: 5399, blueprints: 30 },
      armada: { USD: 129, INR: 10899, blueprints: 60 }
    }
  };

  const faqs = [
    {
      category: 'billing',
      question: 'Do my unused Starmaps expire?',
      answer: 'Never, as long as you maintain an active subscription. Your saved Starmaps accumulate month over month, building a permanent library. Think of it like a gym membership where you actually get to keep the muscle you\'ve built. Your monthly generations refresh on the 1st of each month, and any Starmaps you save remain in your library indefinitely.'
    },
    {
      category: 'features',
      question: 'What\'s the difference between "generations" and "saved Starmaps"?',
      answer: 'Generations are your monthly creation limit — how many new AI-powered learning blueprints you can create each month. Saved Starmaps is your storage library — how many you can keep and access anytime. For example, Navigator gives you 25 new generations each month, and you can save up to 25 Starmaps in your library that roll over and accumulate.'
    },
    {
      category: 'billing',
      question: 'What happens if I upgrade or downgrade my plan?',
      answer: 'When you upgrade, your saved Starmaps remain, and you start receiving your new, higher monthly allocation immediately. When you downgrade, you keep all saved Starmaps — you just receive fewer new generations each month going forward. Your library is always yours.'
    },
    {
      category: 'features',
      question: 'Is there a maximum number of Starmaps I can save?',
      answer: 'Yes, to ensure system performance: Explorer can save up to 5 Starmaps (60 with rollover over 12 months), Navigator up to 25 Starmaps (300 with 12-month accumulation), and Voyager up to 50 saved Starmaps (600 with 12-month accumulation). Team plans have shared pools: Crew (10/user), Fleet (30/user), Armada (60/user).'
    },
    {
      category: 'billing',
      question: 'What happens if I cancel my subscription?',
      answer: 'If you cancel, you\'ll have 30 days to download or use your saved Starmaps. We\'ll send you reminders before your access expires. Simply reactivate before the 30-day window closes to retain your full library. We want you to keep what you\'ve built.'
    },
    {
      category: 'billing',
      question: 'Is there a free trial available?',
      answer: 'Yes! All plans come with a 14-day free trial with 3 Starmap generations included. No credit card required to start. If you subscribe after your trial, those 3 Starmaps roll over into your library — they don\'t disappear!'
    },
    {
      category: 'support',
      question: 'How does team collaboration work?',
      answer: 'Team plans include shared workspaces where members can collaborate in real-time. You can set role-based permissions, share templates, and work together on Starmaps. The team shares a collective pool of monthly generations and saved Starmaps that grows each month.'
    },
    {
      category: 'features',
      question: 'Can I export my Starmaps?',
      answer: 'All plans include export to PDF. Navigator and above can export to Word and PDF formats with advanced formatting. We\'re also working on API access for Voyager users to integrate with other tools in your workflow.'
    }
  ];

  const filteredFaqs = activeFilter === 'all' ? faqs : faqs.filter(faq => faq.category === activeFilter);

  // Format numbers according to currency
  const formatNumber = (num: number, curr: Currency) => {
    if (curr === 'USD') {
      // USD: Standard comma formatting (1,000 | 10,000 | 100,000 | 1,000,000)
      return num.toLocaleString('en-US');
    } else {
      // INR: Indian numbering system (1,000 | 10,000 | 1,00,000 | 10,00,000)
      return num.toLocaleString('en-IN');
    }
  };

  // Calculate price based on billing period (annual gets ~17% discount, billed annually)
  const getPrice = (monthlyPrice: number) => {
    if (billingPeriod === 'annual') {
      return Math.round(monthlyPrice * 10); // 10 months price for 12 months
    }
    return monthlyPrice;
  };

  // Calculate the effective monthly rate when billed annually
  const getEffectiveMonthlyRate = (monthlyPrice: number) => {
    const annualPrice = monthlyPrice * 10;
    return Math.round((annualPrice / 12) * 100) / 100; // Round to 2 decimal places
  };

  // Format price with currency symbol
  const formatPrice = (price: number, curr: Currency) => {
    const formatted = formatNumber(price, curr);
    return curr === 'USD' ? `$${formatted}` : `₹${formatted}`;
  };

  const getPriceLabel = () => {
    if (billingPeriod === 'annual') {
      return '/year';
    }
    return '/month';
  };

  return (
    <div className="min-h-screen bg-[rgb(2,12,27)] text-[rgb(224,224,224)]">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              {/* Badge */}
              <div className="inline-block px-4 py-2 mb-6 rounded-full border border-[rgb(167,218,219)] bg-[rgba(167,218,219,0.1)] text-sm font-semibold text-[rgb(167,218,219)]">
                <span className="text-[rgb(255,215,0)]" style={{ textShadow: '0 0 10px rgba(255,215,0,0.5), 0 0 20px rgba(255,215,0,0.3)' }}>Solara</span> Learning Engine
              </div>

              {/* Headline */}
              <h1 className="font-['Quicksand'] text-6xl leading-tight font-bold mb-6 text-[rgb(224,224,224)]">
                One Platform. Every Stage of Learning. <span className="text-[rgb(167,218,219)]">Unlimited Potential.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg leading-relaxed mb-6 text-[rgb(167,218,219)] font-semibold">
                Flexible pricing that grows with your learning transformation
              </p>

              {/* Body Copy */}
              <p className="text-lg leading-relaxed mb-8 text-[rgb(176,197,198)]">
                From ideation to impact, Solara transforms learning at every touchpoint. Choose a product. Start a revolution. Our pricing adapts to how you grow—because transforming learning shouldn't mean breaking budgets.
              </p>

              {/* CTA Buttons */}
              <div className="flex items-center gap-4 mb-12 flex-wrap">
                <Link href="https://solara.smartslate.io" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-base font-semibold bg-[rgb(79,70,229)] text-[rgb(224,224,224)] transition-all duration-300 hover:bg-[rgb(99,90,249)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(79,70,229,0.4)]">
                  Explore Solara Solutions
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link href="https://smartslate-solara.vercel.app" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-base font-semibold bg-transparent text-[rgb(167,218,219)] border border-[rgb(167,218,219)] transition-all duration-300 hover:bg-[rgba(167,218,219,0.1)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(167,218,219,0.3)]">
                  Start with Polaris
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Stats Cards */}
              <div className="flex gap-6 flex-wrap">
                {[
                  {
                    value: '15x',
                    label: 'Faster Launch',
                    icon: <svg className="w-6 h-6 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  },
                  {
                    value: 'Zero',
                    label: 'Revisions',
                    icon: <svg className="w-6 h-6 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  },
                  {
                    value: '100%',
                    label: 'Accurate',
                    icon: <svg className="w-6 h-6 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[rgba(167,218,219,0.15)]">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[rgb(167,218,219)]">{stat.value}</div>
                      <div className="text-sm text-[rgb(176,197,198)]">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Process Infographic */}
            <div className="relative p-8 rounded-2xl border border-[rgba(167,218,219,0.2)] bg-[rgba(167,218,219,0.05)]">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-[rgb(224,224,224)] mb-2">Complete Learning Lifecycle</h3>
                <p className="text-xs text-[rgb(176,197,198)]">From ideation to measurable impact</p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    number: '01',
                    title: 'Ideate & Architect',
                    description: 'Strategic planning and blueprint design',
                    icon: <svg className="w-5 h-5 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                  },
                  {
                    number: '02',
                    title: 'Build & Create',
                    description: 'AI-powered content development',
                    icon: <svg className="w-5 h-5 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  },
                  {
                    number: '03',
                    title: 'Deploy & Optimize',
                    description: 'Launch, track, and measure outcomes',
                    icon: <svg className="w-5 h-5 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  }
                ].map((step, index) => (
                  <div key={index}>
                    <div className="flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                      <div className="flex items-center justify-center w-12 h-12 flex-shrink-0 rounded-lg bg-[rgba(167,218,219,0.15)]">
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-[rgb(167,218,219)]">{step.number}</span>
                          <span className="text-sm font-bold text-[rgb(224,224,224)]">{step.title}</span>
                        </div>
                        <div className="text-xs text-[rgb(176,197,198)]">{step.description}</div>
                      </div>
                    </div>
                    {index < 2 && (
                      <div className="flex justify-center my-2">
                        <svg className="w-6 h-6 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Decorative blurs */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[rgba(167,218,219,0.1)] blur-[48px]"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-[rgba(79,70,229,0.1)] blur-[48px]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Tabs Section */}
      <section className="pt-6 pb-2 px-4 border-t border-[rgba(167,218,219,0.1)]">
        <div className="max-w-6xl mx-auto">
          <ApplicationTabs />
        </div>
      </section>

      {/* Polaris Description Section */}
      <section className="pt-12 pb-20 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          {/* Background decorative elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[rgba(79,70,229,0.08)] rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[rgba(167,218,219,0.06)] rounded-full blur-[120px] pointer-events-none"></div>

          {/* Content Container */}
          <div className="relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-[rgba(167,218,219,0.3)] bg-[rgba(167,218,219,0.1)] backdrop-blur-sm">
              <svg className="w-4 h-4 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-bold text-[rgb(167,218,219)] tracking-wide">
                Learning Blueprint: Powered by <span className="text-[rgb(255,215,0)]" style={{ textShadow: '0 0 10px rgba(255,215,0,0.5), 0 0 20px rgba(255,215,0,0.3)' }}>Solara</span>
              </span>
            </div>

            {/* Heading and Description */}
            <div className="mb-12">
              <h2 className="font-['Quicksand'] text-5xl lg:text-6xl font-bold mb-6 text-[rgb(224,224,224)] leading-tight">
                Transform Ideas into{' '}
                <span className="text-[rgb(167,218,219)]">Launch-Ready Blueprints</span>{' '}
                in Hours
              </h2>
              <p className="text-lg leading-relaxed text-[rgb(176,197,198)] mb-8 max-w-4xl">
                Polaris eliminates weeks of planning with AI-driven blueprint generation. From stakeholder interviews to production-ready documentation, we automate the entire learning design process.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[rgba(167,218,219,0.08)] border border-[rgba(167,218,219,0.2)]">
                  <svg className="w-5 h-5 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-[rgb(224,224,224)]">No revision cycles</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[rgba(167,218,219,0.08)] border border-[rgba(167,218,219,0.2)]">
                  <svg className="w-5 h-5 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-[rgb(224,224,224)]">No misalignment</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[rgba(167,218,219,0.08)] border border-[rgba(167,218,219,0.2)]">
                  <svg className="w-5 h-5 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-[rgb(224,224,224)]">Delivered in 1 hour</span>
                </div>
              </div>
            </div>

            {/* Every Plan Includes - Feature Grid */}
            <div>
              <h3 className="font-['Quicksand'] text-3xl font-bold mb-8 text-[rgb(167,218,219)]">Every Plan Includes</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: '15x Faster Time-to-Launch',
                    description: 'Cut weeks of planning down to hours. Launch learning programs at unprecedented speed',
                    icon: <svg className="w-6 h-6 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  },
                  {
                    title: '1-Hour Blueprint Delivery',
                    description: 'Complete, production-ready learning blueprints generated in under 60 minutes',
                    icon: <svg className="w-6 h-6 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  },
                  {
                    title: 'Zero Revision Cycles',
                    description: 'First draft is final. AI-powered accuracy eliminates endless back-and-forth revisions',
                    icon: <svg className="w-6 h-6 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  },
                  {
                    title: '100% Requirements Captured',
                    description: 'Nothing falls through the cracks. Every stakeholder need documented and addressed',
                    icon: <svg className="w-6 h-6 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                  },
                  {
                    title: 'Perfect Stakeholder Alignment',
                    description: 'Get buy-in faster with blueprints that speak to every stakeholder perspective',
                    icon: <svg className="w-6 h-6 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  },
                  {
                    title: 'Production-Ready Documentation',
                    description: 'Polished, professional blueprints ready to present to leadership on day one',
                    icon: <svg className="w-6 h-6 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  },
                  {
                    title: 'Automated Gap Analysis',
                    description: 'AI identifies missing requirements and potential issues before they become problems',
                    icon: <svg className="w-6 h-6 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  },
                  {
                    title: 'Business-to-Learning Translation',
                    description: 'Transforms business objectives into actionable learning outcomes automatically',
                    icon: <svg className="w-6 h-6 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  },
                  {
                    title: 'Multi-Format Export',
                    description: 'Download blueprints in PDF, Word, or JSON. Share instantly with any stakeholder',
                    icon: <svg className="w-6 h-6 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /></svg>
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex flex-col items-start p-6 rounded-2xl border border-[rgba(167,218,219,0.1)] bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(167,218,219,0.3)] hover:bg-[rgba(167,218,219,0.05)]">
                    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-[rgba(167,218,219,0.15)] transition-all duration-300 hover:scale-110 hover:bg-[rgba(167,218,219,0.25)]">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-[rgb(224,224,224)]">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-[rgb(176,197,198)]">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Individual Plans Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Toggles Container */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="font-['Quicksand'] text-4xl font-bold text-[rgb(167,218,219)]">Individual Plans</h2>

            <div className="flex flex-wrap items-center gap-4">
              {/* Billing Period Toggle */}
              <div className="inline-flex p-1 rounded-lg border border-white/10 bg-white/5">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                    billingPeriod === 'monthly'
                      ? 'border border-[rgb(167,218,219)] bg-[rgba(167,218,219,0.15)] text-[rgb(167,218,219)]'
                      : 'border-none bg-transparent text-[rgb(176,197,198)] hover:bg-white/5'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod('annual')}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                    billingPeriod === 'annual'
                      ? 'border border-[rgb(167,218,219)] bg-[rgba(167,218,219,0.15)] text-[rgb(167,218,219)]'
                      : 'border-none bg-transparent text-[rgb(176,197,198)] hover:bg-white/5'
                  }`}
                >
                  Annual
                  <span className="ml-1.5 text-xs text-[rgb(16,185,129)]">Save 17%</span>
                </button>
              </div>

              {/* Currency Toggle */}
              <CurrencyToggle currency={currency} onCurrencyChange={setCurrency} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Explorer */}
            <div className="flex flex-col h-full p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <div className="text-2xl font-bold mb-2 text-[rgb(224,224,224)]">Explorer</div>
              <div className="text-sm font-semibold text-[rgb(176,197,198)] mb-6">PERFECT FOR GETTING STARTED</div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-[rgb(167,218,219)]">
                  {formatPrice(
                    getPrice(currency === 'USD' ? pricing.individual.explorer.USD : pricing.individual.explorer.INR),
                    currency
                  )}
                  <span className="text-lg text-[rgb(176,197,198)]">{getPriceLabel()}</span>
                </div>
                {billingPeriod === 'annual' && (
                  <div className="text-xs text-[rgb(176,197,198)] mt-1">
                    {formatPrice(
                      getEffectiveMonthlyRate(currency === 'USD' ? pricing.individual.explorer.USD : pricing.individual.explorer.INR),
                      currency
                    )}/month billed annually
                  </div>
                )}
              </div>

              <div className="p-4 mb-6 rounded-lg border border-white/5 bg-white/[0.03]">
                <div className="text-sm font-semibold mb-1 text-[rgb(224,224,224)]">{pricing.individual.explorer.starmaps} Starmaps/month</div>
                <div className="text-xs text-[rgb(176,197,198)]">Unused roll over for 12 months with 5 saved</div>
              </div>

              <div className="text-sm mb-6 text-[rgb(167,218,219)]">Start here before upgrading to higher tiers</div>

              <Link href="https://polaris.smartslate.io" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full px-6 py-3 mb-8 rounded-md text-sm font-semibold bg-[rgb(79,70,229)] text-[rgb(224,224,224)] transition-all duration-300 hover:opacity-90">
                Get Started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <ul className="mt-auto space-y-4">
                {[
                  '15x Faster Time-to-Launch',
                  '1-Hour Blueprint Delivery',
                  'Zero Revision Cycles',
                  '100% Requirements Captured',
                  'Perfect Stakeholder Alignment',
                  'Production-Ready Documentation',
                  'Automated Gap Analysis',
                  'Business-to-Learning Translation',
                  'Multi-Format Export'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-[rgb(224,224,224)]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigator - Most Popular */}
            <div className="relative flex flex-col h-full p-8 rounded-2xl border border-[rgba(79,70,229,0.3)] bg-[rgba(79,70,229,0.15)] shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[rgb(167,218,219)] text-xs font-extrabold uppercase text-[rgb(2,12,27)]">
                MOST POPULAR
              </div>

              <div className="text-2xl font-bold mb-2 text-[rgb(224,224,224)]">Navigator</div>
              <div className="text-sm font-semibold text-[rgb(176,197,198)] mb-6">FOR PROFESSIONALS & CREATORS</div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-[rgb(167,218,219)]">
                  {formatPrice(
                    getPrice(currency === 'USD' ? pricing.individual.navigator.USD : pricing.individual.navigator.INR),
                    currency
                  )}
                  <span className="text-lg text-[rgb(176,197,198)]">{getPriceLabel()}</span>
                </div>
                {billingPeriod === 'annual' && (
                  <div className="text-xs text-[rgb(176,197,198)] mt-1">
                    {formatPrice(
                      getEffectiveMonthlyRate(currency === 'USD' ? pricing.individual.navigator.USD : pricing.individual.navigator.INR),
                      currency
                    )}/month billed annually
                  </div>
                )}
              </div>

              <div className="p-4 mb-6 rounded-lg border border-white/5 bg-white/[0.03]">
                <div className="text-sm font-semibold mb-1 text-[rgb(224,224,224)]">{pricing.individual.navigator.starmaps} Starmaps/month</div>
                <div className="text-xs text-[rgb(176,197,198)]">Unused roll over for 12 months with 25 saved</div>
              </div>

              <div className="text-sm mb-6 text-[rgb(167,218,219)]">5x more starmaps per month</div>

              <Link href="https://polaris.smartslate.io" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full px-6 py-3 mb-8 rounded-md text-sm font-semibold bg-[rgb(79,70,229)] text-[rgb(224,224,224)] transition-all duration-300 hover:opacity-90">
                Get Started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <ul className="mt-auto space-y-4">
                {[
                  'Everything in Explorer',
                  'Priority support (24h response)'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-[rgb(224,224,224)]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Voyager */}
            <div className="flex flex-col h-full p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <div className="text-2xl font-bold mb-2 text-[rgb(224,224,224)]">Voyager</div>
              <div className="text-sm font-semibold text-[rgb(176,197,198)] mb-6">FOR POWER USERS & CONSULTANTS</div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-[rgb(167,218,219)]">
                  {formatPrice(
                    getPrice(currency === 'USD' ? pricing.individual.voyager.USD : pricing.individual.voyager.INR),
                    currency
                  )}
                  <span className="text-lg text-[rgb(176,197,198)]">{getPriceLabel()}</span>
                </div>
                {billingPeriod === 'annual' && (
                  <div className="text-xs text-[rgb(176,197,198)] mt-1">
                    {formatPrice(
                      getEffectiveMonthlyRate(currency === 'USD' ? pricing.individual.voyager.USD : pricing.individual.voyager.INR),
                      currency
                    )}/month billed annually
                  </div>
                )}
              </div>

              <div className="p-4 mb-6 rounded-lg border border-white/5 bg-white/[0.03]">
                <div className="text-sm font-semibold mb-1 text-[rgb(224,224,224)]">{pricing.individual.voyager.starmaps} Starmaps/month</div>
                <div className="text-xs text-[rgb(176,197,198)]">Unused roll over for 12 months with 50 saved</div>
              </div>

              <div className="text-sm mb-6 text-[rgb(167,218,219)]">10x more starmaps per month</div>

              <Link href="https://polaris.smartslate.io" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full px-6 py-3 mb-8 rounded-md text-sm font-semibold bg-[rgb(79,70,229)] text-[rgb(224,224,224)] transition-all duration-300 hover:opacity-90">
                Get Started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <ul className="mt-auto space-y-4">
                {[
                  'Everything in Navigator',
                  'Priority support (12h response)'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-[rgb(224,224,224)]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Plans Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-['Quicksand'] text-4xl font-bold mb-10 text-[rgb(167,218,219)]">Team Plans</h2>
          <p className="text-lg mb-24 text-[rgb(176,197,198)] max-w-3xl">
            Team plan limits are <strong>per user</strong> - each team member gets the full allocation, including rollover credits.
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Crew */}
            <div className="flex flex-col h-full p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <div className="text-2xl font-bold mb-2 text-[rgb(224,224,224)]">Crew</div>
              <div className="text-sm font-semibold text-[rgb(176,197,198)] mb-6">SMALL TEAMS, BIG IMPACT</div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-[rgb(167,218,219)]">
                  {formatPrice(
                    getPrice(currency === 'USD' ? pricing.team.crew.USD : pricing.team.crew.INR),
                    currency
                  )}
                  <span className="text-lg text-[rgb(176,197,198)]">{billingPeriod === 'annual' ? '/year /user' : '/month /user'}</span>
                </div>
                {billingPeriod === 'annual' && (
                  <div className="text-xs text-[rgb(176,197,198)] mt-1">
                    {formatPrice(
                      getEffectiveMonthlyRate(currency === 'USD' ? pricing.team.crew.USD : pricing.team.crew.INR),
                      currency
                    )}/month billed annually
                  </div>
                )}
              </div>

              <div className="p-4 mb-6 rounded-lg border border-white/5 bg-white/[0.03]">
                <div className="text-sm font-semibold mb-1 text-[rgb(224,224,224)]">{pricing.team.crew.blueprints} Blueprints per user/month</div>
                <div className="text-xs text-[rgb(176,197,198)]">Unused roll over for 12 months with 10 saved per user</div>
              </div>

              <Link href="/contact" className="flex items-center justify-center gap-2 w-full px-6 py-3 mb-8 rounded-md text-sm font-semibold bg-transparent text-[rgb(79,70,229)] border border-[rgb(79,70,229)] transition-all duration-300 hover:bg-[rgba(79,70,229,0.1)]">
                Contact Sales
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <ul className="mt-auto space-y-4">
                {[
                  '15x Faster Time-to-Launch',
                  '1-Hour Blueprint Delivery',
                  'Zero Revision Cycles',
                  '100% Requirements Captured',
                  'Perfect Stakeholder Alignment',
                  'Production-Ready Documentation',
                  'Automated Gap Analysis',
                  'Business-to-Learning Translation',
                  'Multi-Format Export'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-[rgb(224,224,224)]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fleet - Popular */}
            <div className="relative flex flex-col h-full p-8 rounded-2xl border border-[rgba(79,70,229,0.3)] bg-[rgba(79,70,229,0.15)] shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[rgb(167,218,219)] text-xs font-extrabold uppercase text-[rgb(2,12,27)]">
                POPULAR CHOICE
              </div>

              <div className="text-2xl font-bold mb-2 text-[rgb(224,224,224)]">Fleet</div>
              <div className="text-sm font-semibold text-[rgb(176,197,198)] mb-6">SCALE YOUR OPERATIONS</div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-[rgb(167,218,219)]">
                  {formatPrice(
                    getPrice(currency === 'USD' ? pricing.team.fleet.USD : pricing.team.fleet.INR),
                    currency
                  )}
                  <span className="text-lg text-[rgb(176,197,198)]">{billingPeriod === 'annual' ? '/year /user' : '/month /user'}</span>
                </div>
                {billingPeriod === 'annual' && (
                  <div className="text-xs text-[rgb(176,197,198)] mt-1">
                    {formatPrice(
                      getEffectiveMonthlyRate(currency === 'USD' ? pricing.team.fleet.USD : pricing.team.fleet.INR),
                      currency
                    )}/month billed annually
                  </div>
                )}
              </div>

              <div className="p-4 mb-6 rounded-lg border border-white/5 bg-white/[0.03]">
                <div className="text-sm font-semibold mb-1 text-[rgb(224,224,224)]">{pricing.team.fleet.blueprints} Blueprints per user/month</div>
                <div className="text-xs text-[rgb(176,197,198)]">Unused roll over for 12 months with 30 saved per user</div>
              </div>

              <Link href="/contact" className="flex items-center justify-center gap-2 w-full px-6 py-3 mb-8 rounded-md text-sm font-semibold bg-transparent text-[rgb(79,70,229)] border border-[rgb(79,70,229)] transition-all duration-300 hover:bg-[rgba(79,70,229,0.1)]">
                Contact Sales
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <ul className="mt-auto space-y-4">
                {[
                  'Everything in Crew',
                  '3x more blueprints per user',
                  'Priority support (24h response)'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-[rgb(224,224,224)]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Armada */}
            <div className="flex flex-col h-full p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] shadow-lg transition-transform duration-300 hover:-translate-y-2">
              <div className="text-2xl font-bold mb-2 text-[rgb(224,224,224)]">Armada</div>
              <div className="text-sm font-semibold text-[rgb(176,197,198)] mb-6">DEPARTMENT & ORGANIZATION SCALE</div>

              <div className="mb-6">
                <div className="text-4xl font-bold text-[rgb(167,218,219)]">
                  {formatPrice(
                    getPrice(currency === 'USD' ? pricing.team.armada.USD : pricing.team.armada.INR),
                    currency
                  )}
                  <span className="text-lg text-[rgb(176,197,198)]">{billingPeriod === 'annual' ? '/year /user' : '/month /user'}</span>
                </div>
                {billingPeriod === 'annual' && (
                  <div className="text-xs text-[rgb(176,197,198)] mt-1">
                    {formatPrice(
                      getEffectiveMonthlyRate(currency === 'USD' ? pricing.team.armada.USD : pricing.team.armada.INR),
                      currency
                    )}/month billed annually
                  </div>
                )}
              </div>

              <div className="p-4 mb-6 rounded-lg border border-white/5 bg-white/[0.03]">
                <div className="text-sm font-semibold mb-1 text-[rgb(224,224,224)]">{pricing.team.armada.blueprints} Blueprints per user/month</div>
                <div className="text-xs text-[rgb(176,197,198)]">Unused roll over for 12 months with 60 saved per user</div>
              </div>

              <Link href="/contact" className="flex items-center justify-center gap-2 w-full px-6 py-3 mb-8 rounded-md text-sm font-semibold bg-transparent text-[rgb(79,70,229)] border border-[rgb(79,70,229)] transition-all duration-300 hover:bg-[rgba(79,70,229,0.1)]">
                Contact Sales
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <ul className="mt-auto space-y-4">
                {[
                  'Everything in Fleet',
                  '6x more blueprints per user',
                  'Priority support (12h response)'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-[rgb(167,218,219)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-[rgb(224,224,224)]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-['Quicksand'] text-4xl font-bold mb-4 text-[rgb(167,218,219)]">Frequently Asked Questions</h2>
          <p className="text-lg mb-12 text-[rgb(176,197,198)]">Everything you need to know about our plans and pricing</p>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            {[
              {
                id: 'all',
                label: 'All Questions',
                icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              },
              {
                id: 'billing',
                label: 'Billing',
                icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              },
              {
                id: 'features',
                label: 'Features',
                icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              },
              {
                id: 'support',
                label: 'Support',
                icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-[rgba(79,70,229,0.1)] text-[rgb(79,70,229)] border border-[rgba(79,70,229,0.3)]'
                    : 'bg-white/5 text-[rgb(176,197,198)] border border-white/5 hover:text-[rgb(224,224,224)] hover:border-[rgba(79,70,229,0.2)]'
                }`}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-xl border bg-white/[0.03] backdrop-blur-sm overflow-hidden transition-all duration-200 ${
                  openFaqIndex === index
                    ? 'border-[rgba(79,70,229,0.2)] shadow-lg'
                    : 'border-white/5 hover:border-[rgba(79,70,229,0.1)]'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="flex items-center justify-between w-full gap-4 p-6 text-left transition-colors duration-200 hover:bg-[rgba(224,224,224,0.05)]"
                >
                  <span className="font-medium text-[rgb(224,224,224)]">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 transition-all duration-200 ${
                      openFaqIndex === index ? 'text-[rgb(79,70,229)] rotate-180' : 'text-[rgb(122,138,139)]'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaqIndex === index && (
                  <div className="border-t border-white/5">
                    <div className="p-6 text-sm leading-relaxed text-[rgb(176,197,198)]">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Support CTA */}
          <div className="mt-16">
            <p className="text-sm mb-6 text-[rgb(176,197,198)]">Still have questions? We're here to help</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-white/5 text-[rgb(224,224,224)] border border-white/10 transition-all duration-200 hover:bg-white/[0.08] hover:border-[rgba(79,70,229,0.3)]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
