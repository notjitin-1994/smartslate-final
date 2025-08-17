'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import SortIcon from '@mui/icons-material/Sort';
import { courseData } from '@/types/course';
import CourseCard from '@/components/courses/CourseCard';
import Pagination from '@/components/ui/Pagination';
import StandardHero from '@/components/ui/StandardHero';

const PageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  backgroundColor: 'var(--background-dark)',
}));

const SectionWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: `${theme.spacing(10)} 0 ${theme.spacing(8)} 0`,
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(8)} 0 ${theme.spacing(6)} 0`,
  },
}));

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'featured' | 'asc' | 'desc'>('featured');
  const [filterStatus, setFilterStatus] = useState<'all' | 'releasing-soon' | 'unscheduled'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);



  // Handle responsive items per page
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 5 : 9);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter and sort courses
  const processedCourses = useMemo(() => {
    const filtered = courseData.filter((course) => {
      const titleMatch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
      const statusMatch = filterStatus === 'all' || course.statusColor === filterStatus;
      return titleMatch && statusMatch;
    });

    // Sort courses
    const sorted = [...filtered];
    if (sortOrder === 'asc') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'desc') {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    }

    // Add "More on the horizon..." card if no filters are active
    if (searchTerm === '' && filterStatus === 'all') {
      sorted.push({
        title: 'More on the horizon...',
        description: '',
        status: 'Check back for new releases',
        statusColor: 'horizon',
        imageUrl: '',
        slug: ''
      });
    }

    return sorted;
  }, [searchTerm, sortOrder, filterStatus]);

  // Reset to page 1 if current page is out of bounds
  useEffect(() => {
    const maxPage = Math.ceil(processedCourses.length / itemsPerPage);
    if (currentPage > maxPage) {
      setCurrentPage(1);
    }
  }, [processedCourses, itemsPerPage, currentPage]);

  // Paginated courses
  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedCourses.slice(startIndex, startIndex + itemsPerPage);
  }, [processedCourses, currentPage, itemsPerPage]);

  return (
    <>
      <PageWrapper>
        {/* Hero Section */}
        <SectionWrapper>
          <Container maxWidth="lg">
            <StandardHero
              title="Ignite your Growth"
              subtitle="Ignite the future. The Ignite Series is the official blueprint for the next generation of work—a definitive collection of courses designed to equip the architects of our world—digital and physical."
              description="Discover cutting-edge courses that bridge the gap between traditional education and the skills needed for tomorrow's workforce."
              accentWords={['Growth', 'Ignite', 'next generation', 'architects']}
              showScrollIndicator={false}
            />
          </Container>
        </SectionWrapper>

        {/* Controls Section */}
        <Box sx={{ pb: 6 }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col md:flex-row gap-4 p-4 md:p-6 bg-[var(--container-bg)] rounded-lg border border-[var(--border-color)]"
            >
              {/* Search */}
              <div className="relative flex-1">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search courses..."
                  className="w-full h-12 md:h-10 pl-12 pr-4 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-md
                           text-primary placeholder-[var(--text-muted)] focus:outline-none focus:border-primary-accent
                           focus:ring-2 focus:ring-primary-accent/20 transition-all duration-200 text-base"
                />
              </div>

              {/* Sort */}
              <div className="relative">
                <SortIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] pointer-events-none" />
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
                  className="h-12 md:h-10 pl-12 pr-8 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-md
                           text-primary appearance-none cursor-pointer focus:outline-none focus:border-primary-accent
                           focus:ring-2 focus:ring-primary-accent/20 transition-all duration-200 text-base min-w-[140px]"
                >
                  <option value="featured">Sort by Featured</option>
                  <option value="asc">Sort by Title (A-Z)</option>
                  <option value="desc">Sort by Title (Z-A)</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Filter */}
              <div className="relative">
                <TuneIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)] pointer-events-none" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                  className="h-12 md:h-10 pl-12 pr-8 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-md
                           text-primary appearance-none cursor-pointer focus:outline-none focus:border-primary-accent
                           focus:ring-2 focus:ring-primary-accent/20 transition-all duration-200 text-base min-w-[140px]"
                >
                  <option value="all">Filter by Status (All)</option>
                  <option value="releasing-soon">Releasing Soon</option>
                  <option value="unscheduled">Unscheduled</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </Container>
        </Box>

        {/* Courses Grid */}
        <Box sx={{ pb: 8 }}>
          <Container maxWidth="lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedCourses.map((course, index) => (
                <CourseCard
                  key={course.slug || index}
                  course={course}
                  index={index}
                />
              ))}
            </div>

            {/* Pagination */}
            {processedCourses.length > itemsPerPage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12"
              >
                <Pagination
                  currentPage={currentPage}
                  totalItems={processedCourses.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </motion.div>
            )}
          </Container>
        </Box>
      </PageWrapper>

      {/* Course Waitlist Modal removed */}
    </>
  );
}