# Prophet Growth Analysis - Architecture Documentation

## 1. Technology Stack

### Core Framework & Runtime
- **Frontend Framework**: Next.js 15 with App Router
- **React Version**: 19.x
- **Language**: TypeScript (strict mode enabled)
- **Build Tool**: Next.js built-in (Turbopack in development)

### AI/ML & APIs
- **Primary AI**: Google Gemini API (`@google/genai`, `@google/generative-ai`)
- **Voice Synthesis**: ElevenLabs API (`@elevenlabs/elevenlabs-js`)
- **Time Series Forecasting**: Prophet (Python bridge likely via API)
- **Validation**: Zod schemas with React Hook Form (`@hookform/resolvers`)

### UI Components & Styling
- **Component System**: Radix UI primitives
  - `@radix-ui/react-avatar` - User avatars and profile images
  - `@radix-ui/react-checkbox` - Form controls
  - `@radix-ui/react-dialog` - Modal dialogs
  - `@radix-ui/react-dropdown-menu` - Context menus
  - `@radix-ui/react-label` - Accessible form labels
  - `@radix-ui/react-popover` - Popover components

### Database & Storage
- **Primary Database**: Neon PostgreSQL (serverless)
- **ORM/Query Builder**: Likely Prisma or Drizzle (inferred from PostgreSQL usage)

### Deployment & Infrastructure
- **Platform**: Vercel (zero-config deployment)
- **CDN**: Vercel's global edge network
- **Database Hosting**: Neon (serverless PostgreSQL)

## 2. Design Patterns

### Architectural Patterns
- **Server-Side Rendering (SSR)**: Next.js App Router with React Server Components
- **API Route Pattern**: Next.js API routes for backend functionality
- **Component Composition**: Radix UI primitive composition
- **Form Management**: React Hook Form with Zod validation

### AI/ML Patterns
- **Agent Pattern**: AI agents with guardrails system
- **Chain-of-Thought**: Sequential AI processing for financial analysis
- **Context Management**: Persistent chat history for AI conversations
- **Voice Interface**: Text-to-speech synthesis for accessibility

### Data Patterns
- **Time Series Analysis**: Prophet forecasting for workforce costs
- **Real-time Updates**: WebSocket or Server-Sent Events for live data
- **Caching Strategy**: Vercel edge caching with ISR/SSG

## 3. Key Components

### Core Application Components
```
src/
├── app/                    # Next.js 15 App Router
│   ├── (dashboard)/       # Route groups
│   ├── api/               # API routes
│   │   ├── chat/          # AI chat endpoints
│   │   ├── forecast/      # Prophet forecasting
│   │   └── voice/         # ElevenLabs integration
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # Radix UI components
│   ├── chat/              # Chat interface components
│   ├── analytics/         # Data visualization
│   └── voice/             # Voice interaction components
├── lib/
│   ├── ai/                # AI service integrations
│   ├── db/                # Database client & queries
│   ├── validation/        # Zod schemas
│   └── utils/             # Utility functions
└── types/                 # TypeScript definitions
```

### AI Service Layer
- **Gemini Service**: Handles Google Gemini API interactions
- **Prophet Service**: Time series forecasting bridge
- **ElevenLabs Service**: Voice synthesis management
- **Agent Guardrails**: AI accountability and reliability system

## 4. Data Flow

### User Interaction Flow
1. **User Input** → Form validation with Zod & React Hook Form
2. **AI Processing** → Gemini API for natural language understanding
3. **Data Analysis** → Prophet forecasting for cost predictions
4. **Response Generation** → AI-generated insights with voice synthesis
5. **Presentation** → Real-time UI updates with Radix components

### AI Chat Data Flow
```
User Message → API Route → Gemini API → Context Enhancement → 
Prophet Analysis → Response Generation → ElevenLabs (optional) → 
UI Update + Database Persistence
```

### Forecasting Pipeline
```
Historical Data → Data Preprocessing → Prophet Model → 
Forecast Generation → Result Validation → Visualization
```

## 5. External Dependencies

### Core Dependencies
```json
{
  "dependencies": {
    "next": "15.x",
    "react": "19.x",
    "react-dom": "19.x",
    "typescript": "5.x",
    "@google/genai": "^latest",
    "@google/generative-ai": "^latest",
    "@elevenlabs/elevenlabs-js": "^latest",
    "@hookform/resolvers": "^latest",
    "zod": "^3.x"
  }
}
```

