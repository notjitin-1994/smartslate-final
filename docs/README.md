# SmartSlate Documentation

Welcome to the SmartSlate project documentation. This comprehensive guide covers all aspects of the project, from setup and development to deployment and maintenance.

## 📚 Documentation Index

### 🚀 Getting Started
- **[README.md](../README.md)** - Project overview, setup, and quick start guide
- **[DEVELOPMENT_WORKFLOW.md](./DEVELOPMENT_WORKFLOW.md)** - Complete development workflow and best practices

### 🏗️ Architecture & Structure
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Detailed project structure and architecture overview
- **[ENVIRONMENT.md](./ENVIRONMENT.md)** - Environment setup and configuration guide

### 🎨 Development Guides
- **[COMPONENT_LIBRARY.md](./COMPONENT_LIBRARY.md)** - Complete component library and usage examples
- **[STYLING_GUIDE.md](./STYLING_GUIDE.md)** - Design system, styling guidelines, and best practices

### 🔌 API & Integration
- **[API.md](./API.md)** - Complete API documentation and endpoint reference
- **[WAITLIST_SYSTEM.md](./WAITLIST_SYSTEM.md)** - Waitlist system implementation and usage

### 📋 Project Management
- **[DIFFERENCE_PAGE_REFACTORING.md](./DIFFERENCE_PAGE_REFACTORING.md)** - Refactoring notes and implementation details
- **[PRODUCTS_REFACTORING.md](./PRODUCTS_REFACTORING.md)** - Products page refactoring documentation

### 🧪 Testing & Examples
- **[api.http](./api.http)** - API testing examples and HTTP requests

## 🎯 Quick Start

### 1. Project Setup
```bash
# Clone repository
git clone <repository-url>
cd smartslate-final

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Setup database
npm run setup:database

# Start development server
npm run dev
```

### 2. Key Commands
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript type checking
npm run setup:database   # Initialize database tables
```

### 3. Environment Variables
```bash
# Required
NEXT_PUBLIC_SUPABASE_URL="https://oyjslszrygcajdpwgxbe.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Optional
LEADS_EMAIL_TO="hello@smartslate.io"
```

## 🏗️ Project Overview

SmartSlate is a modern Next.js 14 application designed for learning platform lead capture and product showcase. The project features:

- **Next.js 14** with App Router and TypeScript
- **Supabase** integration for database and authentication
- **Tailwind CSS** and **Material-UI** for styling
- **PWA** capabilities with service worker and manifest
- **Lead capture system** with comprehensive forms
- **Product showcase** with interactive components
- **Responsive design** optimized for all devices

## 🗄️ Database Schema

The application uses the following Supabase tables:

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `waitlist_leads` | Course waitlist submissions | name, email, source, course_name |
| `solara_interest_modal` | Solara product interest | name, email, primary_use_case |
| `ssa_interest_modal` | SSA product interest | name, email, primary_use_case |
| `case_study_requests` | Case study inquiries | name, email, case_study_type |
| `consultation_requests` | Consultation bookings | name, email, consultation_type |
| `demo_requests` | Demo scheduling | name, email, demo_type |
| `partner_inquiries` | Partnership requests | name, email, partnership_type |

## 🔌 API Endpoints

### Lead Capture APIs
- `POST /api/leads/waitlist` - Course waitlist submissions
- `POST /api/leads/solara` - Solara product interest
- `POST /api/leads/ssa` - SSA product interest
- `POST /api/leads/case-study` - Case study requests
- `POST /api/leads/consultation` - Consultation requests
- `POST /api/leads/demo` - Demo requests
- `POST /api/leads/partner` - Partnership inquiries

### Database Management
- `POST /api/setup-database` - Initialize database tables
- `GET /api/check-database` - Check database connection

## 🎨 Design System

### Color Palette
- **Primary**: `#a7dadb` (Cyan)
- **Secondary**: `#4F46E5` (Purple)
- **Background**: `#020C1B` (Dark Blue)
- **Text**: `#e0e0e0` (Light Gray)

### Typography
- **Headings**: Quicksand (700 weight)
- **Body**: Lato (400, 500, 700 weights)

### Components
- **Glass Morphism**: Consistent glass effect across components
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Animations**: Framer Motion for smooth interactions

## 🧩 Component Architecture

