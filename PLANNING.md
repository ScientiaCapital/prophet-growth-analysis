# PLANNING.md - Architecture & Decisions

**Project**: Prophet Growth Analysis (Financial Intelligence Platform)
**Tech Stack**: Next.js 15, Neon PostgreSQL, Google Gemini, ElevenLabs
**Location**: `/Users/tmkipper/Desktop/tk_projects/prophet-growth-analysis`

---

## Critical Rules
- ❌ **NO OpenAI models** - Never use GPT-3.5, GPT-4, or any OpenAI API
- ✅ **Use Google Gemini Flash and Anthropic Claude only**
- ❌ **API keys in .env only**
- ✅ **Test Commands**: `npm run test`, `npm run validate`

---

## Project Vision

### Goal
Build a financial intelligence platform that:
- Analyzes employee cost structures
- Projects workforce growth scenarios
- Provides AI-powered insights (Google Gemini - NOT OpenAI)
- Generates voice reports (ElevenLabs)
- Helps companies optimize headcount planning

### Non-Goals
- ❌ Using OpenAI for any functionality
- ❌ Automated hiring/firing decisions
- ❌ Personal financial advice
- ❌ Tax preparation services

---

## Architecture Decisions

### ADR-001: Next.js 15 with App Router
**Date**: 2025-11-30
**Status**: ACCEPTED

**Context**: Need modern, performant framework for financial dashboard.

**Decision**: Use Next.js 15 with App Router.

**Rationale**:
- Server Components for better performance
- Built-in API routes
- Excellent TypeScript support
- Easy Vercel deployment
- React Server Actions

**Consequences**:
- ✅ Fast page loads
- ✅ Better SEO
- ✅ Type-safe APIs
- ⚠️ Learning curve for App Router

**Implementation**:
```typescript
// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

---

### ADR-002: Neon PostgreSQL for Data Storage
**Date**: 2025-11-30
**Status**: ACCEPTED

**Context**: Need reliable database for financial data.

**Decision**: Use Neon Serverless PostgreSQL.

**Rationale**:
- Serverless scaling
- PostgreSQL compatibility
- DECIMAL type for money (no floating-point errors)
- Excellent Vercel integration
- Automatic backups

**Consequences**:
- ✅ Precise financial calculations
- ✅ No server management
- ✅ Scales automatically
- ⚠️ Connection limits (use pooling)

**Financial Data Types**:
```sql
-- ✅ CORRECT - Use DECIMAL for money
CREATE TABLE employee_costs (
  salary DECIMAL(12,2) NOT NULL,
  benefits DECIMAL(12,2),
  total_cost DECIMAL(12,2)
);

-- ❌ WRONG - Never use FLOAT for money
CREATE TABLE bad_example (
  salary FLOAT  -- NO! Floating-point errors
);
```

---

### ADR-003: NO OpenAI - Google Gemini Flash Only
**Date**: 2025-11-30
**Status**: ACCEPTED (MANDATORY)

**Context**: Need AI for financial analysis insights.

**Decision**: **NEVER** use OpenAI. Use Google Gemini Flash exclusively.

**Rationale**:
- Gemini Flash: Fast, cost-effective (vs Gemini Pro)
- Claude: For complex reasoning (when needed)
- OpenAI: Banned per project requirements
- Gemini API: Better for structured financial analysis

**Consequences**:
- ✅ Fast AI responses (Gemini Flash)
- ✅ Lower costs vs GPT-4
- ✅ No OpenAI dependency
- ⚠️ Must validate Gemini output (no hallucinations)

**Forbidden Patterns**:
```typescript
// ❌ NEVER DO THIS
import OpenAI from 'openai';
const openai = new OpenAI();

// ❌ NEVER DO THIS
process.env.OPENAI_API_KEY

// ✅ ALWAYS DO THIS
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
```

---

### ADR-004: ElevenLabs for Voice Reports
**Date**: 2025-11-30
**Status**: ACCEPTED

**Context**: Need voice generation for financial reports.

**Decision**: Use ElevenLabs API for text-to-speech.

**Rationale**:
- High-quality voices
- Professional tone for financial reports
- Reasonable pricing
- Good API documentation

**Consequences**:
- ✅ Professional voice reports
- ✅ Multiple voices/accents
- ⚠️ API costs per character
- ⚠️ Audio file storage needed

**Implementation**:
```typescript
import { ElevenLabsClient } from "elevenlabs";

const client = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY
});

