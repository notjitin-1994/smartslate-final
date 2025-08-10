'use client';

import { useState, useEffect } from 'react';
import { 
  Add, 
  Edit, 
  Delete, 
  Visibility, 
  VisibilityOff,
  Search,
  FilterList
} from '@mui/icons-material';
import { Course } from '@prisma/client';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPublished, setFilterPublished] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      const res = await fetch('/api/courses');
      const data = await res.json();
      if (data) {
        setCourses(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error('Failed to load courses:', e);
    } finally {
      setLoading(false);
    }
  }

  async function togglePublish(course: Course) {
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch('/api/admin/courses', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ slug: course.slug, published: !course.published })
      });
      if (res.ok) {
        loadCourses();
      }
    } catch (e) {
      console.error('Failed to toggle publish:', e);
    }
  }

  async function deleteCourse(slug: string) {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    try {
      const token = localStorage.getItem('auth_token');
      const res = await fetch(`/api/admin/courses?slug=${slug}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      });
      if (res.ok) {
        loadCourses();
      }
    } catch (e) {
      console.error('Failed to delete course:', e);
    }
  }

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterPublished === 'all' || 
                         (filterPublished === 'published' && course.published) ||
                         (filterPublished === 'draft' && !course.published);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Course Management</h1>
          <p className="text-text-secondary mt-1">Create, edit, and manage your courses</p>
        </div>
        <button
          onClick={() => {
            setEditingCourse(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-secondary-accent text-white rounded-lg hover:bg-secondary-accent-dark transition-colors duration-200"
        >
          <Add className="w-5 h-5" />
          <span>Create Course</span>
        </button>
      </div>

      {/* Filters */}
      <div className="glass-effect-strong rounded-xl p-4 border border-border-color">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input-bg border border-border-color rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary-accent transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <FilterList className="w-5 h-5 text-text-secondary" />
            <select
              value={filterPublished}
              onChange={(e) => setFilterPublished(e.target.value as any)}
              className="px-4 py-2 bg-input-bg border border-border-color rounded-lg text-text-primary focus:outline-none focus:border-primary-accent transition-colors"
            >
              <option value="all">All Courses</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-effect rounded-xl p-6 border border-border-color animate-pulse">
              <div className="h-40 bg-gray-700 rounded-lg mb-4" />
              <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-700 rounded w-full" />
            </div>
          ))}
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="glass-effect-strong rounded-xl p-12 border border-border-color text-center">
          <p className="text-text-secondary">
            {searchTerm || filterPublished !== 'all' 
              ? 'No courses found matching your criteria' 
              : 'No courses created yet'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="glass-effect rounded-xl border border-border-color hover:border-primary-accent/50 transition-all duration-300 overflow-hidden group">
              {/* Course Image */}
              {course.imageUrl && (
                <div className="h-48 bg-gray-800 relative overflow-hidden">
                  <img 
                    src={course.imageUrl} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${course.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {course.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Course Details */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                  {course.description || 'No description'}
                </p>
                
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-text-secondary mb-4">
                  {course.duration && <span>{course.duration}</span>}
                  {course.level && <span>{course.level}</span>}
                  {course.price && <span>${course.price}</span>}
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingCourse(course);
                      setShowModal(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span className="text-sm">Edit</span>
                  </button>
                  <button
                    onClick={() => togglePublish(course)}
                    className="flex items-center justify-center p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {course.published ? <VisibilityOff className="w-4 h-4" /> : <Visibility className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => deleteCourse(course.slug)}
                    className="flex items-center justify-center p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                  >
                    <Delete className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal would go here - keeping it simple for now */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-effect-strong rounded-xl p-6 border border-border-color max-w-md w-full">
            <h2 className="text-xl font-bold text-text-primary mb-4">
              {editingCourse ? 'Edit Course' : 'Create Course'}
            </h2>
            <p className="text-text-secondary mb-4">
              Course editor implementation pending...
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
