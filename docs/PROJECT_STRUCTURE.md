# Smartslate Project Structure

## 📁 Overview

This document provides a comprehensive overview of the Smartslate project structure, architecture, and organization. The project is a Next.js 14 application with Supabase integration, focusing on lead capture and product showcase functionality.

## 🏗️ Architecture Overview

```
smartslate-final/
├── src/                          # Source code
│   ├── app/                      # Next.js App Router
│   ├── components/               # React components
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utilities and configurations
│   └── types/                    # TypeScript type definitions
├── public/                       # Static assets
├── docs/                         # Documentation
├── package.json                  # Dependencies and scripts
└── Configuration files
```

## 📂 Directory Structure

### Root Level
- **`package.json`** - Project dependencies and scripts
- **`next.config.ts`** - Next.js configuration
- **`tailwind.config.ts`** - Tailwind CSS configuration
- **`tsconfig.json`** - TypeScript configuration
- **`.env.local`** - Environment variables (not in version control)
- **`README.md`** - Project overview and setup instructions

### Source Code (`src/`)

#### App Router (`src/app/`)
```
src/app/
├── api/                          # API routes
│   ├── check-database/           # Database health check
│   ├── leads/                    # Lead capture endpoints
│   │   ├── case-study/          # Case study requests
│   │   ├── consultation/         # Consultation bookings
│   │   ├── demo/                 # Demo scheduling
│   │   ├── partner/              # Partnership inquiries
│   │   ├── solara/               # Solara product interest
│   │   ├── ssa/                  # SSA product interest
│   │   └── waitlist/             # Course waitlist
│   └── setup-database/           # Database initialization
├── difference/                   # Difference page
├── legal/                        # Legal pages
│   ├── privacy/                  # Privacy policy
│   └── terms/                    # Terms of service
├── partner/                      # Partner page
├── products/                     # Products showcase
├── test/                         # Test pages
├── test-modals/                  # Modal testing
├── test-simple/                  # Simple component testing
├── waitlist-example/             # Waitlist example
├── favicon.ico                   # Site icon
├── globals.css                   # Global styles
├── layout.tsx                    # Root layout
├── loading.tsx                   # Loading component
├── manifest.ts                   # PWA manifest
└── page.tsx                      # Homepage
```

#### Components (`src/components/`)
```
src/components/
├── difference/                   # Difference page components
│   ├── ComparisonSection.tsx     # Company comparison
│   ├── CTASection.tsx            # Call-to-action
│   ├── DifferenceHero.tsx        # Hero section
│   ├── ImpactMetrics.tsx         # Impact statistics
│   ├── KeyDifferentiators.tsx    # Key differentiators
│   ├── TransformationJourney.tsx # Transformation process
│   └── styles/                   # Styled components
│       └── DifferenceStyles.tsx  # Difference page styles
├── icons/                        # Icon components
│   └── ProductIcons.tsx          # Product icons
├── landing/                      # Landing page components
│   ├── CaseStudyModal.tsx        # Case study modal
│   ├── CaseStudyRequestsModal.tsx # Case study requests
│   ├── ConsultationModal.tsx     # Consultation modal
│   ├── DemoModal.tsx             # Demo modal
│   ├── Framework.tsx             # Framework section
│   ├── Hero.tsx                  # Hero section
│   ├── NavigationDots.tsx        # Navigation dots
│   ├── PartnerModal.tsx          # Partner modal
│   ├── Partners.tsx              # Partners section
│   ├── ROICalculator.tsx         # ROI calculator
│   ├── TalentParadox.tsx         # Talent paradox section
│   └── styles/                   # Styled components
│       └── LandingStyles.tsx     # Landing page styles
├── layout/                       # Layout components
│   ├── Footer.tsx                # Site footer
│   ├── Header.tsx                # Site header
│   └── MobileMenu.tsx            # Mobile navigation
├── products/                     # Product components
│   ├── Hero.tsx                  # Products hero
│   ├── IgniteInfographic.tsx     # Ignite infographic
│   ├── ProductFilter.tsx         # Product filtering
│   ├── ProductList.tsx           # Product grid
│   ├── ProductSection.tsx        # Product showcase
│   ├── SolaraInfographic.tsx     # Solara infographic
│   ├── SolaraInterestModal.tsx   # Solara interest modal
│   ├── SSAInterestModal.tsx      # SSA interest modal
│   └── StrategicSkillsInfographic.tsx # Skills infographic
├── providers/                    # Context providers
│   ├── ModalProvider.tsx         # Modal state management
│   ├── PWAClient.tsx             # PWA functionality
│   ├── ThemeProvider.tsx         # Material-UI theme
│   └── TrackClient.tsx           # Analytics tracking
├── seo/                          # SEO components
│   ├── jsonld.ts                 # JSON-LD utilities
│   └── JsonLd.tsx                # JSON-LD component
└── ui/                           # Reusable UI components
    ├── Accordion.tsx             # Accordion component
    ├── DemoButton.tsx            # Demo request button
    ├── FormField.tsx             # Form input field
    ├── Modal.tsx                 # Modal component
    ├── Pagination.tsx            # Pagination component
    ├── StandardHero.tsx          # Reusable hero
    ├── WaitlistButton.tsx        # Waitlist button
    └── WaitlistModal.tsx         # Waitlist modal
```

