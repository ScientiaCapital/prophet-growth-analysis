# Multi-Phase Validation Protocol

**CRITICAL RULE**: NO OpenAI models - Use Google Gemini Flash and Anthropic Claude only

## Project: Prophet Growth Analysis (Financial Intelligence Platform)
**Tech Stack**: Next.js 15, Neon PostgreSQL, Google Gemini, ElevenLabs
**Test Commands**: `npm run test`, `npm run validate`
**Location**: `/Users/tmkipper/Desktop/tk_projects/prophet-growth-analysis`

---

## Phase 1: Pre-Commit Validation
**When**: Before every git commit
**Duration**: 3-5 minutes

### Required Checks
```bash
# 1. Type checking
npm run typecheck

# 2. Linting
npm run lint

# 3. Unit tests
npm run test

# 4. Build verification
npm run build
```

### Critical Validations
- [ ] No OpenAI API keys (check for OPENAI_API_KEY)
- [ ] No OpenAI imports (use Gemini/Claude only)
- [ ] All financial calculations tested
- [ ] Neon PostgreSQL connection verified
- [ ] Environment variables documented
- [ ] Google Gemini API key in .env only

### Auto-Fix Available
```bash
npm run lint:fix
npm run format
```

---

## Phase 2: Feature Validation
**When**: After implementing a feature
**Duration**: 5-10 minutes

### Functional Tests
```bash
# Run feature-specific tests
npm run test -- --grep "feature-name"

# Integration tests
npm run test:integration

# Database tests
npm run test:db

# Validate financial calculations
npm run test:calculations
```

### Manual Checks
- [ ] Employee cost calculations accurate
- [ ] Workforce planning logic correct
- [ ] Financial projections validated
- [ ] Gemini AI responses appropriate
- [ ] ElevenLabs audio generation working

### Financial Intelligence Validation
- [ ] Cost per employee calculated correctly
- [ ] Growth projections based on valid assumptions
- [ ] Burn rate calculations accurate
- [ ] Runway estimations realistic
- [ ] Headcount planning feasible

---

## Phase 3: Pre-PR Validation
**When**: Before creating pull request
**Duration**: 10-15 minutes

### Comprehensive Tests
```bash
# Full test suite with coverage
npm run test -- --coverage

# Type checking
npm run typecheck

# Performance benchmarks
npm run benchmark

# Security scan
npm audit

# Database migration check
npm run migrate:test
```

### Code Quality
- [ ] Test coverage > 80%
- [ ] No critical/high vulnerabilities
- [ ] All database migrations tested
- [ ] API documentation updated
- [ ] Financial formulas documented

### AI Integration Checks
- [ ] Google Gemini used (NOT OpenAI)
- [ ] Gemini API calls rate-limited
- [ ] AI responses validated
- [ ] No hallucinated financial data

---

## Phase 4: Deployment Validation
**When**: Before production deploy
**Duration**: 15-20 minutes

### Pre-Deploy Checklist
```bash
# Production build
npm run build

# Database migration
npm run migrate:production

# Smoke tests
npm run test:smoke

# Environment check
npm run env:check
```

### Environment Verification
- [ ] NEON_DATABASE_URL configured
- [ ] GEMINI_API_KEY configured
- [ ] ELEVENLABS_API_KEY configured
- [ ] NO OPENAI_API_KEY in environment
- [ ] All dependencies in package.json
- [ ] Next.js 15 optimizations enabled

### Critical Path Testing
1. Health check endpoint
2. Employee cost analysis
3. Workforce planning projections
4. Database query performance
5. Gemini AI integration
6. ElevenLabs audio generation

---

## Phase 5: Post-Deploy Validation
**When**: Immediately after deployment
**Duration**: 10 minutes

### Live Checks
```bash
# Health check
curl https://prophet-growth.vercel.app/api/health

# Test financial analysis endpoint
curl -X POST https://prophet-growth.vercel.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"employees":50,"avgSalary":100000}'
```

