# PRP: [Feature Name]

**Created**: [YYYY-MM-DD]
**Status**: ACTIVE | COMPLETED | ARCHIVED
**Priority**: HIGH | MEDIUM | LOW
**Estimated Effort**: [Hours/Days]

---

## Critical Rules
- ❌ **NO OpenAI models** - Never use GPT-3.5, GPT-4, or any OpenAI API
- ✅ **Use Google Gemini Flash and Anthropic Claude only**
- ❌ **API keys in .env only** - Never hardcoded
- ✅ **Test Commands**: `npm run test`, `npm run validate`

---

## Project Context
**Project**: Prophet Growth Analysis (Financial Intelligence Platform)
**Tech Stack**: Next.js 15, Neon PostgreSQL, Google Gemini, ElevenLabs
**Location**: `/Users/tmkipper/Desktop/tk_projects/prophet-growth-analysis`

---

## 1. Feature Overview

### Goal
[Describe what this financial intelligence feature accomplishes]

### Business Value
[Why is this important? What financial insights does it provide?]

### Success Metrics
- [ ] [Financial accuracy metric]
- [ ] [Performance metric]
- [ ] [User value metric]

### Acceptance Criteria
- [ ] [Calculation accuracy verified]
- [ ] [Gemini AI insights validated]
- [ ] [Performance target met]

---

## 2. Financial Logic Specification

### Formulas
```
[Formula 1]: Description
Example: Total Employee Cost = Salary + Benefits + (Salary × Tax Rate)

[Formula 2]: Description
Example: Cost Per Employee = Total Team Cost / Employee Count

[Formula 3]: Description
Example: Burn Rate = Monthly Expenses / Cash Balance
```

### Assumptions
- [List all financial assumptions]
- [Growth rate assumptions]
- [Tax rate assumptions]
- [Benefits calculation assumptions]

### Edge Cases
- [ ] **Zero Division**: Handle employee count = 0
- [ ] **Negative Values**: Validate inputs > 0
- [ ] **Large Numbers**: Handle billions without overflow
- [ ] **Decimal Precision**: Round to 2 places (cents)
- [ ] **Null Values**: Handle missing data gracefully

---

## 3. Technical Design

### Database Schema Changes

#### New Tables
```sql
CREATE TABLE IF NOT EXISTS [table_name] (
  id SERIAL PRIMARY KEY,
  [column1] DECIMAL(12,2) NOT NULL,  -- Use DECIMAL for money
  [column2] VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_[table]_[column] ON [table]([column]);
```

#### Financial Data Types
- **Money**: Use `DECIMAL(12,2)` (NOT FLOAT)
- **Percentages**: Use `DECIMAL(5,4)` (e.g., 0.1525 = 15.25%)
- **Counts**: Use `INTEGER`
- **Dates**: Use `DATE` or `TIMESTAMP`

### API Endpoints

#### Next.js App Router
```typescript
// src/app/api/financial/[feature]/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Implementation
}
```

#### Request Schema
```typescript
interface AnalysisRequest {
  employees: number;
  avgSalary: number;
  benefits?: number;
  taxRate?: number;
}
```

#### Response Schema
```typescript
interface AnalysisResponse {
  success: boolean;
  data: {
    totalCost: number;
    costPerEmployee: number;
    insights: string; // From Gemini
  };
  meta: {
    timestamp: string;
    provider: 'google-gemini';
  };
}
```

### Core Functions

#### Financial Calculation
```typescript
/**
 * Calculate [financial metric]
 * NO OpenAI - Pure financial calculations
 */
export function calculateMetric(input: Input): number {
  // Validate inputs
  if (input.value < 0) {
    throw new Error('Value must be positive');
  }

  // Calculate
  const result = /* formula */;

  // Round to cents
  return Math.round(result * 100) / 100;
}
```

#### Gemini Integration
```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function analyzeWithGemini(data: any) {
  // NO OpenAI - Use Gemini
  const prompt = `Analyze: ${JSON.stringify(data)}`;
  const result = await model.generateContent(prompt);

  return {
    provider: 'google-gemini',
    insights: result.response.text()
  };
}
```

---

## 4. Testing Strategy

### Unit Tests
```typescript
// src/__tests__/financial/[feature].test.ts
describe('[Feature]', () => {
  test('calculates correctly', () => {
    const result = calculateMetric({ value: 100 });
    expect(result).toBe(expectedValue);
  });

  test('throws on negative input', () => {
    expect(() => calculateMetric({ value: -100 }))
      .toThrow('Value must be positive');
  });

  test('rounds to cents', () => {
    const result = calculateMetric({ value: 100.005 });
    expect(result).toBe(100.01); // Rounded to 2 decimals
  });
});
```

### Gemini Integration Test
```typescript
describe('Gemini AI', () => {
  test('uses Google Gemini (NOT OpenAI)', async () => {
    const analysis = await analyzeWithGemini({ data: 'test' });

    expect(analysis.provider).toBe('google-gemini');
    expect(analysis.insights).toBeDefined();
  });
});
```

### Financial Accuracy Test
```typescript
test('matches Excel spreadsheet calculation', () => {
  // Known values from spreadsheet
  const result = calculateEmployeeCost({
    baseSalary: 100000,
    benefits: 20000,
    taxRate: 0.15
  });

  // Verified in Excel: 100000 + 20000 + 15000 = 135000
  expect(result).toBe(135000);
});
```

### Test Coverage Requirements
- [ ] Unit test coverage > 80%
- [ ] All financial formulas tested
- [ ] Edge cases tested
- [ ] Gemini integration tested (NO OpenAI)
- [ ] Known benchmarks validated