### Core Components
- **Layout**: Header, Footer, MobileMenu
- **UI**: Modal, FormField, StandardHero, WaitlistButton
- **Landing**: Hero, Framework, TalentParadox, ROICalculator
- **Products**: ProductSection, ProductList, ProductFilter
- **Difference**: ComparisonSection, KeyDifferentiators, ImpactMetrics

### Hooks
- **Modal Management**: useModalManager, useWaitlistModal
- **Page State**: useLandingPage, useSidebar
- **Product Interest**: useSolaraInterestModal, useSSAInterestModal

## 📱 PWA Features

- **Service Worker**: Offline support and caching
- **Manifest**: App installation and splash screen
- **Responsive Design**: Optimized for all device sizes
- **Performance**: Core Web Vitals optimization

## 🚀 Performance Features

- **Code Splitting**: Automatic via Next.js App Router
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Component-level lazy loading
- **Bundle Optimization**: Minimal bundle impact

## 🔒 Security Features

- **Input Validation**: Server-side validation on all inputs
- **SQL Injection Protection**: Parameterized queries via Supabase
- **XSS Protection**: Next.js built-in protection
- **Environment Variables**: Secure configuration management

## 🧪 Testing Strategy

### Current Implementation
- **Component Testing**: Manual testing via test pages
- **API Testing**: Manual testing via api.http examples
- **Responsive Testing**: Manual testing across devices

### Planned Implementation
- **Unit Tests**: Jest and React Testing Library
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Playwright for user journey testing
- **Visual Tests**: Storybook for component development

## 📊 Monitoring & Analytics

### Current Metrics
- **Performance**: Core Web Vitals monitoring
- **Usage**: Basic page view tracking
- **Errors**: Console error logging

### Planned Enhancements
- **User Behavior**: Advanced analytics and tracking
- **Conversion**: Lead conversion metrics
- **Performance**: Real-time performance monitoring
- **A/B Testing**: Component and page testing

## 🔄 Development Workflow

### Git Strategy
- **Main Branch**: Production-ready code
- **Feature Branches**: Feature development
- **Pull Requests**: Code review and integration
- **Deployment**: Automated via CI/CD

### Code Quality
- **ESLint**: Code style and quality enforcement
- **TypeScript**: Type safety and development experience
- **Prettier**: Code formatting consistency
- **Husky**: Pre-commit hooks

## 🚀 Deployment

### Platforms
- **Vercel**: Recommended for Next.js (automatic deployments)
- **Netlify**: Alternative with good Next.js support
- **AWS Amplify**: Enterprise-grade deployment
- **Self-hosted**: Docker containers or traditional hosting

### Process
1. **Build**: `npm run build`
2. **Environment**: Configure production environment variables
3. **Database**: Run database setup scripts
4. **Deploy**: Push to deployment platform
5. **Verify**: Test production deployment

## 📚 Additional Resources

### External Documentation
- **[Next.js](https://nextjs.org/docs)** - Framework documentation
- **[Supabase](https://supabase.com/docs)** - Database and auth documentation
- **[Tailwind CSS](https://tailwindcss.com/docs)** - CSS framework documentation
- **[Material-UI](https://mui.com/material-ui/)** - Component library documentation

### Community & Support
- **GitHub Issues**: Project-specific discussions and bug reports
- **Stack Overflow**: General development questions
- **Team Communication**: Internal channels for team collaboration
- **Documentation Updates**: Regular documentation maintenance

## 🔄 Maintenance

### Regular Tasks
- **Dependencies**: Monthly dependency updates
- **Documentation**: Quarterly documentation review
- **Performance**: Monthly performance audits
- **Security**: Quarterly security reviews

### Update Process
1. **Review**: Assess current documentation accuracy
2. **Update**: Modify documentation to reflect changes
3. **Validate**: Ensure examples and instructions work
4. **Publish**: Update documentation and notify team

---

## 📝 Contributing to Documentation

This documentation is maintained by the development team. To contribute:

1. **Identify Issues**: Find outdated or incorrect information
2. **Propose Changes**: Create documentation update requests
3. **Submit Updates**: Provide updated documentation content
4. **Review Process**: Team review and approval
5. **Publish**: Update documentation and notify stakeholders

## 🆘 Getting Help

If you need assistance:

1. **Check Documentation**: Review relevant documentation sections
2. **Search Issues**: Look for similar issues in GitHub
3. **Ask Team**: Reach out to the development team
4. **Create Issue**: Submit new issues for documentation gaps

---

*Last updated: January 2024*

*This documentation is continuously maintained and updated as the project evolves.*
