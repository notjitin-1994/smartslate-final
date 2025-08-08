'use client';

import { Course } from '@/types/course';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CourseCardProps {
  course: Course;
  index: number;
  onWaitlistClick: () => void;
}

export default function CourseCard({ course, index, onWaitlistClick }: CourseCardProps) {
  const isHorizonCard = course.statusColor === 'horizon';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`
        relative rounded-lg border overflow-hidden flex flex-col
        transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(167,218,219,0.2)]
        ${isHorizonCard 
          ? 'bg-gradient-to-br from-[var(--container-bg)] via-[var(--background-dark)] to-[#0f1e30] border-primary-accent/30' 
          : 'bg-[var(--container-bg)] border-[var(--border-color)]'
        }
        min-h-[350px] md:min-h-[400px]
      `}
    >
      {/* Background Pattern for Horizon Card */}
      {isHorizonCard && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(167, 218, 219, 0.1) 20px, rgba(167, 218, 219, 0.1) 40px)'
          }} />
        </div>
      )}

      {/* Course Image */}
      {!isHorizonCard && course.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={course.imageUrl}
            alt={course.title.replace(/<[^>]*>/g, '')}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Card Content */}
      <div className="flex-1 p-6 flex flex-col relative z-10">
        {/* Header */}
        <div className="mb-4">
          <h3 
            className={`
              text-xl font-bold mb-2 
              ${isHorizonCard ? 'text-primary-accent text-2xl text-center' : 'text-primary'}
            `}
            dangerouslySetInnerHTML={{ __html: course.title }}
          />
          
          {!isHorizonCard && (
            <span 
              className={`
                inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                border whitespace-nowrap
                ${course.statusColor === 'releasing-soon' 
                  ? 'bg-yellow-500/15 text-yellow-500 border-yellow-500/20' 
                  : 'bg-orange-500/15 text-orange-500 border-orange-500/20'
                }
              `}
            >
              {course.status}
            </span>
          )}
        </div>

        {/* Description */}
        {!isHorizonCard && (
          <p className="text-secondary text-sm mb-6 flex-1 leading-relaxed">
            {course.description}
          </p>
        )}

        {/* Horizon Card Status */}
        {isHorizonCard && (
          <p className="text-secondary text-lg text-center mt-4">
            {course.status}
          </p>
        )}

        {/* Action Buttons */}
        {!isHorizonCard && (
          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <Link
              href={`/courses/${course.slug}`}
              className="btn btn-tertiary flex-1 text-center"
            >
              Learn More
            </Link>
            <button
              onClick={onWaitlistClick}
              className="btn btn-primary flex-1"
            >
              Join Waitlist
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
