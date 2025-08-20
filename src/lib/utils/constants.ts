// ============================================================================
// APPLICATION CONSTANTS
// ============================================================================

// App Information
export const APP_NAME = 'Smartslate';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Revolutionizing the way the World learns';
export const APP_URL = 'https://smartslate.io';

// API Configuration
export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: '/api/auth/signin',
    SIGNUP: '/api/auth/signup',
    SIGNOUT: '/api/auth/signout',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me',
    CHANGE_PASSWORD: '/api/auth/change-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    CONFIRM_RESET: '/api/auth/confirm-reset-password',
  },
  USERS: {
    BASE: '/api/users',
    PROFILE: '/api/profile',
    ROLES: '/api/users/:id/roles',
    PERMISSIONS: '/api/users/:id/permissions',
    EMAIL_PREFERENCES: '/api/users/:id/email-preferences',
  },
  COURSES: {
    BASE: '/api/courses',
    FEATURED: '/api/courses/featured',
    USER_COURSES: '/api/courses/user',
    BY_SLUG: '/api/courses/slug/:slug',
    PUBLISH: '/api/courses/:id/publish',
    UNPUBLISH: '/api/courses/:id/unpublish',
    MODULES: '/api/courses/:id/modules',
    REORDER_MODULES: '/api/courses/:id/modules/reorder',
  },
  MODULES: {
    BASE: '/api/modules',
    LESSONS: '/api/modules/:id/lessons',
    REORDER_LESSONS: '/api/modules/:id/lessons/reorder',
  },
  LESSONS: {
    BASE: '/api/lessons',
  },
  PROGRESS: {
    BASE: '/api/progress',
    COURSE: '/api/courses/:id/progress',
    COMPLETION: '/api/courses/:id/completion',
  },
  LEADS: {
    BASE: '/api/leads',
    SOURCES: '/api/leads/sources',
    STATS: '/api/leads/stats',
    BY_SOURCE: '/api/leads/stats/by-source',
    BY_STATUS: '/api/leads/stats/by-status',
    EXPORT: '/api/leads/export',
    BULK_UPDATE: '/api/leads/bulk/update',
    BULK_DELETE: '/api/leads/bulk/delete',
    BULK_ASSIGN: '/api/leads/bulk/assign',
  },
  EMAIL: {
    SEND: '/api/email/send',
    TEMPLATE: '/api/email/template',
    BULK: '/api/email/bulk',
    TEMPLATES: '/api/email/templates',
    STATS: '/api/email/stats',
    STATUS: '/api/email/status/:messageId',
    UNSUBSCRIBE: '/api/email/unsubscribe',
    RESUBSCRIBE: '/api/email/resubscribe',
  },
  ANALYTICS: {
    USERS: {
      STATS: '/api/analytics/users/stats',
      GROWTH: '/api/analytics/users/growth',
      RETENTION: '/api/analytics/users/retention',
      ENGAGEMENT: '/api/analytics/users/engagement',
    },
    COURSES: {
      STATS: '/api/analytics/courses/stats',
      PERFORMANCE: '/api/analytics/courses/:id/performance',
      COMPLETION_RATES: '/api/analytics/courses/completion-rates',
      POPULAR: '/api/analytics/courses/popular',
    },
    REVENUE: {
      STATS: '/api/analytics/revenue/stats',
      BY_SOURCE: '/api/analytics/revenue/by-source',
      BY_COURSE: '/api/analytics/revenue/by-course',
    },
    LEADS: {
      STATS: '/api/analytics/leads/stats',
      CONVERSION_RATES: '/api/analytics/leads/conversion-rates',
      SOURCES_PERFORMANCE: '/api/analytics/leads/sources-performance',
    },
    PLATFORM: {
      STATS: '/api/analytics/platform/stats',
      SYSTEM_PERFORMANCE: '/api/analytics/platform/system-performance',
      ERROR_RATES: '/api/analytics/platform/error-rates',
    },
    CUSTOM_REPORT: '/api/analytics/custom-report',
    SAVED_REPORTS: '/api/analytics/saved-reports',
  },
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Error Codes
export const ERROR_CODES = {
  // Authentication errors
  AUTH_FAILED: 'AUTH_FAILED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
  
  // Resource errors
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  CONFLICT: 'CONFLICT',
  
  // Operation errors
  CREATE_FAILED: 'CREATE_FAILED',
  UPDATE_FAILED: 'UPDATE_FAILED',
  DELETE_FAILED: 'DELETE_FAILED',
  FETCH_FAILED: 'FETCH_FAILED',
  
  // System errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  DATABASE_ERROR: 'DATABASE_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  
  // Rate limiting
  RATE_LIMITED: 'RATE_LIMITED',
  TOO_MANY_REQUESTS: 'TOO_MANY_REQUESTS',
} as const;

// User Roles
export const USER_ROLES = {
  OWNER: 'owner',
  LEARNER: 'learner',
  COURSE_MANAGER: 'smartslateCourse',
  SALES_MANAGER: 'smartslateSales',
  SUPPORT_AGENT: 'smartslateSupport',
  ANALYST: 'smartslateAnalytics',
  ADMIN: 'smartslateAdmin',
} as const;

