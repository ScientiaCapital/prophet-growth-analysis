# CLAUDE.md - Prophet Growth Analysis Development Guide

## Project Status & Overview

**Prophet Growth Analysis** is an AI-powered financial intelligence platform built with Next.js 15 and TypeScript. The project transforms workforce cost management through predictive analytics and real-time insights.

**Current Status**: Active development
**Framework**: Next.js 15 with App Router
**Language**: TypeScript with strict mode
**AI Integration**: Google Gemini API for chat, ElevenLabs for voice synthesis

## Technology Stack Details

### Core Framework & Runtime
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Full type safety with strict mode
- **Node.js** - Runtime environment

### AI & ML Components
- **@google/generative-ai** - Google Gemini API integration
- **@elevenlabs/elevenlabs-js** - Voice synthesis and audio processing
- **Prophet** - Time series forecasting for workforce costs

### Database & State Management
- **Neon PostgreSQL** - Serverless, auto-scaling database
- **@hookform/resolvers** - Form validation with Zod integration
- **Zod** - Schema validation and type inference

### UI & Components
- **@radix-ui/react-avatar** - Accessible avatar components
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Reusable component library

## Development Workflow

### Initial Setup
```bash
# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local

# Configure environment variables (see Environment Variables section)
# Edit .env.local with your API keys

# Start development server
npm run dev
```

### Development Commands
```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Type checking
npm run type-check

# Lint code
npm run lint
```

### Project Structure
```
prophet-growth-analysis/
├── app/                    # Next.js 15 App Router
│   ├── (dashboard)/       # Route groups
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable React components
├── lib/                   # Utility libraries
│   ├── ai/               # AI service integrations
│   ├── db/               # Database utilities
│   └── utils/            # Helper functions
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## Environment Variables

### Required API Keys
```bash
# Core AI Services
GOOGLE_GEMINI_API_KEY=your-google-gemini-api-key
ELEVENLABS_API_KEY=your-elevenlabs-api-key

# Database Connection
NEON_DATABASE_URL=postgresql://user:password@host:5432/database

# Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-chars
```

### Optional Environment Variables
```bash
# Development
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Feature Flags
NEXT_PUBLIC_ENABLE_VOICE=true
NEXT_PUBLIC_ENABLE_FORECASTING=true
```

## Key Files & Their Purposes

### Core Application Files
- `app/layout.tsx` - Root layout with providers and global styles
- `app/page.tsx` - Main dashboard page
- `app/api/chat/route.ts` - AI chat API endpoint
- `app/api/forecast/route.ts` - Prophet forecasting API

### AI Integration Files
- `lib/ai/gemini-client.ts` - Google Gemini API client
- `lib/ai/elevenlabs-client.ts` - ElevenLabs voice synthesis
- `lib/ai/agent-guardrails.ts` - AI agent accountability system

### Database & Data Layer
- `lib/db/schema.ts` - Database schema definitions
- `lib/db/migrations/` - Database migration files
- `lib/services/forecast-service.ts` - Prophet forecasting service

### Component Architecture
- `components/chat/` - AI chat interface components
- `components/forecast/` - Forecasting visualization
- `components/reports/` - Financial intelligence reports

## Testing Approach

### Current Testing Status
⚠️ **No test suite currently implemented** - Consider adding:

```bash
# Recommended testing setup
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### Manual Testing Checklist
- [ ] AI chat responses with Gemini API
- [ ] Voice synthesis with ElevenLabs
- [ ] Prophet forecasting calculations
- [ ] Database connectivity with Neon PostgreSQL
- [ ] Form validation with Zod schemas
- [ ] Responsive UI across devices

### Testing Strategy Recommendations
1. **Unit Tests**: Components and utility functions
2. **Integration Tests**: API routes and AI service integrations
3. **E2E Tests**: Critical user flows with Playwright

## Deployment Strategy

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod

# Deploy preview deployment
vercel
```

### Environment-Specific Builds
```bash
# Production build with optimizations
npm run build

# Analyze bundle size
npm run analyze
```

### Database Migrations
```bash
# Run database migrations before deployment
npm run db:migrate

# Generate new migration
npm run db:generate
```

## Coding Standards

### TypeScript Conventions
```typescript
// Use strict typing with interfaces
interface EmployeeCost {
  id: string;
  salary: number;
  benefits: number;
  forecast?: number;
}

// Prefer functional components with TypeScript
const CostAnalysis: React.FC<CostAnalysisProps> = ({ data }) => {
  // Component implementation
}
```

### AI Service Patterns
```typescript
// Standardized error handling for AI APIs
class AIService {
  async generateResponse(prompt: string): Promise<AIResponse> {
    try {
      const response = await this.client.generateContent(prompt);
      return this.validateResponse(response);
    } catch (error) {
      throw new AIError('Failed to generate response', error);
    }
  }
}
```

### File Organization
- **Components**: PascalCase, colocated with related files
- **Utilities**: camelCase, grouped by domain
- **Types**: PascalCase, centralized in `types/` directory
- **Constants**: UPPER_SNAKE_CASE, domain-specific files

## Common Tasks & Commands

### Development Tasks
```bash
# Start development with clean build
npm run clean && npm run dev

# Check for TypeScript errors
npm run type-check

# Format code
npm run format

# Lint and fix
npm run lint:fix
```

### Database Operations
```bash
# Generate new migration
npm run db:generate migration_name

# Run migrations
npm run db:migrate

# Reset database (development only)
npm run db:reset
```

### AI Service Testing
```bash
# Test Gemini API connectivity
npm run test:gemini

# Test ElevenLabs voice synthesis
npm run test:voice

# Validate Prophet forecasting
npm run test:forecast
```

## Troubleshooting Tips

### Common Issues & Solutions

**API Key Errors**
```bash
# Verify environment variables are loaded
echo $GOOGLE_GEMINI_API_KEY

# Check .env.local file exists and is in root directory
ls -la .env.local
```

**Database Connection Issues**
```bash
# Test Neon PostgreSQL connection
npm run db:test-connection

# Check migration status
npm run db:status
```

**Build Failures**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**AI Service Timeouts**
- Increase timeout values in AI client configurations
- Check API rate limits for Gemini and ElevenLabs
- Implement retry logic with exponential backoff

### Performance Optimization
- Use Next.js 15 React Compiler when available
- Implement lazy loading for chat history
- Optimize Prophet forecasting with web workers
- Cache frequent AI responses

### Security Considerations
- Validate all AI inputs with Zod schemas
- Implement rate limiting on API routes
- Sanitize user inputs before AI processing
- Use environment variables for all secrets

---

**Last Updated**: Project initialization phase  
**Next Steps**: Refer to `ProjectTasks.md` for implementation roadmap and `ProjectContextEngineering.md` for technical architecture details.