# prophet-growth-analysis

**Branch**: main | **Updated**: 2025-11-30

## Status
AI-powered financial intelligence platform built with Next.js 15 and TypeScript. Transforms workforce cost management through predictive analytics and real-time insights using Google Gemini API for chat and ElevenLabs for voice synthesis.

## Today's Focus
1. [ ] Add test suite (currently no tests implemented)
2. [ ] Test AI chat responses with Gemini API
3. [ ] Test voice synthesis with ElevenLabs
4. [ ] Verify database connectivity with Neon PostgreSQL

## Done (This Session)
- (none yet)

## Critical Rules
- **NO OpenAI models** - Use Google Gemini, ElevenLabs via OpenRouter
- API keys in `.env` only, never hardcoded
- Use strict TypeScript mode
- Implement graceful fallback when voice APIs unavailable

## Blockers
- No test suite currently implemented (needs Jest + React Testing Library)

## Quick Commands
```bash
# Setup
npm install
cp .env.local.example .env.local  # Add API keys

# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Start production server

# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Database (if using Prisma)
npx prisma generate
npx prisma db push
npx prisma studio
```

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Database**: Neon PostgreSQL (serverless)
- **AI**: Google Gemini API, ElevenLabs (voice)
- **Forecasting**: Prophet (time series)
- **UI**: Tailwind CSS, Shadcn/ui, Radix UI
- **Validation**: Zod schemas, @hookform/resolvers
- **Testing**: None yet (recommended: Jest + React Testing Library + Playwright)