export async function generateVoiceReport(text: string) {
  const audio = await client.generate({
    voice: "Rachel",  // Professional female voice
    text: text,
    model_id: "eleven_monolingual_v1"
  });

  return audio;
}
```

---

### ADR-005: DECIMAL for All Financial Values
**Date**: 2025-11-30
**Status**: ACCEPTED (MANDATORY)

**Context**: Floating-point arithmetic causes rounding errors in financial calculations.

**Decision**: Use DECIMAL type in database, avoid FLOAT/NUMBER.

**Rationale**:
- Precise decimal arithmetic
- No 0.1 + 0.2 = 0.30000000000000004 issues
- Industry standard for finance
- PostgreSQL supports DECIMAL natively

**Consequences**:
- ✅ Accurate financial calculations
- ✅ No rounding errors
- ⚠️ Slightly slower than FLOAT (negligible)

**Implementation**:
```typescript
// ✅ CORRECT - Round to cents
export function roundToCents(value: number): number {
  return Math.round(value * 100) / 100;
}

// Calculate with precision
const baseSalary = 100000.00;
const benefits = 20000.00;
const taxRate = 0.15;
const taxes = roundToCents(baseSalary * taxRate);
const totalCost = baseSalary + benefits + taxes; // 135000.00
```

---

### ADR-006: TypeScript for Type Safety
**Date**: 2025-11-30
**Status**: ACCEPTED

**Context**: Financial calculations require type safety.

**Decision**: Use TypeScript for all code.

**Rationale**:
- Catch calculation errors at compile time
- Better IDE support
- Self-documenting code
- Prevents runtime errors

**Consequences**:
- ✅ Fewer bugs
- ✅ Better maintainability
- ⚠️ Slightly slower development initially

**Financial Type Definitions**:
```typescript
export interface EmployeeCost {
  baseSalary: number;
  benefits: number;
  taxes: number;
  totalCost: number;
}

export interface WorkforcePlan {
  currentEmployees: number;
  targetEmployees: number;
  growthRate: number; // 0-1 (e.g., 0.15 = 15%)
  projectedCost: number;
}

export interface FinancialAnalysis {
  totalCost: number;
  costPerEmployee: number;
  burnRate: number; // Monthly
  runway: number; // Months
  insights: string; // From Gemini
}
```

---

### ADR-007: Environment Variables Only
**Date**: 2025-11-30
**Status**: ACCEPTED (MANDATORY)

**Context**: Multiple API keys to manage securely.

**Decision**: ALL API keys in `.env.local` file only.

**Required Variables**:
```bash
# .env.local (NEVER commit this file)

# Database
NEON_DATABASE_URL=postgresql://...

# AI (NO OPENAI_API_KEY)
GEMINI_API_KEY=...

# Voice
ELEVENLABS_API_KEY=...

# Next.js
NEXT_PUBLIC_APP_URL=https://prophet-growth.vercel.app
```

**Forbidden**:
```typescript
// ❌ NEVER hardcode
const apiKey = "gemini-abc-123";

// ✅ ALWAYS use env
const apiKey = process.env.GEMINI_API_KEY;
```

---

### ADR-008: Server-Side Calculations
**Date**: 2025-11-30
**Status**: ACCEPTED

**Context**: Financial calculations must be secure and accurate.

**Decision**: Perform all financial calculations server-side (API routes, Server Components).

**Rationale**:
- Prevent client-side tampering
- Protect calculation logic
- Consistent environment (Node.js)
- Better performance (no client JS)

**Consequences**:
- ✅ Secure calculations
- ✅ Consistent results
- ⚠️ Slightly higher server costs

**Implementation**:
```typescript
// src/app/api/financial/analyze/route.ts
export async function POST(request: NextRequest) {
  // Server-side calculation - secure
  const { employees, avgSalary } = await request.json();
  const totalCost = calculateTeamCost(employees, avgSalary);
  return NextResponse.json({ totalCost });
}
```

---

## System Architecture

### Application Stack
```
┌─────────────────────────────────────────┐
│         Next.js 15 App Router            │
│         - React Server Components        │
│         - API Routes                     │
│         - TypeScript                     │
└──────────────┬──────────────────────────┘
               │
    ┌──────────┴──────────┬──────────────────┬──────────────┐
    │                     │                  │              │
┌───▼────┐      ┌────────▼──────┐  ┌────────▼─────┐  ┌────▼─────┐
│  Neon  │      │  Gemini Flash │  │  ElevenLabs  │  │  Vercel  │
│  PG    │      │  (NO OpenAI)  │  │    (Voice)   │  │  (Host)  │
└────────┘      └───────────────┘  └──────────────┘  └──────────┘
```

### Data Flow
```
1. User Request → Next.js API Route
2. API Route → Validate Input
3. API Route → Calculate (Server-side)
4. API Route → Query Neon Database
5. API Route → Gemini Analysis (NO OpenAI)
6. API Route → Generate Voice (ElevenLabs)
7. API Route → Return Result
```

---

## Database Schema

### Core Tables
```sql
-- Companies
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  industry VARCHAR(100),
  employee_count INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Employee Costs
