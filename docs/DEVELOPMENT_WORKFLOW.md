# Development Workflow Guide

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher
- **Git**: For version control
- **Code Editor**: VS Code recommended with extensions

### Required Extensions (VS Code)

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## 🛠️ Initial Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd smartslate-final
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://oyjslszrygcajdpwgxbe.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Email Configuration (optional)
LEADS_EMAIL_TO="hello@smartslate.io"

# Database URLs (if using direct connections)
DATABASE_URL="postgresql://postgres:password@db.project.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:password@db.project.supabase.co:5432/postgres"
```

### 4. Database Setup

```bash
npm run setup:database
```

### 5. Start Development Server

```bash
npm run dev
```

Navigate to `http://localhost:3000` in your browser.

## 📁 Project Structure

### Key Directories

- **`src/app/`**: Next.js App Router pages and API routes
- **`src/components/`**: Reusable React components
- **`src/hooks/`**: Custom React hooks
- **`src/lib/`**: Utilities, configurations, and types
- **`public/`**: Static assets and PWA files
- **`docs/`**: Project documentation

### File Naming Conventions

- **Components**: PascalCase (e.g., `ProductSection.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useWaitlistModal.ts`)
- **Utilities**: camelCase (e.g., `formatters.ts`)
- **Types**: camelCase (e.g., `products.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `constants.ts`)

## 🔧 Development Scripts

### Available Commands

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript type checking

# Database
npm run setup:database   # Initialize database tables

# Testing
npm run test             # Run tests (when implemented)
```

### Script Descriptions

- **`dev`**: Starts development server with hot reload
- **`build`**: Creates optimized production build
- **`start`**: Serves production build locally
- **`lint`**: Checks code quality and style
- **`type-check`**: Validates TypeScript types
- **`setup:database`**: Creates database tables in Supabase

## 🎨 Styling Guidelines

### CSS Framework Usage

1. **Tailwind CSS First**: Use utility classes when possible
2. **Material-UI Components**: For complex UI components
3. **Custom CSS**: Only when utilities don't suffice
4. **Styled Components**: For component-specific styling

### Example Styling

```tsx
// Good - Using Tailwind utilities
<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
  <h2 className="text-2xl font-bold text-white mb-4">Title</h2>
</div>

// Good - Using Material-UI styled API
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

// Avoid - Custom CSS when utilities exist
<div className="custom-card">
  <h2 className="custom-title">Title</h2>
</div>
```

### Responsive Design

```tsx
// Mobile-first approach
<div className="
  w-full                    /* Mobile: full width */
  md:w-1/2                 /* Tablet: half width */
  lg:w-1/3                 /* Desktop: third width */
  p-4 md:p-6 lg:p-8        /* Responsive padding */
">
  {/* Content */}
</div>
```

## 🧩 Component Development

### Component Structure

```tsx
// 1. Import statements
import React from 'react';
import { motion } from 'framer-motion';

// 2. TypeScript interface
interface ComponentProps {
  title: string;
  description?: string;
  onClick: () => void;
}

// 3. Component definition
const Component: React.FC<ComponentProps> = ({ 
  title, 
  description, 
  onClick 
}) => {
  // 4. Hooks and state
  const [isVisible, setIsVisible] = useState(false);

  // 5. Event handlers
  const handleClick = () => {
    onClick();
    setIsVisible(true);
  };

  // 6. Render
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      className="component-class"
    >
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <button onClick={handleClick}>Click me</button>
    </motion.div>
  );
};

// 7. Export
export default Component;
```

### Component Guidelines

- **Single Responsibility**: Each component should do one thing well
- **Props Interface**: Always define TypeScript interfaces for props
- **Default Props**: Use default values for optional props
- **Error Boundaries**: Include error handling for complex components
- **Loading States**: Show loading indicators for async operations

## 🔌 API Development

### API Route Structure

```tsx
// src/app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Handle GET request
    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.requiredField) {
      return NextResponse.json(
        { error: 'Missing required field' },
        { status: 400 }
      );
    }
    
    // Process request
    const result = await processData(body);
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### API Guidelines

- **Input Validation**: Always validate and sanitize inputs
- **Error Handling**: Provide meaningful error messages
- **Status Codes**: Use appropriate HTTP status codes
- **Response Format**: Consistent JSON response structure
- **Logging**: Log errors and important events

## 🗄️ Database Operations

### Supabase Integration

```tsx
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export function getSupabaseService() {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
```

### Database Operations

```tsx
// Example: Insert data
const { data, error } = await supabase
  .from('table_name')
  .insert({
    field1: 'value1',
    field2: 'value2',
  })
  .select('id, created_at')
  .single();

if (error) {
  console.error('Database error:', error);
  throw new Error('Failed to insert data');
}

return data;
```

### Database Guidelines

- **Service Role**: Use service role for server-side operations
- **Error Handling**: Always check for errors and handle them
- **Transactions**: Use transactions for related operations
- **Indexing**: Ensure proper database indexing for performance
- **Backup**: Regular database backups and version control

## 🧪 Testing Strategy

### Testing Levels

1. **Unit Tests**: Individual component and function testing
2. **Integration Tests**: API endpoint and database testing
3. **E2E Tests**: Full user journey testing
4. **Visual Tests**: UI consistency and responsive testing

### Testing Tools

- **Jest**: Unit and integration testing
- **React Testing Library**: Component testing
- **Playwright**: E2E testing
- **Storybook**: Component development and testing

### Test Structure

```tsx
// Component test example
import { render, screen, fireEvent } from '@testing-library/react';
import Component from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component title="Test" onClick={() => {}} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const mockClick = jest.fn();
    render(<Component title="Test" onClick={mockClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
```

## 📱 PWA Development

### Service Worker

- **Location**: `public/sw.js`
- **Registration**: Automatic via `PWAClient` component
- **Caching**: Offline support and asset caching
- **Updates**: Automatic service worker updates

### Manifest Configuration

```tsx
// src/app/manifest.ts
export default function manifest() {
  return {
    name: 'Smartslate',
    short_name: 'Smartslate',
    description: 'Build Your Future-Ready Workforce',
    start_url: '/',
    display: 'standalone',
    background_color: '#020C1B',
    theme_color: '#a7dadb',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}
```

## 🚀 Performance Optimization

### Code Splitting

```tsx
// Dynamic imports for large components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false, // Disable SSR if needed
});
```

### Image Optimization

```tsx
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={400}
  height={300}
  priority={isAboveFold}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Bundle Analysis

```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer
```

## 🔒 Security Best Practices

### Input Validation

```tsx
// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  throw new Error('Invalid email format');
}

// Sanitize inputs
const sanitizedInput = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
```

### Environment Variables

- **Never commit**: `.env.local` files
- **Use prefixes**: `NEXT_PUBLIC_` for client-side variables
- **Validate**: Check required variables on startup
- **Rotate**: Regularly rotate sensitive keys

### CORS Configuration

```tsx
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
        ],
      },
    ];
  },
};
```

## 📊 Monitoring and Debugging

### Development Tools

- **React DevTools**: Component inspection and debugging
- **Next.js DevTools**: Performance and routing debugging
- **Supabase Dashboard**: Database monitoring and management
- **Browser DevTools**: Network, console, and performance

### Logging Strategy

```tsx
// Development logging
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}

// Error logging
console.error('Error occurred:', error);
// In production, send to error tracking service
```

### Performance Monitoring

- **Core Web Vitals**: Monitor LCP, FID, CLS
- **Bundle Size**: Track JavaScript bundle size
- **Database Queries**: Monitor query performance
- **API Response Times**: Track endpoint performance

## 🔄 Git Workflow

### Branch Strategy

```bash
# Main branches
main                    # Production-ready code
develop                 # Development integration
feature/feature-name    # Feature development
bugfix/bug-description  # Bug fixes
hotfix/urgent-fix      # Urgent production fixes
```

### Commit Guidelines

```bash
# Commit message format
type(scope): description

# Examples
feat(waitlist): add email validation
fix(api): resolve database connection issue
docs(readme): update setup instructions
style(components): improve button styling
refactor(hooks): simplify modal state management
```

### Pull Request Process

1. **Create Branch**: From `develop` branch
2. **Develop Feature**: Implement and test changes
3. **Create PR**: Against `develop` branch
4. **Code Review**: Team review and feedback
5. **Merge**: After approval and tests pass

## 🚀 Deployment

### Build Process

```bash
# Production build
npm run build

# Verify build
npm run start
```

### Environment Setup

1. **Production Environment**: Set all required environment variables
2. **Database Migration**: Run database setup scripts
3. **Domain Configuration**: Configure custom domain and SSL
4. **Monitoring**: Set up performance and error monitoring

### Deployment Platforms

- **Vercel**: Recommended for Next.js (automatic deployments)
- **Netlify**: Alternative with good Next.js support
- **AWS Amplify**: Enterprise-grade deployment
- **Self-hosted**: Docker containers or traditional hosting

## 📚 Resources and References

### Documentation

- **Next.js**: https://nextjs.org/docs
- **Supabase**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Material-UI**: https://mui.com/material-ui/

### Community

- **GitHub Issues**: Project-specific discussions
- **Stack Overflow**: General development questions
- **Discord/Slack**: Team communication channels
- **Blog Posts**: Development insights and tutorials

### Tools and Services

- **VS Code**: Primary development environment
- **Postman**: API testing and documentation
- **Figma**: Design collaboration
- **Notion**: Project documentation and planning

---

This guide is maintained by the development team and should be updated as the project evolves.
