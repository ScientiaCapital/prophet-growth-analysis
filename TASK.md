# TASK.md - Current Work Tracking

**Project**: Prophet Growth Analysis (Financial Intelligence Platform)
**Tech Stack**: Next.js 15, Neon PostgreSQL, Google Gemini, ElevenLabs
**Test Commands**: `npm run test`, `npm run validate`
**Location**: `/Users/tmkipper/Desktop/tk_projects/prophet-growth-analysis`

---

## Critical Rules
- ❌ **NO OpenAI models** - Never use GPT-3.5, GPT-4, or any OpenAI API
- ✅ **Use Google Gemini Flash and Anthropic Claude only**
- ❌ **API keys in .env.local only**
- ✅ Run `npm run test` before every commit

---

## Current Sprint

**Sprint**: Financial Intelligence MVP
**Start Date**: 2025-11-30
**End Date**: 2025-12-15
**Goal**: Launch employee cost analysis and workforce planning platform

---

## Active Tasks

### 🔥 In Progress

#### Task: Employee Cost Analysis Feature
**Priority**: HIGH
**Assigned**: Dev Team
**Started**: 2025-11-30
**Estimated**: 3 hours

**Description**: Build core employee cost analysis calculations and API.

**Subtasks**:
- [ ] Create database schema (DECIMAL types for money)
- [ ] Implement cost calculation functions
- [ ] Add input validation
- [ ] Create API route: `POST /api/financial/analyze`
- [ ] Write unit tests (> 80% coverage)
- [ ] Validate against spreadsheets

**Acceptance Criteria**:
- [ ] Calculations match CFO's Excel formulas
- [ ] Uses DECIMAL (not FLOAT) for money
- [ ] Test coverage > 80%
- [ ] NO OpenAI usage
- [ ] API response time < 1s

**Notes**:
- Use `DECIMAL(12,2)` for all currency values
- Round to cents: `Math.round(value * 100) / 100`
- NO OpenAI - calculations only

---

### 📋 Planned (This Sprint)

#### Task: Google Gemini Integration
**Priority**: HIGH
**Estimated**: 2 hours

**Description**: Integrate Google Gemini Flash for financial insights (NO OpenAI).

**Subtasks**:
- [ ] Set up Gemini API client
- [ ] Create prompt templates for financial analysis
- [ ] Implement insight generation
- [ ] Add rate limiting
- [ ] Validate Gemini responses (no hallucinations)
- [ ] Write integration tests

**Acceptance Criteria**:
- [ ] Uses Gemini Flash (NOT OpenAI)
- [ ] Prompts produce relevant insights
- [ ] Response time < 3s
- [ ] Error handling comprehensive
- [ ] NO OPENAI_API_KEY anywhere

**Critical**:
```typescript
// ✅ CORRECT - Use Gemini
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// ❌ FORBIDDEN - NO OpenAI
import OpenAI from 'openai';  // NEVER DO THIS
```

---

#### Task: Workforce Planning Projections
**Priority**: MEDIUM
**Estimated**: 3 hours

**Description**: Build workforce growth scenario planning.

**Subtasks**:
- [ ] Create workforce planning schema
- [ ] Implement growth projection formulas
- [ ] Add scenario comparison (best/worst/likely)
- [ ] Create API endpoints
- [ ] Write financial accuracy tests
- [ ] Document assumptions

**Acceptance Criteria**:
- [ ] Projections match manual calculations
- [ ] Handles multiple growth scenarios
- [ ] Validates growth rates (0-100%)
- [ ] NO OpenAI usage

**Formulas**:
```typescript
// Projected Headcount
projected = current * (1 + growthRate) ^ years

// Projected Cost
projectedCost = projected * avgCostPerEmployee
```

---

#### Task: ElevenLabs Voice Reports
**Priority**: LOW
**Estimated**: 2 hours

**Description**: Generate voice reports from financial analyses.