#### Hooks (`src/hooks/`)
```
src/hooks/
├── useCaseStudyModal.ts          # Case study modal hook
├── useConsultationModal.ts       # Consultation modal hook
├── useDemoModal.ts               # Demo modal hook
├── useLandingPage.ts             # Landing page hook
├── useModalManager.ts             # Modal management hook
├── usePartnerModal.ts            # Partner modal hook
├── useSidebar.ts                 # Sidebar hook
├── useSolaraInterestModal.ts     # Solara interest modal hook
├── useSSAInterestModal.ts        # SSA interest modal hook
└── useWaitlistModal.ts           # Waitlist modal hook
```

#### Library (`src/lib/`)
```
src/lib/
├── config/                       # Configuration files
│   └── productConfig.ts          # Product configuration
├── data/                         # Data and types
│   ├── differencePage.ts         # Difference page data
│   ├── differencePage.tsx        # Difference page data (TSX)
│   └── products.tsx              # Products data
├── types/                        # TypeScript types
│   └── products.ts               # Product type definitions
├── utils/                        # Utility functions
│   ├── constants.ts              # Application constants
│   ├── formatters.ts             # Data formatting utilities
│   ├── index.ts                  # Utility exports
│   ├── productManagement.ts      # Product management utilities
│   └── productMapping.tsx        # Product mapping utilities
├── database-setup.ts             # Database initialization
├── email.ts                      # Email utilities
├── supabase.ts                   # Supabase client
└── theme.ts                      # Material-UI theme
```

### Public Assets (`public/`)
```
public/
├── images/                       # Image assets
│   ├── courses/                  # Course images
│   ├── story-illustrations/      # Story illustrations
│   └── userheadshot.png          # User avatar
├── logo.png                      # Company logo
├── logo-swirl.png                # Logo variant
├── manifest.json                 # PWA manifest
├── robots.txt                    # SEO robots file
├── sitemap.xml                   # SEO sitemap
├── sw.js                         # Service worker
└── Various SVG icons
```

### Documentation (`docs/`)
```
docs/
├── API.md                        # API documentation
├── COMPONENT_LIBRARY.md          # Component library guide
├── DIFFERENCE_PAGE_REFACTORING.md # Refactoring notes
├── ENVIRONMENT.md                # Environment setup guide
├── PRODUCTS_REFACTORING.md       # Products refactoring notes
├── PROJECT_STRUCTURE.md          # This file
├── STYLING_GUIDE.md              # Styling guidelines
├── WAITLIST_SYSTEM.md            # Waitlist system documentation
└── api.http                      # API testing examples
```

## 🔧 Configuration Files

### Next.js Configuration (`next.config.ts`)
- **App Router**: Enabled with app directory
- **Image Optimization**: Next.js Image component configuration
- **PWA Support**: Service worker and manifest integration
- **SEO**: Sitemap generation and metadata handling

### Tailwind CSS (`tailwind.config.ts`)
- **Custom Colors**: Brand color palette
- **Custom Spacing**: Consistent spacing scale
- **Component Scanning**: Automatic component class detection
- **Dark Mode**: Dark theme support

### TypeScript (`tsconfig.json`)
- **Strict Mode**: Enabled for type safety
- **Path Mapping**: Absolute imports with `@/` prefix
- **Modern Features**: Latest TypeScript features enabled
- **Next.js Integration**: Optimized for Next.js

## 🗄️ Database Schema

### Tables
The application uses the following Supabase tables:

1. **`waitlist_leads`** - Course waitlist submissions
2. **`solara_interest_modal`** - Solara product interest
3. **`ssa_interest_modal`** - SSA product interest
4. **`case_study_requests`** - Case study inquiries
5. **`consultation_requests`** - Consultation bookings
6. **`demo_requests`** - Demo scheduling
7. **`partner_inquiries`** - Partnership requests

### Database Setup
- **Automatic Creation**: Tables are created via `setup-database` API
- **Supabase Integration**: Uses Supabase service role for table creation
- **Schema Management**: SQL-based schema definition in `database-setup.ts`

## 🚀 Build and Deployment

