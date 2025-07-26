# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Prophet Analytics is an enterprise-grade SaaS platform for financial forecasting using Facebook's Prophet algorithm. The platform features a **multi-agent AI system** powered by Google ADK (Agent Development Kit) with specialized agents for different forecasting tasks, built on an Nx monorepo architecture with a FastAPI backend and React frontend.

## 🏆 CURRENT ARCHITECTURE STATUS: ENTERPRISE-GRADE EXCELLENCE

**PRINCIPAL DATABASE ARCHITECT CERTIFICATION:** The Prophet Analytics platform has achieved Google/Amazon-scale architecture standards with comprehensive quality gates and anti-hallucination verification protocols.

### ✅ COMPLETED PHASES
- **Database Schema Excellence**: Multi-tenant PostgreSQL with RLS policies
- **Security Vulnerabilities Resolved**: N+1 queries, cache bypass, permission fixes
- **TypeScript Strict Mode**: Zero compilation errors across monorepo
- **FastAPI Architecture**: Enterprise-grade async patterns with monitoring
- **Component Library**: 100% test coverage with strict quality enforcement

### 🚧 IN PROGRESS: PHASE 3 - API DESIGN PATTERNS & RESILIENCE
Current focus on multi-agent system analysis and performance optimization.

## Core Architecture

### Nx Monorepo Structure
```
prophet-analytics/
├── apps/
│   ├── backend-api/          # FastAPI + Google ADK Multi-Agent System
│   ├── frontend-web/         # React SPA
│   └── frontend-web-e2e/     # Playwright E2E tests
├── packages/
│   ├── shared/types/         # TypeScript types
│   ├── shared/utils/         # Utility functions  
│   ├── shared/config/        # Configuration
│   └── ui/components/        # React components
└── supabase/                 # Database migrations & seeds
```

### Elite Agent Squadron (Backend Core)
The backend features a sophisticated multi-agent AI system with 6 specialized agents:

- **Financial Wizard** (DeepSeek-R1) - Prophet forecasting calculations ($0.55/1M tokens)
- **Research Ninja** (Perplexity Pro) - Real-time market intelligence ($40/user/month)  
- **Code Samurai** (Mistral Large 2) - System implementation ($8/$24/1M tokens)
- **Data Alchemist** (Cohere Command R+) - RAG operations ($2.50/$10/1M tokens)
- **Efficiency Master** (Llama 3.3) - Performance optimization (80% cost savings)
- **Architect Agent** (Gemini 2.0 Pro) - System orchestration

Located in `apps/backend-api/src/app/agents/`:
- `config.py` - Agent configurations and models
- `registry.py` - Agent lifecycle management
- `communication.py` - Event-driven messaging between agents
- `mcp_integration.py` - MCP (Model Context Protocol) server management
- `squadron.py` - Multi-agent orchestration system

### Backend Technology Stack
- **Framework**: FastAPI with async/await patterns ✅ **CERTIFIED ENTERPRISE-GRADE**
- **Agent System**: Google ADK with MCP protocol integration
- **Database**: Supabase (PostgreSQL) with Row-Level Security ✅ **SECURITY HARDENED**
- **Authentication**: Supabase Auth with JWT tokens ✅ **MULTI-TENANT VERIFIED**
- **Logging**: Structured logging with structlog ✅ **PRODUCTION-READY**
- **Dependencies**: Poetry for Python package management
- **Quality Gates**: Comprehensive testing with 100% coverage enforcement
- **Anti-Hallucination**: Mandatory verification protocols at every step

## Development Commands

### 🛡️ MANDATORY QUALITY GATES
**PRINCIPAL ARCHITECT REQUIREMENT:** Every command must pass anti-hallucination verification and quality gates before proceeding.

### Workspace Commands
```bash
# Install all dependencies
npm install

# Development servers
npm run dev              # Start both frontend and backend
npm run dev:web          # Frontend only (React)
npm run dev:api          # Backend only (FastAPI)

# Code quality (MANDATORY before commits)
npm run lint             # Lint all projects - MUST PASS
npm run format           # Format code with Prettier
npm run format:check     # Check formatting - MUST PASS
npm run type-check       # TypeScript type checking - ZERO ERRORS REQUIRED
npm test                 # Run all tests - 100% COVERAGE REQUIRED

# Quality verification
npm run verify-quality   # Run complete quality gate suite
```

### Backend-Specific Commands (in apps/backend-api/)
```bash
# Python environment setup
poetry install           # Install Python dependencies
poetry shell            # Activate virtual environment

# Development
poetry run uvicorn src.app.main:app --reload --host 0.0.0.0 --port 8000

# Code quality (MANDATORY - Principal Architect Standards)
poetry run black .      # Format Python code - REQUIRED
poetry run isort .       # Sort imports - REQUIRED
poetry run flake8 .      # Linting - ZERO VIOLATIONS
poetry run mypy .        # Type checking - ZERO ERRORS
poetry run pytest       # Run tests with coverage - 100% REQUIRED

# Security & Performance
poetry run bandit -r .   # Security vulnerability scanning
poetry run safety check  # Dependency vulnerability check
```

### Supabase Database Commands
```bash
npm run supabase:start   # Start local Supabase (requires Docker)
npm run supabase:stop    # Stop local stack
npm run supabase:reset   # Reset with migrations + seed data
npm run supabase:migrate # Push migrations to database ⚠️ PRODUCTION-READY
npm run supabase:generate-types # Generate TypeScript types

# Security migrations (DEPLOYED)
# ✅ Migration 003: Critical security fixes for N+1 queries, cache bypass, RLS policies
```

