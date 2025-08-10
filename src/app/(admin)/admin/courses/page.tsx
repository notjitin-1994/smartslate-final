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

      {/* Course Creation/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-effect-strong rounded-xl p-6 border border-border-color max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-text-primary mb-4">
              {editingCourse ? 'Edit Course' : 'Create Course'}
            </h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const courseData = {
                id: editingCourse?.id || `course-${Date.now()}`,
                title: formData.get('title') as string,
                description: formData.get('description') as string,
                slug: editingCourse?.slug || (formData.get('title') as string).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                imageUrl: formData.get('imageUrl') as string || null,
                price: formData.get('price') ? parseFloat(formData.get('price') as string) : null,
                duration: formData.get('duration') as string || null,
                level: formData.get('level') as string || null,
                category: formData.get('category') as string || null,
              };

              try {
                const token = localStorage.getItem('auth_token');
                const res = await fetch('/api/admin/courses', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                  },
                  body: JSON.stringify(courseData)
                });
                
                if (res.ok) {
                  loadCourses();
                  setShowModal(false);
                  setEditingCourse(null);
                } else {
                  const error = await res.json();
                  alert(`Failed to save course: ${error.error || 'Unknown error'}`);
                }
              } catch (e) {
                console.error('Failed to save course:', e);
                alert('Failed to save course');
              }
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Course Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    defaultValue={editingCourse?.title}
                    className="w-full px-4 py-2 bg-input-bg border border-border-color rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary-accent transition-colors"
                    placeholder="e.g., Advanced Full Stack Development"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Description *</label>
                  <textarea
                    name="description"
                    required
                    defaultValue={editingCourse?.description}
                    rows={4}
                    className="w-full px-4 py-2 bg-input-bg border border-border-color rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary-accent transition-colors resize-none"
                    placeholder="Comprehensive course description..."
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Image URL</label>
                    <input
                      type="url"
                      name="imageUrl"
                      defaultValue={editingCourse?.imageUrl || ''}
                      className="w-full px-4 py-2 bg-input-bg border border-border-color rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary-accent transition-colors"
                      placeholder="/images/courses/course-image.jpg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Price ($)</label>
                    <input
                      type="number"
                      name="price"
                      step="0.01"
                      min="0"
                      defaultValue={editingCourse?.price || ''}
                      className="w-full px-4 py-2 bg-input-bg border border-border-color rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary-accent transition-colors"
                      placeholder="999.99"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Duration</label>
                    <input
                      type="text"
                      name="duration"
                      defaultValue={editingCourse?.duration || ''}
                      className="w-full px-4 py-2 bg-input-bg border border-border-color rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary-accent transition-colors"
                      placeholder="e.g., 12 weeks"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Level</label>
                    <select
                      name="level"
                      defaultValue={editingCourse?.level || ''}
                      className="w-full px-4 py-2 bg-input-bg border border-border-color rounded-lg text-text-primary focus:outline-none focus:border-primary-accent transition-colors"
                    >
                      <option value="">Select level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">Category</label>
                    <input
                      type="text"
                      name="category"
                      defaultValue={editingCourse?.category || ''}
                      className="w-full px-4 py-2 bg-input-bg border border-border-color rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary-accent transition-colors"
                      placeholder="e.g., Development"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-secondary-accent text-white rounded-lg hover:bg-secondary-accent-dark transition-colors"
                >
                  {editingCourse ? 'Update Course' : 'Create Course'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCourse(null);
                  }}
                  className="flex-1 px-4 py-2 bg-white/10 text-text-primary rounded-lg hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