### Build Process
1. **Dependencies**: `npm install`
2. **Type Checking**: `npm run type-check`
3. **Linting**: `npm run lint`
4. **Build**: `npm run build`
5. **Start**: `npm start`

### Environment Variables
Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key

Optional environment variables:
- `LEADS_EMAIL_TO` - Email for lead notifications
- `DATABASE_URL` - Direct database connection
- `DIRECT_URL` - Direct database connection for migrations

## 📱 PWA Features

### Service Worker
- **Location**: `public/sw.js`
- **Functionality**: Offline support and caching
- **Registration**: Automatic via `PWAClient` component

### Manifest
- **Location**: `src/app/manifest.ts`
- **Features**: App installation, splash screen, theme colors
- **Configuration**: Customizable app metadata

## 🎨 Styling Architecture

### CSS Framework
- **Tailwind CSS**: Utility-first CSS framework
- **Material-UI**: Component library with custom theme
- **Custom CSS**: Component-specific styles when needed

### Design System
- **Glass Morphism**: Consistent glass effect across components
- **Color Palette**: Brand colors with semantic naming
- **Typography**: Custom font stack with consistent sizing
- **Spacing**: Tailwind-based spacing scale

### Responsive Design
- **Mobile-First**: Design for mobile, enhance for desktop
- **Breakpoints**: Standard Tailwind breakpoints
- **Component Adaptation**: Responsive component variants

## 🔌 API Architecture

### REST Endpoints
- **Lead Capture**: `/api/leads/*` for various lead types
- **Database Management**: `/api/setup-database` and `/api/check-database`
- **Public Access**: All endpoints currently public (no authentication)

### Data Flow
1. **Form Submission**: User fills out form
2. **API Call**: Frontend calls appropriate API endpoint
3. **Validation**: Server validates input data
4. **Database Storage**: Data stored in Supabase
5. **Email Notification**: Team notified of new lead
6. **Response**: Success/error response to user

## 🧪 Testing and Development

### Development Scripts
- **`npm run dev`**: Start development server
- **`npm run setup:database`**: Initialize database tables
- **`npm run type-check`**: TypeScript type checking
- **`npm run lint`**: ESLint code quality check

### Testing Pages
- **`/test`**: General testing page
- **`/test-modals`**: Modal component testing
- **`/test-simple`**: Simple component testing
- **`/waitlist-example`**: Waitlist functionality testing

## 📊 Performance Considerations

### Optimization Strategies
- **Code Splitting**: Automatic via Next.js App Router
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Built-in bundle analyzer
- **Lazy Loading**: Component-level lazy loading

### Monitoring
- **Core Web Vitals**: Built-in performance metrics
- **Bundle Size**: Automatic bundle size tracking
- **Loading Times**: Development and production monitoring

## 🔒 Security

### Current State
- **Public APIs**: All endpoints currently public
- **Input Validation**: Server-side validation on all inputs
- **SQL Injection**: Protected via Supabase parameterized queries
- **XSS Protection**: Next.js built-in XSS protection

### Future Enhancements
- **Authentication**: JWT-based authentication system
- **Rate Limiting**: API rate limiting for production
- **CORS Configuration**: Proper CORS setup for production
- **Input Sanitization**: Enhanced input sanitization

## 📈 Analytics and Tracking

### Current Implementation
- **Basic Tracking**: Page view and interaction tracking
- **Anonymous Data**: No personal information collection
- **Performance Metrics**: Core Web Vitals monitoring

### Future Plans
- **Advanced Analytics**: User behavior tracking
- **Conversion Tracking**: Lead conversion metrics
- **A/B Testing**: Component and page testing
- **Heatmaps**: User interaction heatmaps

## 🚀 Future Roadmap

### Phase 1 (Current)
- ✅ Lead capture system
- ✅ Product showcase
- ✅ Basic PWA functionality
- ✅ Responsive design

### Phase 2 (Planned)
- 🔄 Authentication system
- 🔄 User dashboard
- 🔄 Advanced analytics
- 🔄 Admin panel

### Phase 3 (Future)
- 📋 Learning management system
- 📋 Course creation tools
- 📋 Student progress tracking
- 📋 Advanced reporting

## 📚 Additional Resources

### Documentation
- **Component Library**: `docs/COMPONENT_LIBRARY.md`
- **API Reference**: `docs/API.md`
- **Styling Guide**: `docs/STYLING_GUIDE.md`
- **Environment Setup**: `docs/ENVIRONMENT.md`

### External Resources
- **Next.js Documentation**: https://nextjs.org/docs
- **Supabase Documentation**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Material-UI**: https://mui.com/material-ui/

---

This document is maintained by the development team and should be updated as the project evolves.