---

## 5. Implementation Tasks

### Phase 1: Setup (10 min)
- [ ] Create feature branch
- [ ] Verify environment (NO OPENAI_API_KEY)
- [ ] Run baseline tests

### Phase 2: Database (15 min)
- [ ] Create migration file
- [ ] Write SQL with DECIMAL types
- [ ] Test migration up/down
- [ ] Verify schema

### Phase 3: Core Logic (30-45 min)
- [ ] Create financial calculation module
- [ ] Implement formulas
- [ ] Add input validation
- [ ] Add error handling
- [ ] Document assumptions

### Phase 4: Gemini Integration (20 min)
- [ ] Create Gemini client (NO OpenAI)
- [ ] Write prompt templates
- [ ] Test AI responses
- [ ] Validate output format

### Phase 5: API (15-20 min)
- [ ] Create Next.js API route
- [ ] Add request validation
- [ ] Add error handling
- [ ] Test endpoints

### Phase 6: Testing (20-30 min)
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Validate against spreadsheets
- [ ] Check coverage (> 80%)

### Phase 7: Validation (15 min)
- [ ] Run `/validate`
- [ ] Check for OpenAI usage
- [ ] Performance benchmarks
- [ ] Documentation update

---

## 6. Validation Criteria

### Functional Validation
- [ ] Calculations match spreadsheets
- [ ] Edge cases handled
- [ ] Error messages descriptive
- [ ] API responses correct

### Financial Accuracy
- [ ] Formulas verified with CFO/accountant
- [ ] Test with known datasets
- [ ] Decimal precision correct (cents)
- [ ] No floating-point errors

### AI Validation
- [ ] Uses Google Gemini (NOT OpenAI)
- [ ] Prompts produce relevant insights
- [ ] Rate limiting configured
- [ ] Error handling robust

### Performance Validation
- [ ] API response < 1s
- [ ] Database queries < 200ms
- [ ] Gemini calls < 3s
- [ ] No memory leaks

---

## 7. Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Incorrect calculations | CRITICAL | MEDIUM | Test against spreadsheets |
| Gemini API limits | HIGH | LOW | Implement rate limiting |
| OpenAI usage creeping in | CRITICAL | LOW | Strict validation checks |
| Poor performance | MEDIUM | LOW | Optimize queries, cache results |
| Data privacy | HIGH | LOW | No PII in logs/AI prompts |

---

## 8. Rollback Plan

### If Deployment Fails
1. Revert on Vercel: `vercel rollback`
2. Revert git commit: `git revert HEAD`
3. Investigate issue
4. Fix and redeploy

### If Calculations Wrong
1. STOP feature immediately
2. Revert to last known good
3. Fix formulas
4. Test against spreadsheets
5. Validate thoroughly before redeploy

---

## 9. Documentation Updates

### Files to Update
- [ ] `README.md` - Feature description
- [ ] `docs/financial-formulas.md` - Document calculations
- [ ] `docs/api.md` - API endpoints
- [ ] `PLANNING.md` - Architectural decisions
- [ ] `TASK.md` - Mark complete

### API Documentation
```markdown
## POST /api/financial/analyze

Calculate employee cost structure and provide AI insights.

**Request**:
```json
{
  "employees": 50,
  "avgSalary": 100000,
  "benefits": 20000,
  "taxRate": 0.15
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "totalCost": 6750000,
    "costPerEmployee": 135000,
    "insights": "Gemini analysis..."
  },
  "meta": {
    "provider": "google-gemini"
  }
}
```
```

---

## 10. Success Criteria

### Definition of Done
- [ ] All tasks completed
- [ ] All tests passing (> 80% coverage)
- [ ] Financial accuracy validated
- [ ] NO OpenAI usage anywhere
- [ ] Gemini integration working
- [ ] Documentation updated
- [ ] Code reviewed
- [ ] Deployed successfully

### Post-Deployment Validation
- [ ] Health check passes
- [ ] API endpoints working
- [ ] Calculations accurate
- [ ] No errors in logs
- [ ] Performance metrics met

---

## 11. Timeline

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| Setup | 10 min | None |
| Database | 15 min | Setup |
| Core Logic | 35 min | Database |
| Gemini Integration | 20 min | Core Logic |
| API | 17 min | All above |
| Testing | 25 min | API |
| Validation | 15 min | Testing |
| **Total** | **~2.5 hours** | |

---

## 12. Notes & Decisions

### Architectural Decisions
- Using Google Gemini Flash (NOT OpenAI) for AI insights
- Using DECIMAL for all financial values
- Next.js 15 App Router for API
- Neon PostgreSQL for data storage

### Open Questions
- [ ] What tax rate to use as default?
- [ ] Should we support multiple currencies?
- [ ] What historical data to store?

### Future Enhancements
- Multi-currency support
- Historical trend analysis
- Advanced forecasting models (NOT OpenAI)

---

## Completion Checklist

- [ ] PRP reviewed and approved
- [ ] All phases executed
- [ ] Tests passing (100%)
- [ ] NO OpenAI usage validated
- [ ] Deployed successfully
- [ ] Documentation updated
- [ ] TASK.md updated
- [ ] PLANNING.md updated
- [ ] PRP moved to `PRPs/completed/`

**Completed Date**: [YYYY-MM-DD]
**Deployment URL**: https://prophet-growth.vercel.app
**Git Commit**: [commit-hash]

---

**Remember**: NO OpenAI. Google Gemini Flash only. Financial accuracy is critical.