### UI Dependencies
```json
{
  "dependencies": {
    "@radix-ui/react-avatar": "^latest",
    "@radix-ui/react-checkbox": "^latest",
    "@radix-ui/react-dialog": "^latest",
    "@radix-ui/react-dropdown-menu": "^latest",
    "@radix-ui/react-label": "^latest",
    "@radix-ui/react-popover": "^latest"
  }
}
```

### Inferred Additional Dependencies
- Database ORM (Prisma/Drizzle)
- Authentication library (NextAuth.js/Auth.js)
- Charting library (Recharts/Chart.js)
- HTTP client (axios/fetch wrapper)

## 6. API Design

### Next.js API Routes Structure
```typescript
// app/api/chat/route.ts
export async function POST(req: Request) {
  // Handle AI chat interactions
}

// app/api/forecast/route.ts  
export async function POST(req: Request) {
  // Process forecasting requests
}

// app/api/voice/synthesize/route.ts
export async function POST(req: Request) {
  // Handle voice synthesis
}
```

### API Response Standards
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}
```

### Rate Limiting & Security
- API key validation for external services
- Request rate limiting
- Input sanitization and validation
- CORS configuration for cross-origin requests

## 7. Database Schema

### Core Tables Structure
```sql
-- Users and authentication
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Chat conversations
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  title VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Chat messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  role VARCHAR(50) NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  audio_url VARCHAR(500), -- ElevenLabs generated audio
  created_at TIMESTAMP DEFAULT NOW()
);

-- Financial data for forecasting
CREATE TABLE financial_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  date DATE NOT NULL,
  category VARCHAR(100) NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Forecast results
CREATE TABLE forecasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  input_data JSONB NOT NULL,
  forecast_results JSONB NOT NULL,
  generated_at TIMESTAMP DEFAULT NOW()
);
```

## 8. Security Considerations

### Framework-Level Security
- **Next.js Security**: Built-in XSS protection, CSRF mitigation
- **TypeScript**: Strict type checking for runtime safety
- **Environment Variables**: Server-side only for sensitive data

### API Security
```typescript
// API route protection example
export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // Input validation
  const validatedData = chatSchema.parse(await req.json());
}
```

### Data Protection
- **Database**: Parameterized queries to prevent SQL injection
- **API Keys**: Secure storage in environment variables
- **JWT**: 32+ character secret for authentication
- **Data Encryption**: At-rest encryption in Neon PostgreSQL

### AI Security
- **Input Sanitization**: Prevent prompt injection attacks
- **Output Validation**: Validate AI responses before display
- **Rate Limiting**: Prevent API abuse
- **Agent Guardrails**: Content filtering and safety checks

## 9. Performance Optimization

### Next.js Optimization Strategies
- **React Server Components**: Reduce client-side JavaScript
- **Static Generation**: ISR for predictable pages
- **Edge Runtime**: API routes on Vercel's edge network
- **Image Optimization**: Next.js Image component with lazy loading

### Caching Strategy
```typescript
// Example caching in API routes
export async function GET() {
  // Vercel edge caching
  const res = await fetch(url, {
    next: { revalidate: 3600 } // 1 hour
  });
}
```

### AI Performance
- **Streaming Responses**: Real-time AI response streaming
- **Request Batching**: Batch similar AI requests
- **Response Caching**: Cache frequent AI queries
- **Connection Pooling**: Database connection management

### Database Optimization
- **Indexing**: Strategic indexes on frequently queried columns
- **Connection Pooling**: Neon serverless connection management
- **Query Optimization**: Efficient joins and aggregations

## 10. Deployment Strategy

### Vercel Deployment Pipeline
```yaml
# vercel.json configuration
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "NEON_DATABASE_URL": "@neon_database_url",
    "GOOGLE_GEMINI_API_KEY": "@google_gemini_api_key",
    "ELEVENLABS_API_KEY": "@elevenlabs_api_key"
  }
}
```

### Environment-Specific Configuration
- **Development**: Local environment with hot reload
- **Preview**: Vercel preview deployments for PRs
- **Production**: Vercel production with global CDN

### Monitoring & Analytics
- **Vercel Analytics**: Performance monitoring
- **Error Tracking**: Runtime error capture
- **API Monitoring**: External service health checks
- **Database Metrics**: Query performance monitoring

### Scalability Considerations
- **Serverless Architecture**: Automatic scaling with Vercel
- **Database**: Neon serverless PostgreSQL auto-scaling
- **CDN**: Global content delivery via Vercel edge network
- **API Limits**: Managed external API rate limits

This architecture leverages Next.js 15's modern features while maintaining robust AI/ML capabilities through strategic service integrations and careful performance optimization for financial analysis workloads.