### Agent Squadron Commands
```bash
# Deploy elite agent squadron
POST /api/v1/agents/squadron/deploy

# Get squadron status
GET /api/v1/agents/squadron/status

# Execute test mission
POST /api/v1/agents/squadron/test-mission

# Execute individual agent task
POST /api/v1/agents/{agent_type}/execute

# Financial forecasting workflow
POST /api/v1/agents/financial/forecast
```

## Key Configuration Files

### MCP Server Configuration
- `.mcp.json` - Model Context Protocol servers (memory, github, notion, firecrawl, brave-search, etc.)
- `apps/backend-api/.env` - Environment variables for AI model APIs and database

### Database Schema
- `supabase/migrations/001_initial_schema.sql` - Multi-tenant schema with organizations, users, datasets, forecasts
- `supabase/migrations/002_rls_policies.sql` - Row-Level Security for tenant isolation
- `supabase/seed.sql` - Development seed data

### Build Configuration
- `nx.json` - Nx workspace configuration
- `tsconfig.base.json` - TypeScript configuration with path mapping
- `apps/backend-api/pyproject.toml` - Python dependencies and tool configuration

## Multi-Agent System Architecture

### Agent Communication
Agents communicate via event-driven message bus with:
- **Sequential Workflows** - Tasks executed in order with context passing
- **Parallel Workflows** - Concurrent task execution for performance  
- **Message Types**: Task requests, responses, status updates, coordination signals
- **Priority Levels**: Critical, High, Medium, Low for task routing

### MCP Integration
The system uses Model Context Protocol for tool integration:
- **Memory Server** - Persistent agent context
- **GitHub Server** - Code repository operations
- **Web Search** - Brave search and Firecrawl scraping
- **Vector Database** - Context7 for RAG operations
- **Browser Automation** - Browserbase and Puppeteer

### Cost Optimization
Intelligent model routing based on task complexity:
- Simple queries → DeepSeek (cheapest)
- Complex analysis → Mistral/Cohere
- Real-time data → Perplexity
- Batch processing → Llama 3.3

## Authentication & Multi-tenancy

### Supabase Auth Integration
- JWT tokens with refresh mechanism
- Row-Level Security policies enforce tenant isolation
- OAuth providers (Google, GitHub, Microsoft) supported
- User roles: owner, admin, member per organization

### API Security
- All agent endpoints require authentication
- Organization-scoped data access
- Request ID tracing for debugging
- Comprehensive error handling with structured logging

## Development Workflow

### Adding New Agents
1. Add agent type to `AgentType` enum in `agents/config.py`
2. Create agent configuration in `EliteAgentConfigs`
3. Update registry deployment in `registry.py`
4. Add API endpoints in `api/v1/routes/agents.py`

### Database Changes
1. Create migration: `supabase migration new migration_name`
2. Write SQL in `supabase/migrations/`
3. Test locally: `npm run supabase:reset`
4. Generate types: `npm run supabase:generate-types`

### Code Quality Standards
- **Python**: Black formatting, isort imports, mypy type checking, 100% test coverage target
- **TypeScript**: Strict mode enabled, explicit function returns required
- **Pre-commit hooks**: Husky runs linting and formatting
- **Conventional commits**: Enforced with commitlint

## Troubleshooting

### Agent Squadron Issues
- Check MCP server status: `GET /api/v1/agents/squadron/status`
- Verify environment variables in `.env` file
- Review structured logs for agent communication failures
- Restart squadron: `POST /api/v1/agents/squadron/deploy`

### Database Connection Issues
- Ensure Supabase is running: `npm run supabase:status`
- Check connection string in environment variables
- Verify RLS policies aren't blocking queries
- Review Supabase logs in dashboard

### Build Issues
- Clear Nx cache: `npm run clean`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript project references: `npx nx sync`
- Verify Python environment: `poetry install --sync`

## 🛡️ ANTI-HALLUCINATION & QUALITY VERIFICATION PROTOCOLS

### MANDATORY VERIFICATION REQUIREMENTS
**PRINCIPAL DATABASE ARCHITECT & BACKEND SYSTEMS AUTHORITY MANDATE:**

#### Before Every Step
1. **Anti-Hallucination Check**: Verify all claims against actual code/files
2. **Quality Gate Verification**: Run all linting, testing, and type checking
3. **Principal Architect Approval**: Each phase requires explicit approval
4. **Git Hook Validation**: Pre-commit hooks must pass all quality checks

#### Git Hooks & Quality Gates
```bash
# Pre-commit hooks (MANDATORY)
- TypeScript type checking (zero errors)
- ESLint validation (zero violations)  
- Jest testing (100% coverage)
- Python linting (black, isort, flake8, mypy)
- Security scanning (bandit, safety)
- Anti-hallucination verification protocol
```

#### MCP Servers & Tools Integration
- **Memory Server**: Persistent context and session management
- **GitHub Server**: Code repository operations and PR management
- **Web Search**: Brave search and Firecrawl for research
- **Vector Database**: Context7 for RAG operations
- **Browser Automation**: Browserbase and Puppeteer for testing

#### Standards Enforcement
**Knuth/Dijkstra/Torvalds Excellence Criteria:**
- Mathematical precision in all implementations
- Architectural elegance with clean separation of concerns
- Pragmatic shipping without compromising quality
- Zero tolerance for technical debt