// Permissions
export const PERMISSIONS = {
  // User & role management
  USER_MANAGE: 'user:manage',
  ROLE_MANAGE: 'role:manage',
  
  // Courses
  COURSE_CREATE: 'course:create',
  COURSE_UPDATE: 'course:update',
  COURSE_DELETE: 'course:delete',
  COURSE_PUBLISH: 'course:publish',
  COURSE_READ: 'course:read',
  
  // Sales / CRM / leads
  LEAD_READ: 'lead:read',
  LEAD_EXPORT: 'lead:export',
  LEAD_DELETE: 'lead:delete',
  CRM_ACCESS: 'crm:access',
  PIPELINE_ACCESS: 'pipeline:access',
  
  // Support
  TICKET_READ: 'ticket:read',
  TICKET_WRITE: 'ticket:write',
  USER_READ: 'user:read',
  
  // Analytics
  METRICS_READ: 'metrics:read',
  REPORTS_READ: 'reports:read',
  
  // Admin platform
  SETTINGS_WRITE: 'settings:write',
  INTEGRATION_CONFIGURE: 'integration:configure',
  CONTENT_MODERATE: 'content:moderate',
  LOGS_ACCESS: 'logs:access',
  API_ACCESS: 'api:access',
  DATABASE_MANAGE: 'database:manage',
  EMERGENCY_OVERRIDE: 'emergency:override',
  
  // Wildcard
  ALL: 'all:*',
} as const;

// Course Constants
export const COURSE_DIFFICULTY = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
} as const;

export const COURSE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const;

export const LESSON_TYPES = {
  VIDEO: 'video',
  TEXT: 'text',
  QUIZ: 'quiz',
  ASSIGNMENT: 'assignment',
} as const;

// Lead Constants
export const LEAD_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'qualified',
  PROPOSAL: 'proposal',
  NEGOTIATION: 'negotiation',
  CLOSED: 'closed',
  LOST: 'lost',
} as const;

export const LEAD_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

export const LEAD_SOURCE = {
  WEBSITE: 'website',
  PARTNER: 'partner',
  REFERRAL: 'referral',
  SOCIAL: 'social',
  OTHER: 'other',
} as const;

// Progress Status
export const PROGRESS_STATUS = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
} as const;

// UI Constants
export const UI = {
  // Breakpoints
  BREAKPOINTS: {
    XS: 0,
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536,
  },
  
  // Sidebar
  SIDEBAR: {
    EXPANDED_WIDTH: 252,
    COLLAPSED_WIDTH: 72,
    MOBILE_BREAKPOINT: 'md',
  },
  
  // Z-index layers
  Z_INDEX: {
    DROPDOWN: 1000,
    STICKY: 1020,
    FIXED: 1030,
    MODAL_BACKDROP: 1040,
    MODAL: 1050,
    POPOVER: 1060,
    TOOLTIP: 1070,
    TOAST: 1080,
  },
  
  // Animation durations
  ANIMATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  
  // Border radius
  BORDER_RADIUS: {
    NONE: '0',
    SM: '0.125rem',
    DEFAULT: '0.25rem',
    MD: '0.375rem',
    LG: '0.5rem',
    XL: '0.75rem',
    '2XL': '1rem',
    '3XL': '1.5rem',
    FULL: '9999px',
  },
} as const;

// Form Validation
export const VALIDATION = {
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL: false,
  },
  EMAIL: {
    MAX_LENGTH: 254,
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
  },
  PHONE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 15,
  },
  COURSE: {
    TITLE: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 200,
    },
    DESCRIPTION: {
      MIN_LENGTH: 10,
      MAX_LENGTH: 1000,
    },
    SLUG: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 100,
    },
  },
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/webm', 'video/ogg'],
  IMAGE_DIMENSIONS: {
    AVATAR: { width: 200, height: 200 },
    THUMBNAIL: { width: 400, height: 300 },
    BANNER: { width: 1200, height: 400 },
  },
} as const;

// Cache Keys
export const CACHE_KEYS = {
  USER: 'user',
  USER_PROFILE: 'user-profile',
  COURSES: 'courses',
  FEATURED_COURSES: 'featured-courses',
  USER_COURSES: 'user-courses',
  LEADS: 'leads',
  LEAD_STATS: 'lead-stats',
  ANALYTICS: 'analytics',
  EMAIL_TEMPLATES: 'email-templates',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  AUTH_USER: 'auth_user',
  THEME: 'theme',
  SIDEBAR_STATE: 'sidebar_state',
  USER_PREFERENCES: 'user_preferences',
  FORM_DRAFTS: 'form_drafts',
} as const;

// Environment
export const ENVIRONMENT = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
} as const;

// Feature Flags
export const FEATURES = {
  ANALYTICS: 'analytics',
  NOTIFICATIONS: 'notifications',
  FILE_UPLOAD: 'fileUpload',
  PWA: 'pwa',
  ADVANCED_SEARCH: 'advancedSearch',
  BULK_OPERATIONS: 'bulkOperations',
  EXPORT_FUNCTIONALITY: 'exportFunctionality',
  REAL_TIME_UPDATES: 'realTimeUpdates',
} as const;

// Export all constants
export const CONSTANTS = {
  APP_NAME,
  APP_VERSION,
  APP_DESCRIPTION,
  APP_URL,
  API_ENDPOINTS,
  HTTP_STATUS,
  ERROR_CODES,
  USER_ROLES,
  PERMISSIONS,
  COURSE_DIFFICULTY,
  COURSE_STATUS,
  LESSON_TYPES,
  LEAD_STATUS,
  LEAD_PRIORITY,
  LEAD_SOURCE,
  PROGRESS_STATUS,
  UI,
  VALIDATION,
  PAGINATION,
  FILE_UPLOAD,
  CACHE_KEYS,
  STORAGE_KEYS,
  ENVIRONMENT,
  FEATURES,
} as const;
