# Smartslate

Modern Next.js application for Smartslate's learning platform with lead capture, product showcase, and marketing pages.

## Features

- **Next.js 14** with App Router and TypeScript
- **Supabase Integration** for database and authentication
- **Lead Capture System** for various business inquiries
- **Product Showcase** with interactive modals and forms
- **Responsive Design** with Tailwind CSS and Material-UI
- **PWA Ready** with service worker and manifest
- **SEO Optimized** with metadata and structured data

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Material-UI
- **Database**: Supabase Postgres
- **Authentication**: Supabase Auth
- **State Management**: React hooks and context
- **Animations**: Framer Motion
- **Deployment**: Vercel-ready

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes for lead capture
│   ├── difference/        # Difference page
│   ├── partner/           # Partner page
│   ├── products/          # Products showcase
│   └── legal/             # Privacy and terms pages
├── components/            # React components
│   ├── landing/           # Landing page components
│   ├── products/          # Product-related components
│   ├── difference/        # Difference page components
│   ├── layout/            # Header, footer, navigation
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configurations
│   ├── config/            # Product configurations
│   ├── data/              # Static data and types
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Helper functions
└── public/                # Static assets
```

## Environment Setup

Create a `.env.local` file with the following variables:

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

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Supabase credentials

3. **Set up database tables**
   ```bash
   npm run setup:database
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run setup:database` - Set up database tables

## API Endpoints

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

## Database Schema

The application uses the following main tables:

- `waitlist_leads` - Course waitlist submissions
- `solara_interest_modal` - Solara product interest
- `ssa_interest_modal` - SSA product interest
- `case_study_requests` - Case study inquiries
- `consultation_requests` - Consultation bookings
- `demo_requests` - Demo scheduling
- `partner_inquiries` - Partnership requests

## Components

### Landing Page
- Hero section with animated content
- Talent paradox explanation
- Case study showcase
- ROI calculator
- Partner testimonials

### Products
- Interactive product showcase
- Interest capture modals
- Product filtering and search
- Detailed product information

### Difference Page
- Company comparison
- Impact metrics
- Key differentiators
- Transformation journey

## Styling and Design

- **Tailwind CSS** for utility-first styling
- **Material-UI** for component library
- **Custom CSS** for specific animations and effects
- **Responsive design** for all device sizes
- **Dark/light theme** support

## Performance

- **Image optimization** with Next.js Image component
- **Code splitting** with dynamic imports
- **Lazy loading** for components and images
- **Service worker** for offline functionality
- **SEO optimization** with metadata and structured data

## Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your hosting platform**
   - Vercel (recommended for Next.js)
   - Netlify
   - AWS Amplify
   - Self-hosted

3. **Set environment variables** in your hosting platform

4. **Run database setup** on first deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is proprietary to Smartslate. All rights reserved.

## Support

For support and questions, contact the development team or refer to the documentation in the `docs/` folder.
