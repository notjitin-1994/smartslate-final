'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, ProductStatus } from '@/lib/types/products';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const FilterWrapper = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: theme.spacing(2),
  zIndex: 10,
  backgroundColor: 'rgba(2, 12, 27, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

interface ProductFilterProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
  showCategories?: boolean;
  showStatus?: boolean;
  showSearch?: boolean;
  showSort?: boolean;
  className?: string;
}

interface FilterState {
  search: string;
  category: string;
  status: string;
  sortBy: 'priority' | 'name' | 'category' | 'status';
  sortOrder: 'asc' | 'desc';
}

export default function ProductFilter({
  products,
  onFilterChange,
  showCategories = true,
  showStatus = true,
  showSearch = true,
  showSort = true,
  className
}: ProductFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    status: '',
    sortBy: 'priority',
    sortOrder: 'asc',
  });

  // Get unique categories and statuses
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return uniqueCategories.map(cat => ({
      value: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
    }));
  }, [products]);

  const statuses = useMemo(() => {
    const uniqueStatuses = [...new Set(products.map(p => p.status).filter(Boolean))];
    return uniqueStatuses.map(status => ({
      value: status!,
      label: status === 'coming-soon' ? 'Coming Soon' : 'Live',
    }));
  }, [products]);

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.heading.toLowerCase().includes(searchTerm) ||
        product.tagline.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.metadata?.keywords?.some(keyword =>
          keyword.toLowerCase().includes(searchTerm)
        )
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(product => product.status === filters.status);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (filters.sortBy) {
        case 'name':
          aValue = a.heading;
          bValue = b.heading;
          break;
        case 'category':
          aValue = a.category;
          bValue = b.category;
          break;
        case 'status':
          aValue = a.status || 'live';
          bValue = b.status || 'live';
          break;
        case 'priority':
        default:
          aValue = a.priority;
          bValue = b.priority;
          break;
      }

      if (filters.sortOrder === 'desc') {
        [aValue, bValue] = [bValue, aValue];
      }

      if (typeof aValue === 'string') {
        return aValue.localeCompare(bValue);
      }
      return aValue - bValue;
    });

    return filtered;
  }, [products, filters]);

  // Update parent component when filters change
  useMemo(() => {
    onFilterChange(filteredProducts);
  }, [filteredProducts, onFilterChange]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      status: '',
      sortBy: 'priority',
      sortOrder: 'asc',
    });
  };

  const hasActiveFilters = filters.search || filters.category || filters.status;

  return (
    <FilterWrapper className={className}>
      <Container maxWidth="lg">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search */}
          {showSearch && (
            <div className="flex-1 min-w-0">
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-accent/50"
              />
            </div>
          )}

          {/* Category Filter */}
          {showCategories && (
            <div className="flex-shrink-0">
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-accent/50"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Status Filter */}
          {showStatus && (
            <div className="flex-shrink-0">
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-accent/50"
              >
                <option value="">All Status</option>
                {statuses.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Sort */}
          {showSort && (
            <div className="flex gap-2">
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value as any)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-accent/50"
              >
                <option value="priority">Priority</option>
                <option value="name">Name</option>
                <option value="category">Category</option>
                <option value="status">Status</option>
              </select>
              <button
                onClick={() => handleFilterChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary-accent/50"
              >
                {filters.sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          )}

          {/* Clear Filters */}
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={clearFilters}
              className="px-4 py-2 bg-primary-accent/20 border border-primary-accent/30 rounded-lg text-primary-accent hover:bg-primary-accent/30 focus:outline-none focus:ring-2 focus:ring-primary-accent/50"
            >
              Clear
            </motion.button>
          )}
        </div>

        {/* Results Count */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-3 text-sm text-white/70"
            >
              Showing {filteredProducts.length} of {products.length} products
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </FilterWrapper>
  );
}
