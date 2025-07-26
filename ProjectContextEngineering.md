# ProjectContextEngineering.md

## 🏗️ Prophet Analytics - Deep Technical Context & Engineering Insights

### Executive Summary
Prophet Analytics represents a pinnacle of enterprise SaaS architecture, combining Facebook's Prophet forecasting algorithm with a sophisticated multi-agent AI system. This document provides deep technical context for engineers working on the platform.

## 🎯 Core Value Proposition
- **Financial Forecasting Excellence**: Leveraging Prophet's additive model for time series forecasting with business seasonality
- **Multi-Agent Intelligence**: 6 specialized AI agents orchestrated through Google ADK for diverse analytical tasks
- **Enterprise-Grade Security**: Multi-tenant architecture with Row-Level Security and comprehensive audit trails
- **Cost-Optimized Performance**: Intelligent routing reduces AI costs by 80% while maintaining quality

## 🏛️ Architecture Philosophy

### Design Principles
1. **Separation of Concerns**: Clear boundaries between agents, API layers, and data access
2. **Event-Driven Communication**: Asynchronous message passing for scalability
3. **Defensive Programming**: Every external input validated, every operation logged
4. **Performance First**: Caching, indexing, and query optimization at every layer

### Technical Decisions & Rationale

#### Why Nx Monorepo?
- **Shared Code Reuse**: Types, utilities, and configurations shared across apps
- **Atomic Commits**: Changes across frontend/backend in single commits
- **Build Optimization**: Intelligent caching and affected project detection
- **Consistent Tooling**: Unified linting, testing, and build processes

#### Why FastAPI + Async?
- **Performance**: Async/await enables handling 10,000+ concurrent requests
- **Type Safety**: Pydantic models provide runtime validation
- **Documentation**: Automatic OpenAPI/Swagger generation
- **WebSocket Support**: Real-time updates for forecasting progress

#### Why Supabase?
- **PostgreSQL Power**: Advanced features like RLS, triggers, functions
- **Built-in Auth**: JWT-based authentication with social providers
- **Real-time Subscriptions**: Live data updates via WebSockets
- **Vector Embeddings**: pgvector for AI-powered search

## 🤖 Multi-Agent System Architecture

### Agent Squadron Deep Dive

#### 1. Financial Wizard (DeepSeek-R1)
- **Role**: Core Prophet algorithm execution and parameter tuning
- **Strengths**: Mathematical precision, cost-effective for calculations
- **Integration**: Direct Prophet library calls with custom optimizations
- **Cost**: $0.55/1M tokens - cheapest option for compute-heavy tasks

#### 2. Research Ninja (Perplexity Pro)
- **Role**: Real-time market data and competitive intelligence
- **Strengths**: Web search, current events, financial news analysis
- **Integration**: MCP servers for Brave search and Firecrawl
- **Cost**: $40/user/month - justified by real-time data access

#### 3. Code Samurai (Mistral Large 2)
- **Role**: System implementation and code generation
- **Strengths**: Complex reasoning, architectural decisions
- **Integration**: GitHub MCP server for repository operations
- **Cost**: $8/$24 per 1M tokens - balanced performance/cost

#### 4. Data Alchemist (Cohere Command R+)
- **Role**: RAG operations and semantic search
- **Strengths**: Document understanding, context retrieval
- **Integration**: Context7 vector database via MCP
- **Cost**: $2.50/$10 per 1M tokens - optimized for retrieval

#### 5. Efficiency Master (Llama 3.3)
- **Role**: Batch processing and optimization tasks
- **Strengths**: High throughput, low latency
- **Integration**: Local deployment option for sensitive data
- **Cost**: 80% savings through intelligent routing

#### 6. Architect Agent (Gemini 2.0 Pro)
- **Role**: System orchestration and coordination
- **Strengths**: Multi-modal understanding, complex planning
- **Integration**: Orchestrates other agents via event bus
- **Cost**: Variable based on usage patterns

### Agent Communication Protocol

#### Message Bus Architecture
```python
# Event-driven messaging pattern
class AgentMessage:
    id: str
    source: AgentType
    target: AgentType
    priority: Priority
    payload: Dict[str, Any]
    timestamp: datetime
    correlation_id: Optional[str]
```

