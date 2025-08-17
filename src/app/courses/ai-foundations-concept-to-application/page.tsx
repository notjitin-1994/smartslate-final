'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MessageIcon from '@mui/icons-material/Message';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import Link from 'next/link';
import type { ElementType } from 'react';
import StandardHero from '@/components/ui/StandardHero';
import { useWaitlistModal } from '@/hooks/useWaitlistModal';
import {
  aiCourseData, animatedStats, personas, curriculum, valuePropositions
} from '@/types/ai-course';

const PageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  backgroundColor: 'var(--background-dark)',
}));

// Icon mapping
const iconMap: Record<string, ElementType> = {
  BarChart: BarChartIcon,
  Briefcase: BusinessCenterIcon,
  Sparkles: AutoAwesomeIcon,
  Users: GroupIcon,
  GraduationCap: SchoolIcon,
  BookOpen: MenuBookIcon,
  Lightbulb: LightbulbIcon,
  MessageSquare: MessageIcon,
  Award: EmojiEventsIcon,
  Infinity: AllInclusiveIcon
};

export default function AIFoundationsPage() {
  const [activePersona, setActivePersona] = useState('professionals');
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [countdown, setCountdown] = useState({ days: 14, hours: 8, minutes: 42 });
  const [activeTab, setActiveTab] = useState<'receive' | 'individual' | 'teams'>('individual');
  const [isDesktop, setIsDesktop] = useState(false);
  const { openModal } = useWaitlistModal();

  const discountPercentage = Math.round(
    ((aiCourseData.price - aiCourseData.offerPrice) / aiCourseData.price) * 100
  );

  const courseInfo = {
    title: aiCourseData.name,
    description: 'Unlock the power of AI and learn to leverage it for personal and professional growth.',
    status: 'Releasing in Aug',
    statusColor: 'releasing-soon' as const,
    imageUrl: '/images/courses/AILiteracy.jpg',
    slug: 'ai-foundations-concept-to-application'
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const updateDesktopStatus = () => setIsDesktop(mediaQuery.matches);
    updateDesktopStatus();
    mediaQuery.addEventListener('change', updateDesktopStatus);

    // Simple countdown timer
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59 };
        }
        return prev;
      });
    }, 60000);

    return () => {
      clearInterval(interval);
      mediaQuery.removeEventListener('change', updateDesktopStatus);
    };
  }, []);

  const currentPersona = personas.find(p => p.id === activePersona);

  return (
    <>
      <PageWrapper>
        {/* Hero Section */}
        <StandardHero
          title="Master the Language of the Future"
          subtitle="Our 'AI Foundations' course is the definitive journey from theoretical concepts to practical application. Go from being curious about AI to confidently leveraging it for professional growth."
          description="Transform your career with cutting-edge AI knowledge and practical skills that will set you apart in the digital economy."
          accentWords={['Future', 'AI Foundations', 'professional growth']}
          showScrollIndicator={false}
        >
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => openModal('AI Course Page', 'AI Foundations: Concept to Application')}
              className="btn btn-primary w-full sm:w-auto"
            >
              Join Waitlist &amp; Save {discountPercentage}%
              <ArrowForwardIcon className="w-5 h-5" />
            </button>
            <Link
              href="/collaborate"
              className="btn btn-tertiary w-full sm:w-auto"
            >
              Request a Demo for Your Team
              <ArrowForwardIcon className="w-5 h-5" />
            </Link>
          </div>
        </StandardHero>

        {/* Why Now Section */}
        <section className="py-16 px-4">
          <Container maxWidth="lg">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  The AI Revolution Isn&apos;t Coming. It&apos;s Here.
                </h2>
                <p className="text-lg text-secondary leading-relaxed">
                  Artificial Intelligence is no longer a futuristic concept; it&apos;s a fundamental driver of
                  modern business and innovation. AI literacy has become a non-negotiable career skill,
                  separating those who will shape the future from those who will be shaped by it. Acting
                  now is not just an opportunity—it&apos;s a necessity for relevance and growth.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                {animatedStats.map((stat, index) => {
                  const Icon = iconMap[stat.icon];
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary-accent/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-8 h-8 text-primary-accent" />
                      </div>
                      <div>
                        <div className="text-4xl font-bold text-primary-accent">
                          {stat.endValue}{stat.unit}
                        </div>
                        <p className="text-secondary mt-1">{stat.text}</p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </Container>
        </section>

        {/* Transformation Section */}
        <section className="py-16 px-4 bg-[var(--background-paper)]">
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                From Theory to Tangible Transformation
              </h2>
              <p className="text-lg text-secondary max-w-3xl">
                This course is designed to create a clear &quot;before and after&quot; in your professional life.
                Select your profile to see the specific impact you can expect.
              </p>
            </motion.div>

            {/* Persona Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {personas.map((persona) => {
                const Icon = iconMap[persona.icon];
                return (
                  <button
                    key={persona.id}
                    onClick={() => setActivePersona(persona.id)}
                    className={`
                      px-4 py-3 rounded-full border font-semibold transition-all duration-300
                      flex items-center gap-2 min-h-[48px] text-sm md:text-base
                      ${activePersona === persona.id
                        ? 'bg-primary-accent text-[var(--background-dark)] border-primary-accent shadow-[0_0_20px_rgba(167,218,219,0.3)]'
                        : 'border-[var(--border-color)] text-secondary hover:border-primary-accent hover:text-primary-accent'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="whitespace-nowrap">{persona.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Transformation Cards */}
            <AnimatePresence mode="wait">
              {currentPersona && (
                <motion.div
                  key={currentPersona.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-[1fr,auto,1fr] gap-8 items-center max-w-5xl mx-auto"
                >
                  {/* Before State */}
                  <div className="p-8 rounded-lg bg-[var(--container-bg)] border border-[var(--border-color)]">
                    <h3 className="text-xl font-bold mb-4 text-[var(--text-muted)]">
                      {currentPersona.before.title}
                    </h3>
                    <p className="text-secondary">{currentPersona.before.description}</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <ArrowForwardIcon className="w-8 h-8 text-primary-accent rotate-0 md:rotate-0" />
                  </div>

                  {/* After State */}
                  <div className="p-8 rounded-lg bg-[var(--container-bg)] border border-primary-accent/30">
                    <h3 className="text-xl font-bold mb-4 text-primary-accent">
                      {currentPersona.after.title}
                    </h3>
                    <p className="text-secondary">{currentPersona.after.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Container>
        </section>

        {/* Curriculum Section */}
        <section className="py-16 px-4">
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your Journey from Concept to Application
              </h2>
              <p className="text-lg text-secondary max-w-3xl">
                Our curriculum is a structured journey, with each module building logically on the last to
                take you from foundational knowledge to strategic application.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-4">
              {curriculum.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border border-[var(--border-color)] rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenModule(openModule === index ? null : index)}
                    className="w-full p-6 flex items-center justify-between hover:bg-[var(--container-bg)] transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-10 h-10 rounded-full bg-[var(--background-dark)] border border-[var(--border-color)] 
                                    flex items-center justify-center font-bold text-primary-accent flex-shrink-0">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-semibold">{module.title}</h3>
                    </div>
                    <ExpandMoreIcon className={`w-5 h-5 text-secondary transition-transform duration-200 ${
                      openModule === index ? 'rotate-180' : ''
                    }`} />
                  </button>

                  <AnimatePresence>
                    {openModule === index && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 pl-[4.5rem]">
                          <p className="text-secondary mb-4">{module.description}</p>
                          <div className="p-4 bg-[var(--background-dark)] rounded-lg border border-[var(--border-color)]">
                            <strong className="text-primary-accent">Key Application:</strong>
                            <span className="text-secondary ml-2">{module.keyApplication}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* Opportunity Section */}
        <section className="py-16 px-4 bg-[var(--background-dark)] border-t border-b border-primary-accent">
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary-accent">
                An Exclusive Invitation: Join Our Founding Cohort
              </h2>
              <p className="text-lg text-secondary max-w-3xl mb-8">
                As a new course in our &quot;Ignite Series,&quot; this is a unique opportunity. By joining now,
                you&apos;re not just a student; you&apos;re a founding member. You&apos;ll not only master AI but also
                help shape the future of this course with direct feedback opportunities. Be part of the
                very first group to gain this expertise and receive a special &apos;Founding Member&apos;
                designation on your certificate of completion.
              </p>
              <button
               onClick={() => {}}
                className="btn btn-primary"
              >
                Secure Your Founding Member Spot
                <ArrowForwardIcon className="w-5 h-5" />
              </button>
            </motion.div>
          </Container>
        </section>

        {/* Enrollment Section */}
        <section className="py-16 px-4">
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Unlock Your Potential Today
              </h2>
              <p className="text-lg text-secondary max-w-3xl">
                This is more than a course; it&apos;s an investment in your future. Secure your spot in the
                founding cohort and gain a career-defining skill set.
              </p>
            </motion.div>

            {/* Mobile Tabs */}
            {!isDesktop && (
              <div className="flex gap-2 mb-6 p-2 bg-[var(--background-dark)] rounded-full border border-[var(--border-color)]">
                {(['receive', 'individual', 'teams'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      flex-1 py-3 px-4 rounded-full font-semibold transition-all duration-300
                      ${activeTab === tab
                        ? 'bg-primary-accent text-[var(--background-dark)] shadow-[0_0_15px_rgba(167,218,219,0.25)]'
                        : 'text-secondary hover:text-primary'
                      }
                    `}
                  >
                    {tab === 'receive' ? 'What You\u2019ll Receive' : tab === 'individual' ? 'Individual' : 'For Teams'}
                  </button>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="grid lg:grid-cols-[1.5fr,1fr,1fr] gap-8 max-w-6xl mx-auto">
              {/* What You'll Receive */}
              {(isDesktop || activeTab === 'receive') && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`${!isDesktop ? 'lg:col-span-1' : 'row-span-2'} 
                            p-8 bg-[var(--container-bg)] rounded-lg border border-[var(--border-color)]`}
                >
                  <h3 className="text-2xl font-bold mb-8">What You&apos;ll Receive</h3>
                  <div className="space-y-6">
                    {valuePropositions.map((item, index) => {
                      const Icon = iconMap[item.icon];
                      return (
                        <div key={index} className="flex gap-4">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-accent/10 to-primary-accent/5 
                                        flex items-center justify-center flex-shrink-0">
                            <Icon className="w-7 h-7 text-primary-accent" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{item.headline}</h4>
                            <p className="text-secondary text-sm">{item.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Individual Plan */}
              {(isDesktop || activeTab === 'individual') && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative p-8 bg-gradient-to-br from-[var(--container-bg)] to-[var(--background-dark)] 
                           rounded-lg border border-primary-accent shadow-[0_10px_30px_rgba(167,218,219,0.2)]"
                >
                  {/* Corner Badge */}
                  <div className="absolute -top-3 -right-3 bg-primary-accent text-[var(--background-dark)] 
                                px-4 py-2 rounded-full font-bold text-sm transform rotate-12">
                    {discountPercentage}% Off!
                  </div>

                  <h3 className="text-2xl font-bold mb-6 text-center">Individual Plan</h3>
                  
                  <div className="text-center mb-6">
                    <div className="text-5xl font-black text-primary-accent">
                      ₹{aiCourseData.offerPrice.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xl text-[var(--text-muted)] line-through mt-2">
                      ₹{aiCourseData.price.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="p-4 bg-black/20 rounded-lg border border-[var(--border-color)] mb-6">
                    <p className="text-sm font-semibold text-secondary text-center mb-2">Launch Offer Ends In:</p>
                    <div className="text-2xl font-bold text-center">
                      <span className="text-primary-accent">{countdown.days}</span>d{' '}
                      <span className="text-primary-accent">{countdown.hours}</span>h{' '}
                      <span className="text-primary-accent">{countdown.minutes}</span>m
                    </div>
                  </div>

                  <button
                   onClick={() => {}}
                    className="btn btn-primary w-full"
                  >
                    Join &amp; Secure {discountPercentage}% Off
                    <ArrowForwardIcon className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* Teams Plan */}
              {(isDesktop || activeTab === 'teams') && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg border border-[var(--border-color)]
                           hover:border-primary-accent/50 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold mb-6 text-center">For Teams &amp; Enterprise</h3>
                  
                  <div className="space-y-4 mb-8">
                    {[
                      'Equip your entire team with critical AI skills.',
                      'Custom curriculum options & dedicated support.',
                      'Volume discounts & measurable ROI.'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircleIcon className="w-4 h-4 text-primary-accent" />
                        </div>
                        <span className="text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/collaborate"
                    className="btn btn-tertiary w-full"
                  >
                    Request a Demo
                    <ArrowForwardIcon className="w-5 h-5" />
                  </Link>
                </motion.div>
              )}
            </div>
          </Container>
        </section>

        {/* Sticky Mobile Footer */}
        {!isDesktop && (
          <div className="fixed bottom-0 left-0 right-0 bg-[var(--background-dark)] border-t border-[var(--border-color)] 
                        p-4 z-50 shadow-[0_-4px_15px_rgba(0,0,0,0.2)]">
            <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
              <div>
                <div className="text-2xl font-bold text-primary-accent">
                  ₹{aiCourseData.offerPrice.toLocaleString('en-IN')}
                </div>
                <div className="text-sm text-[var(--text-muted)] line-through">
                  ₹{aiCourseData.price.toLocaleString('en-IN')}
                </div>
              </div>
              <button
               onClick={() => {}}
                className="btn btn-primary whitespace-nowrap"
              >
                Join &amp; Save {discountPercentage}%
                <ArrowForwardIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </PageWrapper>

      
    </>
  );
}