**Subtasks**:
- [ ] Set up ElevenLabs API client
- [ ] Create report text templates
- [ ] Implement voice generation
- [ ] Add audio file storage (S3/Vercel Blob)
- [ ] Test voice quality
- [ ] Document usage

**Acceptance Criteria**:
- [ ] Professional voice output
- [ ] Audio generation < 5s
- [ ] Multiple voice options
- [ ] Error handling robust

---

#### Task: Next.js Dashboard UI
**Priority**: MEDIUM
**Estimated**: 4 hours

**Description**: Build user interface for financial analysis.

**Subtasks**:
- [ ] Create dashboard page
- [ ] Add employee cost input form
- [ ] Display calculation results
- [ ] Show Gemini insights
- [ ] Add workforce planning charts
- [ ] Responsive design

**Acceptance Criteria**:
- [ ] Clean, professional UI
- [ ] Real-time calculations
- [ ] Mobile responsive
- [ ] Fast page loads (< 2s)

---

### ⏸️ Blocked

_No blocked tasks currently_

---

## Backlog (Future Sprints)

### High Priority
- [ ] Multi-year financial forecasting
- [ ] Industry benchmarking
- [ ] PDF report generation
- [ ] User authentication (Clerk/NextAuth)

### Medium Priority
- [ ] Historical trend analysis
- [ ] Department-level breakdowns
- [ ] Custom financial metrics
- [ ] Export to Excel/CSV

### Low Priority
- [ ] Multi-currency support
- [ ] Team collaboration features
- [ ] API for third-party integrations
- [ ] Mobile app

---

## Completed Tasks

### ✅ Sprint 0 (Setup)

#### Task: Project Initialization
**Completed**: 2025-11-30

**What Was Done**:
- [x] Created Next.js 15 project
- [x] Set up Neon PostgreSQL database
- [x] Configured TypeScript
- [x] Added `.env.local` template
- [x] Verified NO OPENAI_API_KEY
- [x] Set up testing framework

**Outcome**: Project ready for development

---

#### Task: Context Engineering Files
**Completed**: 2025-11-30

**What Was Done**:
- [x] Created `.claude/commands/validate.md`
- [x] Created `.claude/commands/generate-prp.md`
- [x] Created `.claude/commands/execute-prp.md`
- [x] Created `PRPs/templates/prp_base.md`
- [x] Created `PLANNING.md`
- [x] Created `TASK.md` (this file)

**Outcome**: Development workflow documented

---

## Testing Status

### Test Coverage
| Module | Coverage | Target | Status |
|--------|----------|--------|--------|
| Financial Calculations | 0% | 80% | 🔴 Not Started |
| Gemini Integration | 0% | 80% | 🔴 Not Started |
| API Routes | 0% | 80% | 🔴 Not Started |
| Database Queries | 0% | 80% | 🔴 Not Started |

### Known Test Issues
_None yet - development just starting_

---

## Deployment Status

### Environments
| Environment | Status | URL |
|-------------|--------|-----|
| Production | ⏸️ Not Deployed | TBD |
| Preview | ⏸️ Not Deployed | TBD |
| Development | ✅ Local | localhost:3000 |

### Pre-Deploy Checklist
- [ ] All tests passing (`npm run test`)
- [ ] Type checking clean (`npm run typecheck`)
- [ ] Build succeeds (`npm run build`)
- [ ] Test coverage > 80%
- [ ] NO OpenAI usage validated
- [ ] Environment variables in Vercel
- [ ] Database migrations applied

---

## Daily Standup Notes

### 2025-11-30
**Yesterday**: Project initialization
**Today**: Employee cost analysis + Gemini integration
**Blockers**: None

**Progress**:
- ✅ Created all context engineering files
- ✅ Documented architecture (NO OpenAI)
- 🔄 Starting employee cost calculations

**Risks**:
- Must validate financial formulas with CFO
- Gemini API rate limits need monitoring
- NO OpenAI usage must be strictly enforced

---

## Week in Review

### Week of 2025-11-25
**Goals**:
- [x] Initialize project
- [ ] Complete employee cost analysis
- [ ] Integrate Google Gemini

