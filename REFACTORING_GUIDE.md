# Smartslate Codebase Refactoring Guide

## 🎯 Overview

This document outlines the comprehensive refactoring of the Smartslate codebase to improve scalability, maintainability, and developer experience. The refactoring introduces a clean architecture pattern with clear separation of concerns.

## 🏗️ Architecture Overview

### Before Refactoring
- Mixed state management approaches (Context + useState)
- Scattered business logic in components
- Inconsistent error handling
- No centralized type system
- Hardcoded configuration values
- Mixed authentication patterns

### After Refactoring
- **Unified State Management**: Zustand stores for all application state
- **Service Layer**: Business logic separated into typed services
- **Centralized Types**: Single source of truth for all interfaces
- **API Layer**: Consistent, typed API client with error handling
- **Configuration Management**: Centralized, validated configuration
- **Utility Functions**: Reusable helper functions and formatters

## 📁 New File Structure

```
src/
├── types/           # Centralized type definitions
│   └── index.ts     # Main types export
├── config/          # Configuration management
│   ├── index.ts     # Main config with validation
│   └── rbac.ts      # Role-based access control
├── store/           # Zustand state management
│   └── index.ts     # All stores and selectors
├── services/        # Business logic layer
│   ├── index.ts     # Service exports
│   ├── auth.service.ts
│   ├── courses.service.ts
│   ├── leads.service.ts
│   ├── user.service.ts
│   ├── email.service.ts
│   └── analytics.service.ts
├── lib/             # Core utilities
│   ├── api/         # API client and utilities
│   │   └── index.ts
│   └── utils/       # Utility functions
│       ├── index.ts
│       ├── constants.ts
│       └── formatters.ts
└── contexts/        # React contexts (simplified)
    └── AuthContext.tsx
```

## 🔧 Key Components

### 1. Type System (`src/types/index.ts`)

Centralized type definitions for the entire application:

```typescript
// Core entities
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  email: string;
  fullName: string;
  phoneNumber?: string;
  avatar?: string;
  isActive: boolean;
  lastLoginAt?: Date;
}

// Authentication
export interface AuthContext {
  sub: string | null;
  email: string | null;
  roles: RoleName[];
  permissions: Set<Permission>;
  raw: Record<string, any> | null;
}

// API responses
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}
```

### 2. Configuration Management (`src/config/index.ts`)

Type-safe configuration with validation:

```typescript
export const config: AppConfig = {
  app: {
    name: 'Smartslate',
    version: process.env.npm_package_version || '1.0.0',
    environment: (process.env.NODE_ENV as AppConfig['app']['environment']) || 'development',
    url: requireEnvVar('NEXT_PUBLIC_APP_URL'),
  },
  supabase: {
    url: requireEnvVar('SUPABASE_URL'),
    anonKey: requireEnvVar('SUPABASE_ANON_KEY'),
    serviceRoleKey: requireEnvVar('SUPABASE_SERVICE_ROLE_KEY'),
  },
  // ... more config
};

// Validation
export function validateConfig(): void {
  // Ensures all required env vars are present
}
```

### 3. State Management (`src/store/index.ts`)

Zustand stores for different domains:

```typescript
// Auth store
export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        isAuthenticated: false,
        user: null,
        token: null,
        loading: true,
        
        login: (token: string, user: User) => {
          set({ isAuthenticated: true, user, token, loading: false });
        },
        
        logout: () => {
          set({ isAuthenticated: false, user: null, token: null, loading: false });
        },
        // ... more actions
      }),
      { name: 'auth-storage' }
    )
  )
);

// UI store
export const useUIStore = create<UIStore>()(
  devtools(
    (set) => ({
      sidebar: { sidebarOpen: true, sidebarCollapsed: false },
      modals: {},
      // ... sidebar and modal actions
    })
  )
);
```

### 4. Service Layer (`src/services/`)

Business logic separated into typed services:

```typescript
// Auth service
export class AuthServiceImpl implements AuthService {
  async signIn(email: string, password: string): Promise<{ token: string; user: User }> {
    try {
      const response = await apiClient.post('/api/auth/signin', { email, password });
      
      if (!response.success || !response.data) {
        throw createApiError('AUTH_FAILED', 'Sign in failed');
      }

      const { token, user } = response.data;
      apiClient.setAuthToken(token);
      
      return { token, user };
    } catch (error) {
      throw this.handleAuthError(error, 'Sign in failed');
    }
  }
  
  // ... more methods
}

export const authService = new AuthServiceImpl();
```

### 5. API Layer (`src/lib/api/index.ts`)

Consistent API client with error handling:

```typescript
class ApiClient {
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    // Handles HTTP requests, timeouts, error parsing
  }
  
  async get<T>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }
  
  // ... other HTTP methods
}

export const apiClient = new ApiClient();
```

### 6. Utility Functions (`src/lib/utils/`)

Reusable helper functions:

```typescript
// String utilities
export function capitalize(str: string): string
export function slugify(str: string): string
export function generateId(length?: number): string

// Array utilities
export function chunk<T>(array: T[], size: number): T[][]
export function groupBy<T, K>(array: T[], key: (item: T) => K): Record<K, T[]>

// Date utilities
export function formatDate(date: Date | string, format?: string): string
export function timeAgo(date: Date | string): string

// Validation utilities
export function isValidEmail(email: string): boolean
export function isStrongPassword(password: string): { isValid: boolean; score: number; feedback: string[] }
```