#### Workflow Patterns
1. **Sequential Pipeline**: Task → Financial Wizard → Data Alchemist → Result
2. **Parallel Fork-Join**: Research Ninja + Data Alchemist → Architect merge
3. **Event Cascade**: Trigger → Multiple agents → Aggregated response
4. **Circuit Breaker**: Failure detection → Fallback agent → Graceful degradation

## 🔒 Security Architecture

### Multi-Tenancy Implementation
```sql
-- Row Level Security ensures complete isolation
CREATE POLICY "tenant_isolation" ON datasets
    FOR ALL USING (auth.uid() IN (
        SELECT user_id FROM organization_members 
        WHERE organization_id = datasets.organization_id
    ));
```

### Authentication Flow
1. **Initial Auth**: Supabase Auth → JWT token generation
2. **Token Validation**: FastAPI middleware validates on each request
3. **Permission Check**: Organization membership verified
4. **Audit Trail**: Every action logged with user/org context

### Security Hardening Measures
- **SQL Injection Prevention**: Parameterized queries only
- **XSS Protection**: Content Security Policy headers
- **Rate Limiting**: Per-user and per-organization limits
- **Secrets Management**: Environment variables, never in code
- **Dependency Scanning**: Automated vulnerability checks

## ⚡ Performance Optimization Strategies

### Database Optimization
```sql
-- Composite indexes for common query patterns
CREATE INDEX idx_forecasts_org_created 
    ON forecasts(organization_id, created_at DESC);

-- Partial indexes for active records
CREATE INDEX idx_datasets_active 
    ON datasets(organization_id) 
    WHERE deleted_at IS NULL;
```

### Caching Strategy
1. **Redis Layer**: Session data, frequent queries
2. **In-Memory Cache**: Agent responses, computed results
3. **CDN**: Static assets, documentation
4. **Database Cache**: Materialized views for analytics

### Query Optimization
- **N+1 Query Prevention**: Eager loading with SQLAlchemy
- **Batch Operations**: Bulk inserts/updates
- **Connection Pooling**: Optimized pool sizes
- **Query Analysis**: EXPLAIN ANALYZE on slow queries

## 🔄 Integration Points

### MCP Server Ecosystem
1. **Memory Server**: Agent context persistence
2. **GitHub Server**: Code operations, PR management
3. **Notion Server**: Documentation sync
4. **Brave Search**: Web intelligence gathering
5. **Firecrawl**: Deep web scraping
6. **Context7**: Vector database for RAG
7. **Browserbase**: Automated testing

### External APIs
- **Prophet Library**: Core forecasting engine
- **OpenAI/Anthropic**: Fallback LLM providers
- **Stripe**: Billing and subscriptions
- **SendGrid**: Transactional emails
- **Datadog**: Monitoring and alerting

## 📊 Data Flow Architecture

### Forecasting Pipeline
1. **Data Ingestion**: CSV/API → Validation → Storage
2. **Preprocessing**: Cleaning → Normalization → Feature extraction
3. **Model Training**: Prophet parameters → Training → Validation
4. **Prediction**: Future dates → Forecast → Confidence intervals
5. **Visualization**: Results → Charts → Export formats

### Real-time Updates
```typescript
// WebSocket subscription for live updates
const subscription = supabase
  .channel('forecast-updates')
  .on('postgres_changes', { 
    event: 'UPDATE', 
    schema: 'public', 
    table: 'forecasts',
    filter: `organization_id=eq.${orgId}`
  }, handleForecastUpdate)
  .subscribe();
```

## 🚀 Deployment Architecture

### Container Strategy
```dockerfile
# Multi-stage builds for optimization
FROM python:3.11-slim AS builder
# Build dependencies
FROM python:3.11-slim AS runtime
# Minimal runtime image
```

### Kubernetes Deployment
```yaml
# Horizontal Pod Autoscaling
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
spec:
  minReplicas: 3
  maxReplicas: 100
  targetCPUUtilizationPercentage: 70
```

