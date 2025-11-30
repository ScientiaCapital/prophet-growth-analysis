# Execute PRP (6-Phase Execution Protocol)

**CRITICAL RULE**: NO OpenAI models - Use Google Gemini Flash and Anthropic Claude only

## Project: Prophet Growth Analysis (Financial Intelligence Platform)
**Tech Stack**: Next.js 15, Neon PostgreSQL, Google Gemini, ElevenLabs
**Test Commands**: `npm run test`, `npm run validate`
**Location**: `/Users/tmkipper/Desktop/tk_projects/prophet-growth-analysis`

---

## Purpose
Execute a Project Refinement Plan (PRP) using systematic 6-phase approach with financial accuracy validation.

---

## Usage
```bash
/execute-prp [prp-file-name]
```

**Example**:
```bash
/execute-prp PRPs/active/revenue-forecasting-20251130.md
```

---

## 6-Phase Execution Framework

### Phase 1: Setup & Validation (10 minutes)
**Goal**: Prepare environment and verify PRP completeness

#### Tasks
```bash
cd /Users/tmkipper/Desktop/tk_projects/prophet-growth-analysis

# 1. Create feature branch
git checkout -b feature/[prp-name]

# 2. Verify environment
npm install
npm run test
npm run typecheck

# 3. Check database connection
npm run db:test

# 4. Review PRP
cat PRPs/active/[prp-file].md
```

#### Validation Gate
- [ ] PRP document complete
- [ ] Dependencies installed
- [ ] Tests passing on main
- [ ] Database connection verified
- [ ] NO OpenAI keys (GEMINI_API_KEY only)
- [ ] Branch created successfully

**STOP**: If validation fails, fix before proceeding.

---

### Phase 2: Database Migration (15 minutes)
**Goal**: Implement schema changes for financial data

#### Tasks
```bash
# 1. Create migration
npm run migration:create -- add-[feature]

# 2. Write migration SQL
# Edit: migrations/[timestamp]_add_[feature].sql

# 3. Test migration
npm run migrate:up
npm run migrate:down
npm run migrate:up

# 4. Verify schema
npm run db:inspect
```

#### Example Migration
```sql
-- Add employee cost tracking
CREATE TABLE IF NOT EXISTS employee_costs (
  id SERIAL PRIMARY KEY,
  company_id UUID NOT NULL,
  employee_id UUID NOT NULL,
  department VARCHAR(100),
  role VARCHAR(100),
  base_salary DECIMAL(12,2) NOT NULL,
  benefits DECIMAL(12,2),
  taxes DECIMAL(12,2),
  total_cost DECIMAL(12,2),
  effective_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_employee_costs_company
  ON employee_costs(company_id);
```

#### Validation Gate
- [ ] Migration runs successfully
- [ ] No data loss
- [ ] Indexes created
- [ ] Financial columns use DECIMAL (not FLOAT)
- [ ] Schema matches PRP

**STOP**: If migration fails, fix before proceeding.

---

### Phase 3: Core Implementation (30-60 minutes)
**Goal**: Implement financial calculations and logic

#### Tasks
```bash
# 1. Create module
touch src/lib/financial/[feature].ts

# 2. Implement calculations
# NO OpenAI - Use Gemini if AI needed

# 3. Add validation
# Validate all financial inputs

# 4. Add error handling
```

#### Financial Calculation Example
```typescript
// src/lib/financial/employeeCost.ts
/**
 * Calculate total employee cost
 * NO OpenAI - Pure financial calculations
 */

export interface EmployeeCostInput {
  baseSalary: number;
  benefits?: number;
  taxRate: number; // 0.15 = 15%
}

export function calculateEmployeeCost(input: EmployeeCostInput): number {
  const { baseSalary, benefits = 0, taxRate } = input;

  // Validate inputs
  if (baseSalary < 0) throw new Error('Salary must be positive');
  if (taxRate < 0 || taxRate > 1) throw new Error('Tax rate must be 0-1');

  const taxes = baseSalary * taxRate;
  const totalCost = baseSalary + benefits + taxes;

  // Round to 2 decimal places (cents)
  return Math.round(totalCost * 100) / 100;
}

export function calculateTeamCost(employees: EmployeeCostInput[]): number {
  return employees.reduce((sum, emp) => sum + calculateEmployeeCost(emp), 0);
}
```