### Real System Monitoring
- [ ] Response times < 1s (p95)
- [ ] Error rate < 0.1%
- [ ] Database connections stable
- [ ] No memory leaks
- [ ] Gemini API quota not exceeded

### Rollback Criteria
- Error rate > 1%
- Response time > 3s
- Database connection failures
- Incorrect financial calculations
- Gemini API failures

---

## Phase 6: Monitoring & Alerts
**When**: Continuous
**Setup**: Vercel Analytics + Neon Monitoring

### Key Metrics
- **Latency**: API < 1s, Analysis < 3s
- **Errors**: < 0.1% error rate
- **Database**: Query time < 200ms
- **AI**: Gemini success rate > 99%
- **Audio**: ElevenLabs generation < 5s

### Alert Thresholds
```yaml
critical:
  - openai_usage_detected: true
  - gemini_api_error_rate > 5%
  - financial_calculation_error: true
  - db_connections > 90%

warning:
  - error_rate > 0.5%
  - response_time > 2s
  - gemini_quota_usage > 80%
  - db_connections > 70%
```

### Weekly Review
- [ ] Review financial calculation accuracy
- [ ] Check Gemini API costs
- [ ] Analyze database performance
- [ ] Verify no OpenAI usage

---

## Financial Intelligence Compliance

### Calculation Validation
```bash
# Verify calculations against spreadsheets
npm run test:financial-accuracy

# Test with known datasets
npm run test:known-benchmarks

# Validate formulas
npm run validate:formulas
```

### Data Integrity
- [ ] Employee data validated
- [ ] Salary ranges realistic
- [ ] Growth rates reasonable
- [ ] No division by zero
- [ ] Proper rounding (cents)

### Forbidden Technologies
- ❌ OpenAI models (no GPT-3.5, GPT-4)
- ❌ Hardcoded financial data
- ❌ External financial AI APIs (use Gemini)
- ❌ Unvalidated calculations

---

## Google Gemini Specific Checks

### API Usage Validation
```bash
# Check Gemini API calls
npm run test:gemini-integration

# Validate response schemas
npm run validate:gemini-responses

# Check rate limiting
npm run test:gemini-rate-limits
```

### Gemini Best Practices
- [ ] Using Gemini Flash (cost-effective)
- [ ] Proper prompt engineering
- [ ] Response validation enabled
- [ ] Rate limiting configured
- [ ] Error handling comprehensive

### Example Gemini Test
```typescript
test('Gemini analyzes employee cost structure', async () => {
  const analysis = await analyzeWithGemini({
    employees: 50,
    avgSalary: 100000
  });

  expect(analysis.provider).toBe('google-gemini');
  expect(analysis.insights).toBeDefined();
  expect(analysis.costPerEmployee).toBeGreaterThan(0);
});
```

---

## Emergency Procedures

### If OpenAI Usage Detected
1. STOP all deployments immediately
2. Search codebase for OpenAI imports
3. Remove all OpenAI code
4. Replace with Gemini/Claude
5. Validate thoroughly
6. Deploy fix with extra testing

### If Financial Calculations Wrong
1. Stop all analysis features immediately
2. Revert to last known good version
3. Re-verify formulas against spreadsheets
4. Test with known datasets
5. Deploy fix with comprehensive validation

### If Gemini API Issues
1. Check Google Cloud status page
2. Verify API key validity
3. Check quota usage
4. Implement fallback (Claude)
5. Scale up quota if needed

---

## Quick Reference

| Phase | When | Duration | Command |
|-------|------|----------|---------|
| Pre-Commit | Every commit | 3-5 min | `npm run validate` |
| Feature | After feature | 5-10 min | `npm run test -- feature` |
| Pre-PR | Before PR | 10-15 min | `npm run test -- --coverage` |
| Pre-Deploy | Before deploy | 15-20 min | `npm run build` |
| Post-Deploy | After deploy | 10 min | `curl <health-endpoint>` |
| Monitoring | Continuous | N/A | Vercel + Neon dashboards |

**Remember**: NO OpenAI. Use Google Gemini Flash. Validate financial calculations rigorously.