CREATE TABLE employee_costs (
  id SERIAL PRIMARY KEY,
  company_id UUID REFERENCES companies(id),
  department VARCHAR(100),
  role VARCHAR(100),
  base_salary DECIMAL(12,2) NOT NULL,  -- Use DECIMAL, not FLOAT
  benefits DECIMAL(12,2),
  taxes DECIMAL(12,2),
  total_cost DECIMAL(12,2),
  effective_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Workforce Plans
CREATE TABLE workforce_plans (
  id SERIAL PRIMARY KEY,
  company_id UUID REFERENCES companies(id),
  plan_name VARCHAR(200),
  current_headcount INTEGER,
  target_headcount INTEGER,
  growth_rate DECIMAL(5,4),  -- 0.1525 = 15.25%
  projected_cost DECIMAL(14,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- AI Analyses (track Gemini insights)
CREATE TABLE ai_analyses (
  id SERIAL PRIMARY KEY,
  company_id UUID REFERENCES companies(id),
  analysis_type VARCHAR(50),  -- 'cost_analysis', 'workforce_planning'
  provider VARCHAR(50) DEFAULT 'google-gemini',  -- NOT 'openai'
  prompt_used TEXT,
  insights TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_employee_costs_company ON employee_costs(company_id);
CREATE INDEX idx_workforce_plans_company ON workforce_plans(company_id);
CREATE INDEX idx_ai_analyses_company ON ai_analyses(company_id);
```

---

## Performance Targets

| Metric | Target | Monitoring |
|--------|--------|------------|
| API Response Time (p95) | < 1s | Vercel Analytics |
| Database Query Time | < 200ms | Neon Monitoring |
| Gemini API Call | < 3s | Custom logs |
| Page Load Time | < 2s | Web Vitals |
| Test Coverage | > 80% | Jest/Vitest |

---

## Testing Strategy

### Test Pyramid
```
      /\
     /E2E\       <- 10% (Playwright)
    /------\
   /  API   \    <- 30% (Integration)
  /----------\
 /    Unit    \  <- 60% (Jest/Vitest)
/--------------\
```

### Financial Calculation Tests
```typescript
describe('Financial Calculations', () => {
  test('matches Excel spreadsheet', () => {
    // Known value from CFO's spreadsheet
    const result = calculateEmployeeCost({
      baseSalary: 100000,
      benefits: 20000,
      taxRate: 0.15
    });

    expect(result).toBe(135000);
  });
});
```

---

## Security Considerations

### API Key Management
- All keys in `.env.local`
- Never commit .env files
- Rotate keys quarterly
- NO OPENAI_API_KEY anywhere

### Data Privacy
- No PII in Gemini prompts
- Encrypt sensitive financial data
- GDPR compliance
- Audit logs for all analyses

### Input Validation
```typescript
export function validateFinancialInput(data: any) {
  if (data.salary < 0) throw new Error('Salary must be positive');
  if (data.employees < 1) throw new Error('Must have at least 1 employee');
  if (data.taxRate < 0 || data.taxRate > 1) {
    throw new Error('Tax rate must be 0-1');
  }
}
```

---

## Monitoring & Alerts

### Key Metrics
- API response times
- Database query performance
- Gemini API usage/costs
- Error rates
- **OpenAI usage detection (should be ZERO)**

### Alerts
```yaml
critical:
  - openai_api_key_found: true
  - openai_import_detected: true
  - financial_calculation_error: true
  - gemini_api_failure_rate > 10%

warning:
  - api_response_time > 2s
  - gemini_quota_usage > 80%
  - test_coverage < 80%
```

---

## Future Enhancements

### Roadmap
1. **Phase 1** (Current): Employee cost analysis
2. **Phase 2**: Multi-year forecasting
3. **Phase 3**: Industry benchmarking
4. **Phase 4**: Scenario planning
5. **Phase 5**: Revenue intelligence

### Technologies to Consider
- **Charts**: Recharts for visualizations
- **PDF Reports**: react-pdf
- **Caching**: Redis for expensive calculations
- **ML**: Prophet (Facebook) for forecasting (NOT OpenAI)

### What We'll NEVER Add
- ❌ OpenAI models
- ❌ Automated trading
- ❌ Personal tax advice
- ❌ Hiring/firing recommendations

---

## References

### Documentation
- Next.js 15: https://nextjs.org/docs
- Neon PostgreSQL: https://neon.tech/docs
- Google Gemini: https://ai.google.dev/docs
- ElevenLabs: https://elevenlabs.io/docs

### Financial Formulas
- Employee Cost Analysis: CFO best practices
- Workforce Planning: HR industry standards

**Last Updated**: 2025-11-30
**Next Review**: 2025-12-30

**Remember**: NO OpenAI. Google Gemini Flash only. Financial accuracy is paramount.