#### Gemini Integration Example
```typescript
// src/lib/ai/geminiAnalysis.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function analyzeFinancialData(data: any) {
  // NO OpenAI - Use Gemini Flash
  const prompt = `Analyze this financial data and provide insights: ${JSON.stringify(data)}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;

  return {
    provider: 'google-gemini',
    insights: response.text(),
    timestamp: new Date().toISOString()
  };
}
```

#### Validation Gate
- [ ] Code compiles without errors
- [ ] Linting passes: `npm run lint`
- [ ] Type checking passes: `npm run typecheck`
- [ ] Functions documented
- [ ] NO OpenAI imports

**STOP**: If implementation has errors, fix before testing.

---

### Phase 4: Testing (20-30 minutes)
**Goal**: Verify calculation accuracy and integration

#### Tasks
```bash
# 1. Write unit tests
touch src/__tests__/financial/[feature].test.ts

# 2. Write integration tests
touch src/__tests__/integration/[feature].test.ts

# 3. Run tests
npm run test

# 4. Check coverage
npm run test -- --coverage
```

#### Unit Test Example
```typescript
// src/__tests__/financial/employeeCost.test.ts
import { calculateEmployeeCost, calculateTeamCost } from '@/lib/financial/employeeCost';

describe('Employee Cost Calculations', () => {
  test('calculates basic employee cost correctly', () => {
    const cost = calculateEmployeeCost({
      baseSalary: 100000,
      benefits: 20000,
      taxRate: 0.15
    });

    // 100000 + 20000 + (100000 * 0.15) = 135000
    expect(cost).toBe(135000);
  });

  test('handles zero benefits', () => {
    const cost = calculateEmployeeCost({
      baseSalary: 80000,
      taxRate: 0.15
    });

    expect(cost).toBe(92000); // 80000 + 0 + 12000
  });

  test('throws on negative salary', () => {
    expect(() => {
      calculateEmployeeCost({
        baseSalary: -50000,
        taxRate: 0.15
      });
    }).toThrow('Salary must be positive');
  });

  test('calculates team cost correctly', () => {
    const team = [
      { baseSalary: 100000, taxRate: 0.15 },
      { baseSalary: 80000, taxRate: 0.15 }
    ];

    const totalCost = calculateTeamCost(team);
    expect(totalCost).toBe(207000); // 115000 + 92000
  });
});
```

#### Gemini Integration Test
```typescript
describe('Gemini AI Analysis', () => {
  test('uses Gemini (NOT OpenAI)', async () => {
    const analysis = await analyzeFinancialData({
      employees: 50,
      avgSalary: 100000
    });

    expect(analysis.provider).toBe('google-gemini');
    expect(analysis.insights).toBeDefined();
    expect(analysis.insights.length).toBeGreaterThan(0);
  });
});
```

#### Validation Gate
- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] Test coverage > 80%
- [ ] Financial calculations validated against spreadsheets
- [ ] Gemini integration uses Google (NO OpenAI)

**STOP**: If tests fail, debug before proceeding.

---

### Phase 5: API Integration (15-20 minutes)
**Goal**: Expose functionality via Next.js API routes

#### Tasks
```bash
# 1. Create API route
touch src/app/api/financial/[feature]/route.ts