## 🚀 Usage Examples

### Using the Store

```typescript
import { useAuth, useUI } from '@/store';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { sidebar, toggleSidebar } = useUI();
  
  // Use state and actions
}
```

### Using Services

```typescript
import { authService, coursesService } from '@/services';

async function handleLogin(email: string, password: string) {
  try {
    const { token, user } = await authService.signIn(email, password);
    // Handle successful login
  } catch (error) {
    // Handle error
  }
}

async function fetchCourses() {
  try {
    const courses = await coursesService.getCourses({ limit: 20 });
    // Use courses data
  } catch (error) {
    // Handle error
  }
}
```

### Using Utilities

```typescript
import { formatDate, formatCurrency, isValidEmail } from '@/lib/utils';

// Format dates
const formattedDate = formatDate(new Date(), 'long');
const timeAgo = formatDate(new Date(), 'relative');

// Format currency
const price = formatCurrency(99.99, 'USD');

// Validate inputs
const isValid = isValidEmail('user@example.com');
```

## 🔄 Migration Guide

### 1. Update Imports

Replace old imports with new ones:

```typescript
// Old
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

// New
import { useAuth } from '@/store';
import { authService } from '@/services';
```

### 2. Replace useState with Store

```typescript
// Old
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(false);

// New
const { user, loading } = useAuth();
```

### 3. Replace API Calls with Services

```typescript
// Old
const response = await fetch('/api/auth/signin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

// New
const { token, user } = await authService.signIn(email, password);
```

### 4. Use Utility Functions

```typescript
// Old
const formattedDate = new Date().toLocaleDateString();

// New
import { formatDate } from '@/lib/utils';
const formattedDate = formatDate(new Date(), 'long');
```

## 🧪 Testing

### Store Testing

```typescript
import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '@/store';

test('auth store login', () => {
  const { result } = renderHook(() => useAuthStore());
  
  act(() => {
    result.current.login('token', mockUser);
  });
  
  expect(result.current.isAuthenticated).toBe(true);
  expect(result.current.user).toEqual(mockUser);
});
```

### Service Testing

```typescript
import { authService } from '@/services';
import { apiClient } from '@/lib/api';

jest.mock('@/lib/api');

test('auth service signin', async () => {
  const mockResponse = { success: true, data: { token: 'token', user: mockUser } };
  (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);
  
  const result = await authService.signIn('test@example.com', 'password');
  
  expect(result).toEqual({ token: 'token', user: mockUser });
});
```

## 🔒 Security Considerations

### Environment Variables

- All sensitive configuration is loaded from environment variables
- Configuration validation ensures required values are present
- No hardcoded secrets in the codebase

### Authentication

- JWT tokens are properly validated
- Role-based access control (RBAC) is implemented
- Permission checking is centralized

### API Security

- Consistent error handling prevents information leakage
- Input validation at the service layer
- Rate limiting support built into the API client

## 📈 Performance Benefits

### State Management

- Zustand provides better performance than Context + useState
- Selective re-rendering with store selectors
- Persistence layer for better UX

### Code Splitting

- Services can be lazy-loaded
- Utilities are tree-shakeable
- Type-only imports reduce bundle size

### Caching

- Built-in caching support in the API layer
- Store persistence reduces unnecessary API calls
- Efficient state updates

## 🚨 Common Issues & Solutions

### 1. Build Errors

**Issue**: Module not found errors after refactoring
**Solution**: Ensure all new files are created and exports are correct

### 2. Type Errors

**Issue**: TypeScript errors with new interfaces
**Solution**: Update component props to use new types from `@/types`

### 3. State Not Updating

**Issue**: Components not re-rendering after state changes
**Solution**: Use store selectors instead of accessing store directly

### 4. API Errors

**Issue**: API calls failing with new service layer
**Solution**: Check that API endpoints match the new service implementations

## 🔮 Future Enhancements

### Planned Improvements

1. **Real-time Updates**: WebSocket integration for live data
2. **Advanced Caching**: Redis integration for better performance
3. **Microservices**: Service layer can be easily extracted to microservices
4. **GraphQL**: API layer can be extended to support GraphQL
5. **Internationalization**: Built-in i18n support in the utility layer

### Extension Points

- Add new services by implementing the service interface
- Extend stores with new state slices
- Add new utility functions to the utils library
- Create new formatters for specific data types

## 📚 Additional Resources

- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Clean Architecture Principles](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## 🤝 Contributing

When contributing to the refactored codebase:

1. **Follow the Architecture**: Use the established patterns
2. **Add Types**: Define interfaces for new data structures
3. **Use Services**: Implement business logic in the service layer
4. **Update Stores**: Add new state to appropriate stores
5. **Write Tests**: Ensure new code is properly tested
6. **Document Changes**: Update this guide for significant changes

---

This refactoring establishes a solid foundation for future development while maintaining backward compatibility. The new architecture is designed to scale with the application's growth and provide a better developer experience.
