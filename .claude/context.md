```markdown
# Project Context: Prophet Growth Analysis

**Last Updated:** 2025-10-31T13:30:16.424206

## 🎯 Current Sprint & Focus Areas

**Sprint Focus:** Core AI/ML Platform Development
- **Primary:** Prophet time series forecasting implementation
- **Secondary:** AI chat integration with Google Gemini API
- **Tertiary:** Voice synthesis setup with ElevenLabs
- **Infrastructure:** Neon PostgreSQL database configuration

## 🏗 Architecture Overview

- **Language:** JavaScript/TypeScript
- **Framework:** Next.js 15 with App Router
- **Type:** AI/ML Financial Intelligence Platform
- **Database:** Neon PostgreSQL (serverless)
- **Deployment:** Vercel
- **AI Services:** Google Gemini API, ElevenLabs API, Prophet forecasting

## 📋 Project Description

Prophet Growth Analysis is an AI-powered financial intelligence platform that transforms workforce cost management through predictive analytics and intelligent automation. The platform provides real-time insights into employee costs and enables data-driven workforce planning decisions.

The system combines time series forecasting using Prophet with conversational AI through Google Gemini, creating an accessible interface for financial analysis. Voice synthesis via ElevenLabs enhances accessibility, while the agent guardrails system ensures AI reliability and accountability in financial decision-making.

## 📝 Recent Changes

**Initial Project Generation (2025-10-31)**
- Project structure established with Next.js 15 and TypeScript
- Core dependencies configured (Prophet, Gemini API, ElevenLabs)
- Environment template created (.env.local.example)
- Documentation framework initialized

## 🚧 Current Blockers

**None** - Project in initial setup phase. Potential upcoming blockers:
- Prophet.js integration with Next.js server components
- ElevenLabs API rate limiting considerations
- Neon PostgreSQL connection optimization

## ➡️ Next Steps

1. **Database Setup**
   - Configure Neon PostgreSQL connection
   - Set up initial schema for user data and chat history
   - Implement database migrations

2. **Core AI Integration**
   - Implement Google Gemini API client
   - Set up ElevenLabs voice synthesis
   - Create Prophet forecasting service

3. **UI/UX Development**
   - Build chat interface components
   - Create financial dashboard with forecasting visualizations
   - Implement voice interaction controls

4. **Authentication & Security**
   - Set up JWT authentication system
   - Implement API key management
   - Create user session management

5. **Testing & Validation**
   - Set up Zod schema validation
   - Create unit tests for forecasting algorithms
   - Implement integration tests for AI services

## 🔄 Development Workflow

### Environment Setup
```bash
npm install
cp .env.local.example .env.local
# Configure API keys and database URL
npm run dev
```

### Key Scripts
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm test` - Test suite (to be implemented)

### Branch Strategy
- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - Feature development
- `hotfix/*` - Critical fixes

## 📓 Notes

### Technical Considerations
- Prophet.js may require specific date handling for time series data
- Gemini API context windows need optimization for financial conversations
- ElevenLabs voice synthesis should include caching for performance

### Business Context
- Target users: HR managers, financial analysts, executives
- Primary use case: Workforce cost forecasting and optimization
- Compliance: Financial data handling requires secure storage

### AI/ML Specifics
- Prophet forecasting for seasonal workforce patterns
- Gemini for natural language financial analysis
- Voice synthesis for executive reporting accessibility

### Documentation References
- `CLAUDE.md` - Development guidelines
- `ProjectContextEngineering.md` - Technical architecture
- `ProjectTasks.md` - Implementation roadmap
- `README-agent-guardrails.md` - AI accountability system
```