**Achieved**:
- Project structure created
- Documentation complete
- Ready to build features

**Missed**:
- Cost analysis (moving to this week)
- Gemini integration (this week)

**Next Week Focus**:
- Complete financial calculations
- Integrate Gemini Flash (NO OpenAI)
- Build dashboard UI

---

## Metrics

### Development Velocity
- **Sprint 0**: 6 tasks completed (setup)
- **Sprint 1**: 0 tasks completed (just started)

### Quality Metrics
- **Test Coverage**: 0% (target: 80%)
- **OpenAI Usage**: 0 ✅ (must stay 0)
- **Financial Accuracy**: Not measured yet

---

## Important Reminders

### Before Every Commit
1. Run `npm run test`
2. Run `npm run typecheck`
3. Run `npm run lint`
4. Check for OpenAI: `grep -r "openai" src/`
5. Verify .env.local not committed

### Before Every PR
1. Run `/validate` command
2. Test coverage > 80%
3. NO OpenAI usage validated
4. Financial calculations verified
5. Update TASK.md
6. Update PLANNING.md if needed

### Before Deploy
1. Full validation suite
2. Performance benchmarks
3. Security audit (`npm audit`)
4. Environment variables verified
5. Database migrations tested

---

## Questions & Decisions Needed

### Open Questions
1. What default tax rate to use? (suggest 15%)
2. Should we support contractors vs employees?
3. What time horizon for projections? (1, 3, 5 years?)

### Pending Decisions
- Voice provider: ElevenLabs vs alternatives?
- Chart library: Recharts vs Chart.js?
- Auth provider: Clerk vs NextAuth?

---

## Notes & Ideas

### Ideas for Future
- Prophet (Facebook) for time series forecasting (NOT OpenAI)
- Gemini for scenario generation
- Multi-currency with real-time exchange rates
- Industry-specific cost benchmarks

### Things to Avoid
- ❌ Using OpenAI for ANY functionality
- ❌ Using FLOAT for financial values (use DECIMAL)
- ❌ Hardcoding financial formulas
- ❌ Storing PII in Gemini prompts
- ❌ Unvalidated calculations

---

## OpenAI Usage Detection

### Validation Commands
```bash
# Check for OpenAI imports
grep -r "from 'openai'" src/
grep -r "import.*openai" src/

# Check for OpenAI API keys
grep -r "OPENAI_API_KEY" .

# Check for OpenAI models
grep -r "gpt-3.5\|gpt-4" src/
```

### Expected Result
**ALL commands should return ZERO matches**

If any matches found:
1. STOP development immediately
2. Remove OpenAI code
3. Replace with Gemini
4. Validate again
5. Document in incident log

---

## Quick Reference

### Common Commands
```bash
# Development
npm run dev

# Testing
npm run test
npm run test -- --coverage
npm run test:watch

# Validation
npm run typecheck
npm run lint
npm run validate

# Database
npm run migrate:up
npm run migrate:down
npm run db:inspect

# Build
npm run build

# Deploy
vercel --prod
```

### Key Files
- **Config**: `.env.local` (not committed)
- **Database**: `migrations/`
- **API Routes**: `src/app/api/`
- **Components**: `src/components/`
- **Financial Logic**: `src/lib/financial/`
- **Gemini Integration**: `src/lib/ai/`
- **Tests**: `src/__tests__/`

---

## Financial Calculation Reference

### Employee Cost Formula
```typescript
totalCost = baseSalary + benefits + (baseSalary * taxRate)
```

### Growth Projection Formula
```typescript
projected = current * Math.pow(1 + growthRate, years)
```

### Burn Rate Formula
```typescript
burnRate = monthlyExpenses / cashBalance  // Months remaining
```

---

**Last Updated**: 2025-11-30 13:00 UTC
**Next Review**: 2025-12-01

**Remember**: NO OpenAI EVER. Google Gemini Flash only. Financial accuracy is critical. DECIMAL for money.