# 2. Add validation
# 3. Document API
# 4. Test endpoints
npm run test:api
```

#### API Route Example
```typescript
// src/app/api/financial/analyze/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { calculateTeamCost } from '@/lib/financial/employeeCost';
import { analyzeFinancialData } from '@/lib/ai/geminiAnalysis';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { employees, avgSalary } = body;

    // Validate inputs
    if (!employees || !avgSalary) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate costs
    const teamCost = calculateTeamCost(
      Array(employees).fill({ baseSalary: avgSalary, taxRate: 0.15 })
    );

    // Get AI insights (Gemini, NOT OpenAI)
    const insights = await analyzeFinancialData({
      employees,
      avgSalary,
      totalCost: teamCost
    });

    return NextResponse.json({
      success: true,
      data: {
        employees,
        avgSalary,
        totalCost: teamCost,
        costPerEmployee: teamCost / employees,
        insights: insights.insights
      }
    });
  } catch (error) {
    console.error('Financial analysis error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

#### Validation Gate
- [ ] API endpoints respond correctly
- [ ] Error handling comprehensive
- [ ] Response times < 1s
- [ ] Uses Gemini (NO OpenAI)
- [ ] Documentation updated

**STOP**: If API tests fail, fix before validation.

---

### Phase 6: Pre-Merge Validation (15-20 minutes)
**Goal**: Final checks before merging

#### Tasks
```bash
# 1. Run full validation
/validate

# 2. Check for OpenAI usage
grep -r "openai" src/
grep -r "OPENAI_API_KEY" .

# 3. Performance check
npm run benchmark

# 4. Security audit
npm audit

# 5. Build test
npm run build
```

#### Final Checklist
- [ ] All tests pass (`npm run test`)
- [ ] Type checking clean (`npm run typecheck`)
- [ ] Linting clean (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] NO OpenAI usage anywhere
- [ ] Gemini integration validated
- [ ] Documentation updated
- [ ] TASK.md updated
- [ ] PLANNING.md updated

#### Validation Gate
- [ ] All automated tests pass
- [ ] Manual testing successful
- [ ] NO OpenAI detected
- [ ] Financial calculations accurate
- [ ] Performance benchmarks met

**STOP**: If validation fails, fix before merge.

---

## Merge & Deploy

### Merge to Main
```bash
# 1. Final test
npm run test -- --coverage

# 2. Commit
git add .
git commit -m "feat: [feature] - [description]

- Implemented [financial feature]
- Uses Google Gemini Flash (NO OpenAI)
- Added comprehensive tests
- Validated against spreadsheets"

# 3. Push and create PR
git push origin feature/[prp-name]

# 4. After approval, merge
git checkout main
git pull origin main
git merge feature/[prp-name]
git push origin main
```

### Deploy to Vercel
```bash
# Automatic deployment via GitHub

# Or manual:
vercel --prod
```

### Post-Deploy Validation
```bash
# Health check
curl https://prophet-growth.vercel.app/api/health

# Test financial analysis
curl -X POST https://prophet-growth.vercel.app/api/financial/analyze \
  -H "Content-Type: application/json" \
  -d '{"employees":50,"avgSalary":100000}'
```

---

## Cleanup

### Move PRP
```bash
mv PRPs/active/[prp-file].md PRPs/completed/
```

### Update Files
```bash
# Update TASK.md - mark complete
# Update PLANNING.md - document decisions
# Archive branch
git branch -d feature/[prp-name]
```

---

## Emergency Rollback

### If OpenAI Detected
1. STOP immediately
2. Remove OpenAI code
3. Replace with Gemini
4. Validate thoroughly
5. Redeploy

### If Calculations Wrong
1. Revert deployment
2. Fix formulas
3. Test against spreadsheets
4. Validate thoroughly
5. Redeploy

---

## Success Criteria
- [ ] All 6 phases completed
- [ ] Zero test failures
- [ ] NO OpenAI usage
- [ ] Gemini integration working
- [ ] Financial accuracy validated
- [ ] Documentation updated
- [ ] Successfully deployed

**Remember**: Google Gemini only. Financial accuracy critical. NO OpenAI ever.
