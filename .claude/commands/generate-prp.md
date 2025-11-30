# Generate PRP (Project Refinement Plan)

**CRITICAL RULE**: NO OpenAI models - Use Google Gemini Flash and Anthropic Claude only

## Project: Prophet Growth Analysis (Financial Intelligence Platform)
**Tech Stack**: Next.js 15, Neon PostgreSQL, Google Gemini, ElevenLabs
**Test Commands**: `npm run test`, `npm run validate`
**Location**: `/Users/tmkipper/Desktop/tk_projects/prophet-growth-analysis`

---

## Purpose
Generate comprehensive Project Refinement Plan (PRP) for financial intelligence features, workforce analytics, or AI-powered insights.

---

## Usage
```bash
/generate-prp [feature-name]
```

**Examples**:
- `/generate-prp revenue-forecasting`
- `/generate-prp workforce-optimization`
- `/generate-prp gemini-scenario-planning`
- `/generate-prp elevenlabs-financial-reports`

---

## PRP Generation Process

### Step 1: Feature Analysis (5 minutes)
Ask clarifying questions:
- What financial analysis is being added?
- What workforce planning capability?
- What AI model will be used? (Gemini Flash - NOT OpenAI)
- What are the accuracy requirements?
- What database schema changes are needed?

### Step 2: Financial Logic Design (10 minutes)
Document:
- Financial formulas required
- Calculation methods
- Data sources needed
- Assumptions and constraints
- Validation methodology

### Step 3: Technical Specification (10 minutes)
Define:
- **API Routes**: Next.js App Router endpoints
- **Database Schema**: Neon PostgreSQL tables
- **AI Integration**: Google Gemini Flash prompts
- **Testing Strategy**: Financial accuracy tests
- **Validation**: How to verify correctness

### Step 4: Implementation Breakdown (15 minutes)
Create tasks:
1. Database schema updates
2. Financial calculation functions
3. Gemini AI integration
4. API endpoint implementation
5. Unit tests for calculations
6. Integration tests
7. Documentation updates

### Step 5: Risk Assessment (5 minutes)
Identify risks:
- Calculation accuracy issues
- Gemini API rate limits
- Database performance
- Data privacy concerns
- OpenAI usage creeping in

### Step 6: Generate PRP Document (5 minutes)
Create file at: `PRPs/active/[feature-name]-[YYYYMMDD].md`

Use template from: `PRPs/templates/prp_base.md`

---

## PRP Template Structure

```markdown
# PRP: [Feature Name]

## Critical Rules
- NO OpenAI models
- Use Google Gemini Flash
- API keys in .env only

## Feature Overview
**Goal**: [What this feature accomplishes]
**Priority**: [High/Medium/Low]
**Estimated Effort**: [Hours/Days]

## Financial Logic Specification
### Formulas
- [Formula 1]: Description
- [Formula 2]: Description

### Assumptions
- [List all assumptions]
- [Financial constraints]

## Technical Design
### Database Changes
- Tables: [New/Modified tables]
- Columns: [Schema changes]

### API Endpoints
- `POST /api/financial/analyze`
- Request/response schemas

### AI Integration
- Model: Google Gemini Flash (NOT OpenAI)
- Prompts: [Prompt templates]
- Validation: [How to verify AI output]

## Testing Strategy
### Unit Tests
- [ ] Test calculation accuracy
- [ ] Test edge cases
- [ ] Test with known datasets

### Integration Tests
- [ ] API endpoint tests
- [ ] Gemini integration tests
- [ ] Database query tests

## Implementation Tasks
1. [ ] Database migration
2. [ ] Calculation functions
3. [ ] Gemini integration
4. [ ] API endpoint
5. [ ] Tests
6. [ ] Documentation

## Validation Criteria
- [ ] Calculations accurate (match spreadsheets)
- [ ] Gemini responses validated
- [ ] NO OpenAI usage
- [ ] Test coverage > 80%
```

---

## After Generation

### Review Checklist
- [ ] Financial formulas verified
- [ ] Gemini integration specified (NO OpenAI)
- [ ] Database schema reviewed
- [ ] Test strategy comprehensive
- [ ] No OpenAI references anywhere

### Next Steps
1. Review PRP with stakeholders
2. Estimate implementation time
3. Execute PRP using `/execute-prp`
4. Track progress in `TASK.md`

---

## Financial Platform Considerations

### Calculation Accuracy
- Always verify against Excel/Google Sheets
- Use established financial formulas
- Handle edge cases (zero division, negative values)
- Proper rounding (2 decimal places for currency)

### Data Requirements
- Employee count and salaries
- Revenue and expenses
- Growth rates
- Historical financial data
- Market benchmarks

### AI Integration (Gemini Flash)
```typescript
// Example Gemini integration
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function analyzeFinancials(data: FinancialData) {
  const prompt = `Analyze this financial data: ${JSON.stringify(data)}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}
```

---

## Examples

### Example 1: Revenue Forecasting
```markdown
# PRP: Revenue Forecasting with Gemini

## Financial Logic
### Formula
```
Projected Revenue = Current Revenue × (1 + Growth Rate) ^ Years
```

### Gemini Integration
- Model: Gemini Flash (NO OpenAI)
- Prompt: "Analyze revenue trends and project growth for next 3 years"
- Validation: Compare against linear regression
```

### Example 2: Employee Cost Analysis
```markdown
# PRP: Employee Cost Structure Analysis

## Database Schema
```sql
CREATE TABLE employee_costs (
  id SERIAL PRIMARY KEY,
  department VARCHAR(100),
  role VARCHAR(100),
  salary DECIMAL(10,2),
  benefits DECIMAL(10,2),
  total_cost DECIMAL(10,2)
);
```

## Calculation
```typescript
const totalEmployeeCost = salary + benefits + (salary * 0.15); // Taxes
```
```

---

## Forbidden Patterns
- ❌ Using OpenAI for financial analysis
- ❌ Hardcoding financial formulas (use config)
- ❌ Unvalidated calculations
- ❌ Storing PII in logs
- ❌ Using GPT models instead of Gemini

---

## Success Metrics
- PRP created in < 45 minutes
- Financial formulas documented
- Gemini integration specified (NO OpenAI)
- Test strategy comprehensive
- Accuracy validation planned

**Remember**: Google Gemini Flash only. Financial accuracy critical. NO OpenAI.