### CI/CD Pipeline
1. **Code Push**: GitHub trigger
2. **Quality Gates**: Linting, tests, security scan
3. **Build**: Docker images, Nx affected
4. **Deploy**: Staging → Canary → Production
5. **Monitor**: Health checks, error rates

## 🎯 Current Phase 3 Focus Areas

### API Design Patterns
- **GraphQL Gateway**: Unified API for complex queries
- **REST Best Practices**: HATEOAS, versioning, pagination
- **WebSocket Scaling**: Redis pub/sub for multi-instance
- **API Rate Limiting**: Token bucket algorithm

### Resilience Engineering
- **Circuit Breakers**: Hystrix pattern implementation
- **Retry Logic**: Exponential backoff with jitter
- **Timeout Management**: Cascading timeout budgets
- **Graceful Degradation**: Feature flags for fallbacks

### Performance Analysis
- **Load Testing**: K6 scripts for stress testing
- **Profiling**: Python cProfile, React DevTools
- **Database Monitoring**: pg_stat_statements analysis
- **APM Integration**: Distributed tracing setup

## 📈 Scalability Considerations

### Vertical Scaling Limits
- **Database**: Read replicas for query distribution
- **API Servers**: CPU-bound operations optimization
- **Agent System**: Queue-based task distribution
- **Storage**: Object storage for large datasets

### Horizontal Scaling Strategy
- **Microservices**: Agent system as separate services
- **Event Streaming**: Kafka for high-volume events
- **Sharding**: Organization-based data partitioning
- **Edge Computing**: CDN for global distribution

## 🔍 Monitoring & Observability

### Key Metrics
```python
# Custom metrics for business insights
class ForecastingMetrics:
    accuracy_score: float
    processing_time: float
    data_points_processed: int
    api_calls_made: int
    cost_per_forecast: float
```

### Logging Strategy
- **Structured Logs**: JSON format with correlation IDs
- **Log Levels**: DEBUG in dev, INFO in prod
- **Centralized Logging**: ELK stack or similar
- **Audit Compliance**: Immutable audit logs

### Alerting Rules
1. **Error Rate**: > 1% triggers PagerDuty
2. **Response Time**: > 500ms investigation
3. **Queue Depth**: > 1000 items escalation
4. **Cost Anomaly**: 20% increase notification

## 🛠️ Development Best Practices

### Code Review Standards
- **PR Template**: Context, changes, testing
- **Review Checklist**: Security, performance, tests
- **Approval Requirements**: 2 reviewers minimum
- **Automated Checks**: Must pass before merge

### Testing Strategy
```python
# Test pyramid approach
def test_pyramid():
    unit_tests = 70  # Fast, isolated
    integration_tests = 20  # API, database
    e2e_tests = 10  # User workflows
    return 100  # Coverage target
```

### Documentation Requirements
1. **Code Comments**: Complex logic explained
2. **API Docs**: OpenAPI specifications
3. **Architecture Diagrams**: Mermaid/PlantUML
4. **Runbooks**: Operational procedures

## 🔮 Future Enhancements

### Technical Roadmap
1. **Q1 2025**: GraphQL federation, multi-region deployment
2. **Q2 2025**: Real-time collaboration features
3. **Q3 2025**: Advanced ML models beyond Prophet
4. **Q4 2025**: White-label platform capabilities

### Innovation Areas
- **AutoML**: Automated model selection
- **Explainable AI**: Model interpretation tools
- **Edge Deployment**: On-premise options
- **Blockchain**: Immutable forecast records

## 🏁 Success Criteria

### Technical KPIs
- **Uptime**: 99.99% availability SLA
- **Performance**: < 200ms p95 latency
- **Scalability**: 10,000 concurrent users
- **Security**: Zero critical vulnerabilities

### Business Metrics
- **Forecast Accuracy**: > 90% within confidence intervals
- **Cost Efficiency**: < $0.10 per forecast
- **User Satisfaction**: > 4.5/5 rating
- **Time to Value**: < 5 minutes onboarding

---

*This document serves as the technical north star for Prophet Analytics development. It should be updated as architectural decisions evolve and new insights emerge.*